import {
  fallbackWithLocaleChain,
  useI18n
} from "./chunk-MR54QHPG.js";
import {
  computed2 as computed,
  getCurrentInstance,
  ref,
  watch
} from "./chunk-SHNSPNRG.js";

// node_modules/cosmokit/lib/index.mjs
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
function noop() {
}
__name(noop, "noop");
function isNullable(value) {
  return value === null || value === void 0;
}
__name(isNullable, "isNullable");
function isPlainObject(data) {
  return data && typeof data === "object" && !Array.isArray(data);
}
__name(isPlainObject, "isPlainObject");
function valueMap(object, transform) {
  return Object.fromEntries(Object.entries(object).map(([key, value]) => [key, transform(value, key)]));
}
__name(valueMap, "valueMap");
function is(type, value) {
  return type in globalThis && value instanceof globalThis[type] || Object.prototype.toString.call(value).slice(8, -1) === type;
}
__name(is, "is");
function clone(source) {
  if (!source || typeof source !== "object")
    return source;
  if (Array.isArray(source))
    return source.map(clone);
  if (is("Date", source))
    return new Date(source.valueOf());
  if (is("RegExp", source))
    return new RegExp(source.source, source.flags);
  return valueMap(source, clone);
}
__name(clone, "clone");
function deepEqual(a, b, strict) {
  if (a === b)
    return true;
  if (!strict && isNullable(a) && isNullable(b))
    return true;
  if (typeof a !== typeof b)
    return false;
  if (typeof a !== "object")
    return false;
  if (!a || !b)
    return false;
  if (Array.isArray(a)) {
    if (!Array.isArray(b) || a.length !== b.length)
      return false;
    return a.every((item, index) => deepEqual(item, b[index]));
  } else if (Array.isArray(b)) {
    return false;
  }
  return Object.keys({ ...a, ...b }).every((key) => deepEqual(a[key], b[key], strict));
}
__name(deepEqual, "deepEqual");
function pick(source, keys, forced) {
  if (!keys)
    return { ...source };
  const result = {};
  for (const key of keys) {
    if (forced || key in source)
      result[key] = source[key];
  }
  return result;
}
__name(pick, "pick");
function omit(source, keys) {
  if (!keys)
    return { ...source };
  const result = { ...source };
  for (const key of keys) {
    Reflect.deleteProperty(result, key);
  }
  return result;
}
__name(omit, "omit");
function defineProperty(object, key, value) {
  return Object.defineProperty(object, key, { writable: true, value, enumerable: false });
}
__name(defineProperty, "defineProperty");
function contain(array1, array2) {
  return array2.every((item) => array1.includes(item));
}
__name(contain, "contain");
function intersection(array1, array2) {
  return array1.filter((item) => array2.includes(item));
}
__name(intersection, "intersection");
function difference(array1, array2) {
  return array1.filter((item) => !array2.includes(item));
}
__name(difference, "difference");
function union(array1, array2) {
  return Array.from(/* @__PURE__ */ new Set([...array1, ...array2]));
}
__name(union, "union");
function deduplicate(array) {
  return [...new Set(array)];
}
__name(deduplicate, "deduplicate");
function remove(list, item) {
  const index = list.indexOf(item);
  if (index >= 0) {
    list.splice(index, 1);
    return true;
  } else {
    return false;
  }
}
__name(remove, "remove");
function makeArray(source) {
  return Array.isArray(source) ? source : isNullable(source) ? [] : [source];
}
__name(makeArray, "makeArray");
function arrayBufferToBase64(buffer) {
  if (typeof Buffer !== "undefined") {
    return Buffer.from(buffer).toString("base64");
  }
  let binary = "";
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}
__name(arrayBufferToBase64, "arrayBufferToBase64");
function base64ToArrayBuffer(base64) {
  if (typeof Buffer !== "undefined") {
    const buf = Buffer.from(base64, "base64");
    return new Uint8Array(buf.buffer, buf.byteOffset, buf.length);
  }
  const binary = atob(base64.replace(/\s/g, ""));
  const buffer = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    buffer[i] = binary.charCodeAt(i);
  }
  return buffer;
}
__name(base64ToArrayBuffer, "base64ToArrayBuffer");
function capitalize(source) {
  return source.charAt(0).toUpperCase() + source.slice(1);
}
__name(capitalize, "capitalize");
function uncapitalize(source) {
  return source.charAt(0).toLowerCase() + source.slice(1);
}
__name(uncapitalize, "uncapitalize");
function camelCase(source) {
  return source.replace(/[_-][a-z]/g, (str) => str.slice(1).toUpperCase());
}
__name(camelCase, "camelCase");
function paramCase(source) {
  return uncapitalize(source).replace(/_/g, "-").replace(/.[A-Z]+/g, (str) => str[0] + "-" + str.slice(1).toLowerCase());
}
__name(paramCase, "paramCase");
function snakeCase(source) {
  return uncapitalize(source).replace(/-/g, "_").replace(/.[A-Z]+/g, (str) => str[0] + "_" + str.slice(1).toLowerCase());
}
__name(snakeCase, "snakeCase");
var camelize = camelCase;
var hyphenate = paramCase;
function trimSlash(source) {
  return source.replace(/\/$/, "");
}
__name(trimSlash, "trimSlash");
function sanitize(source) {
  if (!source.startsWith("/"))
    source = "/" + source;
  return trimSlash(source);
}
__name(sanitize, "sanitize");
var Time;
((Time2) => {
  Time2.millisecond = 1;
  Time2.second = 1e3;
  Time2.minute = Time2.second * 60;
  Time2.hour = Time2.minute * 60;
  Time2.day = Time2.hour * 24;
  Time2.week = Time2.day * 7;
  let timezoneOffset = (/* @__PURE__ */ new Date()).getTimezoneOffset();
  function setTimezoneOffset(offset) {
    timezoneOffset = offset;
  }
  Time2.setTimezoneOffset = setTimezoneOffset;
  __name(setTimezoneOffset, "setTimezoneOffset");
  function getTimezoneOffset() {
    return timezoneOffset;
  }
  Time2.getTimezoneOffset = getTimezoneOffset;
  __name(getTimezoneOffset, "getTimezoneOffset");
  function getDateNumber(date = /* @__PURE__ */ new Date(), offset) {
    if (typeof date === "number")
      date = new Date(date);
    if (offset === void 0)
      offset = timezoneOffset;
    return Math.floor((date.valueOf() / Time2.minute - offset) / 1440);
  }
  Time2.getDateNumber = getDateNumber;
  __name(getDateNumber, "getDateNumber");
  function fromDateNumber(value, offset) {
    const date = new Date(value * Time2.day);
    if (offset === void 0)
      offset = timezoneOffset;
    return new Date(+date + offset * Time2.minute);
  }
  Time2.fromDateNumber = fromDateNumber;
  __name(fromDateNumber, "fromDateNumber");
  const numeric = /\d+(?:\.\d+)?/.source;
  const timeRegExp = new RegExp(`^${[
    "w(?:eek(?:s)?)?",
    "d(?:ay(?:s)?)?",
    "h(?:our(?:s)?)?",
    "m(?:in(?:ute)?(?:s)?)?",
    "s(?:ec(?:ond)?(?:s)?)?"
  ].map((unit) => `(${numeric}${unit})?`).join("")}$`);
  function parseTime(source) {
    const capture = timeRegExp.exec(source);
    if (!capture)
      return 0;
    return (parseFloat(capture[1]) * Time2.week || 0) + (parseFloat(capture[2]) * Time2.day || 0) + (parseFloat(capture[3]) * Time2.hour || 0) + (parseFloat(capture[4]) * Time2.minute || 0) + (parseFloat(capture[5]) * Time2.second || 0);
  }
  Time2.parseTime = parseTime;
  __name(parseTime, "parseTime");
  function parseDate(date) {
    const parsed = parseTime(date);
    if (parsed) {
      date = Date.now() + parsed;
    } else if (/^\d{1,2}(:\d{1,2}){1,2}$/.test(date)) {
      date = `${(/* @__PURE__ */ new Date()).toLocaleDateString()}-${date}`;
    } else if (/^\d{1,2}-\d{1,2}-\d{1,2}(:\d{1,2}){1,2}$/.test(date)) {
      date = `${(/* @__PURE__ */ new Date()).getFullYear()}-${date}`;
    }
    return date ? new Date(date) : /* @__PURE__ */ new Date();
  }
  Time2.parseDate = parseDate;
  __name(parseDate, "parseDate");
  function format(ms) {
    const abs = Math.abs(ms);
    if (abs >= Time2.day - Time2.hour / 2) {
      return Math.round(ms / Time2.day) + "d";
    } else if (abs >= Time2.hour - Time2.minute / 2) {
      return Math.round(ms / Time2.hour) + "h";
    } else if (abs >= Time2.minute - Time2.second / 2) {
      return Math.round(ms / Time2.minute) + "m";
    } else if (abs >= Time2.second) {
      return Math.round(ms / Time2.second) + "s";
    }
    return ms + "ms";
  }
  Time2.format = format;
  __name(format, "format");
  function toDigits(source, length = 2) {
    return source.toString().padStart(length, "0");
  }
  Time2.toDigits = toDigits;
  __name(toDigits, "toDigits");
  function template(template2, time = /* @__PURE__ */ new Date()) {
    return template2.replace("yyyy", time.getFullYear().toString()).replace("yy", time.getFullYear().toString().slice(2)).replace("MM", toDigits(time.getMonth() + 1)).replace("dd", toDigits(time.getDate())).replace("hh", toDigits(time.getHours())).replace("mm", toDigits(time.getMinutes())).replace("ss", toDigits(time.getSeconds())).replace("SSS", toDigits(time.getMilliseconds(), 3));
  }
  Time2.template = template;
  __name(template, "template");
})(Time || (Time = {}));

// node_modules/schemastery/lib/index.mjs
var __defProp2 = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __name2 = (target, value) => __defProp2(target, "name", { value, configurable: true });
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var require_src = __commonJS({
  "packages/schemastery/packages/core/src/index.ts"(exports, module) {
    var kSchema = Symbol.for("schemastery");
    globalThis.__schemastery_index__ ?? (globalThis.__schemastery_index__ = 0);
    var Schema = __name2(function(options) {
      const schema = __name2(function(data, options2) {
        return Schema.resolve(data, schema, options2)[0];
      }, "schema");
      if (options.refs) {
        const refs2 = valueMap(options.refs, (options2) => new Schema(options2));
        const getRef = __name2((uid) => refs2[uid], "getRef");
        for (const key in refs2) {
          const options2 = refs2[key];
          options2.sKey = getRef(options2.sKey);
          options2.inner = getRef(options2.inner);
          options2.list = options2.list && options2.list.map(getRef);
          options2.dict = options2.dict && valueMap(options2.dict, getRef);
        }
        return refs2[options.uid];
      }
      Object.assign(schema, options);
      Object.defineProperty(schema, "uid", { value: globalThis.__schemastery_index__++ });
      Object.setPrototypeOf(schema, Schema.prototype);
      schema.meta || (schema.meta = {});
      schema.toString = schema.toString.bind(schema);
      return schema;
    }, "Schema");
    Schema.prototype = Object.create(Function.prototype);
    Schema.prototype[kSchema] = true;
    var refs;
    Schema.prototype.toJSON = __name2(function toJSON() {
      var _a;
      if (refs) {
        refs[_a = this.uid] ?? (refs[_a] = JSON.parse(JSON.stringify({ ...this })));
        return this.uid;
      }
      refs = { [this.uid]: { ...this } };
      refs[this.uid] = JSON.parse(JSON.stringify({ ...this }));
      const result = { uid: this.uid, refs };
      refs = void 0;
      return result;
    }, "toJSON");
    Schema.prototype.set = __name2(function set(key, value) {
      this.dict[key] = value;
      return this;
    }, "set");
    Schema.prototype.push = __name2(function push(value) {
      this.list.push(value);
      return this;
    }, "push");
    function mergeDesc(original, messages) {
      const result = typeof original === "string" ? { "": original } : { ...original };
      for (const locale in messages) {
        const value = messages[locale];
        if (value == null ? void 0 : value.$description) {
          result[locale] = value.$description;
        } else if (typeof value === "string") {
          result[locale] = value;
        }
      }
      return result;
    }
    __name2(mergeDesc, "mergeDesc");
    function extractKeys(data) {
      return Object.fromEntries(Object.entries(data ?? {}).filter(([key]) => !key.startsWith("$")));
    }
    __name2(extractKeys, "extractKeys");
    Schema.prototype.i18n = __name2(function i18n(messages) {
      const schema = Schema(this);
      schema.meta.description = mergeDesc(schema.meta.description, messages);
      if (schema.dict) {
        schema.dict = valueMap(schema.dict, (inner, key) => {
          return inner.i18n(valueMap(messages, (data) => {
            var _a;
            return ((_a = data == null ? void 0 : data.$value) == null ? void 0 : _a[key]) ?? (data == null ? void 0 : data[key]);
          }));
        });
      }
      if (schema.list) {
        schema.list = schema.list.map((inner, index) => {
          return inner.i18n(valueMap(messages, (data = {}) => {
            if (Array.isArray(data == null ? void 0 : data.$value))
              return data.$value[index];
            if (Array.isArray(data))
              return data[index];
            return extractKeys(data);
          }));
        });
      }
      if (schema.inner) {
        schema.inner = schema.inner.i18n(valueMap(messages, (data) => {
          if (data == null ? void 0 : data.$value)
            return data.$value;
          return extractKeys(data);
        }));
      }
      if (schema.sKey) {
        schema.sKey = schema.sKey.i18n(valueMap(messages, (data) => data == null ? void 0 : data.$key));
      }
      return schema;
    }, "i18n");
    for (const key of ["required", "disabled", "hidden", "loose"]) {
      Object.assign(Schema.prototype, {
        [key](value = true) {
          const schema = Schema(this);
          schema.meta = { ...schema.meta, [key]: value };
          return schema;
        }
      });
    }
    Schema.prototype.pattern = __name2(function pattern(regexp) {
      const schema = Schema(this);
      const pattern2 = pick(regexp, ["source", "flags"]);
      schema.meta = { ...schema.meta, pattern: pattern2 };
      return schema;
    }, "pattern");
    Schema.prototype.simplify = __name2(function simplify(value) {
      if (deepEqual(value, this.meta.default))
        return null;
      if (isNullable(value))
        return value;
      if (this.type === "object" || this.type === "dict") {
        const result = {};
        for (const key in value) {
          const schema = this.type === "object" ? this.dict[key] : this.inner;
          const item = schema == null ? void 0 : schema.simplify(value[key]);
          if (!isNullable(item))
            result[key] = item;
        }
        return result;
      } else if (this.type === "array" || this.type === "tuple") {
        const result = [];
        for (const key of value) {
          const schema = this.type === "array" ? this.inner : this.list[key];
          const item = schema ? schema.simplify(value[key]) : value[key];
          result.push(item);
        }
        return result;
      } else if (this.type === "intersect") {
        const result = {};
        for (const item of this.list) {
          Object.assign(result, item.simplify(value));
        }
        return result;
      } else if (this.type === "union") {
        for (const schema of this.list) {
          try {
            Schema.resolve(value, schema);
            return schema.simplify(value);
          } catch {
          }
        }
      }
      return value;
    }, "simplify");
    Schema.prototype.toString = __name2(function toString(inline) {
      var _a;
      return ((_a = formatters[this.type]) == null ? void 0 : _a.call(formatters, this, inline)) ?? `Schema<${this.type}>`;
    }, "toString");
    Schema.prototype.role = __name2(function role(role, extra) {
      const schema = Schema(this);
      schema.meta = { ...schema.meta, role, extra };
      return schema;
    }, "role");
    for (const key of ["default", "link", "comment", "description", "max", "min", "step"]) {
      Object.assign(Schema.prototype, {
        [key](value) {
          const schema = Schema(this);
          schema.meta = { ...schema.meta, [key]: value };
          return schema;
        }
      });
    }
    var resolvers = {};
    Schema.extend = __name2(function extend(type, resolve) {
      resolvers[type] = resolve;
    }, "extend");
    Schema.resolve = __name2(function resolve(data, schema, options = {}, strict = false) {
      if (!schema)
        return [data];
      if (isNullable(data)) {
        if (schema.meta.required)
          throw new TypeError(`missing required value`);
        let current = schema;
        let fallback = schema.meta.default;
        while ((current == null ? void 0 : current.type) === "intersect" && isNullable(fallback)) {
          current = current.list[0];
          fallback = current == null ? void 0 : current.meta.default;
        }
        if (isNullable(fallback))
          return [data];
        data = clone(fallback);
      }
      const callback = resolvers[schema.type];
      if (!callback)
        throw new TypeError(`unsupported type "${schema.type}"`);
      try {
        return callback(data, schema, options, strict);
      } catch (error) {
        if (!schema.meta.loose)
          throw error;
        return [schema.meta.default];
      }
    }, "resolve");
    Schema.from = __name2(function from(source) {
      if (isNullable(source)) {
        return Schema.any();
      } else if (["string", "number", "boolean"].includes(typeof source)) {
        return Schema.const(source).required();
      } else if (source[kSchema]) {
        return source;
      } else if (typeof source === "function") {
        switch (source) {
          case String:
            return Schema.string().required();
          case Number:
            return Schema.number().required();
          case Boolean:
            return Schema.boolean().required();
          case Function:
            return Schema.function().required();
          default:
            return Schema.is(source).required();
        }
      } else {
        throw new TypeError(`cannot infer schema from ${source}`);
      }
    }, "from");
    Schema.natural = __name2(function natural() {
      return Schema.number().step(1).min(0);
    }, "natural");
    Schema.percent = __name2(function percent() {
      return Schema.number().step(0.01).min(0).max(1).role("slider");
    }, "percent");
    Schema.date = __name2(function date() {
      return Schema.union([
        Schema.is(Date),
        Schema.transform(Schema.string().role("datetime"), (value) => {
          const date2 = new Date(value);
          if (isNaN(+date2))
            throw new TypeError(`invalid date "${value}"`);
          return date2;
        }, true)
      ]);
    }, "date");
    Schema.extend("any", (data) => {
      return [data];
    });
    Schema.extend("never", (data) => {
      throw new TypeError(`expected nullable but got ${data}`);
    });
    Schema.extend("const", (data, { value }) => {
      if (data === value)
        return [value];
      throw new TypeError(`expected ${value} but got ${data}`);
    });
    function checkWithinRange(data, meta, description) {
      const { max = Infinity, min = -Infinity } = meta;
      if (data > max)
        throw new TypeError(`expected ${description} <= ${max} but got ${data}`);
      if (data < min)
        throw new TypeError(`expected ${description} >= ${min} but got ${data}`);
    }
    __name2(checkWithinRange, "checkWithinRange");
    Schema.extend("string", (data, { meta }) => {
      if (typeof data !== "string")
        throw new TypeError(`expected string but got ${data}`);
      if (meta.pattern) {
        const regexp = new RegExp(meta.pattern.source, meta.pattern.flags);
        if (!regexp.test(data))
          throw new TypeError(`expect string to match regexp ${regexp}`);
      }
      checkWithinRange(data.length, meta, "string length");
      return [data];
    });
    function decimalShift(data, digits) {
      const str = data.toString();
      if (str.includes("e"))
        return data * Math.pow(10, digits);
      const index = str.indexOf(".");
      if (index === -1)
        return data * Math.pow(10, digits);
      const frac = str.slice(index + 1);
      const integer = str.slice(0, index);
      if (frac.length <= digits)
        return +(integer + frac.padEnd(digits, "0"));
      return +(integer + frac.slice(0, digits) + "." + frac.slice(digits));
    }
    __name2(decimalShift, "decimalShift");
    function isMultipleOf(data, min, step) {
      step = Math.abs(step);
      if (!/^\d+\.\d+$/.test(step.toString())) {
        return (data - min) % step === 0;
      }
      const index = step.toString().indexOf(".");
      const digits = step.toString().slice(index + 1).length;
      return Math.abs(decimalShift(data, digits) - decimalShift(min, digits)) % decimalShift(step, digits) === 0;
    }
    __name2(isMultipleOf, "isMultipleOf");
    Schema.extend("number", (data, { meta }) => {
      if (typeof data !== "number")
        throw new TypeError(`expected number but got ${data}`);
      checkWithinRange(data, meta, "number");
      const { step } = meta;
      if (step && !isMultipleOf(data, meta.min ?? 0, step)) {
        throw new TypeError(`expected number multiple of ${step} but got ${data}`);
      }
      return [data];
    });
    Schema.extend("boolean", (data) => {
      if (typeof data === "boolean")
        return [data];
      throw new TypeError(`expected boolean but got ${data}`);
    });
    Schema.extend("bitset", (data, { bits }) => {
      if (typeof data === "number")
        return [data];
      if (!Array.isArray(data))
        throw new TypeError(`expected array but got ${data}`);
      let result = 0;
      for (const value of data) {
        if (typeof value !== "string")
          throw new TypeError(`expected string but got ${value}`);
        if (!(value in bits))
          throw new TypeError(`unknown value ${value}`);
        result |= bits[value];
      }
      return [result, result];
    });
    Schema.extend("function", (data) => {
      if (typeof data === "function")
        return [data];
      throw new TypeError(`expected function but got ${data}`);
    });
    Schema.extend("is", (data, { callback }) => {
      if (data instanceof callback)
        return [data];
      throw new TypeError(`expected ${callback.name} but got ${data}`);
    });
    function property(data, key, schema, options) {
      try {
        const [value, adapted] = Schema.resolve(data[key], schema, options);
        if (adapted !== void 0)
          data[key] = adapted;
        return value;
      } catch (e) {
        if (!(options == null ? void 0 : options.autofix))
          throw e;
        delete data[key];
        return schema.meta.default;
      }
    }
    __name2(property, "property");
    Schema.extend("array", (data, { inner, meta }, options) => {
      if (!Array.isArray(data))
        throw new TypeError(`expected array but got ${data}`);
      checkWithinRange(data.length, meta, "array length");
      return [data.map((_, index) => property(data, index, inner, options))];
    });
    Schema.extend("dict", (data, { inner, sKey }, options, strict) => {
      if (!isPlainObject(data))
        throw new TypeError(`expected object but got ${data}`);
      const result = {};
      for (const key in data) {
        let rKey;
        try {
          rKey = Schema.resolve(key, sKey)[0];
        } catch (error) {
          if (strict)
            continue;
          throw error;
        }
        result[rKey] = property(data, key, inner, options);
        data[rKey] = data[key];
        if (key !== rKey)
          delete data[key];
      }
      return [result];
    });
    Schema.extend("tuple", (data, { list }, options, strict) => {
      if (!Array.isArray(data))
        throw new TypeError(`expected array but got ${data}`);
      const result = list.map((inner, index) => property(data, index, inner, options));
      if (strict)
        return [result];
      result.push(...data.slice(list.length));
      return [result];
    });
    function merge(result, data) {
      for (const key in data) {
        if (key in result)
          continue;
        result[key] = data[key];
      }
    }
    __name2(merge, "merge");
    Schema.extend("object", (data, { dict }, options, strict) => {
      if (!isPlainObject(data))
        throw new TypeError(`expected object but got ${data}`);
      const result = {};
      for (const key in dict) {
        const value = property(data, key, dict[key], options);
        if (!isNullable(value) || key in data) {
          result[key] = value;
        }
      }
      if (!strict)
        merge(result, data);
      return [result];
    });
    Schema.extend("union", (data, { list, toString }, options, strict) => {
      const messages = [];
      for (const inner of list) {
        try {
          return Schema.resolve(data, inner, options, strict);
        } catch (error) {
          messages.push(error);
        }
      }
      throw new TypeError(`expected ${toString()} but got ${JSON.stringify(data)}`);
    });
    Schema.extend("intersect", (data, { list, toString }, options, strict) => {
      let result;
      for (const inner of list) {
        const value = Schema.resolve(data, inner, options, true)[0];
        if (isNullable(value))
          continue;
        if (isNullable(result)) {
          result = value;
        } else if (typeof result !== typeof value) {
          throw new TypeError(`expected ${toString()} but got ${JSON.stringify(data)}`);
        } else if (typeof value === "object") {
          merge(result ?? (result = {}), value);
        } else if (result !== value) {
          throw new TypeError(`expected ${toString()} but got ${JSON.stringify(data)}`);
        }
      }
      if (!strict && isPlainObject(data))
        merge(result, data);
      return [result];
    });
    Schema.extend("transform", (data, { inner, callback, preserve }, options) => {
      const [result, adapted = data] = Schema.resolve(data, inner, options, true);
      if (preserve) {
        return [callback(result)];
      } else {
        return [callback(result), callback(adapted)];
      }
    });
    var formatters = {};
    function defineMethod(name, keys, format) {
      formatters[name] = format;
      Object.assign(Schema, {
        [name](...args) {
          const schema = new Schema({ type: name });
          keys.forEach((key, index) => {
            switch (key) {
              case "sKey":
                schema.sKey = args[index] ?? Schema.string();
                break;
              case "inner":
                schema.inner = Schema.from(args[index]);
                break;
              case "list":
                schema.list = args[index].map(Schema.from);
                break;
              case "dict":
                schema.dict = valueMap(args[index], Schema.from);
                break;
              case "bits": {
                schema.bits = {};
                for (const key2 in args[index]) {
                  if (typeof args[index][key2] !== "number")
                    continue;
                  schema.bits[key2] = args[index][key2];
                }
                break;
              }
              default:
                schema[key] = args[index];
            }
          });
          if (name === "object" || name === "dict") {
            schema.meta.default = {};
          } else if (name === "array" || name === "tuple") {
            schema.meta.default = [];
          } else if (name === "bitset") {
            schema.meta.default = 0;
          }
          return schema;
        }
      });
    }
    __name2(defineMethod, "defineMethod");
    defineMethod("is", ["callback"], ({ callback }) => callback.name);
    defineMethod("any", [], () => "any");
    defineMethod("never", [], () => "never");
    defineMethod("const", ["value"], ({ value }) => typeof value === "string" ? JSON.stringify(value) : value);
    defineMethod("string", [], () => "string");
    defineMethod("number", [], () => "number");
    defineMethod("boolean", [], () => "boolean");
    defineMethod("bitset", ["bits"], () => "bitset");
    defineMethod("function", [], () => "function");
    defineMethod("array", ["inner"], ({ inner }) => `${inner.toString(true)}[]`);
    defineMethod("dict", ["inner", "sKey"], ({ inner, sKey }) => `{ [key: ${sKey.toString()}]: ${inner.toString()} }`);
    defineMethod("tuple", ["list"], ({ list }) => `[${list.map((inner) => inner.toString()).join(", ")}]`);
    defineMethod("object", ["dict"], ({ dict }) => {
      if (Object.keys(dict).length === 0)
        return "{}";
      return `{ ${Object.entries(dict).map(([key, inner]) => {
        return `${key}${inner.meta.required ? "" : "?"}: ${inner.toString()}`;
      }).join(", ")} }`;
    });
    defineMethod("union", ["list"], ({ list }, inline) => {
      const result = list.map(({ toString: format }) => format()).join(" | ");
      return inline ? `(${result})` : result;
    });
    defineMethod("intersect", ["list"], ({ list }) => {
      return `${list.map((inner) => inner.toString(true)).join(" & ")}`;
    });
    defineMethod("transform", ["inner", "callback", "preserve"], ({ inner }, isInner) => inner.toString(isInner));
    module.exports = Schema;
  }
});
var lib_default = require_src();

// node_modules/schemastery-vue/src/utils.ts
function useI18nText() {
  const composer = useI18n();
  const context = {};
  return (message) => {
    if (!message || typeof message === "string")
      return message;
    const locales = fallbackWithLocaleChain(context, composer.fallbackLocale.value, composer.locale.value);
    for (const locale of locales) {
      if (locale in message)
        return message[locale];
    }
  };
}
var dynamic = ["function", "transform", "is"];
function getChoices(schema) {
  const inner = [];
  const choices = schema.list.filter((item) => {
    if (item.meta.hidden)
      return;
    if (item.type === "transform")
      inner.push(item.inner);
    return !dynamic.includes(item.type);
  });
  return choices.length ? choices : inner;
}
function getFallback(schema, required = false) {
  if (!schema || schema.type === "union" && getChoices(schema).length === 1)
    return;
  return clone(schema.meta.default) ?? (required ? inferFallback(schema) : void 0);
}
function inferFallback(schema) {
  if (schema.type === "string")
    return "";
  if (schema.type === "number")
    return 0;
  if (schema.type === "boolean")
    return false;
  if (["dict", "object", "intersect"].includes(schema.type))
    return {};
}
function useDisabled() {
  const { props } = getCurrentInstance();
  return computed(() => {
    var _a, _b;
    return props.disabled || ((_b = (_a = props.schema) == null ? void 0 : _a.meta) == null ? void 0 : _b.disabled);
  });
}
function useModel(options) {
  let stop;
  const config = ref();
  const { props, emit } = getCurrentInstance();
  const doWatch = () => watch(config, (value) => {
    try {
      if (options)
        value = options.output(value);
    } catch {
      return;
    }
    if (deepEqual(value, props.schema.meta.default, options == null ? void 0 : options.strict))
      value = null;
    emit("update:modelValue", value);
  }, { deep: true });
  watch([() => props.modelValue, () => props.schema], ([value, schema]) => {
    stop == null ? void 0 : stop();
    value ?? (value = getFallback(schema));
    if (options)
      value = options.input(value);
    config.value = value;
    stop = doWatch();
  }, { immediate: true });
  return config;
}
function useEntries() {
  const { props } = getCurrentInstance();
  const entries = useModel({
    strict: true,
    input: (config) => Object.entries(config),
    output: (config) => {
      if (props.schema.type === "array") {
        return config.map(([, value]) => value);
      }
      const result = {};
      for (const [key, value] of config) {
        if (key in result)
          throw new Error("duplicate entries");
        result[key] = value;
      }
      return result;
    }
  });
  return {
    entries,
    up(index) {
      if (props.schema.type === "dict") {
        entries.value.splice(index - 1, 0, ...entries.value.splice(index, 1));
      } else {
        const temp = entries.value[index][1];
        entries.value[index][1] = entries.value[index - 1][1];
        entries.value[index - 1][1] = temp;
      }
    },
    down(index) {
      if (props.schema.type === "dict") {
        entries.value.splice(index + 1, 0, ...entries.value.splice(index, 1));
      } else {
        const temp = entries.value[index][1];
        entries.value[index][1] = entries.value[index + 1][1];
        entries.value[index + 1][1] = temp;
      }
    },
    del(index) {
      entries.value.splice(index, 1);
    },
    add() {
      entries.value.push(["", null]);
    }
  };
}

// node_modules/schemastery-vue/src/index.ts
import SchemaBase from "C:/Users/26637/Documents/koishi-plugin-jx3/node_modules/schemastery-vue/src/base.vue";
import Primitive from "C:/Users/26637/Documents/koishi-plugin-jx3/node_modules/schemastery-vue/src/primitive.vue";
import SchemaBitset from "C:/Users/26637/Documents/koishi-plugin-jx3/node_modules/schemastery-vue/src/extensions/bitset.vue";
import SchemaGroup from "C:/Users/26637/Documents/koishi-plugin-jx3/node_modules/schemastery-vue/src/extensions/group.vue";
import SchemaIntersect from "C:/Users/26637/Documents/koishi-plugin-jx3/node_modules/schemastery-vue/src/extensions/intersect.vue";
import SchemaObject from "C:/Users/26637/Documents/koishi-plugin-jx3/node_modules/schemastery-vue/src/extensions/object.vue";
import SchemaRadio from "C:/Users/26637/Documents/koishi-plugin-jx3/node_modules/schemastery-vue/src/extensions/radio.vue";
import SchemaTable from "C:/Users/26637/Documents/koishi-plugin-jx3/node_modules/schemastery-vue/src/extensions/table.vue";
import SchemaTextarea from "C:/Users/26637/Documents/koishi-plugin-jx3/node_modules/schemastery-vue/src/extensions/textarea.vue";
import SchemaTuple from "C:/Users/26637/Documents/koishi-plugin-jx3/node_modules/schemastery-vue/src/extensions/tuple.vue";
import SchemaUnion from "C:/Users/26637/Documents/koishi-plugin-jx3/node_modules/schemastery-vue/src/extensions/union.vue";
import KSchema from "C:/Users/26637/Documents/koishi-plugin-jx3/node_modules/schemastery-vue/src/schema.vue";
import KForm from "C:/Users/26637/Documents/koishi-plugin-jx3/node_modules/schemastery-vue/src/form.vue";

// node_modules/schemastery-vue/src/icons/index.ts
import IconArrowDown from "C:/Users/26637/Documents/koishi-plugin-jx3/node_modules/schemastery-vue/src/icons/arrow-down.vue";
import IconArrowUp from "C:/Users/26637/Documents/koishi-plugin-jx3/node_modules/schemastery-vue/src/icons/arrow-up.vue";
import IconClose from "C:/Users/26637/Documents/koishi-plugin-jx3/node_modules/schemastery-vue/src/icons/close.vue";
import IconEllipsis from "C:/Users/26637/Documents/koishi-plugin-jx3/node_modules/schemastery-vue/src/icons/ellipsis.vue";
import IconExternal from "C:/Users/26637/Documents/koishi-plugin-jx3/node_modules/schemastery-vue/src/icons/external.vue";
import IconEyeSlash from "C:/Users/26637/Documents/koishi-plugin-jx3/node_modules/schemastery-vue/src/icons/eye-slash.vue";
import IconEye from "C:/Users/26637/Documents/koishi-plugin-jx3/node_modules/schemastery-vue/src/icons/eye.vue";
import IconInvalid from "C:/Users/26637/Documents/koishi-plugin-jx3/node_modules/schemastery-vue/src/icons/invalid.vue";

// node_modules/schemastery-vue/src/index.ts
var form = Object.assign(SchemaBase, {
  useModel,
  useEntries,
  useDisabled,
  extensions: /* @__PURE__ */ new Set(),
  install(app) {
    app.component("k-form", KForm);
    app.component("k-schema", KSchema);
  }
});
form.extensions.add({
  type: "bitset",
  component: SchemaBitset,
  validate: (value) => typeof value === "number"
});
form.extensions.add({
  type: "array",
  component: SchemaGroup,
  validate: (value) => Array.isArray(value)
});
form.extensions.add({
  type: "dict",
  component: SchemaGroup,
  validate: (value) => typeof value === "object"
});
form.extensions.add({
  type: "object",
  component: SchemaObject,
  validate: (value) => typeof value === "object"
});
form.extensions.add({
  type: "intersect",
  component: SchemaIntersect,
  validate: (value) => typeof value === "object"
});
form.extensions.add({
  type: "union",
  role: "radio",
  component: SchemaRadio
});
form.extensions.add({
  type: "array",
  role: "table",
  component: SchemaTable,
  validate: (value) => Array.isArray(value)
});
form.extensions.add({
  type: "dict",
  role: "table",
  component: SchemaTable,
  validate: (value) => typeof value === "object"
});
form.extensions.add({
  type: "string",
  role: "textarea",
  component: SchemaTextarea,
  validate: (value) => typeof value === "string"
});
form.extensions.add({
  type: "tuple",
  component: SchemaTuple,
  validate: (value) => Array.isArray(value)
});
form.extensions.add({
  type: "union",
  component: SchemaUnion
});
var src_default = form;

// node_modules/@koishijs/components/client/form/index.ts
import Computed from "C:/Users/26637/Documents/koishi-plugin-jx3/node_modules/@koishijs/components/client/form/computed.vue";
import Filter from "C:/Users/26637/Documents/koishi-plugin-jx3/node_modules/@koishijs/components/client/form/k-filter.vue";
src_default.extensions.add({
  type: "union",
  role: "computed",
  component: Computed
});
function form_default(app) {
  app.use(src_default);
  app.component("k-filter", Filter);
}

// node_modules/@koishijs/components/client/virtual/index.ts
import VirtualList from "C:/Users/26637/Documents/koishi-plugin-jx3/node_modules/@koishijs/components/client/virtual/list.vue";
function virtual_default(app) {
  app.component("virtual-list", VirtualList);
}

// node_modules/@koishijs/components/client/index.ts
import Comment from "C:/Users/26637/Documents/koishi-plugin-jx3/node_modules/@koishijs/components/client/k-comment.vue";
import ImageViewer from "C:/Users/26637/Documents/koishi-plugin-jx3/node_modules/@koishijs/components/client/image-viewer.vue";

// node_modules/@koishijs/components/client/chat/index.ts
import ChatInput from "C:/Users/26637/Documents/koishi-plugin-jx3/node_modules/@koishijs/components/client/chat/input.vue";
import MessageContent from "C:/Users/26637/Documents/koishi-plugin-jx3/node_modules/@koishijs/components/client/chat/content.vue";

// node_modules/@koishijs/components/client/index.ts
function client_default(app) {
  app.use(form_default);
  app.use(virtual_default);
  app.component("k-comment", Comment);
  app.component("k-image-viewer", ImageViewer);
}

export {
  noop,
  isNullable,
  isPlainObject,
  valueMap,
  is,
  clone,
  deepEqual,
  pick,
  omit,
  defineProperty,
  contain,
  intersection,
  difference,
  union,
  deduplicate,
  remove,
  makeArray,
  arrayBufferToBase64,
  base64ToArrayBuffer,
  capitalize,
  uncapitalize,
  camelCase,
  paramCase,
  snakeCase,
  camelize,
  hyphenate,
  trimSlash,
  sanitize,
  Time,
  lib_default,
  useI18nText,
  IconArrowDown,
  IconArrowUp,
  IconClose,
  IconEllipsis,
  IconExternal,
  IconEyeSlash,
  IconEye,
  IconInvalid,
  Primitive,
  form,
  src_default,
  VirtualList,
  ChatInput,
  MessageContent,
  client_default
};
//# sourceMappingURL=chunk-RSRGMB4D.js.map
