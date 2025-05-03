import {
  c2 as c,
  e as e3,
  e3 as e5,
  e5 as e6,
  i,
  l,
  n2 as n,
  o2 as o,
  r,
  s2 as s,
  t,
  t2 as t3,
  t3 as t4
} from "./chunk-ETZMHKZ4.js";
import {
  a,
  e,
  e2,
  e3 as e4,
  t2
} from "./chunk-FAKZ4AMQ.js";
import "./chunk-LQ2VYIYD.js";

// ../../../../Project/100ls-native/node_modules/@flatbiz/utils/dist/index.js
var isUndefinedOrNull = (value) => {
  return value === void 0 || value === null;
};
var arrayField2LabelValue = (dataList, fieldNames, isReserve) => {
  const dataListNew = dataList || [];
  const fieldNamesNew = o({
    label: "label",
    value: "value"
  }, fieldNames);
  const isReserveNew = isUndefinedOrNull(isReserve) ? true : isReserve;
  return dataListNew.map((item) => {
    let respData = {
      label: item[fieldNamesNew.label],
      value: item[fieldNamesNew.value]
    };
    if (isReserveNew) {
      respData = o({}, item, respData);
    }
    return respData;
  });
};
var arrayFilter = (dataList, targetValue, fieldName) => {
  const dataListNew = dataList || [];
  if (!fieldName) {
    return dataListNew.filter((item) => {
      return item === targetValue;
    });
  }
  return dataListNew.filter((item) => {
    return (item == null ? void 0 : item[fieldName]) === targetValue;
  });
};
var arrayFilterByLoosely = (dataList, targetValue, fieldName) => {
  const dataListNew = dataList || [];
  if (!fieldName) {
    return dataListNew.filter((item) => {
      return item == targetValue;
    });
  }
  return dataListNew.filter((item) => {
    return (item == null ? void 0 : item[fieldName]) == targetValue;
  });
};
var arrayFind = (dataList, targetValue, fieldName) => {
  const dataListNew = dataList || [];
  if (!fieldName) {
    return dataListNew.find((item) => {
      return item === targetValue;
    });
  }
  return dataListNew.find((item) => {
    return item[fieldName] === targetValue;
  });
};
var arrayFindByLoosely = (dataList, targetValue, fieldName) => {
  const dataListNew = dataList || [];
  if (!fieldName) {
    return dataListNew.find((item) => {
      return item == targetValue;
    });
  }
  return dataListNew.find((item) => {
    return item[fieldName] == targetValue;
  });
};
var arrayFindIndex = (dataList, targetValue, fieldName) => {
  const dataListNew = dataList || [];
  if (!fieldName) {
    return dataListNew.findIndex((item) => {
      return item === targetValue;
    });
  }
  return dataListNew.findIndex((item) => {
    return item[fieldName] === targetValue;
  });
};
var arrayFindIndexByLoosely = (dataList, targetValue, fieldName) => {
  const dataListNew = dataList || [];
  if (!fieldName) {
    return dataListNew.findIndex((item) => {
      return item == targetValue;
    });
  }
  return dataListNew.findIndex((item) => {
    return item[fieldName] == targetValue;
  });
};
var arrayMax = (array, fieldKey) => {
  let max;
  array.forEach((item) => {
    let itemValue = item;
    if (e(item) && fieldKey && e2(item[fieldKey])) {
      itemValue = item[fieldKey];
    }
    if (!max)
      max = itemValue;
    max = itemValue > max ? itemValue : max;
  });
  return max;
};
var arrayMin = (array, fieldKey) => {
  let min;
  array.forEach((item) => {
    let itemValue = item;
    if (e(item) && fieldKey && e2(item[fieldKey])) {
      itemValue = item[fieldKey];
    }
    if (!min)
      min = itemValue;
    min = itemValue < min ? itemValue : min;
  });
  return min;
};
var arrayPick = (dataList, targetValue, fieldName) => {
  const dataListNew = dataList || [];
  let result = [];
  targetValue.forEach((value) => {
    const target = arrayFilter(dataListNew, value, fieldName);
    if (target) {
      result = result.concat(target);
    }
  });
  return result;
};
var arrayPickByLoosely = (dataList, targetValue, fieldName) => {
  const dataListNew = dataList || [];
  let result = [];
  targetValue.forEach((value) => {
    const target = arrayFilterByLoosely(dataListNew, value, fieldName);
    if (target) {
      result = result.concat(target);
    }
  });
  return result;
};
var arrayReorder = (array, sourceIndex, targetIndex) => {
  const result = Array.from(array);
  if (sourceIndex > array.length - 1 || targetIndex > array.length - 1) {
    console.warn("指定交换索引值超出数组长度");
    return array;
  }
  const [removed] = result.splice(sourceIndex, 1);
  result.splice(targetIndex, 0, removed);
  return result;
};
var arraysReorder = (arrays, source, target) => {
  const sourceItems = arrays[source.parentIndex];
  const sourceTarget = sourceItems[source.index];
  const sourceItemsNew = i(sourceItems, sourceTarget);
  arrays[source.parentIndex] = sourceItemsNew;
  const targetItems = arrays[target.parentIndex];
  const newOverItems = [...targetItems.slice(0, target.index), sourceTarget, ...targetItems.slice(target.index, targetItems.length)];
  arrays[target.parentIndex] = newOverItems;
  return arrays;
};
var cloneObject = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};
var uuidFactory = (() => {
  const now = `${Date.now()}`;
  return n(`uuid-${now.substring(now.length - 4, now.length)}-`, 100);
})();
var getUuid = () => {
  return uuidFactory();
};
var arraySetUid = (array, options) => {
  const uidFieldNameFt = (options == null ? void 0 : options.uidFieldName) || "uid";
  const arrayFt = (options == null ? void 0 : options.returnNewArray) ? cloneObject(array) : array;
  arrayFt.forEach((item) => {
    item[uidFieldNameFt] = getUuid();
  });
  return arrayFt;
};
var arraySplit = (array, length) => {
  if (length <= 0)
    return [];
  let index = 0;
  const newArray = [];
  while (index < array.length) {
    newArray.push(array.slice(index, index += length));
  }
  return newArray;
};
var arrayToMap = (dataList, uidName) => {
  const result = {};
  dataList.forEach((item) => {
    result[item[uidName]] = item;
  });
  return result;
};
var arrayTotal = (array, fieldKey) => {
  let total = 0;
  array.forEach((item) => {
    if (typeof item === "number") {
      total += item;
    } else if (e(item) && fieldKey && e2(item[fieldKey])) {
      total += item[fieldKey];
    }
  });
  return total;
};
function generateIntArray(from, to) {
  const array = [];
  for (let i2 = from; i2 < to; i2++) {
    array.push(i2);
  }
  return array;
}
var isNotEmptyArray = (value) => a(value) && value.length > 0;
var isEmptyArray = (value) => a(value) && value.length === 0;
var listInList = (sourceList, targetList, inRuleFieldName = "value") => {
  const resultList = targetList.map((item) => {
    const target = sourceList.find((sourceItem) => !isUndefinedOrNull(item[inRuleFieldName]) && sourceItem[inRuleFieldName] === item[inRuleFieldName]);
    return {
      ...item,
      ...target
    };
  });
  return resultList;
};
var arrayRandomSort = (array) => {
  return array.sort(() => {
    return Math.random() > 0.5 ? -1 : 1;
  });
};
var toArray = (value) => {
  if (isUndefinedOrNull(value))
    return [];
  if (a(value))
    return value;
  return [value];
};
var twoArrayElementPositionChange = (sourceArray, targetArray, sourceIndex, targetIndex) => {
  if (!sourceArray[sourceIndex]) {
    return {
      sourceArray,
      targetArray
    };
  }
  targetArray.splice(targetIndex, 0, sourceArray[sourceIndex]);
  sourceArray.splice(sourceIndex, 1);
  return {
    sourceArray,
    targetArray
  };
};
var dateNormalize = (dateInput) => {
  if (!dateInput) {
    throw new Error(`Invalid Date : "${String(dateInput)}"`);
  }
  return e3(dateInput);
};
var dateTimeGte = (date1, date2) => {
  const date1Fmt = dateNormalize(date1);
  const date2Fmt = dateNormalize(date2);
  return new Date(date1Fmt).getTime() >= new Date(date2Fmt).getTime();
};
var dateTimeGt = (date1, date2) => {
  const date1Fmt = dateNormalize(date1);
  const date2Fmt = dateNormalize(date2);
  return new Date(date1Fmt).getTime() > new Date(date2Fmt).getTime();
};
var dateTimeEq = (date1, date2) => {
  const date1Fmt = dateNormalize(date1);
  const date2Fmt = dateNormalize(date2);
  return new Date(date1Fmt).getTime() === new Date(date2Fmt).getTime();
};
var dateTimeIn = (targetDate, minDate, maxDate) => {
  return dateTimeGte(targetDate, minDate) && dateTimeGte(maxDate, targetDate);
};
var weekConfig = {
  1: "一",
  2: "二",
  3: "三",
  4: "四",
  5: "五",
  6: "六",
  7: "日"
};
var dateDetail = (dateInput) => {
  const dateInstance = dateNormalize(dateInput);
  const week = dateInstance.getDay();
  const type7Week = week === 0 ? 7 : week;
  return {
    y: dateInstance.getFullYear(),
    m: dateInstance.getMonth() + 1,
    d: dateInstance.getDate(),
    h: dateInstance.getHours(),
    mi: dateInstance.getMinutes(),
    s: dateInstance.getSeconds(),
    ms: dateInstance.getMilliseconds(),
    week: type7Week,
    weekString: weekConfig[type7Week],
    instance: dateInstance
  };
};
var dateNew = (dateInput, mode, number) => {
  return t(dateNormalize(dateInput), mode, number);
};
var isDate = (dateInput) => {
  try {
    return !!dateNormalize(dateInput);
  } catch (_error) {
    return false;
  }
};
var dateFormat = (dateInput, format = "YYYY-MM-DD") => {
  if (!isDate(dateInput)) {
    return `${dateInput || ""}`;
  }
  return r(dateNormalize(dateInput), format);
};
var flatbizDate = {
  isDate,
  format: dateFormat,
  gte: dateTimeGte,
  gt: dateTimeGt,
  eq: dateTimeEq,
  detail: dateDetail,
  update: dateNew,
  in: dateTimeIn,
  dateNormalize
};
var findParentsElement = (originNode, verify) => {
  while (originNode != null) {
    if (verify(originNode)) {
      return originNode;
    }
    originNode = originNode.parentNode;
  }
  return null;
};
var overflowScrollReg = /scroll|auto/i;
var defaultRoot = window;
function isElement(node) {
  const ELEMENT_NODE_TYPE = 1;
  return node.tagName !== "HTML" && node.tagName !== "BODY" && node.nodeType === ELEMENT_NODE_TYPE;
}
function getScrollNode(el, root = defaultRoot) {
  let node = el;
  while (node && node !== root && isElement(node)) {
    const {
      overflowY
    } = window.getComputedStyle(node);
    if (overflowScrollReg.test(overflowY)) {
      return node;
    }
    node = node.parentNode;
  }
  return root;
}
var bodyAppendDivElement = (id) => {
  const div = document.createElement("div");
  const idNew = id || `id_${Date.now()}`;
  div.setAttribute("id", idNew);
  document.body.append(div);
  return {
    divElement: div,
    elementId: idNew
  };
};
var createDivElement = (id) => {
  const div = document.createElement("div");
  const idNew = id || `id_${getUuid()}`;
  div.setAttribute("id", idNew);
  return div;
};
var removeBodyChild = (element) => {
  try {
    document.body.removeChild(document.querySelector(element));
  } catch (_error) {
  }
};
var dom = {
  bodyAppendDivElement,
  createDivElement,
  removeBodyChild,
  /**
   * 查询指定节点层层父节点中第一个原生滚动节点
   * @param el
   * @param root
   * https://github.com/youzan/vant/issues/3823
   */
  getScrollNode,
  /**
   * 查找层层父节点中的目标元素
   * @param originNode  起始节点
   * @param verify 判断是否为目标节点
   */
  findParentsElement
};
var base64ToFile = (dataurl, filename) => {
  const arr = dataurl.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n2 = bstr.length;
  const u8arr = new Uint8Array(n2);
  while (n2--) {
    u8arr[n2] = bstr.charCodeAt(n2);
  }
  return new File([u8arr], filename, {
    type: mime
  });
};
var fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function() {
        const base64 = reader.result;
        resolve(base64);
      };
      reader.onerror = function(error) {
        reject(error);
      };
    } catch (error) {
      reject(error);
    }
  });
};
var imageCompressToBase64 = (imageFile, options) => {
  const optionsNew = o({
    quality: 0.5,
    ratio: 1,
    threshold: 1
  }, options);
  return new Promise((resolve, reject) => {
    const suffix = imageFile.name.substring(imageFile.name.lastIndexOf(".") + 1, imageFile.name.length);
    const imageName = imageFile.name.substring(0, imageFile.name.lastIndexOf("."));
    const imageSuffix = (options == null ? void 0 : options.suffix) || suffix;
    const base64Suffix = imageSuffix.toLocaleLowerCase() === "jpg" ? "jpeg" : imageSuffix;
    const isLegal = ["png", "jpg", "jpeg"].includes(base64Suffix.toLocaleLowerCase());
    void fileToBase64(imageFile).then((imgBase64) => {
      let needCompress = true;
      if (!isLegal) {
        console.info(`${suffix} 文件格式不支持压缩`);
        needCompress = false;
      }
      const fileMb = imageFile.size / 1024 / 1024;
      if (fileMb < optionsNew.threshold) {
        needCompress = false;
      }
      if (!needCompress) {
        resolve({
          base64: imgBase64,
          imageName,
          suffix: base64Suffix
        });
        return;
      }
      const imgage = new Image();
      imgage.src = imgBase64;
      imgage.onload = function() {
        const that = this;
        const width = that.width * optionsNew.ratio;
        const height = that.height * optionsNew.ratio;
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(that, 0, 0, width, height);
        const base64 = canvas.toDataURL(`image/${base64Suffix}`, optionsNew.quality);
        resolve({
          base64,
          imageName,
          suffix: base64Suffix
        });
      };
    }).catch(reject);
  });
};
var imageCompressToFormData = (imageFile, formDataKey, options) => {
  return new Promise((resolve, reject) => {
    const suffix = imageFile.name.split(".").at(-1) || "";
    const isLegal = ["png", "jpg", "jpeg"].includes(suffix.toLocaleLowerCase());
    if (!isLegal) {
      console.info(`${suffix} 文件格式不支持压缩`);
      const formData = new FormData();
      formData.append(formDataKey, imageFile);
      resolve(formData);
      return;
    }
    void imageCompressToBase64(imageFile, options).then((compressInfo) => {
      const {
        base64,
        imageName,
        suffix: suffix2
      } = compressInfo;
      const array = [];
      const bytes = window.atob(base64.split(",")[1]);
      for (let i2 = 0; i2 < bytes.length; i2++) {
        array.push(bytes.charCodeAt(i2));
      }
      const blob = new Blob([new Uint8Array(array)], {
        type: `image/${suffix2}`
      });
      const formData = new FormData();
      formData.append(formDataKey, blob, `${imageName}.${suffix2}`);
      resolve(formData);
    }).catch(reject);
  });
};
var imageCompressToFile = (imageFile, options) => {
  const suffix = imageFile.name.split(".").at(-1) || "";
  const isLegal = ["png", "jpg", "jpeg"].includes(suffix.toLocaleLowerCase());
  if (!isLegal) {
    console.info(`${suffix} 文件格式不支持压缩`);
    return imageFile;
  }
  return new Promise((resolve, reject) => {
    void imageCompressToBase64(imageFile, options).then((compressInfo) => {
      const {
        base64,
        imageName,
        suffix: suffix2
      } = compressInfo;
      const file = base64ToFile(base64, `${imageName}.${suffix2}`);
      resolve(file);
    }).catch(reject);
  });
};
var noop = () => {
};
var isNumber = (num) => {
  if (num === "" || num === void 0 || num === null) {
    return false;
  }
  return !isNaN(Number(num));
};
var enumValues = (enumeration) => {
  const keys = Object.keys(enumeration).filter((k) => isNaN(Number(k)));
  return keys.map((k) => enumeration[k]);
};
var mapToListExact = (mapData, valueList, labelName = "label", valueName = "value", colorMap) => {
  const tempList = [];
  valueList.map((value) => {
    tempList.push({
      [labelName]: mapData[value],
      [valueName]: value,
      color: colorMap == null ? void 0 : colorMap[value]
    });
  });
  return tempList;
};
var mapToList = (map, labelName = "label", valueName = "value") => {
  const list = [];
  Object.keys(map).forEach((key) => {
    const obj = {
      [labelName]: map[key],
      [valueName]: key
    };
    list.push(obj);
  });
  return list;
};
var objectGetObject = (objectData, keyList) => {
  if (!objectData || !keyList || !keyList.length)
    return {};
  const result = {};
  keyList.forEach((temp) => {
    const targetKey = typeof temp === "string" ? temp : temp.beforeKey;
    const resultKey = typeof temp === "string" ? temp : temp.afterKey;
    const objectKeys = Object.keys(objectData);
    if (objectKeys.includes(targetKey) && resultKey) {
      result[resultKey] = objectData[targetKey];
    }
  });
  return result;
};
if (!Array.prototype.at) {
  Object.defineProperty(Array.prototype, "at", {
    enumerable: false,
    configurable: false,
    writable: false,
    value: function at(n2) {
      n2 = Math.trunc(n2) || 0;
      if (n2 < 0)
        n2 += this.length;
      if (n2 < 0 || n2 >= this.length)
        return void 0;
      return this[n2];
    }
  });
}
if (!Object.is) {
  Object.is = function(x, y) {
    if (x === y) {
      return x !== 0 || 1 / x === 1 / y;
    } else {
      return x !== x && y !== y;
    }
  };
}
var polyfill = () => {
  console.log("@flatbiz/utils polyfill");
};
var add = (amt, amt2, option) => {
  return c(amt, o({
    precision: 10
  }, option)).add(amt2).value;
};
var subtract = (amt, amt2, option) => {
  return c(amt, o({
    precision: 10
  }, option)).subtract(amt2).value;
};
var multiply = (amt, amt2, option) => {
  return c(amt, o({
    precision: 10
  }, option)).multiply(amt2).value;
};
var divide = (amt, amt2, option) => {
  return c(amt, o({
    precision: 10
  }, option)).divide(amt2).value;
};
var priceFen2wan = (amt, defaultValue = 0) => {
  if (amt === void 0 || amt === null || !isNumber(amt)) {
    if (!isNumber(defaultValue)) {
      return defaultValue;
    }
    amt = defaultValue;
  }
  return c(amt).divide(1e6).value;
};
var priceFen2yuan = (amt, defaultValue = 0) => {
  if (amt === void 0 || amt === null || !isNumber(amt)) {
    if (!isNumber(defaultValue)) {
      return defaultValue;
    }
    amt = defaultValue;
  }
  return c(amt).divide(100).value;
};
var priceFormat = (amt, defaultValue = 0, options) => {
  if (amt === void 0 || amt === null || !isNumber(amt)) {
    if (!isNumber(defaultValue)) {
      return defaultValue;
    }
    amt = defaultValue;
  }
  const separator = (options == null ? void 0 : options.separator) === false ? "" : ",";
  const precision = (options == null ? void 0 : options.precision) ? options.precision : 2;
  return c(amt, {
    precision,
    symbol: "",
    separator
  }).format();
};
var priceRemoveTailZero = (amt, defaultValue = 0, options) => {
  if (amt === void 0 || amt === null || !isNumber(amt)) {
    if (!isNumber(defaultValue)) {
      return defaultValue;
    }
    amt = defaultValue;
  }
  amt = c(amt, {
    precision: 2,
    symbol: "",
    separator: ""
  }).format();
  const priceFt = String(parseFloat(amt)).split(".");
  const separator = (options == null ? void 0 : options.separator) === false ? "" : ",";
  const firstValue = c(priceFt[0], {
    precision: 0,
    symbol: "",
    separator
  }).format();
  return `${firstValue}${priceFt[1] ? `.${priceFt[1]}` : ""}`;
};
var priceSplit = (amt, defaultValue = 0, options) => {
  if (amt === void 0 || amt === null || !isNumber(amt)) {
    if (!isNumber(defaultValue)) {
      return [defaultValue, ""];
    }
    amt = defaultValue;
  }
  const precision = (options == null ? void 0 : options.precision) ? options.precision : 2;
  const priceFt = c(amt, {
    precision,
    symbol: "",
    separator: ""
  }).format().split(".");
  const separator = (options == null ? void 0 : options.separator) === false ? "" : ",";
  const firstValue = c(priceFt[0], {
    precision: 0,
    symbol: "",
    separator
  }).format();
  return [firstValue, `.${priceFt[1]}`];
};
var priceWan2fen = (amt, defaultValue = 0) => {
  if (amt === void 0 || amt === null || !isNumber(amt)) {
    if (!isNumber(defaultValue)) {
      return defaultValue;
    }
    amt = defaultValue;
  }
  return c(amt).multiply(1e6).value;
};
var priceYuan2fen = (amt, defaultValue = 0) => {
  if (amt === void 0 || amt === null || !isNumber(amt)) {
    if (!isNumber(defaultValue)) {
      return defaultValue;
    }
    amt = defaultValue;
  }
  return c(amt).multiply(100).value;
};
var flatbizPrice = {
  fen2yuan: priceFen2yuan,
  fen2wan: priceFen2wan,
  yuan2fen: priceYuan2fen,
  wan2fen: priceWan2fen,
  removeTailZero: priceRemoveTailZero,
  format: priceFormat,
  split: priceSplit,
  add,
  subtract,
  multiply,
  divide
};
function attachPropertiesToComponent(component, properties) {
  const ret = component;
  for (const key in properties) {
    if (Object.prototype.hasOwnProperty.call(properties, key)) {
      ret[key] = properties[key];
    }
  }
  return ret;
}
var composeProps = (originProps, patchProps, isMerge) => {
  const isMergeNew = e4(isMerge) ? true : isMerge;
  const composedProps = {
    ...originProps,
    ...isMergeNew ? patchProps : {}
  };
  Object.keys(patchProps).forEach((key) => {
    const func = patchProps[key];
    if (typeof func === "function") {
      composedProps[key] = (...args) => {
        var _a;
        func(...args);
        return (_a = originProps[key]) == null ? void 0 : _a.call(originProps, ...args);
      };
    }
  });
  return composedProps;
};
var sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));
var trim = (str, cancelGlobal) => {
  if (!str || !t2(str))
    return str;
  const patt = cancelGlobal ? /(^\s+)|(\s+$)/g : /\s/g;
  return str.replace(patt, "");
};
var getStrByteLen = (str) => {
  const c2 = str.match(/[^x00-xff]/gi);
  return str.length + (c2 == null ? 0 : c2.length);
};
var subStringByBytes = (str, bytes) => {
  let len = 0;
  for (let i2 = 0; i2 < str.length; i2++) {
    len += str.charCodeAt(i2) > 255 ? 2 : 1;
    if (len > bytes) {
      return str.substring(0, i2);
    }
  }
  return str;
};
var cutString = (str, bytes, flow) => {
  str = trim(str || "", true);
  if (!str)
    return "";
  const cutStr = subStringByBytes(str, bytes);
  if (str.length > cutStr.length) {
    return `${cutStr}${flow || "..."}`;
  }
  return cutStr;
};
var stringFormat = (value, format) => {
  try {
    const newValue = trim(value || "");
    if (!a(format) || format.length === 0)
      return [newValue];
    const accumulation = [];
    format.forEach((item, index) => {
      if (index === 0) {
        accumulation.push({
          min: 0,
          max: item
        });
      } else {
        const preValue = accumulation[index - 1].max;
        const currentValue = item + preValue;
        accumulation.push({
          min: preValue,
          max: currentValue
        });
        if (index === format.length - 1 && currentValue < newValue.length) {
          accumulation.push({
            min: currentValue,
            max: newValue.length
          });
        }
      }
    });
    const strArray = [];
    accumulation.forEach((item) => {
      const temp = newValue.substring(item.min, item.max);
      if (temp) {
        strArray.push(temp);
      }
    });
    return strArray;
  } catch (error) {
    console.error(error);
  }
  return [];
};
var getValueOrDefault = (value, defaultValue) => {
  return isUndefinedOrNull(value) ? defaultValue : value;
};
var jsonStringToJsonObject = (jsonString) => {
  try {
    window["__json_string_transform"] = null;
    let jsonValue = jsonString;
    let count = 0;
    while (typeof jsonValue != "object") {
      eval(`window.__json_string_transform=${jsonValue} `);
      jsonValue = window["__json_string_transform"];
      if (count === 10) {
        throw new Error(`数据解析异常，【${jsonString}】`);
      }
      count++;
    }
    return jsonValue;
  } catch (error) {
    throw new Error(error == null ? void 0 : error.message);
  }
};
var valueIsEqual = (firstValue, secondValue) => {
  const newFirst = !isUndefinedOrNull(firstValue) ? String(firstValue) : null;
  if (a(secondValue)) {
    const newSecond = secondValue.map((item) => {
      return !isUndefinedOrNull(item) ? String(item) : null;
    });
    return newSecond.findIndex((item) => newFirst === item) >= 0;
  } else {
    const newSecond = !isUndefinedOrNull(secondValue) ? String(secondValue) : null;
    return newFirst === newSecond;
  }
};
var xmlValidate = (xmlContent) => {
  let errorCode = 0;
  let errorMessage;
  if (window["ActiveXObject"]) {
    const xmlDoc = new window["ActiveXObject"]("Microsoft.XMLDOM");
    xmlDoc.async = "false";
    xmlDoc.loadXML(xmlContent);
    if (xmlDoc.parseError.errorCode != 0) {
      errorMessage = `错误code: ${xmlDoc.parseError.errorCode} 
`;
      errorMessage = `${errorMessage} 错误原因: ${xmlDoc.parseError.reason} 
`;
      errorMessage = `${errorMessage} 错误位置: ${xmlDoc.parseError.line}`;
      errorCode = 1;
    } else {
      errorMessage = "格式正确";
    }
  } else if (document.implementation["createDocument"]) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlContent, "text/xml");
    const error = xmlDoc.getElementsByTagName("parsererror");
    if (error.length > 0) {
      if (xmlDoc.documentElement.nodeName == "parsererror") {
        errorCode = 1;
        errorMessage = xmlDoc.documentElement.childNodes[0].nodeValue;
      } else {
        errorCode = 1;
        errorMessage = xmlDoc.getElementsByTagName("parsererror")[0].innerHTML;
      }
    } else {
      errorMessage = "格式正确";
    }
  } else {
    errorCode = 2;
    errorMessage = "浏览器不支持验证，无法验证xml正确性";
  }
  return {
    message: errorMessage,
    result: errorCode == 0 ? true : false
  };
};
var storageKey = "flatbiz";
var localStorageCache = {
  set: (key, value) => {
    localStorage.setItem(`${storageKey}_${key}`, JSON.stringify(value));
  },
  get: (key) => {
    try {
      const value = localStorage.getItem(`${storageKey}_${key}`);
      if (value) {
        return JSON.parse(value);
      }
    } catch (_error) {
    }
    return {};
  },
  remove: (key) => {
    localStorage.removeItem(`${storageKey}_${key}`);
  }
};
var sessionStorageCache = {
  set: (key, value) => {
    sessionStorage.setItem(`${storageKey}_${key}`, JSON.stringify(value));
  },
  get: (key) => {
    try {
      const value = sessionStorage.getItem(`${storageKey}_${key}`);
      if (value) {
        return JSON.parse(value);
      }
    } catch (_error) {
    }
    return {};
  },
  remove: (key) => {
    sessionStorage.removeItem(`${storageKey}_${key}`);
  }
};
var isMockMeEnv = () => {
  const env = t3("env");
  return env === "me";
};
var isMockDevEnv = () => {
  const env = t3("env");
  return env === "dev";
};
var isMacEnv = () => {
  return /macintosh|mac os x/i.test(navigator.userAgent);
};
var isWindowsEnv = () => {
  return /windows|win32|win64/i.test(navigator.userAgent);
};
var userAgent$1 = () => {
  return typeof navigator !== "undefined" ? navigator.userAgent.toLowerCase() : "";
};
var isIphone = () => {
  return /(iphone|ipad)/i.test(userAgent$1());
};
var isMac = () => {
  return /macintosh/i.test(userAgent$1());
};
var isIphoneOrMac = () => {
  return isMac() && isIphone();
};
var isAndroid = () => {
  return /(android)/i.test(userAgent$1());
};
var isFabricWebview$1 = (ua = userAgent$1()) => {
  const isFabric = new RegExp("fabric@", "i").test(ua);
  const isDisallowFabric = new RegExp("Fabric/DisableWebview", "i").test(ua);
  return isFabric && !isDisallowFabric;
};
var getGlobalData = () => {
  return window["GLOBAL"] || {};
};
var getWindow = (key) => {
  return window[key];
};
var setWindow = (data) => {
  Object.keys(data).map((key) => {
    window[key] = data[key];
  });
};
var openNewWindow = (url) => {
  const id = getUuid();
  const aElement = document.createElement("a");
  aElement.setAttribute("href", url);
  aElement.setAttribute("target", "_blank");
  aElement.setAttribute("id", id);
  aElement.click();
  setTimeout(() => {
    var _a;
    (_a = aElement.parentNode) == null ? void 0 : _a.removeChild(aElement);
  }, 200);
};
var tableMergeCellCalculate = (dataSource, mergeFields, pagination) => {
  if (!a(dataSource) || dataSource.length === 0)
    return [];
  const pageNo = pagination == null ? void 0 : pagination.pageNo;
  const pageSize = pagination == null ? void 0 : pagination.pageSize;
  if (pageNo === void 0 || pageSize === void 0) {
    dataSource = cloneObject(dataSource);
  } else {
    dataSource = cloneObject(dataSource.slice((pageNo - 1) * pageSize, pageNo * pageSize));
  }
  if (!a(mergeFields) || mergeFields.length === 0)
    return dataSource;
  const mergeFieldsGroup = [];
  mergeFields.forEach((item, index) => {
    const mergeKey = t2(item) ? item : item.mergeKey;
    if (index === 0) {
      mergeFieldsGroup.push([mergeKey]);
    } else {
      mergeFieldsGroup.push([...mergeFieldsGroup[index - 1], mergeKey]);
    }
  });
  function theSameSort(originalData, fieldList) {
    let newOriginalData = [];
    const fieldValueList = originalData.map((originalItem) => {
      const originalValue = fieldList.map((temp) => originalItem[temp]).join("_");
      return originalValue;
    });
    const newFieldValueList = Array.from(new Set(fieldValueList));
    newFieldValueList.map((filedValue) => {
      const tempList = originalData.filter((originalItem) => {
        const originalValue = fieldList.map((temp) => originalItem[temp]).join("_");
        return filedValue === originalValue;
      });
      newOriginalData = newOriginalData.concat(tempList);
    });
    return newOriginalData;
  }
  let newDataSource = dataSource;
  mergeFieldsGroup.forEach((fields) => {
    newDataSource = theSameSort(newDataSource, fields);
  });
  const dataSourceValueGroup = [];
  mergeFieldsGroup.forEach((fieldsGroupItem) => {
    const fieldValueList = [];
    newDataSource.forEach((dataSourceItem) => {
      let mergeValue = null;
      fieldsGroupItem.forEach((fieldItem) => {
        if (!mergeValue) {
          mergeValue = {
            value: dataSourceItem[fieldItem],
            fields: fieldsGroupItem
            // item: dataSourceItem,
          };
        } else {
          mergeValue = {
            value: `${mergeValue.value}_${dataSourceItem[fieldItem]}`,
            fields: fieldsGroupItem
          };
        }
      });
      fieldValueList.push(mergeValue);
    });
    dataSourceValueGroup.push(fieldValueList);
  });
  const newDataSourceValueGroup = [];
  dataSourceValueGroup.forEach((fieldValueList) => {
    const newFieldValueList = [];
    fieldValueList.forEach((item, index) => {
      if (index === 0) {
        newFieldValueList.push({
          ...item,
          count: 1
        });
      } else {
        const targetIndex = newFieldValueList.findIndex((newItem) => valueIsEqual(newItem.value, item.value));
        if (targetIndex >= 0) {
          newFieldValueList[targetIndex].count = newFieldValueList[targetIndex].count + 1;
        } else {
          newFieldValueList.push({
            ...item,
            count: 1
          });
        }
      }
    });
    newDataSourceValueGroup.push(newFieldValueList);
  });
  const valueUseList = [];
  newDataSource.forEach((dataSourceItem) => {
    newDataSourceValueGroup.forEach((item) => {
      item.forEach((fieldValueItem) => {
        const mergeValueList = [];
        fieldValueItem.fields.forEach((fieldItem) => {
          mergeValueList.push(dataSourceItem[fieldItem]);
        });
        const mergeValue = mergeValueList.join("_");
        if (valueIsEqual(mergeValue, fieldValueItem.value)) {
          const lastField = fieldValueItem.fields[fieldValueItem.fields.length - 1];
          if (!valueUseList.find((temp) => valueIsEqual(temp, mergeValue))) {
            valueUseList.push(mergeValue);
            dataSourceItem[`${lastField}RowSpan`] = fieldValueItem.count;
          } else {
            dataSourceItem[`${lastField}RowSpan`] = 0;
          }
        }
      });
    });
  });
  let _mergeSerialNumber = 1;
  newDataSource.forEach((item) => {
    const target = mergeFields[0];
    const mergeKey = typeof target === "string" ? target : target.mergeKey;
    if (item[`${mergeKey}RowSpan`] > 0) {
      item["_mergeSerialNumber"] = _mergeSerialNumber;
      _mergeSerialNumber += 1;
    }
  });
  const targetList = [];
  mergeFields.forEach((item) => {
    if (item.statisticKey) {
      targetList.push({
        mergeKey: item.mergeKey,
        statisticKey: item.statisticKey
      });
    }
  });
  if (targetList.length > 0) {
    targetList.forEach((statisticItem) => {
      newDataSource.forEach((item, index) => {
        const rowSpanValue = item[`${statisticItem.mergeKey}RowSpan`];
        if (rowSpanValue && rowSpanValue > 0) {
          item[`${statisticItem.mergeKey}RowTotal`] = newDataSource.slice(index, index + rowSpanValue).reduce((total, node) => {
            const itemTotal = node[statisticItem.statisticKey];
            return e2(itemTotal) ? flatbizPrice.add(total, itemTotal) : total;
          }, 0);
        }
      });
    });
  }
  return newDataSource;
};
var tiledArrayToTree = (dataList, fieldNames, isRootNode) => {
  if (!dataList.length)
    return [];
  const dataListClone = cloneObject(dataList);
  const rootNodeList = [];
  const {
    idKeyName,
    pIdKeyName,
    childrenKeyName
  } = fieldNames;
  const dataListMap = arrayToMap(dataListClone, idKeyName);
  dataListClone.forEach((item) => {
    const isRootItem = isRootNode(item);
    if (isRootItem) {
      rootNodeList.push(item);
      return;
    }
    const parent = dataListMap[item[pIdKeyName]];
    if (parent) {
      const parentChildren = parent[childrenKeyName];
      if (a(parentChildren)) {
        parentChildren.push(item);
      } else {
        parent[childrenKeyName] = [item];
      }
    }
  });
  if (!rootNodeList.length) {
    console.warn("数据中未查询到根节点");
    return [];
  }
  return rootNodeList;
};
var treeFieldNameChange = (treeList, changeFieldNames, childrenName) => {
  const childrenKey = childrenName || "children";
  const changeFieldList = Object.keys(changeFieldNames);
  function loopHandle(dataItem) {
    if (!dataItem)
      return;
    changeFieldList.forEach((fieldKey) => {
      dataItem[changeFieldNames[fieldKey]] = dataItem[fieldKey];
    });
    if (dataItem[childrenKey] && a(dataItem[childrenKey])) {
      dataItem[childrenKey].map((node) => {
        loopHandle(node);
      });
    }
  }
  treeList.forEach((dataItem) => {
    loopHandle(dataItem);
  });
  return treeList;
};
var treeFieldNameChangeAdapter = (treeList, treeItemAdapter, childrenName) => {
  const childrenKey = childrenName || "children";
  function loopHandle(dataItem) {
    if (!dataItem)
      return;
    const adapterResult = treeItemAdapter(dataItem);
    if (adapterResult) {
      Object.keys(adapterResult).forEach((tempKey) => {
        dataItem[tempKey] = adapterResult[tempKey];
      });
    }
    if (dataItem[childrenKey] && a(dataItem[childrenKey])) {
      dataItem[childrenKey].map((node) => {
        loopHandle(node);
      });
    }
  }
  treeList.forEach((dataItem) => {
    loopHandle(dataItem);
  });
  return treeList;
};
var treeEachAdaptive = (treeDataList, adaptive, childrenName) => {
  return treeFieldNameChangeAdapter(treeDataList, adaptive, childrenName);
};
var treeFilter = (dataList, filter, options) => {
  const childrenName = (options == null ? void 0 : options.childrenName) || "children";
  const queryParentShowChildrenAll = e4(options == null ? void 0 : options.queryParentShowChildrenAll) ? true : options == null ? void 0 : options.queryParentShowChildrenAll;
  return dataList.reduce((acc, node) => {
    if (filter(node)) {
      if (isNotEmptyArray(node[childrenName])) {
        if (queryParentShowChildrenAll) {
          acc.push(node);
          return acc;
        }
        node[childrenName] = treeFilter(node[childrenName], filter, options);
        if (!isNotEmptyArray(node[childrenName])) {
          node[childrenName] = void 0;
        }
        acc.push(node);
      } else {
        node[childrenName] = void 0;
        acc.push(node);
      }
    } else {
      if (isNotEmptyArray(node[childrenName])) {
        node[childrenName] = treeFilter(node[childrenName], filter, options);
        if (isNotEmptyArray(node[childrenName])) {
          acc.push(node);
        } else {
          node[childrenName] = void 0;
        }
      }
    }
    return acc;
  }, []);
};
var treeItemDelete = (key, treeList, options) => {
  const childrenName = options.children;
  return treeList.reduce((acc, node) => {
    if (node[options.key] === key) {
      return acc;
    } else {
      if (isNotEmptyArray(node[childrenName])) {
        node[childrenName] = treeItemDelete(key, node[childrenName], options);
        if (!isNotEmptyArray(node[childrenName])) {
          node[childrenName] = void 0;
        }
      }
      acc.push(node);
    }
    return acc;
  }, []);
};
var treeItemDeleteByFilter = (treeList, filter, childrenName) => {
  const childrenKey = childrenName || "children";
  return treeList.reduce((acc, node) => {
    if (filter(node)) {
      return acc;
    } else {
      if (isNotEmptyArray(node[childrenKey])) {
        node[childrenKey] = treeItemDeleteByFilter(node[childrenKey], filter, childrenKey);
        if (!isNotEmptyArray(node[childrenKey])) {
          node[childrenKey] = void 0;
        }
      }
      acc.push(node);
    }
    return acc;
  }, []);
};
var treeLeafParentsArray = (value, treeTiledList, hasSelf = false, fieldNames) => {
  const newFieldNames = {
    value: "value",
    parentValue: "parentValue",
    ...fieldNames
  };
  const tempList = [];
  function parseChildren(itemValue) {
    const target = treeTiledList.find((temp) => temp[newFieldNames.value] === itemValue);
    if (target) {
      tempList.push(target);
      const parentValue = l(target, newFieldNames.parentValue);
      if (!isUndefinedOrNull(parentValue)) {
        parseChildren(parentValue);
      }
    }
  }
  parseChildren(value);
  if (!hasSelf) {
    if (tempList.length > 1) {
      return tempList.splice(1, tempList.length - 1);
    }
    return [];
  }
  return tempList.reverse();
};
var treeToTiledMap = (treeDataList, fieldNames, insertPIdFieldName) => {
  const childrenKey = fieldNames.children;
  const valueKey = fieldNames.value;
  const tempListMap = {};
  function parseChildren(nodeItem, pUid) {
    const uid = nodeItem[valueKey];
    tempListMap[uid] = nodeItem;
    if (insertPIdFieldName) {
      nodeItem[insertPIdFieldName] = pUid;
    }
    if (nodeItem[childrenKey]) {
      nodeItem[childrenKey].map((childrenIrem) => {
        parseChildren(childrenIrem, uid);
      });
    }
  }
  treeDataList.forEach((node) => {
    parseChildren(node);
  });
  return tempListMap;
};
var treeNodeParentsList = (value, treeDataList, hasSelf = false, fieldNames) => {
  const valueKey = (fieldNames == null ? void 0 : fieldNames.value) || "value";
  const childrenKey = (fieldNames == null ? void 0 : fieldNames.children) || "children";
  const treeListFt = cloneObject(treeDataList);
  const tempList = [];
  const treeTiledMap = treeToTiledMap(treeListFt, {
    value: valueKey,
    children: childrenKey
  }, "pId");
  let parentNode = treeTiledMap[value];
  while (parentNode) {
    const pId = parentNode.pId;
    parentNode = treeTiledMap[pId];
    if (parentNode) {
      tempList.push(pId);
    }
  }
  if (hasSelf) {
    return [value, ...tempList];
  }
  return tempList;
};
var treeToArray = (treeDataList, childrenName, insertPId) => {
  const tempList = [];
  function parseChildren(nodeItem, pId) {
    tempList.push(nodeItem);
    if (insertPId) {
      nodeItem[insertPId.pIdKeyName] = pId;
    }
    const uid = (insertPId == null ? void 0 : insertPId.idName) ? nodeItem[insertPId.idName] : void 0;
    if (nodeItem[childrenName]) {
      nodeItem[childrenName].map((node) => {
        parseChildren(node, uid);
      });
    }
  }
  treeDataList.forEach((node) => {
    parseChildren(node, void 0);
  });
  return tempList;
};
var treeToTiledArray = (dataList, fieldNames) => {
  const newFieldNames = o({}, {
    label: "label",
    value: "value",
    children: "children"
  }, fieldNames);
  const labelKey = newFieldNames.label;
  const valueKey = newFieldNames.value;
  const childrenKey = newFieldNames.children;
  const tempList = [];
  function parseChildren(nodeItem, parentValue) {
    tempList.push({
      ...nodeItem,
      label: nodeItem[labelKey],
      value: nodeItem[valueKey],
      parentValue
    });
    if (nodeItem[childrenKey]) {
      nodeItem[childrenKey].map((node) => {
        parseChildren(node, nodeItem[valueKey]);
      });
    }
  }
  dataList.forEach((node) => {
    parseChildren(node, void 0);
  });
  return tempList;
};
var ensureSlash = (str, slashFix = true) => {
  str = str.replace(/\/$/, "").replace(/^\//, "");
  return slashFix ? `/${str}/` : str;
};
var userAgent = () => {
  return navigator.userAgent.toLowerCase();
};
var isFabricWebview = () => {
  return new RegExp("fabric@", "i").test(userAgent());
};
var toLinkPath = (path, query = {}) => {
  const newQauery = {
    ...query,
    ntv_indicator: "1"
  };
  const env = t3("env");
  if (env && env !== "prod") {
    newQauery.env = env;
  }
  const media = t3("media");
  if (media) {
    newQauery.media = media;
  }
  if (window["ntv_indicator"] === false || !isFabricWebview()) {
    newQauery.ntv_indicator = void 0;
  }
  const bizProcessUrlParam = getWindow("bizProcessUrlParam");
  if (a(bizProcessUrlParam) && bizProcessUrlParam.length > 0) {
    bizProcessUrlParam.forEach((paramKey) => {
      const keyValue = t3(paramKey);
      if (keyValue) {
        newQauery[paramKey] = keyValue;
      }
    });
  }
  const fabricCallbackKey = t3("fabric-callback-key") || "";
  if (fabricCallbackKey) {
    newQauery["fabric-callback-key"] = fabricCallbackKey;
  }
  const accessToken = t3("accessToken") || "";
  if (accessToken && isMockMeEnv()) {
    newQauery.accessToken = accessToken;
  }
  const filterQuery = {};
  Object.keys(newQauery).filter((key) => {
    if (newQauery[key] !== void 0 && newQauery[key] !== null) {
      filterQuery[key] = newQauery[key];
    }
  });
  return s(path, filterQuery);
};
var urlJoin = (first, second) => {
  return (first || "").replace(/\/$/, "") + "/" + (second || "").replace(/^\//, "");
};
var urlJoinMulti = (firstUrl, ...fragment) => {
  let str = firstUrl;
  fragment.forEach((item) => {
    str = urlJoin(str, item);
  });
  return str;
};
var getModuleUrl = (module, query = {}) => {
  const global = getGlobalData();
  const routeBaseName = global.routeBaseName;
  const hostUrl = global.hostUrl;
  const urlBase = urlJoin(hostUrl, routeBaseName);
  return toLinkPath(urlJoin(urlBase, module), query);
};
var isHttpUri = (uri) => {
  return !uri ? false : uri.startsWith("//") || new RegExp("(https|http)?://").test(uri);
};
var pathEqual = (targetPath, comparedPath) => {
  return ensureSlash(targetPath || "", true) === ensureSlash(comparedPath || "", true);
};
var pathEqualInclude = (targetPath, comparedPath) => {
  return ensureSlash(comparedPath || "", true).indexOf(ensureSlash(targetPath || "", true)) >= 0;
};
var removeSlash = (str, position) => {
  if (!t2(str) || isUndefinedOrNull(str))
    return "";
  if (position === "before" || position === "before-after") {
    if (str.startsWith("/")) {
      str = str.substring(1);
    }
  }
  if (position === "after" || position === "before-after") {
    if (str.endsWith("/")) {
      str = str.substring(0, str.length - 1);
    }
  }
  return str;
};
var toFullPath = (url) => {
  if (t4(url)) {
    if (url.startsWith("//")) {
      return `${location.protocol}${url}`;
    }
  }
  return url;
};
var toLinkPathWithQuery = (path, query = {}) => {
  return s(path, Object.assign(e5(window.location.href), query));
};
var getUrlRoute = (url) => {
  if (!isHttpUri(url))
    return url;
  const pathname = e6(url || "").pathname || "";
  const {
    routeBaseName
  } = getGlobalData();
  const route = ensureSlash(pathname, true).replace(ensureSlash(routeBaseName, true), "");
  return `/${ensureSlash(route, false)}`;
};
var is18IdCard = (sId) => {
  if (!/^\d{17}(\d|X|x)$/.test(sId)) {
    console.log(`[${sId}]:你输入的身份证长度或格式错误`);
    return false;
  }
  const aCity = {
    11: "北京",
    12: "天津",
    13: "河北",
    14: "山西",
    15: "内蒙古",
    21: "辽宁",
    22: "吉林",
    23: "黑龙江",
    31: "上海",
    32: "江苏",
    33: "浙江",
    34: "安徽",
    35: "福建",
    36: "江西",
    37: "山东",
    41: "河南",
    42: "湖北",
    43: "湖南",
    44: "广东",
    45: "广西",
    46: "海南",
    50: "重庆",
    51: "四川",
    52: "贵州",
    53: "云南",
    54: "西藏",
    61: "陕西",
    62: "甘肃",
    63: "青海",
    64: "宁夏",
    65: "新疆",
    71: "台湾",
    81: "香港",
    82: "澳门",
    91: "国外"
  };
  if (!aCity[parseInt(sId.substring(0, 2))]) {
    console.log(`[${sId}]:你的身份证地区非法`);
    return false;
  }
  const sBirthday = `${sId.substring(6, 10)}/${sId.substring(10, 12)}/${sId.substring(12, 14)}`;
  const d = new Date(sBirthday);
  if (sBirthday != dateFormat(d, "YYYY/MM/DD")) {
    console.log(`[${sId}]:身份证上的出生日期非法`);
    return false;
  }
  let sum = 0;
  const weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
  const codes = "10X98765432";
  for (let i2 = 0; i2 < sId.length - 1; i2++) {
    sum += sId[i2] * weights[i2];
  }
  const last = codes[sum % 11];
  if (sId[sId.length - 1] != last) {
    console.log(`[${sId}]:你输入的身份证号非法`);
    return false;
  }
  return true;
};
var flatbizRegExp = {
  /** 汉字格式  */
  chineseCharactersRegExp: /[\u4e00-\u9fa5]/,
  /** 手机号格式  */
  mobileRegExp: /^1[0-9]{10}$/,
  /** 正整数格式 */
  integerRegExp: /^[0-9]*$/,
  /** 金额格式  */
  amountRegExp: /^(([1-9]\d*)|0)(\.\d{1,})?$/,
  /** 密码格式：英文大小写、数字、符号[!@#$%^&*?.]其中两种及以上，长度8-20位 */
  passwordRegExp: /^.*(?=.{8,20})((?=.*\d)(?=.*[A-Z]))|((?=.*\d)(?=.*[a-z]))|((?=.*\d)(?=.*[!@#$%^&*?.]))|((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[!@#$%^&*?.]))|((?=.*[a-z])(?=.*[!@#$%^&*?.])).*$/,
  /** 8-20位数字和字母的组合 */
  passwordRegExp2: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/
};
export {
  arrayField2LabelValue,
  arrayFilter,
  arrayFilterByLoosely,
  arrayFind,
  arrayFindByLoosely,
  arrayFindIndex,
  arrayFindIndexByLoosely,
  arrayMax,
  arrayMin,
  arrayPick,
  arrayPickByLoosely,
  arrayRandomSort,
  arrayReorder,
  arraySetUid,
  arraySplit,
  arrayToMap,
  arrayTotal,
  arraysReorder,
  attachPropertiesToComponent,
  base64ToFile,
  cloneObject,
  composeProps,
  cutString,
  dom,
  ensureSlash,
  enumValues,
  fileToBase64,
  flatbizDate,
  flatbizPrice,
  flatbizRegExp,
  generateIntArray,
  getGlobalData,
  getModuleUrl,
  getStrByteLen,
  getUrlRoute,
  getUuid,
  getValueOrDefault,
  getWindow,
  imageCompressToBase64,
  imageCompressToFile,
  imageCompressToFormData,
  is18IdCard,
  isAndroid,
  isEmptyArray,
  isFabricWebview$1 as isFabricWebview,
  isHttpUri,
  isIphone,
  isIphoneOrMac,
  isMac,
  isMacEnv,
  isMockDevEnv,
  isMockMeEnv,
  isNotEmptyArray,
  isNumber,
  isUndefinedOrNull,
  isWindowsEnv,
  jsonStringToJsonObject,
  listInList,
  localStorageCache,
  mapToList,
  mapToListExact,
  noop,
  objectGetObject,
  openNewWindow,
  pathEqual,
  pathEqualInclude,
  polyfill,
  removeSlash,
  sessionStorageCache,
  setWindow,
  sleep,
  stringFormat,
  subStringByBytes,
  tableMergeCellCalculate,
  tiledArrayToTree,
  toArray,
  toFullPath,
  toLinkPath,
  toLinkPathWithQuery,
  treeEachAdaptive,
  treeFieldNameChange,
  treeFieldNameChangeAdapter,
  treeFilter,
  treeItemDelete,
  treeItemDeleteByFilter,
  treeLeafParentsArray,
  treeNodeParentsList,
  treeToArray,
  treeToTiledArray,
  treeToTiledMap,
  trim,
  twoArrayElementPositionChange,
  urlJoin,
  urlJoinMulti,
  userAgent$1 as userAgent,
  valueIsEqual,
  xmlValidate
};
/*! Bundled license information:

@flatbiz/utils/dist/index.js:
  (*! @flatjs/forge MIT @flatbiz/utils *)
*/
//# sourceMappingURL=@flatbiz_utils.js.map
