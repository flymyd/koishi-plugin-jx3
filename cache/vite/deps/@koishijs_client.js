import {
  ChatInput,
  IconArrowDown,
  IconArrowUp,
  IconClose,
  IconEllipsis,
  IconExternal,
  IconEye,
  IconEyeSlash,
  IconInvalid,
  MessageContent,
  Primitive,
  Time,
  VirtualList,
  arrayBufferToBase64,
  base64ToArrayBuffer,
  camelCase,
  camelize,
  capitalize,
  client_default,
  clone,
  contain,
  deduplicate,
  deepEqual,
  defineProperty,
  difference,
  form,
  hyphenate,
  intersection,
  is,
  isNullable,
  isPlainObject,
  lib_default,
  makeArray,
  noop,
  omit,
  paramCase,
  pick,
  remove,
  sanitize,
  snakeCase,
  src_default,
  trimSlash,
  uncapitalize,
  union,
  useI18nText,
  valueMap
} from "./chunk-RSRGMB4D.js";
import {
  DatetimeFormat,
  I18nInjectionKey,
  NumberFormat,
  Translation,
  VERSION,
  castToVueI18n,
  createI18n,
  useI18n,
  vTDirective
} from "./chunk-MR54QHPG.js";
import {
  RouterLink,
  START_LOCATION_NORMALIZED,
  createRouter,
  createWebHistory
} from "./chunk-MG7KCY3S.js";
import "./chunk-H5N6YIGP.js";
import {
  ElLoading,
  ElMessage,
  ElMessageBox,
  installer
} from "./chunk-QBLMIJIO.js";
import {
  toValue as toValue2,
  useLocalStorage,
  usePreferredDark
} from "./chunk-T54QTYQF.js";
import {
  computed2 as computed,
  createApp,
  defineComponent,
  h,
  inject,
  markRaw,
  onBeforeUnmount,
  provide,
  reactive,
  ref,
  resolveComponent,
  shallowReactive,
  toValue,
  watch,
  watchEffect
} from "./chunk-SHNSPNRG.js";
import "./chunk-T45SRSZM.js";
import {
  marked
} from "./chunk-VELY6VKU.js";
import {
  require_lib
} from "./chunk-FWLRPHK7.js";
import {
  __export,
  __publicField,
  __toESM
} from "./chunk-ZC22LKFR.js";

// node_modules/@koishijs/client/client/data.ts
var global = KOISHI_CONFIG;
var store = reactive({});
var socket = ref(null);
var listeners = {};
var responseHooks = {};
function send(type, ...args) {
  if (!socket.value)
    return;
  console.debug("↑%c", "color:brown", type, args);
  const id = Math.random().toString(36).slice(2, 9);
  socket.value.send(JSON.stringify({ id, type, args }));
  return new Promise((resolve, reject) => {
    responseHooks[id] = [resolve, reject];
    setTimeout(() => {
      delete responseHooks[id];
      reject(new Error("timeout"));
    }, 6e4);
  });
}
function receive(event, listener) {
  listeners[event] = listener;
}
receive("data", ({ key, value }) => {
  store[key] = value;
});
receive("patch", ({ key, value }) => {
  if (Array.isArray(store[key])) {
    store[key].push(...value);
  } else if (store[key]) {
    Object.assign(store[key], value);
  }
});
receive("response", ({ id, value, error }) => {
  if (!responseHooks[id])
    return;
  const [resolve, reject] = responseHooks[id];
  delete responseHooks[id];
  if (error) {
    reject(error);
  } else {
    resolve(value);
  }
});
function connect(callback) {
  const value = callback();
  let sendTimer;
  let closeTimer;
  const refresh = () => {
    if (!global.heartbeat)
      return;
    clearTimeout(sendTimer);
    clearTimeout(closeTimer);
    sendTimer = +setTimeout(() => send("ping"), global.heartbeat.interval);
    closeTimer = +setTimeout(() => value == null ? void 0 : value.close(), global.heartbeat.timeout);
  };
  const reconnect = () => {
    socket.value = null;
    for (const key in store) {
      store[key] = void 0;
    }
    console.log("[koishi] websocket disconnected, will retry in 1s...");
    setTimeout(() => {
      connect(callback).then(location.reload, () => {
        console.log("[koishi] websocket disconnected, will retry in 1s...");
      });
    }, 1e3);
  };
  value.addEventListener("message", (ev) => {
    refresh();
    const data = JSON.parse(ev.data);
    console.debug("↓%c", "color:purple", data.type, data.body);
    if (data.type in listeners) {
      listeners[data.type](data.body);
    }
  });
  value.addEventListener("close", reconnect);
  return new Promise((resolve, reject) => {
    value.addEventListener("open", (event) => {
      socket.value = markRaw(value);
      resolve(event);
    });
    value.addEventListener("error", reject);
  });
}

// node_modules/marked-vue/lib/index.mjs
var xss = __toESM(require_lib(), 1);
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var allowedTags = [
  // Content sectioning
  "address",
  "article",
  "aside",
  "footer",
  "header",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "hgroup",
  "main",
  "nav",
  "section",
  // Text content
  "blockquote",
  "dd",
  "div",
  "dl",
  "dt",
  "figcaption",
  "figure",
  "hr",
  "li",
  "main",
  "ol",
  "p",
  "pre",
  "ul",
  // Inline text semantics
  "a",
  "abbr",
  "b",
  "bdi",
  "bdo",
  "br",
  "cite",
  "code",
  "data",
  "dfn",
  "em",
  "i",
  "kbd",
  "mark",
  "q",
  "rb",
  "rp",
  "rt",
  "rtc",
  "ruby",
  "s",
  "samp",
  "small",
  "span",
  "strong",
  "sub",
  "sup",
  "time",
  "u",
  "var",
  "wbr",
  // Table content
  "caption",
  "col",
  "colgroup",
  "table",
  "tbody",
  "td",
  "tfoot",
  "th",
  "thead",
  "tr"
];
var voidTags = ["img", "br", "hr", "area", "base", "basefont", "input", "link", "meta"];
var allowedProtocols = ["http:", "https:", "mailto:", "tel:"];
function checkUrl(value) {
  try {
    const url = new URL(value, location.toString());
    return allowedProtocols.includes(url.protocol);
  } catch (e) {
    return false;
  }
}
__name(checkUrl, "checkUrl");
function sanitize2(html) {
  const whiteList = {
    ...Object.fromEntries(allowedTags.map((tag) => [tag, []]))
  };
  const stack = [];
  html = xss.filterXSS(html, {
    whiteList,
    stripIgnoreTag: true,
    onTag(tag, raw, options) {
      let html2;
      if (tag === "a" && !options.isClosing) {
        const attrs = {};
        xss.parseAttr(raw.slice(3), (name, value) => {
          if (name === "href") {
            attrs[name] = checkUrl(value) ? value : "#";
          } else if (name === "title") {
            attrs[name] = xss.escapeAttrValue(value);
          }
          return "";
        });
        attrs.rel = "noopener noreferrer";
        attrs.target = "_blank";
        html2 = `<a ${Object.entries(attrs).map(([name, value]) => `${name}="${value}"`).join(" ")}>`;
      }
      if (raw.endsWith("/>") || voidTags.includes(tag))
        return;
      if (!options.isClosing) {
        stack.push(tag);
        return html2;
      }
      let result = "";
      while (stack.length) {
        const last = stack.pop();
        if (last === tag) {
          return result + raw;
        }
        result += `</${last}>`;
      }
      return raw.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
  });
  while (stack.length) {
    const last = stack.pop();
    html += `</${last}>`;
  }
  return html;
}
__name(sanitize2, "sanitize");
var src_default2 = defineComponent({
  props: {
    source: String,
    inline: Boolean,
    tag: String,
    unsafe: Boolean
  },
  setup(props) {
    return () => {
      let html = props.inline ? marked.parseInline(props.source || "") : marked.parse(props.source || "");
      if (!props.unsafe)
        html = sanitize2(html);
      const tag = props.tag || (props.inline ? "span" : "div");
      return h(tag, {
        class: "markdown",
        innerHTML: html
      });
    };
  }
});

// node_modules/@koishijs/client/client/components/common/index.ts
import Badge from "C:/Users/26637/Documents/koishi-plugin-jx3/node_modules/@koishijs/client/client/components/common/k-badge.vue";
import Button from "C:/Users/26637/Documents/koishi-plugin-jx3/node_modules/@koishijs/client/client/components/common/k-button.vue";
import Hint from "C:/Users/26637/Documents/koishi-plugin-jx3/node_modules/@koishijs/client/client/components/common/k-hint.vue";
import Tab from "C:/Users/26637/Documents/koishi-plugin-jx3/node_modules/@koishijs/client/client/components/common/k-tab.vue";
function common_default(app) {
  app.component("k-badge", Badge);
  app.component("k-button", Button);
  app.component("k-hint", Hint);
  app.component("k-tab", Tab);
}

// node_modules/@koishijs/client/client/components/index.ts
import Dynamic from "C:/Users/26637/Documents/koishi-plugin-jx3/node_modules/@koishijs/client/client/components/dynamic.vue";
import ChatImage from "C:/Users/26637/Documents/koishi-plugin-jx3/node_modules/@koishijs/client/client/components/chat/image.vue";

// node_modules/@koishijs/client/client/components/icons/index.ts
var icons_exports = {};
__export(icons_exports, {
  install: () => install,
  register: () => register
});
import Default from "C:/Users/26637/Documents/koishi-plugin-jx3/node_modules/@koishijs/client/client/components/icons/activity/default.vue";
import Ellipsis from "C:/Users/26637/Documents/koishi-plugin-jx3/node_modules/@koishijs/client/client/components/icons/activity/ellipsis.vue";
import Home from "C:/Users/26637/Documents/koishi-plugin-jx3/node_modules/@koishijs/client/client/components/icons/activity/home.vue";
import Moon from "C:/Users/26637/Documents/koishi-plugin-jx3/node_modules/@koishijs/client/client/components/icons/activity/moon.vue";
import Settings from "C:/Users/26637/Documents/koishi-plugin-jx3/node_modules/@koishijs/client/client/components/icons/activity/settings.vue";
import Sun from "C:/Users/26637/Documents/koishi-plugin-jx3/node_modules/@koishijs/client/client/components/icons/activity/sun.vue";
import BoxOpen from "C:/Users/26637/Documents/koishi-plugin-jx3/node_modules/@koishijs/client/client/components/icons/svg/box-open.vue";
import CheckFull from "C:/Users/26637/Documents/koishi-plugin-jx3/node_modules/@koishijs/client/client/components/icons/svg/check-full.vue";
import ChevronDown from "C:/Users/26637/Documents/koishi-plugin-jx3/node_modules/@koishijs/client/client/components/icons/svg/chevron-down.vue";
import ChevronLeft from "C:/Users/26637/Documents/koishi-plugin-jx3/node_modules/@koishijs/client/client/components/icons/svg/chevron-left.vue";
import ChevronRight from "C:/Users/26637/Documents/koishi-plugin-jx3/node_modules/@koishijs/client/client/components/icons/svg/chevron-right.vue";
import ChevronUp from "C:/Users/26637/Documents/koishi-plugin-jx3/node_modules/@koishijs/client/client/components/icons/svg/chevron-up.vue";
import ClipboardList from "C:/Users/26637/Documents/koishi-plugin-jx3/node_modules/@koishijs/client/client/components/icons/svg/clipboard-list.vue";
import Delete from "C:/Users/26637/Documents/koishi-plugin-jx3/node_modules/@koishijs/client/client/components/icons/svg/delete.vue";
import Edit from "C:/Users/26637/Documents/koishi-plugin-jx3/node_modules/@koishijs/client/client/components/icons/svg/edit.vue";
import ExclamationFull from "C:/Users/26637/Documents/koishi-plugin-jx3/node_modules/@koishijs/client/client/components/icons/svg/exclamation-full.vue";
import Expand from "C:/Users/26637/Documents/koishi-plugin-jx3/node_modules/@koishijs/client/client/components/icons/svg/expand.vue";
import FileArchive from "C:/Users/26637/Documents/koishi-plugin-jx3/node_modules/@koishijs/client/client/components/icons/svg/file-archive.vue";
import Filter from "C:/Users/26637/Documents/koishi-plugin-jx3/node_modules/@koishijs/client/client/components/icons/svg/filter.vue";
import GitHub from "C:/Users/26637/Documents/koishi-plugin-jx3/node_modules/@koishijs/client/client/components/icons/svg/github.vue";
import GitLab from "C:/Users/26637/Documents/koishi-plugin-jx3/node_modules/@koishijs/client/client/components/icons/svg/gitlab.vue";
import InfoFull from "C:/Users/26637/Documents/koishi-plugin-jx3/node_modules/@koishijs/client/client/components/icons/svg/info-full.vue";
import Koishi from "C:/Users/26637/Documents/koishi-plugin-jx3/node_modules/@koishijs/client/client/components/icons/svg/koishi.vue";
import Link from "C:/Users/26637/Documents/koishi-plugin-jx3/node_modules/@koishijs/client/client/components/icons/svg/link.vue";
import PaperPlane from "C:/Users/26637/Documents/koishi-plugin-jx3/node_modules/@koishijs/client/client/components/icons/svg/paper-plane.vue";
import QuestionEmpty from "C:/Users/26637/Documents/koishi-plugin-jx3/node_modules/@koishijs/client/client/components/icons/svg/question-empty.vue";
import Redo from "C:/Users/26637/Documents/koishi-plugin-jx3/node_modules/@koishijs/client/client/components/icons/svg/redo.vue";
import Search from "C:/Users/26637/Documents/koishi-plugin-jx3/node_modules/@koishijs/client/client/components/icons/svg/search.vue";
import SearchMinus from "C:/Users/26637/Documents/koishi-plugin-jx3/node_modules/@koishijs/client/client/components/icons/svg/search-minus.vue";
import SearchPlus from "C:/Users/26637/Documents/koishi-plugin-jx3/node_modules/@koishijs/client/client/components/icons/svg/search-plus.vue";
import StarEmpty from "C:/Users/26637/Documents/koishi-plugin-jx3/node_modules/@koishijs/client/client/components/icons/svg/star-empty.vue";
import StarFull from "C:/Users/26637/Documents/koishi-plugin-jx3/node_modules/@koishijs/client/client/components/icons/svg/star-full.vue";
import Start from "C:/Users/26637/Documents/koishi-plugin-jx3/node_modules/@koishijs/client/client/components/icons/svg/start.vue";
import Tag from "C:/Users/26637/Documents/koishi-plugin-jx3/node_modules/@koishijs/client/client/components/icons/svg/tag.vue";
import TimesFull from "C:/Users/26637/Documents/koishi-plugin-jx3/node_modules/@koishijs/client/client/components/icons/svg/times-full.vue";
import Tools from "C:/Users/26637/Documents/koishi-plugin-jx3/node_modules/@koishijs/client/client/components/icons/svg/tools.vue";
import Undo from "C:/Users/26637/Documents/koishi-plugin-jx3/node_modules/@koishijs/client/client/components/icons/svg/undo.vue";
import User from "C:/Users/26637/Documents/koishi-plugin-jx3/node_modules/@koishijs/client/client/components/icons/svg/user.vue";
import "C:/Users/26637/Documents/koishi-plugin-jx3/node_modules/@koishijs/client/client/components/icons/style.scss";
var registry = reactive({});
register("activity:default", Default);
register("activity:ellipsis", Ellipsis);
register("activity:home", Home);
register("activity:moon", Moon);
register("activity:settings", Settings);
register("activity:sun", Sun);
register("box-open", BoxOpen);
register("check-full", CheckFull);
register("chevron-down", ChevronDown);
register("chevron-left", ChevronLeft);
register("chevron-right", ChevronRight);
register("chevron-up", ChevronUp);
register("clipboard-list", ClipboardList);
register("delete", Delete);
register("edit", Edit);
register("exclamation-full", ExclamationFull);
register("expand", Expand);
register("external", IconExternal);
register("eye-slash", IconEyeSlash);
register("eye", IconEye);
register("file-archive", FileArchive);
register("filter", Filter);
register("github", GitHub);
register("gitlab", GitLab);
register("info-full", InfoFull);
register("koishi", Koishi);
register("link", Link);
register("paper-plane", PaperPlane);
register("question-empty", QuestionEmpty);
register("redo", Redo);
register("search", Search);
register("search-minus", SearchMinus);
register("search-plus", SearchPlus);
register("star-empty", StarEmpty);
register("star-full", StarFull);
register("start", Start);
register("tag", Tag);
register("times-full", TimesFull);
register("tools", Tools);
register("undo", Undo);
register("user", User);
function register(name, component) {
  registry[name] = markRaw(component);
}
function install(app) {
  app.component("k-icon", defineComponent({
    props: {
      name: String
    },
    render(props) {
      const component = registry[props.name];
      return component && h(component);
    }
  }));
}

// node_modules/@koishijs/client/client/components/layout/index.ts
import CardNumeric from "C:/Users/26637/Documents/koishi-plugin-jx3/node_modules/@koishijs/client/client/components/layout/card-numeric.vue";
import Card from "C:/Users/26637/Documents/koishi-plugin-jx3/node_modules/@koishijs/client/client/components/layout/card.vue";
import Content from "C:/Users/26637/Documents/koishi-plugin-jx3/node_modules/@koishijs/client/client/components/layout/content.vue";
import Empty from "C:/Users/26637/Documents/koishi-plugin-jx3/node_modules/@koishijs/client/client/components/layout/empty.vue";
import TabGroup from "C:/Users/26637/Documents/koishi-plugin-jx3/node_modules/@koishijs/client/client/components/layout/tab-group.vue";
import TabItem from "C:/Users/26637/Documents/koishi-plugin-jx3/node_modules/@koishijs/client/client/components/layout/tab-item.vue";
function layout_default(app) {
  app.component("k-numeric", CardNumeric);
  app.component("k-card", Card);
  app.component("k-content", Content);
  app.component("k-empty", Empty);
  app.component("k-tab-group", TabGroup);
  app.component("k-tab-item", TabItem);
}

// node_modules/cordis/lib/index.mjs
var __defProp2 = Object.defineProperty;
var __name2 = (target, value) => __defProp2(target, "name", { value, configurable: true });
function isBailed(value) {
  return value !== null && value !== false && value !== void 0;
}
__name2(isBailed, "isBailed");
var _a;
var Lifecycle = (_a = class {
  constructor(root2) {
    __publicField(this, "isActive", false);
    __publicField(this, "_tasks", /* @__PURE__ */ new Set());
    __publicField(this, "_hooks", {});
    this.root = root2;
    defineProperty(this, Context.current, root2);
    defineProperty(this.on("internal/hook", function(name, listener, prepend) {
      const method = prepend ? "unshift" : "push";
      const { scope } = this[Context.current];
      const { runtime, disposables } = scope;
      if (name === "ready" && this.isActive) {
        scope.ensure(async () => listener());
      } else if (name === "dispose") {
        disposables[method](listener);
        defineProperty(listener, "name", "event <dispose>");
        return () => remove(disposables, listener);
      } else if (name === "fork") {
        runtime.forkables[method](listener);
        return scope.collect("event <fork>", () => remove(runtime.forkables, listener));
      }
    }), Context.static, root2.scope);
  }
  /** @deprecated */
  queue(value) {
    this[Context.current].scope.ensure(async () => value);
  }
  async flush() {
    while (this._tasks.size) {
      await Promise.all(Array.from(this._tasks));
    }
  }
  *getHooks(name, thisArg) {
    const hooks = this._hooks[name] || [];
    for (const [context, callback] of hooks.slice()) {
      const filter = thisArg == null ? void 0 : thisArg[Context.filter];
      if (filter && !filter.call(thisArg, context))
        continue;
      yield callback;
    }
  }
  async parallel(...args) {
    const thisArg = typeof args[0] === "object" ? args.shift() : null;
    const name = args.shift();
    await Promise.all([...this.getHooks(name, thisArg)].map(async (callback) => {
      await callback.apply(thisArg, args);
    }));
  }
  emit(...args) {
    const thisArg = typeof args[0] === "object" ? args.shift() : null;
    const name = args.shift();
    for (const callback of this.getHooks(name, thisArg)) {
      callback.apply(thisArg, args);
    }
  }
  async serial(...args) {
    const thisArg = typeof args[0] === "object" ? args.shift() : null;
    const name = args.shift();
    for (const callback of this.getHooks(name, thisArg)) {
      const result = await callback.apply(thisArg, args);
      if (isBailed(result))
        return result;
    }
  }
  bail(...args) {
    const thisArg = typeof args[0] === "object" ? args.shift() : null;
    const name = args.shift();
    for (const callback of this.getHooks(name, thisArg)) {
      const result = callback.apply(thisArg, args);
      if (isBailed(result))
        return result;
    }
  }
  register(label, hooks, listener, prepend) {
    const maxListeners = this.root.config.maxListeners;
    if (hooks.length >= maxListeners) {
      this.root.emit("internal/warning", `max listener count (${maxListeners}) for ${label} exceeded, which may be caused by a memory leak`);
    }
    const caller = this[Context.current];
    const method = prepend ? "unshift" : "push";
    hooks[method]([caller, listener]);
    return caller.state.collect(label, () => this.unregister(hooks, listener));
  }
  unregister(hooks, listener) {
    const index = hooks.findIndex(([context, callback]) => callback === listener);
    if (index >= 0) {
      hooks.splice(index, 1);
      return true;
    }
  }
  on(name, listener, prepend = false) {
    var _a8;
    const result = this.bail(this, "internal/hook", name, listener, prepend);
    if (result)
      return result;
    const hooks = (_a8 = this._hooks)[name] || (_a8[name] = []);
    const label = typeof name === "string" ? `event <${name}>` : "event (Symbol)";
    return this.register(label, hooks, listener, prepend);
  }
  once(name, listener, prepend = false) {
    const dispose = this.on(name, function(...args) {
      dispose();
      return listener.apply(this, args);
    }, prepend);
    return dispose;
  }
  off(name, listener) {
    return this.unregister(this._hooks[name] || [], listener);
  }
  async start() {
    this.isActive = true;
    const hooks = this._hooks.ready || [];
    while (hooks.length) {
      const [context, callback] = hooks.shift();
      context.scope.ensure(async () => callback());
    }
    await this.flush();
  }
  async stop() {
    this.isActive = false;
    this.root.scope.reset();
  }
}, __name2(_a, "Lifecycle"), __publicField(_a, "methods", ["on", "once", "off", "before", "after", "parallel", "emit", "serial", "bail", "start", "stop"]), _a);
function isConstructor(func) {
  if (!func.prototype)
    return false;
  if (func.prototype.constructor !== func)
    return false;
  return true;
}
__name2(isConstructor, "isConstructor");
function getConstructor(instance) {
  return Object.getPrototypeOf(instance).constructor;
}
__name2(getConstructor, "getConstructor");
function resolveConfig(plugin, config3) {
  if (config3 === false)
    return;
  if (config3 === true)
    config3 = void 0;
  const schema = plugin["Config"] || plugin["schema"];
  if (schema && plugin["schema"] !== false)
    config3 = schema(config3);
  return config3 ?? {};
}
__name2(resolveConfig, "resolveConfig");
var _a2;
var EffectScope = (_a2 = class {
  constructor(parent, config3) {
    __publicField(this, "uid");
    __publicField(this, "ctx");
    __publicField(this, "disposables", []);
    __publicField(this, "error");
    __publicField(this, "status", "pending");
    __publicField(this, "proxy");
    __publicField(this, "context");
    __publicField(this, "acceptors", []);
    __publicField(this, "tasks", /* @__PURE__ */ new Set());
    __publicField(this, "hasError", false);
    __publicField(this, "isActive", false);
    this.parent = parent;
    this.config = config3;
    this.uid = parent.registry ? parent.registry.counter : 0;
    this.ctx = this.context = parent.extend({ scope: this });
    this.proxy = new Proxy({}, {
      get: (target, key) => Reflect.get(this.config, key)
    });
  }
  get _config() {
    return this.runtime.isReactive ? this.proxy : this.config;
  }
  collect(label, callback) {
    const dispose = defineProperty(() => {
      remove(this.disposables, dispose);
      return callback();
    }, "name", label);
    this.disposables.push(dispose);
    return dispose;
  }
  restart() {
    this.reset();
    this.start();
  }
  _getStatus() {
    if (this.uid === null)
      return "disposed";
    if (this.hasError)
      return "failed";
    if (this.tasks.size)
      return "loading";
    if (this.ready)
      return "active";
    return "pending";
  }
  _updateStatus(callback) {
    const oldValue = this.status;
    callback == null ? void 0 : callback();
    this.status = this._getStatus();
    if (oldValue !== this.status) {
      this.context.emit("internal/status", this, oldValue);
    }
  }
  ensure(callback) {
    const task = callback().catch((reason) => {
      this.context.emit("internal/warning", reason);
      this.cancel(reason);
    }).finally(() => {
      this._updateStatus(() => this.tasks.delete(task));
      this.context.events._tasks.delete(task);
    });
    this._updateStatus(() => this.tasks.add(task));
    this.context.events._tasks.add(task);
  }
  cancel(reason) {
    this.error = reason;
    this._updateStatus(() => this.hasError = true);
    this.reset();
  }
  setup() {
    if (!this.runtime.using.length)
      return;
    defineProperty(this.context.on("internal/before-service", (name) => {
      if (!this.runtime.using.includes(name))
        return;
      this._updateStatus();
      this.reset();
    }), Context.static, this);
    defineProperty(this.context.on("internal/service", (name) => {
      if (!this.runtime.using.includes(name))
        return;
      this.start();
    }), Context.static, this);
  }
  get ready() {
    return this.runtime.using.every((name) => this.ctx[name]);
  }
  reset() {
    this.isActive = false;
    this.disposables = this.disposables.splice(0).filter((dispose) => {
      if (this.uid !== null && dispose[Context.static] === this)
        return true;
      dispose();
    });
  }
  start() {
    if (!this.ready || this.isActive || this.uid === null)
      return true;
    this.isActive = true;
    this._updateStatus(() => this.hasError = false);
  }
  accept(...args) {
    var _a8;
    const keys = Array.isArray(args[0]) ? args.shift() : null;
    const acceptor = { keys, callback: args[0], ...args[1] };
    this.acceptors.push(acceptor);
    if (acceptor.immediate)
      (_a8 = acceptor.callback) == null ? void 0 : _a8.call(acceptor, this.config);
    return this.collect(`accept <${(keys == null ? void 0 : keys.join(", ")) || "*"}>`, () => remove(this.acceptors, acceptor));
  }
  decline(keys) {
    return this.accept(keys, () => true);
  }
  checkUpdate(resolved, forced) {
    if (forced)
      return [true, true];
    if (forced === false)
      return [false, false];
    const modified = /* @__PURE__ */ Object.create(null);
    const checkPropertyUpdate = __name2((key) => {
      const result = modified[key] ?? (modified[key] = !deepEqual(this.config[key], resolved[key]));
      hasUpdate || (hasUpdate = result);
      return result;
    }, "checkPropertyUpdate");
    const ignored = /* @__PURE__ */ new Set();
    let hasUpdate = false, shouldRestart = false;
    let fallback = this.runtime.isReactive || null;
    for (const { keys, callback, passive } of this.acceptors) {
      if (!keys) {
        fallback || (fallback = !passive);
      } else if (passive) {
        keys == null ? void 0 : keys.forEach((key) => ignored.add(key));
      } else {
        let hasUpdate2 = false;
        for (const key of keys) {
          hasUpdate2 || (hasUpdate2 = checkPropertyUpdate(key));
        }
        if (!hasUpdate2)
          continue;
      }
      const result = callback == null ? void 0 : callback(resolved);
      if (result)
        shouldRestart = true;
    }
    for (const key in { ...this.config, ...resolved }) {
      if (fallback === false)
        continue;
      if (!(key in modified) && !ignored.has(key)) {
        const hasUpdate2 = checkPropertyUpdate(key);
        if (fallback === null)
          shouldRestart || (shouldRestart = hasUpdate2);
      }
    }
    return [hasUpdate, shouldRestart];
  }
}, __name2(_a2, "EffectScope"), _a2);
var _a3;
var ForkScope = (_a3 = class extends EffectScope {
  constructor(parent, config3, runtime) {
    super(parent, config3);
    __publicField(this, "dispose");
    this.runtime = runtime;
    this.dispose = defineProperty(parent.scope.collect(`fork <${parent.runtime.name}>`, () => {
      this.uid = null;
      this.reset();
      const result = remove(runtime.disposables, this.dispose);
      if (remove(runtime.children, this) && !runtime.children.length) {
        parent.registry.delete(runtime.plugin);
      }
      this.context.emit("internal/fork", this);
      return result;
    }), Context.static, runtime);
    runtime.children.push(this);
    runtime.disposables.push(this.dispose);
    this.context.emit("internal/fork", this);
    if (runtime.isReusable) {
      this.setup();
    }
    this.start();
  }
  start() {
    if (super.start())
      return true;
    for (const fork of this.runtime.forkables) {
      this.ensure(async () => fork(this.context, this._config));
    }
  }
  update(config3, forced) {
    const oldConfig = this.config;
    const state = this.runtime.isForkable ? this : this.runtime;
    if (state.config !== oldConfig)
      return;
    const resolved = resolveConfig(this.runtime.plugin, config3);
    const [hasUpdate, shouldRestart] = state.checkUpdate(resolved, forced);
    this.context.emit("internal/before-update", this, config3);
    this.config = resolved;
    state.config = resolved;
    if (hasUpdate) {
      this.context.emit("internal/update", this, oldConfig);
    }
    if (shouldRestart)
      state.restart();
  }
}, __name2(_a3, "ForkScope"), _a3);
var _a4;
var MainScope = (_a4 = class extends EffectScope {
  constructor(registry2, plugin, config3) {
    super(registry2[Context.current], config3);
    __publicField(this, "runtime", this);
    __publicField(this, "schema");
    __publicField(this, "using", []);
    __publicField(this, "forkables", []);
    __publicField(this, "children", []);
    __publicField(this, "isReusable", false);
    __publicField(this, "isReactive", false);
    __publicField(this, "apply", (context, config3) => {
      const plugin = this.plugin;
      if (typeof plugin !== "function") {
        this.ensure(async () => plugin.apply(context, config3));
      } else if (isConstructor(plugin)) {
        const instance = new plugin(context, config3);
        const name = instance[Context.expose];
        if (name) {
          context[name] = instance;
        }
        if (instance["fork"]) {
          this.forkables.push(instance["fork"].bind(instance));
        }
      } else {
        this.ensure(async () => plugin(context, config3));
      }
    });
    this.plugin = plugin;
    registry2.set(plugin, this);
    if (plugin) {
      this.setup();
    } else {
      this.isActive = true;
    }
  }
  get isForkable() {
    return this.forkables.length > 0;
  }
  get name() {
    if (!this.plugin)
      return "root";
    const { name } = this.plugin;
    return !name || name === "apply" ? "anonymous" : name;
  }
  fork(parent, config3) {
    return new ForkScope(parent, config3, this);
  }
  dispose() {
    this.uid = null;
    this.reset();
    this.context.emit("internal/runtime", this);
    return true;
  }
  setup() {
    this.schema = this.plugin["Config"] || this.plugin["schema"];
    this.using = this.plugin["using"] || [];
    this.isReusable = this.plugin["reusable"];
    this.isReactive = this.plugin["reactive"];
    this.context.emit("internal/runtime", this);
    if (this.isReusable) {
      this.forkables.push(this.apply);
    } else {
      super.setup();
    }
    this.restart();
  }
  reset() {
    super.reset();
    for (const fork of this.children) {
      fork.reset();
    }
  }
  start() {
    if (super.start())
      return true;
    if (!this.isReusable && this.plugin) {
      this.apply(this.context, this._config);
    }
    for (const fork of this.children) {
      fork.start();
    }
  }
  update(config3, forced) {
    if (this.isForkable) {
      this.context.emit("internal/warning", `attempting to update forkable plugin "${this.plugin.name}", which may lead to unexpected behavior`);
    }
    const oldConfig = this.config;
    const resolved = resolveConfig(this.runtime.plugin || getConstructor(this.context), config3);
    const [hasUpdate, shouldRestart] = this.checkUpdate(resolved, forced);
    const state = this.children.find((fork) => fork.config === oldConfig);
    this.config = resolved;
    if (state) {
      this.context.emit("internal/before-update", state, config3);
      state.config = resolved;
      if (hasUpdate) {
        this.context.emit("internal/update", state, oldConfig);
      }
    }
    if (shouldRestart)
      this.restart();
  }
}, __name2(_a4, "MainScope"), _a4);
function isApplicable(object) {
  return object && typeof object === "object" && typeof object.apply === "function";
}
__name2(isApplicable, "isApplicable");
var _a5;
var Registry = (_a5 = class extends Map {
  constructor(root2, config3) {
    super();
    __publicField(this, "_counter", 0);
    this.root = root2;
    defineProperty(this, Context.current, root2);
    root2.scope = new MainScope(this, null, config3);
    root2.scope.runtime.isReactive = true;
  }
  get counter() {
    return ++this._counter;
  }
  resolve(plugin) {
    return plugin && (typeof plugin === "function" ? plugin : plugin.apply);
  }
  get(plugin) {
    return super.get(this.resolve(plugin));
  }
  has(plugin) {
    return super.has(this.resolve(plugin));
  }
  set(plugin, state) {
    return super.set(this.resolve(plugin), state);
  }
  delete(plugin) {
    plugin = this.resolve(plugin);
    const runtime = this.get(plugin);
    if (!runtime)
      return false;
    super.delete(plugin);
    return runtime.dispose();
  }
  using(using, callback) {
    return this.plugin({ using, apply: callback, name: callback.name });
  }
  plugin(plugin, config3) {
    if (typeof plugin !== "function" && !isApplicable(plugin)) {
      throw new Error('invalid plugin, expect function or object with an "apply" method');
    }
    config3 = resolveConfig(plugin, config3);
    if (!config3)
      return;
    const context = this[Context.current];
    let runtime = this.get(plugin);
    if (runtime) {
      if (!runtime.isForkable) {
        this.root.emit("internal/warning", `duplicate plugin detected: ${plugin.name}`);
      }
      return runtime.fork(context, config3);
    }
    runtime = new MainScope(this, plugin, config3);
    return runtime.fork(context, config3);
  }
  dispose(plugin) {
    return this.delete(plugin);
  }
}, __name2(_a5, "Registry"), __publicField(_a5, "methods", ["using", "plugin", "dispose"]), _a5);
var _a6;
var Context = (_a6 = class {
  constructor(config3) {
    const options = resolveConfig(getConstructor(this), config3);
    const attach = __name2((internal) => {
      if (!internal)
        return;
      attach(Object.getPrototypeOf(internal));
      for (const key of Object.getOwnPropertySymbols(internal)) {
        const constructor = internal[key];
        const name = constructor[_a6.expose];
        this[key] = new constructor(this, name ? options == null ? void 0 : options[name] : options);
      }
    }, "attach");
    this.root = this;
    this.mapping = /* @__PURE__ */ Object.create(null);
    attach(this[_a6.internal]);
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return `Context <${this.runtime.name}>`;
  }
  get events() {
    return this.lifecycle;
  }
  /** @deprecated */
  get state() {
    return this.scope;
  }
  extend(meta = {}) {
    return Object.assign(Object.create(this), meta);
  }
  isolate(names) {
    const mapping = Object.create(this.mapping);
    for (const name of names) {
      mapping[name] = Symbol(name);
    }
    return this.extend({ mapping });
  }
}, __name2(_a6, "Context"), __publicField(_a6, "config", Symbol("config")), __publicField(_a6, "events", Symbol("events")), __publicField(_a6, "static", Symbol("static")), __publicField(_a6, "filter", Symbol("filter")), __publicField(_a6, "source", Symbol("source")), __publicField(_a6, "expose", Symbol("expose")), __publicField(_a6, "current", Symbol("current")), __publicField(_a6, "internal", Symbol("internal")), _a6);
((Context22) => {
  function mixin(name, options) {
    for (const key of options.methods || []) {
      const method = defineProperty(function(...args) {
        return this[name][key](...args);
      }, "name", key);
      defineProperty(this.prototype, key, method);
    }
    for (const key of options.properties || []) {
      Object.defineProperty(this.prototype, key, {
        configurable: true,
        get() {
          return this[name][key];
        },
        set(value) {
          this[name][key] = value;
        }
      });
    }
  }
  Context22.mixin = mixin;
  __name2(mixin, "mixin");
  function service(name, options = {}) {
    if (Object.prototype.hasOwnProperty.call(this.prototype, name))
      return;
    const privateKey = typeof name === "symbol" ? name : Symbol(name);
    Object.defineProperty(this.prototype, name, {
      configurable: true,
      get() {
        const key = this.mapping[name] || privateKey;
        const value = this.root[key];
        if (!value)
          return;
        defineProperty(value, Context22.current, this);
        return value;
      },
      set(value) {
        const key = this.mapping[name] || privateKey;
        const oldValue = this.root[key];
        if (oldValue === value)
          return;
        const self = /* @__PURE__ */ Object.create(null);
        self[Context22.filter] = (ctx) => {
          return this.mapping[name] === ctx.mapping[name];
        };
        if (value && oldValue && typeof name === "string") {
          throw new Error(`service ${name} has been registered`);
        }
        if (typeof name === "string") {
          this.emit(self, "internal/before-service", name, value);
        }
        this.root[key] = value;
        if (value && typeof value === "object") {
          defineProperty(value, Context22.source, this);
        }
        if (typeof name === "string") {
          this.emit(self, "internal/service", name, oldValue);
        }
      }
    });
    if (isConstructor(options)) {
      const internal = ensureInternal(this.prototype);
      internal[privateKey] = options;
    }
    this.mixin(name, options);
  }
  Context22.service = service;
  __name2(service, "service");
  function ensureInternal(prototype) {
    if (Object.prototype.hasOwnProperty.call(prototype, Context22.internal)) {
      return prototype[Context22.internal];
    }
    const parent = ensureInternal(Object.getPrototypeOf(prototype));
    return prototype[Context22.internal] = Object.create(parent);
  }
  __name2(ensureInternal, "ensureInternal");
})(Context || (Context = {}));
Context.prototype[Context.internal] = /* @__PURE__ */ Object.create(null);
Context.service("registry", Registry);
Context.service("lifecycle", Lifecycle);
Context.mixin("state", {
  properties: ["config", "runtime"],
  methods: ["collect", "accept", "decline"]
});
var _a7;
var Service = (_a7 = class {
  constructor(ctx, name, immediate) {
    this.ctx = ctx;
    getConstructor(ctx.root).service(name);
    defineProperty(this, Context.current, ctx);
    if (immediate) {
      this[Context.expose] = name;
    }
    ctx.on("ready", async () => {
      await Promise.resolve();
      await this.start();
      ctx[name] = this;
    });
    ctx.on("dispose", async () => {
      ctx[name] = null;
      await this.stop();
    });
  }
  start() {
  }
  stop() {
  }
  get caller() {
    return this[Context.current];
  }
}, __name2(_a7, "Service"), _a7);

// node_modules/@koishijs/client/client/activity.ts
var activities = reactive({});
function getActivityId(path) {
  return path.split("/").find(Boolean) ?? "";
}
var Activity = class {
  constructor(ctx, options) {
    this.ctx = ctx;
    this.options = options;
    __publicField(this, "id");
    __publicField(this, "_disposables", []);
    options.order ?? (options.order = 0);
    options.position ?? (options.position = "top");
    Object.assign(this, omit(options, ["icon", "name", "desc", "disabled"]));
    const { path, id = getActivityId(path), component } = options;
    this._disposables.push(router.addRoute({ path, name: id, component, meta: { activity: this } }));
    this.id ?? (this.id = id);
    this.handleUpdate();
    this.authority ?? (this.authority = 0);
    this.fields ?? (this.fields = []);
    activities[this.id] = this;
  }
  handleUpdate() {
    const { redirect } = router.currentRoute.value.query;
    if (typeof redirect === "string") {
      const location2 = router.resolve(redirect);
      if (location2.matched.length) {
        router.replace(location2);
      }
    }
  }
  get icon() {
    return toValue2(this.options.icon ?? "activity:default");
  }
  get name() {
    return toValue2(this.options.name ?? this.id);
  }
  get desc() {
    return toValue2(this.options.desc);
  }
  disabled() {
    var _a8, _b;
    if (root.bail("activity", this))
      return true;
    if (!this.fields.every((key) => store[key]))
      return true;
    if (this.when && !this.when())
      return true;
    if ((_b = (_a8 = this.options).disabled) == null ? void 0 : _b.call(_a8))
      return true;
  }
  dispose() {
    var _a8;
    this._disposables.forEach((dispose) => dispose());
    const current = router.currentRoute.value;
    if (((_a8 = current == null ? void 0 : current.meta) == null ? void 0 : _a8.activity) === this) {
      router.push({
        path: "/",
        query: { redirect: current.fullPath }
      });
    }
    return delete activities[this.id];
  }
};

// node_modules/@koishijs/client/client/config.ts
var useStorage = (key, version, fallback) => {
  const initial = fallback ? fallback() : {};
  initial["__version__"] = version;
  const storage = useLocalStorage("koishi.console." + key, initial);
  if (storage.value["__version__"] !== version) {
    storage.value = initial;
  }
  return storage;
};
function provideStorage(factory) {
  useStorage = factory;
}
function createStorage(key, version, fallback) {
  const storage = useLocalStorage("koishi.console." + key, {});
  const initial = fallback ? fallback() : {};
  if (storage.value.version !== version) {
    storage.value = { version, data: initial };
  } else if (!Array.isArray(storage.value.data)) {
    storage.value.data = { ...initial, ...storage.value.data };
  }
  return reactive(storage.value["data"]);
}
var config = useStorage("config", void 0, () => ({
  theme: {
    mode: "auto",
    dark: "default-dark",
    light: "default-light"
  },
  locale: "zh-CN"
}));
var preferDark = usePreferredDark();
var mode = computed(() => {
  const mode3 = config.value.theme.mode;
  if (mode3 !== "auto")
    return mode3;
  return preferDark.value ? "dark" : "light";
});
var useConfig = () => config;
var useColorMode = () => mode;
watchEffect(() => {
  const root2 = window.document.querySelector("html");
  root2.setAttribute("theme", config.value.theme[mode.value]);
  if (mode.value === "dark") {
    root2.classList.add("dark");
  } else {
    root2.classList.remove("dark");
  }
}, { flush: "post" });

// node_modules/@koishijs/client/client/loader.ts
function defineExtension(callback) {
  return callback;
}
function unwrapExports(module) {
  return (module == null ? void 0 : module.default) || module;
}
var loaders = {
  async [`.css`](ctx, url) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = url;
    await new Promise((resolve, reject) => {
      link.onload = resolve;
      link.onerror = reject;
      document.head.appendChild(link);
      ctx.on("dispose", () => {
        document.head.removeChild(link);
      });
    });
  },
  async [``](ctx, url) {
    const exports = await import(
      /* @vite-ignore */
      url
    );
    ctx.plugin(unwrapExports(exports));
  }
};
var extensions = reactive({});
var initTask = new Promise((resolve) => {
  watch(() => store.entry, async (newValue, oldValue) => {
    newValue || (newValue = {});
    for (const key in extensions) {
      if (newValue[key])
        continue;
      extensions[key].scope.dispose();
      delete extensions[key];
    }
    await Promise.all(Object.entries(newValue).map(([key, { files, paths }]) => {
      if (extensions[key])
        return;
      const scope = root.plugin(() => {
      });
      scope.ctx.extension = extensions[key] = { done: false, scope, paths };
      const task = Promise.all(files.map((url) => {
        for (const ext in loaders) {
          if (!url.endsWith(ext))
            continue;
          return loaders[ext](scope.ctx, url);
        }
      }));
      task.finally(() => extensions[key].done = true);
    }));
    if (!oldValue) {
      resolve();
      if (!root.events.isActive)
        root.start();
    }
  }, { deep: true });
});

// node_modules/@koishijs/client/client/context.ts
var Service2 = Service;
var config2 = useConfig();
var mode2 = useColorMode();
function useContext() {
  const parent = inject("cordis");
  const fork = parent.plugin(() => {
  });
  onBeforeUnmount(() => fork.dispose());
  return fork.ctx;
}
function insert(list, item) {
  markRaw(item);
  const index = list.findIndex((a) => a.order < item.order);
  if (index >= 0) {
    list.splice(index, 0, item);
  } else {
    list.push(item);
  }
}
var Internal = class {
  constructor() {
    __publicField(this, "extensions", extensions);
    __publicField(this, "activities", activities);
    __publicField(this, "routeCache", routeCache);
    __publicField(this, "scope", shallowReactive({}));
    __publicField(this, "menus", reactive({}));
    __publicField(this, "actions", reactive({}));
    __publicField(this, "views", reactive({}));
    __publicField(this, "themes", reactive({}));
    __publicField(this, "settings", reactive({}));
    __publicField(this, "activeMenus", reactive([]));
  }
  createScope(prefix = "") {
    return new Proxy({}, {
      get: (target, key) => {
        if (typeof key === "symbol")
          return target[key];
        key = prefix + key;
        if (key in this.scope)
          return toValue(this.scope[key]);
        const _prefix = key + ".";
        if (Object.keys(this.scope).some((k) => k.startsWith(_prefix))) {
          return this.createScope(key + ".");
        }
      }
    });
  }
};
function useMenu(id) {
  const ctx = useContext();
  return (event, value) => {
    ctx.define(id, value);
    event.preventDefault();
    const { clientX, clientY } = event;
    ctx.internal.activeMenus.splice(0, Infinity, { id, styles: { left: clientX + "px", top: clientY + "px" } });
  };
}
var routeCache = reactive({});
var Context4 = class _Context extends Context {
  constructor() {
    super();
    __publicField(this, "app");
    __publicField(this, "extension");
    __publicField(this, "internal", new Internal());
    this.app = createApp(defineComponent({
      setup() {
        return () => [
          h(resolveComponent("k-slot"), { name: "root", single: true }),
          h(resolveComponent("k-slot"), { name: "global" })
        ];
      }
    }));
    this.app.provide("cordis", this);
  }
  wrapComponent(component) {
    if (!component)
      return;
    const caller = this[_Context.current] || this;
    return defineComponent((props, { slots }) => {
      provide("cordis", caller);
      return () => h(component, props, slots);
    });
  }
  /** @deprecated */
  addView(options) {
    return this.slot(options);
  }
  /** @deprecated */
  addPage(options) {
    return this.page(options);
  }
  slot(options) {
    var _a8, _b;
    options.order ?? (options.order = 0);
    options.component = this.wrapComponent(options.component);
    if (options.when)
      options.disabled = () => !options.when();
    const list = (_a8 = this.internal.views)[_b = options.type] || (_a8[_b] = []);
    insert(list, options);
    return this.scope.collect("view", () => remove(list, options));
  }
  page(options) {
    options.component = this.wrapComponent(options.component);
    const activity = new Activity(this, options);
    return this.scope.collect("page", () => activity.dispose());
  }
  schema(extension) {
    src_default.extensions.add(extension);
    extension.component = this.wrapComponent(extension.component);
    return this.scope.collect("schema", () => src_default.extensions.delete(extension));
  }
  action(id, options) {
    markRaw(options);
    this.internal.actions[id] = options;
    return this.scope.collect("actions", () => delete this.internal.actions[id]);
  }
  menu(id, items) {
    var _a8;
    const list = (_a8 = this.internal.menus)[id] || (_a8[id] = []);
    items.forEach((item) => insert(list, item));
    return this.scope.collect("menus", () => {
      items.forEach((item) => remove(list, item));
      return true;
    });
  }
  define(key, value) {
    this.internal.scope[key] = value;
    return this.scope.collect("activate", () => delete this.internal.scope[key]);
  }
  settings(options) {
    var _a8, _b;
    markRaw(options);
    options.order ?? (options.order = 0);
    options.component = this.wrapComponent(options.component);
    const list = (_a8 = this.internal.settings)[_b = options.id] || (_a8[_b] = []);
    insert(list, options);
    if (options.schema) {
      try {
        options.schema(config2.value, { autofix: true });
      } catch (error) {
        console.error(error);
      }
    }
    return this.scope.collect("settings", () => remove(list, options));
  }
  theme(options) {
    markRaw(options);
    this.internal.themes[options.id] = options;
    for (const [type, component] of Object.entries(options.components || {})) {
      this.slot({
        type,
        disabled: () => config2.value.theme[mode2.value] !== options.id,
        component
      });
    }
    return this.scope.collect("view", () => delete this.internal.themes[options.id]);
  }
};
markRaw(Context.prototype);
markRaw(EffectScope.prototype);

// node_modules/@koishijs/client/client/components/link.ts
var KActivityLink = defineComponent({
  props: {
    id: String
  },
  setup(props, { slots }) {
    const ctx = useContext();
    return () => {
      const activity = ctx.internal.activities[props.id];
      return h(RouterLink, {
        to: ctx.internal.routeCache[activity == null ? void 0 : activity.id] || (activity == null ? void 0 : activity.path.replace(/:.+/, ""))
      }, {
        default: () => {
          var _a8;
          return ((_a8 = slots.default) == null ? void 0 : _a8.call(slots)) ?? (activity == null ? void 0 : activity.name);
        }
      });
    };
  }
});
function link_default(app) {
  app.component("k-activity-link", KActivityLink);
}

// node_modules/@koishijs/client/client/components/slot.ts
var KSlot = defineComponent({
  props: {
    name: String,
    data: Object,
    single: Boolean
  },
  setup(props, { slots }) {
    const ctx = useContext();
    return () => {
      var _a8, _b, _c;
      const internal = props.single ? [] : [...((_a8 = slots.default) == null ? void 0 : _a8.call(slots)) || []].filter((node) => node.type === KSlotItem).map((node) => {
        var _a9;
        return { node, order: ((_a9 = node.props) == null ? void 0 : _a9.order) || 0 };
      });
      const external = [...ctx.internal.views[props.name] || []].filter((item) => {
        var _a9;
        return !((_a9 = item.disabled) == null ? void 0 : _a9.call(item));
      }).map((item) => ({
        node: h(item.component, { data: props.data, ...props.data }, slots),
        order: item.order,
        layer: 1
      }));
      const children = [...internal, ...external].sort((a, b) => b.order - a.order);
      if (props.single) {
        return ((_b = children[0]) == null ? void 0 : _b.node) || ((_c = slots.default) == null ? void 0 : _c.call(slots));
      }
      return children.map((item) => item.node);
    };
  }
});
var KSlotItem = defineComponent({
  props: {
    order: Number
  },
  setup(props, { slots }) {
    return () => {
      var _a8;
      return (_a8 = slots.default) == null ? void 0 : _a8.call(slots);
    };
  }
});
function defineSlotComponent(name) {
  return defineComponent({
    inheritAttrs: false,
    setup(_, { slots, attrs }) {
      return () => h(KSlot, { name, data: attrs, single: true }, slots);
    }
  });
}
var slot_default = (app) => {
  app.component("k-slot", KSlot);
  app.component("k-slot-item", KSlotItem);
  app.component("k-layout", defineSlotComponent("layout"));
  app.component("k-status", defineSlotComponent("status"));
};

// node_modules/@koishijs/client/client/components/index.ts
import "C:/Users/26637/Documents/koishi-plugin-jx3/node_modules/element-plus/dist/index.css";
var loading = ElLoading.service;
var message = ElMessage;
var messageBox = ElMessageBox;
src_default.extensions.add({
  type: "any",
  role: "dynamic",
  component: Dynamic
});
function components_default(app) {
  app.use(installer);
  app.component("k-markdown", src_default2);
  app.use(common_default);
  app.use(client_default);
  app.use(icons_exports);
  app.use(layout_default);
  app.use(link_default);
  app.use(slot_default);
}

// node_modules/@koishijs/client/client/index.ts
import Overlay from "C:/Users/26637/Documents/koishi-plugin-jx3/node_modules/@koishijs/client/client/components/chat/overlay.vue";

// node_modules/@koishijs/client/client/utils.ts
var Card2;
((Card3) => {
  function create(render, fields = []) {
    return defineComponent({
      render: () => fields.every((key) => store[key]) ? render() : null
    });
  }
  Card3.create = create;
  function numeric({ type, icon, fields, title, content }) {
    if (!type) {
      return defineComponent(() => () => {
        if (!fields.every((key) => store[key]))
          return;
        return h(resolveComponent("k-numeric"), { icon, title }, () => content(store));
      });
    }
    return defineComponent(() => () => {
      if (!fields.every((key) => store[key]))
        return;
      let value = content(store);
      if (isNullable(value))
        return;
      if (type === "size") {
        if (value >= (1 << 20) * 1e3) {
          value = (value / (1 << 30)).toFixed(1) + " GB";
        } else if (value >= (1 << 10) * 1e3) {
          value = (value / (1 << 20)).toFixed(1) + " MB";
        } else {
          value = (value / (1 << 10)).toFixed(1) + " KB";
        }
      }
      return h(resolveComponent("k-numeric"), { icon, title }, () => [value]);
    });
  }
  Card3.numeric = numeric;
})(Card2 || (Card2 = {}));

// node_modules/@koishijs/client/client/index.ts
var client_default2 = components_default;
var root = new Context4();
var router = createRouter({
  history: createWebHistory(global.uiPath),
  linkActiveClass: "active",
  routes: []
});
router.afterEach((route) => {
  var _a8;
  const { name, fullPath } = router.currentRoute.value;
  routeCache[name] = fullPath;
  if (route.meta.activity) {
    document.title = `${route.meta.activity.name} | ${((_a8 = global.messages) == null ? void 0 : _a8.title) || "Koishi 控制台"}`;
  }
});
var i18n = createI18n({
  legacy: false,
  fallbackLocale: "zh-CN"
});
watchEffect(() => {
  i18n.global.locale.value = config.value.locale;
});
root.app.use(components_default);
root.app.use(i18n);
root.app.use(router);
root.slot({
  type: "global",
  component: Overlay
});
root.on("activity", (data) => !data);
router.beforeEach(async (to, from) => {
  if (to.matched.length)
    return;
  if (from === START_LOCATION_NORMALIZED) {
    await initTask;
    to = router.resolve(to);
    if (to.matched.length)
      return to;
  }
  return {
    path: "/",
    query: { redirect: to.fullPath }
  };
});
export {
  Activity,
  Card2 as Card,
  ChatImage,
  ChatInput,
  Context4 as Context,
  DatetimeFormat,
  I18nInjectionKey,
  IconArrowDown,
  IconArrowUp,
  IconClose,
  IconEllipsis,
  IconExternal,
  IconEye,
  IconEyeSlash,
  IconInvalid,
  KSlot,
  MessageContent,
  NumberFormat,
  Primitive,
  lib_default as Schema,
  src_default as SchemaBase,
  Service2 as Service,
  Time,
  Translation,
  VERSION,
  VirtualList,
  activities,
  arrayBufferToBase64,
  base64ToArrayBuffer,
  camelCase,
  camelize,
  capitalize,
  castToVueI18n,
  clone,
  config,
  connect,
  contain,
  createI18n,
  createStorage,
  deduplicate,
  deepEqual,
  client_default2 as default,
  defineExtension,
  defineProperty,
  difference,
  extensions,
  form,
  global,
  hyphenate,
  i18n,
  icons_exports as icons,
  initTask,
  intersection,
  is,
  isNullable,
  isPlainObject,
  loading,
  makeArray,
  message,
  messageBox,
  noop,
  omit,
  paramCase,
  pick,
  provideStorage,
  receive,
  remove,
  root,
  routeCache,
  router,
  sanitize,
  send,
  snakeCase,
  socket,
  store,
  trimSlash,
  uncapitalize,
  union,
  unwrapExports,
  useColorMode,
  useConfig,
  useContext,
  useI18n,
  useI18nText,
  useMenu,
  useStorage,
  vTDirective,
  valueMap
};
//# sourceMappingURL=@koishijs_client.js.map
