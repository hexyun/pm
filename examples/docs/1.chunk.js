webpackJsonp([1],{

/***/ 158:
/***/ (function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(159)
	__vue_script__ = __webpack_require__(160)
	if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
	  console.warn("[vue-loader] examples/routers/stage.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(161)
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
	  var id = "_v-5a9a265c/stage.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ }),

/***/ 159:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 160:
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
	    global.stage = mod.exports;
	  }
	})(this, function (exports) {
	  'use strict';

	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });

	  function mockData() {
	    var urls = ['https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2819109401,2573286501&fm=26&gp=0.jpg', 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=80274084,2988281088&fm=26&gp=0.jpg', 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=520772347,1639860623&fm=11&gp=0.jpg', 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=968897864,3213190193&fm=26&gp=0.jpg', 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3560174241,1441889743&fm=26&gp=0.jpg,' + 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2289902233,4012915850&fm=26&gp=0.jpg'];
	    var i = 0,
	        list = [];
	    while (i < 30) {
	      list.push({
	        title: i + 1 + '\u732B\u54AA',
	        url: urls[parseInt(Math.random() * 5)]
	      });
	      i++;
	    }
	    return list;
	  }
	  exports.default = {
	    data: function data() {
	      return {
	        z: 100,
	        list: mockData()
	      };
	    },

	    methods: {
	      zoom: function zoom(_zoom) {
	        this.z = _zoom * 100;
	      },
	      select: function select(item) {
	        console.log('select', item);
	      },
	      view: function view(item) {
	        console.log('view', item);
	      }
	    }
	  };
	  module.exports = exports.default;
	});

/***/ }),

/***/ 161:
/***/ (function(module, exports) {

	module.exports = "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n<div class=\"stage__wrapper\">\n  <stage v-ref:stage @zoom=\"zoom\">\n    <image-view @select=\"select\" @view=\"view\" :zoom=\"z / 100\" :list=\"list\" key=\"url\"></image-view>\n  </stage>\n  <div class=\"stage__navigator\">\n    <div class=\"nav-btn zoom-out\"\n         @click=\"$refs.stage.zoomOut()\"\n         title=\"缩小\">\n      <svg t=\"1557915928818\" class=\"icon\" style=\"\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"1989\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"width=\"32\" height=\"32\"><defs><style type=\"text/css\"></style></defs><path d=\"M604.16 430.08c0 11.264-9.216 20.48-20.48 20.48H450.56v133.12c0 11.264-9.216 20.48-20.48 20.48s-20.48-9.216-20.48-20.48V450.56H276.48c-11.264 0-20.48-9.216-20.48-20.48s9.216-20.48 20.48-20.48h133.12V276.48c0-11.264 9.216-20.48 20.48-20.48s20.48 9.216 20.48 20.48v133.12h133.12c11.264 0 20.48 9.216 20.48 20.48z m359.424 533.504c-4.096 4.096-9.216 6.144-14.336 6.144s-10.24-2.048-14.336-6.144L683.008 711.68C615.424 772.096 527.36 808.96 430.08 808.96 221.184 808.96 51.2 638.976 51.2 430.08S221.184 51.2 430.08 51.2s378.88 169.984 378.88 378.88c0 97.28-36.864 185.344-97.28 252.928l251.904 251.904c8.192 8.192 8.192 20.48 0 28.672zM768 430.08C768 243.712 616.448 92.16 430.08 92.16S92.16 243.712 92.16 430.08s151.552 337.92 337.92 337.92 337.92-151.552 337.92-337.92z\" p-id=\"1990\" fill=\"#2c2c2c\"></path></svg>\n    </div>\n\n    <div v-el:zoom-pan class=\"zoom--pan\">\n\n      <span class=\"text\">{{z}}%</span>\n    </div>\n    <div class=\"nav-btn zoom-in\"\n         @click=\"$refs.stage.zoomIn()\"\n         title=\"放大\">\n      <svg t=\"1557916627763\" class=\"icon\" style=\"\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"6026\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"32\" height=\"32\"><defs><style type=\"text/css\"></style></defs><path d=\"M426.666667 785.066667c-98.679467 0-183.995733-35.259733-253.559467-104.840534S68.266667 525.346133 68.266667 426.666667s35.2768-183.995733 104.840533-253.559467S327.9872 68.266667 426.666667 68.266667c98.082133 0 183.381333 35.259733 253.508266 104.789333C749.806933 242.670933 785.066667 327.9872 785.066667 426.666667c0 36.078933-4.522667 70.638933-13.4144 102.7072-16.469333 55.227733-46.336 105.0112-88.917334 148.343466a15.752533 15.752533 0 0 1-2.6112 3.4816c-30.225067 29.610667-63.624533 53.367467-99.242666 70.6048C534.272 773.905067 482.423467 785.066667 426.666667 785.066667z m0-682.666667c-89.2928 0-166.485333 31.914667-229.4272 94.839467S102.4 337.373867 102.4 426.666667s31.914667 166.485333 94.839467 229.4272C260.181333 719.035733 337.373867 750.933333 426.666667 750.933333c50.653867 0 97.5872-10.069333 139.451733-29.917866 31.197867-15.086933 60.689067-35.874133 87.586133-61.7472a15.394133 15.394133 0 0 1 2.4064-3.1744c39.850667-39.850667 67.703467-85.674667 82.756267-136.174934 7.970133-28.7744 12.066133-60.245333 12.066133-93.252266 0-89.2928-31.8976-166.485333-94.839466-229.4272C592.64 134.331733 515.4304 102.4 426.666667 102.4z\" p-id=\"6027\"></path><path d=\"M938.666667 973.653333a33.9968 33.9968 0 0 1-24.132267-10.001066l-120.32-120.32a34.133333 34.133333 0 1 1 48.264533-48.264534l120.32 120.32A34.133333 34.133333 0 0 1 938.666667 973.653333zM597.333333 462.506667H256a34.133333 34.133333 0 0 1 0-68.266667h341.333333a34.133333 34.133333 0 0 1 0 68.266667z\" p-id=\"6028\"></path><path d=\"M692.309333 644.864l150.186667 150.186667-48.2816 48.2816-150.186667-150.186667z\" p-id=\"6029\"></path></svg>\n    </div>\n    <!--<div class=\"nav-btn camera\"-->\n         <!--title=\"居中\">-->\n      <!--<svg t=\"1557916189173\" class=\"icon\" style=\"\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"3417\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"width=\"32\" height=\"32\"><defs><style type=\"text/css\"></style></defs><path d=\"M509.625554 16.443431c-236.516402 0-428.260118 191.743716-428.260118 428.258104 0 73.074757 18.309966 141.871785 50.582704 202.064026 5.407315 14.80241 18.173047 34.052692 35.908153 56.029283 12.851307 16.990102 26.936903 32.994586 42.12893 47.875523 111.732375 119.007231 299.639324 273.441383 299.639324 273.441383C690.54558 894.244586 791.744212 781.407794 842.918892 713.640683c59.393879-73.514712 94.964766-167.073032 94.964766-268.939147C937.883658 208.186141 746.139942 16.443431 509.625554 16.443431zM840.391921 646.233991l-3.276001 0c0 0-146.204886 234.22904-327.490366 302.300194 0 0-237.649008-158.10883-327.493387-302.300194l-3.274994 0c-30.014572-55.986999-47.108371-120.397568-47.108371-188.935859 0-215.655302 169.183204-390.472342 377.876752-390.472342 208.690528 0 377.874739 174.81704 377.874739 390.472342C887.500292 525.83743 870.406494 590.246993 840.391921 646.233991zM509.625554 243.168073c-111.322623 0-201.533463 90.238022-201.533463 201.533463 0 111.296447 90.21084 201.533463 201.533463 201.533463 111.319602 0 201.533463-90.237016 201.533463-201.533463C711.159016 333.406095 620.946163 243.168073 509.625554 243.168073zM509.625554 596.196952c-83.620581 0-151.422929-67.800335-151.422929-151.446085s67.802348-151.446085 151.422929-151.446085c83.618567 0 151.419909 67.800335 151.419909 151.446085S593.244121 596.196952 509.625554 596.196952z\" p-id=\"3418\"></path></svg>-->\n    <!--</div>-->\n  </div>\n</div>\n";

/***/ })

});