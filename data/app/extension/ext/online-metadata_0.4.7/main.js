(function() {
	//#region \0rolldown/runtime.js
	var __create = Object.create;
	var __defProp = Object.defineProperty;
	var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
	var __getOwnPropNames = Object.getOwnPropertyNames;
	var __getProtoOf = Object.getPrototypeOf;
	var __hasOwnProp = Object.prototype.hasOwnProperty;
	var __commonJSMin = (cb, mod) => () => (mod || (cb((mod = { exports: {} }).exports, mod), cb = null), mod.exports);
	var __copyProps = (to, from, except, desc) => {
		if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
			key = keys[i];
			if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
				get: ((k) => from[k]).bind(null, key),
				enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
			});
		}
		return to;
	};
	var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule || !__hasOwnProp.call(mod, "default") ? __defProp(target, "default", {
		value: mod,
		enumerable: true
	}) : target, mod));
	//#endregion
	//#region src/shared/hostApi.ts
	var api = require("any-listen");
	var console = {
		log: api.logcat.info,
		error: api.logcat.error,
		warn: api.logcat.warn
	};
	api.env.version;
	var registerResourceAction = api.registerResourceAction;
	var request = api.request;
	var t = api.t;
	var crypto = api.utils.crypto;
	var dataConverter = api.utils.dataConverter;
	var iconv = api.utils.iconv;
	var zlib = api.utils.zlib;
	/*! https://mths.be/he v1.2.0 by @mathias | MIT license */
	//#endregion
	//#region src/shared/common.ts
	var import_he = /* @__PURE__ */ __toESM((/* @__PURE__ */ __commonJSMin(((exports, module) => {
		(function(root) {
			var freeExports = typeof exports == "object" && exports;
			var freeModule = typeof module == "object" && module && module.exports == freeExports && module;
			var freeGlobal = typeof global == "object" && global;
			if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) root = freeGlobal;
			var regexAstralSymbols = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
			var regexAsciiWhitelist = /[\x01-\x7F]/g;
			var regexBmpWhitelist = /[\x01-\t\x0B\f\x0E-\x1F\x7F\x81\x8D\x8F\x90\x9D\xA0-\uFFFF]/g;
			var regexEncodeNonAscii = /<\u20D2|=\u20E5|>\u20D2|\u205F\u200A|\u219D\u0338|\u2202\u0338|\u2220\u20D2|\u2229\uFE00|\u222A\uFE00|\u223C\u20D2|\u223D\u0331|\u223E\u0333|\u2242\u0338|\u224B\u0338|\u224D\u20D2|\u224E\u0338|\u224F\u0338|\u2250\u0338|\u2261\u20E5|\u2264\u20D2|\u2265\u20D2|\u2266\u0338|\u2267\u0338|\u2268\uFE00|\u2269\uFE00|\u226A\u0338|\u226A\u20D2|\u226B\u0338|\u226B\u20D2|\u227F\u0338|\u2282\u20D2|\u2283\u20D2|\u228A\uFE00|\u228B\uFE00|\u228F\u0338|\u2290\u0338|\u2293\uFE00|\u2294\uFE00|\u22B4\u20D2|\u22B5\u20D2|\u22D8\u0338|\u22D9\u0338|\u22DA\uFE00|\u22DB\uFE00|\u22F5\u0338|\u22F9\u0338|\u2933\u0338|\u29CF\u0338|\u29D0\u0338|\u2A6D\u0338|\u2A70\u0338|\u2A7D\u0338|\u2A7E\u0338|\u2AA1\u0338|\u2AA2\u0338|\u2AAC\uFE00|\u2AAD\uFE00|\u2AAF\u0338|\u2AB0\u0338|\u2AC5\u0338|\u2AC6\u0338|\u2ACB\uFE00|\u2ACC\uFE00|\u2AFD\u20E5|[\xA0-\u0113\u0116-\u0122\u0124-\u012B\u012E-\u014D\u0150-\u017E\u0192\u01B5\u01F5\u0237\u02C6\u02C7\u02D8-\u02DD\u0311\u0391-\u03A1\u03A3-\u03A9\u03B1-\u03C9\u03D1\u03D2\u03D5\u03D6\u03DC\u03DD\u03F0\u03F1\u03F5\u03F6\u0401-\u040C\u040E-\u044F\u0451-\u045C\u045E\u045F\u2002-\u2005\u2007-\u2010\u2013-\u2016\u2018-\u201A\u201C-\u201E\u2020-\u2022\u2025\u2026\u2030-\u2035\u2039\u203A\u203E\u2041\u2043\u2044\u204F\u2057\u205F-\u2063\u20AC\u20DB\u20DC\u2102\u2105\u210A-\u2113\u2115-\u211E\u2122\u2124\u2127-\u2129\u212C\u212D\u212F-\u2131\u2133-\u2138\u2145-\u2148\u2153-\u215E\u2190-\u219B\u219D-\u21A7\u21A9-\u21AE\u21B0-\u21B3\u21B5-\u21B7\u21BA-\u21DB\u21DD\u21E4\u21E5\u21F5\u21FD-\u2205\u2207-\u2209\u220B\u220C\u220F-\u2214\u2216-\u2218\u221A\u221D-\u2238\u223A-\u2257\u2259\u225A\u225C\u225F-\u2262\u2264-\u228B\u228D-\u229B\u229D-\u22A5\u22A7-\u22B0\u22B2-\u22BB\u22BD-\u22DB\u22DE-\u22E3\u22E6-\u22F7\u22F9-\u22FE\u2305\u2306\u2308-\u2310\u2312\u2313\u2315\u2316\u231C-\u231F\u2322\u2323\u232D\u232E\u2336\u233D\u233F\u237C\u23B0\u23B1\u23B4-\u23B6\u23DC-\u23DF\u23E2\u23E7\u2423\u24C8\u2500\u2502\u250C\u2510\u2514\u2518\u251C\u2524\u252C\u2534\u253C\u2550-\u256C\u2580\u2584\u2588\u2591-\u2593\u25A1\u25AA\u25AB\u25AD\u25AE\u25B1\u25B3-\u25B5\u25B8\u25B9\u25BD-\u25BF\u25C2\u25C3\u25CA\u25CB\u25EC\u25EF\u25F8-\u25FC\u2605\u2606\u260E\u2640\u2642\u2660\u2663\u2665\u2666\u266A\u266D-\u266F\u2713\u2717\u2720\u2736\u2758\u2772\u2773\u27C8\u27C9\u27E6-\u27ED\u27F5-\u27FA\u27FC\u27FF\u2902-\u2905\u290C-\u2913\u2916\u2919-\u2920\u2923-\u292A\u2933\u2935-\u2939\u293C\u293D\u2945\u2948-\u294B\u294E-\u2976\u2978\u2979\u297B-\u297F\u2985\u2986\u298B-\u2996\u299A\u299C\u299D\u29A4-\u29B7\u29B9\u29BB\u29BC\u29BE-\u29C5\u29C9\u29CD-\u29D0\u29DC-\u29DE\u29E3-\u29E5\u29EB\u29F4\u29F6\u2A00-\u2A02\u2A04\u2A06\u2A0C\u2A0D\u2A10-\u2A17\u2A22-\u2A27\u2A29\u2A2A\u2A2D-\u2A31\u2A33-\u2A3C\u2A3F\u2A40\u2A42-\u2A4D\u2A50\u2A53-\u2A58\u2A5A-\u2A5D\u2A5F\u2A66\u2A6A\u2A6D-\u2A75\u2A77-\u2A9A\u2A9D-\u2AA2\u2AA4-\u2AB0\u2AB3-\u2AC8\u2ACB\u2ACC\u2ACF-\u2ADB\u2AE4\u2AE6-\u2AE9\u2AEB-\u2AF3\u2AFD\uFB00-\uFB04]|\uD835[\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDCCF\uDD04\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDD6B]/g;
			var encodeMap = {
				"­": "shy",
				"‌": "zwnj",
				"‍": "zwj",
				"‎": "lrm",
				"⁣": "ic",
				"⁢": "it",
				"⁡": "af",
				"‏": "rlm",
				"​": "ZeroWidthSpace",
				"⁠": "NoBreak",
				"̑": "DownBreve",
				"⃛": "tdot",
				"⃜": "DotDot",
				"	": "Tab",
				"\n": "NewLine",
				" ": "puncsp",
				" ": "MediumSpace",
				" ": "thinsp",
				" ": "hairsp",
				" ": "emsp13",
				" ": "ensp",
				" ": "emsp14",
				" ": "emsp",
				" ": "numsp",
				"\xA0": "nbsp",
				"  ": "ThickSpace",
				"‾": "oline",
				"_": "lowbar",
				"‐": "dash",
				"–": "ndash",
				"—": "mdash",
				"―": "horbar",
				",": "comma",
				";": "semi",
				"⁏": "bsemi",
				":": "colon",
				"⩴": "Colone",
				"!": "excl",
				"¡": "iexcl",
				"?": "quest",
				"¿": "iquest",
				".": "period",
				"‥": "nldr",
				"…": "mldr",
				"·": "middot",
				"'": "apos",
				"‘": "lsquo",
				"’": "rsquo",
				"‚": "sbquo",
				"‹": "lsaquo",
				"›": "rsaquo",
				"\"": "quot",
				"“": "ldquo",
				"”": "rdquo",
				"„": "bdquo",
				"«": "laquo",
				"»": "raquo",
				"(": "lpar",
				")": "rpar",
				"[": "lsqb",
				"]": "rsqb",
				"{": "lcub",
				"}": "rcub",
				"⌈": "lceil",
				"⌉": "rceil",
				"⌊": "lfloor",
				"⌋": "rfloor",
				"⦅": "lopar",
				"⦆": "ropar",
				"⦋": "lbrke",
				"⦌": "rbrke",
				"⦍": "lbrkslu",
				"⦎": "rbrksld",
				"⦏": "lbrksld",
				"⦐": "rbrkslu",
				"⦑": "langd",
				"⦒": "rangd",
				"⦓": "lparlt",
				"⦔": "rpargt",
				"⦕": "gtlPar",
				"⦖": "ltrPar",
				"⟦": "lobrk",
				"⟧": "robrk",
				"⟨": "lang",
				"⟩": "rang",
				"⟪": "Lang",
				"⟫": "Rang",
				"⟬": "loang",
				"⟭": "roang",
				"❲": "lbbrk",
				"❳": "rbbrk",
				"‖": "Vert",
				"§": "sect",
				"¶": "para",
				"@": "commat",
				"*": "ast",
				"/": "sol",
				"undefined": null,
				"&": "amp",
				"#": "num",
				"%": "percnt",
				"‰": "permil",
				"‱": "pertenk",
				"†": "dagger",
				"‡": "Dagger",
				"•": "bull",
				"⁃": "hybull",
				"′": "prime",
				"″": "Prime",
				"‴": "tprime",
				"⁗": "qprime",
				"‵": "bprime",
				"⁁": "caret",
				"`": "grave",
				"´": "acute",
				"˜": "tilde",
				"^": "Hat",
				"¯": "macr",
				"˘": "breve",
				"˙": "dot",
				"¨": "die",
				"˚": "ring",
				"˝": "dblac",
				"¸": "cedil",
				"˛": "ogon",
				"ˆ": "circ",
				"ˇ": "caron",
				"°": "deg",
				"©": "copy",
				"®": "reg",
				"℗": "copysr",
				"℘": "wp",
				"℞": "rx",
				"℧": "mho",
				"℩": "iiota",
				"←": "larr",
				"↚": "nlarr",
				"→": "rarr",
				"↛": "nrarr",
				"↑": "uarr",
				"↓": "darr",
				"↔": "harr",
				"↮": "nharr",
				"↕": "varr",
				"↖": "nwarr",
				"↗": "nearr",
				"↘": "searr",
				"↙": "swarr",
				"↝": "rarrw",
				"↝̸": "nrarrw",
				"↞": "Larr",
				"↟": "Uarr",
				"↠": "Rarr",
				"↡": "Darr",
				"↢": "larrtl",
				"↣": "rarrtl",
				"↤": "mapstoleft",
				"↥": "mapstoup",
				"↦": "map",
				"↧": "mapstodown",
				"↩": "larrhk",
				"↪": "rarrhk",
				"↫": "larrlp",
				"↬": "rarrlp",
				"↭": "harrw",
				"↰": "lsh",
				"↱": "rsh",
				"↲": "ldsh",
				"↳": "rdsh",
				"↵": "crarr",
				"↶": "cularr",
				"↷": "curarr",
				"↺": "olarr",
				"↻": "orarr",
				"↼": "lharu",
				"↽": "lhard",
				"↾": "uharr",
				"↿": "uharl",
				"⇀": "rharu",
				"⇁": "rhard",
				"⇂": "dharr",
				"⇃": "dharl",
				"⇄": "rlarr",
				"⇅": "udarr",
				"⇆": "lrarr",
				"⇇": "llarr",
				"⇈": "uuarr",
				"⇉": "rrarr",
				"⇊": "ddarr",
				"⇋": "lrhar",
				"⇌": "rlhar",
				"⇐": "lArr",
				"⇍": "nlArr",
				"⇑": "uArr",
				"⇒": "rArr",
				"⇏": "nrArr",
				"⇓": "dArr",
				"⇔": "iff",
				"⇎": "nhArr",
				"⇕": "vArr",
				"⇖": "nwArr",
				"⇗": "neArr",
				"⇘": "seArr",
				"⇙": "swArr",
				"⇚": "lAarr",
				"⇛": "rAarr",
				"⇝": "zigrarr",
				"⇤": "larrb",
				"⇥": "rarrb",
				"⇵": "duarr",
				"⇽": "loarr",
				"⇾": "roarr",
				"⇿": "hoarr",
				"∀": "forall",
				"∁": "comp",
				"∂": "part",
				"∂̸": "npart",
				"∃": "exist",
				"∄": "nexist",
				"∅": "empty",
				"∇": "Del",
				"∈": "in",
				"∉": "notin",
				"∋": "ni",
				"∌": "notni",
				"϶": "bepsi",
				"∏": "prod",
				"∐": "coprod",
				"∑": "sum",
				"+": "plus",
				"±": "pm",
				"÷": "div",
				"×": "times",
				"<": "lt",
				"≮": "nlt",
				"<⃒": "nvlt",
				"=": "equals",
				"≠": "ne",
				"=⃥": "bne",
				"⩵": "Equal",
				">": "gt",
				"≯": "ngt",
				">⃒": "nvgt",
				"¬": "not",
				"|": "vert",
				"¦": "brvbar",
				"−": "minus",
				"∓": "mp",
				"∔": "plusdo",
				"⁄": "frasl",
				"∖": "setmn",
				"∗": "lowast",
				"∘": "compfn",
				"√": "Sqrt",
				"∝": "prop",
				"∞": "infin",
				"∟": "angrt",
				"∠": "ang",
				"∠⃒": "nang",
				"∡": "angmsd",
				"∢": "angsph",
				"∣": "mid",
				"∤": "nmid",
				"∥": "par",
				"∦": "npar",
				"∧": "and",
				"∨": "or",
				"∩": "cap",
				"∩︀": "caps",
				"∪": "cup",
				"∪︀": "cups",
				"∫": "int",
				"∬": "Int",
				"∭": "tint",
				"⨌": "qint",
				"∮": "oint",
				"∯": "Conint",
				"∰": "Cconint",
				"∱": "cwint",
				"∲": "cwconint",
				"∳": "awconint",
				"∴": "there4",
				"∵": "becaus",
				"∶": "ratio",
				"∷": "Colon",
				"∸": "minusd",
				"∺": "mDDot",
				"∻": "homtht",
				"∼": "sim",
				"≁": "nsim",
				"∼⃒": "nvsim",
				"∽": "bsim",
				"∽̱": "race",
				"∾": "ac",
				"∾̳": "acE",
				"∿": "acd",
				"≀": "wr",
				"≂": "esim",
				"≂̸": "nesim",
				"≃": "sime",
				"≄": "nsime",
				"≅": "cong",
				"≇": "ncong",
				"≆": "simne",
				"≈": "ap",
				"≉": "nap",
				"≊": "ape",
				"≋": "apid",
				"≋̸": "napid",
				"≌": "bcong",
				"≍": "CupCap",
				"≭": "NotCupCap",
				"≍⃒": "nvap",
				"≎": "bump",
				"≎̸": "nbump",
				"≏": "bumpe",
				"≏̸": "nbumpe",
				"≐": "doteq",
				"≐̸": "nedot",
				"≑": "eDot",
				"≒": "efDot",
				"≓": "erDot",
				"≔": "colone",
				"≕": "ecolon",
				"≖": "ecir",
				"≗": "cire",
				"≙": "wedgeq",
				"≚": "veeeq",
				"≜": "trie",
				"≟": "equest",
				"≡": "equiv",
				"≢": "nequiv",
				"≡⃥": "bnequiv",
				"≤": "le",
				"≰": "nle",
				"≤⃒": "nvle",
				"≥": "ge",
				"≱": "nge",
				"≥⃒": "nvge",
				"≦": "lE",
				"≦̸": "nlE",
				"≧": "gE",
				"≧̸": "ngE",
				"≨︀": "lvnE",
				"≨": "lnE",
				"≩": "gnE",
				"≩︀": "gvnE",
				"≪": "ll",
				"≪̸": "nLtv",
				"≪⃒": "nLt",
				"≫": "gg",
				"≫̸": "nGtv",
				"≫⃒": "nGt",
				"≬": "twixt",
				"≲": "lsim",
				"≴": "nlsim",
				"≳": "gsim",
				"≵": "ngsim",
				"≶": "lg",
				"≸": "ntlg",
				"≷": "gl",
				"≹": "ntgl",
				"≺": "pr",
				"⊀": "npr",
				"≻": "sc",
				"⊁": "nsc",
				"≼": "prcue",
				"⋠": "nprcue",
				"≽": "sccue",
				"⋡": "nsccue",
				"≾": "prsim",
				"≿": "scsim",
				"≿̸": "NotSucceedsTilde",
				"⊂": "sub",
				"⊄": "nsub",
				"⊂⃒": "vnsub",
				"⊃": "sup",
				"⊅": "nsup",
				"⊃⃒": "vnsup",
				"⊆": "sube",
				"⊈": "nsube",
				"⊇": "supe",
				"⊉": "nsupe",
				"⊊︀": "vsubne",
				"⊊": "subne",
				"⊋︀": "vsupne",
				"⊋": "supne",
				"⊍": "cupdot",
				"⊎": "uplus",
				"⊏": "sqsub",
				"⊏̸": "NotSquareSubset",
				"⊐": "sqsup",
				"⊐̸": "NotSquareSuperset",
				"⊑": "sqsube",
				"⋢": "nsqsube",
				"⊒": "sqsupe",
				"⋣": "nsqsupe",
				"⊓": "sqcap",
				"⊓︀": "sqcaps",
				"⊔": "sqcup",
				"⊔︀": "sqcups",
				"⊕": "oplus",
				"⊖": "ominus",
				"⊗": "otimes",
				"⊘": "osol",
				"⊙": "odot",
				"⊚": "ocir",
				"⊛": "oast",
				"⊝": "odash",
				"⊞": "plusb",
				"⊟": "minusb",
				"⊠": "timesb",
				"⊡": "sdotb",
				"⊢": "vdash",
				"⊬": "nvdash",
				"⊣": "dashv",
				"⊤": "top",
				"⊥": "bot",
				"⊧": "models",
				"⊨": "vDash",
				"⊭": "nvDash",
				"⊩": "Vdash",
				"⊮": "nVdash",
				"⊪": "Vvdash",
				"⊫": "VDash",
				"⊯": "nVDash",
				"⊰": "prurel",
				"⊲": "vltri",
				"⋪": "nltri",
				"⊳": "vrtri",
				"⋫": "nrtri",
				"⊴": "ltrie",
				"⋬": "nltrie",
				"⊴⃒": "nvltrie",
				"⊵": "rtrie",
				"⋭": "nrtrie",
				"⊵⃒": "nvrtrie",
				"⊶": "origof",
				"⊷": "imof",
				"⊸": "mumap",
				"⊹": "hercon",
				"⊺": "intcal",
				"⊻": "veebar",
				"⊽": "barvee",
				"⊾": "angrtvb",
				"⊿": "lrtri",
				"⋀": "Wedge",
				"⋁": "Vee",
				"⋂": "xcap",
				"⋃": "xcup",
				"⋄": "diam",
				"⋅": "sdot",
				"⋆": "Star",
				"⋇": "divonx",
				"⋈": "bowtie",
				"⋉": "ltimes",
				"⋊": "rtimes",
				"⋋": "lthree",
				"⋌": "rthree",
				"⋍": "bsime",
				"⋎": "cuvee",
				"⋏": "cuwed",
				"⋐": "Sub",
				"⋑": "Sup",
				"⋒": "Cap",
				"⋓": "Cup",
				"⋔": "fork",
				"⋕": "epar",
				"⋖": "ltdot",
				"⋗": "gtdot",
				"⋘": "Ll",
				"⋘̸": "nLl",
				"⋙": "Gg",
				"⋙̸": "nGg",
				"⋚︀": "lesg",
				"⋚": "leg",
				"⋛": "gel",
				"⋛︀": "gesl",
				"⋞": "cuepr",
				"⋟": "cuesc",
				"⋦": "lnsim",
				"⋧": "gnsim",
				"⋨": "prnsim",
				"⋩": "scnsim",
				"⋮": "vellip",
				"⋯": "ctdot",
				"⋰": "utdot",
				"⋱": "dtdot",
				"⋲": "disin",
				"⋳": "isinsv",
				"⋴": "isins",
				"⋵": "isindot",
				"⋵̸": "notindot",
				"⋶": "notinvc",
				"⋷": "notinvb",
				"⋹": "isinE",
				"⋹̸": "notinE",
				"⋺": "nisd",
				"⋻": "xnis",
				"⋼": "nis",
				"⋽": "notnivc",
				"⋾": "notnivb",
				"⌅": "barwed",
				"⌆": "Barwed",
				"⌌": "drcrop",
				"⌍": "dlcrop",
				"⌎": "urcrop",
				"⌏": "ulcrop",
				"⌐": "bnot",
				"⌒": "profline",
				"⌓": "profsurf",
				"⌕": "telrec",
				"⌖": "target",
				"⌜": "ulcorn",
				"⌝": "urcorn",
				"⌞": "dlcorn",
				"⌟": "drcorn",
				"⌢": "frown",
				"⌣": "smile",
				"⌭": "cylcty",
				"⌮": "profalar",
				"⌶": "topbot",
				"⌽": "ovbar",
				"⌿": "solbar",
				"⍼": "angzarr",
				"⎰": "lmoust",
				"⎱": "rmoust",
				"⎴": "tbrk",
				"⎵": "bbrk",
				"⎶": "bbrktbrk",
				"⏜": "OverParenthesis",
				"⏝": "UnderParenthesis",
				"⏞": "OverBrace",
				"⏟": "UnderBrace",
				"⏢": "trpezium",
				"⏧": "elinters",
				"␣": "blank",
				"─": "boxh",
				"│": "boxv",
				"┌": "boxdr",
				"┐": "boxdl",
				"└": "boxur",
				"┘": "boxul",
				"├": "boxvr",
				"┤": "boxvl",
				"┬": "boxhd",
				"┴": "boxhu",
				"┼": "boxvh",
				"═": "boxH",
				"║": "boxV",
				"╒": "boxdR",
				"╓": "boxDr",
				"╔": "boxDR",
				"╕": "boxdL",
				"╖": "boxDl",
				"╗": "boxDL",
				"╘": "boxuR",
				"╙": "boxUr",
				"╚": "boxUR",
				"╛": "boxuL",
				"╜": "boxUl",
				"╝": "boxUL",
				"╞": "boxvR",
				"╟": "boxVr",
				"╠": "boxVR",
				"╡": "boxvL",
				"╢": "boxVl",
				"╣": "boxVL",
				"╤": "boxHd",
				"╥": "boxhD",
				"╦": "boxHD",
				"╧": "boxHu",
				"╨": "boxhU",
				"╩": "boxHU",
				"╪": "boxvH",
				"╫": "boxVh",
				"╬": "boxVH",
				"▀": "uhblk",
				"▄": "lhblk",
				"█": "block",
				"░": "blk14",
				"▒": "blk12",
				"▓": "blk34",
				"□": "squ",
				"▪": "squf",
				"▫": "EmptyVerySmallSquare",
				"▭": "rect",
				"▮": "marker",
				"▱": "fltns",
				"△": "xutri",
				"▴": "utrif",
				"▵": "utri",
				"▸": "rtrif",
				"▹": "rtri",
				"▽": "xdtri",
				"▾": "dtrif",
				"▿": "dtri",
				"◂": "ltrif",
				"◃": "ltri",
				"◊": "loz",
				"○": "cir",
				"◬": "tridot",
				"◯": "xcirc",
				"◸": "ultri",
				"◹": "urtri",
				"◺": "lltri",
				"◻": "EmptySmallSquare",
				"◼": "FilledSmallSquare",
				"★": "starf",
				"☆": "star",
				"☎": "phone",
				"♀": "female",
				"♂": "male",
				"♠": "spades",
				"♣": "clubs",
				"♥": "hearts",
				"♦": "diams",
				"♪": "sung",
				"✓": "check",
				"✗": "cross",
				"✠": "malt",
				"✶": "sext",
				"❘": "VerticalSeparator",
				"⟈": "bsolhsub",
				"⟉": "suphsol",
				"⟵": "xlarr",
				"⟶": "xrarr",
				"⟷": "xharr",
				"⟸": "xlArr",
				"⟹": "xrArr",
				"⟺": "xhArr",
				"⟼": "xmap",
				"⟿": "dzigrarr",
				"⤂": "nvlArr",
				"⤃": "nvrArr",
				"⤄": "nvHarr",
				"⤅": "Map",
				"⤌": "lbarr",
				"⤍": "rbarr",
				"⤎": "lBarr",
				"⤏": "rBarr",
				"⤐": "RBarr",
				"⤑": "DDotrahd",
				"⤒": "UpArrowBar",
				"⤓": "DownArrowBar",
				"⤖": "Rarrtl",
				"⤙": "latail",
				"⤚": "ratail",
				"⤛": "lAtail",
				"⤜": "rAtail",
				"⤝": "larrfs",
				"⤞": "rarrfs",
				"⤟": "larrbfs",
				"⤠": "rarrbfs",
				"⤣": "nwarhk",
				"⤤": "nearhk",
				"⤥": "searhk",
				"⤦": "swarhk",
				"⤧": "nwnear",
				"⤨": "toea",
				"⤩": "tosa",
				"⤪": "swnwar",
				"⤳": "rarrc",
				"⤳̸": "nrarrc",
				"⤵": "cudarrr",
				"⤶": "ldca",
				"⤷": "rdca",
				"⤸": "cudarrl",
				"⤹": "larrpl",
				"⤼": "curarrm",
				"⤽": "cularrp",
				"⥅": "rarrpl",
				"⥈": "harrcir",
				"⥉": "Uarrocir",
				"⥊": "lurdshar",
				"⥋": "ldrushar",
				"⥎": "LeftRightVector",
				"⥏": "RightUpDownVector",
				"⥐": "DownLeftRightVector",
				"⥑": "LeftUpDownVector",
				"⥒": "LeftVectorBar",
				"⥓": "RightVectorBar",
				"⥔": "RightUpVectorBar",
				"⥕": "RightDownVectorBar",
				"⥖": "DownLeftVectorBar",
				"⥗": "DownRightVectorBar",
				"⥘": "LeftUpVectorBar",
				"⥙": "LeftDownVectorBar",
				"⥚": "LeftTeeVector",
				"⥛": "RightTeeVector",
				"⥜": "RightUpTeeVector",
				"⥝": "RightDownTeeVector",
				"⥞": "DownLeftTeeVector",
				"⥟": "DownRightTeeVector",
				"⥠": "LeftUpTeeVector",
				"⥡": "LeftDownTeeVector",
				"⥢": "lHar",
				"⥣": "uHar",
				"⥤": "rHar",
				"⥥": "dHar",
				"⥦": "luruhar",
				"⥧": "ldrdhar",
				"⥨": "ruluhar",
				"⥩": "rdldhar",
				"⥪": "lharul",
				"⥫": "llhard",
				"⥬": "rharul",
				"⥭": "lrhard",
				"⥮": "udhar",
				"⥯": "duhar",
				"⥰": "RoundImplies",
				"⥱": "erarr",
				"⥲": "simrarr",
				"⥳": "larrsim",
				"⥴": "rarrsim",
				"⥵": "rarrap",
				"⥶": "ltlarr",
				"⥸": "gtrarr",
				"⥹": "subrarr",
				"⥻": "suplarr",
				"⥼": "lfisht",
				"⥽": "rfisht",
				"⥾": "ufisht",
				"⥿": "dfisht",
				"⦚": "vzigzag",
				"⦜": "vangrt",
				"⦝": "angrtvbd",
				"⦤": "ange",
				"⦥": "range",
				"⦦": "dwangle",
				"⦧": "uwangle",
				"⦨": "angmsdaa",
				"⦩": "angmsdab",
				"⦪": "angmsdac",
				"⦫": "angmsdad",
				"⦬": "angmsdae",
				"⦭": "angmsdaf",
				"⦮": "angmsdag",
				"⦯": "angmsdah",
				"⦰": "bemptyv",
				"⦱": "demptyv",
				"⦲": "cemptyv",
				"⦳": "raemptyv",
				"⦴": "laemptyv",
				"⦵": "ohbar",
				"⦶": "omid",
				"⦷": "opar",
				"⦹": "operp",
				"⦻": "olcross",
				"⦼": "odsold",
				"⦾": "olcir",
				"⦿": "ofcir",
				"⧀": "olt",
				"⧁": "ogt",
				"⧂": "cirscir",
				"⧃": "cirE",
				"⧄": "solb",
				"⧅": "bsolb",
				"⧉": "boxbox",
				"⧍": "trisb",
				"⧎": "rtriltri",
				"⧏": "LeftTriangleBar",
				"⧏̸": "NotLeftTriangleBar",
				"⧐": "RightTriangleBar",
				"⧐̸": "NotRightTriangleBar",
				"⧜": "iinfin",
				"⧝": "infintie",
				"⧞": "nvinfin",
				"⧣": "eparsl",
				"⧤": "smeparsl",
				"⧥": "eqvparsl",
				"⧫": "lozf",
				"⧴": "RuleDelayed",
				"⧶": "dsol",
				"⨀": "xodot",
				"⨁": "xoplus",
				"⨂": "xotime",
				"⨄": "xuplus",
				"⨆": "xsqcup",
				"⨍": "fpartint",
				"⨐": "cirfnint",
				"⨑": "awint",
				"⨒": "rppolint",
				"⨓": "scpolint",
				"⨔": "npolint",
				"⨕": "pointint",
				"⨖": "quatint",
				"⨗": "intlarhk",
				"⨢": "pluscir",
				"⨣": "plusacir",
				"⨤": "simplus",
				"⨥": "plusdu",
				"⨦": "plussim",
				"⨧": "plustwo",
				"⨩": "mcomma",
				"⨪": "minusdu",
				"⨭": "loplus",
				"⨮": "roplus",
				"⨯": "Cross",
				"⨰": "timesd",
				"⨱": "timesbar",
				"⨳": "smashp",
				"⨴": "lotimes",
				"⨵": "rotimes",
				"⨶": "otimesas",
				"⨷": "Otimes",
				"⨸": "odiv",
				"⨹": "triplus",
				"⨺": "triminus",
				"⨻": "tritime",
				"⨼": "iprod",
				"⨿": "amalg",
				"⩀": "capdot",
				"⩂": "ncup",
				"⩃": "ncap",
				"⩄": "capand",
				"⩅": "cupor",
				"⩆": "cupcap",
				"⩇": "capcup",
				"⩈": "cupbrcap",
				"⩉": "capbrcup",
				"⩊": "cupcup",
				"⩋": "capcap",
				"⩌": "ccups",
				"⩍": "ccaps",
				"⩐": "ccupssm",
				"⩓": "And",
				"⩔": "Or",
				"⩕": "andand",
				"⩖": "oror",
				"⩗": "orslope",
				"⩘": "andslope",
				"⩚": "andv",
				"⩛": "orv",
				"⩜": "andd",
				"⩝": "ord",
				"⩟": "wedbar",
				"⩦": "sdote",
				"⩪": "simdot",
				"⩭": "congdot",
				"⩭̸": "ncongdot",
				"⩮": "easter",
				"⩯": "apacir",
				"⩰": "apE",
				"⩰̸": "napE",
				"⩱": "eplus",
				"⩲": "pluse",
				"⩳": "Esim",
				"⩷": "eDDot",
				"⩸": "equivDD",
				"⩹": "ltcir",
				"⩺": "gtcir",
				"⩻": "ltquest",
				"⩼": "gtquest",
				"⩽": "les",
				"⩽̸": "nles",
				"⩾": "ges",
				"⩾̸": "nges",
				"⩿": "lesdot",
				"⪀": "gesdot",
				"⪁": "lesdoto",
				"⪂": "gesdoto",
				"⪃": "lesdotor",
				"⪄": "gesdotol",
				"⪅": "lap",
				"⪆": "gap",
				"⪇": "lne",
				"⪈": "gne",
				"⪉": "lnap",
				"⪊": "gnap",
				"⪋": "lEg",
				"⪌": "gEl",
				"⪍": "lsime",
				"⪎": "gsime",
				"⪏": "lsimg",
				"⪐": "gsiml",
				"⪑": "lgE",
				"⪒": "glE",
				"⪓": "lesges",
				"⪔": "gesles",
				"⪕": "els",
				"⪖": "egs",
				"⪗": "elsdot",
				"⪘": "egsdot",
				"⪙": "el",
				"⪚": "eg",
				"⪝": "siml",
				"⪞": "simg",
				"⪟": "simlE",
				"⪠": "simgE",
				"⪡": "LessLess",
				"⪡̸": "NotNestedLessLess",
				"⪢": "GreaterGreater",
				"⪢̸": "NotNestedGreaterGreater",
				"⪤": "glj",
				"⪥": "gla",
				"⪦": "ltcc",
				"⪧": "gtcc",
				"⪨": "lescc",
				"⪩": "gescc",
				"⪪": "smt",
				"⪫": "lat",
				"⪬": "smte",
				"⪬︀": "smtes",
				"⪭": "late",
				"⪭︀": "lates",
				"⪮": "bumpE",
				"⪯": "pre",
				"⪯̸": "npre",
				"⪰": "sce",
				"⪰̸": "nsce",
				"⪳": "prE",
				"⪴": "scE",
				"⪵": "prnE",
				"⪶": "scnE",
				"⪷": "prap",
				"⪸": "scap",
				"⪹": "prnap",
				"⪺": "scnap",
				"⪻": "Pr",
				"⪼": "Sc",
				"⪽": "subdot",
				"⪾": "supdot",
				"⪿": "subplus",
				"⫀": "supplus",
				"⫁": "submult",
				"⫂": "supmult",
				"⫃": "subedot",
				"⫄": "supedot",
				"⫅": "subE",
				"⫅̸": "nsubE",
				"⫆": "supE",
				"⫆̸": "nsupE",
				"⫇": "subsim",
				"⫈": "supsim",
				"⫋︀": "vsubnE",
				"⫋": "subnE",
				"⫌︀": "vsupnE",
				"⫌": "supnE",
				"⫏": "csub",
				"⫐": "csup",
				"⫑": "csube",
				"⫒": "csupe",
				"⫓": "subsup",
				"⫔": "supsub",
				"⫕": "subsub",
				"⫖": "supsup",
				"⫗": "suphsub",
				"⫘": "supdsub",
				"⫙": "forkv",
				"⫚": "topfork",
				"⫛": "mlcp",
				"⫤": "Dashv",
				"⫦": "Vdashl",
				"⫧": "Barv",
				"⫨": "vBar",
				"⫩": "vBarv",
				"⫫": "Vbar",
				"⫬": "Not",
				"⫭": "bNot",
				"⫮": "rnmid",
				"⫯": "cirmid",
				"⫰": "midcir",
				"⫱": "topcir",
				"⫲": "nhpar",
				"⫳": "parsim",
				"⫽": "parsl",
				"⫽⃥": "nparsl",
				"♭": "flat",
				"♮": "natur",
				"♯": "sharp",
				"¤": "curren",
				"¢": "cent",
				"$": "dollar",
				"£": "pound",
				"¥": "yen",
				"€": "euro",
				"¹": "sup1",
				"½": "half",
				"⅓": "frac13",
				"¼": "frac14",
				"⅕": "frac15",
				"⅙": "frac16",
				"⅛": "frac18",
				"²": "sup2",
				"⅔": "frac23",
				"⅖": "frac25",
				"³": "sup3",
				"¾": "frac34",
				"⅗": "frac35",
				"⅜": "frac38",
				"⅘": "frac45",
				"⅚": "frac56",
				"⅝": "frac58",
				"⅞": "frac78",
				"𝒶": "ascr",
				"𝕒": "aopf",
				"𝔞": "afr",
				"𝔸": "Aopf",
				"𝔄": "Afr",
				"𝒜": "Ascr",
				"ª": "ordf",
				"á": "aacute",
				"Á": "Aacute",
				"à": "agrave",
				"À": "Agrave",
				"ă": "abreve",
				"Ă": "Abreve",
				"â": "acirc",
				"Â": "Acirc",
				"å": "aring",
				"Å": "angst",
				"ä": "auml",
				"Ä": "Auml",
				"ã": "atilde",
				"Ã": "Atilde",
				"ą": "aogon",
				"Ą": "Aogon",
				"ā": "amacr",
				"Ā": "Amacr",
				"æ": "aelig",
				"Æ": "AElig",
				"𝒷": "bscr",
				"𝕓": "bopf",
				"𝔟": "bfr",
				"𝔹": "Bopf",
				"ℬ": "Bscr",
				"𝔅": "Bfr",
				"𝔠": "cfr",
				"𝒸": "cscr",
				"𝕔": "copf",
				"ℭ": "Cfr",
				"𝒞": "Cscr",
				"ℂ": "Copf",
				"ć": "cacute",
				"Ć": "Cacute",
				"ĉ": "ccirc",
				"Ĉ": "Ccirc",
				"č": "ccaron",
				"Č": "Ccaron",
				"ċ": "cdot",
				"Ċ": "Cdot",
				"ç": "ccedil",
				"Ç": "Ccedil",
				"℅": "incare",
				"𝔡": "dfr",
				"ⅆ": "dd",
				"𝕕": "dopf",
				"𝒹": "dscr",
				"𝒟": "Dscr",
				"𝔇": "Dfr",
				"ⅅ": "DD",
				"𝔻": "Dopf",
				"ď": "dcaron",
				"Ď": "Dcaron",
				"đ": "dstrok",
				"Đ": "Dstrok",
				"ð": "eth",
				"Ð": "ETH",
				"ⅇ": "ee",
				"ℯ": "escr",
				"𝔢": "efr",
				"𝕖": "eopf",
				"ℰ": "Escr",
				"𝔈": "Efr",
				"𝔼": "Eopf",
				"é": "eacute",
				"É": "Eacute",
				"è": "egrave",
				"È": "Egrave",
				"ê": "ecirc",
				"Ê": "Ecirc",
				"ě": "ecaron",
				"Ě": "Ecaron",
				"ë": "euml",
				"Ë": "Euml",
				"ė": "edot",
				"Ė": "Edot",
				"ę": "eogon",
				"Ę": "Eogon",
				"ē": "emacr",
				"Ē": "Emacr",
				"𝔣": "ffr",
				"𝕗": "fopf",
				"𝒻": "fscr",
				"𝔉": "Ffr",
				"𝔽": "Fopf",
				"ℱ": "Fscr",
				"ﬀ": "fflig",
				"ﬃ": "ffilig",
				"ﬄ": "ffllig",
				"ﬁ": "filig",
				"fj": "fjlig",
				"ﬂ": "fllig",
				"ƒ": "fnof",
				"ℊ": "gscr",
				"𝕘": "gopf",
				"𝔤": "gfr",
				"𝒢": "Gscr",
				"𝔾": "Gopf",
				"𝔊": "Gfr",
				"ǵ": "gacute",
				"ğ": "gbreve",
				"Ğ": "Gbreve",
				"ĝ": "gcirc",
				"Ĝ": "Gcirc",
				"ġ": "gdot",
				"Ġ": "Gdot",
				"Ģ": "Gcedil",
				"𝔥": "hfr",
				"ℎ": "planckh",
				"𝒽": "hscr",
				"𝕙": "hopf",
				"ℋ": "Hscr",
				"ℌ": "Hfr",
				"ℍ": "Hopf",
				"ĥ": "hcirc",
				"Ĥ": "Hcirc",
				"ℏ": "hbar",
				"ħ": "hstrok",
				"Ħ": "Hstrok",
				"𝕚": "iopf",
				"𝔦": "ifr",
				"𝒾": "iscr",
				"ⅈ": "ii",
				"𝕀": "Iopf",
				"ℐ": "Iscr",
				"ℑ": "Im",
				"í": "iacute",
				"Í": "Iacute",
				"ì": "igrave",
				"Ì": "Igrave",
				"î": "icirc",
				"Î": "Icirc",
				"ï": "iuml",
				"Ï": "Iuml",
				"ĩ": "itilde",
				"Ĩ": "Itilde",
				"İ": "Idot",
				"į": "iogon",
				"Į": "Iogon",
				"ī": "imacr",
				"Ī": "Imacr",
				"ĳ": "ijlig",
				"Ĳ": "IJlig",
				"ı": "imath",
				"𝒿": "jscr",
				"𝕛": "jopf",
				"𝔧": "jfr",
				"𝒥": "Jscr",
				"𝔍": "Jfr",
				"𝕁": "Jopf",
				"ĵ": "jcirc",
				"Ĵ": "Jcirc",
				"ȷ": "jmath",
				"𝕜": "kopf",
				"𝓀": "kscr",
				"𝔨": "kfr",
				"𝒦": "Kscr",
				"𝕂": "Kopf",
				"𝔎": "Kfr",
				"ķ": "kcedil",
				"Ķ": "Kcedil",
				"𝔩": "lfr",
				"𝓁": "lscr",
				"ℓ": "ell",
				"𝕝": "lopf",
				"ℒ": "Lscr",
				"𝔏": "Lfr",
				"𝕃": "Lopf",
				"ĺ": "lacute",
				"Ĺ": "Lacute",
				"ľ": "lcaron",
				"Ľ": "Lcaron",
				"ļ": "lcedil",
				"Ļ": "Lcedil",
				"ł": "lstrok",
				"Ł": "Lstrok",
				"ŀ": "lmidot",
				"Ŀ": "Lmidot",
				"𝔪": "mfr",
				"𝕞": "mopf",
				"𝓂": "mscr",
				"𝔐": "Mfr",
				"𝕄": "Mopf",
				"ℳ": "Mscr",
				"𝔫": "nfr",
				"𝕟": "nopf",
				"𝓃": "nscr",
				"ℕ": "Nopf",
				"𝒩": "Nscr",
				"𝔑": "Nfr",
				"ń": "nacute",
				"Ń": "Nacute",
				"ň": "ncaron",
				"Ň": "Ncaron",
				"ñ": "ntilde",
				"Ñ": "Ntilde",
				"ņ": "ncedil",
				"Ņ": "Ncedil",
				"№": "numero",
				"ŋ": "eng",
				"Ŋ": "ENG",
				"𝕠": "oopf",
				"𝔬": "ofr",
				"ℴ": "oscr",
				"𝒪": "Oscr",
				"𝔒": "Ofr",
				"𝕆": "Oopf",
				"º": "ordm",
				"ó": "oacute",
				"Ó": "Oacute",
				"ò": "ograve",
				"Ò": "Ograve",
				"ô": "ocirc",
				"Ô": "Ocirc",
				"ö": "ouml",
				"Ö": "Ouml",
				"ő": "odblac",
				"Ő": "Odblac",
				"õ": "otilde",
				"Õ": "Otilde",
				"ø": "oslash",
				"Ø": "Oslash",
				"ō": "omacr",
				"Ō": "Omacr",
				"œ": "oelig",
				"Œ": "OElig",
				"𝔭": "pfr",
				"𝓅": "pscr",
				"𝕡": "popf",
				"ℙ": "Popf",
				"𝔓": "Pfr",
				"𝒫": "Pscr",
				"𝕢": "qopf",
				"𝔮": "qfr",
				"𝓆": "qscr",
				"𝒬": "Qscr",
				"𝔔": "Qfr",
				"ℚ": "Qopf",
				"ĸ": "kgreen",
				"𝔯": "rfr",
				"𝕣": "ropf",
				"𝓇": "rscr",
				"ℛ": "Rscr",
				"ℜ": "Re",
				"ℝ": "Ropf",
				"ŕ": "racute",
				"Ŕ": "Racute",
				"ř": "rcaron",
				"Ř": "Rcaron",
				"ŗ": "rcedil",
				"Ŗ": "Rcedil",
				"𝕤": "sopf",
				"𝓈": "sscr",
				"𝔰": "sfr",
				"𝕊": "Sopf",
				"𝔖": "Sfr",
				"𝒮": "Sscr",
				"Ⓢ": "oS",
				"ś": "sacute",
				"Ś": "Sacute",
				"ŝ": "scirc",
				"Ŝ": "Scirc",
				"š": "scaron",
				"Š": "Scaron",
				"ş": "scedil",
				"Ş": "Scedil",
				"ß": "szlig",
				"𝔱": "tfr",
				"𝓉": "tscr",
				"𝕥": "topf",
				"𝒯": "Tscr",
				"𝔗": "Tfr",
				"𝕋": "Topf",
				"ť": "tcaron",
				"Ť": "Tcaron",
				"ţ": "tcedil",
				"Ţ": "Tcedil",
				"™": "trade",
				"ŧ": "tstrok",
				"Ŧ": "Tstrok",
				"𝓊": "uscr",
				"𝕦": "uopf",
				"𝔲": "ufr",
				"𝕌": "Uopf",
				"𝔘": "Ufr",
				"𝒰": "Uscr",
				"ú": "uacute",
				"Ú": "Uacute",
				"ù": "ugrave",
				"Ù": "Ugrave",
				"ŭ": "ubreve",
				"Ŭ": "Ubreve",
				"û": "ucirc",
				"Û": "Ucirc",
				"ů": "uring",
				"Ů": "Uring",
				"ü": "uuml",
				"Ü": "Uuml",
				"ű": "udblac",
				"Ű": "Udblac",
				"ũ": "utilde",
				"Ũ": "Utilde",
				"ų": "uogon",
				"Ų": "Uogon",
				"ū": "umacr",
				"Ū": "Umacr",
				"𝔳": "vfr",
				"𝕧": "vopf",
				"𝓋": "vscr",
				"𝔙": "Vfr",
				"𝕍": "Vopf",
				"𝒱": "Vscr",
				"𝕨": "wopf",
				"𝓌": "wscr",
				"𝔴": "wfr",
				"𝒲": "Wscr",
				"𝕎": "Wopf",
				"𝔚": "Wfr",
				"ŵ": "wcirc",
				"Ŵ": "Wcirc",
				"𝔵": "xfr",
				"𝓍": "xscr",
				"𝕩": "xopf",
				"𝕏": "Xopf",
				"𝔛": "Xfr",
				"𝒳": "Xscr",
				"𝔶": "yfr",
				"𝓎": "yscr",
				"𝕪": "yopf",
				"𝒴": "Yscr",
				"𝔜": "Yfr",
				"𝕐": "Yopf",
				"ý": "yacute",
				"Ý": "Yacute",
				"ŷ": "ycirc",
				"Ŷ": "Ycirc",
				"ÿ": "yuml",
				"Ÿ": "Yuml",
				"𝓏": "zscr",
				"𝔷": "zfr",
				"𝕫": "zopf",
				"ℨ": "Zfr",
				"ℤ": "Zopf",
				"𝒵": "Zscr",
				"ź": "zacute",
				"Ź": "Zacute",
				"ž": "zcaron",
				"Ž": "Zcaron",
				"ż": "zdot",
				"Ż": "Zdot",
				"Ƶ": "imped",
				"þ": "thorn",
				"Þ": "THORN",
				"ŉ": "napos",
				"α": "alpha",
				"Α": "Alpha",
				"β": "beta",
				"Β": "Beta",
				"γ": "gamma",
				"Γ": "Gamma",
				"δ": "delta",
				"Δ": "Delta",
				"ε": "epsi",
				"ϵ": "epsiv",
				"Ε": "Epsilon",
				"ϝ": "gammad",
				"Ϝ": "Gammad",
				"ζ": "zeta",
				"Ζ": "Zeta",
				"η": "eta",
				"Η": "Eta",
				"θ": "theta",
				"ϑ": "thetav",
				"Θ": "Theta",
				"ι": "iota",
				"Ι": "Iota",
				"κ": "kappa",
				"ϰ": "kappav",
				"Κ": "Kappa",
				"λ": "lambda",
				"Λ": "Lambda",
				"μ": "mu",
				"µ": "micro",
				"Μ": "Mu",
				"ν": "nu",
				"Ν": "Nu",
				"ξ": "xi",
				"Ξ": "Xi",
				"ο": "omicron",
				"Ο": "Omicron",
				"π": "pi",
				"ϖ": "piv",
				"Π": "Pi",
				"ρ": "rho",
				"ϱ": "rhov",
				"Ρ": "Rho",
				"σ": "sigma",
				"Σ": "Sigma",
				"ς": "sigmaf",
				"τ": "tau",
				"Τ": "Tau",
				"υ": "upsi",
				"Υ": "Upsilon",
				"ϒ": "Upsi",
				"φ": "phi",
				"ϕ": "phiv",
				"Φ": "Phi",
				"χ": "chi",
				"Χ": "Chi",
				"ψ": "psi",
				"Ψ": "Psi",
				"ω": "omega",
				"Ω": "ohm",
				"а": "acy",
				"А": "Acy",
				"б": "bcy",
				"Б": "Bcy",
				"в": "vcy",
				"В": "Vcy",
				"г": "gcy",
				"Г": "Gcy",
				"ѓ": "gjcy",
				"Ѓ": "GJcy",
				"д": "dcy",
				"Д": "Dcy",
				"ђ": "djcy",
				"Ђ": "DJcy",
				"е": "iecy",
				"Е": "IEcy",
				"ё": "iocy",
				"Ё": "IOcy",
				"є": "jukcy",
				"Є": "Jukcy",
				"ж": "zhcy",
				"Ж": "ZHcy",
				"з": "zcy",
				"З": "Zcy",
				"ѕ": "dscy",
				"Ѕ": "DScy",
				"и": "icy",
				"И": "Icy",
				"і": "iukcy",
				"І": "Iukcy",
				"ї": "yicy",
				"Ї": "YIcy",
				"й": "jcy",
				"Й": "Jcy",
				"ј": "jsercy",
				"Ј": "Jsercy",
				"к": "kcy",
				"К": "Kcy",
				"ќ": "kjcy",
				"Ќ": "KJcy",
				"л": "lcy",
				"Л": "Lcy",
				"љ": "ljcy",
				"Љ": "LJcy",
				"м": "mcy",
				"М": "Mcy",
				"н": "ncy",
				"Н": "Ncy",
				"њ": "njcy",
				"Њ": "NJcy",
				"о": "ocy",
				"О": "Ocy",
				"п": "pcy",
				"П": "Pcy",
				"р": "rcy",
				"Р": "Rcy",
				"с": "scy",
				"С": "Scy",
				"т": "tcy",
				"Т": "Tcy",
				"ћ": "tshcy",
				"Ћ": "TSHcy",
				"у": "ucy",
				"У": "Ucy",
				"ў": "ubrcy",
				"Ў": "Ubrcy",
				"ф": "fcy",
				"Ф": "Fcy",
				"х": "khcy",
				"Х": "KHcy",
				"ц": "tscy",
				"Ц": "TScy",
				"ч": "chcy",
				"Ч": "CHcy",
				"џ": "dzcy",
				"Џ": "DZcy",
				"ш": "shcy",
				"Ш": "SHcy",
				"щ": "shchcy",
				"Щ": "SHCHcy",
				"ъ": "hardcy",
				"Ъ": "HARDcy",
				"ы": "ycy",
				"Ы": "Ycy",
				"ь": "softcy",
				"Ь": "SOFTcy",
				"э": "ecy",
				"Э": "Ecy",
				"ю": "yucy",
				"Ю": "YUcy",
				"я": "yacy",
				"Я": "YAcy",
				"ℵ": "aleph",
				"ℶ": "beth",
				"ℷ": "gimel",
				"ℸ": "daleth"
			};
			var regexEscape = /["&'<>`]/g;
			var escapeMap = {
				"\"": "&quot;",
				"&": "&amp;",
				"'": "&#x27;",
				"<": "&lt;",
				">": "&gt;",
				"`": "&#x60;"
			};
			var regexInvalidEntity = /&#(?:[xX][^a-fA-F0-9]|[^0-9xX])/;
			var regexInvalidRawCodePoint = /[\0-\x08\x0B\x0E-\x1F\x7F-\x9F\uFDD0-\uFDEF\uFFFE\uFFFF]|[\uD83F\uD87F\uD8BF\uD8FF\uD93F\uD97F\uD9BF\uD9FF\uDA3F\uDA7F\uDABF\uDAFF\uDB3F\uDB7F\uDBBF\uDBFF][\uDFFE\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
			var regexDecode = /&(CounterClockwiseContourIntegral|DoubleLongLeftRightArrow|ClockwiseContourIntegral|NotNestedGreaterGreater|NotSquareSupersetEqual|DiacriticalDoubleAcute|NotRightTriangleEqual|NotSucceedsSlantEqual|NotPrecedesSlantEqual|CloseCurlyDoubleQuote|NegativeVeryThinSpace|DoubleContourIntegral|FilledVerySmallSquare|CapitalDifferentialD|OpenCurlyDoubleQuote|EmptyVerySmallSquare|NestedGreaterGreater|DoubleLongRightArrow|NotLeftTriangleEqual|NotGreaterSlantEqual|ReverseUpEquilibrium|DoubleLeftRightArrow|NotSquareSubsetEqual|NotDoubleVerticalBar|RightArrowLeftArrow|NotGreaterFullEqual|NotRightTriangleBar|SquareSupersetEqual|DownLeftRightVector|DoubleLongLeftArrow|leftrightsquigarrow|LeftArrowRightArrow|NegativeMediumSpace|blacktriangleright|RightDownVectorBar|PrecedesSlantEqual|RightDoubleBracket|SucceedsSlantEqual|NotLeftTriangleBar|RightTriangleEqual|SquareIntersection|RightDownTeeVector|ReverseEquilibrium|NegativeThickSpace|longleftrightarrow|Longleftrightarrow|LongLeftRightArrow|DownRightTeeVector|DownRightVectorBar|GreaterSlantEqual|SquareSubsetEqual|LeftDownVectorBar|LeftDoubleBracket|VerticalSeparator|rightleftharpoons|NotGreaterGreater|NotSquareSuperset|blacktriangleleft|blacktriangledown|NegativeThinSpace|LeftDownTeeVector|NotLessSlantEqual|leftrightharpoons|DoubleUpDownArrow|DoubleVerticalBar|LeftTriangleEqual|FilledSmallSquare|twoheadrightarrow|NotNestedLessLess|DownLeftTeeVector|DownLeftVectorBar|RightAngleBracket|NotTildeFullEqual|NotReverseElement|RightUpDownVector|DiacriticalTilde|NotSucceedsTilde|circlearrowright|NotPrecedesEqual|rightharpoondown|DoubleRightArrow|NotSucceedsEqual|NonBreakingSpace|NotRightTriangle|LessEqualGreater|RightUpTeeVector|LeftAngleBracket|GreaterFullEqual|DownArrowUpArrow|RightUpVectorBar|twoheadleftarrow|GreaterEqualLess|downharpoonright|RightTriangleBar|ntrianglerighteq|NotSupersetEqual|LeftUpDownVector|DiacriticalAcute|rightrightarrows|vartriangleright|UpArrowDownArrow|DiacriticalGrave|UnderParenthesis|EmptySmallSquare|LeftUpVectorBar|leftrightarrows|DownRightVector|downharpoonleft|trianglerighteq|ShortRightArrow|OverParenthesis|DoubleLeftArrow|DoubleDownArrow|NotSquareSubset|bigtriangledown|ntrianglelefteq|UpperRightArrow|curvearrowright|vartriangleleft|NotLeftTriangle|nleftrightarrow|LowerRightArrow|NotHumpDownHump|NotGreaterTilde|rightthreetimes|LeftUpTeeVector|NotGreaterEqual|straightepsilon|LeftTriangleBar|rightsquigarrow|ContourIntegral|rightleftarrows|CloseCurlyQuote|RightDownVector|LeftRightVector|nLeftrightarrow|leftharpoondown|circlearrowleft|SquareSuperset|OpenCurlyQuote|hookrightarrow|HorizontalLine|DiacriticalDot|NotLessGreater|ntriangleright|DoubleRightTee|InvisibleComma|InvisibleTimes|LowerLeftArrow|DownLeftVector|NotSubsetEqual|curvearrowleft|trianglelefteq|NotVerticalBar|TildeFullEqual|downdownarrows|NotGreaterLess|RightTeeVector|ZeroWidthSpace|looparrowright|LongRightArrow|doublebarwedge|ShortLeftArrow|ShortDownArrow|RightVectorBar|GreaterGreater|ReverseElement|rightharpoonup|LessSlantEqual|leftthreetimes|upharpoonright|rightarrowtail|LeftDownVector|Longrightarrow|NestedLessLess|UpperLeftArrow|nshortparallel|leftleftarrows|leftrightarrow|Leftrightarrow|LeftRightArrow|longrightarrow|upharpoonleft|RightArrowBar|ApplyFunction|LeftTeeVector|leftarrowtail|NotEqualTilde|varsubsetneqq|varsupsetneqq|RightTeeArrow|SucceedsEqual|SucceedsTilde|LeftVectorBar|SupersetEqual|hookleftarrow|DifferentialD|VerticalTilde|VeryThinSpace|blacktriangle|bigtriangleup|LessFullEqual|divideontimes|leftharpoonup|UpEquilibrium|ntriangleleft|RightTriangle|measuredangle|shortparallel|longleftarrow|Longleftarrow|LongLeftArrow|DoubleLeftTee|Poincareplane|PrecedesEqual|triangleright|DoubleUpArrow|RightUpVector|fallingdotseq|looparrowleft|PrecedesTilde|NotTildeEqual|NotTildeTilde|smallsetminus|Proportional|triangleleft|triangledown|UnderBracket|NotHumpEqual|exponentiale|ExponentialE|NotLessTilde|HilbertSpace|RightCeiling|blacklozenge|varsupsetneq|HumpDownHump|GreaterEqual|VerticalLine|LeftTeeArrow|NotLessEqual|DownTeeArrow|LeftTriangle|varsubsetneq|Intersection|NotCongruent|DownArrowBar|LeftUpVector|LeftArrowBar|risingdotseq|GreaterTilde|RoundImplies|SquareSubset|ShortUpArrow|NotSuperset|quaternions|precnapprox|backepsilon|preccurlyeq|OverBracket|blacksquare|MediumSpace|VerticalBar|circledcirc|circleddash|CircleMinus|CircleTimes|LessGreater|curlyeqprec|curlyeqsucc|diamondsuit|UpDownArrow|Updownarrow|RuleDelayed|Rrightarrow|updownarrow|RightVector|nRightarrow|nrightarrow|eqslantless|LeftCeiling|Equilibrium|SmallCircle|expectation|NotSucceeds|thickapprox|GreaterLess|SquareUnion|NotPrecedes|NotLessLess|straightphi|succnapprox|succcurlyeq|SubsetEqual|sqsupseteq|Proportion|Laplacetrf|ImaginaryI|supsetneqq|NotGreater|gtreqqless|NotElement|ThickSpace|TildeEqual|TildeTilde|Fouriertrf|rmoustache|EqualTilde|eqslantgtr|UnderBrace|LeftVector|UpArrowBar|nLeftarrow|nsubseteqq|subsetneqq|nsupseteqq|nleftarrow|succapprox|lessapprox|UpTeeArrow|upuparrows|curlywedge|lesseqqgtr|varepsilon|varnothing|RightFloor|complement|CirclePlus|sqsubseteq|Lleftarrow|circledast|RightArrow|Rightarrow|rightarrow|lmoustache|Bernoullis|precapprox|mapstoleft|mapstodown|longmapsto|dotsquare|downarrow|DoubleDot|nsubseteq|supsetneq|leftarrow|nsupseteq|subsetneq|ThinSpace|ngeqslant|subseteqq|HumpEqual|NotSubset|triangleq|NotCupCap|lesseqgtr|heartsuit|TripleDot|Leftarrow|Coproduct|Congruent|varpropto|complexes|gvertneqq|LeftArrow|LessTilde|supseteqq|MinusPlus|CircleDot|nleqslant|NotExists|gtreqless|nparallel|UnionPlus|LeftFloor|checkmark|CenterDot|centerdot|Mellintrf|gtrapprox|bigotimes|OverBrace|spadesuit|therefore|pitchfork|rationals|PlusMinus|Backslash|Therefore|DownBreve|backsimeq|backprime|DownArrow|nshortmid|Downarrow|lvertneqq|eqvparsl|imagline|imagpart|infintie|integers|Integral|intercal|LessLess|Uarrocir|intlarhk|sqsupset|angmsdaf|sqsubset|llcorner|vartheta|cupbrcap|lnapprox|Superset|SuchThat|succnsim|succneqq|angmsdag|biguplus|curlyvee|trpezium|Succeeds|NotTilde|bigwedge|angmsdah|angrtvbd|triminus|cwconint|fpartint|lrcorner|smeparsl|subseteq|urcorner|lurdshar|laemptyv|DDotrahd|approxeq|ldrushar|awconint|mapstoup|backcong|shortmid|triangle|geqslant|gesdotol|timesbar|circledR|circledS|setminus|multimap|naturals|scpolint|ncongdot|RightTee|boxminus|gnapprox|boxtimes|andslope|thicksim|angmsdaa|varsigma|cirfnint|rtriltri|angmsdab|rppolint|angmsdac|barwedge|drbkarow|clubsuit|thetasym|bsolhsub|capbrcup|dzigrarr|doteqdot|DotEqual|dotminus|UnderBar|NotEqual|realpart|otimesas|ulcorner|hksearow|hkswarow|parallel|PartialD|elinters|emptyset|plusacir|bbrktbrk|angmsdad|pointint|bigoplus|angmsdae|Precedes|bigsqcup|varkappa|notindot|supseteq|precneqq|precnsim|profalar|profline|profsurf|leqslant|lesdotor|raemptyv|subplus|notnivb|notnivc|subrarr|zigrarr|vzigzag|submult|subedot|Element|between|cirscir|larrbfs|larrsim|lotimes|lbrksld|lbrkslu|lozenge|ldrdhar|dbkarow|bigcirc|epsilon|simrarr|simplus|ltquest|Epsilon|luruhar|gtquest|maltese|npolint|eqcolon|npreceq|bigodot|ddagger|gtrless|bnequiv|harrcir|ddotseq|equivDD|backsim|demptyv|nsqsube|nsqsupe|Upsilon|nsubset|upsilon|minusdu|nsucceq|swarrow|nsupset|coloneq|searrow|boxplus|napprox|natural|asympeq|alefsym|congdot|nearrow|bigstar|diamond|supplus|tritime|LeftTee|nvinfin|triplus|NewLine|nvltrie|nvrtrie|nwarrow|nexists|Diamond|ruluhar|Implies|supmult|angzarr|suplarr|suphsub|questeq|because|digamma|Because|olcross|bemptyv|omicron|Omicron|rotimes|NoBreak|intprod|angrtvb|orderof|uwangle|suphsol|lesdoto|orslope|DownTee|realine|cudarrl|rdldhar|OverBar|supedot|lessdot|supdsub|topfork|succsim|rbrkslu|rbrksld|pertenk|cudarrr|isindot|planckh|lessgtr|pluscir|gesdoto|plussim|plustwo|lesssim|cularrp|rarrsim|Cayleys|notinva|notinvb|notinvc|UpArrow|Uparrow|uparrow|NotLess|dwangle|precsim|Product|curarrm|Cconint|dotplus|rarrbfs|ccupssm|Cedilla|cemptyv|notniva|quatint|frac35|frac38|frac45|frac56|frac58|frac78|tridot|xoplus|gacute|gammad|Gammad|lfisht|lfloor|bigcup|sqsupe|gbreve|Gbreve|lharul|sqsube|sqcups|Gcedil|apacir|llhard|lmidot|Lmidot|lmoust|andand|sqcaps|approx|Abreve|spades|circeq|tprime|divide|topcir|Assign|topbot|gesdot|divonx|xuplus|timesd|gesles|atilde|solbar|SOFTcy|loplus|timesb|lowast|lowbar|dlcorn|dlcrop|softcy|dollar|lparlt|thksim|lrhard|Atilde|lsaquo|smashp|bigvee|thinsp|wreath|bkarow|lsquor|lstrok|Lstrok|lthree|ltimes|ltlarr|DotDot|simdot|ltrPar|weierp|xsqcup|angmsd|sigmav|sigmaf|zeetrf|Zcaron|zcaron|mapsto|vsupne|thetav|cirmid|marker|mcomma|Zacute|vsubnE|there4|gtlPar|vsubne|bottom|gtrarr|SHCHcy|shchcy|midast|midcir|middot|minusb|minusd|gtrdot|bowtie|sfrown|mnplus|models|colone|seswar|Colone|mstpos|searhk|gtrsim|nacute|Nacute|boxbox|telrec|hairsp|Tcedil|nbumpe|scnsim|ncaron|Ncaron|ncedil|Ncedil|hamilt|Scedil|nearhk|hardcy|HARDcy|tcedil|Tcaron|commat|nequiv|nesear|tcaron|target|hearts|nexist|varrho|scedil|Scaron|scaron|hellip|Sacute|sacute|hercon|swnwar|compfn|rtimes|rthree|rsquor|rsaquo|zacute|wedgeq|homtht|barvee|barwed|Barwed|rpargt|horbar|conint|swarhk|roplus|nltrie|hslash|hstrok|Hstrok|rmoust|Conint|bprime|hybull|hyphen|iacute|Iacute|supsup|supsub|supsim|varphi|coprod|brvbar|agrave|Supset|supset|igrave|Igrave|notinE|Agrave|iiiint|iinfin|copysr|wedbar|Verbar|vangrt|becaus|incare|verbar|inodot|bullet|drcorn|intcal|drcrop|cularr|vellip|Utilde|bumpeq|cupcap|dstrok|Dstrok|CupCap|cupcup|cupdot|eacute|Eacute|supdot|iquest|easter|ecaron|Ecaron|ecolon|isinsv|utilde|itilde|Itilde|curarr|succeq|Bumpeq|cacute|ulcrop|nparsl|Cacute|nprcue|egrave|Egrave|nrarrc|nrarrw|subsup|subsub|nrtrie|jsercy|nsccue|Jsercy|kappav|kcedil|Kcedil|subsim|ulcorn|nsimeq|egsdot|veebar|kgreen|capand|elsdot|Subset|subset|curren|aacute|lacute|Lacute|emptyv|ntilde|Ntilde|lagran|lambda|Lambda|capcap|Ugrave|langle|subdot|emsp13|numero|emsp14|nvdash|nvDash|nVdash|nVDash|ugrave|ufisht|nvHarr|larrfs|nvlArr|larrhk|larrlp|larrpl|nvrArr|Udblac|nwarhk|larrtl|nwnear|oacute|Oacute|latail|lAtail|sstarf|lbrace|odblac|Odblac|lbrack|udblac|odsold|eparsl|lcaron|Lcaron|ograve|Ograve|lcedil|Lcedil|Aacute|ssmile|ssetmn|squarf|ldquor|capcup|ominus|cylcty|rharul|eqcirc|dagger|rfloor|rfisht|Dagger|daleth|equals|origof|capdot|equest|dcaron|Dcaron|rdquor|oslash|Oslash|otilde|Otilde|otimes|Otimes|urcrop|Ubreve|ubreve|Yacute|Uacute|uacute|Rcedil|rcedil|urcorn|parsim|Rcaron|Vdashl|rcaron|Tstrok|percnt|period|permil|Exists|yacute|rbrack|rbrace|phmmat|ccaron|Ccaron|planck|ccedil|plankv|tstrok|female|plusdo|plusdu|ffilig|plusmn|ffllig|Ccedil|rAtail|dfisht|bernou|ratail|Rarrtl|rarrtl|angsph|rarrpl|rarrlp|rarrhk|xwedge|xotime|forall|ForAll|Vvdash|vsupnE|preceq|bigcap|frac12|frac13|frac14|primes|rarrfs|prnsim|frac15|Square|frac16|square|lesdot|frac18|frac23|propto|prurel|rarrap|rangle|puncsp|frac25|Racute|qprime|racute|lesges|frac34|abreve|AElig|eqsim|utdot|setmn|urtri|Equal|Uring|seArr|uring|searr|dashv|Dashv|mumap|nabla|iogon|Iogon|sdote|sdotb|scsim|napid|napos|equiv|natur|Acirc|dblac|erarr|nbump|iprod|erDot|ucirc|awint|esdot|angrt|ncong|isinE|scnap|Scirc|scirc|ndash|isins|Ubrcy|nearr|neArr|isinv|nedot|ubrcy|acute|Ycirc|iukcy|Iukcy|xutri|nesim|caret|jcirc|Jcirc|caron|twixt|ddarr|sccue|exist|jmath|sbquo|ngeqq|angst|ccaps|lceil|ngsim|UpTee|delta|Delta|rtrif|nharr|nhArr|nhpar|rtrie|jukcy|Jukcy|kappa|rsquo|Kappa|nlarr|nlArr|TSHcy|rrarr|aogon|Aogon|fflig|xrarr|tshcy|ccirc|nleqq|filig|upsih|nless|dharl|nlsim|fjlig|ropar|nltri|dharr|robrk|roarr|fllig|fltns|roang|rnmid|subnE|subne|lAarr|trisb|Ccirc|acirc|ccups|blank|VDash|forkv|Vdash|langd|cedil|blk12|blk14|laquo|strns|diams|notin|vDash|larrb|blk34|block|disin|uplus|vdash|vBarv|aelig|starf|Wedge|check|xrArr|lates|lbarr|lBarr|notni|lbbrk|bcong|frasl|lbrke|frown|vrtri|vprop|vnsup|gamma|Gamma|wedge|xodot|bdquo|srarr|doteq|ldquo|boxdl|boxdL|gcirc|Gcirc|boxDl|boxDL|boxdr|boxdR|boxDr|TRADE|trade|rlhar|boxDR|vnsub|npart|vltri|rlarr|boxhd|boxhD|nprec|gescc|nrarr|nrArr|boxHd|boxHD|boxhu|boxhU|nrtri|boxHu|clubs|boxHU|times|colon|Colon|gimel|xlArr|Tilde|nsime|tilde|nsmid|nspar|THORN|thorn|xlarr|nsube|nsubE|thkap|xhArr|comma|nsucc|boxul|boxuL|nsupe|nsupE|gneqq|gnsim|boxUl|boxUL|grave|boxur|boxuR|boxUr|boxUR|lescc|angle|bepsi|boxvh|varpi|boxvH|numsp|Theta|gsime|gsiml|theta|boxVh|boxVH|boxvl|gtcir|gtdot|boxvL|boxVl|boxVL|crarr|cross|Cross|nvsim|boxvr|nwarr|nwArr|sqsup|dtdot|Uogon|lhard|lharu|dtrif|ocirc|Ocirc|lhblk|duarr|odash|sqsub|Hacek|sqcup|llarr|duhar|oelig|OElig|ofcir|boxvR|uogon|lltri|boxVr|csube|uuarr|ohbar|csupe|ctdot|olarr|olcir|harrw|oline|sqcap|omacr|Omacr|omega|Omega|boxVR|aleph|lneqq|lnsim|loang|loarr|rharu|lobrk|hcirc|operp|oplus|rhard|Hcirc|orarr|Union|order|ecirc|Ecirc|cuepr|szlig|cuesc|breve|reals|eDDot|Breve|hoarr|lopar|utrif|rdquo|Umacr|umacr|efDot|swArr|ultri|alpha|rceil|ovbar|swarr|Wcirc|wcirc|smtes|smile|bsemi|lrarr|aring|parsl|lrhar|bsime|uhblk|lrtri|cupor|Aring|uharr|uharl|slarr|rbrke|bsolb|lsime|rbbrk|RBarr|lsimg|phone|rBarr|rbarr|icirc|lsquo|Icirc|emacr|Emacr|ratio|simne|plusb|simlE|simgE|simeq|pluse|ltcir|ltdot|empty|xharr|xdtri|iexcl|Alpha|ltrie|rarrw|pound|ltrif|xcirc|bumpe|prcue|bumpE|asymp|amacr|cuvee|Sigma|sigma|iiint|udhar|iiota|ijlig|IJlig|supnE|imacr|Imacr|prime|Prime|image|prnap|eogon|Eogon|rarrc|mdash|mDDot|cuwed|imath|supne|imped|Amacr|udarr|prsim|micro|rarrb|cwint|raquo|infin|eplus|range|rangd|Ucirc|radic|minus|amalg|veeeq|rAarr|epsiv|ycirc|quest|sharp|quot|zwnj|Qscr|race|qscr|Qopf|qopf|qint|rang|Rang|Zscr|zscr|Zopf|zopf|rarr|rArr|Rarr|Pscr|pscr|prop|prod|prnE|prec|ZHcy|zhcy|prap|Zeta|zeta|Popf|popf|Zdot|plus|zdot|Yuml|yuml|phiv|YUcy|yucy|Yscr|yscr|perp|Yopf|yopf|part|para|YIcy|Ouml|rcub|yicy|YAcy|rdca|ouml|osol|Oscr|rdsh|yacy|real|oscr|xvee|andd|rect|andv|Xscr|oror|ordm|ordf|xscr|ange|aopf|Aopf|rHar|Xopf|opar|Oopf|xopf|xnis|rhov|oopf|omid|xmap|oint|apid|apos|ogon|ascr|Ascr|odot|odiv|xcup|xcap|ocir|oast|nvlt|nvle|nvgt|nvge|nvap|Wscr|wscr|auml|ntlg|ntgl|nsup|nsub|nsim|Nscr|nscr|nsce|Wopf|ring|npre|wopf|npar|Auml|Barv|bbrk|Nopf|nopf|nmid|nLtv|beta|ropf|Ropf|Beta|beth|nles|rpar|nleq|bnot|bNot|nldr|NJcy|rscr|Rscr|Vscr|vscr|rsqb|njcy|bopf|nisd|Bopf|rtri|Vopf|nGtv|ngtr|vopf|boxh|boxH|boxv|nges|ngeq|boxV|bscr|scap|Bscr|bsim|Vert|vert|bsol|bull|bump|caps|cdot|ncup|scnE|ncap|nbsp|napE|Cdot|cent|sdot|Vbar|nang|vBar|chcy|Mscr|mscr|sect|semi|CHcy|Mopf|mopf|sext|circ|cire|mldr|mlcp|cirE|comp|shcy|SHcy|vArr|varr|cong|copf|Copf|copy|COPY|malt|male|macr|lvnE|cscr|ltri|sime|ltcc|simg|Cscr|siml|csub|Uuml|lsqb|lsim|uuml|csup|Lscr|lscr|utri|smid|lpar|cups|smte|lozf|darr|Lopf|Uscr|solb|lopf|sopf|Sopf|lneq|uscr|spar|dArr|lnap|Darr|dash|Sqrt|LJcy|ljcy|lHar|dHar|Upsi|upsi|diam|lesg|djcy|DJcy|leqq|dopf|Dopf|dscr|Dscr|dscy|ldsh|ldca|squf|DScy|sscr|Sscr|dsol|lcub|late|star|Star|Uopf|Larr|lArr|larr|uopf|dtri|dzcy|sube|subE|Lang|lang|Kscr|kscr|Kopf|kopf|KJcy|kjcy|KHcy|khcy|DZcy|ecir|edot|eDot|Jscr|jscr|succ|Jopf|jopf|Edot|uHar|emsp|ensp|Iuml|iuml|eopf|isin|Iscr|iscr|Eopf|epar|sung|epsi|escr|sup1|sup2|sup3|Iota|iota|supe|supE|Iopf|iopf|IOcy|iocy|Escr|esim|Esim|imof|Uarr|QUOT|uArr|uarr|euml|IEcy|iecy|Idot|Euml|euro|excl|Hscr|hscr|Hopf|hopf|TScy|tscy|Tscr|hbar|tscr|flat|tbrk|fnof|hArr|harr|half|fopf|Fopf|tdot|gvnE|fork|trie|gtcc|fscr|Fscr|gdot|gsim|Gscr|gscr|Gopf|gopf|gneq|Gdot|tosa|gnap|Topf|topf|geqq|toea|GJcy|gjcy|tint|gesl|mid|Sfr|ggg|top|ges|gla|glE|glj|geq|gne|gEl|gel|gnE|Gcy|gcy|gap|Tfr|tfr|Tcy|tcy|Hat|Tau|Ffr|tau|Tab|hfr|Hfr|ffr|Fcy|fcy|icy|Icy|iff|ETH|eth|ifr|Ifr|Eta|eta|int|Int|Sup|sup|ucy|Ucy|Sum|sum|jcy|ENG|ufr|Ufr|eng|Jcy|jfr|els|ell|egs|Efr|efr|Jfr|uml|kcy|Kcy|Ecy|ecy|kfr|Kfr|lap|Sub|sub|lat|lcy|Lcy|leg|Dot|dot|lEg|leq|les|squ|div|die|lfr|Lfr|lgE|Dfr|dfr|Del|deg|Dcy|dcy|lne|lnE|sol|loz|smt|Cup|lrm|cup|lsh|Lsh|sim|shy|map|Map|mcy|Mcy|mfr|Mfr|mho|gfr|Gfr|sfr|cir|Chi|chi|nap|Cfr|vcy|Vcy|cfr|Scy|scy|ncy|Ncy|vee|Vee|Cap|cap|nfr|scE|sce|Nfr|nge|ngE|nGg|vfr|Vfr|ngt|bot|nGt|nis|niv|Rsh|rsh|nle|nlE|bne|Bfr|bfr|nLl|nlt|nLt|Bcy|bcy|not|Not|rlm|wfr|Wfr|npr|nsc|num|ocy|ast|Ocy|ofr|xfr|Xfr|Ofr|ogt|ohm|apE|olt|Rho|ape|rho|Rfr|rfr|ord|REG|ang|reg|orv|And|and|AMP|Rcy|amp|Afr|ycy|Ycy|yen|yfr|Yfr|rcy|par|pcy|Pcy|pfr|Pfr|phi|Phi|afr|Acy|acy|zcy|Zcy|piv|acE|acd|zfr|Zfr|pre|prE|psi|Psi|qfr|Qfr|zwj|Or|ge|Gg|gt|gg|el|oS|lt|Lt|LT|Re|lg|gl|eg|ne|Im|it|le|DD|wp|wr|nu|Nu|dd|lE|Sc|sc|pi|Pi|ee|af|ll|Ll|rx|gE|xi|pm|Xi|ic|pr|Pr|in|ni|mp|mu|ac|Mu|or|ap|Gt|GT|ii);|&(Aacute|Agrave|Atilde|Ccedil|Eacute|Egrave|Iacute|Igrave|Ntilde|Oacute|Ograve|Oslash|Otilde|Uacute|Ugrave|Yacute|aacute|agrave|atilde|brvbar|ccedil|curren|divide|eacute|egrave|frac12|frac14|frac34|iacute|igrave|iquest|middot|ntilde|oacute|ograve|oslash|otilde|plusmn|uacute|ugrave|yacute|AElig|Acirc|Aring|Ecirc|Icirc|Ocirc|THORN|Ucirc|acirc|acute|aelig|aring|cedil|ecirc|icirc|iexcl|laquo|micro|ocirc|pound|raquo|szlig|thorn|times|ucirc|Auml|COPY|Euml|Iuml|Ouml|QUOT|Uuml|auml|cent|copy|euml|iuml|macr|nbsp|ordf|ordm|ouml|para|quot|sect|sup1|sup2|sup3|uuml|yuml|AMP|ETH|REG|amp|deg|eth|not|reg|shy|uml|yen|GT|LT|gt|lt)(?!;)([=a-zA-Z0-9]?)|&#([0-9]+)(;?)|&#[xX]([a-fA-F0-9]+)(;?)|&([0-9a-zA-Z]+)/g;
			var decodeMap = {
				"aacute": "á",
				"Aacute": "Á",
				"abreve": "ă",
				"Abreve": "Ă",
				"ac": "∾",
				"acd": "∿",
				"acE": "∾̳",
				"acirc": "â",
				"Acirc": "Â",
				"acute": "´",
				"acy": "а",
				"Acy": "А",
				"aelig": "æ",
				"AElig": "Æ",
				"af": "⁡",
				"afr": "𝔞",
				"Afr": "𝔄",
				"agrave": "à",
				"Agrave": "À",
				"alefsym": "ℵ",
				"aleph": "ℵ",
				"alpha": "α",
				"Alpha": "Α",
				"amacr": "ā",
				"Amacr": "Ā",
				"amalg": "⨿",
				"amp": "&",
				"AMP": "&",
				"and": "∧",
				"And": "⩓",
				"andand": "⩕",
				"andd": "⩜",
				"andslope": "⩘",
				"andv": "⩚",
				"ang": "∠",
				"ange": "⦤",
				"angle": "∠",
				"angmsd": "∡",
				"angmsdaa": "⦨",
				"angmsdab": "⦩",
				"angmsdac": "⦪",
				"angmsdad": "⦫",
				"angmsdae": "⦬",
				"angmsdaf": "⦭",
				"angmsdag": "⦮",
				"angmsdah": "⦯",
				"angrt": "∟",
				"angrtvb": "⊾",
				"angrtvbd": "⦝",
				"angsph": "∢",
				"angst": "Å",
				"angzarr": "⍼",
				"aogon": "ą",
				"Aogon": "Ą",
				"aopf": "𝕒",
				"Aopf": "𝔸",
				"ap": "≈",
				"apacir": "⩯",
				"ape": "≊",
				"apE": "⩰",
				"apid": "≋",
				"apos": "'",
				"ApplyFunction": "⁡",
				"approx": "≈",
				"approxeq": "≊",
				"aring": "å",
				"Aring": "Å",
				"ascr": "𝒶",
				"Ascr": "𝒜",
				"Assign": "≔",
				"ast": "*",
				"asymp": "≈",
				"asympeq": "≍",
				"atilde": "ã",
				"Atilde": "Ã",
				"auml": "ä",
				"Auml": "Ä",
				"awconint": "∳",
				"awint": "⨑",
				"backcong": "≌",
				"backepsilon": "϶",
				"backprime": "‵",
				"backsim": "∽",
				"backsimeq": "⋍",
				"Backslash": "∖",
				"Barv": "⫧",
				"barvee": "⊽",
				"barwed": "⌅",
				"Barwed": "⌆",
				"barwedge": "⌅",
				"bbrk": "⎵",
				"bbrktbrk": "⎶",
				"bcong": "≌",
				"bcy": "б",
				"Bcy": "Б",
				"bdquo": "„",
				"becaus": "∵",
				"because": "∵",
				"Because": "∵",
				"bemptyv": "⦰",
				"bepsi": "϶",
				"bernou": "ℬ",
				"Bernoullis": "ℬ",
				"beta": "β",
				"Beta": "Β",
				"beth": "ℶ",
				"between": "≬",
				"bfr": "𝔟",
				"Bfr": "𝔅",
				"bigcap": "⋂",
				"bigcirc": "◯",
				"bigcup": "⋃",
				"bigodot": "⨀",
				"bigoplus": "⨁",
				"bigotimes": "⨂",
				"bigsqcup": "⨆",
				"bigstar": "★",
				"bigtriangledown": "▽",
				"bigtriangleup": "△",
				"biguplus": "⨄",
				"bigvee": "⋁",
				"bigwedge": "⋀",
				"bkarow": "⤍",
				"blacklozenge": "⧫",
				"blacksquare": "▪",
				"blacktriangle": "▴",
				"blacktriangledown": "▾",
				"blacktriangleleft": "◂",
				"blacktriangleright": "▸",
				"blank": "␣",
				"blk12": "▒",
				"blk14": "░",
				"blk34": "▓",
				"block": "█",
				"bne": "=⃥",
				"bnequiv": "≡⃥",
				"bnot": "⌐",
				"bNot": "⫭",
				"bopf": "𝕓",
				"Bopf": "𝔹",
				"bot": "⊥",
				"bottom": "⊥",
				"bowtie": "⋈",
				"boxbox": "⧉",
				"boxdl": "┐",
				"boxdL": "╕",
				"boxDl": "╖",
				"boxDL": "╗",
				"boxdr": "┌",
				"boxdR": "╒",
				"boxDr": "╓",
				"boxDR": "╔",
				"boxh": "─",
				"boxH": "═",
				"boxhd": "┬",
				"boxhD": "╥",
				"boxHd": "╤",
				"boxHD": "╦",
				"boxhu": "┴",
				"boxhU": "╨",
				"boxHu": "╧",
				"boxHU": "╩",
				"boxminus": "⊟",
				"boxplus": "⊞",
				"boxtimes": "⊠",
				"boxul": "┘",
				"boxuL": "╛",
				"boxUl": "╜",
				"boxUL": "╝",
				"boxur": "└",
				"boxuR": "╘",
				"boxUr": "╙",
				"boxUR": "╚",
				"boxv": "│",
				"boxV": "║",
				"boxvh": "┼",
				"boxvH": "╪",
				"boxVh": "╫",
				"boxVH": "╬",
				"boxvl": "┤",
				"boxvL": "╡",
				"boxVl": "╢",
				"boxVL": "╣",
				"boxvr": "├",
				"boxvR": "╞",
				"boxVr": "╟",
				"boxVR": "╠",
				"bprime": "‵",
				"breve": "˘",
				"Breve": "˘",
				"brvbar": "¦",
				"bscr": "𝒷",
				"Bscr": "ℬ",
				"bsemi": "⁏",
				"bsim": "∽",
				"bsime": "⋍",
				"bsol": "\\",
				"bsolb": "⧅",
				"bsolhsub": "⟈",
				"bull": "•",
				"bullet": "•",
				"bump": "≎",
				"bumpe": "≏",
				"bumpE": "⪮",
				"bumpeq": "≏",
				"Bumpeq": "≎",
				"cacute": "ć",
				"Cacute": "Ć",
				"cap": "∩",
				"Cap": "⋒",
				"capand": "⩄",
				"capbrcup": "⩉",
				"capcap": "⩋",
				"capcup": "⩇",
				"capdot": "⩀",
				"CapitalDifferentialD": "ⅅ",
				"caps": "∩︀",
				"caret": "⁁",
				"caron": "ˇ",
				"Cayleys": "ℭ",
				"ccaps": "⩍",
				"ccaron": "č",
				"Ccaron": "Č",
				"ccedil": "ç",
				"Ccedil": "Ç",
				"ccirc": "ĉ",
				"Ccirc": "Ĉ",
				"Cconint": "∰",
				"ccups": "⩌",
				"ccupssm": "⩐",
				"cdot": "ċ",
				"Cdot": "Ċ",
				"cedil": "¸",
				"Cedilla": "¸",
				"cemptyv": "⦲",
				"cent": "¢",
				"centerdot": "·",
				"CenterDot": "·",
				"cfr": "𝔠",
				"Cfr": "ℭ",
				"chcy": "ч",
				"CHcy": "Ч",
				"check": "✓",
				"checkmark": "✓",
				"chi": "χ",
				"Chi": "Χ",
				"cir": "○",
				"circ": "ˆ",
				"circeq": "≗",
				"circlearrowleft": "↺",
				"circlearrowright": "↻",
				"circledast": "⊛",
				"circledcirc": "⊚",
				"circleddash": "⊝",
				"CircleDot": "⊙",
				"circledR": "®",
				"circledS": "Ⓢ",
				"CircleMinus": "⊖",
				"CirclePlus": "⊕",
				"CircleTimes": "⊗",
				"cire": "≗",
				"cirE": "⧃",
				"cirfnint": "⨐",
				"cirmid": "⫯",
				"cirscir": "⧂",
				"ClockwiseContourIntegral": "∲",
				"CloseCurlyDoubleQuote": "”",
				"CloseCurlyQuote": "’",
				"clubs": "♣",
				"clubsuit": "♣",
				"colon": ":",
				"Colon": "∷",
				"colone": "≔",
				"Colone": "⩴",
				"coloneq": "≔",
				"comma": ",",
				"commat": "@",
				"comp": "∁",
				"compfn": "∘",
				"complement": "∁",
				"complexes": "ℂ",
				"cong": "≅",
				"congdot": "⩭",
				"Congruent": "≡",
				"conint": "∮",
				"Conint": "∯",
				"ContourIntegral": "∮",
				"copf": "𝕔",
				"Copf": "ℂ",
				"coprod": "∐",
				"Coproduct": "∐",
				"copy": "©",
				"COPY": "©",
				"copysr": "℗",
				"CounterClockwiseContourIntegral": "∳",
				"crarr": "↵",
				"cross": "✗",
				"Cross": "⨯",
				"cscr": "𝒸",
				"Cscr": "𝒞",
				"csub": "⫏",
				"csube": "⫑",
				"csup": "⫐",
				"csupe": "⫒",
				"ctdot": "⋯",
				"cudarrl": "⤸",
				"cudarrr": "⤵",
				"cuepr": "⋞",
				"cuesc": "⋟",
				"cularr": "↶",
				"cularrp": "⤽",
				"cup": "∪",
				"Cup": "⋓",
				"cupbrcap": "⩈",
				"cupcap": "⩆",
				"CupCap": "≍",
				"cupcup": "⩊",
				"cupdot": "⊍",
				"cupor": "⩅",
				"cups": "∪︀",
				"curarr": "↷",
				"curarrm": "⤼",
				"curlyeqprec": "⋞",
				"curlyeqsucc": "⋟",
				"curlyvee": "⋎",
				"curlywedge": "⋏",
				"curren": "¤",
				"curvearrowleft": "↶",
				"curvearrowright": "↷",
				"cuvee": "⋎",
				"cuwed": "⋏",
				"cwconint": "∲",
				"cwint": "∱",
				"cylcty": "⌭",
				"dagger": "†",
				"Dagger": "‡",
				"daleth": "ℸ",
				"darr": "↓",
				"dArr": "⇓",
				"Darr": "↡",
				"dash": "‐",
				"dashv": "⊣",
				"Dashv": "⫤",
				"dbkarow": "⤏",
				"dblac": "˝",
				"dcaron": "ď",
				"Dcaron": "Ď",
				"dcy": "д",
				"Dcy": "Д",
				"dd": "ⅆ",
				"DD": "ⅅ",
				"ddagger": "‡",
				"ddarr": "⇊",
				"DDotrahd": "⤑",
				"ddotseq": "⩷",
				"deg": "°",
				"Del": "∇",
				"delta": "δ",
				"Delta": "Δ",
				"demptyv": "⦱",
				"dfisht": "⥿",
				"dfr": "𝔡",
				"Dfr": "𝔇",
				"dHar": "⥥",
				"dharl": "⇃",
				"dharr": "⇂",
				"DiacriticalAcute": "´",
				"DiacriticalDot": "˙",
				"DiacriticalDoubleAcute": "˝",
				"DiacriticalGrave": "`",
				"DiacriticalTilde": "˜",
				"diam": "⋄",
				"diamond": "⋄",
				"Diamond": "⋄",
				"diamondsuit": "♦",
				"diams": "♦",
				"die": "¨",
				"DifferentialD": "ⅆ",
				"digamma": "ϝ",
				"disin": "⋲",
				"div": "÷",
				"divide": "÷",
				"divideontimes": "⋇",
				"divonx": "⋇",
				"djcy": "ђ",
				"DJcy": "Ђ",
				"dlcorn": "⌞",
				"dlcrop": "⌍",
				"dollar": "$",
				"dopf": "𝕕",
				"Dopf": "𝔻",
				"dot": "˙",
				"Dot": "¨",
				"DotDot": "⃜",
				"doteq": "≐",
				"doteqdot": "≑",
				"DotEqual": "≐",
				"dotminus": "∸",
				"dotplus": "∔",
				"dotsquare": "⊡",
				"doublebarwedge": "⌆",
				"DoubleContourIntegral": "∯",
				"DoubleDot": "¨",
				"DoubleDownArrow": "⇓",
				"DoubleLeftArrow": "⇐",
				"DoubleLeftRightArrow": "⇔",
				"DoubleLeftTee": "⫤",
				"DoubleLongLeftArrow": "⟸",
				"DoubleLongLeftRightArrow": "⟺",
				"DoubleLongRightArrow": "⟹",
				"DoubleRightArrow": "⇒",
				"DoubleRightTee": "⊨",
				"DoubleUpArrow": "⇑",
				"DoubleUpDownArrow": "⇕",
				"DoubleVerticalBar": "∥",
				"downarrow": "↓",
				"Downarrow": "⇓",
				"DownArrow": "↓",
				"DownArrowBar": "⤓",
				"DownArrowUpArrow": "⇵",
				"DownBreve": "̑",
				"downdownarrows": "⇊",
				"downharpoonleft": "⇃",
				"downharpoonright": "⇂",
				"DownLeftRightVector": "⥐",
				"DownLeftTeeVector": "⥞",
				"DownLeftVector": "↽",
				"DownLeftVectorBar": "⥖",
				"DownRightTeeVector": "⥟",
				"DownRightVector": "⇁",
				"DownRightVectorBar": "⥗",
				"DownTee": "⊤",
				"DownTeeArrow": "↧",
				"drbkarow": "⤐",
				"drcorn": "⌟",
				"drcrop": "⌌",
				"dscr": "𝒹",
				"Dscr": "𝒟",
				"dscy": "ѕ",
				"DScy": "Ѕ",
				"dsol": "⧶",
				"dstrok": "đ",
				"Dstrok": "Đ",
				"dtdot": "⋱",
				"dtri": "▿",
				"dtrif": "▾",
				"duarr": "⇵",
				"duhar": "⥯",
				"dwangle": "⦦",
				"dzcy": "џ",
				"DZcy": "Џ",
				"dzigrarr": "⟿",
				"eacute": "é",
				"Eacute": "É",
				"easter": "⩮",
				"ecaron": "ě",
				"Ecaron": "Ě",
				"ecir": "≖",
				"ecirc": "ê",
				"Ecirc": "Ê",
				"ecolon": "≕",
				"ecy": "э",
				"Ecy": "Э",
				"eDDot": "⩷",
				"edot": "ė",
				"eDot": "≑",
				"Edot": "Ė",
				"ee": "ⅇ",
				"efDot": "≒",
				"efr": "𝔢",
				"Efr": "𝔈",
				"eg": "⪚",
				"egrave": "è",
				"Egrave": "È",
				"egs": "⪖",
				"egsdot": "⪘",
				"el": "⪙",
				"Element": "∈",
				"elinters": "⏧",
				"ell": "ℓ",
				"els": "⪕",
				"elsdot": "⪗",
				"emacr": "ē",
				"Emacr": "Ē",
				"empty": "∅",
				"emptyset": "∅",
				"EmptySmallSquare": "◻",
				"emptyv": "∅",
				"EmptyVerySmallSquare": "▫",
				"emsp": " ",
				"emsp13": " ",
				"emsp14": " ",
				"eng": "ŋ",
				"ENG": "Ŋ",
				"ensp": " ",
				"eogon": "ę",
				"Eogon": "Ę",
				"eopf": "𝕖",
				"Eopf": "𝔼",
				"epar": "⋕",
				"eparsl": "⧣",
				"eplus": "⩱",
				"epsi": "ε",
				"epsilon": "ε",
				"Epsilon": "Ε",
				"epsiv": "ϵ",
				"eqcirc": "≖",
				"eqcolon": "≕",
				"eqsim": "≂",
				"eqslantgtr": "⪖",
				"eqslantless": "⪕",
				"Equal": "⩵",
				"equals": "=",
				"EqualTilde": "≂",
				"equest": "≟",
				"Equilibrium": "⇌",
				"equiv": "≡",
				"equivDD": "⩸",
				"eqvparsl": "⧥",
				"erarr": "⥱",
				"erDot": "≓",
				"escr": "ℯ",
				"Escr": "ℰ",
				"esdot": "≐",
				"esim": "≂",
				"Esim": "⩳",
				"eta": "η",
				"Eta": "Η",
				"eth": "ð",
				"ETH": "Ð",
				"euml": "ë",
				"Euml": "Ë",
				"euro": "€",
				"excl": "!",
				"exist": "∃",
				"Exists": "∃",
				"expectation": "ℰ",
				"exponentiale": "ⅇ",
				"ExponentialE": "ⅇ",
				"fallingdotseq": "≒",
				"fcy": "ф",
				"Fcy": "Ф",
				"female": "♀",
				"ffilig": "ﬃ",
				"fflig": "ﬀ",
				"ffllig": "ﬄ",
				"ffr": "𝔣",
				"Ffr": "𝔉",
				"filig": "ﬁ",
				"FilledSmallSquare": "◼",
				"FilledVerySmallSquare": "▪",
				"fjlig": "fj",
				"flat": "♭",
				"fllig": "ﬂ",
				"fltns": "▱",
				"fnof": "ƒ",
				"fopf": "𝕗",
				"Fopf": "𝔽",
				"forall": "∀",
				"ForAll": "∀",
				"fork": "⋔",
				"forkv": "⫙",
				"Fouriertrf": "ℱ",
				"fpartint": "⨍",
				"frac12": "½",
				"frac13": "⅓",
				"frac14": "¼",
				"frac15": "⅕",
				"frac16": "⅙",
				"frac18": "⅛",
				"frac23": "⅔",
				"frac25": "⅖",
				"frac34": "¾",
				"frac35": "⅗",
				"frac38": "⅜",
				"frac45": "⅘",
				"frac56": "⅚",
				"frac58": "⅝",
				"frac78": "⅞",
				"frasl": "⁄",
				"frown": "⌢",
				"fscr": "𝒻",
				"Fscr": "ℱ",
				"gacute": "ǵ",
				"gamma": "γ",
				"Gamma": "Γ",
				"gammad": "ϝ",
				"Gammad": "Ϝ",
				"gap": "⪆",
				"gbreve": "ğ",
				"Gbreve": "Ğ",
				"Gcedil": "Ģ",
				"gcirc": "ĝ",
				"Gcirc": "Ĝ",
				"gcy": "г",
				"Gcy": "Г",
				"gdot": "ġ",
				"Gdot": "Ġ",
				"ge": "≥",
				"gE": "≧",
				"gel": "⋛",
				"gEl": "⪌",
				"geq": "≥",
				"geqq": "≧",
				"geqslant": "⩾",
				"ges": "⩾",
				"gescc": "⪩",
				"gesdot": "⪀",
				"gesdoto": "⪂",
				"gesdotol": "⪄",
				"gesl": "⋛︀",
				"gesles": "⪔",
				"gfr": "𝔤",
				"Gfr": "𝔊",
				"gg": "≫",
				"Gg": "⋙",
				"ggg": "⋙",
				"gimel": "ℷ",
				"gjcy": "ѓ",
				"GJcy": "Ѓ",
				"gl": "≷",
				"gla": "⪥",
				"glE": "⪒",
				"glj": "⪤",
				"gnap": "⪊",
				"gnapprox": "⪊",
				"gne": "⪈",
				"gnE": "≩",
				"gneq": "⪈",
				"gneqq": "≩",
				"gnsim": "⋧",
				"gopf": "𝕘",
				"Gopf": "𝔾",
				"grave": "`",
				"GreaterEqual": "≥",
				"GreaterEqualLess": "⋛",
				"GreaterFullEqual": "≧",
				"GreaterGreater": "⪢",
				"GreaterLess": "≷",
				"GreaterSlantEqual": "⩾",
				"GreaterTilde": "≳",
				"gscr": "ℊ",
				"Gscr": "𝒢",
				"gsim": "≳",
				"gsime": "⪎",
				"gsiml": "⪐",
				"gt": ">",
				"Gt": "≫",
				"GT": ">",
				"gtcc": "⪧",
				"gtcir": "⩺",
				"gtdot": "⋗",
				"gtlPar": "⦕",
				"gtquest": "⩼",
				"gtrapprox": "⪆",
				"gtrarr": "⥸",
				"gtrdot": "⋗",
				"gtreqless": "⋛",
				"gtreqqless": "⪌",
				"gtrless": "≷",
				"gtrsim": "≳",
				"gvertneqq": "≩︀",
				"gvnE": "≩︀",
				"Hacek": "ˇ",
				"hairsp": " ",
				"half": "½",
				"hamilt": "ℋ",
				"hardcy": "ъ",
				"HARDcy": "Ъ",
				"harr": "↔",
				"hArr": "⇔",
				"harrcir": "⥈",
				"harrw": "↭",
				"Hat": "^",
				"hbar": "ℏ",
				"hcirc": "ĥ",
				"Hcirc": "Ĥ",
				"hearts": "♥",
				"heartsuit": "♥",
				"hellip": "…",
				"hercon": "⊹",
				"hfr": "𝔥",
				"Hfr": "ℌ",
				"HilbertSpace": "ℋ",
				"hksearow": "⤥",
				"hkswarow": "⤦",
				"hoarr": "⇿",
				"homtht": "∻",
				"hookleftarrow": "↩",
				"hookrightarrow": "↪",
				"hopf": "𝕙",
				"Hopf": "ℍ",
				"horbar": "―",
				"HorizontalLine": "─",
				"hscr": "𝒽",
				"Hscr": "ℋ",
				"hslash": "ℏ",
				"hstrok": "ħ",
				"Hstrok": "Ħ",
				"HumpDownHump": "≎",
				"HumpEqual": "≏",
				"hybull": "⁃",
				"hyphen": "‐",
				"iacute": "í",
				"Iacute": "Í",
				"ic": "⁣",
				"icirc": "î",
				"Icirc": "Î",
				"icy": "и",
				"Icy": "И",
				"Idot": "İ",
				"iecy": "е",
				"IEcy": "Е",
				"iexcl": "¡",
				"iff": "⇔",
				"ifr": "𝔦",
				"Ifr": "ℑ",
				"igrave": "ì",
				"Igrave": "Ì",
				"ii": "ⅈ",
				"iiiint": "⨌",
				"iiint": "∭",
				"iinfin": "⧜",
				"iiota": "℩",
				"ijlig": "ĳ",
				"IJlig": "Ĳ",
				"Im": "ℑ",
				"imacr": "ī",
				"Imacr": "Ī",
				"image": "ℑ",
				"ImaginaryI": "ⅈ",
				"imagline": "ℐ",
				"imagpart": "ℑ",
				"imath": "ı",
				"imof": "⊷",
				"imped": "Ƶ",
				"Implies": "⇒",
				"in": "∈",
				"incare": "℅",
				"infin": "∞",
				"infintie": "⧝",
				"inodot": "ı",
				"int": "∫",
				"Int": "∬",
				"intcal": "⊺",
				"integers": "ℤ",
				"Integral": "∫",
				"intercal": "⊺",
				"Intersection": "⋂",
				"intlarhk": "⨗",
				"intprod": "⨼",
				"InvisibleComma": "⁣",
				"InvisibleTimes": "⁢",
				"iocy": "ё",
				"IOcy": "Ё",
				"iogon": "į",
				"Iogon": "Į",
				"iopf": "𝕚",
				"Iopf": "𝕀",
				"iota": "ι",
				"Iota": "Ι",
				"iprod": "⨼",
				"iquest": "¿",
				"iscr": "𝒾",
				"Iscr": "ℐ",
				"isin": "∈",
				"isindot": "⋵",
				"isinE": "⋹",
				"isins": "⋴",
				"isinsv": "⋳",
				"isinv": "∈",
				"it": "⁢",
				"itilde": "ĩ",
				"Itilde": "Ĩ",
				"iukcy": "і",
				"Iukcy": "І",
				"iuml": "ï",
				"Iuml": "Ï",
				"jcirc": "ĵ",
				"Jcirc": "Ĵ",
				"jcy": "й",
				"Jcy": "Й",
				"jfr": "𝔧",
				"Jfr": "𝔍",
				"jmath": "ȷ",
				"jopf": "𝕛",
				"Jopf": "𝕁",
				"jscr": "𝒿",
				"Jscr": "𝒥",
				"jsercy": "ј",
				"Jsercy": "Ј",
				"jukcy": "є",
				"Jukcy": "Є",
				"kappa": "κ",
				"Kappa": "Κ",
				"kappav": "ϰ",
				"kcedil": "ķ",
				"Kcedil": "Ķ",
				"kcy": "к",
				"Kcy": "К",
				"kfr": "𝔨",
				"Kfr": "𝔎",
				"kgreen": "ĸ",
				"khcy": "х",
				"KHcy": "Х",
				"kjcy": "ќ",
				"KJcy": "Ќ",
				"kopf": "𝕜",
				"Kopf": "𝕂",
				"kscr": "𝓀",
				"Kscr": "𝒦",
				"lAarr": "⇚",
				"lacute": "ĺ",
				"Lacute": "Ĺ",
				"laemptyv": "⦴",
				"lagran": "ℒ",
				"lambda": "λ",
				"Lambda": "Λ",
				"lang": "⟨",
				"Lang": "⟪",
				"langd": "⦑",
				"langle": "⟨",
				"lap": "⪅",
				"Laplacetrf": "ℒ",
				"laquo": "«",
				"larr": "←",
				"lArr": "⇐",
				"Larr": "↞",
				"larrb": "⇤",
				"larrbfs": "⤟",
				"larrfs": "⤝",
				"larrhk": "↩",
				"larrlp": "↫",
				"larrpl": "⤹",
				"larrsim": "⥳",
				"larrtl": "↢",
				"lat": "⪫",
				"latail": "⤙",
				"lAtail": "⤛",
				"late": "⪭",
				"lates": "⪭︀",
				"lbarr": "⤌",
				"lBarr": "⤎",
				"lbbrk": "❲",
				"lbrace": "{",
				"lbrack": "[",
				"lbrke": "⦋",
				"lbrksld": "⦏",
				"lbrkslu": "⦍",
				"lcaron": "ľ",
				"Lcaron": "Ľ",
				"lcedil": "ļ",
				"Lcedil": "Ļ",
				"lceil": "⌈",
				"lcub": "{",
				"lcy": "л",
				"Lcy": "Л",
				"ldca": "⤶",
				"ldquo": "“",
				"ldquor": "„",
				"ldrdhar": "⥧",
				"ldrushar": "⥋",
				"ldsh": "↲",
				"le": "≤",
				"lE": "≦",
				"LeftAngleBracket": "⟨",
				"leftarrow": "←",
				"Leftarrow": "⇐",
				"LeftArrow": "←",
				"LeftArrowBar": "⇤",
				"LeftArrowRightArrow": "⇆",
				"leftarrowtail": "↢",
				"LeftCeiling": "⌈",
				"LeftDoubleBracket": "⟦",
				"LeftDownTeeVector": "⥡",
				"LeftDownVector": "⇃",
				"LeftDownVectorBar": "⥙",
				"LeftFloor": "⌊",
				"leftharpoondown": "↽",
				"leftharpoonup": "↼",
				"leftleftarrows": "⇇",
				"leftrightarrow": "↔",
				"Leftrightarrow": "⇔",
				"LeftRightArrow": "↔",
				"leftrightarrows": "⇆",
				"leftrightharpoons": "⇋",
				"leftrightsquigarrow": "↭",
				"LeftRightVector": "⥎",
				"LeftTee": "⊣",
				"LeftTeeArrow": "↤",
				"LeftTeeVector": "⥚",
				"leftthreetimes": "⋋",
				"LeftTriangle": "⊲",
				"LeftTriangleBar": "⧏",
				"LeftTriangleEqual": "⊴",
				"LeftUpDownVector": "⥑",
				"LeftUpTeeVector": "⥠",
				"LeftUpVector": "↿",
				"LeftUpVectorBar": "⥘",
				"LeftVector": "↼",
				"LeftVectorBar": "⥒",
				"leg": "⋚",
				"lEg": "⪋",
				"leq": "≤",
				"leqq": "≦",
				"leqslant": "⩽",
				"les": "⩽",
				"lescc": "⪨",
				"lesdot": "⩿",
				"lesdoto": "⪁",
				"lesdotor": "⪃",
				"lesg": "⋚︀",
				"lesges": "⪓",
				"lessapprox": "⪅",
				"lessdot": "⋖",
				"lesseqgtr": "⋚",
				"lesseqqgtr": "⪋",
				"LessEqualGreater": "⋚",
				"LessFullEqual": "≦",
				"LessGreater": "≶",
				"lessgtr": "≶",
				"LessLess": "⪡",
				"lesssim": "≲",
				"LessSlantEqual": "⩽",
				"LessTilde": "≲",
				"lfisht": "⥼",
				"lfloor": "⌊",
				"lfr": "𝔩",
				"Lfr": "𝔏",
				"lg": "≶",
				"lgE": "⪑",
				"lHar": "⥢",
				"lhard": "↽",
				"lharu": "↼",
				"lharul": "⥪",
				"lhblk": "▄",
				"ljcy": "љ",
				"LJcy": "Љ",
				"ll": "≪",
				"Ll": "⋘",
				"llarr": "⇇",
				"llcorner": "⌞",
				"Lleftarrow": "⇚",
				"llhard": "⥫",
				"lltri": "◺",
				"lmidot": "ŀ",
				"Lmidot": "Ŀ",
				"lmoust": "⎰",
				"lmoustache": "⎰",
				"lnap": "⪉",
				"lnapprox": "⪉",
				"lne": "⪇",
				"lnE": "≨",
				"lneq": "⪇",
				"lneqq": "≨",
				"lnsim": "⋦",
				"loang": "⟬",
				"loarr": "⇽",
				"lobrk": "⟦",
				"longleftarrow": "⟵",
				"Longleftarrow": "⟸",
				"LongLeftArrow": "⟵",
				"longleftrightarrow": "⟷",
				"Longleftrightarrow": "⟺",
				"LongLeftRightArrow": "⟷",
				"longmapsto": "⟼",
				"longrightarrow": "⟶",
				"Longrightarrow": "⟹",
				"LongRightArrow": "⟶",
				"looparrowleft": "↫",
				"looparrowright": "↬",
				"lopar": "⦅",
				"lopf": "𝕝",
				"Lopf": "𝕃",
				"loplus": "⨭",
				"lotimes": "⨴",
				"lowast": "∗",
				"lowbar": "_",
				"LowerLeftArrow": "↙",
				"LowerRightArrow": "↘",
				"loz": "◊",
				"lozenge": "◊",
				"lozf": "⧫",
				"lpar": "(",
				"lparlt": "⦓",
				"lrarr": "⇆",
				"lrcorner": "⌟",
				"lrhar": "⇋",
				"lrhard": "⥭",
				"lrm": "‎",
				"lrtri": "⊿",
				"lsaquo": "‹",
				"lscr": "𝓁",
				"Lscr": "ℒ",
				"lsh": "↰",
				"Lsh": "↰",
				"lsim": "≲",
				"lsime": "⪍",
				"lsimg": "⪏",
				"lsqb": "[",
				"lsquo": "‘",
				"lsquor": "‚",
				"lstrok": "ł",
				"Lstrok": "Ł",
				"lt": "<",
				"Lt": "≪",
				"LT": "<",
				"ltcc": "⪦",
				"ltcir": "⩹",
				"ltdot": "⋖",
				"lthree": "⋋",
				"ltimes": "⋉",
				"ltlarr": "⥶",
				"ltquest": "⩻",
				"ltri": "◃",
				"ltrie": "⊴",
				"ltrif": "◂",
				"ltrPar": "⦖",
				"lurdshar": "⥊",
				"luruhar": "⥦",
				"lvertneqq": "≨︀",
				"lvnE": "≨︀",
				"macr": "¯",
				"male": "♂",
				"malt": "✠",
				"maltese": "✠",
				"map": "↦",
				"Map": "⤅",
				"mapsto": "↦",
				"mapstodown": "↧",
				"mapstoleft": "↤",
				"mapstoup": "↥",
				"marker": "▮",
				"mcomma": "⨩",
				"mcy": "м",
				"Mcy": "М",
				"mdash": "—",
				"mDDot": "∺",
				"measuredangle": "∡",
				"MediumSpace": " ",
				"Mellintrf": "ℳ",
				"mfr": "𝔪",
				"Mfr": "𝔐",
				"mho": "℧",
				"micro": "µ",
				"mid": "∣",
				"midast": "*",
				"midcir": "⫰",
				"middot": "·",
				"minus": "−",
				"minusb": "⊟",
				"minusd": "∸",
				"minusdu": "⨪",
				"MinusPlus": "∓",
				"mlcp": "⫛",
				"mldr": "…",
				"mnplus": "∓",
				"models": "⊧",
				"mopf": "𝕞",
				"Mopf": "𝕄",
				"mp": "∓",
				"mscr": "𝓂",
				"Mscr": "ℳ",
				"mstpos": "∾",
				"mu": "μ",
				"Mu": "Μ",
				"multimap": "⊸",
				"mumap": "⊸",
				"nabla": "∇",
				"nacute": "ń",
				"Nacute": "Ń",
				"nang": "∠⃒",
				"nap": "≉",
				"napE": "⩰̸",
				"napid": "≋̸",
				"napos": "ŉ",
				"napprox": "≉",
				"natur": "♮",
				"natural": "♮",
				"naturals": "ℕ",
				"nbsp": "\xA0",
				"nbump": "≎̸",
				"nbumpe": "≏̸",
				"ncap": "⩃",
				"ncaron": "ň",
				"Ncaron": "Ň",
				"ncedil": "ņ",
				"Ncedil": "Ņ",
				"ncong": "≇",
				"ncongdot": "⩭̸",
				"ncup": "⩂",
				"ncy": "н",
				"Ncy": "Н",
				"ndash": "–",
				"ne": "≠",
				"nearhk": "⤤",
				"nearr": "↗",
				"neArr": "⇗",
				"nearrow": "↗",
				"nedot": "≐̸",
				"NegativeMediumSpace": "​",
				"NegativeThickSpace": "​",
				"NegativeThinSpace": "​",
				"NegativeVeryThinSpace": "​",
				"nequiv": "≢",
				"nesear": "⤨",
				"nesim": "≂̸",
				"NestedGreaterGreater": "≫",
				"NestedLessLess": "≪",
				"NewLine": "\n",
				"nexist": "∄",
				"nexists": "∄",
				"nfr": "𝔫",
				"Nfr": "𝔑",
				"nge": "≱",
				"ngE": "≧̸",
				"ngeq": "≱",
				"ngeqq": "≧̸",
				"ngeqslant": "⩾̸",
				"nges": "⩾̸",
				"nGg": "⋙̸",
				"ngsim": "≵",
				"ngt": "≯",
				"nGt": "≫⃒",
				"ngtr": "≯",
				"nGtv": "≫̸",
				"nharr": "↮",
				"nhArr": "⇎",
				"nhpar": "⫲",
				"ni": "∋",
				"nis": "⋼",
				"nisd": "⋺",
				"niv": "∋",
				"njcy": "њ",
				"NJcy": "Њ",
				"nlarr": "↚",
				"nlArr": "⇍",
				"nldr": "‥",
				"nle": "≰",
				"nlE": "≦̸",
				"nleftarrow": "↚",
				"nLeftarrow": "⇍",
				"nleftrightarrow": "↮",
				"nLeftrightarrow": "⇎",
				"nleq": "≰",
				"nleqq": "≦̸",
				"nleqslant": "⩽̸",
				"nles": "⩽̸",
				"nless": "≮",
				"nLl": "⋘̸",
				"nlsim": "≴",
				"nlt": "≮",
				"nLt": "≪⃒",
				"nltri": "⋪",
				"nltrie": "⋬",
				"nLtv": "≪̸",
				"nmid": "∤",
				"NoBreak": "⁠",
				"NonBreakingSpace": "\xA0",
				"nopf": "𝕟",
				"Nopf": "ℕ",
				"not": "¬",
				"Not": "⫬",
				"NotCongruent": "≢",
				"NotCupCap": "≭",
				"NotDoubleVerticalBar": "∦",
				"NotElement": "∉",
				"NotEqual": "≠",
				"NotEqualTilde": "≂̸",
				"NotExists": "∄",
				"NotGreater": "≯",
				"NotGreaterEqual": "≱",
				"NotGreaterFullEqual": "≧̸",
				"NotGreaterGreater": "≫̸",
				"NotGreaterLess": "≹",
				"NotGreaterSlantEqual": "⩾̸",
				"NotGreaterTilde": "≵",
				"NotHumpDownHump": "≎̸",
				"NotHumpEqual": "≏̸",
				"notin": "∉",
				"notindot": "⋵̸",
				"notinE": "⋹̸",
				"notinva": "∉",
				"notinvb": "⋷",
				"notinvc": "⋶",
				"NotLeftTriangle": "⋪",
				"NotLeftTriangleBar": "⧏̸",
				"NotLeftTriangleEqual": "⋬",
				"NotLess": "≮",
				"NotLessEqual": "≰",
				"NotLessGreater": "≸",
				"NotLessLess": "≪̸",
				"NotLessSlantEqual": "⩽̸",
				"NotLessTilde": "≴",
				"NotNestedGreaterGreater": "⪢̸",
				"NotNestedLessLess": "⪡̸",
				"notni": "∌",
				"notniva": "∌",
				"notnivb": "⋾",
				"notnivc": "⋽",
				"NotPrecedes": "⊀",
				"NotPrecedesEqual": "⪯̸",
				"NotPrecedesSlantEqual": "⋠",
				"NotReverseElement": "∌",
				"NotRightTriangle": "⋫",
				"NotRightTriangleBar": "⧐̸",
				"NotRightTriangleEqual": "⋭",
				"NotSquareSubset": "⊏̸",
				"NotSquareSubsetEqual": "⋢",
				"NotSquareSuperset": "⊐̸",
				"NotSquareSupersetEqual": "⋣",
				"NotSubset": "⊂⃒",
				"NotSubsetEqual": "⊈",
				"NotSucceeds": "⊁",
				"NotSucceedsEqual": "⪰̸",
				"NotSucceedsSlantEqual": "⋡",
				"NotSucceedsTilde": "≿̸",
				"NotSuperset": "⊃⃒",
				"NotSupersetEqual": "⊉",
				"NotTilde": "≁",
				"NotTildeEqual": "≄",
				"NotTildeFullEqual": "≇",
				"NotTildeTilde": "≉",
				"NotVerticalBar": "∤",
				"npar": "∦",
				"nparallel": "∦",
				"nparsl": "⫽⃥",
				"npart": "∂̸",
				"npolint": "⨔",
				"npr": "⊀",
				"nprcue": "⋠",
				"npre": "⪯̸",
				"nprec": "⊀",
				"npreceq": "⪯̸",
				"nrarr": "↛",
				"nrArr": "⇏",
				"nrarrc": "⤳̸",
				"nrarrw": "↝̸",
				"nrightarrow": "↛",
				"nRightarrow": "⇏",
				"nrtri": "⋫",
				"nrtrie": "⋭",
				"nsc": "⊁",
				"nsccue": "⋡",
				"nsce": "⪰̸",
				"nscr": "𝓃",
				"Nscr": "𝒩",
				"nshortmid": "∤",
				"nshortparallel": "∦",
				"nsim": "≁",
				"nsime": "≄",
				"nsimeq": "≄",
				"nsmid": "∤",
				"nspar": "∦",
				"nsqsube": "⋢",
				"nsqsupe": "⋣",
				"nsub": "⊄",
				"nsube": "⊈",
				"nsubE": "⫅̸",
				"nsubset": "⊂⃒",
				"nsubseteq": "⊈",
				"nsubseteqq": "⫅̸",
				"nsucc": "⊁",
				"nsucceq": "⪰̸",
				"nsup": "⊅",
				"nsupe": "⊉",
				"nsupE": "⫆̸",
				"nsupset": "⊃⃒",
				"nsupseteq": "⊉",
				"nsupseteqq": "⫆̸",
				"ntgl": "≹",
				"ntilde": "ñ",
				"Ntilde": "Ñ",
				"ntlg": "≸",
				"ntriangleleft": "⋪",
				"ntrianglelefteq": "⋬",
				"ntriangleright": "⋫",
				"ntrianglerighteq": "⋭",
				"nu": "ν",
				"Nu": "Ν",
				"num": "#",
				"numero": "№",
				"numsp": " ",
				"nvap": "≍⃒",
				"nvdash": "⊬",
				"nvDash": "⊭",
				"nVdash": "⊮",
				"nVDash": "⊯",
				"nvge": "≥⃒",
				"nvgt": ">⃒",
				"nvHarr": "⤄",
				"nvinfin": "⧞",
				"nvlArr": "⤂",
				"nvle": "≤⃒",
				"nvlt": "<⃒",
				"nvltrie": "⊴⃒",
				"nvrArr": "⤃",
				"nvrtrie": "⊵⃒",
				"nvsim": "∼⃒",
				"nwarhk": "⤣",
				"nwarr": "↖",
				"nwArr": "⇖",
				"nwarrow": "↖",
				"nwnear": "⤧",
				"oacute": "ó",
				"Oacute": "Ó",
				"oast": "⊛",
				"ocir": "⊚",
				"ocirc": "ô",
				"Ocirc": "Ô",
				"ocy": "о",
				"Ocy": "О",
				"odash": "⊝",
				"odblac": "ő",
				"Odblac": "Ő",
				"odiv": "⨸",
				"odot": "⊙",
				"odsold": "⦼",
				"oelig": "œ",
				"OElig": "Œ",
				"ofcir": "⦿",
				"ofr": "𝔬",
				"Ofr": "𝔒",
				"ogon": "˛",
				"ograve": "ò",
				"Ograve": "Ò",
				"ogt": "⧁",
				"ohbar": "⦵",
				"ohm": "Ω",
				"oint": "∮",
				"olarr": "↺",
				"olcir": "⦾",
				"olcross": "⦻",
				"oline": "‾",
				"olt": "⧀",
				"omacr": "ō",
				"Omacr": "Ō",
				"omega": "ω",
				"Omega": "Ω",
				"omicron": "ο",
				"Omicron": "Ο",
				"omid": "⦶",
				"ominus": "⊖",
				"oopf": "𝕠",
				"Oopf": "𝕆",
				"opar": "⦷",
				"OpenCurlyDoubleQuote": "“",
				"OpenCurlyQuote": "‘",
				"operp": "⦹",
				"oplus": "⊕",
				"or": "∨",
				"Or": "⩔",
				"orarr": "↻",
				"ord": "⩝",
				"order": "ℴ",
				"orderof": "ℴ",
				"ordf": "ª",
				"ordm": "º",
				"origof": "⊶",
				"oror": "⩖",
				"orslope": "⩗",
				"orv": "⩛",
				"oS": "Ⓢ",
				"oscr": "ℴ",
				"Oscr": "𝒪",
				"oslash": "ø",
				"Oslash": "Ø",
				"osol": "⊘",
				"otilde": "õ",
				"Otilde": "Õ",
				"otimes": "⊗",
				"Otimes": "⨷",
				"otimesas": "⨶",
				"ouml": "ö",
				"Ouml": "Ö",
				"ovbar": "⌽",
				"OverBar": "‾",
				"OverBrace": "⏞",
				"OverBracket": "⎴",
				"OverParenthesis": "⏜",
				"par": "∥",
				"para": "¶",
				"parallel": "∥",
				"parsim": "⫳",
				"parsl": "⫽",
				"part": "∂",
				"PartialD": "∂",
				"pcy": "п",
				"Pcy": "П",
				"percnt": "%",
				"period": ".",
				"permil": "‰",
				"perp": "⊥",
				"pertenk": "‱",
				"pfr": "𝔭",
				"Pfr": "𝔓",
				"phi": "φ",
				"Phi": "Φ",
				"phiv": "ϕ",
				"phmmat": "ℳ",
				"phone": "☎",
				"pi": "π",
				"Pi": "Π",
				"pitchfork": "⋔",
				"piv": "ϖ",
				"planck": "ℏ",
				"planckh": "ℎ",
				"plankv": "ℏ",
				"plus": "+",
				"plusacir": "⨣",
				"plusb": "⊞",
				"pluscir": "⨢",
				"plusdo": "∔",
				"plusdu": "⨥",
				"pluse": "⩲",
				"PlusMinus": "±",
				"plusmn": "±",
				"plussim": "⨦",
				"plustwo": "⨧",
				"pm": "±",
				"Poincareplane": "ℌ",
				"pointint": "⨕",
				"popf": "𝕡",
				"Popf": "ℙ",
				"pound": "£",
				"pr": "≺",
				"Pr": "⪻",
				"prap": "⪷",
				"prcue": "≼",
				"pre": "⪯",
				"prE": "⪳",
				"prec": "≺",
				"precapprox": "⪷",
				"preccurlyeq": "≼",
				"Precedes": "≺",
				"PrecedesEqual": "⪯",
				"PrecedesSlantEqual": "≼",
				"PrecedesTilde": "≾",
				"preceq": "⪯",
				"precnapprox": "⪹",
				"precneqq": "⪵",
				"precnsim": "⋨",
				"precsim": "≾",
				"prime": "′",
				"Prime": "″",
				"primes": "ℙ",
				"prnap": "⪹",
				"prnE": "⪵",
				"prnsim": "⋨",
				"prod": "∏",
				"Product": "∏",
				"profalar": "⌮",
				"profline": "⌒",
				"profsurf": "⌓",
				"prop": "∝",
				"Proportion": "∷",
				"Proportional": "∝",
				"propto": "∝",
				"prsim": "≾",
				"prurel": "⊰",
				"pscr": "𝓅",
				"Pscr": "𝒫",
				"psi": "ψ",
				"Psi": "Ψ",
				"puncsp": " ",
				"qfr": "𝔮",
				"Qfr": "𝔔",
				"qint": "⨌",
				"qopf": "𝕢",
				"Qopf": "ℚ",
				"qprime": "⁗",
				"qscr": "𝓆",
				"Qscr": "𝒬",
				"quaternions": "ℍ",
				"quatint": "⨖",
				"quest": "?",
				"questeq": "≟",
				"quot": "\"",
				"QUOT": "\"",
				"rAarr": "⇛",
				"race": "∽̱",
				"racute": "ŕ",
				"Racute": "Ŕ",
				"radic": "√",
				"raemptyv": "⦳",
				"rang": "⟩",
				"Rang": "⟫",
				"rangd": "⦒",
				"range": "⦥",
				"rangle": "⟩",
				"raquo": "»",
				"rarr": "→",
				"rArr": "⇒",
				"Rarr": "↠",
				"rarrap": "⥵",
				"rarrb": "⇥",
				"rarrbfs": "⤠",
				"rarrc": "⤳",
				"rarrfs": "⤞",
				"rarrhk": "↪",
				"rarrlp": "↬",
				"rarrpl": "⥅",
				"rarrsim": "⥴",
				"rarrtl": "↣",
				"Rarrtl": "⤖",
				"rarrw": "↝",
				"ratail": "⤚",
				"rAtail": "⤜",
				"ratio": "∶",
				"rationals": "ℚ",
				"rbarr": "⤍",
				"rBarr": "⤏",
				"RBarr": "⤐",
				"rbbrk": "❳",
				"rbrace": "}",
				"rbrack": "]",
				"rbrke": "⦌",
				"rbrksld": "⦎",
				"rbrkslu": "⦐",
				"rcaron": "ř",
				"Rcaron": "Ř",
				"rcedil": "ŗ",
				"Rcedil": "Ŗ",
				"rceil": "⌉",
				"rcub": "}",
				"rcy": "р",
				"Rcy": "Р",
				"rdca": "⤷",
				"rdldhar": "⥩",
				"rdquo": "”",
				"rdquor": "”",
				"rdsh": "↳",
				"Re": "ℜ",
				"real": "ℜ",
				"realine": "ℛ",
				"realpart": "ℜ",
				"reals": "ℝ",
				"rect": "▭",
				"reg": "®",
				"REG": "®",
				"ReverseElement": "∋",
				"ReverseEquilibrium": "⇋",
				"ReverseUpEquilibrium": "⥯",
				"rfisht": "⥽",
				"rfloor": "⌋",
				"rfr": "𝔯",
				"Rfr": "ℜ",
				"rHar": "⥤",
				"rhard": "⇁",
				"rharu": "⇀",
				"rharul": "⥬",
				"rho": "ρ",
				"Rho": "Ρ",
				"rhov": "ϱ",
				"RightAngleBracket": "⟩",
				"rightarrow": "→",
				"Rightarrow": "⇒",
				"RightArrow": "→",
				"RightArrowBar": "⇥",
				"RightArrowLeftArrow": "⇄",
				"rightarrowtail": "↣",
				"RightCeiling": "⌉",
				"RightDoubleBracket": "⟧",
				"RightDownTeeVector": "⥝",
				"RightDownVector": "⇂",
				"RightDownVectorBar": "⥕",
				"RightFloor": "⌋",
				"rightharpoondown": "⇁",
				"rightharpoonup": "⇀",
				"rightleftarrows": "⇄",
				"rightleftharpoons": "⇌",
				"rightrightarrows": "⇉",
				"rightsquigarrow": "↝",
				"RightTee": "⊢",
				"RightTeeArrow": "↦",
				"RightTeeVector": "⥛",
				"rightthreetimes": "⋌",
				"RightTriangle": "⊳",
				"RightTriangleBar": "⧐",
				"RightTriangleEqual": "⊵",
				"RightUpDownVector": "⥏",
				"RightUpTeeVector": "⥜",
				"RightUpVector": "↾",
				"RightUpVectorBar": "⥔",
				"RightVector": "⇀",
				"RightVectorBar": "⥓",
				"ring": "˚",
				"risingdotseq": "≓",
				"rlarr": "⇄",
				"rlhar": "⇌",
				"rlm": "‏",
				"rmoust": "⎱",
				"rmoustache": "⎱",
				"rnmid": "⫮",
				"roang": "⟭",
				"roarr": "⇾",
				"robrk": "⟧",
				"ropar": "⦆",
				"ropf": "𝕣",
				"Ropf": "ℝ",
				"roplus": "⨮",
				"rotimes": "⨵",
				"RoundImplies": "⥰",
				"rpar": ")",
				"rpargt": "⦔",
				"rppolint": "⨒",
				"rrarr": "⇉",
				"Rrightarrow": "⇛",
				"rsaquo": "›",
				"rscr": "𝓇",
				"Rscr": "ℛ",
				"rsh": "↱",
				"Rsh": "↱",
				"rsqb": "]",
				"rsquo": "’",
				"rsquor": "’",
				"rthree": "⋌",
				"rtimes": "⋊",
				"rtri": "▹",
				"rtrie": "⊵",
				"rtrif": "▸",
				"rtriltri": "⧎",
				"RuleDelayed": "⧴",
				"ruluhar": "⥨",
				"rx": "℞",
				"sacute": "ś",
				"Sacute": "Ś",
				"sbquo": "‚",
				"sc": "≻",
				"Sc": "⪼",
				"scap": "⪸",
				"scaron": "š",
				"Scaron": "Š",
				"sccue": "≽",
				"sce": "⪰",
				"scE": "⪴",
				"scedil": "ş",
				"Scedil": "Ş",
				"scirc": "ŝ",
				"Scirc": "Ŝ",
				"scnap": "⪺",
				"scnE": "⪶",
				"scnsim": "⋩",
				"scpolint": "⨓",
				"scsim": "≿",
				"scy": "с",
				"Scy": "С",
				"sdot": "⋅",
				"sdotb": "⊡",
				"sdote": "⩦",
				"searhk": "⤥",
				"searr": "↘",
				"seArr": "⇘",
				"searrow": "↘",
				"sect": "§",
				"semi": ";",
				"seswar": "⤩",
				"setminus": "∖",
				"setmn": "∖",
				"sext": "✶",
				"sfr": "𝔰",
				"Sfr": "𝔖",
				"sfrown": "⌢",
				"sharp": "♯",
				"shchcy": "щ",
				"SHCHcy": "Щ",
				"shcy": "ш",
				"SHcy": "Ш",
				"ShortDownArrow": "↓",
				"ShortLeftArrow": "←",
				"shortmid": "∣",
				"shortparallel": "∥",
				"ShortRightArrow": "→",
				"ShortUpArrow": "↑",
				"shy": "­",
				"sigma": "σ",
				"Sigma": "Σ",
				"sigmaf": "ς",
				"sigmav": "ς",
				"sim": "∼",
				"simdot": "⩪",
				"sime": "≃",
				"simeq": "≃",
				"simg": "⪞",
				"simgE": "⪠",
				"siml": "⪝",
				"simlE": "⪟",
				"simne": "≆",
				"simplus": "⨤",
				"simrarr": "⥲",
				"slarr": "←",
				"SmallCircle": "∘",
				"smallsetminus": "∖",
				"smashp": "⨳",
				"smeparsl": "⧤",
				"smid": "∣",
				"smile": "⌣",
				"smt": "⪪",
				"smte": "⪬",
				"smtes": "⪬︀",
				"softcy": "ь",
				"SOFTcy": "Ь",
				"sol": "/",
				"solb": "⧄",
				"solbar": "⌿",
				"sopf": "𝕤",
				"Sopf": "𝕊",
				"spades": "♠",
				"spadesuit": "♠",
				"spar": "∥",
				"sqcap": "⊓",
				"sqcaps": "⊓︀",
				"sqcup": "⊔",
				"sqcups": "⊔︀",
				"Sqrt": "√",
				"sqsub": "⊏",
				"sqsube": "⊑",
				"sqsubset": "⊏",
				"sqsubseteq": "⊑",
				"sqsup": "⊐",
				"sqsupe": "⊒",
				"sqsupset": "⊐",
				"sqsupseteq": "⊒",
				"squ": "□",
				"square": "□",
				"Square": "□",
				"SquareIntersection": "⊓",
				"SquareSubset": "⊏",
				"SquareSubsetEqual": "⊑",
				"SquareSuperset": "⊐",
				"SquareSupersetEqual": "⊒",
				"SquareUnion": "⊔",
				"squarf": "▪",
				"squf": "▪",
				"srarr": "→",
				"sscr": "𝓈",
				"Sscr": "𝒮",
				"ssetmn": "∖",
				"ssmile": "⌣",
				"sstarf": "⋆",
				"star": "☆",
				"Star": "⋆",
				"starf": "★",
				"straightepsilon": "ϵ",
				"straightphi": "ϕ",
				"strns": "¯",
				"sub": "⊂",
				"Sub": "⋐",
				"subdot": "⪽",
				"sube": "⊆",
				"subE": "⫅",
				"subedot": "⫃",
				"submult": "⫁",
				"subne": "⊊",
				"subnE": "⫋",
				"subplus": "⪿",
				"subrarr": "⥹",
				"subset": "⊂",
				"Subset": "⋐",
				"subseteq": "⊆",
				"subseteqq": "⫅",
				"SubsetEqual": "⊆",
				"subsetneq": "⊊",
				"subsetneqq": "⫋",
				"subsim": "⫇",
				"subsub": "⫕",
				"subsup": "⫓",
				"succ": "≻",
				"succapprox": "⪸",
				"succcurlyeq": "≽",
				"Succeeds": "≻",
				"SucceedsEqual": "⪰",
				"SucceedsSlantEqual": "≽",
				"SucceedsTilde": "≿",
				"succeq": "⪰",
				"succnapprox": "⪺",
				"succneqq": "⪶",
				"succnsim": "⋩",
				"succsim": "≿",
				"SuchThat": "∋",
				"sum": "∑",
				"Sum": "∑",
				"sung": "♪",
				"sup": "⊃",
				"Sup": "⋑",
				"sup1": "¹",
				"sup2": "²",
				"sup3": "³",
				"supdot": "⪾",
				"supdsub": "⫘",
				"supe": "⊇",
				"supE": "⫆",
				"supedot": "⫄",
				"Superset": "⊃",
				"SupersetEqual": "⊇",
				"suphsol": "⟉",
				"suphsub": "⫗",
				"suplarr": "⥻",
				"supmult": "⫂",
				"supne": "⊋",
				"supnE": "⫌",
				"supplus": "⫀",
				"supset": "⊃",
				"Supset": "⋑",
				"supseteq": "⊇",
				"supseteqq": "⫆",
				"supsetneq": "⊋",
				"supsetneqq": "⫌",
				"supsim": "⫈",
				"supsub": "⫔",
				"supsup": "⫖",
				"swarhk": "⤦",
				"swarr": "↙",
				"swArr": "⇙",
				"swarrow": "↙",
				"swnwar": "⤪",
				"szlig": "ß",
				"Tab": "	",
				"target": "⌖",
				"tau": "τ",
				"Tau": "Τ",
				"tbrk": "⎴",
				"tcaron": "ť",
				"Tcaron": "Ť",
				"tcedil": "ţ",
				"Tcedil": "Ţ",
				"tcy": "т",
				"Tcy": "Т",
				"tdot": "⃛",
				"telrec": "⌕",
				"tfr": "𝔱",
				"Tfr": "𝔗",
				"there4": "∴",
				"therefore": "∴",
				"Therefore": "∴",
				"theta": "θ",
				"Theta": "Θ",
				"thetasym": "ϑ",
				"thetav": "ϑ",
				"thickapprox": "≈",
				"thicksim": "∼",
				"ThickSpace": "  ",
				"thinsp": " ",
				"ThinSpace": " ",
				"thkap": "≈",
				"thksim": "∼",
				"thorn": "þ",
				"THORN": "Þ",
				"tilde": "˜",
				"Tilde": "∼",
				"TildeEqual": "≃",
				"TildeFullEqual": "≅",
				"TildeTilde": "≈",
				"times": "×",
				"timesb": "⊠",
				"timesbar": "⨱",
				"timesd": "⨰",
				"tint": "∭",
				"toea": "⤨",
				"top": "⊤",
				"topbot": "⌶",
				"topcir": "⫱",
				"topf": "𝕥",
				"Topf": "𝕋",
				"topfork": "⫚",
				"tosa": "⤩",
				"tprime": "‴",
				"trade": "™",
				"TRADE": "™",
				"triangle": "▵",
				"triangledown": "▿",
				"triangleleft": "◃",
				"trianglelefteq": "⊴",
				"triangleq": "≜",
				"triangleright": "▹",
				"trianglerighteq": "⊵",
				"tridot": "◬",
				"trie": "≜",
				"triminus": "⨺",
				"TripleDot": "⃛",
				"triplus": "⨹",
				"trisb": "⧍",
				"tritime": "⨻",
				"trpezium": "⏢",
				"tscr": "𝓉",
				"Tscr": "𝒯",
				"tscy": "ц",
				"TScy": "Ц",
				"tshcy": "ћ",
				"TSHcy": "Ћ",
				"tstrok": "ŧ",
				"Tstrok": "Ŧ",
				"twixt": "≬",
				"twoheadleftarrow": "↞",
				"twoheadrightarrow": "↠",
				"uacute": "ú",
				"Uacute": "Ú",
				"uarr": "↑",
				"uArr": "⇑",
				"Uarr": "↟",
				"Uarrocir": "⥉",
				"ubrcy": "ў",
				"Ubrcy": "Ў",
				"ubreve": "ŭ",
				"Ubreve": "Ŭ",
				"ucirc": "û",
				"Ucirc": "Û",
				"ucy": "у",
				"Ucy": "У",
				"udarr": "⇅",
				"udblac": "ű",
				"Udblac": "Ű",
				"udhar": "⥮",
				"ufisht": "⥾",
				"ufr": "𝔲",
				"Ufr": "𝔘",
				"ugrave": "ù",
				"Ugrave": "Ù",
				"uHar": "⥣",
				"uharl": "↿",
				"uharr": "↾",
				"uhblk": "▀",
				"ulcorn": "⌜",
				"ulcorner": "⌜",
				"ulcrop": "⌏",
				"ultri": "◸",
				"umacr": "ū",
				"Umacr": "Ū",
				"uml": "¨",
				"UnderBar": "_",
				"UnderBrace": "⏟",
				"UnderBracket": "⎵",
				"UnderParenthesis": "⏝",
				"Union": "⋃",
				"UnionPlus": "⊎",
				"uogon": "ų",
				"Uogon": "Ų",
				"uopf": "𝕦",
				"Uopf": "𝕌",
				"uparrow": "↑",
				"Uparrow": "⇑",
				"UpArrow": "↑",
				"UpArrowBar": "⤒",
				"UpArrowDownArrow": "⇅",
				"updownarrow": "↕",
				"Updownarrow": "⇕",
				"UpDownArrow": "↕",
				"UpEquilibrium": "⥮",
				"upharpoonleft": "↿",
				"upharpoonright": "↾",
				"uplus": "⊎",
				"UpperLeftArrow": "↖",
				"UpperRightArrow": "↗",
				"upsi": "υ",
				"Upsi": "ϒ",
				"upsih": "ϒ",
				"upsilon": "υ",
				"Upsilon": "Υ",
				"UpTee": "⊥",
				"UpTeeArrow": "↥",
				"upuparrows": "⇈",
				"urcorn": "⌝",
				"urcorner": "⌝",
				"urcrop": "⌎",
				"uring": "ů",
				"Uring": "Ů",
				"urtri": "◹",
				"uscr": "𝓊",
				"Uscr": "𝒰",
				"utdot": "⋰",
				"utilde": "ũ",
				"Utilde": "Ũ",
				"utri": "▵",
				"utrif": "▴",
				"uuarr": "⇈",
				"uuml": "ü",
				"Uuml": "Ü",
				"uwangle": "⦧",
				"vangrt": "⦜",
				"varepsilon": "ϵ",
				"varkappa": "ϰ",
				"varnothing": "∅",
				"varphi": "ϕ",
				"varpi": "ϖ",
				"varpropto": "∝",
				"varr": "↕",
				"vArr": "⇕",
				"varrho": "ϱ",
				"varsigma": "ς",
				"varsubsetneq": "⊊︀",
				"varsubsetneqq": "⫋︀",
				"varsupsetneq": "⊋︀",
				"varsupsetneqq": "⫌︀",
				"vartheta": "ϑ",
				"vartriangleleft": "⊲",
				"vartriangleright": "⊳",
				"vBar": "⫨",
				"Vbar": "⫫",
				"vBarv": "⫩",
				"vcy": "в",
				"Vcy": "В",
				"vdash": "⊢",
				"vDash": "⊨",
				"Vdash": "⊩",
				"VDash": "⊫",
				"Vdashl": "⫦",
				"vee": "∨",
				"Vee": "⋁",
				"veebar": "⊻",
				"veeeq": "≚",
				"vellip": "⋮",
				"verbar": "|",
				"Verbar": "‖",
				"vert": "|",
				"Vert": "‖",
				"VerticalBar": "∣",
				"VerticalLine": "|",
				"VerticalSeparator": "❘",
				"VerticalTilde": "≀",
				"VeryThinSpace": " ",
				"vfr": "𝔳",
				"Vfr": "𝔙",
				"vltri": "⊲",
				"vnsub": "⊂⃒",
				"vnsup": "⊃⃒",
				"vopf": "𝕧",
				"Vopf": "𝕍",
				"vprop": "∝",
				"vrtri": "⊳",
				"vscr": "𝓋",
				"Vscr": "𝒱",
				"vsubne": "⊊︀",
				"vsubnE": "⫋︀",
				"vsupne": "⊋︀",
				"vsupnE": "⫌︀",
				"Vvdash": "⊪",
				"vzigzag": "⦚",
				"wcirc": "ŵ",
				"Wcirc": "Ŵ",
				"wedbar": "⩟",
				"wedge": "∧",
				"Wedge": "⋀",
				"wedgeq": "≙",
				"weierp": "℘",
				"wfr": "𝔴",
				"Wfr": "𝔚",
				"wopf": "𝕨",
				"Wopf": "𝕎",
				"wp": "℘",
				"wr": "≀",
				"wreath": "≀",
				"wscr": "𝓌",
				"Wscr": "𝒲",
				"xcap": "⋂",
				"xcirc": "◯",
				"xcup": "⋃",
				"xdtri": "▽",
				"xfr": "𝔵",
				"Xfr": "𝔛",
				"xharr": "⟷",
				"xhArr": "⟺",
				"xi": "ξ",
				"Xi": "Ξ",
				"xlarr": "⟵",
				"xlArr": "⟸",
				"xmap": "⟼",
				"xnis": "⋻",
				"xodot": "⨀",
				"xopf": "𝕩",
				"Xopf": "𝕏",
				"xoplus": "⨁",
				"xotime": "⨂",
				"xrarr": "⟶",
				"xrArr": "⟹",
				"xscr": "𝓍",
				"Xscr": "𝒳",
				"xsqcup": "⨆",
				"xuplus": "⨄",
				"xutri": "△",
				"xvee": "⋁",
				"xwedge": "⋀",
				"yacute": "ý",
				"Yacute": "Ý",
				"yacy": "я",
				"YAcy": "Я",
				"ycirc": "ŷ",
				"Ycirc": "Ŷ",
				"ycy": "ы",
				"Ycy": "Ы",
				"yen": "¥",
				"yfr": "𝔶",
				"Yfr": "𝔜",
				"yicy": "ї",
				"YIcy": "Ї",
				"yopf": "𝕪",
				"Yopf": "𝕐",
				"yscr": "𝓎",
				"Yscr": "𝒴",
				"yucy": "ю",
				"YUcy": "Ю",
				"yuml": "ÿ",
				"Yuml": "Ÿ",
				"zacute": "ź",
				"Zacute": "Ź",
				"zcaron": "ž",
				"Zcaron": "Ž",
				"zcy": "з",
				"Zcy": "З",
				"zdot": "ż",
				"Zdot": "Ż",
				"zeetrf": "ℨ",
				"ZeroWidthSpace": "​",
				"zeta": "ζ",
				"Zeta": "Ζ",
				"zfr": "𝔷",
				"Zfr": "ℨ",
				"zhcy": "ж",
				"ZHcy": "Ж",
				"zigrarr": "⇝",
				"zopf": "𝕫",
				"Zopf": "ℤ",
				"zscr": "𝓏",
				"Zscr": "𝒵",
				"zwj": "‍",
				"zwnj": "‌"
			};
			var decodeMapLegacy = {
				"aacute": "á",
				"Aacute": "Á",
				"acirc": "â",
				"Acirc": "Â",
				"acute": "´",
				"aelig": "æ",
				"AElig": "Æ",
				"agrave": "à",
				"Agrave": "À",
				"amp": "&",
				"AMP": "&",
				"aring": "å",
				"Aring": "Å",
				"atilde": "ã",
				"Atilde": "Ã",
				"auml": "ä",
				"Auml": "Ä",
				"brvbar": "¦",
				"ccedil": "ç",
				"Ccedil": "Ç",
				"cedil": "¸",
				"cent": "¢",
				"copy": "©",
				"COPY": "©",
				"curren": "¤",
				"deg": "°",
				"divide": "÷",
				"eacute": "é",
				"Eacute": "É",
				"ecirc": "ê",
				"Ecirc": "Ê",
				"egrave": "è",
				"Egrave": "È",
				"eth": "ð",
				"ETH": "Ð",
				"euml": "ë",
				"Euml": "Ë",
				"frac12": "½",
				"frac14": "¼",
				"frac34": "¾",
				"gt": ">",
				"GT": ">",
				"iacute": "í",
				"Iacute": "Í",
				"icirc": "î",
				"Icirc": "Î",
				"iexcl": "¡",
				"igrave": "ì",
				"Igrave": "Ì",
				"iquest": "¿",
				"iuml": "ï",
				"Iuml": "Ï",
				"laquo": "«",
				"lt": "<",
				"LT": "<",
				"macr": "¯",
				"micro": "µ",
				"middot": "·",
				"nbsp": "\xA0",
				"not": "¬",
				"ntilde": "ñ",
				"Ntilde": "Ñ",
				"oacute": "ó",
				"Oacute": "Ó",
				"ocirc": "ô",
				"Ocirc": "Ô",
				"ograve": "ò",
				"Ograve": "Ò",
				"ordf": "ª",
				"ordm": "º",
				"oslash": "ø",
				"Oslash": "Ø",
				"otilde": "õ",
				"Otilde": "Õ",
				"ouml": "ö",
				"Ouml": "Ö",
				"para": "¶",
				"plusmn": "±",
				"pound": "£",
				"quot": "\"",
				"QUOT": "\"",
				"raquo": "»",
				"reg": "®",
				"REG": "®",
				"sect": "§",
				"shy": "­",
				"sup1": "¹",
				"sup2": "²",
				"sup3": "³",
				"szlig": "ß",
				"thorn": "þ",
				"THORN": "Þ",
				"times": "×",
				"uacute": "ú",
				"Uacute": "Ú",
				"ucirc": "û",
				"Ucirc": "Û",
				"ugrave": "ù",
				"Ugrave": "Ù",
				"uml": "¨",
				"uuml": "ü",
				"Uuml": "Ü",
				"yacute": "ý",
				"Yacute": "Ý",
				"yen": "¥",
				"yuml": "ÿ"
			};
			var decodeMapNumeric = {
				"0": "�",
				"128": "€",
				"130": "‚",
				"131": "ƒ",
				"132": "„",
				"133": "…",
				"134": "†",
				"135": "‡",
				"136": "ˆ",
				"137": "‰",
				"138": "Š",
				"139": "‹",
				"140": "Œ",
				"142": "Ž",
				"145": "‘",
				"146": "’",
				"147": "“",
				"148": "”",
				"149": "•",
				"150": "–",
				"151": "—",
				"152": "˜",
				"153": "™",
				"154": "š",
				"155": "›",
				"156": "œ",
				"158": "ž",
				"159": "Ÿ"
			};
			var invalidReferenceCodePoints = [
				1,
				2,
				3,
				4,
				5,
				6,
				7,
				8,
				11,
				13,
				14,
				15,
				16,
				17,
				18,
				19,
				20,
				21,
				22,
				23,
				24,
				25,
				26,
				27,
				28,
				29,
				30,
				31,
				127,
				128,
				129,
				130,
				131,
				132,
				133,
				134,
				135,
				136,
				137,
				138,
				139,
				140,
				141,
				142,
				143,
				144,
				145,
				146,
				147,
				148,
				149,
				150,
				151,
				152,
				153,
				154,
				155,
				156,
				157,
				158,
				159,
				64976,
				64977,
				64978,
				64979,
				64980,
				64981,
				64982,
				64983,
				64984,
				64985,
				64986,
				64987,
				64988,
				64989,
				64990,
				64991,
				64992,
				64993,
				64994,
				64995,
				64996,
				64997,
				64998,
				64999,
				65e3,
				65001,
				65002,
				65003,
				65004,
				65005,
				65006,
				65007,
				65534,
				65535,
				131070,
				131071,
				196606,
				196607,
				262142,
				262143,
				327678,
				327679,
				393214,
				393215,
				458750,
				458751,
				524286,
				524287,
				589822,
				589823,
				655358,
				655359,
				720894,
				720895,
				786430,
				786431,
				851966,
				851967,
				917502,
				917503,
				983038,
				983039,
				1048574,
				1048575,
				1114110,
				1114111
			];
			var stringFromCharCode = String.fromCharCode;
			var hasOwnProperty = {}.hasOwnProperty;
			var has = function(object, propertyName) {
				return hasOwnProperty.call(object, propertyName);
			};
			var contains = function(array, value) {
				var index = -1;
				var length = array.length;
				while (++index < length) if (array[index] == value) return true;
				return false;
			};
			var merge = function(options, defaults) {
				if (!options) return defaults;
				var result = {};
				var key;
				for (key in defaults) result[key] = has(options, key) ? options[key] : defaults[key];
				return result;
			};
			var codePointToSymbol = function(codePoint, strict) {
				var output = "";
				if (codePoint >= 55296 && codePoint <= 57343 || codePoint > 1114111) {
					if (strict) parseError("character reference outside the permissible Unicode range");
					return "�";
				}
				if (has(decodeMapNumeric, codePoint)) {
					if (strict) parseError("disallowed character reference");
					return decodeMapNumeric[codePoint];
				}
				if (strict && contains(invalidReferenceCodePoints, codePoint)) parseError("disallowed character reference");
				if (codePoint > 65535) {
					codePoint -= 65536;
					output += stringFromCharCode(codePoint >>> 10 & 1023 | 55296);
					codePoint = 56320 | codePoint & 1023;
				}
				output += stringFromCharCode(codePoint);
				return output;
			};
			var hexEscape = function(codePoint) {
				return "&#x" + codePoint.toString(16).toUpperCase() + ";";
			};
			var decEscape = function(codePoint) {
				return "&#" + codePoint + ";";
			};
			var parseError = function(message) {
				throw Error("Parse error: " + message);
			};
			var encode = function(string, options) {
				options = merge(options, encode.options);
				if (options.strict && regexInvalidRawCodePoint.test(string)) parseError("forbidden code point");
				var encodeEverything = options.encodeEverything;
				var useNamedReferences = options.useNamedReferences;
				var allowUnsafeSymbols = options.allowUnsafeSymbols;
				var escapeCodePoint = options.decimal ? decEscape : hexEscape;
				var escapeBmpSymbol = function(symbol) {
					return escapeCodePoint(symbol.charCodeAt(0));
				};
				if (encodeEverything) {
					string = string.replace(regexAsciiWhitelist, function(symbol) {
						if (useNamedReferences && has(encodeMap, symbol)) return "&" + encodeMap[symbol] + ";";
						return escapeBmpSymbol(symbol);
					});
					if (useNamedReferences) string = string.replace(/&gt;\u20D2/g, "&nvgt;").replace(/&lt;\u20D2/g, "&nvlt;").replace(/&#x66;&#x6A;/g, "&fjlig;");
					if (useNamedReferences) string = string.replace(regexEncodeNonAscii, function(string) {
						return "&" + encodeMap[string] + ";";
					});
				} else if (useNamedReferences) {
					if (!allowUnsafeSymbols) string = string.replace(regexEscape, function(string) {
						return "&" + encodeMap[string] + ";";
					});
					string = string.replace(/&gt;\u20D2/g, "&nvgt;").replace(/&lt;\u20D2/g, "&nvlt;");
					string = string.replace(regexEncodeNonAscii, function(string) {
						return "&" + encodeMap[string] + ";";
					});
				} else if (!allowUnsafeSymbols) string = string.replace(regexEscape, escapeBmpSymbol);
				return string.replace(regexAstralSymbols, function($0) {
					var high = $0.charCodeAt(0);
					var low = $0.charCodeAt(1);
					return escapeCodePoint((high - 55296) * 1024 + low - 56320 + 65536);
				}).replace(regexBmpWhitelist, escapeBmpSymbol);
			};
			encode.options = {
				"allowUnsafeSymbols": false,
				"encodeEverything": false,
				"strict": false,
				"useNamedReferences": false,
				"decimal": false
			};
			var decode = function(html, options) {
				options = merge(options, decode.options);
				var strict = options.strict;
				if (strict && regexInvalidEntity.test(html)) parseError("malformed character reference");
				return html.replace(regexDecode, function($0, $1, $2, $3, $4, $5, $6, $7, $8) {
					var codePoint;
					var semicolon;
					var decDigits;
					var hexDigits;
					var reference;
					var next;
					if ($1) {
						reference = $1;
						return decodeMap[reference];
					}
					if ($2) {
						reference = $2;
						next = $3;
						if (next && options.isAttributeValue) {
							if (strict && next == "=") parseError("`&` did not start a character reference");
							return $0;
						} else {
							if (strict) parseError("named character reference was not terminated by a semicolon");
							return decodeMapLegacy[reference] + (next || "");
						}
					}
					if ($4) {
						decDigits = $4;
						semicolon = $5;
						if (strict && !semicolon) parseError("character reference was not terminated by a semicolon");
						codePoint = parseInt(decDigits, 10);
						return codePointToSymbol(codePoint, strict);
					}
					if ($6) {
						hexDigits = $6;
						semicolon = $7;
						if (strict && !semicolon) parseError("character reference was not terminated by a semicolon");
						codePoint = parseInt(hexDigits, 16);
						return codePointToSymbol(codePoint, strict);
					}
					if (strict) parseError("named character reference was not terminated by a semicolon");
					return $0;
				});
			};
			decode.options = {
				"isAttributeValue": false,
				"strict": false
			};
			var escape = function(string) {
				return string.replace(regexEscape, function($0) {
					return escapeMap[$0];
				});
			};
			var he = {
				"version": "1.2.0",
				"encode": encode,
				"decode": decode,
				"escape": escape,
				"unescape": decode
			};
			if (typeof define == "function" && typeof define.amd == "object" && define.amd) define(function() {
				return he;
			});
			else if (freeExports && !freeExports.nodeType) {
				if (freeModule) freeModule.exports = he;
				else for (var key in he) has(he, key) && (freeExports[key] = he[key]);
			} else root.he = he;
		})(exports);
	})))(), 1);
	var sizeFormate = (size) => {
		if (!size) return "0 B";
		const units = [
			"B",
			"KB",
			"MB",
			"GB",
			"TB"
		];
		const number = Math.floor(Math.log(size) / Math.log(1024));
		return `${(size / Math.pow(1024, Math.floor(number))).toFixed(2)} ${units[number]}`;
	};
	/**
	* 将字符串、时间戳等格式转成时间对象
	* @param date 时间
	* @returns 时间对象或空字符串
	*/
	var toDateObj = (date) => {
		if (!date) return "";
		switch (typeof date) {
			case "string": if (!date.includes("T")) date = date.split(".")[0].replace(/-/g, "/");
			case "number": date = new Date(date);
			case "object": break;
			default: return "";
		}
		return date;
	};
	var numFix = (n) => n < 10 ? `0${n}` : n.toString();
	/**
	* 时间格式化
	* @param _date 时间
	* @param format Y-M-D h:m:s Y年 M月 D日 h时 m分 s秒
	*/
	var dateFormat = (_date, format = "Y-M-D h:m:s") => {
		const date = toDateObj(_date);
		if (!date) return "";
		return format.replace("Y", date.getFullYear().toString()).replace("M", numFix(date.getMonth() + 1)).replace("D", numFix(date.getDate())).replace("h", numFix(date.getHours())).replace("m", numFix(date.getMinutes())).replace("s", numFix(date.getSeconds()));
	};
	var formatPlayTime = (time) => {
		const m = Math.trunc(time / 60);
		const s = Math.trunc(time % 60);
		return m == 0 && s == 0 ? "--/--" : numFix(m) + ":" + numFix(s);
	};
	//#endregion
	//#region src/shared/utils.ts
	var deduplicationList = (list) => {
		const ids = /* @__PURE__ */ new Set();
		return list.filter((s) => {
			if (ids.has(s.id)) return false;
			ids.add(s.id);
			return true;
		});
	};
	/**
	* 格式化播放数量
	* @param {*} num 数字
	*/
	var formatPlayCount = (num) => {
		if (num > 1e8) return t("count_billion", { num: Math.trunc(num / 1e7) / 10 });
		if (num > 1e4) return t("count_ten_thousand", { num: Math.trunc(num / 1e3) / 10 });
		return String(num);
	};
	var decodeName = (str = "") => {
		if (!str) return "";
		return import_he.default.decode(str);
	};
	//#endregion
	//#region src/onlineResource/kg/hotSearch.ts
	var search$19 = async () => {
		const { body, statusCode } = await request("http://gateway.kugou.com/api/v3/search/hot_tab?signature=ee44edb9d7155821412d220bcaf509dd&appid=1005&clientver=10026&plat=0", { headers: {
			dfid: "1ssiv93oVqMp27cirf2CvoF1",
			mid: "156798703528610303473757548878786007104",
			clienttime: "1584257267",
			"x-router": "msearch.kugou.com",
			"user-agent": "Android9-AndroidPhone-10020-130-0-searchrecommendprotocol-wifi",
			"kg-rc": "1"
		} });
		if (statusCode !== 200 || body.errcode !== 0) throw new Error("kg hotSearch failed");
		const list = [];
		for (const item of body.data?.list ?? []) for (const keyword of item.keywords ?? []) if (keyword.keyword) list.push(decodeName(keyword.keyword));
		return list;
	};
	//#endregion
	//#region src/onlineResource/shared.ts
	var toMD5 = async (str) => crypto.md5(str);
	/**
	* 格式化歌手
	* @param singers 歌手数组
	* @param nameKey 歌手名键值
	* @param join 歌手分割字符
	*/
	var formatSingerName = (singers, nameKey = "name", join = "、") => {
		if (Array.isArray(singers)) {
			const singer = [];
			singers.forEach((item) => {
				const name = item[nameKey];
				if (!name) return;
				singer.push(name);
			});
			return decodeName(singer.join(join));
		}
		return decodeName(String(singers ?? ""));
	};
	//#endregion
	//#region src/onlineResource/kg/utils.ts
	/**
	* 签名
	*/
	var signatureParams = async (params, platform = "android", body = "") => {
		let keyparam = "OIlwieks28dk2k092lksi2UIkp";
		if (platform === "web") keyparam = "NVPh5oo715z5DIWAeQlhMDsWXXQV4hwt";
		const paramList = params.split("&");
		paramList.sort();
		return toMD5(`${keyparam}${paramList.join("")}${body}${keyparam}`);
	};
	var encKey = new Uint8Array([
		64,
		71,
		97,
		119,
		94,
		50,
		116,
		71,
		81,
		54,
		49,
		45,
		206,
		210,
		110,
		105
	]);
	var decodeKrc = async (str) => {
		if (!str.length) return "";
		const bufStr = (await dataConverter(str, "base64", "binary")).slice(4);
		for (let i = 0, len = bufStr.length; i < len; i++) bufStr[i] = bufStr[i] ^ encKey[i % 16];
		return zlib.inflate(bufStr, "utf-8");
	};
	//#endregion
	//#region src/onlineResource/kg/lyric.ts
	var searchLyric = async (name, hash, time) => {
		const { body } = await request(`http://lyrics.kugou.com/search?ver=1&man=yes&client=pc&keyword=${encodeURIComponent(name)}&hash=${hash}&timelength=${time}&lrctxt=1`, { headers: {
			"KG-RC": "1",
			"KG-THash": "expand_search_manager.cpp:852736169:451",
			"User-Agent": "KuGou2012-9020-ExpandSearchManager"
		} });
		if (body.candidates.length) {
			const info = body.candidates[0];
			return {
				id: info.id,
				accessKey: info.accesskey,
				fmt: info.krctype == 1 && info.contenttype != 1 ? "krc" : "lrc"
			};
		}
		return null;
	};
	var headExp = /^.*\[id:\$\w+\]\n/;
	var parseLyric$2 = async (str) => {
		str = str.replace(/\r/g, "");
		if (headExp.test(str)) str = str.replace(headExp, "");
		const trans = /\[language:([\w=\\/+]+)\]/.exec(str);
		let rlyricRaw;
		let tlyricRaw;
		const rlyric = [];
		const tlyric = [];
		if (trans) {
			str = str.replace(/\[language:[\w=\\/+]+\]\n/, "");
			const json = JSON.parse(await dataConverter(trans[1], "base64", "utf-8"));
			for (const item of json.content) switch (item.type) {
				case 0:
					rlyricRaw = item.lyricContent;
					break;
				case 1: tlyricRaw = item.lyricContent;
			}
		}
		let i = 0;
		let awlyric = str.replace(/\[((\d+),\d+)\].*/g, (str) => {
			const result = /\[((\d+),\d+)\].*/.exec(str);
			let time = parseInt(result[2]);
			const ms = (time % 1e3).toString().padStart(3, "0");
			time /= 1e3;
			const m = Math.trunc(time / 60).toString().padStart(2, "0");
			time %= 60;
			const timeLabel = `${m}:${Math.trunc(time).toString().padStart(2, "0")}.${ms}`;
			if (rlyricRaw) rlyric[i] = `[${timeLabel}]${rlyricRaw[i]?.join("") ?? ""}`;
			if (tlyricRaw) tlyric[i] = `[${timeLabel}]${tlyricRaw[i]?.join("") ?? ""}`;
			i++;
			return str.replace(result[1], timeLabel);
		});
		let rlyricStr = rlyric.length ? rlyric.join("\n") : "";
		let tlyricStr = tlyric.length ? tlyric.join("\n") : "";
		awlyric = awlyric.replace(/<(\d+,\d+),\d+>/g, "<$1>");
		awlyric = decodeName(awlyric);
		const lyric = awlyric.replace(/<\d+,\d+>/g, "");
		rlyricStr = decodeName(rlyricStr);
		tlyricStr = decodeName(tlyricStr);
		return {
			lyric,
			tlyric: tlyricStr,
			rlyric: rlyricStr,
			awlyric
		};
	};
	var getLyricDownload = async (id, accessKey, fmt) => {
		const { body } = await request(`http://lyrics.kugou.com/download?ver=1&client=pc&id=${id}&accesskey=${accessKey}&fmt=${fmt}&charset=utf8`, { headers: {
			"KG-RC": "1",
			"KG-THash": "expand_search_manager.cpp:852736169:451",
			"User-Agent": "KuGou2012-9020-ExpandSearchManager"
		} });
		switch (body.fmt) {
			case "krc": return parseLyric$2(await decodeKrc(body.content));
			case "lrc": return {
				lyric: await dataConverter(body.content, "base64", "utf-8"),
				tlyric: "",
				rlyric: "",
				awlyric: ""
			};
			default: throw new Error(`未知歌词格式: ${body.fmt}`);
		}
	};
	var getIntv = (interval) => {
		if (!interval) return 0;
		const intvArr = interval.split(":");
		let intv = 0;
		let unit = 1;
		while (intvArr.length) {
			intv += parseInt(intvArr.pop()) * unit;
			unit *= 60;
		}
		return intv;
	};
	var getLyric$4 = async (musicInfo) => {
		const result = await searchLyric(musicInfo.name, musicInfo.meta.hash, musicInfo.meta._interval || getIntv(musicInfo.interval));
		if (!result) throw new Error("Get lyric failed");
		const lrc = await getLyricDownload(result.id, result.accessKey, result.fmt);
		console.log("kg lyric:", musicInfo.meta.hash);
		return lrc;
	};
	//#endregion
	//#region src/onlineResource/kg/msuicComment.ts
	var replaceAt = (raw, atList) => {
		let result = raw;
		for (const atObj of atList) result = result.replaceAll(`[at=${String(atObj.id)}]`, `@${atObj.name} `);
		return result;
	};
	var formatImages = (images) => {
		if (!images || !Array.isArray(images)) return [];
		return images.map((i) => typeof i === "string" ? i : i.url);
	};
	var buildCommentItem$1 = (item) => {
		const text = (item.atlist ? replaceAt(item.content, item.atlist) : item.content) || "";
		const time = item.addtimestamp ? item.addtimestamp * 1e3 : void 0;
		return {
			id: String(item.id),
			text,
			time,
			userName: item.user_name,
			avatar: item.user_pic,
			userId: String(item.user_id),
			likedCount: item.like.likenum,
			images: formatImages(item.images),
			reply: []
		};
	};
	var filterComment$3 = (rawList) => {
		if (!rawList) return [];
		return rawList.map((item) => {
			const data = buildCommentItem$1(item);
			if (item.pcontent) return {
				id: String(item.id),
				text: item.pcontent,
				time: void 0,
				userName: item.puser,
				avatar: void 0,
				userId: String(item.puser_id),
				likedCount: void 0,
				images: [],
				reply: [data]
			};
			return data;
		});
	};
	var buildParams = (hash, page, limit) => {
		return `dfid=0&mid=16249512204336365674023395779019&clienttime=${Date.now()}&uuid=0&extdata=${hash}&appid=1005&code=fc4be23b4e972707f36b8a828a93ba8a&schash=${hash}&clientver=11409&p=${page}&clienttoken=&pagesize=${limit}&ver=10&kugouid=0`;
	};
	var getComment$4 = async (musicInfo, page = 1, limit = 20) => {
		const params = buildParams(musicInfo.meta.hash ?? "", page, limit);
		const { body, statusCode } = await request(`http://m.comment.service.kugou.com/r/v1/rank/newest?${params}&signature=${await signatureParams(params)}`, { headers: { "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.24" } });
		if (statusCode !== 200 || body.err_code !== 0) throw new Error("kg getComment failed");
		const total = body.count ?? 0;
		return {
			list: filterComment$3(body.list),
			total,
			page,
			limit
		};
	};
	var getHotComment$4 = async (musicInfo, page = 1, limit = 20) => {
		const params = buildParams(musicInfo.meta.hash ?? "", page, limit);
		const { body, statusCode } = await request(`http://m.comment.service.kugou.com/r/v1/rank/topliked?${params}&signature=${await signatureParams(params)}`, { headers: { "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.24" } });
		if (statusCode !== 200 || body.err_code !== 0) throw new Error("kg getHotComment failed");
		const total = body.count ?? 0;
		return {
			list: filterComment$3(body.list),
			total,
			page,
			limit
		};
	};
	var getReplyComment$1 = async (musicInfo, replyId, page = 1, limit = 100) => {
		const { body, statusCode } = await request(`http://comment.service.kugou.com/index.php?r=commentsv2/getReplyWithLike&code=fc4be23b4e972707f36b8a828a93ba8a&p=${page}&pagesize=${limit}&ver=1.01&clientver=8373&kugouid=687373022&need_show_image=1&appid=1001&childrenid=${String(musicInfo.meta.musicId)}&tid=${replyId}`, { headers: { "User-Agent": "Android712-AndroidPhone-8983-18-0-COMMENT-wifi" } });
		if (statusCode !== 200 || body.err_code !== 0) throw new Error("kg getReplyComment failed");
		const total = body.count ?? 0;
		return {
			list: filterComment$3(body.list),
			total,
			page,
			limit
		};
	};
	var musicComment$4 = async (options) => {
		const { musicInfo, type, page, limit } = options;
		switch (type) {
			case "new": return getComment$4(musicInfo, page, limit);
			case "hot": return getHotComment$4(musicInfo, page, limit);
			case "reply":
				if (!options.id) throw new Error("id is required for reply type");
				return getReplyComment$1(musicInfo, options.id, page, limit);
		}
		throw new Error("Invalid comment type");
	};
	//#endregion
	//#region src/onlineResource/kg/musicSearch.ts
	var pageInfo$14 = {
		limit: 30,
		total: 0,
		page: 0,
		allPage: 1,
		successCode: 0
	};
	var musicSearch$4 = async (str, page, limit) => {
		const { body } = await request(`https://songsearch.kugou.com/song_search_v2?keyword=${encodeURIComponent(str)}&page=${page}&pagesize=${limit}&userid=0&clientver=&platform=WebFilter&filter=2&iscorrection=1&privilege_filter=0&area_code=1`);
		return body;
	};
	var filterData$3 = (rawData) => {
		const types = {};
		if (rawData.FileSize !== 0) types["128k"] = {
			sizeStr: sizeFormate(rawData.FileSize),
			hash: rawData.FileHash
		};
		if (rawData.HQFileSize !== 0) types["320k"] = {
			sizeStr: sizeFormate(rawData.HQFileSize),
			hash: rawData.HQFileHash
		};
		if (rawData.SQFileSize !== 0) types.flac = {
			sizeStr: sizeFormate(rawData.SQFileSize),
			hash: rawData.SQFileHash
		};
		if (rawData.ResFileSize !== 0) types.flac24bit = {
			sizeStr: sizeFormate(rawData.ResFileSize),
			hash: rawData.ResFileHash
		};
		return {
			id: `kg_${String(rawData.Audioid)}_${rawData.FileHash}`,
			name: decodeName(`${rawData.OriSongName}${rawData.Suffix ? ` ${rawData.Suffix}` : ""}`),
			singer: decodeName(formatSingerName(rawData.Singers, "name")),
			interval: formatPlayTime(rawData.Duration),
			isLocal: false,
			meta: {
				albumName: decodeName(rawData.AlbumName),
				source: "kg",
				musicId: String(rawData.Audioid),
				qualitys: types,
				createTime: 0,
				posTime: 0,
				updateTime: 0,
				albumId: rawData.AlbumID,
				albumAudioId: rawData.MixSongID,
				hash: rawData.FileHash,
				_interval: rawData.Duration
			}
		};
	};
	var handleResult$2 = (rawData) => {
		const ids = /* @__PURE__ */ new Set();
		const list = [];
		rawData.forEach((item) => {
			const key = item.Audioid + item.FileHash;
			if (ids.has(key)) return;
			ids.add(key);
			list.push(filterData$3(item));
			for (const childItem of item?.Grp ?? []) {
				const key = item.Audioid + item.FileHash;
				if (ids.has(key)) continue;
				ids.add(key);
				list.push(filterData$3(childItem));
			}
		});
		return list;
	};
	var search$18 = async (str, page = 1, limit) => {
		limit ??= pageInfo$14.limit;
		const result = await musicSearch$4(str, page, limit);
		const list = handleResult$2(result.data.lists);
		pageInfo$14.total = result.data.total;
		pageInfo$14.page = page;
		pageInfo$14.allPage = Math.ceil(pageInfo$14.total / limit);
		return {
			list,
			limit,
			total: pageInfo$14.total,
			page: pageInfo$14.page
		};
	};
	//#endregion
	//#region src/onlineResource/kg/pic.ts
	var getPic$4 = async (musicInfo) => {
		const { body } = await request("http://media.store.kugou.com/v1/get_res_privilege", {
			method: "POST",
			headers: {
				"KG-RC": "1",
				"KG-THash": "expand_search_manager.cpp:852736169:451",
				"User-Agent": "KuGou2012-9020-ExpandSearchManager"
			},
			json: {
				appid: 1001,
				area_code: "1",
				behavior: "play",
				clientver: "9020",
				need_hash_offset: 1,
				relate: 1,
				resource: [{
					album_audio_id: musicInfo.meta.musicId,
					album_id: musicInfo.meta.albumId,
					hash: musicInfo.meta.hash,
					id: 0,
					name: `${musicInfo.singer} - ${musicInfo.name}.mp3`,
					type: "audio"
				}],
				token: "",
				userid: 2626431536,
				vip: 1
			}
		});
		const info = body.data[0].info;
		const img = info.imgsize ? info.image.replace("{size}", info.imgsize[0]) : info.image;
		if (!img) return Promise.reject(/* @__PURE__ */ new Error("Pic get failed"));
		console.log("kg pic:", img);
		return img;
	};
	//#endregion
	//#region src/onlineResource/kg/musicDetail.ts
	var pageInfo$13 = {
		maxRetryNum: 3,
		maxBatchSize: 100
	};
	var deDuplication = (hashes) => {
		const ids = /* @__PURE__ */ new Set();
		return hashes.filter((item) => {
			if (!item.hash || ids.has(item.hash)) return false;
			ids.add(item.hash);
			return true;
		});
	};
	var createQuality$1 = (size, hash) => {
		const sizeInt = Number.parseInt(size, 10);
		if (!hash || !Number.isFinite(sizeInt) || sizeInt <= 0) return null;
		return {
			sizeStr: sizeFormate(sizeInt),
			hash
		};
	};
	var filterData2 = (rawList) => {
		const ids = /* @__PURE__ */ new Set();
		const list = [];
		rawList.forEach((item) => {
			if (!item) return;
			const audioId = String(item.audio_info.audio_id);
			if (!audioId || ids.has(audioId)) return;
			ids.add(audioId);
			const qualitys = {};
			const quality128 = createQuality$1(item.audio_info.filesize, item.audio_info.hash);
			if (quality128) qualitys["128k"] = quality128;
			const quality320 = createQuality$1(item.audio_info.filesize_320, item.audio_info.hash_320);
			if (quality320) qualitys["320k"] = quality320;
			const qualityFlac = createQuality$1(item.audio_info.filesize_flac, item.audio_info.hash_flac);
			if (qualityFlac) qualitys.flac = qualityFlac;
			const qualityHiRes = createQuality$1(item.audio_info.filesize_high, item.audio_info.hash_high);
			if (qualityHiRes) qualitys.flac24bit = qualityHiRes;
			const timelength = Number.parseInt(item.audio_info.timelength, 10);
			const intervalSecond = Number.isFinite(timelength) ? timelength / 1e3 : 0;
			list.push({
				id: `kg_${audioId}_${item.audio_info.hash}`,
				name: decodeName(item.songname || item.ori_audio_name || ""),
				singer: decodeName(item.author_name || ""),
				interval: formatPlayTime(intervalSecond),
				isLocal: false,
				meta: {
					albumName: decodeName(item.album_info.album_name || ""),
					albumId: Number(item.album_info.album_id || 0),
					albumAudioId: item.audio_info.audio_group_id,
					source: "kg",
					musicId: audioId,
					qualitys,
					createTime: 0,
					posTime: 0,
					updateTime: 0,
					hash: item.audio_info.hash,
					_interval: intervalSecond,
					picUrl: null
				}
			});
		});
		return list;
	};
	var createTask = (hashes) => {
		const commonData = {
			area_code: "1",
			show_privilege: 1,
			show_album_info: "1",
			is_publish: "",
			appid: 1005,
			clientver: 11451,
			mid: "1",
			dfid: "-",
			clienttime: Date.now(),
			key: "OIlwieks28dk2k092lksi2UIkp",
			fields: "album_info,author_name,audio_info,ori_audio_name,base,songname"
		};
		const list = [...hashes];
		const tasks = [];
		while (list.length) tasks.push({
			...commonData,
			data: list.splice(0, pageInfo$13.maxBatchSize)
		});
		return tasks;
	};
	var requestData = async (task) => {
		const { body, statusCode } = await request("http://gateway.kugou.com/v2/album_audio/audio", {
			method: "POST",
			json: task,
			headers: {
				"KG-THash": "13a3164",
				"KG-RC": "1",
				"KG-Fake": "0",
				"KG-RF": "00869891",
				"User-Agent": "Android712-AndroidPhone-11451-376-0-FeeCacheUpdate-wifi",
				"x-router": "kmr.service.kugou.com"
			}
		});
		const bodyData = body;
		const errorCode = bodyData.error_code ?? bodyData.errcode ?? bodyData.err_code ?? -1;
		if (statusCode !== 200 || errorCode !== 0 || !Array.isArray(body.data)) throw new Error("kg getMusicInfos failed");
		return body.data.map((item) => {
			if (!Array.isArray(item)) return null;
			return item[0] ?? null;
		});
	};
	var getMusicInfos$1 = async (hashes) => {
		const targetHashes = deDuplication(hashes);
		if (!targetHashes.length) return [];
		return filterData2((await Promise.all(createTask(targetHashes).map(async (task) => requestData(task)))).flat());
	};
	//#endregion
	//#region src/onlineResource/kg/songlistDetail.ts
	var pageInfo$12 = { limitSong: 1e4 };
	var regExps$6 = {
		listData: /global\.data = (\[.+\]);/,
		listInfo: /global = {[\s\S]+?name: "(.+)"[\s\S]+?pic: "(.+)"[\s\S]+?};/,
		listDetailLink: /^.+\/(\d+)\.html(?:\?.*|&.*$|#.*$|$)/
	};
	var getSongListDetailUrl = (id) => {
		return `http://www2.kugou.kugou.com/yueku/v9/special/single/${id}-5-9999.html`;
	};
	var parseHtmlDesc = (html) => {
		let index = html.indexOf("<div class=\"pc_specail_text pc_singer_tab_content\" id=\"specailIntroduceWrap\">");
		if (index < 0) return null;
		const afterStr = html.substring(index + 77);
		index = afterStr.indexOf("</div>");
		if (index < 0) return null;
		return afterStr.substring(0, index);
	};
	var parseDetailHtml = (html) => {
		const listData = regExps$6.listData.exec(html);
		if (!listData) return null;
		let hashes;
		try {
			hashes = JSON.parse(listData[1]);
		} catch {
			return null;
		}
		const listInfo = regExps$6.listInfo.exec(html);
		const desc = parseHtmlDesc(html);
		return {
			hashes,
			info: {
				name: decodeName(listInfo?.[1] ?? ""),
				img: listInfo?.[2] ?? "",
				desc: decodeName(desc ?? ""),
				author: "",
				play_count: ""
			}
		};
	};
	var getListDetailBySpecialId = async (id, page) => {
		const { body, statusCode } = await request(getSongListDetailUrl(id));
		if (statusCode !== 200) throw new Error("kg getListDetailBySpecialId failed");
		const parsed = parseDetailHtml(body);
		if (!parsed) throw new Error("kg getListDetailBySpecialId parse failed");
		const list = await getMusicInfos$1(parsed.hashes);
		return {
			list,
			page: 1,
			limit: pageInfo$12.limitSong,
			total: list.length,
			info: parsed.info
		};
	};
	var getErrorCode = (body) => {
		return body.error_code ?? body.errcode ?? body.err_code ?? 0;
	};
	var requestWithRetry = async (url, options) => {
		const { body, statusCode } = await request(url, options);
		if (statusCode !== 200 || getErrorCode(body) !== 0) throw new Error(`kg songlistDetail request failed: ${url}`);
		return body;
	};
	var decodeGcid = async (gcid) => {
		const params = "dfid=-&appid=1005&mid=0&clientver=20109&clienttime=640612895&uuid=-";
		const payload = {
			ret_info: 1,
			data: [{
				id: gcid,
				id_type: 2
			}]
		};
		const collectionId = (await requestWithRetry(`https://t.kugou.com/v1/songlist/batch_decode?${params}&signature=${await signatureParams(params, "android", JSON.stringify(payload))}`, {
			method: "POST",
			headers: {
				"User-Agent": "Mozilla/5.0 (Linux; Android 10; HUAWEI HMA-AL00) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.106 Mobile Safari/537.36",
				Referer: "https://m.kugou.com/"
			},
			json: payload
		})).data.list?.[0]?.global_collection_id;
		if (!collectionId) throw new Error("kg decodeGcid failed");
		return collectionId;
	};
	var createGetListDetail2Task = async (id, total) => {
		const tasks = [];
		let page = 0;
		while (total > 0) {
			const limit = total > 300 ? 300 : total;
			total -= limit;
			page += 1;
			const params = `appid=1058&global_specialid=${id}&specialid=0&plat=0&version=8000&page=${page}&pagesize=${limit}&srcappid=2919&clientver=20000&clienttime=1586163263991&mid=1586163263991&uuid=1586163263991&dfid=-`;
			const signature = await signatureParams(params, "web");
			tasks.push(requestWithRetry(`https://mobiles.kugou.com/api/v5/special/song_v2?${params}&signature=${signature}`, { headers: {
				mid: "1586163263991",
				Referer: "https://m3ws.kugou.com/share/index.php",
				"User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1",
				dfid: "-",
				clienttime: "1586163263991"
			} }).then((resp) => resp.data.info ?? []));
		}
		return Promise.all(tasks).then((datas) => datas.flat());
	};
	var getListDetailByGcidChain = async (id, chain) => {
		const LIMIT = 50;
		const params = `srcappid=2919&clientver=20000&clienttime=1789566751657&mid=1789566751657&uuid=1789566751657&dfid=-&listid=15&type=0&pagesize=${LIMIT}&global_collection_id=${id}&page=1&share_type=collect&appid=1058&chain=${chain}`;
		const data = await requestWithRetry(`https://m3ws.kugou.com/v2/zlist/list?${params}&signature=${await signatureParams(params, "web")}`, { headers: {
			mid: "1586163263991",
			Referer: "https://m3ws.kugou.com/share/index.php",
			"User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1",
			dfid: "-",
			clienttime: "1586163263991"
		} });
		const info = data.info[0];
		if (!info) throw new Error("get list error");
		let tasks = [Promise.resolve(data.list.info)];
		let page = 1;
		let totalPage = Math.ceil(info.count / LIMIT);
		while (page < totalPage) {
			page += 1;
			const params = `srcappid=2919&clientver=20000&clienttime=1789566751657&mid=1789566751657&uuid=1789566751657&dfid=-&listid=15&type=0&pagesize=${LIMIT}&global_collection_id=${id}&page=${page}&share_type=collect&appid=1058&chain=${chain}`;
			const signature = await signatureParams(params, "web");
			tasks.push(requestWithRetry(`https://m3ws.kugou.com/v2/zlist/list?${params}&signature=${signature}`, { headers: {
				mid: "1586163263991",
				Referer: "https://m3ws.kugou.com/share/index.php",
				"User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1",
				dfid: "-",
				clienttime: "1586163263991"
			} }).then((resp) => resp.list.info ?? []));
		}
		let list = await getMusicInfos$1(await Promise.all(tasks).then(([ ...datas]) => datas.flat()));
		return {
			list,
			page: 1,
			limit: list.length,
			total: info.count,
			source: "kg",
			info: {
				name: info.name,
				img: info.pic?.replace("{size}", "240"),
				desc: info.intro,
				author: info.list_create_username
			}
		};
	};
	var getUserListDetail2 = async (globalCollectionId, page) => {
		if (globalCollectionId.length > 1e3) throw new Error("kg getUserListDetail2 failed");
		const infoParams = `appid=1058&specialid=0&global_specialid=${globalCollectionId}&format=jsonp&srcappid=2919&clientver=20000&clienttime=1586163242519&mid=1586163242519&uuid=1586163242519&dfid=-`;
		const { data: info } = await requestWithRetry(`https://mobiles.kugou.com/api/v5/special/info_v2?${infoParams}&signature=${await signatureParams(infoParams, "web")}`, { headers: {
			mid: "1586163242519",
			Referer: "https://m3ws.kugou.com/share/index.php",
			"User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1",
			dfid: "-",
			clienttime: "1586163242519"
		} });
		const list = await getMusicInfos$1(await createGetListDetail2Task(globalCollectionId, info.songcount));
		return {
			list,
			page,
			limit: pageInfo$12.limitSong,
			total: list.length,
			info: {
				name: info.specialname,
				img: info.imgurl?.replace("{size}", "240") ?? "",
				desc: info.intro,
				author: info.nickname,
				date: info.publishtime ? dateFormat(info.publishtime, "Y-M-D") : "",
				play_count: formatPlayCount(info.playcount)
			}
		};
	};
	var getListInfoByChain = async (chain) => {
		const { body, statusCode } = await request(`https://m.kugou.com/share/?chain=${chain}&id=${chain}`, { headers: { "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1" } });
		if (statusCode !== 200) throw new Error("kg getListInfoByChain failed");
		const result = /var\sphpParam\s=\s({.+?});/.exec(body);
		if (!result?.[1]) throw new Error("kg getListInfoByChain failed");
		return JSON.parse(result[1]);
	};
	var getUserListDetailByPcChain = async (chain) => {
		const { body, statusCode } = await request(`http://www.kugou.com/share/${chain}.html`, { headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36" } });
		if (statusCode !== 200) throw new Error("kg getUserListDetailByPcChain failed");
		const result = /var\sdataFromSmarty\s=\s(\[.+?\])/.exec(body);
		if (!result?.[1]) throw new Error("kg getUserListDetailByPcChain failed");
		return getMusicInfos$1(JSON.parse(result[1]));
	};
	var getUserListDetail5 = async (chain, page) => {
		const [listInfo, list] = await Promise.all([getListInfoByChain(chain), getUserListDetailByPcChain(chain)]);
		return {
			list,
			page,
			limit: pageInfo$12.limitSong,
			total: list.length,
			info: {
				name: listInfo.specialname ?? "",
				img: listInfo.imgurl ? listInfo.imgurl.replace("{size}", "240") : "",
				desc: "",
				author: listInfo.nickname ?? "",
				play_count: ""
			}
		};
	};
	var getUserListDetailById = async (id, page, limit) => {
		const params = `srcappid=2919&clientver=20000&appid=1058&type=0&module=playlist&page=${page}&pagesize=${limit}&specialid=${String(id)}`;
		const rawResp = await requestWithRetry(`https://pubsongscdn.kugou.com/v2/get_other_list_file?${params}&signature=${await signatureParams(params, "web")}`, { headers: {
			Referer: "https://m3ws.kugou.com/share/index.php",
			"User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1",
			dfid: "-"
		} });
		return getMusicInfos$1(rawResp && typeof rawResp === "object" && "info" in rawResp && Array.isArray(rawResp.info) ? rawResp.info ?? [] : []);
	};
	var getUserListDetail4 = async (songInfo, chain, page) => {
		const limit = 100;
		const songInfoId = songInfo.id;
		const [listInfo, list] = await Promise.all([getListInfoByChain(chain), typeof songInfoId === "string" || typeof songInfoId === "number" ? getUserListDetailById(songInfoId, page, limit) : Promise.resolve([])]);
		return {
			list,
			page,
			limit,
			total: list.length,
			info: {
				name: listInfo.specialname ?? "",
				img: listInfo.imgurl ? listInfo.imgurl.replace("{size}", "240") : "",
				desc: "",
				author: listInfo.nickname ?? "",
				play_count: ""
			}
		};
	};
	var getUserListDetail3 = async (chain, page) => {
		const { info: songInfo } = await requestWithRetry(`http://m.kugou.com/schain/transfer?pagesize=${pageInfo$12.limitSong}&chain=${chain}&su=1&page=${page}&n=0.7928855356604456`, { headers: { "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1" } });
		if (!songInfo.list?.length) {
			if (songInfo.global_collection_id) return getListDetailByGcidChain(songInfo.global_collection_id, chain).catch(async () => getUserListDetail2(songInfo.global_collection_id, page));
			return getUserListDetail4(songInfo, chain, page).catch(async () => getUserListDetail5(chain, page));
		}
		const list = await getMusicInfos$1(songInfo.list);
		return {
			list,
			page,
			limit: pageInfo$12.limitSong,
			total: list.length,
			info: {
				name: songInfo.info?.name ?? "未命名歌单",
				img: songInfo.info?.img ?? "",
				desc: "",
				author: songInfo.info?.username ?? "",
				play_count: ""
			}
		};
	};
	var getUserListDetailByCode = async (id, page) => {
		const body = await requestWithRetry("http://t.kugou.com/command/", {
			method: "POST",
			headers: {
				"KG-RC": "1",
				"KG-THash": "network_super_call.cpp:3676261689:379",
				"User-Agent": ""
			},
			json: {
				appid: 1001,
				clientver: 9020,
				mid: "21511157a05844bd085308bc76ef3343",
				clienttime: 640612895,
				key: "36164c4015e704673c588ee202b9ecb8",
				data: id
			}
		});
		const info = body.data.info;
		if (info.type === 2 && !info.global_collection_id && info.id) return getListDetailBySpecialId(String(info.id), page);
		if (info.global_collection_id) return getUserListDetail2(info.global_collection_id, page);
		const list = await getMusicInfos$1(body.data.list ?? []);
		return {
			list,
			page,
			limit: Number(info.count ?? pageInfo$12.limitSong),
			total: list.length,
			info: {
				name: info.name ?? "",
				img: info.img_size ? info.img_size.replace("{size}", "240") : info.img ?? "",
				desc: "",
				author: info.username ?? "",
				play_count: ""
			}
		};
	};
	var getUserListDetail = async (link, page) => {
		let rawLink = link;
		if (rawLink.includes("#")) rawLink = rawLink.replace(/#.*$/, "");
		if (rawLink.includes("global_collection_id") && rawLink.includes("chain")) return getListDetailByGcidChain(rawLink.replace(/^.*?global_collection_id=(\w+)(?:&.*$|#.*$|$)/, "$1"), rawLink.replace(/^.*?chain=(\w+)(?:&.*$|#.*$|$)/, "$1"));
		const gcidInLink = /gcid_\w+/.exec(rawLink)?.[0];
		if (gcidInLink) return getUserListDetail2(await decodeGcid(gcidInLink), page);
		if (rawLink.includes("chain=")) return getUserListDetail3(rawLink.replace(/^.*?chain=(\w+)(?:&.*$|#.*$|$)/, "$1"), page);
		if (rawLink.includes(".html")) {
			if (rawLink.includes("zlist.html")) {
				rawLink = rawLink.replace(/^(.*)zlist\.html/, "https://m3ws.kugou.com/zlist/list");
				if (rawLink.includes("pagesize")) rawLink = rawLink.replace("pagesize=30", `pagesize=${pageInfo$12.limitSong}`).replace("page=1", `page=${page}`);
				else rawLink += `&pagesize=${pageInfo$12.limitSong}&page=${page}`;
			} else if (!rawLink.includes("song.html")) return getUserListDetail3(rawLink.replace(/.+\/(\w+).html(?:\?.*|&.*$|#.*$|$)/, "$1"), page);
		}
		if (rawLink.includes("global_collection_id")) return getUserListDetail2(rawLink.replace(/^.*?global_collection_id=(\w+)(?:&.*$|#.*$|$)/, "$1"), page);
		const { body, statusCode, headers: { location } } = await request(rawLink, {
			maxRedirect: 0,
			headers: {
				"User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1",
				Referer: rawLink
			}
		});
		if ((statusCode ?? 500) >= 400) throw new Error("kg getUserListDetail failed");
		const nextLocation = Array.isArray(location) ? location[0] : location;
		if (nextLocation) return getUserListDetail(nextLocation, page);
		let globalCollectionId = /"global_collection_id":"(\w+)"/.exec(body)?.[1];
		if (!globalCollectionId) {
			let gcid = /"encode_gic":"(\w+)"/.exec(body)?.[1];
			gcid ||= /"encode_src_gid":"(\w+)"/.exec(body)?.[1];
			if (gcid) globalCollectionId = await decodeGcid(gcid);
		}
		if (globalCollectionId) return getUserListDetail2(globalCollectionId, page);
		throw new Error("kg getUserListDetail failed");
	};
	var getListDetail$4 = async (id, page, _limit = pageInfo$12.limitSong) => {
		let rawId = String(id);
		if (rawId.includes("special/single/")) {
			rawId = rawId.replace(regExps$6.listDetailLink, "$1");
			return getListDetailBySpecialId(rawId, page);
		}
		if (rawId.startsWith("id_")) {
			rawId = rawId.replace("id_", "");
			return getListDetailBySpecialId(rawId, page);
		}
		if (/^\d+$/.test(rawId)) return getUserListDetailByCode(rawId, page);
		if (/^https?:/.test(rawId)) {
			const linkId = regExps$6.listDetailLink.exec(rawId)?.[1];
			if (linkId) return getListDetailBySpecialId(linkId, page);
			return getUserListDetail(rawId, page);
		}
		return getListDetailBySpecialId(rawId, page);
	};
	//#endregion
	//#region src/onlineResource/kg/songlist.ts
	var pageInfo$11 = { sortList: [
		{
			id: "5",
			label: "recommend",
			name: "推荐"
		},
		{
			id: "6",
			label: "hot",
			name: "最热"
		},
		{
			id: "7",
			label: "new",
			name: "最新"
		},
		{
			id: "3",
			label: "hot_collect",
			name: "热藏"
		},
		{
			id: "8",
			label: "soaring",
			name: "飙升"
		}
	] };
	var getInfoUrl = (tagId) => {
		return tagId ? `http://www2.kugou.kugou.com/yueku/v9/special/getSpecial?is_smarty=1&cdn=cdn&t=5&c=${tagId}` : "http://www2.kugou.kugou.com/yueku/v9/special/getSpecial?is_smarty=1&";
	};
	var getSongListUrl = (sortId, tagId, page) => {
		const id = tagId || "";
		console.log(sortId, tagId, page, `http://www2.kugou.kugou.com/yueku/v9/special/getSpecial?is_ajax=1&cdn=cdn&t=${sortId}&c=${id}&p=${page}`);
		return `http://www2.kugou.kugou.com/yueku/v9/special/getSpecial?is_ajax=1&cdn=cdn&t=${sortId}&c=${id}&p=${page}`;
	};
	var filterInfoHotTag$2 = (rawData) => {
		const result = [];
		if (rawData.status !== 1) return result;
		for (const key of Object.keys(rawData.data)) {
			const tag = rawData.data[key];
			result.push({
				id: tag.special_id,
				name: tag.special_name
			});
		}
		return result;
	};
	var filterTagInfo$3 = (tagMap) => {
		const result = [];
		for (const name of Object.keys(tagMap)) result.push({
			name,
			list: tagMap[name].data.map((tag) => ({
				id: String(tag.id),
				name: tag.name
			}))
		});
		return result;
	};
	var filterList$4 = (rawData) => {
		return rawData.map((item) => ({
			play_count: ("total_play_count" in item ? item.total_play_count : "") || formatPlayCount(Number(item.play_count ?? 0)),
			id: `id_${item.specialid}`,
			author: item.nickname,
			name: item.specialname,
			time: dateFormat("publish_time" in item ? item.publish_time : item.publishtime, "Y-M-D"),
			img: "img" in item ? item.img : item.imgurl,
			desc: item.intro
		}));
	};
	var getSongList = async (sortId, tagId, page) => {
		console.log({
			sortId,
			tagId,
			page
		});
		const { body, statusCode } = await request(getSongListUrl(sortId, tagId, page));
		if (statusCode !== 200 || body?.status !== 1) throw new Error("get songlist failed");
		return filterList$4(body.special_db);
	};
	var getSongListRecommend = async () => {
		const { body, statusCode } = await request("http://everydayrec.service.kugou.com/guess_special_recommend", {
			method: "POST",
			headers: { "User-Agent": "KuGou2012-8275-web_browser_event_handler" },
			json: {
				appid: 1001,
				clienttime: 1566798337219,
				clientver: 8275,
				key: "f1f93580115bb106680d2375f8032d96",
				mid: "21511157a05844bd085308bc76ef3343",
				platform: "pc",
				userid: "262643156",
				return_min: 6,
				return_max: 15
			}
		});
		if (statusCode !== 200 || body.status !== 1) throw new Error("get songlist recommend failed");
		return filterList$4(body.data.special_list);
	};
	var currentListInfo = {
		tagId: null,
		total: 0,
		limit: 0
	};
	var getListInfo = async (tagId) => {
		if (currentListInfo.tagId != null && currentListInfo.tagId == tagId) return {
			total: currentListInfo.total,
			limit: currentListInfo.limit
		};
		const { body, statusCode } = await request(getInfoUrl(tagId));
		if (statusCode !== 200 || body.status !== 1) throw new Error("kg getListInfo failed");
		currentListInfo.tagId = tagId;
		currentListInfo.total = body.data.params.total;
		currentListInfo.limit = body.data.params.pagesize;
		return {
			total: currentListInfo.total,
			limit: currentListInfo.limit
		};
	};
	var getSorts$4 = async () => {
		return pageInfo$11.sortList.map((item) => ({
			id: item.id,
			name: `{songlist.sort.${item.label}}`
		}));
	};
	var getTags$4 = async () => {
		const { body, statusCode } = await request(getInfoUrl());
		if (statusCode !== 200 || body.status !== 1) throw new Error("kg getTags failed");
		return {
			tags: filterTagInfo$3(body.data.tagids),
			hotTags: filterInfoHotTag$2(body.data.hotTag)
		};
	};
	var getList$10 = async (sortId, tagId, page) => {
		const [list, listInfo, recommendList] = await Promise.all([
			getSongList(sortId, tagId, page),
			getListInfo(tagId),
			!tagId && page === 1 && sortId === pageInfo$11.sortList[0].id ? getSongListRecommend() : Promise.resolve(null)
		]);
		if (recommendList) list.unshift(...recommendList);
		return {
			list,
			total: listInfo.total,
			limit: listInfo.limit,
			page
		};
	};
	var search$17 = async (keyword, page, limit = 20) => {
		const { body, statusCode } = await request(`http://msearchretry.kugou.com/api/v3/search/special?keyword=${encodeURIComponent(keyword)}&page=${page}&pagesize=${limit}&showtype=10&filter=0&version=7910&sver=2`);
		if (statusCode !== 200 || body.errcode !== 0) throw new Error("kg songlist search failed");
		return {
			list: body.data.info.map((item) => ({
				play_count: formatPlayCount(item.playcount),
				id: `id_${item.specialid}`,
				author: item.nickname,
				name: item.specialname,
				time: dateFormat(item.publishtime, "Y-M-D"),
				img: item.imgurl,
				desc: item.intro,
				total: item.songcount
			})),
			total: body.data.total,
			limit,
			page
		};
	};
	//#endregion
	//#region src/onlineResource/kg/tipSearch.ts
	var search$16 = async (str) => {
		const { body, statusCode } = await request(`https://searchtip.kugou.com/getSearchTip?MusicTipCount=10&keyword=${encodeURIComponent(str)}`, { headers: { Referer: "https://www.kugou.com/" } });
		if (statusCode !== 200 || body.error_code !== 0 || !body.data.length) throw new Error("kg tipSearch failed");
		return body.data[0].RecordDatas.map((item) => item.HintInfo ?? "").filter(Boolean);
	};
	//#endregion
	//#region src/onlineResource/kg/topSongs.ts
	var pageInfo$10 = {
		listDetailLimit: 100,
		maxRetryNum: 3
	};
	var boardList$4 = [
		{
			id: "8888",
			name: "TOP500",
			bangid: "8888",
			picUrl: "http://imge.kugou.com/mcommon/500/20241219/20241219164209670219.png"
		},
		{
			id: "85897",
			name: "国潮音乐榜",
			bangid: "85897",
			picUrl: "http://imge.kugou.com/mcommon/500/20241120/20241120202644296668.jpg"
		},
		{
			id: "100530",
			name: "视频号热歌酷狗榜",
			bangid: "100530",
			picUrl: "http://imge.kugou.com/mcommon/500/20251202/20251202193636899095.jpg"
		},
		{
			id: "51341",
			name: "民谣榜",
			bangid: "51341",
			picUrl: "http://imge.kugou.com/mcommon/500/20241211/20241211184719475668.jpg"
		},
		{
			id: "59900",
			name: "纯音乐榜",
			bangid: "59900",
			picUrl: "http://imge.kugou.com/mcommon/500/20241211/20241211185324343605.jpg"
		},
		{
			id: "33160",
			name: "电音榜",
			bangid: "33160",
			picUrl: "http://imge.kugou.com/mcommon/500/20241211/20241211184628349205.jpg"
		},
		{
			id: "82831",
			name: "网络热歌榜",
			bangid: "82831",
			picUrl: "http://imge.kugou.com/mcommon/500/20241219/20241219195626644029.png"
		},
		{
			id: "6666",
			name: "飙升榜",
			bangid: "6666",
			picUrl: "http://imge.kugou.com/mcommon/500/20241219/20241219193628550054.png"
		},
		{
			id: "52144",
			name: "抖音热歌酷狗榜",
			bangid: "52144",
			picUrl: "http://imge.kugou.com/mcommon/500/20250725/20250725182524501565.png"
		},
		{
			id: "59896",
			name: "摇滚榜",
			bangid: "59896",
			picUrl: "http://imge.kugou.com/mcommon/500/20241211/20241211184944114279.jpg"
		},
		{
			id: "24971",
			name: "DJ热歌榜",
			bangid: "24971",
			picUrl: "http://imge.kugou.com/mcommon/500/20241219/20241219194419154116.png"
		},
		{
			id: "80025",
			name: "国乐榜",
			bangid: "80025",
			picUrl: "http://imge.kugou.com/mcommon/500/20241211/20241211184535924138.png"
		},
		{
			id: "85432",
			name: "百万收藏榜",
			bangid: "85432",
			picUrl: "http://imge.kugou.com/mcommon/500/20241219/20241219171042182683.png"
		},
		{
			id: "52767",
			name: "快手热歌酷狗榜",
			bangid: "52767",
			picUrl: "http://imge.kugou.com/mcommon/500/20250725/20250725183206991263.png"
		},
		{
			id: "74534",
			name: "新歌榜",
			bangid: "74534",
			picUrl: "http://imge.kugou.com/mcommon/500/20241219/20241219200509300768.png"
		},
		{
			id: "84235",
			name: "名品堂",
			bangid: "84235",
			picUrl: "http://imge.kugou.com/mcommon/500/20241219/20241219195054422404.png"
		},
		{
			id: "31308",
			name: "内地榜",
			bangid: "31308",
			picUrl: "http://imge.kugou.com/mcommon/500/20241211/20241211192146592398.png"
		},
		{
			id: "33165",
			name: "粤语金曲榜",
			bangid: "33165",
			picUrl: "http://imge.kugou.com/mcommon/500/20241219/20241219200119140556.png"
		},
		{
			id: "31310",
			name: "欧美榜",
			bangid: "31310",
			picUrl: "http://imge.kugou.com/mcommon/500/20241211/20241211192454699571.jpg"
		},
		{
			id: "51340",
			name: "伤感榜",
			bangid: "51340",
			picUrl: "http://imge.kugou.com/mcommon/500/20241219/20241219195213930623.png"
		},
		{
			id: "31311",
			name: "韩国榜",
			bangid: "31311",
			picUrl: "http://imge.kugou.com/mcommon/500/20241211/20241211192536531946.jpg"
		},
		{
			id: "31312",
			name: "日本榜",
			bangid: "31312",
			picUrl: "http://imge.kugou.com/mcommon/500/20241211/20241211192703831514.jpg"
		},
		{
			id: "31313",
			name: "香港地区榜",
			bangid: "31313",
			picUrl: "http://imge.kugou.com/mcommon/500/20241211/20241211192249298044.jpg"
		},
		{
			id: "42807",
			name: "JOOX香港热歌榜",
			bangid: "42807",
			picUrl: "http://imge.kugou.com/mcommon/500/20250609/20250609104556453665.jpg"
		},
		{
			id: "49225",
			name: "80后热歌榜",
			bangid: "49225",
			picUrl: "http://imge.kugou.com/mcommon/500/20241211/20241211185822886829.jpg"
		},
		{
			id: "54848",
			name: "台湾地区榜",
			bangid: "54848",
			picUrl: "http://imge.kugou.com/mcommon/500/20241211/20241211192349409526.jpg"
		},
		{
			id: "59895",
			name: "R&B榜",
			bangid: "59895",
			picUrl: "http://imge.kugou.com/mcommon/500/20241211/20241211184856929448.jpg"
		},
		{
			id: "44412",
			name: "说唱先锋榜",
			bangid: "44412",
			picUrl: "http://imge.kugou.com/mcommon/500/20240801/20240801174246809486.jpg"
		},
		{
			id: "49223",
			name: "90后热歌榜",
			bangid: "49223",
			picUrl: "http://imge.kugou.com/mcommon/500/20241211/20241211185910253287.jpg"
		},
		{
			id: "42808",
			name: "KKBOX风云榜",
			bangid: "42808",
			picUrl: "http://imge.kugou.com/mcommon/500/20250605/20250605114541276767.jpg"
		},
		{
			id: "49224",
			name: "00后热歌榜",
			bangid: "49224",
			picUrl: "http://imge.kugou.com/mcommon/500/20241211/20241211185955370846.jpg"
		},
		{
			id: "33162",
			name: "ACG新歌榜",
			bangid: "33162",
			picUrl: "http://imge.kugou.com/mcommon/500/20241211/20241211184809101184.jpg"
		},
		{
			id: "35811",
			name: "会员热歌榜",
			bangid: "35811",
			picUrl: "http://imge.kugou.com/mcommon/500/20241211/20241211190815330214.jpg"
		},
		{
			id: "33166",
			name: "欧美金曲榜",
			bangid: "33166",
			picUrl: "http://imge.kugou.com/mcommon/500/20241211/20241211190352819248.jpg"
		},
		{
			id: "33163",
			name: "影视金曲榜",
			bangid: "33163",
			picUrl: "http://imge.kugou.com/mcommon/500/20241211/20241211190457598263.jpg"
		},
		{
			id: "59897",
			name: "爵士榜",
			bangid: "59897",
			picUrl: "http://imge.kugou.com/mcommon/500/20241211/20241211185038580940.jpg"
		},
		{
			id: "59898",
			name: "乡村音乐榜",
			bangid: "59898",
			picUrl: "http://imge.kugou.com/mcommon/500/20241211/20241211185123607801.jpg"
		},
		{
			id: "65234",
			name: "儿歌榜",
			bangid: "65234",
			picUrl: "http://imge.kugou.com/mcommon/500/20241211/20241211191500485663.png"
		},
		{
			id: "60170",
			name: "闽南语榜",
			bangid: "60170",
			picUrl: "http://imge.kugou.com/mcommon/500/20241211/20241211191332657103.jpg"
		},
		{
			id: "46910",
			name: "综艺新歌榜",
			bangid: "46910",
			picUrl: "http://imge.kugou.com/mcommon/500/20241211/20241211191122925263.jpg"
		},
		{
			id: "30972",
			name: "酷狗音乐人原创榜",
			bangid: "30972",
			picUrl: "http://imge.kugou.com/mcommon/500/20241211/20241211191231362267.jpg"
		},
		{
			id: "37361",
			name: "酷狗识曲榜",
			bangid: "37361",
			picUrl: "http://imge.kugou.com/mcommon/500/20241211/20241211190930749712.jpg"
		},
		{
			id: "59899",
			name: "古典榜",
			bangid: "59899",
			picUrl: "http://imge.kugou.com/mcommon/500/20241211/20241211185545620318.jpg"
		},
		{
			id: "4681",
			name: "美国BillBoard榜",
			bangid: "4681",
			picUrl: "http://imge.kugou.com/mcommon/500/20241129/20241129191451959672.jpg"
		},
		{
			id: "108332",
			name: "粤剧榜",
			bangid: "108332",
			picUrl: "http://imge.kugou.com/mcommon/500/20260318/20260318165457262501.jpg"
		},
		{
			id: "25028",
			name: "Beatport电子舞曲榜",
			bangid: "25028",
			picUrl: "http://imge.kugou.com/mcommon/500/20241129/20241129191254713903.jpg"
		},
		{
			id: "108333",
			name: "京剧榜",
			bangid: "108333",
			picUrl: "http://imge.kugou.com/mcommon/500/20260318/20260318165621528435.jpg"
		},
		{
			id: "4680",
			name: "英国单曲榜",
			bangid: "4680",
			picUrl: "http://imge.kugou.com/mcommon/500/20241129/20241129184843867507.jpg"
		},
		{
			id: "108335",
			name: "南音榜",
			bangid: "108335",
			picUrl: "http://imge.kugou.com/mcommon/500/20260318/20260318165732662096.jpg"
		},
		{
			id: "38623",
			name: "韩国Melon音乐榜",
			bangid: "38623",
			picUrl: "http://imge.kugou.com/mcommon/500/20241129/20241129185007675569.jpg"
		},
		{
			id: "4673",
			name: "日本公信榜",
			bangid: "4673",
			picUrl: "http://imge.kugou.com/mcommon/500/20241129/20241129190753306040.jpg"
		},
		{
			id: "46868",
			name: "日本SS榜",
			bangid: "46868",
			picUrl: "http://imge.kugou.com/mcommon/500/20241129/20241129190920828981.jpg"
		},
		{
			id: "36107",
			name: "小语种热歌榜",
			bangid: "36107",
			picUrl: "http://imge.kugou.com/mcommon/500/20241129/20241129184735526204.jpg"
		},
		{
			id: "60171",
			name: "越南语榜",
			bangid: "60171",
			picUrl: "http://imge.kugou.com/mcommon/500/20241129/20241129184925598181.jpg"
		},
		{
			id: "60172",
			name: "泰语榜",
			bangid: "60172",
			picUrl: "http://imge.kugou.com/mcommon/500/20241129/20241129191037702382.jpg"
		}
	];
	var boardInfoMap = {};
	var updateBoardInfoMap = (boards) => {
		for (const board of boards) boardInfoMap[board.id] = {
			name: board.name,
			pic: board.pic,
			desc: board.desc ?? ""
		};
	};
	updateBoardInfoMap(boardList$4.map((item) => ({
		id: item.bangid,
		name: item.name,
		pic: item.picUrl,
		desc: ""
	})));
	var getUrl = (page, id, limit) => {
		return `http://mobilecdnbj.kugou.com/api/v3/rank/song?version=9108&ranktype=1&plat=0&pagesize=${limit}&area_code=1&page=${page}&rankid=${id}&with_res_tag=0&show_portrait_mv=1`;
	};
	var filterBoardList = () => {
		return boardList$4.map((board) => ({
			id: board.bangid,
			name: board.name,
			pic: board.picUrl
		}));
	};
	var filterBoardsData$3 = (rawList) => {
		const list = [];
		for (const board of rawList) {
			if (board.isvol !== 1) continue;
			list.push({
				id: String(board.rankid),
				name: board.rankname,
				pic: (board.imgurl || board.img_cover || board.bannerurl || "").replace("{size}", "500")
			});
		}
		updateBoardInfoMap(list.map((item) => ({
			id: item.id,
			name: item.name,
			pic: item.pic ?? "",
			desc: rawList.find((board) => String(board.rankid) === item.id)?.intro ?? ""
		})));
		return list;
	};
	var getBoards$4 = async () => {
		try {
			const { body, statusCode } = await request("http://mobilecdnbj.kugou.com/api/v5/rank/list?version=9108&plat=0&showtype=2&parentid=0&apiver=6&area_code=1&withsong=1");
			if (statusCode !== 200 || body.errcode !== 0) throw new Error("kg topSongs getBoards failed");
			return filterBoardsData$3(body.data.info);
		} catch {
			return filterBoardList();
		}
	};
	var getDates$4 = async (_id) => {
		return [];
	};
	var createQuality = (size, hash) => {
		return size > 0 && hash ? {
			sizeStr: sizeFormate(size),
			hash
		} : null;
	};
	var filterData$2 = (rawList) => {
		return rawList.map((item) => {
			const qualitys = {};
			const quality128 = createQuality(item.filesize, item.hash);
			if (quality128) qualitys["128k"] = quality128;
			const quality320 = createQuality(item["320filesize"], item["320hash"]);
			if (quality320) qualitys["320k"] = quality320;
			const qualityFlac = createQuality(item.sqfilesize, item.sqhash);
			if (qualityFlac) qualitys.flac = qualityFlac;
			const qualityHiRes = createQuality(item.filesize_high, item.hash_high);
			if (qualityHiRes) qualitys.flac24bit = qualityHiRes;
			return {
				id: `kg_${String(item.audio_id)}_${item.hash}`,
				name: decodeName(item.songname),
				singer: decodeName(formatSingerName(item.authors, "author_name")),
				interval: formatPlayTime(item.duration),
				isLocal: false,
				meta: {
					albumName: decodeName(item.remark),
					albumId: Number(item.album_id),
					albumAudioId: item.album_audio_id,
					source: "kg",
					musicId: String(item.audio_id),
					qualitys,
					createTime: 0,
					posTime: 0,
					updateTime: 0,
					hash: item.hash,
					_interval: item.duration,
					picUrl: null
				}
			};
		});
	};
	var getBoardInfo = (id) => {
		return boardInfoMap[id] ?? {
			name: "",
			pic: "",
			desc: ""
		};
	};
	var getList$9 = async (id, date, page, limit = pageInfo$10.listDetailLimit) => {
		limit = pageInfo$10.listDetailLimit;
		const { body, statusCode } = await request(getUrl(page, id, limit));
		if (statusCode !== 200 || body.errcode !== 0) throw new Error("kg topSongs getList failed");
		const rawList = body.data.info;
		const firstItem = rawList[0];
		const boardInfo = getBoardInfo(id);
		return {
			total: body.data.total,
			list: filterData$2(rawList),
			limit,
			page,
			info: {
				name: boardInfo.name || "排行榜详情",
				pic: boardInfo.pic,
				desc: boardInfo.desc,
				date: dateFormat(firstItem.rank_id_publish_date, "Y-M-D")
			}
		};
	};
	//#endregion
	//#region src/onlineResource/kg/index.ts
	var kg = {
		musicSearch: search$18,
		getLyric: getLyric$4,
		getPic: getPic$4,
		musicComment: musicComment$4,
		songlistSearch: search$17,
		songlistDetail: getListDetail$4,
		songlistTags: getTags$4,
		songlistSorts: getSorts$4,
		songlist: getList$10,
		topSongs: getBoards$4,
		topSongsDate: getDates$4,
		topSongsDetail: getList$9,
		tipSearch: search$16,
		hotSearch: search$19
	};
	//#endregion
	//#region src/onlineResource/kw/util.ts
	var formatSinger = (rawData) => rawData.replace(/&/g, "、");
	var objStr2JSON = (str) => {
		return JSON.parse(str.replace(/('(?=(,\s*')))|('(?=:))|((?<=([:,]\s*))')|((?<={)')|('(?=}))/g, "\""));
	};
	var lrcTools = {
		rxps: {
			wordLine: /^(\[\d{1,2}:.*\d{1,4}\])\s*(\S+(?:\s+\S+)*)?\s*/,
			tagLine: /\[(ver|ti|ar|al|offset|by|kuwo):\s*(\S+(?:\s+\S+)*)\s*\]/,
			wordTimeAll: /<(-?\d+),(-?\d+)(?:,-?\d+)?>/g,
			wordTime: /<(-?\d+),(-?\d+)(?:,-?\d+)?>/
		},
		offset: 1,
		offset2: 1,
		isOK: false,
		lines: [],
		tags: [],
		getWordInfo(str, str2, prevWord) {
			const offset = parseInt(str);
			const offset2 = parseInt(str2);
			const startTime = Math.trunc(Math.abs((offset + offset2) / (this.offset * 2)));
			const endTime = Math.trunc(Math.abs((offset - offset2) / (this.offset2 * 2)) + startTime);
			if (prevWord) {
				if (startTime < prevWord.endTime) {
					prevWord.endTime = startTime;
					if (prevWord.startTime > prevWord.endTime) prevWord.startTime = prevWord.endTime;
					prevWord.newTimeStr = `<${prevWord.startTime},${Math.trunc(prevWord.endTime - prevWord.startTime)}>`;
				}
			}
			return {
				startTime,
				endTime,
				timeStr: `<${startTime},${Math.trunc(endTime - startTime)}>`
			};
		},
		parseLine(line) {
			if (line.length < 6) return;
			let result = this.rxps.wordLine.exec(line);
			if (result) {
				const time = result[1];
				let words = result[2];
				words ??= "";
				const wordTimes = words.match(this.rxps.wordTimeAll);
				if (!wordTimes) return;
				let preTimeInfo = null;
				for (const timeStr of wordTimes) {
					const result = this.rxps.wordTime.exec(timeStr);
					const wordInfo = this.getWordInfo(result[1], result[2], preTimeInfo);
					words = words.replace(timeStr, wordInfo.timeStr);
					if (preTimeInfo?.newTimeStr) words = words.replace(preTimeInfo.timeStr, preTimeInfo.newTimeStr);
					preTimeInfo = wordInfo;
				}
				this.lines.push(time + words);
				return;
			}
			result = this.rxps.tagLine.exec(line);
			if (!result) return;
			if (result[1] == "kuwo") {
				let content = result[2];
				if (content != null && content.includes("][")) content = content.substring(0, content.indexOf("]["));
				const valueOf = parseInt(content, 8);
				this.offset = Math.trunc(valueOf / 10);
				this.offset2 = Math.trunc(valueOf % 10);
				if (this.offset == 0 || Number.isNaN(this.offset) || this.offset2 == 0 || Number.isNaN(this.offset2)) this.isOK = false;
			} else this.tags.push(line);
		},
		parse(lrc) {
			const lines = lrc.split(/\r\n|\r|\n/);
			const tools = Object.create(this);
			tools.isOK = true;
			tools.offset = 1;
			tools.offset2 = 1;
			tools.lines = [];
			tools.tags = [];
			for (const line of lines) {
				if (!tools.isOK) throw new Error("failed");
				tools.parseLine(line);
			}
			if (!tools.lines.length) return "";
			let lrcs = tools.lines.join("\n");
			if (tools.tags.length) lrcs = `${tools.tags.join("\n")}\n${lrcs}`;
			return lrcs;
		}
	};
	var wbdCrypto = {
		aesKey: new Uint8Array([
			112,
			87,
			39,
			61,
			199,
			250,
			41,
			191,
			57,
			68,
			45,
			114,
			221,
			94,
			140,
			228
		]),
		aesIv: "",
		appId: "y67sprxhhpws",
		async decodeData(base64Result) {
			const data = await dataConverter(decodeURIComponent(base64Result), "base64");
			const decrypted = await crypto.aesDecrypt("ECB_128_NoPadding", data, this.aesKey, this.aesIv, "utf-8");
			return JSON.parse(decrypted);
		},
		async createSign(data, time) {
			const str = `${this.appId}${data}${time}`;
			return (await crypto.md5(str)).toUpperCase();
		},
		async buildParam(jsonData) {
			const data = JSON.stringify(jsonData);
			const time = Date.now();
			const encodeData = await crypto.aesEncrypt("ECB_128_NoPadding", data, this.aesKey, this.aesIv);
			const sign = await this.createSign(encodeData, time);
			return `data=${encodeURIComponent(encodeData)}&time=${time}&appId=${this.appId}&sign=${sign}`;
		}
	};
	//#endregion
	//#region src/onlineResource/kw/albumDetail.ts
	var pageInfo$9 = { limit_song: 1e3 };
	var filterListDetail$1 = (rawList, albumName, albumId) => {
		return rawList.map((item) => {
			const formats = item.formats.split("|");
			const qualitys = {};
			if (formats.includes("MP3128")) qualitys["128k"] = { sizeStr: null };
			if (formats.includes("MP3H")) qualitys["320k"] = { sizeStr: null };
			if (formats.includes("ALFLAC")) qualitys.flac = { sizeStr: null };
			if (formats.includes("HIRFLAC")) qualitys.flac24bit = { sizeStr: null };
			const duration = parseInt(item.duration);
			return {
				id: `kw_${item.id}`,
				name: decodeName(item.name),
				singer: formatSinger(decodeName(item.artist)),
				interval: Number.isNaN(duration) ? null : formatPlayTime(duration),
				isLocal: false,
				meta: {
					albumName,
					albumId,
					source: "kw",
					musicId: item.id,
					picUrl: item.img || item.pic120 || null,
					qualitys,
					createTime: 0,
					posTime: 0,
					updateTime: 0
				}
			};
		});
	};
	var getAlbumDetail = async (id, page, limit = pageInfo$9.limit_song) => {
		const { body: rawBody, statusCode } = await request(`http://search.kuwo.cn/r.s?pn=${page - 1}&rn=${limit}&stype=albuminfo&albumid=${id}&show_copyright_off=0&encoding=utf&vipver=MUSIC_9.1.0`);
		if (statusCode !== 200) throw new Error("kw getAlbumDetail failed");
		const body = objStr2JSON(rawBody);
		if (!body.musiclist) throw new Error("kw getAlbumDetail failed");
		const albumName = decodeName(body.name);
		return {
			list: filterListDetail$1(body.musiclist, albumName, parseInt(body.albumid)),
			page,
			limit,
			total: parseInt(body.songnum),
			info: {
				name: albumName,
				img: body.img || body.hts_img,
				desc: decodeName(body.info),
				author: decodeName(body.artist)
			}
		};
	};
	//#endregion
	//#region src/onlineResource/kw/hotSearch.ts
	var search$15 = async () => {
		const { body, statusCode } = await request("http://hotword.kuwo.cn/hotword.s?prod=kwplayer_ar_9.3.0.1&corp=kuwo&newver=2&vipver=9.3.0.1&source=kwplayer_ar_9.3.0.1_40.apk&p2p=1&notrace=0&uid=0&plat=kwplayer_ar&rformat=json&encoding=utf8&tabid=1", { headers: { "User-Agent": "Dalvik/2.1.0 (Linux; U; Android 9;)" } });
		if (statusCode != 200 || body.status !== "ok") throw new Error("search failed");
		return body.tagvalue.map((item) => item.key);
	};
	//#endregion
	//#region src/onlineResource/kw/decodeLyric.ts
	function uint8IndexOfSequence(uint8Array, sequence) {
		const seqLen = sequence.length;
		if (seqLen === 0) return -1;
		outer: for (let i = 0; i <= uint8Array.length - seqLen; i++) {
			for (let j = 0; j < seqLen; j++) if (uint8Array[i + j] !== sequence[j]) continue outer;
			return i;
		}
		return -1;
	}
	var buf_key = new Uint8Array([
		121,
		101,
		101,
		108,
		105,
		111,
		110
	]);
	var delimiter = new Uint8Array([
		13,
		10,
		13,
		10
	]);
	var buf_key_len = buf_key.length;
	var decodeLyric$1 = async (buf, isGetLyricx) => {
		if ((await dataConverter(buf.slice(0, 10), "utf-8")).toLowerCase() != "tp=content") return "";
		const lrcData = await zlib.inflate(buf.subarray(uint8IndexOfSequence(buf, delimiter) + 4));
		if (!isGetLyricx) return dataConverter(lrcData, "utf-8");
		const buf_str = await dataConverter(await dataConverter(lrcData, "utf-8"), "base64");
		const buf_str_len = buf_str.length;
		const output = new Uint8Array(buf_str_len);
		let i = 0;
		while (i < buf_str_len) {
			let j = 0;
			while (j < buf_key_len && i < buf_str_len) {
				output[i] = buf_str[i] ^ buf_key[j];
				i++;
				j++;
			}
		}
		return dataConverter(output, "utf-8");
	};
	var decodeLyric_default = async (lrcBuffer, isGetLyricx) => {
		return await decodeLyric$1(lrcBuffer, isGetLyricx);
	};
	//#endregion
	//#region src/onlineResource/kw/lyric.ts
	var timeExp = /^\[([\d:.]*)\]{1}/g;
	var existTimeExp = /\[\d{1,2}:.*\d{1,4}\]/;
	var lyricxTag = /^<-?\d+,-?\d+>/;
	var sortLrcArr = (arr) => {
		const lrcSet = /* @__PURE__ */ new Set();
		const lrc = [];
		const lrcT = [];
		let isLyricx = false;
		for (const item of arr) {
			if (lrcSet.has(item.time)) {
				if (lrc.length < 2) continue;
				const tItem = lrc.pop();
				tItem.time = lrc[lrc.length - 1].time;
				lrcT.push(tItem);
				lrc.push(item);
			} else {
				lrc.push(item);
				lrcSet.add(item.time);
			}
			if (!isLyricx && lyricxTag.test(item.text)) isLyricx = true;
		}
		if (!isLyricx && lrcT.length > lrc.length * .3 && lrc.length - lrcT.length > 6) throw new Error("failed");
		return {
			lrc,
			lrcT
		};
	};
	var transformLrc = (tags, lrclist) => {
		return `${tags.join("\n")}\n${lrclist ? lrclist.map((l) => `[${l.time}]${l.text}\n`).join("") : "暂无歌词"}`;
	};
	var parseLrc = (lrc) => {
		const lines = lrc.split(/\r\n|\r|\n/);
		const tags = [];
		const lrcArr = [];
		for (let i = 0; i < lines.length; i++) {
			const line = lines[i].trim();
			if (timeExp.exec(line)) {
				const text = line.replace(timeExp, "").trim();
				let time = RegExp.$1;
				if (/\.\d\d$/.test(time)) time += "0";
				lrcArr.push({
					time,
					text
				});
			} else if (lrcTools.rxps.tagLine.test(line)) tags.push(line);
		}
		const lrcInfo = sortLrcArr(lrcArr);
		return {
			lyric: decodeName(transformLrc(tags, lrcInfo.lrc)),
			tlyric: lrcInfo.lrcT.length ? decodeName(transformLrc(tags, lrcInfo.lrcT)) : ""
		};
	};
	var getLyric$3 = async (musicInfo, isGetLyricx = true) => {
		const resp = await request(`http://mlyric.kuwo.cn/mobi.s?f=web&type=lyric&lrcx=${isGetLyricx ? 1 : 0}&rid=${musicInfo.id}&encode=utf8`, { needRaw: true });
		if (resp.statusCode != 200) throw new Error(JSON.stringify(resp.body));
		const rawLrc = await decodeLyric_default(resp.raw, isGetLyricx);
		let lrcInfo;
		lrcInfo = parseLrc(rawLrc);
		lrcInfo.tlyric &&= lrcInfo.tlyric.replace(lrcTools.rxps.wordTimeAll, "");
		try {
			lrcInfo.awlyric = lrcTools.parse(lrcInfo.lyric);
		} catch {
			lrcInfo.awlyric = "";
		}
		lrcInfo.lyric = lrcInfo.lyric.replace(lrcTools.rxps.wordTimeAll, "");
		if (!existTimeExp.test(lrcInfo.lyric)) return Promise.reject(/* @__PURE__ */ new Error("Get lyric failed"));
		console.log("kw lyric:", musicInfo.meta.musicId);
		return lrcInfo;
	};
	//#endregion
	//#region src/onlineResource/kw/musicComment.ts
	var headers$1 = { "User-Agent": "Dalvik/2.1.0 (Linux; U; Android 9;)" };
	var getSongId$4 = (musicInfo) => {
		const { meta } = musicInfo;
		if (typeof meta.musicId === "string" || typeof meta.musicId === "number") return String(meta.musicId);
		return String(musicInfo.id);
	};
	var formatReplyComment$1 = (item) => {
		const reply = item.reply;
		const replyList = reply ? [{
			id: String(reply.id),
			text: reply.msg,
			time: Number(reply.time) * 1e3,
			userName: reply.u_name,
			avatar: reply.u_pic,
			userId: reply.u_id,
			likedCount: Number(reply.like_num),
			images: reply.mpic ? [decodeURIComponent(reply.mpic)] : []
		}] : [];
		return {
			id: String(item.id),
			text: item.msg,
			time: Number(item.time) * 1e3,
			userName: item.u_name,
			avatar: item.u_pic,
			userId: item.u_id,
			likedCount: Number(item.like_num),
			images: item.mpic ? [decodeURIComponent(item.mpic)] : [],
			reply: replyList
		};
	};
	var filterComment$2 = (rawList) => {
		if (!rawList) return [];
		return rawList.map((item) => {
			const replyData = "child_comments" in item ? item.child_comments : void 0;
			return {
				id: String(item.id),
				text: item.msg,
				time: Number(item.time) * 1e3,
				userName: item.u_name,
				avatar: item.u_pic,
				userId: item.u_id,
				likedCount: Number(item.like_num),
				images: item.mpic ? [decodeURIComponent(item.mpic)] : [],
				reply: replyData?.map((reply) => formatReplyComment$1(reply)) ?? []
			};
		});
	};
	var getComment$3 = async (musicInfo, page = 1, limit = 20) => {
		const { body, statusCode } = await request(`http://ncomment.kuwo.cn/com.s?f=web&type=get_comment&aapiver=1&prod=kwplayer_ar_10.5.2.0&digest=15&sid=${getSongId$4(musicInfo)}&start=${limit * (page - 1)}&msgflag=1&count=${limit}&newver=3&uid=0`, { headers: headers$1 });
		if (statusCode !== 200 || body.code !== "200") throw new Error("kw getComment failed");
		return {
			list: filterComment$2(body.comments),
			total: body.comments_counts,
			page,
			limit
		};
	};
	var getHotComment$3 = async (musicInfo, page = 1, limit = 100) => {
		const { body, statusCode } = await request(`http://ncomment.kuwo.cn/com.s?f=web&type=get_rec_comment&aapiver=1&prod=kwplayer_ar_10.5.2.0&digest=15&sid=${getSongId$4(musicInfo)}&start=${limit * (page - 1)}&msgflag=1&count=${limit}&newver=3&uid=0`, { headers: headers$1 });
		if (statusCode !== 200 || body.code !== "200") throw new Error("kw getHotComment failed");
		return {
			list: filterComment$2(body.hot_comments),
			total: body.hot_comments_counts,
			page,
			limit
		};
	};
	var musicComment$3 = async (options) => {
		const { musicInfo, type, page, limit } = options;
		switch (type) {
			case "new": return getComment$3(musicInfo, page, limit);
			case "hot": return getHotComment$3(musicInfo, page, limit);
			case "reply":
				if (!options.id) throw new Error("id is required for reply type");
				throw new Error("reply comment is not supported yet");
		}
		throw new Error("Invalid comment type");
	};
	//#endregion
	//#region src/onlineResource/kw/musicSearch.ts
	var regExps$5 = { mInfo: /level:(\w+),bitrate:(\d+),format:(\w+),size:([\w.]+)/ };
	var pageInfo$8 = {
		limit: 30,
		total: 0,
		page: 0,
		allPage: 1
	};
	var musicSearch$3 = async (str, page, limit) => {
		const { body } = await request(`http://search.kuwo.cn/r.s?client=kt&all=${encodeURIComponent(str)}&pn=${page - 1}&rn=${limit}&uid=794762570&ver=kwplayer_ar_9.2.2.1&vipver=1&show_copyright_off=1&newver=1&ft=music&cluster=0&strategy=2012&encoding=utf8&rformat=json&vermerge=1&mobi=1&issubtitle=1`);
		return body;
	};
	var handleResult$1 = (rawData) => {
		const result = [];
		if (!rawData) return result;
		for (let i = 0; i < rawData.length; i++) {
			const info = rawData[i];
			const songId = info.MUSICRID.replace("MUSIC_", "");
			if (!info.N_MINFO) {
				console.log("N_MINFO is undefined");
				return null;
			}
			const types = {};
			const infoArr = info.N_MINFO.split(";");
			for (const info of infoArr) {
				const result = regExps$5.mInfo.exec(info);
				if (result) switch (result[2]) {
					case "4000":
						types.flac24bit = { sizeStr: result[4].toLocaleUpperCase() };
						break;
					case "2000":
						types.flac = { sizeStr: result[4].toLocaleUpperCase() };
						break;
					case "320":
						types["320k"] = { sizeStr: result[4].toLocaleUpperCase() };
						break;
					case "128": types["128k"] = { sizeStr: result[4].toLocaleUpperCase() };
				}
			}
			const interval = parseInt(info.DURATION);
			result.push({
				id: `kw_${String(songId)}`,
				name: decodeName(info.SONGNAME),
				singer: formatSinger(decodeName(info.ARTIST)),
				interval: Number.isNaN(interval) ? null : formatPlayTime(interval),
				isLocal: false,
				meta: {
					albumName: info.ALBUM ? decodeName(info.ALBUM) : "",
					source: "kw",
					musicId: String(songId),
					qualitys: types,
					createTime: 0,
					posTime: 0,
					updateTime: 0,
					songId,
					albumId: decodeName(info.ALBUMID || "")
				}
			});
		}
		return result;
	};
	var search$14 = async (str, page = 1, limit) => {
		limit ??= pageInfo$8.limit;
		const result = await musicSearch$3(str, page, limit);
		if (!result || result.TOTAL !== "0" && result.SHOW === "0") throw new Error("search failed");
		const list = handleResult$1(result.abslist);
		if (list == null) throw new Error("search failed");
		pageInfo$8.total = parseInt(result.TOTAL);
		pageInfo$8.page = page;
		pageInfo$8.allPage = Math.ceil(pageInfo$8.total / limit);
		return {
			list,
			page: pageInfo$8.page,
			total: pageInfo$8.total,
			limit
		};
	};
	//#endregion
	//#region src/onlineResource/kw/pic.ts
	var getPic$3 = async ({ id }) => {
		let { body } = await request(`http://artistpicserver.kuwo.cn/pic.web?corp=kuwo&type=rid_pic&pictype=500&size=500&rid=${id}`);
		console.log("kw pic:", body);
		if (body.startsWith("http")) {
			if (body.startsWith("http://") && body.includes(".kwcdn.kuwo.cn")) {
				body = body.replace(".kwcdn.kuwo.cn", ".kuwo.cn");
				body = body.replace("http://", "https://");
			}
			return body;
		}
		return null;
	};
	//#endregion
	//#region src/onlineResource/kw/songlistBD.ts
	var pageInfo$7 = { limit_song: 1e3 };
	var getReqId = () => {
		const t = () => (65536 * (1 + Math.random()) | 0).toString(16).substring(1);
		return t() + t() + t() + t() + t() + t() + t() + t();
	};
	var filterBDListDetail = (rawList) => {
		return rawList.map((item) => {
			const qualitys = {};
			for (const audio of item.audios) {
				const size = audio.size?.toLocaleUpperCase();
				switch (audio.bitrate) {
					case "4000":
						qualitys.flac24bit = { sizeStr: size ?? null };
						break;
					case "2000":
						qualitys.flac = { sizeStr: size ?? null };
						break;
					case "320":
						qualitys["320k"] = { sizeStr: size ?? null };
						break;
					case "128": qualitys["128k"] = { sizeStr: size ?? null };
				}
			}
			return {
				id: `kw_${String(item.id)}`,
				name: item.name,
				singer: item.artists.map((s) => s.name).join("、"),
				interval: formatPlayTime(item.duration),
				isLocal: false,
				meta: {
					albumName: item.album,
					albumId: item.albumId,
					source: "kw",
					musicId: String(item.id),
					qualitys,
					createTime: 0,
					posTime: 0,
					updateTime: 0,
					picUrl: item.albumPic
				}
			};
		});
	};
	var getListDetailMusicListByBDListInfo = async (id, source) => {
		const { body, statusCode } = await request(`https://bd-api.kuwo.cn/api/service/playlist/info/${id}?reqId=${getReqId()}&source=${source}`, { headers: {
			"User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36",
			plat: "h5"
		} });
		if (statusCode !== 200 || body.code !== 200) return null;
		return {
			name: `${body.data.name}喜欢的音乐`,
			img: body.data.pic,
			desc: body.data.description,
			author: body.data.creatorName,
			play_count: formatPlayCount(body.data.playNum)
		};
	};
	var getListDetailMusicListByBDUserPub = async (id) => {
		const { body, statusCode } = await request(`https://bd-api.kuwo.cn/api/ucenter/users/pub/${id}?reqId=${getReqId()}`, { headers: {
			"User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36",
			plat: "h5"
		} });
		if (statusCode !== 200 || body.code !== 200) return null;
		return {
			name: `${body.data.userInfo.nickname}喜欢的音乐`,
			img: body.data.userInfo.headImg,
			desc: "",
			author: body.data.userInfo.nickname,
			play_count: ""
		};
	};
	var getListDetailMusicListByBDList = async (id, source, page) => {
		const { body, statusCode } = await request(`https://bd-api.kuwo.cn/api/service/playlist/${id}/musicList?reqId=${getReqId()}&source=${source}&pn=${page}&rn=${pageInfo$7.limit_song}`, { headers: {
			"User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36",
			plat: "h5"
		} });
		if (statusCode !== 200 || body.code !== 200) throw new Error("kw getListDetail failed");
		return {
			list: filterBDListDetail(body.data.list),
			page,
			limit: body.data.pageSize,
			total: body.data.total
		};
	};
	var getListDetailMusicListByBD = async (id, page) => {
		const uid = /uid=(\d+)/.exec(id)?.[1];
		const listId = /playlistId=(\d+)/.exec(id)?.[1];
		const source = /source=(\d+)/.exec(id)?.[1];
		if (!listId) throw new Error("kw getListDetail failed");
		const listData = await getListDetailMusicListByBDList(listId, source || "4", page);
		let info = null;
		if (source === "4") info = await getListDetailMusicListByBDListInfo(listId, source);
		else if (source === "5") info = await getListDetailMusicListByBDUserPub(uid ?? listId);
		return {
			...listData,
			info: info ?? {
				name: "",
				img: "",
				desc: "",
				author: "",
				play_count: ""
			}
		};
	};
	//#endregion
	//#region src/onlineResource/kw/songlist.ts
	var pageInfo$6 = {
		limit_list: 36,
		limit_song: 1e3,
		successCode: 200,
		sortList: [{
			label: "new",
			name: "最新",
			id: "new"
		}, {
			label: "hot",
			name: "最热",
			id: "hot"
		}],
		tagsUrl: "http://wapi.kuwo.cn/api/pc/classify/playlist/getTagList?cmd=rcm_keyword_playlist&user=0&prod=kwplayer_pc_9.0.5.0&vipver=9.0.5.0&source=kwplayer_pc_9.0.5.0&loginUid=0&loginSid=0&appUid=76039576",
		hotTagUrl: "http://wapi.kuwo.cn/api/pc/classify/playlist/getRcmTagList?loginUid=0&loginSid=0&appUid=76039576"
	};
	var regExps$4 = {
		mInfo: /level:(\w+),bitrate:(\d+),format:(\w+),size:([\w.]+)/,
		listDetailLink: /^.+\/playlist(?:_detail)?\/(\d+)(?:\?.*|&.*$|#.*$|$)/
	};
	var getSorts$3 = async () => {
		return pageInfo$6.sortList.map((item) => ({
			id: String(item.id),
			name: `{songlist.sort.${item.label}}`
		}));
	};
	var filterTagInfo$2 = (rawList) => {
		return rawList.map((type) => ({
			name: type.name,
			list: type.data.map((item) => ({
				id: `${item.id}-${item.digest}`,
				name: item.name
			}))
		}));
	};
	var filterInfoHotTag$1 = (rawList) => {
		return rawList.map((item) => ({
			id: `${item.id}-${item.digest}`,
			name: item.name
		}));
	};
	var getTag$2 = async () => {
		const { body, statusCode } = await request(pageInfo$6.tagsUrl);
		if (statusCode !== 200 || body.code !== pageInfo$6.successCode) throw new Error("kw songlistTags failed");
		return filterTagInfo$2(body.data);
	};
	var getHotTag$2 = async () => {
		const { body, statusCode } = await request(pageInfo$6.hotTagUrl);
		if (statusCode !== 200 || body.code !== pageInfo$6.successCode) throw new Error("kw songlistTags failed");
		return filterInfoHotTag$1(body.data[0].data);
	};
	var getTags$3 = async () => {
		const [tags, hotTags] = await Promise.all([getTag$2(), getHotTag$2()]);
		return {
			tags,
			hotTags
		};
	};
	var getListUrl$1 = ({ sortId, id, type, page }) => {
		if (!id) return `http://wapi.kuwo.cn/api/pc/classify/playlist/getRcmPlayList?loginUid=0&loginSid=0&appUid=76039576&&pn=${page}&rn=${pageInfo$6.limit_list}&order=${sortId}`;
		return `http://wapi.kuwo.cn/api/pc/classify/playlist/getTagPlayList?loginUid=0&loginSid=0&appUid=76039576&pn=${page}&id=${id}&rn=${pageInfo$6.limit_list}`;
	};
	var filterList$3 = (rawData) => {
		return rawData.map((item) => ({
			play_count: formatPlayCount(Number(item.listencnt ?? 0)),
			id: `digest-${item.digest}__${item.id}`,
			author: item.uname ?? "",
			name: item.name ?? "",
			total: Number(item.total ?? 0),
			img: item.img ?? "",
			desc: item.desc ?? ""
		}));
	};
	var filterList2 = (rawData) => {
		const list = [];
		const allowedTypes = [
			"songlist",
			"list",
			"album"
		];
		for (const group of rawData) for (const item of group.list) {
			if (!allowedTypes.includes(item.type)) continue;
			list.push({
				id: `digest-${item.digest}__${item.id}`,
				name: item.name,
				img: item.img,
				desc: item.desc
			});
		}
		return list;
	};
	var getList$8 = async (sortId, tagId, page, limit = pageInfo$6.limit_list) => {
		let id = null;
		let type = null;
		if (tagId) {
			const arr = tagId.split("-");
			id = arr[0];
			type = arr[1];
		}
		if (!id || type === "10000") {
			const { body } = await request(getListUrl$1({
				sortId,
				id,
				type,
				page
			}));
			const dataBody = body;
			return {
				list: filterList$3(dataBody.data.data),
				total: dataBody.data.total,
				page: dataBody.data.pn,
				limit: dataBody.data.rn
			};
		}
		const { body } = await request(`http://mobileinterfaces.kuwo.cn/er.s?type=get_pc_qz_data&f=web&id=${id}&prod=pc`);
		const list = filterList2(body);
		return {
			list,
			total: list.length,
			page,
			limit
		};
	};
	var getListDetailUrl = (id, page) => {
		return `http://nplserver.kuwo.cn/pl.svc?op=getlistinfo&pid=${id}&pn=${page - 1}&rn=${pageInfo$6.limit_song}&encode=utf8&keyset=pl2012&identity=kuwo&pcmp4=1&vipver=MUSIC_9.0.5.0_W1&newver=1`;
	};
	var filterListDetail = (rawList) => {
		return rawList.map((item) => {
			const infoArr = item.N_MINFO.split(";");
			const qualitys = {};
			for (const info of infoArr) {
				const result = regExps$4.mInfo.exec(info);
				if (result) switch (result[2]) {
					case "4000":
						qualitys.flac24bit = { sizeStr: result[4].toLocaleUpperCase() };
						break;
					case "2000":
						qualitys.flac = { sizeStr: result[4].toLocaleUpperCase() };
						break;
					case "320":
						qualitys["320k"] = { sizeStr: result[4].toLocaleUpperCase() };
						break;
					case "128": qualitys["128k"] = { sizeStr: result[4].toLocaleUpperCase() };
				}
			}
			const duration = parseInt(item.duration);
			return {
				id: `kw_${item.id}`,
				name: decodeName(item.name),
				singer: formatSinger(decodeName(item.artist)),
				interval: Number.isNaN(duration) ? null : formatPlayTime(duration),
				isLocal: false,
				meta: {
					albumName: decodeName(item.album),
					albumId: Number(item.albumid),
					source: "kw",
					musicId: item.id,
					qualitys,
					createTime: 0,
					posTime: 0,
					updateTime: 0
				}
			};
		});
	};
	var getListDetailDigest8 = async (id, page) => {
		const { body, statusCode } = await request(getListDetailUrl(id, page));
		if (statusCode !== 200 || body.result !== "ok") throw new Error("kw getListDetail failed");
		return {
			list: filterListDetail(body.musiclist),
			page,
			limit: body.rn,
			total: body.total,
			info: {
				name: body.title,
				img: body.pic,
				desc: body.info,
				author: body.uname,
				play_count: formatPlayCount(body.playnum)
			}
		};
	};
	var getListDetailDigest5Info = async (id) => {
		const { body, statusCode } = await request(`http://qukudata.kuwo.cn/q.k?op=query&cont=ninfo&node=${id}&pn=0&rn=1&fmt=json&src=mbox&level=2`);
		if (statusCode !== 200 || !body.child) return null;
		return body.child.length ? body.child[0].sourceid : null;
	};
	var getListDetailDigest5Music = async (id, page) => {
		const { body, statusCode } = await request(`http://nplserver.kuwo.cn/pl.svc?op=getlistinfo&pid=${id}&pn=${page - 1}&rn=${pageInfo$6.limit_song}&encode=utf-8&keyset=pl2012&identity=kuwo&pcmp4=1`);
		if (statusCode !== 200 || body.result !== "ok") throw new Error("kw getListDetail failed");
		return {
			list: filterListDetail(body.musiclist),
			page,
			limit: body.rn,
			total: body.total,
			info: {
				name: body.title,
				img: body.pic,
				desc: body.info,
				author: body.uname,
				play_count: formatPlayCount(body.playnum)
			}
		};
	};
	var getListDetailDigest5 = async (id, page) => {
		const detailId = await getListDetailDigest5Info(id);
		if (!detailId) throw new Error("kw getListDetail failed");
		return getListDetailDigest5Music(detailId, page);
	};
	var getListDetail$3 = async (id, page, limit = pageInfo$6.limit_song) => {
		if (id.includes("/bodian/")) return getListDetailMusicListByBD(id, page);
		let rawId = id;
		if (/[?&:/]/.test(id)) rawId = id.replace(regExps$4.listDetailLink, "$1");
		else if (id.startsWith("digest-")) {
			const [digest, _id] = id.split("__");
			const digestNum = digest.replace("digest-", "");
			rawId = _id;
			switch (digestNum) {
				case "8": break;
				case "13": return getAlbumDetail(rawId, page, limit);
				default: return getListDetailDigest5(rawId, page);
			}
		}
		return getListDetailDigest8(rawId, page);
	};
	var search$13 = async (keyword, page, limit = 20) => {
		const { body: rawBody } = await request(`http://search.kuwo.cn/r.s?all=${encodeURIComponent(keyword)}&pn=${page - 1}&rn=${limit}&rformat=json&encoding=utf8&ver=mbox&vipver=MUSIC_8.7.7.0_BCS37&plat=pc&devid=28156413&ft=playlist&pay=0&needliveshow=0`);
		const body = objStr2JSON(rawBody);
		return {
			list: body.abslist.map((item) => ({
				play_count: formatPlayCount(Number(item.playcnt ?? 0)),
				id: String(item.playlistid ?? ""),
				author: decodeName(item.nickname ?? ""),
				name: decodeName(item.name ?? ""),
				total: Number(item.songnum ?? 0),
				img: item.pic ?? "",
				desc: decodeName(item.intro ?? "")
			})),
			total: Number(body.TOTAL ?? 0),
			limit,
			page
		};
	};
	//#endregion
	//#region src/onlineResource/kw/tipSearch.ts
	var tipSearchBySong = async (str) => {
		const { body, statusCode } = await request(`https://tips.kuwo.cn/t.s?corp=kuwo&newver=3&p2p=1&notrace=0&c=mbox&w=${encodeURIComponent(str)}&encoding=utf8&rformat=json`, { headers: { Referer: "http://www.kuwo.cn/" } });
		if (statusCode != 200 || !body.WORDITEMS) throw new Error("search failed");
		return body.WORDITEMS.map((item) => item.RELWORD);
	};
	var search$12 = async (str) => {
		return tipSearchBySong(str);
	};
	//#endregion
	//#region src/onlineResource/kw/topSongs.ts
	var boardList$3 = [
		{
			id: "340",
			name: "青少年专属飙升榜",
			pic: "http://img2.kwcdn.kuwo.cn/star/upload/8/8/1543919795640_.png"
		},
		{
			id: "93",
			name: "酷我飙升榜",
			pic: "http://img3.kwcdn.kuwo.cn/star/upload/8/8/1543919795640_.png"
		},
		{
			id: "17",
			name: "酷我新歌榜",
			pic: "http://img4.kwcdn.kuwo.cn/star/upload/9/9/1543919747769_.png"
		},
		{
			id: "16",
			name: "酷我热歌榜",
			pic: "http://img1.kwcdn.kuwo.cn/star/upload/2/2/1543919658018_.png"
		},
		{
			id: "158",
			name: "抖音热歌榜",
			pic: "http://img4.kwcdn.kuwo.cn/star/upload/6/6/1554970547302_.png"
		},
		{
			id: "145",
			name: "会员畅听榜",
			pic: "http://img3.kwcdn.kuwo.cn/star/upload/1/1/1554695862673_.png"
		},
		{
			id: "176",
			name: "DJ嗨歌榜",
			pic: "http://img1.kwcdn.kuwo.cn/star/upload/9/9/1543805792217_.png"
		},
		{
			id: "69",
			name: "儿童歌曲榜",
			pic: "https://kwimg1.kuwo.cn/star/upload/83/45/1708661051345_.jpg"
		},
		{
			id: "344",
			name: "儿童故事榜",
			pic: "https://kwimg2.kuwo.cn/star/upload/64/29/1708661051623_.jpg"
		},
		{
			id: "284",
			name: "酷我热评榜",
			pic: "http://img3.kwcdn.kuwo.cn/star/upload/11/11/1576751304219_.png"
		},
		{
			id: "278",
			name: "古风音乐榜",
			pic: "http://img1.kwcdn.kuwo.cn/star/upload/12/12/1600079704156_.png"
		},
		{
			id: "264",
			name: "Vlog音乐榜",
			pic: "https://kwimg4.kuwo.cn/star/upload/48/48/1693479025902_.png"
		},
		{
			id: "242",
			name: "酷我电音榜",
			pic: "http://img2.kwcdn.kuwo.cn/star/upload/1/1/1588145907409_.png"
		},
		{
			id: "187",
			name: "流行趋势榜",
			pic: "http://img1.kwcdn.kuwo.cn/star/upload/13/13/1562810920205_.png"
		},
		{
			id: "204",
			name: "现场音乐榜",
			pic: "http://img2.kwcdn.kuwo.cn/star/upload/13/13/1567493121245_.png"
		},
		{
			id: "185",
			name: "最强翻唱榜",
			pic: "http://img3.kwcdn.kuwo.cn/star/upload/15/15/1558696739359_.png"
		},
		{
			id: "26",
			name: "经典怀旧榜",
			pic: "https://kwimg4.kuwo.cn/star/upload/71/0/1693479018896_.png"
		},
		{
			id: "104",
			name: "酷我华语榜",
			pic: "https://kwimg2.kuwo.cn/star/upload/89/89/1693479025943_.png"
		},
		{
			id: "182",
			name: "酷我粤语榜",
			pic: "https://kwimg2.kuwo.cn/star/upload/7/9/1693479026059_.png"
		},
		{
			id: "22",
			name: "酷我欧美榜",
			pic: "https://kwimg1.kuwo.cn/star/upload/93/93/1693479025947_.png"
		},
		{
			id: "184",
			name: "酷我韩语榜",
			pic: "http://img1.kwcdn.kuwo.cn/star/upload/5/5/1558696815381_.png"
		},
		{
			id: "183",
			name: "酷我日语榜",
			pic: "http://img4.kwcdn.kuwo.cn/star/upload/8/8/1558695640280_.png"
		},
		{
			id: "153",
			name: "网红新歌榜",
			pic: "https://kwimg4.kuwo.cn/star/upload/22/23/1693479025975_.png"
		},
		{
			id: "64",
			name: "影视金曲榜",
			pic: "http://img2.kwcdn.kuwo.cn/star/upload/9/9/1549010297209_.png"
		},
		{
			id: "151",
			name: "腾讯音乐人原创榜",
			pic: "https://kwimg4.kuwo.cn/star/upload/4/19/1693480696087_.png"
		},
		{
			id: "12",
			name: "Billboard榜",
			pic: "http://img2.kwcdn.kuwo.cn/star/upload/7/7/1543920767111_.png"
		},
		{
			id: "180",
			name: "beatport电音榜",
			pic: "http://img2.kwcdn.kuwo.cn/star/upload/0/0/1548990226481_.png"
		},
		{
			id: "13",
			name: "英国UK榜",
			pic: "http://img2.kwcdn.kuwo.cn/star/upload/4/4/1543920895540_.png"
		},
		{
			id: "164",
			name: "百大DJ榜",
			pic: "http://img1.kwcdn.kuwo.cn/star/upload/7/7/1543921876743_.png"
		},
		{
			id: "246",
			name: "YouTube音乐排行榜",
			pic: "http://img2.kwcdn.kuwo.cn/star/upload/14/14/1569378463582_.png"
		},
		{
			id: "15",
			name: "日本公信榜",
			pic: "http://img1.kwcdn.kuwo.cn/star/upload/11/11/1543921161339_.png"
		}
	];
	var regExps$3 = { mInfo: /level:(\w+),bitrate:(\d+),format:(\w+),size:([\w.]+)/ };
	var filterBoardsData$2 = (rawList) => {
		let list = [];
		for (const board of rawList) {
			if (board.source != "1") continue;
			list.push({
				id: board.sourceid,
				name: board.name,
				pic: board.pic
			});
		}
		return list;
	};
	var getBoards$3 = async () => {
		try {
			const resp = await request("http://qukudata.kuwo.cn/q.k?op=query&cont=tree&node=2&pn=0&rn=1000&fmt=json&level=2");
			if (resp.statusCode !== 200 || !resp.body.child) throw new Error("Failed to fetch boards");
			return filterBoardsData$2(resp.body.child);
		} catch {
			return boardList$3;
		}
	};
	var getDates$3 = async (id) => {
		return [];
	};
	var filterData$1 = (rawList) => {
		return rawList.map((item) => {
			const types = {};
			const infoArr = item.n_minfo.split(";");
			for (const info of infoArr) {
				const result = regExps$3.mInfo.exec(info);
				if (result) switch (result[2]) {
					case "4000":
						types.flac24bit = { sizeStr: result[4].toLocaleUpperCase() };
						break;
					case "2000":
						types.flac = { sizeStr: result[4].toLocaleUpperCase() };
						break;
					case "320":
						types["320k"] = { sizeStr: result[4].toLocaleUpperCase() };
						break;
					case "128": types["128k"] = { sizeStr: result[4].toLocaleUpperCase() };
				}
			}
			return {
				id: `kw_${String(item.id)}`,
				name: decodeName(item.name),
				singer: formatSinger(decodeName(item.artist)),
				interval: formatPlayTime(item.duration),
				isLocal: false,
				meta: {
					picUrl: item.pic,
					albumName: decodeName(item.album),
					source: "kw",
					musicId: String(item.id),
					qualitys: types,
					createTime: 0,
					posTime: 0,
					updateTime: 0,
					albumId: item.albumId
				}
			};
		});
	};
	var getList$7 = async (id, date, page, limit) => {
		limit = 100;
		const requestBody = {
			uid: "",
			devId: "",
			sFrom: "kuwo_sdk",
			user_type: "AP",
			carSource: "kwplayercar_ar_6.0.1.0_apk_keluze.apk",
			id,
			pn: page - 1,
			rn: limit
		};
		const { statusCode, body } = await request(`https://wbd.kuwo.cn/api/bd/bang/bang_info?${await wbdCrypto.buildParam(requestBody)}`);
		const rawData = await wbdCrypto.decodeData(body);
		const data = rawData.data;
		if (statusCode !== 200 || rawData.code != 200 || !data.musiclist) throw new Error("Failed to fetch top songs");
		return {
			total: data.total,
			list: filterData$1(data.musiclist),
			limit,
			page,
			info: {
				name: data.name,
				pic: data.pic,
				date: data.releaseDate,
				desc: data.info
			}
		};
	};
	//#endregion
	//#region src/onlineResource/kw/index.ts
	var kw = {
		musicSearch: search$14,
		getLyric: getLyric$3,
		getPic: getPic$3,
		songlistSearch: search$13,
		songlistDetail: getListDetail$3,
		songlistTags: getTags$3,
		songlistSorts: getSorts$3,
		songlist: getList$8,
		topSongs: getBoards$3,
		topSongsDate: getDates$3,
		topSongsDetail: getList$7,
		tipSearch: search$12,
		hotSearch: search$15,
		getAlbumDetail,
		musicComment: musicComment$3
	};
	//#endregion
	//#region src/onlineResource/mg/hotSearch.ts
	var filterList$2 = (rawList = []) => {
		return rawList.filter((item) => item.resourceType === "song").map((item) => item.word);
	};
	var search$11 = async () => {
		const { body, statusCode } = await request("http://jadeite.migu.cn:7090/music_search/v3/search/hotword");
		if (statusCode !== 200 || body.code !== "000000") throw new Error("mg hotSearch failed");
		return filterList$2(body.data.hotwords[0]?.hotwordList ?? []);
	};
	//#endregion
	//#region src/onlineResource/mg/utils/index.ts
	var setQuality = (qualitys, key, rawSize) => {
		if (!rawSize) return;
		qualitys[key] = { sizeStr: sizeFormate(rawSize) };
	};
	var normalizeMiguImg = (img) => {
		if (!img) return null;
		return /^https?:/.test(img) ? img : `http://d.musicapp.migu.cn${img}`;
	};
	var createSignature = async (time, str) => {
		const deviceId = "963B7AA0D21511ED807EE5846EC87D20";
		return {
			sign: await toMD5(`${str}6cdc72a439cef99a3418d2a78aa28c73yyapp2d16148780a1dcc7408e06336b98cfd50${deviceId}${time}`),
			deviceId
		};
	};
	var buildMusicInfoList = (rawList) => {
		const ids = /* @__PURE__ */ new Set();
		const list = [];
		rawList.forEach((item) => {
			if (!item.songId || ids.has(item.songId)) return;
			ids.add(item.songId);
			const qualitys = {};
			item.newRateFormats.forEach((type) => {
				const rawSize = Number(type.size ?? type.androidSize ?? 0);
				switch (type.formatType) {
					case "PQ":
						setQuality(qualitys, "128k", rawSize);
						break;
					case "HQ":
						setQuality(qualitys, "320k", rawSize);
						break;
					case "SQ":
						setQuality(qualitys, "flac", rawSize);
						break;
					case "ZQ": setQuality(qualitys, "flac24bit", rawSize);
				}
			});
			const interval = /(\d\d:\d\d)$/.exec(item.length)?.[1] ?? null;
			const img = item.albumImgs?.length ? item.albumImgs[0].img : null;
			list.push({
				id: `mg_${item.songId}`,
				singer: formatSingerName(item.artists, "name"),
				name: item.songName,
				interval,
				isLocal: false,
				meta: {
					source: "mg",
					musicId: item.songId,
					albumId: item.albumId,
					albumName: item.album,
					qualitys,
					createTime: 0,
					posTime: 0,
					updateTime: 0,
					copyrightId: item.copyrightId,
					contentId: item.contentId,
					img,
					picUrl: img,
					lrc: null,
					lrcUrl: item.lrcUrl,
					mrcUrl: item.mrcUrl,
					trcUrl: item.trcUrl
				}
			});
		});
		return list;
	};
	var buildMusicInfoListV5 = (rawList) => {
		const ids = /* @__PURE__ */ new Set();
		const list = [];
		rawList.forEach((item) => {
			if (!item.songId || ids.has(item.songId)) return;
			ids.add(item.songId);
			const qualitys = {};
			item.audioFormats.forEach((type) => {
				const rawSize = Number(type.isize ?? type.asize ?? 0);
				switch (type.formatType) {
					case "PQ":
						setQuality(qualitys, "128k", rawSize);
						break;
					case "HQ":
						setQuality(qualitys, "320k", rawSize);
						break;
					case "SQ":
						setQuality(qualitys, "flac", rawSize);
						break;
					case "ZQ":
					case "ZQ24": setQuality(qualitys, "flac24bit", rawSize);
				}
			});
			const img = normalizeMiguImg(item.img3 || item.img2 || item.img1 || null);
			list.push({
				id: `mg_${item.songId}`,
				singer: formatSingerName(item.singerList, "name"),
				name: item.songName,
				interval: formatPlayTime(item.duration),
				isLocal: false,
				meta: {
					source: "mg",
					musicId: item.songId,
					albumId: item.albumId,
					albumName: item.album,
					qualitys,
					createTime: 0,
					posTime: 0,
					updateTime: 0,
					copyrightId: item.copyrightId,
					contentId: item.contentId,
					img,
					picUrl: img,
					lrc: null,
					lrcUrl: item.lrcUrl,
					mrcUrl: item.mrcUrl,
					trcUrl: item.trcUrl
				}
			});
		});
		return list;
	};
	//#endregion
	//#region src/onlineResource/mg/musicDetail.ts
	var batchSize = 100;
	var detailUrl = "https://c.musicapp.migu.cn/MIGUM2.0/v1.0/content/resourceinfo.do?resourceType=2";
	var createGetMusicInfosTask = (ids) => {
		const list = [...ids];
		const tasks = [];
		while (list.length) tasks.push(list.splice(0, batchSize));
		return tasks;
	};
	var requestMusicInfoBatch = async (ids) => {
		const { body, statusCode } = await request(detailUrl, {
			method: "POST",
			form: { resourceId: ids.join("|") }
		});
		const code = body.code ?? body.returnCode;
		if (statusCode !== 200 || code !== "000000") throw new Error("mg getMusicInfos failed");
		return body.resource ?? [];
	};
	var getMusicInfos = async (songIds) => {
		if (!songIds.length) return [];
		const tasks = createGetMusicInfosTask(songIds);
		return buildMusicInfoList(await Promise.all(tasks.map(async (task) => requestMusicInfoBatch(task))).then((data) => data.flat()));
	};
	var getMusicInfo$1 = async (songId) => {
		return getMusicInfos([songId]).then((data) => data[0]);
	};
	//#endregion
	//#region src/onlineResource/mg/utils/mrc.ts
	var DELTA = 2654435769n;
	var MIN_LENGTH = 32;
	var keyArr = [
		27303562373562475n,
		18014862372307051n,
		22799692160172081n,
		34058940340699235n,
		30962724186095721n,
		27303523720101991n,
		27303523720101998n,
		31244139033526382n,
		28992395054481524n
	];
	var MAX = 9223372036854775807n;
	var MIN = -9223372036854775808n;
	var toLong = (value) => {
		const num = typeof value === "string" ? BigInt(`0x${value}`) : value;
		if (num > MAX) return toLong(num - (1n << 64n));
		if (num < MIN) return toLong(num + (1n << 64n));
		return num;
	};
	var longToBytes = (value) => {
		const result = /* @__PURE__ */ new Uint8Array(8);
		let current = value;
		for (let i = 0; i < 8; i++) {
			result[i] = Number(current & 255n);
			current >>= 8n;
		}
		return result;
	};
	var toBigintArray = (data) => {
		const length = Math.floor(data.length / 16);
		const result = Array(length);
		for (let i = 0; i < length; i++) result[i] = toLong(data.slice(i * 16, i * 16 + 16));
		return result;
	};
	var longArrToString = async (data) => {
		const chunks = [];
		for (const item of data) chunks.push(await iconv.decode(longToBytes(item), "utf16le"));
		return chunks.join("");
	};
	var teaDecrypt = (data, key) => {
		const length = data.length;
		const lengthBitint = BigInt(length);
		if (length >= 1) {
			let j2 = data[0];
			let j3 = toLong((6n + 52n / lengthBitint) * DELTA);
			while (true) {
				const j4 = j3;
				if (j4 == 0n) break;
				const j5 = toLong(3n & toLong(j4 >> 2n));
				let j6 = lengthBitint;
				while (true) {
					j6--;
					if (j6 > 0n) {
						const j7 = data[Number(j6 - 1n)];
						const i = Number(j6);
						j2 = toLong(data[i] - (toLong(toLong(j2 ^ j4) + toLong(j7 ^ key[Number(toLong(3n & j6 ^ j5))])) ^ toLong(toLong(toLong(j7 >> 5n) ^ toLong(j2 << 2n)) + toLong(toLong(j2 >> 3n) ^ toLong(j7 << 4n)))));
						data[i] = j2;
					} else break;
				}
				const j8 = data[Number(lengthBitint - 1n)];
				j2 = toLong(data[0] - toLong(toLong(toLong(key[Number(toLong(j6 & 3n ^ j5))] ^ j8) + toLong(j2 ^ j4)) ^ toLong(toLong(toLong(j8 >> 5n) ^ toLong(j2 << 2n)) + toLong(toLong(j2 >> 3n) ^ toLong(j8 << 4n)))));
				data[0] = j2;
				j3 = toLong(j4 - DELTA);
			}
		}
		return data;
	};
	var decrypt = async (data) => {
		if (data == null || data.length < MIN_LENGTH) return data;
		return longArrToString(teaDecrypt(toBigintArray(data), keyArr));
	};
	//#endregion
	//#region src/onlineResource/mg/lyric.ts
	var rxps = {
		lineTime: /^\s*\[(\d+),\d+\]/,
		wordTime: /\(\d+,\d+\)/,
		wordTimeAll: /(\(\d+,\d+\))/g
	};
	var parseLyric$1 = (str) => {
		str = str.replace(/\r/g, "");
		const lines = str.split("\n");
		const lxlrcLines = [];
		const lrcLines = [];
		for (const line of lines) {
			if (line.length < 6) continue;
			const result = rxps.lineTime.exec(line);
			if (!result) continue;
			const startTime = Number.parseInt(result[1], 10);
			let time = startTime;
			const ms = (time % 1e3).toString().padStart(3, "0");
			time /= 1e3;
			const m = Number.parseInt(String(time / 60), 10).toString().padStart(2, "0");
			time %= 60;
			const timeLabel = `${m}:${Number.parseInt(String(time), 10).toString().padStart(2, "0")}.${ms}`;
			const words = line.replace(rxps.lineTime, "");
			lrcLines.push(`[${timeLabel}]${words.replace(rxps.wordTimeAll, "")}`);
			const times = words.match(rxps.wordTimeAll) ?? [];
			if (!times.length) continue;
			const formatTimes = times.map((value) => {
				const result = /\((\d+),(\d+)\)/.exec(value);
				if (!result) return "";
				return `<${Math.trunc(parseInt(result[1], 10) - startTime)},${result[2]}>`;
			});
			const wordArr = words.split(rxps.wordTime);
			const newWords = formatTimes.map((value, index) => `${value}${wordArr[index]}`).join("");
			lxlrcLines.push(`[${timeLabel}]${newWords}`);
		}
		return {
			lyric: lrcLines.join("\n"),
			awlyric: lxlrcLines.join("\n")
		};
	};
	var getText = async (url, tryNum = 0) => {
		const { body, statusCode } = await request(url, { headers: {
			Referer: "https://app.c.nf.migu.cn/",
			"User-Agent": "Mozilla/5.0 (Linux; Android 5.1.1; Nexus 6 Build/LYZ28E) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Mobile Safari/537.36",
			channel: "0146921"
		} });
		if (statusCode === 200) return body;
		if (tryNum > 5 || statusCode === 404) throw new Error("歌词获取失败");
		return getText(url, tryNum + 1);
	};
	var getMrc = async (url) => {
		return parseLyric$1(await decrypt(await getText(url)));
	};
	var getLrc = async (url) => {
		return getText(url).then((text) => ({
			lyric: text,
			awlyric: ""
		}));
	};
	var getTrc = async (url) => {
		if (!url) return "";
		return getText(url);
	};
	var getLyric$2 = async (musicInfo) => {
		const songId = musicInfo.meta.musicId;
		if (!songId) throw new Error("获取歌词失败");
		const info = musicInfo.meta.mrcUrl == null ? await getMusicInfo$1(songId) : musicInfo;
		if (!info) throw new Error("获取歌词失败");
		const mrcUrl = typeof info.meta.mrcUrl === "string" ? info.meta.mrcUrl : "";
		const lrcUrl = typeof info.meta.lrcUrl === "string" ? info.meta.lrcUrl : "";
		const trcUrl = typeof info.meta.trcUrl === "string" ? info.meta.trcUrl : void 0;
		let promise;
		if (mrcUrl) promise = getMrc(mrcUrl);
		else if (lrcUrl) promise = getLrc(lrcUrl);
		else throw new Error("获取歌词失败");
		const [lrcInfo, tlyric] = await Promise.all([promise, getTrc(trcUrl)]);
		return {
			lyric: lrcInfo.lyric,
			tlyric,
			rlyric: "",
			awlyric: lrcInfo.awlyric
		};
	};
	//#endregion
	//#region src/onlineResource/mg/musicComment.ts
	var headers = { "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1" };
	var successCode = "000000";
	var lastCommentIds = /* @__PURE__ */ new Map();
	var getSongId$3 = (musicInfo) => {
		const id = musicInfo.meta.musicId;
		if (typeof id === "string" || typeof id === "number") return String(id);
		throw new Error("songId not found");
	};
	var buildReplyItem = (item) => ({
		id: String(item.replyId),
		text: item.replyInfo || "",
		time: Number(item.replyTime) || void 0,
		userName: item.user.nickName,
		avatar: item.user.middleIcon || item.user.bigIcon || item.user.smallIcon,
		userId: String(item.user.userId),
		likedCount: void 0,
		reply: []
	});
	var buildCommentItem = (item) => ({
		id: String(item.commentId),
		text: item.commentInfo || "",
		time: Number(item.commentTime) || void 0,
		userName: item.user.nickName,
		avatar: item.user.middleIcon || item.user.bigIcon || item.user.smallIcon,
		userId: String(item.user.userId),
		likedCount: item.opNumItem?.thumbNum,
		reply: (item.replyComments ?? []).map((reply) => buildReplyItem(reply))
	});
	var filterComment$1 = (rawList) => {
		if (!rawList) return [];
		return rawList.map((item) => buildCommentItem(item));
	};
	var getCommentCursorMap = (songId) => {
		let map = lastCommentIds.get(songId);
		if (!map) {
			map = /* @__PURE__ */ new Map();
			lastCommentIds.set(songId, map);
		}
		return map;
	};
	var getComment$2 = async (musicInfo, page = 1, limit = 20) => {
		const songId = getSongId$3(musicInfo);
		const cursorMap = getCommentCursorMap(songId);
		if (page === 1) cursorMap.clear();
		const commentId = cursorMap.get(page) ?? "";
		if (page > 1 && !commentId) throw new Error("mg getComment failed");
		const { body, statusCode } = await request(`https://app.c.nf.migu.cn/MIGUM3.0/user/comment/stack/v1.0?pageSize=${limit}&queryType=1&resourceId=${songId}&resourceType=2&commentId=${commentId}`, { headers });
		if (statusCode !== 200 || body.code !== successCode) throw new Error("mg getComment failed");
		const list = filterComment$1(body.data.comments);
		cursorMap.set(page + 1, list.length ? String(list[list.length - 1].id) : "");
		return {
			list,
			total: Number(body.data.commentNums) || 0,
			page,
			limit
		};
	};
	var getHotComment$2 = async (musicInfo, page = 1, limit = 20) => {
		const { body, statusCode } = await request(`https://app.c.nf.migu.cn/MIGUM3.0/user/comment/stack/v1.0?pageSize=${limit}&queryType=2&resourceId=${getSongId$3(musicInfo)}&resourceType=2&hotCommentStart=${(page - 1) * limit}`, { headers });
		if (statusCode !== 200 || body.code !== successCode) throw new Error("mg getHotComment failed");
		return {
			list: filterComment$1(body.data.hotComments),
			total: Number(body.data.cfgHotCount) || 0,
			page,
			limit
		};
	};
	var getReplyComment = async (musicInfo, replyId, page = 1, limit = 100) => {
		const { body, statusCode } = await request(`https://app.c.nf.migu.cn/MIGUM3.0/user/comment/stack/${replyId}/v1.0?pageSize=${limit}&queryType=2&resourceId=${getSongId$3(musicInfo)}&resourceType=2&start=${(page - 1) * limit}`, { headers });
		if (statusCode !== 200 || body.code !== successCode) throw new Error("mg getReplyComment failed");
		return {
			list: (body.data.mainCommentItem?.replyComments ?? []).map((item) => buildReplyItem(item)),
			total: Number(body.data.replyTotalCount) || 0,
			page,
			limit
		};
	};
	var musicComment$2 = async (options) => {
		const { musicInfo, type, page, limit } = options;
		switch (type) {
			case "new": return getComment$2(musicInfo, page, limit);
			case "hot": return getHotComment$2(musicInfo, page, limit);
			case "reply":
				if (!options.id) throw new Error("id is required for reply type");
				return getReplyComment(musicInfo, options.id, page, limit);
		}
		throw new Error("Invalid comment type");
	};
	//#endregion
	//#region src/onlineResource/mg/musicSearch.ts
	var pageInfo$5 = {
		limit: 20,
		total: 0,
		page: 0,
		allPage: 1
	};
	var musicSearch$2 = async (str, page, limit) => {
		const time = Date.now().toString();
		const signData = await createSignature(time, str);
		const { body } = await request(`https://jadeite.migu.cn/music_search/v3/search/searchAll?isCorrect=0&isCopyright=1&searchSwitch=%7B%22song%22%3A1%2C%22album%22%3A0%2C%22singer%22%3A0%2C%22tagSong%22%3A1%2C%22mvSong%22%3A0%2C%22bestShow%22%3A1%2C%22songlist%22%3A0%2C%22lyricSong%22%3A0%7D&pageSize=${limit}&text=${encodeURIComponent(str)}&pageNo=${page}&sort=0&sid=USS`, { headers: {
			uiVersion: "A_music_3.6.1",
			deviceId: signData.deviceId,
			timestamp: time,
			sign: signData.sign,
			channel: "0146921",
			"User-Agent": "Mozilla/5.0 (Linux; U; Android 11.0.0; zh-cn; MI 11 Build/OPR1.170623.032) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30"
		} });
		return body;
	};
	var filterData = (rawData) => {
		return buildMusicInfoListV5(rawData.flat());
	};
	var search$10 = async (str, page = 1, limit) => {
		limit ??= pageInfo$5.limit;
		const result = await musicSearch$2(str, page, limit);
		if (result.code !== "000000") throw new Error("mg search failed");
		const list = filterData(result.songResultData.resultList);
		pageInfo$5.total = Number.parseInt(result.songResultData.totalCount, 10) || 0;
		pageInfo$5.page = page;
		pageInfo$5.allPage = Math.ceil(pageInfo$5.total / limit);
		return {
			list,
			limit,
			total: pageInfo$5.total,
			page: pageInfo$5.page
		};
	};
	//#endregion
	//#region src/onlineResource/mg/pic.ts
	var getPic$2 = async (musicInfo) => {
		return (await getMusicInfo$1(musicInfo.id))?.meta.picUrl;
	};
	//#endregion
	//#region src/onlineResource/mg/songlist.ts
	var pageInfo$4 = {
		limit_list: 30,
		limit_song: 100,
		successCode: "000000",
		sortList: [{
			label: "recommend",
			name: "推荐",
			id: "15127315"
		}]
	};
	var defaultHeaders = {
		Referer: "https://app.c.nf.migu.cn/",
		"User-Agent": "Mozilla/5.0 (Linux; Android 5.1.1; Nexus 6 Build/LYZ28E) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Mobile Safari/537.36",
		channel: "0146921"
	};
	var filterTagData = (rawData) => {
		const hotTags = rawData[0]?.content?.map((item) => ({
			id: item.texts[1] ?? "",
			name: item.texts[0] ?? ""
		})).filter((item) => item.id && item.name) ?? [];
		return {
			tags: rawData.slice(1).map((item) => ({
				name: item.header.title,
				list: item.content.map((tag) => ({
					id: tag.texts[1] ?? "",
					name: tag.texts[0] ?? ""
				})).filter((tag) => tag.id && tag.name)
			})),
			hotTags
		};
	};
	var filterListByTag = (rawData = []) => {
		return rawData.map((item) => ({
			play_count: item.barList[0]?.title,
			id: item.logEvent.contentId,
			name: item.title,
			img: item.imageUrl
		}));
	};
	var filterListRecommend = (rawData) => {
		const list = [];
		const ids = /* @__PURE__ */ new Set();
		const walk = (items) => {
			for (const item of items) {
				if ("contents" in item && item.contents) {
					walk(item.contents);
					continue;
				}
				if (item.resType !== "2021" || !item.resId || ids.has(item.resId)) continue;
				ids.add(item.resId);
				list.push({
					id: item.resId,
					name: item.txt ?? "Unknown",
					img: item.img,
					desc: item.txt2
				});
			}
		};
		for (const item of rawData) walk(item.contents);
		return list;
	};
	var getSorts$2 = async () => {
		return pageInfo$4.sortList.map((item) => ({
			id: String(item.id),
			name: `{songlist.sort.${item.label}}`
		}));
	};
	var getTags$2 = async () => {
		try {
			const { body, statusCode } = await request("https://app.c.nf.migu.cn/pc/v1.0/template/musiclistplaza-taglist/release", { headers: defaultHeaders });
			if (statusCode !== 200 || body.code !== pageInfo$4.successCode || !body.data?.length) throw new Error("mg songlistTags failed");
			return filterTagData(body.data);
		} catch (e) {
			throw new Error("mg songlistTags failed", { cause: e });
		}
	};
	var getList$6 = async (_sortId, tagId, page, limit = pageInfo$4.limit_list) => {
		const hasTag = Boolean(tagId);
		const { body, statusCode } = await request(hasTag ? `https://app.c.nf.migu.cn/pc/v1.0/template/musiclistplaza-listbytag/release?pageNumber=${page}&templateVersion=2&tagId=${tagId}` : `https://app.c.nf.migu.cn/pc/bmw/page-data/playlist-square-recommend/v1.0?templateVersion=2&pageNo=${page}`, { headers: defaultHeaders });
		if (statusCode !== 200 || body.code !== pageInfo$4.successCode) throw new Error("mg songlist failed");
		const list = hasTag ? filterListByTag(body.data.contentItemList[1].itemList) : filterListRecommend(body.data.contents);
		return {
			list,
			total: list.length,
			page,
			limit: list.length
		};
	};
	var getListDetail$2 = async (id, page, limit = pageInfo$4.limit_song) => {
		const { body: infoBody, statusCode: infoStatusCode } = await request(`https://c.musicapp.migu.cn/MIGUM3.0/resource/playlist/v2.0?playlistId=${id}`, { headers: defaultHeaders });
		if (infoStatusCode !== 200 || infoBody.code !== pageInfo$4.successCode) throw new Error("mg songlistDetail failed");
		const { body: songBody, statusCode: songStatusCode } = await request(`https://app.c.nf.migu.cn/MIGUM3.0/resource/playlist/song/v2.0?pageNo=${page}&pageSize=${limit}&playlistId=${id}`, { headers: defaultHeaders });
		if (songStatusCode !== 200 || songBody.code !== pageInfo$4.successCode) throw new Error("mg songlistDetail failed");
		return {
			list: buildMusicInfoListV5(songBody.data?.songList || []),
			total: songBody.data.totalCount,
			limit,
			page,
			info: {
				play_count: formatPlayCount(infoBody.data.opNumItem.playNum),
				name: infoBody.data.title,
				img: infoBody.data.imgItem.img,
				desc: infoBody.data.summary,
				author: infoBody.data.ownerName
			}
		};
	};
	var search$9 = async (text, page, limit = 20) => {
		const timeStr = Date.now().toString();
		const signData = await createSignature(timeStr, text);
		const { body, statusCode } = await request(`https://jadeite.migu.cn/music_search/v3/search/searchAll?isCorrect=1&isCopyright=1&searchSwitch=%7B%22song%22%3A0%2C%22album%22%3A0%2C%22singer%22%3A0%2C%22tagSong%22%3A0%2C%22mvSong%22%3A0%2C%22bestShow%22%3A0%2C%22songlist%22%3A1%2C%22lyricSong%22%3A0%7D&pageSize=${limit}&text=${encodeURIComponent(text)}&pageNo=${page}&sort=0&sid=USS`, { headers: {
			uiVersion: "A_music_3.6.1",
			deviceId: signData.deviceId,
			timestamp: timeStr,
			sign: signData.sign,
			channel: "0146921",
			"User-Agent": "Mozilla/5.0 (Linux; U; Android 11.0.0; zh-cn; MI 11 Build/OPR1.170623.032) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30"
		} });
		if (statusCode !== 200 || body.code !== pageInfo$4.successCode) throw new Error("mg songlistSearch failed");
		return {
			list: (body.songListResultData?.result || []).map((item) => ({
				play_count: formatPlayCount(Number(item.playNum) || 0),
				id: item.id,
				author: item.userName,
				name: item.name,
				time: "",
				img: item.musicListPicUrl,
				total: Number(item.musicNum) || 0,
				desc: item.intro ?? ""
			})),
			limit,
			total: Number(body.songListResultData?.totalCount) || 0,
			page
		};
	};
	//#endregion
	//#region src/onlineResource/mg/tipSearch.ts
	var filterResult = (body) => {
		const result = /* @__PURE__ */ new Set();
		for (const item of body.data.singerList ?? []) if (item.singerName) result.add(item.singerName);
		for (const item of body.data.songList ?? []) if (item.songName) result.add(item.songName);
		return [...result];
	};
	var search$8 = async (str) => {
		const { body, statusCode } = await request(`https://app.u.nf.migu.cn/pc/resource/content/tone_search_suggest/v1.0?text=${encodeURIComponent(str)}`, { headers: {
			"User-Agent": "MGMobileMusic/7.33.0 (iPhone; iOS 16.6; Scale/3.00)",
			channel: "0146921"
		} });
		if (statusCode !== 200 || body.code !== "000000") throw new Error("mg tipSearch failed");
		return filterResult(body);
	};
	//#endregion
	//#region src/onlineResource/mg/topSongs.ts
	var boardList$2 = [
		{
			id: "75959118",
			name: "音乐风向榜",
			pic: "https://d.musicapp.migu.cn/data/oss/column/00/1w/w7/913ca325104448e7a019b6c3f9ec4874.webp"
		},
		{
			id: "76557036",
			name: "彩铃分贝榜",
			pic: "https://d.musicapp.migu.cn/data/oss/column/00/1w/w7/6bfcc5b221404d00a84fa70576f35655.webp"
		},
		{
			id: "76557745",
			name: "会员臻爱榜",
			pic: "https://d.musicapp.migu.cn/data/oss/column/00/1w/w7/61ee20c3cea148168405ca9ddbf93807.webp"
		},
		{
			id: "23189800",
			name: "港台榜",
			pic: "https://d.musicapp.migu.cn/data/oss/column/00/1w/w7/529556c1b7a5450c8a8a77fc17b6da00.webp"
		},
		{
			id: "23189399",
			name: "内地榜",
			pic: "https://d.musicapp.migu.cn/data/oss/column/00/1w/w6/72b0840d1c84402eb25d59e5f0257b20.webp"
		},
		{
			id: "83176390",
			name: "国风热歌榜",
			pic: "https://d.musicapp.migu.cn/data/oss/resource/00/5s/8y/67eabab4110847809d319eefe5794cbd.webp"
		},
		{
			id: "27553319",
			name: "新歌榜",
			pic: "https://d.musicapp.migu.cn/data/oss/resource/00/5s/8y/67eabab4110847809d319eefe5794cbd.webp"
		},
		{
			id: "27186466",
			name: "热歌榜",
			pic: "https://d.musicapp.migu.cn/data/oss/resource/00/4t/9y/a64e69c4d8c54f59b580b1a25ae5ceb3.webp"
		},
		{
			id: "27553408",
			name: "原创榜",
			pic: "https://d.musicapp.migu.cn/data/oss/resource/00/5l/hn/52e4c5c1862347928827e9f00cfada1a.webp"
		}
	];
	var parseBoards = (data) => {
		const list = [];
		const seen = /* @__PURE__ */ new Set();
		for (const content of data.data?.contents ?? []) for (const item of content.contents ?? []) if (item.rankId && !seen.has(item.rankId)) {
			seen.add(item.rankId);
			list.push({
				id: item.rankId,
				name: item.rankName,
				pic: item.imageUrl
			});
		}
		return list.length > 0 ? list : boardList$2;
	};
	var getBoards$2 = async () => {
		try {
			const { body, statusCode } = await request("https://app.c.nf.migu.cn/pc/bmw/rank/rank-index/v1.0", { headers: {
				Referer: "https://app.c.nf.migu.cn/",
				"User-Agent": "Mozilla/5.0 (Linux; Android 5.1.1; Nexus 6 Build/LYZ28E) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Mobile Safari/537.36",
				channel: "0146921"
			} });
			if (statusCode !== 200 || body.code !== "000000" || !body.data?.contents) throw new Error("wy topSongs getBoards failed");
			return parseBoards(body);
		} catch {
			return boardList$2;
		}
	};
	var getDates$2 = async () => {
		return [];
	};
	var getList$5 = async (id, _date, page, limit = 200) => {
		const { body, statusCode } = await request(`https://app.c.nf.migu.cn/MIGUM2.0/v1.0/content/querycontentbyId.do?columnId=${id}&needAll=0`, { headers: {
			Referer: "https://app.c.nf.migu.cn/",
			"User-Agent": "Mozilla/5.0 (Linux; Android 5.1.1; Nexus 6 Build/LYZ28E) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Mobile Safari/537.36",
			channel: "0146921"
		} });
		if (statusCode !== 200 || body.code !== "000000") throw new Error("mg topSongs getList failed");
		return {
			list: buildMusicInfoList(body.columnInfo.contents.map((item) => item.objectInfo)),
			total: body.columnInfo.contentsCount,
			limit: body.columnInfo.contentsCount,
			page,
			info: {
				name: body.columnInfo.columnTitle,
				pic: body.columnInfo.columnSmallpicUrl,
				desc: body.columnInfo.columnDes,
				date: dateFormat(body.columnInfo.columnUpdateTime, "Y-M-D")
			}
		};
	};
	//#endregion
	//#region src/onlineResource/mg/index.ts
	var mg = {
		musicSearch: search$10,
		getLyric: getLyric$2,
		getPic: getPic$2,
		songlistSearch: search$9,
		songlistDetail: getListDetail$2,
		songlistTags: getTags$2,
		songlistSorts: getSorts$2,
		songlist: getList$6,
		topSongs: getBoards$2,
		topSongsDate: getDates$2,
		topSongsDetail: getList$5,
		musicComment: musicComment$2,
		tipSearch: search$8,
		hotSearch: search$11
	};
	//#endregion
	//#region src/onlineResource/tx/hotSearch.ts
	var search$7 = async () => {
		const { body, statusCode } = await request("https://u.y.qq.com/cgi-bin/musicu.fcg", {
			method: "POST",
			headers: { Referer: "https://y.qq.com/portal/player.html" },
			json: {
				comm: {
					ct: "19",
					cv: "1803",
					guid: "0",
					patch: "118",
					psrf_access_token_expiresAt: 0,
					psrf_qqaccess_token: "",
					psrf_qqopenid: "",
					psrf_qqunionid: "",
					tmeAppID: "qqmusic",
					tmeLoginType: 0,
					uin: "0",
					wid: "0"
				},
				hotkey: {
					method: "GetHotkeyForQQMusicPC",
					module: "tencent_musicsoso_hotkey.HotkeyService",
					param: {
						search_id: "",
						uin: 0
					}
				}
			}
		});
		if (statusCode !== 200 || body.code !== 0) throw new Error("tx hotSearch failed");
		return (body.hotkey?.data?.vec_hotkey ?? []).map((item) => item.query ?? "").filter(Boolean);
	};
	//#endregion
	//#region src/onlineResource/tx/utils/crypto.ts
	var PART_1_INDEXES = [
		23,
		14,
		6,
		36,
		16,
		40,
		7,
		19
	];
	var PART_2_INDEXES = [
		16,
		1,
		32,
		12,
		19,
		27,
		8,
		5
	];
	var SCRAMBLE_VALUES = [
		89,
		39,
		179,
		150,
		218,
		82,
		58,
		252,
		177,
		52,
		186,
		123,
		120,
		64,
		242,
		133,
		143,
		161,
		121,
		179
	];
	function pickHashByIdx(hash, indexes) {
		return indexes.map((idx) => hash[idx]).join("");
	}
	async function base64Encode(data) {
		return (await dataConverter(new Uint8Array(data), "base64")).replace(/[\\/+=]/g, "");
	}
	async function zzcSign(text) {
		const hash = await crypto.sha1(text);
		const part1 = pickHashByIdx(hash, PART_1_INDEXES);
		const part2 = pickHashByIdx(hash, PART_2_INDEXES);
		return `zzc${part1}${await base64Encode(SCRAMBLE_VALUES.map((value, i) => value ^ parseInt(hash.slice(i * 2, i * 2 + 2), 16)))}${part2}`.toLowerCase();
	}
	//#endregion
	//#region src/onlineResource/tx/utils/index.ts
	var signRequest = async (data) => {
		return request(`https://u.y.qq.com/cgi-bin/musics.fcg?sign=${await zzcSign(JSON.stringify(data))}`, {
			method: "POST",
			headers: { "User-Agent": "QQMusic 14090508(android 12)" },
			json: data
		});
	};
	var buildMusicList$1 = (rawList) => {
		if (!rawList || !Array.isArray(rawList)) return [];
		const list = [];
		rawList.forEach((item) => {
			if (!item.file?.media_mid) return;
			const types = {};
			const file = item.file;
			if (file.size_128mp3 != 0) types["128k"] = { sizeStr: sizeFormate(file.size_128mp3) };
			if (file.size_320mp3 !== 0) types["320k"] = { sizeStr: sizeFormate(file.size_320mp3) };
			if (file.size_flac !== 0) types.flac = { sizeStr: sizeFormate(file.size_flac) };
			if (file.size_hires !== 0) types.flac24bit = { sizeStr: sizeFormate(file.size_hires) };
			let albumId = "";
			let albumName = "";
			if (item.album) {
				albumName = item.album.name;
				albumId = item.album.mid;
			}
			list.push({
				id: `tx_${String(item.mid)}`,
				name: item.title,
				singer: formatSingerName(item.singer, "name"),
				interval: item.interval ? formatPlayTime(item.interval) : null,
				isLocal: false,
				meta: {
					albumName,
					source: "tx",
					musicId: item.mid,
					qualitys: types,
					createTime: 0,
					posTime: 0,
					updateTime: 0,
					albumId,
					songId: String(item.id),
					albumMid: item.album?.mid ?? "",
					strMediaMid: item.file.media_mid,
					picUrl: albumId === "" || albumId === "空" ? item.singer?.length ? `https://y.gtimg.cn/music/photo_new/T001R500x500M000${item.singer[0].mid}.jpg` : "" : `https://y.gtimg.cn/music/photo_new/T002R500x500M000${albumId}.jpg`
				}
			});
		});
		return list;
	};
	//#endregion
	//#region src/onlineResource/tx/musicInfo.ts
	var getMusicInfo = async (songmid) => {
		const { body } = await request("https://u.y.qq.com/cgi-bin/musicu.fcg", {
			method: "POST",
			headers: { "User-Agent": "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/5.0)" },
			json: {
				comm: {
					ct: "19",
					cv: "1859",
					uin: "0"
				},
				req: {
					module: "music.pf_song_detail_svr",
					method: "get_song_detail_yqq",
					param: {
						song_type: 0,
						song_mid: songmid
					}
				}
			}
		});
		if (body.code !== 0 || body.req.code !== 0) throw new Error("tx getMusicInfo failed");
		const item = body.req.data.track_info;
		if (!item.file?.media_mid) return null;
		return buildMusicList$1([item])[0];
	};
	//#endregion
	//#region src/onlineResource/tx/qrcDecode.ts
	/**
	* QRC 歌词解密（3DES-ECB + zlib inflate）
	*
	* 由原 C++ native 插件（qrc_decode.node）1:1 移植为纯 TS 实现。
	* 加密算法为标准 3DES（DES-EDE3，ECB 模式、无填充），密钥固定。
	* 数据流程：hex 字符串 -> 字节 -> 3DES 解密 -> zlib inflate -> UTF-8 文本。
	*/
	var DES_ENCRYPT = 1;
	var DES_DECRYPT = 0;
	var sbox = [
		[
			14,
			4,
			13,
			1,
			2,
			15,
			11,
			8,
			3,
			10,
			6,
			12,
			5,
			9,
			0,
			7,
			0,
			15,
			7,
			4,
			14,
			2,
			13,
			1,
			10,
			6,
			12,
			11,
			9,
			5,
			3,
			8,
			4,
			1,
			14,
			8,
			13,
			6,
			2,
			11,
			15,
			12,
			9,
			7,
			3,
			10,
			5,
			0,
			15,
			12,
			8,
			2,
			4,
			9,
			1,
			7,
			5,
			11,
			3,
			14,
			10,
			0,
			6,
			13
		],
		[
			15,
			1,
			8,
			14,
			6,
			11,
			3,
			4,
			9,
			7,
			2,
			13,
			12,
			0,
			5,
			10,
			3,
			13,
			4,
			7,
			15,
			2,
			8,
			15,
			12,
			0,
			1,
			10,
			6,
			9,
			11,
			5,
			0,
			14,
			7,
			11,
			10,
			4,
			13,
			1,
			5,
			8,
			12,
			6,
			9,
			3,
			2,
			15,
			13,
			8,
			10,
			1,
			3,
			15,
			4,
			2,
			11,
			6,
			7,
			12,
			0,
			5,
			14,
			9
		],
		[
			10,
			0,
			9,
			14,
			6,
			3,
			15,
			5,
			1,
			13,
			12,
			7,
			11,
			4,
			2,
			8,
			13,
			7,
			0,
			9,
			3,
			4,
			6,
			10,
			2,
			8,
			5,
			14,
			12,
			11,
			15,
			1,
			13,
			6,
			4,
			9,
			8,
			15,
			3,
			0,
			11,
			1,
			2,
			12,
			5,
			10,
			14,
			7,
			1,
			10,
			13,
			0,
			6,
			9,
			8,
			7,
			4,
			15,
			14,
			3,
			11,
			5,
			2,
			12
		],
		[
			7,
			13,
			14,
			3,
			0,
			6,
			9,
			10,
			1,
			2,
			8,
			5,
			11,
			12,
			4,
			15,
			13,
			8,
			11,
			5,
			6,
			15,
			0,
			3,
			4,
			7,
			2,
			12,
			1,
			10,
			14,
			9,
			10,
			6,
			9,
			0,
			12,
			11,
			7,
			13,
			15,
			1,
			3,
			14,
			5,
			2,
			8,
			4,
			3,
			15,
			0,
			6,
			10,
			10,
			13,
			8,
			9,
			4,
			5,
			11,
			12,
			7,
			2,
			14
		],
		[
			2,
			12,
			4,
			1,
			7,
			10,
			11,
			6,
			8,
			5,
			3,
			15,
			13,
			0,
			14,
			9,
			14,
			11,
			2,
			12,
			4,
			7,
			13,
			1,
			5,
			0,
			15,
			10,
			3,
			9,
			8,
			6,
			4,
			2,
			1,
			11,
			10,
			13,
			7,
			8,
			15,
			9,
			12,
			5,
			6,
			3,
			0,
			14,
			11,
			8,
			12,
			7,
			1,
			14,
			2,
			13,
			6,
			15,
			0,
			9,
			10,
			4,
			5,
			3
		],
		[
			12,
			1,
			10,
			15,
			9,
			2,
			6,
			8,
			0,
			13,
			3,
			4,
			14,
			7,
			5,
			11,
			10,
			15,
			4,
			2,
			7,
			12,
			9,
			5,
			6,
			1,
			13,
			14,
			0,
			11,
			3,
			8,
			9,
			14,
			15,
			5,
			2,
			8,
			12,
			3,
			7,
			0,
			4,
			10,
			1,
			13,
			11,
			6,
			4,
			3,
			2,
			12,
			9,
			5,
			15,
			10,
			11,
			14,
			1,
			7,
			6,
			0,
			8,
			13
		],
		[
			4,
			11,
			2,
			14,
			15,
			0,
			8,
			13,
			3,
			12,
			9,
			7,
			5,
			10,
			6,
			1,
			13,
			0,
			11,
			7,
			4,
			9,
			1,
			10,
			14,
			3,
			5,
			12,
			2,
			15,
			8,
			6,
			1,
			4,
			11,
			13,
			12,
			3,
			7,
			14,
			10,
			15,
			6,
			8,
			0,
			5,
			9,
			2,
			6,
			11,
			13,
			8,
			1,
			4,
			10,
			7,
			9,
			5,
			0,
			15,
			14,
			2,
			3,
			12
		],
		[
			13,
			2,
			8,
			4,
			6,
			15,
			11,
			1,
			10,
			9,
			3,
			14,
			5,
			0,
			12,
			7,
			1,
			15,
			13,
			8,
			10,
			3,
			7,
			4,
			12,
			5,
			6,
			11,
			0,
			14,
			9,
			2,
			7,
			11,
			4,
			1,
			9,
			12,
			14,
			2,
			0,
			6,
			10,
			13,
			15,
			3,
			5,
			8,
			2,
			1,
			14,
			7,
			4,
			10,
			8,
			13,
			15,
			12,
			9,
			0,
			3,
			5,
			6,
			11
		]
	];
	var key_rnd_shift = [
		1,
		1,
		2,
		2,
		2,
		2,
		2,
		2,
		1,
		2,
		2,
		2,
		2,
		2,
		2,
		1
	];
	var key_perm_c = [
		56,
		48,
		40,
		32,
		24,
		16,
		8,
		0,
		57,
		49,
		41,
		33,
		25,
		17,
		9,
		1,
		58,
		50,
		42,
		34,
		26,
		18,
		10,
		2,
		59,
		51,
		43,
		35
	];
	var key_perm_d = [
		62,
		54,
		46,
		38,
		30,
		22,
		14,
		6,
		61,
		53,
		45,
		37,
		29,
		21,
		13,
		5,
		60,
		52,
		44,
		36,
		28,
		20,
		12,
		4,
		27,
		19,
		11,
		3
	];
	var key_compression = [
		13,
		16,
		10,
		23,
		0,
		4,
		2,
		27,
		14,
		5,
		20,
		9,
		22,
		18,
		11,
		3,
		25,
		7,
		15,
		6,
		26,
		19,
		12,
		1,
		40,
		51,
		30,
		36,
		46,
		54,
		29,
		39,
		50,
		44,
		32,
		47,
		43,
		48,
		38,
		55,
		33,
		52,
		45,
		41,
		49,
		35,
		28,
		31
	];
	var bitnum = (a, b, c) => (a[(b / 32 | 0) * 4 + 3 - (b % 32 / 8 | 0)] >>> 7 - b % 8 & 1) << c >>> 0;
	var bitnum_intr = (a, b, c) => (a >>> 31 - b & 1) << c >>> 0;
	var bitnum_intl = (a, b, c) => (a << b >>> 0 & 2147483648) >>> 0 >>> c >>> 0;
	var sbox_bit = (a) => a & 32 | (a & 31) >>> 1 | (a & 1) << 4;
	var initial_permutation = (input) => {
		return [(bitnum(input, 57, 31) | bitnum(input, 49, 30) | bitnum(input, 41, 29) | bitnum(input, 33, 28) | bitnum(input, 25, 27) | bitnum(input, 17, 26) | bitnum(input, 9, 25) | bitnum(input, 1, 24) | bitnum(input, 59, 23) | bitnum(input, 51, 22) | bitnum(input, 43, 21) | bitnum(input, 35, 20) | bitnum(input, 27, 19) | bitnum(input, 19, 18) | bitnum(input, 11, 17) | bitnum(input, 3, 16) | bitnum(input, 61, 15) | bitnum(input, 53, 14) | bitnum(input, 45, 13) | bitnum(input, 37, 12) | bitnum(input, 29, 11) | bitnum(input, 21, 10) | bitnum(input, 13, 9) | bitnum(input, 5, 8) | bitnum(input, 63, 7) | bitnum(input, 55, 6) | bitnum(input, 47, 5) | bitnum(input, 39, 4) | bitnum(input, 31, 3) | bitnum(input, 23, 2) | bitnum(input, 15, 1) | bitnum(input, 7, 0)) >>> 0, (bitnum(input, 56, 31) | bitnum(input, 48, 30) | bitnum(input, 40, 29) | bitnum(input, 32, 28) | bitnum(input, 24, 27) | bitnum(input, 16, 26) | bitnum(input, 8, 25) | bitnum(input, 0, 24) | bitnum(input, 58, 23) | bitnum(input, 50, 22) | bitnum(input, 42, 21) | bitnum(input, 34, 20) | bitnum(input, 26, 19) | bitnum(input, 18, 18) | bitnum(input, 10, 17) | bitnum(input, 2, 16) | bitnum(input, 60, 15) | bitnum(input, 52, 14) | bitnum(input, 44, 13) | bitnum(input, 36, 12) | bitnum(input, 28, 11) | bitnum(input, 20, 10) | bitnum(input, 12, 9) | bitnum(input, 4, 8) | bitnum(input, 62, 7) | bitnum(input, 54, 6) | bitnum(input, 46, 5) | bitnum(input, 38, 4) | bitnum(input, 30, 3) | bitnum(input, 22, 2) | bitnum(input, 14, 1) | bitnum(input, 6, 0)) >>> 0];
	};
	var inverse_permutation = (s0, s1, out) => {
		out[3] = (bitnum_intr(s1, 7, 7) | bitnum_intr(s0, 7, 6) | bitnum_intr(s1, 15, 5) | bitnum_intr(s0, 15, 4) | bitnum_intr(s1, 23, 3) | bitnum_intr(s0, 23, 2) | bitnum_intr(s1, 31, 1) | bitnum_intr(s0, 31, 0)) & 255;
		out[2] = (bitnum_intr(s1, 6, 7) | bitnum_intr(s0, 6, 6) | bitnum_intr(s1, 14, 5) | bitnum_intr(s0, 14, 4) | bitnum_intr(s1, 22, 3) | bitnum_intr(s0, 22, 2) | bitnum_intr(s1, 30, 1) | bitnum_intr(s0, 30, 0)) & 255;
		out[1] = (bitnum_intr(s1, 5, 7) | bitnum_intr(s0, 5, 6) | bitnum_intr(s1, 13, 5) | bitnum_intr(s0, 13, 4) | bitnum_intr(s1, 21, 3) | bitnum_intr(s0, 21, 2) | bitnum_intr(s1, 29, 1) | bitnum_intr(s0, 29, 0)) & 255;
		out[0] = (bitnum_intr(s1, 4, 7) | bitnum_intr(s0, 4, 6) | bitnum_intr(s1, 12, 5) | bitnum_intr(s0, 12, 4) | bitnum_intr(s1, 20, 3) | bitnum_intr(s0, 20, 2) | bitnum_intr(s1, 28, 1) | bitnum_intr(s0, 28, 0)) & 255;
		out[7] = (bitnum_intr(s1, 3, 7) | bitnum_intr(s0, 3, 6) | bitnum_intr(s1, 11, 5) | bitnum_intr(s0, 11, 4) | bitnum_intr(s1, 19, 3) | bitnum_intr(s0, 19, 2) | bitnum_intr(s1, 27, 1) | bitnum_intr(s0, 27, 0)) & 255;
		out[6] = (bitnum_intr(s1, 2, 7) | bitnum_intr(s0, 2, 6) | bitnum_intr(s1, 10, 5) | bitnum_intr(s0, 10, 4) | bitnum_intr(s1, 18, 3) | bitnum_intr(s0, 18, 2) | bitnum_intr(s1, 26, 1) | bitnum_intr(s0, 26, 0)) & 255;
		out[5] = (bitnum_intr(s1, 1, 7) | bitnum_intr(s0, 1, 6) | bitnum_intr(s1, 9, 5) | bitnum_intr(s0, 9, 4) | bitnum_intr(s1, 17, 3) | bitnum_intr(s0, 17, 2) | bitnum_intr(s1, 25, 1) | bitnum_intr(s0, 25, 0)) & 255;
		out[4] = (bitnum_intr(s1, 0, 7) | bitnum_intr(s0, 0, 6) | bitnum_intr(s1, 8, 5) | bitnum_intr(s0, 8, 4) | bitnum_intr(s1, 16, 3) | bitnum_intr(s0, 16, 2) | bitnum_intr(s1, 24, 1) | bitnum_intr(s0, 24, 0)) & 255;
	};
	var des_f = (state, key) => {
		const t1 = (bitnum_intl(state, 31, 0) | (state & 4026531840) >>> 0 >>> 1 | bitnum_intl(state, 4, 5) | bitnum_intl(state, 3, 6) | (state & 251658240) >>> 0 >>> 3 | bitnum_intl(state, 8, 11) | bitnum_intl(state, 7, 12) | (state & 15728640) >>> 0 >>> 5 | bitnum_intl(state, 12, 17) | bitnum_intl(state, 11, 18) | (state & 983040) >>> 0 >>> 7 | bitnum_intl(state, 16, 23)) >>> 0;
		const t2 = (bitnum_intl(state, 15, 0) | (state & 61440) << 15 >>> 0 | bitnum_intl(state, 20, 5) | bitnum_intl(state, 19, 6) | (state & 3840) << 13 >>> 0 | bitnum_intl(state, 24, 11) | bitnum_intl(state, 23, 12) | (state & 240) << 11 >>> 0 | bitnum_intl(state, 28, 17) | bitnum_intl(state, 27, 18) | (state & 15) << 9 >>> 0 | bitnum_intl(state, 0, 23)) >>> 0;
		const lrgstate = [
			t1 >>> 24 & 255,
			t1 >>> 16 & 255,
			t1 >>> 8 & 255,
			t2 >>> 24 & 255,
			t2 >>> 16 & 255,
			t2 >>> 8 & 255
		];
		for (let i = 0; i < 6; i++) lrgstate[i] ^= key[i];
		const s = (sbox[0][sbox_bit(lrgstate[0] >>> 2)] << 28 | sbox[1][sbox_bit((lrgstate[0] & 3) << 4 | lrgstate[1] >>> 4)] << 24 | sbox[2][sbox_bit((lrgstate[1] & 15) << 2 | lrgstate[2] >>> 6)] << 20 | sbox[3][sbox_bit(lrgstate[2] & 63)] << 16 | sbox[4][sbox_bit(lrgstate[3] >>> 2)] << 12 | sbox[5][sbox_bit((lrgstate[3] & 3) << 4 | lrgstate[4] >>> 4)] << 8 | sbox[6][sbox_bit((lrgstate[4] & 15) << 2 | lrgstate[5] >>> 6)] << 4 | sbox[7][sbox_bit(lrgstate[5] & 63)]) >>> 0;
		return (bitnum_intl(s, 15, 0) | bitnum_intl(s, 6, 1) | bitnum_intl(s, 19, 2) | bitnum_intl(s, 20, 3) | bitnum_intl(s, 28, 4) | bitnum_intl(s, 11, 5) | bitnum_intl(s, 27, 6) | bitnum_intl(s, 16, 7) | bitnum_intl(s, 0, 8) | bitnum_intl(s, 14, 9) | bitnum_intl(s, 22, 10) | bitnum_intl(s, 25, 11) | bitnum_intl(s, 4, 12) | bitnum_intl(s, 17, 13) | bitnum_intl(s, 30, 14) | bitnum_intl(s, 9, 15) | bitnum_intl(s, 1, 16) | bitnum_intl(s, 7, 17) | bitnum_intl(s, 23, 18) | bitnum_intl(s, 13, 19) | bitnum_intl(s, 31, 20) | bitnum_intl(s, 26, 21) | bitnum_intl(s, 2, 22) | bitnum_intl(s, 8, 23) | bitnum_intl(s, 18, 24) | bitnum_intl(s, 12, 25) | bitnum_intl(s, 29, 26) | bitnum_intl(s, 5, 27) | bitnum_intl(s, 21, 28) | bitnum_intl(s, 10, 29) | bitnum_intl(s, 3, 30) | bitnum_intl(s, 24, 31)) >>> 0;
	};
	var des_crypt = (input, schedule, output) => {
		let [s0, s1] = initial_permutation(input);
		for (let i = 0; i < 15; i++) {
			const prev = s1;
			s1 = (des_f(s1, schedule[i]) ^ s0) >>> 0;
			s0 = prev;
		}
		s0 = (des_f(s1, schedule[15]) ^ s0) >>> 0;
		inverse_permutation(s0, s1, output);
	};
	var key_schedule = (key, mode) => {
		const schedule = Array.from({ length: 16 }, () => /* @__PURE__ */ new Uint8Array(6));
		let c = 0;
		let d = 0;
		for (let i = 0; i < 28; i++) {
			c = (c | bitnum(key, key_perm_c[i], 31 - i)) >>> 0;
			d = (d | bitnum(key, key_perm_d[i], 31 - i)) >>> 0;
		}
		for (let i = 0; i < 16; i++) {
			c = ((c << key_rnd_shift[i] >>> 0 | c >>> 28 - key_rnd_shift[i]) & 4294967280) >>> 0;
			d = ((d << key_rnd_shift[i] >>> 0 | d >>> 28 - key_rnd_shift[i]) & 4294967280) >>> 0;
			const togen = mode === DES_DECRYPT ? 15 - i : i;
			for (let j = 0; j < 24; j++) schedule[togen][j / 8 | 0] |= bitnum_intr(c, key_compression[j], 7 - j % 8);
			for (let j = 24; j < 48; j++) schedule[togen][j / 8 | 0] |= bitnum_intr(d, key_compression[j] - 27, 7 - j % 8);
		}
		return schedule;
	};
	var tripledes_key_setup = (key, mode) => {
		if (mode === DES_ENCRYPT) return [
			key_schedule(key.subarray(0, 8), DES_ENCRYPT),
			key_schedule(key.subarray(8, 16), DES_DECRYPT),
			key_schedule(key.subarray(16, 24), DES_ENCRYPT)
		];
		return [
			key_schedule(key.subarray(16, 24), DES_DECRYPT),
			key_schedule(key.subarray(8, 16), DES_ENCRYPT),
			key_schedule(key.subarray(0, 8), DES_DECRYPT)
		];
	};
	var tripledes_crypt = (input, schedule, output) => {
		const buf = /* @__PURE__ */ new Uint8Array(8);
		des_crypt(input, schedule[0], buf);
		des_crypt(buf, schedule[1], output);
		des_crypt(output, schedule[2], buf);
		output.set(buf);
	};
	var QRC_KEY = new Uint8Array([
		33,
		64,
		35,
		41,
		40,
		42,
		36,
		37,
		49,
		50,
		51,
		90,
		88,
		67,
		33,
		64,
		33,
		64,
		35,
		41,
		40,
		78,
		72,
		76
	]);
	/**
	* 解密腾讯 QRC 歌词。
	* @param hexData 服务端返回的十六进制字符串
	* @returns 解密并解压后的歌词文本（解析失败时返回空字符串）
	*/
	var decodeQrc = async (hexData) => {
		if (!hexData || hexData.length % 2 !== 0) return "";
		const encrypted = await dataConverter(hexData, "hex");
		if (encrypted.length === 0) return "";
		const schedule = tripledes_key_setup(QRC_KEY, DES_DECRYPT);
		const block = /* @__PURE__ */ new Uint8Array(8);
		for (let i = 0; i + 8 <= encrypted.length; i += 8) {
			tripledes_crypt(encrypted.subarray(i, i + 8), schedule, block);
			encrypted.set(block, i);
		}
		try {
			return await dataConverter(await zlib.inflate(encrypted, "binary", { finishFlush: "Z_SYNC_FLUSH" }), "utf-8");
		} catch {
			return "";
		}
	};
	//#endregion
	//#region src/onlineResource/tx/lyric.ts
	var decodeLyric = async (lrc, tlrc, rlrc) => ({
		lyric: await decodeQrc(lrc),
		tlyric: await decodeQrc(tlrc),
		rlyric: await decodeQrc(rlrc)
	});
	var parseTools$1 = {
		rxps: {
			info: /^{"/,
			lineTime: /^\[(\d+),\d+\]/,
			lineTime2: /^\[([\d:.]+)\]/,
			wordTime: /\(\d+,\d+\)/,
			wordTimeAll: /(\(\d+,\d+\))/g,
			timeLabelFixRxp: /(?:\.0+|0+)$/
		},
		msFormat(timeMs) {
			if (Number.isNaN(timeMs)) return "";
			let ms = (timeMs % 1e3).toString().padStart(3, "0");
			timeMs /= 1e3;
			let m = Math.trunc(timeMs / 60).toString().padStart(2, "0");
			timeMs %= 60;
			return `[${m}:${Math.trunc(timeMs).toString().padStart(2, "0")}.${ms}]`;
		},
		parseLyric(lrc) {
			lrc = lrc.trim();
			lrc = lrc.replace(/\r/g, "");
			if (!lrc) return {
				lyric: "",
				awlyric: ""
			};
			const lines = lrc.split("\n");
			const awlrcLines = [];
			const lrcLines = [];
			for (let line of lines) {
				line = line.trim();
				let result = this.rxps.lineTime.exec(line);
				if (!result) {
					if (line.startsWith("[offset")) {
						awlrcLines.push(line);
						lrcLines.push(line);
					}
					if (this.rxps.lineTime2.test(line)) lrcLines.push(line);
					continue;
				}
				const startMsTime = parseInt(result[1]);
				const startTimeStr = this.msFormat(startMsTime);
				if (!startTimeStr) continue;
				let words = line.replace(this.rxps.lineTime, "");
				lrcLines.push(`${startTimeStr}${words.replace(this.rxps.wordTimeAll, "")}`);
				let times = words.match(this.rxps.wordTimeAll);
				if (!times) continue;
				const timesArr = times.map((time) => {
					const result = /\((\d+),(\d+)\)/.exec(time);
					return `<${Math.trunc(Math.max(parseInt(result[1]) - startMsTime))},${result[2]}>`;
				});
				const wordArr = words.split(this.rxps.wordTime);
				const newWords = timesArr.map((time, index) => `${time}${wordArr[index]}`).join("");
				awlrcLines.push(`${startTimeStr}${newWords}`);
			}
			return {
				lyric: lrcLines.join("\n"),
				awlyric: awlrcLines.join("\n")
			};
		},
		parseRlyric(lrc) {
			lrc = lrc.trim();
			lrc = lrc.replace(/\r/g, "");
			if (!lrc) return "";
			const lines = lrc.split("\n");
			const lrcLines = [];
			for (let line of lines) {
				line = line.trim();
				let result = this.rxps.lineTime.exec(line);
				if (!result) continue;
				const startMsTime = parseInt(result[1]);
				const startTimeStr = this.msFormat(startMsTime);
				if (!startTimeStr) continue;
				let words = line.replace(this.rxps.lineTime, "");
				lrcLines.push(`${startTimeStr}${words.replace(this.rxps.wordTimeAll, "")}`);
			}
			return lrcLines.join("\n");
		},
		removeTag(str) {
			return str.replace(/^[\S\s]*?LyricContent="/, "").replace(/"\/>[\S\s]*?$/, "");
		},
		getIntv(interval) {
			if (!interval) return 0;
			if (!interval.includes(".")) interval += ".0";
			let arr = interval.split(/:|\./);
			while (arr.length < 3) arr.unshift("0");
			const [m, s, ms] = arr;
			return parseInt(m) * 36e5 + parseInt(s) * 1e3 + parseInt(ms);
		},
		fixRlrcTimeTag(rlrc, lrc) {
			const rlrcLines = rlrc.split("\n");
			let lrcLines = lrc.split("\n");
			let newLrc = [];
			rlrcLines.forEach((line) => {
				const result = this.rxps.lineTime2.exec(line);
				if (!result) return;
				if (!line.replace(this.rxps.lineTime2, "").trim()) return;
				const t1 = this.getIntv(result[1]);
				while (lrcLines.length) {
					const lrcLine = lrcLines.shift();
					const lrcLineResult = this.rxps.lineTime2.exec(lrcLine);
					if (!lrcLineResult) continue;
					const t2 = this.getIntv(lrcLineResult[1]);
					if (Math.abs(t1 - t2) < 100) {
						newLrc.push(line.replace(this.rxps.lineTime2, lrcLineResult[0]));
						break;
					}
				}
			});
			return newLrc.join("\n");
		},
		fixTlrcTimeTag(tlrc, lrc) {
			const tlrcLines = tlrc.split("\n");
			let lrcLines = lrc.split("\n");
			let newLrc = [];
			tlrcLines.forEach((line) => {
				const result = this.rxps.lineTime2.exec(line);
				if (!result) return;
				if (!line.replace(this.rxps.lineTime2, "").trim()) return;
				let time = result[1];
				if (time.includes(".")) time += "".padStart(3 - time.split(".")[1].length, "0");
				const t1 = this.getIntv(time);
				while (lrcLines.length) {
					const lrcLine = lrcLines.shift();
					const lrcLineResult = this.rxps.lineTime2.exec(lrcLine);
					if (!lrcLineResult) continue;
					const t2 = this.getIntv(lrcLineResult[1]);
					if (Math.abs(t1 - t2) < 100) {
						newLrc.push(line.replace(this.rxps.lineTime2, lrcLineResult[0]));
						break;
					}
				}
			});
			return newLrc.join("\n");
		},
		parse(lrc, tlrc, rlrc) {
			const info = {
				lyric: "",
				tlyric: "",
				rlyric: "",
				awlyric: ""
			};
			if (lrc) {
				let { lyric, awlyric } = this.parseLyric(this.removeTag(lrc));
				info.lyric = lyric;
				info.awlyric = awlyric;
			}
			if (rlrc) info.rlyric = this.fixRlrcTimeTag(this.parseRlyric(this.removeTag(rlrc)), info.lyric);
			if (tlrc) info.tlyric = this.fixTlrcTimeTag(tlrc, info.lyric);
			return info;
		}
	};
	var promises$1 = /* @__PURE__ */ new Map();
	var getSongId$2 = async ({ meta: { songId, musicId } }) => {
		if (songId) return songId;
		if (promises$1.has(musicId)) return (await promises$1.get(musicId))?.meta.songId;
		const promise = getMusicInfo(musicId);
		promises$1.set(musicId, promise);
		const info = await promise;
		promises$1.delete(musicId);
		return info?.meta.songId;
	};
	var parseLyric = async (lrc, tlrc, rlrc) => {
		const { lyric, tlyric, rlyric } = await decodeLyric(lrc, tlrc, rlrc);
		return parseTools$1.parse(lyric, tlyric, rlyric);
	};
	var getLyric$1 = async (mInfo) => {
		const songId = await getSongId$2(mInfo);
		if (!songId) throw new Error("Get lyric failed: songId not found");
		const { body } = await request("https://u.y.qq.com/cgi-bin/musicu.fcg", {
			method: "POST",
			headers: {
				referer: "https://y.qq.com",
				"user-agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36"
			},
			json: {
				comm: {
					ct: "19",
					cv: "1859",
					uin: "0"
				},
				req: {
					method: "GetPlayLyricInfo",
					module: "music.musichallSong.PlayLyricInfo",
					param: {
						format: "json",
						crypt: 1,
						ct: 19,
						cv: 1873,
						interval: 0,
						lrc_t: 0,
						qrc: 1,
						qrc_t: 0,
						roma: 1,
						roma_t: 0,
						songID: parseInt(songId),
						trans: 1,
						trans_t: 0,
						type: -1
					}
				}
			}
		});
		if (body.code != 0 || body.req.code != 0) throw new Error("Get lyric failed");
		const data = body.req.data;
		return parseLyric(data.lyric, data.trans, data.roma);
	};
	//#endregion
	//#region src/onlineResource/tx/musicComment.ts
	var emojis$1 = {
		e400846: "😘",
		e400874: "😴",
		e400825: "😃",
		e400847: "😙",
		e400835: "😍",
		e400873: "😳",
		e400836: "😎",
		e400867: "😭",
		e400832: "😊",
		e400837: "😏",
		e400875: "😫",
		e400831: "😉",
		e400855: "😡",
		e400823: "😄",
		e400862: "😨",
		e400844: "😖",
		e400841: "😓",
		e400830: "😈",
		e400828: "😆",
		e400833: "😋",
		e400822: "😀",
		e400843: "😕",
		e400829: "😇",
		e400824: "😂",
		e400834: "😌",
		e400877: "😷",
		e400132: "🍉",
		e400181: "🍺",
		e401067: "☕️",
		e400186: "🥧",
		e400343: "🐷",
		e400116: "🌹",
		e400126: "🍃",
		e400613: "💋",
		e401236: "❤️",
		e400622: "💔",
		e400637: "💣",
		e400643: "💩",
		e400773: "🔪",
		e400102: "🌛",
		e401328: "🌞",
		e400420: "👏",
		e400914: "🙌",
		e400408: "👍",
		e400414: "👎",
		e401121: "✋",
		e400396: "👋",
		e400384: "👉",
		e401115: "✊",
		e400402: "👌",
		e400905: "🙈",
		e400906: "🙉",
		e400907: "🙊",
		e400562: "👻",
		e400932: "🙏",
		e400644: "💪",
		e400611: "💉",
		e400185: "🎁",
		e400655: "💰",
		e400325: "🐥",
		e400612: "💊",
		e400198: "🎉",
		e401685: "⚡️",
		e400631: "💝",
		e400768: "🔥",
		e400432: "👑"
	};
	var songIdMap = /* @__PURE__ */ new Map();
	var promises = /* @__PURE__ */ new Map();
	var getSongId$1 = async ({ meta }) => {
		const { songId, musicId } = meta;
		if (songId) return songId;
		if (songIdMap.has(musicId)) return songIdMap.get(musicId);
		let promise = promises.get(musicId);
		if (!promise) {
			promise = getMusicInfo(musicId);
			promises.set(musicId, promise);
		}
		const id = (await promise)?.meta.songId;
		songIdMap.set(musicId, id || "");
		promises.delete(musicId);
		return id || "";
	};
	var formatTime = (time) => {
		return String(time).length < 10 ? null : parseInt(`${time}000`);
	};
	var replaceEmoji = (msg) => {
		const result = msg.match(/\[em\]e\d+\[\/em\]/g);
		if (!result) return msg;
		const rxp = /^\[em\](e\d+)\[\/em\]$/;
		const uniq = Array.from(new Set(result));
		for (const item of uniq) {
			const code = item.replace(rxp, "$1");
			const itemReg = item.replace("[em]", "\\[em\\]").replace("[/em]", "\\[\\/em\\]");
			msg = msg.replace(new RegExp(itemReg, "g"), emojis$1[code] || "");
		}
		return msg;
	};
	var formatReplyByNew = (rootId, commentId, time, timeStr, c) => {
		return {
			id: `sub_${rootId}_${c.subcommentid}`,
			text: replaceEmoji(c.subcommentcontent).replace(/\\n/g, "\n"),
			time: c.subcommentid === commentId ? time ?? void 0 : void 0,
			userName: c.replynick ? c.replynick.substring(1) : "",
			avatar: c.avatarurl ?? void 0,
			userId: c.encrypt_replyuin,
			likedCount: c.praisenum ?? void 0
		};
	};
	var filterNewComment = (rawList) => {
		return rawList.map((item) => {
			const time = formatTime(item.time);
			const timeStr = time ? dateFormat(time) : null;
			const middlecommentcontent = item.middlecommentcontent ? [...item.middlecommentcontent] : [];
			if (middlecommentcontent.length) {
				middlecommentcontent[0].avatarurl = item.avatarurl ?? void 0;
				middlecommentcontent[0].praisenum = item.praisenum ?? void 0;
				middlecommentcontent.reverse();
			}
			return {
				id: `${item.rootcommentid}_${item.commentid}`,
				text: item.rootcommentcontent ? replaceEmoji(item.rootcommentcontent).replace(/\\n/g, "\n") : "",
				time: item.rootcommentid === item.commentid ? time ?? void 0 : void 0,
				userName: item.rootcommentnick ? item.rootcommentnick.substring(1) : "",
				avatar: item.avatarurl ?? void 0,
				userId: item.encrypt_rootcommentuin,
				likedCount: item.praisenum ?? void 0,
				reply: middlecommentcontent.map((c) => formatReplyByNew(item.rootcommentid, item.commentid, time, timeStr, c))
			};
		});
	};
	var formatReplyByHot = (c) => {
		const time = c.PubTime ? formatTime(c.PubTime) : null;
		return {
			id: `sub_${c.SeqNo}_${c.CmId}`,
			text: replaceEmoji(c.Content).replace(/\\n/g, "\n"),
			time: time ?? void 0,
			userName: c.Nick ?? "",
			avatar: c.Avatar,
			images: c.Pic ? [c.Pic] : [],
			userId: c.EncryptUin,
			likedCount: c.PraiseNum
		};
	};
	var filterHotComment$1 = (rawList) => {
		return rawList.map((item) => {
			const time = item.PubTime ? formatTime(item.PubTime) : null;
			return {
				id: `${item.SeqNo}_${item.CmId}`,
				text: item.Content ? replaceEmoji(item.Content).replace(/\\n/g, "\n") : "",
				time: time ?? void 0,
				userName: item.Nick ?? "",
				images: item.Pic ? [item.Pic] : [],
				avatar: item.Avatar,
				location: item.Location || "",
				userId: item.EncryptUin,
				likedCount: item.PraiseNum,
				reply: item.SubComments ? item.SubComments.map((c) => formatReplyByHot(c)) : []
			};
		});
	};
	var getComment$1 = async (musicInfo, page = 1, limit = 20) => {
		const { body, statusCode } = await request("http://c.y.qq.com/base/fcgi-bin/fcg_global_comment_h5.fcg", {
			method: "POST",
			form: {
				uin: "0",
				format: "json",
				cid: "205360772",
				reqtype: "2",
				biztype: "1",
				topid: await getSongId$1(musicInfo),
				cmd: "8",
				needmusiccrit: "1",
				pagenum: page - 1,
				pagesize: limit
			}
		});
		if (statusCode !== 200 || body.code !== 0) throw new Error("tx getComment failed");
		const total = body.comment?.commenttotal ?? 0;
		return {
			list: filterNewComment(body.comment?.commentlist ?? []),
			total,
			page,
			limit
		};
	};
	var getHotComment$1 = async (musicInfo, page = 1, limit = 20) => {
		const songId = await getSongId$1(musicInfo);
		const { body, statusCode } = await request("https://u.y.qq.com/cgi-bin/musicu.fcg", {
			method: "POST",
			json: {
				comm: {
					cv: 4747474,
					ct: 24,
					format: "json",
					inCharset: "utf-8",
					outCharset: "utf-8",
					notice: 0,
					platform: "yqq.json",
					needNewCode: 1,
					uin: 0
				},
				req: {
					module: "music.globalComment.CommentRead",
					method: "GetHotCommentList",
					param: {
						BizType: 1,
						BizId: String(songId),
						LastCommentSeqNo: "",
						PageSize: limit,
						PageNum: page - 1,
						HotType: 1,
						WithAirborne: 0,
						PicEnable: 1
					}
				}
			},
			headers: {
				referer: "https://y.qq.com/",
				origin: "https://y.qq.com"
			}
		});
		if (statusCode !== 200 || body.code !== 0 || body.req?.code !== 0) throw new Error("tx getHotComment failed");
		const listData = body.req?.data?.CommentList;
		const total = listData?.Total ?? 0;
		return {
			list: filterHotComment$1(listData?.Comments ?? []),
			total,
			page,
			limit
		};
	};
	var musicComment$1 = async (options) => {
		const { musicInfo, type, page, limit } = options;
		switch (type) {
			case "new": return getComment$1(musicInfo, page, limit);
			case "hot": return getHotComment$1(musicInfo, page, limit);
			case "reply":
				if (!options.id) throw new Error("id is required for reply type");
				throw new Error("reply comment is not supported yet");
		}
		throw new Error("Invalid comment type");
	};
	//#endregion
	//#region src/onlineResource/tx/musicSearch.ts
	var pageInfo$3 = {
		limit: 30,
		total: 0,
		page: 0,
		allPage: 1,
		successCode: 0
	};
	var getSearchId = () => {
		let guid = "";
		for (let i = 0; i < 32; i++) guid += Math.floor(Math.random() * 16).toString(16);
		return guid.toUpperCase() + String(Math.floor(Math.random() * 1e5)).padStart(5, "0");
	};
	var musicSearch$1 = async (str, page, limit) => {
		const { body } = await signRequest({
			comm: {
				_channelid: "0",
				_os_version: "6.2.9200-2",
				ct: "19",
				cv: "2151",
				guid: "1F70E520B2EAA7D25E11760783C53CA9",
				patch: "118",
				psrf_access_token_expiresAt: 0,
				psrf_qqaccess_token: "",
				psrf_qqopenid: "",
				psrf_qqunionid: "",
				tmeAppID: "qqmusic",
				tmeLoginType: 0,
				uin: "0",
				wid: "7223299733393904640"
			},
			req: {
				module: "music.search.SearchCgiService",
				method: "DoSearchForQQMusicDesktop",
				param: {
					grp: 1,
					num_per_page: limit,
					page_num: page,
					query: str,
					remoteplace: "txt.newclient.top",
					search_type: 0,
					searchid: getSearchId()
				}
			}
		});
		if (body.code != pageInfo$3.successCode || body.req?.code != pageInfo$3.successCode) throw new Error(`Search failed: ${body.code} ${body.req?.code}`);
		return body.req.data;
	};
	var handleResult = (rawList) => {
		if (!rawList || !Array.isArray(rawList)) return [];
		const list = [];
		rawList.forEach((item) => {
			if (!item.file?.media_mid) return;
			const types = {};
			const file = item.file;
			if (file.size_128mp3 != 0) types["128k"] = { sizeStr: sizeFormate(file.size_128mp3) };
			if (file.size_320mp3 !== 0) types["320k"] = { sizeStr: sizeFormate(file.size_320mp3) };
			if (file.size_flac !== 0) types.flac = { sizeStr: sizeFormate(file.size_flac) };
			if (file.size_hires !== 0) types.flac24bit = { sizeStr: sizeFormate(file.size_hires) };
			let albumId = "";
			let albumName = "";
			if (item.album) {
				albumName = item.album.name;
				albumId = item.album.mid;
			}
			list.push({
				id: `tx_${String(item.mid)}`,
				name: item.title,
				singer: formatSingerName(item.singer, "name"),
				interval: item.interval ? formatPlayTime(item.interval) : null,
				isLocal: false,
				meta: {
					albumName,
					source: "tx",
					musicId: item.mid,
					qualitys: types,
					createTime: 0,
					posTime: 0,
					updateTime: 0,
					albumId,
					songId: String(item.id),
					albumMid: item.album?.mid ?? "",
					strMediaMid: item.file.media_mid,
					picUrl: albumId === "" || albumId === "空" ? item.singer?.length ? `https://y.gtimg.cn/music/photo_new/T001R500x500M000${item.singer[0].mid}.jpg` : "" : `https://y.gtimg.cn/music/photo_new/T002R500x500M000${albumId}.jpg`
				}
			});
		});
		return list;
	};
	var search$6 = async (str, page = 1, limit) => {
		limit ??= pageInfo$3.limit;
		const { body, meta } = await musicSearch$1(str, page, limit);
		const list = handleResult(body.song.list);
		pageInfo$3.total = meta.sum;
		pageInfo$3.page = page;
		pageInfo$3.allPage = Math.ceil(pageInfo$3.total / limit);
		return {
			list,
			limit,
			total: pageInfo$3.total,
			page: pageInfo$3.page
		};
	};
	//#endregion
	//#region src/onlineResource/tx/pic.ts
	var getPic$1 = async ({ meta }) => {
		console.log("tx pic:", meta.picUrl);
		return meta.picUrl;
	};
	//#endregion
	//#region src/onlineResource/tx/songlist.ts
	var pageInfo$2 = {
		limit_list: 36,
		limit_song: 1e5,
		successCode: 0,
		sortList: [
			{
				label: "recommend",
				name: "推荐",
				id: "-1"
			},
			{
				label: "hot",
				name: "最热",
				id: "3"
			},
			{
				label: "new",
				name: "最新",
				id: "2"
			}
		]
	};
	var regExps$2 = {
		hotTagHtml: /class="c_bg_link js_tag_item" data-id="\w+">.+?<\/a>/g,
		hotTag: /data-id="(\w+)">(.+?)<\/a>/,
		listDetailLink: /\/playlist\/(\d+)/,
		listDetailLink2: /id=(\d+)/
	};
	var getSorts$1 = async () => {
		return pageInfo$2.sortList.map((item) => ({
			id: String(item.id),
			name: `{songlist.sort.${item.label}}`
		}));
	};
	var filterTagInfo$1 = (rawList) => {
		return rawList.map((type) => ({
			name: type.group_name,
			list: type.v_item.map((item) => ({
				id: String(item.id),
				name: item.name
			}))
		}));
	};
	var getTag$1 = async () => {
		const { body, statusCode } = await request("https://u.y.qq.com/cgi-bin/musicu.fcg?loginUin=0&hostUin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=wk_v15.json&needNewCode=0&data=%7B%22tags%22%3A%7B%22method%22%3A%22get_all_categories%22%2C%22param%22%3A%7B%22qq%22%3A%22%22%7D%2C%22module%22%3A%22playlist.PlaylistAllCategoriesServer%22%7D%7D");
		if (statusCode !== 200) throw new Error("tx getHotTag failed");
		return filterTagInfo$1(body.tags.data.v_group);
	};
	var filterInfoHotTag = (html) => {
		let hotTag = html.match(regExps$2.hotTagHtml);
		const hotTags = [];
		if (!hotTag) return hotTags;
		hotTag.forEach((tagHtml) => {
			let result = regExps$2.hotTag.exec(tagHtml);
			if (!result) return;
			hotTags.push({
				id: result[1],
				name: result[2]
			});
		});
		return hotTags;
	};
	var getHotTag$1 = async () => {
		const { body, statusCode } = await request("https://c.y.qq.com/node/pc/wk_v15/category_playlist.html");
		if (statusCode !== 200) throw new Error("tx getHotTag failed");
		return filterInfoHotTag(body);
	};
	var getTags$1 = async () => {
		const [tags, hotTags] = await Promise.all([getTag$1(), getHotTag$1()]);
		return {
			tags,
			hotTags
		};
	};
	var getListUrl = (sortId, id, page, limit) => {
		if (typeof id === "string") id = parseInt(id);
		return `https://u.y.qq.com/cgi-bin/musicu.fcg?loginUin=0&hostUin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=wk_v15.json&needNewCode=0&data=${encodeURIComponent(JSON.stringify({
			comm: {
				cv: 1602,
				ct: 20
			},
			playlist: {
				method: "get_category_content",
				param: {
					titleid: id,
					caller: "0",
					category_id: id,
					size: limit,
					page: page - 1,
					use_page: 1
				},
				module: "playlist.PlayListCategoryServer"
			}
		}))}`;
	};
	var filterList$1 = ({ content }) => {
		return {
			list: content.v_item.map(({ basic }) => ({
				play_count: formatPlayCount(basic.play_cnt),
				id: String(basic.tid),
				author: decodeName(basic.creator.nick),
				name: decodeName(basic.title),
				img: basic.cover.medium_url || basic.cover.default_url,
				desc: decodeName(basic.desc).replace(/<br>/g, "\n")
			})),
			total: content.total_cnt
		};
	};
	var getRecommendList = async (page, limit = pageInfo$2.limit_list) => {
		const { body } = await request(`https://u.y.qq.com/cgi-bin/musicu.fcg?loginUin=0&hostUin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=wk_v15.json&needNewCode=0&data=${encodeURIComponent(JSON.stringify({
			comm: {
				cv: 1602,
				ct: 20
			},
			playlist: {
				module: "music.playlist.PlaylistSquare",
				method: "GetRecommendWhole",
				param: {
					IsReqFeed: true,
					FeedReq: {
						From: (page - 1) * limit,
						Size: limit
					}
				}
			}
		}))}`);
		if (body.code !== pageInfo$2.successCode) throw new Error("tx getRecommendList failed");
		return {
			list: body.playlist.data.FeedRsp.List?.map(({ Playlist }) => ({
				play_count: formatPlayCount(Playlist.basic.play_cnt),
				id: String(Playlist.basic.tid),
				author: decodeName(Playlist.basic.creator.nick),
				name: decodeName(Playlist.basic.title),
				time: Playlist.basic.modify_time ? dateFormat(Playlist.basic.modify_time * 1e3, "Y-M-D") : "",
				img: Playlist.basic.cover.medium_url || Playlist.basic.cover.default_url,
				total: Playlist.basic.song_cnt,
				desc: decodeName(Playlist.basic.desc).replace(/<br>/g, "\n")
			})) || [],
			total: body.playlist.data.FeedRsp.FromLimit,
			limit,
			page
		};
	};
	var getList$4 = async (sortId, tagId, page, limit = pageInfo$2.limit_list) => {
		if (!tagId) {
			if (sortId == "-1") return getRecommendList(page, limit);
			tagId = sortId;
		}
		const { body } = await request(getListUrl(sortId, tagId, page, limit));
		if (body.code !== pageInfo$2.successCode) throw new Error("tx getList failed");
		return {
			...filterList$1(body.playlist.data),
			limit,
			page
		};
	};
	var handleParseId$1 = async (link) => {
		const { headers: { location }, statusCode } = await request(link, { maxRedirect: 0 });
		if (statusCode && statusCode > 400) throw new Error("link request failed");
		return location == null ? link : Array.isArray(location) ? location[0] : location;
	};
	var getListId$1 = async (id) => {
		if (/[?&:/]/.test(id)) {
			if (!regExps$2.listDetailLink.test(id)) id = await handleParseId$1(id);
			let result = regExps$2.listDetailLink.exec(id);
			if (!result) {
				result = regExps$2.listDetailLink2.exec(id);
				if (!result) throw new Error("failed");
			}
			id = result[1];
		}
		return id;
	};
	var getListDetail2 = async (id, page, limit = pageInfo$2.limit_song) => {
		const { body } = await request("https://u.y.qq.com/cgi-bin/musicu.fcg", {
			method: "POST",
			headers: {
				Origin: "https://y.qq.com",
				Referer: `https://y.qq.com/n/yqq/playsquare/${id}.html`
			},
			json: {
				comm: {
					cv: 4747474,
					ct: 24,
					format: "json",
					inCharset: "utf-8",
					outCharset: "utf-8",
					platform: "yqq.json",
					needNewCode: 1,
					uin: 0
				},
				req_1: {
					module: "music.srfDissInfo.aiDissInfo",
					method: "uniform_get_Dissinfo",
					param: {
						disstid: parseInt(id),
						userinfo: 1,
						tag: 1,
						orderlist: 1,
						song_begin: 0,
						song_num: pageInfo$2.limit_song,
						onlysonglist: 0,
						enc_host_uin: ""
					}
				}
			}
		});
		if (body.code !== pageInfo$2.successCode || body.req_1.code !== pageInfo$2.successCode) throw new Error("tx getListDetail failed");
		const result = body.req_1.data;
		const dirinfo = result.dirinfo;
		return {
			list: buildMusicList$1(result.songlist),
			page,
			limit,
			total: dirinfo.songnum,
			info: {
				name: dirinfo.title,
				img: dirinfo.picurl,
				desc: decodeName(dirinfo.desc ?? "").replace(/<br>/g, "\n"),
				author: dirinfo.host_nick,
				play_count: formatPlayCount(dirinfo.listennum)
			}
		};
	};
	var getListDetail$1 = async (id, page, limit = pageInfo$2.limit_song) => {
		id = await getListId$1(id);
		const { body } = await request(`https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg?type=1&json=1&utf8=1&onlysong=0&new_format=1&disstid=${id}&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0`, { headers: {
			Origin: "https://y.qq.com",
			Referer: `https://y.qq.com/n/yqq/playsquare/${id}.html`
		} });
		if (body.code !== pageInfo$2.successCode) throw new Error("tx getListDetail failed");
		if (body.subcode !== pageInfo$2.successCode) return getListDetail2(id, page, limit);
		const cdlist = body.cdlist[0];
		return {
			list: buildMusicList$1(cdlist.songlist),
			total: cdlist.songlist.length,
			limit: cdlist.songlist.length + 1,
			page,
			info: {
				name: decodeName(cdlist.dissname),
				img: cdlist.logo,
				desc: decodeName(cdlist.desc).replace(/<br>/g, "\n"),
				author: decodeName(cdlist.nickname),
				play_count: formatPlayCount(cdlist.visitnum)
			}
		};
	};
	var search$5 = async (text, page, limit = 20) => {
		const { body } = await request(`http://c.y.qq.com/soso/fcgi-bin/client_music_search_songlist?page_no=${page - 1}&num_per_page=${limit}&format=json&query=${encodeURIComponent(text)}&remoteplace=txt.yqq.playlist&inCharset=utf8&outCharset=utf-8`, { headers: { Referer: "http://y.qq.com/portal/search.html" } });
		if (body.code != 0) throw new Error("tx search failed");
		return {
			list: body.data.list.map((item) => {
				return {
					play_count: formatPlayCount(item.listennum),
					id: String(item.dissid),
					author: decodeName(item.creator.name),
					name: decodeName(item.dissname),
					time: dateFormat(item.createtime, "Y-M-D"),
					img: item.imgurl,
					total: item.song_count,
					desc: decodeName(decodeName(item.introduction)).replace(/<br>/g, "\n")
				};
			}),
			total: body.data.sum,
			limit,
			page
		};
	};
	//#endregion
	//#region src/onlineResource/tx/tipSearch.ts
	var search$4 = async (str) => {
		const { body, statusCode } = await request(`https://c.y.qq.com/splcloud/fcgi-bin/smartbox_new.fcg?is_xml=0&format=json&key=${encodeURIComponent(str)}&loginUin=0&hostUin=0&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0`, { headers: { Referer: "https://y.qq.com/portal/player.html" } });
		if (statusCode !== 200 || body.code !== 0) throw new Error("tx tipSearch failed");
		return (body.data?.song?.itemlist ?? []).map((item) => `${item.name ?? ""} ${item.singer ?? ""}`.trim());
	};
	//#endregion
	//#region src/onlineResource/tx/topSongs.ts
	var boardList$1 = [
		{
			id: "4",
			name: "流行指数榜",
			bangid: "4",
			pic: "http://y.gtimg.cn/music/photo_new/T003R300x300M000001qdESL0Utojf.jpg"
		},
		{
			id: "26",
			name: "热歌榜",
			bangid: "26",
			pic: "http://y.gtimg.cn/music/photo_new/T003R300x300M000002Sayej2GqCJH.jpg"
		},
		{
			id: "78",
			name: "国乐榜",
			bangid: "78",
			pic: "http://y.gtimg.cn/music/photo_new/T003R300x300M000002iwP0g3FpEfy.jpg"
		},
		{
			id: "27",
			name: "新歌榜",
			bangid: "27",
			pic: "http://y.gtimg.cn/music/photo_new/T003R300x300M000000cPzvb0QoYOJ.jpg"
		},
		{
			id: "62",
			name: "飙升榜",
			bangid: "62",
			pic: "http://y.gtimg.cn/music/photo_new/T003R300x300M000002qJVCm3Ooro8.jpg"
		},
		{
			id: "58",
			name: "说唱榜",
			bangid: "58",
			pic: "http://y.gtimg.cn/music/photo_new/T003R300x300M000001JVH724BvKc2.jpg"
		},
		{
			id: "57",
			name: "电音榜",
			bangid: "57",
			pic: "http://y.gtimg.cn/music/photo_new/T003R300x300M000003jJbYt0SxaHf.jpg"
		},
		{
			id: "28",
			name: "网络歌曲榜",
			bangid: "28",
			pic: "http://y.gtimg.cn/music/photo_new/T003R300x300M000002yBBlS3kfK5X.jpg"
		},
		{
			id: "5",
			name: "内地榜",
			bangid: "5",
			pic: "http://y.gtimg.cn/music/photo_new/T003R300x300M0000017ztgy40tyJI.jpg"
		},
		{
			id: "3",
			name: "欧美榜",
			bangid: "3",
			pic: "http://y.gtimg.cn/music/photo_new/T003R300x300M000003AifhE09cZ2R.jpg"
		},
		{
			id: "59",
			name: "香港地区榜",
			bangid: "59",
			pic: "http://y.gtimg.cn/music/photo_new/T003R300x300M000003eD1GJ0ALk5X.jpg"
		},
		{
			id: "16",
			name: "韩国榜",
			bangid: "16",
			pic: "http://y.gtimg.cn/music/photo_new/T003R300x300M000002XZzBK2MSSU8.jpg"
		},
		{
			id: "60",
			name: "抖音热歌榜",
			bangid: "60",
			pic: "http://y.gtimg.cn/music/photo_new/T003R300x300M000001hgsNv0QfAXv.jpg"
		},
		{
			id: "29",
			name: "影视金曲榜",
			bangid: "29",
			pic: "http://y.gtimg.cn/music/photo_new/T003R300x300M000002ga0xH0XStwr.jpg"
		},
		{
			id: "17",
			name: "日本榜",
			bangid: "17",
			pic: "http://y.gtimg.cn/music/photo_new/T003R300x300M0000031EFNo1HbDqq.jpg"
		},
		{
			id: "36",
			name: "K歌金曲榜",
			bangid: "36",
			pic: "http://y.gtimg.cn/music/photo_new/T003R300x300M0000012uqZu0dhyMv.jpg"
		},
		{
			id: "61",
			name: "台湾地区榜",
			bangid: "61",
			pic: "http://y.gtimg.cn/music/photo_new/T003R300x300M000001w6CKZ3eRVAa.jpg"
		},
		{
			id: "63",
			name: "DJ舞曲榜",
			bangid: "63",
			pic: "http://y.gtimg.cn/music/photo_new/T003R300x300M000002Nffh50T30L0.jpg"
		},
		{
			id: "64",
			name: "综艺新歌榜",
			bangid: "64",
			pic: "http://y.gtimg.cn/music/photo_new/T003R300x300M000002YaQ6b207Fl1.jpg"
		},
		{
			id: "65",
			name: "国风热歌榜",
			bangid: "65",
			pic: "http://y.gtimg.cn/music/photo_new/T003R300x300M000001QsCFf3pvEyg.jpg"
		},
		{
			id: "67",
			name: "听歌识曲榜",
			bangid: "67",
			pic: "http://y.gtimg.cn/music/photo_new/T003R300x300M000000xxHg32YGjMI.jpg"
		},
		{
			id: "72",
			name: "动漫音乐榜",
			bangid: "72",
			pic: "http://y.gtimg.cn/music/photo_new/T003R300x300M000000yKnVs4Bxbik.jpg"
		},
		{
			id: "73",
			name: "游戏音乐榜",
			bangid: "73",
			pic: "http://y.gtimg.cn/music/photo_new/T003R300x300M000001xs5992hUvcs.jpg"
		},
		{
			id: "75",
			name: "有声榜",
			bangid: "75",
			pic: "http://y.gtimg.cn/music/photo_new/T003R300x300M000001M59IU1bvwY1.jpg"
		}
	];
	var regExps$1 = {
		periodList: /<i class="play_cover__btn c_tx_link js_icon_play" data-listkey=".+?" data-listname=".+?" data-tid=".+?" data-date=".+?" .+?<\/i>/g,
		period: /data-listname="(.+?)" data-tid=".*?\/(.+?)" data-date="(.+?)" .+?<\/i>/
	};
	var filterBoardsData$1 = (rawList) => {
		const list = [];
		for (const board of rawList) {
			if (board.id === 201) continue;
			let title = board.topTitle;
			if (title.startsWith("巅峰榜·")) title = title.substring(4);
			if (!title.endsWith("榜")) title += "榜";
			list.push({
				id: String(board.id),
				name: title,
				pic: board.picUrl ?? ""
			});
		}
		return list;
	};
	var getBoards$1 = async () => {
		try {
			const response = await request("https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=json&uin=0&needNewCode=1&platform=h5");
			if (response.statusCode !== 200 || response.body.code !== 0 || !response.body.data?.topList) throw new Error("tx topSongs getBoards failed");
			return filterBoardsData$1(response.body.data.topList);
		} catch {
			return boardList$1;
		}
	};
	var getDates$1 = async (_id) => {
		return [];
	};
	var periodUrl = "https://c.y.qq.com/node/pc/wk_v15/top.html";
	var periodInfoMap = {};
	var getPeriods = async (bangid) => {
		const { body: html } = await request(periodUrl);
		const result = html.match(regExps$1.periodList);
		if (!result) throw new Error("tx topSongs getPeriods failed");
		result.forEach((item) => {
			const periodResult = regExps$1.period.exec(item);
			if (!periodResult) return;
			periodInfoMap[periodResult[2]] = {
				name: periodResult[1],
				bangid: periodResult[2],
				period: periodResult[3]
			};
		});
		return periodInfoMap[bangid]?.period;
	};
	var listDetailRequest = async (id, period, limit) => {
		return request("https://u.y.qq.com/cgi-bin/musicu.fcg", {
			method: "POST",
			json: {
				toplist: {
					module: "musicToplist.ToplistInfoServer",
					method: "GetDetail",
					param: {
						topid: id,
						num: limit,
						period
					}
				},
				comm: {
					uin: 0,
					format: "json",
					ct: 20,
					cv: 1859
				}
			}
		});
	};
	var getList$3 = async (id, date, page, limit = 300, retryNum = 0) => {
		if (++retryNum > 3) throw new Error("tx topSongs getList retry max num");
		const topidInt = parseInt(id);
		if (Number.isNaN(topidInt)) throw new Error("tx topSongs invalid id");
		const { body, statusCode } = await listDetailRequest(topidInt, date || periodInfoMap[id]?.period || await getPeriods(id), limit);
		if (statusCode !== 200 || body.code !== 0) return getList$3(id, date, page, limit, retryNum);
		const data = body.toplist?.data;
		const rawList = data?.songInfoList ?? [];
		const list = buildMusicList$1(rawList);
		const detail = data?.data;
		return {
			list,
			total: rawList.length,
			limit,
			page,
			info: {
				name: decodeName(detail?.title || ""),
				pic: detail?.frontPicUrl || "",
				desc: decodeName(detail?.intro || "").replace(/<br\s*\/?>/g, "\n"),
				date: detail?.updateTime || ""
			}
		};
	};
	//#endregion
	//#region src/onlineResource/tx/index.ts
	var tx = {
		musicSearch: search$6,
		getLyric: getLyric$1,
		getPic: getPic$1,
		songlistSearch: search$5,
		songlistDetail: getListDetail$1,
		songlistTags: getTags$1,
		songlistSorts: getSorts$1,
		songlist: getList$4,
		topSongs: getBoards$1,
		topSongsDate: getDates$1,
		topSongsDetail: getList$3,
		tipSearch: search$4,
		hotSearch: search$7,
		musicComment: musicComment$1
	};
	//#endregion
	//#region src/onlineResource/wy/utils/crypto.ts
	var iv = "0102030405060708";
	var presetKey = "0CoJUm6Qyw8W8jud";
	var linuxapiKey = "rFgB&h#%2?^eDg:Q";
	var publicKey = "-----BEGIN PUBLIC KEY-----\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDgtQn2JZ34ZC28NWYpAUd98iZ37BUrX/aKzmFbt7clFSs6sXqHauqKWqdtLkF2KexO40H1YTX8z2lSgBBOAxLsvaklV8k4cBFK9snQXE9/DDaFt6Rr7iVZMldczhC0JNgTz+SHXT6CBHuX3e9SdB1Ua44oncaTWz7OBGLbCiK45wIDAQAB\n-----END PUBLIC KEY-----";
	var eapiKey = "e82ckenh8dichen8";
	var aesEncrypt = async (data, mode, key, iv) => {
		return crypto.aesEncrypt(mode, data, key, iv);
	};
	var rsaEncrypt = async (buf, key) => {
		return crypto.rsaEncrypt("RSA_NO_PADDING", buf, key);
	};
	var weapi = async (object) => {
		const text = JSON.stringify(object);
		const secretKey = await dataConverter(String(Math.random()).substring(2, 18));
		return {
			params: await aesEncrypt(await aesEncrypt(text, "CBC_128_PKCS7Padding", presetKey, iv), "CBC_128_PKCS7Padding", secretKey, iv),
			encSecKey: await dataConverter(await rsaEncrypt(secretKey.reverse(), await dataConverter(publicKey)), "base64", "hex")
		};
	};
	var linuxapi = async (object) => {
		return { eparams: (await dataConverter(await aesEncrypt(JSON.stringify(object), "ECB_128_NoPadding", linuxapiKey, ""), "base64", "hex")).toUpperCase() };
	};
	var eapi = async (url, object) => {
		const text = typeof object === "object" ? JSON.stringify(object) : object;
		const message = `nobody${url}use${text}md5forencrypt`;
		return { params: (await dataConverter(await aesEncrypt(`${url}-36cd479b6b5-${text}-36cd479b6b5-${await crypto.md5(message)}`, "ECB_128_NoPadding", eapiKey, ""), "base64", "hex")).toUpperCase() };
	};
	//#endregion
	//#region src/onlineResource/wy/utils/index.ts
	var eapiRequest$1 = async (url, data, retryNum = 0) => {
		const resp = await request("http://interface.music.163.com/eapi/batch", {
			method: "POST",
			headers: {
				"User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36",
				referer: "https://music.163.com/",
				origin: "https://music.163.com"
			},
			form: await eapi(url, data)
		});
		if (typeof resp.body == "string") try {
			resp.body = JSON.parse(resp.body);
		} catch (error) {
			if (retryNum >= 3) throw error;
			return eapiRequest$1(url, data, retryNum + 1);
		}
		return resp;
	};
	var weapiRequest = async (url, data, retryNum = 0) => {
		const resp = await request(url, {
			method: "POST",
			headers: {
				"User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36",
				referer: "https://music.163.com/",
				origin: "https://music.163.com"
			},
			form: await weapi(data)
		});
		if (typeof resp.body == "string") try {
			resp.body = JSON.parse(resp.body);
		} catch (error) {
			if (retryNum >= 3) throw error;
			return weapiRequest(url, data, retryNum + 1);
		}
		return resp;
	};
	var linuxapiRequest = async (cookie, data, retryNum = 0) => {
		const resp = await request("https://music.163.com/api/linux/forward", {
			method: "POST",
			headers: {
				"User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36",
				Cookie: cookie
			},
			form: await linuxapi(data)
		});
		if (typeof resp.body == "string") try {
			resp.body = JSON.parse(resp.body);
		} catch (error) {
			if (retryNum >= 3) throw error;
			return linuxapiRequest(cookie, data, retryNum + 1);
		}
		return resp;
	};
	var buildMusicList = (rawList) => {
		if (!rawList) return [];
		return rawList.map((_item) => {
			const item = _item.baseInfo.simpleSongData;
			const types = {};
			let size;
			if (item.privilege.maxBrLevel == "hires") {
				size = item.hr ? sizeFormate(item.hr.size) : null;
				types.flac24bit = { sizeStr: size };
			}
			switch (item.privilege.maxbr) {
				case 999e3:
					size = item.sq ? sizeFormate(item.sq.size) : null;
					types.flac = { sizeStr: size };
				case 32e4:
					size = item.h ? sizeFormate(item.h.size) : null;
					types["320k"] = { sizeStr: size };
				case 192e3:
				case 128e3:
					size = item.l ? sizeFormate(item.l.size) : null;
					types["128k"] = { sizeStr: size };
			}
			if (item.al.picUrl) item.al.picUrl += `${item.al.picUrl.includes("?") ? "&" : "?"}param=500y500`;
			return {
				id: `wy_${String(item.id)}`,
				name: item.name,
				singer: formatSingerName(item.ar, "name"),
				interval: formatPlayTime(item.dt / 1e3),
				isLocal: false,
				meta: {
					albumName: item.al.name,
					source: "wy",
					musicId: String(item.id),
					picUrl: item.al.picUrl,
					qualitys: types,
					createTime: 0,
					posTime: 0,
					updateTime: 0,
					albumId: item.al.id
				}
			};
		});
	};
	var buildMusicList2 = ({ songs, privileges }) => {
		const list = [];
		songs.forEach((item, index) => {
			let privilege = privileges[index];
			if (privilege?.id !== item.id) privilege = privileges.find((current) => current.id === item.id);
			if (!privilege) return;
			let size;
			const qualitys = {};
			if (privilege.maxBrLevel == "hires") {
				size = item.hr ? sizeFormate(item.hr.size) : null;
				qualitys.flac24bit = { sizeStr: size };
			}
			switch (privilege.maxbr) {
				case 999e3:
					size = item.sq ? sizeFormate(item.sq.size) : null;
					qualitys.flac = { sizeStr: size };
				case 32e4:
					size = item.h ? sizeFormate(item.h.size) : null;
					qualitys["320k"] = { sizeStr: size };
				case 192e3:
				case 128e3:
					size = item.l ? sizeFormate(item.l.size) : null;
					qualitys["128k"] = { sizeStr: size };
			}
			if (item.al.picUrl) item.al.picUrl += `${item.al.picUrl.includes("?") ? "&" : "?"}param=500y500`;
			list.push({
				id: `wy_${String(item.id)}`,
				name: item.name,
				singer: formatSingerName(item.ar, "name"),
				interval: formatPlayTime(item.dt / 1e3),
				isLocal: false,
				meta: {
					albumName: item.al.name,
					source: "wy",
					musicId: String(item.id),
					picUrl: item.al.picUrl,
					qualitys,
					createTime: 0,
					posTime: 0,
					updateTime: 0,
					albumId: item.al.id
				}
			});
		});
		return list;
	};
	//#endregion
	//#region src/onlineResource/wy/hotSearch.ts
	var search$3 = async () => {
		const { body, statusCode } = await eapiRequest$1("/api/search/chart/detail", { id: "HOT_SEARCH_SONG#@#" });
		if (statusCode !== 200 || body.code !== 200) throw new Error("wy hotSearch failed");
		return (body.data?.itemList ?? []).map((item) => item.searchWord ?? "").filter(Boolean);
	};
	//#endregion
	//#region src/onlineResource/wy/lyric.ts
	var eapiRequest = async (url, data) => {
		const resp = await request("https://interface3.music.163.com/eapi/song/lyric/v1", {
			method: "POST",
			headers: {
				"User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36",
				origin: "https://music.163.com"
			},
			form: await eapi(url, data)
		});
		if (typeof resp.body == "string") resp.body = JSON.parse(resp.body);
		return resp;
	};
	var parseTools = {
		rxps: {
			info: /^{"/,
			lineTime: /^\[(\d+),\d+\]/,
			wordTime: /\(\d+,\d+,\d+\)/,
			wordTimeAll: /(\(\d+,\d+,\d+\))/g,
			timeMs2: /\[\d+:\d+\.\d{2}]/,
			timeMs3: /\[\d+:\d+\.\d{3}]/
		},
		msFormat(timeMs, pad3 = true) {
			if (Number.isNaN(timeMs)) return "";
			let ms = (timeMs % 1e3).toString().padStart(pad3 ? 3 : 2, "0");
			if (!pad3 && ms.length > 2) ms = ms.slice(0, 2);
			timeMs /= 1e3;
			const m = Math.trunc(timeMs / 60).toString().padStart(2, "0");
			timeMs %= 60;
			return `[${m}:${Math.trunc(timeMs).toString().padStart(2, "0")}.${ms}]`;
		},
		parseLyric(lines) {
			const lxlrcLines = [];
			const lrcLines = [];
			for (let line of lines) {
				line = line.trim();
				const result = this.rxps.lineTime.exec(line);
				if (!result) {
					if (line.startsWith("[offset")) {
						lxlrcLines.push(line);
						lrcLines.push(line);
					}
					continue;
				}
				const startMsTime = parseInt(result[1]);
				const startTimeStr = this.msFormat(startMsTime);
				if (!startTimeStr) continue;
				const words = line.replace(this.rxps.lineTime, "");
				lrcLines.push(`${startTimeStr}${words.replace(this.rxps.wordTimeAll, "")}`);
				const times = words.match(this.rxps.wordTimeAll);
				if (!times) continue;
				const formatTimes = times.map((time) => {
					const result = /\((\d+),(\d+),\d+\)/.exec(time);
					return `<${Math.trunc(Math.max(parseInt(result[1]) - startMsTime, 0))},${result[2]}>`;
				});
				const wordArr = words.split(this.rxps.wordTime);
				wordArr.shift();
				const newWords = formatTimes.map((time, index) => `${time}${wordArr[index]}`).join("");
				lxlrcLines.push(`${startTimeStr}${newWords}`);
			}
			return {
				lyric: lrcLines.join("\n"),
				awlyric: lxlrcLines.join("\n")
			};
		},
		parseHeaderInfo(str) {
			str = str.trim();
			str = str.replace(/\r/g, "");
			if (!str) return null;
			const isPad3 = this.rxps.timeMs3.test(str) || !this.rxps.timeMs2.test(str);
			return str.split("\n").map((line) => {
				if (!this.rxps.info.test(line)) return line;
				try {
					const info = JSON.parse(line);
					const timeTag = this.msFormat(info.t, isPad3);
					return timeTag ? `${timeTag}${info.c.map((t) => t.tx).join("")}` : "";
				} catch {
					return "";
				}
			});
		},
		getIntv(interval) {
			if (!interval) return 0;
			if (!interval.includes(".")) interval += ".0";
			const arr = interval.split(/:|\./);
			while (arr.length < 3) arr.unshift("0");
			const [m, s, ms] = arr;
			return parseInt(m) * 36e5 + parseInt(s) * 1e3 + parseInt(ms);
		},
		fixTimeTag(lrc, targetlrc) {
			let lrcLines = lrc.split("\n");
			const targetlrcLines = targetlrc.split("\n");
			const timeRxp = /^\[([\d:.]+)\]/;
			let temp = [];
			const newLrc = [];
			targetlrcLines.forEach((line) => {
				const result = timeRxp.exec(line);
				if (!result) return;
				if (!line.replace(timeRxp, "").trim()) return;
				const t1 = this.getIntv(result[1]);
				while (lrcLines.length) {
					const lrcLine = lrcLines.shift();
					const lrcLineResult = timeRxp.exec(lrcLine);
					if (!lrcLineResult) continue;
					const t2 = this.getIntv(lrcLineResult[1]);
					if (Math.abs(t1 - t2) < 100) {
						const lrc = line.replace(timeRxp, lrcLineResult[0]).trim();
						if (!lrc) continue;
						newLrc.push(lrc);
						break;
					}
					temp.push(lrcLine);
				}
				lrcLines = [...temp, ...lrcLines];
				temp = [];
			});
			return newLrc.join("\n");
		},
		parse(ylrc, ytlrc, yrlrc, lrc, tlrc, rlrc) {
			const info = {
				lyric: "",
				tlyric: "",
				rlyric: "",
				awlyric: ""
			};
			if (ylrc) {
				const lines = this.parseHeaderInfo(ylrc);
				if (lines) {
					const result = this.parseLyric(lines);
					if (ytlrc) {
						const lines = this.parseHeaderInfo(ytlrc);
						if (lines) info.tlyric = this.fixTimeTag(result.lyric, lines.join("\n"));
					}
					if (yrlrc) {
						const lines = this.parseHeaderInfo(yrlrc);
						if (lines) info.rlyric = this.fixTimeTag(result.lyric, lines.join("\n"));
					}
					const timeRxp = /^\[[\d:.]+\]/;
					info.lyric = `${lines.filter((l) => timeRxp.test(l)).join("\n")}\n${result.lyric}`;
					info.awlyric = result.awlyric;
					return info;
				}
			}
			if (lrc) {
				const lines = this.parseHeaderInfo(lrc);
				if (lines) info.lyric = lines.join("\n");
			}
			if (tlrc) {
				const lines = this.parseHeaderInfo(tlrc);
				if (lines) info.tlyric = lines.join("\n");
			}
			if (rlrc) {
				const lines = this.parseHeaderInfo(rlrc);
				if (lines) info.rlyric = lines.join("\n");
			}
			return info;
		}
	};
	var fixTimeLabel = (lrc, tlrc, romalrc) => {
		if (lrc) {
			const newLrc = lrc.replace(/\[(\d{2}:\d{2}):(\d{2})]/g, "[$1.$2]");
			const newTlrc = tlrc?.replace(/\[(\d{2}:\d{2}):(\d{2})]/g, "[$1.$2]") ?? tlrc;
			if (newLrc != lrc || newTlrc != tlrc) {
				lrc = newLrc;
				tlrc = newTlrc;
				romalrc &&= romalrc.replace(/\[(\d{2}:\d{2}):(\d{2,3})]/g, "[$1.$2]").replace(/\[(\d{2}:\d{2}\.\d{2})0]/g, "[$1]");
			}
		}
		return {
			lrc,
			tlrc,
			romalrc
		};
	};
	var getLyric = async ({ meta }) => {
		const { body } = await eapiRequest("/api/song/lyric/v1", {
			id: meta.musicId,
			cp: false,
			tv: 0,
			lv: 0,
			rv: 0,
			kv: 0,
			yv: 0,
			ytv: 0,
			yrv: 0
		});
		if (body.code !== 200 || !body?.lrc?.lyric) return Promise.reject(/* @__PURE__ */ new Error("Get lyric failed"));
		const fixTimeLabelLrc = fixTimeLabel(body.lrc.lyric, body.tlyric?.lyric, body.romalrc?.lyric);
		const info = parseTools.parse(body.yrc?.lyric, body.ytlrc?.lyric, body.yromalrc?.lyric, fixTimeLabelLrc.lrc, fixTimeLabelLrc.tlrc, fixTimeLabelLrc.romalrc);
		if (!info.lyric) return Promise.reject(/* @__PURE__ */ new Error("Get lyric failed"));
		console.log("wy lyric:", meta.musicId);
		return info;
	};
	//#endregion
	//#region src/onlineResource/wy/musicComment.ts
	var emojis = [
		["大笑", "😃"],
		["可爱", "😊"],
		["憨笑", "☺️"],
		["色", "😍"],
		["亲亲", "😙"],
		["惊恐", "😱"],
		["流泪", "😭"],
		["亲", "😚"],
		["呆", "😳"],
		["哀伤", "😔"],
		["呲牙", "😁"],
		["吐舌", "😝"],
		["撇嘴", "😒"],
		["怒", "😡"],
		["奸笑", "😏"],
		["汗", "😓"],
		["痛苦", "😖"],
		["惶恐", "😰"],
		["生病", "😨"],
		["口罩", "😷"],
		["大哭", "😂"],
		["晕", "😵"],
		["发怒", "👿"],
		["开心", "😄"],
		["鬼脸", "😜"],
		["皱眉", "😞"],
		["流感", "😢"],
		["爱心", "❤️"],
		["心碎", "💔"],
		["钟情", "💘"],
		["星星", "⭐️"],
		["生气", "💢"],
		["便便", "💩"],
		["强", "👍"],
		["弱", "👎"],
		["拜", "🙏"],
		["牵手", "👫"],
		["跳舞", "👯‍♀️"],
		["禁止", "🙅‍♀️"],
		["这边", "💁‍♀️"],
		["爱意", "💏"],
		["示爱", "👩‍❤️‍👨"],
		["嘴唇", "👄"],
		["狗", "🐶"],
		["猫", "🐱"],
		["猪", "🐷"],
		["兔子", "🐰"],
		["小鸡", "🐤"],
		["公鸡", "🐔"],
		["幽灵", "👻"],
		["圣诞", "🎅"],
		["外星", "👽"],
		["钻石", "💎"],
		["礼物", "🎁"],
		["男孩", "👦"],
		["女孩", "👧"],
		["蛋糕", "🎂"],
		["18", "🔞"],
		["圈", "⭕"],
		["叉", "❌"]
	];
	var applyEmoji = (text) => {
		for (const e of emojis) text = text.replaceAll(`[${e[0]}]`, e[1]);
		return text;
	};
	var cursorCache = {};
	var cursorTools = {
		getCursor(id, page, limit) {
			let cacheData = cursorCache[id];
			cacheData ||= {};
			cursorCache[id] = cacheData;
			let orderType;
			let cursor;
			let offset;
			if (page === 1) {
				const now = Date.now();
				cacheData.page = 1;
				cacheData.cursor = now;
				cacheData.prevCursor = now;
				cursor = now;
				orderType = 1;
				offset = 0;
			} else if (cacheData.page) {
				cursor = cacheData.cursor;
				if (page > cacheData.page) {
					orderType = 1;
					offset = (page - cacheData.page - 1) * limit;
				} else if (page < cacheData.page) {
					orderType = 0;
					offset = (cacheData.page - page - 1) * limit;
				} else {
					cacheData.cursor = cacheData.prevCursor;
					cursor = cacheData.prevCursor;
					offset = cacheData.offset;
					orderType = cacheData.orderType;
				}
			}
			return {
				orderType,
				cursor,
				offset
			};
		},
		setCursor(id, cursor, orderType, offset, page) {
			let cacheData = cursorCache[id];
			cacheData ||= {};
			cursorCache[id] = cacheData;
			cacheData.prevCursor = cacheData.cursor;
			cacheData.cursor = cursor;
			cacheData.orderType = orderType;
			cacheData.offset = offset;
			cacheData.page = page;
		}
	};
	var getSongId = (musicInfo) => {
		const { meta } = musicInfo;
		if (typeof meta.musicId === "string" || typeof meta.musicId === "number") return String(meta.musicId);
		return musicInfo.id;
	};
	var formatReplyComment = (item) => {
		const data = {
			id: String(item.commentId),
			text: item.content ? applyEmoji(item.content) : "",
			time: item.time || void 0,
			location: item.ipLocation?.location,
			userName: item.user.nickname,
			avatar: item.user.avatarUrl,
			userId: String(item.user.userId),
			likedCount: item.likedCount,
			reply: []
		};
		const replyData = item.beReplied?.[0];
		return replyData ? {
			id: String(item.commentId),
			text: replyData.content ? applyEmoji(replyData.content) : "",
			time: item.time || void 0,
			location: replyData.ipLocation?.location,
			userName: replyData.user.nickname,
			avatar: replyData.user.avatarUrl,
			userId: String(replyData.user.userId),
			likedCount: void 0,
			reply: [data]
		} : data;
	};
	var filterComment = (rawList) => {
		return rawList.map((item) => formatReplyComment(item));
	};
	var filterHotComment = (rawList) => {
		return rawList.map((item) => ({
			id: String(item.commentId),
			text: item.content ? applyEmoji(item.content) : "",
			time: item.time || void 0,
			location: item.ipLocation?.location,
			userName: item.user.nickname,
			avatar: item.user.avatarUrl,
			userId: String(item.user.userId),
			likedCount: item.likedCount,
			reply: []
		}));
	};
	var getComment = async (musicInfo, page = 1, limit = 20) => {
		const songId = getSongId(musicInfo);
		const id = `R_SO_4_${songId}`;
		const cursorInfo = cursorTools.getCursor(songId, page, limit);
		const { body, statusCode } = await weapiRequest("https://music.163.com/weapi/comment/resource/comments/get", {
			cursor: cursorInfo.cursor,
			offset: cursorInfo.offset,
			orderType: cursorInfo.orderType,
			pageNo: page,
			pageSize: limit,
			rid: id,
			threadId: id
		});
		if (statusCode !== 200 || body.code !== 200) throw new Error("wy getComment failed");
		cursorTools.setCursor(songId, body.data.cursor, cursorInfo.orderType, cursorInfo.offset, page);
		return {
			list: filterComment(body.data.comments),
			total: body.data.totalCount,
			page,
			limit
		};
	};
	var getHotComment = async (musicInfo, page = 1, limit = 100) => {
		const id = `R_SO_4_${getSongId(musicInfo)}`;
		const hotPage = page - 1;
		const { body, statusCode } = await weapiRequest(`https://music.163.com/weapi/v1/resource/hotcomments/${id}`, {
			rid: id,
			limit,
			offset: limit * hotPage,
			beforeTime: Date.now().toString()
		});
		if (statusCode !== 200 || body.code !== 200) throw new Error("wy getHotComment failed");
		return {
			list: filterHotComment(body.hotComments),
			total: body.total ?? 0,
			page,
			limit
		};
	};
	var musicComment = async (options) => {
		const { musicInfo, type, page, limit } = options;
		switch (type) {
			case "new": return getComment(musicInfo, page, limit);
			case "hot": return getHotComment(musicInfo, page, limit);
			case "reply":
				if (!options.id) throw new Error("id is required for reply type");
				throw new Error("reply comment is not supported yet");
		}
		throw new Error("Invalid comment type");
	};
	//#endregion
	//#region src/onlineResource/wy/musicSearch.ts
	var pageInfo$1 = {
		limit: 30,
		total: 0,
		page: 0,
		allPage: 1
	};
	var musicSearch = async (str, page, limit) => {
		const { body } = await eapiRequest$1("/api/search/song/list/page", {
			keyword: str,
			needCorrect: "1",
			channel: "typing",
			offset: limit * (page - 1),
			scene: "normal",
			total: page == 1,
			limit
		});
		return body;
	};
	var search$2 = async (str, page = 1, limit) => {
		limit ??= pageInfo$1.limit;
		return musicSearch(str, page, limit).then((result) => {
			if (result?.code !== 200) throw new Error("search error");
			const list = buildMusicList(result.data.resources || []);
			if (list == null) throw new Error("search error");
			pageInfo$1.total = result.data.totalCount || 0;
			pageInfo$1.page = page;
			pageInfo$1.allPage = Math.ceil(pageInfo$1.total / pageInfo$1.limit);
			return {
				list,
				limit,
				total: pageInfo$1.total,
				page: pageInfo$1.page
			};
		});
	};
	//#endregion
	//#region src/onlineResource/wy/musicDetail.ts
	var getList$2 = async (ids = []) => {
		const requestIds = ids.map((id) => Number(id)).filter((id) => Number.isFinite(id));
		const { body, statusCode } = await weapiRequest("https://music.163.com/weapi/v3/song/detail", {
			c: `[${requestIds.map((id) => `{"id":${id}}`).join(",")}]`,
			ids: `[${requestIds.join(",")}]`
		});
		if (statusCode !== 200 || body.code !== 200) throw new Error("wy musicDetail failed");
		return buildMusicList2(body);
	};
	//#endregion
	//#region src/onlineResource/wy/pic.ts
	var getPic = async (music) => {
		let pic = (await getList$2([music.id]))[0].meta.picUrl;
		if (pic) pic += `${pic.includes("?") ? "&" : "?"}param=500y500`;
		console.log("wy pic:", pic);
		return pic;
	};
	//#endregion
	//#region src/onlineResource/wy/songlist.ts
	var pageInfo = {
		limit_list: 30,
		limit_song: 1e5,
		successCode: 200,
		cookie: "MUSIC_U=",
		sortList: [{
			label: "hot",
			name: "最热",
			id: "hot"
		}]
	};
	var regExps = {
		listDetailLink: /^.+(?:\?|&)id=(\d+)(?:&.*$|#.*$|$)/,
		listDetailLink2: /^.+\/playlist\/(\d+)\/\d+\/.+$/
	};
	var getSorts = async () => {
		return pageInfo.sortList.map((item) => ({
			id: String(item.id),
			name: `{songlist.sort.${item.label}}`
		}));
	};
	var filterList = (rawData) => {
		return rawData.map((item) => ({
			play_count: formatPlayCount(item.playCount),
			id: String(item.id),
			author: item.creator.nickname,
			name: item.name,
			time: item.createTime ? dateFormat(item.createTime, "Y-M-D") : "",
			img: item.coverImgUrl,
			total: item.trackCount,
			desc: item.description ?? ""
		}));
	};
	var filterTagInfo = ({ sub, categories }) => {
		const subList = {};
		for (const item of sub) {
			subList[item.category] ||= [];
			subList[item.category].push({
				id: item.name,
				name: item.name
			});
		}
		const list = [];
		for (const key of Object.keys(categories)) list.push({
			name: categories[key],
			list: subList[key]
		});
		return list;
	};
	var filterHotTagInfo = (rawList) => {
		return rawList.map((item) => ({
			id: item.playlistTag.name,
			name: item.playlistTag.name
		}));
	};
	var getTag = async () => {
		const { body, statusCode } = await weapiRequest("https://music.163.com/weapi/playlist/catalogue", {});
		if (statusCode !== 200 || body.code !== pageInfo.successCode) throw new Error("wy songlistTags failed");
		return filterTagInfo(body);
	};
	var getHotTag = async () => {
		const { body, statusCode } = await weapiRequest("https://music.163.com/weapi/playlist/hottags", {});
		if (statusCode !== 200 || body.code !== pageInfo.successCode) throw new Error("wy songlistTags failed");
		return filterHotTagInfo(body.tags);
	};
	var getTags = async () => {
		const [tags, hotTags] = await Promise.all([getTag(), getHotTag()]);
		return {
			tags,
			hotTags
		};
	};
	var getList$1 = async (sortId, tagId, page, limit = pageInfo.limit_list) => {
		const { body, statusCode } = await weapiRequest("https://music.163.com/weapi/playlist/list", {
			cat: tagId || "全部",
			order: sortId,
			limit,
			offset: limit * (page - 1),
			total: true
		});
		if (statusCode !== 200 || body.code !== pageInfo.successCode) throw new Error("wy songlist failed");
		return {
			list: filterList(body.playlists),
			total: Number(body.total),
			page,
			limit
		};
	};
	var handleParseId = async (link) => {
		const { headers: { location }, statusCode } = await request(link, { maxRedirect: 0 });
		if (statusCode && statusCode > 400) throw new Error("link request failed");
		const url = location == null ? link : Array.isArray(location) ? location[0] : location;
		return regExps.listDetailLink.test(url) ? url.replace(regExps.listDetailLink, "$1") : url.replace(regExps.listDetailLink2, "$1");
	};
	var getListId = async (id) => {
		let cookie;
		if (id.includes("###")) {
			const [url, token] = id.split("###");
			id = url;
			cookie = `MUSIC_U=${token}`;
		}
		if (/[?&:/]/.test(id)) {
			if (regExps.listDetailLink.test(id)) id = id.replace(regExps.listDetailLink, "$1");
			else if (regExps.listDetailLink2.test(id)) id = id.replace(regExps.listDetailLink2, "$1");
			else id = await handleParseId(id);
		}
		return {
			id,
			cookie
		};
	};
	var getListDetail = async (rawId, page, limit = pageInfo.limit_song) => {
		const { id, cookie } = await getListId(rawId);
		const { body, statusCode } = await linuxapiRequest(cookie || pageInfo.cookie, {
			method: "POST",
			url: "https://music.163.com/api/v3/playlist/detail",
			params: {
				id,
				n: limit,
				s: 8
			}
		});
		if (statusCode !== 200 || body.code !== pageInfo.successCode) throw new Error("wy songlistDetail failed");
		const listLimit = 1e3;
		const rangeStart = (page - 1) * listLimit;
		let list;
		if (body.playlist.trackIds.length === body.privileges.length) list = buildMusicList2({
			songs: body.playlist.tracks,
			privileges: body.privileges
		});
		else list = await getList$2(body.playlist.trackIds.slice(rangeStart, listLimit * page).map((trackId) => trackId.id));
		return {
			list,
			page,
			limit: listLimit,
			total: body.playlist.trackIds.length,
			info: {
				play_count: formatPlayCount(body.playlist.playCount),
				name: body.playlist.name,
				img: body.playlist.coverImgUrl,
				desc: body.playlist.description,
				author: body.playlist.creator.nickname
			}
		};
	};
	var search$1 = async (text, page, limit = 20) => {
		const { body, statusCode } = await eapiRequest$1("/api/cloudsearch/pc", {
			s: text,
			type: 1e3,
			limit,
			total: page === 1,
			offset: limit * (page - 1)
		});
		if (statusCode !== 200 || body.code !== pageInfo.successCode) throw new Error("wy songlistSearch failed");
		return {
			list: filterList(body.result.playlists),
			limit,
			total: body.result.playlistCount,
			page
		};
	};
	//#endregion
	//#region src/onlineResource/wy/tipSearch.ts
	var search = async (str) => {
		const { body, statusCode } = await weapiRequest("https://music.163.com/weapi/search/suggest/web", { s: str });
		if (statusCode !== 200 || body.code !== 200) throw new Error("wy tipSearch failed");
		return (body.result?.songs ?? []).map((item) => `${item.name ?? ""} ${formatSingerName(item.artists ?? [], "name")}`.trim());
	};
	//#endregion
	//#region src/onlineResource/wy/topSongs.ts
	var boardList = [
		{
			id: "19723756",
			name: "飙升榜",
			bangid: "19723756",
			pic: "https://p1.music.126.net/rIi7Qzy2i2Y_1QD7cd0MYA==/109951170048506929.jpg"
		},
		{
			id: "3779629",
			name: "新歌榜",
			bangid: "3779629",
			pic: "https://p1.music.126.net/5guhqPBTcIrrhLBotgaT6w==/109951170048511751.jpg"
		},
		{
			id: "2884035",
			name: "原创榜",
			bangid: "2884035",
			pic: "https://p1.music.126.net/BaP9nrocNTL3gGThysv4eQ==/109951170091896587.jpg"
		},
		{
			id: "3778678",
			name: "热歌榜",
			bangid: "3778678",
			pic: "https://p1.music.126.net/0SUEG8yDACfx0Bw2MYFv4Q==/109951170048519512.jpg"
		},
		{
			id: "991319590",
			name: "网易云中文说唱榜",
			bangid: "991319590",
			pic: "https://p1.music.126.net/GgHbgDfGXHpE2YTchU7IvA==/109951171510498108.jpg"
		},
		{
			id: "71384707",
			name: "网易云古典榜",
			bangid: "71384707",
			pic: "https://p1.music.126.net/urByD_AmfBDBrs7fA9-O8A==/109951167976973225.jpg"
		},
		{
			id: "1978921795",
			name: "网易云电音榜",
			bangid: "1978921795",
			pic: "https://p1.music.126.net/hXGObvXfsGtFjFvRhOYAkA==/109951170091888741.jpg"
		},
		{
			id: "14028249541",
			name: "网易云全球说唱榜",
			bangid: "14028249541",
			pic: "https://p1.music.126.net/0hhFjP6WyIjHYDXKW5E7BA==/109951171535150782.jpg"
		},
		{
			id: "13372522766",
			name: "潮流风向榜",
			bangid: "13372522766",
			pic: "https://p1.music.126.net/dIKA5e7jCncz2Br1Toxgaw==/109951170621574552.jpg"
		},
		{
			id: "12911403728",
			name: "音乐合伙人推荐榜",
			bangid: "12911403728",
			pic: "https://p1.music.126.net/s6ITpmGjKbyDpi7DPkqd2w==/109951170187827373.jpg"
		},
		{
			id: "12911589513",
			name: "音乐合伙人热歌榜",
			bangid: "12911589513",
			pic: "https://p1.music.126.net/RgYxQmB-ZUjkMRo2N1jWnQ==/109951170187823494.jpg"
		},
		{
			id: "12911619970",
			name: "音乐合伙人留名榜",
			bangid: "12911619970",
			pic: "https://p1.music.126.net/aJJzGIxhkVaD7dX0XBNUnw==/109951170187831145.jpg"
		},
		{
			id: "12911379734",
			name: "音乐合伙人高分新歌榜",
			bangid: "12911379734",
			pic: "https://p1.music.126.net/bfk15bvanhdPFU7yjPFgWA==/109951170187832038.jpg"
		},
		{
			id: "12768855486",
			name: "音乐合伙人高分榜",
			bangid: "12768855486",
			pic: "https://p1.music.126.net/fPP5T0Z8Ac15qNvRTcHa6g==/109951170074028970.jpg"
		},
		{
			id: "5453912201",
			name: "黑胶VIP爱听榜",
			bangid: "5453912201",
			pic: "https://p1.music.126.net/qo6-o9n5AhMjNyejev38-A==/109951169743111905.jpg"
		},
		{
			id: "71385702",
			name: "网易云ACG榜",
			bangid: "71385702",
			pic: "https://p1.music.126.net/na1kEeCS1iZEkzOrs9r_9g==/109951167976973667.jpg"
		},
		{
			id: "745956260",
			name: "网易云韩语榜",
			bangid: "745956260",
			pic: "https://p1.music.126.net/5oN9YaFznwNGXkmi8i2Ytw==/109951167430864741.jpg"
		},
		{
			id: "180106",
			name: "UK排行榜周榜",
			bangid: "180106",
			pic: "https://p1.music.126.net/fhAqiflLy3eU-ldmBQByrg==/109951165613082765.jpg"
		},
		{
			id: "60198",
			name: "美国Billboard榜",
			bangid: "60198",
			pic: "https://p1.music.126.net/rwRsVIJHQ68gglhA6TNEYA==/109951165611413732.jpg"
		},
		{
			id: "3812895",
			name: "Beatport全球电子舞曲榜",
			bangid: "3812895",
			pic: "https://p1.music.126.net/oT-RHuPBJiD7WMoU7WG5Rw==/109951166093489621.jpg"
		},
		{
			id: "21845217",
			name: "KTV唛榜",
			bangid: "21845217",
			pic: "https://p1.music.126.net/5wDP78s43ydVTKt62C8OjQ==/109951165613100063.jpg"
		},
		{
			id: "60131",
			name: "日本Oricon榜",
			bangid: "60131",
			pic: "https://p1.music.126.net/aXUPgImt8hhf4cMUZEjP4g==/109951165611417794.jpg"
		},
		{
			id: "2809513713",
			name: "网易云欧美热歌榜",
			bangid: "2809513713",
			pic: "https://p1.music.126.net/70_EO_Dc7NT_hhfvsapzcQ==/109951167430862162.jpg"
		},
		{
			id: "2809577409",
			name: "网易云欧美新歌榜",
			bangid: "2809577409",
			pic: "https://p1.music.126.net/0lPWpI9Ejn1OiW2LSbg-qw==/109951167430863224.jpg"
		},
		{
			id: "27135204",
			name: "法国 NRJ Vos Hits 周榜",
			bangid: "27135204",
			pic: "https://p2.music.126.net/-fyzrPWd06FfWl_0JDAxMQ==/109951165613108584.jpg"
		},
		{
			id: "3001835560",
			name: "网易云ACG动画榜",
			bangid: "3001835560",
			pic: "https://p2.music.126.net/SkGlKQ6acixthb77VlD9eQ==/109951164432300406.jpg"
		},
		{
			id: "3001795926",
			name: "网易云ACG游戏榜",
			bangid: "3001795926",
			pic: "https://p2.music.126.net/hivOOHMwEmnn9s_6rgZwEQ==/109951164432303700.jpg"
		},
		{
			id: "3001890046",
			name: "网易云ACG\xA0VOCALOID榜",
			bangid: "3001890046",
			pic: "https://p2.music.126.net/Ag7RyRCYiINcd9EtRXf6xA==/109951164432303690.jpg"
		},
		{
			id: "5059644681",
			name: "网易云日语榜",
			bangid: "5059644681",
			pic: "https://p2.music.126.net/YFBFNI2F-4BveUpv6FKFuw==/109951167430864069.jpg"
		},
		{
			id: "5059633707",
			name: "网易云摇滚榜",
			bangid: "5059633707",
			pic: "https://p2.music.126.net/LjkX2hktgFD1NXc3W6w0sA==/109951170048522513.jpg"
		},
		{
			id: "5059642708",
			name: "网易云国风榜",
			bangid: "5059642708",
			pic: "https://p2.music.126.net/kTJC5OBhg8I477X_ZmXyDQ==/109951168539740982.jpg"
		},
		{
			id: "5338990334",
			name: "潜力爆款榜",
			bangid: "5338990334",
			pic: "https://p2.music.126.net/Mi4QPklg1mtbWAfq74tEqQ==/109951165498334721.jpg"
		},
		{
			id: "5059661515",
			name: "网易云民谣榜",
			bangid: "5059661515",
			pic: "https://p2.music.126.net/Xe9qLTAqtBAWX_hPgFHMyw==/109951170048510929.jpg"
		},
		{
			id: "6688069460",
			name: "听歌识曲榜",
			bangid: "6688069460",
			pic: "https://p2.music.126.net/wJVUAiUuykKk7yGbQxDBug==/109951167430857712.jpg"
		},
		{
			id: "6723173524",
			name: "网络热歌榜",
			bangid: "6723173524",
			pic: "https://p2.music.126.net/_kSxOPqQ5J5etC5DKTFwNA==/109951170048519530.jpg"
		},
		{
			id: "6732051320",
			name: "俄语榜",
			bangid: "6732051320",
			pic: "https://p2.music.126.net/HbJ0BK5doY4I4pEMY6-FQw==/109951167430852698.jpg"
		},
		{
			id: "6732014811",
			name: "越南语榜",
			bangid: "6732014811",
			pic: "https://p2.music.126.net/N-Y5maLGWgrowt3TE6RtSg==/109951167430857045.jpg"
		},
		{
			id: "6886768100",
			name: "中文慢摇DJ榜",
			bangid: "6886768100",
			pic: "https://p2.music.126.net/w_01BfDU012ojxnzLO6tYw==/109951167977358686.jpg"
		},
		{
			id: "6939992364",
			name: "俄罗斯top hit流行音乐榜",
			bangid: "6939992364",
			pic: "https://p2.music.126.net/KLVO8PxVZzOoLdWQQNyprA==/109951166327316568.jpg"
		},
		{
			id: "7095271308",
			name: "泰语榜",
			bangid: "7095271308",
			pic: "https://p2.music.126.net/4W0WBHBgwYlYfRniuyL47A==/109951167430843284.jpg"
		},
		{
			id: "7356827205",
			name: "BEAT排行榜",
			bangid: "7356827205",
			pic: "https://p2.music.126.net/yhzlQJCJ9NcT4MvJBG_HgQ==/109951167977014958.jpg"
		},
		{
			id: "7325478166",
			name: "星云榜VOL.31 翁杰新专来袭，愿我们拥有广阔的天地！",
			bangid: "7325478166",
			pic: "https://p2.music.126.net/m9HWYdcz9xH-7SSito3-3A==/109951172864859483.jpg"
		},
		{
			id: "7603212484",
			name: "LOOK直播歌曲榜",
			bangid: "7603212484",
			pic: "https://p2.music.126.net/u-RQC-LyY0aoeseRumJ14A==/109951167977730469.jpg"
		},
		{
			id: "7775163417",
			name: "赏音榜",
			bangid: "7775163417",
			pic: "https://p2.music.126.net/m9hQzC-d5wefBipedNPaHg==/109951168178601971.jpg"
		},
		{
			id: "7785123708",
			name: "黑胶VIP新歌榜",
			bangid: "7785123708",
			pic: "https://p2.music.126.net/vjitpkT9nXBCth6tvdDMWg==/109951169743115266.jpg"
		},
		{
			id: "7785066739",
			name: "黑胶VIP热歌榜",
			bangid: "7785066739",
			pic: "https://p2.music.126.net/Ay3mLgQ9weG_c8JjYrD-Bw==/109951169743106495.jpg"
		},
		{
			id: "7785091694",
			name: "黑胶VIP爱搜榜",
			bangid: "7785091694",
			pic: "https://p2.music.126.net/R7DtZqNraesnsiaIKvzTHA==/109951169743112799.jpg"
		},
		{
			id: "8246775932",
			name: "实时热度榜",
			bangid: "8246775932",
			pic: "https://p2.music.126.net/U7ZbdpWzRdmZVr6Khn_4ag==/109951168673982478.jpg"
		},
		{
			id: "8537588450",
			name: "喜力®星电音派对潮音榜",
			bangid: "8537588450",
			pic: "https://p2.music.126.net/HVu2hGYvzN5XBuvFc_4Bgg==/109951168730309120.jpg"
		},
		{
			id: "8661209031",
			name: "乐夏榜",
			bangid: "8661209031",
			pic: "https://p2.music.126.net/RlStCmE97y0xYFk7rS3Zww==/109951168864907822.jpg"
		},
		{
			id: "8703179781",
			name: "特斯拉车友爱听榜",
			bangid: "8703179781",
			pic: "https://p2.music.126.net/UL8dhobSa3TR6Wd1JmWe_g==/109951168924385363.jpg"
		},
		{
			id: "8703052295",
			name: "理想车友爱听榜",
			bangid: "8703052295",
			pic: "https://p2.music.126.net/U--PWdWupY1ER5cVSjr1jQ==/109951168928365496.jpg"
		},
		{
			id: "8702582160",
			name: "比亚迪车友爱听榜",
			bangid: "8702582160",
			pic: "https://p2.music.126.net/S1OG-OLTaofa3HfrHW48kA==/109951168924393585.jpg"
		},
		{
			id: "8703220480",
			name: "蔚来车友爱听榜",
			bangid: "8703220480",
			pic: "https://p2.music.126.net/r9kBQNsOro1EAB82Ol51WQ==/109951168924380971.jpg"
		},
		{
			id: "8702982391",
			name: "极氪车友爱听榜",
			bangid: "8702982391",
			pic: "https://p2.music.126.net/Cu0RXoKewSPM9Gyc7Cp8jw==/109951168924391596.jpg"
		},
		{
			id: "8532443277",
			name: "蛋仔派对听歌榜",
			bangid: "8532443277",
			pic: "https://p2.music.126.net/TMb0be5QLMZKOFeuOKT4tg==/109951168717283910.jpg"
		},
		{
			id: "9651277674",
			name: "AI歌曲榜",
			bangid: "9651277674",
			pic: "https://p2.music.126.net/M0m6GeZ1Y8Osz9jqxaW8Wg==/109951169462048035.jpg"
		},
		{
			id: "10131772880",
			name: "昊铂车友爱听榜",
			bangid: "10131772880",
			pic: "https://p2.music.126.net/EL7H4rkKejZY7Uv54EFNXg==/109951169655010112.jpg"
		},
		{
			id: "10162841534",
			name: "埃安车友爱听榜",
			bangid: "10162841534",
			pic: "https://p2.music.126.net/FcP1U6Bck0wPKqd0XgBwSQ==/109951169679731241.jpg"
		},
		{
			id: "12225155968",
			name: "欧美R&B榜",
			bangid: "12225155968",
			pic: "https://p2.music.126.net/0E6MzYzyA5uvQ4CSoIG2mw==/109951169739660034.jpg"
		},
		{
			id: "12344472377",
			name: "黑胶VIP限免榜",
			bangid: "12344472377",
			pic: "https://p2.music.126.net/WXCSf4ZNcDCdOTY5ixm3Bg==/109951169809318325.jpg"
		},
		{
			id: "12717025277",
			name: "吉利车友爱听榜",
			bangid: "12717025277",
			pic: "https://p2.music.126.net/XVmZb3JSyrwMgqu9WVz61A==/109951170037568570.jpg"
		}
	];
	var filterBoardsData = (rawList) => {
		return rawList.map((board) => ({
			id: String(board.id),
			name: board.name,
			pic: board.coverImgUrl
		}));
	};
	var getBoards = async () => {
		try {
			const response = await weapiRequest("https://music.163.com/weapi/toplist", {});
			if (response.statusCode !== 200 || response.body.code !== 200 || !response.body.list) throw new Error("wy topSongs getBoards failed");
			return filterBoardsData(response.body.list);
		} catch {
			return boardList;
		}
	};
	var getDates = async (_id) => {
		return [];
	};
	var getList = async (id, date, page, limit = 1e5) => {
		const { body, statusCode } = await weapiRequest("https://music.163.com/weapi/v3/playlist/detail", {
			id,
			n: 1e5,
			p: 1
		});
		if (statusCode !== 200 || body.code !== 200) throw new Error("wy topSongs getList failed");
		return {
			list: buildMusicList2({
				songs: body.playlist.tracks,
				privileges: body.privileges
			}),
			total: body.playlist.trackCount,
			limit,
			page,
			info: {
				name: body.playlist.name ?? "",
				pic: body.playlist.coverImgUrl ?? "",
				desc: body.playlist.description ?? "",
				date: dateFormat(body.playlist.updateTime, "Y-M-D")
			}
		};
	};
	//#endregion
	//#region src/onlineResource/sources.ts
	var sources = {
		kw,
		tx,
		wy: {
			musicSearch: search$2,
			getLyric,
			getPic,
			songlistSearch: search$1,
			songlistDetail: getListDetail,
			songlistTags: getTags,
			songlistSorts: getSorts,
			songlist: getList$1,
			topSongs: getBoards,
			topSongsDate: getDates,
			topSongsDetail: getList,
			musicComment,
			tipSearch: search,
			hotSearch: search$3
		},
		kg,
		mg
	};
	//#endregion
	//#region src/onlineResource/index.ts
	var initOnlineResource = () => {
		registerResourceAction({
			async musicSearch(params) {
				const musics = await sources[params.source].musicSearch(`${params.name} ${params.artist || ""} ${params.albumName || ""}`.trim(), params.page, params.limit);
				return {
					limit: musics.limit,
					list: deduplicationList(musics.list),
					page: musics.page,
					total: musics.total
				};
			},
			async musicPic(params) {
				const pic = await sources[params.source].getPic(params.musicInfo);
				if (!pic) throw new Error(t("onlineResource.picNotFound"));
				return pic;
			},
			async musicLyric(params) {
				const lyric = await sources[params.source].getLyric(params.musicInfo).catch((e) => {
					console.error(e);
					throw e;
				});
				return {
					name: params.musicInfo.name,
					singer: params.musicInfo.singer,
					interval: params.musicInfo.interval,
					lyric: lyric.lyric,
					tlyric: lyric.tlyric,
					awlyric: lyric.awlyric,
					rlyric: lyric.rlyric
				};
			},
			async songlistSearch(params) {
				const s = sources[params.source];
				if ("songlistSearch" in s) {
					const songlist = await s.songlistSearch(params.keyword, params.page, params.limit);
					return {
						limit: songlist.limit,
						list: songlist.list,
						page: songlist.page,
						total: songlist.total
					};
				}
				throw new Error(`songlistSearch not implemented for source ${params.source}`);
			},
			async songlistDetail(params) {
				const s = sources[params.source];
				if ("songlistDetail" in s) {
					const songlist = await s.songlistDetail(params.id, params.page, params.limit);
					return {
						limit: songlist.limit,
						list: songlist.list,
						page: songlist.page,
						total: songlist.total,
						info: songlist.info
					};
				}
				throw new Error(`songlistDetail not implemented for source ${params.source}`);
			},
			async songlistTags(params) {
				const s = sources[params.source];
				if ("songlistTags" in s) return s.songlistTags();
				throw new Error(`songlistTags not implemented for source ${params.source}`);
			},
			async songlistSorts(params) {
				const s = sources[params.source];
				if ("songlistSorts" in s) return s.songlistSorts();
				throw new Error(`songlistSorts not implemented for source ${params.source}`);
			},
			async songlist(params) {
				const s = sources[params.source];
				if ("songlist" in s) {
					const songlist = await s.songlist(params.sort, params.tag, params.page);
					return {
						limit: songlist.limit,
						list: songlist.list,
						page: songlist.page,
						total: songlist.total
					};
				}
				throw new Error(`songlist not implemented for source ${params.source}`);
			},
			async topSongs(params) {
				const s = sources[params.source];
				if ("topSongs" in s) return s.topSongs();
				throw new Error(`topSongs not implemented for source ${params.source}`);
			},
			async topSongsDate(params) {
				const s = sources[params.source];
				if ("topSongsDate" in s) return s.topSongsDate(params.id);
				throw new Error(`topSongsDate not implemented for source ${params.source}`);
			},
			async topSongsDetail(params) {
				const s = sources[params.source];
				if ("topSongsDetail" in s) {
					const songlist = await s.topSongsDetail(params.id, params.date, params.page, params.limit);
					return {
						limit: songlist.limit,
						list: songlist.list,
						page: songlist.page,
						total: songlist.total,
						info: songlist.info
					};
				}
				throw new Error(`topSongsDetail not implemented for source ${params.source}`);
			},
			async tipSearch(params) {
				const s = sources[params.source];
				if ("tipSearch" in s) return s.tipSearch(params.keyword);
				throw new Error(`tipSearch not implemented for source ${params.source}`);
			},
			async hotSearch(params) {
				const s = sources[params.source];
				if ("hotSearch" in s) return s.hotSearch();
				throw new Error(`hotSearch not implemented for source ${params.source}`);
			},
			async musicComment(params) {
				const s = sources[params.source];
				if ("musicComment" in s) {
					const comment = await s.musicComment(params);
					return {
						limit: comment.limit,
						list: comment.list,
						page: comment.page,
						total: comment.total
					};
				}
				throw new Error(`musicComment not implemented for source ${params.source}`);
			}
		});
	};
	//#endregion
	//#region src/index.ts
	initOnlineResource();
	//#endregion
})();
