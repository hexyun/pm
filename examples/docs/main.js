webpackJsonp([0],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(135), __webpack_require__(136), __webpack_require__(139)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== "undefined") {
	    factory(require('vue'), require('vue-router'), require('./app.vue'), require('../src/index'));
	  } else {
	    var mod = {
	      exports: {}
	    };
	    factory(global.vue, global.vueRouter, global.app, global.index);
	    global.main = mod.exports;
	  }
	})(this, function (_vue, _vueRouter, _app, _index) {
	  'use strict';

	  var _vue2 = _interopRequireDefault(_vue);

	  var _vueRouter2 = _interopRequireDefault(_vueRouter);

	  var _app2 = _interopRequireDefault(_app);

	  var _index2 = _interopRequireDefault(_index);

	  function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : {
	      default: obj
	    };
	  }

	  _vue2.default.use(_vueRouter2.default);
	  _vue2.default.use(_index2.default);

	  _vue2.default.config.debug = true;

	  var router = new _vueRouter2.default();

	  router.map({
	    '/stage': {
	      component: function component(resolve) {
	        __webpack_require__.e/* require */(1, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(158)]; (resolve.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this));
	      }
	    }
	  });

	  router.beforeEach(function () {
	    window.scrollTo(0, 0);
	  });

	  router.afterEach(function (transition) {});

	  router.redirect({
	    '*': "/stage"
	  });
	  router.start(_app2.default, '#app');
	});

/***/ }),

/***/ 136:
/***/ (function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__vue_script__ = __webpack_require__(137)
	if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
	  console.warn("[vue-loader] examples/app.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(138)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-3927a53a/app.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ }),

/***/ 137:
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== "undefined") {
	    factory(exports);
	  } else {
	    var mod = {
	      exports: {}
	    };
	    factory(mod.exports);
	    global.app = mod.exports;
	  }
	})(this, function (exports) {
	  "use strict";

	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });
	  exports.default = {
	    data: function data() {
	      return {};
	    },
	    ready: function ready() {},
	    beforeDestroy: function beforeDestroy() {},
	    methods: {}
	  };
	  module.exports = exports.default;
	});

/***/ }),

/***/ 138:
/***/ (function(module, exports) {

	module.exports = "\n<router-view></router-view>\n";

/***/ }),

/***/ 139:
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, __webpack_require__(140), __webpack_require__(129), __webpack_require__(144), __webpack_require__(153)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== "undefined") {
	    factory(module, require('babel-runtime/core-js/object/assign'), require('babel-runtime/core-js/object/keys'), require('./components/stage'), require('./components/ImageView'));
	  } else {
	    var mod = {
	      exports: {}
	    };
	    factory(mod, global.assign, global.keys, global.stage, global.ImageView);
	    global.index = mod.exports;
	  }
	})(this, function (module, _assign, _keys, _stage, _ImageView) {
	  'use strict';

	  var _assign2 = _interopRequireDefault(_assign);

	  var _keys2 = _interopRequireDefault(_keys);

	  var _stage2 = _interopRequireDefault(_stage);

	  var _ImageView2 = _interopRequireDefault(_ImageView);

	  function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : {
	      default: obj
	    };
	  }

	  var Components = {
	    Stage: _stage2.default,
	    ImageView: _ImageView2.default
	  };

	  var install = function install(Vue) {
	    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	    (0, _keys2.default)(Components).forEach(function (key) {
	      Vue.component(Components[key].name || key, Components[key]);
	    });
	  };

	  if (typeof window !== 'undefined' && window.Vue) {
	    install(window.Vue);
	  }

	  module.exports = (0, _assign2.default)(Components, { install: install });
	});

/***/ }),

/***/ 140:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(141), __esModule: true };

/***/ }),

/***/ 141:
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(142);
	module.exports = __webpack_require__(23).Object.assign;


/***/ }),

/***/ 142:
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $export = __webpack_require__(22);

	$export($export.S + $export.F, 'Object', { assign: __webpack_require__(143) });


/***/ }),

/***/ 143:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.2.1 Object.assign(target, source, ...)
	var DESCRIPTORS = __webpack_require__(17);
	var getKeys = __webpack_require__(51);
	var gOPS = __webpack_require__(126);
	var pIE = __webpack_require__(11);
	var toObject = __webpack_require__(70);
	var IObject = __webpack_require__(7);
	var $assign = Object.assign;

	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = !$assign || __webpack_require__(18)(function () {
	  var A = {};
	  var B = {};
	  // eslint-disable-next-line no-undef
	  var S = Symbol();
	  var K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function (k) { B[k] = k; });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
	  var T = toObject(target);
	  var aLen = arguments.length;
	  var index = 1;
	  var getSymbols = gOPS.f;
	  var isEnum = pIE.f;
	  while (aLen > index) {
	    var S = IObject(arguments[index++]);
	    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
	    var length = keys.length;
	    var j = 0;
	    var key;
	    while (length > j) {
	      key = keys[j++];
	      if (!DESCRIPTORS || isEnum.call(S, key)) T[key] = S[key];
	    }
	  } return T;
	} : $assign;


/***/ }),

/***/ 144:
/***/ (function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(145)
	__vue_script__ = __webpack_require__(146)
	if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
	  console.warn("[vue-loader] src/components/stage/index.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(152)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-208cb19c/index.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ }),

/***/ 145:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 146:
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(147), __webpack_require__(151), __webpack_require__(150)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== "undefined") {
	    factory(exports, require('./Matrix'), require('./Dragger'), require('../../utils/dom'));
	  } else {
	    var mod = {
	      exports: {}
	    };
	    factory(mod.exports, global.Matrix, global.Dragger, global.dom);
	    global.index = mod.exports;
	  }
	})(this, function (exports, _Matrix, _Dragger, _dom) {
	  'use strict';

	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });

	  var _Matrix2 = _interopRequireDefault(_Matrix);

	  var _Dragger2 = _interopRequireDefault(_Dragger);

	  function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : {
	      default: obj
	    };
	  }

	  exports.default = {
	    name: 'stage',
	    props: {},
	    data: function data() {
	      return {
	        matrix: null,
	        dragger: null
	      };
	    },
	    ready: function ready() {
	      var _this = this;

	      this.matrix = new _Matrix2.default(this.$els.base, {});
	      this.dragger = new _Dragger2.default(this.$els.stage, (0, _dom.throttle)(function (_ref) {
	        var x = _ref.x,
	            y = _ref.y;

	        if (x != 0 || y != 0) _this.matrix.translate({ x: x * 2, y: y * 2 }, true).matrix();
	      }, 16.6));
	    },

	    methods: {
	      zoomIn: function zoomIn() {
	        this.matrix.scale(Math.max((this.matrix.a * 100 - 20) / 100, 0.2)).matrix();
	        this.$emit('zoom', this.matrix.a);
	      },
	      zoomOut: function zoomOut() {
	        this.matrix.scale(Math.min((this.matrix.a * 100 + 20) / 100, 2)).matrix();
	        this.$emit('zoom', this.matrix.a);
	      }
	    },
	    beforeDestroy: function beforeDestroy() {
	      this.matrix = null;
	      this.dragger = null;
	      this.in = 0;
	      this.out = 0;
	    }
	  };
	  module.exports = exports.default;
	});

/***/ }),

/***/ 147:
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(148), __webpack_require__(149), __webpack_require__(150)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== "undefined") {
	    factory(exports, require('babel-runtime/helpers/classCallCheck'), require('babel-runtime/helpers/createClass'), require('../../utils/dom'));
	  } else {
	    var mod = {
	      exports: {}
	    };
	    factory(mod.exports, global.classCallCheck, global.createClass, global.dom);
	    global.Matrix = mod.exports;
	  }
	})(this, function (exports, _classCallCheck2, _createClass2, _dom) {
	  'use strict';

	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });

	  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	  var _createClass3 = _interopRequireDefault(_createClass2);

	  function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : {
	      default: obj
	    };
	  }

	  var Matrix = function () {
	    function Matrix(el, _ref) {
	      var _ref$x = _ref.x,
	          x = _ref$x === undefined ? 0 : _ref$x,
	          _ref$y = _ref.y,
	          y = _ref$y === undefined ? 0 : _ref$y,
	          _ref$removedEffectCla = _ref.removedEffectClass,
	          removedEffectClass = _ref$removedEffectCla === undefined ? 'effect--removed' : _ref$removedEffectCla;
	      (0, _classCallCheck3.default)(this, Matrix);

	      this.el = (0, _dom.$)(el);
	      this.x = x;
	      this.y = y;
	      this.a = 1;
	      this.b = 0;
	      this.c = 0;
	      this.d = 1;
	      this.e = 0;
	      this.f = 0;
	      var styles = window.getComputedStyle(this.el, null);
	      this.w = parseInt(styles.width);
	      this.h = parseInt(styles.height);
	      this.removedEffectClass = removedEffectClass;
	    }

	    (0, _createClass3.default)(Matrix, [{
	      key: 'meta',
	      value: function meta() {
	        return [this.a, this.b, this.c, this.d, this.e, this.f].join(',');
	      }
	    }, {
	      key: 'fix',
	      value: function fix() {
	        if (this._zoom != this.a) {
	          var w = Math.min(this.a < 1 ? this.w / this.a : this.w * this.a, this.w);
	          var h = Math.min(this.a < 1 ? this.h / this.a : this.h * this.a, this.h);

	          this._zoom = this.a;
	        }
	      }
	    }, {
	      key: 'matrix',
	      value: function matrix() {
	        var ctx = this;
	        window.requestAnimationFrame(function () {
	          ctx.fix();
	          ctx.el.style.transform = 'matrix(' + ctx.meta() + ')';
	        });
	        return this;
	      }
	    }, {
	      key: 'translate',
	      value: function translate(_ref2) {
	        var x = _ref2.x,
	            y = _ref2.y;
	        var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	        this.e = offset ? this.e + x : x;
	        this.f = offset ? this.f + y : y;
	        if (this.el) {
	          this.el.classList.add(this.removedEffectClass);
	        }
	        return this;
	      }
	    }, {
	      key: 'scale',
	      value: function scale(zoom, offset) {
	        this.a = offset ? this.a * zoom : zoom;
	        this.d = offset ? this.d * zoom : zoom;

	        if (this.el) {
	          this.el.classList.remove(this.removedEffectClass);
	        }
	        return this;
	      }
	    }]);
	    return Matrix;
	  }();

	  exports.default = Matrix;
	  module.exports = exports.default;
	});

/***/ }),

/***/ 148:
/***/ (function(module, exports) {

	"use strict";

	exports.__esModule = true;

	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ }),

/***/ 149:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _defineProperty = __webpack_require__(114);

	var _defineProperty2 = _interopRequireDefault(_defineProperty);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();

/***/ }),

/***/ 150:
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== "undefined") {
	    factory(exports);
	  } else {
	    var mod = {
	      exports: {}
	    };
	    factory(mod.exports);
	    global.dom = mod.exports;
	  }
	})(this, function (exports) {
	  'use strict';

	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });
	  var $ = function $(el) {
	    if (typeof el === 'string') {
	      el = document.querySelector(el);
	    }
	    if (el && el.nodeType === 1) {
	      return el;
	    }
	    return null;
	  };
	  var throttle = function throttle(fn, delay) {
	    var ctx = this;
	    var now = Date.now();
	    return function () {
	      if (Date.now() - now < delay) return;

	      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }

	      fn.call.apply(fn, [ctx].concat(args));
	      now = Date.now();
	    };
	  };
	  exports.$ = $;
	  exports.throttle = throttle;
	});

/***/ }),

/***/ 151:
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(148), __webpack_require__(150)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== "undefined") {
	    factory(exports, require('babel-runtime/helpers/classCallCheck'), require('../../utils/dom'));
	  } else {
	    var mod = {
	      exports: {}
	    };
	    factory(mod.exports, global.classCallCheck, global.dom);
	    global.Dragger = mod.exports;
	  }
	})(this, function (exports, _classCallCheck2, _dom) {
	  'use strict';

	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });

	  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	  function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : {
	      default: obj
	    };
	  }

	  var Dragger = function Dragger(el, cb) {
	    var _this = this;

	    (0, _classCallCheck3.default)(this, Dragger);

	    this.el = (0, _dom.$)(el);
	    if (this.el) {
	      this.down = function (e) {
	        _this.x = e.clientX;
	        _this.y = e.clientY;
	        _this.lastX = _this.x;
	        _this.lastY = _this.y;
	        _this.el.addEventListener('mousemove', _this.move);
	        _this.el.addEventListener('mouseup', _this.up);
	        return false;
	      };
	      this.move = function (e) {
	        _this.x = e.clientX;
	        _this.y = e.clientY;
	        if (typeof cb === 'function') {
	          cb({ x: _this.x - _this.lastX, y: _this.y - _this.lastY });
	        }
	        _this.lastX = _this.x;
	        _this.lastY = _this.y;
	        return false;
	      };
	      this.up = function () {
	        _this.el.removeEventListener('mousemove', _this.move);
	        _this.el.removeEventListener('mouseup', _this.down);
	        return false;
	      };
	      this.el.addEventListener('mousedown', this.down);
	    }
	  };

	  exports.default = Dragger;
	  module.exports = exports.default;
	});

/***/ }),

/***/ 152:
/***/ (function(module, exports) {

	module.exports = "\n<div v-el:stage class=\"hex-stage\">\n  <div v-el:base class=\"hex-stage__base\">\n    <slot></slot>\n  </div>\n</div>\n";

/***/ }),

/***/ 153:
/***/ (function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(154)
	__vue_script__ = __webpack_require__(155)
	if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
	  console.warn("[vue-loader] src/components/ImageView/index.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(157)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-bf5d7098/index.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ }),

/***/ 154:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 155:
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(156), __webpack_require__(144)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== "undefined") {
	    factory(exports, require('../../directives/load'), require('../stage'));
	  } else {
	    var mod = {
	      exports: {}
	    };
	    factory(mod.exports, global.load, global.stage);
	    global.index = mod.exports;
	  }
	})(this, function (exports, _load, _stage) {
	  'use strict';

	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });

	  var _load2 = _interopRequireDefault(_load);

	  var _stage2 = _interopRequireDefault(_stage);

	  function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : {
	      default: obj
	    };
	  }

	  exports.default = {
	    name: 'image-view',
	    directives: {
	      load: _load2.default
	    },
	    components: {
	      stage: _stage2.default
	    },
	    props: {
	      list: {
	        type: Array,
	        default: []
	      },
	      zoom: {
	        type: Number,
	        default: 1
	      },
	      key: {
	        type: String,
	        default: 'url'
	      }
	    },
	    data: function data() {
	      return {
	        currentIndex: 0,
	        timer: null
	      };
	    },

	    methods: {
	      select: function select(index) {
	        var _this = this;

	        this.timer && clearTimeout(this.timer);
	        this.timer = setTimeout(function () {
	          _this.currentIndex = index;
	          _this.$emit('select', _this.list[index]);
	          console.log('tt select');
	        }, 1000);
	      },
	      view: function view(index) {
	        this.timer && clearTimeout(this.timer);
	        this.$emit('view', this.list[index]);
	        console.log('tt view');
	      }
	    },
	    computed: {
	      titleStyle: function titleStyle() {
	        var size = 16;
	        if (this.zoom < 1) size = size * 0.9 / this.zoom;
	        return {
	          'font-size': size + 'px'
	        };
	      }
	    },
	    beforeDestroy: function beforeDestroy() {
	      this.timer = null;
	    }
	  };
	  module.exports = exports.default;
	});

/***/ }),

/***/ 156:
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== "undefined") {
	    factory(exports);
	  } else {
	    var mod = {
	      exports: {}
	    };
	    factory(mod.exports);
	    global.load = mod.exports;
	  }
	})(this, function (exports) {
	  'use strict';

	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });
	  exports.default = {
	    bind: function bind() {
	      var _this = this;

	      console.log(this.el.nodeName);
	      if (this.el.nodeName !== 'IMG') return;
	      this.img = new Image();
	      console.log(this.vm, this.expression);
	      this.vm.$nextTick(function () {
	        var old = _this.el.getAttribute('src');
	        var lazySrc = _this.el.getAttribute('data-src');
	        var ctx = _this;
	        _this.img.src = old;
	        if (lazySrc) _this.el.src = lazySrc;
	        console.log(_this.el);
	        console.log(old);

	        _this.img.onload = function () {
	          ctx.el.setAttribute('src', old);
	        };
	      });
	    },
	    unbind: function unbind() {
	      this.img = null;
	    }
	  };
	  module.exports = exports.default;
	});

/***/ }),

/***/ 157:
/***/ (function(module, exports) {

	module.exports = "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n<ul class=\"stage-img__container\">\n  <li @click=\"select(index)\" v-for=\"(index, item) in list\" track-by=\"$index\" class=\"stage-img__item\">\n    <p class=\"title\" :style=\"titleStyle\">{{item.title}}</p>\n    <img @dbclick.native=\"view(index)\" :class=\"{\n      'img': true,\n      'active': currentIndex === index\n    }\" :title=\"item.title\" :src=\"item[key]\" v-load>\n  </li>\n</ul>\n";

/***/ })

});
