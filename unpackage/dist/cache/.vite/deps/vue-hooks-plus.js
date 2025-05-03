import {
  __commonJS,
  __toESM
} from "./chunk-LQ2VYIYD.js";

// ../../../../Project/100ls-native/node_modules/screenfull/dist/screenfull.js
var require_screenfull = __commonJS({
  "../../../../Project/100ls-native/node_modules/screenfull/dist/screenfull.js"(exports2, module2) {
    (function() {
      "use strict";
      var document2 = typeof window !== "undefined" && typeof window.document !== "undefined" ? window.document : {};
      var isCommonjs = typeof module2 !== "undefined" && module2.exports;
      var fn = function() {
        var val;
        var fnMap = [
          [
            "requestFullscreen",
            "exitFullscreen",
            "fullscreenElement",
            "fullscreenEnabled",
            "fullscreenchange",
            "fullscreenerror"
          ],
          // New WebKit
          [
            "webkitRequestFullscreen",
            "webkitExitFullscreen",
            "webkitFullscreenElement",
            "webkitFullscreenEnabled",
            "webkitfullscreenchange",
            "webkitfullscreenerror"
          ],
          // Old WebKit
          [
            "webkitRequestFullScreen",
            "webkitCancelFullScreen",
            "webkitCurrentFullScreenElement",
            "webkitCancelFullScreen",
            "webkitfullscreenchange",
            "webkitfullscreenerror"
          ],
          [
            "mozRequestFullScreen",
            "mozCancelFullScreen",
            "mozFullScreenElement",
            "mozFullScreenEnabled",
            "mozfullscreenchange",
            "mozfullscreenerror"
          ],
          [
            "msRequestFullscreen",
            "msExitFullscreen",
            "msFullscreenElement",
            "msFullscreenEnabled",
            "MSFullscreenChange",
            "MSFullscreenError"
          ]
        ];
        var i = 0;
        var l = fnMap.length;
        var ret = {};
        for (; i < l; i++) {
          val = fnMap[i];
          if (val && val[1] in document2) {
            for (i = 0; i < val.length; i++) {
              ret[fnMap[0][i]] = val[i];
            }
            return ret;
          }
        }
        return false;
      }();
      var eventNameMap = {
        change: fn.fullscreenchange,
        error: fn.fullscreenerror
      };
      var screenfull2 = {
        request: function(element, options) {
          return new Promise((function(resolve, reject2) {
            var onFullScreenEntered = (function() {
              this.off("change", onFullScreenEntered);
              resolve();
            }).bind(this);
            this.on("change", onFullScreenEntered);
            element = element || document2.documentElement;
            var returnPromise = element[fn.requestFullscreen](options);
            if (returnPromise instanceof Promise) {
              returnPromise.then(onFullScreenEntered).catch(reject2);
            }
          }).bind(this));
        },
        exit: function() {
          return new Promise((function(resolve, reject2) {
            if (!this.isFullscreen) {
              resolve();
              return;
            }
            var onFullScreenExit = (function() {
              this.off("change", onFullScreenExit);
              resolve();
            }).bind(this);
            this.on("change", onFullScreenExit);
            var returnPromise = document2[fn.exitFullscreen]();
            if (returnPromise instanceof Promise) {
              returnPromise.then(onFullScreenExit).catch(reject2);
            }
          }).bind(this));
        },
        toggle: function(element, options) {
          return this.isFullscreen ? this.exit() : this.request(element, options);
        },
        onchange: function(callback) {
          this.on("change", callback);
        },
        onerror: function(callback) {
          this.on("error", callback);
        },
        on: function(event, callback) {
          var eventName = eventNameMap[event];
          if (eventName) {
            document2.addEventListener(eventName, callback, false);
          }
        },
        off: function(event, callback) {
          var eventName = eventNameMap[event];
          if (eventName) {
            document2.removeEventListener(eventName, callback, false);
          }
        },
        raw: fn
      };
      if (!fn) {
        if (isCommonjs) {
          module2.exports = { isEnabled: false };
        } else {
          window.screenfull = { isEnabled: false };
        }
        return;
      }
      Object.defineProperties(screenfull2, {
        isFullscreen: {
          get: function() {
            return Boolean(document2[fn.fullscreenElement]);
          }
        },
        element: {
          enumerable: true,
          get: function() {
            return document2[fn.fullscreenElement];
          }
        },
        isEnabled: {
          enumerable: true,
          get: function() {
            return Boolean(document2[fn.fullscreenEnabled]);
          }
        }
      });
      if (isCommonjs) {
        module2.exports = screenfull2;
      } else {
        window.screenfull = screenfull2;
      }
    })();
  }
});

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/useRequest/plugins/useAutoRunPlugin.js
import { ref, watchEffect, unref, watch } from "vue";
var useAutoRunPlugin = (fetchInstance, { manual, ready = true, refreshDeps = [], refreshDepsAction }) => {
  const hasAutoRun = ref(false);
  watchEffect(() => {
    if (!manual && fetchInstance.options.refreshDeps !== true) {
      hasAutoRun.value = unref(ready);
    }
  });
  if (refreshDeps instanceof Array)
    watch(
      [hasAutoRun, ...refreshDeps],
      ([autoRun]) => {
        if (!autoRun)
          return;
        if (!manual && autoRun) {
          if (refreshDepsAction) {
            refreshDepsAction();
          } else {
            fetchInstance.refresh();
          }
        }
      },
      {
        deep: true,
        immediate: false
      }
    );
  else
    watch(hasAutoRun, (h) => {
      if (!manual && h) {
        if (refreshDepsAction) {
          refreshDepsAction();
        } else {
          fetchInstance.refresh();
        }
      }
    });
  return {
    name: "autoRunPlugin",
    onBefore: () => {
      if (!unref(ready)) {
        return {
          stopNow: true
        };
      }
    }
  };
};
useAutoRunPlugin.onInit = ({ ready = true, manual }) => {
  return {
    loading: !manual && unref(ready)
  };
};

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/useRequest/plugins/useCachePlugin.js
import { ref as ref2, watchEffect as watchEffect2, onScopeDispose } from "vue";

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/useRequest/utils/cache.js
var cache = /* @__PURE__ */ new Map();
var setCache = (key, cacheTime, cachedData) => {
  const currentCache = cache.get(key);
  if (currentCache == null ? void 0 : currentCache.timer) {
    clearTimeout(currentCache.timer);
  }
  let timer = void 0;
  if (cacheTime > -1) {
    timer = setTimeout(() => {
      cache.delete(key);
    }, cacheTime);
  }
  cache.set(key, {
    ...cachedData,
    timer
  });
};
var getCache = (key) => {
  return cache.get(key);
};
var clearCache = (key) => {
  if (key) {
    const cacheKeys = Array.isArray(key) ? key : [key];
    cacheKeys.forEach((cacheKey) => cache.delete(cacheKey));
  } else {
    cache.clear();
  }
};

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/useRequest/utils/cachePromise.js
var cachePromise = /* @__PURE__ */ new Map();
var getCachePromise = (cacheKey) => {
  return cachePromise.get(cacheKey);
};
var setCachePromise = (cacheKey, promise) => {
  cachePromise.set(cacheKey, promise);
  promise.then((res) => {
    cachePromise.delete(cacheKey);
    return res;
  }).catch((err) => {
    cachePromise.delete(cacheKey);
    throw err;
  });
};

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/useRequest/utils/cacheSubscribe.js
var listeners = {};
var otherListeners = [];
var trigger = (key, data) => {
  if (listeners[key]) {
    listeners[key].forEach((item) => item(data));
    otherListeners.forEach((item) => item({
      type: key,
      data
    }));
  }
};
var subscribe = (key, listener) => {
  if (!listeners[key]) {
    listeners[key] = [];
  }
  listeners[key].push(listener);
  return function unsubscribe() {
    const index2 = listeners[key].indexOf(listener);
    listeners[key].splice(index2, 1);
  };
};

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/useRequest/plugins/useCachePlugin.js
var useCachePlugin = (fetchInstance, {
  cacheKey,
  cacheTime = 5 * 60 * 1e3,
  staleTime = 0,
  setCache: customSetCache,
  getCache: customGetCache
}) => {
  const unSubscribeRef = ref2();
  const currentPromiseRef = ref2();
  const _setCache = (key, cachedData) => {
    if (customSetCache) {
      customSetCache(cachedData);
    } else {
      setCache(key, cacheTime, cachedData);
    }
    trigger(key, cachedData.data);
  };
  const _getCache = (key, params = []) => {
    if (customGetCache) {
      return customGetCache(params);
    }
    return getCache(key);
  };
  watchEffect2(() => {
    if (!cacheKey) {
      return;
    }
    const cacheData = _getCache(cacheKey);
    if (cacheData && Object.hasOwnProperty.call(cacheData, "data")) {
      fetchInstance.state.data = cacheData.data;
      fetchInstance.state.params = cacheData.params;
      if (staleTime === -1 || (/* @__PURE__ */ new Date()).getTime() - cacheData.time <= staleTime) {
        fetchInstance.state.loading = false;
      }
    }
    unSubscribeRef.value = subscribe(cacheKey, (data) => {
      fetchInstance.setState({ data });
    });
  });
  onScopeDispose(() => {
    var _a25;
    (_a25 = unSubscribeRef.value) == null ? void 0 : _a25.call(unSubscribeRef);
  });
  if (!cacheKey) {
    return {};
  }
  return {
    name: "cachePlugin",
    onBefore: (params) => {
      const cacheData = _getCache(cacheKey, params);
      if (!cacheData || !Object.hasOwnProperty.call(cacheData, "data")) {
        return {};
      }
      if (staleTime === -1 || (/* @__PURE__ */ new Date()).getTime() - cacheData.time <= staleTime) {
        return {
          loading: false,
          data: cacheData == null ? void 0 : cacheData.data,
          returnNow: true
        };
      } else {
        return {
          data: cacheData == null ? void 0 : cacheData.data
        };
      }
    },
    onRequest: (service, args) => {
      let servicePromise = getCachePromise(cacheKey);
      if (servicePromise && servicePromise !== currentPromiseRef.value) {
        return { servicePromise };
      }
      servicePromise = service(...args);
      currentPromiseRef.value = servicePromise;
      setCachePromise(cacheKey, servicePromise);
      return { servicePromise };
    },
    onSuccess: (data, params) => {
      var _a25;
      if (cacheKey) {
        (_a25 = unSubscribeRef.value) == null ? void 0 : _a25.call(unSubscribeRef);
        _setCache(cacheKey, {
          data,
          params,
          time: (/* @__PURE__ */ new Date()).getTime()
        });
        unSubscribeRef.value = subscribe(cacheKey, (d) => {
          fetchInstance.setState({ data: d });
        });
      }
    },
    onMutate: (data) => {
      var _a25;
      if (cacheKey) {
        (_a25 = unSubscribeRef.value) == null ? void 0 : _a25.call(unSubscribeRef);
        _setCache(cacheKey, {
          data,
          params: fetchInstance.state.params,
          time: (/* @__PURE__ */ new Date()).getTime()
        });
        unSubscribeRef.value = subscribe(cacheKey, (d) => {
          fetchInstance.setState({ data: d });
        });
      }
    }
  };
};

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/useRequest/plugins/useDebouncePlugin.js
import { ref as ref3, computed, unref as unref2, watchEffect as watchEffect3 } from "vue";

// ../../../../Project/100ls-native/node_modules/lodash-es/isObject.js
function isObject(value) {
  var type = typeof value;
  return value != null && (type == "object" || type == "function");
}
var isObject_default = isObject;

// ../../../../Project/100ls-native/node_modules/lodash-es/_freeGlobal.js
var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
var freeGlobal_default = freeGlobal;

// ../../../../Project/100ls-native/node_modules/lodash-es/_root.js
var freeSelf = typeof self == "object" && self && self.Object === Object && self;
var root = freeGlobal_default || freeSelf || Function("return this")();
var root_default = root;

// ../../../../Project/100ls-native/node_modules/lodash-es/now.js
var now = function() {
  return root_default.Date.now();
};
var now_default = now;

// ../../../../Project/100ls-native/node_modules/lodash-es/_trimmedEndIndex.js
var reWhitespace = /\s/;
function trimmedEndIndex(string) {
  var index2 = string.length;
  while (index2-- && reWhitespace.test(string.charAt(index2))) {
  }
  return index2;
}
var trimmedEndIndex_default = trimmedEndIndex;

// ../../../../Project/100ls-native/node_modules/lodash-es/_baseTrim.js
var reTrimStart = /^\s+/;
function baseTrim(string) {
  return string ? string.slice(0, trimmedEndIndex_default(string) + 1).replace(reTrimStart, "") : string;
}
var baseTrim_default = baseTrim;

// ../../../../Project/100ls-native/node_modules/lodash-es/_Symbol.js
var Symbol2 = root_default.Symbol;
var Symbol_default = Symbol2;

// ../../../../Project/100ls-native/node_modules/lodash-es/_getRawTag.js
var objectProto = Object.prototype;
var hasOwnProperty = objectProto.hasOwnProperty;
var nativeObjectToString = objectProto.toString;
var symToStringTag = Symbol_default ? Symbol_default.toStringTag : void 0;
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
  try {
    value[symToStringTag] = void 0;
    var unmasked = true;
  } catch (e) {
  }
  var result2 = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result2;
}
var getRawTag_default = getRawTag;

// ../../../../Project/100ls-native/node_modules/lodash-es/_objectToString.js
var objectProto2 = Object.prototype;
var nativeObjectToString2 = objectProto2.toString;
function objectToString(value) {
  return nativeObjectToString2.call(value);
}
var objectToString_default = objectToString;

// ../../../../Project/100ls-native/node_modules/lodash-es/_baseGetTag.js
var nullTag = "[object Null]";
var undefinedTag = "[object Undefined]";
var symToStringTag2 = Symbol_default ? Symbol_default.toStringTag : void 0;
function baseGetTag(value) {
  if (value == null) {
    return value === void 0 ? undefinedTag : nullTag;
  }
  return symToStringTag2 && symToStringTag2 in Object(value) ? getRawTag_default(value) : objectToString_default(value);
}
var baseGetTag_default = baseGetTag;

// ../../../../Project/100ls-native/node_modules/lodash-es/isObjectLike.js
function isObjectLike(value) {
  return value != null && typeof value == "object";
}
var isObjectLike_default = isObjectLike;

// ../../../../Project/100ls-native/node_modules/lodash-es/isSymbol.js
var symbolTag = "[object Symbol]";
function isSymbol(value) {
  return typeof value == "symbol" || isObjectLike_default(value) && baseGetTag_default(value) == symbolTag;
}
var isSymbol_default = isSymbol;

// ../../../../Project/100ls-native/node_modules/lodash-es/toNumber.js
var NAN = 0 / 0;
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
var reIsBinary = /^0b[01]+$/i;
var reIsOctal = /^0o[0-7]+$/i;
var freeParseInt = parseInt;
function toNumber(value) {
  if (typeof value == "number") {
    return value;
  }
  if (isSymbol_default(value)) {
    return NAN;
  }
  if (isObject_default(value)) {
    var other = typeof value.valueOf == "function" ? value.valueOf() : value;
    value = isObject_default(other) ? other + "" : other;
  }
  if (typeof value != "string") {
    return value === 0 ? value : +value;
  }
  value = baseTrim_default(value);
  var isBinary = reIsBinary.test(value);
  return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
}
var toNumber_default = toNumber;

// ../../../../Project/100ls-native/node_modules/lodash-es/debounce.js
var FUNC_ERROR_TEXT = "Expected a function";
var nativeMax = Math.max;
var nativeMin = Math.min;
function debounce(func, wait, options) {
  var lastArgs, lastThis, maxWait, result2, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
  if (typeof func != "function") {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber_default(wait) || 0;
  if (isObject_default(options)) {
    leading = !!options.leading;
    maxing = "maxWait" in options;
    maxWait = maxing ? nativeMax(toNumber_default(options.maxWait) || 0, wait) : maxWait;
    trailing = "trailing" in options ? !!options.trailing : trailing;
  }
  function invokeFunc(time) {
    var args = lastArgs, thisArg = lastThis;
    lastArgs = lastThis = void 0;
    lastInvokeTime = time;
    result2 = func.apply(thisArg, args);
    return result2;
  }
  function leadingEdge(time) {
    lastInvokeTime = time;
    timerId = setTimeout(timerExpired, wait);
    return leading ? invokeFunc(time) : result2;
  }
  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, timeWaiting = wait - timeSinceLastCall;
    return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
  }
  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
    return lastCallTime === void 0 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
  }
  function timerExpired() {
    var time = now_default();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    timerId = setTimeout(timerExpired, remainingWait(time));
  }
  function trailingEdge(time) {
    timerId = void 0;
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = void 0;
    return result2;
  }
  function cancel() {
    if (timerId !== void 0) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = void 0;
  }
  function flush() {
    return timerId === void 0 ? result2 : trailingEdge(now_default());
  }
  function debounced() {
    var time = now_default(), isInvoking = shouldInvoke(time);
    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;
    if (isInvoking) {
      if (timerId === void 0) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        clearTimeout(timerId);
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === void 0) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result2;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}
var debounce_default = debounce;

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/useRequest/plugins/useDebouncePlugin.js
var useDebouncePlugin = (fetchInstance, { debounceWait, debounceLeading, debounceTrailing, debounceMaxWait }) => {
  const debouncedRef = ref3();
  const options = computed(() => {
    const ret = {};
    const debounceLeading_ = unref2(debounceLeading);
    const debounceTrailing_ = unref2(debounceTrailing);
    const debounceMaxWait_ = unref2(debounceMaxWait);
    if (debounceLeading_ !== void 0) {
      ret.leading = debounceLeading_;
    }
    if (debounceTrailing_ !== void 0) {
      ret.trailing = debounceTrailing_;
    }
    if (debounceMaxWait_ !== void 0) {
      ret.maxWait = debounceMaxWait_;
    }
    return ret;
  });
  watchEffect3((onInvalidate) => {
    if (unref2(debounceWait)) {
      const _originRunAsync = fetchInstance.runAsync.bind(fetchInstance);
      debouncedRef.value = debounce_default(
        (callback) => {
          callback();
        },
        unref2(debounceWait),
        options.value
      );
      fetchInstance.runAsync = (...args) => {
        return new Promise((resolve, reject2) => {
          var _a25;
          (_a25 = debouncedRef.value) == null ? void 0 : _a25.call(debouncedRef, () => {
            _originRunAsync(...args).then(resolve).catch(reject2);
          });
        });
      };
      onInvalidate(() => {
        var _a25;
        (_a25 = debouncedRef.value) == null ? void 0 : _a25.cancel();
        fetchInstance.runAsync = _originRunAsync;
      });
    }
  });
  if (!unref2(debounceWait)) {
    return {};
  }
  return {
    name: "debouncePlugin",
    onCancel: () => {
      var _a25;
      (_a25 = debouncedRef.value) == null ? void 0 : _a25.cancel();
    }
  };
};

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/useRequest/plugins/useDevtoolsPlugin.js
import { computed as computed2, unref as unref3, watchEffect as watchEffect4 } from "vue";

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/useRequest/devtools/utils.js
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var HashTable = class {
  constructor() {
    __publicField(this, "table", {});
    __publicField(this, "hashTable", {});
  }
  insert(str) {
    const symbolCode = Symbol(str);
    this.table[str] = true;
    this.hashTable[symbolCode] = str;
    return symbolCode;
  }
  find(symbolCode) {
    return this.hashTable[symbolCode];
  }
};
var HashTableInstance = new HashTable();
function getFunctionName(func) {
  const funcString = func.toString();
  const match = funcString.match(/^function\s+([^\s(]+)/);
  return match ? match[1] : "";
}
function getArrowFunctionName(func) {
  const funcString = func.toString();
  const regex = /([a-zA-Z$_][a-zA-Z0-9$_]*)\s*\(/;
  const match = funcString.match(regex);
  return match ? match[1].trim() : "";
}
function getRequestTagBg(type) {
  if (type === "pending")
    return 16747520;
  if (type === "done")
    return 6586111;
  if (type === "error")
    return 16724736;
  if (type === "cancel")
    return 10500409;
  if (type === "mutate")
    return 27647;
  return 4873398;
}

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/useRequest/devtools/store.js
var __defProp2 = Object.defineProperty;
var __defNormalProp2 = (obj, key, value) => key in obj ? __defProp2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField2 = (obj, key, value) => {
  __defNormalProp2(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var RegisterDevToolsStore = class {
  constructor() {
    __publicField2(this, "requestInstances", /* @__PURE__ */ new Map());
    __publicField2(this, "listeners", []);
  }
  emit(payload) {
    this.listeners.forEach((item) => item(payload));
  }
  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      const index2 = this.listeners.indexOf(listener);
      this.listeners.splice(index2, 1);
    };
  }
  insert(key, payload) {
    this.requestInstances.set(key, { ...payload });
    this.emit({
      key,
      ...payload
    });
  }
  update(key, payload) {
    if (this.has(key)) {
      this.requestInstances.set(key, { ...this.requestInstances.get(key), ...payload });
    }
  }
  has(key) {
    return this.requestInstances.has(key);
  }
  reset(key) {
    if (this.requestInstances.has(key)) {
      const current = this.requestInstances.get(key);
      this.requestInstances.clear();
      this.insert(key, current);
    } else
      this.requestInstances.clear();
  }
  getAll() {
    return this.requestInstances;
  }
};
var devToolsStore = new RegisterDevToolsStore();

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/useRequest/plugins/useDevtoolsPlugin.js
var useDevtoolsPlugin = (fetchInstance, { ready = true, debugKey, ...rest2 }) => {
  const createDevTarget = () => {
    if (debugKey && !devToolsStore.has(debugKey)) {
      const functionName = fetchInstance.serviceRef.value.toString().includes("function") ? getFunctionName(fetchInstance.serviceRef.value.toString()) : getArrowFunctionName(fetchInstance.serviceRef.value.toString());
      devToolsStore.insert(debugKey, {
        instance: fetchInstance,
        requestName: functionName,
        time: Date.now()
      });
    }
  };
  const processObj = computed2(
    () => Object.fromEntries(
      Object.entries({ ready, ...rest2 }).map(([key, value]) => [key, unref3(value)])
    )
  );
  watchEffect4(() => {
    if (debugKey && devToolsStore.has(debugKey)) {
      devToolsStore.emit({
        ...fetchInstance,
        options: { ...fetchInstance.options, ...processObj.value }
      });
    }
  });
  return {
    name: "devtoolsPlugin",
    onBefore: (params) => {
      createDevTarget();
      if (debugKey && devToolsStore.has(debugKey))
        devToolsStore.emit({
          ...fetchInstance.state,
          key: debugKey,
          params,
          loading: true,
          time: Date.now(),
          type: "pending"
        });
    },
    onSuccess(data, params) {
      createDevTarget();
      if (debugKey && devToolsStore.has(debugKey))
        devToolsStore.emit({
          ...fetchInstance.state,
          key: debugKey,
          data,
          params,
          loading: false,
          time: Date.now(),
          type: "done"
        });
    },
    onCancel() {
      createDevTarget();
      if (debugKey && devToolsStore.has(debugKey))
        devToolsStore.emit({
          ...fetchInstance.state,
          key: debugKey,
          loading: false,
          time: Date.now(),
          type: "cancel"
        });
    },
    onError(e, params) {
      createDevTarget();
      if (debugKey && devToolsStore.has(debugKey))
        devToolsStore.emit({
          ...fetchInstance.state,
          key: debugKey,
          params,
          loading: false,
          error: e,
          time: Date.now(),
          type: "error"
        });
    },
    onMutate(data) {
      createDevTarget();
      if (debugKey && devToolsStore.has(debugKey))
        devToolsStore.emit({
          ...fetchInstance.state,
          key: debugKey,
          data,
          loading: false,
          time: Date.now(),
          type: "mutate"
        });
    }
  };
};

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/useRequest/plugins/useLoadingDelayPlugin.js
import { ref as ref4, unref as unref4 } from "vue";
var useLoadingDelayPlugin = (inst, { loadingDelay }) => {
  const delayRef = ref4();
  const clear = () => {
    if (delayRef.value) {
      clearTimeout(unref4(delayRef.value));
      delayRef.value = void 0;
    }
  };
  return {
    name: "loadingDelayPlugin",
    onFinally: () => {
      clear();
      const delay2 = unref4(loadingDelay);
      if (delay2) {
        inst.setState({
          loading: true
        });
        delayRef.value = setTimeout(() => {
          inst.setState({
            loading: false
          });
        }, delay2);
      }
    },
    onError: () => {
      clear();
    }
  };
};

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/useRequest/plugins/usePollingPlugin.js
import { ref as ref5, watchEffect as watchEffect5, unref as unref5 } from "vue";

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/useRequest/utils/utils.js
function canUseDom() {
  return !!(typeof window !== "undefined" && window.document && window.document.createElement);
}
var isBrowser = !!(typeof window !== "undefined" && window.document && window.document.createElement);

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/useRequest/utils/isDocumentVisible.js
function isDocumentVisible() {
  if (canUseDom()) {
    return document.visibilityState !== "hidden";
  }
  return true;
}

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/useRequest/utils/subscribeReVisible.js
var listeners2 = [];
function subscribe2(listener) {
  listeners2.push(listener);
  return function unsubscribe() {
    const index2 = listeners2.indexOf(listener);
    listeners2.splice(index2, 1);
  };
}
if (canUseDom()) {
  const revalidate = () => {
    if (!isDocumentVisible())
      return;
    for (let i = 0; i < listeners2.length; i++) {
      const listener = listeners2[i];
      listener();
    }
  };
  window.addEventListener("visibilitychange", revalidate, false);
}

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/useRequest/plugins/usePollingPlugin.js
var usePollingPlugin = (fetchInstance, { pollingInterval, pollingWhenHidden = true, pollingErrorRetryCount = -1 }) => {
  let timeouter;
  const unsubscribeRef = ref5();
  const countRef = ref5(0);
  const stopPolling = () => {
    var _a25;
    if (timeouter) {
      clearTimeout(timeouter);
    }
    (_a25 = unsubscribeRef.value) == null ? void 0 : _a25.call(unsubscribeRef);
  };
  watchEffect5(() => {
    if (!unref5(pollingInterval)) {
      stopPolling();
    }
  });
  if (!unref5(pollingInterval)) {
    return {};
  }
  return {
    name: "pollingPlugin",
    onBefore: () => {
      stopPolling();
    },
    onError: () => {
      countRef.value += 1;
    },
    onSuccess: () => {
      countRef.value = 0;
    },
    onFinally: () => {
      if (pollingErrorRetryCount === -1 || pollingErrorRetryCount !== -1 && countRef.value <= pollingErrorRetryCount) {
        timeouter = setTimeout(() => {
          if (!pollingWhenHidden && !isDocumentVisible()) {
            unsubscribeRef.value = subscribe2(() => {
              fetchInstance.refresh();
            });
          } else {
            fetchInstance.refresh();
          }
        }, unref5(pollingInterval));
      } else {
        countRef.value = 0;
      }
    },
    onCancel: () => {
      stopPolling();
    }
  };
};

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/useRequest/plugins/useRefreshOnWindowFocusPlugin.js
import { ref as ref6, watchEffect as watchEffect6, unref as unref6, onScopeDispose as onScopeDispose2 } from "vue";

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/useRequest/utils/limit.js
function limit(fn, timespan) {
  let pending = false;
  return (...args) => {
    if (pending)
      return;
    pending = true;
    fn(...args);
    setTimeout(() => {
      pending = false;
    }, timespan);
  };
}

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/useRequest/utils/isOnline.js
function isOnline() {
  if (canUseDom() && typeof navigator.onLine !== "undefined") {
    return navigator.onLine;
  }
  return true;
}

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/useRequest/utils/subscribeFocus.js
var listeners3 = [];
function subscribe3(listener) {
  listeners3.push(listener);
  return function unsubscribe() {
    const index2 = listeners3.indexOf(listener);
    if (index2 > -1) {
      listeners3.splice(index2, 1);
    }
  };
}
if (isBrowser) {
  const revalidate = () => {
    if (!isDocumentVisible() || !isOnline())
      return;
    for (let i = 0; i < listeners3.length; i++) {
      const listener = listeners3[i];
      listener();
    }
  };
  window.addEventListener("visibilitychange", revalidate, false);
  window.addEventListener("focus", revalidate, false);
}

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/useRequest/plugins/useRefreshOnWindowFocusPlugin.js
var useRefreshOnWindowFocusPlugin = (fetchInstance, { refreshOnWindowFocus, focusTimespan = 5e3 }) => {
  const unsubscribeRef = ref6();
  const stopSubscribe = () => {
    var _a25;
    (_a25 = unsubscribeRef.value) == null ? void 0 : _a25.call(unsubscribeRef);
  };
  watchEffect6((onInvalidate) => {
    if (unref6(refreshOnWindowFocus)) {
      const limitRefresh = limit(
        fetchInstance.refresh.bind(fetchInstance),
        unref6(focusTimespan)
      );
      unsubscribeRef.value = subscribe3(() => {
        limitRefresh();
      });
    }
    onInvalidate(() => {
      stopSubscribe();
    });
  });
  onScopeDispose2(() => {
    stopSubscribe();
  });
  return {
    name: "refreshOnWindowFocusPlugin"
  };
};

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/useRequest/plugins/useRetryPlugin.js
import { ref as ref7 } from "vue";
var useRetryPlugin = (fetchInstance, { retryInterval, retryCount }) => {
  const timerRef = ref7();
  const countRef = ref7(0);
  const triggerByRetry = ref7(false);
  if (!retryCount) {
    return {};
  }
  return {
    name: "retryPlugin",
    onBefore: () => {
      if (!triggerByRetry.value) {
        countRef.value = 0;
      }
      triggerByRetry.value = false;
      if (timerRef.value) {
        clearTimeout(timerRef.value);
      }
    },
    onSuccess: () => {
      countRef.value = 0;
    },
    onError: () => {
      countRef.value += 1;
      if (retryCount === -1 || countRef.value <= retryCount) {
        const timeout = retryInterval != null ? retryInterval : Math.min(1e3 * 2 ** countRef.value, 3e4);
        timerRef.value = setTimeout(() => {
          triggerByRetry.value = true;
          fetchInstance.refresh();
        }, timeout);
      } else {
        countRef.value = 0;
      }
    },
    onCancel: () => {
      countRef.value = 0;
      if (timerRef.value) {
        clearTimeout(timerRef.value);
      }
    }
  };
};

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/useRequest/plugins/useThrottlePlugin.js
import { computed as computed3, unref as unref7, ref as ref8, watch as watch2, onUnmounted } from "vue";

// ../../../../Project/100ls-native/node_modules/lodash-es/_baseToNumber.js
var NAN2 = 0 / 0;
function baseToNumber(value) {
  if (typeof value == "number") {
    return value;
  }
  if (isSymbol_default(value)) {
    return NAN2;
  }
  return +value;
}
var baseToNumber_default = baseToNumber;

// ../../../../Project/100ls-native/node_modules/lodash-es/_arrayMap.js
function arrayMap(array, iteratee2) {
  var index2 = -1, length = array == null ? 0 : array.length, result2 = Array(length);
  while (++index2 < length) {
    result2[index2] = iteratee2(array[index2], index2, array);
  }
  return result2;
}
var arrayMap_default = arrayMap;

// ../../../../Project/100ls-native/node_modules/lodash-es/isArray.js
var isArray = Array.isArray;
var isArray_default = isArray;

// ../../../../Project/100ls-native/node_modules/lodash-es/_baseToString.js
var INFINITY = 1 / 0;
var symbolProto = Symbol_default ? Symbol_default.prototype : void 0;
var symbolToString = symbolProto ? symbolProto.toString : void 0;
function baseToString(value) {
  if (typeof value == "string") {
    return value;
  }
  if (isArray_default(value)) {
    return arrayMap_default(value, baseToString) + "";
  }
  if (isSymbol_default(value)) {
    return symbolToString ? symbolToString.call(value) : "";
  }
  var result2 = value + "";
  return result2 == "0" && 1 / value == -INFINITY ? "-0" : result2;
}
var baseToString_default = baseToString;

// ../../../../Project/100ls-native/node_modules/lodash-es/_createMathOperation.js
function createMathOperation(operator, defaultValue) {
  return function(value, other) {
    var result2;
    if (value === void 0 && other === void 0) {
      return defaultValue;
    }
    if (value !== void 0) {
      result2 = value;
    }
    if (other !== void 0) {
      if (result2 === void 0) {
        return other;
      }
      if (typeof value == "string" || typeof other == "string") {
        value = baseToString_default(value);
        other = baseToString_default(other);
      } else {
        value = baseToNumber_default(value);
        other = baseToNumber_default(other);
      }
      result2 = operator(value, other);
    }
    return result2;
  };
}
var createMathOperation_default = createMathOperation;

// ../../../../Project/100ls-native/node_modules/lodash-es/add.js
var add = createMathOperation_default(function(augend, addend) {
  return augend + addend;
}, 0);
var add_default = add;

// ../../../../Project/100ls-native/node_modules/lodash-es/toFinite.js
var INFINITY2 = 1 / 0;
var MAX_INTEGER = 17976931348623157e292;
function toFinite(value) {
  if (!value) {
    return value === 0 ? value : 0;
  }
  value = toNumber_default(value);
  if (value === INFINITY2 || value === -INFINITY2) {
    var sign = value < 0 ? -1 : 1;
    return sign * MAX_INTEGER;
  }
  return value === value ? value : 0;
}
var toFinite_default = toFinite;

// ../../../../Project/100ls-native/node_modules/lodash-es/toInteger.js
function toInteger(value) {
  var result2 = toFinite_default(value), remainder = result2 % 1;
  return result2 === result2 ? remainder ? result2 - remainder : result2 : 0;
}
var toInteger_default = toInteger;

// ../../../../Project/100ls-native/node_modules/lodash-es/after.js
var FUNC_ERROR_TEXT2 = "Expected a function";
function after(n, func) {
  if (typeof func != "function") {
    throw new TypeError(FUNC_ERROR_TEXT2);
  }
  n = toInteger_default(n);
  return function() {
    if (--n < 1) {
      return func.apply(this, arguments);
    }
  };
}
var after_default = after;

// ../../../../Project/100ls-native/node_modules/lodash-es/identity.js
function identity(value) {
  return value;
}
var identity_default = identity;

// ../../../../Project/100ls-native/node_modules/lodash-es/isFunction.js
var asyncTag = "[object AsyncFunction]";
var funcTag = "[object Function]";
var genTag = "[object GeneratorFunction]";
var proxyTag = "[object Proxy]";
function isFunction(value) {
  if (!isObject_default(value)) {
    return false;
  }
  var tag = baseGetTag_default(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}
var isFunction_default = isFunction;

// ../../../../Project/100ls-native/node_modules/lodash-es/_coreJsData.js
var coreJsData = root_default["__core-js_shared__"];
var coreJsData_default = coreJsData;

// ../../../../Project/100ls-native/node_modules/lodash-es/_isMasked.js
var maskSrcKey = function() {
  var uid = /[^.]+$/.exec(coreJsData_default && coreJsData_default.keys && coreJsData_default.keys.IE_PROTO || "");
  return uid ? "Symbol(src)_1." + uid : "";
}();
function isMasked(func) {
  return !!maskSrcKey && maskSrcKey in func;
}
var isMasked_default = isMasked;

// ../../../../Project/100ls-native/node_modules/lodash-es/_toSource.js
var funcProto = Function.prototype;
var funcToString = funcProto.toString;
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {
    }
    try {
      return func + "";
    } catch (e) {
    }
  }
  return "";
}
var toSource_default = toSource;

// ../../../../Project/100ls-native/node_modules/lodash-es/_baseIsNative.js
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
var reIsHostCtor = /^\[object .+?Constructor\]$/;
var funcProto2 = Function.prototype;
var objectProto3 = Object.prototype;
var funcToString2 = funcProto2.toString;
var hasOwnProperty2 = objectProto3.hasOwnProperty;
var reIsNative = RegExp(
  "^" + funcToString2.call(hasOwnProperty2).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function baseIsNative(value) {
  if (!isObject_default(value) || isMasked_default(value)) {
    return false;
  }
  var pattern = isFunction_default(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource_default(value));
}
var baseIsNative_default = baseIsNative;

// ../../../../Project/100ls-native/node_modules/lodash-es/_getValue.js
function getValue(object, key) {
  return object == null ? void 0 : object[key];
}
var getValue_default = getValue;

// ../../../../Project/100ls-native/node_modules/lodash-es/_getNative.js
function getNative(object, key) {
  var value = getValue_default(object, key);
  return baseIsNative_default(value) ? value : void 0;
}
var getNative_default = getNative;

// ../../../../Project/100ls-native/node_modules/lodash-es/_WeakMap.js
var WeakMap2 = getNative_default(root_default, "WeakMap");
var WeakMap_default = WeakMap2;

// ../../../../Project/100ls-native/node_modules/lodash-es/_metaMap.js
var metaMap = WeakMap_default && new WeakMap_default();
var metaMap_default = metaMap;

// ../../../../Project/100ls-native/node_modules/lodash-es/_baseSetData.js
var baseSetData = !metaMap_default ? identity_default : function(func, data) {
  metaMap_default.set(func, data);
  return func;
};
var baseSetData_default = baseSetData;

// ../../../../Project/100ls-native/node_modules/lodash-es/_baseCreate.js
var objectCreate = Object.create;
var baseCreate = /* @__PURE__ */ function() {
  function object() {
  }
  return function(proto) {
    if (!isObject_default(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = proto;
    var result2 = new object();
    object.prototype = void 0;
    return result2;
  };
}();
var baseCreate_default = baseCreate;

// ../../../../Project/100ls-native/node_modules/lodash-es/_createCtor.js
function createCtor(Ctor) {
  return function() {
    var args = arguments;
    switch (args.length) {
      case 0:
        return new Ctor();
      case 1:
        return new Ctor(args[0]);
      case 2:
        return new Ctor(args[0], args[1]);
      case 3:
        return new Ctor(args[0], args[1], args[2]);
      case 4:
        return new Ctor(args[0], args[1], args[2], args[3]);
      case 5:
        return new Ctor(args[0], args[1], args[2], args[3], args[4]);
      case 6:
        return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);
      case 7:
        return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
    }
    var thisBinding = baseCreate_default(Ctor.prototype), result2 = Ctor.apply(thisBinding, args);
    return isObject_default(result2) ? result2 : thisBinding;
  };
}
var createCtor_default = createCtor;

// ../../../../Project/100ls-native/node_modules/lodash-es/_createBind.js
var WRAP_BIND_FLAG = 1;
function createBind(func, bitmask, thisArg) {
  var isBind = bitmask & WRAP_BIND_FLAG, Ctor = createCtor_default(func);
  function wrapper() {
    var fn = this && this !== root_default && this instanceof wrapper ? Ctor : func;
    return fn.apply(isBind ? thisArg : this, arguments);
  }
  return wrapper;
}
var createBind_default = createBind;

// ../../../../Project/100ls-native/node_modules/lodash-es/_apply.js
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0:
      return func.call(thisArg);
    case 1:
      return func.call(thisArg, args[0]);
    case 2:
      return func.call(thisArg, args[0], args[1]);
    case 3:
      return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}
var apply_default = apply;

// ../../../../Project/100ls-native/node_modules/lodash-es/_composeArgs.js
var nativeMax2 = Math.max;
function composeArgs(args, partials, holders, isCurried) {
  var argsIndex = -1, argsLength = args.length, holdersLength = holders.length, leftIndex = -1, leftLength = partials.length, rangeLength = nativeMax2(argsLength - holdersLength, 0), result2 = Array(leftLength + rangeLength), isUncurried = !isCurried;
  while (++leftIndex < leftLength) {
    result2[leftIndex] = partials[leftIndex];
  }
  while (++argsIndex < holdersLength) {
    if (isUncurried || argsIndex < argsLength) {
      result2[holders[argsIndex]] = args[argsIndex];
    }
  }
  while (rangeLength--) {
    result2[leftIndex++] = args[argsIndex++];
  }
  return result2;
}
var composeArgs_default = composeArgs;

// ../../../../Project/100ls-native/node_modules/lodash-es/_composeArgsRight.js
var nativeMax3 = Math.max;
function composeArgsRight(args, partials, holders, isCurried) {
  var argsIndex = -1, argsLength = args.length, holdersIndex = -1, holdersLength = holders.length, rightIndex = -1, rightLength = partials.length, rangeLength = nativeMax3(argsLength - holdersLength, 0), result2 = Array(rangeLength + rightLength), isUncurried = !isCurried;
  while (++argsIndex < rangeLength) {
    result2[argsIndex] = args[argsIndex];
  }
  var offset = argsIndex;
  while (++rightIndex < rightLength) {
    result2[offset + rightIndex] = partials[rightIndex];
  }
  while (++holdersIndex < holdersLength) {
    if (isUncurried || argsIndex < argsLength) {
      result2[offset + holders[holdersIndex]] = args[argsIndex++];
    }
  }
  return result2;
}
var composeArgsRight_default = composeArgsRight;

// ../../../../Project/100ls-native/node_modules/lodash-es/_countHolders.js
function countHolders(array, placeholder) {
  var length = array.length, result2 = 0;
  while (length--) {
    if (array[length] === placeholder) {
      ++result2;
    }
  }
  return result2;
}
var countHolders_default = countHolders;

// ../../../../Project/100ls-native/node_modules/lodash-es/_baseLodash.js
function baseLodash() {
}
var baseLodash_default = baseLodash;

// ../../../../Project/100ls-native/node_modules/lodash-es/_LazyWrapper.js
var MAX_ARRAY_LENGTH = 4294967295;
function LazyWrapper(value) {
  this.__wrapped__ = value;
  this.__actions__ = [];
  this.__dir__ = 1;
  this.__filtered__ = false;
  this.__iteratees__ = [];
  this.__takeCount__ = MAX_ARRAY_LENGTH;
  this.__views__ = [];
}
LazyWrapper.prototype = baseCreate_default(baseLodash_default.prototype);
LazyWrapper.prototype.constructor = LazyWrapper;
var LazyWrapper_default = LazyWrapper;

// ../../../../Project/100ls-native/node_modules/lodash-es/noop.js
function noop() {
}
var noop_default = noop;

// ../../../../Project/100ls-native/node_modules/lodash-es/_getData.js
var getData = !metaMap_default ? noop_default : function(func) {
  return metaMap_default.get(func);
};
var getData_default = getData;

// ../../../../Project/100ls-native/node_modules/lodash-es/_realNames.js
var realNames = {};
var realNames_default = realNames;

// ../../../../Project/100ls-native/node_modules/lodash-es/_getFuncName.js
var objectProto4 = Object.prototype;
var hasOwnProperty3 = objectProto4.hasOwnProperty;
function getFuncName(func) {
  var result2 = func.name + "", array = realNames_default[result2], length = hasOwnProperty3.call(realNames_default, result2) ? array.length : 0;
  while (length--) {
    var data = array[length], otherFunc = data.func;
    if (otherFunc == null || otherFunc == func) {
      return data.name;
    }
  }
  return result2;
}
var getFuncName_default = getFuncName;

// ../../../../Project/100ls-native/node_modules/lodash-es/_LodashWrapper.js
function LodashWrapper(value, chainAll) {
  this.__wrapped__ = value;
  this.__actions__ = [];
  this.__chain__ = !!chainAll;
  this.__index__ = 0;
  this.__values__ = void 0;
}
LodashWrapper.prototype = baseCreate_default(baseLodash_default.prototype);
LodashWrapper.prototype.constructor = LodashWrapper;
var LodashWrapper_default = LodashWrapper;

// ../../../../Project/100ls-native/node_modules/lodash-es/_copyArray.js
function copyArray(source, array) {
  var index2 = -1, length = source.length;
  array || (array = Array(length));
  while (++index2 < length) {
    array[index2] = source[index2];
  }
  return array;
}
var copyArray_default = copyArray;

// ../../../../Project/100ls-native/node_modules/lodash-es/_wrapperClone.js
function wrapperClone(wrapper) {
  if (wrapper instanceof LazyWrapper_default) {
    return wrapper.clone();
  }
  var result2 = new LodashWrapper_default(wrapper.__wrapped__, wrapper.__chain__);
  result2.__actions__ = copyArray_default(wrapper.__actions__);
  result2.__index__ = wrapper.__index__;
  result2.__values__ = wrapper.__values__;
  return result2;
}
var wrapperClone_default = wrapperClone;

// ../../../../Project/100ls-native/node_modules/lodash-es/wrapperLodash.js
var objectProto5 = Object.prototype;
var hasOwnProperty4 = objectProto5.hasOwnProperty;
function lodash(value) {
  if (isObjectLike_default(value) && !isArray_default(value) && !(value instanceof LazyWrapper_default)) {
    if (value instanceof LodashWrapper_default) {
      return value;
    }
    if (hasOwnProperty4.call(value, "__wrapped__")) {
      return wrapperClone_default(value);
    }
  }
  return new LodashWrapper_default(value);
}
lodash.prototype = baseLodash_default.prototype;
lodash.prototype.constructor = lodash;
var wrapperLodash_default = lodash;

// ../../../../Project/100ls-native/node_modules/lodash-es/_isLaziable.js
function isLaziable(func) {
  var funcName = getFuncName_default(func), other = wrapperLodash_default[funcName];
  if (typeof other != "function" || !(funcName in LazyWrapper_default.prototype)) {
    return false;
  }
  if (func === other) {
    return true;
  }
  var data = getData_default(other);
  return !!data && func === data[0];
}
var isLaziable_default = isLaziable;

// ../../../../Project/100ls-native/node_modules/lodash-es/_shortOut.js
var HOT_COUNT = 800;
var HOT_SPAN = 16;
var nativeNow = Date.now;
function shortOut(func) {
  var count = 0, lastCalled = 0;
  return function() {
    var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(void 0, arguments);
  };
}
var shortOut_default = shortOut;

// ../../../../Project/100ls-native/node_modules/lodash-es/_setData.js
var setData = shortOut_default(baseSetData_default);
var setData_default = setData;

// ../../../../Project/100ls-native/node_modules/lodash-es/_getWrapDetails.js
var reWrapDetails = /\{\n\/\* \[wrapped with (.+)\] \*/;
var reSplitDetails = /,? & /;
function getWrapDetails(source) {
  var match = source.match(reWrapDetails);
  return match ? match[1].split(reSplitDetails) : [];
}
var getWrapDetails_default = getWrapDetails;

// ../../../../Project/100ls-native/node_modules/lodash-es/_insertWrapDetails.js
var reWrapComment = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/;
function insertWrapDetails(source, details) {
  var length = details.length;
  if (!length) {
    return source;
  }
  var lastIndex = length - 1;
  details[lastIndex] = (length > 1 ? "& " : "") + details[lastIndex];
  details = details.join(length > 2 ? ", " : " ");
  return source.replace(reWrapComment, "{\n/* [wrapped with " + details + "] */\n");
}
var insertWrapDetails_default = insertWrapDetails;

// ../../../../Project/100ls-native/node_modules/lodash-es/constant.js
function constant(value) {
  return function() {
    return value;
  };
}
var constant_default = constant;

// ../../../../Project/100ls-native/node_modules/lodash-es/_defineProperty.js
var defineProperty = function() {
  try {
    var func = getNative_default(Object, "defineProperty");
    func({}, "", {});
    return func;
  } catch (e) {
  }
}();
var defineProperty_default = defineProperty;

// ../../../../Project/100ls-native/node_modules/lodash-es/_baseSetToString.js
var baseSetToString = !defineProperty_default ? identity_default : function(func, string) {
  return defineProperty_default(func, "toString", {
    "configurable": true,
    "enumerable": false,
    "value": constant_default(string),
    "writable": true
  });
};
var baseSetToString_default = baseSetToString;

// ../../../../Project/100ls-native/node_modules/lodash-es/_setToString.js
var setToString = shortOut_default(baseSetToString_default);
var setToString_default = setToString;

// ../../../../Project/100ls-native/node_modules/lodash-es/_arrayEach.js
function arrayEach(array, iteratee2) {
  var index2 = -1, length = array == null ? 0 : array.length;
  while (++index2 < length) {
    if (iteratee2(array[index2], index2, array) === false) {
      break;
    }
  }
  return array;
}
var arrayEach_default = arrayEach;

// ../../../../Project/100ls-native/node_modules/lodash-es/_baseFindIndex.js
function baseFindIndex(array, predicate, fromIndex, fromRight) {
  var length = array.length, index2 = fromIndex + (fromRight ? 1 : -1);
  while (fromRight ? index2-- : ++index2 < length) {
    if (predicate(array[index2], index2, array)) {
      return index2;
    }
  }
  return -1;
}
var baseFindIndex_default = baseFindIndex;

// ../../../../Project/100ls-native/node_modules/lodash-es/_baseIsNaN.js
function baseIsNaN(value) {
  return value !== value;
}
var baseIsNaN_default = baseIsNaN;

// ../../../../Project/100ls-native/node_modules/lodash-es/_strictIndexOf.js
function strictIndexOf(array, value, fromIndex) {
  var index2 = fromIndex - 1, length = array.length;
  while (++index2 < length) {
    if (array[index2] === value) {
      return index2;
    }
  }
  return -1;
}
var strictIndexOf_default = strictIndexOf;

// ../../../../Project/100ls-native/node_modules/lodash-es/_baseIndexOf.js
function baseIndexOf(array, value, fromIndex) {
  return value === value ? strictIndexOf_default(array, value, fromIndex) : baseFindIndex_default(array, baseIsNaN_default, fromIndex);
}
var baseIndexOf_default = baseIndexOf;

// ../../../../Project/100ls-native/node_modules/lodash-es/_arrayIncludes.js
function arrayIncludes(array, value) {
  var length = array == null ? 0 : array.length;
  return !!length && baseIndexOf_default(array, value, 0) > -1;
}
var arrayIncludes_default = arrayIncludes;

// ../../../../Project/100ls-native/node_modules/lodash-es/_updateWrapDetails.js
var WRAP_BIND_FLAG2 = 1;
var WRAP_BIND_KEY_FLAG = 2;
var WRAP_CURRY_FLAG = 8;
var WRAP_CURRY_RIGHT_FLAG = 16;
var WRAP_PARTIAL_FLAG = 32;
var WRAP_PARTIAL_RIGHT_FLAG = 64;
var WRAP_ARY_FLAG = 128;
var WRAP_REARG_FLAG = 256;
var WRAP_FLIP_FLAG = 512;
var wrapFlags = [
  ["ary", WRAP_ARY_FLAG],
  ["bind", WRAP_BIND_FLAG2],
  ["bindKey", WRAP_BIND_KEY_FLAG],
  ["curry", WRAP_CURRY_FLAG],
  ["curryRight", WRAP_CURRY_RIGHT_FLAG],
  ["flip", WRAP_FLIP_FLAG],
  ["partial", WRAP_PARTIAL_FLAG],
  ["partialRight", WRAP_PARTIAL_RIGHT_FLAG],
  ["rearg", WRAP_REARG_FLAG]
];
function updateWrapDetails(details, bitmask) {
  arrayEach_default(wrapFlags, function(pair) {
    var value = "_." + pair[0];
    if (bitmask & pair[1] && !arrayIncludes_default(details, value)) {
      details.push(value);
    }
  });
  return details.sort();
}
var updateWrapDetails_default = updateWrapDetails;

// ../../../../Project/100ls-native/node_modules/lodash-es/_setWrapToString.js
function setWrapToString(wrapper, reference, bitmask) {
  var source = reference + "";
  return setToString_default(wrapper, insertWrapDetails_default(source, updateWrapDetails_default(getWrapDetails_default(source), bitmask)));
}
var setWrapToString_default = setWrapToString;

// ../../../../Project/100ls-native/node_modules/lodash-es/_createRecurry.js
var WRAP_BIND_FLAG3 = 1;
var WRAP_BIND_KEY_FLAG2 = 2;
var WRAP_CURRY_BOUND_FLAG = 4;
var WRAP_CURRY_FLAG2 = 8;
var WRAP_PARTIAL_FLAG2 = 32;
var WRAP_PARTIAL_RIGHT_FLAG2 = 64;
function createRecurry(func, bitmask, wrapFunc, placeholder, thisArg, partials, holders, argPos, ary2, arity) {
  var isCurry = bitmask & WRAP_CURRY_FLAG2, newHolders = isCurry ? holders : void 0, newHoldersRight = isCurry ? void 0 : holders, newPartials = isCurry ? partials : void 0, newPartialsRight = isCurry ? void 0 : partials;
  bitmask |= isCurry ? WRAP_PARTIAL_FLAG2 : WRAP_PARTIAL_RIGHT_FLAG2;
  bitmask &= ~(isCurry ? WRAP_PARTIAL_RIGHT_FLAG2 : WRAP_PARTIAL_FLAG2);
  if (!(bitmask & WRAP_CURRY_BOUND_FLAG)) {
    bitmask &= ~(WRAP_BIND_FLAG3 | WRAP_BIND_KEY_FLAG2);
  }
  var newData = [
    func,
    bitmask,
    thisArg,
    newPartials,
    newHolders,
    newPartialsRight,
    newHoldersRight,
    argPos,
    ary2,
    arity
  ];
  var result2 = wrapFunc.apply(void 0, newData);
  if (isLaziable_default(func)) {
    setData_default(result2, newData);
  }
  result2.placeholder = placeholder;
  return setWrapToString_default(result2, func, bitmask);
}
var createRecurry_default = createRecurry;

// ../../../../Project/100ls-native/node_modules/lodash-es/_getHolder.js
function getHolder(func) {
  var object = func;
  return object.placeholder;
}
var getHolder_default = getHolder;

// ../../../../Project/100ls-native/node_modules/lodash-es/_isIndex.js
var MAX_SAFE_INTEGER = 9007199254740991;
var reIsUint = /^(?:0|[1-9]\d*)$/;
function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
}
var isIndex_default = isIndex;

// ../../../../Project/100ls-native/node_modules/lodash-es/_reorder.js
var nativeMin2 = Math.min;
function reorder(array, indexes) {
  var arrLength = array.length, length = nativeMin2(indexes.length, arrLength), oldArray = copyArray_default(array);
  while (length--) {
    var index2 = indexes[length];
    array[length] = isIndex_default(index2, arrLength) ? oldArray[index2] : void 0;
  }
  return array;
}
var reorder_default = reorder;

// ../../../../Project/100ls-native/node_modules/lodash-es/_replaceHolders.js
var PLACEHOLDER = "__lodash_placeholder__";
function replaceHolders(array, placeholder) {
  var index2 = -1, length = array.length, resIndex = 0, result2 = [];
  while (++index2 < length) {
    var value = array[index2];
    if (value === placeholder || value === PLACEHOLDER) {
      array[index2] = PLACEHOLDER;
      result2[resIndex++] = index2;
    }
  }
  return result2;
}
var replaceHolders_default = replaceHolders;

// ../../../../Project/100ls-native/node_modules/lodash-es/_createHybrid.js
var WRAP_BIND_FLAG4 = 1;
var WRAP_BIND_KEY_FLAG3 = 2;
var WRAP_CURRY_FLAG3 = 8;
var WRAP_CURRY_RIGHT_FLAG2 = 16;
var WRAP_ARY_FLAG2 = 128;
var WRAP_FLIP_FLAG2 = 512;
function createHybrid(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary2, arity) {
  var isAry = bitmask & WRAP_ARY_FLAG2, isBind = bitmask & WRAP_BIND_FLAG4, isBindKey = bitmask & WRAP_BIND_KEY_FLAG3, isCurried = bitmask & (WRAP_CURRY_FLAG3 | WRAP_CURRY_RIGHT_FLAG2), isFlip = bitmask & WRAP_FLIP_FLAG2, Ctor = isBindKey ? void 0 : createCtor_default(func);
  function wrapper() {
    var length = arguments.length, args = Array(length), index2 = length;
    while (index2--) {
      args[index2] = arguments[index2];
    }
    if (isCurried) {
      var placeholder = getHolder_default(wrapper), holdersCount = countHolders_default(args, placeholder);
    }
    if (partials) {
      args = composeArgs_default(args, partials, holders, isCurried);
    }
    if (partialsRight) {
      args = composeArgsRight_default(args, partialsRight, holdersRight, isCurried);
    }
    length -= holdersCount;
    if (isCurried && length < arity) {
      var newHolders = replaceHolders_default(args, placeholder);
      return createRecurry_default(
        func,
        bitmask,
        createHybrid,
        wrapper.placeholder,
        thisArg,
        args,
        newHolders,
        argPos,
        ary2,
        arity - length
      );
    }
    var thisBinding = isBind ? thisArg : this, fn = isBindKey ? thisBinding[func] : func;
    length = args.length;
    if (argPos) {
      args = reorder_default(args, argPos);
    } else if (isFlip && length > 1) {
      args.reverse();
    }
    if (isAry && ary2 < length) {
      args.length = ary2;
    }
    if (this && this !== root_default && this instanceof wrapper) {
      fn = Ctor || createCtor_default(fn);
    }
    return fn.apply(thisBinding, args);
  }
  return wrapper;
}
var createHybrid_default = createHybrid;

// ../../../../Project/100ls-native/node_modules/lodash-es/_createCurry.js
function createCurry(func, bitmask, arity) {
  var Ctor = createCtor_default(func);
  function wrapper() {
    var length = arguments.length, args = Array(length), index2 = length, placeholder = getHolder_default(wrapper);
    while (index2--) {
      args[index2] = arguments[index2];
    }
    var holders = length < 3 && args[0] !== placeholder && args[length - 1] !== placeholder ? [] : replaceHolders_default(args, placeholder);
    length -= holders.length;
    if (length < arity) {
      return createRecurry_default(
        func,
        bitmask,
        createHybrid_default,
        wrapper.placeholder,
        void 0,
        args,
        holders,
        void 0,
        void 0,
        arity - length
      );
    }
    var fn = this && this !== root_default && this instanceof wrapper ? Ctor : func;
    return apply_default(fn, this, args);
  }
  return wrapper;
}
var createCurry_default = createCurry;

// ../../../../Project/100ls-native/node_modules/lodash-es/_createPartial.js
var WRAP_BIND_FLAG5 = 1;
function createPartial(func, bitmask, thisArg, partials) {
  var isBind = bitmask & WRAP_BIND_FLAG5, Ctor = createCtor_default(func);
  function wrapper() {
    var argsIndex = -1, argsLength = arguments.length, leftIndex = -1, leftLength = partials.length, args = Array(leftLength + argsLength), fn = this && this !== root_default && this instanceof wrapper ? Ctor : func;
    while (++leftIndex < leftLength) {
      args[leftIndex] = partials[leftIndex];
    }
    while (argsLength--) {
      args[leftIndex++] = arguments[++argsIndex];
    }
    return apply_default(fn, isBind ? thisArg : this, args);
  }
  return wrapper;
}
var createPartial_default = createPartial;

// ../../../../Project/100ls-native/node_modules/lodash-es/_mergeData.js
var PLACEHOLDER2 = "__lodash_placeholder__";
var WRAP_BIND_FLAG6 = 1;
var WRAP_BIND_KEY_FLAG4 = 2;
var WRAP_CURRY_BOUND_FLAG2 = 4;
var WRAP_CURRY_FLAG4 = 8;
var WRAP_ARY_FLAG3 = 128;
var WRAP_REARG_FLAG2 = 256;
var nativeMin3 = Math.min;
function mergeData(data, source) {
  var bitmask = data[1], srcBitmask = source[1], newBitmask = bitmask | srcBitmask, isCommon = newBitmask < (WRAP_BIND_FLAG6 | WRAP_BIND_KEY_FLAG4 | WRAP_ARY_FLAG3);
  var isCombo = srcBitmask == WRAP_ARY_FLAG3 && bitmask == WRAP_CURRY_FLAG4 || srcBitmask == WRAP_ARY_FLAG3 && bitmask == WRAP_REARG_FLAG2 && data[7].length <= source[8] || srcBitmask == (WRAP_ARY_FLAG3 | WRAP_REARG_FLAG2) && source[7].length <= source[8] && bitmask == WRAP_CURRY_FLAG4;
  if (!(isCommon || isCombo)) {
    return data;
  }
  if (srcBitmask & WRAP_BIND_FLAG6) {
    data[2] = source[2];
    newBitmask |= bitmask & WRAP_BIND_FLAG6 ? 0 : WRAP_CURRY_BOUND_FLAG2;
  }
  var value = source[3];
  if (value) {
    var partials = data[3];
    data[3] = partials ? composeArgs_default(partials, value, source[4]) : value;
    data[4] = partials ? replaceHolders_default(data[3], PLACEHOLDER2) : source[4];
  }
  value = source[5];
  if (value) {
    partials = data[5];
    data[5] = partials ? composeArgsRight_default(partials, value, source[6]) : value;
    data[6] = partials ? replaceHolders_default(data[5], PLACEHOLDER2) : source[6];
  }
  value = source[7];
  if (value) {
    data[7] = value;
  }
  if (srcBitmask & WRAP_ARY_FLAG3) {
    data[8] = data[8] == null ? source[8] : nativeMin3(data[8], source[8]);
  }
  if (data[9] == null) {
    data[9] = source[9];
  }
  data[0] = source[0];
  data[1] = newBitmask;
  return data;
}
var mergeData_default = mergeData;

// ../../../../Project/100ls-native/node_modules/lodash-es/_createWrap.js
var FUNC_ERROR_TEXT3 = "Expected a function";
var WRAP_BIND_FLAG7 = 1;
var WRAP_BIND_KEY_FLAG5 = 2;
var WRAP_CURRY_FLAG5 = 8;
var WRAP_CURRY_RIGHT_FLAG3 = 16;
var WRAP_PARTIAL_FLAG3 = 32;
var WRAP_PARTIAL_RIGHT_FLAG3 = 64;
var nativeMax4 = Math.max;
function createWrap(func, bitmask, thisArg, partials, holders, argPos, ary2, arity) {
  var isBindKey = bitmask & WRAP_BIND_KEY_FLAG5;
  if (!isBindKey && typeof func != "function") {
    throw new TypeError(FUNC_ERROR_TEXT3);
  }
  var length = partials ? partials.length : 0;
  if (!length) {
    bitmask &= ~(WRAP_PARTIAL_FLAG3 | WRAP_PARTIAL_RIGHT_FLAG3);
    partials = holders = void 0;
  }
  ary2 = ary2 === void 0 ? ary2 : nativeMax4(toInteger_default(ary2), 0);
  arity = arity === void 0 ? arity : toInteger_default(arity);
  length -= holders ? holders.length : 0;
  if (bitmask & WRAP_PARTIAL_RIGHT_FLAG3) {
    var partialsRight = partials, holdersRight = holders;
    partials = holders = void 0;
  }
  var data = isBindKey ? void 0 : getData_default(func);
  var newData = [
    func,
    bitmask,
    thisArg,
    partials,
    holders,
    partialsRight,
    holdersRight,
    argPos,
    ary2,
    arity
  ];
  if (data) {
    mergeData_default(newData, data);
  }
  func = newData[0];
  bitmask = newData[1];
  thisArg = newData[2];
  partials = newData[3];
  holders = newData[4];
  arity = newData[9] = newData[9] === void 0 ? isBindKey ? 0 : func.length : nativeMax4(newData[9] - length, 0);
  if (!arity && bitmask & (WRAP_CURRY_FLAG5 | WRAP_CURRY_RIGHT_FLAG3)) {
    bitmask &= ~(WRAP_CURRY_FLAG5 | WRAP_CURRY_RIGHT_FLAG3);
  }
  if (!bitmask || bitmask == WRAP_BIND_FLAG7) {
    var result2 = createBind_default(func, bitmask, thisArg);
  } else if (bitmask == WRAP_CURRY_FLAG5 || bitmask == WRAP_CURRY_RIGHT_FLAG3) {
    result2 = createCurry_default(func, bitmask, arity);
  } else if ((bitmask == WRAP_PARTIAL_FLAG3 || bitmask == (WRAP_BIND_FLAG7 | WRAP_PARTIAL_FLAG3)) && !holders.length) {
    result2 = createPartial_default(func, bitmask, thisArg, partials);
  } else {
    result2 = createHybrid_default.apply(void 0, newData);
  }
  var setter = data ? baseSetData_default : setData_default;
  return setWrapToString_default(setter(result2, newData), func, bitmask);
}
var createWrap_default = createWrap;

// ../../../../Project/100ls-native/node_modules/lodash-es/ary.js
var WRAP_ARY_FLAG4 = 128;
function ary(func, n, guard) {
  n = guard ? void 0 : n;
  n = func && n == null ? func.length : n;
  return createWrap_default(func, WRAP_ARY_FLAG4, void 0, void 0, void 0, void 0, n);
}
var ary_default = ary;

// ../../../../Project/100ls-native/node_modules/lodash-es/_baseAssignValue.js
function baseAssignValue(object, key, value) {
  if (key == "__proto__" && defineProperty_default) {
    defineProperty_default(object, key, {
      "configurable": true,
      "enumerable": true,
      "value": value,
      "writable": true
    });
  } else {
    object[key] = value;
  }
}
var baseAssignValue_default = baseAssignValue;

// ../../../../Project/100ls-native/node_modules/lodash-es/eq.js
function eq(value, other) {
  return value === other || value !== value && other !== other;
}
var eq_default = eq;

// ../../../../Project/100ls-native/node_modules/lodash-es/_assignValue.js
var objectProto6 = Object.prototype;
var hasOwnProperty5 = objectProto6.hasOwnProperty;
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty5.call(object, key) && eq_default(objValue, value)) || value === void 0 && !(key in object)) {
    baseAssignValue_default(object, key, value);
  }
}
var assignValue_default = assignValue;

// ../../../../Project/100ls-native/node_modules/lodash-es/_copyObject.js
function copyObject(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});
  var index2 = -1, length = props.length;
  while (++index2 < length) {
    var key = props[index2];
    var newValue = customizer ? customizer(object[key], source[key], key, object, source) : void 0;
    if (newValue === void 0) {
      newValue = source[key];
    }
    if (isNew) {
      baseAssignValue_default(object, key, newValue);
    } else {
      assignValue_default(object, key, newValue);
    }
  }
  return object;
}
var copyObject_default = copyObject;

// ../../../../Project/100ls-native/node_modules/lodash-es/_overRest.js
var nativeMax5 = Math.max;
function overRest(func, start, transform2) {
  start = nativeMax5(start === void 0 ? func.length - 1 : start, 0);
  return function() {
    var args = arguments, index2 = -1, length = nativeMax5(args.length - start, 0), array = Array(length);
    while (++index2 < length) {
      array[index2] = args[start + index2];
    }
    index2 = -1;
    var otherArgs = Array(start + 1);
    while (++index2 < start) {
      otherArgs[index2] = args[index2];
    }
    otherArgs[start] = transform2(array);
    return apply_default(func, this, otherArgs);
  };
}
var overRest_default = overRest;

// ../../../../Project/100ls-native/node_modules/lodash-es/_baseRest.js
function baseRest(func, start) {
  return setToString_default(overRest_default(func, start, identity_default), func + "");
}
var baseRest_default = baseRest;

// ../../../../Project/100ls-native/node_modules/lodash-es/isLength.js
var MAX_SAFE_INTEGER2 = 9007199254740991;
function isLength(value) {
  return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER2;
}
var isLength_default = isLength;

// ../../../../Project/100ls-native/node_modules/lodash-es/isArrayLike.js
function isArrayLike(value) {
  return value != null && isLength_default(value.length) && !isFunction_default(value);
}
var isArrayLike_default = isArrayLike;

// ../../../../Project/100ls-native/node_modules/lodash-es/_isIterateeCall.js
function isIterateeCall(value, index2, object) {
  if (!isObject_default(object)) {
    return false;
  }
  var type = typeof index2;
  if (type == "number" ? isArrayLike_default(object) && isIndex_default(index2, object.length) : type == "string" && index2 in object) {
    return eq_default(object[index2], value);
  }
  return false;
}
var isIterateeCall_default = isIterateeCall;

// ../../../../Project/100ls-native/node_modules/lodash-es/_createAssigner.js
function createAssigner(assigner) {
  return baseRest_default(function(object, sources) {
    var index2 = -1, length = sources.length, customizer = length > 1 ? sources[length - 1] : void 0, guard = length > 2 ? sources[2] : void 0;
    customizer = assigner.length > 3 && typeof customizer == "function" ? (length--, customizer) : void 0;
    if (guard && isIterateeCall_default(sources[0], sources[1], guard)) {
      customizer = length < 3 ? void 0 : customizer;
      length = 1;
    }
    object = Object(object);
    while (++index2 < length) {
      var source = sources[index2];
      if (source) {
        assigner(object, source, index2, customizer);
      }
    }
    return object;
  });
}
var createAssigner_default = createAssigner;

// ../../../../Project/100ls-native/node_modules/lodash-es/_isPrototype.js
var objectProto7 = Object.prototype;
function isPrototype(value) {
  var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto7;
  return value === proto;
}
var isPrototype_default = isPrototype;

// ../../../../Project/100ls-native/node_modules/lodash-es/_baseTimes.js
function baseTimes(n, iteratee2) {
  var index2 = -1, result2 = Array(n);
  while (++index2 < n) {
    result2[index2] = iteratee2(index2);
  }
  return result2;
}
var baseTimes_default = baseTimes;

// ../../../../Project/100ls-native/node_modules/lodash-es/_baseIsArguments.js
var argsTag = "[object Arguments]";
function baseIsArguments(value) {
  return isObjectLike_default(value) && baseGetTag_default(value) == argsTag;
}
var baseIsArguments_default = baseIsArguments;

// ../../../../Project/100ls-native/node_modules/lodash-es/isArguments.js
var objectProto8 = Object.prototype;
var hasOwnProperty6 = objectProto8.hasOwnProperty;
var propertyIsEnumerable = objectProto8.propertyIsEnumerable;
var isArguments = baseIsArguments_default(/* @__PURE__ */ function() {
  return arguments;
}()) ? baseIsArguments_default : function(value) {
  return isObjectLike_default(value) && hasOwnProperty6.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
};
var isArguments_default = isArguments;

// ../../../../Project/100ls-native/node_modules/lodash-es/stubFalse.js
function stubFalse() {
  return false;
}
var stubFalse_default = stubFalse;

// ../../../../Project/100ls-native/node_modules/lodash-es/isBuffer.js
var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
var moduleExports = freeModule && freeModule.exports === freeExports;
var Buffer2 = moduleExports ? root_default.Buffer : void 0;
var nativeIsBuffer = Buffer2 ? Buffer2.isBuffer : void 0;
var isBuffer = nativeIsBuffer || stubFalse_default;
var isBuffer_default = isBuffer;

// ../../../../Project/100ls-native/node_modules/lodash-es/_baseIsTypedArray.js
var argsTag2 = "[object Arguments]";
var arrayTag = "[object Array]";
var boolTag = "[object Boolean]";
var dateTag = "[object Date]";
var errorTag = "[object Error]";
var funcTag2 = "[object Function]";
var mapTag = "[object Map]";
var numberTag = "[object Number]";
var objectTag = "[object Object]";
var regexpTag = "[object RegExp]";
var setTag = "[object Set]";
var stringTag = "[object String]";
var weakMapTag = "[object WeakMap]";
var arrayBufferTag = "[object ArrayBuffer]";
var dataViewTag = "[object DataView]";
var float32Tag = "[object Float32Array]";
var float64Tag = "[object Float64Array]";
var int8Tag = "[object Int8Array]";
var int16Tag = "[object Int16Array]";
var int32Tag = "[object Int32Array]";
var uint8Tag = "[object Uint8Array]";
var uint8ClampedTag = "[object Uint8ClampedArray]";
var uint16Tag = "[object Uint16Array]";
var uint32Tag = "[object Uint32Array]";
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag2] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag2] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
function baseIsTypedArray(value) {
  return isObjectLike_default(value) && isLength_default(value.length) && !!typedArrayTags[baseGetTag_default(value)];
}
var baseIsTypedArray_default = baseIsTypedArray;

// ../../../../Project/100ls-native/node_modules/lodash-es/_baseUnary.js
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}
var baseUnary_default = baseUnary;

// ../../../../Project/100ls-native/node_modules/lodash-es/_nodeUtil.js
var freeExports2 = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule2 = freeExports2 && typeof module == "object" && module && !module.nodeType && module;
var moduleExports2 = freeModule2 && freeModule2.exports === freeExports2;
var freeProcess = moduleExports2 && freeGlobal_default.process;
var nodeUtil = function() {
  try {
    var types = freeModule2 && freeModule2.require && freeModule2.require("util").types;
    if (types) {
      return types;
    }
    return freeProcess && freeProcess.binding && freeProcess.binding("util");
  } catch (e) {
  }
}();
var nodeUtil_default = nodeUtil;

// ../../../../Project/100ls-native/node_modules/lodash-es/isTypedArray.js
var nodeIsTypedArray = nodeUtil_default && nodeUtil_default.isTypedArray;
var isTypedArray = nodeIsTypedArray ? baseUnary_default(nodeIsTypedArray) : baseIsTypedArray_default;
var isTypedArray_default = isTypedArray;

// ../../../../Project/100ls-native/node_modules/lodash-es/_arrayLikeKeys.js
var objectProto9 = Object.prototype;
var hasOwnProperty7 = objectProto9.hasOwnProperty;
function arrayLikeKeys(value, inherited) {
  var isArr = isArray_default(value), isArg = !isArr && isArguments_default(value), isBuff = !isArr && !isArg && isBuffer_default(value), isType = !isArr && !isArg && !isBuff && isTypedArray_default(value), skipIndexes = isArr || isArg || isBuff || isType, result2 = skipIndexes ? baseTimes_default(value.length, String) : [], length = result2.length;
  for (var key in value) {
    if ((inherited || hasOwnProperty7.call(value, key)) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
    (key == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    isBuff && (key == "offset" || key == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || // Skip index properties.
    isIndex_default(key, length)))) {
      result2.push(key);
    }
  }
  return result2;
}
var arrayLikeKeys_default = arrayLikeKeys;

// ../../../../Project/100ls-native/node_modules/lodash-es/_overArg.js
function overArg(func, transform2) {
  return function(arg) {
    return func(transform2(arg));
  };
}
var overArg_default = overArg;

// ../../../../Project/100ls-native/node_modules/lodash-es/_nativeKeys.js
var nativeKeys = overArg_default(Object.keys, Object);
var nativeKeys_default = nativeKeys;

// ../../../../Project/100ls-native/node_modules/lodash-es/_baseKeys.js
var objectProto10 = Object.prototype;
var hasOwnProperty8 = objectProto10.hasOwnProperty;
function baseKeys(object) {
  if (!isPrototype_default(object)) {
    return nativeKeys_default(object);
  }
  var result2 = [];
  for (var key in Object(object)) {
    if (hasOwnProperty8.call(object, key) && key != "constructor") {
      result2.push(key);
    }
  }
  return result2;
}
var baseKeys_default = baseKeys;

// ../../../../Project/100ls-native/node_modules/lodash-es/keys.js
function keys(object) {
  return isArrayLike_default(object) ? arrayLikeKeys_default(object) : baseKeys_default(object);
}
var keys_default = keys;

// ../../../../Project/100ls-native/node_modules/lodash-es/assign.js
var objectProto11 = Object.prototype;
var hasOwnProperty9 = objectProto11.hasOwnProperty;
var assign = createAssigner_default(function(object, source) {
  if (isPrototype_default(source) || isArrayLike_default(source)) {
    copyObject_default(source, keys_default(source), object);
    return;
  }
  for (var key in source) {
    if (hasOwnProperty9.call(source, key)) {
      assignValue_default(object, key, source[key]);
    }
  }
});
var assign_default = assign;

// ../../../../Project/100ls-native/node_modules/lodash-es/_nativeKeysIn.js
function nativeKeysIn(object) {
  var result2 = [];
  if (object != null) {
    for (var key in Object(object)) {
      result2.push(key);
    }
  }
  return result2;
}
var nativeKeysIn_default = nativeKeysIn;

// ../../../../Project/100ls-native/node_modules/lodash-es/_baseKeysIn.js
var objectProto12 = Object.prototype;
var hasOwnProperty10 = objectProto12.hasOwnProperty;
function baseKeysIn(object) {
  if (!isObject_default(object)) {
    return nativeKeysIn_default(object);
  }
  var isProto = isPrototype_default(object), result2 = [];
  for (var key in object) {
    if (!(key == "constructor" && (isProto || !hasOwnProperty10.call(object, key)))) {
      result2.push(key);
    }
  }
  return result2;
}
var baseKeysIn_default = baseKeysIn;

// ../../../../Project/100ls-native/node_modules/lodash-es/keysIn.js
function keysIn(object) {
  return isArrayLike_default(object) ? arrayLikeKeys_default(object, true) : baseKeysIn_default(object);
}
var keysIn_default = keysIn;

// ../../../../Project/100ls-native/node_modules/lodash-es/assignIn.js
var assignIn = createAssigner_default(function(object, source) {
  copyObject_default(source, keysIn_default(source), object);
});
var assignIn_default = assignIn;

// ../../../../Project/100ls-native/node_modules/lodash-es/assignInWith.js
var assignInWith = createAssigner_default(function(object, source, srcIndex, customizer) {
  copyObject_default(source, keysIn_default(source), object, customizer);
});
var assignInWith_default = assignInWith;

// ../../../../Project/100ls-native/node_modules/lodash-es/assignWith.js
var assignWith = createAssigner_default(function(object, source, srcIndex, customizer) {
  copyObject_default(source, keys_default(source), object, customizer);
});
var assignWith_default = assignWith;

// ../../../../Project/100ls-native/node_modules/lodash-es/_isKey.js
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/;
var reIsPlainProp = /^\w*$/;
function isKey(value, object) {
  if (isArray_default(value)) {
    return false;
  }
  var type = typeof value;
  if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol_default(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
}
var isKey_default = isKey;

// ../../../../Project/100ls-native/node_modules/lodash-es/_nativeCreate.js
var nativeCreate = getNative_default(Object, "create");
var nativeCreate_default = nativeCreate;

// ../../../../Project/100ls-native/node_modules/lodash-es/_hashClear.js
function hashClear() {
  this.__data__ = nativeCreate_default ? nativeCreate_default(null) : {};
  this.size = 0;
}
var hashClear_default = hashClear;

// ../../../../Project/100ls-native/node_modules/lodash-es/_hashDelete.js
function hashDelete(key) {
  var result2 = this.has(key) && delete this.__data__[key];
  this.size -= result2 ? 1 : 0;
  return result2;
}
var hashDelete_default = hashDelete;

// ../../../../Project/100ls-native/node_modules/lodash-es/_hashGet.js
var HASH_UNDEFINED = "__lodash_hash_undefined__";
var objectProto13 = Object.prototype;
var hasOwnProperty11 = objectProto13.hasOwnProperty;
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate_default) {
    var result2 = data[key];
    return result2 === HASH_UNDEFINED ? void 0 : result2;
  }
  return hasOwnProperty11.call(data, key) ? data[key] : void 0;
}
var hashGet_default = hashGet;

// ../../../../Project/100ls-native/node_modules/lodash-es/_hashHas.js
var objectProto14 = Object.prototype;
var hasOwnProperty12 = objectProto14.hasOwnProperty;
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate_default ? data[key] !== void 0 : hasOwnProperty12.call(data, key);
}
var hashHas_default = hashHas;

// ../../../../Project/100ls-native/node_modules/lodash-es/_hashSet.js
var HASH_UNDEFINED2 = "__lodash_hash_undefined__";
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = nativeCreate_default && value === void 0 ? HASH_UNDEFINED2 : value;
  return this;
}
var hashSet_default = hashSet;

// ../../../../Project/100ls-native/node_modules/lodash-es/_Hash.js
function Hash(entries) {
  var index2 = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index2 < length) {
    var entry = entries[index2];
    this.set(entry[0], entry[1]);
  }
}
Hash.prototype.clear = hashClear_default;
Hash.prototype["delete"] = hashDelete_default;
Hash.prototype.get = hashGet_default;
Hash.prototype.has = hashHas_default;
Hash.prototype.set = hashSet_default;
var Hash_default = Hash;

// ../../../../Project/100ls-native/node_modules/lodash-es/_listCacheClear.js
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}
var listCacheClear_default = listCacheClear;

// ../../../../Project/100ls-native/node_modules/lodash-es/_assocIndexOf.js
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq_default(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}
var assocIndexOf_default = assocIndexOf;

// ../../../../Project/100ls-native/node_modules/lodash-es/_listCacheDelete.js
var arrayProto = Array.prototype;
var splice = arrayProto.splice;
function listCacheDelete(key) {
  var data = this.__data__, index2 = assocIndexOf_default(data, key);
  if (index2 < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index2 == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index2, 1);
  }
  --this.size;
  return true;
}
var listCacheDelete_default = listCacheDelete;

// ../../../../Project/100ls-native/node_modules/lodash-es/_listCacheGet.js
function listCacheGet(key) {
  var data = this.__data__, index2 = assocIndexOf_default(data, key);
  return index2 < 0 ? void 0 : data[index2][1];
}
var listCacheGet_default = listCacheGet;

// ../../../../Project/100ls-native/node_modules/lodash-es/_listCacheHas.js
function listCacheHas(key) {
  return assocIndexOf_default(this.__data__, key) > -1;
}
var listCacheHas_default = listCacheHas;

// ../../../../Project/100ls-native/node_modules/lodash-es/_listCacheSet.js
function listCacheSet(key, value) {
  var data = this.__data__, index2 = assocIndexOf_default(data, key);
  if (index2 < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index2][1] = value;
  }
  return this;
}
var listCacheSet_default = listCacheSet;

// ../../../../Project/100ls-native/node_modules/lodash-es/_ListCache.js
function ListCache(entries) {
  var index2 = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index2 < length) {
    var entry = entries[index2];
    this.set(entry[0], entry[1]);
  }
}
ListCache.prototype.clear = listCacheClear_default;
ListCache.prototype["delete"] = listCacheDelete_default;
ListCache.prototype.get = listCacheGet_default;
ListCache.prototype.has = listCacheHas_default;
ListCache.prototype.set = listCacheSet_default;
var ListCache_default = ListCache;

// ../../../../Project/100ls-native/node_modules/lodash-es/_Map.js
var Map2 = getNative_default(root_default, "Map");
var Map_default = Map2;

// ../../../../Project/100ls-native/node_modules/lodash-es/_mapCacheClear.js
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    "hash": new Hash_default(),
    "map": new (Map_default || ListCache_default)(),
    "string": new Hash_default()
  };
}
var mapCacheClear_default = mapCacheClear;

// ../../../../Project/100ls-native/node_modules/lodash-es/_isKeyable.js
function isKeyable(value) {
  var type = typeof value;
  return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
}
var isKeyable_default = isKeyable;

// ../../../../Project/100ls-native/node_modules/lodash-es/_getMapData.js
function getMapData(map2, key) {
  var data = map2.__data__;
  return isKeyable_default(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
}
var getMapData_default = getMapData;

// ../../../../Project/100ls-native/node_modules/lodash-es/_mapCacheDelete.js
function mapCacheDelete(key) {
  var result2 = getMapData_default(this, key)["delete"](key);
  this.size -= result2 ? 1 : 0;
  return result2;
}
var mapCacheDelete_default = mapCacheDelete;

// ../../../../Project/100ls-native/node_modules/lodash-es/_mapCacheGet.js
function mapCacheGet(key) {
  return getMapData_default(this, key).get(key);
}
var mapCacheGet_default = mapCacheGet;

// ../../../../Project/100ls-native/node_modules/lodash-es/_mapCacheHas.js
function mapCacheHas(key) {
  return getMapData_default(this, key).has(key);
}
var mapCacheHas_default = mapCacheHas;

// ../../../../Project/100ls-native/node_modules/lodash-es/_mapCacheSet.js
function mapCacheSet(key, value) {
  var data = getMapData_default(this, key), size2 = data.size;
  data.set(key, value);
  this.size += data.size == size2 ? 0 : 1;
  return this;
}
var mapCacheSet_default = mapCacheSet;

// ../../../../Project/100ls-native/node_modules/lodash-es/_MapCache.js
function MapCache(entries) {
  var index2 = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index2 < length) {
    var entry = entries[index2];
    this.set(entry[0], entry[1]);
  }
}
MapCache.prototype.clear = mapCacheClear_default;
MapCache.prototype["delete"] = mapCacheDelete_default;
MapCache.prototype.get = mapCacheGet_default;
MapCache.prototype.has = mapCacheHas_default;
MapCache.prototype.set = mapCacheSet_default;
var MapCache_default = MapCache;

// ../../../../Project/100ls-native/node_modules/lodash-es/memoize.js
var FUNC_ERROR_TEXT4 = "Expected a function";
function memoize(func, resolver) {
  if (typeof func != "function" || resolver != null && typeof resolver != "function") {
    throw new TypeError(FUNC_ERROR_TEXT4);
  }
  var memoized = function() {
    var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache2 = memoized.cache;
    if (cache2.has(key)) {
      return cache2.get(key);
    }
    var result2 = func.apply(this, args);
    memoized.cache = cache2.set(key, result2) || cache2;
    return result2;
  };
  memoized.cache = new (memoize.Cache || MapCache_default)();
  return memoized;
}
memoize.Cache = MapCache_default;
var memoize_default = memoize;

// ../../../../Project/100ls-native/node_modules/lodash-es/_memoizeCapped.js
var MAX_MEMOIZE_SIZE = 500;
function memoizeCapped(func) {
  var result2 = memoize_default(func, function(key) {
    if (cache2.size === MAX_MEMOIZE_SIZE) {
      cache2.clear();
    }
    return key;
  });
  var cache2 = result2.cache;
  return result2;
}
var memoizeCapped_default = memoizeCapped;

// ../../../../Project/100ls-native/node_modules/lodash-es/_stringToPath.js
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
var reEscapeChar = /\\(\\)?/g;
var stringToPath = memoizeCapped_default(function(string) {
  var result2 = [];
  if (string.charCodeAt(0) === 46) {
    result2.push("");
  }
  string.replace(rePropName, function(match, number, quote, subString) {
    result2.push(quote ? subString.replace(reEscapeChar, "$1") : number || match);
  });
  return result2;
});
var stringToPath_default = stringToPath;

// ../../../../Project/100ls-native/node_modules/lodash-es/toString.js
function toString(value) {
  return value == null ? "" : baseToString_default(value);
}
var toString_default = toString;

// ../../../../Project/100ls-native/node_modules/lodash-es/_castPath.js
function castPath(value, object) {
  if (isArray_default(value)) {
    return value;
  }
  return isKey_default(value, object) ? [value] : stringToPath_default(toString_default(value));
}
var castPath_default = castPath;

// ../../../../Project/100ls-native/node_modules/lodash-es/_toKey.js
var INFINITY3 = 1 / 0;
function toKey(value) {
  if (typeof value == "string" || isSymbol_default(value)) {
    return value;
  }
  var result2 = value + "";
  return result2 == "0" && 1 / value == -INFINITY3 ? "-0" : result2;
}
var toKey_default = toKey;

// ../../../../Project/100ls-native/node_modules/lodash-es/_baseGet.js
function baseGet(object, path) {
  path = castPath_default(path, object);
  var index2 = 0, length = path.length;
  while (object != null && index2 < length) {
    object = object[toKey_default(path[index2++])];
  }
  return index2 && index2 == length ? object : void 0;
}
var baseGet_default = baseGet;

// ../../../../Project/100ls-native/node_modules/lodash-es/get.js
function get(object, path, defaultValue) {
  var result2 = object == null ? void 0 : baseGet_default(object, path);
  return result2 === void 0 ? defaultValue : result2;
}
var get_default = get;

// ../../../../Project/100ls-native/node_modules/lodash-es/_baseAt.js
function baseAt(object, paths) {
  var index2 = -1, length = paths.length, result2 = Array(length), skip = object == null;
  while (++index2 < length) {
    result2[index2] = skip ? void 0 : get_default(object, paths[index2]);
  }
  return result2;
}
var baseAt_default = baseAt;

// ../../../../Project/100ls-native/node_modules/lodash-es/_arrayPush.js
function arrayPush(array, values2) {
  var index2 = -1, length = values2.length, offset = array.length;
  while (++index2 < length) {
    array[offset + index2] = values2[index2];
  }
  return array;
}
var arrayPush_default = arrayPush;

// ../../../../Project/100ls-native/node_modules/lodash-es/_isFlattenable.js
var spreadableSymbol = Symbol_default ? Symbol_default.isConcatSpreadable : void 0;
function isFlattenable(value) {
  return isArray_default(value) || isArguments_default(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
}
var isFlattenable_default = isFlattenable;

// ../../../../Project/100ls-native/node_modules/lodash-es/_baseFlatten.js
function baseFlatten(array, depth, predicate, isStrict, result2) {
  var index2 = -1, length = array.length;
  predicate || (predicate = isFlattenable_default);
  result2 || (result2 = []);
  while (++index2 < length) {
    var value = array[index2];
    if (depth > 0 && predicate(value)) {
      if (depth > 1) {
        baseFlatten(value, depth - 1, predicate, isStrict, result2);
      } else {
        arrayPush_default(result2, value);
      }
    } else if (!isStrict) {
      result2[result2.length] = value;
    }
  }
  return result2;
}
var baseFlatten_default = baseFlatten;

// ../../../../Project/100ls-native/node_modules/lodash-es/flatten.js
function flatten(array) {
  var length = array == null ? 0 : array.length;
  return length ? baseFlatten_default(array, 1) : [];
}
var flatten_default = flatten;

// ../../../../Project/100ls-native/node_modules/lodash-es/_flatRest.js
function flatRest(func) {
  return setToString_default(overRest_default(func, void 0, flatten_default), func + "");
}
var flatRest_default = flatRest;

// ../../../../Project/100ls-native/node_modules/lodash-es/at.js
var at = flatRest_default(baseAt_default);
var at_default = at;

// ../../../../Project/100ls-native/node_modules/lodash-es/_getPrototype.js
var getPrototype = overArg_default(Object.getPrototypeOf, Object);
var getPrototype_default = getPrototype;

// ../../../../Project/100ls-native/node_modules/lodash-es/isPlainObject.js
var objectTag2 = "[object Object]";
var funcProto3 = Function.prototype;
var objectProto15 = Object.prototype;
var funcToString3 = funcProto3.toString;
var hasOwnProperty13 = objectProto15.hasOwnProperty;
var objectCtorString = funcToString3.call(Object);
function isPlainObject(value) {
  if (!isObjectLike_default(value) || baseGetTag_default(value) != objectTag2) {
    return false;
  }
  var proto = getPrototype_default(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty13.call(proto, "constructor") && proto.constructor;
  return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString3.call(Ctor) == objectCtorString;
}
var isPlainObject_default = isPlainObject;

// ../../../../Project/100ls-native/node_modules/lodash-es/isError.js
var domExcTag = "[object DOMException]";
var errorTag2 = "[object Error]";
function isError(value) {
  if (!isObjectLike_default(value)) {
    return false;
  }
  var tag = baseGetTag_default(value);
  return tag == errorTag2 || tag == domExcTag || typeof value.message == "string" && typeof value.name == "string" && !isPlainObject_default(value);
}
var isError_default = isError;

// ../../../../Project/100ls-native/node_modules/lodash-es/attempt.js
var attempt = baseRest_default(function(func, args) {
  try {
    return apply_default(func, void 0, args);
  } catch (e) {
    return isError_default(e) ? e : new Error(e);
  }
});
var attempt_default = attempt;

// ../../../../Project/100ls-native/node_modules/lodash-es/before.js
var FUNC_ERROR_TEXT5 = "Expected a function";
function before(n, func) {
  var result2;
  if (typeof func != "function") {
    throw new TypeError(FUNC_ERROR_TEXT5);
  }
  n = toInteger_default(n);
  return function() {
    if (--n > 0) {
      result2 = func.apply(this, arguments);
    }
    if (n <= 1) {
      func = void 0;
    }
    return result2;
  };
}
var before_default = before;

// ../../../../Project/100ls-native/node_modules/lodash-es/bind.js
var WRAP_BIND_FLAG8 = 1;
var WRAP_PARTIAL_FLAG4 = 32;
var bind = baseRest_default(function(func, thisArg, partials) {
  var bitmask = WRAP_BIND_FLAG8;
  if (partials.length) {
    var holders = replaceHolders_default(partials, getHolder_default(bind));
    bitmask |= WRAP_PARTIAL_FLAG4;
  }
  return createWrap_default(func, bitmask, thisArg, partials, holders);
});
bind.placeholder = {};
var bind_default = bind;

// ../../../../Project/100ls-native/node_modules/lodash-es/bindAll.js
var bindAll = flatRest_default(function(object, methodNames) {
  arrayEach_default(methodNames, function(key) {
    key = toKey_default(key);
    baseAssignValue_default(object, key, bind_default(object[key], object));
  });
  return object;
});
var bindAll_default = bindAll;

// ../../../../Project/100ls-native/node_modules/lodash-es/bindKey.js
var WRAP_BIND_FLAG9 = 1;
var WRAP_BIND_KEY_FLAG6 = 2;
var WRAP_PARTIAL_FLAG5 = 32;
var bindKey = baseRest_default(function(object, key, partials) {
  var bitmask = WRAP_BIND_FLAG9 | WRAP_BIND_KEY_FLAG6;
  if (partials.length) {
    var holders = replaceHolders_default(partials, getHolder_default(bindKey));
    bitmask |= WRAP_PARTIAL_FLAG5;
  }
  return createWrap_default(key, bitmask, object, partials, holders);
});
bindKey.placeholder = {};
var bindKey_default = bindKey;

// ../../../../Project/100ls-native/node_modules/lodash-es/_baseSlice.js
function baseSlice(array, start, end) {
  var index2 = -1, length = array.length;
  if (start < 0) {
    start = -start > length ? 0 : length + start;
  }
  end = end > length ? length : end;
  if (end < 0) {
    end += length;
  }
  length = start > end ? 0 : end - start >>> 0;
  start >>>= 0;
  var result2 = Array(length);
  while (++index2 < length) {
    result2[index2] = array[index2 + start];
  }
  return result2;
}
var baseSlice_default = baseSlice;

// ../../../../Project/100ls-native/node_modules/lodash-es/_castSlice.js
function castSlice(array, start, end) {
  var length = array.length;
  end = end === void 0 ? length : end;
  return !start && end >= length ? array : baseSlice_default(array, start, end);
}
var castSlice_default = castSlice;

// ../../../../Project/100ls-native/node_modules/lodash-es/_hasUnicode.js
var rsAstralRange = "\\ud800-\\udfff";
var rsComboMarksRange = "\\u0300-\\u036f";
var reComboHalfMarksRange = "\\ufe20-\\ufe2f";
var rsComboSymbolsRange = "\\u20d0-\\u20ff";
var rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange;
var rsVarRange = "\\ufe0e\\ufe0f";
var rsZWJ = "\\u200d";
var reHasUnicode = RegExp("[" + rsZWJ + rsAstralRange + rsComboRange + rsVarRange + "]");
function hasUnicode(string) {
  return reHasUnicode.test(string);
}
var hasUnicode_default = hasUnicode;

// ../../../../Project/100ls-native/node_modules/lodash-es/_asciiToArray.js
function asciiToArray(string) {
  return string.split("");
}
var asciiToArray_default = asciiToArray;

// ../../../../Project/100ls-native/node_modules/lodash-es/_unicodeToArray.js
var rsAstralRange2 = "\\ud800-\\udfff";
var rsComboMarksRange2 = "\\u0300-\\u036f";
var reComboHalfMarksRange2 = "\\ufe20-\\ufe2f";
var rsComboSymbolsRange2 = "\\u20d0-\\u20ff";
var rsComboRange2 = rsComboMarksRange2 + reComboHalfMarksRange2 + rsComboSymbolsRange2;
var rsVarRange2 = "\\ufe0e\\ufe0f";
var rsAstral = "[" + rsAstralRange2 + "]";
var rsCombo = "[" + rsComboRange2 + "]";
var rsFitz = "\\ud83c[\\udffb-\\udfff]";
var rsModifier = "(?:" + rsCombo + "|" + rsFitz + ")";
var rsNonAstral = "[^" + rsAstralRange2 + "]";
var rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}";
var rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]";
var rsZWJ2 = "\\u200d";
var reOptMod = rsModifier + "?";
var rsOptVar = "[" + rsVarRange2 + "]?";
var rsOptJoin = "(?:" + rsZWJ2 + "(?:" + [rsNonAstral, rsRegional, rsSurrPair].join("|") + ")" + rsOptVar + reOptMod + ")*";
var rsSeq = rsOptVar + reOptMod + rsOptJoin;
var rsSymbol = "(?:" + [rsNonAstral + rsCombo + "?", rsCombo, rsRegional, rsSurrPair, rsAstral].join("|") + ")";
var reUnicode = RegExp(rsFitz + "(?=" + rsFitz + ")|" + rsSymbol + rsSeq, "g");
function unicodeToArray(string) {
  return string.match(reUnicode) || [];
}
var unicodeToArray_default = unicodeToArray;

// ../../../../Project/100ls-native/node_modules/lodash-es/_stringToArray.js
function stringToArray(string) {
  return hasUnicode_default(string) ? unicodeToArray_default(string) : asciiToArray_default(string);
}
var stringToArray_default = stringToArray;

// ../../../../Project/100ls-native/node_modules/lodash-es/_createCaseFirst.js
function createCaseFirst(methodName) {
  return function(string) {
    string = toString_default(string);
    var strSymbols = hasUnicode_default(string) ? stringToArray_default(string) : void 0;
    var chr = strSymbols ? strSymbols[0] : string.charAt(0);
    var trailing = strSymbols ? castSlice_default(strSymbols, 1).join("") : string.slice(1);
    return chr[methodName]() + trailing;
  };
}
var createCaseFirst_default = createCaseFirst;

// ../../../../Project/100ls-native/node_modules/lodash-es/upperFirst.js
var upperFirst = createCaseFirst_default("toUpperCase");
var upperFirst_default = upperFirst;

// ../../../../Project/100ls-native/node_modules/lodash-es/capitalize.js
function capitalize(string) {
  return upperFirst_default(toString_default(string).toLowerCase());
}
var capitalize_default = capitalize;

// ../../../../Project/100ls-native/node_modules/lodash-es/_arrayReduce.js
function arrayReduce(array, iteratee2, accumulator, initAccum) {
  var index2 = -1, length = array == null ? 0 : array.length;
  if (initAccum && length) {
    accumulator = array[++index2];
  }
  while (++index2 < length) {
    accumulator = iteratee2(accumulator, array[index2], index2, array);
  }
  return accumulator;
}
var arrayReduce_default = arrayReduce;

// ../../../../Project/100ls-native/node_modules/lodash-es/_basePropertyOf.js
function basePropertyOf(object) {
  return function(key) {
    return object == null ? void 0 : object[key];
  };
}
var basePropertyOf_default = basePropertyOf;

// ../../../../Project/100ls-native/node_modules/lodash-es/_deburrLetter.js
var deburredLetters = {
  // Latin-1 Supplement block.
  "À": "A",
  "Á": "A",
  "Â": "A",
  "Ã": "A",
  "Ä": "A",
  "Å": "A",
  "à": "a",
  "á": "a",
  "â": "a",
  "ã": "a",
  "ä": "a",
  "å": "a",
  "Ç": "C",
  "ç": "c",
  "Ð": "D",
  "ð": "d",
  "È": "E",
  "É": "E",
  "Ê": "E",
  "Ë": "E",
  "è": "e",
  "é": "e",
  "ê": "e",
  "ë": "e",
  "Ì": "I",
  "Í": "I",
  "Î": "I",
  "Ï": "I",
  "ì": "i",
  "í": "i",
  "î": "i",
  "ï": "i",
  "Ñ": "N",
  "ñ": "n",
  "Ò": "O",
  "Ó": "O",
  "Ô": "O",
  "Õ": "O",
  "Ö": "O",
  "Ø": "O",
  "ò": "o",
  "ó": "o",
  "ô": "o",
  "õ": "o",
  "ö": "o",
  "ø": "o",
  "Ù": "U",
  "Ú": "U",
  "Û": "U",
  "Ü": "U",
  "ù": "u",
  "ú": "u",
  "û": "u",
  "ü": "u",
  "Ý": "Y",
  "ý": "y",
  "ÿ": "y",
  "Æ": "Ae",
  "æ": "ae",
  "Þ": "Th",
  "þ": "th",
  "ß": "ss",
  // Latin Extended-A block.
  "Ā": "A",
  "Ă": "A",
  "Ą": "A",
  "ā": "a",
  "ă": "a",
  "ą": "a",
  "Ć": "C",
  "Ĉ": "C",
  "Ċ": "C",
  "Č": "C",
  "ć": "c",
  "ĉ": "c",
  "ċ": "c",
  "č": "c",
  "Ď": "D",
  "Đ": "D",
  "ď": "d",
  "đ": "d",
  "Ē": "E",
  "Ĕ": "E",
  "Ė": "E",
  "Ę": "E",
  "Ě": "E",
  "ē": "e",
  "ĕ": "e",
  "ė": "e",
  "ę": "e",
  "ě": "e",
  "Ĝ": "G",
  "Ğ": "G",
  "Ġ": "G",
  "Ģ": "G",
  "ĝ": "g",
  "ğ": "g",
  "ġ": "g",
  "ģ": "g",
  "Ĥ": "H",
  "Ħ": "H",
  "ĥ": "h",
  "ħ": "h",
  "Ĩ": "I",
  "Ī": "I",
  "Ĭ": "I",
  "Į": "I",
  "İ": "I",
  "ĩ": "i",
  "ī": "i",
  "ĭ": "i",
  "į": "i",
  "ı": "i",
  "Ĵ": "J",
  "ĵ": "j",
  "Ķ": "K",
  "ķ": "k",
  "ĸ": "k",
  "Ĺ": "L",
  "Ļ": "L",
  "Ľ": "L",
  "Ŀ": "L",
  "Ł": "L",
  "ĺ": "l",
  "ļ": "l",
  "ľ": "l",
  "ŀ": "l",
  "ł": "l",
  "Ń": "N",
  "Ņ": "N",
  "Ň": "N",
  "Ŋ": "N",
  "ń": "n",
  "ņ": "n",
  "ň": "n",
  "ŋ": "n",
  "Ō": "O",
  "Ŏ": "O",
  "Ő": "O",
  "ō": "o",
  "ŏ": "o",
  "ő": "o",
  "Ŕ": "R",
  "Ŗ": "R",
  "Ř": "R",
  "ŕ": "r",
  "ŗ": "r",
  "ř": "r",
  "Ś": "S",
  "Ŝ": "S",
  "Ş": "S",
  "Š": "S",
  "ś": "s",
  "ŝ": "s",
  "ş": "s",
  "š": "s",
  "Ţ": "T",
  "Ť": "T",
  "Ŧ": "T",
  "ţ": "t",
  "ť": "t",
  "ŧ": "t",
  "Ũ": "U",
  "Ū": "U",
  "Ŭ": "U",
  "Ů": "U",
  "Ű": "U",
  "Ų": "U",
  "ũ": "u",
  "ū": "u",
  "ŭ": "u",
  "ů": "u",
  "ű": "u",
  "ų": "u",
  "Ŵ": "W",
  "ŵ": "w",
  "Ŷ": "Y",
  "ŷ": "y",
  "Ÿ": "Y",
  "Ź": "Z",
  "Ż": "Z",
  "Ž": "Z",
  "ź": "z",
  "ż": "z",
  "ž": "z",
  "Ĳ": "IJ",
  "ĳ": "ij",
  "Œ": "Oe",
  "œ": "oe",
  "ŉ": "'n",
  "ſ": "s"
};
var deburrLetter = basePropertyOf_default(deburredLetters);
var deburrLetter_default = deburrLetter;

// ../../../../Project/100ls-native/node_modules/lodash-es/deburr.js
var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;
var rsComboMarksRange3 = "\\u0300-\\u036f";
var reComboHalfMarksRange3 = "\\ufe20-\\ufe2f";
var rsComboSymbolsRange3 = "\\u20d0-\\u20ff";
var rsComboRange3 = rsComboMarksRange3 + reComboHalfMarksRange3 + rsComboSymbolsRange3;
var rsCombo2 = "[" + rsComboRange3 + "]";
var reComboMark = RegExp(rsCombo2, "g");
function deburr(string) {
  string = toString_default(string);
  return string && string.replace(reLatin, deburrLetter_default).replace(reComboMark, "");
}
var deburr_default = deburr;

// ../../../../Project/100ls-native/node_modules/lodash-es/_asciiWords.js
var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
function asciiWords(string) {
  return string.match(reAsciiWord) || [];
}
var asciiWords_default = asciiWords;

// ../../../../Project/100ls-native/node_modules/lodash-es/_hasUnicodeWord.js
var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
function hasUnicodeWord(string) {
  return reHasUnicodeWord.test(string);
}
var hasUnicodeWord_default = hasUnicodeWord;

// ../../../../Project/100ls-native/node_modules/lodash-es/_unicodeWords.js
var rsAstralRange3 = "\\ud800-\\udfff";
var rsComboMarksRange4 = "\\u0300-\\u036f";
var reComboHalfMarksRange4 = "\\ufe20-\\ufe2f";
var rsComboSymbolsRange4 = "\\u20d0-\\u20ff";
var rsComboRange4 = rsComboMarksRange4 + reComboHalfMarksRange4 + rsComboSymbolsRange4;
var rsDingbatRange = "\\u2700-\\u27bf";
var rsLowerRange = "a-z\\xdf-\\xf6\\xf8-\\xff";
var rsMathOpRange = "\\xac\\xb1\\xd7\\xf7";
var rsNonCharRange = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf";
var rsPunctuationRange = "\\u2000-\\u206f";
var rsSpaceRange = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000";
var rsUpperRange = "A-Z\\xc0-\\xd6\\xd8-\\xde";
var rsVarRange3 = "\\ufe0e\\ufe0f";
var rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;
var rsApos = "['’]";
var rsBreak = "[" + rsBreakRange + "]";
var rsCombo3 = "[" + rsComboRange4 + "]";
var rsDigits = "\\d+";
var rsDingbat = "[" + rsDingbatRange + "]";
var rsLower = "[" + rsLowerRange + "]";
var rsMisc = "[^" + rsAstralRange3 + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + "]";
var rsFitz2 = "\\ud83c[\\udffb-\\udfff]";
var rsModifier2 = "(?:" + rsCombo3 + "|" + rsFitz2 + ")";
var rsNonAstral2 = "[^" + rsAstralRange3 + "]";
var rsRegional2 = "(?:\\ud83c[\\udde6-\\uddff]){2}";
var rsSurrPair2 = "[\\ud800-\\udbff][\\udc00-\\udfff]";
var rsUpper = "[" + rsUpperRange + "]";
var rsZWJ3 = "\\u200d";
var rsMiscLower = "(?:" + rsLower + "|" + rsMisc + ")";
var rsMiscUpper = "(?:" + rsUpper + "|" + rsMisc + ")";
var rsOptContrLower = "(?:" + rsApos + "(?:d|ll|m|re|s|t|ve))?";
var rsOptContrUpper = "(?:" + rsApos + "(?:D|LL|M|RE|S|T|VE))?";
var reOptMod2 = rsModifier2 + "?";
var rsOptVar2 = "[" + rsVarRange3 + "]?";
var rsOptJoin2 = "(?:" + rsZWJ3 + "(?:" + [rsNonAstral2, rsRegional2, rsSurrPair2].join("|") + ")" + rsOptVar2 + reOptMod2 + ")*";
var rsOrdLower = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])";
var rsOrdUpper = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])";
var rsSeq2 = rsOptVar2 + reOptMod2 + rsOptJoin2;
var rsEmoji = "(?:" + [rsDingbat, rsRegional2, rsSurrPair2].join("|") + ")" + rsSeq2;
var reUnicodeWord = RegExp([
  rsUpper + "?" + rsLower + "+" + rsOptContrLower + "(?=" + [rsBreak, rsUpper, "$"].join("|") + ")",
  rsMiscUpper + "+" + rsOptContrUpper + "(?=" + [rsBreak, rsUpper + rsMiscLower, "$"].join("|") + ")",
  rsUpper + "?" + rsMiscLower + "+" + rsOptContrLower,
  rsUpper + "+" + rsOptContrUpper,
  rsOrdUpper,
  rsOrdLower,
  rsDigits,
  rsEmoji
].join("|"), "g");
function unicodeWords(string) {
  return string.match(reUnicodeWord) || [];
}
var unicodeWords_default = unicodeWords;

// ../../../../Project/100ls-native/node_modules/lodash-es/words.js
function words(string, pattern, guard) {
  string = toString_default(string);
  pattern = guard ? void 0 : pattern;
  if (pattern === void 0) {
    return hasUnicodeWord_default(string) ? unicodeWords_default(string) : asciiWords_default(string);
  }
  return string.match(pattern) || [];
}
var words_default = words;

// ../../../../Project/100ls-native/node_modules/lodash-es/_createCompounder.js
var rsApos2 = "['’]";
var reApos = RegExp(rsApos2, "g");
function createCompounder(callback) {
  return function(string) {
    return arrayReduce_default(words_default(deburr_default(string).replace(reApos, "")), callback, "");
  };
}
var createCompounder_default = createCompounder;

// ../../../../Project/100ls-native/node_modules/lodash-es/camelCase.js
var camelCase = createCompounder_default(function(result2, word, index2) {
  word = word.toLowerCase();
  return result2 + (index2 ? capitalize_default(word) : word);
});
var camelCase_default = camelCase;

// ../../../../Project/100ls-native/node_modules/lodash-es/castArray.js
function castArray() {
  if (!arguments.length) {
    return [];
  }
  var value = arguments[0];
  return isArray_default(value) ? value : [value];
}
var castArray_default = castArray;

// ../../../../Project/100ls-native/node_modules/lodash-es/_createRound.js
var nativeIsFinite = root_default.isFinite;
var nativeMin4 = Math.min;
function createRound(methodName) {
  var func = Math[methodName];
  return function(number, precision) {
    number = toNumber_default(number);
    precision = precision == null ? 0 : nativeMin4(toInteger_default(precision), 292);
    if (precision && nativeIsFinite(number)) {
      var pair = (toString_default(number) + "e").split("e"), value = func(pair[0] + "e" + (+pair[1] + precision));
      pair = (toString_default(value) + "e").split("e");
      return +(pair[0] + "e" + (+pair[1] - precision));
    }
    return func(number);
  };
}
var createRound_default = createRound;

// ../../../../Project/100ls-native/node_modules/lodash-es/ceil.js
var ceil = createRound_default("ceil");
var ceil_default = ceil;

// ../../../../Project/100ls-native/node_modules/lodash-es/chain.js
function chain(value) {
  var result2 = wrapperLodash_default(value);
  result2.__chain__ = true;
  return result2;
}
var chain_default = chain;

// ../../../../Project/100ls-native/node_modules/lodash-es/chunk.js
var nativeCeil = Math.ceil;
var nativeMax6 = Math.max;
function chunk(array, size2, guard) {
  if (guard ? isIterateeCall_default(array, size2, guard) : size2 === void 0) {
    size2 = 1;
  } else {
    size2 = nativeMax6(toInteger_default(size2), 0);
  }
  var length = array == null ? 0 : array.length;
  if (!length || size2 < 1) {
    return [];
  }
  var index2 = 0, resIndex = 0, result2 = Array(nativeCeil(length / size2));
  while (index2 < length) {
    result2[resIndex++] = baseSlice_default(array, index2, index2 += size2);
  }
  return result2;
}
var chunk_default = chunk;

// ../../../../Project/100ls-native/node_modules/lodash-es/_baseClamp.js
function baseClamp(number, lower, upper) {
  if (number === number) {
    if (upper !== void 0) {
      number = number <= upper ? number : upper;
    }
    if (lower !== void 0) {
      number = number >= lower ? number : lower;
    }
  }
  return number;
}
var baseClamp_default = baseClamp;

// ../../../../Project/100ls-native/node_modules/lodash-es/clamp.js
function clamp(number, lower, upper) {
  if (upper === void 0) {
    upper = lower;
    lower = void 0;
  }
  if (upper !== void 0) {
    upper = toNumber_default(upper);
    upper = upper === upper ? upper : 0;
  }
  if (lower !== void 0) {
    lower = toNumber_default(lower);
    lower = lower === lower ? lower : 0;
  }
  return baseClamp_default(toNumber_default(number), lower, upper);
}
var clamp_default = clamp;

// ../../../../Project/100ls-native/node_modules/lodash-es/_stackClear.js
function stackClear() {
  this.__data__ = new ListCache_default();
  this.size = 0;
}
var stackClear_default = stackClear;

// ../../../../Project/100ls-native/node_modules/lodash-es/_stackDelete.js
function stackDelete(key) {
  var data = this.__data__, result2 = data["delete"](key);
  this.size = data.size;
  return result2;
}
var stackDelete_default = stackDelete;

// ../../../../Project/100ls-native/node_modules/lodash-es/_stackGet.js
function stackGet(key) {
  return this.__data__.get(key);
}
var stackGet_default = stackGet;

// ../../../../Project/100ls-native/node_modules/lodash-es/_stackHas.js
function stackHas(key) {
  return this.__data__.has(key);
}
var stackHas_default = stackHas;

// ../../../../Project/100ls-native/node_modules/lodash-es/_stackSet.js
var LARGE_ARRAY_SIZE = 200;
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache_default) {
    var pairs = data.__data__;
    if (!Map_default || pairs.length < LARGE_ARRAY_SIZE - 1) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache_default(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}
var stackSet_default = stackSet;

// ../../../../Project/100ls-native/node_modules/lodash-es/_Stack.js
function Stack(entries) {
  var data = this.__data__ = new ListCache_default(entries);
  this.size = data.size;
}
Stack.prototype.clear = stackClear_default;
Stack.prototype["delete"] = stackDelete_default;
Stack.prototype.get = stackGet_default;
Stack.prototype.has = stackHas_default;
Stack.prototype.set = stackSet_default;
var Stack_default = Stack;

// ../../../../Project/100ls-native/node_modules/lodash-es/_baseAssign.js
function baseAssign(object, source) {
  return object && copyObject_default(source, keys_default(source), object);
}
var baseAssign_default = baseAssign;

// ../../../../Project/100ls-native/node_modules/lodash-es/_baseAssignIn.js
function baseAssignIn(object, source) {
  return object && copyObject_default(source, keysIn_default(source), object);
}
var baseAssignIn_default = baseAssignIn;

// ../../../../Project/100ls-native/node_modules/lodash-es/_cloneBuffer.js
var freeExports3 = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule3 = freeExports3 && typeof module == "object" && module && !module.nodeType && module;
var moduleExports3 = freeModule3 && freeModule3.exports === freeExports3;
var Buffer3 = moduleExports3 ? root_default.Buffer : void 0;
var allocUnsafe = Buffer3 ? Buffer3.allocUnsafe : void 0;
function cloneBuffer(buffer, isDeep2) {
  if (isDeep2) {
    return buffer.slice();
  }
  var length = buffer.length, result2 = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
  buffer.copy(result2);
  return result2;
}
var cloneBuffer_default = cloneBuffer;

// ../../../../Project/100ls-native/node_modules/lodash-es/_arrayFilter.js
function arrayFilter(array, predicate) {
  var index2 = -1, length = array == null ? 0 : array.length, resIndex = 0, result2 = [];
  while (++index2 < length) {
    var value = array[index2];
    if (predicate(value, index2, array)) {
      result2[resIndex++] = value;
    }
  }
  return result2;
}
var arrayFilter_default = arrayFilter;

// ../../../../Project/100ls-native/node_modules/lodash-es/stubArray.js
function stubArray() {
  return [];
}
var stubArray_default = stubArray;

// ../../../../Project/100ls-native/node_modules/lodash-es/_getSymbols.js
var objectProto16 = Object.prototype;
var propertyIsEnumerable2 = objectProto16.propertyIsEnumerable;
var nativeGetSymbols = Object.getOwnPropertySymbols;
var getSymbols = !nativeGetSymbols ? stubArray_default : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter_default(nativeGetSymbols(object), function(symbol) {
    return propertyIsEnumerable2.call(object, symbol);
  });
};
var getSymbols_default = getSymbols;

// ../../../../Project/100ls-native/node_modules/lodash-es/_copySymbols.js
function copySymbols(source, object) {
  return copyObject_default(source, getSymbols_default(source), object);
}
var copySymbols_default = copySymbols;

// ../../../../Project/100ls-native/node_modules/lodash-es/_getSymbolsIn.js
var nativeGetSymbols2 = Object.getOwnPropertySymbols;
var getSymbolsIn = !nativeGetSymbols2 ? stubArray_default : function(object) {
  var result2 = [];
  while (object) {
    arrayPush_default(result2, getSymbols_default(object));
    object = getPrototype_default(object);
  }
  return result2;
};
var getSymbolsIn_default = getSymbolsIn;

// ../../../../Project/100ls-native/node_modules/lodash-es/_copySymbolsIn.js
function copySymbolsIn(source, object) {
  return copyObject_default(source, getSymbolsIn_default(source), object);
}
var copySymbolsIn_default = copySymbolsIn;

// ../../../../Project/100ls-native/node_modules/lodash-es/_baseGetAllKeys.js
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result2 = keysFunc(object);
  return isArray_default(object) ? result2 : arrayPush_default(result2, symbolsFunc(object));
}
var baseGetAllKeys_default = baseGetAllKeys;

// ../../../../Project/100ls-native/node_modules/lodash-es/_getAllKeys.js
function getAllKeys(object) {
  return baseGetAllKeys_default(object, keys_default, getSymbols_default);
}
var getAllKeys_default = getAllKeys;

// ../../../../Project/100ls-native/node_modules/lodash-es/_getAllKeysIn.js
function getAllKeysIn(object) {
  return baseGetAllKeys_default(object, keysIn_default, getSymbolsIn_default);
}
var getAllKeysIn_default = getAllKeysIn;

// ../../../../Project/100ls-native/node_modules/lodash-es/_DataView.js
var DataView2 = getNative_default(root_default, "DataView");
var DataView_default = DataView2;

// ../../../../Project/100ls-native/node_modules/lodash-es/_Promise.js
var Promise2 = getNative_default(root_default, "Promise");
var Promise_default = Promise2;

// ../../../../Project/100ls-native/node_modules/lodash-es/_Set.js
var Set2 = getNative_default(root_default, "Set");
var Set_default = Set2;

// ../../../../Project/100ls-native/node_modules/lodash-es/_getTag.js
var mapTag2 = "[object Map]";
var objectTag3 = "[object Object]";
var promiseTag = "[object Promise]";
var setTag2 = "[object Set]";
var weakMapTag2 = "[object WeakMap]";
var dataViewTag2 = "[object DataView]";
var dataViewCtorString = toSource_default(DataView_default);
var mapCtorString = toSource_default(Map_default);
var promiseCtorString = toSource_default(Promise_default);
var setCtorString = toSource_default(Set_default);
var weakMapCtorString = toSource_default(WeakMap_default);
var getTag = baseGetTag_default;
if (DataView_default && getTag(new DataView_default(new ArrayBuffer(1))) != dataViewTag2 || Map_default && getTag(new Map_default()) != mapTag2 || Promise_default && getTag(Promise_default.resolve()) != promiseTag || Set_default && getTag(new Set_default()) != setTag2 || WeakMap_default && getTag(new WeakMap_default()) != weakMapTag2) {
  getTag = function(value) {
    var result2 = baseGetTag_default(value), Ctor = result2 == objectTag3 ? value.constructor : void 0, ctorString = Ctor ? toSource_default(Ctor) : "";
    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString:
          return dataViewTag2;
        case mapCtorString:
          return mapTag2;
        case promiseCtorString:
          return promiseTag;
        case setCtorString:
          return setTag2;
        case weakMapCtorString:
          return weakMapTag2;
      }
    }
    return result2;
  };
}
var getTag_default = getTag;

// ../../../../Project/100ls-native/node_modules/lodash-es/_initCloneArray.js
var objectProto17 = Object.prototype;
var hasOwnProperty14 = objectProto17.hasOwnProperty;
function initCloneArray(array) {
  var length = array.length, result2 = new array.constructor(length);
  if (length && typeof array[0] == "string" && hasOwnProperty14.call(array, "index")) {
    result2.index = array.index;
    result2.input = array.input;
  }
  return result2;
}
var initCloneArray_default = initCloneArray;

// ../../../../Project/100ls-native/node_modules/lodash-es/_Uint8Array.js
var Uint8Array2 = root_default.Uint8Array;
var Uint8Array_default = Uint8Array2;

// ../../../../Project/100ls-native/node_modules/lodash-es/_cloneArrayBuffer.js
function cloneArrayBuffer(arrayBuffer) {
  var result2 = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array_default(result2).set(new Uint8Array_default(arrayBuffer));
  return result2;
}
var cloneArrayBuffer_default = cloneArrayBuffer;

// ../../../../Project/100ls-native/node_modules/lodash-es/_cloneDataView.js
function cloneDataView(dataView, isDeep2) {
  var buffer = isDeep2 ? cloneArrayBuffer_default(dataView.buffer) : dataView.buffer;
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}
var cloneDataView_default = cloneDataView;

// ../../../../Project/100ls-native/node_modules/lodash-es/_cloneRegExp.js
var reFlags = /\w*$/;
function cloneRegExp(regexp) {
  var result2 = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result2.lastIndex = regexp.lastIndex;
  return result2;
}
var cloneRegExp_default = cloneRegExp;

// ../../../../Project/100ls-native/node_modules/lodash-es/_cloneSymbol.js
var symbolProto2 = Symbol_default ? Symbol_default.prototype : void 0;
var symbolValueOf = symbolProto2 ? symbolProto2.valueOf : void 0;
function cloneSymbol(symbol) {
  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
}
var cloneSymbol_default = cloneSymbol;

// ../../../../Project/100ls-native/node_modules/lodash-es/_cloneTypedArray.js
function cloneTypedArray(typedArray, isDeep2) {
  var buffer = isDeep2 ? cloneArrayBuffer_default(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}
var cloneTypedArray_default = cloneTypedArray;

// ../../../../Project/100ls-native/node_modules/lodash-es/_initCloneByTag.js
var boolTag2 = "[object Boolean]";
var dateTag2 = "[object Date]";
var mapTag3 = "[object Map]";
var numberTag2 = "[object Number]";
var regexpTag2 = "[object RegExp]";
var setTag3 = "[object Set]";
var stringTag2 = "[object String]";
var symbolTag2 = "[object Symbol]";
var arrayBufferTag2 = "[object ArrayBuffer]";
var dataViewTag3 = "[object DataView]";
var float32Tag2 = "[object Float32Array]";
var float64Tag2 = "[object Float64Array]";
var int8Tag2 = "[object Int8Array]";
var int16Tag2 = "[object Int16Array]";
var int32Tag2 = "[object Int32Array]";
var uint8Tag2 = "[object Uint8Array]";
var uint8ClampedTag2 = "[object Uint8ClampedArray]";
var uint16Tag2 = "[object Uint16Array]";
var uint32Tag2 = "[object Uint32Array]";
function initCloneByTag(object, tag, isDeep2) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag2:
      return cloneArrayBuffer_default(object);
    case boolTag2:
    case dateTag2:
      return new Ctor(+object);
    case dataViewTag3:
      return cloneDataView_default(object, isDeep2);
    case float32Tag2:
    case float64Tag2:
    case int8Tag2:
    case int16Tag2:
    case int32Tag2:
    case uint8Tag2:
    case uint8ClampedTag2:
    case uint16Tag2:
    case uint32Tag2:
      return cloneTypedArray_default(object, isDeep2);
    case mapTag3:
      return new Ctor();
    case numberTag2:
    case stringTag2:
      return new Ctor(object);
    case regexpTag2:
      return cloneRegExp_default(object);
    case setTag3:
      return new Ctor();
    case symbolTag2:
      return cloneSymbol_default(object);
  }
}
var initCloneByTag_default = initCloneByTag;

// ../../../../Project/100ls-native/node_modules/lodash-es/_initCloneObject.js
function initCloneObject(object) {
  return typeof object.constructor == "function" && !isPrototype_default(object) ? baseCreate_default(getPrototype_default(object)) : {};
}
var initCloneObject_default = initCloneObject;

// ../../../../Project/100ls-native/node_modules/lodash-es/_baseIsMap.js
var mapTag4 = "[object Map]";
function baseIsMap(value) {
  return isObjectLike_default(value) && getTag_default(value) == mapTag4;
}
var baseIsMap_default = baseIsMap;

// ../../../../Project/100ls-native/node_modules/lodash-es/isMap.js
var nodeIsMap = nodeUtil_default && nodeUtil_default.isMap;
var isMap = nodeIsMap ? baseUnary_default(nodeIsMap) : baseIsMap_default;
var isMap_default = isMap;

// ../../../../Project/100ls-native/node_modules/lodash-es/_baseIsSet.js
var setTag4 = "[object Set]";
function baseIsSet(value) {
  return isObjectLike_default(value) && getTag_default(value) == setTag4;
}
var baseIsSet_default = baseIsSet;

// ../../../../Project/100ls-native/node_modules/lodash-es/isSet.js
var nodeIsSet = nodeUtil_default && nodeUtil_default.isSet;
var isSet = nodeIsSet ? baseUnary_default(nodeIsSet) : baseIsSet_default;
var isSet_default = isSet;

// ../../../../Project/100ls-native/node_modules/lodash-es/_baseClone.js
var CLONE_DEEP_FLAG = 1;
var CLONE_FLAT_FLAG = 2;
var CLONE_SYMBOLS_FLAG = 4;
var argsTag3 = "[object Arguments]";
var arrayTag2 = "[object Array]";
var boolTag3 = "[object Boolean]";
var dateTag3 = "[object Date]";
var errorTag3 = "[object Error]";
var funcTag3 = "[object Function]";
var genTag2 = "[object GeneratorFunction]";
var mapTag5 = "[object Map]";
var numberTag3 = "[object Number]";
var objectTag4 = "[object Object]";
var regexpTag3 = "[object RegExp]";
var setTag5 = "[object Set]";
var stringTag3 = "[object String]";
var symbolTag3 = "[object Symbol]";
var weakMapTag3 = "[object WeakMap]";
var arrayBufferTag3 = "[object ArrayBuffer]";
var dataViewTag4 = "[object DataView]";
var float32Tag3 = "[object Float32Array]";
var float64Tag3 = "[object Float64Array]";
var int8Tag3 = "[object Int8Array]";
var int16Tag3 = "[object Int16Array]";
var int32Tag3 = "[object Int32Array]";
var uint8Tag3 = "[object Uint8Array]";
var uint8ClampedTag3 = "[object Uint8ClampedArray]";
var uint16Tag3 = "[object Uint16Array]";
var uint32Tag3 = "[object Uint32Array]";
var cloneableTags = {};
cloneableTags[argsTag3] = cloneableTags[arrayTag2] = cloneableTags[arrayBufferTag3] = cloneableTags[dataViewTag4] = cloneableTags[boolTag3] = cloneableTags[dateTag3] = cloneableTags[float32Tag3] = cloneableTags[float64Tag3] = cloneableTags[int8Tag3] = cloneableTags[int16Tag3] = cloneableTags[int32Tag3] = cloneableTags[mapTag5] = cloneableTags[numberTag3] = cloneableTags[objectTag4] = cloneableTags[regexpTag3] = cloneableTags[setTag5] = cloneableTags[stringTag3] = cloneableTags[symbolTag3] = cloneableTags[uint8Tag3] = cloneableTags[uint8ClampedTag3] = cloneableTags[uint16Tag3] = cloneableTags[uint32Tag3] = true;
cloneableTags[errorTag3] = cloneableTags[funcTag3] = cloneableTags[weakMapTag3] = false;
function baseClone(value, bitmask, customizer, key, object, stack) {
  var result2, isDeep2 = bitmask & CLONE_DEEP_FLAG, isFlat = bitmask & CLONE_FLAT_FLAG, isFull = bitmask & CLONE_SYMBOLS_FLAG;
  if (customizer) {
    result2 = object ? customizer(value, key, object, stack) : customizer(value);
  }
  if (result2 !== void 0) {
    return result2;
  }
  if (!isObject_default(value)) {
    return value;
  }
  var isArr = isArray_default(value);
  if (isArr) {
    result2 = initCloneArray_default(value);
    if (!isDeep2) {
      return copyArray_default(value, result2);
    }
  } else {
    var tag = getTag_default(value), isFunc = tag == funcTag3 || tag == genTag2;
    if (isBuffer_default(value)) {
      return cloneBuffer_default(value, isDeep2);
    }
    if (tag == objectTag4 || tag == argsTag3 || isFunc && !object) {
      result2 = isFlat || isFunc ? {} : initCloneObject_default(value);
      if (!isDeep2) {
        return isFlat ? copySymbolsIn_default(value, baseAssignIn_default(result2, value)) : copySymbols_default(value, baseAssign_default(result2, value));
      }
    } else {
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }
      result2 = initCloneByTag_default(value, tag, isDeep2);
    }
  }
  stack || (stack = new Stack_default());
  var stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result2);
  if (isSet_default(value)) {
    value.forEach(function(subValue) {
      result2.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
    });
  } else if (isMap_default(value)) {
    value.forEach(function(subValue, key2) {
      result2.set(key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
    });
  }
  var keysFunc = isFull ? isFlat ? getAllKeysIn_default : getAllKeys_default : isFlat ? keysIn_default : keys_default;
  var props = isArr ? void 0 : keysFunc(value);
  arrayEach_default(props || value, function(subValue, key2) {
    if (props) {
      key2 = subValue;
      subValue = value[key2];
    }
    assignValue_default(result2, key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
  });
  return result2;
}
var baseClone_default = baseClone;

// ../../../../Project/100ls-native/node_modules/lodash-es/clone.js
var CLONE_SYMBOLS_FLAG2 = 4;
function clone(value) {
  return baseClone_default(value, CLONE_SYMBOLS_FLAG2);
}
var clone_default = clone;

// ../../../../Project/100ls-native/node_modules/lodash-es/cloneDeep.js
var CLONE_DEEP_FLAG2 = 1;
var CLONE_SYMBOLS_FLAG3 = 4;
function cloneDeep(value) {
  return baseClone_default(value, CLONE_DEEP_FLAG2 | CLONE_SYMBOLS_FLAG3);
}
var cloneDeep_default = cloneDeep;

// ../../../../Project/100ls-native/node_modules/lodash-es/cloneDeepWith.js
var CLONE_DEEP_FLAG3 = 1;
var CLONE_SYMBOLS_FLAG4 = 4;
function cloneDeepWith(value, customizer) {
  customizer = typeof customizer == "function" ? customizer : void 0;
  return baseClone_default(value, CLONE_DEEP_FLAG3 | CLONE_SYMBOLS_FLAG4, customizer);
}
var cloneDeepWith_default = cloneDeepWith;

// ../../../../Project/100ls-native/node_modules/lodash-es/cloneWith.js
var CLONE_SYMBOLS_FLAG5 = 4;
function cloneWith(value, customizer) {
  customizer = typeof customizer == "function" ? customizer : void 0;
  return baseClone_default(value, CLONE_SYMBOLS_FLAG5, customizer);
}
var cloneWith_default = cloneWith;

// ../../../../Project/100ls-native/node_modules/lodash-es/commit.js
function wrapperCommit() {
  return new LodashWrapper_default(this.value(), this.__chain__);
}
var commit_default = wrapperCommit;

// ../../../../Project/100ls-native/node_modules/lodash-es/compact.js
function compact(array) {
  var index2 = -1, length = array == null ? 0 : array.length, resIndex = 0, result2 = [];
  while (++index2 < length) {
    var value = array[index2];
    if (value) {
      result2[resIndex++] = value;
    }
  }
  return result2;
}
var compact_default = compact;

// ../../../../Project/100ls-native/node_modules/lodash-es/concat.js
function concat() {
  var length = arguments.length;
  if (!length) {
    return [];
  }
  var args = Array(length - 1), array = arguments[0], index2 = length;
  while (index2--) {
    args[index2 - 1] = arguments[index2];
  }
  return arrayPush_default(isArray_default(array) ? copyArray_default(array) : [array], baseFlatten_default(args, 1));
}
var concat_default = concat;

// ../../../../Project/100ls-native/node_modules/lodash-es/_setCacheAdd.js
var HASH_UNDEFINED3 = "__lodash_hash_undefined__";
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED3);
  return this;
}
var setCacheAdd_default = setCacheAdd;

// ../../../../Project/100ls-native/node_modules/lodash-es/_setCacheHas.js
function setCacheHas(value) {
  return this.__data__.has(value);
}
var setCacheHas_default = setCacheHas;

// ../../../../Project/100ls-native/node_modules/lodash-es/_SetCache.js
function SetCache(values2) {
  var index2 = -1, length = values2 == null ? 0 : values2.length;
  this.__data__ = new MapCache_default();
  while (++index2 < length) {
    this.add(values2[index2]);
  }
}
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd_default;
SetCache.prototype.has = setCacheHas_default;
var SetCache_default = SetCache;

// ../../../../Project/100ls-native/node_modules/lodash-es/_arraySome.js
function arraySome(array, predicate) {
  var index2 = -1, length = array == null ? 0 : array.length;
  while (++index2 < length) {
    if (predicate(array[index2], index2, array)) {
      return true;
    }
  }
  return false;
}
var arraySome_default = arraySome;

// ../../../../Project/100ls-native/node_modules/lodash-es/_cacheHas.js
function cacheHas(cache2, key) {
  return cache2.has(key);
}
var cacheHas_default = cacheHas;

// ../../../../Project/100ls-native/node_modules/lodash-es/_equalArrays.js
var COMPARE_PARTIAL_FLAG = 1;
var COMPARE_UNORDERED_FLAG = 2;
function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG, arrLength = array.length, othLength = other.length;
  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  var arrStacked = stack.get(array);
  var othStacked = stack.get(other);
  if (arrStacked && othStacked) {
    return arrStacked == other && othStacked == array;
  }
  var index2 = -1, result2 = true, seen = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache_default() : void 0;
  stack.set(array, other);
  stack.set(other, array);
  while (++index2 < arrLength) {
    var arrValue = array[index2], othValue = other[index2];
    if (customizer) {
      var compared = isPartial ? customizer(othValue, arrValue, index2, other, array, stack) : customizer(arrValue, othValue, index2, array, other, stack);
    }
    if (compared !== void 0) {
      if (compared) {
        continue;
      }
      result2 = false;
      break;
    }
    if (seen) {
      if (!arraySome_default(other, function(othValue2, othIndex) {
        if (!cacheHas_default(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack))) {
          return seen.push(othIndex);
        }
      })) {
        result2 = false;
        break;
      }
    } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
      result2 = false;
      break;
    }
  }
  stack["delete"](array);
  stack["delete"](other);
  return result2;
}
var equalArrays_default = equalArrays;

// ../../../../Project/100ls-native/node_modules/lodash-es/_mapToArray.js
function mapToArray(map2) {
  var index2 = -1, result2 = Array(map2.size);
  map2.forEach(function(value, key) {
    result2[++index2] = [key, value];
  });
  return result2;
}
var mapToArray_default = mapToArray;

// ../../../../Project/100ls-native/node_modules/lodash-es/_setToArray.js
function setToArray(set2) {
  var index2 = -1, result2 = Array(set2.size);
  set2.forEach(function(value) {
    result2[++index2] = value;
  });
  return result2;
}
var setToArray_default = setToArray;

// ../../../../Project/100ls-native/node_modules/lodash-es/_equalByTag.js
var COMPARE_PARTIAL_FLAG2 = 1;
var COMPARE_UNORDERED_FLAG2 = 2;
var boolTag4 = "[object Boolean]";
var dateTag4 = "[object Date]";
var errorTag4 = "[object Error]";
var mapTag6 = "[object Map]";
var numberTag4 = "[object Number]";
var regexpTag4 = "[object RegExp]";
var setTag6 = "[object Set]";
var stringTag4 = "[object String]";
var symbolTag4 = "[object Symbol]";
var arrayBufferTag4 = "[object ArrayBuffer]";
var dataViewTag5 = "[object DataView]";
var symbolProto3 = Symbol_default ? Symbol_default.prototype : void 0;
var symbolValueOf2 = symbolProto3 ? symbolProto3.valueOf : void 0;
function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag5:
      if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;
    case arrayBufferTag4:
      if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array_default(object), new Uint8Array_default(other))) {
        return false;
      }
      return true;
    case boolTag4:
    case dateTag4:
    case numberTag4:
      return eq_default(+object, +other);
    case errorTag4:
      return object.name == other.name && object.message == other.message;
    case regexpTag4:
    case stringTag4:
      return object == other + "";
    case mapTag6:
      var convert = mapToArray_default;
    case setTag6:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG2;
      convert || (convert = setToArray_default);
      if (object.size != other.size && !isPartial) {
        return false;
      }
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= COMPARE_UNORDERED_FLAG2;
      stack.set(object, other);
      var result2 = equalArrays_default(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
      stack["delete"](object);
      return result2;
    case symbolTag4:
      if (symbolValueOf2) {
        return symbolValueOf2.call(object) == symbolValueOf2.call(other);
      }
  }
  return false;
}
var equalByTag_default = equalByTag;

// ../../../../Project/100ls-native/node_modules/lodash-es/_equalObjects.js
var COMPARE_PARTIAL_FLAG3 = 1;
var objectProto18 = Object.prototype;
var hasOwnProperty15 = objectProto18.hasOwnProperty;
function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG3, objProps = getAllKeys_default(object), objLength = objProps.length, othProps = getAllKeys_default(other), othLength = othProps.length;
  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index2 = objLength;
  while (index2--) {
    var key = objProps[index2];
    if (!(isPartial ? key in other : hasOwnProperty15.call(other, key))) {
      return false;
    }
  }
  var objStacked = stack.get(object);
  var othStacked = stack.get(other);
  if (objStacked && othStacked) {
    return objStacked == other && othStacked == object;
  }
  var result2 = true;
  stack.set(object, other);
  stack.set(other, object);
  var skipCtor = isPartial;
  while (++index2 < objLength) {
    key = objProps[index2];
    var objValue = object[key], othValue = other[key];
    if (customizer) {
      var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
    }
    if (!(compared === void 0 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
      result2 = false;
      break;
    }
    skipCtor || (skipCtor = key == "constructor");
  }
  if (result2 && !skipCtor) {
    var objCtor = object.constructor, othCtor = other.constructor;
    if (objCtor != othCtor && ("constructor" in object && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
      result2 = false;
    }
  }
  stack["delete"](object);
  stack["delete"](other);
  return result2;
}
var equalObjects_default = equalObjects;

// ../../../../Project/100ls-native/node_modules/lodash-es/_baseIsEqualDeep.js
var COMPARE_PARTIAL_FLAG4 = 1;
var argsTag4 = "[object Arguments]";
var arrayTag3 = "[object Array]";
var objectTag5 = "[object Object]";
var objectProto19 = Object.prototype;
var hasOwnProperty16 = objectProto19.hasOwnProperty;
function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray_default(object), othIsArr = isArray_default(other), objTag = objIsArr ? arrayTag3 : getTag_default(object), othTag = othIsArr ? arrayTag3 : getTag_default(other);
  objTag = objTag == argsTag4 ? objectTag5 : objTag;
  othTag = othTag == argsTag4 ? objectTag5 : othTag;
  var objIsObj = objTag == objectTag5, othIsObj = othTag == objectTag5, isSameTag = objTag == othTag;
  if (isSameTag && isBuffer_default(object)) {
    if (!isBuffer_default(other)) {
      return false;
    }
    objIsArr = true;
    objIsObj = false;
  }
  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack_default());
    return objIsArr || isTypedArray_default(object) ? equalArrays_default(object, other, bitmask, customizer, equalFunc, stack) : equalByTag_default(object, other, objTag, bitmask, customizer, equalFunc, stack);
  }
  if (!(bitmask & COMPARE_PARTIAL_FLAG4)) {
    var objIsWrapped = objIsObj && hasOwnProperty16.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty16.call(other, "__wrapped__");
    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
      stack || (stack = new Stack_default());
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack_default());
  return equalObjects_default(object, other, bitmask, customizer, equalFunc, stack);
}
var baseIsEqualDeep_default = baseIsEqualDeep;

// ../../../../Project/100ls-native/node_modules/lodash-es/_baseIsEqual.js
function baseIsEqual(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || !isObjectLike_default(value) && !isObjectLike_default(other)) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep_default(value, other, bitmask, customizer, baseIsEqual, stack);
}
var baseIsEqual_default = baseIsEqual;

// ../../../../Project/100ls-native/node_modules/lodash-es/_baseIsMatch.js
var COMPARE_PARTIAL_FLAG5 = 1;
var COMPARE_UNORDERED_FLAG3 = 2;
function baseIsMatch(object, source, matchData, customizer) {
  var index2 = matchData.length, length = index2, noCustomizer = !customizer;
  if (object == null) {
    return !length;
  }
  object = Object(object);
  while (index2--) {
    var data = matchData[index2];
    if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
      return false;
    }
  }
  while (++index2 < length) {
    data = matchData[index2];
    var key = data[0], objValue = object[key], srcValue = data[1];
    if (noCustomizer && data[2]) {
      if (objValue === void 0 && !(key in object)) {
        return false;
      }
    } else {
      var stack = new Stack_default();
      if (customizer) {
        var result2 = customizer(objValue, srcValue, key, object, source, stack);
      }
      if (!(result2 === void 0 ? baseIsEqual_default(srcValue, objValue, COMPARE_PARTIAL_FLAG5 | COMPARE_UNORDERED_FLAG3, customizer, stack) : result2)) {
        return false;
      }
    }
  }
  return true;
}
var baseIsMatch_default = baseIsMatch;

// ../../../../Project/100ls-native/node_modules/lodash-es/_isStrictComparable.js
function isStrictComparable(value) {
  return value === value && !isObject_default(value);
}
var isStrictComparable_default = isStrictComparable;

// ../../../../Project/100ls-native/node_modules/lodash-es/_getMatchData.js
function getMatchData(object) {
  var result2 = keys_default(object), length = result2.length;
  while (length--) {
    var key = result2[length], value = object[key];
    result2[length] = [key, value, isStrictComparable_default(value)];
  }
  return result2;
}
var getMatchData_default = getMatchData;

// ../../../../Project/100ls-native/node_modules/lodash-es/_matchesStrictComparable.js
function matchesStrictComparable(key, srcValue) {
  return function(object) {
    if (object == null) {
      return false;
    }
    return object[key] === srcValue && (srcValue !== void 0 || key in Object(object));
  };
}
var matchesStrictComparable_default = matchesStrictComparable;

// ../../../../Project/100ls-native/node_modules/lodash-es/_baseMatches.js
function baseMatches(source) {
  var matchData = getMatchData_default(source);
  if (matchData.length == 1 && matchData[0][2]) {
    return matchesStrictComparable_default(matchData[0][0], matchData[0][1]);
  }
  return function(object) {
    return object === source || baseIsMatch_default(object, source, matchData);
  };
}
var baseMatches_default = baseMatches;

// ../../../../Project/100ls-native/node_modules/lodash-es/_baseHasIn.js
function baseHasIn(object, key) {
  return object != null && key in Object(object);
}
var baseHasIn_default = baseHasIn;

// ../../../../Project/100ls-native/node_modules/lodash-es/_hasPath.js
function hasPath(object, path, hasFunc) {
  path = castPath_default(path, object);
  var index2 = -1, length = path.length, result2 = false;
  while (++index2 < length) {
    var key = toKey_default(path[index2]);
    if (!(result2 = object != null && hasFunc(object, key))) {
      break;
    }
    object = object[key];
  }
  if (result2 || ++index2 != length) {
    return result2;
  }
  length = object == null ? 0 : object.length;
  return !!length && isLength_default(length) && isIndex_default(key, length) && (isArray_default(object) || isArguments_default(object));
}
var hasPath_default = hasPath;

// ../../../../Project/100ls-native/node_modules/lodash-es/hasIn.js
function hasIn(object, path) {
  return object != null && hasPath_default(object, path, baseHasIn_default);
}
var hasIn_default = hasIn;

// ../../../../Project/100ls-native/node_modules/lodash-es/_baseMatchesProperty.js
var COMPARE_PARTIAL_FLAG6 = 1;
var COMPARE_UNORDERED_FLAG4 = 2;
function baseMatchesProperty(path, srcValue) {
  if (isKey_default(path) && isStrictComparable_default(srcValue)) {
    return matchesStrictComparable_default(toKey_default(path), srcValue);
  }
  return function(object) {
    var objValue = get_default(object, path);
    return objValue === void 0 && objValue === srcValue ? hasIn_default(object, path) : baseIsEqual_default(srcValue, objValue, COMPARE_PARTIAL_FLAG6 | COMPARE_UNORDERED_FLAG4);
  };
}
var baseMatchesProperty_default = baseMatchesProperty;

// ../../../../Project/100ls-native/node_modules/lodash-es/_baseProperty.js
function baseProperty(key) {
  return function(object) {
    return object == null ? void 0 : object[key];
  };
}
var baseProperty_default = baseProperty;

// ../../../../Project/100ls-native/node_modules/lodash-es/_basePropertyDeep.js
function basePropertyDeep(path) {
  return function(object) {
    return baseGet_default(object, path);
  };
}
var basePropertyDeep_default = basePropertyDeep;

// ../../../../Project/100ls-native/node_modules/lodash-es/property.js
function property(path) {
  return isKey_default(path) ? baseProperty_default(toKey_default(path)) : basePropertyDeep_default(path);
}
var property_default = property;

// ../../../../Project/100ls-native/node_modules/lodash-es/_baseIteratee.js
function baseIteratee(value) {
  if (typeof value == "function") {
    return value;
  }
  if (value == null) {
    return identity_default;
  }
  if (typeof value == "object") {
    return isArray_default(value) ? baseMatchesProperty_default(value[0], value[1]) : baseMatches_default(value);
  }
  return property_default(value);
}
var baseIteratee_default = baseIteratee;

// ../../../../Project/100ls-native/node_modules/lodash-es/cond.js
var FUNC_ERROR_TEXT6 = "Expected a function";
function cond(pairs) {
  var length = pairs == null ? 0 : pairs.length, toIteratee = baseIteratee_default;
  pairs = !length ? [] : arrayMap_default(pairs, function(pair) {
    if (typeof pair[1] != "function") {
      throw new TypeError(FUNC_ERROR_TEXT6);
    }
    return [toIteratee(pair[0]), pair[1]];
  });
  return baseRest_default(function(args) {
    var index2 = -1;
    while (++index2 < length) {
      var pair = pairs[index2];
      if (apply_default(pair[0], this, args)) {
        return apply_default(pair[1], this, args);
      }
    }
  });
}
var cond_default = cond;

// ../../../../Project/100ls-native/node_modules/lodash-es/_baseConformsTo.js
function baseConformsTo(object, source, props) {
  var length = props.length;
  if (object == null) {
    return !length;
  }
  object = Object(object);
  while (length--) {
    var key = props[length], predicate = source[key], value = object[key];
    if (value === void 0 && !(key in object) || !predicate(value)) {
      return false;
    }
  }
  return true;
}
var baseConformsTo_default = baseConformsTo;

// ../../../../Project/100ls-native/node_modules/lodash-es/_baseConforms.js
function baseConforms(source) {
  var props = keys_default(source);
  return function(object) {
    return baseConformsTo_default(object, source, props);
  };
}
var baseConforms_default = baseConforms;

// ../../../../Project/100ls-native/node_modules/lodash-es/conforms.js
var CLONE_DEEP_FLAG4 = 1;
function conforms(source) {
  return baseConforms_default(baseClone_default(source, CLONE_DEEP_FLAG4));
}
var conforms_default = conforms;

// ../../../../Project/100ls-native/node_modules/lodash-es/conformsTo.js
function conformsTo(object, source) {
  return source == null || baseConformsTo_default(object, source, keys_default(source));
}
var conformsTo_default = conformsTo;

// ../../../../Project/100ls-native/node_modules/lodash-es/_arrayAggregator.js
function arrayAggregator(array, setter, iteratee2, accumulator) {
  var index2 = -1, length = array == null ? 0 : array.length;
  while (++index2 < length) {
    var value = array[index2];
    setter(accumulator, value, iteratee2(value), array);
  }
  return accumulator;
}
var arrayAggregator_default = arrayAggregator;

// ../../../../Project/100ls-native/node_modules/lodash-es/_createBaseFor.js
function createBaseFor(fromRight) {
  return function(object, iteratee2, keysFunc) {
    var index2 = -1, iterable = Object(object), props = keysFunc(object), length = props.length;
    while (length--) {
      var key = props[fromRight ? length : ++index2];
      if (iteratee2(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}
var createBaseFor_default = createBaseFor;

// ../../../../Project/100ls-native/node_modules/lodash-es/_baseFor.js
var baseFor = createBaseFor_default();
var baseFor_default = baseFor;

// ../../../../Project/100ls-native/node_modules/lodash-es/_baseForOwn.js
function baseForOwn(object, iteratee2) {
  return object && baseFor_default(object, iteratee2, keys_default);
}
var baseForOwn_default = baseForOwn;

// ../../../../Project/100ls-native/node_modules/lodash-es/_createBaseEach.js
function createBaseEach(eachFunc, fromRight) {
  return function(collection, iteratee2) {
    if (collection == null) {
      return collection;
    }
    if (!isArrayLike_default(collection)) {
      return eachFunc(collection, iteratee2);
    }
    var length = collection.length, index2 = fromRight ? length : -1, iterable = Object(collection);
    while (fromRight ? index2-- : ++index2 < length) {
      if (iteratee2(iterable[index2], index2, iterable) === false) {
        break;
      }
    }
    return collection;
  };
}
var createBaseEach_default = createBaseEach;

// ../../../../Project/100ls-native/node_modules/lodash-es/_baseEach.js
var baseEach = createBaseEach_default(baseForOwn_default);
var baseEach_default = baseEach;

// ../../../../Project/100ls-native/node_modules/lodash-es/_baseAggregator.js
function baseAggregator(collection, setter, iteratee2, accumulator) {
  baseEach_default(collection, function(value, key, collection2) {
    setter(accumulator, value, iteratee2(value), collection2);
  });
  return accumulator;
}
var baseAggregator_default = baseAggregator;

// ../../../../Project/100ls-native/node_modules/lodash-es/_createAggregator.js
function createAggregator(setter, initializer) {
  return function(collection, iteratee2) {
    var func = isArray_default(collection) ? arrayAggregator_default : baseAggregator_default, accumulator = initializer ? initializer() : {};
    return func(collection, setter, baseIteratee_default(iteratee2, 2), accumulator);
  };
}
var createAggregator_default = createAggregator;

// ../../../../Project/100ls-native/node_modules/lodash-es/countBy.js
var objectProto20 = Object.prototype;
var hasOwnProperty17 = objectProto20.hasOwnProperty;
var countBy = createAggregator_default(function(result2, value, key) {
  if (hasOwnProperty17.call(result2, key)) {
    ++result2[key];
  } else {
    baseAssignValue_default(result2, key, 1);
  }
});
var countBy_default = countBy;

// ../../../../Project/100ls-native/node_modules/lodash-es/create.js
function create(prototype, properties) {
  var result2 = baseCreate_default(prototype);
  return properties == null ? result2 : baseAssign_default(result2, properties);
}
var create_default = create;

// ../../../../Project/100ls-native/node_modules/lodash-es/curry.js
var WRAP_CURRY_FLAG6 = 8;
function curry(func, arity, guard) {
  arity = guard ? void 0 : arity;
  var result2 = createWrap_default(func, WRAP_CURRY_FLAG6, void 0, void 0, void 0, void 0, void 0, arity);
  result2.placeholder = curry.placeholder;
  return result2;
}
curry.placeholder = {};
var curry_default = curry;

// ../../../../Project/100ls-native/node_modules/lodash-es/curryRight.js
var WRAP_CURRY_RIGHT_FLAG4 = 16;
function curryRight(func, arity, guard) {
  arity = guard ? void 0 : arity;
  var result2 = createWrap_default(func, WRAP_CURRY_RIGHT_FLAG4, void 0, void 0, void 0, void 0, void 0, arity);
  result2.placeholder = curryRight.placeholder;
  return result2;
}
curryRight.placeholder = {};
var curryRight_default = curryRight;

// ../../../../Project/100ls-native/node_modules/lodash-es/defaultTo.js
function defaultTo(value, defaultValue) {
  return value == null || value !== value ? defaultValue : value;
}
var defaultTo_default = defaultTo;

// ../../../../Project/100ls-native/node_modules/lodash-es/defaults.js
var objectProto21 = Object.prototype;
var hasOwnProperty18 = objectProto21.hasOwnProperty;
var defaults = baseRest_default(function(object, sources) {
  object = Object(object);
  var index2 = -1;
  var length = sources.length;
  var guard = length > 2 ? sources[2] : void 0;
  if (guard && isIterateeCall_default(sources[0], sources[1], guard)) {
    length = 1;
  }
  while (++index2 < length) {
    var source = sources[index2];
    var props = keysIn_default(source);
    var propsIndex = -1;
    var propsLength = props.length;
    while (++propsIndex < propsLength) {
      var key = props[propsIndex];
      var value = object[key];
      if (value === void 0 || eq_default(value, objectProto21[key]) && !hasOwnProperty18.call(object, key)) {
        object[key] = source[key];
      }
    }
  }
  return object;
});
var defaults_default = defaults;

// ../../../../Project/100ls-native/node_modules/lodash-es/_assignMergeValue.js
function assignMergeValue(object, key, value) {
  if (value !== void 0 && !eq_default(object[key], value) || value === void 0 && !(key in object)) {
    baseAssignValue_default(object, key, value);
  }
}
var assignMergeValue_default = assignMergeValue;

// ../../../../Project/100ls-native/node_modules/lodash-es/isArrayLikeObject.js
function isArrayLikeObject(value) {
  return isObjectLike_default(value) && isArrayLike_default(value);
}
var isArrayLikeObject_default = isArrayLikeObject;

// ../../../../Project/100ls-native/node_modules/lodash-es/_safeGet.js
function safeGet(object, key) {
  if (key === "constructor" && typeof object[key] === "function") {
    return;
  }
  if (key == "__proto__") {
    return;
  }
  return object[key];
}
var safeGet_default = safeGet;

// ../../../../Project/100ls-native/node_modules/lodash-es/toPlainObject.js
function toPlainObject(value) {
  return copyObject_default(value, keysIn_default(value));
}
var toPlainObject_default = toPlainObject;

// ../../../../Project/100ls-native/node_modules/lodash-es/_baseMergeDeep.js
function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
  var objValue = safeGet_default(object, key), srcValue = safeGet_default(source, key), stacked = stack.get(srcValue);
  if (stacked) {
    assignMergeValue_default(object, key, stacked);
    return;
  }
  var newValue = customizer ? customizer(objValue, srcValue, key + "", object, source, stack) : void 0;
  var isCommon = newValue === void 0;
  if (isCommon) {
    var isArr = isArray_default(srcValue), isBuff = !isArr && isBuffer_default(srcValue), isTyped = !isArr && !isBuff && isTypedArray_default(srcValue);
    newValue = srcValue;
    if (isArr || isBuff || isTyped) {
      if (isArray_default(objValue)) {
        newValue = objValue;
      } else if (isArrayLikeObject_default(objValue)) {
        newValue = copyArray_default(objValue);
      } else if (isBuff) {
        isCommon = false;
        newValue = cloneBuffer_default(srcValue, true);
      } else if (isTyped) {
        isCommon = false;
        newValue = cloneTypedArray_default(srcValue, true);
      } else {
        newValue = [];
      }
    } else if (isPlainObject_default(srcValue) || isArguments_default(srcValue)) {
      newValue = objValue;
      if (isArguments_default(objValue)) {
        newValue = toPlainObject_default(objValue);
      } else if (!isObject_default(objValue) || isFunction_default(objValue)) {
        newValue = initCloneObject_default(srcValue);
      }
    } else {
      isCommon = false;
    }
  }
  if (isCommon) {
    stack.set(srcValue, newValue);
    mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
    stack["delete"](srcValue);
  }
  assignMergeValue_default(object, key, newValue);
}
var baseMergeDeep_default = baseMergeDeep;

// ../../../../Project/100ls-native/node_modules/lodash-es/_baseMerge.js
function baseMerge(object, source, srcIndex, customizer, stack) {
  if (object === source) {
    return;
  }
  baseFor_default(source, function(srcValue, key) {
    stack || (stack = new Stack_default());
    if (isObject_default(srcValue)) {
      baseMergeDeep_default(object, source, key, srcIndex, baseMerge, customizer, stack);
    } else {
      var newValue = customizer ? customizer(safeGet_default(object, key), srcValue, key + "", object, source, stack) : void 0;
      if (newValue === void 0) {
        newValue = srcValue;
      }
      assignMergeValue_default(object, key, newValue);
    }
  }, keysIn_default);
}
var baseMerge_default = baseMerge;

// ../../../../Project/100ls-native/node_modules/lodash-es/_customDefaultsMerge.js
function customDefaultsMerge(objValue, srcValue, key, object, source, stack) {
  if (isObject_default(objValue) && isObject_default(srcValue)) {
    stack.set(srcValue, objValue);
    baseMerge_default(objValue, srcValue, void 0, customDefaultsMerge, stack);
    stack["delete"](srcValue);
  }
  return objValue;
}
var customDefaultsMerge_default = customDefaultsMerge;

// ../../../../Project/100ls-native/node_modules/lodash-es/mergeWith.js
var mergeWith = createAssigner_default(function(object, source, srcIndex, customizer) {
  baseMerge_default(object, source, srcIndex, customizer);
});
var mergeWith_default = mergeWith;

// ../../../../Project/100ls-native/node_modules/lodash-es/defaultsDeep.js
var defaultsDeep = baseRest_default(function(args) {
  args.push(void 0, customDefaultsMerge_default);
  return apply_default(mergeWith_default, void 0, args);
});
var defaultsDeep_default = defaultsDeep;

// ../../../../Project/100ls-native/node_modules/lodash-es/_baseDelay.js
var FUNC_ERROR_TEXT7 = "Expected a function";
function baseDelay(func, wait, args) {
  if (typeof func != "function") {
    throw new TypeError(FUNC_ERROR_TEXT7);
  }
  return setTimeout(function() {
    func.apply(void 0, args);
  }, wait);
}
var baseDelay_default = baseDelay;

// ../../../../Project/100ls-native/node_modules/lodash-es/defer.js
var defer = baseRest_default(function(func, args) {
  return baseDelay_default(func, 1, args);
});
var defer_default = defer;

// ../../../../Project/100ls-native/node_modules/lodash-es/delay.js
var delay = baseRest_default(function(func, wait, args) {
  return baseDelay_default(func, toNumber_default(wait) || 0, args);
});
var delay_default = delay;

// ../../../../Project/100ls-native/node_modules/lodash-es/_arrayIncludesWith.js
function arrayIncludesWith(array, value, comparator) {
  var index2 = -1, length = array == null ? 0 : array.length;
  while (++index2 < length) {
    if (comparator(value, array[index2])) {
      return true;
    }
  }
  return false;
}
var arrayIncludesWith_default = arrayIncludesWith;

// ../../../../Project/100ls-native/node_modules/lodash-es/_baseDifference.js
var LARGE_ARRAY_SIZE2 = 200;
function baseDifference(array, values2, iteratee2, comparator) {
  var index2 = -1, includes3 = arrayIncludes_default, isCommon = true, length = array.length, result2 = [], valuesLength = values2.length;
  if (!length) {
    return result2;
  }
  if (iteratee2) {
    values2 = arrayMap_default(values2, baseUnary_default(iteratee2));
  }
  if (comparator) {
    includes3 = arrayIncludesWith_default;
    isCommon = false;
  } else if (values2.length >= LARGE_ARRAY_SIZE2) {
    includes3 = cacheHas_default;
    isCommon = false;
    values2 = new SetCache_default(values2);
  }
  outer:
    while (++index2 < length) {
      var value = array[index2], computed17 = iteratee2 == null ? value : iteratee2(value);
      value = comparator || value !== 0 ? value : 0;
      if (isCommon && computed17 === computed17) {
        var valuesIndex = valuesLength;
        while (valuesIndex--) {
          if (values2[valuesIndex] === computed17) {
            continue outer;
          }
        }
        result2.push(value);
      } else if (!includes3(values2, computed17, comparator)) {
        result2.push(value);
      }
    }
  return result2;
}
var baseDifference_default = baseDifference;

// ../../../../Project/100ls-native/node_modules/lodash-es/difference.js
var difference = baseRest_default(function(array, values2) {
  return isArrayLikeObject_default(array) ? baseDifference_default(array, baseFlatten_default(values2, 1, isArrayLikeObject_default, true)) : [];
});
var difference_default = difference;

// ../../../../Project/100ls-native/node_modules/lodash-es/last.js
function last(array) {
  var length = array == null ? 0 : array.length;
  return length ? array[length - 1] : void 0;
}
var last_default = last;

// ../../../../Project/100ls-native/node_modules/lodash-es/differenceBy.js
var differenceBy = baseRest_default(function(array, values2) {
  var iteratee2 = last_default(values2);
  if (isArrayLikeObject_default(iteratee2)) {
    iteratee2 = void 0;
  }
  return isArrayLikeObject_default(array) ? baseDifference_default(array, baseFlatten_default(values2, 1, isArrayLikeObject_default, true), baseIteratee_default(iteratee2, 2)) : [];
});
var differenceBy_default = differenceBy;

// ../../../../Project/100ls-native/node_modules/lodash-es/differenceWith.js
var differenceWith = baseRest_default(function(array, values2) {
  var comparator = last_default(values2);
  if (isArrayLikeObject_default(comparator)) {
    comparator = void 0;
  }
  return isArrayLikeObject_default(array) ? baseDifference_default(array, baseFlatten_default(values2, 1, isArrayLikeObject_default, true), void 0, comparator) : [];
});
var differenceWith_default = differenceWith;

// ../../../../Project/100ls-native/node_modules/lodash-es/divide.js
var divide = createMathOperation_default(function(dividend, divisor) {
  return dividend / divisor;
}, 1);
var divide_default = divide;

// ../../../../Project/100ls-native/node_modules/lodash-es/drop.js
function drop(array, n, guard) {
  var length = array == null ? 0 : array.length;
  if (!length) {
    return [];
  }
  n = guard || n === void 0 ? 1 : toInteger_default(n);
  return baseSlice_default(array, n < 0 ? 0 : n, length);
}
var drop_default = drop;

// ../../../../Project/100ls-native/node_modules/lodash-es/dropRight.js
function dropRight(array, n, guard) {
  var length = array == null ? 0 : array.length;
  if (!length) {
    return [];
  }
  n = guard || n === void 0 ? 1 : toInteger_default(n);
  n = length - n;
  return baseSlice_default(array, 0, n < 0 ? 0 : n);
}
var dropRight_default = dropRight;

// ../../../../Project/100ls-native/node_modules/lodash-es/_baseWhile.js
function baseWhile(array, predicate, isDrop, fromRight) {
  var length = array.length, index2 = fromRight ? length : -1;
  while ((fromRight ? index2-- : ++index2 < length) && predicate(array[index2], index2, array)) {
  }
  return isDrop ? baseSlice_default(array, fromRight ? 0 : index2, fromRight ? index2 + 1 : length) : baseSlice_default(array, fromRight ? index2 + 1 : 0, fromRight ? length : index2);
}
var baseWhile_default = baseWhile;

// ../../../../Project/100ls-native/node_modules/lodash-es/dropRightWhile.js
function dropRightWhile(array, predicate) {
  return array && array.length ? baseWhile_default(array, baseIteratee_default(predicate, 3), true, true) : [];
}
var dropRightWhile_default = dropRightWhile;

// ../../../../Project/100ls-native/node_modules/lodash-es/dropWhile.js
function dropWhile(array, predicate) {
  return array && array.length ? baseWhile_default(array, baseIteratee_default(predicate, 3), true) : [];
}
var dropWhile_default = dropWhile;

// ../../../../Project/100ls-native/node_modules/lodash-es/_castFunction.js
function castFunction(value) {
  return typeof value == "function" ? value : identity_default;
}
var castFunction_default = castFunction;

// ../../../../Project/100ls-native/node_modules/lodash-es/forEach.js
function forEach(collection, iteratee2) {
  var func = isArray_default(collection) ? arrayEach_default : baseEach_default;
  return func(collection, castFunction_default(iteratee2));
}
var forEach_default = forEach;

// ../../../../Project/100ls-native/node_modules/lodash-es/_arrayEachRight.js
function arrayEachRight(array, iteratee2) {
  var length = array == null ? 0 : array.length;
  while (length--) {
    if (iteratee2(array[length], length, array) === false) {
      break;
    }
  }
  return array;
}
var arrayEachRight_default = arrayEachRight;

// ../../../../Project/100ls-native/node_modules/lodash-es/_baseForRight.js
var baseForRight = createBaseFor_default(true);
var baseForRight_default = baseForRight;

// ../../../../Project/100ls-native/node_modules/lodash-es/_baseForOwnRight.js
function baseForOwnRight(object, iteratee2) {
  return object && baseForRight_default(object, iteratee2, keys_default);
}
var baseForOwnRight_default = baseForOwnRight;

// ../../../../Project/100ls-native/node_modules/lodash-es/_baseEachRight.js
var baseEachRight = createBaseEach_default(baseForOwnRight_default, true);
var baseEachRight_default = baseEachRight;

// ../../../../Project/100ls-native/node_modules/lodash-es/forEachRight.js
function forEachRight(collection, iteratee2) {
  var func = isArray_default(collection) ? arrayEachRight_default : baseEachRight_default;
  return func(collection, castFunction_default(iteratee2));
}
var forEachRight_default = forEachRight;

// ../../../../Project/100ls-native/node_modules/lodash-es/endsWith.js
function endsWith(string, target2, position) {
  string = toString_default(string);
  target2 = baseToString_default(target2);
  var length = string.length;
  position = position === void 0 ? length : baseClamp_default(toInteger_default(position), 0, length);
  var end = position;
  position -= target2.length;
  return position >= 0 && string.slice(position, end) == target2;
}
var endsWith_default = endsWith;

// ../../../../Project/100ls-native/node_modules/lodash-es/_baseToPairs.js
function baseToPairs(object, props) {
  return arrayMap_default(props, function(key) {
    return [key, object[key]];
  });
}
var baseToPairs_default = baseToPairs;

// ../../../../Project/100ls-native/node_modules/lodash-es/_setToPairs.js
function setToPairs(set2) {
  var index2 = -1, result2 = Array(set2.size);
  set2.forEach(function(value) {
    result2[++index2] = [value, value];
  });
  return result2;
}
var setToPairs_default = setToPairs;

// ../../../../Project/100ls-native/node_modules/lodash-es/_createToPairs.js
var mapTag7 = "[object Map]";
var setTag7 = "[object Set]";
function createToPairs(keysFunc) {
  return function(object) {
    var tag = getTag_default(object);
    if (tag == mapTag7) {
      return mapToArray_default(object);
    }
    if (tag == setTag7) {
      return setToPairs_default(object);
    }
    return baseToPairs_default(object, keysFunc(object));
  };
}
var createToPairs_default = createToPairs;

// ../../../../Project/100ls-native/node_modules/lodash-es/toPairs.js
var toPairs = createToPairs_default(keys_default);
var toPairs_default = toPairs;

// ../../../../Project/100ls-native/node_modules/lodash-es/toPairsIn.js
var toPairsIn = createToPairs_default(keysIn_default);
var toPairsIn_default = toPairsIn;

// ../../../../Project/100ls-native/node_modules/lodash-es/_escapeHtmlChar.js
var htmlEscapes = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
};
var escapeHtmlChar = basePropertyOf_default(htmlEscapes);
var escapeHtmlChar_default = escapeHtmlChar;

// ../../../../Project/100ls-native/node_modules/lodash-es/escape.js
var reUnescapedHtml = /[&<>"']/g;
var reHasUnescapedHtml = RegExp(reUnescapedHtml.source);
function escape2(string) {
  string = toString_default(string);
  return string && reHasUnescapedHtml.test(string) ? string.replace(reUnescapedHtml, escapeHtmlChar_default) : string;
}
var escape_default = escape2;

// ../../../../Project/100ls-native/node_modules/lodash-es/escapeRegExp.js
var reRegExpChar2 = /[\\^$.*+?()[\]{}|]/g;
var reHasRegExpChar = RegExp(reRegExpChar2.source);
function escapeRegExp(string) {
  string = toString_default(string);
  return string && reHasRegExpChar.test(string) ? string.replace(reRegExpChar2, "\\$&") : string;
}
var escapeRegExp_default = escapeRegExp;

// ../../../../Project/100ls-native/node_modules/lodash-es/_arrayEvery.js
function arrayEvery(array, predicate) {
  var index2 = -1, length = array == null ? 0 : array.length;
  while (++index2 < length) {
    if (!predicate(array[index2], index2, array)) {
      return false;
    }
  }
  return true;
}
var arrayEvery_default = arrayEvery;

// ../../../../Project/100ls-native/node_modules/lodash-es/_baseEvery.js
function baseEvery(collection, predicate) {
  var result2 = true;
  baseEach_default(collection, function(value, index2, collection2) {
    result2 = !!predicate(value, index2, collection2);
    return result2;
  });
  return result2;
}
var baseEvery_default = baseEvery;

// ../../../../Project/100ls-native/node_modules/lodash-es/every.js
function every(collection, predicate, guard) {
  var func = isArray_default(collection) ? arrayEvery_default : baseEvery_default;
  if (guard && isIterateeCall_default(collection, predicate, guard)) {
    predicate = void 0;
  }
  return func(collection, baseIteratee_default(predicate, 3));
}
var every_default = every;

// ../../../../Project/100ls-native/node_modules/lodash-es/toLength.js
var MAX_ARRAY_LENGTH2 = 4294967295;
function toLength(value) {
  return value ? baseClamp_default(toInteger_default(value), 0, MAX_ARRAY_LENGTH2) : 0;
}
var toLength_default = toLength;

// ../../../../Project/100ls-native/node_modules/lodash-es/_baseFill.js
function baseFill(array, value, start, end) {
  var length = array.length;
  start = toInteger_default(start);
  if (start < 0) {
    start = -start > length ? 0 : length + start;
  }
  end = end === void 0 || end > length ? length : toInteger_default(end);
  if (end < 0) {
    end += length;
  }
  end = start > end ? 0 : toLength_default(end);
  while (start < end) {
    array[start++] = value;
  }
  return array;
}
var baseFill_default = baseFill;

// ../../../../Project/100ls-native/node_modules/lodash-es/fill.js
function fill(array, value, start, end) {
  var length = array == null ? 0 : array.length;
  if (!length) {
    return [];
  }
  if (start && typeof start != "number" && isIterateeCall_default(array, value, start)) {
    start = 0;
    end = length;
  }
  return baseFill_default(array, value, start, end);
}
var fill_default = fill;

// ../../../../Project/100ls-native/node_modules/lodash-es/_baseFilter.js
function baseFilter(collection, predicate) {
  var result2 = [];
  baseEach_default(collection, function(value, index2, collection2) {
    if (predicate(value, index2, collection2)) {
      result2.push(value);
    }
  });
  return result2;
}
var baseFilter_default = baseFilter;

// ../../../../Project/100ls-native/node_modules/lodash-es/filter.js
function filter(collection, predicate) {
  var func = isArray_default(collection) ? arrayFilter_default : baseFilter_default;
  return func(collection, baseIteratee_default(predicate, 3));
}
var filter_default = filter;

// ../../../../Project/100ls-native/node_modules/lodash-es/_createFind.js
function createFind(findIndexFunc) {
  return function(collection, predicate, fromIndex) {
    var iterable = Object(collection);
    if (!isArrayLike_default(collection)) {
      var iteratee2 = baseIteratee_default(predicate, 3);
      collection = keys_default(collection);
      predicate = function(key) {
        return iteratee2(iterable[key], key, iterable);
      };
    }
    var index2 = findIndexFunc(collection, predicate, fromIndex);
    return index2 > -1 ? iterable[iteratee2 ? collection[index2] : index2] : void 0;
  };
}
var createFind_default = createFind;

// ../../../../Project/100ls-native/node_modules/lodash-es/findIndex.js
var nativeMax7 = Math.max;
function findIndex(array, predicate, fromIndex) {
  var length = array == null ? 0 : array.length;
  if (!length) {
    return -1;
  }
  var index2 = fromIndex == null ? 0 : toInteger_default(fromIndex);
  if (index2 < 0) {
    index2 = nativeMax7(length + index2, 0);
  }
  return baseFindIndex_default(array, baseIteratee_default(predicate, 3), index2);
}
var findIndex_default = findIndex;

// ../../../../Project/100ls-native/node_modules/lodash-es/find.js
var find = createFind_default(findIndex_default);
var find_default = find;

// ../../../../Project/100ls-native/node_modules/lodash-es/_baseFindKey.js
function baseFindKey(collection, predicate, eachFunc) {
  var result2;
  eachFunc(collection, function(value, key, collection2) {
    if (predicate(value, key, collection2)) {
      result2 = key;
      return false;
    }
  });
  return result2;
}
var baseFindKey_default = baseFindKey;

// ../../../../Project/100ls-native/node_modules/lodash-es/findKey.js
function findKey(object, predicate) {
  return baseFindKey_default(object, baseIteratee_default(predicate, 3), baseForOwn_default);
}
var findKey_default = findKey;

// ../../../../Project/100ls-native/node_modules/lodash-es/findLastIndex.js
var nativeMax8 = Math.max;
var nativeMin5 = Math.min;
function findLastIndex(array, predicate, fromIndex) {
  var length = array == null ? 0 : array.length;
  if (!length) {
    return -1;
  }
  var index2 = length - 1;
  if (fromIndex !== void 0) {
    index2 = toInteger_default(fromIndex);
    index2 = fromIndex < 0 ? nativeMax8(length + index2, 0) : nativeMin5(index2, length - 1);
  }
  return baseFindIndex_default(array, baseIteratee_default(predicate, 3), index2, true);
}
var findLastIndex_default = findLastIndex;

// ../../../../Project/100ls-native/node_modules/lodash-es/findLast.js
var findLast = createFind_default(findLastIndex_default);
var findLast_default = findLast;

// ../../../../Project/100ls-native/node_modules/lodash-es/findLastKey.js
function findLastKey(object, predicate) {
  return baseFindKey_default(object, baseIteratee_default(predicate, 3), baseForOwnRight_default);
}
var findLastKey_default = findLastKey;

// ../../../../Project/100ls-native/node_modules/lodash-es/head.js
function head(array) {
  return array && array.length ? array[0] : void 0;
}
var head_default = head;

// ../../../../Project/100ls-native/node_modules/lodash-es/_baseMap.js
function baseMap(collection, iteratee2) {
  var index2 = -1, result2 = isArrayLike_default(collection) ? Array(collection.length) : [];
  baseEach_default(collection, function(value, key, collection2) {
    result2[++index2] = iteratee2(value, key, collection2);
  });
  return result2;
}
var baseMap_default = baseMap;

// ../../../../Project/100ls-native/node_modules/lodash-es/map.js
function map(collection, iteratee2) {
  var func = isArray_default(collection) ? arrayMap_default : baseMap_default;
  return func(collection, baseIteratee_default(iteratee2, 3));
}
var map_default = map;

// ../../../../Project/100ls-native/node_modules/lodash-es/flatMap.js
function flatMap(collection, iteratee2) {
  return baseFlatten_default(map_default(collection, iteratee2), 1);
}
var flatMap_default = flatMap;

// ../../../../Project/100ls-native/node_modules/lodash-es/flatMapDeep.js
var INFINITY4 = 1 / 0;
function flatMapDeep(collection, iteratee2) {
  return baseFlatten_default(map_default(collection, iteratee2), INFINITY4);
}
var flatMapDeep_default = flatMapDeep;

// ../../../../Project/100ls-native/node_modules/lodash-es/flatMapDepth.js
function flatMapDepth(collection, iteratee2, depth) {
  depth = depth === void 0 ? 1 : toInteger_default(depth);
  return baseFlatten_default(map_default(collection, iteratee2), depth);
}
var flatMapDepth_default = flatMapDepth;

// ../../../../Project/100ls-native/node_modules/lodash-es/flattenDeep.js
var INFINITY5 = 1 / 0;
function flattenDeep(array) {
  var length = array == null ? 0 : array.length;
  return length ? baseFlatten_default(array, INFINITY5) : [];
}
var flattenDeep_default = flattenDeep;

// ../../../../Project/100ls-native/node_modules/lodash-es/flattenDepth.js
function flattenDepth(array, depth) {
  var length = array == null ? 0 : array.length;
  if (!length) {
    return [];
  }
  depth = depth === void 0 ? 1 : toInteger_default(depth);
  return baseFlatten_default(array, depth);
}
var flattenDepth_default = flattenDepth;

// ../../../../Project/100ls-native/node_modules/lodash-es/flip.js
var WRAP_FLIP_FLAG3 = 512;
function flip(func) {
  return createWrap_default(func, WRAP_FLIP_FLAG3);
}
var flip_default = flip;

// ../../../../Project/100ls-native/node_modules/lodash-es/floor.js
var floor = createRound_default("floor");
var floor_default = floor;

// ../../../../Project/100ls-native/node_modules/lodash-es/_createFlow.js
var FUNC_ERROR_TEXT8 = "Expected a function";
var WRAP_CURRY_FLAG7 = 8;
var WRAP_PARTIAL_FLAG6 = 32;
var WRAP_ARY_FLAG5 = 128;
var WRAP_REARG_FLAG3 = 256;
function createFlow(fromRight) {
  return flatRest_default(function(funcs) {
    var length = funcs.length, index2 = length, prereq = LodashWrapper_default.prototype.thru;
    if (fromRight) {
      funcs.reverse();
    }
    while (index2--) {
      var func = funcs[index2];
      if (typeof func != "function") {
        throw new TypeError(FUNC_ERROR_TEXT8);
      }
      if (prereq && !wrapper && getFuncName_default(func) == "wrapper") {
        var wrapper = new LodashWrapper_default([], true);
      }
    }
    index2 = wrapper ? index2 : length;
    while (++index2 < length) {
      func = funcs[index2];
      var funcName = getFuncName_default(func), data = funcName == "wrapper" ? getData_default(func) : void 0;
      if (data && isLaziable_default(data[0]) && data[1] == (WRAP_ARY_FLAG5 | WRAP_CURRY_FLAG7 | WRAP_PARTIAL_FLAG6 | WRAP_REARG_FLAG3) && !data[4].length && data[9] == 1) {
        wrapper = wrapper[getFuncName_default(data[0])].apply(wrapper, data[3]);
      } else {
        wrapper = func.length == 1 && isLaziable_default(func) ? wrapper[funcName]() : wrapper.thru(func);
      }
    }
    return function() {
      var args = arguments, value = args[0];
      if (wrapper && args.length == 1 && isArray_default(value)) {
        return wrapper.plant(value).value();
      }
      var index3 = 0, result2 = length ? funcs[index3].apply(this, args) : value;
      while (++index3 < length) {
        result2 = funcs[index3].call(this, result2);
      }
      return result2;
    };
  });
}
var createFlow_default = createFlow;

// ../../../../Project/100ls-native/node_modules/lodash-es/flow.js
var flow = createFlow_default();
var flow_default = flow;

// ../../../../Project/100ls-native/node_modules/lodash-es/flowRight.js
var flowRight = createFlow_default(true);
var flowRight_default = flowRight;

// ../../../../Project/100ls-native/node_modules/lodash-es/forIn.js
function forIn(object, iteratee2) {
  return object == null ? object : baseFor_default(object, castFunction_default(iteratee2), keysIn_default);
}
var forIn_default = forIn;

// ../../../../Project/100ls-native/node_modules/lodash-es/forInRight.js
function forInRight(object, iteratee2) {
  return object == null ? object : baseForRight_default(object, castFunction_default(iteratee2), keysIn_default);
}
var forInRight_default = forInRight;

// ../../../../Project/100ls-native/node_modules/lodash-es/forOwn.js
function forOwn(object, iteratee2) {
  return object && baseForOwn_default(object, castFunction_default(iteratee2));
}
var forOwn_default = forOwn;

// ../../../../Project/100ls-native/node_modules/lodash-es/forOwnRight.js
function forOwnRight(object, iteratee2) {
  return object && baseForOwnRight_default(object, castFunction_default(iteratee2));
}
var forOwnRight_default = forOwnRight;

// ../../../../Project/100ls-native/node_modules/lodash-es/fromPairs.js
function fromPairs(pairs) {
  var index2 = -1, length = pairs == null ? 0 : pairs.length, result2 = {};
  while (++index2 < length) {
    var pair = pairs[index2];
    result2[pair[0]] = pair[1];
  }
  return result2;
}
var fromPairs_default = fromPairs;

// ../../../../Project/100ls-native/node_modules/lodash-es/_baseFunctions.js
function baseFunctions(object, props) {
  return arrayFilter_default(props, function(key) {
    return isFunction_default(object[key]);
  });
}
var baseFunctions_default = baseFunctions;

// ../../../../Project/100ls-native/node_modules/lodash-es/functions.js
function functions(object) {
  return object == null ? [] : baseFunctions_default(object, keys_default(object));
}
var functions_default = functions;

// ../../../../Project/100ls-native/node_modules/lodash-es/functionsIn.js
function functionsIn(object) {
  return object == null ? [] : baseFunctions_default(object, keysIn_default(object));
}
var functionsIn_default = functionsIn;

// ../../../../Project/100ls-native/node_modules/lodash-es/groupBy.js
var objectProto22 = Object.prototype;
var hasOwnProperty19 = objectProto22.hasOwnProperty;
var groupBy = createAggregator_default(function(result2, value, key) {
  if (hasOwnProperty19.call(result2, key)) {
    result2[key].push(value);
  } else {
    baseAssignValue_default(result2, key, [value]);
  }
});
var groupBy_default = groupBy;

// ../../../../Project/100ls-native/node_modules/lodash-es/_baseGt.js
function baseGt(value, other) {
  return value > other;
}
var baseGt_default = baseGt;

// ../../../../Project/100ls-native/node_modules/lodash-es/_createRelationalOperation.js
function createRelationalOperation(operator) {
  return function(value, other) {
    if (!(typeof value == "string" && typeof other == "string")) {
      value = toNumber_default(value);
      other = toNumber_default(other);
    }
    return operator(value, other);
  };
}
var createRelationalOperation_default = createRelationalOperation;

// ../../../../Project/100ls-native/node_modules/lodash-es/gt.js
var gt = createRelationalOperation_default(baseGt_default);
var gt_default = gt;

// ../../../../Project/100ls-native/node_modules/lodash-es/gte.js
var gte = createRelationalOperation_default(function(value, other) {
  return value >= other;
});
var gte_default = gte;

// ../../../../Project/100ls-native/node_modules/lodash-es/_baseHas.js
var objectProto23 = Object.prototype;
var hasOwnProperty20 = objectProto23.hasOwnProperty;
function baseHas(object, key) {
  return object != null && hasOwnProperty20.call(object, key);
}
var baseHas_default = baseHas;

// ../../../../Project/100ls-native/node_modules/lodash-es/has.js
function has(object, path) {
  return object != null && hasPath_default(object, path, baseHas_default);
}
var has_default = has;

// ../../../../Project/100ls-native/node_modules/lodash-es/_baseInRange.js
var nativeMax9 = Math.max;
var nativeMin6 = Math.min;
function baseInRange(number, start, end) {
  return number >= nativeMin6(start, end) && number < nativeMax9(start, end);
}
var baseInRange_default = baseInRange;

// ../../../../Project/100ls-native/node_modules/lodash-es/inRange.js
function inRange(number, start, end) {
  start = toFinite_default(start);
  if (end === void 0) {
    end = start;
    start = 0;
  } else {
    end = toFinite_default(end);
  }
  number = toNumber_default(number);
  return baseInRange_default(number, start, end);
}
var inRange_default = inRange;

// ../../../../Project/100ls-native/node_modules/lodash-es/isString.js
var stringTag5 = "[object String]";
function isString(value) {
  return typeof value == "string" || !isArray_default(value) && isObjectLike_default(value) && baseGetTag_default(value) == stringTag5;
}
var isString_default = isString;

// ../../../../Project/100ls-native/node_modules/lodash-es/_baseValues.js
function baseValues(object, props) {
  return arrayMap_default(props, function(key) {
    return object[key];
  });
}
var baseValues_default = baseValues;

// ../../../../Project/100ls-native/node_modules/lodash-es/values.js
function values(object) {
  return object == null ? [] : baseValues_default(object, keys_default(object));
}
var values_default = values;

// ../../../../Project/100ls-native/node_modules/lodash-es/includes.js
var nativeMax10 = Math.max;
function includes(collection, value, fromIndex, guard) {
  collection = isArrayLike_default(collection) ? collection : values_default(collection);
  fromIndex = fromIndex && !guard ? toInteger_default(fromIndex) : 0;
  var length = collection.length;
  if (fromIndex < 0) {
    fromIndex = nativeMax10(length + fromIndex, 0);
  }
  return isString_default(collection) ? fromIndex <= length && collection.indexOf(value, fromIndex) > -1 : !!length && baseIndexOf_default(collection, value, fromIndex) > -1;
}
var includes_default = includes;

// ../../../../Project/100ls-native/node_modules/lodash-es/indexOf.js
var nativeMax11 = Math.max;
function indexOf(array, value, fromIndex) {
  var length = array == null ? 0 : array.length;
  if (!length) {
    return -1;
  }
  var index2 = fromIndex == null ? 0 : toInteger_default(fromIndex);
  if (index2 < 0) {
    index2 = nativeMax11(length + index2, 0);
  }
  return baseIndexOf_default(array, value, index2);
}
var indexOf_default = indexOf;

// ../../../../Project/100ls-native/node_modules/lodash-es/initial.js
function initial(array) {
  var length = array == null ? 0 : array.length;
  return length ? baseSlice_default(array, 0, -1) : [];
}
var initial_default = initial;

// ../../../../Project/100ls-native/node_modules/lodash-es/_baseIntersection.js
var nativeMin7 = Math.min;
function baseIntersection(arrays, iteratee2, comparator) {
  var includes3 = comparator ? arrayIncludesWith_default : arrayIncludes_default, length = arrays[0].length, othLength = arrays.length, othIndex = othLength, caches = Array(othLength), maxLength = Infinity, result2 = [];
  while (othIndex--) {
    var array = arrays[othIndex];
    if (othIndex && iteratee2) {
      array = arrayMap_default(array, baseUnary_default(iteratee2));
    }
    maxLength = nativeMin7(array.length, maxLength);
    caches[othIndex] = !comparator && (iteratee2 || length >= 120 && array.length >= 120) ? new SetCache_default(othIndex && array) : void 0;
  }
  array = arrays[0];
  var index2 = -1, seen = caches[0];
  outer:
    while (++index2 < length && result2.length < maxLength) {
      var value = array[index2], computed17 = iteratee2 ? iteratee2(value) : value;
      value = comparator || value !== 0 ? value : 0;
      if (!(seen ? cacheHas_default(seen, computed17) : includes3(result2, computed17, comparator))) {
        othIndex = othLength;
        while (--othIndex) {
          var cache2 = caches[othIndex];
          if (!(cache2 ? cacheHas_default(cache2, computed17) : includes3(arrays[othIndex], computed17, comparator))) {
            continue outer;
          }
        }
        if (seen) {
          seen.push(computed17);
        }
        result2.push(value);
      }
    }
  return result2;
}
var baseIntersection_default = baseIntersection;

// ../../../../Project/100ls-native/node_modules/lodash-es/_castArrayLikeObject.js
function castArrayLikeObject(value) {
  return isArrayLikeObject_default(value) ? value : [];
}
var castArrayLikeObject_default = castArrayLikeObject;

// ../../../../Project/100ls-native/node_modules/lodash-es/intersection.js
var intersection = baseRest_default(function(arrays) {
  var mapped = arrayMap_default(arrays, castArrayLikeObject_default);
  return mapped.length && mapped[0] === arrays[0] ? baseIntersection_default(mapped) : [];
});
var intersection_default = intersection;

// ../../../../Project/100ls-native/node_modules/lodash-es/intersectionBy.js
var intersectionBy = baseRest_default(function(arrays) {
  var iteratee2 = last_default(arrays), mapped = arrayMap_default(arrays, castArrayLikeObject_default);
  if (iteratee2 === last_default(mapped)) {
    iteratee2 = void 0;
  } else {
    mapped.pop();
  }
  return mapped.length && mapped[0] === arrays[0] ? baseIntersection_default(mapped, baseIteratee_default(iteratee2, 2)) : [];
});
var intersectionBy_default = intersectionBy;

// ../../../../Project/100ls-native/node_modules/lodash-es/intersectionWith.js
var intersectionWith = baseRest_default(function(arrays) {
  var comparator = last_default(arrays), mapped = arrayMap_default(arrays, castArrayLikeObject_default);
  comparator = typeof comparator == "function" ? comparator : void 0;
  if (comparator) {
    mapped.pop();
  }
  return mapped.length && mapped[0] === arrays[0] ? baseIntersection_default(mapped, void 0, comparator) : [];
});
var intersectionWith_default = intersectionWith;

// ../../../../Project/100ls-native/node_modules/lodash-es/_baseInverter.js
function baseInverter(object, setter, iteratee2, accumulator) {
  baseForOwn_default(object, function(value, key, object2) {
    setter(accumulator, iteratee2(value), key, object2);
  });
  return accumulator;
}
var baseInverter_default = baseInverter;

// ../../../../Project/100ls-native/node_modules/lodash-es/_createInverter.js
function createInverter(setter, toIteratee) {
  return function(object, iteratee2) {
    return baseInverter_default(object, setter, toIteratee(iteratee2), {});
  };
}
var createInverter_default = createInverter;

// ../../../../Project/100ls-native/node_modules/lodash-es/invert.js
var objectProto24 = Object.prototype;
var nativeObjectToString3 = objectProto24.toString;
var invert = createInverter_default(function(result2, value, key) {
  if (value != null && typeof value.toString != "function") {
    value = nativeObjectToString3.call(value);
  }
  result2[value] = key;
}, constant_default(identity_default));
var invert_default = invert;

// ../../../../Project/100ls-native/node_modules/lodash-es/invertBy.js
var objectProto25 = Object.prototype;
var hasOwnProperty21 = objectProto25.hasOwnProperty;
var nativeObjectToString4 = objectProto25.toString;
var invertBy = createInverter_default(function(result2, value, key) {
  if (value != null && typeof value.toString != "function") {
    value = nativeObjectToString4.call(value);
  }
  if (hasOwnProperty21.call(result2, value)) {
    result2[value].push(key);
  } else {
    result2[value] = [key];
  }
}, baseIteratee_default);
var invertBy_default = invertBy;

// ../../../../Project/100ls-native/node_modules/lodash-es/_parent.js
function parent(object, path) {
  return path.length < 2 ? object : baseGet_default(object, baseSlice_default(path, 0, -1));
}
var parent_default = parent;

// ../../../../Project/100ls-native/node_modules/lodash-es/_baseInvoke.js
function baseInvoke(object, path, args) {
  path = castPath_default(path, object);
  object = parent_default(object, path);
  var func = object == null ? object : object[toKey_default(last_default(path))];
  return func == null ? void 0 : apply_default(func, object, args);
}
var baseInvoke_default = baseInvoke;

// ../../../../Project/100ls-native/node_modules/lodash-es/invoke.js
var invoke = baseRest_default(baseInvoke_default);
var invoke_default = invoke;

// ../../../../Project/100ls-native/node_modules/lodash-es/invokeMap.js
var invokeMap = baseRest_default(function(collection, path, args) {
  var index2 = -1, isFunc = typeof path == "function", result2 = isArrayLike_default(collection) ? Array(collection.length) : [];
  baseEach_default(collection, function(value) {
    result2[++index2] = isFunc ? apply_default(path, value, args) : baseInvoke_default(value, path, args);
  });
  return result2;
});
var invokeMap_default = invokeMap;

// ../../../../Project/100ls-native/node_modules/lodash-es/_baseIsArrayBuffer.js
var arrayBufferTag5 = "[object ArrayBuffer]";
function baseIsArrayBuffer(value) {
  return isObjectLike_default(value) && baseGetTag_default(value) == arrayBufferTag5;
}
var baseIsArrayBuffer_default = baseIsArrayBuffer;

// ../../../../Project/100ls-native/node_modules/lodash-es/isArrayBuffer.js
var nodeIsArrayBuffer = nodeUtil_default && nodeUtil_default.isArrayBuffer;
var isArrayBuffer = nodeIsArrayBuffer ? baseUnary_default(nodeIsArrayBuffer) : baseIsArrayBuffer_default;
var isArrayBuffer_default = isArrayBuffer;

// ../../../../Project/100ls-native/node_modules/lodash-es/isBoolean.js
var boolTag5 = "[object Boolean]";
function isBoolean(value) {
  return value === true || value === false || isObjectLike_default(value) && baseGetTag_default(value) == boolTag5;
}
var isBoolean_default = isBoolean;

// ../../../../Project/100ls-native/node_modules/lodash-es/_baseIsDate.js
var dateTag5 = "[object Date]";
function baseIsDate(value) {
  return isObjectLike_default(value) && baseGetTag_default(value) == dateTag5;
}
var baseIsDate_default = baseIsDate;

// ../../../../Project/100ls-native/node_modules/lodash-es/isDate.js
var nodeIsDate = nodeUtil_default && nodeUtil_default.isDate;
var isDate = nodeIsDate ? baseUnary_default(nodeIsDate) : baseIsDate_default;
var isDate_default = isDate;

// ../../../../Project/100ls-native/node_modules/lodash-es/isElement.js
function isElement(value) {
  return isObjectLike_default(value) && value.nodeType === 1 && !isPlainObject_default(value);
}
var isElement_default = isElement;

// ../../../../Project/100ls-native/node_modules/lodash-es/isEmpty.js
var mapTag8 = "[object Map]";
var setTag8 = "[object Set]";
var objectProto26 = Object.prototype;
var hasOwnProperty22 = objectProto26.hasOwnProperty;
function isEmpty(value) {
  if (value == null) {
    return true;
  }
  if (isArrayLike_default(value) && (isArray_default(value) || typeof value == "string" || typeof value.splice == "function" || isBuffer_default(value) || isTypedArray_default(value) || isArguments_default(value))) {
    return !value.length;
  }
  var tag = getTag_default(value);
  if (tag == mapTag8 || tag == setTag8) {
    return !value.size;
  }
  if (isPrototype_default(value)) {
    return !baseKeys_default(value).length;
  }
  for (var key in value) {
    if (hasOwnProperty22.call(value, key)) {
      return false;
    }
  }
  return true;
}
var isEmpty_default = isEmpty;

// ../../../../Project/100ls-native/node_modules/lodash-es/isEqual.js
function isEqual(value, other) {
  return baseIsEqual_default(value, other);
}
var isEqual_default = isEqual;

// ../../../../Project/100ls-native/node_modules/lodash-es/isEqualWith.js
function isEqualWith(value, other, customizer) {
  customizer = typeof customizer == "function" ? customizer : void 0;
  var result2 = customizer ? customizer(value, other) : void 0;
  return result2 === void 0 ? baseIsEqual_default(value, other, void 0, customizer) : !!result2;
}
var isEqualWith_default = isEqualWith;

// ../../../../Project/100ls-native/node_modules/lodash-es/isFinite.js
var nativeIsFinite2 = root_default.isFinite;
function isFinite(value) {
  return typeof value == "number" && nativeIsFinite2(value);
}
var isFinite_default = isFinite;

// ../../../../Project/100ls-native/node_modules/lodash-es/isInteger.js
function isInteger(value) {
  return typeof value == "number" && value == toInteger_default(value);
}
var isInteger_default = isInteger;

// ../../../../Project/100ls-native/node_modules/lodash-es/isMatch.js
function isMatch(object, source) {
  return object === source || baseIsMatch_default(object, source, getMatchData_default(source));
}
var isMatch_default = isMatch;

// ../../../../Project/100ls-native/node_modules/lodash-es/isMatchWith.js
function isMatchWith(object, source, customizer) {
  customizer = typeof customizer == "function" ? customizer : void 0;
  return baseIsMatch_default(object, source, getMatchData_default(source), customizer);
}
var isMatchWith_default = isMatchWith;

// ../../../../Project/100ls-native/node_modules/lodash-es/isNumber.js
var numberTag5 = "[object Number]";
function isNumber(value) {
  return typeof value == "number" || isObjectLike_default(value) && baseGetTag_default(value) == numberTag5;
}
var isNumber_default = isNumber;

// ../../../../Project/100ls-native/node_modules/lodash-es/isNaN.js
function isNaN2(value) {
  return isNumber_default(value) && value != +value;
}
var isNaN_default = isNaN2;

// ../../../../Project/100ls-native/node_modules/lodash-es/_isMaskable.js
var isMaskable = coreJsData_default ? isFunction_default : stubFalse_default;
var isMaskable_default = isMaskable;

// ../../../../Project/100ls-native/node_modules/lodash-es/isNative.js
var CORE_ERROR_TEXT = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.";
function isNative(value) {
  if (isMaskable_default(value)) {
    throw new Error(CORE_ERROR_TEXT);
  }
  return baseIsNative_default(value);
}
var isNative_default = isNative;

// ../../../../Project/100ls-native/node_modules/lodash-es/isNil.js
function isNil(value) {
  return value == null;
}
var isNil_default = isNil;

// ../../../../Project/100ls-native/node_modules/lodash-es/isNull.js
function isNull(value) {
  return value === null;
}
var isNull_default = isNull;

// ../../../../Project/100ls-native/node_modules/lodash-es/_baseIsRegExp.js
var regexpTag5 = "[object RegExp]";
function baseIsRegExp(value) {
  return isObjectLike_default(value) && baseGetTag_default(value) == regexpTag5;
}
var baseIsRegExp_default = baseIsRegExp;

// ../../../../Project/100ls-native/node_modules/lodash-es/isRegExp.js
var nodeIsRegExp = nodeUtil_default && nodeUtil_default.isRegExp;
var isRegExp = nodeIsRegExp ? baseUnary_default(nodeIsRegExp) : baseIsRegExp_default;
var isRegExp_default = isRegExp;

// ../../../../Project/100ls-native/node_modules/lodash-es/isSafeInteger.js
var MAX_SAFE_INTEGER3 = 9007199254740991;
function isSafeInteger(value) {
  return isInteger_default(value) && value >= -MAX_SAFE_INTEGER3 && value <= MAX_SAFE_INTEGER3;
}
var isSafeInteger_default = isSafeInteger;

// ../../../../Project/100ls-native/node_modules/lodash-es/isUndefined.js
function isUndefined(value) {
  return value === void 0;
}
var isUndefined_default = isUndefined;

// ../../../../Project/100ls-native/node_modules/lodash-es/isWeakMap.js
var weakMapTag4 = "[object WeakMap]";
function isWeakMap(value) {
  return isObjectLike_default(value) && getTag_default(value) == weakMapTag4;
}
var isWeakMap_default = isWeakMap;

// ../../../../Project/100ls-native/node_modules/lodash-es/isWeakSet.js
var weakSetTag = "[object WeakSet]";
function isWeakSet(value) {
  return isObjectLike_default(value) && baseGetTag_default(value) == weakSetTag;
}
var isWeakSet_default = isWeakSet;

// ../../../../Project/100ls-native/node_modules/lodash-es/iteratee.js
var CLONE_DEEP_FLAG5 = 1;
function iteratee(func) {
  return baseIteratee_default(typeof func == "function" ? func : baseClone_default(func, CLONE_DEEP_FLAG5));
}
var iteratee_default = iteratee;

// ../../../../Project/100ls-native/node_modules/lodash-es/join.js
var arrayProto2 = Array.prototype;
var nativeJoin = arrayProto2.join;
function join(array, separator) {
  return array == null ? "" : nativeJoin.call(array, separator);
}
var join_default = join;

// ../../../../Project/100ls-native/node_modules/lodash-es/kebabCase.js
var kebabCase = createCompounder_default(function(result2, word, index2) {
  return result2 + (index2 ? "-" : "") + word.toLowerCase();
});
var kebabCase_default = kebabCase;

// ../../../../Project/100ls-native/node_modules/lodash-es/keyBy.js
var keyBy = createAggregator_default(function(result2, value, key) {
  baseAssignValue_default(result2, key, value);
});
var keyBy_default = keyBy;

// ../../../../Project/100ls-native/node_modules/lodash-es/_strictLastIndexOf.js
function strictLastIndexOf(array, value, fromIndex) {
  var index2 = fromIndex + 1;
  while (index2--) {
    if (array[index2] === value) {
      return index2;
    }
  }
  return index2;
}
var strictLastIndexOf_default = strictLastIndexOf;

// ../../../../Project/100ls-native/node_modules/lodash-es/lastIndexOf.js
var nativeMax12 = Math.max;
var nativeMin8 = Math.min;
function lastIndexOf(array, value, fromIndex) {
  var length = array == null ? 0 : array.length;
  if (!length) {
    return -1;
  }
  var index2 = length;
  if (fromIndex !== void 0) {
    index2 = toInteger_default(fromIndex);
    index2 = index2 < 0 ? nativeMax12(length + index2, 0) : nativeMin8(index2, length - 1);
  }
  return value === value ? strictLastIndexOf_default(array, value, index2) : baseFindIndex_default(array, baseIsNaN_default, index2, true);
}
var lastIndexOf_default = lastIndexOf;

// ../../../../Project/100ls-native/node_modules/lodash-es/lowerCase.js
var lowerCase = createCompounder_default(function(result2, word, index2) {
  return result2 + (index2 ? " " : "") + word.toLowerCase();
});
var lowerCase_default = lowerCase;

// ../../../../Project/100ls-native/node_modules/lodash-es/lowerFirst.js
var lowerFirst = createCaseFirst_default("toLowerCase");
var lowerFirst_default = lowerFirst;

// ../../../../Project/100ls-native/node_modules/lodash-es/_baseLt.js
function baseLt(value, other) {
  return value < other;
}
var baseLt_default = baseLt;

// ../../../../Project/100ls-native/node_modules/lodash-es/lt.js
var lt = createRelationalOperation_default(baseLt_default);
var lt_default = lt;

// ../../../../Project/100ls-native/node_modules/lodash-es/lte.js
var lte = createRelationalOperation_default(function(value, other) {
  return value <= other;
});
var lte_default = lte;

// ../../../../Project/100ls-native/node_modules/lodash-es/mapKeys.js
function mapKeys(object, iteratee2) {
  var result2 = {};
  iteratee2 = baseIteratee_default(iteratee2, 3);
  baseForOwn_default(object, function(value, key, object2) {
    baseAssignValue_default(result2, iteratee2(value, key, object2), value);
  });
  return result2;
}
var mapKeys_default = mapKeys;

// ../../../../Project/100ls-native/node_modules/lodash-es/mapValues.js
function mapValues(object, iteratee2) {
  var result2 = {};
  iteratee2 = baseIteratee_default(iteratee2, 3);
  baseForOwn_default(object, function(value, key, object2) {
    baseAssignValue_default(result2, key, iteratee2(value, key, object2));
  });
  return result2;
}
var mapValues_default = mapValues;

// ../../../../Project/100ls-native/node_modules/lodash-es/matches.js
var CLONE_DEEP_FLAG6 = 1;
function matches(source) {
  return baseMatches_default(baseClone_default(source, CLONE_DEEP_FLAG6));
}
var matches_default = matches;

// ../../../../Project/100ls-native/node_modules/lodash-es/matchesProperty.js
var CLONE_DEEP_FLAG7 = 1;
function matchesProperty(path, srcValue) {
  return baseMatchesProperty_default(path, baseClone_default(srcValue, CLONE_DEEP_FLAG7));
}
var matchesProperty_default = matchesProperty;

// ../../../../Project/100ls-native/node_modules/lodash-es/_baseExtremum.js
function baseExtremum(array, iteratee2, comparator) {
  var index2 = -1, length = array.length;
  while (++index2 < length) {
    var value = array[index2], current = iteratee2(value);
    if (current != null && (computed17 === void 0 ? current === current && !isSymbol_default(current) : comparator(current, computed17))) {
      var computed17 = current, result2 = value;
    }
  }
  return result2;
}
var baseExtremum_default = baseExtremum;

// ../../../../Project/100ls-native/node_modules/lodash-es/max.js
function max(array) {
  return array && array.length ? baseExtremum_default(array, identity_default, baseGt_default) : void 0;
}
var max_default = max;

// ../../../../Project/100ls-native/node_modules/lodash-es/maxBy.js
function maxBy(array, iteratee2) {
  return array && array.length ? baseExtremum_default(array, baseIteratee_default(iteratee2, 2), baseGt_default) : void 0;
}
var maxBy_default = maxBy;

// ../../../../Project/100ls-native/node_modules/lodash-es/_baseSum.js
function baseSum(array, iteratee2) {
  var result2, index2 = -1, length = array.length;
  while (++index2 < length) {
    var current = iteratee2(array[index2]);
    if (current !== void 0) {
      result2 = result2 === void 0 ? current : result2 + current;
    }
  }
  return result2;
}
var baseSum_default = baseSum;

// ../../../../Project/100ls-native/node_modules/lodash-es/_baseMean.js
var NAN3 = 0 / 0;
function baseMean(array, iteratee2) {
  var length = array == null ? 0 : array.length;
  return length ? baseSum_default(array, iteratee2) / length : NAN3;
}
var baseMean_default = baseMean;

// ../../../../Project/100ls-native/node_modules/lodash-es/mean.js
function mean(array) {
  return baseMean_default(array, identity_default);
}
var mean_default = mean;

// ../../../../Project/100ls-native/node_modules/lodash-es/meanBy.js
function meanBy(array, iteratee2) {
  return baseMean_default(array, baseIteratee_default(iteratee2, 2));
}
var meanBy_default = meanBy;

// ../../../../Project/100ls-native/node_modules/lodash-es/merge.js
var merge = createAssigner_default(function(object, source, srcIndex) {
  baseMerge_default(object, source, srcIndex);
});
var merge_default = merge;

// ../../../../Project/100ls-native/node_modules/lodash-es/method.js
var method = baseRest_default(function(path, args) {
  return function(object) {
    return baseInvoke_default(object, path, args);
  };
});
var method_default = method;

// ../../../../Project/100ls-native/node_modules/lodash-es/methodOf.js
var methodOf = baseRest_default(function(object, args) {
  return function(path) {
    return baseInvoke_default(object, path, args);
  };
});
var methodOf_default = methodOf;

// ../../../../Project/100ls-native/node_modules/lodash-es/min.js
function min(array) {
  return array && array.length ? baseExtremum_default(array, identity_default, baseLt_default) : void 0;
}
var min_default = min;

// ../../../../Project/100ls-native/node_modules/lodash-es/minBy.js
function minBy(array, iteratee2) {
  return array && array.length ? baseExtremum_default(array, baseIteratee_default(iteratee2, 2), baseLt_default) : void 0;
}
var minBy_default = minBy;

// ../../../../Project/100ls-native/node_modules/lodash-es/mixin.js
function mixin(object, source, options) {
  var props = keys_default(source), methodNames = baseFunctions_default(source, props);
  var chain2 = !(isObject_default(options) && "chain" in options) || !!options.chain, isFunc = isFunction_default(object);
  arrayEach_default(methodNames, function(methodName) {
    var func = source[methodName];
    object[methodName] = func;
    if (isFunc) {
      object.prototype[methodName] = function() {
        var chainAll = this.__chain__;
        if (chain2 || chainAll) {
          var result2 = object(this.__wrapped__), actions = result2.__actions__ = copyArray_default(this.__actions__);
          actions.push({ "func": func, "args": arguments, "thisArg": object });
          result2.__chain__ = chainAll;
          return result2;
        }
        return func.apply(object, arrayPush_default([this.value()], arguments));
      };
    }
  });
  return object;
}
var mixin_default = mixin;

// ../../../../Project/100ls-native/node_modules/lodash-es/multiply.js
var multiply = createMathOperation_default(function(multiplier, multiplicand) {
  return multiplier * multiplicand;
}, 1);
var multiply_default = multiply;

// ../../../../Project/100ls-native/node_modules/lodash-es/negate.js
var FUNC_ERROR_TEXT9 = "Expected a function";
function negate(predicate) {
  if (typeof predicate != "function") {
    throw new TypeError(FUNC_ERROR_TEXT9);
  }
  return function() {
    var args = arguments;
    switch (args.length) {
      case 0:
        return !predicate.call(this);
      case 1:
        return !predicate.call(this, args[0]);
      case 2:
        return !predicate.call(this, args[0], args[1]);
      case 3:
        return !predicate.call(this, args[0], args[1], args[2]);
    }
    return !predicate.apply(this, args);
  };
}
var negate_default = negate;

// ../../../../Project/100ls-native/node_modules/lodash-es/_iteratorToArray.js
function iteratorToArray(iterator) {
  var data, result2 = [];
  while (!(data = iterator.next()).done) {
    result2.push(data.value);
  }
  return result2;
}
var iteratorToArray_default = iteratorToArray;

// ../../../../Project/100ls-native/node_modules/lodash-es/toArray.js
var mapTag9 = "[object Map]";
var setTag9 = "[object Set]";
var symIterator = Symbol_default ? Symbol_default.iterator : void 0;
function toArray(value) {
  if (!value) {
    return [];
  }
  if (isArrayLike_default(value)) {
    return isString_default(value) ? stringToArray_default(value) : copyArray_default(value);
  }
  if (symIterator && value[symIterator]) {
    return iteratorToArray_default(value[symIterator]());
  }
  var tag = getTag_default(value), func = tag == mapTag9 ? mapToArray_default : tag == setTag9 ? setToArray_default : values_default;
  return func(value);
}
var toArray_default = toArray;

// ../../../../Project/100ls-native/node_modules/lodash-es/next.js
function wrapperNext() {
  if (this.__values__ === void 0) {
    this.__values__ = toArray_default(this.value());
  }
  var done = this.__index__ >= this.__values__.length, value = done ? void 0 : this.__values__[this.__index__++];
  return { "done": done, "value": value };
}
var next_default = wrapperNext;

// ../../../../Project/100ls-native/node_modules/lodash-es/_baseNth.js
function baseNth(array, n) {
  var length = array.length;
  if (!length) {
    return;
  }
  n += n < 0 ? length : 0;
  return isIndex_default(n, length) ? array[n] : void 0;
}
var baseNth_default = baseNth;

// ../../../../Project/100ls-native/node_modules/lodash-es/nth.js
function nth(array, n) {
  return array && array.length ? baseNth_default(array, toInteger_default(n)) : void 0;
}
var nth_default = nth;

// ../../../../Project/100ls-native/node_modules/lodash-es/nthArg.js
function nthArg(n) {
  n = toInteger_default(n);
  return baseRest_default(function(args) {
    return baseNth_default(args, n);
  });
}
var nthArg_default = nthArg;

// ../../../../Project/100ls-native/node_modules/lodash-es/_baseUnset.js
function baseUnset(object, path) {
  path = castPath_default(path, object);
  object = parent_default(object, path);
  return object == null || delete object[toKey_default(last_default(path))];
}
var baseUnset_default = baseUnset;

// ../../../../Project/100ls-native/node_modules/lodash-es/_customOmitClone.js
function customOmitClone(value) {
  return isPlainObject_default(value) ? void 0 : value;
}
var customOmitClone_default = customOmitClone;

// ../../../../Project/100ls-native/node_modules/lodash-es/omit.js
var CLONE_DEEP_FLAG8 = 1;
var CLONE_FLAT_FLAG2 = 2;
var CLONE_SYMBOLS_FLAG6 = 4;
var omit = flatRest_default(function(object, paths) {
  var result2 = {};
  if (object == null) {
    return result2;
  }
  var isDeep2 = false;
  paths = arrayMap_default(paths, function(path) {
    path = castPath_default(path, object);
    isDeep2 || (isDeep2 = path.length > 1);
    return path;
  });
  copyObject_default(object, getAllKeysIn_default(object), result2);
  if (isDeep2) {
    result2 = baseClone_default(result2, CLONE_DEEP_FLAG8 | CLONE_FLAT_FLAG2 | CLONE_SYMBOLS_FLAG6, customOmitClone_default);
  }
  var length = paths.length;
  while (length--) {
    baseUnset_default(result2, paths[length]);
  }
  return result2;
});
var omit_default = omit;

// ../../../../Project/100ls-native/node_modules/lodash-es/_baseSet.js
function baseSet(object, path, value, customizer) {
  if (!isObject_default(object)) {
    return object;
  }
  path = castPath_default(path, object);
  var index2 = -1, length = path.length, lastIndex = length - 1, nested = object;
  while (nested != null && ++index2 < length) {
    var key = toKey_default(path[index2]), newValue = value;
    if (key === "__proto__" || key === "constructor" || key === "prototype") {
      return object;
    }
    if (index2 != lastIndex) {
      var objValue = nested[key];
      newValue = customizer ? customizer(objValue, key, nested) : void 0;
      if (newValue === void 0) {
        newValue = isObject_default(objValue) ? objValue : isIndex_default(path[index2 + 1]) ? [] : {};
      }
    }
    assignValue_default(nested, key, newValue);
    nested = nested[key];
  }
  return object;
}
var baseSet_default = baseSet;

// ../../../../Project/100ls-native/node_modules/lodash-es/_basePickBy.js
function basePickBy(object, paths, predicate) {
  var index2 = -1, length = paths.length, result2 = {};
  while (++index2 < length) {
    var path = paths[index2], value = baseGet_default(object, path);
    if (predicate(value, path)) {
      baseSet_default(result2, castPath_default(path, object), value);
    }
  }
  return result2;
}
var basePickBy_default = basePickBy;

// ../../../../Project/100ls-native/node_modules/lodash-es/pickBy.js
function pickBy(object, predicate) {
  if (object == null) {
    return {};
  }
  var props = arrayMap_default(getAllKeysIn_default(object), function(prop) {
    return [prop];
  });
  predicate = baseIteratee_default(predicate);
  return basePickBy_default(object, props, function(value, path) {
    return predicate(value, path[0]);
  });
}
var pickBy_default = pickBy;

// ../../../../Project/100ls-native/node_modules/lodash-es/omitBy.js
function omitBy(object, predicate) {
  return pickBy_default(object, negate_default(baseIteratee_default(predicate)));
}
var omitBy_default = omitBy;

// ../../../../Project/100ls-native/node_modules/lodash-es/once.js
function once(func) {
  return before_default(2, func);
}
var once_default = once;

// ../../../../Project/100ls-native/node_modules/lodash-es/_baseSortBy.js
function baseSortBy(array, comparer) {
  var length = array.length;
  array.sort(comparer);
  while (length--) {
    array[length] = array[length].value;
  }
  return array;
}
var baseSortBy_default = baseSortBy;

// ../../../../Project/100ls-native/node_modules/lodash-es/_compareAscending.js
function compareAscending(value, other) {
  if (value !== other) {
    var valIsDefined = value !== void 0, valIsNull = value === null, valIsReflexive = value === value, valIsSymbol = isSymbol_default(value);
    var othIsDefined = other !== void 0, othIsNull = other === null, othIsReflexive = other === other, othIsSymbol = isSymbol_default(other);
    if (!othIsNull && !othIsSymbol && !valIsSymbol && value > other || valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol || valIsNull && othIsDefined && othIsReflexive || !valIsDefined && othIsReflexive || !valIsReflexive) {
      return 1;
    }
    if (!valIsNull && !valIsSymbol && !othIsSymbol && value < other || othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol || othIsNull && valIsDefined && valIsReflexive || !othIsDefined && valIsReflexive || !othIsReflexive) {
      return -1;
    }
  }
  return 0;
}
var compareAscending_default = compareAscending;

// ../../../../Project/100ls-native/node_modules/lodash-es/_compareMultiple.js
function compareMultiple(object, other, orders) {
  var index2 = -1, objCriteria = object.criteria, othCriteria = other.criteria, length = objCriteria.length, ordersLength = orders.length;
  while (++index2 < length) {
    var result2 = compareAscending_default(objCriteria[index2], othCriteria[index2]);
    if (result2) {
      if (index2 >= ordersLength) {
        return result2;
      }
      var order = orders[index2];
      return result2 * (order == "desc" ? -1 : 1);
    }
  }
  return object.index - other.index;
}
var compareMultiple_default = compareMultiple;

// ../../../../Project/100ls-native/node_modules/lodash-es/_baseOrderBy.js
function baseOrderBy(collection, iteratees, orders) {
  if (iteratees.length) {
    iteratees = arrayMap_default(iteratees, function(iteratee2) {
      if (isArray_default(iteratee2)) {
        return function(value) {
          return baseGet_default(value, iteratee2.length === 1 ? iteratee2[0] : iteratee2);
        };
      }
      return iteratee2;
    });
  } else {
    iteratees = [identity_default];
  }
  var index2 = -1;
  iteratees = arrayMap_default(iteratees, baseUnary_default(baseIteratee_default));
  var result2 = baseMap_default(collection, function(value, key, collection2) {
    var criteria = arrayMap_default(iteratees, function(iteratee2) {
      return iteratee2(value);
    });
    return { "criteria": criteria, "index": ++index2, "value": value };
  });
  return baseSortBy_default(result2, function(object, other) {
    return compareMultiple_default(object, other, orders);
  });
}
var baseOrderBy_default = baseOrderBy;

// ../../../../Project/100ls-native/node_modules/lodash-es/orderBy.js
function orderBy(collection, iteratees, orders, guard) {
  if (collection == null) {
    return [];
  }
  if (!isArray_default(iteratees)) {
    iteratees = iteratees == null ? [] : [iteratees];
  }
  orders = guard ? void 0 : orders;
  if (!isArray_default(orders)) {
    orders = orders == null ? [] : [orders];
  }
  return baseOrderBy_default(collection, iteratees, orders);
}
var orderBy_default = orderBy;

// ../../../../Project/100ls-native/node_modules/lodash-es/_createOver.js
function createOver(arrayFunc) {
  return flatRest_default(function(iteratees) {
    iteratees = arrayMap_default(iteratees, baseUnary_default(baseIteratee_default));
    return baseRest_default(function(args) {
      var thisArg = this;
      return arrayFunc(iteratees, function(iteratee2) {
        return apply_default(iteratee2, thisArg, args);
      });
    });
  });
}
var createOver_default = createOver;

// ../../../../Project/100ls-native/node_modules/lodash-es/over.js
var over = createOver_default(arrayMap_default);
var over_default = over;

// ../../../../Project/100ls-native/node_modules/lodash-es/_castRest.js
var castRest = baseRest_default;
var castRest_default = castRest;

// ../../../../Project/100ls-native/node_modules/lodash-es/overArgs.js
var nativeMin9 = Math.min;
var overArgs = castRest_default(function(func, transforms) {
  transforms = transforms.length == 1 && isArray_default(transforms[0]) ? arrayMap_default(transforms[0], baseUnary_default(baseIteratee_default)) : arrayMap_default(baseFlatten_default(transforms, 1), baseUnary_default(baseIteratee_default));
  var funcsLength = transforms.length;
  return baseRest_default(function(args) {
    var index2 = -1, length = nativeMin9(args.length, funcsLength);
    while (++index2 < length) {
      args[index2] = transforms[index2].call(this, args[index2]);
    }
    return apply_default(func, this, args);
  });
});
var overArgs_default = overArgs;

// ../../../../Project/100ls-native/node_modules/lodash-es/overEvery.js
var overEvery = createOver_default(arrayEvery_default);
var overEvery_default = overEvery;

// ../../../../Project/100ls-native/node_modules/lodash-es/overSome.js
var overSome = createOver_default(arraySome_default);
var overSome_default = overSome;

// ../../../../Project/100ls-native/node_modules/lodash-es/_baseRepeat.js
var MAX_SAFE_INTEGER4 = 9007199254740991;
var nativeFloor = Math.floor;
function baseRepeat(string, n) {
  var result2 = "";
  if (!string || n < 1 || n > MAX_SAFE_INTEGER4) {
    return result2;
  }
  do {
    if (n % 2) {
      result2 += string;
    }
    n = nativeFloor(n / 2);
    if (n) {
      string += string;
    }
  } while (n);
  return result2;
}
var baseRepeat_default = baseRepeat;

// ../../../../Project/100ls-native/node_modules/lodash-es/_asciiSize.js
var asciiSize = baseProperty_default("length");
var asciiSize_default = asciiSize;

// ../../../../Project/100ls-native/node_modules/lodash-es/_unicodeSize.js
var rsAstralRange4 = "\\ud800-\\udfff";
var rsComboMarksRange5 = "\\u0300-\\u036f";
var reComboHalfMarksRange5 = "\\ufe20-\\ufe2f";
var rsComboSymbolsRange5 = "\\u20d0-\\u20ff";
var rsComboRange5 = rsComboMarksRange5 + reComboHalfMarksRange5 + rsComboSymbolsRange5;
var rsVarRange4 = "\\ufe0e\\ufe0f";
var rsAstral2 = "[" + rsAstralRange4 + "]";
var rsCombo4 = "[" + rsComboRange5 + "]";
var rsFitz3 = "\\ud83c[\\udffb-\\udfff]";
var rsModifier3 = "(?:" + rsCombo4 + "|" + rsFitz3 + ")";
var rsNonAstral3 = "[^" + rsAstralRange4 + "]";
var rsRegional3 = "(?:\\ud83c[\\udde6-\\uddff]){2}";
var rsSurrPair3 = "[\\ud800-\\udbff][\\udc00-\\udfff]";
var rsZWJ4 = "\\u200d";
var reOptMod3 = rsModifier3 + "?";
var rsOptVar3 = "[" + rsVarRange4 + "]?";
var rsOptJoin3 = "(?:" + rsZWJ4 + "(?:" + [rsNonAstral3, rsRegional3, rsSurrPair3].join("|") + ")" + rsOptVar3 + reOptMod3 + ")*";
var rsSeq3 = rsOptVar3 + reOptMod3 + rsOptJoin3;
var rsSymbol2 = "(?:" + [rsNonAstral3 + rsCombo4 + "?", rsCombo4, rsRegional3, rsSurrPair3, rsAstral2].join("|") + ")";
var reUnicode2 = RegExp(rsFitz3 + "(?=" + rsFitz3 + ")|" + rsSymbol2 + rsSeq3, "g");
function unicodeSize(string) {
  var result2 = reUnicode2.lastIndex = 0;
  while (reUnicode2.test(string)) {
    ++result2;
  }
  return result2;
}
var unicodeSize_default = unicodeSize;

// ../../../../Project/100ls-native/node_modules/lodash-es/_stringSize.js
function stringSize(string) {
  return hasUnicode_default(string) ? unicodeSize_default(string) : asciiSize_default(string);
}
var stringSize_default = stringSize;

// ../../../../Project/100ls-native/node_modules/lodash-es/_createPadding.js
var nativeCeil2 = Math.ceil;
function createPadding(length, chars) {
  chars = chars === void 0 ? " " : baseToString_default(chars);
  var charsLength = chars.length;
  if (charsLength < 2) {
    return charsLength ? baseRepeat_default(chars, length) : chars;
  }
  var result2 = baseRepeat_default(chars, nativeCeil2(length / stringSize_default(chars)));
  return hasUnicode_default(chars) ? castSlice_default(stringToArray_default(result2), 0, length).join("") : result2.slice(0, length);
}
var createPadding_default = createPadding;

// ../../../../Project/100ls-native/node_modules/lodash-es/pad.js
var nativeCeil3 = Math.ceil;
var nativeFloor2 = Math.floor;
function pad(string, length, chars) {
  string = toString_default(string);
  length = toInteger_default(length);
  var strLength = length ? stringSize_default(string) : 0;
  if (!length || strLength >= length) {
    return string;
  }
  var mid = (length - strLength) / 2;
  return createPadding_default(nativeFloor2(mid), chars) + string + createPadding_default(nativeCeil3(mid), chars);
}
var pad_default = pad;

// ../../../../Project/100ls-native/node_modules/lodash-es/padEnd.js
function padEnd(string, length, chars) {
  string = toString_default(string);
  length = toInteger_default(length);
  var strLength = length ? stringSize_default(string) : 0;
  return length && strLength < length ? string + createPadding_default(length - strLength, chars) : string;
}
var padEnd_default = padEnd;

// ../../../../Project/100ls-native/node_modules/lodash-es/padStart.js
function padStart(string, length, chars) {
  string = toString_default(string);
  length = toInteger_default(length);
  var strLength = length ? stringSize_default(string) : 0;
  return length && strLength < length ? createPadding_default(length - strLength, chars) + string : string;
}
var padStart_default = padStart;

// ../../../../Project/100ls-native/node_modules/lodash-es/parseInt.js
var reTrimStart2 = /^\s+/;
var nativeParseInt = root_default.parseInt;
function parseInt2(string, radix, guard) {
  if (guard || radix == null) {
    radix = 0;
  } else if (radix) {
    radix = +radix;
  }
  return nativeParseInt(toString_default(string).replace(reTrimStart2, ""), radix || 0);
}
var parseInt_default = parseInt2;

// ../../../../Project/100ls-native/node_modules/lodash-es/partial.js
var WRAP_PARTIAL_FLAG7 = 32;
var partial = baseRest_default(function(func, partials) {
  var holders = replaceHolders_default(partials, getHolder_default(partial));
  return createWrap_default(func, WRAP_PARTIAL_FLAG7, void 0, partials, holders);
});
partial.placeholder = {};
var partial_default = partial;

// ../../../../Project/100ls-native/node_modules/lodash-es/partialRight.js
var WRAP_PARTIAL_RIGHT_FLAG4 = 64;
var partialRight = baseRest_default(function(func, partials) {
  var holders = replaceHolders_default(partials, getHolder_default(partialRight));
  return createWrap_default(func, WRAP_PARTIAL_RIGHT_FLAG4, void 0, partials, holders);
});
partialRight.placeholder = {};
var partialRight_default = partialRight;

// ../../../../Project/100ls-native/node_modules/lodash-es/partition.js
var partition = createAggregator_default(function(result2, value, key) {
  result2[key ? 0 : 1].push(value);
}, function() {
  return [[], []];
});
var partition_default = partition;

// ../../../../Project/100ls-native/node_modules/lodash-es/_basePick.js
function basePick(object, paths) {
  return basePickBy_default(object, paths, function(value, path) {
    return hasIn_default(object, path);
  });
}
var basePick_default = basePick;

// ../../../../Project/100ls-native/node_modules/lodash-es/pick.js
var pick = flatRest_default(function(object, paths) {
  return object == null ? {} : basePick_default(object, paths);
});
var pick_default = pick;

// ../../../../Project/100ls-native/node_modules/lodash-es/plant.js
function wrapperPlant(value) {
  var result2, parent2 = this;
  while (parent2 instanceof baseLodash_default) {
    var clone2 = wrapperClone_default(parent2);
    clone2.__index__ = 0;
    clone2.__values__ = void 0;
    if (result2) {
      previous.__wrapped__ = clone2;
    } else {
      result2 = clone2;
    }
    var previous = clone2;
    parent2 = parent2.__wrapped__;
  }
  previous.__wrapped__ = value;
  return result2;
}
var plant_default = wrapperPlant;

// ../../../../Project/100ls-native/node_modules/lodash-es/propertyOf.js
function propertyOf(object) {
  return function(path) {
    return object == null ? void 0 : baseGet_default(object, path);
  };
}
var propertyOf_default = propertyOf;

// ../../../../Project/100ls-native/node_modules/lodash-es/_baseIndexOfWith.js
function baseIndexOfWith(array, value, fromIndex, comparator) {
  var index2 = fromIndex - 1, length = array.length;
  while (++index2 < length) {
    if (comparator(array[index2], value)) {
      return index2;
    }
  }
  return -1;
}
var baseIndexOfWith_default = baseIndexOfWith;

// ../../../../Project/100ls-native/node_modules/lodash-es/_basePullAll.js
var arrayProto3 = Array.prototype;
var splice2 = arrayProto3.splice;
function basePullAll(array, values2, iteratee2, comparator) {
  var indexOf2 = comparator ? baseIndexOfWith_default : baseIndexOf_default, index2 = -1, length = values2.length, seen = array;
  if (array === values2) {
    values2 = copyArray_default(values2);
  }
  if (iteratee2) {
    seen = arrayMap_default(array, baseUnary_default(iteratee2));
  }
  while (++index2 < length) {
    var fromIndex = 0, value = values2[index2], computed17 = iteratee2 ? iteratee2(value) : value;
    while ((fromIndex = indexOf2(seen, computed17, fromIndex, comparator)) > -1) {
      if (seen !== array) {
        splice2.call(seen, fromIndex, 1);
      }
      splice2.call(array, fromIndex, 1);
    }
  }
  return array;
}
var basePullAll_default = basePullAll;

// ../../../../Project/100ls-native/node_modules/lodash-es/pullAll.js
function pullAll(array, values2) {
  return array && array.length && values2 && values2.length ? basePullAll_default(array, values2) : array;
}
var pullAll_default = pullAll;

// ../../../../Project/100ls-native/node_modules/lodash-es/pull.js
var pull = baseRest_default(pullAll_default);
var pull_default = pull;

// ../../../../Project/100ls-native/node_modules/lodash-es/pullAllBy.js
function pullAllBy(array, values2, iteratee2) {
  return array && array.length && values2 && values2.length ? basePullAll_default(array, values2, baseIteratee_default(iteratee2, 2)) : array;
}
var pullAllBy_default = pullAllBy;

// ../../../../Project/100ls-native/node_modules/lodash-es/pullAllWith.js
function pullAllWith(array, values2, comparator) {
  return array && array.length && values2 && values2.length ? basePullAll_default(array, values2, void 0, comparator) : array;
}
var pullAllWith_default = pullAllWith;

// ../../../../Project/100ls-native/node_modules/lodash-es/_basePullAt.js
var arrayProto4 = Array.prototype;
var splice3 = arrayProto4.splice;
function basePullAt(array, indexes) {
  var length = array ? indexes.length : 0, lastIndex = length - 1;
  while (length--) {
    var index2 = indexes[length];
    if (length == lastIndex || index2 !== previous) {
      var previous = index2;
      if (isIndex_default(index2)) {
        splice3.call(array, index2, 1);
      } else {
        baseUnset_default(array, index2);
      }
    }
  }
  return array;
}
var basePullAt_default = basePullAt;

// ../../../../Project/100ls-native/node_modules/lodash-es/pullAt.js
var pullAt = flatRest_default(function(array, indexes) {
  var length = array == null ? 0 : array.length, result2 = baseAt_default(array, indexes);
  basePullAt_default(array, arrayMap_default(indexes, function(index2) {
    return isIndex_default(index2, length) ? +index2 : index2;
  }).sort(compareAscending_default));
  return result2;
});
var pullAt_default = pullAt;

// ../../../../Project/100ls-native/node_modules/lodash-es/_baseRandom.js
var nativeFloor3 = Math.floor;
var nativeRandom = Math.random;
function baseRandom(lower, upper) {
  return lower + nativeFloor3(nativeRandom() * (upper - lower + 1));
}
var baseRandom_default = baseRandom;

// ../../../../Project/100ls-native/node_modules/lodash-es/random.js
var freeParseFloat = parseFloat;
var nativeMin10 = Math.min;
var nativeRandom2 = Math.random;
function random(lower, upper, floating) {
  if (floating && typeof floating != "boolean" && isIterateeCall_default(lower, upper, floating)) {
    upper = floating = void 0;
  }
  if (floating === void 0) {
    if (typeof upper == "boolean") {
      floating = upper;
      upper = void 0;
    } else if (typeof lower == "boolean") {
      floating = lower;
      lower = void 0;
    }
  }
  if (lower === void 0 && upper === void 0) {
    lower = 0;
    upper = 1;
  } else {
    lower = toFinite_default(lower);
    if (upper === void 0) {
      upper = lower;
      lower = 0;
    } else {
      upper = toFinite_default(upper);
    }
  }
  if (lower > upper) {
    var temp = lower;
    lower = upper;
    upper = temp;
  }
  if (floating || lower % 1 || upper % 1) {
    var rand = nativeRandom2();
    return nativeMin10(lower + rand * (upper - lower + freeParseFloat("1e-" + ((rand + "").length - 1))), upper);
  }
  return baseRandom_default(lower, upper);
}
var random_default = random;

// ../../../../Project/100ls-native/node_modules/lodash-es/_baseRange.js
var nativeCeil4 = Math.ceil;
var nativeMax13 = Math.max;
function baseRange(start, end, step, fromRight) {
  var index2 = -1, length = nativeMax13(nativeCeil4((end - start) / (step || 1)), 0), result2 = Array(length);
  while (length--) {
    result2[fromRight ? length : ++index2] = start;
    start += step;
  }
  return result2;
}
var baseRange_default = baseRange;

// ../../../../Project/100ls-native/node_modules/lodash-es/_createRange.js
function createRange(fromRight) {
  return function(start, end, step) {
    if (step && typeof step != "number" && isIterateeCall_default(start, end, step)) {
      end = step = void 0;
    }
    start = toFinite_default(start);
    if (end === void 0) {
      end = start;
      start = 0;
    } else {
      end = toFinite_default(end);
    }
    step = step === void 0 ? start < end ? 1 : -1 : toFinite_default(step);
    return baseRange_default(start, end, step, fromRight);
  };
}
var createRange_default = createRange;

// ../../../../Project/100ls-native/node_modules/lodash-es/range.js
var range = createRange_default();
var range_default = range;

// ../../../../Project/100ls-native/node_modules/lodash-es/rangeRight.js
var rangeRight = createRange_default(true);
var rangeRight_default = rangeRight;

// ../../../../Project/100ls-native/node_modules/lodash-es/rearg.js
var WRAP_REARG_FLAG4 = 256;
var rearg = flatRest_default(function(func, indexes) {
  return createWrap_default(func, WRAP_REARG_FLAG4, void 0, void 0, void 0, indexes);
});
var rearg_default = rearg;

// ../../../../Project/100ls-native/node_modules/lodash-es/_baseReduce.js
function baseReduce(collection, iteratee2, accumulator, initAccum, eachFunc) {
  eachFunc(collection, function(value, index2, collection2) {
    accumulator = initAccum ? (initAccum = false, value) : iteratee2(accumulator, value, index2, collection2);
  });
  return accumulator;
}
var baseReduce_default = baseReduce;

// ../../../../Project/100ls-native/node_modules/lodash-es/reduce.js
function reduce(collection, iteratee2, accumulator) {
  var func = isArray_default(collection) ? arrayReduce_default : baseReduce_default, initAccum = arguments.length < 3;
  return func(collection, baseIteratee_default(iteratee2, 4), accumulator, initAccum, baseEach_default);
}
var reduce_default = reduce;

// ../../../../Project/100ls-native/node_modules/lodash-es/_arrayReduceRight.js
function arrayReduceRight(array, iteratee2, accumulator, initAccum) {
  var length = array == null ? 0 : array.length;
  if (initAccum && length) {
    accumulator = array[--length];
  }
  while (length--) {
    accumulator = iteratee2(accumulator, array[length], length, array);
  }
  return accumulator;
}
var arrayReduceRight_default = arrayReduceRight;

// ../../../../Project/100ls-native/node_modules/lodash-es/reduceRight.js
function reduceRight(collection, iteratee2, accumulator) {
  var func = isArray_default(collection) ? arrayReduceRight_default : baseReduce_default, initAccum = arguments.length < 3;
  return func(collection, baseIteratee_default(iteratee2, 4), accumulator, initAccum, baseEachRight_default);
}
var reduceRight_default = reduceRight;

// ../../../../Project/100ls-native/node_modules/lodash-es/reject.js
function reject(collection, predicate) {
  var func = isArray_default(collection) ? arrayFilter_default : baseFilter_default;
  return func(collection, negate_default(baseIteratee_default(predicate, 3)));
}
var reject_default = reject;

// ../../../../Project/100ls-native/node_modules/lodash-es/remove.js
function remove(array, predicate) {
  var result2 = [];
  if (!(array && array.length)) {
    return result2;
  }
  var index2 = -1, indexes = [], length = array.length;
  predicate = baseIteratee_default(predicate, 3);
  while (++index2 < length) {
    var value = array[index2];
    if (predicate(value, index2, array)) {
      result2.push(value);
      indexes.push(index2);
    }
  }
  basePullAt_default(array, indexes);
  return result2;
}
var remove_default = remove;

// ../../../../Project/100ls-native/node_modules/lodash-es/repeat.js
function repeat(string, n, guard) {
  if (guard ? isIterateeCall_default(string, n, guard) : n === void 0) {
    n = 1;
  } else {
    n = toInteger_default(n);
  }
  return baseRepeat_default(toString_default(string), n);
}
var repeat_default = repeat;

// ../../../../Project/100ls-native/node_modules/lodash-es/replace.js
function replace() {
  var args = arguments, string = toString_default(args[0]);
  return args.length < 3 ? string : string.replace(args[1], args[2]);
}
var replace_default = replace;

// ../../../../Project/100ls-native/node_modules/lodash-es/rest.js
var FUNC_ERROR_TEXT10 = "Expected a function";
function rest(func, start) {
  if (typeof func != "function") {
    throw new TypeError(FUNC_ERROR_TEXT10);
  }
  start = start === void 0 ? start : toInteger_default(start);
  return baseRest_default(func, start);
}
var rest_default = rest;

// ../../../../Project/100ls-native/node_modules/lodash-es/result.js
function result(object, path, defaultValue) {
  path = castPath_default(path, object);
  var index2 = -1, length = path.length;
  if (!length) {
    length = 1;
    object = void 0;
  }
  while (++index2 < length) {
    var value = object == null ? void 0 : object[toKey_default(path[index2])];
    if (value === void 0) {
      index2 = length;
      value = defaultValue;
    }
    object = isFunction_default(value) ? value.call(object) : value;
  }
  return object;
}
var result_default = result;

// ../../../../Project/100ls-native/node_modules/lodash-es/reverse.js
var arrayProto5 = Array.prototype;
var nativeReverse = arrayProto5.reverse;
function reverse(array) {
  return array == null ? array : nativeReverse.call(array);
}
var reverse_default = reverse;

// ../../../../Project/100ls-native/node_modules/lodash-es/round.js
var round = createRound_default("round");
var round_default = round;

// ../../../../Project/100ls-native/node_modules/lodash-es/_arraySample.js
function arraySample(array) {
  var length = array.length;
  return length ? array[baseRandom_default(0, length - 1)] : void 0;
}
var arraySample_default = arraySample;

// ../../../../Project/100ls-native/node_modules/lodash-es/_baseSample.js
function baseSample(collection) {
  return arraySample_default(values_default(collection));
}
var baseSample_default = baseSample;

// ../../../../Project/100ls-native/node_modules/lodash-es/sample.js
function sample(collection) {
  var func = isArray_default(collection) ? arraySample_default : baseSample_default;
  return func(collection);
}
var sample_default = sample;

// ../../../../Project/100ls-native/node_modules/lodash-es/_shuffleSelf.js
function shuffleSelf(array, size2) {
  var index2 = -1, length = array.length, lastIndex = length - 1;
  size2 = size2 === void 0 ? length : size2;
  while (++index2 < size2) {
    var rand = baseRandom_default(index2, lastIndex), value = array[rand];
    array[rand] = array[index2];
    array[index2] = value;
  }
  array.length = size2;
  return array;
}
var shuffleSelf_default = shuffleSelf;

// ../../../../Project/100ls-native/node_modules/lodash-es/_arraySampleSize.js
function arraySampleSize(array, n) {
  return shuffleSelf_default(copyArray_default(array), baseClamp_default(n, 0, array.length));
}
var arraySampleSize_default = arraySampleSize;

// ../../../../Project/100ls-native/node_modules/lodash-es/_baseSampleSize.js
function baseSampleSize(collection, n) {
  var array = values_default(collection);
  return shuffleSelf_default(array, baseClamp_default(n, 0, array.length));
}
var baseSampleSize_default = baseSampleSize;

// ../../../../Project/100ls-native/node_modules/lodash-es/sampleSize.js
function sampleSize(collection, n, guard) {
  if (guard ? isIterateeCall_default(collection, n, guard) : n === void 0) {
    n = 1;
  } else {
    n = toInteger_default(n);
  }
  var func = isArray_default(collection) ? arraySampleSize_default : baseSampleSize_default;
  return func(collection, n);
}
var sampleSize_default = sampleSize;

// ../../../../Project/100ls-native/node_modules/lodash-es/set.js
function set(object, path, value) {
  return object == null ? object : baseSet_default(object, path, value);
}
var set_default = set;

// ../../../../Project/100ls-native/node_modules/lodash-es/setWith.js
function setWith(object, path, value, customizer) {
  customizer = typeof customizer == "function" ? customizer : void 0;
  return object == null ? object : baseSet_default(object, path, value, customizer);
}
var setWith_default = setWith;

// ../../../../Project/100ls-native/node_modules/lodash-es/_arrayShuffle.js
function arrayShuffle(array) {
  return shuffleSelf_default(copyArray_default(array));
}
var arrayShuffle_default = arrayShuffle;

// ../../../../Project/100ls-native/node_modules/lodash-es/_baseShuffle.js
function baseShuffle(collection) {
  return shuffleSelf_default(values_default(collection));
}
var baseShuffle_default = baseShuffle;

// ../../../../Project/100ls-native/node_modules/lodash-es/shuffle.js
function shuffle(collection) {
  var func = isArray_default(collection) ? arrayShuffle_default : baseShuffle_default;
  return func(collection);
}
var shuffle_default = shuffle;

// ../../../../Project/100ls-native/node_modules/lodash-es/size.js
var mapTag10 = "[object Map]";
var setTag10 = "[object Set]";
function size(collection) {
  if (collection == null) {
    return 0;
  }
  if (isArrayLike_default(collection)) {
    return isString_default(collection) ? stringSize_default(collection) : collection.length;
  }
  var tag = getTag_default(collection);
  if (tag == mapTag10 || tag == setTag10) {
    return collection.size;
  }
  return baseKeys_default(collection).length;
}
var size_default = size;

// ../../../../Project/100ls-native/node_modules/lodash-es/slice.js
function slice(array, start, end) {
  var length = array == null ? 0 : array.length;
  if (!length) {
    return [];
  }
  if (end && typeof end != "number" && isIterateeCall_default(array, start, end)) {
    start = 0;
    end = length;
  } else {
    start = start == null ? 0 : toInteger_default(start);
    end = end === void 0 ? length : toInteger_default(end);
  }
  return baseSlice_default(array, start, end);
}
var slice_default = slice;

// ../../../../Project/100ls-native/node_modules/lodash-es/snakeCase.js
var snakeCase = createCompounder_default(function(result2, word, index2) {
  return result2 + (index2 ? "_" : "") + word.toLowerCase();
});
var snakeCase_default = snakeCase;

// ../../../../Project/100ls-native/node_modules/lodash-es/_baseSome.js
function baseSome(collection, predicate) {
  var result2;
  baseEach_default(collection, function(value, index2, collection2) {
    result2 = predicate(value, index2, collection2);
    return !result2;
  });
  return !!result2;
}
var baseSome_default = baseSome;

// ../../../../Project/100ls-native/node_modules/lodash-es/some.js
function some(collection, predicate, guard) {
  var func = isArray_default(collection) ? arraySome_default : baseSome_default;
  if (guard && isIterateeCall_default(collection, predicate, guard)) {
    predicate = void 0;
  }
  return func(collection, baseIteratee_default(predicate, 3));
}
var some_default = some;

// ../../../../Project/100ls-native/node_modules/lodash-es/sortBy.js
var sortBy = baseRest_default(function(collection, iteratees) {
  if (collection == null) {
    return [];
  }
  var length = iteratees.length;
  if (length > 1 && isIterateeCall_default(collection, iteratees[0], iteratees[1])) {
    iteratees = [];
  } else if (length > 2 && isIterateeCall_default(iteratees[0], iteratees[1], iteratees[2])) {
    iteratees = [iteratees[0]];
  }
  return baseOrderBy_default(collection, baseFlatten_default(iteratees, 1), []);
});
var sortBy_default = sortBy;

// ../../../../Project/100ls-native/node_modules/lodash-es/_baseSortedIndexBy.js
var MAX_ARRAY_LENGTH3 = 4294967295;
var MAX_ARRAY_INDEX = MAX_ARRAY_LENGTH3 - 1;
var nativeFloor4 = Math.floor;
var nativeMin11 = Math.min;
function baseSortedIndexBy(array, value, iteratee2, retHighest) {
  var low = 0, high = array == null ? 0 : array.length;
  if (high === 0) {
    return 0;
  }
  value = iteratee2(value);
  var valIsNaN = value !== value, valIsNull = value === null, valIsSymbol = isSymbol_default(value), valIsUndefined = value === void 0;
  while (low < high) {
    var mid = nativeFloor4((low + high) / 2), computed17 = iteratee2(array[mid]), othIsDefined = computed17 !== void 0, othIsNull = computed17 === null, othIsReflexive = computed17 === computed17, othIsSymbol = isSymbol_default(computed17);
    if (valIsNaN) {
      var setLow = retHighest || othIsReflexive;
    } else if (valIsUndefined) {
      setLow = othIsReflexive && (retHighest || othIsDefined);
    } else if (valIsNull) {
      setLow = othIsReflexive && othIsDefined && (retHighest || !othIsNull);
    } else if (valIsSymbol) {
      setLow = othIsReflexive && othIsDefined && !othIsNull && (retHighest || !othIsSymbol);
    } else if (othIsNull || othIsSymbol) {
      setLow = false;
    } else {
      setLow = retHighest ? computed17 <= value : computed17 < value;
    }
    if (setLow) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }
  return nativeMin11(high, MAX_ARRAY_INDEX);
}
var baseSortedIndexBy_default = baseSortedIndexBy;

// ../../../../Project/100ls-native/node_modules/lodash-es/_baseSortedIndex.js
var MAX_ARRAY_LENGTH4 = 4294967295;
var HALF_MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH4 >>> 1;
function baseSortedIndex(array, value, retHighest) {
  var low = 0, high = array == null ? low : array.length;
  if (typeof value == "number" && value === value && high <= HALF_MAX_ARRAY_LENGTH) {
    while (low < high) {
      var mid = low + high >>> 1, computed17 = array[mid];
      if (computed17 !== null && !isSymbol_default(computed17) && (retHighest ? computed17 <= value : computed17 < value)) {
        low = mid + 1;
      } else {
        high = mid;
      }
    }
    return high;
  }
  return baseSortedIndexBy_default(array, value, identity_default, retHighest);
}
var baseSortedIndex_default = baseSortedIndex;

// ../../../../Project/100ls-native/node_modules/lodash-es/sortedIndex.js
function sortedIndex(array, value) {
  return baseSortedIndex_default(array, value);
}
var sortedIndex_default = sortedIndex;

// ../../../../Project/100ls-native/node_modules/lodash-es/sortedIndexBy.js
function sortedIndexBy(array, value, iteratee2) {
  return baseSortedIndexBy_default(array, value, baseIteratee_default(iteratee2, 2));
}
var sortedIndexBy_default = sortedIndexBy;

// ../../../../Project/100ls-native/node_modules/lodash-es/sortedIndexOf.js
function sortedIndexOf(array, value) {
  var length = array == null ? 0 : array.length;
  if (length) {
    var index2 = baseSortedIndex_default(array, value);
    if (index2 < length && eq_default(array[index2], value)) {
      return index2;
    }
  }
  return -1;
}
var sortedIndexOf_default = sortedIndexOf;

// ../../../../Project/100ls-native/node_modules/lodash-es/sortedLastIndex.js
function sortedLastIndex(array, value) {
  return baseSortedIndex_default(array, value, true);
}
var sortedLastIndex_default = sortedLastIndex;

// ../../../../Project/100ls-native/node_modules/lodash-es/sortedLastIndexBy.js
function sortedLastIndexBy(array, value, iteratee2) {
  return baseSortedIndexBy_default(array, value, baseIteratee_default(iteratee2, 2), true);
}
var sortedLastIndexBy_default = sortedLastIndexBy;

// ../../../../Project/100ls-native/node_modules/lodash-es/sortedLastIndexOf.js
function sortedLastIndexOf(array, value) {
  var length = array == null ? 0 : array.length;
  if (length) {
    var index2 = baseSortedIndex_default(array, value, true) - 1;
    if (eq_default(array[index2], value)) {
      return index2;
    }
  }
  return -1;
}
var sortedLastIndexOf_default = sortedLastIndexOf;

// ../../../../Project/100ls-native/node_modules/lodash-es/_baseSortedUniq.js
function baseSortedUniq(array, iteratee2) {
  var index2 = -1, length = array.length, resIndex = 0, result2 = [];
  while (++index2 < length) {
    var value = array[index2], computed17 = iteratee2 ? iteratee2(value) : value;
    if (!index2 || !eq_default(computed17, seen)) {
      var seen = computed17;
      result2[resIndex++] = value === 0 ? 0 : value;
    }
  }
  return result2;
}
var baseSortedUniq_default = baseSortedUniq;

// ../../../../Project/100ls-native/node_modules/lodash-es/sortedUniq.js
function sortedUniq(array) {
  return array && array.length ? baseSortedUniq_default(array) : [];
}
var sortedUniq_default = sortedUniq;

// ../../../../Project/100ls-native/node_modules/lodash-es/sortedUniqBy.js
function sortedUniqBy(array, iteratee2) {
  return array && array.length ? baseSortedUniq_default(array, baseIteratee_default(iteratee2, 2)) : [];
}
var sortedUniqBy_default = sortedUniqBy;

// ../../../../Project/100ls-native/node_modules/lodash-es/split.js
var MAX_ARRAY_LENGTH5 = 4294967295;
function split(string, separator, limit2) {
  if (limit2 && typeof limit2 != "number" && isIterateeCall_default(string, separator, limit2)) {
    separator = limit2 = void 0;
  }
  limit2 = limit2 === void 0 ? MAX_ARRAY_LENGTH5 : limit2 >>> 0;
  if (!limit2) {
    return [];
  }
  string = toString_default(string);
  if (string && (typeof separator == "string" || separator != null && !isRegExp_default(separator))) {
    separator = baseToString_default(separator);
    if (!separator && hasUnicode_default(string)) {
      return castSlice_default(stringToArray_default(string), 0, limit2);
    }
  }
  return string.split(separator, limit2);
}
var split_default = split;

// ../../../../Project/100ls-native/node_modules/lodash-es/spread.js
var FUNC_ERROR_TEXT11 = "Expected a function";
var nativeMax14 = Math.max;
function spread(func, start) {
  if (typeof func != "function") {
    throw new TypeError(FUNC_ERROR_TEXT11);
  }
  start = start == null ? 0 : nativeMax14(toInteger_default(start), 0);
  return baseRest_default(function(args) {
    var array = args[start], otherArgs = castSlice_default(args, 0, start);
    if (array) {
      arrayPush_default(otherArgs, array);
    }
    return apply_default(func, this, otherArgs);
  });
}
var spread_default = spread;

// ../../../../Project/100ls-native/node_modules/lodash-es/startCase.js
var startCase = createCompounder_default(function(result2, word, index2) {
  return result2 + (index2 ? " " : "") + upperFirst_default(word);
});
var startCase_default = startCase;

// ../../../../Project/100ls-native/node_modules/lodash-es/startsWith.js
function startsWith(string, target2, position) {
  string = toString_default(string);
  position = position == null ? 0 : baseClamp_default(toInteger_default(position), 0, string.length);
  target2 = baseToString_default(target2);
  return string.slice(position, position + target2.length) == target2;
}
var startsWith_default = startsWith;

// ../../../../Project/100ls-native/node_modules/lodash-es/stubObject.js
function stubObject() {
  return {};
}
var stubObject_default = stubObject;

// ../../../../Project/100ls-native/node_modules/lodash-es/stubString.js
function stubString() {
  return "";
}
var stubString_default = stubString;

// ../../../../Project/100ls-native/node_modules/lodash-es/stubTrue.js
function stubTrue() {
  return true;
}
var stubTrue_default = stubTrue;

// ../../../../Project/100ls-native/node_modules/lodash-es/subtract.js
var subtract = createMathOperation_default(function(minuend, subtrahend) {
  return minuend - subtrahend;
}, 0);
var subtract_default = subtract;

// ../../../../Project/100ls-native/node_modules/lodash-es/sum.js
function sum(array) {
  return array && array.length ? baseSum_default(array, identity_default) : 0;
}
var sum_default = sum;

// ../../../../Project/100ls-native/node_modules/lodash-es/sumBy.js
function sumBy(array, iteratee2) {
  return array && array.length ? baseSum_default(array, baseIteratee_default(iteratee2, 2)) : 0;
}
var sumBy_default = sumBy;

// ../../../../Project/100ls-native/node_modules/lodash-es/tail.js
function tail(array) {
  var length = array == null ? 0 : array.length;
  return length ? baseSlice_default(array, 1, length) : [];
}
var tail_default = tail;

// ../../../../Project/100ls-native/node_modules/lodash-es/take.js
function take(array, n, guard) {
  if (!(array && array.length)) {
    return [];
  }
  n = guard || n === void 0 ? 1 : toInteger_default(n);
  return baseSlice_default(array, 0, n < 0 ? 0 : n);
}
var take_default = take;

// ../../../../Project/100ls-native/node_modules/lodash-es/takeRight.js
function takeRight(array, n, guard) {
  var length = array == null ? 0 : array.length;
  if (!length) {
    return [];
  }
  n = guard || n === void 0 ? 1 : toInteger_default(n);
  n = length - n;
  return baseSlice_default(array, n < 0 ? 0 : n, length);
}
var takeRight_default = takeRight;

// ../../../../Project/100ls-native/node_modules/lodash-es/takeRightWhile.js
function takeRightWhile(array, predicate) {
  return array && array.length ? baseWhile_default(array, baseIteratee_default(predicate, 3), false, true) : [];
}
var takeRightWhile_default = takeRightWhile;

// ../../../../Project/100ls-native/node_modules/lodash-es/takeWhile.js
function takeWhile(array, predicate) {
  return array && array.length ? baseWhile_default(array, baseIteratee_default(predicate, 3)) : [];
}
var takeWhile_default = takeWhile;

// ../../../../Project/100ls-native/node_modules/lodash-es/tap.js
function tap(value, interceptor) {
  interceptor(value);
  return value;
}
var tap_default = tap;

// ../../../../Project/100ls-native/node_modules/lodash-es/_customDefaultsAssignIn.js
var objectProto27 = Object.prototype;
var hasOwnProperty23 = objectProto27.hasOwnProperty;
function customDefaultsAssignIn(objValue, srcValue, key, object) {
  if (objValue === void 0 || eq_default(objValue, objectProto27[key]) && !hasOwnProperty23.call(object, key)) {
    return srcValue;
  }
  return objValue;
}
var customDefaultsAssignIn_default = customDefaultsAssignIn;

// ../../../../Project/100ls-native/node_modules/lodash-es/_escapeStringChar.js
var stringEscapes = {
  "\\": "\\",
  "'": "'",
  "\n": "n",
  "\r": "r",
  "\u2028": "u2028",
  "\u2029": "u2029"
};
function escapeStringChar(chr) {
  return "\\" + stringEscapes[chr];
}
var escapeStringChar_default = escapeStringChar;

// ../../../../Project/100ls-native/node_modules/lodash-es/_reInterpolate.js
var reInterpolate = /<%=([\s\S]+?)%>/g;
var reInterpolate_default = reInterpolate;

// ../../../../Project/100ls-native/node_modules/lodash-es/_reEscape.js
var reEscape = /<%-([\s\S]+?)%>/g;
var reEscape_default = reEscape;

// ../../../../Project/100ls-native/node_modules/lodash-es/_reEvaluate.js
var reEvaluate = /<%([\s\S]+?)%>/g;
var reEvaluate_default = reEvaluate;

// ../../../../Project/100ls-native/node_modules/lodash-es/templateSettings.js
var templateSettings = {
  /**
   * Used to detect `data` property values to be HTML-escaped.
   *
   * @memberOf _.templateSettings
   * @type {RegExp}
   */
  "escape": reEscape_default,
  /**
   * Used to detect code to be evaluated.
   *
   * @memberOf _.templateSettings
   * @type {RegExp}
   */
  "evaluate": reEvaluate_default,
  /**
   * Used to detect `data` property values to inject.
   *
   * @memberOf _.templateSettings
   * @type {RegExp}
   */
  "interpolate": reInterpolate_default,
  /**
   * Used to reference the data object in the template text.
   *
   * @memberOf _.templateSettings
   * @type {string}
   */
  "variable": "",
  /**
   * Used to import variables into the compiled template.
   *
   * @memberOf _.templateSettings
   * @type {Object}
   */
  "imports": {
    /**
     * A reference to the `lodash` function.
     *
     * @memberOf _.templateSettings.imports
     * @type {Function}
     */
    "_": { "escape": escape_default }
  }
};
var templateSettings_default = templateSettings;

// ../../../../Project/100ls-native/node_modules/lodash-es/template.js
var INVALID_TEMPL_VAR_ERROR_TEXT = "Invalid `variable` option passed into `_.template`";
var reEmptyStringLeading = /\b__p \+= '';/g;
var reEmptyStringMiddle = /\b(__p \+=) '' \+/g;
var reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;
var reForbiddenIdentifierChars = /[()=,{}\[\]\/\s]/;
var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;
var reNoMatch = /($^)/;
var reUnescapedString = /['\n\r\u2028\u2029\\]/g;
var objectProto28 = Object.prototype;
var hasOwnProperty24 = objectProto28.hasOwnProperty;
function template(string, options, guard) {
  var settings = templateSettings_default.imports._.templateSettings || templateSettings_default;
  if (guard && isIterateeCall_default(string, options, guard)) {
    options = void 0;
  }
  string = toString_default(string);
  options = assignInWith_default({}, options, settings, customDefaultsAssignIn_default);
  var imports = assignInWith_default({}, options.imports, settings.imports, customDefaultsAssignIn_default), importsKeys = keys_default(imports), importsValues = baseValues_default(imports, importsKeys);
  var isEscaping, isEvaluating, index2 = 0, interpolate = options.interpolate || reNoMatch, source = "__p += '";
  var reDelimiters = RegExp(
    (options.escape || reNoMatch).source + "|" + interpolate.source + "|" + (interpolate === reInterpolate_default ? reEsTemplate : reNoMatch).source + "|" + (options.evaluate || reNoMatch).source + "|$",
    "g"
  );
  var sourceURL = hasOwnProperty24.call(options, "sourceURL") ? "//# sourceURL=" + (options.sourceURL + "").replace(/\s/g, " ") + "\n" : "";
  string.replace(reDelimiters, function(match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
    interpolateValue || (interpolateValue = esTemplateValue);
    source += string.slice(index2, offset).replace(reUnescapedString, escapeStringChar_default);
    if (escapeValue) {
      isEscaping = true;
      source += "' +\n__e(" + escapeValue + ") +\n'";
    }
    if (evaluateValue) {
      isEvaluating = true;
      source += "';\n" + evaluateValue + ";\n__p += '";
    }
    if (interpolateValue) {
      source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
    }
    index2 = offset + match.length;
    return match;
  });
  source += "';\n";
  var variable = hasOwnProperty24.call(options, "variable") && options.variable;
  if (!variable) {
    source = "with (obj) {\n" + source + "\n}\n";
  } else if (reForbiddenIdentifierChars.test(variable)) {
    throw new Error(INVALID_TEMPL_VAR_ERROR_TEXT);
  }
  source = (isEvaluating ? source.replace(reEmptyStringLeading, "") : source).replace(reEmptyStringMiddle, "$1").replace(reEmptyStringTrailing, "$1;");
  source = "function(" + (variable || "obj") + ") {\n" + (variable ? "" : "obj || (obj = {});\n") + "var __t, __p = ''" + (isEscaping ? ", __e = _.escape" : "") + (isEvaluating ? ", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n" : ";\n") + source + "return __p\n}";
  var result2 = attempt_default(function() {
    return Function(importsKeys, sourceURL + "return " + source).apply(void 0, importsValues);
  });
  result2.source = source;
  if (isError_default(result2)) {
    throw result2;
  }
  return result2;
}
var template_default = template;

// ../../../../Project/100ls-native/node_modules/lodash-es/throttle.js
var FUNC_ERROR_TEXT12 = "Expected a function";
function throttle(func, wait, options) {
  var leading = true, trailing = true;
  if (typeof func != "function") {
    throw new TypeError(FUNC_ERROR_TEXT12);
  }
  if (isObject_default(options)) {
    leading = "leading" in options ? !!options.leading : leading;
    trailing = "trailing" in options ? !!options.trailing : trailing;
  }
  return debounce_default(func, wait, {
    "leading": leading,
    "maxWait": wait,
    "trailing": trailing
  });
}
var throttle_default = throttle;

// ../../../../Project/100ls-native/node_modules/lodash-es/thru.js
function thru(value, interceptor) {
  return interceptor(value);
}
var thru_default = thru;

// ../../../../Project/100ls-native/node_modules/lodash-es/times.js
var MAX_SAFE_INTEGER5 = 9007199254740991;
var MAX_ARRAY_LENGTH6 = 4294967295;
var nativeMin12 = Math.min;
function times(n, iteratee2) {
  n = toInteger_default(n);
  if (n < 1 || n > MAX_SAFE_INTEGER5) {
    return [];
  }
  var index2 = MAX_ARRAY_LENGTH6, length = nativeMin12(n, MAX_ARRAY_LENGTH6);
  iteratee2 = castFunction_default(iteratee2);
  n -= MAX_ARRAY_LENGTH6;
  var result2 = baseTimes_default(length, iteratee2);
  while (++index2 < n) {
    iteratee2(index2);
  }
  return result2;
}
var times_default = times;

// ../../../../Project/100ls-native/node_modules/lodash-es/toIterator.js
function wrapperToIterator() {
  return this;
}
var toIterator_default = wrapperToIterator;

// ../../../../Project/100ls-native/node_modules/lodash-es/_baseWrapperValue.js
function baseWrapperValue(value, actions) {
  var result2 = value;
  if (result2 instanceof LazyWrapper_default) {
    result2 = result2.value();
  }
  return arrayReduce_default(actions, function(result3, action) {
    return action.func.apply(action.thisArg, arrayPush_default([result3], action.args));
  }, result2);
}
var baseWrapperValue_default = baseWrapperValue;

// ../../../../Project/100ls-native/node_modules/lodash-es/wrapperValue.js
function wrapperValue() {
  return baseWrapperValue_default(this.__wrapped__, this.__actions__);
}
var wrapperValue_default = wrapperValue;

// ../../../../Project/100ls-native/node_modules/lodash-es/toLower.js
function toLower(value) {
  return toString_default(value).toLowerCase();
}
var toLower_default = toLower;

// ../../../../Project/100ls-native/node_modules/lodash-es/toPath.js
function toPath(value) {
  if (isArray_default(value)) {
    return arrayMap_default(value, toKey_default);
  }
  return isSymbol_default(value) ? [value] : copyArray_default(stringToPath_default(toString_default(value)));
}
var toPath_default = toPath;

// ../../../../Project/100ls-native/node_modules/lodash-es/toSafeInteger.js
var MAX_SAFE_INTEGER6 = 9007199254740991;
function toSafeInteger(value) {
  return value ? baseClamp_default(toInteger_default(value), -MAX_SAFE_INTEGER6, MAX_SAFE_INTEGER6) : value === 0 ? value : 0;
}
var toSafeInteger_default = toSafeInteger;

// ../../../../Project/100ls-native/node_modules/lodash-es/toUpper.js
function toUpper(value) {
  return toString_default(value).toUpperCase();
}
var toUpper_default = toUpper;

// ../../../../Project/100ls-native/node_modules/lodash-es/transform.js
function transform(object, iteratee2, accumulator) {
  var isArr = isArray_default(object), isArrLike = isArr || isBuffer_default(object) || isTypedArray_default(object);
  iteratee2 = baseIteratee_default(iteratee2, 4);
  if (accumulator == null) {
    var Ctor = object && object.constructor;
    if (isArrLike) {
      accumulator = isArr ? new Ctor() : [];
    } else if (isObject_default(object)) {
      accumulator = isFunction_default(Ctor) ? baseCreate_default(getPrototype_default(object)) : {};
    } else {
      accumulator = {};
    }
  }
  (isArrLike ? arrayEach_default : baseForOwn_default)(object, function(value, index2, object2) {
    return iteratee2(accumulator, value, index2, object2);
  });
  return accumulator;
}
var transform_default = transform;

// ../../../../Project/100ls-native/node_modules/lodash-es/_charsEndIndex.js
function charsEndIndex(strSymbols, chrSymbols) {
  var index2 = strSymbols.length;
  while (index2-- && baseIndexOf_default(chrSymbols, strSymbols[index2], 0) > -1) {
  }
  return index2;
}
var charsEndIndex_default = charsEndIndex;

// ../../../../Project/100ls-native/node_modules/lodash-es/_charsStartIndex.js
function charsStartIndex(strSymbols, chrSymbols) {
  var index2 = -1, length = strSymbols.length;
  while (++index2 < length && baseIndexOf_default(chrSymbols, strSymbols[index2], 0) > -1) {
  }
  return index2;
}
var charsStartIndex_default = charsStartIndex;

// ../../../../Project/100ls-native/node_modules/lodash-es/trim.js
function trim(string, chars, guard) {
  string = toString_default(string);
  if (string && (guard || chars === void 0)) {
    return baseTrim_default(string);
  }
  if (!string || !(chars = baseToString_default(chars))) {
    return string;
  }
  var strSymbols = stringToArray_default(string), chrSymbols = stringToArray_default(chars), start = charsStartIndex_default(strSymbols, chrSymbols), end = charsEndIndex_default(strSymbols, chrSymbols) + 1;
  return castSlice_default(strSymbols, start, end).join("");
}
var trim_default = trim;

// ../../../../Project/100ls-native/node_modules/lodash-es/trimEnd.js
function trimEnd(string, chars, guard) {
  string = toString_default(string);
  if (string && (guard || chars === void 0)) {
    return string.slice(0, trimmedEndIndex_default(string) + 1);
  }
  if (!string || !(chars = baseToString_default(chars))) {
    return string;
  }
  var strSymbols = stringToArray_default(string), end = charsEndIndex_default(strSymbols, stringToArray_default(chars)) + 1;
  return castSlice_default(strSymbols, 0, end).join("");
}
var trimEnd_default = trimEnd;

// ../../../../Project/100ls-native/node_modules/lodash-es/trimStart.js
var reTrimStart3 = /^\s+/;
function trimStart(string, chars, guard) {
  string = toString_default(string);
  if (string && (guard || chars === void 0)) {
    return string.replace(reTrimStart3, "");
  }
  if (!string || !(chars = baseToString_default(chars))) {
    return string;
  }
  var strSymbols = stringToArray_default(string), start = charsStartIndex_default(strSymbols, stringToArray_default(chars));
  return castSlice_default(strSymbols, start).join("");
}
var trimStart_default = trimStart;

// ../../../../Project/100ls-native/node_modules/lodash-es/truncate.js
var DEFAULT_TRUNC_LENGTH = 30;
var DEFAULT_TRUNC_OMISSION = "...";
var reFlags2 = /\w*$/;
function truncate(string, options) {
  var length = DEFAULT_TRUNC_LENGTH, omission = DEFAULT_TRUNC_OMISSION;
  if (isObject_default(options)) {
    var separator = "separator" in options ? options.separator : separator;
    length = "length" in options ? toInteger_default(options.length) : length;
    omission = "omission" in options ? baseToString_default(options.omission) : omission;
  }
  string = toString_default(string);
  var strLength = string.length;
  if (hasUnicode_default(string)) {
    var strSymbols = stringToArray_default(string);
    strLength = strSymbols.length;
  }
  if (length >= strLength) {
    return string;
  }
  var end = length - stringSize_default(omission);
  if (end < 1) {
    return omission;
  }
  var result2 = strSymbols ? castSlice_default(strSymbols, 0, end).join("") : string.slice(0, end);
  if (separator === void 0) {
    return result2 + omission;
  }
  if (strSymbols) {
    end += result2.length - end;
  }
  if (isRegExp_default(separator)) {
    if (string.slice(end).search(separator)) {
      var match, substring = result2;
      if (!separator.global) {
        separator = RegExp(separator.source, toString_default(reFlags2.exec(separator)) + "g");
      }
      separator.lastIndex = 0;
      while (match = separator.exec(substring)) {
        var newEnd = match.index;
      }
      result2 = result2.slice(0, newEnd === void 0 ? end : newEnd);
    }
  } else if (string.indexOf(baseToString_default(separator), end) != end) {
    var index2 = result2.lastIndexOf(separator);
    if (index2 > -1) {
      result2 = result2.slice(0, index2);
    }
  }
  return result2 + omission;
}
var truncate_default = truncate;

// ../../../../Project/100ls-native/node_modules/lodash-es/unary.js
function unary(func) {
  return ary_default(func, 1);
}
var unary_default = unary;

// ../../../../Project/100ls-native/node_modules/lodash-es/_unescapeHtmlChar.js
var htmlUnescapes = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'"
};
var unescapeHtmlChar = basePropertyOf_default(htmlUnescapes);
var unescapeHtmlChar_default = unescapeHtmlChar;

// ../../../../Project/100ls-native/node_modules/lodash-es/unescape.js
var reEscapedHtml = /&(?:amp|lt|gt|quot|#39);/g;
var reHasEscapedHtml = RegExp(reEscapedHtml.source);
function unescape(string) {
  string = toString_default(string);
  return string && reHasEscapedHtml.test(string) ? string.replace(reEscapedHtml, unescapeHtmlChar_default) : string;
}
var unescape_default = unescape;

// ../../../../Project/100ls-native/node_modules/lodash-es/_createSet.js
var INFINITY6 = 1 / 0;
var createSet = !(Set_default && 1 / setToArray_default(new Set_default([, -0]))[1] == INFINITY6) ? noop_default : function(values2) {
  return new Set_default(values2);
};
var createSet_default = createSet;

// ../../../../Project/100ls-native/node_modules/lodash-es/_baseUniq.js
var LARGE_ARRAY_SIZE3 = 200;
function baseUniq(array, iteratee2, comparator) {
  var index2 = -1, includes3 = arrayIncludes_default, length = array.length, isCommon = true, result2 = [], seen = result2;
  if (comparator) {
    isCommon = false;
    includes3 = arrayIncludesWith_default;
  } else if (length >= LARGE_ARRAY_SIZE3) {
    var set2 = iteratee2 ? null : createSet_default(array);
    if (set2) {
      return setToArray_default(set2);
    }
    isCommon = false;
    includes3 = cacheHas_default;
    seen = new SetCache_default();
  } else {
    seen = iteratee2 ? [] : result2;
  }
  outer:
    while (++index2 < length) {
      var value = array[index2], computed17 = iteratee2 ? iteratee2(value) : value;
      value = comparator || value !== 0 ? value : 0;
      if (isCommon && computed17 === computed17) {
        var seenIndex = seen.length;
        while (seenIndex--) {
          if (seen[seenIndex] === computed17) {
            continue outer;
          }
        }
        if (iteratee2) {
          seen.push(computed17);
        }
        result2.push(value);
      } else if (!includes3(seen, computed17, comparator)) {
        if (seen !== result2) {
          seen.push(computed17);
        }
        result2.push(value);
      }
    }
  return result2;
}
var baseUniq_default = baseUniq;

// ../../../../Project/100ls-native/node_modules/lodash-es/union.js
var union = baseRest_default(function(arrays) {
  return baseUniq_default(baseFlatten_default(arrays, 1, isArrayLikeObject_default, true));
});
var union_default = union;

// ../../../../Project/100ls-native/node_modules/lodash-es/unionBy.js
var unionBy = baseRest_default(function(arrays) {
  var iteratee2 = last_default(arrays);
  if (isArrayLikeObject_default(iteratee2)) {
    iteratee2 = void 0;
  }
  return baseUniq_default(baseFlatten_default(arrays, 1, isArrayLikeObject_default, true), baseIteratee_default(iteratee2, 2));
});
var unionBy_default = unionBy;

// ../../../../Project/100ls-native/node_modules/lodash-es/unionWith.js
var unionWith = baseRest_default(function(arrays) {
  var comparator = last_default(arrays);
  comparator = typeof comparator == "function" ? comparator : void 0;
  return baseUniq_default(baseFlatten_default(arrays, 1, isArrayLikeObject_default, true), void 0, comparator);
});
var unionWith_default = unionWith;

// ../../../../Project/100ls-native/node_modules/lodash-es/uniq.js
function uniq(array) {
  return array && array.length ? baseUniq_default(array) : [];
}
var uniq_default = uniq;

// ../../../../Project/100ls-native/node_modules/lodash-es/uniqBy.js
function uniqBy(array, iteratee2) {
  return array && array.length ? baseUniq_default(array, baseIteratee_default(iteratee2, 2)) : [];
}
var uniqBy_default = uniqBy;

// ../../../../Project/100ls-native/node_modules/lodash-es/uniqWith.js
function uniqWith(array, comparator) {
  comparator = typeof comparator == "function" ? comparator : void 0;
  return array && array.length ? baseUniq_default(array, void 0, comparator) : [];
}
var uniqWith_default = uniqWith;

// ../../../../Project/100ls-native/node_modules/lodash-es/uniqueId.js
var idCounter = 0;
function uniqueId(prefix) {
  var id = ++idCounter;
  return toString_default(prefix) + id;
}
var uniqueId_default = uniqueId;

// ../../../../Project/100ls-native/node_modules/lodash-es/unset.js
function unset(object, path) {
  return object == null ? true : baseUnset_default(object, path);
}
var unset_default = unset;

// ../../../../Project/100ls-native/node_modules/lodash-es/unzip.js
var nativeMax15 = Math.max;
function unzip(array) {
  if (!(array && array.length)) {
    return [];
  }
  var length = 0;
  array = arrayFilter_default(array, function(group) {
    if (isArrayLikeObject_default(group)) {
      length = nativeMax15(group.length, length);
      return true;
    }
  });
  return baseTimes_default(length, function(index2) {
    return arrayMap_default(array, baseProperty_default(index2));
  });
}
var unzip_default = unzip;

// ../../../../Project/100ls-native/node_modules/lodash-es/unzipWith.js
function unzipWith(array, iteratee2) {
  if (!(array && array.length)) {
    return [];
  }
  var result2 = unzip_default(array);
  if (iteratee2 == null) {
    return result2;
  }
  return arrayMap_default(result2, function(group) {
    return apply_default(iteratee2, void 0, group);
  });
}
var unzipWith_default = unzipWith;

// ../../../../Project/100ls-native/node_modules/lodash-es/_baseUpdate.js
function baseUpdate(object, path, updater, customizer) {
  return baseSet_default(object, path, updater(baseGet_default(object, path)), customizer);
}
var baseUpdate_default = baseUpdate;

// ../../../../Project/100ls-native/node_modules/lodash-es/update.js
function update(object, path, updater) {
  return object == null ? object : baseUpdate_default(object, path, castFunction_default(updater));
}
var update_default = update;

// ../../../../Project/100ls-native/node_modules/lodash-es/updateWith.js
function updateWith(object, path, updater, customizer) {
  customizer = typeof customizer == "function" ? customizer : void 0;
  return object == null ? object : baseUpdate_default(object, path, castFunction_default(updater), customizer);
}
var updateWith_default = updateWith;

// ../../../../Project/100ls-native/node_modules/lodash-es/upperCase.js
var upperCase = createCompounder_default(function(result2, word, index2) {
  return result2 + (index2 ? " " : "") + word.toUpperCase();
});
var upperCase_default = upperCase;

// ../../../../Project/100ls-native/node_modules/lodash-es/valuesIn.js
function valuesIn(object) {
  return object == null ? [] : baseValues_default(object, keysIn_default(object));
}
var valuesIn_default = valuesIn;

// ../../../../Project/100ls-native/node_modules/lodash-es/without.js
var without = baseRest_default(function(array, values2) {
  return isArrayLikeObject_default(array) ? baseDifference_default(array, values2) : [];
});
var without_default = without;

// ../../../../Project/100ls-native/node_modules/lodash-es/wrap.js
function wrap(value, wrapper) {
  return partial_default(castFunction_default(wrapper), value);
}
var wrap_default = wrap;

// ../../../../Project/100ls-native/node_modules/lodash-es/wrapperAt.js
var wrapperAt = flatRest_default(function(paths) {
  var length = paths.length, start = length ? paths[0] : 0, value = this.__wrapped__, interceptor = function(object) {
    return baseAt_default(object, paths);
  };
  if (length > 1 || this.__actions__.length || !(value instanceof LazyWrapper_default) || !isIndex_default(start)) {
    return this.thru(interceptor);
  }
  value = value.slice(start, +start + (length ? 1 : 0));
  value.__actions__.push({
    "func": thru_default,
    "args": [interceptor],
    "thisArg": void 0
  });
  return new LodashWrapper_default(value, this.__chain__).thru(function(array) {
    if (length && !array.length) {
      array.push(void 0);
    }
    return array;
  });
});
var wrapperAt_default = wrapperAt;

// ../../../../Project/100ls-native/node_modules/lodash-es/wrapperChain.js
function wrapperChain() {
  return chain_default(this);
}
var wrapperChain_default = wrapperChain;

// ../../../../Project/100ls-native/node_modules/lodash-es/wrapperReverse.js
function wrapperReverse() {
  var value = this.__wrapped__;
  if (value instanceof LazyWrapper_default) {
    var wrapped = value;
    if (this.__actions__.length) {
      wrapped = new LazyWrapper_default(this);
    }
    wrapped = wrapped.reverse();
    wrapped.__actions__.push({
      "func": thru_default,
      "args": [reverse_default],
      "thisArg": void 0
    });
    return new LodashWrapper_default(wrapped, this.__chain__);
  }
  return this.thru(reverse_default);
}
var wrapperReverse_default = wrapperReverse;

// ../../../../Project/100ls-native/node_modules/lodash-es/_baseXor.js
function baseXor(arrays, iteratee2, comparator) {
  var length = arrays.length;
  if (length < 2) {
    return length ? baseUniq_default(arrays[0]) : [];
  }
  var index2 = -1, result2 = Array(length);
  while (++index2 < length) {
    var array = arrays[index2], othIndex = -1;
    while (++othIndex < length) {
      if (othIndex != index2) {
        result2[index2] = baseDifference_default(result2[index2] || array, arrays[othIndex], iteratee2, comparator);
      }
    }
  }
  return baseUniq_default(baseFlatten_default(result2, 1), iteratee2, comparator);
}
var baseXor_default = baseXor;

// ../../../../Project/100ls-native/node_modules/lodash-es/xor.js
var xor = baseRest_default(function(arrays) {
  return baseXor_default(arrayFilter_default(arrays, isArrayLikeObject_default));
});
var xor_default = xor;

// ../../../../Project/100ls-native/node_modules/lodash-es/xorBy.js
var xorBy = baseRest_default(function(arrays) {
  var iteratee2 = last_default(arrays);
  if (isArrayLikeObject_default(iteratee2)) {
    iteratee2 = void 0;
  }
  return baseXor_default(arrayFilter_default(arrays, isArrayLikeObject_default), baseIteratee_default(iteratee2, 2));
});
var xorBy_default = xorBy;

// ../../../../Project/100ls-native/node_modules/lodash-es/xorWith.js
var xorWith = baseRest_default(function(arrays) {
  var comparator = last_default(arrays);
  comparator = typeof comparator == "function" ? comparator : void 0;
  return baseXor_default(arrayFilter_default(arrays, isArrayLikeObject_default), void 0, comparator);
});
var xorWith_default = xorWith;

// ../../../../Project/100ls-native/node_modules/lodash-es/zip.js
var zip = baseRest_default(unzip_default);
var zip_default = zip;

// ../../../../Project/100ls-native/node_modules/lodash-es/_baseZipObject.js
function baseZipObject(props, values2, assignFunc) {
  var index2 = -1, length = props.length, valsLength = values2.length, result2 = {};
  while (++index2 < length) {
    var value = index2 < valsLength ? values2[index2] : void 0;
    assignFunc(result2, props[index2], value);
  }
  return result2;
}
var baseZipObject_default = baseZipObject;

// ../../../../Project/100ls-native/node_modules/lodash-es/zipObject.js
function zipObject(props, values2) {
  return baseZipObject_default(props || [], values2 || [], assignValue_default);
}
var zipObject_default = zipObject;

// ../../../../Project/100ls-native/node_modules/lodash-es/zipObjectDeep.js
function zipObjectDeep(props, values2) {
  return baseZipObject_default(props || [], values2 || [], baseSet_default);
}
var zipObjectDeep_default = zipObjectDeep;

// ../../../../Project/100ls-native/node_modules/lodash-es/zipWith.js
var zipWith = baseRest_default(function(arrays) {
  var length = arrays.length, iteratee2 = length > 1 ? arrays[length - 1] : void 0;
  iteratee2 = typeof iteratee2 == "function" ? (arrays.pop(), iteratee2) : void 0;
  return unzipWith_default(arrays, iteratee2);
});
var zipWith_default = zipWith;

// ../../../../Project/100ls-native/node_modules/lodash-es/array.default.js
var array_default_default = {
  chunk: chunk_default,
  compact: compact_default,
  concat: concat_default,
  difference: difference_default,
  differenceBy: differenceBy_default,
  differenceWith: differenceWith_default,
  drop: drop_default,
  dropRight: dropRight_default,
  dropRightWhile: dropRightWhile_default,
  dropWhile: dropWhile_default,
  fill: fill_default,
  findIndex: findIndex_default,
  findLastIndex: findLastIndex_default,
  first: head_default,
  flatten: flatten_default,
  flattenDeep: flattenDeep_default,
  flattenDepth: flattenDepth_default,
  fromPairs: fromPairs_default,
  head: head_default,
  indexOf: indexOf_default,
  initial: initial_default,
  intersection: intersection_default,
  intersectionBy: intersectionBy_default,
  intersectionWith: intersectionWith_default,
  join: join_default,
  last: last_default,
  lastIndexOf: lastIndexOf_default,
  nth: nth_default,
  pull: pull_default,
  pullAll: pullAll_default,
  pullAllBy: pullAllBy_default,
  pullAllWith: pullAllWith_default,
  pullAt: pullAt_default,
  remove: remove_default,
  reverse: reverse_default,
  slice: slice_default,
  sortedIndex: sortedIndex_default,
  sortedIndexBy: sortedIndexBy_default,
  sortedIndexOf: sortedIndexOf_default,
  sortedLastIndex: sortedLastIndex_default,
  sortedLastIndexBy: sortedLastIndexBy_default,
  sortedLastIndexOf: sortedLastIndexOf_default,
  sortedUniq: sortedUniq_default,
  sortedUniqBy: sortedUniqBy_default,
  tail: tail_default,
  take: take_default,
  takeRight: takeRight_default,
  takeRightWhile: takeRightWhile_default,
  takeWhile: takeWhile_default,
  union: union_default,
  unionBy: unionBy_default,
  unionWith: unionWith_default,
  uniq: uniq_default,
  uniqBy: uniqBy_default,
  uniqWith: uniqWith_default,
  unzip: unzip_default,
  unzipWith: unzipWith_default,
  without: without_default,
  xor: xor_default,
  xorBy: xorBy_default,
  xorWith: xorWith_default,
  zip: zip_default,
  zipObject: zipObject_default,
  zipObjectDeep: zipObjectDeep_default,
  zipWith: zipWith_default
};

// ../../../../Project/100ls-native/node_modules/lodash-es/collection.default.js
var collection_default_default = {
  countBy: countBy_default,
  each: forEach_default,
  eachRight: forEachRight_default,
  every: every_default,
  filter: filter_default,
  find: find_default,
  findLast: findLast_default,
  flatMap: flatMap_default,
  flatMapDeep: flatMapDeep_default,
  flatMapDepth: flatMapDepth_default,
  forEach: forEach_default,
  forEachRight: forEachRight_default,
  groupBy: groupBy_default,
  includes: includes_default,
  invokeMap: invokeMap_default,
  keyBy: keyBy_default,
  map: map_default,
  orderBy: orderBy_default,
  partition: partition_default,
  reduce: reduce_default,
  reduceRight: reduceRight_default,
  reject: reject_default,
  sample: sample_default,
  sampleSize: sampleSize_default,
  shuffle: shuffle_default,
  size: size_default,
  some: some_default,
  sortBy: sortBy_default
};

// ../../../../Project/100ls-native/node_modules/lodash-es/date.default.js
var date_default_default = {
  now: now_default
};

// ../../../../Project/100ls-native/node_modules/lodash-es/function.default.js
var function_default_default = {
  after: after_default,
  ary: ary_default,
  before: before_default,
  bind: bind_default,
  bindKey: bindKey_default,
  curry: curry_default,
  curryRight: curryRight_default,
  debounce: debounce_default,
  defer: defer_default,
  delay: delay_default,
  flip: flip_default,
  memoize: memoize_default,
  negate: negate_default,
  once: once_default,
  overArgs: overArgs_default,
  partial: partial_default,
  partialRight: partialRight_default,
  rearg: rearg_default,
  rest: rest_default,
  spread: spread_default,
  throttle: throttle_default,
  unary: unary_default,
  wrap: wrap_default
};

// ../../../../Project/100ls-native/node_modules/lodash-es/lang.default.js
var lang_default_default = {
  castArray: castArray_default,
  clone: clone_default,
  cloneDeep: cloneDeep_default,
  cloneDeepWith: cloneDeepWith_default,
  cloneWith: cloneWith_default,
  conformsTo: conformsTo_default,
  eq: eq_default,
  gt: gt_default,
  gte: gte_default,
  isArguments: isArguments_default,
  isArray: isArray_default,
  isArrayBuffer: isArrayBuffer_default,
  isArrayLike: isArrayLike_default,
  isArrayLikeObject: isArrayLikeObject_default,
  isBoolean: isBoolean_default,
  isBuffer: isBuffer_default,
  isDate: isDate_default,
  isElement: isElement_default,
  isEmpty: isEmpty_default,
  isEqual: isEqual_default,
  isEqualWith: isEqualWith_default,
  isError: isError_default,
  isFinite: isFinite_default,
  isFunction: isFunction_default,
  isInteger: isInteger_default,
  isLength: isLength_default,
  isMap: isMap_default,
  isMatch: isMatch_default,
  isMatchWith: isMatchWith_default,
  isNaN: isNaN_default,
  isNative: isNative_default,
  isNil: isNil_default,
  isNull: isNull_default,
  isNumber: isNumber_default,
  isObject: isObject_default,
  isObjectLike: isObjectLike_default,
  isPlainObject: isPlainObject_default,
  isRegExp: isRegExp_default,
  isSafeInteger: isSafeInteger_default,
  isSet: isSet_default,
  isString: isString_default,
  isSymbol: isSymbol_default,
  isTypedArray: isTypedArray_default,
  isUndefined: isUndefined_default,
  isWeakMap: isWeakMap_default,
  isWeakSet: isWeakSet_default,
  lt: lt_default,
  lte: lte_default,
  toArray: toArray_default,
  toFinite: toFinite_default,
  toInteger: toInteger_default,
  toLength: toLength_default,
  toNumber: toNumber_default,
  toPlainObject: toPlainObject_default,
  toSafeInteger: toSafeInteger_default,
  toString: toString_default
};

// ../../../../Project/100ls-native/node_modules/lodash-es/math.default.js
var math_default_default = {
  add: add_default,
  ceil: ceil_default,
  divide: divide_default,
  floor: floor_default,
  max: max_default,
  maxBy: maxBy_default,
  mean: mean_default,
  meanBy: meanBy_default,
  min: min_default,
  minBy: minBy_default,
  multiply: multiply_default,
  round: round_default,
  subtract: subtract_default,
  sum: sum_default,
  sumBy: sumBy_default
};

// ../../../../Project/100ls-native/node_modules/lodash-es/number.default.js
var number_default_default = {
  clamp: clamp_default,
  inRange: inRange_default,
  random: random_default
};

// ../../../../Project/100ls-native/node_modules/lodash-es/object.default.js
var object_default_default = {
  assign: assign_default,
  assignIn: assignIn_default,
  assignInWith: assignInWith_default,
  assignWith: assignWith_default,
  at: at_default,
  create: create_default,
  defaults: defaults_default,
  defaultsDeep: defaultsDeep_default,
  entries: toPairs_default,
  entriesIn: toPairsIn_default,
  extend: assignIn_default,
  extendWith: assignInWith_default,
  findKey: findKey_default,
  findLastKey: findLastKey_default,
  forIn: forIn_default,
  forInRight: forInRight_default,
  forOwn: forOwn_default,
  forOwnRight: forOwnRight_default,
  functions: functions_default,
  functionsIn: functionsIn_default,
  get: get_default,
  has: has_default,
  hasIn: hasIn_default,
  invert: invert_default,
  invertBy: invertBy_default,
  invoke: invoke_default,
  keys: keys_default,
  keysIn: keysIn_default,
  mapKeys: mapKeys_default,
  mapValues: mapValues_default,
  merge: merge_default,
  mergeWith: mergeWith_default,
  omit: omit_default,
  omitBy: omitBy_default,
  pick: pick_default,
  pickBy: pickBy_default,
  result: result_default,
  set: set_default,
  setWith: setWith_default,
  toPairs: toPairs_default,
  toPairsIn: toPairsIn_default,
  transform: transform_default,
  unset: unset_default,
  update: update_default,
  updateWith: updateWith_default,
  values: values_default,
  valuesIn: valuesIn_default
};

// ../../../../Project/100ls-native/node_modules/lodash-es/seq.default.js
var seq_default_default = {
  at: wrapperAt_default,
  chain: chain_default,
  commit: commit_default,
  lodash: wrapperLodash_default,
  next: next_default,
  plant: plant_default,
  reverse: wrapperReverse_default,
  tap: tap_default,
  thru: thru_default,
  toIterator: toIterator_default,
  toJSON: wrapperValue_default,
  value: wrapperValue_default,
  valueOf: wrapperValue_default,
  wrapperChain: wrapperChain_default
};

// ../../../../Project/100ls-native/node_modules/lodash-es/string.default.js
var string_default_default = {
  camelCase: camelCase_default,
  capitalize: capitalize_default,
  deburr: deburr_default,
  endsWith: endsWith_default,
  escape: escape_default,
  escapeRegExp: escapeRegExp_default,
  kebabCase: kebabCase_default,
  lowerCase: lowerCase_default,
  lowerFirst: lowerFirst_default,
  pad: pad_default,
  padEnd: padEnd_default,
  padStart: padStart_default,
  parseInt: parseInt_default,
  repeat: repeat_default,
  replace: replace_default,
  snakeCase: snakeCase_default,
  split: split_default,
  startCase: startCase_default,
  startsWith: startsWith_default,
  template: template_default,
  templateSettings: templateSettings_default,
  toLower: toLower_default,
  toUpper: toUpper_default,
  trim: trim_default,
  trimEnd: trimEnd_default,
  trimStart: trimStart_default,
  truncate: truncate_default,
  unescape: unescape_default,
  upperCase: upperCase_default,
  upperFirst: upperFirst_default,
  words: words_default
};

// ../../../../Project/100ls-native/node_modules/lodash-es/util.default.js
var util_default_default = {
  attempt: attempt_default,
  bindAll: bindAll_default,
  cond: cond_default,
  conforms: conforms_default,
  constant: constant_default,
  defaultTo: defaultTo_default,
  flow: flow_default,
  flowRight: flowRight_default,
  identity: identity_default,
  iteratee: iteratee_default,
  matches: matches_default,
  matchesProperty: matchesProperty_default,
  method: method_default,
  methodOf: methodOf_default,
  mixin: mixin_default,
  noop: noop_default,
  nthArg: nthArg_default,
  over: over_default,
  overEvery: overEvery_default,
  overSome: overSome_default,
  property: property_default,
  propertyOf: propertyOf_default,
  range: range_default,
  rangeRight: rangeRight_default,
  stubArray: stubArray_default,
  stubFalse: stubFalse_default,
  stubObject: stubObject_default,
  stubString: stubString_default,
  stubTrue: stubTrue_default,
  times: times_default,
  toPath: toPath_default,
  uniqueId: uniqueId_default
};

// ../../../../Project/100ls-native/node_modules/lodash-es/_lazyClone.js
function lazyClone() {
  var result2 = new LazyWrapper_default(this.__wrapped__);
  result2.__actions__ = copyArray_default(this.__actions__);
  result2.__dir__ = this.__dir__;
  result2.__filtered__ = this.__filtered__;
  result2.__iteratees__ = copyArray_default(this.__iteratees__);
  result2.__takeCount__ = this.__takeCount__;
  result2.__views__ = copyArray_default(this.__views__);
  return result2;
}
var lazyClone_default = lazyClone;

// ../../../../Project/100ls-native/node_modules/lodash-es/_lazyReverse.js
function lazyReverse() {
  if (this.__filtered__) {
    var result2 = new LazyWrapper_default(this);
    result2.__dir__ = -1;
    result2.__filtered__ = true;
  } else {
    result2 = this.clone();
    result2.__dir__ *= -1;
  }
  return result2;
}
var lazyReverse_default = lazyReverse;

// ../../../../Project/100ls-native/node_modules/lodash-es/_getView.js
var nativeMax16 = Math.max;
var nativeMin13 = Math.min;
function getView(start, end, transforms) {
  var index2 = -1, length = transforms.length;
  while (++index2 < length) {
    var data = transforms[index2], size2 = data.size;
    switch (data.type) {
      case "drop":
        start += size2;
        break;
      case "dropRight":
        end -= size2;
        break;
      case "take":
        end = nativeMin13(end, start + size2);
        break;
      case "takeRight":
        start = nativeMax16(start, end - size2);
        break;
    }
  }
  return { "start": start, "end": end };
}
var getView_default = getView;

// ../../../../Project/100ls-native/node_modules/lodash-es/_lazyValue.js
var LAZY_FILTER_FLAG = 1;
var LAZY_MAP_FLAG = 2;
var nativeMin14 = Math.min;
function lazyValue() {
  var array = this.__wrapped__.value(), dir = this.__dir__, isArr = isArray_default(array), isRight = dir < 0, arrLength = isArr ? array.length : 0, view = getView_default(0, arrLength, this.__views__), start = view.start, end = view.end, length = end - start, index2 = isRight ? end : start - 1, iteratees = this.__iteratees__, iterLength = iteratees.length, resIndex = 0, takeCount = nativeMin14(length, this.__takeCount__);
  if (!isArr || !isRight && arrLength == length && takeCount == length) {
    return baseWrapperValue_default(array, this.__actions__);
  }
  var result2 = [];
  outer:
    while (length-- && resIndex < takeCount) {
      index2 += dir;
      var iterIndex = -1, value = array[index2];
      while (++iterIndex < iterLength) {
        var data = iteratees[iterIndex], iteratee2 = data.iteratee, type = data.type, computed17 = iteratee2(value);
        if (type == LAZY_MAP_FLAG) {
          value = computed17;
        } else if (!computed17) {
          if (type == LAZY_FILTER_FLAG) {
            continue outer;
          } else {
            break outer;
          }
        }
      }
      result2[resIndex++] = value;
    }
  return result2;
}
var lazyValue_default = lazyValue;

// ../../../../Project/100ls-native/node_modules/lodash-es/lodash.default.js
var VERSION = "4.17.21";
var WRAP_BIND_KEY_FLAG7 = 2;
var LAZY_FILTER_FLAG2 = 1;
var LAZY_WHILE_FLAG = 3;
var MAX_ARRAY_LENGTH7 = 4294967295;
var arrayProto6 = Array.prototype;
var objectProto29 = Object.prototype;
var hasOwnProperty25 = objectProto29.hasOwnProperty;
var symIterator2 = Symbol_default ? Symbol_default.iterator : void 0;
var nativeMax17 = Math.max;
var nativeMin15 = Math.min;
var mixin2 = /* @__PURE__ */ function(func) {
  return function(object, source, options) {
    if (options == null) {
      var isObj = isObject_default(source), props = isObj && keys_default(source), methodNames = props && props.length && baseFunctions_default(source, props);
      if (!(methodNames ? methodNames.length : isObj)) {
        options = source;
        source = object;
        object = this;
      }
    }
    return func(object, source, options);
  };
}(mixin_default);
wrapperLodash_default.after = function_default_default.after;
wrapperLodash_default.ary = function_default_default.ary;
wrapperLodash_default.assign = object_default_default.assign;
wrapperLodash_default.assignIn = object_default_default.assignIn;
wrapperLodash_default.assignInWith = object_default_default.assignInWith;
wrapperLodash_default.assignWith = object_default_default.assignWith;
wrapperLodash_default.at = object_default_default.at;
wrapperLodash_default.before = function_default_default.before;
wrapperLodash_default.bind = function_default_default.bind;
wrapperLodash_default.bindAll = util_default_default.bindAll;
wrapperLodash_default.bindKey = function_default_default.bindKey;
wrapperLodash_default.castArray = lang_default_default.castArray;
wrapperLodash_default.chain = seq_default_default.chain;
wrapperLodash_default.chunk = array_default_default.chunk;
wrapperLodash_default.compact = array_default_default.compact;
wrapperLodash_default.concat = array_default_default.concat;
wrapperLodash_default.cond = util_default_default.cond;
wrapperLodash_default.conforms = util_default_default.conforms;
wrapperLodash_default.constant = util_default_default.constant;
wrapperLodash_default.countBy = collection_default_default.countBy;
wrapperLodash_default.create = object_default_default.create;
wrapperLodash_default.curry = function_default_default.curry;
wrapperLodash_default.curryRight = function_default_default.curryRight;
wrapperLodash_default.debounce = function_default_default.debounce;
wrapperLodash_default.defaults = object_default_default.defaults;
wrapperLodash_default.defaultsDeep = object_default_default.defaultsDeep;
wrapperLodash_default.defer = function_default_default.defer;
wrapperLodash_default.delay = function_default_default.delay;
wrapperLodash_default.difference = array_default_default.difference;
wrapperLodash_default.differenceBy = array_default_default.differenceBy;
wrapperLodash_default.differenceWith = array_default_default.differenceWith;
wrapperLodash_default.drop = array_default_default.drop;
wrapperLodash_default.dropRight = array_default_default.dropRight;
wrapperLodash_default.dropRightWhile = array_default_default.dropRightWhile;
wrapperLodash_default.dropWhile = array_default_default.dropWhile;
wrapperLodash_default.fill = array_default_default.fill;
wrapperLodash_default.filter = collection_default_default.filter;
wrapperLodash_default.flatMap = collection_default_default.flatMap;
wrapperLodash_default.flatMapDeep = collection_default_default.flatMapDeep;
wrapperLodash_default.flatMapDepth = collection_default_default.flatMapDepth;
wrapperLodash_default.flatten = array_default_default.flatten;
wrapperLodash_default.flattenDeep = array_default_default.flattenDeep;
wrapperLodash_default.flattenDepth = array_default_default.flattenDepth;
wrapperLodash_default.flip = function_default_default.flip;
wrapperLodash_default.flow = util_default_default.flow;
wrapperLodash_default.flowRight = util_default_default.flowRight;
wrapperLodash_default.fromPairs = array_default_default.fromPairs;
wrapperLodash_default.functions = object_default_default.functions;
wrapperLodash_default.functionsIn = object_default_default.functionsIn;
wrapperLodash_default.groupBy = collection_default_default.groupBy;
wrapperLodash_default.initial = array_default_default.initial;
wrapperLodash_default.intersection = array_default_default.intersection;
wrapperLodash_default.intersectionBy = array_default_default.intersectionBy;
wrapperLodash_default.intersectionWith = array_default_default.intersectionWith;
wrapperLodash_default.invert = object_default_default.invert;
wrapperLodash_default.invertBy = object_default_default.invertBy;
wrapperLodash_default.invokeMap = collection_default_default.invokeMap;
wrapperLodash_default.iteratee = util_default_default.iteratee;
wrapperLodash_default.keyBy = collection_default_default.keyBy;
wrapperLodash_default.keys = keys_default;
wrapperLodash_default.keysIn = object_default_default.keysIn;
wrapperLodash_default.map = collection_default_default.map;
wrapperLodash_default.mapKeys = object_default_default.mapKeys;
wrapperLodash_default.mapValues = object_default_default.mapValues;
wrapperLodash_default.matches = util_default_default.matches;
wrapperLodash_default.matchesProperty = util_default_default.matchesProperty;
wrapperLodash_default.memoize = function_default_default.memoize;
wrapperLodash_default.merge = object_default_default.merge;
wrapperLodash_default.mergeWith = object_default_default.mergeWith;
wrapperLodash_default.method = util_default_default.method;
wrapperLodash_default.methodOf = util_default_default.methodOf;
wrapperLodash_default.mixin = mixin2;
wrapperLodash_default.negate = negate_default;
wrapperLodash_default.nthArg = util_default_default.nthArg;
wrapperLodash_default.omit = object_default_default.omit;
wrapperLodash_default.omitBy = object_default_default.omitBy;
wrapperLodash_default.once = function_default_default.once;
wrapperLodash_default.orderBy = collection_default_default.orderBy;
wrapperLodash_default.over = util_default_default.over;
wrapperLodash_default.overArgs = function_default_default.overArgs;
wrapperLodash_default.overEvery = util_default_default.overEvery;
wrapperLodash_default.overSome = util_default_default.overSome;
wrapperLodash_default.partial = function_default_default.partial;
wrapperLodash_default.partialRight = function_default_default.partialRight;
wrapperLodash_default.partition = collection_default_default.partition;
wrapperLodash_default.pick = object_default_default.pick;
wrapperLodash_default.pickBy = object_default_default.pickBy;
wrapperLodash_default.property = util_default_default.property;
wrapperLodash_default.propertyOf = util_default_default.propertyOf;
wrapperLodash_default.pull = array_default_default.pull;
wrapperLodash_default.pullAll = array_default_default.pullAll;
wrapperLodash_default.pullAllBy = array_default_default.pullAllBy;
wrapperLodash_default.pullAllWith = array_default_default.pullAllWith;
wrapperLodash_default.pullAt = array_default_default.pullAt;
wrapperLodash_default.range = util_default_default.range;
wrapperLodash_default.rangeRight = util_default_default.rangeRight;
wrapperLodash_default.rearg = function_default_default.rearg;
wrapperLodash_default.reject = collection_default_default.reject;
wrapperLodash_default.remove = array_default_default.remove;
wrapperLodash_default.rest = function_default_default.rest;
wrapperLodash_default.reverse = array_default_default.reverse;
wrapperLodash_default.sampleSize = collection_default_default.sampleSize;
wrapperLodash_default.set = object_default_default.set;
wrapperLodash_default.setWith = object_default_default.setWith;
wrapperLodash_default.shuffle = collection_default_default.shuffle;
wrapperLodash_default.slice = array_default_default.slice;
wrapperLodash_default.sortBy = collection_default_default.sortBy;
wrapperLodash_default.sortedUniq = array_default_default.sortedUniq;
wrapperLodash_default.sortedUniqBy = array_default_default.sortedUniqBy;
wrapperLodash_default.split = string_default_default.split;
wrapperLodash_default.spread = function_default_default.spread;
wrapperLodash_default.tail = array_default_default.tail;
wrapperLodash_default.take = array_default_default.take;
wrapperLodash_default.takeRight = array_default_default.takeRight;
wrapperLodash_default.takeRightWhile = array_default_default.takeRightWhile;
wrapperLodash_default.takeWhile = array_default_default.takeWhile;
wrapperLodash_default.tap = seq_default_default.tap;
wrapperLodash_default.throttle = function_default_default.throttle;
wrapperLodash_default.thru = thru_default;
wrapperLodash_default.toArray = lang_default_default.toArray;
wrapperLodash_default.toPairs = object_default_default.toPairs;
wrapperLodash_default.toPairsIn = object_default_default.toPairsIn;
wrapperLodash_default.toPath = util_default_default.toPath;
wrapperLodash_default.toPlainObject = lang_default_default.toPlainObject;
wrapperLodash_default.transform = object_default_default.transform;
wrapperLodash_default.unary = function_default_default.unary;
wrapperLodash_default.union = array_default_default.union;
wrapperLodash_default.unionBy = array_default_default.unionBy;
wrapperLodash_default.unionWith = array_default_default.unionWith;
wrapperLodash_default.uniq = array_default_default.uniq;
wrapperLodash_default.uniqBy = array_default_default.uniqBy;
wrapperLodash_default.uniqWith = array_default_default.uniqWith;
wrapperLodash_default.unset = object_default_default.unset;
wrapperLodash_default.unzip = array_default_default.unzip;
wrapperLodash_default.unzipWith = array_default_default.unzipWith;
wrapperLodash_default.update = object_default_default.update;
wrapperLodash_default.updateWith = object_default_default.updateWith;
wrapperLodash_default.values = object_default_default.values;
wrapperLodash_default.valuesIn = object_default_default.valuesIn;
wrapperLodash_default.without = array_default_default.without;
wrapperLodash_default.words = string_default_default.words;
wrapperLodash_default.wrap = function_default_default.wrap;
wrapperLodash_default.xor = array_default_default.xor;
wrapperLodash_default.xorBy = array_default_default.xorBy;
wrapperLodash_default.xorWith = array_default_default.xorWith;
wrapperLodash_default.zip = array_default_default.zip;
wrapperLodash_default.zipObject = array_default_default.zipObject;
wrapperLodash_default.zipObjectDeep = array_default_default.zipObjectDeep;
wrapperLodash_default.zipWith = array_default_default.zipWith;
wrapperLodash_default.entries = object_default_default.toPairs;
wrapperLodash_default.entriesIn = object_default_default.toPairsIn;
wrapperLodash_default.extend = object_default_default.assignIn;
wrapperLodash_default.extendWith = object_default_default.assignInWith;
mixin2(wrapperLodash_default, wrapperLodash_default);
wrapperLodash_default.add = math_default_default.add;
wrapperLodash_default.attempt = util_default_default.attempt;
wrapperLodash_default.camelCase = string_default_default.camelCase;
wrapperLodash_default.capitalize = string_default_default.capitalize;
wrapperLodash_default.ceil = math_default_default.ceil;
wrapperLodash_default.clamp = number_default_default.clamp;
wrapperLodash_default.clone = lang_default_default.clone;
wrapperLodash_default.cloneDeep = lang_default_default.cloneDeep;
wrapperLodash_default.cloneDeepWith = lang_default_default.cloneDeepWith;
wrapperLodash_default.cloneWith = lang_default_default.cloneWith;
wrapperLodash_default.conformsTo = lang_default_default.conformsTo;
wrapperLodash_default.deburr = string_default_default.deburr;
wrapperLodash_default.defaultTo = util_default_default.defaultTo;
wrapperLodash_default.divide = math_default_default.divide;
wrapperLodash_default.endsWith = string_default_default.endsWith;
wrapperLodash_default.eq = lang_default_default.eq;
wrapperLodash_default.escape = string_default_default.escape;
wrapperLodash_default.escapeRegExp = string_default_default.escapeRegExp;
wrapperLodash_default.every = collection_default_default.every;
wrapperLodash_default.find = collection_default_default.find;
wrapperLodash_default.findIndex = array_default_default.findIndex;
wrapperLodash_default.findKey = object_default_default.findKey;
wrapperLodash_default.findLast = collection_default_default.findLast;
wrapperLodash_default.findLastIndex = array_default_default.findLastIndex;
wrapperLodash_default.findLastKey = object_default_default.findLastKey;
wrapperLodash_default.floor = math_default_default.floor;
wrapperLodash_default.forEach = collection_default_default.forEach;
wrapperLodash_default.forEachRight = collection_default_default.forEachRight;
wrapperLodash_default.forIn = object_default_default.forIn;
wrapperLodash_default.forInRight = object_default_default.forInRight;
wrapperLodash_default.forOwn = object_default_default.forOwn;
wrapperLodash_default.forOwnRight = object_default_default.forOwnRight;
wrapperLodash_default.get = object_default_default.get;
wrapperLodash_default.gt = lang_default_default.gt;
wrapperLodash_default.gte = lang_default_default.gte;
wrapperLodash_default.has = object_default_default.has;
wrapperLodash_default.hasIn = object_default_default.hasIn;
wrapperLodash_default.head = array_default_default.head;
wrapperLodash_default.identity = identity_default;
wrapperLodash_default.includes = collection_default_default.includes;
wrapperLodash_default.indexOf = array_default_default.indexOf;
wrapperLodash_default.inRange = number_default_default.inRange;
wrapperLodash_default.invoke = object_default_default.invoke;
wrapperLodash_default.isArguments = lang_default_default.isArguments;
wrapperLodash_default.isArray = isArray_default;
wrapperLodash_default.isArrayBuffer = lang_default_default.isArrayBuffer;
wrapperLodash_default.isArrayLike = lang_default_default.isArrayLike;
wrapperLodash_default.isArrayLikeObject = lang_default_default.isArrayLikeObject;
wrapperLodash_default.isBoolean = lang_default_default.isBoolean;
wrapperLodash_default.isBuffer = lang_default_default.isBuffer;
wrapperLodash_default.isDate = lang_default_default.isDate;
wrapperLodash_default.isElement = lang_default_default.isElement;
wrapperLodash_default.isEmpty = lang_default_default.isEmpty;
wrapperLodash_default.isEqual = lang_default_default.isEqual;
wrapperLodash_default.isEqualWith = lang_default_default.isEqualWith;
wrapperLodash_default.isError = lang_default_default.isError;
wrapperLodash_default.isFinite = lang_default_default.isFinite;
wrapperLodash_default.isFunction = lang_default_default.isFunction;
wrapperLodash_default.isInteger = lang_default_default.isInteger;
wrapperLodash_default.isLength = lang_default_default.isLength;
wrapperLodash_default.isMap = lang_default_default.isMap;
wrapperLodash_default.isMatch = lang_default_default.isMatch;
wrapperLodash_default.isMatchWith = lang_default_default.isMatchWith;
wrapperLodash_default.isNaN = lang_default_default.isNaN;
wrapperLodash_default.isNative = lang_default_default.isNative;
wrapperLodash_default.isNil = lang_default_default.isNil;
wrapperLodash_default.isNull = lang_default_default.isNull;
wrapperLodash_default.isNumber = lang_default_default.isNumber;
wrapperLodash_default.isObject = isObject_default;
wrapperLodash_default.isObjectLike = lang_default_default.isObjectLike;
wrapperLodash_default.isPlainObject = lang_default_default.isPlainObject;
wrapperLodash_default.isRegExp = lang_default_default.isRegExp;
wrapperLodash_default.isSafeInteger = lang_default_default.isSafeInteger;
wrapperLodash_default.isSet = lang_default_default.isSet;
wrapperLodash_default.isString = lang_default_default.isString;
wrapperLodash_default.isSymbol = lang_default_default.isSymbol;
wrapperLodash_default.isTypedArray = lang_default_default.isTypedArray;
wrapperLodash_default.isUndefined = lang_default_default.isUndefined;
wrapperLodash_default.isWeakMap = lang_default_default.isWeakMap;
wrapperLodash_default.isWeakSet = lang_default_default.isWeakSet;
wrapperLodash_default.join = array_default_default.join;
wrapperLodash_default.kebabCase = string_default_default.kebabCase;
wrapperLodash_default.last = last_default;
wrapperLodash_default.lastIndexOf = array_default_default.lastIndexOf;
wrapperLodash_default.lowerCase = string_default_default.lowerCase;
wrapperLodash_default.lowerFirst = string_default_default.lowerFirst;
wrapperLodash_default.lt = lang_default_default.lt;
wrapperLodash_default.lte = lang_default_default.lte;
wrapperLodash_default.max = math_default_default.max;
wrapperLodash_default.maxBy = math_default_default.maxBy;
wrapperLodash_default.mean = math_default_default.mean;
wrapperLodash_default.meanBy = math_default_default.meanBy;
wrapperLodash_default.min = math_default_default.min;
wrapperLodash_default.minBy = math_default_default.minBy;
wrapperLodash_default.stubArray = util_default_default.stubArray;
wrapperLodash_default.stubFalse = util_default_default.stubFalse;
wrapperLodash_default.stubObject = util_default_default.stubObject;
wrapperLodash_default.stubString = util_default_default.stubString;
wrapperLodash_default.stubTrue = util_default_default.stubTrue;
wrapperLodash_default.multiply = math_default_default.multiply;
wrapperLodash_default.nth = array_default_default.nth;
wrapperLodash_default.noop = util_default_default.noop;
wrapperLodash_default.now = date_default_default.now;
wrapperLodash_default.pad = string_default_default.pad;
wrapperLodash_default.padEnd = string_default_default.padEnd;
wrapperLodash_default.padStart = string_default_default.padStart;
wrapperLodash_default.parseInt = string_default_default.parseInt;
wrapperLodash_default.random = number_default_default.random;
wrapperLodash_default.reduce = collection_default_default.reduce;
wrapperLodash_default.reduceRight = collection_default_default.reduceRight;
wrapperLodash_default.repeat = string_default_default.repeat;
wrapperLodash_default.replace = string_default_default.replace;
wrapperLodash_default.result = object_default_default.result;
wrapperLodash_default.round = math_default_default.round;
wrapperLodash_default.sample = collection_default_default.sample;
wrapperLodash_default.size = collection_default_default.size;
wrapperLodash_default.snakeCase = string_default_default.snakeCase;
wrapperLodash_default.some = collection_default_default.some;
wrapperLodash_default.sortedIndex = array_default_default.sortedIndex;
wrapperLodash_default.sortedIndexBy = array_default_default.sortedIndexBy;
wrapperLodash_default.sortedIndexOf = array_default_default.sortedIndexOf;
wrapperLodash_default.sortedLastIndex = array_default_default.sortedLastIndex;
wrapperLodash_default.sortedLastIndexBy = array_default_default.sortedLastIndexBy;
wrapperLodash_default.sortedLastIndexOf = array_default_default.sortedLastIndexOf;
wrapperLodash_default.startCase = string_default_default.startCase;
wrapperLodash_default.startsWith = string_default_default.startsWith;
wrapperLodash_default.subtract = math_default_default.subtract;
wrapperLodash_default.sum = math_default_default.sum;
wrapperLodash_default.sumBy = math_default_default.sumBy;
wrapperLodash_default.template = string_default_default.template;
wrapperLodash_default.times = util_default_default.times;
wrapperLodash_default.toFinite = lang_default_default.toFinite;
wrapperLodash_default.toInteger = toInteger_default;
wrapperLodash_default.toLength = lang_default_default.toLength;
wrapperLodash_default.toLower = string_default_default.toLower;
wrapperLodash_default.toNumber = lang_default_default.toNumber;
wrapperLodash_default.toSafeInteger = lang_default_default.toSafeInteger;
wrapperLodash_default.toString = lang_default_default.toString;
wrapperLodash_default.toUpper = string_default_default.toUpper;
wrapperLodash_default.trim = string_default_default.trim;
wrapperLodash_default.trimEnd = string_default_default.trimEnd;
wrapperLodash_default.trimStart = string_default_default.trimStart;
wrapperLodash_default.truncate = string_default_default.truncate;
wrapperLodash_default.unescape = string_default_default.unescape;
wrapperLodash_default.uniqueId = util_default_default.uniqueId;
wrapperLodash_default.upperCase = string_default_default.upperCase;
wrapperLodash_default.upperFirst = string_default_default.upperFirst;
wrapperLodash_default.each = collection_default_default.forEach;
wrapperLodash_default.eachRight = collection_default_default.forEachRight;
wrapperLodash_default.first = array_default_default.head;
mixin2(wrapperLodash_default, function() {
  var source = {};
  baseForOwn_default(wrapperLodash_default, function(func, methodName) {
    if (!hasOwnProperty25.call(wrapperLodash_default.prototype, methodName)) {
      source[methodName] = func;
    }
  });
  return source;
}(), { "chain": false });
wrapperLodash_default.VERSION = VERSION;
(wrapperLodash_default.templateSettings = string_default_default.templateSettings).imports._ = wrapperLodash_default;
arrayEach_default(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(methodName) {
  wrapperLodash_default[methodName].placeholder = wrapperLodash_default;
});
arrayEach_default(["drop", "take"], function(methodName, index2) {
  LazyWrapper_default.prototype[methodName] = function(n) {
    n = n === void 0 ? 1 : nativeMax17(toInteger_default(n), 0);
    var result2 = this.__filtered__ && !index2 ? new LazyWrapper_default(this) : this.clone();
    if (result2.__filtered__) {
      result2.__takeCount__ = nativeMin15(n, result2.__takeCount__);
    } else {
      result2.__views__.push({
        "size": nativeMin15(n, MAX_ARRAY_LENGTH7),
        "type": methodName + (result2.__dir__ < 0 ? "Right" : "")
      });
    }
    return result2;
  };
  LazyWrapper_default.prototype[methodName + "Right"] = function(n) {
    return this.reverse()[methodName](n).reverse();
  };
});
arrayEach_default(["filter", "map", "takeWhile"], function(methodName, index2) {
  var type = index2 + 1, isFilter = type == LAZY_FILTER_FLAG2 || type == LAZY_WHILE_FLAG;
  LazyWrapper_default.prototype[methodName] = function(iteratee2) {
    var result2 = this.clone();
    result2.__iteratees__.push({
      "iteratee": baseIteratee_default(iteratee2, 3),
      "type": type
    });
    result2.__filtered__ = result2.__filtered__ || isFilter;
    return result2;
  };
});
arrayEach_default(["head", "last"], function(methodName, index2) {
  var takeName = "take" + (index2 ? "Right" : "");
  LazyWrapper_default.prototype[methodName] = function() {
    return this[takeName](1).value()[0];
  };
});
arrayEach_default(["initial", "tail"], function(methodName, index2) {
  var dropName = "drop" + (index2 ? "" : "Right");
  LazyWrapper_default.prototype[methodName] = function() {
    return this.__filtered__ ? new LazyWrapper_default(this) : this[dropName](1);
  };
});
LazyWrapper_default.prototype.compact = function() {
  return this.filter(identity_default);
};
LazyWrapper_default.prototype.find = function(predicate) {
  return this.filter(predicate).head();
};
LazyWrapper_default.prototype.findLast = function(predicate) {
  return this.reverse().find(predicate);
};
LazyWrapper_default.prototype.invokeMap = baseRest_default(function(path, args) {
  if (typeof path == "function") {
    return new LazyWrapper_default(this);
  }
  return this.map(function(value) {
    return baseInvoke_default(value, path, args);
  });
});
LazyWrapper_default.prototype.reject = function(predicate) {
  return this.filter(negate_default(baseIteratee_default(predicate)));
};
LazyWrapper_default.prototype.slice = function(start, end) {
  start = toInteger_default(start);
  var result2 = this;
  if (result2.__filtered__ && (start > 0 || end < 0)) {
    return new LazyWrapper_default(result2);
  }
  if (start < 0) {
    result2 = result2.takeRight(-start);
  } else if (start) {
    result2 = result2.drop(start);
  }
  if (end !== void 0) {
    end = toInteger_default(end);
    result2 = end < 0 ? result2.dropRight(-end) : result2.take(end - start);
  }
  return result2;
};
LazyWrapper_default.prototype.takeRightWhile = function(predicate) {
  return this.reverse().takeWhile(predicate).reverse();
};
LazyWrapper_default.prototype.toArray = function() {
  return this.take(MAX_ARRAY_LENGTH7);
};
baseForOwn_default(LazyWrapper_default.prototype, function(func, methodName) {
  var checkIteratee = /^(?:filter|find|map|reject)|While$/.test(methodName), isTaker = /^(?:head|last)$/.test(methodName), lodashFunc = wrapperLodash_default[isTaker ? "take" + (methodName == "last" ? "Right" : "") : methodName], retUnwrapped = isTaker || /^find/.test(methodName);
  if (!lodashFunc) {
    return;
  }
  wrapperLodash_default.prototype[methodName] = function() {
    var value = this.__wrapped__, args = isTaker ? [1] : arguments, isLazy = value instanceof LazyWrapper_default, iteratee2 = args[0], useLazy = isLazy || isArray_default(value);
    var interceptor = function(value2) {
      var result3 = lodashFunc.apply(wrapperLodash_default, arrayPush_default([value2], args));
      return isTaker && chainAll ? result3[0] : result3;
    };
    if (useLazy && checkIteratee && typeof iteratee2 == "function" && iteratee2.length != 1) {
      isLazy = useLazy = false;
    }
    var chainAll = this.__chain__, isHybrid = !!this.__actions__.length, isUnwrapped = retUnwrapped && !chainAll, onlyLazy = isLazy && !isHybrid;
    if (!retUnwrapped && useLazy) {
      value = onlyLazy ? value : new LazyWrapper_default(this);
      var result2 = func.apply(value, args);
      result2.__actions__.push({ "func": thru_default, "args": [interceptor], "thisArg": void 0 });
      return new LodashWrapper_default(result2, chainAll);
    }
    if (isUnwrapped && onlyLazy) {
      return func.apply(this, args);
    }
    result2 = this.thru(interceptor);
    return isUnwrapped ? isTaker ? result2.value()[0] : result2.value() : result2;
  };
});
arrayEach_default(["pop", "push", "shift", "sort", "splice", "unshift"], function(methodName) {
  var func = arrayProto6[methodName], chainName = /^(?:push|sort|unshift)$/.test(methodName) ? "tap" : "thru", retUnwrapped = /^(?:pop|shift)$/.test(methodName);
  wrapperLodash_default.prototype[methodName] = function() {
    var args = arguments;
    if (retUnwrapped && !this.__chain__) {
      var value = this.value();
      return func.apply(isArray_default(value) ? value : [], args);
    }
    return this[chainName](function(value2) {
      return func.apply(isArray_default(value2) ? value2 : [], args);
    });
  };
});
baseForOwn_default(LazyWrapper_default.prototype, function(func, methodName) {
  var lodashFunc = wrapperLodash_default[methodName];
  if (lodashFunc) {
    var key = lodashFunc.name + "";
    if (!hasOwnProperty25.call(realNames_default, key)) {
      realNames_default[key] = [];
    }
    realNames_default[key].push({ "name": methodName, "func": lodashFunc });
  }
});
realNames_default[createHybrid_default(void 0, WRAP_BIND_KEY_FLAG7).name] = [{
  "name": "wrapper",
  "func": void 0
}];
LazyWrapper_default.prototype.clone = lazyClone_default;
LazyWrapper_default.prototype.reverse = lazyReverse_default;
LazyWrapper_default.prototype.value = lazyValue_default;
wrapperLodash_default.prototype.at = seq_default_default.at;
wrapperLodash_default.prototype.chain = seq_default_default.wrapperChain;
wrapperLodash_default.prototype.commit = seq_default_default.commit;
wrapperLodash_default.prototype.next = seq_default_default.next;
wrapperLodash_default.prototype.plant = seq_default_default.plant;
wrapperLodash_default.prototype.reverse = seq_default_default.reverse;
wrapperLodash_default.prototype.toJSON = wrapperLodash_default.prototype.valueOf = wrapperLodash_default.prototype.value = seq_default_default.value;
wrapperLodash_default.prototype.first = wrapperLodash_default.prototype.head;
if (symIterator2) {
  wrapperLodash_default.prototype[symIterator2] = seq_default_default.toIterator;
}

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/useRequest/plugins/useThrottlePlugin.js
var useThrottlePlugin = (fetchInstance, { throttleWait, throttleLeading, throttleTrailing }) => {
  let originThrottled = null;
  const options = computed3(() => {
    const ret = {};
    if (unref7(throttleLeading) !== void 0) {
      ret.leading = unref7(throttleLeading);
    }
    if (unref7(throttleTrailing) !== void 0) {
      ret.trailing = unref7(throttleTrailing);
    }
    return ret;
  });
  const _originRunAsync = fetchInstance.runAsync.bind(fetchInstance);
  const throttled = ref8();
  const throttleWaitComputed = computed3(() => {
    return unref7(throttleWait);
  });
  watch2([throttleWaitComputed, options], (cur) => {
    if (originThrottled) {
      originThrottled.cancel();
      fetchInstance.runAsync = _originRunAsync;
    }
    const [curWait, curOptions] = cur;
    const _throttle = throttle_default(
      (callback) => {
        callback();
      },
      unref7(curWait),
      curOptions
    );
    originThrottled = _throttle;
    throttled.value = _throttle;
    fetchInstance.runAsync = (...args) => {
      return new Promise((resolve, reject2) => {
        var _a25;
        (_a25 = throttled.value) == null ? void 0 : _a25.call(throttled, () => {
          _originRunAsync(...args).then(resolve).catch(reject2);
        });
      });
    };
  }, {
    immediate: true
  });
  if (!unref7(throttleWait)) {
    return {};
  }
  onUnmounted(() => {
    var _a25;
    (_a25 = throttled.value) == null ? void 0 : _a25.cancel();
  });
  return {
    name: "throttlePlugin",
    onCancel: () => {
      var _a25;
      (_a25 = throttled.value) == null ? void 0 : _a25.cancel();
    }
  };
};

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/useRequest/useRequestImplement.js
import { inject, ref as ref9, reactive, computed as computed4, isRef, watchEffect as watchEffect7, unref as unref8, onScopeDispose as onScopeDispose3, toRefs } from "vue";

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/useRequest/utils/index.js
var isFunction2 = (value) => typeof value === "function";
var isBoolean2 = (value) => typeof value === "boolean";

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/useRequest/Fetch.js
var __defProp3 = Object.defineProperty;
var __defNormalProp3 = (obj, key, value) => key in obj ? __defProp3(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField3 = (obj, key, value) => {
  __defNormalProp3(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var Fetch = class {
  constructor(serviceRef, options, setUpdateData, initState2 = {}) {
    __publicField3(this, "pluginImpls");
    __publicField3(this, "count", 0);
    __publicField3(this, "state", {
      loading: false,
      params: void 0,
      data: void 0,
      error: void 0
    });
    __publicField3(this, "previousValidData");
    this.serviceRef = serviceRef;
    this.options = options;
    this.setUpdateData = setUpdateData;
    this.initState = initState2;
    this.state = {
      ...this.state,
      loading: !options.manual,
      ...initState2
    };
  }
  setState(currentState = {}) {
    this.state = {
      ...this.state,
      ...currentState
    };
    this.setUpdateData(this.state);
  }
  setData(data, key) {
    console.warn("Please use 'setFetchState' instead of 'setData'");
    if (key instanceof Array) {
      key.forEach((k) => {
        this.state[k] = data;
        this.setUpdateData(data, k);
      });
    } else {
      this.state[key] = data;
      this.setUpdateData(data, key);
    }
  }
  setFetchState(data, key) {
    if (key instanceof Array) {
      key.forEach((k) => {
        this.state[k] = data;
        this.setUpdateData(data, k);
      });
    } else {
      this.state[key] = data;
      this.setUpdateData(data, key);
    }
  }
  runPluginHandler(event, ...rest2) {
    var _a25, _b25, _c;
    const r = (_c = (_b25 = (_a25 = this.pluginImpls) == null ? void 0 : _a25.map((i) => {
      var _a26;
      return (_a26 = i[event]) == null ? void 0 : _a26.call(i, ...rest2);
    })) != null ? _b25 : []) == null ? void 0 : _c.filter(Boolean);
    return Object.assign({}, ...r);
  }
  async runAsync(...params) {
    var _a25, _b25, _c, _d, _e, _f, _g, _h, _i, _j, _k;
    this.count += 1;
    const currentCount = this.count;
    const { stopNow = false, returnNow = false, ...state } = this.runPluginHandler(
      "onBefore",
      params
    );
    if (stopNow) {
      return new Promise(() => {
      });
    }
    this.setState({
      loading: true,
      params,
      ...state
    });
    if (returnNow) {
      return Promise.resolve(state.data);
    }
    try {
      (_b25 = (_a25 = this.options).onBefore) == null ? void 0 : _b25.call(_a25, params);
    } catch (error) {
      this.setState({
        error,
        loading: false
      });
      (_d = (_c = this.options).onError) == null ? void 0 : _d.call(_c, error, params);
      this.runPluginHandler("onError", error, params);
      return new Promise(() => {
      });
    }
    try {
      let { servicePromise } = this.runPluginHandler("onRequest", this.serviceRef.value, params);
      const requestReturnResponse = (res) => {
        var _a26, _b26, _c2, _d2;
        if (currentCount !== this.count) {
          return new Promise(() => {
          });
        }
        const formattedResult = this.options.formatResult ? this.options.formatResult(res) : res;
        const origin = {
          data: res
        };
        this.setState({
          data: formattedResult,
          error: void 0,
          loading: false
        });
        (_b26 = (_a26 = this.options).onSuccess) == null ? void 0 : _b26.call(_a26, formattedResult, params);
        this.runPluginHandler("onSuccess", formattedResult, params, origin);
        this.previousValidData = formattedResult;
        (_d2 = (_c2 = this.options).onFinally) == null ? void 0 : _d2.call(_c2, params, formattedResult, void 0);
        if (currentCount === this.count) {
          this.runPluginHandler("onFinally", params, formattedResult, void 0);
        }
        return formattedResult;
      };
      if (!servicePromise) {
        servicePromise = this.serviceRef.value(...params);
      }
      const servicePromiseResult = await servicePromise;
      return requestReturnResponse(servicePromiseResult);
    } catch (error) {
      if (currentCount !== this.count) {
        return new Promise(() => {
        });
      }
      this.setState({
        error,
        loading: false
      });
      (_f = (_e = this.options).onError) == null ? void 0 : _f.call(_e, error, params);
      this.runPluginHandler("onError", error, params);
      if (isFunction2((_g = this.options) == null ? void 0 : _g.rollbackOnError) && ((_h = this.options) == null ? void 0 : _h.rollbackOnError(params)) || isBoolean2((_i = this.options) == null ? void 0 : _i.rollbackOnError) && this.options.rollbackOnError) {
        this.setState({
          data: this.previousValidData
        });
      }
      (_k = (_j = this.options).onFinally) == null ? void 0 : _k.call(_j, params, void 0, error);
      if (currentCount === this.count) {
        this.runPluginHandler("onFinally", params, void 0, error);
      }
      throw error;
    }
  }
  run(...params) {
    this.runAsync(...params).catch((error) => {
      if (!this.options.onError) {
        console.error(error);
      }
    });
  }
  cancel() {
    this.count += 1;
    this.setState({
      loading: false
    });
    this.runPluginHandler("onCancel");
  }
  refresh() {
    this.run(...this.state.params || []);
  }
  refreshAsync() {
    return this.runAsync(...this.state.params || []);
  }
  mutate(data) {
    const targetData = isFunction2(data) ? data(this.state.data) : data;
    this.runPluginHandler("onMutate", targetData);
    this.setState({
      data: targetData
    });
  }
};

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/useRequest/config.js
var USEREQUEST_GLOBAL_OPTIONS_PROVIDE_KEY = Symbol(
  "USEREQUEST_GLOBAL_OPTIONS_PROVIDE_KEY"
);

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/useRequest/useRequestImplement.js
function isUseRequestFetchState(state) {
  const keys2 = Object.keys(state);
  return keys2.filter((i) => ["data", "loading", "params", "error"].includes(i)).length === 4;
}
function useRequestImplement(service, options = {}, plugins = []) {
  const USEREQUEST_GLOBAL_OPTIONS = inject(
    USEREQUEST_GLOBAL_OPTIONS_PROVIDE_KEY,
    {}
  );
  const { initialData = void 0, manual = false, ready = true, ...rest2 } = {
    ...USEREQUEST_GLOBAL_OPTIONS != null ? USEREQUEST_GLOBAL_OPTIONS : {},
    ...options != null ? options : {}
  };
  const fetchOptions = {
    manual,
    ready,
    initialData,
    ...rest2
  };
  const serviceRef = ref9(service);
  const state = reactive({
    data: initialData,
    loading: false,
    params: void 0,
    error: void 0
  });
  const setState = (currentState, field) => {
    if (field) {
      state[field] = currentState;
    } else {
      if (isUseRequestFetchState(currentState)) {
        state.data = currentState.data;
        state.loading = currentState.loading;
        state.error = currentState.error;
        state.params = currentState.params;
      }
    }
  };
  const initState2 = plugins.map((p) => {
    var _a25;
    return (_a25 = p == null ? void 0 : p.onInit) == null ? void 0 : _a25.call(p, fetchOptions);
  }).filter(Boolean);
  const fetchInstance = new Fetch(
    serviceRef,
    fetchOptions,
    setState,
    Object.assign({}, ...initState2, state)
  );
  fetchInstance.options = fetchOptions;
  fetchInstance.pluginImpls = plugins.map((p) => {
    return p(fetchInstance, fetchOptions);
  });
  const readyComputed = computed4(() => isRef(ready) ? ready.value : ready);
  watchEffect7(() => {
    if (!manual) {
      const params = fetchInstance.state.params || options.defaultParams || [];
      if (readyComputed.value && fetchInstance.options.refreshDeps === true && !!serviceRef.value) {
        fetchInstance.run(...params);
      }
    }
  });
  if (!manual && fetchInstance.options.refreshDeps !== true) {
    const params = fetchInstance.state.params || options.defaultParams || [];
    if (unref8(ready))
      fetchInstance.run(...params);
  }
  onScopeDispose3(() => {
    fetchInstance.cancel();
  });
  return {
    ...toRefs(state),
    cancel: fetchInstance.cancel.bind(fetchInstance),
    refresh: fetchInstance.refresh.bind(fetchInstance),
    refreshAsync: fetchInstance.refreshAsync.bind(fetchInstance),
    run: fetchInstance.run.bind(fetchInstance),
    runAsync: fetchInstance.runAsync.bind(fetchInstance),
    mutate: fetchInstance.mutate.bind(fetchInstance)
  };
}

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/useRequest/utils/resolve-args.js
var withArgs = (hook2, use) => {
  return function useRequestArgs(service, options = {}, plugins = []) {
    let next = hook2;
    const middleware = use || [];
    for (let i = middleware.length; i--; ) {
      next = middleware[i](next);
    }
    return next(service, options, plugins);
  };
};

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/useRequest/useRequest.js
function useRequest(service, options, plugins) {
  var _a25;
  const BuiltInPlugins = (_a25 = [
    true ? useDevtoolsPlugin : null,
    useDebouncePlugin,
    useLoadingDelayPlugin,
    usePollingPlugin,
    useRefreshOnWindowFocusPlugin,
    useThrottlePlugin,
    useAutoRunPlugin,
    useCachePlugin,
    useRetryPlugin
  ]) == null ? void 0 : _a25.filter(Boolean);
  return withArgs(useRequestImplement, options == null ? void 0 : options.use)(
    service,
    options,
    [...plugins || [], ...BuiltInPlugins]
  );
}

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/useRequest/useRequestProvider.js
import { provide } from "vue";
function useRequestProvider(config) {
  provide(USEREQUEST_GLOBAL_OPTIONS_PROVIDE_KEY, config);
}

// ../../../../Project/100ls-native/node_modules/@vue/devtools-shared/dist/index.js
var __create = Object.create;
var __defProp4 = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS2 = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp4(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM2 = (mod, isNodeMode, target2) => (target2 = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp4(target2, "default", { value: mod, enumerable: true }) : target2,
  mod
));
var init_esm_shims = __esm({
  "../../node_modules/.pnpm/tsup@8.4.0_@microsoft+api-extractor@7.51.1_@types+node@22.13.14__jiti@2.4.2_postcss@8.5_96eb05a9d65343021e53791dd83f3773/node_modules/tsup/assets/esm_shims.js"() {
    "use strict";
  }
});
var require_rfdc = __commonJS2({
  "../../node_modules/.pnpm/rfdc@1.4.1/node_modules/rfdc/index.js"(exports2, module2) {
    "use strict";
    init_esm_shims();
    module2.exports = rfdc2;
    function copyBuffer(cur) {
      if (cur instanceof Buffer) {
        return Buffer.from(cur);
      }
      return new cur.constructor(cur.buffer.slice(), cur.byteOffset, cur.length);
    }
    function rfdc2(opts) {
      opts = opts || {};
      if (opts.circles)
        return rfdcCircles(opts);
      const constructorHandlers = /* @__PURE__ */ new Map();
      constructorHandlers.set(Date, (o) => new Date(o));
      constructorHandlers.set(Map, (o, fn) => new Map(cloneArray(Array.from(o), fn)));
      constructorHandlers.set(Set, (o, fn) => new Set(cloneArray(Array.from(o), fn)));
      if (opts.constructorHandlers) {
        for (const handler2 of opts.constructorHandlers) {
          constructorHandlers.set(handler2[0], handler2[1]);
        }
      }
      let handler = null;
      return opts.proto ? cloneProto : clone2;
      function cloneArray(a, fn) {
        const keys2 = Object.keys(a);
        const a2 = new Array(keys2.length);
        for (let i = 0; i < keys2.length; i++) {
          const k = keys2[i];
          const cur = a[k];
          if (typeof cur !== "object" || cur === null) {
            a2[k] = cur;
          } else if (cur.constructor !== Object && (handler = constructorHandlers.get(cur.constructor))) {
            a2[k] = handler(cur, fn);
          } else if (ArrayBuffer.isView(cur)) {
            a2[k] = copyBuffer(cur);
          } else {
            a2[k] = fn(cur);
          }
        }
        return a2;
      }
      function clone2(o) {
        if (typeof o !== "object" || o === null)
          return o;
        if (Array.isArray(o))
          return cloneArray(o, clone2);
        if (o.constructor !== Object && (handler = constructorHandlers.get(o.constructor))) {
          return handler(o, clone2);
        }
        const o2 = {};
        for (const k in o) {
          if (Object.hasOwnProperty.call(o, k) === false)
            continue;
          const cur = o[k];
          if (typeof cur !== "object" || cur === null) {
            o2[k] = cur;
          } else if (cur.constructor !== Object && (handler = constructorHandlers.get(cur.constructor))) {
            o2[k] = handler(cur, clone2);
          } else if (ArrayBuffer.isView(cur)) {
            o2[k] = copyBuffer(cur);
          } else {
            o2[k] = clone2(cur);
          }
        }
        return o2;
      }
      function cloneProto(o) {
        if (typeof o !== "object" || o === null)
          return o;
        if (Array.isArray(o))
          return cloneArray(o, cloneProto);
        if (o.constructor !== Object && (handler = constructorHandlers.get(o.constructor))) {
          return handler(o, cloneProto);
        }
        const o2 = {};
        for (const k in o) {
          const cur = o[k];
          if (typeof cur !== "object" || cur === null) {
            o2[k] = cur;
          } else if (cur.constructor !== Object && (handler = constructorHandlers.get(cur.constructor))) {
            o2[k] = handler(cur, cloneProto);
          } else if (ArrayBuffer.isView(cur)) {
            o2[k] = copyBuffer(cur);
          } else {
            o2[k] = cloneProto(cur);
          }
        }
        return o2;
      }
    }
    function rfdcCircles(opts) {
      const refs = [];
      const refsNew = [];
      const constructorHandlers = /* @__PURE__ */ new Map();
      constructorHandlers.set(Date, (o) => new Date(o));
      constructorHandlers.set(Map, (o, fn) => new Map(cloneArray(Array.from(o), fn)));
      constructorHandlers.set(Set, (o, fn) => new Set(cloneArray(Array.from(o), fn)));
      if (opts.constructorHandlers) {
        for (const handler2 of opts.constructorHandlers) {
          constructorHandlers.set(handler2[0], handler2[1]);
        }
      }
      let handler = null;
      return opts.proto ? cloneProto : clone2;
      function cloneArray(a, fn) {
        const keys2 = Object.keys(a);
        const a2 = new Array(keys2.length);
        for (let i = 0; i < keys2.length; i++) {
          const k = keys2[i];
          const cur = a[k];
          if (typeof cur !== "object" || cur === null) {
            a2[k] = cur;
          } else if (cur.constructor !== Object && (handler = constructorHandlers.get(cur.constructor))) {
            a2[k] = handler(cur, fn);
          } else if (ArrayBuffer.isView(cur)) {
            a2[k] = copyBuffer(cur);
          } else {
            const index2 = refs.indexOf(cur);
            if (index2 !== -1) {
              a2[k] = refsNew[index2];
            } else {
              a2[k] = fn(cur);
            }
          }
        }
        return a2;
      }
      function clone2(o) {
        if (typeof o !== "object" || o === null)
          return o;
        if (Array.isArray(o))
          return cloneArray(o, clone2);
        if (o.constructor !== Object && (handler = constructorHandlers.get(o.constructor))) {
          return handler(o, clone2);
        }
        const o2 = {};
        refs.push(o);
        refsNew.push(o2);
        for (const k in o) {
          if (Object.hasOwnProperty.call(o, k) === false)
            continue;
          const cur = o[k];
          if (typeof cur !== "object" || cur === null) {
            o2[k] = cur;
          } else if (cur.constructor !== Object && (handler = constructorHandlers.get(cur.constructor))) {
            o2[k] = handler(cur, clone2);
          } else if (ArrayBuffer.isView(cur)) {
            o2[k] = copyBuffer(cur);
          } else {
            const i = refs.indexOf(cur);
            if (i !== -1) {
              o2[k] = refsNew[i];
            } else {
              o2[k] = clone2(cur);
            }
          }
        }
        refs.pop();
        refsNew.pop();
        return o2;
      }
      function cloneProto(o) {
        if (typeof o !== "object" || o === null)
          return o;
        if (Array.isArray(o))
          return cloneArray(o, cloneProto);
        if (o.constructor !== Object && (handler = constructorHandlers.get(o.constructor))) {
          return handler(o, cloneProto);
        }
        const o2 = {};
        refs.push(o);
        refsNew.push(o2);
        for (const k in o) {
          const cur = o[k];
          if (typeof cur !== "object" || cur === null) {
            o2[k] = cur;
          } else if (cur.constructor !== Object && (handler = constructorHandlers.get(cur.constructor))) {
            o2[k] = handler(cur, cloneProto);
          } else if (ArrayBuffer.isView(cur)) {
            o2[k] = copyBuffer(cur);
          } else {
            const i = refs.indexOf(cur);
            if (i !== -1) {
              o2[k] = refsNew[i];
            } else {
              o2[k] = cloneProto(cur);
            }
          }
        }
        refs.pop();
        refsNew.pop();
        return o2;
      }
    }
  }
});
init_esm_shims();
init_esm_shims();
init_esm_shims();
var isBrowser2 = typeof navigator !== "undefined";
var target = typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : typeof global !== "undefined" ? global : {};
var isInChromePanel = typeof target.chrome !== "undefined" && !!target.chrome.devtools;
var isInIframe = isBrowser2 && target.self !== target.top;
var _a;
var isInElectron = typeof navigator !== "undefined" && ((_a = navigator.userAgent) == null ? void 0 : _a.toLowerCase().includes("electron"));
var isNuxtApp = typeof window !== "undefined" && !!window.__NUXT__;
init_esm_shims();
var import_rfdc = __toESM2(require_rfdc(), 1);
var classifyRE = /(?:^|[-_/])(\w)/g;
function toUpper2(_, c) {
  return c ? c.toUpperCase() : "";
}
function classify(str) {
  return str && `${str}`.replace(classifyRE, toUpper2);
}
function basename(filename, ext) {
  let normalizedFilename = filename.replace(/^[a-z]:/i, "").replace(/\\/g, "/");
  if (normalizedFilename.endsWith(`index${ext}`)) {
    normalizedFilename = normalizedFilename.replace(`/index${ext}`, ext);
  }
  const lastSlashIndex = normalizedFilename.lastIndexOf("/");
  const baseNameWithExt = normalizedFilename.substring(lastSlashIndex + 1);
  if (ext) {
    const extIndex = baseNameWithExt.lastIndexOf(ext);
    return baseNameWithExt.substring(0, extIndex);
  }
  return "";
}
var deepClone = (0, import_rfdc.default)({ circles: true });

// ../../../../Project/100ls-native/node_modules/perfect-debounce/dist/index.mjs
var DEBOUNCE_DEFAULTS = {
  trailing: true
};
function debounce2(fn, wait = 25, options = {}) {
  options = { ...DEBOUNCE_DEFAULTS, ...options };
  if (!Number.isFinite(wait)) {
    throw new TypeError("Expected `wait` to be a finite number");
  }
  let leadingValue;
  let timeout;
  let resolveList = [];
  let currentPromise;
  let trailingArgs;
  const applyFn = (_this, args) => {
    currentPromise = _applyPromised(fn, _this, args);
    currentPromise.finally(() => {
      currentPromise = null;
      if (options.trailing && trailingArgs && !timeout) {
        const promise = applyFn(_this, trailingArgs);
        trailingArgs = null;
        return promise;
      }
    });
    return currentPromise;
  };
  return function(...args) {
    if (currentPromise) {
      if (options.trailing) {
        trailingArgs = args;
      }
      return currentPromise;
    }
    return new Promise((resolve) => {
      const shouldCallNow = !timeout && options.leading;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        timeout = null;
        const promise = options.leading ? leadingValue : applyFn(this, args);
        for (const _resolve of resolveList) {
          _resolve(promise);
        }
        resolveList = [];
      }, wait);
      if (shouldCallNow) {
        leadingValue = applyFn(this, args);
        resolve(leadingValue);
      } else {
        resolveList.push(resolve);
      }
    });
  };
}
async function _applyPromised(fn, _this, args) {
  return await fn.apply(_this, args);
}

// ../../../../Project/100ls-native/node_modules/hookable/dist/index.mjs
function flatHooks(configHooks, hooks2 = {}, parentName) {
  for (const key in configHooks) {
    const subHook = configHooks[key];
    const name = parentName ? `${parentName}:${key}` : key;
    if (typeof subHook === "object" && subHook !== null) {
      flatHooks(subHook, hooks2, name);
    } else if (typeof subHook === "function") {
      hooks2[name] = subHook;
    }
  }
  return hooks2;
}
var defaultTask = { run: (function_) => function_() };
var _createTask = () => defaultTask;
var createTask = typeof console.createTask !== "undefined" ? console.createTask : _createTask;
function serialTaskCaller(hooks2, args) {
  const name = args.shift();
  const task = createTask(name);
  return hooks2.reduce(
    (promise, hookFunction) => promise.then(() => task.run(() => hookFunction(...args))),
    Promise.resolve()
  );
}
function parallelTaskCaller(hooks2, args) {
  const name = args.shift();
  const task = createTask(name);
  return Promise.all(hooks2.map((hook2) => task.run(() => hook2(...args))));
}
function callEachWith(callbacks, arg0) {
  for (const callback of [...callbacks]) {
    callback(arg0);
  }
}
var Hookable = class {
  constructor() {
    this._hooks = {};
    this._before = void 0;
    this._after = void 0;
    this._deprecatedMessages = void 0;
    this._deprecatedHooks = {};
    this.hook = this.hook.bind(this);
    this.callHook = this.callHook.bind(this);
    this.callHookWith = this.callHookWith.bind(this);
  }
  hook(name, function_, options = {}) {
    if (!name || typeof function_ !== "function") {
      return () => {
      };
    }
    const originalName = name;
    let dep;
    while (this._deprecatedHooks[name]) {
      dep = this._deprecatedHooks[name];
      name = dep.to;
    }
    if (dep && !options.allowDeprecated) {
      let message = dep.message;
      if (!message) {
        message = `${originalName} hook has been deprecated` + (dep.to ? `, please use ${dep.to}` : "");
      }
      if (!this._deprecatedMessages) {
        this._deprecatedMessages = /* @__PURE__ */ new Set();
      }
      if (!this._deprecatedMessages.has(message)) {
        console.warn(message);
        this._deprecatedMessages.add(message);
      }
    }
    if (!function_.name) {
      try {
        Object.defineProperty(function_, "name", {
          get: () => "_" + name.replace(/\W+/g, "_") + "_hook_cb",
          configurable: true
        });
      } catch {
      }
    }
    this._hooks[name] = this._hooks[name] || [];
    this._hooks[name].push(function_);
    return () => {
      if (function_) {
        this.removeHook(name, function_);
        function_ = void 0;
      }
    };
  }
  hookOnce(name, function_) {
    let _unreg;
    let _function = (...arguments_) => {
      if (typeof _unreg === "function") {
        _unreg();
      }
      _unreg = void 0;
      _function = void 0;
      return function_(...arguments_);
    };
    _unreg = this.hook(name, _function);
    return _unreg;
  }
  removeHook(name, function_) {
    if (this._hooks[name]) {
      const index2 = this._hooks[name].indexOf(function_);
      if (index2 !== -1) {
        this._hooks[name].splice(index2, 1);
      }
      if (this._hooks[name].length === 0) {
        delete this._hooks[name];
      }
    }
  }
  deprecateHook(name, deprecated) {
    this._deprecatedHooks[name] = typeof deprecated === "string" ? { to: deprecated } : deprecated;
    const _hooks = this._hooks[name] || [];
    delete this._hooks[name];
    for (const hook2 of _hooks) {
      this.hook(name, hook2);
    }
  }
  deprecateHooks(deprecatedHooks) {
    Object.assign(this._deprecatedHooks, deprecatedHooks);
    for (const name in deprecatedHooks) {
      this.deprecateHook(name, deprecatedHooks[name]);
    }
  }
  addHooks(configHooks) {
    const hooks2 = flatHooks(configHooks);
    const removeFns = Object.keys(hooks2).map(
      (key) => this.hook(key, hooks2[key])
    );
    return () => {
      for (const unreg of removeFns.splice(0, removeFns.length)) {
        unreg();
      }
    };
  }
  removeHooks(configHooks) {
    const hooks2 = flatHooks(configHooks);
    for (const key in hooks2) {
      this.removeHook(key, hooks2[key]);
    }
  }
  removeAllHooks() {
    for (const key in this._hooks) {
      delete this._hooks[key];
    }
  }
  callHook(name, ...arguments_) {
    arguments_.unshift(name);
    return this.callHookWith(serialTaskCaller, name, ...arguments_);
  }
  callHookParallel(name, ...arguments_) {
    arguments_.unshift(name);
    return this.callHookWith(parallelTaskCaller, name, ...arguments_);
  }
  callHookWith(caller, name, ...arguments_) {
    const event = this._before || this._after ? { name, args: arguments_, context: {} } : void 0;
    if (this._before) {
      callEachWith(this._before, event);
    }
    const result2 = caller(
      name in this._hooks ? [...this._hooks[name]] : [],
      arguments_
    );
    if (result2 instanceof Promise) {
      return result2.finally(() => {
        if (this._after && event) {
          callEachWith(this._after, event);
        }
      });
    }
    if (this._after && event) {
      callEachWith(this._after, event);
    }
    return result2;
  }
  beforeEach(function_) {
    this._before = this._before || [];
    this._before.push(function_);
    return () => {
      if (this._before !== void 0) {
        const index2 = this._before.indexOf(function_);
        if (index2 !== -1) {
          this._before.splice(index2, 1);
        }
      }
    };
  }
  afterEach(function_) {
    this._after = this._after || [];
    this._after.push(function_);
    return () => {
      if (this._after !== void 0) {
        const index2 = this._after.indexOf(function_);
        if (index2 !== -1) {
          this._after.splice(index2, 1);
        }
      }
    };
  }
};
function createHooks() {
  return new Hookable();
}

// ../../../../Project/100ls-native/node_modules/birpc/dist/index.mjs
var { clearTimeout: clearTimeout2, setTimeout: setTimeout2 } = globalThis;
var random2 = Math.random.bind(Math);

// ../../../../Project/100ls-native/node_modules/@vue/devtools-kit/dist/index.js
var __create2 = Object.create;
var __defProp5 = Object.defineProperty;
var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
var __getOwnPropNames2 = Object.getOwnPropertyNames;
var __getProtoOf2 = Object.getPrototypeOf;
var __hasOwnProp2 = Object.prototype.hasOwnProperty;
var __esm2 = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames2(fn)[0]])(fn = 0)), res;
};
var __commonJS3 = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames2(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps2 = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames2(from))
      if (!__hasOwnProp2.call(to, key) && key !== except)
        __defProp5(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM3 = (mod, isNodeMode, target22) => (target22 = mod != null ? __create2(__getProtoOf2(mod)) : {}, __copyProps2(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp5(target22, "default", { value: mod, enumerable: true }) : target22,
  mod
));
var init_esm_shims2 = __esm2({
  "../../node_modules/.pnpm/tsup@8.4.0_@microsoft+api-extractor@7.51.1_@types+node@22.13.14__jiti@2.4.2_postcss@8.5_96eb05a9d65343021e53791dd83f3773/node_modules/tsup/assets/esm_shims.js"() {
    "use strict";
  }
});
var require_speakingurl = __commonJS3({
  "../../node_modules/.pnpm/speakingurl@14.0.1/node_modules/speakingurl/lib/speakingurl.js"(exports2, module2) {
    "use strict";
    init_esm_shims2();
    (function(root2) {
      "use strict";
      var charMap = {
        // latin
        "À": "A",
        "Á": "A",
        "Â": "A",
        "Ã": "A",
        "Ä": "Ae",
        "Å": "A",
        "Æ": "AE",
        "Ç": "C",
        "È": "E",
        "É": "E",
        "Ê": "E",
        "Ë": "E",
        "Ì": "I",
        "Í": "I",
        "Î": "I",
        "Ï": "I",
        "Ð": "D",
        "Ñ": "N",
        "Ò": "O",
        "Ó": "O",
        "Ô": "O",
        "Õ": "O",
        "Ö": "Oe",
        "Ő": "O",
        "Ø": "O",
        "Ù": "U",
        "Ú": "U",
        "Û": "U",
        "Ü": "Ue",
        "Ű": "U",
        "Ý": "Y",
        "Þ": "TH",
        "ß": "ss",
        "à": "a",
        "á": "a",
        "â": "a",
        "ã": "a",
        "ä": "ae",
        "å": "a",
        "æ": "ae",
        "ç": "c",
        "è": "e",
        "é": "e",
        "ê": "e",
        "ë": "e",
        "ì": "i",
        "í": "i",
        "î": "i",
        "ï": "i",
        "ð": "d",
        "ñ": "n",
        "ò": "o",
        "ó": "o",
        "ô": "o",
        "õ": "o",
        "ö": "oe",
        "ő": "o",
        "ø": "o",
        "ù": "u",
        "ú": "u",
        "û": "u",
        "ü": "ue",
        "ű": "u",
        "ý": "y",
        "þ": "th",
        "ÿ": "y",
        "ẞ": "SS",
        // language specific
        // Arabic
        "ا": "a",
        "أ": "a",
        "إ": "i",
        "آ": "aa",
        "ؤ": "u",
        "ئ": "e",
        "ء": "a",
        "ب": "b",
        "ت": "t",
        "ث": "th",
        "ج": "j",
        "ح": "h",
        "خ": "kh",
        "د": "d",
        "ذ": "th",
        "ر": "r",
        "ز": "z",
        "س": "s",
        "ش": "sh",
        "ص": "s",
        "ض": "dh",
        "ط": "t",
        "ظ": "z",
        "ع": "a",
        "غ": "gh",
        "ف": "f",
        "ق": "q",
        "ك": "k",
        "ل": "l",
        "م": "m",
        "ن": "n",
        "ه": "h",
        "و": "w",
        "ي": "y",
        "ى": "a",
        "ة": "h",
        "ﻻ": "la",
        "ﻷ": "laa",
        "ﻹ": "lai",
        "ﻵ": "laa",
        // Persian additional characters than Arabic
        "گ": "g",
        "چ": "ch",
        "پ": "p",
        "ژ": "zh",
        "ک": "k",
        "ی": "y",
        // Arabic diactrics
        "َ": "a",
        "ً": "an",
        "ِ": "e",
        "ٍ": "en",
        "ُ": "u",
        "ٌ": "on",
        "ْ": "",
        // Arabic numbers
        "٠": "0",
        "١": "1",
        "٢": "2",
        "٣": "3",
        "٤": "4",
        "٥": "5",
        "٦": "6",
        "٧": "7",
        "٨": "8",
        "٩": "9",
        // Persian numbers
        "۰": "0",
        "۱": "1",
        "۲": "2",
        "۳": "3",
        "۴": "4",
        "۵": "5",
        "۶": "6",
        "۷": "7",
        "۸": "8",
        "۹": "9",
        // Burmese consonants
        "က": "k",
        "ခ": "kh",
        "ဂ": "g",
        "ဃ": "ga",
        "င": "ng",
        "စ": "s",
        "ဆ": "sa",
        "ဇ": "z",
        "စျ": "za",
        "ည": "ny",
        "ဋ": "t",
        "ဌ": "ta",
        "ဍ": "d",
        "ဎ": "da",
        "ဏ": "na",
        "တ": "t",
        "ထ": "ta",
        "ဒ": "d",
        "ဓ": "da",
        "န": "n",
        "ပ": "p",
        "ဖ": "pa",
        "ဗ": "b",
        "ဘ": "ba",
        "မ": "m",
        "ယ": "y",
        "ရ": "ya",
        "လ": "l",
        "ဝ": "w",
        "သ": "th",
        "ဟ": "h",
        "ဠ": "la",
        "အ": "a",
        // consonant character combos
        "ြ": "y",
        "ျ": "ya",
        "ွ": "w",
        "ြွ": "yw",
        "ျွ": "ywa",
        "ှ": "h",
        // independent vowels
        "ဧ": "e",
        "၏": "-e",
        "ဣ": "i",
        "ဤ": "-i",
        "ဉ": "u",
        "ဦ": "-u",
        "ဩ": "aw",
        "သြော": "aw",
        "ဪ": "aw",
        // numbers
        "၀": "0",
        "၁": "1",
        "၂": "2",
        "၃": "3",
        "၄": "4",
        "၅": "5",
        "၆": "6",
        "၇": "7",
        "၈": "8",
        "၉": "9",
        // virama and tone marks which are silent in transliteration
        "္": "",
        "့": "",
        "း": "",
        // Czech
        "č": "c",
        "ď": "d",
        "ě": "e",
        "ň": "n",
        "ř": "r",
        "š": "s",
        "ť": "t",
        "ů": "u",
        "ž": "z",
        "Č": "C",
        "Ď": "D",
        "Ě": "E",
        "Ň": "N",
        "Ř": "R",
        "Š": "S",
        "Ť": "T",
        "Ů": "U",
        "Ž": "Z",
        // Dhivehi
        "ހ": "h",
        "ށ": "sh",
        "ނ": "n",
        "ރ": "r",
        "ބ": "b",
        "ޅ": "lh",
        "ކ": "k",
        "އ": "a",
        "ވ": "v",
        "މ": "m",
        "ފ": "f",
        "ދ": "dh",
        "ތ": "th",
        "ލ": "l",
        "ގ": "g",
        "ޏ": "gn",
        "ސ": "s",
        "ޑ": "d",
        "ޒ": "z",
        "ޓ": "t",
        "ޔ": "y",
        "ޕ": "p",
        "ޖ": "j",
        "ޗ": "ch",
        "ޘ": "tt",
        "ޙ": "hh",
        "ޚ": "kh",
        "ޛ": "th",
        "ޜ": "z",
        "ޝ": "sh",
        "ޞ": "s",
        "ޟ": "d",
        "ޠ": "t",
        "ޡ": "z",
        "ޢ": "a",
        "ޣ": "gh",
        "ޤ": "q",
        "ޥ": "w",
        "ަ": "a",
        "ާ": "aa",
        "ި": "i",
        "ީ": "ee",
        "ު": "u",
        "ޫ": "oo",
        "ެ": "e",
        "ޭ": "ey",
        "ޮ": "o",
        "ޯ": "oa",
        "ް": "",
        // Georgian https://en.wikipedia.org/wiki/Romanization_of_Georgian
        // National system (2002)
        "ა": "a",
        "ბ": "b",
        "გ": "g",
        "დ": "d",
        "ე": "e",
        "ვ": "v",
        "ზ": "z",
        "თ": "t",
        "ი": "i",
        "კ": "k",
        "ლ": "l",
        "მ": "m",
        "ნ": "n",
        "ო": "o",
        "პ": "p",
        "ჟ": "zh",
        "რ": "r",
        "ს": "s",
        "ტ": "t",
        "უ": "u",
        "ფ": "p",
        "ქ": "k",
        "ღ": "gh",
        "ყ": "q",
        "შ": "sh",
        "ჩ": "ch",
        "ც": "ts",
        "ძ": "dz",
        "წ": "ts",
        "ჭ": "ch",
        "ხ": "kh",
        "ჯ": "j",
        "ჰ": "h",
        // Greek
        "α": "a",
        "β": "v",
        "γ": "g",
        "δ": "d",
        "ε": "e",
        "ζ": "z",
        "η": "i",
        "θ": "th",
        "ι": "i",
        "κ": "k",
        "λ": "l",
        "μ": "m",
        "ν": "n",
        "ξ": "ks",
        "ο": "o",
        "π": "p",
        "ρ": "r",
        "σ": "s",
        "τ": "t",
        "υ": "y",
        "φ": "f",
        "χ": "x",
        "ψ": "ps",
        "ω": "o",
        "ά": "a",
        "έ": "e",
        "ί": "i",
        "ό": "o",
        "ύ": "y",
        "ή": "i",
        "ώ": "o",
        "ς": "s",
        "ϊ": "i",
        "ΰ": "y",
        "ϋ": "y",
        "ΐ": "i",
        "Α": "A",
        "Β": "B",
        "Γ": "G",
        "Δ": "D",
        "Ε": "E",
        "Ζ": "Z",
        "Η": "I",
        "Θ": "TH",
        "Ι": "I",
        "Κ": "K",
        "Λ": "L",
        "Μ": "M",
        "Ν": "N",
        "Ξ": "KS",
        "Ο": "O",
        "Π": "P",
        "Ρ": "R",
        "Σ": "S",
        "Τ": "T",
        "Υ": "Y",
        "Φ": "F",
        "Χ": "X",
        "Ψ": "PS",
        "Ω": "O",
        "Ά": "A",
        "Έ": "E",
        "Ί": "I",
        "Ό": "O",
        "Ύ": "Y",
        "Ή": "I",
        "Ώ": "O",
        "Ϊ": "I",
        "Ϋ": "Y",
        // Latvian
        "ā": "a",
        // 'č': 'c', // duplicate
        "ē": "e",
        "ģ": "g",
        "ī": "i",
        "ķ": "k",
        "ļ": "l",
        "ņ": "n",
        // 'š': 's', // duplicate
        "ū": "u",
        // 'ž': 'z', // duplicate
        "Ā": "A",
        // 'Č': 'C', // duplicate
        "Ē": "E",
        "Ģ": "G",
        "Ī": "I",
        "Ķ": "k",
        "Ļ": "L",
        "Ņ": "N",
        // 'Š': 'S', // duplicate
        "Ū": "U",
        // 'Ž': 'Z', // duplicate
        // Macedonian
        "Ќ": "Kj",
        "ќ": "kj",
        "Љ": "Lj",
        "љ": "lj",
        "Њ": "Nj",
        "њ": "nj",
        "Тс": "Ts",
        "тс": "ts",
        // Polish
        "ą": "a",
        "ć": "c",
        "ę": "e",
        "ł": "l",
        "ń": "n",
        // 'ó': 'o', // duplicate
        "ś": "s",
        "ź": "z",
        "ż": "z",
        "Ą": "A",
        "Ć": "C",
        "Ę": "E",
        "Ł": "L",
        "Ń": "N",
        "Ś": "S",
        "Ź": "Z",
        "Ż": "Z",
        // Ukranian
        "Є": "Ye",
        "І": "I",
        "Ї": "Yi",
        "Ґ": "G",
        "є": "ye",
        "і": "i",
        "ї": "yi",
        "ґ": "g",
        // Romanian
        "ă": "a",
        "Ă": "A",
        "ș": "s",
        "Ș": "S",
        // 'ş': 's', // duplicate
        // 'Ş': 'S', // duplicate
        "ț": "t",
        "Ț": "T",
        "ţ": "t",
        "Ţ": "T",
        // Russian https://en.wikipedia.org/wiki/Romanization_of_Russian
        // ICAO
        "а": "a",
        "б": "b",
        "в": "v",
        "г": "g",
        "д": "d",
        "е": "e",
        "ё": "yo",
        "ж": "zh",
        "з": "z",
        "и": "i",
        "й": "i",
        "к": "k",
        "л": "l",
        "м": "m",
        "н": "n",
        "о": "o",
        "п": "p",
        "р": "r",
        "с": "s",
        "т": "t",
        "у": "u",
        "ф": "f",
        "х": "kh",
        "ц": "c",
        "ч": "ch",
        "ш": "sh",
        "щ": "sh",
        "ъ": "",
        "ы": "y",
        "ь": "",
        "э": "e",
        "ю": "yu",
        "я": "ya",
        "А": "A",
        "Б": "B",
        "В": "V",
        "Г": "G",
        "Д": "D",
        "Е": "E",
        "Ё": "Yo",
        "Ж": "Zh",
        "З": "Z",
        "И": "I",
        "Й": "I",
        "К": "K",
        "Л": "L",
        "М": "M",
        "Н": "N",
        "О": "O",
        "П": "P",
        "Р": "R",
        "С": "S",
        "Т": "T",
        "У": "U",
        "Ф": "F",
        "Х": "Kh",
        "Ц": "C",
        "Ч": "Ch",
        "Ш": "Sh",
        "Щ": "Sh",
        "Ъ": "",
        "Ы": "Y",
        "Ь": "",
        "Э": "E",
        "Ю": "Yu",
        "Я": "Ya",
        // Serbian
        "ђ": "dj",
        "ј": "j",
        // 'љ': 'lj',  // duplicate
        // 'њ': 'nj', // duplicate
        "ћ": "c",
        "џ": "dz",
        "Ђ": "Dj",
        "Ј": "j",
        // 'Љ': 'Lj', // duplicate
        // 'Њ': 'Nj', // duplicate
        "Ћ": "C",
        "Џ": "Dz",
        // Slovak
        "ľ": "l",
        "ĺ": "l",
        "ŕ": "r",
        "Ľ": "L",
        "Ĺ": "L",
        "Ŕ": "R",
        // Turkish
        "ş": "s",
        "Ş": "S",
        "ı": "i",
        "İ": "I",
        // 'ç': 'c', // duplicate
        // 'Ç': 'C', // duplicate
        // 'ü': 'u', // duplicate, see langCharMap
        // 'Ü': 'U', // duplicate, see langCharMap
        // 'ö': 'o', // duplicate, see langCharMap
        // 'Ö': 'O', // duplicate, see langCharMap
        "ğ": "g",
        "Ğ": "G",
        // Vietnamese
        "ả": "a",
        "Ả": "A",
        "ẳ": "a",
        "Ẳ": "A",
        "ẩ": "a",
        "Ẩ": "A",
        "đ": "d",
        "Đ": "D",
        "ẹ": "e",
        "Ẹ": "E",
        "ẽ": "e",
        "Ẽ": "E",
        "ẻ": "e",
        "Ẻ": "E",
        "ế": "e",
        "Ế": "E",
        "ề": "e",
        "Ề": "E",
        "ệ": "e",
        "Ệ": "E",
        "ễ": "e",
        "Ễ": "E",
        "ể": "e",
        "Ể": "E",
        "ỏ": "o",
        "ọ": "o",
        "Ọ": "o",
        "ố": "o",
        "Ố": "O",
        "ồ": "o",
        "Ồ": "O",
        "ổ": "o",
        "Ổ": "O",
        "ộ": "o",
        "Ộ": "O",
        "ỗ": "o",
        "Ỗ": "O",
        "ơ": "o",
        "Ơ": "O",
        "ớ": "o",
        "Ớ": "O",
        "ờ": "o",
        "Ờ": "O",
        "ợ": "o",
        "Ợ": "O",
        "ỡ": "o",
        "Ỡ": "O",
        "Ở": "o",
        "ở": "o",
        "ị": "i",
        "Ị": "I",
        "ĩ": "i",
        "Ĩ": "I",
        "ỉ": "i",
        "Ỉ": "i",
        "ủ": "u",
        "Ủ": "U",
        "ụ": "u",
        "Ụ": "U",
        "ũ": "u",
        "Ũ": "U",
        "ư": "u",
        "Ư": "U",
        "ứ": "u",
        "Ứ": "U",
        "ừ": "u",
        "Ừ": "U",
        "ự": "u",
        "Ự": "U",
        "ữ": "u",
        "Ữ": "U",
        "ử": "u",
        "Ử": "ư",
        "ỷ": "y",
        "Ỷ": "y",
        "ỳ": "y",
        "Ỳ": "Y",
        "ỵ": "y",
        "Ỵ": "Y",
        "ỹ": "y",
        "Ỹ": "Y",
        "ạ": "a",
        "Ạ": "A",
        "ấ": "a",
        "Ấ": "A",
        "ầ": "a",
        "Ầ": "A",
        "ậ": "a",
        "Ậ": "A",
        "ẫ": "a",
        "Ẫ": "A",
        // 'ă': 'a', // duplicate
        // 'Ă': 'A', // duplicate
        "ắ": "a",
        "Ắ": "A",
        "ằ": "a",
        "Ằ": "A",
        "ặ": "a",
        "Ặ": "A",
        "ẵ": "a",
        "Ẵ": "A",
        "⓪": "0",
        "①": "1",
        "②": "2",
        "③": "3",
        "④": "4",
        "⑤": "5",
        "⑥": "6",
        "⑦": "7",
        "⑧": "8",
        "⑨": "9",
        "⑩": "10",
        "⑪": "11",
        "⑫": "12",
        "⑬": "13",
        "⑭": "14",
        "⑮": "15",
        "⑯": "16",
        "⑰": "17",
        "⑱": "18",
        "⑲": "18",
        "⑳": "18",
        "⓵": "1",
        "⓶": "2",
        "⓷": "3",
        "⓸": "4",
        "⓹": "5",
        "⓺": "6",
        "⓻": "7",
        "⓼": "8",
        "⓽": "9",
        "⓾": "10",
        "⓿": "0",
        "⓫": "11",
        "⓬": "12",
        "⓭": "13",
        "⓮": "14",
        "⓯": "15",
        "⓰": "16",
        "⓱": "17",
        "⓲": "18",
        "⓳": "19",
        "⓴": "20",
        "Ⓐ": "A",
        "Ⓑ": "B",
        "Ⓒ": "C",
        "Ⓓ": "D",
        "Ⓔ": "E",
        "Ⓕ": "F",
        "Ⓖ": "G",
        "Ⓗ": "H",
        "Ⓘ": "I",
        "Ⓙ": "J",
        "Ⓚ": "K",
        "Ⓛ": "L",
        "Ⓜ": "M",
        "Ⓝ": "N",
        "Ⓞ": "O",
        "Ⓟ": "P",
        "Ⓠ": "Q",
        "Ⓡ": "R",
        "Ⓢ": "S",
        "Ⓣ": "T",
        "Ⓤ": "U",
        "Ⓥ": "V",
        "Ⓦ": "W",
        "Ⓧ": "X",
        "Ⓨ": "Y",
        "Ⓩ": "Z",
        "ⓐ": "a",
        "ⓑ": "b",
        "ⓒ": "c",
        "ⓓ": "d",
        "ⓔ": "e",
        "ⓕ": "f",
        "ⓖ": "g",
        "ⓗ": "h",
        "ⓘ": "i",
        "ⓙ": "j",
        "ⓚ": "k",
        "ⓛ": "l",
        "ⓜ": "m",
        "ⓝ": "n",
        "ⓞ": "o",
        "ⓟ": "p",
        "ⓠ": "q",
        "ⓡ": "r",
        "ⓢ": "s",
        "ⓣ": "t",
        "ⓤ": "u",
        "ⓦ": "v",
        "ⓥ": "w",
        "ⓧ": "x",
        "ⓨ": "y",
        "ⓩ": "z",
        // symbols
        "“": '"',
        "”": '"',
        "‘": "'",
        "’": "'",
        "∂": "d",
        "ƒ": "f",
        "™": "(TM)",
        "©": "(C)",
        "œ": "oe",
        "Œ": "OE",
        "®": "(R)",
        "†": "+",
        "℠": "(SM)",
        "…": "...",
        "˚": "o",
        "º": "o",
        "ª": "a",
        "•": "*",
        "၊": ",",
        "။": ".",
        // currency
        "$": "USD",
        "€": "EUR",
        "₢": "BRN",
        "₣": "FRF",
        "£": "GBP",
        "₤": "ITL",
        "₦": "NGN",
        "₧": "ESP",
        "₩": "KRW",
        "₪": "ILS",
        "₫": "VND",
        "₭": "LAK",
        "₮": "MNT",
        "₯": "GRD",
        "₱": "ARS",
        "₲": "PYG",
        "₳": "ARA",
        "₴": "UAH",
        "₵": "GHS",
        "¢": "cent",
        "¥": "CNY",
        "元": "CNY",
        "円": "YEN",
        "﷼": "IRR",
        "₠": "EWE",
        "฿": "THB",
        "₨": "INR",
        "₹": "INR",
        "₰": "PF",
        "₺": "TRY",
        "؋": "AFN",
        "₼": "AZN",
        "лв": "BGN",
        "៛": "KHR",
        "₡": "CRC",
        "₸": "KZT",
        "ден": "MKD",
        "zł": "PLN",
        "₽": "RUB",
        "₾": "GEL"
      };
      var lookAheadCharArray = [
        // burmese
        "်",
        // Dhivehi
        "ް"
      ];
      var diatricMap = {
        // Burmese
        // dependent vowels
        "ာ": "a",
        "ါ": "a",
        "ေ": "e",
        "ဲ": "e",
        "ိ": "i",
        "ီ": "i",
        "ို": "o",
        "ု": "u",
        "ူ": "u",
        "ေါင်": "aung",
        "ော": "aw",
        "ော်": "aw",
        "ေါ": "aw",
        "ေါ်": "aw",
        "်": "်",
        // this is special case but the character will be converted to latin in the code
        "က်": "et",
        "ိုက်": "aik",
        "ောက်": "auk",
        "င်": "in",
        "ိုင်": "aing",
        "ောင်": "aung",
        "စ်": "it",
        "ည်": "i",
        "တ်": "at",
        "ိတ်": "eik",
        "ုတ်": "ok",
        "ွတ်": "ut",
        "ေတ်": "it",
        "ဒ်": "d",
        "ိုဒ်": "ok",
        "ုဒ်": "ait",
        "န်": "an",
        "ာန်": "an",
        "ိန်": "ein",
        "ုန်": "on",
        "ွန်": "un",
        "ပ်": "at",
        "ိပ်": "eik",
        "ုပ်": "ok",
        "ွပ်": "ut",
        "န်ုပ်": "nub",
        "မ်": "an",
        "ိမ်": "ein",
        "ုမ်": "on",
        "ွမ်": "un",
        "ယ်": "e",
        "ိုလ်": "ol",
        "ဉ်": "in",
        "ံ": "an",
        "ိံ": "ein",
        "ုံ": "on",
        // Dhivehi
        "ައް": "ah",
        "ަށް": "ah"
      };
      var langCharMap = {
        "en": {},
        // default language
        "az": {
          // Azerbaijani
          "ç": "c",
          "ə": "e",
          "ğ": "g",
          "ı": "i",
          "ö": "o",
          "ş": "s",
          "ü": "u",
          "Ç": "C",
          "Ə": "E",
          "Ğ": "G",
          "İ": "I",
          "Ö": "O",
          "Ş": "S",
          "Ü": "U"
        },
        "cs": {
          // Czech
          "č": "c",
          "ď": "d",
          "ě": "e",
          "ň": "n",
          "ř": "r",
          "š": "s",
          "ť": "t",
          "ů": "u",
          "ž": "z",
          "Č": "C",
          "Ď": "D",
          "Ě": "E",
          "Ň": "N",
          "Ř": "R",
          "Š": "S",
          "Ť": "T",
          "Ů": "U",
          "Ž": "Z"
        },
        "fi": {
          // Finnish
          // 'å': 'a', duplicate see charMap/latin
          // 'Å': 'A', duplicate see charMap/latin
          "ä": "a",
          // ok
          "Ä": "A",
          // ok
          "ö": "o",
          // ok
          "Ö": "O"
          // ok
        },
        "hu": {
          // Hungarian
          "ä": "a",
          // ok
          "Ä": "A",
          // ok
          // 'á': 'a', duplicate see charMap/latin
          // 'Á': 'A', duplicate see charMap/latin
          "ö": "o",
          // ok
          "Ö": "O",
          // ok
          // 'ő': 'o', duplicate see charMap/latin
          // 'Ő': 'O', duplicate see charMap/latin
          "ü": "u",
          "Ü": "U",
          "ű": "u",
          "Ű": "U"
        },
        "lt": {
          // Lithuanian
          "ą": "a",
          "č": "c",
          "ę": "e",
          "ė": "e",
          "į": "i",
          "š": "s",
          "ų": "u",
          "ū": "u",
          "ž": "z",
          "Ą": "A",
          "Č": "C",
          "Ę": "E",
          "Ė": "E",
          "Į": "I",
          "Š": "S",
          "Ų": "U",
          "Ū": "U"
        },
        "lv": {
          // Latvian
          "ā": "a",
          "č": "c",
          "ē": "e",
          "ģ": "g",
          "ī": "i",
          "ķ": "k",
          "ļ": "l",
          "ņ": "n",
          "š": "s",
          "ū": "u",
          "ž": "z",
          "Ā": "A",
          "Č": "C",
          "Ē": "E",
          "Ģ": "G",
          "Ī": "i",
          "Ķ": "k",
          "Ļ": "L",
          "Ņ": "N",
          "Š": "S",
          "Ū": "u",
          "Ž": "Z"
        },
        "pl": {
          // Polish
          "ą": "a",
          "ć": "c",
          "ę": "e",
          "ł": "l",
          "ń": "n",
          "ó": "o",
          "ś": "s",
          "ź": "z",
          "ż": "z",
          "Ą": "A",
          "Ć": "C",
          "Ę": "e",
          "Ł": "L",
          "Ń": "N",
          "Ó": "O",
          "Ś": "S",
          "Ź": "Z",
          "Ż": "Z"
        },
        "sv": {
          // Swedish
          // 'å': 'a', duplicate see charMap/latin
          // 'Å': 'A', duplicate see charMap/latin
          "ä": "a",
          // ok
          "Ä": "A",
          // ok
          "ö": "o",
          // ok
          "Ö": "O"
          // ok
        },
        "sk": {
          // Slovak
          "ä": "a",
          "Ä": "A"
        },
        "sr": {
          // Serbian
          "љ": "lj",
          "њ": "nj",
          "Љ": "Lj",
          "Њ": "Nj",
          "đ": "dj",
          "Đ": "Dj"
        },
        "tr": {
          // Turkish
          "Ü": "U",
          "Ö": "O",
          "ü": "u",
          "ö": "o"
        }
      };
      var symbolMap = {
        "ar": {
          "∆": "delta",
          "∞": "la-nihaya",
          "♥": "hob",
          "&": "wa",
          "|": "aw",
          "<": "aqal-men",
          ">": "akbar-men",
          "∑": "majmou",
          "¤": "omla"
        },
        "az": {},
        "ca": {
          "∆": "delta",
          "∞": "infinit",
          "♥": "amor",
          "&": "i",
          "|": "o",
          "<": "menys que",
          ">": "mes que",
          "∑": "suma dels",
          "¤": "moneda"
        },
        "cs": {
          "∆": "delta",
          "∞": "nekonecno",
          "♥": "laska",
          "&": "a",
          "|": "nebo",
          "<": "mensi nez",
          ">": "vetsi nez",
          "∑": "soucet",
          "¤": "mena"
        },
        "de": {
          "∆": "delta",
          "∞": "unendlich",
          "♥": "Liebe",
          "&": "und",
          "|": "oder",
          "<": "kleiner als",
          ">": "groesser als",
          "∑": "Summe von",
          "¤": "Waehrung"
        },
        "dv": {
          "∆": "delta",
          "∞": "kolunulaa",
          "♥": "loabi",
          "&": "aai",
          "|": "noonee",
          "<": "ah vure kuda",
          ">": "ah vure bodu",
          "∑": "jumula",
          "¤": "faisaa"
        },
        "en": {
          "∆": "delta",
          "∞": "infinity",
          "♥": "love",
          "&": "and",
          "|": "or",
          "<": "less than",
          ">": "greater than",
          "∑": "sum",
          "¤": "currency"
        },
        "es": {
          "∆": "delta",
          "∞": "infinito",
          "♥": "amor",
          "&": "y",
          "|": "u",
          "<": "menos que",
          ">": "mas que",
          "∑": "suma de los",
          "¤": "moneda"
        },
        "fa": {
          "∆": "delta",
          "∞": "bi-nahayat",
          "♥": "eshgh",
          "&": "va",
          "|": "ya",
          "<": "kamtar-az",
          ">": "bishtar-az",
          "∑": "majmooe",
          "¤": "vahed"
        },
        "fi": {
          "∆": "delta",
          "∞": "aarettomyys",
          "♥": "rakkaus",
          "&": "ja",
          "|": "tai",
          "<": "pienempi kuin",
          ">": "suurempi kuin",
          "∑": "summa",
          "¤": "valuutta"
        },
        "fr": {
          "∆": "delta",
          "∞": "infiniment",
          "♥": "Amour",
          "&": "et",
          "|": "ou",
          "<": "moins que",
          ">": "superieure a",
          "∑": "somme des",
          "¤": "monnaie"
        },
        "ge": {
          "∆": "delta",
          "∞": "usasruloba",
          "♥": "siqvaruli",
          "&": "da",
          "|": "an",
          "<": "naklebi",
          ">": "meti",
          "∑": "jami",
          "¤": "valuta"
        },
        "gr": {},
        "hu": {
          "∆": "delta",
          "∞": "vegtelen",
          "♥": "szerelem",
          "&": "es",
          "|": "vagy",
          "<": "kisebb mint",
          ">": "nagyobb mint",
          "∑": "szumma",
          "¤": "penznem"
        },
        "it": {
          "∆": "delta",
          "∞": "infinito",
          "♥": "amore",
          "&": "e",
          "|": "o",
          "<": "minore di",
          ">": "maggiore di",
          "∑": "somma",
          "¤": "moneta"
        },
        "lt": {
          "∆": "delta",
          "∞": "begalybe",
          "♥": "meile",
          "&": "ir",
          "|": "ar",
          "<": "maziau nei",
          ">": "daugiau nei",
          "∑": "suma",
          "¤": "valiuta"
        },
        "lv": {
          "∆": "delta",
          "∞": "bezgaliba",
          "♥": "milestiba",
          "&": "un",
          "|": "vai",
          "<": "mazak neka",
          ">": "lielaks neka",
          "∑": "summa",
          "¤": "valuta"
        },
        "my": {
          "∆": "kwahkhyaet",
          "∞": "asaonasme",
          "♥": "akhyait",
          "&": "nhin",
          "|": "tho",
          "<": "ngethaw",
          ">": "kyithaw",
          "∑": "paungld",
          "¤": "ngwekye"
        },
        "mk": {},
        "nl": {
          "∆": "delta",
          "∞": "oneindig",
          "♥": "liefde",
          "&": "en",
          "|": "of",
          "<": "kleiner dan",
          ">": "groter dan",
          "∑": "som",
          "¤": "valuta"
        },
        "pl": {
          "∆": "delta",
          "∞": "nieskonczonosc",
          "♥": "milosc",
          "&": "i",
          "|": "lub",
          "<": "mniejsze niz",
          ">": "wieksze niz",
          "∑": "suma",
          "¤": "waluta"
        },
        "pt": {
          "∆": "delta",
          "∞": "infinito",
          "♥": "amor",
          "&": "e",
          "|": "ou",
          "<": "menor que",
          ">": "maior que",
          "∑": "soma",
          "¤": "moeda"
        },
        "ro": {
          "∆": "delta",
          "∞": "infinit",
          "♥": "dragoste",
          "&": "si",
          "|": "sau",
          "<": "mai mic ca",
          ">": "mai mare ca",
          "∑": "suma",
          "¤": "valuta"
        },
        "ru": {
          "∆": "delta",
          "∞": "beskonechno",
          "♥": "lubov",
          "&": "i",
          "|": "ili",
          "<": "menshe",
          ">": "bolshe",
          "∑": "summa",
          "¤": "valjuta"
        },
        "sk": {
          "∆": "delta",
          "∞": "nekonecno",
          "♥": "laska",
          "&": "a",
          "|": "alebo",
          "<": "menej ako",
          ">": "viac ako",
          "∑": "sucet",
          "¤": "mena"
        },
        "sr": {},
        "tr": {
          "∆": "delta",
          "∞": "sonsuzluk",
          "♥": "ask",
          "&": "ve",
          "|": "veya",
          "<": "kucuktur",
          ">": "buyuktur",
          "∑": "toplam",
          "¤": "para birimi"
        },
        "uk": {
          "∆": "delta",
          "∞": "bezkinechnist",
          "♥": "lubov",
          "&": "i",
          "|": "abo",
          "<": "menshe",
          ">": "bilshe",
          "∑": "suma",
          "¤": "valjuta"
        },
        "vn": {
          "∆": "delta",
          "∞": "vo cuc",
          "♥": "yeu",
          "&": "va",
          "|": "hoac",
          "<": "nho hon",
          ">": "lon hon",
          "∑": "tong",
          "¤": "tien te"
        }
      };
      var uricChars = [";", "?", ":", "@", "&", "=", "+", "$", ",", "/"].join("");
      var uricNoSlashChars = [";", "?", ":", "@", "&", "=", "+", "$", ","].join("");
      var markChars = [".", "!", "~", "*", "'", "(", ")"].join("");
      var getSlug = function getSlug2(input, opts) {
        var separator = "-";
        var result2 = "";
        var diatricString = "";
        var convertSymbols = true;
        var customReplacements = {};
        var maintainCase;
        var titleCase;
        var truncate2;
        var uricFlag;
        var uricNoSlashFlag;
        var markFlag;
        var symbol;
        var langChar;
        var lucky;
        var i;
        var ch;
        var l;
        var lastCharWasSymbol;
        var lastCharWasDiatric;
        var allowedChars = "";
        if (typeof input !== "string") {
          return "";
        }
        if (typeof opts === "string") {
          separator = opts;
        }
        symbol = symbolMap.en;
        langChar = langCharMap.en;
        if (typeof opts === "object") {
          maintainCase = opts.maintainCase || false;
          customReplacements = opts.custom && typeof opts.custom === "object" ? opts.custom : customReplacements;
          truncate2 = +opts.truncate > 1 && opts.truncate || false;
          uricFlag = opts.uric || false;
          uricNoSlashFlag = opts.uricNoSlash || false;
          markFlag = opts.mark || false;
          convertSymbols = opts.symbols === false || opts.lang === false ? false : true;
          separator = opts.separator || separator;
          if (uricFlag) {
            allowedChars += uricChars;
          }
          if (uricNoSlashFlag) {
            allowedChars += uricNoSlashChars;
          }
          if (markFlag) {
            allowedChars += markChars;
          }
          symbol = opts.lang && symbolMap[opts.lang] && convertSymbols ? symbolMap[opts.lang] : convertSymbols ? symbolMap.en : {};
          langChar = opts.lang && langCharMap[opts.lang] ? langCharMap[opts.lang] : opts.lang === false || opts.lang === true ? {} : langCharMap.en;
          if (opts.titleCase && typeof opts.titleCase.length === "number" && Array.prototype.toString.call(opts.titleCase)) {
            opts.titleCase.forEach(function(v) {
              customReplacements[v + ""] = v + "";
            });
            titleCase = true;
          } else {
            titleCase = !!opts.titleCase;
          }
          if (opts.custom && typeof opts.custom.length === "number" && Array.prototype.toString.call(opts.custom)) {
            opts.custom.forEach(function(v) {
              customReplacements[v + ""] = v + "";
            });
          }
          Object.keys(customReplacements).forEach(function(v) {
            var r;
            if (v.length > 1) {
              r = new RegExp("\\b" + escapeChars(v) + "\\b", "gi");
            } else {
              r = new RegExp(escapeChars(v), "gi");
            }
            input = input.replace(r, customReplacements[v]);
          });
          for (ch in customReplacements) {
            allowedChars += ch;
          }
        }
        allowedChars += separator;
        allowedChars = escapeChars(allowedChars);
        input = input.replace(/(^\s+|\s+$)/g, "");
        lastCharWasSymbol = false;
        lastCharWasDiatric = false;
        for (i = 0, l = input.length; i < l; i++) {
          ch = input[i];
          if (isReplacedCustomChar(ch, customReplacements)) {
            lastCharWasSymbol = false;
          } else if (langChar[ch]) {
            ch = lastCharWasSymbol && langChar[ch].match(/[A-Za-z0-9]/) ? " " + langChar[ch] : langChar[ch];
            lastCharWasSymbol = false;
          } else if (ch in charMap) {
            if (i + 1 < l && lookAheadCharArray.indexOf(input[i + 1]) >= 0) {
              diatricString += ch;
              ch = "";
            } else if (lastCharWasDiatric === true) {
              ch = diatricMap[diatricString] + charMap[ch];
              diatricString = "";
            } else {
              ch = lastCharWasSymbol && charMap[ch].match(/[A-Za-z0-9]/) ? " " + charMap[ch] : charMap[ch];
            }
            lastCharWasSymbol = false;
            lastCharWasDiatric = false;
          } else if (ch in diatricMap) {
            diatricString += ch;
            ch = "";
            if (i === l - 1) {
              ch = diatricMap[diatricString];
            }
            lastCharWasDiatric = true;
          } else if (
            // process symbol chars
            symbol[ch] && !(uricFlag && uricChars.indexOf(ch) !== -1) && !(uricNoSlashFlag && uricNoSlashChars.indexOf(ch) !== -1)
          ) {
            ch = lastCharWasSymbol || result2.substr(-1).match(/[A-Za-z0-9]/) ? separator + symbol[ch] : symbol[ch];
            ch += input[i + 1] !== void 0 && input[i + 1].match(/[A-Za-z0-9]/) ? separator : "";
            lastCharWasSymbol = true;
          } else {
            if (lastCharWasDiatric === true) {
              ch = diatricMap[diatricString] + ch;
              diatricString = "";
              lastCharWasDiatric = false;
            } else if (lastCharWasSymbol && (/[A-Za-z0-9]/.test(ch) || result2.substr(-1).match(/A-Za-z0-9]/))) {
              ch = " " + ch;
            }
            lastCharWasSymbol = false;
          }
          result2 += ch.replace(new RegExp("[^\\w\\s" + allowedChars + "_-]", "g"), separator);
        }
        if (titleCase) {
          result2 = result2.replace(/(\w)(\S*)/g, function(_, i2, r) {
            var j = i2.toUpperCase() + (r !== null ? r : "");
            return Object.keys(customReplacements).indexOf(j.toLowerCase()) < 0 ? j : j.toLowerCase();
          });
        }
        result2 = result2.replace(/\s+/g, separator).replace(new RegExp("\\" + separator + "+", "g"), separator).replace(new RegExp("(^\\" + separator + "+|\\" + separator + "+$)", "g"), "");
        if (truncate2 && result2.length > truncate2) {
          lucky = result2.charAt(truncate2) === separator;
          result2 = result2.slice(0, truncate2);
          if (!lucky) {
            result2 = result2.slice(0, result2.lastIndexOf(separator));
          }
        }
        if (!maintainCase && !titleCase) {
          result2 = result2.toLowerCase();
        }
        return result2;
      };
      var createSlug = function createSlug2(opts) {
        return function getSlugWithConfig(input) {
          return getSlug(input, opts);
        };
      };
      var escapeChars = function escapeChars2(input) {
        return input.replace(/[-\\^$*+?.()|[\]{}\/]/g, "\\$&");
      };
      var isReplacedCustomChar = function(ch, customReplacements) {
        for (var c in customReplacements) {
          if (customReplacements[c] === ch) {
            return true;
          }
        }
      };
      if (typeof module2 !== "undefined" && module2.exports) {
        module2.exports = getSlug;
        module2.exports.createSlug = createSlug;
      } else if (typeof define !== "undefined" && define.amd) {
        define([], function() {
          return getSlug;
        });
      } else {
        try {
          if (root2.getSlug || root2.createSlug) {
            throw "speakingurl: globals exists /(getSlug|createSlug)/";
          } else {
            root2.getSlug = getSlug;
            root2.createSlug = createSlug;
          }
        } catch (e) {
        }
      }
    })(exports2);
  }
});
var require_speakingurl2 = __commonJS3({
  "../../node_modules/.pnpm/speakingurl@14.0.1/node_modules/speakingurl/index.js"(exports2, module2) {
    "use strict";
    init_esm_shims2();
    module2.exports = require_speakingurl();
  }
});
init_esm_shims2();
init_esm_shims2();
init_esm_shims2();
init_esm_shims2();
init_esm_shims2();
init_esm_shims2();
init_esm_shims2();
init_esm_shims2();
function getComponentTypeName(options) {
  var _a25;
  const name = options.name || options._componentTag || options.__VUE_DEVTOOLS_COMPONENT_GUSSED_NAME__ || options.__name;
  if (name === "index" && ((_a25 = options.__file) == null ? void 0 : _a25.endsWith("index.vue"))) {
    return "";
  }
  return name;
}
function getComponentFileName(options) {
  const file = options.__file;
  if (file)
    return classify(basename(file, ".vue"));
}
function saveComponentGussedName(instance, name) {
  instance.type.__VUE_DEVTOOLS_COMPONENT_GUSSED_NAME__ = name;
  return name;
}
function getAppRecord(instance) {
  if (instance.__VUE_DEVTOOLS_NEXT_APP_RECORD__)
    return instance.__VUE_DEVTOOLS_NEXT_APP_RECORD__;
  else if (instance.root)
    return instance.appContext.app.__VUE_DEVTOOLS_NEXT_APP_RECORD__;
}
function isFragment(instance) {
  var _a25, _b25;
  const subTreeType = (_a25 = instance.subTree) == null ? void 0 : _a25.type;
  const appRecord = getAppRecord(instance);
  if (appRecord) {
    return ((_b25 = appRecord == null ? void 0 : appRecord.types) == null ? void 0 : _b25.Fragment) === subTreeType;
  }
  return false;
}
function getInstanceName(instance) {
  var _a25, _b25, _c;
  const name = getComponentTypeName((instance == null ? void 0 : instance.type) || {});
  if (name)
    return name;
  if ((instance == null ? void 0 : instance.root) === instance)
    return "Root";
  for (const key in (_b25 = (_a25 = instance.parent) == null ? void 0 : _a25.type) == null ? void 0 : _b25.components) {
    if (instance.parent.type.components[key] === (instance == null ? void 0 : instance.type))
      return saveComponentGussedName(instance, key);
  }
  for (const key in (_c = instance.appContext) == null ? void 0 : _c.components) {
    if (instance.appContext.components[key] === (instance == null ? void 0 : instance.type))
      return saveComponentGussedName(instance, key);
  }
  const fileName = getComponentFileName((instance == null ? void 0 : instance.type) || {});
  if (fileName)
    return fileName;
  return "Anonymous Component";
}
function getUniqueComponentId(instance) {
  var _a25, _b25, _c;
  const appId = (_c = (_b25 = (_a25 = instance == null ? void 0 : instance.appContext) == null ? void 0 : _a25.app) == null ? void 0 : _b25.__VUE_DEVTOOLS_NEXT_APP_RECORD_ID__) != null ? _c : 0;
  const instanceId = instance === (instance == null ? void 0 : instance.root) ? "root" : instance.uid;
  return `${appId}:${instanceId}`;
}
function getComponentInstance(appRecord, instanceId) {
  instanceId = instanceId || `${appRecord.id}:root`;
  const instance = appRecord.instanceMap.get(instanceId);
  return instance || appRecord.instanceMap.get(":root");
}
function createRect() {
  const rect = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    get width() {
      return rect.right - rect.left;
    },
    get height() {
      return rect.bottom - rect.top;
    }
  };
  return rect;
}
var range2;
function getTextRect(node) {
  if (!range2)
    range2 = document.createRange();
  range2.selectNode(node);
  return range2.getBoundingClientRect();
}
function getFragmentRect(vnode) {
  const rect = createRect();
  if (!vnode.children)
    return rect;
  for (let i = 0, l = vnode.children.length; i < l; i++) {
    const childVnode = vnode.children[i];
    let childRect;
    if (childVnode.component) {
      childRect = getComponentBoundingRect(childVnode.component);
    } else if (childVnode.el) {
      const el = childVnode.el;
      if (el.nodeType === 1 || el.getBoundingClientRect)
        childRect = el.getBoundingClientRect();
      else if (el.nodeType === 3 && el.data.trim())
        childRect = getTextRect(el);
    }
    if (childRect)
      mergeRects(rect, childRect);
  }
  return rect;
}
function mergeRects(a, b) {
  if (!a.top || b.top < a.top)
    a.top = b.top;
  if (!a.bottom || b.bottom > a.bottom)
    a.bottom = b.bottom;
  if (!a.left || b.left < a.left)
    a.left = b.left;
  if (!a.right || b.right > a.right)
    a.right = b.right;
  return a;
}
var DEFAULT_RECT = {
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  width: 0,
  height: 0
};
function getComponentBoundingRect(instance) {
  const el = instance.subTree.el;
  if (typeof window === "undefined") {
    return DEFAULT_RECT;
  }
  if (isFragment(instance))
    return getFragmentRect(instance.subTree);
  else if ((el == null ? void 0 : el.nodeType) === 1)
    return el == null ? void 0 : el.getBoundingClientRect();
  else if (instance.subTree.component)
    return getComponentBoundingRect(instance.subTree.component);
  else
    return DEFAULT_RECT;
}
init_esm_shims2();
function getRootElementsFromComponentInstance(instance) {
  if (isFragment(instance))
    return getFragmentRootElements(instance.subTree);
  if (!instance.subTree)
    return [];
  return [instance.subTree.el];
}
function getFragmentRootElements(vnode) {
  if (!vnode.children)
    return [];
  const list = [];
  vnode.children.forEach((childVnode) => {
    if (childVnode.component)
      list.push(...getRootElementsFromComponentInstance(childVnode.component));
    else if (childVnode == null ? void 0 : childVnode.el)
      list.push(childVnode.el);
  });
  return list;
}
var CONTAINER_ELEMENT_ID = "__vue-devtools-component-inspector__";
var CARD_ELEMENT_ID = "__vue-devtools-component-inspector__card__";
var COMPONENT_NAME_ELEMENT_ID = "__vue-devtools-component-inspector__name__";
var INDICATOR_ELEMENT_ID = "__vue-devtools-component-inspector__indicator__";
var containerStyles = {
  display: "block",
  zIndex: 2147483640,
  position: "fixed",
  backgroundColor: "#42b88325",
  border: "1px solid #42b88350",
  borderRadius: "5px",
  transition: "all 0.1s ease-in",
  pointerEvents: "none"
};
var cardStyles = {
  fontFamily: "Arial, Helvetica, sans-serif",
  padding: "5px 8px",
  borderRadius: "4px",
  textAlign: "left",
  position: "absolute",
  left: 0,
  color: "#e9e9e9",
  fontSize: "14px",
  fontWeight: 600,
  lineHeight: "24px",
  backgroundColor: "#42b883",
  boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)"
};
var indicatorStyles = {
  display: "inline-block",
  fontWeight: 400,
  fontStyle: "normal",
  fontSize: "12px",
  opacity: 0.7
};
function getContainerElement() {
  return document.getElementById(CONTAINER_ELEMENT_ID);
}
function getCardElement() {
  return document.getElementById(CARD_ELEMENT_ID);
}
function getIndicatorElement() {
  return document.getElementById(INDICATOR_ELEMENT_ID);
}
function getNameElement() {
  return document.getElementById(COMPONENT_NAME_ELEMENT_ID);
}
function getStyles(bounds) {
  return {
    left: `${Math.round(bounds.left * 100) / 100}px`,
    top: `${Math.round(bounds.top * 100) / 100}px`,
    width: `${Math.round(bounds.width * 100) / 100}px`,
    height: `${Math.round(bounds.height * 100) / 100}px`
  };
}
function create2(options) {
  var _a25;
  const containerEl = document.createElement("div");
  containerEl.id = (_a25 = options.elementId) != null ? _a25 : CONTAINER_ELEMENT_ID;
  Object.assign(containerEl.style, {
    ...containerStyles,
    ...getStyles(options.bounds),
    ...options.style
  });
  const cardEl = document.createElement("span");
  cardEl.id = CARD_ELEMENT_ID;
  Object.assign(cardEl.style, {
    ...cardStyles,
    top: options.bounds.top < 35 ? 0 : "-35px"
  });
  const nameEl = document.createElement("span");
  nameEl.id = COMPONENT_NAME_ELEMENT_ID;
  nameEl.innerHTML = `&lt;${options.name}&gt;&nbsp;&nbsp;`;
  const indicatorEl = document.createElement("i");
  indicatorEl.id = INDICATOR_ELEMENT_ID;
  indicatorEl.innerHTML = `${Math.round(options.bounds.width * 100) / 100} x ${Math.round(options.bounds.height * 100) / 100}`;
  Object.assign(indicatorEl.style, indicatorStyles);
  cardEl.appendChild(nameEl);
  cardEl.appendChild(indicatorEl);
  containerEl.appendChild(cardEl);
  document.body.appendChild(containerEl);
  return containerEl;
}
function update2(options) {
  const containerEl = getContainerElement();
  const cardEl = getCardElement();
  const nameEl = getNameElement();
  const indicatorEl = getIndicatorElement();
  if (containerEl) {
    Object.assign(containerEl.style, {
      ...containerStyles,
      ...getStyles(options.bounds)
    });
    Object.assign(cardEl.style, {
      top: options.bounds.top < 35 ? 0 : "-35px"
    });
    nameEl.innerHTML = `&lt;${options.name}&gt;&nbsp;&nbsp;`;
    indicatorEl.innerHTML = `${Math.round(options.bounds.width * 100) / 100} x ${Math.round(options.bounds.height * 100) / 100}`;
  }
}
function highlight(instance) {
  const bounds = getComponentBoundingRect(instance);
  if (!bounds.width && !bounds.height)
    return;
  const name = getInstanceName(instance);
  const container = getContainerElement();
  container ? update2({ bounds, name }) : create2({ bounds, name });
}
function unhighlight() {
  const el = getContainerElement();
  if (el)
    el.style.display = "none";
}
var inspectInstance = null;
function inspectFn(e) {
  const target22 = e.target;
  if (target22) {
    const instance = target22.__vueParentComponent;
    if (instance) {
      inspectInstance = instance;
      const el = instance.vnode.el;
      if (el) {
        const bounds = getComponentBoundingRect(instance);
        const name = getInstanceName(instance);
        const container = getContainerElement();
        container ? update2({ bounds, name }) : create2({ bounds, name });
      }
    }
  }
}
function selectComponentFn(e, cb) {
  e.preventDefault();
  e.stopPropagation();
  if (inspectInstance) {
    const uniqueComponentId = getUniqueComponentId(inspectInstance);
    cb(uniqueComponentId);
  }
}
var inspectComponentHighLighterSelectFn = null;
function cancelInspectComponentHighLighter() {
  unhighlight();
  window.removeEventListener("mouseover", inspectFn);
  window.removeEventListener("click", inspectComponentHighLighterSelectFn, true);
  inspectComponentHighLighterSelectFn = null;
}
function inspectComponentHighLighter() {
  window.addEventListener("mouseover", inspectFn);
  return new Promise((resolve) => {
    function onSelect(e) {
      e.preventDefault();
      e.stopPropagation();
      selectComponentFn(e, (id) => {
        window.removeEventListener("click", onSelect, true);
        inspectComponentHighLighterSelectFn = null;
        window.removeEventListener("mouseover", inspectFn);
        const el = getContainerElement();
        if (el)
          el.style.display = "none";
        resolve(JSON.stringify({ id }));
      });
    }
    inspectComponentHighLighterSelectFn = onSelect;
    window.addEventListener("click", onSelect, true);
  });
}
function scrollToComponent(options) {
  const instance = getComponentInstance(activeAppRecord.value, options.id);
  if (instance) {
    const [el] = getRootElementsFromComponentInstance(instance);
    if (typeof el.scrollIntoView === "function") {
      el.scrollIntoView({
        behavior: "smooth"
      });
    } else {
      const bounds = getComponentBoundingRect(instance);
      const scrollTarget = document.createElement("div");
      const styles = {
        ...getStyles(bounds),
        position: "absolute"
      };
      Object.assign(scrollTarget.style, styles);
      document.body.appendChild(scrollTarget);
      scrollTarget.scrollIntoView({
        behavior: "smooth"
      });
      setTimeout(() => {
        document.body.removeChild(scrollTarget);
      }, 2e3);
    }
    setTimeout(() => {
      const bounds = getComponentBoundingRect(instance);
      if (bounds.width || bounds.height) {
        const name = getInstanceName(instance);
        const el2 = getContainerElement();
        el2 ? update2({ ...options, name, bounds }) : create2({ ...options, name, bounds });
        setTimeout(() => {
          if (el2)
            el2.style.display = "none";
        }, 1500);
      }
    }, 1200);
  }
}
init_esm_shims2();
var _a2;
var _b;
(_b = (_a2 = target).__VUE_DEVTOOLS_COMPONENT_INSPECTOR_ENABLED__) != null ? _b : _a2.__VUE_DEVTOOLS_COMPONENT_INSPECTOR_ENABLED__ = true;
function waitForInspectorInit(cb) {
  let total = 0;
  const timer = setInterval(() => {
    if (target.__VUE_INSPECTOR__) {
      clearInterval(timer);
      total += 30;
      cb();
    }
    if (total >= /* 5s */
    5e3)
      clearInterval(timer);
  }, 30);
}
function setupInspector() {
  const inspector = target.__VUE_INSPECTOR__;
  const _openInEditor = inspector.openInEditor;
  inspector.openInEditor = async (...params) => {
    inspector.disable();
    _openInEditor(...params);
  };
}
function getComponentInspector() {
  return new Promise((resolve) => {
    function setup() {
      setupInspector();
      resolve(target.__VUE_INSPECTOR__);
    }
    if (!target.__VUE_INSPECTOR__) {
      waitForInspectorInit(() => {
        setup();
      });
    } else {
      setup();
    }
  });
}
init_esm_shims2();
init_esm_shims2();
function isReadonly(value) {
  return !!(value && value[
    "__v_isReadonly"
    /* IS_READONLY */
  ]);
}
function isReactive(value) {
  if (isReadonly(value)) {
    return isReactive(value[
      "__v_raw"
      /* RAW */
    ]);
  }
  return !!(value && value[
    "__v_isReactive"
    /* IS_REACTIVE */
  ]);
}
function isRef2(r) {
  return !!(r && r.__v_isRef === true);
}
function toRaw(observed) {
  const raw = observed && observed[
    "__v_raw"
    /* RAW */
  ];
  return raw ? toRaw(raw) : observed;
}
var Fragment = Symbol.for("v-fgt");
var StateEditor = class {
  constructor() {
    this.refEditor = new RefStateEditor();
  }
  set(object, path, value, cb) {
    const sections = Array.isArray(path) ? path : path.split(".");
    const markRef = false;
    while (sections.length > 1) {
      const section = sections.shift();
      if (object instanceof Map)
        object = object.get(section);
      else if (object instanceof Set)
        object = Array.from(object.values())[section];
      else
        object = object[section];
      if (this.refEditor.isRef(object))
        object = this.refEditor.get(object);
    }
    const field = sections[0];
    const item = this.refEditor.get(object)[field];
    if (cb) {
      cb(object, field, value);
    } else {
      if (this.refEditor.isRef(item))
        this.refEditor.set(item, value);
      else if (markRef)
        object[field] = value;
      else
        object[field] = value;
    }
  }
  get(object, path) {
    const sections = Array.isArray(path) ? path : path.split(".");
    for (let i = 0; i < sections.length; i++) {
      if (object instanceof Map)
        object = object.get(sections[i]);
      else
        object = object[sections[i]];
      if (this.refEditor.isRef(object))
        object = this.refEditor.get(object);
      if (!object)
        return void 0;
    }
    return object;
  }
  has(object, path, parent2 = false) {
    if (typeof object === "undefined")
      return false;
    const sections = Array.isArray(path) ? path.slice() : path.split(".");
    const size2 = !parent2 ? 1 : 2;
    while (object && sections.length > size2) {
      const section = sections.shift();
      object = object[section];
      if (this.refEditor.isRef(object))
        object = this.refEditor.get(object);
    }
    return object != null && Object.prototype.hasOwnProperty.call(object, sections[0]);
  }
  createDefaultSetCallback(state) {
    return (object, field, value) => {
      if (state.remove || state.newKey) {
        if (Array.isArray(object))
          object.splice(field, 1);
        else if (toRaw(object) instanceof Map)
          object.delete(field);
        else if (toRaw(object) instanceof Set)
          object.delete(Array.from(object.values())[field]);
        else
          Reflect.deleteProperty(object, field);
      }
      if (!state.remove) {
        const target22 = object[state.newKey || field];
        if (this.refEditor.isRef(target22))
          this.refEditor.set(target22, value);
        else if (toRaw(object) instanceof Map)
          object.set(state.newKey || field, value);
        else if (toRaw(object) instanceof Set)
          object.add(value);
        else
          object[state.newKey || field] = value;
      }
    };
  }
};
var RefStateEditor = class {
  set(ref47, value) {
    if (isRef2(ref47)) {
      ref47.value = value;
    } else {
      if (ref47 instanceof Set && Array.isArray(value)) {
        ref47.clear();
        value.forEach((v) => ref47.add(v));
        return;
      }
      const currentKeys = Object.keys(value);
      if (ref47 instanceof Map) {
        const previousKeysSet2 = new Set(ref47.keys());
        currentKeys.forEach((key) => {
          ref47.set(key, Reflect.get(value, key));
          previousKeysSet2.delete(key);
        });
        previousKeysSet2.forEach((key) => ref47.delete(key));
        return;
      }
      const previousKeysSet = new Set(Object.keys(ref47));
      currentKeys.forEach((key) => {
        Reflect.set(ref47, key, Reflect.get(value, key));
        previousKeysSet.delete(key);
      });
      previousKeysSet.forEach((key) => Reflect.deleteProperty(ref47, key));
    }
  }
  get(ref47) {
    return isRef2(ref47) ? ref47.value : ref47;
  }
  isRef(ref47) {
    return isRef2(ref47) || isReactive(ref47);
  }
};
var stateEditor = new StateEditor();
init_esm_shims2();
init_esm_shims2();
init_esm_shims2();
var TIMELINE_LAYERS_STATE_STORAGE_ID = "__VUE_DEVTOOLS_KIT_TIMELINE_LAYERS_STATE__";
function getTimelineLayersStateFromStorage() {
  if (!isBrowser2 || typeof localStorage === "undefined" || localStorage === null) {
    return {
      recordingState: false,
      mouseEventEnabled: false,
      keyboardEventEnabled: false,
      componentEventEnabled: false,
      performanceEventEnabled: false,
      selected: ""
    };
  }
  const state = localStorage.getItem(TIMELINE_LAYERS_STATE_STORAGE_ID);
  return state ? JSON.parse(state) : {
    recordingState: false,
    mouseEventEnabled: false,
    keyboardEventEnabled: false,
    componentEventEnabled: false,
    performanceEventEnabled: false,
    selected: ""
  };
}
init_esm_shims2();
init_esm_shims2();
init_esm_shims2();
var _a22;
var _b2;
(_b2 = (_a22 = target).__VUE_DEVTOOLS_KIT_TIMELINE_LAYERS) != null ? _b2 : _a22.__VUE_DEVTOOLS_KIT_TIMELINE_LAYERS = [];
var devtoolsTimelineLayers = new Proxy(target.__VUE_DEVTOOLS_KIT_TIMELINE_LAYERS, {
  get(target22, prop, receiver) {
    return Reflect.get(target22, prop, receiver);
  }
});
function addTimelineLayer(options, descriptor) {
  devtoolsState.timelineLayersState[descriptor.id] = false;
  devtoolsTimelineLayers.push({
    ...options,
    descriptorId: descriptor.id,
    appRecord: getAppRecord(descriptor.app)
  });
}
var _a3;
var _b3;
(_b3 = (_a3 = target).__VUE_DEVTOOLS_KIT_INSPECTOR__) != null ? _b3 : _a3.__VUE_DEVTOOLS_KIT_INSPECTOR__ = [];
var devtoolsInspector = new Proxy(target.__VUE_DEVTOOLS_KIT_INSPECTOR__, {
  get(target22, prop, receiver) {
    return Reflect.get(target22, prop, receiver);
  }
});
var callInspectorUpdatedHook = debounce2(() => {
  devtoolsContext.hooks.callHook("sendInspectorToClient", getActiveInspectors());
});
function addInspector(inspector, descriptor) {
  var _a25, _b25;
  devtoolsInspector.push({
    options: inspector,
    descriptor,
    treeFilterPlaceholder: (_a25 = inspector.treeFilterPlaceholder) != null ? _a25 : "Search tree...",
    stateFilterPlaceholder: (_b25 = inspector.stateFilterPlaceholder) != null ? _b25 : "Search state...",
    treeFilter: "",
    selectedNodeId: "",
    appRecord: getAppRecord(descriptor.app)
  });
  callInspectorUpdatedHook();
}
function getActiveInspectors() {
  return devtoolsInspector.filter((inspector) => inspector.descriptor.app === activeAppRecord.value.app).filter((inspector) => inspector.descriptor.id !== "components").map((inspector) => {
    var _a25;
    const descriptor = inspector.descriptor;
    const options = inspector.options;
    return {
      id: options.id,
      label: options.label,
      logo: descriptor.logo,
      icon: `custom-ic-baseline-${(_a25 = options == null ? void 0 : options.icon) == null ? void 0 : _a25.replace(/_/g, "-")}`,
      packageName: descriptor.packageName,
      homepage: descriptor.homepage,
      pluginId: descriptor.id
    };
  });
}
function getInspector(id, app) {
  return devtoolsInspector.find((inspector) => inspector.options.id === id && (app ? inspector.descriptor.app === app : true));
}
var DevToolsV6PluginAPIHookKeys = ((DevToolsV6PluginAPIHookKeys2) => {
  DevToolsV6PluginAPIHookKeys2["VISIT_COMPONENT_TREE"] = "visitComponentTree";
  DevToolsV6PluginAPIHookKeys2["INSPECT_COMPONENT"] = "inspectComponent";
  DevToolsV6PluginAPIHookKeys2["EDIT_COMPONENT_STATE"] = "editComponentState";
  DevToolsV6PluginAPIHookKeys2["GET_INSPECTOR_TREE"] = "getInspectorTree";
  DevToolsV6PluginAPIHookKeys2["GET_INSPECTOR_STATE"] = "getInspectorState";
  DevToolsV6PluginAPIHookKeys2["EDIT_INSPECTOR_STATE"] = "editInspectorState";
  DevToolsV6PluginAPIHookKeys2["INSPECT_TIMELINE_EVENT"] = "inspectTimelineEvent";
  DevToolsV6PluginAPIHookKeys2["TIMELINE_CLEARED"] = "timelineCleared";
  DevToolsV6PluginAPIHookKeys2["SET_PLUGIN_SETTINGS"] = "setPluginSettings";
  return DevToolsV6PluginAPIHookKeys2;
})(DevToolsV6PluginAPIHookKeys || {});
var DevToolsContextHookKeys = ((DevToolsContextHookKeys2) => {
  DevToolsContextHookKeys2["ADD_INSPECTOR"] = "addInspector";
  DevToolsContextHookKeys2["SEND_INSPECTOR_TREE"] = "sendInspectorTree";
  DevToolsContextHookKeys2["SEND_INSPECTOR_STATE"] = "sendInspectorState";
  DevToolsContextHookKeys2["CUSTOM_INSPECTOR_SELECT_NODE"] = "customInspectorSelectNode";
  DevToolsContextHookKeys2["TIMELINE_LAYER_ADDED"] = "timelineLayerAdded";
  DevToolsContextHookKeys2["TIMELINE_EVENT_ADDED"] = "timelineEventAdded";
  DevToolsContextHookKeys2["GET_COMPONENT_INSTANCES"] = "getComponentInstances";
  DevToolsContextHookKeys2["GET_COMPONENT_BOUNDS"] = "getComponentBounds";
  DevToolsContextHookKeys2["GET_COMPONENT_NAME"] = "getComponentName";
  DevToolsContextHookKeys2["COMPONENT_HIGHLIGHT"] = "componentHighlight";
  DevToolsContextHookKeys2["COMPONENT_UNHIGHLIGHT"] = "componentUnhighlight";
  return DevToolsContextHookKeys2;
})(DevToolsContextHookKeys || {});
var DevToolsMessagingHookKeys = ((DevToolsMessagingHookKeys2) => {
  DevToolsMessagingHookKeys2["SEND_INSPECTOR_TREE_TO_CLIENT"] = "sendInspectorTreeToClient";
  DevToolsMessagingHookKeys2["SEND_INSPECTOR_STATE_TO_CLIENT"] = "sendInspectorStateToClient";
  DevToolsMessagingHookKeys2["SEND_TIMELINE_EVENT_TO_CLIENT"] = "sendTimelineEventToClient";
  DevToolsMessagingHookKeys2["SEND_INSPECTOR_TO_CLIENT"] = "sendInspectorToClient";
  DevToolsMessagingHookKeys2["SEND_ACTIVE_APP_UNMOUNTED_TO_CLIENT"] = "sendActiveAppUpdatedToClient";
  DevToolsMessagingHookKeys2["DEVTOOLS_STATE_UPDATED"] = "devtoolsStateUpdated";
  DevToolsMessagingHookKeys2["DEVTOOLS_CONNECTED_UPDATED"] = "devtoolsConnectedUpdated";
  DevToolsMessagingHookKeys2["ROUTER_INFO_UPDATED"] = "routerInfoUpdated";
  return DevToolsMessagingHookKeys2;
})(DevToolsMessagingHookKeys || {});
function createDevToolsCtxHooks() {
  const hooks2 = createHooks();
  hooks2.hook("addInspector", ({ inspector, plugin }) => {
    addInspector(inspector, plugin.descriptor);
  });
  const debounceSendInspectorTree = debounce2(async ({ inspectorId, plugin }) => {
    var _a25;
    if (!inspectorId || !((_a25 = plugin == null ? void 0 : plugin.descriptor) == null ? void 0 : _a25.app) || devtoolsState.highPerfModeEnabled)
      return;
    const inspector = getInspector(inspectorId, plugin.descriptor.app);
    const _payload = {
      app: plugin.descriptor.app,
      inspectorId,
      filter: (inspector == null ? void 0 : inspector.treeFilter) || "",
      rootNodes: []
    };
    await new Promise((resolve) => {
      hooks2.callHookWith(
        async (callbacks) => {
          await Promise.all(callbacks.map((cb) => cb(_payload)));
          resolve();
        },
        "getInspectorTree"
        /* GET_INSPECTOR_TREE */
      );
    });
    hooks2.callHookWith(
      async (callbacks) => {
        await Promise.all(callbacks.map((cb) => cb({
          inspectorId,
          rootNodes: _payload.rootNodes
        })));
      },
      "sendInspectorTreeToClient"
      /* SEND_INSPECTOR_TREE_TO_CLIENT */
    );
  }, 120);
  hooks2.hook("sendInspectorTree", debounceSendInspectorTree);
  const debounceSendInspectorState = debounce2(async ({ inspectorId, plugin }) => {
    var _a25;
    if (!inspectorId || !((_a25 = plugin == null ? void 0 : plugin.descriptor) == null ? void 0 : _a25.app) || devtoolsState.highPerfModeEnabled)
      return;
    const inspector = getInspector(inspectorId, plugin.descriptor.app);
    const _payload = {
      app: plugin.descriptor.app,
      inspectorId,
      nodeId: (inspector == null ? void 0 : inspector.selectedNodeId) || "",
      state: null
    };
    const ctx = {
      currentTab: `custom-inspector:${inspectorId}`
    };
    if (_payload.nodeId) {
      await new Promise((resolve) => {
        hooks2.callHookWith(
          async (callbacks) => {
            await Promise.all(callbacks.map((cb) => cb(_payload, ctx)));
            resolve();
          },
          "getInspectorState"
          /* GET_INSPECTOR_STATE */
        );
      });
    }
    hooks2.callHookWith(
      async (callbacks) => {
        await Promise.all(callbacks.map((cb) => cb({
          inspectorId,
          nodeId: _payload.nodeId,
          state: _payload.state
        })));
      },
      "sendInspectorStateToClient"
      /* SEND_INSPECTOR_STATE_TO_CLIENT */
    );
  }, 120);
  hooks2.hook("sendInspectorState", debounceSendInspectorState);
  hooks2.hook("customInspectorSelectNode", ({ inspectorId, nodeId, plugin }) => {
    const inspector = getInspector(inspectorId, plugin.descriptor.app);
    if (!inspector)
      return;
    inspector.selectedNodeId = nodeId;
  });
  hooks2.hook("timelineLayerAdded", ({ options, plugin }) => {
    addTimelineLayer(options, plugin.descriptor);
  });
  hooks2.hook("timelineEventAdded", ({ options, plugin }) => {
    var _a25;
    const internalLayerIds = ["performance", "component-event", "keyboard", "mouse"];
    if (devtoolsState.highPerfModeEnabled || !((_a25 = devtoolsState.timelineLayersState) == null ? void 0 : _a25[plugin.descriptor.id]) && !internalLayerIds.includes(options.layerId))
      return;
    hooks2.callHookWith(
      async (callbacks) => {
        await Promise.all(callbacks.map((cb) => cb(options)));
      },
      "sendTimelineEventToClient"
      /* SEND_TIMELINE_EVENT_TO_CLIENT */
    );
  });
  hooks2.hook("getComponentInstances", async ({ app }) => {
    const appRecord = app.__VUE_DEVTOOLS_NEXT_APP_RECORD__;
    if (!appRecord)
      return null;
    const appId = appRecord.id.toString();
    const instances = [...appRecord.instanceMap].filter(([key]) => key.split(":")[0] === appId).map(([, instance]) => instance);
    return instances;
  });
  hooks2.hook("getComponentBounds", async ({ instance }) => {
    const bounds = getComponentBoundingRect(instance);
    return bounds;
  });
  hooks2.hook("getComponentName", ({ instance }) => {
    const name = getInstanceName(instance);
    return name;
  });
  hooks2.hook("componentHighlight", ({ uid }) => {
    const instance = activeAppRecord.value.instanceMap.get(uid);
    if (instance) {
      highlight(instance);
    }
  });
  hooks2.hook("componentUnhighlight", () => {
    unhighlight();
  });
  return hooks2;
}
var _a4;
var _b4;
(_b4 = (_a4 = target).__VUE_DEVTOOLS_KIT_APP_RECORDS__) != null ? _b4 : _a4.__VUE_DEVTOOLS_KIT_APP_RECORDS__ = [];
var _a5;
var _b5;
(_b5 = (_a5 = target).__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD__) != null ? _b5 : _a5.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD__ = {};
var _a6;
var _b6;
(_b6 = (_a6 = target).__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD_ID__) != null ? _b6 : _a6.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD_ID__ = "";
var _a7;
var _b7;
(_b7 = (_a7 = target).__VUE_DEVTOOLS_KIT_CUSTOM_TABS__) != null ? _b7 : _a7.__VUE_DEVTOOLS_KIT_CUSTOM_TABS__ = [];
var _a8;
var _b8;
(_b8 = (_a8 = target).__VUE_DEVTOOLS_KIT_CUSTOM_COMMANDS__) != null ? _b8 : _a8.__VUE_DEVTOOLS_KIT_CUSTOM_COMMANDS__ = [];
var STATE_KEY = "__VUE_DEVTOOLS_KIT_GLOBAL_STATE__";
function initStateFactory() {
  return {
    connected: false,
    clientConnected: false,
    vitePluginDetected: true,
    appRecords: [],
    activeAppRecordId: "",
    tabs: [],
    commands: [],
    highPerfModeEnabled: true,
    devtoolsClientDetected: {},
    perfUniqueGroupId: 0,
    timelineLayersState: getTimelineLayersStateFromStorage()
  };
}
var _a9;
var _b9;
(_b9 = (_a9 = target)[STATE_KEY]) != null ? _b9 : _a9[STATE_KEY] = initStateFactory();
var callStateUpdatedHook = debounce2((state) => {
  devtoolsContext.hooks.callHook("devtoolsStateUpdated", { state });
});
var callConnectedUpdatedHook = debounce2((state, oldState) => {
  devtoolsContext.hooks.callHook("devtoolsConnectedUpdated", { state, oldState });
});
var devtoolsAppRecords = new Proxy(target.__VUE_DEVTOOLS_KIT_APP_RECORDS__, {
  get(_target, prop, receiver) {
    if (prop === "value")
      return target.__VUE_DEVTOOLS_KIT_APP_RECORDS__;
    return target.__VUE_DEVTOOLS_KIT_APP_RECORDS__[prop];
  }
});
var activeAppRecord = new Proxy(target.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD__, {
  get(_target, prop, receiver) {
    if (prop === "value")
      return target.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD__;
    else if (prop === "id")
      return target.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD_ID__;
    return target.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD__[prop];
  }
});
function updateAllStates() {
  callStateUpdatedHook({
    ...target[STATE_KEY],
    appRecords: devtoolsAppRecords.value,
    activeAppRecordId: activeAppRecord.id,
    tabs: target.__VUE_DEVTOOLS_KIT_CUSTOM_TABS__,
    commands: target.__VUE_DEVTOOLS_KIT_CUSTOM_COMMANDS__
  });
}
function setActiveAppRecord(app) {
  target.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD__ = app;
  updateAllStates();
}
function setActiveAppRecordId(id) {
  target.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD_ID__ = id;
  updateAllStates();
}
var devtoolsState = new Proxy(target[STATE_KEY], {
  get(target22, property2) {
    if (property2 === "appRecords") {
      return devtoolsAppRecords;
    } else if (property2 === "activeAppRecordId") {
      return activeAppRecord.id;
    } else if (property2 === "tabs") {
      return target.__VUE_DEVTOOLS_KIT_CUSTOM_TABS__;
    } else if (property2 === "commands") {
      return target.__VUE_DEVTOOLS_KIT_CUSTOM_COMMANDS__;
    }
    return target[STATE_KEY][property2];
  },
  deleteProperty(target22, property2) {
    delete target22[property2];
    return true;
  },
  set(target22, property2, value) {
    const oldState = { ...target[STATE_KEY] };
    target22[property2] = value;
    target[STATE_KEY][property2] = value;
    return true;
  }
});
function openInEditor(options = {}) {
  var _a25, _b25, _c;
  const { file, host, baseUrl = window.location.origin, line = 0, column = 0 } = options;
  if (file) {
    if (host === "chrome-extension") {
      const fileName = file.replace(/\\/g, "\\\\");
      const _baseUrl = (_b25 = (_a25 = window.VUE_DEVTOOLS_CONFIG) == null ? void 0 : _a25.openInEditorHost) != null ? _b25 : "/";
      fetch(`${_baseUrl}__open-in-editor?file=${encodeURI(file)}`).then((response) => {
        if (!response.ok) {
          const msg = `Opening component ${fileName} failed`;
          console.log(`%c${msg}`, "color:red");
        }
      });
    } else if (devtoolsState.vitePluginDetected) {
      const _baseUrl = (_c = target.__VUE_DEVTOOLS_OPEN_IN_EDITOR_BASE_URL__) != null ? _c : baseUrl;
      target.__VUE_INSPECTOR__.openInEditor(_baseUrl, file, line, column);
    }
  }
}
init_esm_shims2();
init_esm_shims2();
init_esm_shims2();
init_esm_shims2();
init_esm_shims2();
var _a10;
var _b10;
(_b10 = (_a10 = target).__VUE_DEVTOOLS_KIT_PLUGIN_BUFFER__) != null ? _b10 : _a10.__VUE_DEVTOOLS_KIT_PLUGIN_BUFFER__ = [];
var devtoolsPluginBuffer = new Proxy(target.__VUE_DEVTOOLS_KIT_PLUGIN_BUFFER__, {
  get(target22, prop, receiver) {
    return Reflect.get(target22, prop, receiver);
  }
});
function _getSettings(settings) {
  const _settings = {};
  Object.keys(settings).forEach((key) => {
    _settings[key] = settings[key].defaultValue;
  });
  return _settings;
}
function getPluginLocalKey(pluginId2) {
  return `__VUE_DEVTOOLS_NEXT_PLUGIN_SETTINGS__${pluginId2}__`;
}
function getPluginSettingsOptions(pluginId2) {
  var _a25, _b25, _c;
  const item = (_b25 = (_a25 = devtoolsPluginBuffer.find((item2) => {
    var _a26;
    return item2[0].id === pluginId2 && !!((_a26 = item2[0]) == null ? void 0 : _a26.settings);
  })) == null ? void 0 : _a25[0]) != null ? _b25 : null;
  return (_c = item == null ? void 0 : item.settings) != null ? _c : null;
}
function getPluginSettings(pluginId2, fallbackValue) {
  var _a25, _b25, _c;
  const localKey = getPluginLocalKey(pluginId2);
  if (localKey) {
    const localSettings = localStorage.getItem(localKey);
    if (localSettings) {
      return JSON.parse(localSettings);
    }
  }
  if (pluginId2) {
    const item = (_b25 = (_a25 = devtoolsPluginBuffer.find((item2) => item2[0].id === pluginId2)) == null ? void 0 : _a25[0]) != null ? _b25 : null;
    return _getSettings((_c = item == null ? void 0 : item.settings) != null ? _c : {});
  }
  return _getSettings(fallbackValue);
}
function initPluginSettings(pluginId2, settings) {
  const localKey = getPluginLocalKey(pluginId2);
  const localSettings = localStorage.getItem(localKey);
  if (!localSettings) {
    localStorage.setItem(localKey, JSON.stringify(_getSettings(settings)));
  }
}
function setPluginSettings(pluginId2, key, value) {
  const localKey = getPluginLocalKey(pluginId2);
  const localSettings = localStorage.getItem(localKey);
  const parsedLocalSettings = JSON.parse(localSettings || "{}");
  const updated = {
    ...parsedLocalSettings,
    [key]: value
  };
  localStorage.setItem(localKey, JSON.stringify(updated));
  devtoolsContext.hooks.callHookWith(
    (callbacks) => {
      callbacks.forEach((cb) => cb({
        pluginId: pluginId2,
        key,
        oldValue: parsedLocalSettings[key],
        newValue: value,
        settings: updated
      }));
    },
    "setPluginSettings"
    /* SET_PLUGIN_SETTINGS */
  );
}
init_esm_shims2();
init_esm_shims2();
init_esm_shims2();
init_esm_shims2();
init_esm_shims2();
init_esm_shims2();
init_esm_shims2();
init_esm_shims2();
init_esm_shims2();
init_esm_shims2();
init_esm_shims2();
var _a11;
var _b11;
var devtoolsHooks = (_b11 = (_a11 = target).__VUE_DEVTOOLS_HOOK) != null ? _b11 : _a11.__VUE_DEVTOOLS_HOOK = createHooks();
var on = {
  vueAppInit(fn) {
    devtoolsHooks.hook("app:init", fn);
  },
  vueAppUnmount(fn) {
    devtoolsHooks.hook("app:unmount", fn);
  },
  vueAppConnected(fn) {
    devtoolsHooks.hook("app:connected", fn);
  },
  componentAdded(fn) {
    return devtoolsHooks.hook("component:added", fn);
  },
  componentEmit(fn) {
    return devtoolsHooks.hook("component:emit", fn);
  },
  componentUpdated(fn) {
    return devtoolsHooks.hook("component:updated", fn);
  },
  componentRemoved(fn) {
    return devtoolsHooks.hook("component:removed", fn);
  },
  setupDevtoolsPlugin(fn) {
    devtoolsHooks.hook("devtools-plugin:setup", fn);
  },
  perfStart(fn) {
    return devtoolsHooks.hook("perf:start", fn);
  },
  perfEnd(fn) {
    return devtoolsHooks.hook("perf:end", fn);
  }
};
var hook = {
  on,
  setupDevToolsPlugin(pluginDescriptor, setupFn) {
    return devtoolsHooks.callHook("devtools-plugin:setup", pluginDescriptor, setupFn);
  }
};
var DevToolsV6PluginAPI = class {
  constructor({ plugin, ctx }) {
    this.hooks = ctx.hooks;
    this.plugin = plugin;
  }
  get on() {
    return {
      // component inspector
      visitComponentTree: (handler) => {
        this.hooks.hook("visitComponentTree", handler);
      },
      inspectComponent: (handler) => {
        this.hooks.hook("inspectComponent", handler);
      },
      editComponentState: (handler) => {
        this.hooks.hook("editComponentState", handler);
      },
      // custom inspector
      getInspectorTree: (handler) => {
        this.hooks.hook("getInspectorTree", handler);
      },
      getInspectorState: (handler) => {
        this.hooks.hook("getInspectorState", handler);
      },
      editInspectorState: (handler) => {
        this.hooks.hook("editInspectorState", handler);
      },
      // timeline
      inspectTimelineEvent: (handler) => {
        this.hooks.hook("inspectTimelineEvent", handler);
      },
      timelineCleared: (handler) => {
        this.hooks.hook("timelineCleared", handler);
      },
      // settings
      setPluginSettings: (handler) => {
        this.hooks.hook("setPluginSettings", handler);
      }
    };
  }
  // component inspector
  notifyComponentUpdate(instance) {
    var _a25;
    if (devtoolsState.highPerfModeEnabled) {
      return;
    }
    const inspector = getActiveInspectors().find((i) => i.packageName === this.plugin.descriptor.packageName);
    if (inspector == null ? void 0 : inspector.id) {
      if (instance) {
        const args = [
          instance.appContext.app,
          instance.uid,
          (_a25 = instance.parent) == null ? void 0 : _a25.uid,
          instance
        ];
        devtoolsHooks.callHook("component:updated", ...args);
      } else {
        devtoolsHooks.callHook(
          "component:updated"
          /* COMPONENT_UPDATED */
        );
      }
      this.hooks.callHook("sendInspectorState", { inspectorId: inspector.id, plugin: this.plugin });
    }
  }
  // custom inspector
  addInspector(options) {
    this.hooks.callHook("addInspector", { inspector: options, plugin: this.plugin });
    if (this.plugin.descriptor.settings) {
      initPluginSettings(options.id, this.plugin.descriptor.settings);
    }
  }
  sendInspectorTree(inspectorId) {
    if (devtoolsState.highPerfModeEnabled) {
      return;
    }
    this.hooks.callHook("sendInspectorTree", { inspectorId, plugin: this.plugin });
  }
  sendInspectorState(inspectorId) {
    if (devtoolsState.highPerfModeEnabled) {
      return;
    }
    this.hooks.callHook("sendInspectorState", { inspectorId, plugin: this.plugin });
  }
  selectInspectorNode(inspectorId, nodeId) {
    this.hooks.callHook("customInspectorSelectNode", { inspectorId, nodeId, plugin: this.plugin });
  }
  visitComponentTree(payload) {
    return this.hooks.callHook("visitComponentTree", payload);
  }
  // timeline
  now() {
    if (devtoolsState.highPerfModeEnabled) {
      return 0;
    }
    return Date.now();
  }
  addTimelineLayer(options) {
    this.hooks.callHook("timelineLayerAdded", { options, plugin: this.plugin });
  }
  addTimelineEvent(options) {
    if (devtoolsState.highPerfModeEnabled) {
      return;
    }
    this.hooks.callHook("timelineEventAdded", { options, plugin: this.plugin });
  }
  // settings
  getSettings(pluginId2) {
    return getPluginSettings(pluginId2 != null ? pluginId2 : this.plugin.descriptor.id, this.plugin.descriptor.settings);
  }
  // utilities
  getComponentInstances(app) {
    return this.hooks.callHook("getComponentInstances", { app });
  }
  getComponentBounds(instance) {
    return this.hooks.callHook("getComponentBounds", { instance });
  }
  getComponentName(instance) {
    return this.hooks.callHook("getComponentName", { instance });
  }
  highlightElement(instance) {
    const uid = instance.__VUE_DEVTOOLS_NEXT_UID__;
    return this.hooks.callHook("componentHighlight", { uid });
  }
  unhighlightElement() {
    return this.hooks.callHook(
      "componentUnhighlight"
      /* COMPONENT_UNHIGHLIGHT */
    );
  }
};
var DevToolsPluginAPI = DevToolsV6PluginAPI;
init_esm_shims2();
init_esm_shims2();
init_esm_shims2();
init_esm_shims2();
var UNDEFINED = "__vue_devtool_undefined__";
var INFINITY7 = "__vue_devtool_infinity__";
var NEGATIVE_INFINITY = "__vue_devtool_negative_infinity__";
var NAN4 = "__vue_devtool_nan__";
init_esm_shims2();
init_esm_shims2();
var tokenMap = {
  [UNDEFINED]: "undefined",
  [NAN4]: "NaN",
  [INFINITY7]: "Infinity",
  [NEGATIVE_INFINITY]: "-Infinity"
};
var reversedTokenMap = Object.entries(tokenMap).reduce((acc, [key, value]) => {
  acc[value] = key;
  return acc;
}, {});
init_esm_shims2();
init_esm_shims2();
init_esm_shims2();
init_esm_shims2();
init_esm_shims2();
var _a12;
var _b12;
(_b12 = (_a12 = target).__VUE_DEVTOOLS_KIT__REGISTERED_PLUGIN_APPS__) != null ? _b12 : _a12.__VUE_DEVTOOLS_KIT__REGISTERED_PLUGIN_APPS__ = /* @__PURE__ */ new Set();
function setupDevToolsPlugin(pluginDescriptor, setupFn) {
  return hook.setupDevToolsPlugin(pluginDescriptor, setupFn);
}
function callDevToolsPluginSetupFn(plugin, app) {
  const [pluginDescriptor, setupFn] = plugin;
  if (pluginDescriptor.app !== app)
    return;
  const api2 = new DevToolsPluginAPI({
    plugin: {
      setupFn,
      descriptor: pluginDescriptor
    },
    ctx: devtoolsContext
  });
  if (pluginDescriptor.packageName === "vuex") {
    api2.on.editInspectorState((payload) => {
      api2.sendInspectorState(payload.inspectorId);
    });
  }
  setupFn(api2);
}
function registerDevToolsPlugin(app, options) {
  if (target.__VUE_DEVTOOLS_KIT__REGISTERED_PLUGIN_APPS__.has(app)) {
    return;
  }
  if (devtoolsState.highPerfModeEnabled && !(options == null ? void 0 : options.inspectingComponent)) {
    return;
  }
  target.__VUE_DEVTOOLS_KIT__REGISTERED_PLUGIN_APPS__.add(app);
  devtoolsPluginBuffer.forEach((plugin) => {
    callDevToolsPluginSetupFn(plugin, app);
  });
}
init_esm_shims2();
init_esm_shims2();
var ROUTER_KEY = "__VUE_DEVTOOLS_ROUTER__";
var ROUTER_INFO_KEY = "__VUE_DEVTOOLS_ROUTER_INFO__";
var _a13;
var _b13;
(_b13 = (_a13 = target)[ROUTER_INFO_KEY]) != null ? _b13 : _a13[ROUTER_INFO_KEY] = {
  currentRoute: null,
  routes: []
};
var _a14;
var _b14;
(_b14 = (_a14 = target)[ROUTER_KEY]) != null ? _b14 : _a14[ROUTER_KEY] = {};
var devtoolsRouterInfo = new Proxy(target[ROUTER_INFO_KEY], {
  get(target22, property2) {
    return target[ROUTER_INFO_KEY][property2];
  }
});
var devtoolsRouter = new Proxy(target[ROUTER_KEY], {
  get(target22, property2) {
    if (property2 === "value") {
      return target[ROUTER_KEY];
    }
  }
});
function getRoutes(router) {
  const routesMap = /* @__PURE__ */ new Map();
  return ((router == null ? void 0 : router.getRoutes()) || []).filter((i) => !routesMap.has(i.path) && routesMap.set(i.path, 1));
}
function filterRoutes(routes) {
  return routes.map((item) => {
    let { path, name, children, meta } = item;
    if (children == null ? void 0 : children.length)
      children = filterRoutes(children);
    return {
      path,
      name,
      children,
      meta
    };
  });
}
function filterCurrentRoute(route) {
  if (route) {
    const { fullPath, hash, href, path, name, matched, params, query } = route;
    return {
      fullPath,
      hash,
      href,
      path,
      name,
      params,
      query,
      matched: filterRoutes(matched)
    };
  }
  return route;
}
function normalizeRouterInfo(appRecord, activeAppRecord2) {
  function init2() {
    var _a25;
    const router = (_a25 = appRecord.app) == null ? void 0 : _a25.config.globalProperties.$router;
    const currentRoute = filterCurrentRoute(router == null ? void 0 : router.currentRoute.value);
    const routes = filterRoutes(getRoutes(router));
    const c = console.warn;
    console.warn = () => {
    };
    target[ROUTER_INFO_KEY] = {
      currentRoute: currentRoute ? deepClone(currentRoute) : {},
      routes: deepClone(routes)
    };
    target[ROUTER_KEY] = router;
    console.warn = c;
  }
  init2();
  hook.on.componentUpdated(debounce2(() => {
    var _a25;
    if (((_a25 = activeAppRecord2.value) == null ? void 0 : _a25.app) !== appRecord.app)
      return;
    init2();
    if (devtoolsState.highPerfModeEnabled)
      return;
    devtoolsContext.hooks.callHook("routerInfoUpdated", { state: target[ROUTER_INFO_KEY] });
  }, 200));
}
function createDevToolsApi(hooks2) {
  return {
    // get inspector tree
    async getInspectorTree(payload) {
      const _payload = {
        ...payload,
        app: activeAppRecord.value.app,
        rootNodes: []
      };
      await new Promise((resolve) => {
        hooks2.callHookWith(
          async (callbacks) => {
            await Promise.all(callbacks.map((cb) => cb(_payload)));
            resolve();
          },
          "getInspectorTree"
          /* GET_INSPECTOR_TREE */
        );
      });
      return _payload.rootNodes;
    },
    // get inspector state
    async getInspectorState(payload) {
      const _payload = {
        ...payload,
        app: activeAppRecord.value.app,
        state: null
      };
      const ctx = {
        currentTab: `custom-inspector:${payload.inspectorId}`
      };
      await new Promise((resolve) => {
        hooks2.callHookWith(
          async (callbacks) => {
            await Promise.all(callbacks.map((cb) => cb(_payload, ctx)));
            resolve();
          },
          "getInspectorState"
          /* GET_INSPECTOR_STATE */
        );
      });
      return _payload.state;
    },
    // edit inspector state
    editInspectorState(payload) {
      const stateEditor2 = new StateEditor();
      const _payload = {
        ...payload,
        app: activeAppRecord.value.app,
        set: (obj, path = payload.path, value = payload.state.value, cb) => {
          stateEditor2.set(obj, path, value, cb || stateEditor2.createDefaultSetCallback(payload.state));
        }
      };
      hooks2.callHookWith(
        (callbacks) => {
          callbacks.forEach((cb) => cb(_payload));
        },
        "editInspectorState"
        /* EDIT_INSPECTOR_STATE */
      );
    },
    // send inspector state
    sendInspectorState(inspectorId) {
      const inspector = getInspector(inspectorId);
      hooks2.callHook("sendInspectorState", { inspectorId, plugin: {
        descriptor: inspector.descriptor,
        setupFn: () => ({})
      } });
    },
    // inspect component inspector
    inspectComponentInspector() {
      return inspectComponentHighLighter();
    },
    // cancel inspect component inspector
    cancelInspectComponentInspector() {
      return cancelInspectComponentHighLighter();
    },
    // get component render code
    getComponentRenderCode(id) {
      const instance = getComponentInstance(activeAppRecord.value, id);
      if (instance)
        return !(typeof (instance == null ? void 0 : instance.type) === "function") ? instance.render.toString() : instance.type.toString();
    },
    // scroll to component
    scrollToComponent(id) {
      return scrollToComponent({ id });
    },
    // open in editor
    openInEditor,
    // get vue inspector
    getVueInspector: getComponentInspector,
    // toggle app
    toggleApp(id, options) {
      const appRecord = devtoolsAppRecords.value.find((record) => record.id === id);
      if (appRecord) {
        setActiveAppRecordId(id);
        setActiveAppRecord(appRecord);
        normalizeRouterInfo(appRecord, activeAppRecord);
        callInspectorUpdatedHook();
        registerDevToolsPlugin(appRecord.app, options);
      }
    },
    // inspect dom
    inspectDOM(instanceId) {
      const instance = getComponentInstance(activeAppRecord.value, instanceId);
      if (instance) {
        const [el] = getRootElementsFromComponentInstance(instance);
        if (el) {
          target.__VUE_DEVTOOLS_INSPECT_DOM_TARGET__ = el;
        }
      }
    },
    updatePluginSettings(pluginId2, key, value) {
      setPluginSettings(pluginId2, key, value);
    },
    getPluginSettings(pluginId2) {
      return {
        options: getPluginSettingsOptions(pluginId2),
        values: getPluginSettings(pluginId2)
      };
    }
  };
}
init_esm_shims2();
var _a15;
var _b15;
(_b15 = (_a15 = target).__VUE_DEVTOOLS_ENV__) != null ? _b15 : _a15.__VUE_DEVTOOLS_ENV__ = {
  vitePluginDetected: false
};
var hooks = createDevToolsCtxHooks();
var _a16;
var _b16;
(_b16 = (_a16 = target).__VUE_DEVTOOLS_KIT_CONTEXT__) != null ? _b16 : _a16.__VUE_DEVTOOLS_KIT_CONTEXT__ = {
  hooks,
  get state() {
    return {
      ...devtoolsState,
      activeAppRecordId: activeAppRecord.id,
      activeAppRecord: activeAppRecord.value,
      appRecords: devtoolsAppRecords.value
    };
  },
  api: createDevToolsApi(hooks)
};
var devtoolsContext = target.__VUE_DEVTOOLS_KIT_CONTEXT__;
init_esm_shims2();
var import_speakingurl = __toESM3(require_speakingurl2(), 1);
var _a17;
var _b17;
var appRecordInfo = (_b17 = (_a17 = target).__VUE_DEVTOOLS_NEXT_APP_RECORD_INFO__) != null ? _b17 : _a17.__VUE_DEVTOOLS_NEXT_APP_RECORD_INFO__ = {
  id: 0,
  appIds: /* @__PURE__ */ new Set()
};
init_esm_shims2();
function toggleHighPerfMode(state) {
  devtoolsState.highPerfModeEnabled = state != null ? state : !devtoolsState.highPerfModeEnabled;
  if (!state && activeAppRecord.value) {
    registerDevToolsPlugin(activeAppRecord.value.app);
  }
}
init_esm_shims2();
init_esm_shims2();
init_esm_shims2();
function updateDevToolsClientDetected(params) {
  devtoolsState.devtoolsClientDetected = {
    ...devtoolsState.devtoolsClientDetected,
    ...params
  };
  const devtoolsClientVisible = Object.values(devtoolsState.devtoolsClientDetected).some(Boolean);
  toggleHighPerfMode(!devtoolsClientVisible);
}
var _a18;
var _b18;
(_b18 = (_a18 = target).__VUE_DEVTOOLS_UPDATE_CLIENT_DETECTED__) != null ? _b18 : _a18.__VUE_DEVTOOLS_UPDATE_CLIENT_DETECTED__ = updateDevToolsClientDetected;
init_esm_shims2();
init_esm_shims2();
init_esm_shims2();
init_esm_shims2();
init_esm_shims2();
init_esm_shims2();
init_esm_shims2();
var DoubleIndexedKV = class {
  constructor() {
    this.keyToValue = /* @__PURE__ */ new Map();
    this.valueToKey = /* @__PURE__ */ new Map();
  }
  set(key, value) {
    this.keyToValue.set(key, value);
    this.valueToKey.set(value, key);
  }
  getByKey(key) {
    return this.keyToValue.get(key);
  }
  getByValue(value) {
    return this.valueToKey.get(value);
  }
  clear() {
    this.keyToValue.clear();
    this.valueToKey.clear();
  }
};
var Registry = class {
  constructor(generateIdentifier) {
    this.generateIdentifier = generateIdentifier;
    this.kv = new DoubleIndexedKV();
  }
  register(value, identifier) {
    if (this.kv.getByValue(value)) {
      return;
    }
    if (!identifier) {
      identifier = this.generateIdentifier(value);
    }
    this.kv.set(identifier, value);
  }
  clear() {
    this.kv.clear();
  }
  getIdentifier(value) {
    return this.kv.getByValue(value);
  }
  getValue(identifier) {
    return this.kv.getByKey(identifier);
  }
};
var ClassRegistry = class extends Registry {
  constructor() {
    super((c) => c.name);
    this.classToAllowedProps = /* @__PURE__ */ new Map();
  }
  register(value, options) {
    if (typeof options === "object") {
      if (options.allowProps) {
        this.classToAllowedProps.set(value, options.allowProps);
      }
      super.register(value, options.identifier);
    } else {
      super.register(value, options);
    }
  }
  getAllowedProps(value) {
    return this.classToAllowedProps.get(value);
  }
};
init_esm_shims2();
init_esm_shims2();
function valuesOfObj(record) {
  if ("values" in Object) {
    return Object.values(record);
  }
  const values2 = [];
  for (const key in record) {
    if (record.hasOwnProperty(key)) {
      values2.push(record[key]);
    }
  }
  return values2;
}
function find2(record, predicate) {
  const values2 = valuesOfObj(record);
  if ("find" in values2) {
    return values2.find(predicate);
  }
  const valuesNotNever = values2;
  for (let i = 0; i < valuesNotNever.length; i++) {
    const value = valuesNotNever[i];
    if (predicate(value)) {
      return value;
    }
  }
  return void 0;
}
function forEach2(record, run) {
  Object.entries(record).forEach(([key, value]) => run(value, key));
}
function includes2(arr, value) {
  return arr.indexOf(value) !== -1;
}
function findArr(record, predicate) {
  for (let i = 0; i < record.length; i++) {
    const value = record[i];
    if (predicate(value)) {
      return value;
    }
  }
  return void 0;
}
var CustomTransformerRegistry = class {
  constructor() {
    this.transfomers = {};
  }
  register(transformer) {
    this.transfomers[transformer.name] = transformer;
  }
  findApplicable(v) {
    return find2(this.transfomers, (transformer) => transformer.isApplicable(v));
  }
  findByName(name) {
    return this.transfomers[name];
  }
};
init_esm_shims2();
init_esm_shims2();
var getType = (payload) => Object.prototype.toString.call(payload).slice(8, -1);
var isUndefined2 = (payload) => typeof payload === "undefined";
var isNull2 = (payload) => payload === null;
var isPlainObject2 = (payload) => {
  if (typeof payload !== "object" || payload === null)
    return false;
  if (payload === Object.prototype)
    return false;
  if (Object.getPrototypeOf(payload) === null)
    return true;
  return Object.getPrototypeOf(payload) === Object.prototype;
};
var isEmptyObject = (payload) => isPlainObject2(payload) && Object.keys(payload).length === 0;
var isArray2 = (payload) => Array.isArray(payload);
var isString2 = (payload) => typeof payload === "string";
var isNumber2 = (payload) => typeof payload === "number" && !isNaN(payload);
var isBoolean3 = (payload) => typeof payload === "boolean";
var isRegExp2 = (payload) => payload instanceof RegExp;
var isMap2 = (payload) => payload instanceof Map;
var isSet2 = (payload) => payload instanceof Set;
var isSymbol2 = (payload) => getType(payload) === "Symbol";
var isDate2 = (payload) => payload instanceof Date && !isNaN(payload.valueOf());
var isError2 = (payload) => payload instanceof Error;
var isNaNValue = (payload) => typeof payload === "number" && isNaN(payload);
var isPrimitive2 = (payload) => isBoolean3(payload) || isNull2(payload) || isUndefined2(payload) || isNumber2(payload) || isString2(payload) || isSymbol2(payload);
var isBigint = (payload) => typeof payload === "bigint";
var isInfinite = (payload) => payload === Infinity || payload === -Infinity;
var isTypedArray2 = (payload) => ArrayBuffer.isView(payload) && !(payload instanceof DataView);
var isURL = (payload) => payload instanceof URL;
init_esm_shims2();
var escapeKey = (key) => key.replace(/\./g, "\\.");
var stringifyPath = (path) => path.map(String).map(escapeKey).join(".");
var parsePath = (string) => {
  const result2 = [];
  let segment = "";
  for (let i = 0; i < string.length; i++) {
    let char = string.charAt(i);
    const isEscapedDot = char === "\\" && string.charAt(i + 1) === ".";
    if (isEscapedDot) {
      segment += ".";
      i++;
      continue;
    }
    const isEndOfSegment = char === ".";
    if (isEndOfSegment) {
      result2.push(segment);
      segment = "";
      continue;
    }
    segment += char;
  }
  const lastSegment = segment;
  result2.push(lastSegment);
  return result2;
};
init_esm_shims2();
function simpleTransformation(isApplicable, annotation, transform2, untransform) {
  return {
    isApplicable,
    annotation,
    transform: transform2,
    untransform
  };
}
var simpleRules = [
  simpleTransformation(isUndefined2, "undefined", () => null, () => void 0),
  simpleTransformation(isBigint, "bigint", (v) => v.toString(), (v) => {
    if (typeof BigInt !== "undefined") {
      return BigInt(v);
    }
    console.error("Please add a BigInt polyfill.");
    return v;
  }),
  simpleTransformation(isDate2, "Date", (v) => v.toISOString(), (v) => new Date(v)),
  simpleTransformation(isError2, "Error", (v, superJson) => {
    const baseError = {
      name: v.name,
      message: v.message
    };
    superJson.allowedErrorProps.forEach((prop) => {
      baseError[prop] = v[prop];
    });
    return baseError;
  }, (v, superJson) => {
    const e = new Error(v.message);
    e.name = v.name;
    e.stack = v.stack;
    superJson.allowedErrorProps.forEach((prop) => {
      e[prop] = v[prop];
    });
    return e;
  }),
  simpleTransformation(isRegExp2, "regexp", (v) => "" + v, (regex) => {
    const body = regex.slice(1, regex.lastIndexOf("/"));
    const flags = regex.slice(regex.lastIndexOf("/") + 1);
    return new RegExp(body, flags);
  }),
  simpleTransformation(
    isSet2,
    "set",
    // (sets only exist in es6+)
    // eslint-disable-next-line es5/no-es6-methods
    (v) => [...v.values()],
    (v) => new Set(v)
  ),
  simpleTransformation(isMap2, "map", (v) => [...v.entries()], (v) => new Map(v)),
  simpleTransformation((v) => isNaNValue(v) || isInfinite(v), "number", (v) => {
    if (isNaNValue(v)) {
      return "NaN";
    }
    if (v > 0) {
      return "Infinity";
    } else {
      return "-Infinity";
    }
  }, Number),
  simpleTransformation((v) => v === 0 && 1 / v === -Infinity, "number", () => {
    return "-0";
  }, Number),
  simpleTransformation(isURL, "URL", (v) => v.toString(), (v) => new URL(v))
];
function compositeTransformation(isApplicable, annotation, transform2, untransform) {
  return {
    isApplicable,
    annotation,
    transform: transform2,
    untransform
  };
}
var symbolRule = compositeTransformation((s, superJson) => {
  if (isSymbol2(s)) {
    const isRegistered = !!superJson.symbolRegistry.getIdentifier(s);
    return isRegistered;
  }
  return false;
}, (s, superJson) => {
  const identifier = superJson.symbolRegistry.getIdentifier(s);
  return ["symbol", identifier];
}, (v) => v.description, (_, a, superJson) => {
  const value = superJson.symbolRegistry.getValue(a[1]);
  if (!value) {
    throw new Error("Trying to deserialize unknown symbol");
  }
  return value;
});
var constructorToName = [
  Int8Array,
  Uint8Array,
  Int16Array,
  Uint16Array,
  Int32Array,
  Uint32Array,
  Float32Array,
  Float64Array,
  Uint8ClampedArray
].reduce((obj, ctor) => {
  obj[ctor.name] = ctor;
  return obj;
}, {});
var typedArrayRule = compositeTransformation(isTypedArray2, (v) => ["typed-array", v.constructor.name], (v) => [...v], (v, a) => {
  const ctor = constructorToName[a[1]];
  if (!ctor) {
    throw new Error("Trying to deserialize unknown typed array");
  }
  return new ctor(v);
});
function isInstanceOfRegisteredClass(potentialClass, superJson) {
  if (potentialClass == null ? void 0 : potentialClass.constructor) {
    const isRegistered = !!superJson.classRegistry.getIdentifier(potentialClass.constructor);
    return isRegistered;
  }
  return false;
}
var classRule = compositeTransformation(isInstanceOfRegisteredClass, (clazz, superJson) => {
  const identifier = superJson.classRegistry.getIdentifier(clazz.constructor);
  return ["class", identifier];
}, (clazz, superJson) => {
  const allowedProps = superJson.classRegistry.getAllowedProps(clazz.constructor);
  if (!allowedProps) {
    return { ...clazz };
  }
  const result2 = {};
  allowedProps.forEach((prop) => {
    result2[prop] = clazz[prop];
  });
  return result2;
}, (v, a, superJson) => {
  const clazz = superJson.classRegistry.getValue(a[1]);
  if (!clazz) {
    throw new Error(`Trying to deserialize unknown class '${a[1]}' - check https://github.com/blitz-js/superjson/issues/116#issuecomment-773996564`);
  }
  return Object.assign(Object.create(clazz.prototype), v);
});
var customRule = compositeTransformation((value, superJson) => {
  return !!superJson.customTransformerRegistry.findApplicable(value);
}, (value, superJson) => {
  const transformer = superJson.customTransformerRegistry.findApplicable(value);
  return ["custom", transformer.name];
}, (value, superJson) => {
  const transformer = superJson.customTransformerRegistry.findApplicable(value);
  return transformer.serialize(value);
}, (v, a, superJson) => {
  const transformer = superJson.customTransformerRegistry.findByName(a[1]);
  if (!transformer) {
    throw new Error("Trying to deserialize unknown custom value");
  }
  return transformer.deserialize(v);
});
var compositeRules = [classRule, symbolRule, customRule, typedArrayRule];
var transformValue = (value, superJson) => {
  const applicableCompositeRule = findArr(compositeRules, (rule) => rule.isApplicable(value, superJson));
  if (applicableCompositeRule) {
    return {
      value: applicableCompositeRule.transform(value, superJson),
      type: applicableCompositeRule.annotation(value, superJson)
    };
  }
  const applicableSimpleRule = findArr(simpleRules, (rule) => rule.isApplicable(value, superJson));
  if (applicableSimpleRule) {
    return {
      value: applicableSimpleRule.transform(value, superJson),
      type: applicableSimpleRule.annotation
    };
  }
  return void 0;
};
var simpleRulesByAnnotation = {};
simpleRules.forEach((rule) => {
  simpleRulesByAnnotation[rule.annotation] = rule;
});
var untransformValue = (json, type, superJson) => {
  if (isArray2(type)) {
    switch (type[0]) {
      case "symbol":
        return symbolRule.untransform(json, type, superJson);
      case "class":
        return classRule.untransform(json, type, superJson);
      case "custom":
        return customRule.untransform(json, type, superJson);
      case "typed-array":
        return typedArrayRule.untransform(json, type, superJson);
      default:
        throw new Error("Unknown transformation: " + type);
    }
  } else {
    const transformation = simpleRulesByAnnotation[type];
    if (!transformation) {
      throw new Error("Unknown transformation: " + type);
    }
    return transformation.untransform(json, superJson);
  }
};
init_esm_shims2();
var getNthKey = (value, n) => {
  if (n > value.size)
    throw new Error("index out of bounds");
  const keys2 = value.keys();
  while (n > 0) {
    keys2.next();
    n--;
  }
  return keys2.next().value;
};
function validatePath(path) {
  if (includes2(path, "__proto__")) {
    throw new Error("__proto__ is not allowed as a property");
  }
  if (includes2(path, "prototype")) {
    throw new Error("prototype is not allowed as a property");
  }
  if (includes2(path, "constructor")) {
    throw new Error("constructor is not allowed as a property");
  }
}
var getDeep = (object, path) => {
  validatePath(path);
  for (let i = 0; i < path.length; i++) {
    const key = path[i];
    if (isSet2(object)) {
      object = getNthKey(object, +key);
    } else if (isMap2(object)) {
      const row = +key;
      const type = +path[++i] === 0 ? "key" : "value";
      const keyOfRow = getNthKey(object, row);
      switch (type) {
        case "key":
          object = keyOfRow;
          break;
        case "value":
          object = object.get(keyOfRow);
          break;
      }
    } else {
      object = object[key];
    }
  }
  return object;
};
var setDeep = (object, path, mapper) => {
  validatePath(path);
  if (path.length === 0) {
    return mapper(object);
  }
  let parent2 = object;
  for (let i = 0; i < path.length - 1; i++) {
    const key = path[i];
    if (isArray2(parent2)) {
      const index2 = +key;
      parent2 = parent2[index2];
    } else if (isPlainObject2(parent2)) {
      parent2 = parent2[key];
    } else if (isSet2(parent2)) {
      const row = +key;
      parent2 = getNthKey(parent2, row);
    } else if (isMap2(parent2)) {
      const isEnd = i === path.length - 2;
      if (isEnd) {
        break;
      }
      const row = +key;
      const type = +path[++i] === 0 ? "key" : "value";
      const keyOfRow = getNthKey(parent2, row);
      switch (type) {
        case "key":
          parent2 = keyOfRow;
          break;
        case "value":
          parent2 = parent2.get(keyOfRow);
          break;
      }
    }
  }
  const lastKey = path[path.length - 1];
  if (isArray2(parent2)) {
    parent2[+lastKey] = mapper(parent2[+lastKey]);
  } else if (isPlainObject2(parent2)) {
    parent2[lastKey] = mapper(parent2[lastKey]);
  }
  if (isSet2(parent2)) {
    const oldValue = getNthKey(parent2, +lastKey);
    const newValue = mapper(oldValue);
    if (oldValue !== newValue) {
      parent2.delete(oldValue);
      parent2.add(newValue);
    }
  }
  if (isMap2(parent2)) {
    const row = +path[path.length - 2];
    const keyToRow = getNthKey(parent2, row);
    const type = +lastKey === 0 ? "key" : "value";
    switch (type) {
      case "key": {
        const newKey = mapper(keyToRow);
        parent2.set(newKey, parent2.get(keyToRow));
        if (newKey !== keyToRow) {
          parent2.delete(keyToRow);
        }
        break;
      }
      case "value": {
        parent2.set(keyToRow, mapper(parent2.get(keyToRow)));
        break;
      }
    }
  }
  return object;
};
function traverse(tree, walker2, origin = []) {
  if (!tree) {
    return;
  }
  if (!isArray2(tree)) {
    forEach2(tree, (subtree, key) => traverse(subtree, walker2, [...origin, ...parsePath(key)]));
    return;
  }
  const [nodeValue, children] = tree;
  if (children) {
    forEach2(children, (child, key) => {
      traverse(child, walker2, [...origin, ...parsePath(key)]);
    });
  }
  walker2(nodeValue, origin);
}
function applyValueAnnotations(plain, annotations, superJson) {
  traverse(annotations, (type, path) => {
    plain = setDeep(plain, path, (v) => untransformValue(v, type, superJson));
  });
  return plain;
}
function applyReferentialEqualityAnnotations(plain, annotations) {
  function apply2(identicalPaths, path) {
    const object = getDeep(plain, parsePath(path));
    identicalPaths.map(parsePath).forEach((identicalObjectPath) => {
      plain = setDeep(plain, identicalObjectPath, () => object);
    });
  }
  if (isArray2(annotations)) {
    const [root2, other] = annotations;
    root2.forEach((identicalPath) => {
      plain = setDeep(plain, parsePath(identicalPath), () => plain);
    });
    if (other) {
      forEach2(other, apply2);
    }
  } else {
    forEach2(annotations, apply2);
  }
  return plain;
}
var isDeep = (object, superJson) => isPlainObject2(object) || isArray2(object) || isMap2(object) || isSet2(object) || isInstanceOfRegisteredClass(object, superJson);
function addIdentity(object, path, identities) {
  const existingSet = identities.get(object);
  if (existingSet) {
    existingSet.push(path);
  } else {
    identities.set(object, [path]);
  }
}
function generateReferentialEqualityAnnotations(identitites, dedupe) {
  const result2 = {};
  let rootEqualityPaths = void 0;
  identitites.forEach((paths) => {
    if (paths.length <= 1) {
      return;
    }
    if (!dedupe) {
      paths = paths.map((path) => path.map(String)).sort((a, b) => a.length - b.length);
    }
    const [representativePath, ...identicalPaths] = paths;
    if (representativePath.length === 0) {
      rootEqualityPaths = identicalPaths.map(stringifyPath);
    } else {
      result2[stringifyPath(representativePath)] = identicalPaths.map(stringifyPath);
    }
  });
  if (rootEqualityPaths) {
    if (isEmptyObject(result2)) {
      return [rootEqualityPaths];
    } else {
      return [rootEqualityPaths, result2];
    }
  } else {
    return isEmptyObject(result2) ? void 0 : result2;
  }
}
var walker = (object, identities, superJson, dedupe, path = [], objectsInThisPath = [], seenObjects = /* @__PURE__ */ new Map()) => {
  var _a25;
  const primitive = isPrimitive2(object);
  if (!primitive) {
    addIdentity(object, path, identities);
    const seen = seenObjects.get(object);
    if (seen) {
      return dedupe ? {
        transformedValue: null
      } : seen;
    }
  }
  if (!isDeep(object, superJson)) {
    const transformed2 = transformValue(object, superJson);
    const result22 = transformed2 ? {
      transformedValue: transformed2.value,
      annotations: [transformed2.type]
    } : {
      transformedValue: object
    };
    if (!primitive) {
      seenObjects.set(object, result22);
    }
    return result22;
  }
  if (includes2(objectsInThisPath, object)) {
    return {
      transformedValue: null
    };
  }
  const transformationResult = transformValue(object, superJson);
  const transformed = (_a25 = transformationResult == null ? void 0 : transformationResult.value) != null ? _a25 : object;
  const transformedValue = isArray2(transformed) ? [] : {};
  const innerAnnotations = {};
  forEach2(transformed, (value, index2) => {
    if (index2 === "__proto__" || index2 === "constructor" || index2 === "prototype") {
      throw new Error(`Detected property ${index2}. This is a prototype pollution risk, please remove it from your object.`);
    }
    const recursiveResult = walker(value, identities, superJson, dedupe, [...path, index2], [...objectsInThisPath, object], seenObjects);
    transformedValue[index2] = recursiveResult.transformedValue;
    if (isArray2(recursiveResult.annotations)) {
      innerAnnotations[index2] = recursiveResult.annotations;
    } else if (isPlainObject2(recursiveResult.annotations)) {
      forEach2(recursiveResult.annotations, (tree, key) => {
        innerAnnotations[escapeKey(index2) + "." + key] = tree;
      });
    }
  });
  const result2 = isEmptyObject(innerAnnotations) ? {
    transformedValue,
    annotations: !!transformationResult ? [transformationResult.type] : void 0
  } : {
    transformedValue,
    annotations: !!transformationResult ? [transformationResult.type, innerAnnotations] : innerAnnotations
  };
  if (!primitive) {
    seenObjects.set(object, result2);
  }
  return result2;
};
init_esm_shims2();
init_esm_shims2();
function getType2(payload) {
  return Object.prototype.toString.call(payload).slice(8, -1);
}
function isArray22(payload) {
  return getType2(payload) === "Array";
}
function isPlainObject3(payload) {
  if (getType2(payload) !== "Object")
    return false;
  const prototype = Object.getPrototypeOf(payload);
  return !!prototype && prototype.constructor === Object && prototype === Object.prototype;
}
function isNull22(payload) {
  return getType2(payload) === "Null";
}
function isOneOf(a, b, c, d, e) {
  return (value) => a(value) || b(value) || !!c && c(value) || !!d && d(value) || !!e && e(value);
}
function isUndefined22(payload) {
  return getType2(payload) === "Undefined";
}
var isNullOrUndefined = isOneOf(isNull22, isUndefined22);
function assignProp(carry, key, newVal, originalObject, includeNonenumerable) {
  const propType = {}.propertyIsEnumerable.call(originalObject, key) ? "enumerable" : "nonenumerable";
  if (propType === "enumerable")
    carry[key] = newVal;
  if (includeNonenumerable && propType === "nonenumerable") {
    Object.defineProperty(carry, key, {
      value: newVal,
      enumerable: false,
      writable: true,
      configurable: true
    });
  }
}
function copy(target22, options = {}) {
  if (isArray22(target22)) {
    return target22.map((item) => copy(item, options));
  }
  if (!isPlainObject3(target22)) {
    return target22;
  }
  const props = Object.getOwnPropertyNames(target22);
  const symbols = Object.getOwnPropertySymbols(target22);
  return [...props, ...symbols].reduce((carry, key) => {
    if (isArray22(options.props) && !options.props.includes(key)) {
      return carry;
    }
    const val = target22[key];
    const newVal = copy(val, options);
    assignProp(carry, key, newVal, target22, options.nonenumerable);
    return carry;
  }, {});
}
var SuperJSON = class {
  /**
   * @param dedupeReferentialEqualities  If true, SuperJSON will make sure only one instance of referentially equal objects are serialized and the rest are replaced with `null`.
   */
  constructor({ dedupe = false } = {}) {
    this.classRegistry = new ClassRegistry();
    this.symbolRegistry = new Registry((s) => {
      var _a25;
      return (_a25 = s.description) != null ? _a25 : "";
    });
    this.customTransformerRegistry = new CustomTransformerRegistry();
    this.allowedErrorProps = [];
    this.dedupe = dedupe;
  }
  serialize(object) {
    const identities = /* @__PURE__ */ new Map();
    const output = walker(object, identities, this, this.dedupe);
    const res = {
      json: output.transformedValue
    };
    if (output.annotations) {
      res.meta = {
        ...res.meta,
        values: output.annotations
      };
    }
    const equalityAnnotations = generateReferentialEqualityAnnotations(identities, this.dedupe);
    if (equalityAnnotations) {
      res.meta = {
        ...res.meta,
        referentialEqualities: equalityAnnotations
      };
    }
    return res;
  }
  deserialize(payload) {
    const { json, meta } = payload;
    let result2 = copy(json);
    if (meta == null ? void 0 : meta.values) {
      result2 = applyValueAnnotations(result2, meta.values, this);
    }
    if (meta == null ? void 0 : meta.referentialEqualities) {
      result2 = applyReferentialEqualityAnnotations(result2, meta.referentialEqualities);
    }
    return result2;
  }
  stringify(object) {
    return JSON.stringify(this.serialize(object));
  }
  parse(string) {
    return this.deserialize(JSON.parse(string));
  }
  registerClass(v, options) {
    this.classRegistry.register(v, options);
  }
  registerSymbol(v, identifier) {
    this.symbolRegistry.register(v, identifier);
  }
  registerCustom(transformer, name) {
    this.customTransformerRegistry.register({
      name,
      ...transformer
    });
  }
  allowErrorProps(...props) {
    this.allowedErrorProps.push(...props);
  }
};
SuperJSON.defaultInstance = new SuperJSON();
SuperJSON.serialize = SuperJSON.defaultInstance.serialize.bind(SuperJSON.defaultInstance);
SuperJSON.deserialize = SuperJSON.defaultInstance.deserialize.bind(SuperJSON.defaultInstance);
SuperJSON.stringify = SuperJSON.defaultInstance.stringify.bind(SuperJSON.defaultInstance);
SuperJSON.parse = SuperJSON.defaultInstance.parse.bind(SuperJSON.defaultInstance);
SuperJSON.registerClass = SuperJSON.defaultInstance.registerClass.bind(SuperJSON.defaultInstance);
SuperJSON.registerSymbol = SuperJSON.defaultInstance.registerSymbol.bind(SuperJSON.defaultInstance);
SuperJSON.registerCustom = SuperJSON.defaultInstance.registerCustom.bind(SuperJSON.defaultInstance);
SuperJSON.allowErrorProps = SuperJSON.defaultInstance.allowErrorProps.bind(SuperJSON.defaultInstance);
var serialize = SuperJSON.serialize;
var deserialize = SuperJSON.deserialize;
var stringify = SuperJSON.stringify;
var parse = SuperJSON.parse;
var registerClass = SuperJSON.registerClass;
var registerCustom = SuperJSON.registerCustom;
var registerSymbol = SuperJSON.registerSymbol;
var allowErrorProps = SuperJSON.allowErrorProps;
init_esm_shims2();
init_esm_shims2();
init_esm_shims2();
init_esm_shims2();
init_esm_shims2();
init_esm_shims2();
init_esm_shims2();
init_esm_shims2();
init_esm_shims2();
init_esm_shims2();
init_esm_shims2();
init_esm_shims2();
init_esm_shims2();
init_esm_shims2();
init_esm_shims2();
init_esm_shims2();
init_esm_shims2();
init_esm_shims2();
init_esm_shims2();
init_esm_shims2();
init_esm_shims2();
init_esm_shims2();
init_esm_shims2();
var _a19;
var _b19;
(_b19 = (_a19 = target).__VUE_DEVTOOLS_KIT_MESSAGE_CHANNELS__) != null ? _b19 : _a19.__VUE_DEVTOOLS_KIT_MESSAGE_CHANNELS__ = [];
var _a20;
var _b20;
(_b20 = (_a20 = target).__VUE_DEVTOOLS_KIT_RPC_CLIENT__) != null ? _b20 : _a20.__VUE_DEVTOOLS_KIT_RPC_CLIENT__ = null;
var _a21;
var _b21;
(_b21 = (_a21 = target).__VUE_DEVTOOLS_KIT_RPC_SERVER__) != null ? _b21 : _a21.__VUE_DEVTOOLS_KIT_RPC_SERVER__ = null;
var _a222;
var _b22;
(_b22 = (_a222 = target).__VUE_DEVTOOLS_KIT_VITE_RPC_CLIENT__) != null ? _b22 : _a222.__VUE_DEVTOOLS_KIT_VITE_RPC_CLIENT__ = null;
var _a23;
var _b23;
(_b23 = (_a23 = target).__VUE_DEVTOOLS_KIT_VITE_RPC_SERVER__) != null ? _b23 : _a23.__VUE_DEVTOOLS_KIT_VITE_RPC_SERVER__ = null;
var _a24;
var _b24;
(_b24 = (_a24 = target).__VUE_DEVTOOLS_KIT_BROADCAST_RPC_SERVER__) != null ? _b24 : _a24.__VUE_DEVTOOLS_KIT_BROADCAST_RPC_SERVER__ = null;
init_esm_shims2();
init_esm_shims2();
init_esm_shims2();
init_esm_shims2();
init_esm_shims2();
init_esm_shims2();
init_esm_shims2();
var MAX_SERIALIZED_SIZE = 2 * 1024 * 1024;

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/useRequest/devtools/devtools.js
import { unref as unref9 } from "vue";
var pluginId = "vue-hooks-plus";
var pluginName = "Vue Hooks Plus 🍭";
var pluginLogo = "https://raw.githubusercontent.com/InhiblabCore/vue-hooks-plus/c3b984112610ef3fb21140a0beb27b4a228fe0b3/packages/hooks/docs/public/logo.svg";
var currentStateId;
var controlMap = /* @__PURE__ */ new Map();
function setupDevtools(app) {
  setupDevToolsPlugin(
    {
      id: pluginId,
      label: pluginName,
      packageName: "vue-hooks-plus",
      homepage: "https://inhiblabcore.github.io/docs/hooks",
      logo: pluginLogo,
      app,
      settings: {
        baseSort: {
          type: "choice",
          component: "button-group",
          label: "Sort Cache Entries",
          options: [
            {
              label: "ASC",
              value: 1
            },
            {
              label: "DESC",
              value: -1
            }
          ],
          defaultValue: 1
        }
      }
    },
    (api2) => {
      api2.addTimelineLayer({
        id: pluginId,
        label: pluginName,
        color: 16767308
      });
      api2.addInspector({
        id: pluginId,
        label: pluginName,
        icon: "api",
        treeFilterPlaceholder: "Search  useRequest",
        actions: [
          {
            icon: "delete",
            tooltip: "Clear useRequest root ",
            action: () => {
              devToolsStore.reset(currentStateId);
              api2.sendInspectorTree(pluginId);
              api2.sendInspectorState(pluginId);
            }
          }
        ]
      });
      devToolsStore.subscribe((event) => {
        devToolsStore.update(event.key, { time: event.time, type: event.type });
        api2.sendInspectorTree(pluginId);
        api2.sendInspectorState(pluginId);
        api2.addTimelineEvent({
          layerId: pluginId,
          event: {
            title: event.type,
            subtitle: `data: ${JSON.stringify(event.data)}`,
            time: api2.now(),
            data: {
              ...event
            }
          }
        });
      });
      api2.on.getInspectorTree((payload) => {
        if (payload.inspectorId === pluginId) {
          controlMap.clear();
          const settings = api2.getSettings();
          const queries = devToolsStore.getAll();
          let sortedArray = [];
          if (settings.baseSort === 1) {
            sortedArray = Array.from(queries.entries()).sort(
              (a, b) => {
                var _a25, _b25, _c, _d;
                return ((_b25 = (_a25 = b[1]) == null ? void 0 : _a25.time) != null ? _b25 : 0) - ((_d = (_c = a[1]) == null ? void 0 : _c.time) != null ? _d : 0);
              }
            );
          } else {
            sortedArray = Array.from(queries.entries()).sort(
              (a, b) => {
                var _a25, _b25, _c, _d;
                return ((_b25 = (_a25 = a[1]) == null ? void 0 : _a25.time) != null ? _b25 : 0) - ((_d = (_c = b[1]) == null ? void 0 : _c.time) != null ? _d : 0);
              }
            );
          }
          const filtered = sortedArray.filter((item) => new RegExp(payload.filter, "g").test(item[0])).map((item) => {
            var _a25, _b25, _c;
            return {
              id: item[0],
              label: item[0],
              tags: ((_a25 = item[1]) == null ? void 0 : _a25.type) ? [
                {
                  label: `${(_b25 = item[1]) == null ? void 0 : _b25.type}`,
                  textColor: 16777215,
                  backgroundColor: getRequestTagBg((_c = item[1]) == null ? void 0 : _c.type)
                }
              ] : []
            };
          });
          payload.rootNodes = [
            {
              id: "vue-hooks-plus-useRequest",
              label: "useRequest",
              tags: [
                {
                  label: "Root",
                  textColor: 16777215,
                  backgroundColor: 4372611
                }
              ],
              children: filtered != null ? filtered : []
            }
          ];
        }
      });
      api2.on.getInspectorState((payload) => {
        var _a25, _b25, _c;
        currentStateId = payload.nodeId;
        let pluginsIndex = 0;
        if (payload.inspectorId === pluginId) {
          const queries = devToolsStore.getAll();
          if (payload.nodeId) {
            const currentSource = queries.get(payload.nodeId);
            if (!currentSource) {
              return;
            }
            payload.state = {
              Details: [
                {
                  key: "Key",
                  value: payload.nodeId
                },
                {
                  key: "Request Name",
                  value: currentSource.requestName
                }
              ],
              "Data Explorer": Object.keys(currentSource.instance.state).map((item) => ({
                key: item,
                value: unref9(currentSource.instance.state[item])
              })),
              Option: Object.keys(currentSource.instance.options).map((item) => ({
                key: item,
                value: currentSource.instance.options[item]
              })),
              ["Plugins 🧩"]: (_c = (_b25 = (_a25 = currentSource.instance.pluginImpls) == null ? void 0 : _a25.map((_, index2) => {
                var _a26, _b26, _c2, _d, _e, _f;
                const pluginName2 = (_c2 = (_b26 = (_a26 = currentSource == null ? void 0 : currentSource.instance) == null ? void 0 : _a26.pluginImpls) == null ? void 0 : _b26[index2]) == null ? void 0 : _c2.name;
                if (!pluginName2) {
                  if (index2 !== pluginsIndex)
                    pluginsIndex++;
                }
                return {
                  key: pluginName2 ? pluginName2 : `plugin ${pluginsIndex}`,
                  value: (_f = (_e = (_d = currentSource == null ? void 0 : currentSource.instance) == null ? void 0 : _d.pluginImpls) == null ? void 0 : _e[index2]) != null ? _f : null
                };
              })) == null ? void 0 : _b25.filter((item) => Object.keys(item.value).length !== 0)) != null ? _c : []
            };
          }
        }
      });
    }
  );
}

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/useRequest/devtools/index.js
var index = {
  install(app) {
    if (true) {
      setupDevtools(app);
    }
  }
};

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/useTimeout/index.js
import { watchEffect as watchEffect8, unref as unref10 } from "vue";
function useTimeout(fn, delay2, options) {
  const immediate = options == null ? void 0 : options.immediate;
  if (immediate) {
    fn();
  }
  watchEffect8((onInvalidate) => {
    if (unref10(delay2) === void 0 || typeof unref10(delay2) !== "number" || unref10(delay2) < 0)
      return;
    const _deply = unref10(delay2);
    const timer = setTimeout(() => {
      fn();
    }, _deply);
    onInvalidate(() => {
      clearInterval(timer);
    });
  });
}

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/useAsyncOrder/index.js
function useAsyncOrder({ task, option }) {
  const { delay: delay2 = 0, onError, onReady, onSuccess } = option != null ? option : {};
  if (!(task instanceof Array)) {
    throw new Error("task must be Array");
  }
  const interruptibleError = (reason) => {
    onError == null ? void 0 : onError(reason);
  };
  const interruptibleReject = (resolve) => {
    return (error) => {
      interruptibleError(error);
      resolve == null ? void 0 : resolve({ error });
    };
  };
  const runTask = () => {
    var _a25;
    (_a25 = Array(...task.keys())) == null ? void 0 : _a25.reduce((promise, index2) => {
      const promise_ = promise.then((res) => {
        if (!(res == null ? void 0 : res.error)) {
          onSuccess == null ? void 0 : onSuccess(res);
        }
        return new Promise((resolve) => {
          var _a26;
          (_a26 = task == null ? void 0 : task[index2]) == null ? void 0 : _a26.call(task, resolve, interruptibleReject(resolve), index2);
        });
      });
      return promise_;
    }, Promise.resolve());
  };
  useTimeout(() => {
    onReady == null ? void 0 : onReady();
    runTask();
  }, delay2);
}

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/useToggle/index.js
import { ref as ref10, computed as computed5, shallowReadonly } from "vue";
function useToggle(defaultValue = false, reverseValue) {
  const state = ref10(defaultValue);
  const actions = computed5(() => {
    const reverseValueOrigin = reverseValue === void 0 ? !defaultValue : reverseValue;
    const toggle = () => {
      state.value = state.value === defaultValue ? reverseValueOrigin : defaultValue;
    };
    const set2 = (value) => state.value = value;
    const setLeft = () => state.value = defaultValue;
    const setRight = () => state.value = reverseValueOrigin;
    return {
      toggle,
      set: set2,
      setLeft,
      setRight
    };
  });
  return [shallowReadonly(state), { ...actions.value }];
}

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/useBoolean/index.js
function useBoolean(defaultValue = false) {
  const [state, { set: set2, toggle }] = useToggle(defaultValue);
  const actions = {
    set: (v) => set2(!!v),
    setTrue: () => set2(true),
    setFalse: () => set2(false),
    toggle
  };
  return [state, actions];
}

// ../../../../Project/100ls-native/node_modules/js-cookie/dist/js.cookie.mjs
function assign2(target2) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key in source) {
      target2[key] = source[key];
    }
  }
  return target2;
}
var defaultConverter = {
  read: function(value) {
    if (value[0] === '"') {
      value = value.slice(1, -1);
    }
    return value.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent);
  },
  write: function(value) {
    return encodeURIComponent(value).replace(
      /%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,
      decodeURIComponent
    );
  }
};
function init(converter, defaultAttributes) {
  function set2(name, value, attributes) {
    if (typeof document === "undefined") {
      return;
    }
    attributes = assign2({}, defaultAttributes, attributes);
    if (typeof attributes.expires === "number") {
      attributes.expires = new Date(Date.now() + attributes.expires * 864e5);
    }
    if (attributes.expires) {
      attributes.expires = attributes.expires.toUTCString();
    }
    name = encodeURIComponent(name).replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent).replace(/[()]/g, escape);
    var stringifiedAttributes = "";
    for (var attributeName in attributes) {
      if (!attributes[attributeName]) {
        continue;
      }
      stringifiedAttributes += "; " + attributeName;
      if (attributes[attributeName] === true) {
        continue;
      }
      stringifiedAttributes += "=" + attributes[attributeName].split(";")[0];
    }
    return document.cookie = name + "=" + converter.write(value, name) + stringifiedAttributes;
  }
  function get2(name) {
    if (typeof document === "undefined" || arguments.length && !name) {
      return;
    }
    var cookies = document.cookie ? document.cookie.split("; ") : [];
    var jar = {};
    for (var i = 0; i < cookies.length; i++) {
      var parts = cookies[i].split("=");
      var value = parts.slice(1).join("=");
      try {
        var found = decodeURIComponent(parts[0]);
        jar[found] = converter.read(value, found);
        if (name === found) {
          break;
        }
      } catch (e) {
      }
    }
    return name ? jar[name] : jar;
  }
  return Object.create(
    {
      set: set2,
      get: get2,
      remove: function(name, attributes) {
        set2(
          name,
          "",
          assign2({}, attributes, {
            expires: -1
          })
        );
      },
      withAttributes: function(attributes) {
        return init(this.converter, assign2({}, this.attributes, attributes));
      },
      withConverter: function(converter2) {
        return init(assign2({}, this.converter, converter2), this.attributes);
      }
    },
    {
      attributes: { value: Object.freeze(defaultAttributes) },
      converter: { value: Object.freeze(converter) }
    }
  );
}
var api = init(defaultConverter, { path: "/" });

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/useCookieState/index.js
import { ref as ref11, readonly } from "vue";

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/utils/isFunction.js
function isFunction3(value) {
  return typeof value === "function";
}

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/useCookieState/index.js
function useCookieState(cookieKey, options = {}) {
  const defaultValue = () => {
    const cookieValue = api.get(cookieKey);
    if (typeof cookieValue === "string")
      return cookieValue;
    if (isFunction3(options.defaultValue)) {
      return options.defaultValue();
    }
    return options.defaultValue;
  };
  const state = ref11(defaultValue());
  const updateState = (newValue, newOptions = {}) => {
    const { defaultValue: defaultValue2, ...restOptions } = { ...options, ...newOptions };
    const getValue2 = () => {
      const value = isFunction3(newValue) ? newValue(state.value) : newValue;
      if (value === void 0) {
        api.remove(cookieKey);
      } else {
        api.set(cookieKey, value, restOptions);
      }
      return value;
    };
    state.value = getValue2();
  };
  return [readonly(state), updateState];
}

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/utils/index.js
var isFunction4 = (value) => typeof value === "function";
var isString3 = (value) => typeof value === "string";
var isNumber3 = (value) => typeof value === "number";

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/useCounter/index.js
import { ref as ref12, readonly as readonly2 } from "vue";
function getTargetValue(val, options = {}) {
  const { min: min2, max: max2 } = options;
  let target2 = val;
  if (isNumber3(max2)) {
    target2 = Math.min(max2, target2);
  }
  if (isNumber3(min2)) {
    target2 = Math.max(min2, target2);
  }
  return target2;
}
function useCounter(initialValue = 0, options = {}) {
  const { min: min2, max: max2 } = options;
  const current = ref12(
    getTargetValue(initialValue, {
      min: min2,
      max: max2
    })
  );
  const setValue = (value) => {
    const target2 = isNumber3(value) ? value : value(current.value);
    current.value = getTargetValue(target2, {
      max: max2,
      min: min2
    });
    return current.value;
  };
  const inc = (delta = 1) => {
    setValue((c) => c + delta);
  };
  const dec = (delta = 1) => {
    setValue((c) => c - delta);
  };
  const set2 = (value) => {
    setValue(value);
  };
  const reset = () => {
    setValue(initialValue);
  };
  return [
    readonly2(current),
    {
      inc,
      dec,
      set: set2,
      reset
    }
  ];
}

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/useControlledState/index.js
import { computed as computed6, ref as ref13, watch as watch3 } from "vue";
function useControlledState(value, defaultValue, onChange) {
  var _a25;
  const isControlled = computed6(() => value.value !== void 0);
  const initialValue = (_a25 = value.value) != null ? _a25 : defaultValue;
  const internalState = ref13(initialValue);
  const wasControlled = ref13(isControlled.value);
  const currentValue = computed6(
    () => isControlled.value ? value.value : internalState.value
  );
  watch3(isControlled, (newVal, oldVal) => {
    if (newVal !== oldVal) {
      console.warn(
        `WARN: Component changed from ${wasControlled.value ? "controlled" : "uncontrolled"} to ${newVal ? "controlled" : "uncontrolled"}`
      );
      wasControlled.value = newVal;
    }
  });
  function setValue(newValue, ...args) {
    if (typeof newValue === "function") {
      console.warn(
        "Function callbacks are not supported. See: https://github.com/adobe/react-spectrum/issues/2320"
      );
      const prev = currentValue.value;
      const updatedValue = newValue(prev);
      if (!isControlled.value) {
        internalState.value = updatedValue;
      }
      if (!Object.is(prev, updatedValue)) {
        onChange == null ? void 0 : onChange(updatedValue, ...args);
      }
    } else {
      const shouldUpdate = !Object.is(currentValue.value, newValue);
      if (!isControlled.value) {
        internalState.value = newValue;
      }
      if (shouldUpdate) {
        onChange == null ? void 0 : onChange(newValue, ...args);
      }
    }
  }
  return [currentValue, setValue];
}

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/useDebounce/index.js
import { ref as ref15, watch as watch5 } from "vue";

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/useDebounceFn/index.js
import { ref as ref14, watch as watch4, onUnmounted as onUnmounted2 } from "vue";
function useDebounceFn(fn, options) {
  const optionsRef = ref14(options || { wait: 1e3 });
  const debouncedRef = ref14();
  const createDebounced = () => {
    const { wait = 1e3, ...rest2 } = optionsRef.value;
    return debounce_default(fn, wait, rest2);
  };
  debouncedRef.value = createDebounced();
  watch4(
    () => ({ ...optionsRef.value }),
    (newVal, oldVal) => {
      var _a25;
      if (newVal.wait !== (oldVal == null ? void 0 : oldVal.wait) || newVal.maxWait !== (oldVal == null ? void 0 : oldVal.maxWait)) {
        (_a25 = debouncedRef.value) == null ? void 0 : _a25.cancel();
        debouncedRef.value = createDebounced();
      }
    },
    { deep: true }
  );
  onUnmounted2(() => {
    var _a25;
    (_a25 = debouncedRef.value) == null ? void 0 : _a25.cancel();
  });
  return {
    run: (...args) => {
      var _a25;
      return (_a25 = debouncedRef.value) == null ? void 0 : _a25.call(debouncedRef, ...args);
    },
    cancel: () => {
      var _a25;
      (_a25 = debouncedRef.value) == null ? void 0 : _a25.cancel();
    },
    flush: () => {
      var _a25;
      (_a25 = debouncedRef.value) == null ? void 0 : _a25.flush();
    },
    updateOptions: (newOptions) => {
      optionsRef.value = newOptions;
    }
  };
}

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/useDebounce/index.js
function useDebounce(value, options) {
  const debounced = ref15(value.value);
  const { run } = useDebounceFn(() => debounced.value = value.value, options);
  watch5(value, () => run(), { deep: true });
  return debounced;
}

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/useDrag/index.js
import { ref as ref17 } from "vue";

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/utils/domTarget.js
import { isRef as isRef3 } from "vue";

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/utils/isBrowser.js
var isBrowser3 = !!(typeof window !== "undefined" && window.document && window.document.createElement);

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/utils/domTarget.js
function getTargetElement(target2, defaultElement) {
  var _a25, _b25;
  if (!isBrowser3) {
    return void 0;
  }
  if (!target2) {
    return defaultElement;
  }
  let targetElement;
  if (typeof target2 === "function") {
    targetElement = target2();
  } else if (isRef3(target2)) {
    targetElement = (_b25 = (_a25 = target2.value) == null ? void 0 : _a25.$el) != null ? _b25 : target2.value;
  } else {
    targetElement = target2;
  }
  return targetElement;
}

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/utils/useEffectWithTarget.js
import { watchEffect as watchEffect9 } from "vue";

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/utils/createEffectWithTarget.js
import { ref as ref16, onUnmounted as onUnmounted3 } from "vue";

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/utils/depsAreSame.js
function depsAreSame(oldDeps, deps) {
  if (oldDeps === deps)
    return true;
  for (let i = 0; i < oldDeps.length; i++) {
    if (!Object.is(oldDeps[i], deps[i]))
      return false;
  }
  return true;
}

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/utils/createEffectWithTarget.js
var createEffectWithTarget = (useEffectType) => {
  const useEffectWithTarget2 = (effect, deps, target2) => {
    const hasInitRef = ref16(false);
    const lastElementRef = ref16([]);
    const lastDepsRef = ref16([]);
    const unLoadRef = ref16();
    useEffectType(() => {
      var _a25;
      const targets = Array.isArray(target2) ? target2 : [target2];
      const els = targets.map((item) => getTargetElement(item));
      if (!hasInitRef.value) {
        hasInitRef.value = true;
        lastElementRef.value = els;
        lastDepsRef.value = deps;
        unLoadRef.value = effect();
        return;
      }
      if (els.length !== lastElementRef.value.length || !depsAreSame(els, lastElementRef.value) || !depsAreSame(deps, lastDepsRef.value)) {
        (_a25 = unLoadRef.value) == null ? void 0 : _a25.call(unLoadRef);
        lastElementRef.value = els;
        lastDepsRef.value = deps;
        unLoadRef.value = effect();
      }
    });
    onUnmounted3(() => {
      var _a25;
      (_a25 = unLoadRef.value) == null ? void 0 : _a25.call(unLoadRef);
      hasInitRef.value = false;
    });
  };
  return useEffectWithTarget2;
};

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/utils/useEffectWithTarget.js
var useEffectWithTarget = createEffectWithTarget(watchEffect9);

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/useDrag/index.js
var useDrag = (data, target2, options = {}) => {
  const optionsRef = ref17(options);
  useEffectWithTarget(
    () => {
      const targetElement = getTargetElement(target2);
      if (!(targetElement == null ? void 0 : targetElement.addEventListener)) {
        return;
      }
      const onDragStart = (event) => {
        var _a25, _b25, _c;
        (_b25 = (_a25 = optionsRef.value).onDragStart) == null ? void 0 : _b25.call(_a25, event);
        (_c = event.dataTransfer) == null ? void 0 : _c.setData("custom", JSON.stringify(data));
      };
      const onDragEnd = (event) => {
        var _a25, _b25;
        (_b25 = (_a25 = optionsRef.value).onDragEnd) == null ? void 0 : _b25.call(_a25, event);
      };
      targetElement.setAttribute(
        "draggable",
        `${(options == null ? void 0 : options.draggable) !== void 0 ? options == null ? void 0 : options.draggable : true}`
      );
      targetElement.addEventListener("dragstart", onDragStart);
      targetElement.addEventListener("dragend", onDragEnd);
      return () => {
        targetElement.removeEventListener("dragstart", onDragStart);
        targetElement.removeEventListener("dragend", onDragEnd);
      };
    },
    [],
    target2
  );
};

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/useDrop/index.js
import { ref as ref18 } from "vue";
var useDrop = (target2, options = {}) => {
  const optionsRef = ref18(options);
  const dragEnterTarget = ref18();
  useEffectWithTarget(
    () => {
      const targetElement = getTargetElement(target2);
      if (!(targetElement == null ? void 0 : targetElement.addEventListener)) {
        return;
      }
      const onData = (dataTransfer, event) => {
        const uri = dataTransfer.getData("text/uri-list");
        const dom = dataTransfer.getData("custom");
        if (dom && optionsRef.value.onDom) {
          let data = dom;
          try {
            data = JSON.parse(dom);
          } catch (e) {
            data = dom;
          }
          optionsRef.value.onDom(data, event);
          return;
        }
        if (uri && optionsRef.value.onUri) {
          optionsRef.value.onUri(uri, event);
          return;
        }
        if (dataTransfer.files && dataTransfer.files.length && optionsRef.value.onFiles) {
          optionsRef.value.onFiles(Array.from(dataTransfer.files), event);
          return;
        }
        if (dataTransfer.items && dataTransfer.items.length && optionsRef.value.onText) {
          dataTransfer.items[0].getAsString((text) => {
            optionsRef.value.onText(text, event);
          });
        }
      };
      const onDragEnter = (event) => {
        var _a25, _b25;
        event.preventDefault();
        event.stopPropagation();
        dragEnterTarget.value = event.target;
        (_b25 = (_a25 = optionsRef.value).onDragEnter) == null ? void 0 : _b25.call(_a25, event);
      };
      const onDragOver = (event) => {
        var _a25, _b25;
        event.preventDefault();
        (_b25 = (_a25 = optionsRef.value).onDragOver) == null ? void 0 : _b25.call(_a25, event);
      };
      const onDragLeave = (event) => {
        var _a25, _b25;
        if (event.target === dragEnterTarget.value) {
          (_b25 = (_a25 = optionsRef.value).onDragLeave) == null ? void 0 : _b25.call(_a25, event);
        }
      };
      const onDrop = (event) => {
        var _a25, _b25;
        event.preventDefault();
        onData(event.dataTransfer, event);
        (_b25 = (_a25 = optionsRef.value).onDrop) == null ? void 0 : _b25.call(_a25, event);
      };
      const onPaste = (event) => {
        var _a25, _b25;
        onData(event.clipboardData, event);
        (_b25 = (_a25 = optionsRef.value).onPaste) == null ? void 0 : _b25.call(_a25, event);
      };
      targetElement.addEventListener("dragenter", onDragEnter);
      targetElement.addEventListener("dragover", onDragOver);
      targetElement.addEventListener("dragleave", onDragLeave);
      targetElement.addEventListener("drop", onDrop);
      targetElement.addEventListener("paste", onPaste);
      return () => {
        targetElement.removeEventListener("dragenter", onDragEnter);
        targetElement.removeEventListener("dragover", onDragOver);
        targetElement.removeEventListener("dragleave", onDragLeave);
        targetElement.removeEventListener("drop", onDrop);
        targetElement.removeEventListener("paste", onPaste);
      };
    },
    [],
    target2
  );
};

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/useDarkMode/index.js
import { computed as computed7, watchEffect as watchEffect12 } from "vue";

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/createUseStorageState/index.js
import { ref as ref19, watchEffect as watchEffect10, readonly as readonly3, unref as unref11 } from "vue";
function isFunction5(obj) {
  return typeof obj === "function";
}
function createUseStorageState(getStorage) {
  function useStorageState(key, options) {
    let storage;
    try {
      storage = getStorage();
    } catch (err) {
      console.error(err);
    }
    const serializer = (value) => {
      if (options == null ? void 0 : options.serializer) {
        return options == null ? void 0 : options.serializer(value);
      }
      return JSON.stringify(value);
    };
    const deserializer = (value) => {
      if (options == null ? void 0 : options.deserializer) {
        return options == null ? void 0 : options.deserializer(value);
      }
      return JSON.parse(value);
    };
    function getStoredValue() {
      try {
        const raw = storage == null ? void 0 : storage.getItem(unref11(key));
        if (raw) {
          return deserializer(raw);
        }
      } catch (e) {
        console.error(e);
      }
      if (isFunction5(options == null ? void 0 : options.defaultValue)) {
        return options == null ? void 0 : options.defaultValue();
      }
      return options == null ? void 0 : options.defaultValue;
    }
    const state = ref19(getStoredValue());
    watchEffect10(() => {
      if (key)
        state.value = getStoredValue();
    });
    const updateState = (value) => {
      if (typeof value === "undefined") {
        state.value = void 0;
        storage == null ? void 0 : storage.removeItem(unref11(key));
      } else if (isFunction5(value)) {
        const currentState = value(state.value);
        try {
          state.value = currentState;
          storage == null ? void 0 : storage.setItem(unref11(key), serializer(currentState));
        } catch (e) {
          console.error(e);
        }
      } else {
        try {
          state.value = value;
          storage == null ? void 0 : storage.setItem(unref11(key), serializer(value));
        } catch (e) {
          console.error(e);
        }
      }
    };
    return [readonly3(state), updateState];
  }
  return useStorageState;
}

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/useLocalStorageState/index.js
var useLocalStorageState = createUseStorageState(
  () => isBrowser3 ? localStorage : void 0
);

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/useMedia/index.js
import { ref as ref20, watchEffect as watchEffect11 } from "vue";
function useMedia(queries, values2, defaultValue) {
  const mediaQueryLists = queries.map((q) => window.matchMedia(q));
  const getValue2 = () => {
    const index2 = mediaQueryLists.findIndex((mql) => mql.matches);
    return typeof values2[index2] !== "undefined" ? values2[index2] : defaultValue;
  };
  const value = ref20(getValue2());
  const handler = () => {
    value.value = getValue2();
  };
  watchEffect11((onInvalidate) => {
    mediaQueryLists.forEach((mql) => {
      mql.addListener(handler);
    });
    onInvalidate(() => {
      mediaQueryLists.forEach(
        (mql) => mql.removeListener(handler)
      );
    });
  });
  return value;
}

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/useDarkMode/index.js
function useDarkMode() {
  const [enabledState, setEnabledState] = useLocalStorageState("dark-mode-enabled");
  const prefersDarkMode = usePrefersDarkMode();
  const enabled = computed7(() => {
    return typeof enabledState.value !== "undefined" ? enabledState.value : prefersDarkMode.value;
  });
  watchEffect12(() => {
    const className = "[vue-hooks-plus]-dark-mode";
    const element = window.document.body;
    if (enabled.value) {
      element.classList.add(className);
    } else {
      element.classList.remove(className);
    }
  });
  return [enabled, setEnabledState];
}
function usePrefersDarkMode() {
  return useMedia(["(prefers-color-scheme: dark)"], [true], false);
}

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/useExternal/index.js
import { ref as ref21, computed as computed8, unref as unref12, watchEffect as watchEffect13, readonly as readonly4 } from "vue";
var EXTERNAL_USED_COUNT = {};
var loadScript = (path, props = {}) => {
  const script = document.querySelector(`script[src="${path}"]`);
  if (!script) {
    const newScript = document.createElement("script");
    newScript.src = path;
    Object.keys(props).forEach((key) => {
      newScript[key] = props[key];
    });
    newScript.setAttribute("data-status", "loading");
    document.body.appendChild(newScript);
    return {
      ref: newScript,
      status: "loading"
    };
  }
  return {
    ref: script,
    status: script.getAttribute("data-status") || "ready"
  };
};
var loadCss = (path, props = {}) => {
  const css = document.querySelector(`link[href="${path}"]`);
  if (!css) {
    const newCss = document.createElement("link");
    newCss.rel = "stylesheet";
    newCss.href = path;
    Object.keys(props).forEach((key) => {
      newCss[key] = props[key];
    });
    const isLegacyIECss = "hideFocus" in newCss;
    if (isLegacyIECss && newCss.relList) {
      newCss.rel = "preload";
      newCss.as = "style";
    }
    newCss.setAttribute("data-status", "loading");
    document.head.appendChild(newCss);
    return {
      ref: newCss,
      status: "loading"
    };
  }
  return {
    ref: css,
    status: css.getAttribute("data-status") || "ready"
  };
};
function useExternal(path, options) {
  const status = ref21(path ? "loading" : "unset");
  const hookRef = ref21();
  const path_ = computed8(() => unref12(path));
  watchEffect13((onInvalidate) => {
    var _a25, _b25, _c, _d;
    if (!path_.value) {
      status.value = "unset";
      return;
    }
    const pathname = (_b25 = (_a25 = path_.value) == null ? void 0 : _a25.replace(/[|#].*$/, "")) != null ? _b25 : "";
    if ((options == null ? void 0 : options.type) === "css" || !(options == null ? void 0 : options.type) && /(^css!|\.css$)/.test(pathname)) {
      const result2 = loadCss((_c = path_.value) != null ? _c : "", options == null ? void 0 : options.css);
      hookRef.value = result2.ref;
      status.value = result2.status;
    } else if ((options == null ? void 0 : options.type) === "js" || !(options == null ? void 0 : options.type) && /(^js!|\.js$)/.test(pathname)) {
      const result2 = loadScript((_d = path_.value) != null ? _d : "", options == null ? void 0 : options.js);
      hookRef.value = result2.ref;
      status.value = result2.status;
    } else {
      console.error(
        "Cannot infer the type of external resource, and please provide a type ('js' | 'css'). Refer to the https://ahooks.js.org/hooks/dom/use-external/#options"
      );
    }
    if (!hookRef.value) {
      return;
    }
    if (path_.value && EXTERNAL_USED_COUNT[path_.value] === void 0) {
      EXTERNAL_USED_COUNT[path_.value] = 1;
    } else {
      if (path_.value)
        EXTERNAL_USED_COUNT[path_.value] += 1;
    }
    const handler = (event) => {
      var _a26;
      const targetStatus = event.type === "load" ? "ready" : "error";
      (_a26 = hookRef.value) == null ? void 0 : _a26.setAttribute("data-status", targetStatus);
      status.value = targetStatus;
    };
    hookRef.value.addEventListener("load", handler);
    hookRef.value.addEventListener("error", handler);
    onInvalidate(() => {
      var _a26, _b26, _c2;
      (_a26 = hookRef.value) == null ? void 0 : _a26.removeEventListener("load", handler);
      (_b26 = hookRef.value) == null ? void 0 : _b26.removeEventListener("error", handler);
      if (path_.value)
        EXTERNAL_USED_COUNT[path_.value] -= 1;
      if (path_.value && EXTERNAL_USED_COUNT[path_.value] === 0) {
        (_c2 = hookRef.value) == null ? void 0 : _c2.remove();
      }
      hookRef.value = void 0;
    });
  });
  return readonly4(status);
}

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/useEventListener/index.js
import { ref as ref22 } from "vue";
function useEventListener(eventName, handler, options = {}) {
  const handlerRef = ref22(handler);
  useEffectWithTarget(
    () => {
      const targetElement = getTargetElement(options.target, window);
      if (!(targetElement == null ? void 0 : targetElement.addEventListener)) {
        return;
      }
      const eventListener = (event) => {
        return handlerRef.value(event);
      };
      targetElement.addEventListener(eventName, eventListener, {
        capture: options.capture,
        once: options.once,
        passive: options.passive
      });
      return () => {
        targetElement.removeEventListener(eventName, eventListener, {
          capture: options.capture
        });
      };
    },
    [eventName, options.capture, options.once, options.passive],
    options.target
  );
}

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/useEventEmitter/index.js
import { ref as ref24, computed as computed9, watchEffect as watchEffect15 } from "vue";

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/useEventEmitter/event.js
import { ref as ref23, watchEffect as watchEffect14 } from "vue";
var __defProp6 = Object.defineProperty;
var __defNormalProp4 = (obj, key, value) => key in obj ? __defProp6(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField4 = (obj, key, value) => {
  __defNormalProp4(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var EventEmitter = class {
  constructor() {
    __publicField4(this, "subscriptions", /* @__PURE__ */ new Map());
    __publicField4(this, "emitEffectCache", /* @__PURE__ */ new Map());
    __publicField4(this, "useSubscription", (event, listener) => {
      const callbackRef = ref23();
      watchEffect14((onInvalidate) => {
        var _a25, _b25;
        callbackRef.value = listener;
        function subscription(val) {
          if (callbackRef.value) {
            callbackRef.value(val);
          }
        }
        const subscriptions = (_b25 = (_a25 = this.subscriptions) == null ? void 0 : _a25.get(event)) != null ? _b25 : [];
        subscriptions.push(subscription);
        this.subscriptions.set(event, subscriptions);
        this.emitEffect(event);
        onInvalidate(() => {
          this.subscriptions.delete(event);
        });
      });
    });
    __publicField4(this, "emit", (event, ...args) => {
      if (typeof event === "string" || typeof event === "number") {
        const subscriptionValuesCallback = this.subscriptions.get(event);
        subscriptionValuesCallback == null ? void 0 : subscriptionValuesCallback.forEach((callback) => {
          callback == null ? void 0 : callback({
            params: cloneDeep_default(args),
            event
          });
        });
        this.emitEffectCache.set(event, {
          params: cloneDeep_default(args),
          event
        });
      } else
        throw new TypeError("event must be string or number !");
    });
    __publicField4(this, "emitEffect", (event) => {
      const emitEffectCache = this.emitEffectCache.get(event);
      const listeners4 = this.subscriptions.get(event);
      if (emitEffectCache)
        listeners4 == null ? void 0 : listeners4.forEach((listener) => {
          listener == null ? void 0 : listener({
            ...emitEffectCache
          });
        });
    });
    __publicField4(this, "removeListener", (event) => {
      this.subscriptions.delete(event);
    });
    __publicField4(this, "clear", () => {
      this.subscriptions.clear();
    });
    this.clear();
  }
};
var eventEmitterOverall = new EventEmitter();

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/useEventEmitter/index.js
function useEventEmitter(options) {
  const eventRef = ref24();
  const eventEmitterOptions = computed9(() => options != null ? options : { global: false });
  if (!eventRef.value) {
    eventRef.value = eventEmitterOptions.value.global ? eventRef.value = eventEmitterOverall : eventRef.value = new EventEmitter();
  }
  watchEffect15((onInvalidate) => {
    onInvalidate(() => {
      var _a25;
      return (_a25 = eventRef.value) == null ? void 0 : _a25.clear();
    });
  });
  return eventRef.value;
}

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/useFavicon/index.js
import { computed as computed10, unref as unref13, watchEffect as watchEffect16 } from "vue";
var UseFaviconImgTypeMap = {
  SVG: "image/svg+xml",
  ICO: "image/x-icon",
  GIF: "image/gif",
  PNG: "image/png"
};
function useFavicon(href) {
  const _href = computed10(() => unref13(href));
  watchEffect16(() => {
    var _a25;
    if (!_href.value)
      return;
    const cutUrl = (_a25 = _href.value) == null ? void 0 : _a25.split(".");
    const imgSuffix = cutUrl[cutUrl.length - 1].toLocaleUpperCase();
    const link = document.querySelector("link[rel*='icon']") || document.createElement("link");
    link.type = UseFaviconImgTypeMap[imgSuffix];
    link.href = _href.value;
    link.rel = "shortcut icon";
    document.getElementsByTagName("head")[0].appendChild(link);
  });
}

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/useFocusWithin/index.js
function useFocusWithin(target2, options) {
  const [isFocusWithin, { set: setIsFocusWithin }] = useBoolean(false);
  const { onFocus, onBlur, onChange } = options || {};
  useEventListener(
    "focusin",
    (e) => {
      if (!isFocusWithin.value) {
        onFocus == null ? void 0 : onFocus(e);
        onChange == null ? void 0 : onChange(true);
        setIsFocusWithin(true);
      }
    },
    {
      target: target2
    }
  );
  useEventListener(
    "focusout",
    (e) => {
      var _a25, _b25;
      if (isFocusWithin.value && !((_b25 = (_a25 = e.currentTarget) == null ? void 0 : _a25.contains) == null ? void 0 : _b25.call(_a25, e.relatedTarget))) {
        onBlur == null ? void 0 : onBlur(e);
        onChange == null ? void 0 : onChange(false);
        setIsFocusWithin(false);
      }
    },
    {
      target: target2
    }
  );
  return isFocusWithin;
}

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/useFormatResult/index.js
import { computed as computed11, unref as unref14 } from "vue";
function useFormatResult(data, formatResultCallback) {
  const formatResultData = computed11(() => formatResultCallback(unref14(data)));
  return formatResultData;
}

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/useFetchs/index.js
import { ref as ref25, createApp, defineComponent, watchEffect as watchEffect17, watch as watch6 } from "vue";
function renderHook(renderFC) {
  const app = createApp(
    defineComponent({
      setup() {
        renderFC();
        return () => {
        };
      }
    })
  );
  app.mount(document.createElement("div"));
}
var DEFAULT_KEY = "VUE_HOOKS_PLUS_USE_REQUEST_DEFAULT_KEY";
function keyIsStringOrNumber(value) {
  return typeof value === "string" || typeof value === "number";
}
function useFetchs(service, options, self2) {
  const fetchKeyPersist = ref25(self2 == null ? void 0 : self2.fetchKey);
  const fetchs = ref25({});
  const newFetchs = ref25({});
  const setFetchs = (fetchs_) => {
    newFetchs.value = fetchs_;
  };
  const fetchRun = (...args) => {
    var _a25, _b25;
    const newstFetchKey = ref25();
    const cacheKey = (_b25 = (_a25 = fetchKeyPersist.value) == null ? void 0 : _a25.call(fetchKeyPersist, ...args)) != null ? _b25 : DEFAULT_KEY;
    newstFetchKey.value = cacheKey;
    renderHook(() => {
      const { data, run, params, loading } = useRequest(service, {
        ...options,
        cacheKey,
        manual: true
      });
      watchEffect17(() => {
        fetchs.value[cacheKey] = {
          key: cacheKey,
          data: data == null ? void 0 : data.value,
          params: params.value,
          loading: loading.value
        };
        setFetchs(fetchs.value);
      });
      run(...args);
      watch6([data, params, loading, newstFetchKey], (curr) => {
        const [
          newData = void 0,
          newParams = void 0,
          newLoading = false,
          key = DEFAULT_KEY
        ] = curr;
        const fetchKey = keyIsStringOrNumber(key) ? key : DEFAULT_KEY;
        fetchs.value[fetchKey] = {
          key: fetchKey,
          data: newData,
          params: newParams,
          loading: newLoading
        };
        setFetchs(fetchs.value);
      });
    });
  };
  return {
    fetchs: newFetchs,
    fetchRun
  };
}

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/useFullscreen/index.js
var import_screenfull = __toESM(require_screenfull());
import { ref as ref26, onUnmounted as onUnmounted4, readonly as readonly5 } from "vue";
var useFullscreen = (target2, options) => {
  const { onExit, onEnter, defaultElement = document.documentElement } = options || {};
  const onExitRef = ref26(onExit);
  const onEnterRef = ref26(onEnter);
  const state = ref26(false);
  const setState = (val) => {
    state.value = val;
  };
  const onChange = () => {
    var _a25, _b25, _c;
    if (import_screenfull.default.isEnabled) {
      const el = getTargetElement(target2, defaultElement);
      if (!import_screenfull.default.element) {
        (_a25 = onExitRef.value) == null ? void 0 : _a25.call(onExitRef);
        setState(false);
        import_screenfull.default.off("change", onChange);
      } else {
        const isFullscreen = import_screenfull.default.element === el;
        if (isFullscreen) {
          (_b25 = onEnterRef.value) == null ? void 0 : _b25.call(onEnterRef);
        } else {
          (_c = onExitRef.value) == null ? void 0 : _c.call(onExitRef);
        }
        setState(isFullscreen);
      }
    }
  };
  const enterFullscreen = () => {
    const el = getTargetElement(target2, defaultElement);
    if (!el) {
      return;
    }
    if (import_screenfull.default.isEnabled) {
      try {
        import_screenfull.default.request(el);
        import_screenfull.default.on("change", onChange);
      } catch (error) {
        console.error(error);
      }
    }
  };
  const exitFullscreen = () => {
    const el = getTargetElement(target2, defaultElement);
    if (import_screenfull.default.isEnabled && import_screenfull.default.element === el) {
      import_screenfull.default.exit();
    }
  };
  const toggleFullscreen = () => {
    if (state.value) {
      exitFullscreen();
    } else {
      enterFullscreen();
    }
  };
  onUnmounted4(() => {
    if (import_screenfull.default.isEnabled) {
      import_screenfull.default.off("change", onChange);
    }
  });
  return [
    readonly5(state),
    {
      enterFullscreen,
      exitFullscreen,
      toggleFullscreen,
      isEnabled: import_screenfull.default.isEnabled
    }
  ];
};

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/useHover/index.js
function useHover(target2, options) {
  const { onEnter, onLeave, onChange } = options || {};
  const [state, { setTrue, setFalse }] = useBoolean(false);
  useEventListener(
    "mouseenter",
    () => {
      onEnter == null ? void 0 : onEnter();
      setTrue();
      onChange == null ? void 0 : onChange(true);
    },
    {
      target: target2
    }
  );
  useEventListener(
    "mouseleave",
    () => {
      onLeave == null ? void 0 : onLeave();
      setFalse();
      onChange == null ? void 0 : onChange(false);
    },
    {
      target: target2
    }
  );
  return state;
}

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/usePrevious/index.js
import { ref as ref27, watchEffect as watchEffect18, readonly as readonly6 } from "vue";
var defaultShouldUpdate = (a, b) => !Object.is(a, b);
function usePrevious(state, shouldUpdate = defaultShouldUpdate) {
  const prevRef = ref27();
  const curRef = ref27();
  watchEffect18(() => {
    if (shouldUpdate(curRef.value, state.value)) {
      prevRef.value = curRef.value;
      curRef.value = state.value;
    }
  });
  return readonly6(prevRef);
}

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/useInterval/index.js
import { ref as ref28, watchEffect as watchEffect19, isRef as isRef4, unref as unref15 } from "vue";
function useInterval(fn, delay2, options) {
  const immediate = options == null ? void 0 : options.immediate;
  const fnRef = ref28(fn);
  const timerRef = ref28(null);
  const setupInterval = () => {
    if (isRef4(delay2)) {
      if (typeof delay2.value !== "number" || delay2.value < 0)
        return;
    } else {
      if (typeof delay2 !== "number" || delay2 < 0)
        return;
    }
    if (immediate) {
      fnRef.value();
    }
    const _deply = unref15(delay2);
    timerRef.value = setInterval(() => {
      fnRef.value();
    }, _deply);
  };
  const clear = () => {
    if (timerRef.value) {
      clearInterval(timerRef.value);
    }
  };
  const restart = () => {
    clear();
    setupInterval();
  };
  watchEffect19((onInvalidate) => {
    setupInterval();
    onInvalidate(clear);
  });
  return {
    clear,
    restart
  };
}

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/useInfiniteScroll/index.js
import { ref as ref29, computed as computed12, watch as watch7, shallowReadonly as shallowReadonly2, readonly as readonly7 } from "vue";

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/utils/rect.js
var getScrollTop = (el) => {
  if (el === document || el === document.documentElement || el === document.body) {
    return Math.max(
      window.pageYOffset,
      document.documentElement.scrollTop,
      document.body.scrollTop
    );
  }
  return el.scrollTop;
};
var getScrollHeight = (el) => {
  return el.scrollHeight || Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
};
var getClientHeight = (el) => {
  return el.clientHeight || Math.max(document.documentElement.clientHeight, document.body.clientHeight);
};

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/useInfiniteScroll/index.js
var useInfiniteScroll = (service, options = {}) => {
  const {
    target: target2,
    isNoMore,
    threshold = 100,
    reloadDeps = [],
    manual,
    onBefore,
    onSuccess,
    onError,
    onFinally
  } = options;
  const finalData = ref29();
  const [loadingMore, { set: setLoadingMore }] = useBoolean();
  const setFinalData = (mutateData) => {
    finalData.value = mutateData;
  };
  const noMore = computed12(() => {
    if (!isNoMore)
      return false;
    return isNoMore(finalData.value);
  });
  const { loading, run, runAsync, cancel } = useRequest(
    async (lastData) => {
      const currentData = await service(lastData);
      if (!lastData) {
        finalData.value = currentData;
      } else {
        finalData.value = {
          ...currentData,
          list: [...lastData.list, ...currentData.list]
        };
      }
      return currentData;
    },
    {
      manual,
      onFinally: (_, d, e) => {
        setLoadingMore(false);
        onFinally == null ? void 0 : onFinally(d, e);
      },
      onBefore: () => onBefore == null ? void 0 : onBefore(),
      onSuccess: (d) => {
        setTimeout(() => {
          scrollMethod();
        });
        onSuccess == null ? void 0 : onSuccess(d);
      },
      onError: (e) => onError == null ? void 0 : onError(e)
    }
  );
  const loadMore = () => {
    if (noMore.value)
      return;
    setLoadingMore(true);
    run(finalData.value);
  };
  const loadMoreAsync = () => {
    if (noMore.value)
      return;
    setLoadingMore(true);
    return runAsync(finalData.value);
  };
  const reload = () => run();
  const reloadAsync = () => runAsync();
  const scrollMethod = () => {
    const el = getTargetElement(target2);
    if (!el) {
      return;
    }
    const scrollTop = getScrollTop(el);
    const scrollHeight = getScrollHeight(el);
    const clientHeight = getClientHeight(el);
    if (scrollHeight - scrollTop <= clientHeight + threshold) {
      loadMore();
    }
  };
  useEventListener(
    "scroll",
    () => {
      if (loading.value || loadingMore.value) {
        return;
      }
      scrollMethod();
    },
    { target: target2 }
  );
  watch7(reloadDeps, () => {
    run();
  });
  const _loading = computed12(() => !loadingMore.value && loading.value);
  return {
    data: shallowReadonly2(finalData),
    loading: readonly7(_loading),
    loadingMore,
    noMore,
    loadMore,
    loadMoreAsync,
    reload,
    reloadAsync,
    mutate: setFinalData,
    scrollMethod,
    cancel
  };
};

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/useInViewport/index.js
import { ref as ref30, readonly as readonly8 } from "vue";
function useInViewport(target2, options) {
  const state = ref30();
  const ratio = ref30();
  useEffectWithTarget(
    () => {
      const el = getTargetElement(target2);
      if (!el) {
        return;
      }
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            state.value = entry.isIntersecting;
            ratio.value = entry.intersectionRatio;
          }
        },
        {
          ...options,
          root: getTargetElement(options == null ? void 0 : options.root)
        }
      );
      observer.observe(el);
      return () => {
        observer.disconnect();
      };
    },
    [],
    target2
  );
  return [readonly8(state), readonly8(ratio)];
}

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/useKeyPress/index.js
import { ref as ref32 } from "vue";

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/utils/useDeepCompareWithTarget.js
import { ref as ref31 } from "vue";
var depsEqual = (aDeps, bDeps = []) => {
  return isEqual_default(aDeps, bDeps);
};
var useDeepCompareEffectWithTarget = (effect, deps, target2) => {
  const targetRef = ref31();
  const signalRef = ref31(0);
  if (!depsEqual(deps, targetRef.value)) {
    targetRef.value = deps;
    signalRef.value += 1;
  }
  useEffectWithTarget(effect, [signalRef], target2);
};

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/useKeyPress/index.js
var aliasKeyCodeMap = {
  "0": 48,
  "1": 49,
  "2": 50,
  "3": 51,
  "4": 52,
  "5": 53,
  "6": 54,
  "7": 55,
  "8": 56,
  "9": 57,
  backspace: 8,
  tab: 9,
  enter: 13,
  shift: 16,
  ctrl: 17,
  alt: 18,
  pausebreak: 19,
  capslock: 20,
  esc: 27,
  space: 32,
  pageup: 33,
  pagedown: 34,
  end: 35,
  home: 36,
  leftarrow: 37,
  uparrow: 38,
  rightarrow: 39,
  downarrow: 40,
  insert: 45,
  delete: 46,
  a: 65,
  b: 66,
  c: 67,
  d: 68,
  e: 69,
  f: 70,
  g: 71,
  h: 72,
  i: 73,
  j: 74,
  k: 75,
  l: 76,
  m: 77,
  n: 78,
  o: 79,
  p: 80,
  q: 81,
  r: 82,
  s: 83,
  t: 84,
  u: 85,
  v: 86,
  w: 87,
  x: 88,
  y: 89,
  z: 90,
  leftwindowkey: 91,
  rightwindowkey: 92,
  selectkey: 93,
  numpad0: 96,
  numpad1: 97,
  numpad2: 98,
  numpad3: 99,
  numpad4: 100,
  numpad5: 101,
  numpad6: 102,
  numpad7: 103,
  numpad8: 104,
  numpad9: 105,
  multiply: 106,
  add: 107,
  subtract: 109,
  decimalpoint: 110,
  divide: 111,
  f1: 112,
  f2: 113,
  f3: 114,
  f4: 115,
  f5: 116,
  f6: 117,
  f7: 118,
  f8: 119,
  f9: 120,
  f10: 121,
  f11: 122,
  f12: 123,
  numlock: 144,
  scrolllock: 145,
  semicolon: 186,
  equalsign: 187,
  comma: 188,
  dash: 189,
  period: 190,
  forwardslash: 191,
  graveaccent: 192,
  openbracket: 219,
  backslash: 220,
  closebracket: 221,
  singlequote: 222
};
var modifierKey = {
  ctrl: (event) => event.ctrlKey,
  shift: (event) => event.shiftKey,
  alt: (event) => event.altKey,
  meta: (event) => event.metaKey
};
function countKeyByEvent(event) {
  const countOfModifier = Object.keys(modifierKey).reduce((total, key) => {
    if (modifierKey[key](event)) {
      return total + 1;
    }
    return total;
  }, 0);
  return [16, 17, 18, 91, 92].includes(event.keyCode) ? countOfModifier : countOfModifier + 1;
}
function genFilterKey(event, keyFilter, exactMatch) {
  if (!event.key) {
    return false;
  }
  if (isNumber3(keyFilter)) {
    return event.keyCode === keyFilter;
  }
  const genArr = keyFilter.split(".");
  let genLen = 0;
  for (const key of genArr) {
    const genModifier = modifierKey[key];
    const aliasKeyCode = aliasKeyCodeMap[key.toLowerCase()];
    if (genModifier && genModifier(event) || aliasKeyCode && aliasKeyCode === event.keyCode) {
      genLen++;
    }
  }
  if (exactMatch) {
    return genLen === genArr.length && countKeyByEvent(event) === genArr.length;
  }
  return genLen === genArr.length;
}
function genKeyFormatter(keyFilter, exactMatch) {
  if (isFunction4(keyFilter)) {
    return keyFilter;
  }
  if (isString3(keyFilter) || isNumber3(keyFilter)) {
    return (event) => genFilterKey(event, keyFilter, exactMatch);
  }
  if (Array.isArray(keyFilter)) {
    return (event) => keyFilter.some((item) => genFilterKey(event, item, exactMatch));
  }
  return keyFilter ? () => true : () => false;
}
var defaultEvents = ["keydown"];
function useKeyPress(keyFilter, eventHandler, option) {
  const { events = defaultEvents, target: target2, exactMatch = false } = option || {};
  const eventHandlerRef = ref32(eventHandler);
  const keyFilterRef = ref32(keyFilter);
  useDeepCompareEffectWithTarget(
    () => {
      var _a25;
      const el = getTargetElement(target2, window);
      if (!el) {
        return;
      }
      const callbackHandler = (event) => {
        var _a26;
        const genGuard = genKeyFormatter(keyFilterRef.value, exactMatch);
        if (genGuard(event)) {
          return (_a26 = eventHandlerRef.value) == null ? void 0 : _a26.call(eventHandlerRef, event);
        }
      };
      for (const eventName of events) {
        (_a25 = el == null ? void 0 : el.addEventListener) == null ? void 0 : _a25.call(el, eventName, callbackHandler);
      }
      return () => {
        var _a26;
        for (const eventName of events) {
          (_a26 = el == null ? void 0 : el.removeEventListener) == null ? void 0 : _a26.call(
            el,
            eventName,
            callbackHandler
          );
        }
      };
    },
    [events],
    target2
  );
}

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/useLockFn/index.js
function useLockFn(fn) {
  let lock = false;
  return async (...args) => {
    if (lock)
      return;
    lock = true;
    try {
      const ret = await fn(...args);
      lock = false;
      return ret;
    } catch (e) {
      lock = false;
      throw e;
    }
  };
}

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/useLongPress/index.js
import { ref as ref33, readonly as readonly9 } from "vue";
var getSupportedMouseEvents = () => {
  const hasPointEvent = "PointerEvent" in window;
  if (hasPointEvent) {
    return {
      mouseDown: "pointerdown",
      mouseUp: "pointerup",
      mouseMove: "pointermove"
    };
  }
  const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
  if (isTouch) {
    return {
      mouseDown: "touchstart",
      mouseUp: "touchend",
      mouseMove: "touchmove"
    };
  }
  return {
    mouseDown: "mousedown",
    mouseUp: "mouseup",
    mouseMove: "mousemove"
  };
};
var useLongPress = (target2, options = {}) => {
  var _a25, _b25;
  const DEFAULT_DELAY_TIME = 500;
  const DEFAULT_UPDATE_TIME = 100;
  const isPressing = ref33(false);
  const pressingTime = ref33(0);
  let pressingTimer;
  let timeoutTimer;
  const eventOptions = {
    capture: (_a25 = options == null ? void 0 : options.modifiers) == null ? void 0 : _a25.capture,
    once: (_b25 = options == null ? void 0 : options.modifiers) == null ? void 0 : _b25.once
  };
  useEffectWithTarget(
    () => {
      var _a26;
      const targetElement = getTargetElement(target2);
      if (!targetElement) {
        return;
      }
      const { mouseDown, mouseUp, mouseMove } = getSupportedMouseEvents();
      function clear() {
        if (timeoutTimer) {
          clearTimeout(timeoutTimer);
          timeoutTimer = void 0;
        }
        if (pressingTimer) {
          clearInterval(pressingTimer);
          pressingTimer = void 0;
        }
        pressingTime.value = 0;
        isPressing.value = false;
      }
      function onDown(ev) {
        var _a32, _b26, _c;
        if (((_a32 = options.modifiers) == null ? void 0 : _a32.self) && ev.target !== targetElement)
          return;
        clear();
        if ((_b26 = options.modifiers) == null ? void 0 : _b26.prevent)
          ev.preventDefault();
        if ((_c = options.modifiers) == null ? void 0 : _c.stop)
          ev.stopPropagation();
        timeoutTimer = setTimeout(() => {
          isPressing.value = true;
          pressingTimer = setInterval(() => {
            pressingTime.value += options.minUpdateTime || DEFAULT_UPDATE_TIME;
          }, options.minUpdateTime || DEFAULT_UPDATE_TIME);
        }, options.delay || DEFAULT_DELAY_TIME);
      }
      targetElement.addEventListener(mouseDown, onDown, eventOptions);
      targetElement.addEventListener(mouseUp, clear, eventOptions);
      if ((_a26 = options.cancelOnMove) != null ? _a26 : true) {
        targetElement.addEventListener(mouseMove, clear, eventOptions);
      }
      return () => {
        var _a32;
        targetElement.removeEventListener(mouseDown, onDown);
        targetElement.removeEventListener(mouseUp, clear);
        if ((_a32 = options.cancelOnMove) != null ? _a32 : true) {
          targetElement.removeEventListener(mouseMove, clear);
        }
      };
    },
    [],
    target2
  );
  return { isPressing: readonly9(isPressing), pressingTime: readonly9(pressingTime) };
};

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/useMouse/index.js
import { ref as ref34, readonly as readonly10 } from "vue";
var initState = {
  screenX: NaN,
  screenY: NaN,
  clientX: NaN,
  clientY: NaN,
  pageX: NaN,
  pageY: NaN,
  elementX: NaN,
  elementY: NaN,
  elementH: NaN,
  elementW: NaN,
  elementPosX: NaN,
  elementPosY: NaN
};
function useMouse(target2) {
  const state = ref34(initState);
  useEventListener(
    "mousemove",
    (event) => {
      const { screenX, screenY, clientX, clientY, pageX, pageY } = event;
      const newState = {
        screenX,
        screenY,
        clientX,
        clientY,
        pageX,
        pageY,
        elementX: NaN,
        elementY: NaN,
        elementH: NaN,
        elementW: NaN,
        elementPosX: NaN,
        elementPosY: NaN
      };
      const targetElement = getTargetElement(target2);
      if (targetElement) {
        const { left, top, width, height } = targetElement.getBoundingClientRect();
        newState.elementPosX = left + window.pageXOffset;
        newState.elementPosY = top + window.pageYOffset;
        newState.elementX = pageX - newState.elementPosX;
        newState.elementY = pageY - newState.elementPosY;
        newState.elementW = width;
        newState.elementH = height;
      }
      state.value = newState;
    },
    {
      target: document
    }
  );
  return readonly10(state);
}

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/useMap/index.js
import { ref as ref35, markRaw } from "vue";
function useMap(initialValue) {
  const getInitValue = () => {
    return initialValue ? new Map(initialValue) : /* @__PURE__ */ new Map();
  };
  const state = ref35(getInitValue());
  const actions = {
    set: (key, value) => {
      state.value.set(key, value);
    },
    get: (key) => {
      return state.value.get(key);
    },
    remove: (key) => {
      state.value.delete(key);
    },
    has: (key) => state.value.has(key),
    clear: () => state.value.clear(),
    setAll: (newMap) => {
      state.value = new Map(newMap);
    },
    reset: () => state.value = getInitValue()
  };
  return [state, markRaw(actions)];
}

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/useNetwork/index.js
import { ref as ref36, watchEffect as watchEffect20, readonly as readonly11 } from "vue";
function getConnection() {
  const nav = navigator;
  if (typeof nav !== "object")
    return null;
  return nav.connection || nav.mozConnection || nav.webkitConnection;
}
function getConnectionProperty() {
  const c = getConnection();
  if (!c)
    return {};
  return {
    rtt: c.rtt,
    type: c.type,
    saveData: c.saveData,
    downlink: c.downlink,
    downlinkMax: c.downlinkMax,
    effectiveType: c.effectiveType
  };
}
function useNetwork() {
  const state = ref36({
    since: void 0,
    online: navigator == null ? void 0 : navigator.onLine,
    ...getConnectionProperty()
  });
  watchEffect20((onInvalidate) => {
    const onOnline = () => {
      state.value = {
        ...state.value,
        online: true,
        since: /* @__PURE__ */ new Date()
      };
    };
    const onOffline = () => {
      state.value = {
        ...state.value,
        online: false,
        since: /* @__PURE__ */ new Date()
      };
    };
    const onConnectionChange = () => {
      state.value = {
        ...state.value,
        ...getConnectionProperty()
      };
    };
    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);
    const connection = getConnection();
    connection == null ? void 0 : connection.addEventListener("change", onConnectionChange);
    onInvalidate(() => {
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
      connection == null ? void 0 : connection.removeEventListener("change", onConnectionChange);
    });
  });
  return readonly11(state);
}

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/useSessionStorageState/index.js
var useSessionStorageState = createUseStorageState(
  () => isBrowser3 ? sessionStorage : void 0
);

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/useSet/index.js
import { ref as ref37, readonly as readonly12, markRaw as markRaw2 } from "vue";
function useSet(initialValue) {
  const getInitValue = () => {
    return initialValue === void 0 ? /* @__PURE__ */ new Set() : new Set(initialValue);
  };
  const state = ref37(getInitValue());
  const actions = {
    add: (value) => {
      state.value.add(value);
    },
    remove: (value) => {
      state.value.delete(value);
    },
    has: (value) => state.value.has(value),
    clear: () => state.value.clear(),
    reset: () => {
      state.value = getInitValue();
    }
  };
  return [readonly12(state), markRaw2(actions)];
}

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/useSetState/index.js
import { ref as ref38, readonly as readonly13, unref as unref16 } from "vue";
function useSetState(initialState) {
  const getInitialState = () => unref16(initialState);
  const state = ref38(getInitialState());
  const setMergeState = (patch, cover = false) => {
    const newState = unref16(patch);
    if (cover)
      state.value = newState;
    else
      state.value = newState ? merge_default(state.value, newState) : state.value;
  };
  return [readonly13(state), setMergeState];
}

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/useSize/index.js
import { reactive as reactive2, onMounted as onMounted2, toRefs as toRefs2 } from "vue";

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/useWinResize/index.js
import { onMounted, onBeforeUnmount, nextTick } from "vue";
function useWinResize(Action = () => {
}) {
  const fn = () => {
    nextTick(() => {
      Action();
    });
  };
  onMounted(() => {
    window.addEventListener("resize", fn, false);
  });
  onBeforeUnmount(() => {
    window.removeEventListener("resize", fn);
  });
  return null;
}

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/useSize/index.js
function useSize(target2) {
  const size2 = reactive2({
    width: 0,
    height: 0
  });
  const getSizeInfo = () => {
    var _a25, _b25;
    const targetDom = getTargetElement(target2);
    size2.width = (_a25 = targetDom == null ? void 0 : targetDom.clientWidth) != null ? _a25 : 0;
    size2.height = (_b25 = targetDom == null ? void 0 : targetDom.clientHeight) != null ? _b25 : 0;
  };
  useWinResize(getSizeInfo);
  onMounted2(() => {
    setTimeout(() => {
      getSizeInfo();
    }, 120);
  });
  return { ...toRefs2(size2) };
}

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/useScroll/index.js
import { ref as ref39, readonly as readonly14 } from "vue";
function useScroll(target2, shouldUpdate = () => true) {
  const position = ref39();
  const shouldUpdateRef = ref39(shouldUpdate);
  useEffectWithTarget(
    () => {
      const el = getTargetElement(target2, document);
      if (!el) {
        return;
      }
      const updatePosition = () => {
        let newPosition;
        if (el === document) {
          if (document.scrollingElement) {
            newPosition = {
              left: document.scrollingElement.scrollLeft,
              top: document.scrollingElement.scrollTop
            };
          } else {
            newPosition = {
              left: Math.max(
                window.pageYOffset,
                document.documentElement.scrollTop,
                document.body.scrollTop
              ),
              top: Math.max(
                window.pageXOffset,
                document.documentElement.scrollLeft,
                document.body.scrollLeft
              )
            };
          }
        } else {
          newPosition = {
            left: el.scrollLeft,
            top: el.scrollTop
          };
        }
        if (shouldUpdateRef.value(newPosition)) {
          position.value = newPosition;
        }
      };
      updatePosition();
      el.addEventListener("scroll", updatePosition);
      return () => {
        el.removeEventListener("scroll", updatePosition);
      };
    },
    [],
    target2
  );
  return readonly14(position);
}

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/useThrottle/index.js
import { ref as ref41, watch as watch9 } from "vue";

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/useThrottleFn/index.js
import { ref as ref40, computed as computed13, unref as unref17, watch as watch8, onUnmounted as onUnmounted5 } from "vue";
function useThrottleFn(fn, options) {
  var _a25, _b25, _c;
  let originThrottled;
  const throttled = ref40();
  const throttleOptions = computed13(() => {
    var _a26;
    const ret = {};
    if (unref17(options == null ? void 0 : options.wait) !== void 0) {
      ret.wait = unref17(options == null ? void 0 : options.wait);
    }
    if (unref17(options == null ? void 0 : options.leading) !== void 0) {
      ret.leading = unref17(options == null ? void 0 : options.leading);
    }
    if (unref17(options == null ? void 0 : options.trailing) !== void 0) {
      ret.trailing = unref17(options == null ? void 0 : options.trailing);
    }
    return {
      ...ret,
      wait: (_a26 = ret == null ? void 0 : ret.wait) != null ? _a26 : 1e3
    };
  });
  watch8(throttleOptions, (cur) => {
    const { wait = 1e3, ...options2 } = cur;
    if (originThrottled) {
      originThrottled.cancel();
      originThrottled.flush();
    }
    const _throttle = throttle_default(
      (...args) => {
        return fn([...args]);
      },
      wait,
      options2
    );
    originThrottled = _throttle;
    throttled.value = _throttle;
  }, {
    immediate: true,
    deep: true
  });
  onUnmounted5(() => {
    var _a26;
    (_a26 = throttled.value) == null ? void 0 : _a26.cancel();
  });
  return {
    run: (_a25 = throttled.value) != null ? _a25 : () => {
    },
    cancel: (_b25 = throttled.value) == null ? void 0 : _b25.cancel,
    flush: (_c = throttled.value) == null ? void 0 : _c.flush
  };
}

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/useThrottle/index.js
function useThrottle(value, options) {
  const throttled = ref41();
  throttled.value = value.value;
  const { run } = useThrottleFn(() => {
    throttled.value = value.value;
  }, options);
  watch9(
    value,
    () => {
      run == null ? void 0 : run();
    },
    {
      immediate: true
    }
  );
  return throttled;
}

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/useTitle/index.js
import { ref as ref42, isRef as isRef5, watch as watch10, onMounted as onMounted3, unref as unref18, onUnmounted as onUnmounted6 } from "vue";
var DEFAULT_OPTIONS = {
  restoreOnUnmount: false
};
function useTitle(title, options = DEFAULT_OPTIONS) {
  const titleRef = ref42(isBrowser3 ? document.title : "");
  if (isRef5(title)) {
    watch10(title, () => {
      document.title = title.value;
    });
  } else
    document.title = title;
  onMounted3(() => {
    document.title = unref18(title);
  });
  onUnmounted6(() => {
    if (options.restoreOnUnmount) {
      document.title = unref18(titleRef);
    }
  });
}

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/useTrackedEffect/index.js
import { watch as watch11 } from "vue";
var diffTwoDeps = (deps1, deps2) => {
  return deps1 ? deps1.map((_ele, idx) => deps1[idx] !== (deps2 == null ? void 0 : deps2[idx]) ? idx : -1).filter((ele) => ele >= 0) : deps2 ? deps2.map((_ele, idx) => idx) : [];
};
var useTrackedEffect = (effect, deps) => {
  watch11(deps != null ? deps : [], (curr, prev) => {
    const changes = diffTwoDeps(prev, curr);
    effect(changes);
  });
};

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/useUpdate/index.js
import { ref as ref43, readonly as readonly15 } from "vue";
function useUpdate() {
  const update3 = ref43({});
  const setUpdate = () => {
    update3.value = Object.assign({}, { ...update3.value });
  };
  return {
    update: readonly15(update3),
    setUpdate
  };
}

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/useVirtualList/index.js
import { ref as ref44, computed as computed14, watch as watch12, reactive as reactive3 } from "vue";
var useVirtualList = (list, options) => {
  const containerTarget = ref44();
  const { wrapperTarget, itemHeight, overscan = 5 } = options;
  const size2 = useSize(containerTarget);
  const targetList = ref44([]);
  const scrollTriggerByScrollToFunc = ref44(false);
  const getVisibleCount = (containerHeight, fromIndex) => {
    if (typeof itemHeight === "number") {
      return Math.ceil(containerHeight / itemHeight);
    }
    let sum2 = 0;
    let endIndex = 0;
    for (let i = fromIndex; i < list.value.length; i++) {
      const height = itemHeight(i, list.value[i]);
      sum2 += height;
      endIndex = i;
      if (sum2 >= containerHeight) {
        break;
      }
    }
    return endIndex - fromIndex;
  };
  const getOffset = (scrollTop) => {
    if (typeof itemHeight === "number") {
      return Math.floor(scrollTop / itemHeight) + 1;
    }
    let sum2 = 0;
    let offset = 0;
    for (let i = 0; i < list.value.length; i++) {
      const height = itemHeight(i, list.value[i]);
      sum2 += height;
      if (sum2 >= scrollTop) {
        offset = i;
        break;
      }
    }
    return offset + 1;
  };
  const getDistanceTop = (index2) => {
    var _a25, _b25;
    if (typeof itemHeight === "number") {
      const height2 = index2 * itemHeight;
      return height2;
    }
    const height = (_b25 = (_a25 = list.value) == null ? void 0 : _a25.slice(0, index2)) == null ? void 0 : _b25.reduce((sum2, _, i) => sum2 + (itemHeight == null ? void 0 : itemHeight(i, list == null ? void 0 : list.value[index2])), 0);
    return height;
  };
  const totalHeight = computed14(() => {
    if (typeof itemHeight === "number") {
      return list.value.length * itemHeight;
    }
    return list.value.reduce(
      (sum2, _, index2) => sum2 + (itemHeight == null ? void 0 : itemHeight(index2, list == null ? void 0 : list.value[index2])),
      0
    );
  });
  const calculateRange = () => {
    const container2 = getTargetElement(containerTarget);
    const wrapper = getTargetElement(wrapperTarget);
    if (container2 && wrapper) {
      const { scrollTop, clientHeight } = container2;
      const offset = getOffset(scrollTop);
      const visibleCount = getVisibleCount(clientHeight, offset);
      const start = Math.max(0, offset - overscan);
      const end = Math.min(list.value.length, offset + visibleCount + overscan);
      const offsetTop = getDistanceTop(start);
      wrapper.style.height = totalHeight.value - offsetTop + "px";
      wrapper.style.marginTop = offsetTop + "px";
      targetList.value = list.value.slice(start, end).map((ele, index2) => ({
        data: ele,
        index: index2 + start
      }));
    }
  };
  watch12([size2 == null ? void 0 : size2.width, size2 == null ? void 0 : size2.height, list], () => {
    calculateRange();
  });
  const scrollTo = (index2) => {
    const container2 = getTargetElement(containerTarget);
    if (container2) {
      scrollTriggerByScrollToFunc.value = true;
      container2.scrollTop = getDistanceTop(index2);
      calculateRange();
    }
  };
  const container = reactive3({
    ref: (ele) => {
      containerTarget.value = ele;
    },
    onScroll: (e) => {
      if (scrollTriggerByScrollToFunc.value) {
        scrollTriggerByScrollToFunc.value = false;
        return;
      }
      e.preventDefault();
      calculateRange();
    }
  });
  return [targetList, container, scrollTo];
};

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/useWhyDidYouUpdate/index.js
import { computed as computed15, watch as watch13 } from "vue";
function useWhyDidYouUpdate(componentName, props) {
  const keys2 = computed15(() => Object.keys(props).map((key) => key));
  watch13(
    Object.keys(props).map((key) => props[key]),
    (curr, prev) => {
      const changedProps = {};
      keys2.value.forEach((key, index2) => {
        if (prev[index2] !== curr[index2]) {
          changedProps[key] = {
            from: prev[index2],
            to: curr[index2]
          };
        }
      });
      if (Object.keys(changedProps).length) {
        console.log("[why-did-you-update]", componentName, changedProps);
      }
    },
    {
      deep: true
    }
  );
}

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/useWebSocket/index.js
import { ref as ref45, isRef as isRef6, watch as watch14, onUnmounted as onUnmounted7, unref as unref19 } from "vue";
var ReadyState = ((ReadyState2) => {
  ReadyState2[ReadyState2["Connecting"] = 0] = "Connecting";
  ReadyState2[ReadyState2["Open"] = 1] = "Open";
  ReadyState2[ReadyState2["Closing"] = 2] = "Closing";
  ReadyState2[ReadyState2["Closed"] = 3] = "Closed";
  return ReadyState2;
})(ReadyState || {});
function useWebSocket(socketUrl, options = {}) {
  const {
    reconnectLimit = 3,
    reconnectInterval = 3 * 1e3,
    manual = ref45(false),
    onOpen,
    onClose,
    onMessage,
    onError,
    protocols
  } = options;
  const reconnectTimesRef = ref45(0);
  const reconnectTimerRef = ref45();
  const websocketRef = ref45();
  const unmountedRef = ref45(false);
  const latestMessage = ref45();
  const readyState = ref45(3);
  const reconnect = () => {
    var _a25;
    if (reconnectTimesRef.value < reconnectLimit && ((_a25 = websocketRef.value) == null ? void 0 : _a25.readyState) !== 1) {
      if (reconnectTimerRef.value) {
        clearTimeout(reconnectTimerRef.value);
      }
      reconnectTimerRef.value = setTimeout(() => {
        connectWs();
        reconnectTimesRef.value++;
      }, reconnectInterval);
    }
  };
  const connectWs = () => {
    if (reconnectTimerRef.value) {
      clearTimeout(reconnectTimerRef.value);
    }
    if (websocketRef.value) {
      websocketRef.value.close();
    }
    const ws = new WebSocket(unref19(socketUrl), protocols);
    readyState.value = 0;
    ws.onerror = (event) => {
      if (unmountedRef.value) {
        return;
      }
      reconnect();
      onError == null ? void 0 : onError(event, ws);
      readyState.value = ws.readyState || 3;
    };
    ws.onopen = (event) => {
      if (unmountedRef.value) {
        return;
      }
      onOpen == null ? void 0 : onOpen(event, ws);
      reconnectTimesRef.value = 0;
      readyState.value = ws.readyState || 1;
    };
    ws.onmessage = (message) => {
      if (unmountedRef.value) {
        return;
      }
      onMessage == null ? void 0 : onMessage(message, ws);
      latestMessage.value = message;
    };
    ws.onclose = (event) => {
      if (unmountedRef.value) {
        return;
      }
      reconnect();
      onClose == null ? void 0 : onClose(event, ws);
      readyState.value = ws.readyState || 3;
    };
    websocketRef.value = ws;
  };
  const sendMessage = (message) => {
    var _a25;
    if (readyState.value === 1) {
      (_a25 = websocketRef.value) == null ? void 0 : _a25.send(message);
    } else {
      throw new Error("WebSocket disconnected");
    }
  };
  const connect = () => {
    reconnectTimesRef.value = 0;
    connectWs();
  };
  const disconnect = () => {
    var _a25;
    if (reconnectTimerRef.value) {
      clearTimeout(reconnectTimerRef.value);
    }
    reconnectTimesRef.value = reconnectLimit;
    (_a25 = websocketRef.value) == null ? void 0 : _a25.close();
  };
  if (isRef6(socketUrl) && isRef6(manual))
    watch14(
      [socketUrl, manual],
      (c) => {
        const [_, manualWatch] = c;
        if (!manualWatch) {
          connect();
        }
      },
      {
        immediate: true
      }
    );
  else if (isRef6(manual)) {
    watch14(
      manual,
      (manualWatch) => {
        if (!manualWatch) {
          connect();
        }
      },
      {
        immediate: true
      }
    );
  } else {
    if (!manual) {
      connect();
    }
  }
  onUnmounted7(() => {
    unmountedRef.value = true;
    disconnect();
  });
  return {
    latestMessage,
    sendMessage,
    connect,
    disconnect,
    readyState,
    webSocketIns: websocketRef.value
  };
}

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/useElementBounding/index.js
import { reactive as reactive4, watch as watch16, onMounted as onMounted4, toRefs as toRefs3 } from "vue";

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/useResizeObserver/index.js
import { ref as ref46, computed as computed16, watch as watch15, getCurrentScope, onScopeDispose as onScopeDispose4 } from "vue";
function useResizeObserver(target2, callback, options) {
  const { box = "content-box", ...argsOptions } = options != null ? options : {};
  const isSupported = ref46(window && "ResizeObserver" in window);
  let ob;
  const modelTargets = computed16(
    () => Array.isArray(target2) ? target2.map((curr) => getTargetElement(curr)) : [getTargetElement(target2)]
  );
  const dispose = () => {
    if (ob) {
      ob.disconnect();
      ob = null;
    }
  };
  const watcher = watch15(
    modelTargets,
    (elements) => {
      dispose();
      if (isSupported.value && window) {
        ob = new ResizeObserver(callback);
        elements.forEach((curr) => {
          curr && ob.observe(curr, {
            box,
            ...argsOptions
          });
        });
      }
    },
    {
      flush: "post",
      immediate: true
    }
  );
  const stop = () => {
    dispose();
    watcher();
  };
  if (getCurrentScope()) {
    onScopeDispose4(stop);
  }
  return {
    isSupported,
    stop
  };
}

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/useElementBounding/index.js
function keyisUseElementBoundingReturnTypeKey(key) {
  return ["width", "height", "top", "left", "bottom", "right"].includes(key);
}
function useElementBounding(target2, options) {
  const { reset = true, windowResize = true, windowScroll = true, immediate = true } = options != null ? options : {};
  const size2 = reactive4({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  });
  const update3 = () => {
    const targetDom = getTargetElement(target2);
    if (!targetDom) {
      if (reset) {
        Object.keys(size2).forEach((key) => {
          if (keyisUseElementBoundingReturnTypeKey(key))
            size2[key] = 0;
        });
      }
      return;
    }
    if (targetDom) {
      const { width, height, top, left, bottom, right } = targetDom.getBoundingClientRect();
      size2.width = width;
      size2.height = height;
      size2.top = top;
      size2.left = left;
      size2.bottom = bottom;
      size2.right = right;
    }
  };
  if (windowResize) {
    useEventListener("resize", update3, {
      passive: true
    });
  }
  if (windowScroll) {
    useEventListener("scroll", update3, {
      capture: true,
      passive: true
    });
  }
  useResizeObserver(target2, update3);
  watch16(() => getTargetElement(target2), update3);
  onMounted4(() => {
    immediate && update3();
  });
  return {
    ...toRefs3(size2)
  };
}

// ../../../../Project/100ls-native/node_modules/vue-hooks-plus/es/useMutationObserver/index.js
var useMutationObserver = (callback, target2, options = {}) => {
  useDeepCompareEffectWithTarget(
    () => {
      const element = getTargetElement(target2);
      if (!element) {
        return;
      }
      const observer = new MutationObserver(callback);
      observer.observe(element, options);
      return () => {
        observer == null ? void 0 : observer.disconnect();
      };
    },
    [options],
    target2
  );
};
export {
  clearCache as clearUseRequestCache,
  useAsyncOrder,
  useBoolean,
  useControlledState,
  useCookieState,
  useCounter,
  useDarkMode,
  useDebounce,
  useDebounceFn,
  useDrag,
  useDrop,
  useElementBounding,
  useEventEmitter,
  useEventListener,
  useExternal,
  useFavicon,
  useFetchs,
  useFocusWithin,
  useFormatResult,
  useFullscreen,
  useHover,
  useInViewport,
  useInfiniteScroll,
  useInterval,
  useKeyPress,
  useLocalStorageState,
  useLockFn,
  useLongPress,
  useMap,
  useMedia,
  useMouse,
  useMutationObserver,
  useNetwork,
  usePrevious,
  useRequest,
  index as useRequestDevToolsPlugin,
  useRequestProvider,
  useResizeObserver,
  useScroll,
  useSessionStorageState,
  useSet,
  useSetState,
  useSize,
  useThrottle,
  useThrottleFn,
  useTimeout,
  useTitle,
  useToggle,
  useTrackedEffect,
  useUpdate,
  useVirtualList,
  useWebSocket,
  useWhyDidYouUpdate,
  useWinResize
};
/*! Bundled license information:

screenfull/dist/screenfull.js:
  (*!
  * screenfull
  * v5.2.0 - 2021-11-03
  * (c) Sindre Sorhus; MIT License
  *)

lodash-es/lodash.default.js:
  (**
   * @license
   * Lodash (Custom Build) <https://lodash.com/>
   * Build: `lodash modularize exports="es" -o ./`
   * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
   * Released under MIT license <https://lodash.com/license>
   * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
   * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
   *)

lodash-es/lodash.js:
  (**
   * @license
   * Lodash (Custom Build) <https://lodash.com/>
   * Build: `lodash modularize exports="es" -o ./`
   * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
   * Released under MIT license <https://lodash.com/license>
   * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
   * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
   *)

js-cookie/dist/js.cookie.mjs:
  (*! js-cookie v3.0.5 | MIT *)
*/
//# sourceMappingURL=vue-hooks-plus.js.map
