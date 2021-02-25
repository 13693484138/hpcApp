/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"app": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "assets/js/" + ({"BrandDetails":"BrandDetails"}[chunkId]||chunkId) + ".js"
/******/ 	}
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 							error.name = 'ChunkLoadError';
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/app-h5/";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"chunk-vendors"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./mock/index.js":
/*!***********************!*\
  !*** ./mock/index.js ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.for-each */ \"./node_modules/core-js/modules/es.array.for-each.js\");\n/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.object.to-string */ \"./node_modules/core-js/modules/es.object.to-string.js\");\n/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each */ \"./node_modules/core-js/modules/web.dom-collections.for-each.js\");\n/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator */ \"./node_modules/core-js/modules/web.dom-collections.iterator.js\");\n/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var mockjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! mockjs */ \"./node_modules/mockjs/dist/mock.js\");\n/* harmony import */ var mockjs__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(mockjs__WEBPACK_IMPORTED_MODULE_4__);\n\n\n\n\n// 引入 Mock\n // 自动化导入模拟api\n\nvar files = __webpack_require__(\"./mock/modules sync \\\\.js$\");\n\nfiles.keys().forEach(function (key) {\n  var file = files(key).default || files(key);\n  file.forEach(function (item) {\n    mockjs__WEBPACK_IMPORTED_MODULE_4___default.a.mock(item.url, item.type, item.response);\n  });\n});\n\n//# sourceURL=webpack:///./mock/index.js?");

/***/ }),

/***/ "./mock/modules sync \\.js$":
/*!**********************************************!*\
  !*** ./mock/modules sync nonrecursive \.js$ ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var map = {\n\t\"./user.js\": \"./mock/modules/user.js\"\n};\n\n\nfunction webpackContext(req) {\n\tvar id = webpackContextResolve(req);\n\treturn __webpack_require__(id);\n}\nfunction webpackContextResolve(req) {\n\tif(!__webpack_require__.o(map, req)) {\n\t\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\t\te.code = 'MODULE_NOT_FOUND';\n\t\tthrow e;\n\t}\n\treturn map[req];\n}\nwebpackContext.keys = function webpackContextKeys() {\n\treturn Object.keys(map);\n};\nwebpackContext.resolve = webpackContextResolve;\nmodule.exports = webpackContext;\nwebpackContext.id = \"./mock/modules sync \\\\.js$\";\n\n//# sourceURL=webpack:///./mock/modules_sync_nonrecursive_\\.js$?");

/***/ }),

/***/ "./mock/modules/user.js":
/*!******************************!*\
  !*** ./mock/modules/user.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ([{\n  url: '/user/login',\n  type: 'post',\n  response: {\n    code: 200,\n    msg: 'success',\n    data: {\n      token: 'ASFJSOHFSJHAJJGJASJJKG556456ASGSADGSGDKGJKSJAKG'\n    }\n  }\n}, {\n  url: '/user/info',\n  type: 'get',\n  response: {\n    code: 200,\n    msg: 'success',\n    data: {\n      id: 154,\n      name: '张三',\n      age: 22\n    }\n  }\n}]);\n\n//# sourceURL=webpack:///./mock/modules/user.js?");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"27ada11c-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=template&id=7ba5bd90&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"27ada11c-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/App.vue?vue&type=template&id=7ba5bd90& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\"div\", { attrs: { id: \"app\" } }, [_c(\"router-view\")], 1)\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///./src/App.vue?./node_modules/cache-loader/dist/cjs.js?%7B%22cacheDirectory%22:%22node_modules/.cache/vue-loader%22,%22cacheIdentifier%22:%2227ada11c-vue-loader-template%22%7D!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./src/assets/css/reset.css":
/*!**********************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-3-1!./node_modules/postcss-loader/src??ref--6-oneOf-3-2!./src/assets/css/reset.css ***!
  \**********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Imports\nvar ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\nexports = ___CSS_LOADER_API_IMPORT___(false);\n// Module\nexports.push([module.i, \"/* \\nReset Stylesheet\\n*/\\nhtml {\\n  font-family: -apple-system, Helvetica, sans-serif;\\n  height: 100%;\\n}\\nhtml,\\nbody,\\ndiv,\\nspan,\\nobject,\\niframe,\\nh1,\\nh2,\\nh3,\\nh4,\\nh5,\\nh6,\\np,\\nblockquote,\\npre,\\nabbr,\\naddress,\\ncite,\\ncode,\\ndel,\\ndfn,\\nem,\\nimg,\\nins,\\nkbd,\\nq,\\nsamp,\\nsmall,\\nstrong,\\nsub,\\nsup,\\nvar,\\nb,\\ni,\\ndl,\\ndt,\\ndd,\\nol,\\nul,\\nli,\\nfieldset,\\nform,\\nlabel,\\nlegend,\\ntable,\\ncaption,\\ntbody,\\ntfoot,\\nthead,\\ntr,\\nth,\\ntd,\\narticle,\\naside,\\ncanvas,\\ndetails,\\nfigcaption,\\nfigure,\\nfooter,\\nheader,\\nhgroup,\\nmenu,\\nnav,\\nsection,\\nsummary,\\ntime,\\nmark,\\naudio,\\nvideo {\\n  margin: 0;\\n  padding: 0;\\n  border: 0;\\n  outline: 0;\\n  font-size: 100%;\\n  vertical-align: baseline;\\n  background: transparent;\\n  box-sizing: border-box;\\n}\\nbody {\\n  line-height: 1;\\n}\\n\\n:focus {\\n  outline: 1;\\n}\\n\\narticle,\\naside,\\ncanvas,\\ndetails,\\nfigcaption,\\nfigure,\\nfooter,\\nheader,\\nhgroup,\\nmenu,\\nnav,\\nsection,\\nsummary {\\n  display: block;\\n}\\n\\nul {\\n  list-style: none;\\n}\\n\\nblockquote,\\nq {\\n  quotes: none;\\n}\\n\\nblockquote:before,\\nblockquote:after,\\nq:before,\\nq:after {\\n  content: '';\\n  content: none;\\n}\\n\\na {\\n  margin: 0;\\n  padding: 0;\\n  border: 0;\\n  font-size: 100%;\\n  vertical-align: baseline;\\n  background: transparent;\\n}\\n\\nins {\\n  background-color: #ff9;\\n  color: #000;\\n  text-decoration: none;\\n}\\n\\nmark {\\n  background-color: #ff9;\\n  color: #000;\\n  font-style: italic;\\n  font-weight: bold;\\n}\\n\\ndel {\\n  text-decoration: line-through;\\n}\\n\\nabbr[title],\\ndfn[title] {\\n  border-bottom: 1px dotted #000;\\n  cursor: help;\\n}\\n\\ntable {\\n  border-collapse: collapse;\\n  border-spacing: 0;\\n}\\n\\nhr {\\n  display: block;\\n  height: 1px;\\n  border: 0;\\n  border-top: 1px solid #cccccc;\\n  margin: 1em 0;\\n  padding: 0;\\n}\\n\\ninput,\\nselect {\\n  vertical-align: middle;\\n}\\n\", \"\"]);\n// Exports\nmodule.exports = exports;\n\n\n//# sourceURL=webpack:///./src/assets/css/reset.css?./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-3-1!./node_modules/postcss-loader/src??ref--6-oneOf-3-2");

/***/ }),

/***/ "./src/App.vue":
/*!*********************!*\
  !*** ./src/App.vue ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _App_vue_vue_type_template_id_7ba5bd90___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App.vue?vue&type=template&id=7ba5bd90& */ \"./src/App.vue?vue&type=template&id=7ba5bd90&\");\n/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n\nvar script = {}\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(\n  script,\n  _App_vue_vue_type_template_id_7ba5bd90___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _App_vue_vue_type_template_id_7ba5bd90___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"src/App.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./src/App.vue?");

/***/ }),

/***/ "./src/App.vue?vue&type=template&id=7ba5bd90&":
/*!****************************************************!*\
  !*** ./src/App.vue?vue&type=template&id=7ba5bd90& ***!
  \****************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_27ada11c_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_template_id_7ba5bd90___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"27ada11c-vue-loader-template\"}!../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../node_modules/cache-loader/dist/cjs.js??ref--0-0!../node_modules/vue-loader/lib??vue-loader-options!./App.vue?vue&type=template&id=7ba5bd90& */ \"./node_modules/cache-loader/dist/cjs.js?{\\\"cacheDirectory\\\":\\\"node_modules/.cache/vue-loader\\\",\\\"cacheIdentifier\\\":\\\"27ada11c-vue-loader-template\\\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=template&id=7ba5bd90&\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_27ada11c_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_template_id_7ba5bd90___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_27ada11c_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_template_id_7ba5bd90___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./src/App.vue?");

/***/ }),

/***/ "./src/api/activity/index.js":
/*!***********************************!*\
  !*** ./src/api/activity/index.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils_request__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/utils/request */ \"./src/utils/request.js\");\n\nvar activityServe = '/marketing';\nvar activity = {\n  // 获取货架精选list\n  getRecommendList: function getRecommendList(data) {\n    return Object(_utils_request__WEBPACK_IMPORTED_MODULE_0__[\"request\"])({\n      url: activityServe + '/api/app/ver1_0/active/getProductByActiveType',\n      method: 'post',\n      data: data\n    });\n  }\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (activity);\n\n//# sourceURL=webpack:///./src/api/activity/index.js?");

/***/ }),

/***/ "./src/api/index.js":
/*!**************************!*\
  !*** ./src/api/index.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _order_orderDetail__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./order/orderDetail */ \"./src/api/order/orderDetail.js\");\n/* harmony import */ var _activity_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./activity/index */ \"./src/api/activity/index.js\");\n/* harmony import */ var _wxserve_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./wxserve/index */ \"./src/api/wxserve/index.js\");\n/* harmony import */ var _userMembers_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./userMembers/index */ \"./src/api/userMembers/index.js\");\n\n\n\n\nvar modules = {\n  orderDetail: _order_orderDetail__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n  activity: _activity_index__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  wxApi: _wxserve_index__WEBPACK_IMPORTED_MODULE_2__[\"default\"],\n  userMembers: _userMembers_index__WEBPACK_IMPORTED_MODULE_3__[\"default\"]\n}; // 在modules 中写模块 在模块中写方法\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (modules);\n\n//# sourceURL=webpack:///./src/api/index.js?");

/***/ }),

/***/ "./src/api/order/orderDetail.js":
/*!**************************************!*\
  !*** ./src/api/order/orderDetail.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils_request__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/utils/request */ \"./src/utils/request.js\");\n\nvar orderServe = '/order';\nvar pay = \"/pay\";\nvar logisticsServe = '/logistics';\nvar orderDetail = {\n  // 获取订单详情\n  getOrderDetail: function getOrderDetail(data) {\n    return Object(_utils_request__WEBPACK_IMPORTED_MODULE_0__[\"request\"])({\n      url: orderServe + '/api/app/ver1_0/order/queryOrderDetail',\n      method: 'post',\n      data: data\n    });\n  },\n  //  获取物流信息\n  getLogistics: function getLogistics(data) {\n    return Object(_utils_request__WEBPACK_IMPORTED_MODULE_0__[\"request\"])({\n      url: logisticsServe + '/api/app/ver1_0/logisticsInfo/queryExpressCodeByOrderProductId',\n      method: 'post',\n      data: data\n    });\n  },\n  //订单支付\n  getOrderPayment: function getOrderPayment(data) {\n    return Object(_utils_request__WEBPACK_IMPORTED_MODULE_0__[\"request\"])({\n      url: pay + '/api/app/ver1_0/gateway/pay',\n      method: 'post',\n      data: data\n    });\n  }\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (orderDetail);\n\n//# sourceURL=webpack:///./src/api/order/orderDetail.js?");

/***/ }),

/***/ "./src/api/userMembers/index.js":
/*!**************************************!*\
  !*** ./src/api/userMembers/index.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils_request__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/utils/request */ \"./src/utils/request.js\");\n\nvar member = \"/member-wx\";\nvar memberServe = {\n  // 会员注册登录获取短信验证码\n  getMeberSendSMS: function getMeberSendSMS(data) {\n    return Object(_utils_request__WEBPACK_IMPORTED_MODULE_0__[\"request\"])({\n      url: member + \"/v1/userMembers/sendSMS\",\n      method: \"post\",\n      data: data\n    });\n  },\n  //会员登录or注册\n  smsLoginOrRegister: function smsLoginOrRegister(data) {\n    return Object(_utils_request__WEBPACK_IMPORTED_MODULE_0__[\"request\"])({\n      url: member + \"/v1/userMembers/bindMobile\",\n      method: \"post\",\n      data: data\n    });\n  },\n  //查询会员信息\n  getMemberByUnionId: function getMemberByUnionId(data) {\n    return Object(_utils_request__WEBPACK_IMPORTED_MODULE_0__[\"request\"])({\n      url: member + \"/v1/userMembers/getMemberByUnionId\",\n      method: \"post\",\n      data: data\n    });\n  },\n  //购买付费年卡\n  purchaseCard: function purchaseCard(data) {\n    return Object(_utils_request__WEBPACK_IMPORTED_MODULE_0__[\"request\"])({\n      url: member + \"/v1/userMemberCardPurchases/purchaseCard\",\n      method: \"post\",\n      data: data\n    });\n  },\n  //APP通过TOKEN查询会员\n  getMemberByToken: function getMemberByToken(data) {\n    return Object(_utils_request__WEBPACK_IMPORTED_MODULE_0__[\"request\"])({\n      url: member + \"/v1/userMembers/getMemberByToken\",\n      method: \"post\",\n      data: data\n    });\n  }\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (memberServe);\n\n//# sourceURL=webpack:///./src/api/userMembers/index.js?");

/***/ }),

/***/ "./src/api/wxserve/index.js":
/*!**********************************!*\
  !*** ./src/api/wxserve/index.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils_request__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/utils/request */ \"./src/utils/request.js\");\n\nvar wxApi = {\n  // 获取js微信签名\n  getWxsignature: function getWxsignature(data) {\n    return Object(_utils_request__WEBPACK_IMPORTED_MODULE_0__[\"request\"])({\n      url: '/thirdauth/wx/v1/wxauth/getWechatSignature',\n      method: 'post',\n      data: data\n    });\n  }\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (wxApi);\n\n//# sourceURL=webpack:///./src/api/wxserve/index.js?");

/***/ }),

/***/ "./src/assets/css/reset.css":
/*!**********************************!*\
  !*** ./src/assets/css/reset.css ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// style-loader: Adds some css to the DOM by adding a <style> tag\n\n// load the styles\nvar content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-3-1!../../../node_modules/postcss-loader/src??ref--6-oneOf-3-2!./reset.css */ \"./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./src/assets/css/reset.css\");\nif(typeof content === 'string') content = [[module.i, content, '']];\nif(content.locals) module.exports = content.locals;\n// add the styles to the DOM\nvar add = __webpack_require__(/*! ../../../node_modules/vue-style-loader/lib/addStylesClient.js */ \"./node_modules/vue-style-loader/lib/addStylesClient.js\").default\nvar update = add(\"248e41ad\", content, false, {\"sourceMap\":false,\"shadowMode\":false});\n// Hot Module Replacement\nif(false) {}\n\n//# sourceURL=webpack:///./src/assets/css/reset.css?");

/***/ }),

/***/ "./src/assets/js/rem.js":
/*!******************************!*\
  !*** ./src/assets/js/rem.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("(function flexible(window, document) {\n  var docEl = document.documentElement;\n  var dpr = window.devicePixelRatio || 1; // adjust body font size\n\n  function setBodyFontSize() {\n    if (document.body) {\n      document.body.style.fontSize = 12 * dpr + 'px';\n    } else {\n      document.addEventListener('DOMContentLoaded', setBodyFontSize);\n    }\n  }\n\n  setBodyFontSize(); // set 1rem = viewWidth / 10\n\n  function setRemUnit() {\n    var rem = docEl.clientWidth / 10;\n    docEl.style.fontSize = rem + 'px';\n  }\n\n  setRemUnit(); // reset rem unit on page resize\n\n  window.addEventListener('resize', setRemUnit);\n  window.addEventListener('pageshow', function (e) {\n    if (e.persisted) {\n      setRemUnit();\n    }\n  }); // detect 0.5px supports\n\n  if (dpr >= 2) {\n    var fakeBody = document.createElement('body');\n    var testElement = document.createElement('div');\n    testElement.style.border = '.5px solid transparent';\n    fakeBody.appendChild(testElement);\n    docEl.appendChild(fakeBody);\n\n    if (testElement.offsetHeight === 1) {\n      docEl.classList.add('hairlines');\n    }\n\n    docEl.removeChild(fakeBody);\n  }\n})(window, document);\n\n//# sourceURL=webpack:///./src/assets/js/rem.js?");

/***/ }),

/***/ "./src/icons/index.js":
/*!****************************!*\
  !*** ./src/icons/index.js ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var core_js_modules_es_array_map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.map */ \"./node_modules/core-js/modules/es.array.map.js\");\n/* harmony import */ var core_js_modules_es_array_map__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_map__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.object.to-string */ \"./node_modules/core-js/modules/es.object.to-string.js\");\n/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator */ \"./node_modules/core-js/modules/web.dom-collections.iterator.js\");\n/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vue */ \"vue\");\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n // import SvgIcon from '@/components/SvgIcon'// svg component\n// register globally\n// Vue.component('svg-icon', SvgIcon)\n\nvar req = __webpack_require__(\"./src/icons/svg sync \\\\.svg$\");\n\nvar requireAll = function requireAll(requireContext) {\n  return requireContext.keys().map(requireContext);\n};\n\nrequireAll(req);\n\n//# sourceURL=webpack:///./src/icons/index.js?");

/***/ }),

/***/ "./src/icons/svg sync \\.svg$":
/*!************************************************!*\
  !*** ./src/icons/svg sync nonrecursive \.svg$ ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var map = {\n\t\"./404.svg\": \"./src/icons/svg/404.svg\"\n};\n\n\nfunction webpackContext(req) {\n\tvar id = webpackContextResolve(req);\n\treturn __webpack_require__(id);\n}\nfunction webpackContextResolve(req) {\n\tif(!__webpack_require__.o(map, req)) {\n\t\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\t\te.code = 'MODULE_NOT_FOUND';\n\t\tthrow e;\n\t}\n\treturn map[req];\n}\nwebpackContext.keys = function webpackContextKeys() {\n\treturn Object.keys(map);\n};\nwebpackContext.resolve = webpackContextResolve;\nmodule.exports = webpackContext;\nwebpackContext.id = \"./src/icons/svg sync \\\\.svg$\";\n\n//# sourceURL=webpack:///./src/icons/svg_sync_nonrecursive_\\.svg$?");

/***/ }),

/***/ "./src/icons/svg/404.svg":
/*!*******************************!*\
  !*** ./src/icons/svg/404.svg ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/svg-baker-runtime/browser-symbol.js */ \"./node_modules/svg-baker-runtime/browser-symbol.js\");\n/* harmony import */ var _node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/svg-sprite-loader/runtime/browser-sprite.build.js */ \"./node_modules/svg-sprite-loader/runtime/browser-sprite.build.js\");\n/* harmony import */ var _node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1__);\n\n\nvar symbol = new _node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0___default.a({\n  \"id\": \"icon-404\",\n  \"use\": \"icon-404-usage\",\n  \"viewBox\": \"0 0 1024 1024\",\n  \"content\": \"<symbol class=\\\"icon\\\" viewBox=\\\"0 0 1024 1024\\\" xmlns=\\\"http://www.w3.org/2000/svg\\\" id=\\\"icon-404\\\"><defs><style>@font-face{font-family:rbicon;src:url(chrome-extension://dipiagiiohfljcicegpgffpbnjmgjcnf/fonts/rbicon.woff2) format(\\\"woff2\\\");font-weight:400;font-style:normal}</style></defs><path d=\\\"M931.6 585.6v79c28.6-60.2 44.8-127.4 44.8-198.4C976.4 211 769.4 4 514.2 4S52 211 52 466.2c0 3.2.2 6.4.2 9.6l166-206h96.4L171.8 485.6h46.4v-54.8l99.2-154.6V668h-99.2v-82.4H67.6c43 161 170.6 287.4 332.4 328.6-10.4 26.2-40.6 89.4-90.8 100.6-62.2 14 168.8 3.4 333.6-104.6C769.4 873.6 873.6 784.4 930.2 668h-97.6v-82.4H666.4V476l166.2-206.2h94L786.2 485.6h46.4v-59l99.2-154v313zM366.2 608c-4.8-11.2-7.2-23.2-7.2-36V357.6c0-12.8 2.4-24.8 7.2-36 4.8-11.2 11.4-21 19.6-29.2 8.2-8.2 18-14.8 29.2-19.6 11.2-4.8 23.2-7.2 36-7.2h81.6c12.8 0 24.8 2.4 36 7.2 11 4.8 20.6 11.2 28.8 19.2l-88.6 129.4v-23c0-4.8-1.6-8.8-4.8-12-3.2-3.2-7.2-4.8-12-4.8s-8.8 1.6-12 4.8c-3.2 3.2-4.8 7.2-4.8 12v72L372.6 620c-2.4-3.8-4.6-7.8-6.4-12zm258.2-36c0 12.8-2.4 24.8-7.2 36-4.8 11.2-11.4 21-19.6 29.2-8.2 8.2-18 14.8-29.2 19.6-11.2 4.8-23.2 7.2-36 7.2h-81.6c-12.8 0-24.8-2.4-36-7.2-11.2-4.8-21-11.4-29.2-19.6-3.6-3.6-7-7.8-10-12l99.2-144.6v50.6c0 4.8 1.6 8.8 4.8 12 3.2 3.2 7.2 4.8 12 4.8s8.8-1.6 12-4.8c3.2-3.2 4.8-7.2 4.8-12v-99.6L601 296.4c6.6 7.4 12 15.8 16 25.2 4.8 11.2 7.2 23.2 7.2 36V572z\\\" /></symbol>\"\n});\nvar result = _node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1___default.a.add(symbol);\n/* harmony default export */ __webpack_exports__[\"default\"] = (symbol);\n\n//# sourceURL=webpack:///./src/icons/svg/404.svg?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var C_Users_liume_Desktop_new_app_node_modules_core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/core-js/modules/es.array.iterator.js */ \"./node_modules/core-js/modules/es.array.iterator.js\");\n/* harmony import */ var C_Users_liume_Desktop_new_app_node_modules_core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(C_Users_liume_Desktop_new_app_node_modules_core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var C_Users_liume_Desktop_new_app_node_modules_core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/core-js/modules/es.promise.js */ \"./node_modules/core-js/modules/es.promise.js\");\n/* harmony import */ var C_Users_liume_Desktop_new_app_node_modules_core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(C_Users_liume_Desktop_new_app_node_modules_core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var C_Users_liume_Desktop_new_app_node_modules_core_js_modules_es_object_assign_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/core-js/modules/es.object.assign.js */ \"./node_modules/core-js/modules/es.object.assign.js\");\n/* harmony import */ var C_Users_liume_Desktop_new_app_node_modules_core_js_modules_es_object_assign_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(C_Users_liume_Desktop_new_app_node_modules_core_js_modules_es_object_assign_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_liume_Desktop_new_app_node_modules_core_js_modules_es_promise_finally_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/core-js/modules/es.promise.finally.js */ \"./node_modules/core-js/modules/es.promise.finally.js\");\n/* harmony import */ var C_Users_liume_Desktop_new_app_node_modules_core_js_modules_es_promise_finally_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(C_Users_liume_Desktop_new_app_node_modules_core_js_modules_es_promise_finally_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vue */ \"vue\");\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./router */ \"./src/router/index.js\");\n/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./store */ \"./src/store/index.js\");\n/* harmony import */ var _App_vue__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./App.vue */ \"./src/App.vue\");\n/* harmony import */ var _utils_global__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./utils/global */ \"./src/utils/global.js\");\n/* harmony import */ var vant_lib_index_css__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! vant/lib/index.css */ \"./node_modules/vant/lib/index.css\");\n/* harmony import */ var vant_lib_index_css__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(vant_lib_index_css__WEBPACK_IMPORTED_MODULE_9__);\n/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./icons */ \"./src/icons/index.js\");\n/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./api */ \"./src/api/index.js\");\n\n\n\n\n// import Vue from 'vue'\n\n\n\n // import store from './store'\n\n // 导入vant css\n\n // 路由权限拦截\n// import './utils/permission'\n// 初始化svg雪碧图\n\n // // vant 常用组件全局注册\n// import { Button, Row, Col, Toast } from 'vant'\n// Vue.use(Button)\n//   .use(Row)\n//   .use(Col)\n//   .use(Toast)\n// // 注册自定义全局组件\n// import './utils/components'\n\n\nvue__WEBPACK_IMPORTED_MODULE_4___default.a.prototype.$api = _api__WEBPACK_IMPORTED_MODULE_11__[\"default\"];\n\nif (Object({\"NODE_ENV\":\"development\",\"VUE_APP_API_PREFIX\":\"https://api-dev.hpcang.com\",\"VUE_APP_MODE_NAME\":\"默认开发模式\",\"VUE_APP_PAGE_PREFIX\":\"https://h5.hpcang.com/new-dev\",\"BASE_URL\":\"/app-h5/\"}).VUE_APP_MODE == \"mock\") {\n  // 开发模式启动mock\n  console.log(\"开发模式启动mock\");\n\n  __webpack_require__(/*! ../mock */ \"./mock/index.js\");\n} // 打印当前运行模式\n\n\nconsole.log(\"当前运行模式为:\", Object({\"NODE_ENV\":\"development\",\"VUE_APP_API_PREFIX\":\"https://api-dev.hpcang.com\",\"VUE_APP_MODE_NAME\":\"默认开发模式\",\"VUE_APP_PAGE_PREFIX\":\"https://h5.hpcang.com/new-dev\",\"BASE_URL\":\"/app-h5/\"}));\nvue__WEBPACK_IMPORTED_MODULE_4___default.a.config.productionTip = false;\nnew vue__WEBPACK_IMPORTED_MODULE_4___default.a({\n  router: _router__WEBPACK_IMPORTED_MODULE_5__[\"default\"],\n  store: _store__WEBPACK_IMPORTED_MODULE_6__[\"default\"],\n  render: function render(h) {\n    return h(_App_vue__WEBPACK_IMPORTED_MODULE_7__[\"default\"]);\n  }\n}).$mount(\"#app\");\n\n//# sourceURL=webpack:///./src/main.js?");

/***/ }),

/***/ "./src/plugins/vant.js":
/*!*****************************!*\
  !*** ./src/plugins/vant.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var vant_es_lazyload_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vant/es/lazyload/style */ \"./node_modules/vant/es/lazyload/style/index.js\");\n/* harmony import */ var vant_es_lazyload__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vant/es/lazyload */ \"./node_modules/vant/es/lazyload/index.js\");\n/* harmony import */ var vant_es_overlay_style__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vant/es/overlay/style */ \"./node_modules/vant/es/overlay/style/index.js\");\n/* harmony import */ var vant_es_overlay__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vant/es/overlay */ \"./node_modules/vant/es/overlay/index.js\");\n/* harmony import */ var vant_es_toast_style__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vant/es/toast/style */ \"./node_modules/vant/es/toast/style/index.js\");\n/* harmony import */ var vant_es_toast__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vant/es/toast */ \"./node_modules/vant/es/toast/index.js\");\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vue */ \"vue\");\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_6__);\n\n\n\n\n\n\n\nvue__WEBPACK_IMPORTED_MODULE_6___default.a // .use(PullRefresh)\n// .use(NavBar)\n// .use(CountDown)\n// .use(Tab)\n// .use(Tabs)\n// .use(Sticky)\n// .use(List)\n// .use(Icon)\n// .use(Swipe)\n// .use(SwipeItem)\n.use(vant_es_lazyload__WEBPACK_IMPORTED_MODULE_1__[\"default\"]).use(vant_es_overlay__WEBPACK_IMPORTED_MODULE_3__[\"default\"]).use(vant_es_toast__WEBPACK_IMPORTED_MODULE_5__[\"default\"]); // .use(Button)\n// .use(Field)\n// .use(Toast)\n// .use(Loading)\n// .use(Popup)\n// .use(Dialog)\n// .use(ImagePreview)\n// .use(Image)\n\n//# sourceURL=webpack:///./src/plugins/vant.js?");

/***/ }),

/***/ "./src/router/index.js":
/*!*****************************!*\
  !*** ./src/router/index.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.object.to-string */ \"./node_modules/core-js/modules/es.object.to-string.js\");\n/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var vue_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-router */ \"vue-router\");\n/* harmony import */ var vue_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vue_router__WEBPACK_IMPORTED_MODULE_1__);\n\n// import Vue from 'vue'\n\n\nvar orderDetail = function orderDetail() {\n  return Promise.all(/*! import() | BrandDetails */[__webpack_require__.e(0), __webpack_require__.e(\"BrandDetails\")]).then(__webpack_require__.bind(null, /*! ../views/orderDetail/index.vue */ \"./src/views/orderDetail/index.vue\"));\n};\n\nvar memberDetail = function memberDetail() {\n  return Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(2), __webpack_require__.e(1), __webpack_require__.e(3)]).then(__webpack_require__.bind(null, /*! ../views/member/memberDetail.vue */ \"./src/views/member/memberDetail.vue\"));\n};\n\nvar headNav = function headNav() {\n  return __webpack_require__.e(/*! import() */ 5).then(__webpack_require__.bind(null, /*! _c/headNav.vue */ \"./src/components/headNav.vue\"));\n};\n\nvar author = function author() {\n  return Promise.all(/*! import() */[__webpack_require__.e(2), __webpack_require__.e(7)]).then(__webpack_require__.bind(null, /*! ../views/author/author.vue */ \"./src/views/author/author.vue\"));\n};\n\nvar userDetail = function userDetail() {\n  return Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(2), __webpack_require__.e(1), __webpack_require__.e(4)]).then(__webpack_require__.bind(null, /*! ../views/member/userDetail.vue */ \"./src/views/member/userDetail.vue\"));\n};\n\nvar accountConflict = function accountConflict() {\n  return __webpack_require__.e(/*! import() */ 6).then(__webpack_require__.bind(null, /*! ../views/member/accountConflict.vue */ \"./src/views/member/accountConflict.vue\"));\n};\n\nvar userIndex = function userIndex() {\n  return Promise.all(/*! import() */[__webpack_require__.e(2), __webpack_require__.e(8)]).then(__webpack_require__.bind(null, /*! ../views/member/index.vue */ \"./src/views/member/index.vue\"));\n}; // Vue.use(VueRouter)\n\n\nvar routes = [{\n  path: \"/\",\n  component: userIndex\n}, {\n  path: \"/author\",\n  component: author\n}, {\n  path: \"/orderDetail\",\n  name: \"orderDetail\",\n  component: orderDetail,\n  meta: {\n    title: \"订单详情\"\n  }\n}, {\n  path: \"/memberDetail\",\n  name: \"memberDetail\",\n  component: memberDetail,\n  meta: {\n    title: \"超级荟员\"\n  }\n}, {\n  path: \"/userDetail\",\n  name: \"userDetail\",\n  component: userDetail,\n  meta: {\n    title: \"超级荟员\"\n  }\n}, {\n  path: \"/accountConflict\",\n  name: \"accountConflict\",\n  component: accountConflict,\n  meta: {\n    title: \"帐号冲突\"\n  }\n}, {\n  path: \"/index\",\n  component: userIndex,\n  meta: {\n    title: \"用户首页\"\n  }\n}, {\n  path: \"/headNav\",\n  name: \"headNav\",\n  component: headNav\n}];\nvar router = new vue_router__WEBPACK_IMPORTED_MODULE_1___default.a({\n  base: \"/app-h5\",\n  // 基础路径\n  mode: \"history\",\n  routes: routes\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (router);\n\n//# sourceURL=webpack:///./src/router/index.js?");

/***/ }),

/***/ "./src/store/index.js":
/*!****************************!*\
  !*** ./src/store/index.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.for-each */ \"./node_modules/core-js/modules/es.array.for-each.js\");\n/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.object.to-string */ \"./node_modules/core-js/modules/es.object.to-string.js\");\n/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.regexp.exec */ \"./node_modules/core-js/modules/es.regexp.exec.js\");\n/* harmony import */ var core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var core_js_modules_es_string_replace__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.string.replace */ \"./node_modules/core-js/modules/es.string.replace.js\");\n/* harmony import */ var core_js_modules_es_string_replace__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_replace__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each */ \"./node_modules/core-js/modules/web.dom-collections.for-each.js\");\n/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator */ \"./node_modules/core-js/modules/web.dom-collections.iterator.js\");\n/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vue */ \"vue\");\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! vuex */ \"./node_modules/vuex/dist/vuex.esm.js\");\n/* harmony import */ var vuex_persistedstate__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! vuex-persistedstate */ \"./node_modules/vuex-persistedstate/dist/vuex-persistedstate.es.js\");\n/* harmony import */ var vuex_dist_logger__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! vuex/dist/logger */ \"./node_modules/vuex/dist/logger.js\");\n/* harmony import */ var vuex_dist_logger__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(vuex_dist_logger__WEBPACK_IMPORTED_MODULE_9__);\n\n\n\n\n\n\n\n\nvue__WEBPACK_IMPORTED_MODULE_6___default.a.use(vuex__WEBPACK_IMPORTED_MODULE_7__[\"default\"]); //#region 自动导入vuex modules\n\nvar files = __webpack_require__(\"./src/store/modules sync \\\\.js$\");\n\nvar modules = {};\nfiles.keys().forEach(function (key) {\n  modules[key.replace(/(\\.\\/|\\.js)/g, \"\")] = files(key).default || files(key);\n}); //#endregion\n// 判断环境 vuex提示生产环境中不使用\n\n\n\nvar debug = \"development\" !== \"production\";\nvar createPersisted = Object(vuex_persistedstate__WEBPACK_IMPORTED_MODULE_8__[\"default\"])({\n  storage: window.sessionStorage\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (new vuex__WEBPACK_IMPORTED_MODULE_7__[\"default\"].Store({\n  state: {},\n  mutations: {},\n  actions: {},\n  modules: modules,\n  plugins: debug ? [vuex_dist_logger__WEBPACK_IMPORTED_MODULE_9___default()(), createPersisted] : [createPersisted] // vuex持久化\n\n}));\n\n//# sourceURL=webpack:///./src/store/index.js?");

/***/ }),

/***/ "./src/store/modules sync \\.js$":
/*!***************************************************!*\
  !*** ./src/store/modules sync nonrecursive \.js$ ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var map = {\n\t\"./member.js\": \"./src/store/modules/member.js\",\n\t\"./user.js\": \"./src/store/modules/user.js\"\n};\n\n\nfunction webpackContext(req) {\n\tvar id = webpackContextResolve(req);\n\treturn __webpack_require__(id);\n}\nfunction webpackContextResolve(req) {\n\tif(!__webpack_require__.o(map, req)) {\n\t\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\t\te.code = 'MODULE_NOT_FOUND';\n\t\tthrow e;\n\t}\n\treturn map[req];\n}\nwebpackContext.keys = function webpackContextKeys() {\n\treturn Object.keys(map);\n};\nwebpackContext.resolve = webpackContextResolve;\nmodule.exports = webpackContext;\nwebpackContext.id = \"./src/store/modules sync \\\\.js$\";\n\n//# sourceURL=webpack:///./src/store/modules_sync_nonrecursive_\\.js$?");

/***/ }),

/***/ "./src/store/modules/member.js":
/*!*************************************!*\
  !*** ./src/store/modules/member.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\n\n//# sourceURL=webpack:///./src/store/modules/member.js?");

/***/ }),

/***/ "./src/store/modules/user.js":
/*!***********************************!*\
  !*** ./src/store/modules/user.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  state: {\n    token: null,\n    //用户TOKEN\n    systemInfo: null,\n    InviterId: null,\n    //推荐人ID\n    isAppend: \"\",\n    appToken: \"\"\n  },\n  mutations: {\n    setSystemInfo: function setSystemInfo(state, systemInfo) {\n      state.systemInfo = systemInfo;\n    },\n    setToken: function setToken(state, token) {\n      state.token = token;\n    },\n    setInviterId: function setInviterId(state, token) {\n      state.InviterId = token;\n    },\n    setisApp: function setisApp(state, token) {\n      state.isAppend = token;\n    },\n    setAppToken: function setAppToken(state, token) {\n      state.appToken = token;\n    }\n  }\n});\n\n//# sourceURL=webpack:///./src/store/modules/user.js?");

/***/ }),

/***/ "./src/utils/config.js":
/*!*****************************!*\
  !*** ./src/utils/config.js ***!
  \*****************************/
/*! exports provided: apiUrl, environment, pageUrl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"apiUrl\", function() { return apiUrl; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"environment\", function() { return environment; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"pageUrl\", function() { return pageUrl; });\n// 当前所处的环境\n// let environment = {\n//   dev: false, // dev环境\n//   qa: false, // qa环境\n//   online: false, // 正式环境\n// }\n// // environment.dev = true // dev环境\n// // environment.qa = true // qa环境\n// environment.online = true // 正式环境\nvar apiUrl = \"https://api-dev.hpcang.com\"; //目前环境地址\n\nvar environment = \"development\"; //环境名称\n\nvar pageBaseUrl = \"https://h5.hpcang.com/new-dev\"; // 目前环境下页面地址域名\n\nvar pageUrl = {\n  commidityDetail: pageBaseUrl + '/pages/productDetails/productDetails.html'\n};\n\n\n//# sourceURL=webpack:///./src/utils/config.js?");

/***/ }),

/***/ "./src/utils/global.js":
/*!*****************************!*\
  !*** ./src/utils/global.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _plugins_vant_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/plugins/vant.js */ \"./src/plugins/vant.js\");\n/* harmony import */ var _assets_css_reset_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/assets/css/reset.css */ \"./src/assets/css/reset.css\");\n/* harmony import */ var _assets_css_reset_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_assets_css_reset_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _assets_js_rem_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/assets/js/rem.js */ \"./src/assets/js/rem.js\");\n/* harmony import */ var _assets_js_rem_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_assets_js_rem_js__WEBPACK_IMPORTED_MODULE_2__);\n// 引入vant\n // 初始化样式\n\n // 移动端rem适配js\n\n // 引入icon\n// import '@/assets/font/iconfont.css'\n// 引入amfe-flexible\n// import 'amfe-flexible/index.js'\n// 解决移动端点击300ms事件\n// import FastClick from 'fastclick'\n// if ('addEventListener' in document) {\n//   document.addEventListener('DOMContentLoaded', function () {\n//       FastClick.attach(document.body);\n//   }, false);\n// }\n// font-size小于22px时候，大于22px的时候，需要转成rem\n\n//# sourceURL=webpack:///./src/utils/global.js?");

/***/ }),

/***/ "./src/utils/request.js":
/*!******************************!*\
  !*** ./src/utils/request.js ***!
  \******************************/
/*! exports provided: request */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"request\", function() { return request; });\n/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.object.to-string */ \"./node_modules/core-js/modules/es.object.to-string.js\");\n/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var core_js_modules_es_string_starts_with__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.string.starts-with */ \"./node_modules/core-js/modules/es.string.starts-with.js\");\n/* harmony import */ var core_js_modules_es_string_starts_with__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_starts_with__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var vant_es_toast_style__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vant/es/toast/style */ \"./node_modules/vant/es/toast/style/index.js\");\n/* harmony import */ var vant_es_toast__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vant/es/toast */ \"./node_modules/vant/es/toast/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/store */ \"./src/store/index.js\");\n/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./config.js */ \"./src/utils/config.js\");\n\n\n\n\n\n/**\n * axios封装\n * 请求拦截、响应拦截、错误统一处理\n */\n\n\n\nvar baseUrl = _config_js__WEBPACK_IMPORTED_MODULE_6__[\"apiUrl\"]; // 创建axios实例\n\nvar instance = axios__WEBPACK_IMPORTED_MODULE_4___default.a.create({\n  timeout: 10000,\n  baseURL: _config_js__WEBPACK_IMPORTED_MODULE_6__[\"apiUrl\"],\n  // 设置post请求头\n  headers: {\n    post: {\n      \"Content-Type\": \"application/json;charset=utf-8\"\n    }\n  },\n  // 在传递给 then/catch 前，修改响应数据\n  transformResponse: [function (data) {\n    if (typeof data === \"string\" && data.startsWith(\"{\")) {\n      data = JSON.parse(data);\n    }\n\n    return data;\n  }]\n});\n/**\n * 请求拦截器\n * 每次请求前，如果存在token则在请求头中携带token\n */\n// instance.interceptors.request.use(\n//   config => {\n//      let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1ODI4NTc5MjUsInVzZXJJZCI6IjY2MjM1NzgwNjUzOTYwMzk2OCJ9.Ex4OoY_104k8WC8QmXAJ7_tP9046oV1mQlRlydJbeRA'\n//     let token = store.state.login.token\n//     token && (config.headers.Authorization = token) && (config.headers.loginType = 'Consumer')\n//     return config\n//   },\n//   error => Promise.error(error)\n// )\n// 响应拦截器\n\ninstance.interceptors.response.use( // 请求成功\nfunction (res) {\n  // console.log('res', res)\n  // let res = res.data\n  console.log(\"res\", res);\n  var respone = res.data;\n\n  if (respone.code != 0) {\n    // 失败\n    console.log(\"respone.code\", respone.code);\n\n    if (respone.code == 405) {// 重新登录\n    }\n\n    if (respone.code == \"\") {//code未定\n      //强更新\n    }\n\n    if (respone.code == 20000050 || respone.code == 20000048) {}\n\n    if (respone.code == 5001) {\n      // sucFun && sucFun(res)\n      return Promise.resolve(res); // 成功\n      // return\n    }\n\n    if (respone.code == 5002 || respone.code == 5003) {\n      //签到次数无 分享失败\n      // sucFun && sucFun(res)\n      return Promise.resolve(res); // 成功\n      // return\n    }\n\n    if (respone.code == 2000010) {\n      //要绑定手机号\n      return Promise.resolve(res); // 成功\n    }\n\n    if (respone.msg) {\n      // window.component.toast.showToast(respone.msg)\n      vant_es_toast__WEBPACK_IMPORTED_MODULE_3__[\"default\"].fail(respone.msg);\n    }\n\n    return Promise.reject();\n  } else {\n    // 成功\n    console.log(\"respone.code\", respone.code);\n    return Promise.resolve(respone.result); // 成功\n  }\n}, // 请求失败\nfunction (error) {\n  if (error) {\n    vant_es_toast__WEBPACK_IMPORTED_MODULE_3__[\"default\"].fail(\"请求失败！！\");\n\n    console.log(error);\n    return Promise.reject(error);\n  }\n});\nfunction request(params) {\n  console.log(\"请求封装--\", params);\n  var Type;\n\n  if (!params.method) {\n    Type = \"GET\"; // 默认get请求\n  } else {\n    Type = params.method;\n  }\n\n  if (!params.data) {\n    params.data = {};\n  }\n\n  params.data[\"hp_version\"] = 1.0; // 版本号\n\n  params.data[\"channel_code\"] = 1000; //渠道\n\n  params.data[\"decrypt_enable\"] = true; //是否加密\n\n  params.data[\"source\"] = \"h5\"; //来源\n\n  var token = _store__WEBPACK_IMPORTED_MODULE_5__[\"default\"].state.user.appToken;\n  debugger;\n\n  if (token) {\n    params.data[\"hp_token\"] = token; //token\n  }\n\n  return new Promise(function (resolve, reject) {\n    instance({\n      method: Type,\n      url: params.url,\n      data: params.data\n    }).then(function (res) {\n      resolve(res);\n    }).catch(function (err) {\n      reject(err);\n    });\n  });\n}\n\n//# sourceURL=webpack:///./src/utils/request.js?");

/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./src/main.js */\"./src/main.js\");\n\n\n//# sourceURL=webpack:///multi_./src/main.js?");

/***/ }),

/***/ "vue":
/*!**********************!*\
  !*** external "Vue" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = Vue;\n\n//# sourceURL=webpack:///external_%22Vue%22?");

/***/ }),

/***/ "vue-router":
/*!****************************!*\
  !*** external "VueRouter" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = VueRouter;\n\n//# sourceURL=webpack:///external_%22VueRouter%22?");

/***/ })

/******/ });