(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); //////////////////////////////////////////////////////////////////////////////////////////


var _Gradients = require('./Gradients');

var _Gradients2 = _interopRequireDefault(_Gradients);

var _Layout = require('./Layout');

var _Layout2 = _interopRequireDefault(_Layout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//////////////////////////////////////////////////////////////////////////////////////////
var Disco = function () {
  function Disco(options) {
    _classCallCheck(this, Disco);

    this.gradients = new _Gradients2.default();
    this.trigger = true;

    this.initialize();
  }

  _createClass(Disco, [{
    key: 'initialize',
    value: function initialize() {
      var _this = this;

      this.gradients.load(function () {
        _this.build();
        setTimeout(_this.start.bind(_this), 100);
      });
    }
  }, {
    key: 'build',
    value: function build() {
      this.firstLayout = new _Layout2.default({
        gradient: this.gradients.getRandomGradient()
      });
      this.secondLayout = new _Layout2.default({
        gradient: this.gradients.getRandomGradient()
      });
    }
  }, {
    key: 'start',
    value: function start() {
      var _this2 = this;

      if (this.trigger) {
        this.trigger = false;
        this.firstLayout.onHide(function () {
          _this2.firstLayout = new _Layout2.default({
            gradient: _this2.gradients.getRandomGradient()
          });
          _this2.start();
        });
      } else {
        this.trigger = true;
        this.secondLayout.onHide(function () {
          _this2.secondLayout = new _Layout2.default({
            gradient: _this2.gradients.getRandomGradient()
          });
          _this2.start();
        });
      }
    }
  }]);

  return Disco;
}();

//////////////////////////////////////////////////////////////////////////////////////////


exports.default = Disco;

},{"./Gradients":2,"./Layout":3}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); //////////////////////////////////////////////////////////////////////////////////////////


var _utils = require('./utils.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//////////////////////////////////////////////////////////////////////////////////////////
var Gradients = function () {
  function Gradients() {
    _classCallCheck(this, Gradients);

    this.gradients = [];
    this.cache = [];
  }

  _createClass(Gradients, [{
    key: 'load',
    value: function load(callback) {
      var _this = this;

      var request = new XMLHttpRequest();
      var response = null;
      request.open('GET', './gradients.json', true);
      request.send();
      request.onload = function () {
        if (request.status === 200) {
          _this.gradients = JSON.parse(request.response);
          _this.cache = _this.gradients;
          if (typeof callback === 'function') {
            callback.call(_this, _this.gradients);
          }
        }
      };
    }
  }, {
    key: 'getRandomGradient',
    value: function getRandomGradient() {
      if (!this.gradients.length) {
        this.gradients = this.cache;
      }
      var randomGradient = this.gradients[(0, _utils.getRandomNumber)(this.gradients.length)];
      this.gradients = this.gradients.filter(function (g) {
        return g.name !== randomGradient.name;
      });
      return randomGradient;
    }
  }]);

  return Gradients;
}();

//////////////////////////////////////////////////////////////////////////////////////////


exports.default = Gradients;

},{"./utils.js":5}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); //////////////////////////////////////////////////////////////////////////////////////////


var _utils = require('./utils');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//////////////////////////////////////////////////////////////////////////////////////////
var Layout = function () {
  function Layout(_ref) {
    var gradient = _ref.gradient;

    _classCallCheck(this, Layout);

    this.gradient = gradient;
    if (this.gradient) {
      this.createNode();
    }
  }

  _createClass(Layout, [{
    key: 'createNode',
    value: function createNode() {
      this.node = document.createElement('div');
      this.node.className = 'gradient-layout';
      this.node.style.background = '\n      linear-gradient(\n        ' + (0, _utils.getRandomNumber)(360) + 'deg,\n        ' + this.gradient.colors[0] + ' 0%,\n        ' + this.gradient.colors[1] + ' 100%\n      )\n    ';
      document.body.insertBefore(this.node, document.body.firstChild);
    }
  }, {
    key: 'onHide',
    value: function onHide(callback) {
      var _this = this;

      this.node.classList.add('fade-out');
      this.node.addEventListener('transitionend', function () {
        _this.node.parentNode.removeChild(_this.node);
        if (typeof callback === 'function') {
          callback();
        }
      }, false);
    }
  }, {
    key: 'getNode',
    value: function getNode() {
      return this.node;
    }
  }, {
    key: 'getGradientName',
    value: function getGradientName() {
      return this.gradient.name;
    }
  }]);

  return Layout;
}();

//////////////////////////////////////////////////////////////////////////////////////////


exports.default = Layout;

},{"./utils":5}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Disco = require('./Disco');

var _Disco2 = _interopRequireDefault(_Disco);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//////////////////////////////////////////////////////////////////////////////////////////
exports.default = _Disco2.default; //////////////////////////////////////////////////////////////////////////////////////////

},{"./Disco":1}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRandomNumber = getRandomNumber;
/////////////////////////////////////////////////////////////////////////////////////////
function getRandomNumber(max) {
  return Math.floor(Math.random() * max);
}

},{}],6:[function(require,module,exports){
'use strict';

var _Disco = require('./Disco');

var _Disco2 = _interopRequireDefault(_Disco);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/////////////////////////////////////////////////////////////////////////////////////////
document.addEventListener('DOMContentLoaded', function () {
  var disco = new _Disco2.default({
    autoStart: true
  });
}); /////////////////////////////////////////////////////////////////////////////////////////

},{"./Disco":4}]},{},[6]);
