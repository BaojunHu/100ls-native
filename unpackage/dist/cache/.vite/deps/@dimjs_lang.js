import {
  e as e5,
  n as n2,
  t as t3
} from "./chunk-4K5QIG77.js";
import {
  a,
  e,
  e2,
  e3,
  e4,
  l,
  n,
  o,
  o2,
  t,
  t2
} from "./chunk-FAKZ4AMQ.js";
import "./chunk-LQ2VYIYD.js";

// ../../../../Project/100ls-native/node_modules/@dimjs/lang/dist/is-array-buffer.js
var e6 = function e7(t8) {
  return o2(t8) === "arrayBuffer";
};

// ../../../../Project/100ls-native/node_modules/@dimjs/lang/dist/is-array-buffer-view.js
function r(r5) {
  var f;
  if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
    f = ArrayBuffer.isView(r5);
  } else {
    f = r5 && r5.buffer && r5.buffer instanceof ArrayBuffer;
  }
  return !!f;
}

// ../../../../Project/100ls-native/node_modules/@dimjs/lang/dist/is-blob.js
var o3 = function o4(t8) {
  return o2(t8) === "blob";
};

// ../../../../Project/100ls-native/node_modules/@dimjs/lang/dist/is-boolean.js
var o5 = function o6(e15) {
  return o2(e15) === "boolean";
};

// ../../../../Project/100ls-native/node_modules/@dimjs/lang/dist/is-deep-equal.js
function t4(n5, f) {
  if (n5 === f)
    return true;
  if (n5 && f && o(n5) === "object" && o(f) === "object") {
    var a2 = a(n5);
    var i = a(f);
    var o7;
    var s;
    var u;
    if (a2 && i) {
      s = n5.length;
      if (s !== f.length) {
        return false;
      }
      for (o7 = s; o7-- !== 0; ) {
        if (!t4(n5[o7], f[o7])) {
          return false;
        }
      }
      return true;
    }
    if (a2 !== i) {
      return false;
    }
    var l2 = n5 instanceof Date;
    var p = f instanceof Date;
    if (l2 !== p)
      return false;
    if (l2 && p)
      return n5.getTime() === f.getTime();
    var c = n5 instanceof RegExp;
    var g = f instanceof RegExp;
    if (c !== g)
      return false;
    if (c && g)
      return n5.toString() === f.toString();
    var v = Object.keys(n5);
    s = v.length;
    if (s !== Object.keys(f).length) {
      return false;
    }
    for (o7 = s; o7-- !== 0; ) {
      if (!Object.prototype.hasOwnProperty.call(f, v[o7])) {
        return false;
      }
    }
    for (o7 = s; o7-- !== 0; ) {
      u = v[o7];
      if (!t4(n5[u], f[u])) {
        return false;
      }
    }
    return true;
  }
  return n5 !== n5 && f !== f;
}

// ../../../../Project/100ls-native/node_modules/@dimjs/lang/dist/is-empty.js
var e8 = function e9(n5) {
  if (e3(n5)) {
    return true;
  }
  if (n(n5)) {
    return true;
  }
  if (n2(n5)) {
    return Object.keys(n5).length <= 0;
  }
  return !String(n5);
};

// ../../../../Project/100ls-native/node_modules/@dimjs/lang/dist/is-error.js
var t5 = function t6(i) {
  if (!l(i)) {
    return false;
  }
  return o2(i) === "error" || o2(i) === "domError" || typeof i.message == "string" && typeof i.name == "string" && !e(i);
};

// ../../../../Project/100ls-native/node_modules/@dimjs/lang/dist/is-file.js
var e10 = function e11(t8) {
  return o2(t8) === "file";
};

// ../../../../Project/100ls-native/node_modules/@dimjs/lang/dist/is-form-data.js
var n3 = function n4(t8) {
  return typeof FormData !== "undefined" && t8 instanceof FormData;
};

// ../../../../Project/100ls-native/node_modules/@dimjs/lang/dist/is-nan.js
var e12 = function e13(i) {
  return e2(i) && i != +i;
};

// ../../../../Project/100ls-native/node_modules/@dimjs/lang/dist/is-promise.js
var r2 = function r3(n5) {
  if (n5 !== null && o(n5) === "object") {
    return n5 && typeof n5.then === "function";
  }
  return false;
};

// ../../../../Project/100ls-native/node_modules/@dimjs/lang/dist/is-shallow-equal.js
function r4(e15, r5) {
  if (e15 === r5) {
    return e15 !== 0 || r5 !== 0 || 1 / e15 === 1 / r5;
  } else {
    return e15 !== e15 && r5 !== r5;
  }
}
function t7(t8, l2) {
  if (r4(t8, l2)) {
    return true;
  }
  if (o(t8) !== "object" || t8 === null || o(l2) !== "object" || l2 === null) {
    return false;
  }
  var n5 = Object.keys(t8);
  var u = Object.keys(l2);
  if (n5.length !== u.length) {
    return false;
  }
  for (var f = 0; f < n5.length; f++) {
    if (!Object.prototype.hasOwnProperty.call(l2, n5[f]) || !r4(t8[n5[f]], l2[n5[f]])) {
      return false;
    }
  }
  return true;
}

// ../../../../Project/100ls-native/node_modules/@dimjs/lang/dist/is-url-search-params.js
function e14(e15) {
  return typeof URLSearchParams !== "undefined" && e15 instanceof URLSearchParams;
}
export {
  a as isArray,
  e6 as isArrayBuffer,
  r as isArrayBufferView,
  o3 as isBlob,
  o5 as isBoolean,
  t3 as isDate,
  t4 as isDeepEqual,
  e8 as isEmpty,
  t5 as isError,
  e10 as isFile,
  n3 as isFormData,
  t as isFunction,
  e12 as isNaN,
  n as isNull,
  e2 as isNumber,
  n2 as isObject,
  l as isObjectLike,
  e as isPlainObject,
  r2 as isPromise,
  e5 as isRegexp,
  t7 as isShallowEqual,
  e4 as isStandardBrowserEnv,
  t2 as isString,
  e3 as isUndefined,
  e14 as isUrlSearchParams
};
/*! Bundled license information:

@dimjs/lang/dist/is-array-buffer.js:
  (*! @flatjs/forge MIT @dimjs/lang *)

@dimjs/lang/dist/is-array-buffer-view.js:
  (*! @flatjs/forge MIT @dimjs/lang *)

@dimjs/lang/dist/is-blob.js:
  (*! @flatjs/forge MIT @dimjs/lang *)

@dimjs/lang/dist/is-boolean.js:
  (*! @flatjs/forge MIT @dimjs/lang *)

@dimjs/lang/dist/is-deep-equal.js:
  (*! @flatjs/forge MIT @dimjs/lang *)

@dimjs/lang/dist/is-empty.js:
  (*! @flatjs/forge MIT @dimjs/lang *)

@dimjs/lang/dist/is-error.js:
  (*! @flatjs/forge MIT @dimjs/lang *)

@dimjs/lang/dist/is-file.js:
  (*! @flatjs/forge MIT @dimjs/lang *)

@dimjs/lang/dist/is-form-data.js:
  (*! @flatjs/forge MIT @dimjs/lang *)

@dimjs/lang/dist/is-nan.js:
  (*! @flatjs/forge MIT @dimjs/lang *)

@dimjs/lang/dist/is-promise.js:
  (*! @flatjs/forge MIT @dimjs/lang *)

@dimjs/lang/dist/is-shallow-equal.js:
  (*! @flatjs/forge MIT @dimjs/lang *)

@dimjs/lang/dist/is-url-search-params.js:
  (*! @flatjs/forge MIT @dimjs/lang *)

@dimjs/lang/dist/index.js:
  (*! @flatjs/forge MIT @dimjs/lang *)
*/
//# sourceMappingURL=@dimjs_lang.js.map
