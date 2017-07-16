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
	  var lastColorIndexes = [0, 0, 0, 0];
	  var windowQuery = {};
	  var colors = ['pink', 'red', 'orange', 'light-orange', 'yellow', 'lime', 'green', 'sky-blue', 'blue', 'dark-blue'];

	  var getRandomNumber = function getRandomNumber(max) {
	    return Math.floor(Math.random() * (max + 1));
	  };

	  var nonConsectiveColors = function nonConsectiveColors(newIndex) {
	    if (lastColorIndexes[0] === newIndex || lastColorIndexes[1] === newIndex || lastColorIndexes[2] === newIndex || lastColorIndexes[3] === newIndex) {
	      return nonConsectiveColors(getRandomNumber(colors.length - 1));
	    } else {
	      lastColorIndexes[3] = lastColorIndexes[2];
	      lastColorIndexes[2] = lastColorIndexes[1];
	      lastColorIndexes[1] = lastColorIndexes[0];
	      lastColorIndexes[0] = newIndex;
	      return newIndex;
	    }
	  };

	  var generateStripes = function generateStripes(query) {
	    var stripeCount = query && query.stripes && _.isNumber(parseInt(query.stripes, 10)) ? parseInt(query.stripes, 10) : 50;
	    var updatedImage = query && query.img && _.isString(query.img) ? query.img : '';
	    var noBackground = query && query.background && _.isString(query.background) ? query.background : '';

	    var defaultHelper = function defaultHelper() {
	      for (var str = 0; str < stripeCount; str++) {
	        var $div = $("<div>");
	        $div.addClass('stripe ' + colors[str % 10] + ' _' + stripeCount);
	        $div.css({
	          'width': 'calc(100%/' + stripeCount + ')',
	          'z-index': stripeCount - str
	        });
	        $div.appendTo('#app');
	      }
	    };
	    if (query && query.style) {
	      if (/random/.test(query.style)) {
	        lastColorIndexes = lastColorIndexes.map(function (index) {
	          return getRandomNumber(colors.length - 1);
	        }); //start indexes as random
	        for (var str = 0; str < stripeCount; str++) {
	          var $div = $("<div>");
	          $div.addClass('stripe ' + colors[nonConsectiveColors(getRandomNumber(colors.length - 1))] + ' _' + stripeCount);
	          $div.css({
	            'width': 'calc(100%/' + stripeCount + ')',
	            'z-index': stripeCount - str
	          });
	          $div.appendTo('#app');
	        }
	      } else {
	        defaultHelper();
	      }
	    } else {
	      defaultHelper();
	    }

	    if (noBackground.length && /false/.test(noBackground)) {
	      $.each($('.stripe'), function (index, elem) {
	        $(elem).css('background', $(elem).css('background').replace(/\".+\"/, '""'));
	      });
	    } else if (updatedImage.length) {
	      $.each($('.stripe'), function (index, elem) {
	        $(elem).css('background', $(elem).css('background').replace(/\".+\"/, '"' + updatedImage + '"'));
	      });
	    }
	  };

	  var generateProperQuery = function generateProperQuery() {
	    windowQuery = window.location.search;
	    if (windowQuery) {
	      windowQuery = windowQuery.replace(/\?/g, '').split("&");
	      var temp = {};
	      _.each(windowQuery, function (query) {
	        query = query.split("=");
	        temp[query[0]] = query[1];
	      });
	      windowQuery = temp;
	    }
	  };

	  var init = function init() {
	    generateProperQuery();
	    generateStripes(windowQuery);
	  };
	  return init();
	}();

/***/ })
/******/ ]);