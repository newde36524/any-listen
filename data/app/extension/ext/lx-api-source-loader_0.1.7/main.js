(function() {
	//#region src/main/shared/hostAPI.ts
	var api = require("any-listen");
	var console = {
		log: api.logcat.info,
		error: api.logcat.error,
		warn: api.logcat.warn,
		debug: api.logcat.debug
	};
	var registerResourceAction = api.registerResourceAction;
	var request = api.request;
	var t = api.t;
	var crypto = api.utils.crypto;
	api.utils.iconv;
	api.utils.zlib;
	api.utils.dataConverter;
	var createIsolateContext = api.utils.createIsolateContext;
	var storage = api.storage;
	var configuration = api.configuration;
	var musicUtils = api.musicUtils;
	var command = api.command;
	var app = api.app;
	//#endregion
	//#region src/main/shared/lxSourceManage.ts
	var INFO_NAMES = {
		name: 24,
		description: 36,
		author: 56,
		homepage: 1024,
		version: 36
	};
	var matchInfo = (scriptInfo) => {
		const infoArr = scriptInfo.split(/\r?\n/);
		const rxp = /^\s?\*\s?@(\w+)\s(.+)$/;
		const infos = {};
		for (const info of infoArr) {
			const result = rxp.exec(info);
			if (!result) continue;
			const key = result[1];
			if (INFO_NAMES[key] == null) continue;
			infos[key] = result[2].trim();
		}
		for (const [key, len] of Object.entries(INFO_NAMES)) {
			infos[key] ||= "";
			if (infos[key] == null) infos[key] = "";
			else if (infos[key].length > len) infos[key] = `${infos[key].substring(0, len)}...`;
		}
		return infos;
	};
	var parseScriptInfo = (script) => {
		const result = /^\/\*[\S|\s]+?\*\//.exec(script);
		if (!result) throw new Error(t("error.parseScriptInfoFailed"));
		return matchInfo(result[0]);
	};
	var parseScript = async (fileName, scriptRaw) => {
		const scriptInfo = parseScriptInfo(scriptRaw);
		const md5 = await crypto.md5(scriptRaw.trim());
		scriptInfo.name ||= fileName;
		const desc = `${scriptInfo.version ? `${scriptInfo.version.startsWith("v") ? "" : "v"}${scriptInfo.version}` : ""}${scriptInfo.author ? `@${scriptInfo.author}` : ""}`;
		return {
			id: md5,
			...scriptInfo,
			allowShowUpdateAlert: true,
			fileName,
			fileDesc: `${desc ? `[${desc}]` : ""}${scriptInfo.description ? ` ${scriptInfo.description}` : ""}`.trim()
		};
	};
	var SCRIPTS_DIR = "scripts";
	var addScript = async (fileName, scriptRaw) => {
		const apiInfo = await parseScript(fileName, scriptRaw);
		const infos = (await configuration.getConfigs(["importedScriptSources"]))[0] ?? [];
		const targetInfo = infos.find((info) => info.id === apiInfo.id);
		if (targetInfo) throw new Error(t("error.duplicateScript", {
			fileName,
			name: targetInfo.name
		}));
		infos.push(apiInfo);
		await storage.writeFile(`${SCRIPTS_DIR}/${apiInfo.id}`, scriptRaw);
		await configuration.setConfigs({ importedScriptSources: infos });
	};
	var getScript = async (id) => {
		return storage.readFile(`${SCRIPTS_DIR}/${id}`, "utf-8");
	};
	var checkFiles = async (infos) => {
		const files = await storage.listFiles(SCRIPTS_DIR).catch(() => []);
		const ids = infos.map((info) => info.id);
		const removedFiles = files.filter((f) => !ids.includes(f));
		for (const file of removedFiles) await storage.removeFile(`${SCRIPTS_DIR}/${file}`).catch(() => {});
	};
	//#endregion
	//#region src/main/command.ts
	var addLocalSource = async () => {
		await app.showOpenDialog({
			title: t("command.addLocalSourceDialogTitle"),
			canSelectFiles: true,
			canSelectMany: true,
			filters: { JavaScript: ["js"] }
		}).then(async (result) => {
			if (!result.length) return;
			for (const path of result) {
				const content = await app.readOpenDialogFile(path, "utf-8");
				const fileName = path.split(/[/\\]/).pop() ?? path;
				await addScript(fileName, content).catch((error) => {
					console.error(t("error.addLocalSourceFailed", {
						name: fileName,
						message: error.message
					}));
					app.showMessage(t("error.addLocalSourceFailed", {
						name: fileName,
						message: error.message
					}), { type: "error" });
				});
			}
		});
	};
	var addRemoteSource = async () => {
		await app.showInputDialog({
			title: t("command.addRemoteSourceDialogTitle"),
			placeholder: t("command.addRemoteSourceDialogPlaceholder")
		}).then(async (result) => {
			if (!result || !/^https?:\/\//.test(result)) {
				app.showMessage(t("error.invalidRemoteSource"), { type: "error" });
				return;
			}
			try {
				const data = await request(result);
				if (typeof data.body !== "string") app.showMessage(t("error.invalidRemoteSource"), { type: "error" });
				const urlParts = result.split("/");
				let fileName = urlParts[urlParts.length - 1] || "remote_source.js";
				if (!fileName.endsWith(".js")) fileName += ".js";
				await addScript(fileName, data.body);
			} catch (error) {
				console.error(t("error.addRemoteSourceFailed", { message: error.message }));
				app.showMessage(t("error.addRemoteSourceFailed", { message: error.message }), { type: "error" });
			}
		});
	};
	var fileNameRxp = /[\\/:*?#"<>|]/g;
	var filterFileName = (name) => name.replace(fileNameRxp, "");
	var exportSources = async () => {
		const [infos = []] = await configuration.getConfigs(["importedScriptSources"]);
		if (!infos.length) {
			app.showMessage(t("command.exportSourcesNoSources"), { type: "info" });
			return;
		}
		const savePath = await app.showSaveDialog({
			title: t("command.exportSourcesDialogTitle"),
			saveLabel: t("command.exportSourcesDialogSaveLabel"),
			canSelectFolder: true
		});
		if (!savePath) return;
		for (const info of infos) {
			const script = await getScript(info.id);
			let name = filterFileName(info.name || "").trim();
			name = name ? `${name}.js` : info.fileName;
			await app.writeSaveDialogFile(savePath, name, script).catch((error) => {
				console.error(t("error.exportSourcesFailed", {
					name: info.name || info.fileName,
					message: error.message
				}));
				app.showMessage(t("error.exportSourcesFailed", {
					name: info.name || info.fileName,
					message: error.message
				}), { type: "error" });
			});
		}
	};
	var initCommand = async () => {
		await Promise.all([
			command.registerCommand("addLocalSource", addLocalSource),
			command.registerCommand("addRemoteSource", addRemoteSource),
			command.registerCommand("exportSources", exportSources)
		]);
	};
	//#endregion
	//#region node_modules/.pnpm/message2call@2.0.3/node_modules/message2call/dist/message2call.js
	var CALL_TYPES;
	(function(CALL_TYPES) {
		CALL_TYPES[CALL_TYPES["REQUEST"] = 0] = "REQUEST";
		CALL_TYPES[CALL_TYPES["RESPONSE"] = 1] = "RESPONSE";
		CALL_TYPES[CALL_TYPES["CALLBACK_REQUEST"] = 2] = "CALLBACK_REQUEST";
		CALL_TYPES[CALL_TYPES["CALLBACK_RESPONSE"] = 3] = "CALLBACK_RESPONSE";
	})(CALL_TYPES || (CALL_TYPES = {}));
	var nextTick = typeof setImmediate == "function" ? setImmediate : typeof queueMicrotask == "function" ? queueMicrotask : (callback) => {
		Promise.resolve().then(callback);
	};
	var generateId = () => Math.random().toString(36).slice(2);
	var proxyCallbacks = /* @__PURE__ */ new Map();
	var Callback = class {
		sendResponse;
		isSendErrorStack;
		constructor(options, sendResponse) {
			this.sendResponse = sendResponse;
			this.isSendErrorStack = options.isSendErrorStack ?? false;
		}
		async handleCallbackRequest(callbackName, args) {
			const handler = proxyCallbacks.get(callbackName);
			if (!handler) {
				this.sendResponse([
					CALL_TYPES.CALLBACK_RESPONSE,
					callbackName,
					{ message: `${callbackName} is released` }
				]);
				return;
			}
			let result;
			try {
				result = await handler(...args);
			} catch (err) {
				this.sendResponse([
					CALL_TYPES.CALLBACK_RESPONSE,
					callbackName,
					{
						message: err.message,
						stack: this.isSendErrorStack ? err.stack : void 0
					}
				]);
				return;
			}
			this.sendResponse([
				CALL_TYPES.CALLBACK_RESPONSE,
				callbackName,
				null,
				result
			]);
		}
	};
	var Local = class {
		events;
		exposeObj;
		sendResponse;
		timeout;
		onCallBeforeParams;
		isSendErrorStack;
		constructor({ exposeObj, events, timeout, onCallBeforeParams, isSendErrorStack }, sendResponse) {
			this.exposeObj = exposeObj;
			this.events = events;
			this.timeout = timeout;
			this.onCallBeforeParams = onCallBeforeParams;
			this.isSendErrorStack = isSendErrorStack;
			this.sendResponse = sendResponse;
		}
		async handleCallbackData(callbackName, timeout, args) {
			return new Promise((resolve, reject) => {
				const handler = ((err, data) => {
					if (handler.timeout) clearTimeout(handler.timeout);
					this.events.delete(callbackName);
					if (err == null) resolve(data);
					else {
						const error = new Error(err.message);
						error.stack = err.stack;
						reject(error);
					}
				});
				this.events.set(callbackName, handler);
				if (timeout) handler.timeout = setTimeout(() => {
					handler.timeout = null;
					handler({ message: "call remote timeout" });
				}, timeout);
				this.sendResponse([
					CALL_TYPES.CALLBACK_REQUEST,
					callbackName,
					args
				]);
			});
		}
		async handleRequest(eventName, path, args, callbacks) {
			let obj = this.exposeObj;
			const name = path.pop();
			for (const _name of path) {
				obj = obj[_name];
				if (obj === void 0) {
					this.sendResponse([
						CALL_TYPES.RESPONSE,
						eventName,
						{ message: `${_name} is not defined` }
					]);
					return;
				}
			}
			if (typeof obj[name] == "function") {
				let result;
				if (callbacks.length) for (const index of callbacks) {
					const context = this;
					const name = args[index];
					args.splice(index, 1, async function(...args) {
						return context.handleCallbackData(name, context.timeout, args);
					});
				}
				try {
					if (this.onCallBeforeParams) args = this.onCallBeforeParams(args);
					result = await obj[name].apply(obj, args);
				} catch (err) {
					this.sendResponse([
						CALL_TYPES.RESPONSE,
						eventName,
						{
							message: err.message,
							stack: this.isSendErrorStack ? err.stack : void 0
						}
					]);
					return;
				}
				this.sendResponse([
					CALL_TYPES.RESPONSE,
					eventName,
					null,
					result
				]);
			} else if (obj[name] === void 0) this.sendResponse([
				CALL_TYPES.RESPONSE,
				eventName,
				{ message: `${name} is not defined` }
			]);
			else this.sendResponse([
				CALL_TYPES.RESPONSE,
				eventName,
				null,
				obj[name]
			]);
		}
	};
	var Remote = class {
		events;
		remoteGroups;
		sendRequest;
		onError;
		timeout;
		constructor(options, sendRequest) {
			this.remoteGroups = /* @__PURE__ */ new Map();
			this.events = options.events;
			this.timeout = options.timeout;
			this.onError = options.onError;
			this.sendRequest = sendRequest;
		}
		handleGroupNextTask(groupName, error) {
			nextTick(() => {
				const group = this.remoteGroups.get(groupName);
				group.handling = false;
				if (group.queue.length) {
					if (error == null) group.queue.shift()[0]();
					else group.queue.shift()[1](error);
				}
			});
		}
		async waitQueue(group, groupName, pathname) {
			if (group.handling) await new Promise((resolve, reject) => {
				group.queue.push([resolve, (error) => {
					reject(error);
					this.onError?.(error, pathname, groupName);
					this.handleGroupNextTask(groupName, error);
				}]);
			});
			group.handling = true;
		}
		async handleData(groupName, pathname, timeout, args) {
			const eventName = `${pathname.join(".")}_${generateId()}`;
			return new Promise((resolve, reject) => {
				const handler = ((err, data) => {
					if (handler.timeout) clearTimeout(handler.timeout);
					this.events.delete(eventName);
					if (err == null) resolve(data);
					else {
						const error = new Error(err.message);
						error.stack = err.stack;
						this.onError?.(error, pathname, groupName);
						reject(error);
					}
				});
				const callbacks = [];
				args = args.map((arg, index) => {
					if (typeof arg === "function") {
						if (!arg.__msg2call_cbname__) throw new Error("callback is not a proxy callback");
						callbacks.push(index);
						return arg.__msg2call_cbname__;
					}
					return arg;
				});
				this.events.set(eventName, handler);
				if (timeout) handler.timeout = setTimeout(() => {
					handler.timeout = null;
					handler({ message: "call remote timeout" });
				}, timeout);
				this.sendRequest([
					CALL_TYPES.REQUEST,
					eventName,
					pathname,
					args,
					callbacks
				]);
			});
		}
		async getData(groupName, pathname, args) {
			let { timeout } = this;
			let isQueue = false;
			if (groupName != null) {
				let group = this.remoteGroups.get(groupName);
				if (group.options.timeout != null) timeout = group.options.timeout;
				if (group.options.queue) {
					isQueue = true;
					await this.waitQueue(group, groupName, pathname);
				}
			}
			let promise = this.handleData(groupName, pathname, timeout, args);
			if (isQueue) promise = promise.then((data) => {
				this.handleGroupNextTask(groupName);
				return data;
			}).catch((error) => {
				this.handleGroupNextTask(groupName, error);
				throw error;
			});
			return promise;
		}
		createProxy(context, groupName, path = []) {
			return new Proxy(function() {}, {
				get: (_target, prop, receiver) => {
					let propName = prop.toString();
					if (prop == "then" && path.length) {
						const r = context.getData(groupName, path, []);
						return r.then.bind(r);
					}
					return context.createProxy(context, groupName, [...path, propName]);
				},
				apply: async (target, thisArg, argumentsList) => context.getData(groupName, path, argumentsList)
			});
		}
		/**
		* create remote proxy object of group calls
		*/
		createRemoteGroup(groupName, options = {}) {
			this.remoteGroups.set(groupName, {
				handling: false,
				queue: [],
				options
			});
			return this.createProxy(this, groupName);
		}
	};
	var createMessage2Call = (options) => {
		const events = /* @__PURE__ */ new Map();
		const timeout = options.timeout ?? 12e4;
		const isSendErrorStack = options.isSendErrorStack ?? false;
		const remote = new Remote({
			events,
			timeout,
			onError: options.onError
		}, (message) => {
			options.sendMessage(message);
		});
		const callback = new Callback(options, (message) => {
			options.sendMessage(message);
		});
		const local = new Local({
			events,
			timeout,
			isSendErrorStack,
			onCallBeforeParams: options.onCallBeforeParams,
			exposeObj: options.exposeObj
		}, (message) => {
			options.sendMessage(message);
		});
		const handleResponse = async (name, err, data) => {
			const handler = events.get(name);
			if (typeof handler == "function") handler(err, data);
		};
		const message = (message) => {
			if (!Array.isArray(message)) throw new Error("message is not array");
			const _message = message;
			switch (_message[0]) {
				case CALL_TYPES.REQUEST:
					local.handleRequest(_message[1], _message[2], _message[3], _message[4]);
					break;
				case CALL_TYPES.CALLBACK_REQUEST:
					callback.handleCallbackRequest(_message[1], _message[2]);
					break;
				case CALL_TYPES.RESPONSE:
				case CALL_TYPES.CALLBACK_RESPONSE: handleResponse(_message[1], _message[2], _message[3]);
			}
		};
		const destroy = () => {
			for (const handler of events.values()) handler({ message: "destroy" });
		};
		return {
			/**
			* remote proxy object
			*/
			remote: remote.createProxy(remote, null),
			/**
			* create remote proxy object of group calls
			*/
			createRemoteGroup: remote.createRemoteGroup.bind(remote),
			/**
			* on message function
			*/
			message,
			/**
			* destroy
			*/
			destroy
		};
	};
	//#endregion
	//#region src/main/shared/constants.ts
	var EXTENSION = {
		storageDir: "@storage",
		extensionDir: "@root"
	};
	//#endregion
	//#region src/main/shared/utils.ts
	var verifyUrl = async (url, opts = {}) => {
		const resp = await request(url, {
			...opts,
			headers: {
				...opts.headers ?? {},
				Range: "bytes=0-1"
			},
			needRaw: true
		});
		if (!resp.statusCode || resp.statusCode < 200 || resp.statusCode >= 300) throw new Error(`verify proxy request failed: [${url}] ${resp.statusCode}`);
		return resp.history[resp.history.length - 1];
	};
	//#endregion
	//#region src/main/isolate/exposeObject.ts
	var exposeObject = {
		async request(options) {
			return request(options.url, {
				method: options.method,
				json: options.json,
				binary: options.binary,
				maxRedirect: options.maxRedirect,
				needRaw: options.needRaw,
				query: options.query,
				form: options.form,
				headers: options.headers,
				timeout: options.timeout,
				formdata: options.formdata,
				text: options.text,
				xml: options.xml
			});
		},
		async log(...args) {
			console.log(...args);
		},
		async error(...args) {
			console.error(...args);
		},
		async warn(...args) {
			console.warn(...args);
		},
		async debug(...args) {
			console.debug(...args);
		}
	};
	//#endregion
	//#region src/main/isolate/index.ts
	var createIsolate = async (scriptInfo) => {
		let sources = null;
		const msg2call = createMessage2Call({
			exposeObj: {
				...exposeObject,
				async inited(info, status, errorMessage) {
					if (status === true || status == null) {
						sources = info;
						console.log(`[${scriptInfo.name}]Init successfully: ${Object.entries(info || {}).map(([k, v]) => `${k}: ${v.join("|")}`).join("; ")}`);
					} else {
						console.error(`[${scriptInfo.name}]Init failed: ${JSON.stringify(info)}${errorMessage ? `\nError: ${errorMessage}` : ""}`);
						app.showMessage(t("error.initScriptsFailed", { message: errorMessage || "Unknown error" }), { type: "error" });
					}
				},
				async showUpdateAlert(log, url) {
					app.showMessage(t("isolate.updateAvailable", {
						name: scriptInfo.name || scriptInfo.fileName,
						log: typeof log === "string" ? log : JSON.stringify(log)
					}), { type: "info" });
					console.log(`Update available:\n${log}${url ? `\nUpdate URL: ${url}` : ""}`);
				}
			},
			sendMessage(data) {
				isolate.sendMessage(data);
			},
			isSendErrorStack: true,
			timeout: 0
		});
		const isolate = await createIsolateContext((data) => {
			msg2call.message(data);
		});
		await isolate.runFile(`${EXTENSION.extensionDir}/resources/isolate-preload.js`);
		return {
			runScript: async (code) => isolate.run(code),
			destroy: async () => isolate.destroy(),
			remote: msg2call.remote,
			get sources() {
				return sources;
			}
		};
	};
	var toLXMusicInfo = (minfo) => {
		const oInfo = {
			name: minfo.name,
			singer: minfo.singer,
			source: minfo.meta.source,
			songmid: minfo.meta.musicId,
			interval: minfo.interval,
			albumName: minfo.meta.albumName,
			typeUrl: {}
		};
		oInfo.albumId = minfo.meta.albumId;
		oInfo.types = Object.fromEntries(Object.entries(minfo.meta.qualitys ?? {}).map(([key, { sizeStr, ...val }]) => [key, sizeStr == null ? val : {
			...val,
			size: sizeStr
		}]));
		switch (minfo.meta.source) {
			case "kg":
				oInfo.hash = minfo.meta.hash;
				break;
			case "tx":
				oInfo.strMediaMid = minfo.meta.strMediaMid;
				oInfo.albumMid = minfo.meta.albumMid;
				oInfo.songId = minfo.meta.songId;
				break;
			case "mg":
				oInfo.copyrightId = minfo.meta.copyrightId;
				oInfo.lrcUrl = minfo.meta.lrcUrl;
				oInfo.mrcUrl = minfo.meta.mrcUrl;
				oInfo.trcUrl = minfo.meta.trcUrl;
		}
		return oInfo;
	};
	var scripts = [];
	var runScript = async (id, scriptInfo, script, enabledSourceLogout) => {
		const isolate = await createIsolate(scriptInfo);
		await isolate.remote.setEnabledSourceLogout(enabledSourceLogout);
		await isolate.remote.setupEnv(scriptInfo, script);
		await isolate.runScript(script);
		scripts.push({
			id,
			info: scriptInfo,
			destroy: async () => {
				scripts.splice(scripts.findIndex((s) => s.id === id), 1);
				await isolate.destroy();
			},
			getMusicUrl: async (musicInfo, type) => {
				return isolate.remote.getMusicUrl(toLXMusicInfo(musicInfo), type);
			},
			setEnabledSourceLogout: async (enabled) => {
				await isolate.remote.setEnabledSourceLogout(enabled);
			},
			get sources() {
				return isolate.sources;
			}
		});
	};
	var types = [
		"128k",
		"192k",
		"320k",
		"wav",
		"flac",
		"flac24bit",
		"dolby",
		"master"
	];
	var getTargetScriptByQuality = (musicInfo, type, excludeIds = []) => {
		let targetScript = scripts.find((s) => s.sources?.[musicInfo.meta.source]?.includes(type) && !excludeIds.includes(s.id));
		if (targetScript) return [targetScript, type];
		const idx = types.indexOf(type) - 1;
		if (idx < 0) throw new Error("No script found to handle this request");
		return getTargetScriptByQuality(musicInfo, types[idx], excludeIds);
	};
	var getMusicUrl = async (musicInfo, type, excludeIds = []) => {
		const [targetScript, targetType] = getTargetScriptByQuality(musicInfo, type, excludeIds);
		return targetScript.getMusicUrl(musicInfo, targetType).then(async (url) => {
			url = await verifyUrl(url);
			return url;
		}).catch(async (error) => {
			console.error(`[${targetScript.info.name || targetScript.info.fileName} - ${musicInfo.name}(${musicInfo.meta.source}, type: ${targetType})] ${error.message}`);
			return getMusicUrl(musicInfo, type, [...excludeIds, targetScript.id]);
		});
	};
	var updateEnabledSourceLogout = async (enabled) => {
		for (const script of scripts) await script.setEnabledSourceLogout(enabled);
	};
	//#endregion
	//#region src/main/onlineResource/index.ts
	var initOnlineResource = async () => {
		registerResourceAction({ async musicUrl(params) {
			const quality = params.quality || "128k";
			let url = await getMusicUrl(params.musicInfo, quality);
			console.log(`${params.musicInfo.name}, ${params.musicInfo.meta.source}, ${quality}: ${url}`);
			url = await musicUtils.createProxyUrl(url, {}, (await configuration.getConfigs(["enabledCache"]))[0]);
			console.log(`proxy: ${url}`);
			return {
				quality,
				url
			};
		} });
	};
	//#endregion
	//#region src/main/index.ts
	initOnlineResource();
	var initScripts = async () => {
		let [config = [], infos = [], enabledSourceLogout = false] = await configuration.getConfigs([
			"enabledScripts",
			"importedScriptSources",
			"enabledSourceLogout"
		]);
		checkFiles(infos);
		const infoMap = new Map(infos.map((info) => [info.id, info]));
		for (const id of config) {
			const info = infoMap.get(id);
			if (!info) {
				console.error(`No script info found for id ${id}`);
				continue;
			}
			try {
				const script = await getScript(info.id);
				await runScript(info.id, info, script, enabledSourceLogout);
			} catch (error) {
				console.error(t("error.loadScriptFailed", {
					name: info.name || info.id,
					message: error.message
				}));
				app.showMessage(t("error.loadScriptFailed", {
					name: info.name || info.id,
					message: error.message
				}), { type: "error" });
			}
		}
		configuration.onConfigChanged(async (keys, newConfig) => {
			if (keys.includes("enabledSourceLogout")) {
				enabledSourceLogout = newConfig.enabledSourceLogout || false;
				await updateEnabledSourceLogout(enabledSourceLogout);
			}
			if (keys.includes("enabledScripts")) {
				const newEnabledIds = newConfig.enabledScripts || [];
				const enabledIds = [];
				for (const script of scripts) {
					if (newEnabledIds.includes(script.id)) {
						enabledIds.push(script.id);
						continue;
					}
					await script.destroy().catch(() => {});
				}
				const infos = (await configuration.getConfigs(["importedScriptSources"]))[0] ?? [];
				for (const id of newEnabledIds) {
					if (enabledIds.includes(id)) continue;
					const targetInfo = infos.find((info) => info.id === id);
					if (!targetInfo) {
						console.error(`No script info found for id ${id}`);
						continue;
					}
					try {
						const script = await getScript(id);
						await runScript(targetInfo.id, targetInfo, script, enabledSourceLogout);
					} catch (error) {
						console.error(t("error.loadScriptFailed", {
							name: targetInfo.name || targetInfo.id,
							message: error.message
						}));
						app.showMessage(t("error.loadScriptFailed", {
							name: targetInfo.name || targetInfo.id,
							message: error.message
						}), { type: "error" });
					}
				}
			}
		});
	};
	initScripts().catch((error) => {
		console.error(t("error.initScriptsFailed", { message: error.message }));
	});
	initCommand().catch((error) => {
		console.error(`Failed to initialize commands: ${error.message}`);
	});
	//#endregion
})();
