// ../../../../Project/100ls-native/node_modules/@dimjs/lang/dist/_rollupPluginBabelHelpers-BzjuU56d.js
function o(t6) {
  "@babel/helpers - typeof";
  return o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o3) {
    return typeof o3;
  } : function(o3) {
    return o3 && "function" == typeof Symbol && o3.constructor === Symbol && o3 !== Symbol.prototype ? "symbol" : typeof o3;
  }, o(t6);
}

// ../../../../Project/100ls-native/node_modules/@dimjs/lang/dist/type-BjxMfswv.js
var r = { boolean: "boolean", undefined: "undefined", number: "number", string: "string", "[object Object]": "object", "[object Function]": "function", "[object RegExp]": "regexp", "[object Array]": "array", "[object Date]": "date", "[object Error]": "error", "[object Blob]": "blob", "[object File]": "file", "[object DOMException]": "domError", "[object ArrayBuffer]": "arrayBuffer" };
function o2(o3) {
  return r[o(o3)] || r[Object.prototype.toString.call(o3)] || (o3 ? "object" : "null");
}

// ../../../../Project/100ls-native/node_modules/@dimjs/lang/dist/is-plain-object.js
var e = function e2(r2) {
  if (o2(r2) !== "object") {
    return false;
  }
  var o3 = Object.getPrototypeOf(r2);
  return o3 === null || o3 === Object.prototype;
};

// ../../../../Project/100ls-native/node_modules/@dimjs/lang/dist/is-array.js
var a = function a2(t6) {
  return Array.isArray(t6) || o2(t6) === "array";
};

// ../../../../Project/100ls-native/node_modules/@dimjs/lang/dist/is-function.js
var t = function t2(o3) {
  return o2(o3) === "function";
};

// ../../../../Project/100ls-native/node_modules/@dimjs/lang/dist/is-object-like.js
var l = function l2(e8) {
  return e8 != null && o(e8) == "object";
};

// ../../../../Project/100ls-native/node_modules/@dimjs/lang/dist/is-number.js
var e3 = function e4(o3) {
  return o2(o3) === "number" || l(o3) && Object.prototype.toString.call(o3) == "[object Number]";
};

// ../../../../Project/100ls-native/node_modules/@dimjs/lang/dist/is-undefined.js
var e5 = function e6(t6) {
  return o2(t6) === "undefined";
};

// ../../../../Project/100ls-native/node_modules/@dimjs/lang/dist/is-string.js
var t3 = function t4(e8) {
  return o2(e8) === "string";
};

// ../../../../Project/100ls-native/node_modules/@dimjs/lang/dist/is-standard-browser-env.js
var t5 = !!(typeof window !== "undefined" && window.document && window.document.createElement);
function e7() {
  if (typeof navigator !== "undefined" && (navigator.product === "ReactNative" || navigator.product === "NativeScript" || navigator.product === "NS")) {
    return false;
  }
  return t5;
}

// ../../../../Project/100ls-native/node_modules/@dimjs/lang/dist/is-null.js
var n = function n2(r2) {
  return r2 === null;
};

export {
  o,
  o2,
  e,
  a,
  t,
  l,
  e3 as e2,
  e5 as e3,
  t3 as t2,
  e7 as e4,
  n
};
/*! Bundled license information:

@dimjs/lang/dist/_rollupPluginBabelHelpers-BzjuU56d.js:
  (*! @flatjs/forge MIT @dimjs/lang *)

@dimjs/lang/dist/type-BjxMfswv.js:
  (*! @flatjs/forge MIT @dimjs/lang *)

@dimjs/lang/dist/is-plain-object.js:
  (*! @flatjs/forge MIT @dimjs/lang *)

@dimjs/lang/dist/is-array.js:
  (*! @flatjs/forge MIT @dimjs/lang *)

@dimjs/lang/dist/is-function.js:
  (*! @flatjs/forge MIT @dimjs/lang *)

@dimjs/lang/dist/is-object-like.js:
  (*! @flatjs/forge MIT @dimjs/lang *)

@dimjs/lang/dist/is-number.js:
  (*! @flatjs/forge MIT @dimjs/lang *)

@dimjs/lang/dist/is-undefined.js:
  (*! @flatjs/forge MIT @dimjs/lang *)

@dimjs/lang/dist/is-string.js:
  (*! @flatjs/forge MIT @dimjs/lang *)

@dimjs/lang/dist/is-standard-browser-env.js:
  (*! @flatjs/forge MIT @dimjs/lang *)

@dimjs/lang/dist/is-null.js:
  (*! @flatjs/forge MIT @dimjs/lang *)
*/
//# sourceMappingURL=chunk-FAKZ4AMQ.js.map
