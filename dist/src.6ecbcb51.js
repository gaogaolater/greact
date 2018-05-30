// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({4:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.render = render;
function render(vnode) {
    if (typeof vnode.tag == "function") {
        //console.log(vnode.tag);
        var component = void 0,
            dom = void 0;
        if (vnode.tag.prototype.render) {
            var instance = new vnode.tag(vnode.attrs);
            if (instance.componentWillMount) {
                instance.componentWillMount();
            }
            component = instance.render();
            if (instance.componentDidMount) {
                instance.componentDidMount();
            }
            dom = render(component);
            instance.base = dom;
        } else {
            component = vnode.tag(vnode.attrs);
            dom = render(component);
        }
        return dom;
    } else {
        var tag = document.createElement(vnode.tag);
        if (vnode.attrs) {
            for (var key in vnode.attrs) {
                setAttribute(tag, key, vnode.attrs[key]);
            }
        }
        if (vnode.children && vnode.children.length > 0) {
            vnode.children.forEach(function (node) {
                if (typeof node == "string" || typeof node == "number") {
                    var textNode = document.createTextNode(node);
                    tag.appendChild(textNode);
                } else {
                    var _dom = render(node);
                    tag.appendChild(_dom);
                }
            });
        }
        return tag;
    }
}

function renderCom(vnode, container) {
    container.innerHTML = "";
    var dom = render(vnode);
    container.appendChild(dom);
}

function setAttribute(dom, key, val) {
    if (key == "className") key = "class";
    if (/on\w+/.test(key)) {
        key = key.toLowerCase();
        dom[key] = val || '';
    } else if (key == "style") {
        if (typeof val == "string") {
            dom[key] = val;
        } else if ((typeof val === "undefined" ? "undefined" : _typeof(val)) == "object") {
            for (var name in val) {
                dom.style[name] = typeof val[name] == "number" ? val[name] + "px" : val[name];
            }
        }
    } else {
        if (val) {
            dom.setAttribute(key, val);
        } else {
            dom.removeAttribute(key);
        }
    }
}

var ReactDOM = {
    render: function render(vnode, container) {
        if (vnode && container) {
            renderCom(vnode, container);
        }
    }
};

exports.default = ReactDOM;
},{}],3:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ReactDOM = require("./ReactDOM");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function createElement(tag, attrs) {
    for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        children[_key - 2] = arguments[_key];
    }

    return {
        tag: tag,
        attrs: attrs,
        children: children
    };
}

var componentArray = [];

var Component = function () {
    function Component() {
        var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, Component);

        this.props = props;
        this.state = {};
        componentArray.push(this);
        this._stateChangeArray = [];
    }

    _createClass(Component, [{
        key: "setState",
        value: function setState(stateChange) {
            //延迟执行setState
            this._stateChangeArray.push(stateChange);
        }
    }]);

    return Component;
}();

if (flushTimer) {
    clearInterval(flushTimer);
}
var flushTimer = setInterval(function () {
    componentArray.forEach(function (com) {
        var item = null;
        var hasChange = false;
        while (item = com._stateChangeArray.shift()) {
            hasChange = true;
            if (typeof item == "function") {
                Object.assign(com.state, item.call(com, com.state));
            } else {
                Object.assign(com.state, item);
            }
        }
        if (hasChange) {
            var vnode = com.render();
            var dom = (0, _ReactDOM.render)(vnode);
            diff(dom, com.base);
            com.base.parentNode.replaceChild(dom, com.base);
            com.base = dom;
        }
    });
}, 200);

function diff(newDom, oldDom) {
    //检查 节点类型，节点属性，节点事件，子节点
    //console.log(newDom.tagName);
    if (newDom.tagName == oldDom.tagName) {
        //判断 增加或减少的dom

    }
}

//状态队列
// let stateQueue = [];

// if (queueTimer) {
//     clearInterval(queueTimer);
// }
// let queueTimer = setInterval(() => {
//     let result = {};
//     if (stateQueue.length > 0) {
//         stateQueue.forEach(state => {
//             Object.assign(result, state);
//         })

//     }
// }, 200);

var React = {
    createElement: createElement,
    Component: Component
};

exports.default = React;
},{"./ReactDOM":4}],2:[function(require,module,exports) {
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _React = require('./React.js');

var _React2 = _interopRequireDefault(_React);

var _ReactDOM = require('./ReactDOM.js');

var _ReactDOM2 = _interopRequireDefault(_ReactDOM);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var element = _React2.default.createElement(
    'div',
    { className: 'wrap', onClick: function onClick(e) {
            alert(123);
        } },
    'hello ',
    _React2.default.createElement(
        'span',
        { style: { color: 'red' } },
        'world ',
        new Date().getTime()
    )
);

var ComA = function ComA(props) {
    return _React2.default.createElement(
        'div',
        { style: { color: 'green' } },
        props.name
    );
};

var ComB = function (_React$Component) {
    _inherits(ComB, _React$Component);

    function ComB(props) {
        _classCallCheck(this, ComB);

        var _this = _possibleConstructorReturn(this, (ComB.__proto__ || Object.getPrototypeOf(ComB)).call(this, props));

        _this.state = {
            now: new Date().toLocaleTimeString()
        };
        return _this;
    }

    _createClass(ComB, [{
        key: 'componentWillMount',
        value: function componentWillMount() {}
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            this.timer = setInterval(function () {
                _this2.setState({
                    now: new Date().toLocaleTimeString()
                });
            }, 1000);
        }
    }, {
        key: 'componentWillUpdate',
        value: function componentWillUpdate() {}
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {}
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {}
    }, {
        key: 'render',
        value: function render() {
            return _React2.default.createElement(
                'div',
                null,
                _React2.default.createElement(
                    'span',
                    null,
                    this.props.name,
                    ':',
                    this.state.now
                )
            );
        }
    }]);

    return ComB;
}(_React2.default.Component);

//console.log('comb',ComB);

_ReactDOM2.default.render(_React2.default.createElement(
    'div',
    { className: 'wrap', onClick: function onClick(e) {
            alert(123);
        } },
    'hello ',
    _React2.default.createElement(
        'span',
        { style: { color: 'red' } },
        'world'
    ),
    _React2.default.createElement(ComA, { name: 'ComAName' }),
    _React2.default.createElement(ComB, { name: 'ComBName' })
), document.querySelector("#root"));
},{"./React.js":3,"./ReactDOM.js":4}],12:[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';

var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '63548' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
      // Clear the console after HMR
      console.clear();
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},[12,2], null)
//# sourceMappingURL=/src.6ecbcb51.map