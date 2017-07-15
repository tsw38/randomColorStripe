/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

	'use strict';

	var randomStripes = function () {
	  var stripeCount = 50;
	  var lastColorIndex = 0;
	  var currentColorIndex = 0;
	  var colors = ['pink', 'red', 'orange', 'light-orange', 'yellow', 'lime', 'green', 'sky-blue', 'blue', 'dark-blue'];

	  var getRandomNumber = function getRandomNumber(max) {
	    return Math.floor(Math.random() * (max + 1));
	  };
	  var nonConsectiveColors = function nonConsectiveColors(newIndex) {
	    if (lastColorIndex === newIndex) {
	      return nonConsectiveColors(getRandomNumber(colors.length - 1));
	    } else {
	      lastColorIndex = newIndex;
	      return newIndex;
	    }
	  };

	  var generateStripes = function generateStripes(type) {
	    switch (type) {
	      case 'random':
	        for (var str = 0; str < stripeCount; str++) {
	          var $div = $("<div>");
	          $div.addClass('stripe ' + colors[nonConsectiveColors(getRandomNumber(colors.length - 1))] + ' _' + stripeCount);
	          $div.css({
	            'width': 'calc(100%/' + stripeCount + ')',
	            'z-index': stripeCount - str
	          });
	          $div.appendTo('#app');
	        }
	        break;
	      default:
	        for (var _str = 0; _str < stripeCount; _str++) {
	          var $div = $("<div>");
	          $div.addClass('stripe ' + colors[_str % 10] + ' _' + stripeCount);
	          $div.css({
	            'width': 'calc(100%/' + stripeCount + ')',
	            'z-index': stripeCount - _str
	          });
	          $div.appendTo('#app');
	        }
	        break;
	    }
	  };

	  var init = function init() {
	    generateStripes('random');
	  };
	  return init();
	}();

/***/ })
/******/ ]);