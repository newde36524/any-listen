(function() {
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
	//#region src/isolate-preload/envAPI.ts
	var onmessage = globalThis.onmessage;
	var postMessage = globalThis.postMessage;
	delete globalThis.onmessage;
	delete globalThis.postMessage;
	//#endregion
	//#region src/isolate-preload/extensionObject.ts
	var ipc;
	var setExtensionObject = (obj) => {
		ipc = obj;
	};
	var _ipc = new Proxy({}, { get(target, property) {
		return ipc[property];
	} });
	//#endregion
	//#region src/isolate-preload/utils.ts
	var enabledSourceLogout = false;
	var scriptInfo = null;
	var setEnabledSourceLogout = (enabled) => {
		enabledSourceLogout = enabled;
	};
	var setScriptInfo = (info) => {
		scriptInfo = info;
	};
	var createConsole = () => {
		const buildPrefix = () => {
			return `[${scriptInfo?.name || "unknown"}]`;
		};
		return {
			log: (...args) => {
				if (enabledSourceLogout) _ipc.log(buildPrefix(), ...args);
			},
			error: (...args) => {
				if (enabledSourceLogout) _ipc.error(buildPrefix(), ...args);
			},
			warn: (...args) => {
				if (enabledSourceLogout) _ipc.warn(buildPrefix(), ...args);
			},
			debug: (...args) => {
				if (enabledSourceLogout) _ipc.debug(buildPrefix(), ...args);
			},
			group: (...args) => {
				if (enabledSourceLogout) _ipc.log(buildPrefix(), ...args);
			},
			groupEnd: (...args) => {
				if (enabledSourceLogout) _ipc.log(buildPrefix(), ...args);
			},
			info: (...args) => {
				if (enabledSourceLogout) _ipc.log(buildPrefix(), ...args);
			},
			time: (...args) => {
				if (enabledSourceLogout) _ipc.log(buildPrefix(), ...args);
			},
			timeEnd: (...args) => {
				if (enabledSourceLogout) _ipc.log(buildPrefix(), ...args);
			},
			clear: (...args) => {
				if (enabledSourceLogout) _ipc.log(buildPrefix(), ...args);
			},
			groupCollapsed: (...args) => {
				if (enabledSourceLogout) _ipc.log(buildPrefix(), ...args);
			},
			trace: (...args) => {
				if (enabledSourceLogout) _ipc.log(buildPrefix(), ...args);
			}
		};
	};
	//#endregion
	//#region src/isolate-preload/vendors/base64.js
	var _hasBuffer = typeof Buffer === "function";
	typeof TextDecoder === "function" && new TextDecoder();
	typeof TextEncoder === "function" && new TextEncoder();
	var b64chs = Array.prototype.slice.call("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=");
	var b64tab = ((a) => {
		let tab = {};
		a.forEach((c, i) => tab[c] = i);
		return tab;
	})(b64chs);
	var b64re = /^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/;
	var _fromCC = String.fromCharCode.bind(String);
	var _U8Afrom = typeof Uint8Array.from === "function" ? Uint8Array.from.bind(Uint8Array) : (it) => new Uint8Array(Array.prototype.slice.call(it, 0));
	var _mkUriSafe = (src) => src.replace(/=/g, "").replace(/[+\/]/g, (m0) => m0 == "+" ? "-" : "_");
	var _tidyB64 = (s) => s.replace(/[^A-Za-z0-9\+\/]/g, "");
	/**
	* polyfill version of `btoa`
	*/
	var btoaPolyfill = (bin) => {
		let u32, c0, c1, c2, asc = "";
		const pad = bin.length % 3;
		for (let i = 0; i < bin.length;) {
			if ((c0 = bin.charCodeAt(i++)) > 255 || (c1 = bin.charCodeAt(i++)) > 255 || (c2 = bin.charCodeAt(i++)) > 255) throw new TypeError("invalid character found");
			u32 = c0 << 16 | c1 << 8 | c2;
			asc += b64chs[u32 >> 18 & 63] + b64chs[u32 >> 12 & 63] + b64chs[u32 >> 6 & 63] + b64chs[u32 & 63];
		}
		return pad ? asc.slice(0, pad - 3) + "===".substring(pad) : asc;
	};
	/**
	* does what `window.btoa` of web browsers do.
	* @param {String} bin binary string
	* @returns {string} Base64-encoded string
	*/
	var _btoa = typeof btoa === "function" ? (bin) => btoa(bin) : _hasBuffer ? (bin) => Buffer.from(bin, "binary").toString("base64") : btoaPolyfill;
	var _fromUint8Array = _hasBuffer ? (u8a) => Buffer.from(u8a).toString("base64") : (u8a) => {
		const maxargs = 4096;
		let strs = [];
		for (let i = 0, l = u8a.length; i < l; i += maxargs) strs.push(_fromCC.apply(null, u8a.subarray(i, i + maxargs)));
		return _btoa(strs.join(""));
	};
	/**
	* converts a Uint8Array to a Base64 string.
	* @param {boolean} [urlsafe] URL-and-filename-safe a la RFC4648 §5
	* @returns {string} Base64 string
	*/
	var fromUint8Array = (u8a, urlsafe = false) => urlsafe ? _mkUriSafe(_fromUint8Array(u8a)) : _fromUint8Array(u8a);
	/**
	* polyfill version of `atob`
	*/
	var atobPolyfill = (asc) => {
		asc = asc.replace(/\s+/g, "");
		if (!b64re.test(asc)) throw new TypeError("malformed base64.");
		asc += "==".slice(2 - (asc.length & 3));
		let u24, r1, r2;
		let binArray = [];
		for (let i = 0; i < asc.length;) {
			u24 = b64tab[asc.charAt(i++)] << 18 | b64tab[asc.charAt(i++)] << 12 | (r1 = b64tab[asc.charAt(i++)]) << 6 | (r2 = b64tab[asc.charAt(i++)]);
			if (r1 === 64) binArray.push(_fromCC(u24 >> 16 & 255));
			else if (r2 === 64) binArray.push(_fromCC(u24 >> 16 & 255, u24 >> 8 & 255));
			else binArray.push(_fromCC(u24 >> 16 & 255, u24 >> 8 & 255, u24 & 255));
		}
		return binArray.join("");
	};
	/**
	* does what `window.atob` of web browsers do.
	* @param {String} asc Base64-encoded string
	* @returns {string} binary string
	*/
	var _atob = typeof atob === "function" ? (asc) => atob(_tidyB64(asc)) : _hasBuffer ? (asc) => Buffer.from(asc, "base64").toString("binary") : atobPolyfill;
	var _toUint8Array = _hasBuffer ? (a) => _U8Afrom(Buffer.from(a, "base64")) : (a) => _U8Afrom(_atob(a).split("").map((c) => c.charCodeAt(0)));
	/**
	* converts a Base64 string to a Uint8Array.
	*/
	var toUint8Array = (a) => _toUint8Array(_unURI(a));
	var _unURI = (a) => _tidyB64(a.replace(/[-_]/g, (m0) => m0 == "-" ? "+" : "/"));
	//#endregion
	//#region src/isolate-preload/vendors/md5.js
	var hex_chr = [
		"0",
		"1",
		"2",
		"3",
		"4",
		"5",
		"6",
		"7",
		"8",
		"9",
		"a",
		"b",
		"c",
		"d",
		"e",
		"f"
	];
	function md5cycle(x, k) {
		var a = x[0], b = x[1], c = x[2], d = x[3];
		a += (b & c | ~b & d) + k[0] - 680876936 | 0;
		a = (a << 7 | a >>> 25) + b | 0;
		d += (a & b | ~a & c) + k[1] - 389564586 | 0;
		d = (d << 12 | d >>> 20) + a | 0;
		c += (d & a | ~d & b) + k[2] + 606105819 | 0;
		c = (c << 17 | c >>> 15) + d | 0;
		b += (c & d | ~c & a) + k[3] - 1044525330 | 0;
		b = (b << 22 | b >>> 10) + c | 0;
		a += (b & c | ~b & d) + k[4] - 176418897 | 0;
		a = (a << 7 | a >>> 25) + b | 0;
		d += (a & b | ~a & c) + k[5] + 1200080426 | 0;
		d = (d << 12 | d >>> 20) + a | 0;
		c += (d & a | ~d & b) + k[6] - 1473231341 | 0;
		c = (c << 17 | c >>> 15) + d | 0;
		b += (c & d | ~c & a) + k[7] - 45705983 | 0;
		b = (b << 22 | b >>> 10) + c | 0;
		a += (b & c | ~b & d) + k[8] + 1770035416 | 0;
		a = (a << 7 | a >>> 25) + b | 0;
		d += (a & b | ~a & c) + k[9] - 1958414417 | 0;
		d = (d << 12 | d >>> 20) + a | 0;
		c += (d & a | ~d & b) + k[10] - 42063 | 0;
		c = (c << 17 | c >>> 15) + d | 0;
		b += (c & d | ~c & a) + k[11] - 1990404162 | 0;
		b = (b << 22 | b >>> 10) + c | 0;
		a += (b & c | ~b & d) + k[12] + 1804603682 | 0;
		a = (a << 7 | a >>> 25) + b | 0;
		d += (a & b | ~a & c) + k[13] - 40341101 | 0;
		d = (d << 12 | d >>> 20) + a | 0;
		c += (d & a | ~d & b) + k[14] - 1502002290 | 0;
		c = (c << 17 | c >>> 15) + d | 0;
		b += (c & d | ~c & a) + k[15] + 1236535329 | 0;
		b = (b << 22 | b >>> 10) + c | 0;
		a += (b & d | c & ~d) + k[1] - 165796510 | 0;
		a = (a << 5 | a >>> 27) + b | 0;
		d += (a & c | b & ~c) + k[6] - 1069501632 | 0;
		d = (d << 9 | d >>> 23) + a | 0;
		c += (d & b | a & ~b) + k[11] + 643717713 | 0;
		c = (c << 14 | c >>> 18) + d | 0;
		b += (c & a | d & ~a) + k[0] - 373897302 | 0;
		b = (b << 20 | b >>> 12) + c | 0;
		a += (b & d | c & ~d) + k[5] - 701558691 | 0;
		a = (a << 5 | a >>> 27) + b | 0;
		d += (a & c | b & ~c) + k[10] + 38016083 | 0;
		d = (d << 9 | d >>> 23) + a | 0;
		c += (d & b | a & ~b) + k[15] - 660478335 | 0;
		c = (c << 14 | c >>> 18) + d | 0;
		b += (c & a | d & ~a) + k[4] - 405537848 | 0;
		b = (b << 20 | b >>> 12) + c | 0;
		a += (b & d | c & ~d) + k[9] + 568446438 | 0;
		a = (a << 5 | a >>> 27) + b | 0;
		d += (a & c | b & ~c) + k[14] - 1019803690 | 0;
		d = (d << 9 | d >>> 23) + a | 0;
		c += (d & b | a & ~b) + k[3] - 187363961 | 0;
		c = (c << 14 | c >>> 18) + d | 0;
		b += (c & a | d & ~a) + k[8] + 1163531501 | 0;
		b = (b << 20 | b >>> 12) + c | 0;
		a += (b & d | c & ~d) + k[13] - 1444681467 | 0;
		a = (a << 5 | a >>> 27) + b | 0;
		d += (a & c | b & ~c) + k[2] - 51403784 | 0;
		d = (d << 9 | d >>> 23) + a | 0;
		c += (d & b | a & ~b) + k[7] + 1735328473 | 0;
		c = (c << 14 | c >>> 18) + d | 0;
		b += (c & a | d & ~a) + k[12] - 1926607734 | 0;
		b = (b << 20 | b >>> 12) + c | 0;
		a += (b ^ c ^ d) + k[5] - 378558 | 0;
		a = (a << 4 | a >>> 28) + b | 0;
		d += (a ^ b ^ c) + k[8] - 2022574463 | 0;
		d = (d << 11 | d >>> 21) + a | 0;
		c += (d ^ a ^ b) + k[11] + 1839030562 | 0;
		c = (c << 16 | c >>> 16) + d | 0;
		b += (c ^ d ^ a) + k[14] - 35309556 | 0;
		b = (b << 23 | b >>> 9) + c | 0;
		a += (b ^ c ^ d) + k[1] - 1530992060 | 0;
		a = (a << 4 | a >>> 28) + b | 0;
		d += (a ^ b ^ c) + k[4] + 1272893353 | 0;
		d = (d << 11 | d >>> 21) + a | 0;
		c += (d ^ a ^ b) + k[7] - 155497632 | 0;
		c = (c << 16 | c >>> 16) + d | 0;
		b += (c ^ d ^ a) + k[10] - 1094730640 | 0;
		b = (b << 23 | b >>> 9) + c | 0;
		a += (b ^ c ^ d) + k[13] + 681279174 | 0;
		a = (a << 4 | a >>> 28) + b | 0;
		d += (a ^ b ^ c) + k[0] - 358537222 | 0;
		d = (d << 11 | d >>> 21) + a | 0;
		c += (d ^ a ^ b) + k[3] - 722521979 | 0;
		c = (c << 16 | c >>> 16) + d | 0;
		b += (c ^ d ^ a) + k[6] + 76029189 | 0;
		b = (b << 23 | b >>> 9) + c | 0;
		a += (b ^ c ^ d) + k[9] - 640364487 | 0;
		a = (a << 4 | a >>> 28) + b | 0;
		d += (a ^ b ^ c) + k[12] - 421815835 | 0;
		d = (d << 11 | d >>> 21) + a | 0;
		c += (d ^ a ^ b) + k[15] + 530742520 | 0;
		c = (c << 16 | c >>> 16) + d | 0;
		b += (c ^ d ^ a) + k[2] - 995338651 | 0;
		b = (b << 23 | b >>> 9) + c | 0;
		a += (c ^ (b | ~d)) + k[0] - 198630844 | 0;
		a = (a << 6 | a >>> 26) + b | 0;
		d += (b ^ (a | ~c)) + k[7] + 1126891415 | 0;
		d = (d << 10 | d >>> 22) + a | 0;
		c += (a ^ (d | ~b)) + k[14] - 1416354905 | 0;
		c = (c << 15 | c >>> 17) + d | 0;
		b += (d ^ (c | ~a)) + k[5] - 57434055 | 0;
		b = (b << 21 | b >>> 11) + c | 0;
		a += (c ^ (b | ~d)) + k[12] + 1700485571 | 0;
		a = (a << 6 | a >>> 26) + b | 0;
		d += (b ^ (a | ~c)) + k[3] - 1894986606 | 0;
		d = (d << 10 | d >>> 22) + a | 0;
		c += (a ^ (d | ~b)) + k[10] - 1051523 | 0;
		c = (c << 15 | c >>> 17) + d | 0;
		b += (d ^ (c | ~a)) + k[1] - 2054922799 | 0;
		b = (b << 21 | b >>> 11) + c | 0;
		a += (c ^ (b | ~d)) + k[8] + 1873313359 | 0;
		a = (a << 6 | a >>> 26) + b | 0;
		d += (b ^ (a | ~c)) + k[15] - 30611744 | 0;
		d = (d << 10 | d >>> 22) + a | 0;
		c += (a ^ (d | ~b)) + k[6] - 1560198380 | 0;
		c = (c << 15 | c >>> 17) + d | 0;
		b += (d ^ (c | ~a)) + k[13] + 1309151649 | 0;
		b = (b << 21 | b >>> 11) + c | 0;
		a += (c ^ (b | ~d)) + k[4] - 145523070 | 0;
		a = (a << 6 | a >>> 26) + b | 0;
		d += (b ^ (a | ~c)) + k[11] - 1120210379 | 0;
		d = (d << 10 | d >>> 22) + a | 0;
		c += (a ^ (d | ~b)) + k[2] + 718787259 | 0;
		c = (c << 15 | c >>> 17) + d | 0;
		b += (d ^ (c | ~a)) + k[9] - 343485551 | 0;
		b = (b << 21 | b >>> 11) + c | 0;
		x[0] = a + x[0] | 0;
		x[1] = b + x[1] | 0;
		x[2] = c + x[2] | 0;
		x[3] = d + x[3] | 0;
	}
	function md5blk(s) {
		var md5blks = [], i;
		for (i = 0; i < 64; i += 4) md5blks[i >> 2] = s.charCodeAt(i) + (s.charCodeAt(i + 1) << 8) + (s.charCodeAt(i + 2) << 16) + (s.charCodeAt(i + 3) << 24);
		return md5blks;
	}
	function md5blk_array(a) {
		var md5blks = [], i;
		for (i = 0; i < 64; i += 4) md5blks[i >> 2] = a[i] + (a[i + 1] << 8) + (a[i + 2] << 16) + (a[i + 3] << 24);
		return md5blks;
	}
	function md51(s) {
		var n = s.length, state = [
			1732584193,
			-271733879,
			-1732584194,
			271733878
		], i, length, tail, tmp, lo, hi;
		for (i = 64; i <= n; i += 64) md5cycle(state, md5blk(s.substring(i - 64, i)));
		s = s.substring(i - 64);
		length = s.length;
		tail = [
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0
		];
		for (i = 0; i < length; i += 1) tail[i >> 2] |= s.charCodeAt(i) << (i % 4 << 3);
		tail[i >> 2] |= 128 << (i % 4 << 3);
		if (i > 55) {
			md5cycle(state, tail);
			for (i = 0; i < 16; i += 1) tail[i] = 0;
		}
		tmp = n * 8;
		tmp = tmp.toString(16).match(/(.*?)(.{0,8})$/);
		lo = parseInt(tmp[2], 16);
		hi = parseInt(tmp[1], 16) || 0;
		tail[14] = lo;
		tail[15] = hi;
		md5cycle(state, tail);
		return state;
	}
	function md51_array(a) {
		var n = a.length, state = [
			1732584193,
			-271733879,
			-1732584194,
			271733878
		], i, length, tail, tmp, lo, hi;
		for (i = 64; i <= n; i += 64) md5cycle(state, md5blk_array(a.subarray(i - 64, i)));
		a = i - 64 < n ? a.subarray(i - 64) : /* @__PURE__ */ new Uint8Array(0);
		length = a.length;
		tail = [
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0
		];
		for (i = 0; i < length; i += 1) tail[i >> 2] |= a[i] << (i % 4 << 3);
		tail[i >> 2] |= 128 << (i % 4 << 3);
		if (i > 55) {
			md5cycle(state, tail);
			for (i = 0; i < 16; i += 1) tail[i] = 0;
		}
		tmp = n * 8;
		tmp = tmp.toString(16).match(/(.*?)(.{0,8})$/);
		lo = parseInt(tmp[2], 16);
		hi = parseInt(tmp[1], 16) || 0;
		tail[14] = lo;
		tail[15] = hi;
		md5cycle(state, tail);
		return state;
	}
	function rhex(n) {
		var s = "", j;
		for (j = 0; j < 4; j += 1) s += hex_chr[n >> j * 8 + 4 & 15] + hex_chr[n >> j * 8 & 15];
		return s;
	}
	function hex(x) {
		var i;
		for (i = 0; i < x.length; i += 1) x[i] = rhex(x[i]);
		return x.join("");
	}
	if (hex(md51("hello")) !== "5d41402abc4b2a76b9719d911017c592");
	/**
	* ArrayBuffer slice polyfill.
	*
	* @see https://github.com/ttaubert/node-arraybuffer-slice
	*/
	if (typeof ArrayBuffer !== "undefined" && !ArrayBuffer.prototype.slice) (function() {
		function clamp(val, length) {
			val = val | 0 || 0;
			if (val < 0) return Math.max(val + length, 0);
			return Math.min(val, length);
		}
		ArrayBuffer.prototype.slice = function(from, to) {
			var length = this.byteLength, begin = clamp(from, length), end = length, num, target, targetArray, sourceArray;
			if (to !== void 0) end = clamp(to, length);
			if (begin > end) return /* @__PURE__ */ new ArrayBuffer(0);
			num = end - begin;
			target = new ArrayBuffer(num);
			targetArray = new Uint8Array(target);
			sourceArray = new Uint8Array(this, begin, num);
			targetArray.set(sourceArray);
			return target;
		};
	})();
	/**
	* Helpers.
	*/
	function toUtf8(str) {
		if (/[\u0080-\uFFFF]/.test(str)) str = unescape(encodeURIComponent(str));
		return str;
	}
	function utf8Str2ArrayBuffer(str, returnUInt8Array) {
		var length = str.length, buff = new ArrayBuffer(length), arr = new Uint8Array(buff), i;
		for (i = 0; i < length; i += 1) arr[i] = str.charCodeAt(i);
		return returnUInt8Array ? arr : buff;
	}
	function arrayBuffer2Utf8Str(buff) {
		return String.fromCharCode.apply(null, new Uint8Array(buff));
	}
	function concatenateArrayBuffers(first, second, returnUInt8Array) {
		var result = new Uint8Array(first.byteLength + second.byteLength);
		result.set(new Uint8Array(first));
		result.set(new Uint8Array(second), first.byteLength);
		return returnUInt8Array ? result : result.buffer;
	}
	function hexToBinaryString(hex) {
		var bytes = [], length = hex.length, x;
		for (x = 0; x < length - 1; x += 2) bytes.push(parseInt(hex.substr(x, 2), 16));
		return String.fromCharCode.apply(String, bytes);
	}
	/**
	* SparkMD5 OOP implementation.
	*
	* Use this class to perform an incremental md5, otherwise use the
	* static methods instead.
	*/
	function SparkMD5() {
		this.reset();
	}
	/**
	* Appends a string.
	* A conversion will be applied if an utf8 string is detected.
	*
	* @param {String} str The string to be appended
	*
	* @return {SparkMD5} The instance itself
	*/
	SparkMD5.prototype.append = function(str) {
		this.appendBinary(toUtf8(str));
		return this;
	};
	/**
	* Appends a binary string.
	*
	* @param {String} contents The binary string to be appended
	*
	* @return {SparkMD5} The instance itself
	*/
	SparkMD5.prototype.appendBinary = function(contents) {
		this._buff += contents;
		this._length += contents.length;
		var length = this._buff.length, i;
		for (i = 64; i <= length; i += 64) md5cycle(this._hash, md5blk(this._buff.substring(i - 64, i)));
		this._buff = this._buff.substring(i - 64);
		return this;
	};
	/**
	* Finishes the incremental computation, reseting the internal state and
	* returning the result.
	*
	* @param {Boolean} raw True to get the raw string, false to get the hex string
	*
	* @return {String} The result
	*/
	SparkMD5.prototype.end = function(raw) {
		var buff = this._buff, length = buff.length, i, tail = [
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0
		], ret;
		for (i = 0; i < length; i += 1) tail[i >> 2] |= buff.charCodeAt(i) << (i % 4 << 3);
		this._finish(tail, length);
		ret = hex(this._hash);
		if (raw) ret = hexToBinaryString(ret);
		this.reset();
		return ret;
	};
	/**
	* Resets the internal state of the computation.
	*
	* @return {SparkMD5} The instance itself
	*/
	SparkMD5.prototype.reset = function() {
		this._buff = "";
		this._length = 0;
		this._hash = [
			1732584193,
			-271733879,
			-1732584194,
			271733878
		];
		return this;
	};
	/**
	* Gets the internal state of the computation.
	*
	* @return {Object} The state
	*/
	SparkMD5.prototype.getState = function() {
		return {
			buff: this._buff,
			length: this._length,
			hash: this._hash.slice()
		};
	};
	/**
	* Gets the internal state of the computation.
	*
	* @param {Object} state The state
	*
	* @return {SparkMD5} The instance itself
	*/
	SparkMD5.prototype.setState = function(state) {
		this._buff = state.buff;
		this._length = state.length;
		this._hash = state.hash;
		return this;
	};
	/**
	* Releases memory used by the incremental buffer and other additional
	* resources. If you plan to use the instance again, use reset instead.
	*/
	SparkMD5.prototype.destroy = function() {
		delete this._hash;
		delete this._buff;
		delete this._length;
	};
	/**
	* Finish the final calculation based on the tail.
	*
	* @param {Array}  tail   The tail (will be modified)
	* @param {Number} length The length of the remaining buffer
	*/
	SparkMD5.prototype._finish = function(tail, length) {
		var i = length, tmp, lo, hi;
		tail[i >> 2] |= 128 << (i % 4 << 3);
		if (i > 55) {
			md5cycle(this._hash, tail);
			for (i = 0; i < 16; i += 1) tail[i] = 0;
		}
		tmp = this._length * 8;
		tmp = tmp.toString(16).match(/(.*?)(.{0,8})$/);
		lo = parseInt(tmp[2], 16);
		hi = parseInt(tmp[1], 16) || 0;
		tail[14] = lo;
		tail[15] = hi;
		md5cycle(this._hash, tail);
	};
	/**
	* Performs the md5 hash on a string.
	* A conversion will be applied if utf8 string is detected.
	*
	* @param {String}  str The string
	* @param {Boolean} [raw] True to get the raw string, false to get the hex string
	*
	* @return {String} The result
	*/
	SparkMD5.hash = function(str, raw) {
		return SparkMD5.hashBinary(toUtf8(str), raw);
	};
	/**
	* Performs the md5 hash on a binary string.
	*
	* @param {String}  content The binary string
	* @param {Boolean} [raw]     True to get the raw string, false to get the hex string
	*
	* @return {String} The result
	*/
	SparkMD5.hashBinary = function(content, raw) {
		var ret = hex(md51(content));
		return raw ? hexToBinaryString(ret) : ret;
	};
	/**
	* SparkMD5 OOP implementation for array buffers.
	*
	* Use this class to perform an incremental md5 ONLY for array buffers.
	*/
	SparkMD5.ArrayBuffer = function() {
		this.reset();
	};
	/**
	* Appends an array buffer.
	*
	* @param {ArrayBuffer} arr The array to be appended
	*
	* @return {SparkMD5.ArrayBuffer} The instance itself
	*/
	SparkMD5.ArrayBuffer.prototype.append = function(arr) {
		var buff = concatenateArrayBuffers(this._buff.buffer, arr, true), length = buff.length, i;
		this._length += arr.byteLength;
		for (i = 64; i <= length; i += 64) md5cycle(this._hash, md5blk_array(buff.subarray(i - 64, i)));
		this._buff = i - 64 < length ? new Uint8Array(buff.buffer.slice(i - 64)) : /* @__PURE__ */ new Uint8Array(0);
		return this;
	};
	/**
	* Finishes the incremental computation, reseting the internal state and
	* returning the result.
	*
	* @param {Boolean} raw True to get the raw string, false to get the hex string
	*
	* @return {String} The result
	*/
	SparkMD5.ArrayBuffer.prototype.end = function(raw) {
		var buff = this._buff, length = buff.length, tail = [
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0
		], i, ret;
		for (i = 0; i < length; i += 1) tail[i >> 2] |= buff[i] << (i % 4 << 3);
		this._finish(tail, length);
		ret = hex(this._hash);
		if (raw) ret = hexToBinaryString(ret);
		this.reset();
		return ret;
	};
	/**
	* Resets the internal state of the computation.
	*
	* @return {SparkMD5.ArrayBuffer} The instance itself
	*/
	SparkMD5.ArrayBuffer.prototype.reset = function() {
		this._buff = /* @__PURE__ */ new Uint8Array(0);
		this._length = 0;
		this._hash = [
			1732584193,
			-271733879,
			-1732584194,
			271733878
		];
		return this;
	};
	/**
	* Gets the internal state of the computation.
	*
	* @return {Object} The state
	*/
	SparkMD5.ArrayBuffer.prototype.getState = function() {
		var state = SparkMD5.prototype.getState.call(this);
		state.buff = arrayBuffer2Utf8Str(state.buff);
		return state;
	};
	/**
	* Gets the internal state of the computation.
	*
	* @param {Object} state The state
	*
	* @return {SparkMD5.ArrayBuffer} The instance itself
	*/
	SparkMD5.ArrayBuffer.prototype.setState = function(state) {
		state.buff = utf8Str2ArrayBuffer(state.buff, true);
		return SparkMD5.prototype.setState.call(this, state);
	};
	SparkMD5.ArrayBuffer.prototype.destroy = SparkMD5.prototype.destroy;
	SparkMD5.ArrayBuffer.prototype._finish = SparkMD5.prototype._finish;
	/**
	* Performs the md5 hash on an array buffer.
	*
	* @param {ArrayBuffer} arr The array buffer
	* @param {Boolean}     [raw] True to get the raw string, false to get the hex one
	*
	* @return {String} The result
	*/
	SparkMD5.ArrayBuffer.hash = function(arr, raw) {
		var ret = hex(md51_array(new Uint8Array(arr)));
		return raw ? hexToBinaryString(ret) : ret;
	};
	var md5_default = (str) => {
		return SparkMD5.hash(str);
	};
	//#endregion
	//#region src/isolate-preload/setupEnv.ts
	var setupEnv = (scriptInfo, rawScript) => {
		setScriptInfo(scriptInfo);
		const EVENT_NAMES = {
			request: "request",
			inited: "inited",
			updateAlert: "updateAlert"
		};
		let isInitedApi = false;
		let isShowedUpdateAlert = false;
		const eventNames = Object.values(EVENT_NAMES);
		const allSources = [
			"kw",
			"kg",
			"tx",
			"wy",
			"mg"
		];
		const supportQualitys = {
			kw: [
				"128k",
				"320k",
				"flac",
				"flac24bit"
			],
			kg: [
				"128k",
				"320k",
				"flac",
				"flac24bit"
			],
			tx: [
				"128k",
				"320k",
				"flac",
				"flac24bit"
			],
			wy: [
				"128k",
				"320k",
				"flac",
				"flac24bit"
			],
			mg: [
				"128k",
				"320k",
				"flac",
				"flac24bit"
			]
		};
		const handleInit = (info) => {
			if (!info) {
				_ipc.inited(null, false, "Missing required parameter init info");
				return;
			}
			const sourceInfo = { sources: {} };
			try {
				for (const source of allSources) {
					const userSource = info.sources[source];
					if (userSource?.type !== "music") continue;
					const qualitys = supportQualitys[source];
					sourceInfo.sources[source] = qualitys.filter((q) => userSource.qualitys.includes(q));
				}
			} catch (error) {
				_ipc.inited(null, false, error.message);
				return;
			}
			_ipc.inited(sourceInfo.sources, true);
		};
		const handleShowUpdateAlert = async (data) => {
			if (!data || typeof data != "object") throw new Error("parameter format error.");
			if (!data.log || typeof data.log != "string") throw new Error("log is required.");
			if (data.updateUrl && !/^https?:\/\/[^\s$.?#].[^\s]*$/.test(data.updateUrl) && data.updateUrl.length > 1024) delete data.updateUrl;
			if (data.log.length > 1024) data.log = `${data.log.substring(0, 1024)}...`;
			await _ipc.showUpdateAlert(data.log, data.updateUrl);
		};
		function bytesToString(bytes) {
			let result = "";
			let i = 0;
			while (i < bytes.length) {
				const byte = bytes[i];
				if (byte < 128) {
					result += String.fromCharCode(byte);
					i++;
				} else if (byte >= 192 && byte < 224) {
					result += String.fromCharCode((byte & 31) << 6 | bytes[i + 1] & 63);
					i += 2;
				} else {
					result += String.fromCharCode((byte & 15) << 12 | (bytes[i + 1] & 63) << 6 | bytes[i + 2] & 63);
					i += 3;
				}
			}
			return result;
		}
		function stringToBytes(inputString) {
			const bytes = [];
			for (let i = 0; i < inputString.length; i++) {
				const charCode = inputString.charCodeAt(i);
				if (charCode < 128) bytes.push(charCode);
				else if (charCode < 2048) {
					bytes.push(charCode >> 6 | 192);
					bytes.push(charCode & 63 | 128);
				} else {
					bytes.push(charCode >> 12 | 224);
					bytes.push(charCode >> 6 & 63 | 128);
					bytes.push(charCode & 63 | 128);
				}
			}
			return bytes;
		}
		globalThis.lx = {
			EVENT_NAMES,
			request(url, { method = "GET", timeout, headers = {}, body, form, formData, binary }, callback) {
				const options = {
					headers,
					url,
					method,
					form,
					formdata: formData
				};
				if (timeout && typeof timeout == "number" && timeout > 0) options.timeout = Math.min(timeout, 6e4);
				if (!headers.accept) options.headers.accept = "*/*";
				if (binary) options.binary = body;
				else if (typeof body === "string") options.text = body;
				else if (typeof body === "object") options.json = body;
				_ipc.request(options).then((resp) => {
					callback(null, {
						statusCode: resp.statusCode,
						statusMessage: "",
						headers: resp.headers,
						body: resp.body
					}, resp.body);
				}).catch((err) => {
					callback(err, null, null);
				});
				return () => {};
			},
			async send(eventName, data) {
				if (!eventNames.includes(eventName)) throw new Error(`The event is not supported: ${eventName}`);
				switch (eventName) {
					case EVENT_NAMES.inited:
						if (isInitedApi) throw new Error("Script is inited");
						isInitedApi = true;
						handleInit(data);
						break;
					case EVENT_NAMES.updateAlert:
						if (isShowedUpdateAlert) throw new Error("The update alert can only be called once.");
						isShowedUpdateAlert = true;
						await handleShowUpdateAlert(data);
						break;
					default: throw new Error(`Unknown event name: ${eventName}`);
				}
			},
			async on(eventName, handler) {
				if (!eventNames.includes(eventName)) throw new Error(`The event is not supported: ${eventName}`);
				switch (eventName) {
					case EVENT_NAMES.request:
						setMusicUrlHandler(async (musicInfo, type) => {
							return handler.call(globalThis.lx, {
								source: musicInfo.source,
								action: "musicUrl",
								info: {
									type,
									musicInfo
								}
							}).then((response) => {
								if (typeof response != "string" || response.length > 2048 || !/^https?:/.test(response)) throw new Error("Invalid response");
								return response;
							});
						});
						break;
					default: throw new Error(`The event is not supported: ${eventName}`);
				}
			},
			utils: {
				crypto: {
					randomBytes(size) {
						const byteArray = new Uint8Array(size);
						for (let i = 0; i < size; i++) byteArray[i] = Math.floor(Math.random() * 256);
						return byteArray;
					},
					md5(str) {
						if (typeof str !== "string") throw new Error("param required a string");
						return md5_default(str);
					}
				},
				buffer: {
					from(input, encoding) {
						if (typeof input === "string") switch (encoding) {
							case "binary": throw new Error("Binary encoding is not supported for input strings");
							case "base64": return toUint8Array(input);
							case "hex": return new Uint8Array(input.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)));
							default: return new Uint8Array(stringToBytes(input));
						}
						else if (Array.isArray(input)) return new Uint8Array(input);
						else throw new Error(`Unsupported input type: ${input} encoding: ${encoding}`);
					},
					bufToString(buf, format) {
						if (Array.isArray(buf) || ArrayBuffer.isView(buf)) switch (format) {
							case "binary": return buf;
							case "hex": return new Uint8Array(buf).reduce((str, byte) => str + byte.toString(16).padStart(2, "0"), "");
							case "base64": return fromUint8Array(buf);
							case "utf8":
							case "utf-8": return bytesToString(Array.from(buf));
						}
						else throw new Error(`Input is not a valid buffer: ${buf} format: ${format}`);
					}
				}
			},
			currentScriptInfo: {
				name: scriptInfo.name || "",
				description: scriptInfo.description || "",
				version: scriptInfo.version || "",
				author: scriptInfo.author || "",
				homepage: scriptInfo.homepage || "",
				rawScript
			},
			version: "2.0.0",
			env: "desktop"
		};
		const freezeObject = (obj) => {
			if (typeof obj != "object") return;
			Object.freeze(obj);
			for (const subObj of Object.values(obj)) freezeObject(subObj);
		};
		freezeObject(globalThis.lx);
		const _toString = Function.prototype.toString;
		Function.prototype.toString = function() {
			return Object.getOwnPropertyDescriptors(this).name.configurable ? _toString.apply(this) : `function ${this.name}() { [native code] }`;
		};
		globalThis.eval = function() {
			throw new Error("eval is not available");
		};
		const proxyFunctionConstructor = new Proxy(Function.prototype.constructor, {
			apply() {
				throw new Error("Dynamic code execution is not allowed.");
			},
			construct() {
				throw new Error("Dynamic code execution is not allowed.");
			}
		});
		Object.defineProperty(Function.prototype, "constructor", {
			value: proxyFunctionConstructor,
			writable: false,
			configurable: false,
			enumerable: false
		});
		globalThis.Function = proxyFunctionConstructor;
		const excludes = [
			Function.prototype.toString,
			Function.prototype.toLocaleString,
			Object.prototype.toString
		];
		const freezeObjectProperty = (obj, freezedObj = /* @__PURE__ */ new Set()) => {
			if (obj == null) return;
			switch (typeof obj) {
				case "object":
				case "function":
					if (freezedObj.has(obj)) return;
					freezedObj.add(obj);
					for (const [name, { ...config }] of Object.entries(Object.getOwnPropertyDescriptors(obj))) {
						if (!excludes.includes(config.value)) {
							config.writable &&= false;
							config.configurable &&= false;
							Object.defineProperty(obj, name, config);
						}
						freezeObjectProperty(config.value, freezedObj);
					}
			}
		};
		freezeObjectProperty(globalThis);
	};
	//#endregion
	//#region src/isolate-preload/exposeObject.ts
	var handler;
	var setMusicUrlHandler = (_handler) => {
		handler = _handler;
	};
	var exposeObject = {
		async getMusicUrl(musicInfo, type) {
			if (!handler) throw new Error("Handler not set");
			return handler(musicInfo, type);
		},
		async setupEnv(info, rawScript) {
			setupEnv(info, rawScript);
		},
		async setEnabledSourceLogout(enabled) {
			setEnabledSourceLogout(enabled);
		}
	};
	//#endregion
	//#region src/isolate-preload/index.ts
	globalThis.console = createConsole();
	var msg2call = createMessage2Call({
		exposeObj: { ...exposeObject },
		sendMessage(data) {
			postMessage(data);
		},
		isSendErrorStack: true,
		timeout: 0
	});
	onmessage((data) => {
		msg2call.message(data);
	});
	setExtensionObject(msg2call.remote);
	//#endregion
})();
