/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./osdp/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./osdp/index.ts":
/*!***********************!*\
  !*** ./osdp/index.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar OSDP = /** @class */ (function () {\n    function OSDP() {\n    }\n    OSDP.prototype.init = function (api) {\n        this.api = api;\n        OSDP.instances[this.api.id] = this;\n        // subscribe to extent-change event\n        // this.OnBoundingBoxChange();\n    };\n    OSDP.prototype.addLayerByUUID = function (uuid) {\n        // only works on legacy API for the moment\n        this._RV.loadRcsLayers([uuid]);\n    };\n    OSDP.prototype.setDefinitonQuery = function (mapId, layerId, query) {\n        // use RAMP filter manager to ensure everything is synchronized (map, legend, grid , ...)\n        // it is not implemented in the interface yet, need a little bit of cheating\n        var myMap = window.RZ.mapById(mapId);\n        var myLayer = myMap.layers.getLayersById(layerId)[0];\n        var myProxy = myLayer._layerProxy; // cheating!\n        myProxy.filter.setSql('myUniqueAppCode', query);\n    };\n    OSDP.prototype.resetDefinitionQuery = function (mapId, layerId) {\n        // use RAMP filter manager to ensure everything is synchronized (map, legend, grid , ...)\n        // it is not implemented in the interface yet, need a little bit of cheating\n        var myMap = window.RZ.mapById(mapId);\n        var myLayer = myMap.layers.getLayersById(layerId)[0];\n        var myProxy = myLayer._layerProxy; // cheating!\n        myProxy.filter.setSql('myUniqueAppCode', '');\n    };\n    OSDP.prototype.OnBoundingBoxChange = function () {\n        // detect any change on the extent box\n        var ramAPI = this.api;\n        var mapExtentChange = ramAPI.esriMap.on(\"extent-change\", changeHandler);\n        document.getElementById(\"coordNE\").innerText = \"Bounding Box: NE [\" + ramAPI.boundsObj.northEast + \"]\";\n        document.getElementById(\"coordSW\").innerText = \"SW [\" + ramAPI.boundsObj.southWest + \"]\";\n        function changeHandler(evt) {\n            //var extent = evt.extent,\n            //    zoomed = evt.levelChange;\n            document.getElementById(\"coordNE\").innerText = \"Bounding Box: NE [\" + ramAPI.boundsObj.northEast + \"]\";\n            document.getElementById(\"coordSW\").innerText = \"SW [\" + ramAPI.boundsObj.southWest + \"]\";\n            console.log(\"Bounding Box: \" + ramAPI.boundsObj.toString());\n        }\n    };\n    OSDP.prototype.saveState = function (mapid) {\n        // save bookmark in local storage so it is restored when user returns\n        sessionStorage.setItem(mapid, this._RV.getBookmark());\n    };\n    OSDP.prototype.loadState = function () {\n        var storage = JSON.parse(JSON.stringify(sessionStorage.getItem('mapOSDPBuilder')));\n        // (<any>window).RV.getMap('mapOSDPBuilder').initialBookmark(storage)\n    };\n    // a store of the instances of OSDP, 1 per map\n    OSDP.instances = {};\n    return OSDP;\n}());\nexports.default = OSDP;\nwindow.osdp = new OSDP();\n\n\n//# sourceURL=webpack:///./osdp/index.ts?");

/***/ })

/******/ });