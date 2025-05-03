import {
  a,
  e,
  e3 as e2,
  e4 as e3,
  n,
  t
} from "./chunk-FAKZ4AMQ.js";

// ../../../../Project/100ls-native/node_modules/@dimjs/utils/dist/_rollupPluginBabelHelpers-BbctETlH.js
function r(r7, t23) {
  (null == t23 || t23 > r7.length) && (t23 = r7.length);
  for (var e16 = 0, n9 = Array(t23); e16 < t23; e16++)
    n9[e16] = r7[e16];
  return n9;
}
function t2(r7) {
  if (Array.isArray(r7))
    return r7;
}
function e4(t23) {
  if (Array.isArray(t23))
    return r(t23);
}
function n2(r7, t23) {
  var e16 = "undefined" != typeof Symbol && r7[Symbol.iterator] || r7["@@iterator"];
  if (!e16) {
    if (Array.isArray(r7) || (e16 = d(r7)) || t23) {
      e16 && (r7 = e16);
      var n9 = 0, o5 = function() {
      };
      return { s: o5, n: function() {
        return n9 >= r7.length ? { done: true } : { done: false, value: r7[n9++] };
      }, e: function(r8) {
        throw r8;
      }, f: o5 };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var i4, u3 = true, a4 = false;
  return { s: function() {
    e16 = e16.call(r7);
  }, n: function() {
    var r8 = e16.next();
    return u3 = r8.done, r8;
  }, e: function(r8) {
    a4 = true, i4 = r8;
  }, f: function() {
    try {
      u3 || null == e16.return || e16.return();
    } finally {
      if (a4)
        throw i4;
    }
  } };
}
function o(r7, t23, e16) {
  return (t23 = m(t23)) in r7 ? Object.defineProperty(r7, t23, { value: e16, enumerable: true, configurable: true, writable: true }) : r7[t23] = e16, r7;
}
function i(r7) {
  if ("undefined" != typeof Symbol && null != r7[Symbol.iterator] || null != r7["@@iterator"])
    return Array.from(r7);
}
function u(r7, t23) {
  var e16 = null == r7 ? null : "undefined" != typeof Symbol && r7[Symbol.iterator] || r7["@@iterator"];
  if (null != e16) {
    var n9, o5, i4, u3, a4 = [], l3 = true, f2 = false;
    try {
      if (i4 = (e16 = e16.call(r7)).next, 0 === t23)
        ;
      else
        for (; !(l3 = (n9 = i4.call(e16)).done) && (a4.push(n9.value), a4.length !== t23); l3 = true)
          ;
    } catch (r8) {
      f2 = true, o5 = r8;
    } finally {
      try {
        if (!l3 && null != e16.return && (u3 = e16.return(), Object(u3) !== u3))
          return;
      } finally {
        if (f2)
          throw o5;
      }
    }
    return a4;
  }
}
function a2() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function l() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function f(r7, t23) {
  var e16 = Object.keys(r7);
  if (Object.getOwnPropertySymbols) {
    var n9 = Object.getOwnPropertySymbols(r7);
    t23 && (n9 = n9.filter(function(t24) {
      return Object.getOwnPropertyDescriptor(r7, t24).enumerable;
    })), e16.push.apply(e16, n9);
  }
  return e16;
}
function c(r7) {
  for (var t23 = 1; t23 < arguments.length; t23++) {
    var e16 = null != arguments[t23] ? arguments[t23] : {};
    t23 % 2 ? f(Object(e16), true).forEach(function(t24) {
      o(r7, t24, e16[t24]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(r7, Object.getOwnPropertyDescriptors(e16)) : f(Object(e16)).forEach(function(t24) {
      Object.defineProperty(r7, t24, Object.getOwnPropertyDescriptor(e16, t24));
    });
  }
  return r7;
}
function y(r7, e16) {
  return t2(r7) || u(r7, e16) || d(r7, e16) || a2();
}
function b(r7) {
  return t2(r7) || i(r7) || d(r7) || a2();
}
function s(r7) {
  return e4(r7) || i(r7) || d(r7) || l();
}
function p(r7, t23) {
  if ("object" != typeof r7 || !r7)
    return r7;
  var e16 = r7[Symbol.toPrimitive];
  if (void 0 !== e16) {
    var n9 = e16.call(r7, t23);
    if ("object" != typeof n9)
      return n9;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === t23 ? String : Number)(r7);
}
function m(r7) {
  var t23 = p(r7, "string");
  return "symbol" == typeof t23 ? t23 : t23 + "";
}
function v(r7) {
  "@babel/helpers - typeof";
  return v = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(r8) {
    return typeof r8;
  } : function(r8) {
    return r8 && "function" == typeof Symbol && r8.constructor === Symbol && r8 !== Symbol.prototype ? "symbol" : typeof r8;
  }, v(r7);
}
function d(t23, e16) {
  if (t23) {
    if ("string" == typeof t23)
      return r(t23, e16);
    var n9 = {}.toString.call(t23).slice(8, -1);
    return "Object" === n9 && t23.constructor && (n9 = t23.constructor.name), "Map" === n9 || "Set" === n9 ? Array.from(t23) : "Arguments" === n9 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n9) ? r(t23, e16) : void 0;
  }
}

// ../../../../Project/100ls-native/node_modules/@dimjs/utils/dist/extend/extend.js
function o2() {
  var f2;
  var t23;
  var n9;
  var s6;
  for (var l3 = arguments.length, p2 = new Array(l3), m2 = 0; m2 < l3; m2++) {
    p2[m2] = arguments[m2];
  }
  var v2 = p2[0] || {};
  var j = 1;
  var d2 = false;
  var u3 = p2.length;
  if (typeof v2 === "boolean") {
    d2 = v2;
    v2 = p2[j] || {};
    j++;
  }
  if (v(v2) !== "object" && !t(v2)) {
    v2 = {};
  }
  if (j === u3) {
    v2 = this;
    j--;
  }
  for (; j < u3; j++) {
    var c3 = p2[j];
    if (c3 !== null) {
      for (f2 in c3) {
        if (Object.prototype.hasOwnProperty.call(c3, f2)) {
          t23 = v2[f2];
          n9 = c3[f2];
          if (v2 === n9) {
            continue;
          }
          var g = a(n9);
          if (d2 && n9 && (e(n9) || g)) {
            if (g) {
              g = false;
              s6 = t23 && a(t23) ? t23 : [];
            } else {
              s6 = t23 && e(t23) ? t23 : {};
            }
            v2[f2] = o2(d2, s6, n9);
          } else if (n9 !== void 0) {
            v2[f2] = n9;
          }
        }
      }
    }
  }
  return v2;
}

// ../../../../Project/100ls-native/node_modules/@dimjs/utils/dist/array/array-remove.js
function n3() {
  for (var r7 = arguments.length, i4 = new Array(r7), o5 = 0; o5 < r7; o5++) {
    i4[o5] = arguments[o5];
  }
  return function(r8, o6) {
    if (a(o6)) {
      r8.push(o6.reduce(n3.apply(void 0, i4), []));
    } else if (i4.indexOf(o6) === -1) {
      r8.push(o6);
    }
    return r8;
  };
}
function i2(e16) {
  for (var i4 = arguments.length, o5 = new Array(i4 > 1 ? i4 - 1 : 0), t23 = 1; t23 < i4; t23++) {
    o5[t23 - 1] = arguments[t23];
  }
  return e16.reduce(n3.apply(void 0, s(o5)), []);
}

// ../../../../Project/100ls-native/node_modules/@dimjs/utils/dist/cache/cache.js
var n4 = function n5() {
  var e16 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "cache_unique_";
  var t23 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
  var c3 = {};
  return function() {
    if (!c3[e16]) {
      c3[e16] = typeof t23 === "function" ? t23() : t23;
    }
    return "".concat(e16).concat(++c3[e16]);
  };
};

// ../../../../Project/100ls-native/node_modules/@dimjs/utils/dist/date/date-normalize.js
var e5 = function e6() {
  var n9 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : /* @__PURE__ */ new Date();
  var t23;
  if (typeof n9 === "string") {
    t23 = new Date(n9.replace(/-/g, "/"));
  } else {
    t23 = new Date(n9);
  }
  if (t23.toString() === "Invalid Date") {
    throw new Error('Invalid Date : "'.concat(String(n9), '"'));
  }
  return t23;
};
var n6 = function e7(n9) {
  if (n9 < 10) {
    return "0".concat(n9);
  } else {
    return String(n9);
  }
};

// ../../../../Project/100ls-native/node_modules/@dimjs/utils/dist/date/date-new.js
var t3 = function t4(r7, s6, a4) {
  var n9 = e5(r7);
  switch (s6) {
    case "y":
      n9.setFullYear(n9.getFullYear() + a4);
      return n9;
    case "q":
      n9.setMonth(n9.getMonth() + a4 * 3);
      return n9;
    case "m":
      n9.setMonth(n9.getMonth() + a4);
      return n9;
    case "w":
      n9.setDate(n9.getDate() + a4 * 7);
      return n9;
    case "d":
      n9.setDate(n9.getDate() + a4);
      return n9;
    case "h":
      n9.setHours(n9.getHours() + a4);
      return n9;
    case "mi":
      n9.setMinutes(n9.getMinutes() + a4);
      return n9;
    case "s":
      n9.setSeconds(n9.getSeconds() + a4);
      return n9;
    default:
      n9.setDate(n9.getDate() + a4);
      return n9;
  }
};

// ../../../../Project/100ls-native/node_modules/@dimjs/utils/dist/date/date-format.js
var r2 = function r3(t23) {
  var s6 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "YYYY-MM-DD hh:mm:ss";
  if (!t23) {
    return "";
  }
  var n9;
  try {
    n9 = e5(t23);
  } catch (e16) {
    return e16.message;
  }
  var c3 = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "日", "一", "二", "三", "四", "五", "六"];
  return s6.replace(/YYYY|YY|MM|M|DD|hh|mm|ss|星期|周|www|week/g, function(e16) {
    var r7 = "";
    switch (e16) {
      case "YYYY":
        r7 = String(n9.getFullYear());
        break;
      case "YY":
        r7 = String(n9.getFullYear()).slice(2);
        break;
      case "MM":
        r7 = n6(n9.getMonth() + 1);
        break;
      case "M":
        r7 = String(n9.getMonth() + 1);
        break;
      case "DD":
        r7 = n6(n9.getDate());
        break;
      case "hh":
        r7 = n6(n9.getHours());
        break;
      case "mm":
        r7 = n6(n9.getMinutes());
        break;
      case "ss":
        r7 = n6(n9.getSeconds());
        break;
      case "星期":
        r7 = "星期" + c3[n9.getDay() + 7];
        break;
      case "周":
        r7 = "周" + c3[n9.getDay() + 7];
        break;
      case "week":
        r7 = c3[n9.getDay()];
        break;
      case "www":
        r7 = c3[n9.getDay()].slice(0, 3);
        break;
      default:
        r7 = "";
        break;
    }
    return r7;
  });
};

// ../../../../Project/100ls-native/node_modules/@dimjs/utils/dist/price/price.js
var t5 = { symbol: "$", separator: ",", decimal: ".", errorOnInvalid: false, precision: 2, pattern: "!#", negativePattern: "-!#", format: o3, fromCents: false };
var r4 = function t6(r7) {
  return Math.round(r7);
};
var n7 = function t7(r7) {
  return Math.pow(10, r7);
};
var e8 = function t8(n9, e16) {
  return r4(n9 / e16) * e16;
};
var i3 = /(\d)(?=(\d{3})+\b)/g;
var a3 = /(\d)(?=(\d\d)+\d\b)/g;
function u2(r7, e16) {
  var o5 = this;
  if (!(o5 instanceof u2)) {
    return new u2(r7, e16);
  }
  var c3 = Object.assign({}, t5, e16), f2 = n7(c3.precision), l3 = s2(r7, c3);
  o5.intValue = l3;
  o5.value = l3 / f2;
  c3.increment = c3.increment || 1 / f2;
  if (c3.useVedic) {
    c3.groups = a3;
  } else {
    c3.groups = i3;
  }
  this.s = c3;
  this.p = f2;
}
function s2(t23, e16) {
  var i4 = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true;
  var a4 = 0, s6 = e16.decimal, o5 = e16.errorOnInvalid, c3 = e16.precision, f2 = e16.fromCents, l3 = n7(c3), h = typeof t23 === "number", p2 = t23 instanceof u2;
  if (p2 && f2) {
    return t23.intValue;
  }
  if (h || p2) {
    a4 = p2 ? t23.value : t23;
  } else if (typeof t23 === "string") {
    var v2 = new RegExp("[^-\\d" + s6 + "]", "g"), d2 = new RegExp("\\" + s6, "g");
    a4 = t23.replace(/\((.*)\)/, "-$1").replace(v2, "").replace(d2, ".");
    a4 = a4 || 0;
  } else {
    if (o5) {
      throw Error("Invalid Input");
    }
    a4 = 0;
  }
  if (!f2) {
    a4 *= l3;
    a4 = a4.toFixed(4);
  }
  return i4 ? r4(a4) : a4;
}
function o3(t23, r7) {
  var n9 = r7.pattern, e16 = r7.negativePattern, i4 = r7.symbol, a4 = r7.separator, u3 = r7.decimal, s6 = r7.groups, o5 = ("" + t23).replace(/^-/, "").split("."), c3 = o5[0], f2 = o5[1];
  return (t23.value >= 0 ? n9 : e16).replace("!", i4).replace("#", c3.replace(s6, "$1" + a4) + (f2 ? u3 + f2 : ""));
}
u2.prototype = { add: function t9(r7) {
  var n9 = this.intValue, e16 = this.s, i4 = this.p;
  return u2((n9 += s2(r7, e16)) / (e16.fromCents ? 1 : i4), e16);
}, subtract: function t10(r7) {
  var n9 = this.intValue, e16 = this.s, i4 = this.p;
  return u2((n9 -= s2(r7, e16)) / (e16.fromCents ? 1 : i4), e16);
}, multiply: function t11(r7) {
  var e16 = this.intValue, i4 = this.s;
  return u2((e16 *= r7) / (i4.fromCents ? 1 : n7(i4.precision)), i4);
}, divide: function t12(r7) {
  var n9 = this.intValue, e16 = this.s;
  return u2(n9 /= s2(r7, e16, false), e16);
}, distribute: function t13(r7) {
  var n9 = this.intValue, e16 = this.p, i4 = this.s, a4 = [], s6 = Math[n9 >= 0 ? "floor" : "ceil"](n9 / r7), o5 = Math.abs(n9 - s6 * r7), c3 = i4.fromCents ? 1 : e16;
  for (; r7 !== 0; r7--) {
    var f2 = u2(s6 / c3, i4);
    o5-- > 0 && (f2 = f2[n9 >= 0 ? "add" : "subtract"](1 / c3));
    a4.push(f2);
  }
  return a4;
}, dollars: function t14() {
  return ~~this.value;
}, cents: function t15() {
  var r7 = this.intValue, n9 = this.p;
  return ~~(r7 % n9);
}, format: function t16(r7) {
  var n9 = this.s;
  if (typeof r7 === "function") {
    return r7(this, n9);
  }
  return n9.format(this, Object.assign({}, n9, r7));
}, toString: function t17() {
  var r7 = this.intValue, n9 = this.p, i4 = this.s;
  return e8(r7 / n9, i4.increment).toFixed(i4.precision);
}, toJSON: function t18() {
  return this.value;
} };
var c2 = function t19(r7, n9) {
  var e16 = u2(r7, Object.assign({ separator: "" }, n9));
  var i4 = { toString: function t23() {
    return e16.toString();
  }, format: function t23() {
    return e16.format();
  }, add: function t23(r8) {
    return e16.add(r8);
  }, divide: function t23(r8) {
    return e16.divide(r8);
  }, subtract: function t23(r8) {
    return e16.subtract(r8);
  }, multiply: function t23(r8) {
    return e16.multiply(r8);
  }, equals: function t23(r8) {
    return e16.subtract(r8).toString() === "0.00";
  }, lessThan: function t23(r8) {
    return e16.subtract(r8).toString().startsWith("-");
  }, lessEqlThan: function t23(r8) {
    return i4.lessThan(r8) || i4.equals(r8);
  }, greaterThan: function t23(r8) {
    var n10 = e16.subtract(r8).toString();
    return !(n10.startsWith("-") || n10 === "0.00");
  }, greaterEqlThan: function t23(r8) {
    return i4.greaterThan(r8) || i4.equals(r8);
  } };
  return i4;
};

// ../../../../Project/100ls-native/node_modules/@dimjs/utils/dist/uri/get-search-param-str.js
var r5 = /#(\/)?.*/;
var e9 = function e10(t23) {
  if (!t23) {
    return "";
  }
  var a4 = t23.split("?")[1];
  return a4 ? a4.replace(r5, "") : "";
};

// ../../../../Project/100ls-native/node_modules/@dimjs/utils/dist/uri/param-str-to-json.js
var e11 = function e12(t23) {
  var n9 = e9(t23);
  if (!n9) {
    return {};
  }
  return n9.split("&").reduce(function(r7, e16) {
    var t24 = e16.indexOf("=");
    var n10 = [];
    if (t24 !== -1) {
      n10 = [e16.substr(0, t24), e16.substr(t24 + 1)];
    } else {
      n10 = [e16];
    }
    var a4 = n10.map(function(r8) {
      return decodeURIComponent(r8.replace("+", " "));
    });
    r7[a4[0]] = a4[1];
    return r7;
  }, {});
};

// ../../../../Project/100ls-native/node_modules/@dimjs/utils/dist/uri/get-query-string.js
function t20(t23, s6) {
  var a4 = e11(s6 || (e3() ? window.location.href : ""));
  return a4[t23];
}

// ../../../../Project/100ls-native/node_modules/@dimjs/utils/dist/get/get.js
var s3 = function r6(i4, l3) {
  var t23 = b(l3), e16 = t23[0], o5 = t23.slice(1);
  i4 = i4[e16];
  return o5.length && i4 ? s3(i4, o5) : i4;
};
var l2 = function n8(l3, t23, e16) {
  var o5 = s3(l3 || {}, t23.split("."));
  return e2(o5) || n(o5) ? e16 : o5;
};

// ../../../../Project/100ls-native/node_modules/@dimjs/utils/dist/uri/to-query-string.js
var e13 = function e14(i4) {
  var r7 = [];
  for (var s6 in i4) {
    var t23 = i4[s6];
    if (e2(t23) || n(t23)) {
      r7.push(encodeURIComponent(s6) + "=");
    } else {
      r7.push(encodeURIComponent(s6) + "=" + encodeURIComponent(t23));
    }
  }
  return r7.join("&");
};

// ../../../../Project/100ls-native/node_modules/@dimjs/utils/dist/uri/modify-query-string.js
var o4 = /#(\/)?.*/;
var s4 = function s5(i4, n9) {
  i4 = i4 || (e3() ? window.location.href : "");
  var c3 = e11(i4);
  var e16 = o4.exec(i4);
  for (var m2 in n9) {
    c3[m2] = n9[m2];
  }
  var d2 = (e16 ? i4.replace(o4, "") : i4).split("?")[0];
  var p2 = e13(c3);
  var j = !p2 ? "".concat(d2) : "".concat(d2, "?").concat(e13(c3));
  return "".concat(j).concat(e16 ? e16[0] : "");
};

// ../../../../Project/100ls-native/node_modules/@dimjs/utils/dist/uri/is-http-url.js
var t21 = function t22(e16) {
  return e16 && (e16.startsWith("//") || new RegExp("(https|http|ftp)?://").test(e16));
};

// ../../../../Project/100ls-native/node_modules/@dimjs/utils/dist/uri/uri-parse.js
function e15(e16) {
  var t23 = new RegExp(["^(https?:)//", "(([^:/?#]*)(?::([0-9]+))?)", "(/{0,1}[^?#]*)", "(\\?[^#]*|)", "(#.*|)$"].join(""));
  var o5 = t23.exec(e16);
  return o5 ? { href: e16, protocol: o5[1], host: o5[2], hostname: o5[3], port: o5[4], pathname: o5[5], search: o5[6], hash: o5[7] } : {};
}

export {
  n2 as n,
  o,
  c,
  y,
  b,
  s,
  v,
  o2,
  i2 as i,
  n4 as n2,
  e5 as e,
  t3 as t,
  r2 as r,
  c2,
  e9 as e2,
  e11 as e3,
  t20 as t2,
  l2 as l,
  e13 as e4,
  s4 as s2,
  t21 as t3,
  e15 as e5
};
/*! Bundled license information:

@dimjs/utils/dist/_rollupPluginBabelHelpers-BbctETlH.js:
  (*! @flatjs/forge MIT @dimjs/utils *)

@dimjs/utils/dist/extend/extend.js:
  (*! @flatjs/forge MIT @dimjs/utils *)

@dimjs/utils/dist/array/array-remove.js:
  (*! @flatjs/forge MIT @dimjs/utils *)

@dimjs/utils/dist/cache/cache.js:
  (*! @flatjs/forge MIT @dimjs/utils *)

@dimjs/utils/dist/date/date-normalize.js:
  (*! @flatjs/forge MIT @dimjs/utils *)

@dimjs/utils/dist/date/date-new.js:
  (*! @flatjs/forge MIT @dimjs/utils *)

@dimjs/utils/dist/date/date-format.js:
  (*! @flatjs/forge MIT @dimjs/utils *)

@dimjs/utils/dist/price/price.js:
  (*! @flatjs/forge MIT @dimjs/utils *)
  (*!
   * currency.js - v2.0.4
   * http://scurker.github.io/currency.js
   *
   * Copyright (c) 2021 Jason Wilson
   * Released under MIT license
   *)

@dimjs/utils/dist/uri/get-search-param-str.js:
  (*! @flatjs/forge MIT @dimjs/utils *)

@dimjs/utils/dist/uri/param-str-to-json.js:
  (*! @flatjs/forge MIT @dimjs/utils *)

@dimjs/utils/dist/uri/get-query-string.js:
  (*! @flatjs/forge MIT @dimjs/utils *)

@dimjs/utils/dist/get/get.js:
  (*! @flatjs/forge MIT @dimjs/utils *)

@dimjs/utils/dist/uri/to-query-string.js:
  (*! @flatjs/forge MIT @dimjs/utils *)

@dimjs/utils/dist/uri/modify-query-string.js:
  (*! @flatjs/forge MIT @dimjs/utils *)

@dimjs/utils/dist/uri/is-http-url.js:
  (*! @flatjs/forge MIT @dimjs/utils *)

@dimjs/utils/dist/uri/uri-parse.js:
  (*! @flatjs/forge MIT @dimjs/utils *)
*/
//# sourceMappingURL=chunk-ETZMHKZ4.js.map
