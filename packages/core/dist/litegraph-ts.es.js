var P = /* @__PURE__ */ ((t) => (t[t.UP = 1] = "UP", t[t.DOWN = 2] = "DOWN", t[t.LEFT = 3] = "LEFT", t[t.RIGHT = 4] = "RIGHT", t[t.CENTER = 5] = "CENTER", t))(P || {}), J = /* @__PURE__ */ ((t) => (t[t.ALWAYS = 0] = "ALWAYS", t[t.ON_EVENT = 1] = "ON_EVENT", t[t.NEVER = 2] = "NEVER", t[t.ON_TRIGGER = 3] = "ON_TRIGGER", t[t.ON_REQUEST = 4] = "ON_REQUEST", t))(J || {});
const oe = ["Always", "On Event", "Never", "On Trigger"], Oe = ["#666", "#422", "#333", "#224", "#626"];
var D = /* @__PURE__ */ ((t) => (t[t.DEFAULT = 0] = "DEFAULT", t[t.BOX_SHAPE = 1] = "BOX_SHAPE", t[t.ROUND_SHAPE = 2] = "ROUND_SHAPE", t[t.CIRCLE_SHAPE = 3] = "CIRCLE_SHAPE", t[t.CARD_SHAPE = 4] = "CARD_SHAPE", t[t.ARROW_SHAPE = 5] = "ARROW_SHAPE", t[t.GRID_SHAPE = 6] = "GRID_SHAPE", t))(D || {});
const Ie = ["default", "box", "round", "circle", "card", "arrow", "square"];
var z = /* @__PURE__ */ ((t) => (t[t.INPUT = 0] = "INPUT", t[t.OUTPUT = 1] = "OUTPUT", t))(z || {}), de = /* @__PURE__ */ ((t) => (t[t.STRAIGHT_LINK = 0] = "STRAIGHT_LINK", t[t.LINEAR_LINK = 1] = "LINEAR_LINK", t[t.SPLINE_LINK = 2] = "SPLINE_LINK", t))(de || {});
const xe = ["Straight", "Linear", "Spline"];
var ne = /* @__PURE__ */ ((t) => (t[t.NORMAL_TITLE = 0] = "NORMAL_TITLE", t[t.NO_TITLE = 1] = "NO_TITLE", t[t.TRANSPARENT_TITLE = 2] = "TRANSPARENT_TITLE", t[t.AUTOHIDE_TITLE = 3] = "AUTOHIDE_TITLE", t))(ne || {}), I = /* @__PURE__ */ ((t) => (t[t.EVENT = -2] = "EVENT", t[t.ACTION = -1] = "ACTION", t[t.DEFAULT = 0] = "DEFAULT", t))(I || {});
const Ae = ["*", "array", "object", "number", "string", "enum", "boolean", "table"];
var he = /* @__PURE__ */ ((t) => (t.VERTICAL_LAYOUT = "vertical", t.HORIZONTAL_LAYOUT = "horizontal", t))(he || {});
function Te(t, e, i) {
  return e > t ? e : i < t ? i : t;
}
function ve(t, e) {
  return t.reduce((i, n) => {
    const s = e(n);
    return i[s] = n, i;
  }, {});
}
function Ce(t, e) {
  return e in t ? t[e] : null;
}
function be(t, e) {
  return e in t.constructor ? t.constructor[e] : null;
}
function Ge(t, e) {
  if (t.target !== e)
    return;
  let i = t.clientX - parseInt(window.getComputedStyle(e).left), n = t.clientY - parseInt(window.getComputedStyle(e).top);
  const s = (o) => {
    if (o.buttons === 0) {
      r();
      return;
    }
    e.style.top = o.clientY - n + "px", e.style.left = o.clientX - i + "px";
  }, r = () => {
    window.removeEventListener("mousemove", s), window.removeEventListener("mouseup", r);
  };
  window.addEventListener("mousemove", s), window.addEventListener("mouseup", r);
}
function Ee(t) {
  return t.addEventListener("mousedown", (e) => Ge(e, t)), t.classList.add("draggable"), t;
}
function $(t) {
  return t === I.EVENT ? "Event" : t === I.ACTION ? "Action" : t === I.DEFAULT ? "Default" : t;
}
function Se(t) {
  return t === I.EVENT || t === I.ACTION || t === I.DEFAULT || typeof t == "string";
}
function Ke(t) {
  return typeof t == "string";
}
function qe(t) {
  return typeof t == "number";
}
function je(t) {
  return typeof t == "boolean";
}
function Ze(t) {
  return typeof t == "object";
}
function Je(t) {
  return Array.isArray(t);
}
function $e(t) {
  try {
    JSON.parse(t);
  } catch {
    return !1;
  }
  return !0;
}
function Qe(t) {
  try {
    return JSON.stringify(t), !1;
  } catch {
    return !0;
  }
}
const L = class {
  /** Register a node class so it can be listed when the user wants to create a new one */
  static registerNodeType(t) {
    L.debug && console.log("Node registered: " + t.type);
    const e = t.name, i = t.type;
    if (!i)
      throw "Config has no type: " + t;
    if (L.debug && console.debug(e, i), t.category == null || t.category === "") {
      const s = i.lastIndexOf("/");
      t.category = i.substring(0, s);
    }
    t.title || (t.title = e), t.title_cn && (t.title = t.title_cn);
    const n = L.registered_node_types[i];
    if (n && console.warn("replacing node type: " + i), t.supported_extensions)
      for (let s in t.supported_extensions) {
        const r = t.supported_extensions[s];
        r && r.constructor === String && (L.node_types_by_file_extension[r.toLowerCase()] = t);
      }
    t.class.__LITEGRAPH_TYPE__ = i, L.registered_node_types[i] = t, t.class.name && (L.Nodes[e] = t), L.onNodeTypeRegistered && L.onNodeTypeRegistered(i, t), n && L.onNodeTypeReplaced && L.onNodeTypeReplaced(i, t, n);
  }
  /** removes a node type from the system */
  static unregisterNodeType(t) {
    let e;
    if (typeof t == "string" ? e = L.registered_node_types[t] : e = t, !e)
      throw "node type not found: " + t;
    delete L.registered_node_types[e.type], e.constructor.name && delete L.Nodes[e.constructor.name];
  }
  /**
   * Save a slot type and his node
   * @method registerSlotType
   * @param {String|Object} type name of the node or the node constructor itself
   * @param {String} slot_type name of the slot type (variable type), eg. string, number, array, boolean, ..
   */
  static registerNodeAndSlotType(t, e, i = !1) {
    let n;
    if (typeof t == "string" ? n = L.registered_node_types[t] : "type" in t ? n = L.registered_node_types[t.type] : n = t, !n)
      throw "Node not registered!" + t;
    var s = n.class.__litegraph_type__;
    if (typeof e == "string")
      var r = e.split(",");
    else if (e == I.EVENT || e == I.ACTION)
      var r = ["_event_"];
    else
      var r = ["*"];
    for (var o = 0; o < r.length; ++o) {
      var a = r[o];
      a === "" && (a = "*");
      var l = i ? "registered_slot_out_types" : "registered_slot_in_types";
      typeof this[l][a] > "u" && (this[l][a] = { nodes: [] }), this[l][a].nodes.push(s), a !== "_event_" && a !== "*" && (i ? L.slot_types_out.includes(a.toLowerCase()) || (L.slot_types_out.push(a.toLowerCase()), L.slot_types_out.sort()) : L.slot_types_in.includes(a.toLowerCase()) || (L.slot_types_in.push(a.toLowerCase()), L.slot_types_in.sort()));
    }
  }
  /** Removes all previously registered node's types. */
  static clearRegisteredTypes() {
    L.registered_node_types = {}, L.node_types_by_file_extension = {}, L.Nodes = {}, L.searchbox_extras = {};
  }
  /**
   * Create a new node type by passing a function, it wraps it with a proper class and generates inputs according to the parameters of the function.
   * Useful to wrap simple methods that do not require properties, and that only process some input to generate an output.
   * @param name node name with namespace (p.e.: 'math/sum')
   * @param func
   * @param param_types an array containing the type of every parameter, otherwise parameters will accept any type
   * @param return_type string with the return type, otherwise it will be generic
   * @param properties properties to be configurable
   */
  // static wrapFunctionAsNode(
  //     name: string,
  //     func: (...args: any[]) => any,
  //     param_types?: string[],
  //     return_type?: string,
  //     properties?: object
  // ): void {
  //     var params = Array(func.length);
  //     var code = "";
  //     var names = LiteGraph.getParameterNames(func);
  //     for (var i = 0; i < names.length; ++i) {
  //         code +=
  //         "this.addInput('" +
  //             names[i] +
  //             "'," +
  //             (param_types && param_types[i]
  //                 ? "'" + param_types[i] + "'"
  //                 : "0") +
  //             ");\n";
  //     }
  //     code +=
  //     "this.addOutput('out'," +
  //         (return_type ? "'" + return_type + "'" : 0) +
  //         ");\n";
  //     if (properties) {
  //         code +=
  //         "this.properties = " + JSON.stringify(properties) + ";\n";
  //     }
  //     var classobj = Function(code) as any;
  //     classobj.title = name.split("/").pop();
  //     classobj.desc = "Generated from " + func.name;
  //     classobj.prototype.onExecute = function onExecute() {
  //         for (var i = 0; i < params.length; ++i) {
  //             params[i] = this.getInputData(i);
  //         }
  //         var r = func.apply(this, params);
  //         this.setOutputData(0, r);
  //     };
  //     LiteGraph.registerNodeType(name, classobj);
  // }
  /**
   * Adds this method to all node types, existing and to be created
   * (You can add it to LGraphNode.prototype but then existing node types wont have it)
   */
  // static addNodeMethod(name: string, func: (...args: any[]) => any): void {
  //     LGraphNode.prototype[name] = func;
  //     for (var i in LiteGraph.registered_node_types) {
  //         var type = LiteGraph.registered_node_types[i];
  //         if (type.prototype[name]) {
  //             type.prototype["_" + name] = type.prototype[name];
  //         } //keep old in case of replacing
  //         type.prototype[name] = func;
  //     }
  // }
  /**
   * 使用名称创建给定类型的节点。该节点尚未附加到任何图形。
   * @param 键入节点类的全名。 p.e. “math/sin”
   * @param 命名一个名称以区别于其他节点
   * @param 选项以设置选项
   */
  static createNode(t, e, i = {}) {
    let n = null, s;
    if (typeof t == "string")
      s = t;
    else if (s = t.__LITEGRAPH_TYPE__, !s)
      throw console.error(t), "Node was not registered yet!";
    if (n = L.registered_node_types[s], !n)
      return console.warn(
        'GraphNode type "' + t + '" not registered.'
      ), null;
    e = e || n.title || s;
    var r = null;
    const o = i.constructorArgs || [];
    if (L.catch_exceptions)
      try {
        r = new n.class(e, ...o);
      } catch (c) {
        return console.error("Error creating node!", c), null;
      }
    else
      r = new n.class(e, ...o);
    if (r.class = n.class, r.type = s, !r.title && e && (r.title = e), r.properties || (r.properties = {}), r.properties_info || (r.properties_info = []), r.flags || (r.flags = {}), r.size || (r.size = r.computeSize()), r.pos || (r.pos = [L.DEFAULT_POSITION[0], L.DEFAULT_POSITION[1]]), r.mode || (r.mode = J.ALWAYS), i.instanceProps)
      for (var a in i.instanceProps)
        r[a] = i.instanceProps[a];
    const l = Ce(n.class, "propertyLayout");
    if (l) {
      L.debug && console.debug("Found property layout!", l);
      for (const c of l) {
        const { name: g, defaultValue: d, type: _, options: f } = c;
        r.addProperty(g, d, _, f);
      }
    }
    const h = Ce(n.class, "slotLayout");
    if (h) {
      if (L.debug && console.debug("找到插槽布局!", h), h.inputs)
        for (const c of h.inputs) {
          const { name: g, type: d, options: _ } = c;
          r.addInput(g, d, _);
        }
      if (h.outputs)
        for (const c of h.outputs) {
          const { name: g, type: d, options: _ } = c;
          r.addOutput(g, d, _);
        }
    }
    return r.onNodeCreated && r.onNodeCreated(), r;
  }
  /**
   * Returns a registered node type with a given name
   * @param type full name of the node class. p.e. "math/sin"
   */
  static getNodeType(t) {
    return L.registered_node_types[t];
  }
  /**
   * Returns a list of node types matching one category
   * @method getNodeTypesInCategory
   * @param {String} category category name
   * @param {String} filter only nodes with ctor.filter equal can be shown
   * @return {Array} array with all the node classes
   */
  static getNodeTypesInCategory(t, e) {
    var i = [];
    for (var n in L.registered_node_types) {
      var s = L.registered_node_types[n];
      s.filter == e && (t == "" ? s.category == null && i.push(s) : s.category == t && i.push(s));
    }
    return L.auto_sort_node_types && i.sort(function(r, o) {
      return r.title.localeCompare(o.title);
    }), i;
  }
  /**
   * Returns a list with all the node type categories
   * @method getNodeTypesCategories
   * @param {String} filter only nodes with ctor.filter equal can be shown
   * @return {Array} array with all the names of the categories
   */
  static getNodeTypesCategories(t) {
    var e = { "": 1 };
    for (var i in L.registered_node_types) {
      var n = L.registered_node_types[i];
      if (n.category && !n.hide_in_node_lists) {
        if (n.filter != t)
          continue;
        e[n.category] = 1;
      }
    }
    var s = [];
    for (var i in e)
      s.push(i);
    return L.auto_sort_node_types ? s.sort() : s;
  }
  /** debug purposes: reloads all the js scripts that matches a wildcard */
  static reloadNodes(t) {
    for (var e = document.getElementsByTagName("script"), i = [], n = 0; n < e.length; n++)
      i.push(e[n]);
    var s = document.getElementsByTagName("head")[0];
    t = document.location.href + t;
    for (var n = 0; n < i.length; n++) {
      var r = i[n].src;
      if (!(!r || r.substr(0, t.length) != t))
        try {
          L.debug && console.log("Reloading: " + r);
          var o = document.createElement("script");
          o.type = "text/javascript", o.src = r, s.appendChild(o), s.removeChild(i[n]);
        } catch (l) {
          if (L.throw_errors)
            throw l;
          L.debug && console.log("Error while reloading " + r);
        }
    }
    L.debug && console.log("Nodes reloaded");
  }
  // TODO move
  //separated just to improve if it doesn't work
  static cloneObject(t, e) {
    if (t == null)
      return null;
    var i = JSON.parse(JSON.stringify(t));
    if (!e)
      return i;
    for (var n in i)
      e[n] = i[n];
    return e;
  }
  /**
   * Returns if the types of two slots are compatible (taking into account wildcards, etc)
   * @method isValidConnection
   * @param {String} type_a
   * @param {String} type_b
   * @return {Boolean} true if they can be connected
   */
  static isValidConnection(t, e) {
    if ((t == "" || t === "*") && (t = I.DEFAULT), (e == "" || e === "*") && (e = I.DEFAULT), !t || !e || t == e || t == I.EVENT && e == I.ACTION || t == I.ACTION && e == I.EVENT)
      return !0;
    if (t = String(t), e = String(e), t = t.toLowerCase(), e = e.toLowerCase(), t.indexOf(",") == -1 && e.indexOf(",") == -1)
      return t == e;
    for (var i = t.split(","), n = e.split(","), s = 0; s < i.length; ++s)
      for (var r = 0; r < n.length; ++r)
        if (this.isValidConnection(i[s], n[r]))
          return !0;
    return !1;
  }
  static getTime() {
    return Date.now();
  }
  // static LLink: typeof LLink;
  // static LGraph: typeof LGraph;
  // static DragAndScale: typeof DragAndScale;
  static compareObjects(t, e) {
    for (var i in t)
      if (t[i] != e[i])
        return !1;
    return !0;
  }
  static distance(t, e) {
    return Math.sqrt(
      (e[0] - t[0]) * (e[0] - t[0]) + (e[1] - t[1]) * (e[1] - t[1])
    );
  }
  static colorToString(t) {
    return "rgba(" + Math.round(t[0] * 255).toFixed() + "," + Math.round(t[1] * 255).toFixed() + "," + Math.round(t[2] * 255).toFixed() + "," + (t.length == 4 ? t[3].toFixed(2) : "1.0") + ")";
  }
  static isInsideRectangle(t, e, i, n, s, r) {
    return i < t && i + s > t && n < e && n + r > e;
  }
  // [minx,miny,maxx,maxy]
  static growBounding(t, e, i) {
    return e < t[0] ? t[0] = e : e > t[2] && (t[2] = e), i < t[1] ? t[1] = i : i > t[3] && (t[3] = i), t;
  }
  static isInsideBounding(t, e) {
    return !(t[0] < e[0][0] || t[1] < e[0][1] || t[0] > e[1][0] || t[1] > e[1][1]);
  }
  // bounding overlap, format: [ startx, starty, width, height ]
  static overlapBounding(t, e) {
    var i = t[0] + t[2], n = t[1] + t[3], s = e[0] + e[2], r = e[1] + e[3];
    return !(t[0] > s || t[1] > r || i < e[0] || n < e[1]);
  }
  // Convert a hex value to its decimal value - the inputted hex must be in the
  // format of a hex triplet - the kind we use for HTML colours. The function
  // will return an array with three values.
  static hex2num(t) {
    t.charAt(0) == "#" && (t = t.slice(1)), t = t.toUpperCase();
    var e = "0123456789ABCDEF";
    let i;
    for (var n = 0, s, r, o = 0; o < 6; o += 2)
      s = e.indexOf(t.charAt(o)), r = e.indexOf(t.charAt(o + 1)), i[n] = s * 16 + r, n++;
    return i;
  }
  //Give a array with three values as the argument and the function will return
  //	the corresponding hex triplet.
  static num2hex(t) {
    for (var e = "0123456789ABCDEF", i = "#", n, s, r = 0; r < 3; r++)
      n = t[r] / 16, s = t[r] % 16, i += e.charAt(n) + e.charAt(s);
    return i;
  }
  // ContextMenu: typeof ContextMenu;
  // static extendClass<A, B>(target: A, origin: B): A & B;
  // static getParameterNames(func: string | Function): string[];
  /* helper for interaction: pointer, touch, mouse Listeners
     used by LGraphCanvas DragAndScale ContextMenu*/
  static pointerListenerAdd(t, e, i, n = !1) {
    if (!(!t || !t.addEventListener || !e || typeof i != "function")) {
      var s = L.pointerevents_method, r = e;
      if (s == "pointer" && !window.PointerEvent)
        switch (console.warn("sMethod=='pointer' && !window.PointerEvent"), console.log("Converting pointer[" + r + "] : down move up cancel enter TO touchstart touchmove touchend, etc .."), r) {
          case "down": {
            s = "touch", r = "start";
            break;
          }
          case "move": {
            s = "touch";
            break;
          }
          case "up": {
            s = "touch", r = "end";
            break;
          }
          case "cancel": {
            s = "touch";
            break;
          }
          case "enter": {
            console.log("debug: Should I send a move event?");
            break;
          }
          default:
            console.warn("PointerEvent not available in this browser ? The event " + r + " would not be called");
        }
      switch (r) {
        case "down":
        case "up":
        case "move":
        case "over":
        case "out":
        case "enter":
          t.addEventListener(s + r, i, n);
        case "leave":
        case "cancel":
        case "gotpointercapture":
        case "lostpointercapture":
          if (s != "mouse")
            return t.addEventListener(s + r, i, n);
        default:
          return t.addEventListener(r, i, n);
      }
    }
  }
  static pointerListenerRemove(t, e, i, n = !1) {
    if (!(!t || !t.removeEventListener || !e || typeof i != "function"))
      switch (e) {
        case "down":
        case "up":
        case "move":
        case "over":
        case "out":
        case "enter":
          (L.pointerevents_method == "pointer" || L.pointerevents_method == "mouse") && t.removeEventListener(L.pointerevents_method + e, i, n);
        case "leave":
        case "cancel":
        case "gotpointercapture":
        case "lostpointercapture":
          if (L.pointerevents_method == "pointer")
            return t.removeEventListener(L.pointerevents_method + e, i, n);
        default:
          return t.removeEventListener(e, i, n);
      }
  }
};
let u = L;
u.VERSION = 10;
u.CANVAS_GRID_SIZE = 10;
u.NODE_TITLE_HEIGHT = 26;
u.NODE_TITLE_TEXT_Y = 18;
u.NODE_SLOT_HEIGHT = 20;
u.NODE_WIDGET_HEIGHT = 20;
u.NODE_WIDTH = 140;
u.NODE_MIN_WIDTH = 50;
u.NODE_COLLAPSED_RADIUS = 10;
u.NODE_COLLAPSED_WIDTH = 80;
u.NODE_TITLE_COLOR = "#C1C1C1";
u.NODE_SELECTED_TITLE_COLOR = "#FFF";
u.NODE_TEXT_SIZE = 14;
u.NODE_TEXT_COLOR = "#AAA";
u.NODE_SUBTEXT_SIZE = 12;
u.NODE_DEFAULT_COLOR = "#134442";
u.NODE_DEFAULT_BGCOLOR = "#171717";
u.NODE_DEFAULT_BOXCOLOR = "#666";
u.NODE_DEFAULT_SHAPE = "box";
u.NODE_BOX_OUTLINE_COLOR = "#FFF";
u.DEFAULT_SHADOW_COLOR = "rgba(0,0,0,0.5)";
u.DEFAULT_GROUP_FONT_SIZE = 24;
u.WIDGET_BGCOLOR = "#222";
u.WIDGET_OUTLINE_COLOR = "#666";
u.WIDGET_TEXT_COLOR = "#DDD";
u.WIDGET_SECONDARY_TEXT_COLOR = "#999";
u.LINK_COLOR = "#9A9";
u.EVENT_LINK_COLOR = "#A86";
u.ACTION_LINK_COLOR = "#86A";
u.CONNECTING_LINK_COLOR = "#AFA";
u.MAX_NUMBER_OF_NODES = 1e3;
u.DEFAULT_POSITION = [100, 100];
u.proxy = null;
u.node_images_path = "";
u.debug = !1;
u.catch_exceptions = !0;
u.throw_errors = !0;
u.allow_scripts = !0;
u.registered_node_types = {};
u.node_types_by_file_extension = {};
u.Nodes = {};
u.Globals = {};
u.searchbox_extras = {};
u.auto_sort_node_types = !1;
u.node_box_coloured_when_on = !1;
u.node_box_coloured_by_mode = !1;
u.dialog_close_on_mouse_leave = !0;
u.dialog_close_on_mouse_leave_delay = 500;
u.shift_click_do_break_link_from = !1;
u.click_do_break_link_to = !1;
u.search_hide_on_mouse_leave = !0;
u.search_filter_enabled = !1;
u.search_show_all_on_open = !0;
u.auto_load_slot_types = !1;
u.registered_slot_in_types = {};
u.registered_slot_out_types = {};
u.slot_types_in = [];
u.slot_types_out = [];
u.slot_types_default_in = {};
u.slot_types_default_out = {};
u.alt_drag_do_clone_nodes = !1;
u.do_add_triggers_slots = !1;
u.allow_multi_output_for_events = !0;
u.middle_click_slot_add_default_node = !1;
u.release_link_on_empty_shows_menu = !1;
u.ignore_all_widget_events = !1;
u.pointerevents_method = "mouse";
u.use_uuids = !1;
u.search_box_refresh_interval_ms = 250;
u.graph_inputs_outputs_use_combo_widget = !1;
u.serialize_slot_data = !1;
class Be {
  constructor(e, i = !1) {
    this.offset = [0, 0], this.scale = 1, this.max_scale = 10, this.min_scale = 0.1, this.onredraw = null, this.enabled = !0, this.last_mouse = [0, 0], this.element = null, this.visible_area = new Float32Array([0, 0, 0, 0]), this.viewport = null, this.dragging = !1, this._binded_mouse_callback = null, e && (this.element = e, i || this.bindEvents(e));
  }
  bindEvents(e) {
    this.last_mouse = [0, 0], this._binded_mouse_callback = this.onMouse.bind(this), u.pointerListenerAdd(e, "down", this._binded_mouse_callback), u.pointerListenerAdd(e, "move", this._binded_mouse_callback), u.pointerListenerAdd(e, "up", this._binded_mouse_callback), e.addEventListener(
      "mousewheel",
      this._binded_mouse_callback,
      !1
    ), e.addEventListener("wheel", this._binded_mouse_callback, !1);
  }
  computeVisibleArea(e) {
    if (!this.element) {
      this.visible_area[0] = this.visible_area[1] = this.visible_area[2] = this.visible_area[3] = 0;
      return;
    }
    var i = this.element.width, n = this.element.height, s = -this.offset[0], r = -this.offset[1];
    e && (s += e[0] / this.scale, r += e[1] / this.scale, i = e[2], n = e[3]);
    var o = s + i / this.scale, a = r + n / this.scale;
    this.visible_area[0] = s, this.visible_area[1] = r, this.visible_area[2] = o - s, this.visible_area[3] = a - r;
  }
  onMouse(e) {
    if (!this.enabled)
      return;
    var i = this.element, n = i.getBoundingClientRect();
    let s = e;
    var r = s.clientX - n.left, o = s.clientY - n.top;
    s.canvasX = r, s.canvasX = o, s.dragging = this.dragging;
    var a = !this.viewport || this.viewport && r >= this.viewport[0] && r < this.viewport[0] + this.viewport[2] && o >= this.viewport[1] && o < this.viewport[1] + this.viewport[3];
    if (s.type == u.pointerevents_method + "down" && a)
      this.dragging = !0, u.pointerListenerRemove(i, "move", this._binded_mouse_callback), u.pointerListenerAdd(document, "move", this._binded_mouse_callback), u.pointerListenerAdd(document, "up", this._binded_mouse_callback);
    else if (s.type == u.pointerevents_method + "move") {
      var l = r - this.last_mouse[0], h = o - this.last_mouse[1];
      this.dragging && this.mouseDrag(l, h);
    } else
      s.type == u.pointerevents_method + "up" ? (this.dragging = !1, u.pointerListenerRemove(document, "move", this._binded_mouse_callback), u.pointerListenerRemove(document, "up", this._binded_mouse_callback), u.pointerListenerAdd(i, "move", this._binded_mouse_callback)) : a && (s.type == "mousewheel" || s.type == "wheel" || s.type == "DOMMouseScroll") && (s.eventType = "mousewheel", s.type == "wheel" ? s.wheel = -s.deltaY : s.wheel = s.wheelDeltaY != null ? s.wheelDeltaY : s.detail * -60, s.delta = s.wheelDelta ? s.wheelDelta / 40 : s.deltaY ? -s.deltaY / 3 : 0, this.changeDeltaScale(1 + s.delta * 0.05, [s.clientX, s.clientY]));
    if (this.last_mouse[0] = r, this.last_mouse[1] = o, a)
      return s.preventDefault(), s.stopPropagation(), !1;
  }
  toCanvasContext(e) {
    e.scale(this.scale, this.scale), e.translate(this.offset[0], this.offset[1]);
  }
  convertOffsetToCanvas(e) {
    return [
      (e[0] + this.offset[0]) * this.scale,
      (e[1] + this.offset[1]) * this.scale
    ];
  }
  convertCanvasToOffset(e, i = [0, 0]) {
    return i[0] = e[0] / this.scale - this.offset[0], i[1] = e[1] / this.scale - this.offset[1], i;
  }
  mouseDrag(e, i) {
    this.offset[0] += e / this.scale, this.offset[1] += i / this.scale, this.onredraw && this.onredraw(this);
  }
  changeScale(e, i) {
    if (e < this.min_scale ? e = this.min_scale : e > this.max_scale && (e = this.max_scale), e != this.scale && this.element) {
      var n = this.element.getBoundingClientRect();
      if (n) {
        i = i || [
          n.width * 0.5,
          n.height * 0.5
        ], i[0] -= n.left, i[1] -= n.top;
        var s = this.convertCanvasToOffset(i);
        this.scale = e, Math.abs(this.scale - 1) < 0.01 && (this.scale = 1);
        var r = this.convertCanvasToOffset(i), o = [
          r[0] - s[0],
          r[1] - s[1]
        ];
        this.offset[0] += o[0], this.offset[1] += o[1], this.onredraw && this.onredraw(this);
      }
    }
  }
  changeDeltaScale(e, i) {
    this.changeScale(this.scale * e, i);
  }
  reset() {
    this.scale = 1, this.offset[0] = 0, this.offset[1] = 0;
  }
}
class ge {
  processMouseDown(e) {
    if (this.set_canvas_dirty_on_mouse_event && (this.dirty_canvas = !0), !this.graph)
      return;
    let i = e;
    this.adjustMouseEvent(i);
    var n = this.getCanvasWindow();
    n.document, N.active_canvas = this;
    var s = i.clientX, r = i.clientY;
    this.ds.viewport = this.viewport;
    var o = !this.viewport || this.viewport && s >= this.viewport[0] && s < this.viewport[0] + this.viewport[2] && r >= this.viewport[1] && r < this.viewport[1] + this.viewport[3];
    if (this.skip_events || (u.pointerListenerRemove(this.canvas, "move", this._mousemove_callback), u.pointerListenerAdd(n.document, "move", this._mousemove_callback, !0), u.pointerListenerAdd(n.document, "up", this._mouseup_callback, !0)), !!o) {
      var a = this.graph.getNodeOnPos(i.canvasX, i.canvasY, this.visible_nodes, 5), l = !1, h = u.getTime(), c = !(i instanceof PointerEvent) || !i.isPrimary, g = h - this.last_mouseclick < 300 && c;
      if (this.mouse[0] = i.clientX, this.mouse[1] = i.clientY, this.offset_mouse[0] = i.offsetX, this.offset_mouse[1] = i.offsetY, this.graph_mouse[0] = i.canvasX, this.graph_mouse[1] = i.canvasY, this.last_click_position = [this.mouse[0], this.mouse[1]], this.last_click_position_offset = [this.offset_mouse[0], this.offset_mouse[1]], this.pointer_is_down && c ? this.pointer_is_double = !0 : this.pointer_is_double = !1, this.pointer_is_down = !0, this.canvas.focus(), x.closeAllContextMenus(n), this.search_box && this.search_box.close(), !(this.onMouse && this.onMouse(i) === !0)) {
        if (i.which == 1 && !this.pointer_is_double) {
          if (i.ctrlKey && this.allow_interaction && !this.read_only && (this.dragging_rectangle = new Float32Array(4), this.dragging_rectangle[0] = i.canvasX, this.dragging_rectangle[1] = i.canvasY, this.dragging_rectangle[2] = 1, this.dragging_rectangle[3] = 1, l = !0), u.alt_drag_do_clone_nodes && i.altKey && a && this.allow_interaction && !l && !this.read_only) {
            let R = a.clone();
            R && (R.pos[0] += 5, R.pos[1] += 5, this.graph.add(R, { doCalcSize: !1 }), a = R, l = !0, E || (this.allow_dragnodes && (this.graph.beforeChange(), this.node_dragged = a), this.selected_nodes[a.id] || this.processNodeSelected(a, i)));
          }
          var d = !1;
          if (a && this.allow_interaction && !l && !this.read_only) {
            if (!this.live_mode && !a.flags.pinned && this.bringToFront(a), !this.connecting_node && !a.flags.collapsed && !this.live_mode)
              if (!l && a.resizable !== !1 && u.isInsideRectangle(
                i.canvasX,
                i.canvasY,
                a.pos[0] + a.size[0] - 5,
                a.pos[1] + a.size[1] - 5,
                10,
                10
              ))
                this.graph.beforeChange(), this.resizing_node = a, this.canvas.style.cursor = "se-resize", l = !0;
              else {
                if (a.outputs)
                  for (var _ = 0, f = a.outputs.length; _ < f; ++_) {
                    var p = a.outputs[_], v = a.getConnectionPos(!1, _);
                    if (u.isInsideRectangle(
                      i.canvasX,
                      i.canvasY,
                      v[0] - 15,
                      v[1] - 10,
                      30,
                      20
                    )) {
                      this.connecting_node = a, this.connecting_output = p, this.connecting_output.slot_index = _, this.connecting_pos = a.getConnectionPos(!1, _), this.connecting_slot = _, u.shift_click_do_break_link_from && i.shiftKey && a.disconnectOutput(_), g ? a.onOutputDblClick && a.onOutputDblClick(_, i) : a.onOutputClick && a.onOutputClick(_, i), l = !0;
                      break;
                    }
                  }
                if (a.inputs)
                  for (var _ = 0, f = a.inputs.length; _ < f; ++_) {
                    var y = a.inputs[_], v = a.getConnectionPos(!0, _);
                    if (u.isInsideRectangle(
                      i.canvasX,
                      i.canvasY,
                      v[0] - 15,
                      v[1] - 10,
                      30,
                      20
                    )) {
                      if (g ? a.onInputDblClick && a.onInputDblClick(_, i) : a.onInputClick && a.onInputClick(_, i), y.link !== null) {
                        var m = this.graph.links[y.link];
                        u.click_do_break_link_to && (a.disconnectInput(_), this.dirty_bgcanvas = !0, l = !0), (this.allow_reconnect_links || //this.move_destination_link_without_shift ||
                        i.shiftKey) && (u.click_do_break_link_to || a.disconnectInput(_), this.connecting_node = this.graph._nodes_by_id[m.origin_id], this.connecting_slot = m.origin_slot, this.connecting_output = this.connecting_node.outputs[this.connecting_slot], this.connecting_pos = this.connecting_node.getConnectionPos(!1, this.connecting_slot), this.dirty_bgcanvas = !0, l = !0);
                      }
                      l || (this.connecting_node = a, this.connecting_input = y, this.connecting_input.slot_index = _, this.connecting_pos = a.getConnectionPos(!0, _), this.connecting_slot = _, this.dirty_bgcanvas = !0, l = !0);
                    }
                  }
              }
            if (!l) {
              var E = !1, T = [i.canvasX - a.pos[0], i.canvasY - a.pos[1]], b = this.processNodeWidgets(a, this.graph_mouse, i);
              b && (E = !0, this.node_widget = [a, b]), g && this.selected_nodes[a.id] && (a.onDblClick && a.onDblClick(i, T, this), this.processNodeDblClicked(a), E = !0), a.onMouseDown && a.onMouseDown(i, T, this) ? E = !0 : (a.subgraph && !a.skip_subgraph_button && !a.flags.collapsed && T[0] > a.size[0] - u.NODE_TITLE_HEIGHT && T[1] < 0 && setTimeout(() => {
                this.openSubgraph(a.subgraph);
              }, 10), this.live_mode && (d = !0, E = !0)), E || (this.allow_dragnodes && (this.graph.beforeChange(), this.node_dragged = a), this.selected_nodes[a.id] || this.processNodeSelected(a, i)), this.dirty_canvas = !0;
            }
          } else if (!l) {
            let R = !1;
            if (a && a.subgraph && !a.skip_subgraph_button) {
              var T = [i.canvasX - a.pos[0], i.canvasY - a.pos[1]];
              !a.flags.collapsed && T[0] > a.size[0] - u.NODE_TITLE_HEIGHT && T[1] < 0 && (R = !0, setTimeout(() => {
                this.openSubgraph(a.subgraph);
              }, 10));
            }
            if (!R) {
              if (this.allow_interaction && !this.read_only) {
                const F = this.findLinkCenterAtPos(i.canvasX, i.canvasY);
                F != null && (this.showLinkMenu(F, i), this.over_link_center = null);
              }
              if (this.selected_group = this.graph.getGroupOnPos(i.canvasX, i.canvasY), this.selected_group_resizing = !1, this.selected_group && !this.read_only && this.allow_interaction) {
                i.ctrlKey && (this.dragging_rectangle = null);
                var O = u.distance([i.canvasX, i.canvasY], [this.selected_group.pos[0] + this.selected_group.size[0], this.selected_group.pos[1] + this.selected_group.size[1]]);
                O * this.ds.scale < 10 ? this.selected_group_resizing = !0 : this.selected_group.recomputeInsideNodes();
              }
              g && !this.read_only && this.allow_searchbox && this.allow_interaction && (this.showSearchBox(i), i.preventDefault(), i.stopPropagation()), d = !0;
            }
          }
          !l && d && this.allow_dragcanvas && (this.dragging_canvas = !0);
        } else if (i.which == 2) {
          if (u.middle_click_slot_add_default_node && a && this.allow_interaction && !l && !this.read_only && !this.connecting_node && !a.flags.collapsed && !this.live_mode) {
            var C = null, M = null, A = null;
            if (a.outputs)
              for (var _ = 0, f = a.outputs.length; _ < f; ++_) {
                var p = a.outputs[_], v = a.getConnectionPos(!1, _);
                if (u.isInsideRectangle(i.canvasX, i.canvasY, v[0] - 15, v[1] - 10, 30, 20)) {
                  C = p, M = _, A = !0;
                  break;
                }
              }
            if (a.inputs)
              for (var _ = 0, f = a.inputs.length; _ < f; ++_) {
                var y = a.inputs[_], v = a.getConnectionPos(!0, _);
                if (u.isInsideRectangle(i.canvasX, i.canvasY, v[0] - 15, v[1] - 10, 30, 20)) {
                  C = y, M = _, A = !1;
                  break;
                }
              }
            if (C && M !== !1) {
              var S = 0.5 - (M + 1) / (A ? a.outputs.length : a.inputs.length), G = a.getBounding(), W = [
                A ? G[0] + G[2] : G[0],
                i.canvasY - 80
                // + node_bounding[0]/this.canvas.width*66 // vertical "derive"
              ];
              this.createDefaultNodeForSlot("AUTO", {
                nodeFrom: A ? a : null,
                slotFrom: A ? M : null,
                nodeTo: A ? null : a,
                slotTo: A ? null : M,
                position: W,
                posAdd: [A ? 30 : -30, -S * 130],
                posSizeFix: [A ? 0 : -1, 0]
                //-alphaPosY*2*/
              });
            }
          }
        } else if ((i.which == 3 || this.pointer_is_double) && this.allow_interaction && !l && !this.read_only) {
          let R = null;
          if (a)
            R = { type: "node", item: a }, Object.keys(this.selected_nodes).length && (this.selected_nodes[a.id] || i.shiftKey || i.ctrlKey || i.metaKey) ? this.selected_nodes[a.id] || this.selectNodes([a], !0) : this.selectNodes([a]);
          else {
            const F = this.findLinkCenterAtPos(i.canvasX, i.canvasY);
            F != null && (this.over_link_center = null, this.dirty_canvas = !0, R = { type: "link", item: F });
          }
          this.processContextMenu(R, i);
        }
        if (this.selected_group_moving = !1, this.selected_group && !this.selected_group_resizing) {
          var Z = this.selected_group.fontSize || u.DEFAULT_GROUP_FONT_SIZE, w = Z * 1.4;
          u.isInsideRectangle(i.canvasX, i.canvasY, this.selected_group.pos[0], this.selected_group.pos[1], this.selected_group.size[0], w) && (this.selected_group_moving = !0);
        }
        return this.last_mouse[0] = i.clientX, this.last_mouse[1] = i.clientY, this.last_mouseclick = u.getTime(), this.last_mouse_dragging = !0, this.graph.change(), (!n.document.activeElement || n.document.activeElement.nodeName.toLowerCase() != "input" && n.document.activeElement.nodeName.toLowerCase() != "textarea") && i.preventDefault(), i.stopPropagation(), this.onMouseDown && this.onMouseDown(i), !1;
      }
    }
  }
  processMouseMove(e) {
    var m, E;
    let i = e;
    if (this.autoresize && this.resize(), this.set_canvas_dirty_on_mouse_event && (this.dirty_canvas = !0), !this.graph)
      return;
    N.active_canvas = this, this.adjustMouseEvent(i);
    let n = [i.clientX, i.clientY];
    this.mouse[0] = n[0], this.mouse[1] = n[1];
    let s = [
      n[0] - this.last_mouse[0],
      n[1] - this.last_mouse[1]
    ];
    if (this.last_mouse = n, this.offset_mouse[0] = i.offsetX, this.offset_mouse[1] = i.offsetY, this.graph_mouse[0] = i.canvasX, this.graph_mouse[1] = i.canvasY, this.block_click)
      return i.preventDefault(), !1;
    i.dragging = this.last_mouse_dragging, this.node_widget && (this.processNodeWidgets(
      this.node_widget[0],
      this.graph_mouse,
      i,
      this.node_widget[1]
    ), this.dirty_canvas = !0);
    const r = this.selected_group;
    if (this.selected_group && !this.selected_group_resizing && !this.selected_group_moving && (this.selected_group = null), this.dragging_rectangle)
      this.dragging_rectangle[2] = i.canvasX - this.dragging_rectangle[0], this.dragging_rectangle[3] = i.canvasY - this.dragging_rectangle[1], this.dirty_canvas = !0;
    else if (this.selected_group && !this.read_only && this.allow_interaction) {
      if (this.selected_group_resizing)
        this.selected_group.size = [
          i.canvasX - this.selected_group.pos[0],
          i.canvasY - this.selected_group.pos[1]
        ];
      else {
        var o = s[0] / this.ds.scale, a = s[1] / this.ds.scale;
        this.selected_group.move(o, a, i.ctrlKey), this.selected_group._nodes.length && (this.dirty_canvas = !0);
      }
      this.dirty_bgcanvas = !0;
    } else if (this.dragging_canvas)
      this.ds.offset[0] += s[0] / this.ds.scale, this.ds.offset[1] += s[1] / this.ds.scale, this.dirty_canvas = !0, this.dirty_bgcanvas = !0;
    else {
      const T = this.allow_interaction && !this.read_only;
      this.connecting_node && (this.dirty_canvas = !0);
      var l = this.graph.getNodeOnPos(i.canvasX, i.canvasY, this.visible_nodes);
      if (T)
        for (var h = 0, c = this.graph._nodes.length; h < c; ++h) {
          let b = this.graph._nodes[h];
          if (b.mouseOver && l != b) {
            b.mouseOver = !1, this.node_over && this.node_over.onMouseLeave && this.node_over.onMouseLeave(i, [i.canvasX - this.node_over.pos[0], i.canvasY - this.node_over.pos[1]], this);
            const O = this.node_over;
            this.node_over = null, this.dirty_canvas = !0, O != this.node_over && ((m = this.onHoverChange) == null || m.call(this, this.node_over, O));
          }
        }
      if (l) {
        if (l.redraw_on_mouse && (this.dirty_canvas = !0), T) {
          if (!l.mouseOver) {
            l.mouseOver = !0;
            const b = this.node_over;
            this.node_over = l, this.dirty_canvas = !0, b != this.node_over && ((E = this.onHoverChange) == null || E.call(this, this.node_over, b)), l.onMouseEnter && l.onMouseEnter(i, [i.canvasX - l.pos[0], i.canvasY - l.pos[1]], this);
          }
          if (l.onMouseMove && l.onMouseMove(i, [i.canvasX - l.pos[0], i.canvasY - l.pos[1]], this), this.connecting_node) {
            if (this.connecting_output) {
              var g = this._highlight_input || [0, 0];
              if (!this.isOverNodeBox(l, i.canvasX, i.canvasY)) {
                var d = this.isOverNodeInput(l, i.canvasX, i.canvasY, g);
                if (d != -1 && l.inputs[d]) {
                  var _ = l.inputs[d].type;
                  u.isValidConnection(this.connecting_output.type, _) && (this._highlight_input = g, this._highlight_input_slot = l.inputs[d]);
                } else
                  this._highlight_input = null, this._highlight_input_slot = null;
              }
            } else if (this.connecting_input) {
              var g = this._highlight_output || [0, 0];
              if (!this.isOverNodeBox(l, i.canvasX, i.canvasY)) {
                var d = this.isOverNodeOutput(l, i.canvasX, i.canvasY, g);
                if (d != -1 && l.outputs[d]) {
                  var _ = l.outputs[d].type;
                  u.isValidConnection(this.connecting_input.type, _) && (this._highlight_output = g);
                } else
                  this._highlight_output = null;
              }
            }
          }
          this.canvas && (u.isInsideRectangle(
            i.canvasX,
            i.canvasY,
            l.pos[0] + l.size[0] - 5,
            l.pos[1] + l.size[1] - 5,
            5,
            5
          ) ? this.canvas.style.cursor = "se-resize" : this.canvas.style.cursor = "crosshair");
        }
      } else {
        var f = this.findLinkCenterAtPos(i.canvasX, i.canvasY);
        f != this.over_link_center && (this.over_link_center = f, this.dirty_canvas = !0), this.canvas && (this.canvas.style.cursor = "");
      }
      if (T) {
        if (this.node_capturing_input && this.node_capturing_input != l && this.node_capturing_input.onMouseMove && this.node_capturing_input.onMouseMove(i, [i.canvasX - this.node_capturing_input.pos[0], i.canvasY - this.node_capturing_input.pos[1]], this), this.node_dragged && !this.live_mode) {
          for (const b in this.selected_nodes) {
            var p = this.selected_nodes[b];
            p.pos[0] += s[0] / this.ds.scale, p.pos[1] += s[1] / this.ds.scale;
          }
          this.dirty_canvas = !0, this.dirty_bgcanvas = !0;
        }
        if (this.resizing_node && !this.live_mode) {
          var v = [i.canvasX - this.resizing_node.pos[0], i.canvasY - this.resizing_node.pos[1]], y = this.resizing_node.computeSize();
          v[0] = Math.max(y[0], v[0]), v[1] = Math.max(y[1], v[1]), this.resizing_node.setSize(v), this.canvas.style.cursor = "se-resize", this.dirty_canvas = !0, this.dirty_bgcanvas = !0;
        }
      }
    }
    return r && !this.selected_group_resizing && !this.selected_group_moving && (this.selected_group = r), i.preventDefault(), !1;
  }
  processMouseUp(e) {
    let i = e;
    var n = !(i instanceof PointerEvent) || !i.isPrimary;
    if (!n)
      return !1;
    if (this.set_canvas_dirty_on_mouse_event && (this.dirty_canvas = !0), !!this.graph) {
      var s = this.getCanvasWindow(), r = s.document;
      N.active_canvas = this, this.skip_events || (u.pointerListenerRemove(r, "move", this._mousemove_callback, !0), u.pointerListenerAdd(this.canvas, "move", this._mousemove_callback, !0), u.pointerListenerRemove(r, "up", this._mouseup_callback, !0)), this.adjustMouseEvent(i);
      var o = u.getTime();
      if (i.click_time = o - this.last_mouseclick, this.last_mouse_dragging = !1, this.last_click_position = null, this.block_click && (this.block_click = !1), i.which == 1) {
        if (this.node_widget && this.processNodeWidgets(this.node_widget[0], this.graph_mouse, i), this.node_widget = null, this.selected_group) {
          var a = this.selected_group.pos[0] - Math.round(this.selected_group.pos[0]), l = this.selected_group.pos[1] - Math.round(this.selected_group.pos[1]);
          this.selected_group.move(a, l, i.ctrlKey), this.selected_group.pos[0] = Math.round(
            this.selected_group.pos[0]
          ), this.selected_group.pos[1] = Math.round(
            this.selected_group.pos[1]
          ), this.selected_group._nodes.length && (this.dirty_canvas = !0), this.selected_group = null;
        }
        this.selected_group_resizing = !1;
        var h = this.graph.getNodeOnPos(
          i.canvasX,
          i.canvasY,
          this.visible_nodes
        );
        if (this.dragging_rectangle) {
          if (this.graph) {
            var c = this.graph._nodes, g = new Float32Array(4), d = Math.abs(this.dragging_rectangle[2]), _ = Math.abs(this.dragging_rectangle[3]), f = this.dragging_rectangle[2] < 0 ? this.dragging_rectangle[0] - d : this.dragging_rectangle[0], p = this.dragging_rectangle[3] < 0 ? this.dragging_rectangle[1] - _ : this.dragging_rectangle[1];
            if (this.dragging_rectangle[0] = f, this.dragging_rectangle[1] = p, this.dragging_rectangle[2] = d, this.dragging_rectangle[3] = _, !h || d > 10 && _ > 10) {
              for (var v = [], y = 0; y < c.length; ++y) {
                var m = c[y];
                m.getBounding(g), u.overlapBounding(
                  this.dragging_rectangle,
                  g
                ) && v.push(m);
              }
              v.length && this.selectNodes(v, i.shiftKey);
            } else
              this.selectNodes([h], i.shiftKey || i.ctrlKey);
          }
          this.dragging_rectangle = null;
        } else if (this.connecting_node) {
          this.dirty_canvas = !0, this.dirty_bgcanvas = !0;
          var E = this.connecting_output || this.connecting_input, T = E.type;
          if (h) {
            if (this.connecting_output) {
              var b = this.isOverNodeInput(
                h,
                i.canvasX,
                i.canvasY
              );
              b != -1 ? this.connecting_node.connect(this.connecting_slot, h, b) : this.connecting_node.connectByTypeInput(this.connecting_slot, h, T);
            } else if (this.connecting_input) {
              var b = this.isOverNodeOutput(
                h,
                i.canvasX,
                i.canvasY
              );
              b != -1 ? h.connect(b, this.connecting_node, this.connecting_slot) : this.connecting_node.connectByTypeOutput(this.connecting_slot, h, T);
            }
          } else
            u.release_link_on_empty_shows_menu && (i.shiftKey && this.allow_searchbox ? this.connecting_output ? this.showSearchBox(i, { node_from: this.connecting_node, slotFrom: this.connecting_output, type_filter_in: this.connecting_output.type }) : this.connecting_input && this.showSearchBox(i, { node_to: this.connecting_node, slotFrom: this.connecting_input, type_filter_out: this.connecting_input.type }) : this.connecting_output ? this.showConnectionMenu({ nodeFrom: this.connecting_node, slotFrom: this.connecting_output, e: i }) : this.connecting_input && this.showConnectionMenu({ nodeTo: this.connecting_node, slotTo: this.connecting_input, e: i }));
          this.connecting_output = null, this.connecting_input = null, this.connecting_pos = null, this.connecting_node = null, this.connecting_slot = -1;
        } else if (this.resizing_node)
          this.dirty_canvas = !0, this.dirty_bgcanvas = !0, this.graph.afterChange(this.resizing_node), this.resizing_node = null;
        else if (this.node_dragged) {
          var h = this.node_dragged;
          h && i.click_time < 300 && h.isShowingTitle(!0) && u.isInsideRectangle(
            i.canvasX,
            i.canvasY,
            h.pos[0],
            h.pos[1] - u.NODE_TITLE_HEIGHT,
            u.NODE_TITLE_HEIGHT,
            u.NODE_TITLE_HEIGHT
          ) && h.collapse(), this.dirty_canvas = !0, this.dirty_bgcanvas = !0, this.node_dragged.pos[0] = Math.round(this.node_dragged.pos[0]), this.node_dragged.pos[1] = Math.round(this.node_dragged.pos[1]), (this.graph.config.align_to_grid || this.align_to_grid) && this.node_dragged.alignToGrid(), this.onNodeMoved && this.onNodeMoved(this.node_dragged), this.graph.afterChange(this.node_dragged), this.node_dragged = null;
        } else {
          var h = this.graph.getNodeOnPos(
            i.canvasX,
            i.canvasY,
            this.visible_nodes
          );
          !h && i.click_time < 300 && this.deselectAllNodes(), this.dirty_canvas = !0, this.dragging_canvas = !1, this.node_over && this.node_over.onMouseUp && this.node_over.onMouseUp(i, [i.canvasX - this.node_over.pos[0], i.canvasY - this.node_over.pos[1]], this), this.node_capturing_input && this.node_capturing_input.onMouseUp && this.node_capturing_input.onMouseUp(i, [
            i.canvasX - this.node_capturing_input.pos[0],
            i.canvasY - this.node_capturing_input.pos[1]
          ], this);
        }
      } else
        i.which == 2 ? (this.dirty_canvas = !0, this.dragging_canvas = !1) : i.which == 3 && (this.dirty_canvas = !0, this.dragging_canvas = !1);
      return n && (this.pointer_is_down = !1, this.pointer_is_double = !1), this.graph.change(), i.stopPropagation(), i.preventDefault(), !1;
    }
  }
  processMouseWheel(e) {
    let i = e;
    if (!(!this.graph || !this.allow_dragcanvas)) {
      var n = i.wheelDeltaY != null ? i.wheelDeltaY : i.detail * -60;
      this.adjustMouseEvent(i);
      var s = i.clientX, r = i.clientY, o = !this.viewport || this.viewport && s >= this.viewport[0] && s < this.viewport[0] + this.viewport[2] && r >= this.viewport[1] && r < this.viewport[1] + this.viewport[3];
      if (o) {
        var a = this.ds.scale;
        return n > 0 ? a *= 1.1 : n < 0 && (a *= 1 / 1.1), this.ds.changeScale(a, [i.clientX, i.clientY]), this.graph.change(), i.preventDefault(), !1;
      }
    }
  }
}
const se = class {
  /** changes the zoom level of the graph (default is 1), you can pass also a place used to pivot the zoom */
  setZoom(t, e) {
    this.ds.changeScale(t, e), this.maxZoom && this.ds.scale > this.maxZoom ? this.scale = this.maxZoom : this.minZoom && this.ds.scale < this.minZoom && (this.scale = this.minZoom);
  }
  /** brings a node to front (above all other nodes) */
  bringToFront(t) {
    var e = this.graph._nodes.indexOf(t);
    e != -1 && (this.graph._nodes.splice(e, 1), this.graph._nodes.push(t));
  }
  /** sends a node to the back (below all other nodes) */
  sendToBack(t) {
    var e = this.graph._nodes.indexOf(t);
    e != -1 && (this.graph._nodes.splice(e, 1), this.graph._nodes.unshift(t));
  }
  /** checks which nodes are visible (inside the camera area) */
  computeVisibleNodes(t, e = []) {
    var i = e;
    i.length = 0, t = t || this.graph._nodes;
    for (var n = 0, s = t.length; n < s; ++n) {
      var r = t[n];
      this.live_mode && !r.onDrawBackground && !r.onDrawForeground || u.overlapBounding(this.visible_area, r.getBounding(se.temp)) && i.push(r);
    }
    return i;
  }
  /** renders the whole canvas content, by rendering in two separated canvas, one containing the background grid and the connections, and one containing the nodes) */
  draw(t = !1, e = !1) {
    if (!(!this.canvas || this.canvas.width == 0 || this.canvas.height == 0)) {
      var i = u.getTime();
      this.render_time = (i - this.last_draw_time) * 1e-3, this.last_draw_time = i, this.graph && this.ds.computeVisibleArea(this.viewport), (this.dirty_bgcanvas || e || this.always_render_background || this.graph && this.graph._last_trigger_time && i - this.graph._last_trigger_time < 1e3) && this.drawBackCanvas(), (this.dirty_canvas || t) && this.drawFrontCanvas(), this.fps = this.render_time ? 1 / this.render_time : 0, this.frame += 1;
    }
  }
  /** draws the front canvas (the one containing all the nodes) */
  drawFrontCanvas() {
    this.dirty_canvas = !1, this.ctx || (this.ctx = this.canvas.getContext("2d"));
    var t = this.ctx;
    if (t) {
      var e = this.canvas, i = this.viewport || this.dirty_area;
      if (i && (t.save(), t.beginPath(), t.rect(i[0], i[1], i[2], i[3]), t.clip()), this.clear_background && (i ? t.clearRect(i[0], i[1], i[2], i[3]) : t.clearRect(0, 0, e.width, e.height)), this.bgcanvas == this.canvas ? this.drawBackCanvas() : t.drawImage(this.bgcanvas, 0, 0), this.onRender && this.onRender(e, t), this.show_info && this.renderInfo(t, i ? i[0] : 0, i ? i[1] : 0), this.graph) {
        t.save(), this.ds.toCanvasContext(t);
        for (var n = this.computeVisibleNodes(
          null,
          this.visible_nodes
        ), s = 0; s < n.length; ++s) {
          var r = n[s];
          t.save(), t.translate(r.pos[0], r.pos[1]), this.drawNode(r, t), t.restore();
        }
        if (this.render_execution_order && this.drawExecutionOrder(t), this.graph.config.links_ontop && (this.live_mode || this.drawConnections(t)), this.connecting_pos != null) {
          t.lineWidth = this.connections_width;
          var o = null, a = this.connecting_output || this.connecting_input, l = a.type, h = a.dir;
          h == null && (this.connecting_output ? h = this.connecting_node.horizontal ? P.DOWN : P.RIGHT : h = this.connecting_node.horizontal ? P.UP : P.LEFT);
          var c = a.shape;
          switch (l) {
            case I.EVENT:
              o = u.EVENT_LINK_COLOR;
              break;
            default:
              o = u.CONNECTING_LINK_COLOR;
          }
          if (this.renderLink(
            t,
            this.connecting_pos,
            [this.graph_mouse[0], this.graph_mouse[1]],
            null,
            !1,
            null,
            o,
            h,
            P.CENTER
          ), t.beginPath(), c === D.BOX_SHAPE ? (t.rect(
            this.connecting_pos[0] - 6 + 0.5,
            this.connecting_pos[1] - 5 + 0.5,
            14,
            10
          ), t.fill(), t.beginPath(), t.rect(
            this.graph_mouse[0] - 6 + 0.5,
            this.graph_mouse[1] - 5 + 0.5,
            14,
            10
          )) : c === D.ARROW_SHAPE ? (t.moveTo(this.connecting_pos[0] + 8, this.connecting_pos[1] + 0.5), t.lineTo(this.connecting_pos[0] - 4, this.connecting_pos[1] + 6 + 0.5), t.lineTo(this.connecting_pos[0] - 4, this.connecting_pos[1] - 6 + 0.5), t.closePath()) : (t.arc(
            this.connecting_pos[0],
            this.connecting_pos[1],
            4,
            0,
            Math.PI * 2
          ), t.fill(), t.beginPath(), t.arc(
            this.graph_mouse[0],
            this.graph_mouse[1],
            4,
            0,
            Math.PI * 2
          )), t.fill(), t.fillStyle = "#ffcc00", this._highlight_input) {
            t.beginPath();
            var g = this._highlight_input_slot.shape;
            g === D.ARROW_SHAPE ? (t.moveTo(this._highlight_input[0] + 8, this._highlight_input[1] + 0.5), t.lineTo(this._highlight_input[0] - 4, this._highlight_input[1] + 6 + 0.5), t.lineTo(this._highlight_input[0] - 4, this._highlight_input[1] - 6 + 0.5), t.closePath()) : t.arc(
              this._highlight_input[0],
              this._highlight_input[1],
              6,
              0,
              Math.PI * 2
            ), t.fill();
          }
          this._highlight_output && (t.beginPath(), g === D.ARROW_SHAPE ? (t.moveTo(this._highlight_output[0] + 8, this._highlight_output[1] + 0.5), t.lineTo(this._highlight_output[0] - 4, this._highlight_output[1] + 6 + 0.5), t.lineTo(this._highlight_output[0] - 4, this._highlight_output[1] - 6 + 0.5), t.closePath()) : t.arc(
            this._highlight_output[0],
            this._highlight_output[1],
            6,
            0,
            Math.PI * 2
          ), t.fill());
        }
        this.dragging_rectangle && (t.strokeStyle = "#FFF", t.strokeRect(
          this.dragging_rectangle[0],
          this.dragging_rectangle[1],
          this.dragging_rectangle[2],
          this.dragging_rectangle[3]
        )), this.over_link_center && this.render_link_tooltip ? this.drawLinkTooltip(t, this.over_link_center) : this.onDrawLinkTooltip && this.onDrawLinkTooltip(t, null, this), this.onDrawForeground && this.onDrawForeground(t, this.visible_area), t.restore();
      }
      this._graph_stack && this._graph_stack.length && this.render_subgraph_panels && this.drawSubgraphPanel(t), this.onDrawOverlay && this.onDrawOverlay(t), i && t.restore();
    }
  }
  /**
   * 在显示子图属性的角落绘制面板
   * @method drawSubgraphPanel
   **/
  drawSubgraphPanel(t) {
    var e = this.graph, i = e._subgraph_node;
    if (!i) {
      console.warn("subgraph without subnode");
      return;
    }
    this.drawSubgraphPanelLeft(e, i, t), this.drawSubgraphPanelRight(e, i, t);
  }
  drawSubgraphPanelLeft(t, e, i) {
    var n = e.inputs ? e.inputs.length : 0, s = 200, r = Math.floor(u.NODE_SLOT_HEIGHT * 1.6);
    if (i.fillStyle = "#111", i.globalAlpha = 0.8, i.beginPath(), i.roundRect(10, 10, s, (n + 1) * r + 50, [8]), i.fill(), i.globalAlpha = 1, i.fillStyle = "#888", i.font = "14px Arial", i.textAlign = "left", i.fillText("Graph Inputs", 20, 34), this.drawButton(s - 20, 20, 20, 20, "X", "#151515", void 0, void 0, !0)) {
      this.closeSubgraph();
      return;
    }
    var o = 50;
    if (i.font = "14px Arial", e.inputs)
      for (var a = 0; a < e.inputs.length; ++a) {
        var l = e.inputs[a];
        l.not_subgraph_input || (i.fillStyle = "#9C9", i.beginPath(), i.arc(s - 16, o, 5, 0, 2 * Math.PI), i.fill(), i.fillStyle = "#AAA", i.fillText(l.name, 30, o + r * 0.75), i.fillStyle = "#777", i.fillText($(l.type), 130, o + r * 0.75), o += r);
      }
    this.drawButton(20, o + 2, s - 20, r - 2, "+", "#151515", "#222") && this.showSubgraphPropertiesDialog(e);
  }
  drawSubgraphPanelRight(t, e, i) {
    var n = e.outputs ? e.outputs.length : 0, s = this.bgcanvas.width, r = 200, o = Math.floor(u.NODE_SLOT_HEIGHT * 1.6);
    i.fillStyle = "#111", i.globalAlpha = 0.8, i.beginPath(), i.roundRect(s - r - 10, 10, r, (n + 1) * o + 50, [8]), i.fill(), i.globalAlpha = 1, i.fillStyle = "#888", i.font = "14px Arial", i.textAlign = "left";
    var a = "Graph Outputs", l = i.measureText(a).width;
    if (i.fillText(a, s - l - 20, 34), this.drawButton(s - r, 20, 20, 20, "X", "#151515", void 0, void 0, !0)) {
      this.closeSubgraph();
      return;
    }
    var h = 50;
    if (i.font = "14px Arial", e.outputs)
      for (var c = 0; c < e.outputs.length; ++c) {
        var g = e.outputs[c];
        g.not_subgraph_output || (i.fillStyle = "#9C9", i.beginPath(), i.arc(s - r + 16, h, 5, 0, 2 * Math.PI), i.fill(), i.fillStyle = "#AAA", i.fillText(g.name, s - r + 30, h + o * 0.75), i.fillStyle = "#777", i.fillText($(g.type), s - r + 130, h + o * 0.75), h += o);
      }
    this.drawButton(s - r, h + 2, r - 20, o - 2, "+", "#151515", "#222") && this.showSubgraphPropertiesDialogRight(e);
  }
  //Draws a button into the canvas overlay and computes if it was clicked using the immediate gui paradigm
  drawButton(t, e, i, n, s, r = u.NODE_DEFAULT_COLOR, o = "#555", a = u.NODE_TEXT_COLOR, l = !1) {
    const h = !this.block_click && (l || this.allow_interaction && !this.read_only);
    var c = this.ctx, g = this.offset_mouse, d = h && u.isInsideRectangle(g[0], g[1], t, e, i, n);
    g = this.last_click_position_offset;
    var _ = h && g && this.pointer_is_down && u.isInsideRectangle(g[0], g[1], t, e, i, n);
    c.fillStyle = d ? o : r, _ && (c.fillStyle = "#AAA"), c.beginPath(), c.roundRect(t, e, i, n, [4]), c.fill(), s != null && s.constructor == String && (c.fillStyle = a, c.textAlign = "center", c.font = (n * 0.65 | 0) + "px Arial", c.fillText(s, t + i * 0.5, e + n * 0.75), c.textAlign = "left");
    var f = _ && h;
    return _ && this.blockClick(), f;
  }
  /** draws every group area in the background */
  drawGroups(t, e) {
    if (this.graph) {
      var i = this.graph._groups;
      e.save(), e.globalAlpha = 0.5 * this.editor_alpha;
      for (var n = 0; n < i.length; ++n) {
        var s = i[n];
        if (u.overlapBounding(this.visible_area, s._bounding)) {
          e.fillStyle = s.color || "#335", e.strokeStyle = s.color || "#335";
          var r = s._pos, o = s._size;
          e.globalAlpha = 0.25 * this.editor_alpha, e.beginPath(), e.rect(r[0] + 0.5, r[1] + 0.5, o[0], o[1]), e.fill(), e.globalAlpha = this.editor_alpha, e.stroke(), e.beginPath(), e.moveTo(r[0] + o[0], r[1] + o[1]), e.lineTo(r[0] + o[0] - 10, r[1] + o[1]), e.lineTo(r[0] + o[0], r[1] + o[1] - 10), e.fill();
          var a = s.font_size || u.DEFAULT_GROUP_FONT_SIZE;
          e.font = a + "px Arial", e.textAlign = "left", e.fillText(s.title, r[0] + 4, r[1] + a);
        }
      }
      e.restore();
    }
  }
  /** draws some useful stats in the corner of the canvas */
  renderInfo(t, e = 10, i) {
    i = i || this.canvas.height - 80, t.save(), t.translate(e, i), t.font = "10px Arial", t.fillStyle = "#888", t.textAlign = "left", this.graph ? (t.fillText("T: " + this.graph.globaltime.toFixed(2) + "s", 5, 13 * 1), t.fillText("I: " + this.graph.iteration, 5, 13 * 2), t.fillText("N: " + this.graph._nodes.length + " [" + this.visible_nodes.length + "]", 5, 13 * 3), t.fillText("V: " + this.graph._version, 5, 13 * 4), t.fillText("FPS:" + this.fps.toFixed(2), 5, 13 * 5)) : t.fillText("No graph selected", 5, 13 * 1), t.restore();
  }
  /** draws the back canvas (the one containing the background and the connections) */
  drawBackCanvas() {
    var t = this.bgcanvas;
    (t.width != this.canvas.width || t.height != this.canvas.height) && (t.width = this.canvas.width, t.height = this.canvas.height), this.bgctx || (this.bgctx = this.bgcanvas.getContext("2d"));
    var e = this.bgctx;
    let i = this.viewport || [0, 0, e.canvas.width, e.canvas.height];
    if (this.clear_background && e.clearRect(i[0], i[1], i[2], i[3]), this._graph_stack && this._graph_stack.length && this.render_subgraph_stack_header) {
      e.save();
      const o = this._graph_stack[this._graph_stack.length - 1].graph, a = this.graph._subgraph_node;
      e.strokeStyle = a.bgcolor, e.lineWidth = 10, e.strokeRect(1, 1, t.width - 2, t.height - 2), e.lineWidth = 1, e.font = "40px Arial", e.textAlign = "center", e.fillStyle = a.bgcolor || "#AAA";
      let l = "";
      for (let h = 1; h < this._graph_stack.length; ++h)
        l += o._subgraph_node.getTitle() + " >> ";
      e.fillText(
        l + a.getTitle(),
        t.width * 0.5,
        40
      ), e.restore();
    }
    let n = !1;
    if (this.onRenderBackground && this.onRenderBackground(t, e) && (n = !0), this.viewport || (e.restore(), e.setTransform(1, 0, 0, 1, 0, 0)), this.visible_links.length = 0, this.graph) {
      if (e.save(), this.ds.toCanvasContext(e), this.background_image && this.ds.scale > 0.5 && !n) {
        this.zoom_modify_alpha ? e.globalAlpha = (1 - 0.5 / this.ds.scale) * this.editor_alpha : e.globalAlpha = this.editor_alpha, e.imageSmoothingEnabled = e.imageSmoothingEnabled = !1, (!this._bg_img || this._bg_img.name != this.background_image) && (this._bg_img = new Image(), this._bg_img.name = this.background_image, this._bg_img.src = this.background_image, this._bg_img.onload = () => {
          this.draw(!0, !0);
        });
        var s = null;
        this._pattern == null && this._bg_img.width > 0 ? (s = e.createPattern(this._bg_img, "repeat"), this._pattern_img = this._bg_img, this._pattern = s) : s = this._pattern, s && (e.fillStyle = s, e.fillRect(
          this.visible_area[0],
          this.visible_area[1],
          this.visible_area[2],
          this.visible_area[3]
        ), e.fillStyle = "transparent"), e.globalAlpha = 1, e.imageSmoothingEnabled = e.imageSmoothingEnabled = !0;
      }
      this.graph._groups.length && !this.live_mode && this.drawGroups(t, e), this.onDrawBackground && this.onDrawBackground(e, this.visible_area), u.debug && (e.fillStyle = "red", e.fillRect(this.visible_area[0] + 10, this.visible_area[1] + 10, this.visible_area[2] - 20, this.visible_area[3] - 20)), this.render_canvas_border && (e.strokeStyle = "#235", e.strokeRect(0, 0, t.width, t.height)), this.render_connections_shadows ? (e.shadowColor = "#000", e.shadowOffsetX = 0, e.shadowOffsetY = 0, e.shadowBlur = 6) : e.shadowColor = "rgba(0,0,0,0)", !this.live_mode && this.render_connections && this.drawConnections(e), e.shadowColor = "rgba(0,0,0,0)", e.restore();
    }
    this.dirty_bgcanvas = !1, this.dirty_canvas = !0;
  }
  /** 在画布内绘制给定节点*/
  drawNode(t, e) {
    this.current_node = t;
    var i = t.color || t.constructor.color || u.NODE_DEFAULT_COLOR, n = t.bgcolor || t.constructor.bgcolor || u.NODE_DEFAULT_BGCOLOR;
    t.mouseOver;
    var s = this.ds.scale < 0.6;
    if (this.live_mode) {
      t.flags.collapsed || (e.shadowColor = "transparent", t.onDrawForeground && t.onDrawForeground(e, this, this.canvas));
      return;
    }
    var r = this.editor_alpha;
    if (e.globalAlpha = r, this.render_shadows && !s ? (e.shadowColor = u.DEFAULT_SHADOW_COLOR, e.shadowOffsetX = 2 * this.ds.scale, e.shadowOffsetY = 2 * this.ds.scale, e.shadowBlur = 3 * this.ds.scale) : e.shadowColor = "transparent", !(t.flags.collapsed && t.onDrawCollapsed && t.onDrawCollapsed(e, this) == !0)) {
      var o = t.shape || D.BOX_SHAPE, a = se.temp_vec2;
      se.temp_vec2.set(t.size);
      var l = t.horizontal;
      if (t.flags.collapsed) {
        e.font = this.inner_text_font;
        var h = t.getTitle ? t.getTitle() : t.title;
        h != null && (t._collapsed_width = Math.min(
          t.size[0],
          e.measureText(h).width + u.NODE_TITLE_HEIGHT * 2
        ), a[0] = t._collapsed_width, a[1] = 0);
      }
      t.clip_area && (e.save(), e.beginPath(), o == D.BOX_SHAPE ? e.rect(0, 0, a[0], a[1]) : o == D.ROUND_SHAPE ? e.roundRect(0, 0, a[0], a[1], [10]) : o == D.CIRCLE_SHAPE && e.arc(
        a[0] * 0.5,
        a[1] * 0.5,
        a[0] * 0.5,
        0,
        Math.PI * 2
      ), e.clip()), t.has_errors && (n = "#FF0000"), this.drawNodeShape(
        t,
        e,
        [a[0], a[1]],
        i,
        n,
        t.is_selected,
        t.mouseOver
      ), e.shadowColor = "transparent", t.onDrawForeground && t.onDrawForeground(e, this, this.canvas), e.textAlign = l ? "center" : "left", e.font = this.inner_text_font;
      var c = !s, g = this.connecting_output, d = this.connecting_input;
      e.lineWidth = 1;
      var _ = 0, f = [0, 0];
      if (t.flags.collapsed) {
        if (this.render_collapsed_slots) {
          var E = null, T = null;
          if (t.inputs)
            for (let C = 0; C < t.inputs.length; C++) {
              let M = t.inputs[C];
              if (M.link != null) {
                E = M;
                break;
              }
            }
          if (t.outputs)
            for (let C = 0; C < t.outputs.length; C++) {
              let M = t.outputs[C];
              !M.links || !M.links.length || (T = M);
            }
          if (E) {
            var b = 0, O = u.NODE_TITLE_HEIGHT * -0.5;
            l && (b = t._collapsed_width * 0.5, O = -u.NODE_TITLE_HEIGHT), e.fillStyle = "#686", e.beginPath(), E.shape === D.BOX_SHAPE ? e.rect(b - 7 + 0.5, O - 4, 14, 8) : E.shape === D.ARROW_SHAPE ? (e.moveTo(b + 8, O), e.lineTo(b + -4, O - 4), e.lineTo(b + -4, O + 4), e.closePath()) : e.arc(b, O, 4, 0, Math.PI * 2), e.fill();
          }
          if (T) {
            var b = t._collapsed_width, O = u.NODE_TITLE_HEIGHT * -0.5;
            l && (b = t._collapsed_width * 0.5, O = 0), e.fillStyle = "#686", e.strokeStyle = "black", e.beginPath(), T.shape === D.BOX_SHAPE ? e.rect(b - 7 + 0.5, O - 4, 14, 8) : T.shape === D.ARROW_SHAPE ? (e.moveTo(b + 6, O), e.lineTo(b - 6, O - 4), e.lineTo(b - 6, O + 4), e.closePath()) : e.arc(b, O, 4, 0, Math.PI * 2), e.fill();
          }
        }
      } else {
        const C = [], M = [];
        t.inputs && t.inputs.forEach((S, G) => {
          S.type !== I.ACTION ? C.push([S, null]) : M.push(S);
        }), t.outputs && (t.outputs.filter((S) => S.type !== I.EVENT).forEach((S, G) => {
          C[G] ? C[G][1] = S : C.push([null, S]);
        }), t.outputs.filter((S) => S.type === I.EVENT).forEach((S, G) => {
        }));
        const A = u.NODE_SLOT_HEIGHT;
        for (let S = 0; S < M.length; S++) {
          var p = t.getConnectionPos(!0, S, [f[0], f[1]]);
          p[0] -= t.pos[0], p[1] -= t.pos[1], e.save(), e.globalAlpha = r, e.fillStyle = "#fff", e.beginPath(), e.moveTo(p[0] + 8, p[1] + 0.5), e.lineTo(p[0] - 4, p[1] + 6 + 0.5), e.lineTo(p[0] - 4, p[1] - 6 + 0.5), e.closePath(), e.fill(), e.restore();
        }
        for (let S = 0; S < C.length; S++) {
          const [G, W] = C[S];
          if (G) {
            e.save();
            const { type: Z, shape: w } = G;
            e.globalAlpha = r, this.connecting_output && !u.isValidConnection(Z, g.type) ? e.globalAlpha = 0.4 * r : e.globalAlpha = r, e.fillStyle = "#282828", e.fillRect(
              0,
              A * S + S + 1,
              A,
              A
            ), W ? e.fillRect(
              A + 1,
              A * S + S + 1,
              t.size[0] / 2 - A,
              A
            ) : e.fillRect(
              A + 1,
              A * S + S + 1,
              t.size[0] - A,
              A
            ), e.fillStyle = G.link != null ? G.color_on || N.DEFAULT_CONNECTION_COLORS_BY_TYPE[Z] || N.DEFAULT_CONNECTION_COLORS.input_on : G.color_off || N.DEFAULT_CONNECTION_COLORS_BY_TYPE_OFF[Z] || N.DEFAULT_CONNECTION_COLORS_BY_TYPE[Z] || N.DEFAULT_CONNECTION_COLORS.input_off;
            var p = t.getConnectionPos(!0, S, [f[0], f[1]]);
            p[0] -= t.pos[0], p[1] -= t.pos[1], _ < p[1] + u.NODE_SLOT_HEIGHT * 0.5 && (_ = p[1] + u.NODE_SLOT_HEIGHT * 0.5), e.beginPath();
            var v = !0;
            if (G.shape === D.BOX_SHAPE ? l ? e.rect(
              p[0] - 5 + 0.5,
              p[1] - 8 + 0.5,
              10,
              14
            ) : e.rect(
              p[0] - 6 + 0.5,
              p[1] - 5 + 0.5,
              14,
              10
            ) : w === D.ARROW_SHAPE ? (e.moveTo(p[0] + 8, p[1] + 0.5), e.lineTo(p[0] - 4, p[1] + 6 + 0.5), e.lineTo(p[0] - 4, p[1] - 6 + 0.5), e.closePath()) : w === D.GRID_SHAPE ? (e.rect(p[0] - 4, p[1] - 4, 2, 2), e.rect(p[0] - 1, p[1] - 4, 2, 2), e.rect(p[0] + 2, p[1] - 4, 2, 2), e.rect(p[0] - 4, p[1] - 1, 2, 2), e.rect(p[0] - 1, p[1] - 1, 2, 2), e.rect(p[0] + 2, p[1] - 1, 2, 2), e.rect(p[0] - 4, p[1] + 2, 2, 2), e.rect(p[0] - 1, p[1] + 2, 2, 2), e.rect(p[0] + 2, p[1] + 2, 2, 2), v = !1) : s ? e.rect(p[0] - 4, p[1] - 4, 8, 8) : e.arc(p[0], p[1], 4, 0, Math.PI * 2), e.fill(), c) {
              var y = G.label != null ? G.label : G.name;
              y && (e.fillStyle = u.NODE_TEXT_COLOR, l || G.dir == P.UP ? e.fillText(y, p[0], p[1] - 10) : e.fillText(y, A + 6, p[1] + 4));
            }
            e.restore();
          }
          if (W) {
            e.save(), e.textAlign = l ? "center" : "right", e.strokeStyle = "black", e.fillStyle = "#282828", e.fillRect(t.size[0] - A + 1, A * S + S + 1, A, A), G ? e.fillRect(
              t.size[0] / 2 + 2,
              A * S + S + 1,
              t.size[0] / 2 - A - 2,
              A
            ) : e.fillRect(
              0,
              A * S + S + 1,
              t.size[0] - A,
              A
            );
            const { type: Z, shape: w } = W;
            this.connecting_input && !u.isValidConnection(d.type, Z) ? e.globalAlpha = 0.4 * r : e.globalAlpha = r;
            var p = t.getConnectionPos(!1, S, f);
            p[0] -= t.pos[0], p[1] -= t.pos[1], _ < p[1] + u.NODE_SLOT_HEIGHT * 0.5 && (_ = p[1] + u.NODE_SLOT_HEIGHT * 0.5), e.fillStyle = W.links && W.links.length ? W.color_on || N.DEFAULT_CONNECTION_COLORS_BY_TYPE[Z] || N.DEFAULT_CONNECTION_COLORS.output_on : W.color_off || N.DEFAULT_CONNECTION_COLORS_BY_TYPE_OFF[Z] || N.DEFAULT_CONNECTION_COLORS_BY_TYPE[Z] || N.DEFAULT_CONNECTION_COLORS.output_off, e.beginPath();
            var v = !0;
            if (w === D.BOX_SHAPE ? l ? e.rect(
              p[0] - 5 + 0.5,
              p[1] - 8 + 0.5,
              10,
              14
            ) : e.rect(
              p[0] - 6 + 0.5,
              p[1] - 5 + 0.5,
              14,
              10
            ) : w === D.ARROW_SHAPE ? (e.moveTo(p[0] + 8, p[1] + 0.5), e.lineTo(p[0] - 4, p[1] + 6 + 0.5), e.lineTo(p[0] - 4, p[1] - 6 + 0.5), e.closePath()) : w === D.GRID_SHAPE ? (e.rect(p[0] - 4, p[1] - 4, 2, 2), e.rect(p[0] - 1, p[1] - 4, 2, 2), e.rect(p[0] + 2, p[1] - 4, 2, 2), e.rect(p[0] - 4, p[1] - 1, 2, 2), e.rect(p[0] - 1, p[1] - 1, 2, 2), e.rect(p[0] + 2, p[1] - 1, 2, 2), e.rect(p[0] - 4, p[1] + 2, 2, 2), e.rect(p[0] - 1, p[1] + 2, 2, 2), e.rect(p[0] + 2, p[1] + 2, 2, 2), v = !1) : s ? e.rect(p[0] - 4, p[1] - 4, 8, 8) : e.arc(p[0], p[1], 4, 0, Math.PI * 2), e.fill(), !s && v && e.stroke(), c) {
              var y = W.label != null ? W.label : W.name;
              y && (e.fillStyle = u.NODE_TEXT_COLOR, l || W.dir == P.DOWN ? e.fillText(y, p[0], p[1] - 8) : e.fillText(y, t.size[0] - A - 6, p[1] + 4));
            }
            e.restore();
          }
        }
        if (e.textAlign = "left", e.globalAlpha = 1, t.widgets) {
          var m = _;
          (l || t.widgets_up) && (m = 2), t.widgets_start_y != null && (m = t.widgets_start_y), this.drawNodeWidgets(
            t,
            m,
            e,
            this.node_widget && this.node_widget[0] == t ? this.node_widget[1] : null
          );
        }
      }
      t.clip_area && e.restore(), e.globalAlpha = 1;
    }
  }
  /** used by this.over_link_center */
  drawLinkTooltip(t, e) {
    var i = e._pos;
    if (this.allow_interaction && !this.read_only && (t.fillStyle = "black", t.beginPath(), t.arc(i[0], i[1], 3, 0, Math.PI * 2), t.fill()), e.data != null && !(this.onDrawLinkTooltip && this.onDrawLinkTooltip(t, e, this) == !0)) {
      var n = e.data, s = null;
      if (n.constructor === Number ? s = n.toFixed(2) : n.constructor === String ? s = '"' + n + '"' : n.constructor === Boolean ? s = String(n) : n.toToolTip ? s = n.toToolTip() : s = "[" + n.constructor.name + "]", s != null) {
        s = s.substr(0, 30), t.font = "14px Courier New";
        var r = t.measureText(s), o = r.width + 20, a = 24;
        t.shadowColor = "black", t.shadowOffsetX = 2, t.shadowOffsetY = 2, t.shadowBlur = 3, t.fillStyle = "#454", t.beginPath(), t.roundRect(i[0] - o * 0.5, i[1] - 15 - a, o, a, [3]), t.moveTo(i[0] - 10, i[1] - 15), t.lineTo(i[0] + 10, i[1] - 15), t.lineTo(i[0], i[1] - 5), t.fill(), t.shadowColor = "transparent", t.textAlign = "center", t.fillStyle = "#CEC", t.fillText(s, i[0], i[1] - 15 - a * 0.3);
      }
    }
  }
  /** 在画布中绘制给定节点的形状 */
  drawNodeShape(t, e, i, n, s, r, o) {
    e.strokeStyle = n, e.fillStyle = s;
    var a = u.NODE_TITLE_HEIGHT, l = this.ds.scale < 0.5, h = t.shape || t.constructor.shape || D.ROUND_SHAPE, c = t.titleMode, g = t.isShowingTitle(o), d = se.tmp_area;
    d[0] = 0, d[1] = g ? -a : 0, d[2] = i[0] + 1, d[3] = g ? i[1] + a : i[1];
    var _ = e.globalAlpha;
    if (e.beginPath(), h == D.BOX_SHAPE || l ? e.fillRect(d[0], d[1], d[2], d[3]) : h == D.ROUND_SHAPE || h == D.CARD_SHAPE ? e.roundRect(
      d[0],
      d[1],
      d[2],
      d[3],
      2
      // shape == BuiltInSlotShape.CARD_SHAPE ? [this.round_radius, this.round_radius, 0, 0] : [this.round_radius]
    ) : h == D.CIRCLE_SHAPE && e.arc(
      i[0] * 0.5,
      i[1] * 0.5,
      i[0] * 0.5,
      0,
      Math.PI * 2
    ), e.fill(), !t.flags.collapsed && g && (e.shadowColor = "transparent", e.fillStyle = "rgba(0,0,0,0.2)", e.fillRect(0, 0, d[2], 1)), e.shadowColor = "transparent", t.onDrawBackground && t.onDrawBackground(e, this, this.canvas, this.graph_mouse), g || c == ne.TRANSPARENT_TITLE) {
      if (t.onDrawTitleBar)
        t.onDrawTitleBar(e, this, a, i, this.ds.scale, n);
      else if (c != ne.TRANSPARENT_TITLE && (t.constructor.title_color || this.render_title_colored)) {
        var f = t.constructor.title_color || n;
        if (t.flags.collapsed && (e.shadowColor = u.DEFAULT_SHADOW_COLOR), this.use_gradients) {
          var p = N.gradients[f];
          p || (p = N.gradients[f] = e.createLinearGradient(0, 0, 400, 0), p.addColorStop(0, f), p.addColorStop(1, "#008E82")), e.fillStyle = p;
        } else
          e.fillStyle = f;
        e.beginPath(), h == D.BOX_SHAPE || l ? e.rect(0, -a, i[0] + 1, a) : (h == D.ROUND_SHAPE || h == D.CARD_SHAPE) && e.roundRect(
          0,
          -a,
          i[0] + 1,
          a,
          [2, 2, 0, 0]
        ), e.fill(), e.shadowColor = "transparent";
      }
      var v = null;
      u.node_box_coloured_by_mode && Oe[t.mode] && (v = Oe[t.mode]), u.node_box_coloured_when_on && (v = t.action_triggered ? "#FFF" : t.execute_triggered ? "#AAA" : v);
      var y = 10;
      if (t.onDrawTitleBox ? t.onDrawTitleBox(e, this, a, i, this.ds.scale) : h == D.ROUND_SHAPE || h == D.CIRCLE_SHAPE || h == D.CARD_SHAPE ? (l && (e.fillStyle = "black", e.beginPath(), e.arc(
        a * 0.5,
        a * -0.5,
        y * 0.5 + 1,
        0,
        Math.PI * 2
      ), e.fill()), e.fillStyle = t.boxcolor || v || u.NODE_DEFAULT_BOXCOLOR, l ? e.fillRect(
        a * 0.5 - y * 0.5,
        a * -0.5 - y * 0.5,
        y,
        y
      ) : (e.beginPath(), e.arc(
        a * 0.5,
        a * -0.5,
        y * 0.5,
        0,
        Math.PI * 2
      ), e.fill())) : (l && (e.fillStyle = "black", e.fillRect(
        (a - y) * 0.5 - 1,
        (a + y) * -0.5 - 1,
        y + 2,
        y + 2
      )), e.fillStyle = t.boxcolor || v || u.NODE_DEFAULT_BOXCOLOR, e.fillRect(
        (a - y) * 0.5,
        (a + y) * -0.5,
        y,
        y
      )), e.globalAlpha = _, t.onDrawTitleText && t.onDrawTitleText(
        e,
        this,
        a,
        i,
        this.ds.scale,
        this.title_text_font,
        r
      ), !l) {
        e.font = this.title_text_font;
        var m = String(t.getTitle());
        m && (r ? e.fillStyle = u.NODE_SELECTED_TITLE_COLOR : e.fillStyle = t.constructor.title_text_color || this.node_title_color, t.flags.collapsed ? (e.textAlign = "left", e.fillText(
          m.substr(0, 20),
          //avoid urls too long
          a,
          // + measure.width * 0.5,
          u.NODE_TITLE_TEXT_Y - a
        ), e.textAlign = "left") : (e.textAlign = "left", e.fillText(
          m,
          a,
          u.NODE_TITLE_TEXT_Y - a
        )));
      }
      if (!t.flags.collapsed && t.subgraph && !t.skip_subgraph_button) {
        var E = u.NODE_TITLE_HEIGHT, T = t.size[0] - E, b = u.isInsideRectangle(this.graph_mouse[0] - t.pos[0], this.graph_mouse[1] - t.pos[1], T + 2, -E + 2, E - 4, E - 4);
        e.fillStyle = b ? "#B3DBE9" : "#204341", h == D.BOX_SHAPE || l ? e.fillRect(T + 2, -E + 2, E - 4, E - 4) : (e.beginPath(), e.roundRect(T + 2, -E + 2, E - 4, E - 4, [4]), e.fill()), e.fillStyle = "#39837C", e.beginPath(), e.moveTo(T + E * 0.2, -E * 0.6), e.lineTo(T + E * 0.8, -E * 0.6), e.lineTo(T + E * 0.5, -E * 0.3), e.fill();
      }
      t.onDrawTitle && t.onDrawTitle(e, this);
    }
    r && (e.save(), t.onBounding && t.onBounding(d), c == ne.TRANSPARENT_TITLE && (d[1] -= a, d[3] += a), e.lineWidth = 1, e.globalAlpha = 0.8, e.beginPath(), h == D.BOX_SHAPE ? e.rect(
      -6 + d[0],
      -6 + d[1],
      12 + d[2],
      12 + d[3]
    ) : h == D.ROUND_SHAPE || h == D.CARD_SHAPE && t.flags.collapsed || h == D.CARD_SHAPE ? e.roundRect(
      -6 + d[0],
      -6 + d[1],
      12 + d[2],
      12 + d[3],
      4
    ) : h == D.CIRCLE_SHAPE && e.arc(
      i[0] * 0.5,
      i[1] * 0.5,
      i[0] * 0.5 + 6,
      0,
      Math.PI * 2
    ), e.strokeStyle = u.NODE_BOX_OUTLINE_COLOR, e.stroke(), e.strokeStyle = n, e.globalAlpha = 1, e.restore()), t.execute_triggered > 0 && t.execute_triggered--, t.action_triggered > 0 && t.action_triggered--;
  }
  /** 绘制画布中可见的每个连接 */
  drawConnections(t) {
    var e = u.getTime(), i = this.visible_area;
    let n = se.margin_area;
    n[0] = i[0] - 20, n[1] = i[1] - 20, n[2] = i[2] + 40, n[3] = i[3] + 40, t.lineWidth = this.connections_width, t.fillStyle = "#AAA", t.strokeStyle = "#AAA", t.globalAlpha = this.editor_alpha;
    for (var s = this.graph._nodes, r = 0, o = s.length; r < o; ++r) {
      var a = s[r];
      if (!(!a.inputs || !a.inputs.length))
        for (var l = 0; l < a.inputs.length; ++l) {
          var h = a.inputs[l];
          if (!h || h.link == null)
            continue;
          var c = h.link, g = this.graph.links[c];
          if (!g)
            continue;
          var d = this.graph.getNodeById(g.origin_id);
          if (d == null)
            continue;
          var _ = g.origin_slot, f = null;
          _ == -1 ? f = [
            d.pos[0] + 10,
            d.pos[1] + 10
          ] : f = d.getConnectionPos(
            !1,
            _,
            se.tempA
          );
          var p = a.getConnectionPos(!0, l, se.tempB);
          let O = se.link_bounding;
          if (O[0] = f[0], O[1] = f[1], O[2] = p[0] - f[0], O[3] = p[1] - f[1], O[2] < 0 && (O[0] += O[2], O[2] = Math.abs(O[2])), O[3] < 0 && (O[1] += O[3], O[3] = Math.abs(O[3])), !!u.overlapBounding(O, n)) {
            var v = d.outputs[_], y = a.inputs[l];
            if (!(!v || !y)) {
              var m = v.dir || (d.horizontal ? P.DOWN : P.RIGHT), E = y.dir || (a.horizontal ? P.UP : P.LEFT);
              if (this.renderLink(
                t,
                f,
                p,
                g,
                !1,
                !1,
                null,
                m,
                E
              ), g && g._last_time && e - g._last_time < 1e3) {
                var T = 2 - (e - g._last_time) * 2e-3, b = t.globalAlpha;
                t.globalAlpha = b * T, this.renderLink(
                  t,
                  f,
                  p,
                  g,
                  !0,
                  !0,
                  "white",
                  m,
                  E
                ), t.globalAlpha = b;
              }
            }
          }
        }
    }
    t.globalAlpha = 1;
  }
  /**
   * draws a link between two points
   * @param a start pos
   * @param b end pos
   * @param link the link object with all the link info
   * @param skipBorder ignore the shadow of the link
   * @param flow show flow animation (for events)
   * @param color the color for the link
   * @param startDir the direction enum
   * @param endDir the direction enum
   * @param numSublines number of sublines (useful to represent vec3 or rgb)
   **/
  renderLink(t, e, i, n, s, r, o, a, l, h) {
    n && this.visible_links.push(n), !o && n && (o = n.color || this.link_type_colors[n.type]), o || (o = this.default_link_color), n != null && this.highlighted_links[n.id] && (o = "#FFF"), a = a || P.RIGHT, l = l || P.LEFT;
    var c = u.distance(e, i);
    this.render_connections_border && this.ds.scale > 0.6 && (t.lineWidth = this.connections_width + 4), t.lineJoin = "round", h = h || 1, h > 1 && (t.lineWidth = 0.5), t.beginPath();
    for (var g = 0; g < h; g += 1) {
      var d = (g - (h - 1) * 0.5) * 5;
      if (this.links_render_mode == de.SPLINE_LINK) {
        t.moveTo(e[0], e[1] + d);
        var _ = 0, f = 0, p = 0, v = 0;
        switch (a) {
          case P.LEFT:
            _ = c * -0.25;
            break;
          case P.RIGHT:
            _ = c * 0.25;
            break;
          case P.UP:
            f = c * -0.25;
            break;
          case P.DOWN:
            f = c * 0.25;
            break;
        }
        switch (l) {
          case P.LEFT:
            p = c * -0.25;
            break;
          case P.RIGHT:
            p = c * 0.25;
            break;
          case P.UP:
            v = c * -0.25;
            break;
          case P.DOWN:
            v = c * 0.25;
            break;
        }
        t.bezierCurveTo(
          e[0] + _,
          e[1] + f + d,
          i[0] + p,
          i[1] + v + d,
          i[0],
          i[1] + d
        );
      } else if (this.links_render_mode == de.LINEAR_LINK) {
        t.moveTo(e[0], e[1] + d);
        var _ = 0, f = 0, p = 0, v = 0;
        switch (a) {
          case P.LEFT:
            _ = -1;
            break;
          case P.RIGHT:
            _ = 1;
            break;
          case P.UP:
            f = -1;
            break;
          case P.DOWN:
            f = 1;
            break;
        }
        switch (l) {
          case P.LEFT:
            p = -1;
            break;
          case P.RIGHT:
            p = 1;
            break;
          case P.UP:
            v = -1;
            break;
          case P.DOWN:
            v = 1;
            break;
        }
        var y = 15;
        t.lineTo(
          e[0] + _ * y,
          e[1] + f * y + d
        ), t.lineTo(
          i[0] + p * y,
          i[1] + v * y + d
        ), t.lineTo(i[0], i[1] + d);
      } else if (this.links_render_mode == de.STRAIGHT_LINK) {
        t.moveTo(e[0], e[1]);
        var m = e[0], E = e[1], T = i[0], b = i[1];
        a == P.RIGHT ? m += 10 : E += 10, l == P.LEFT ? T -= 10 : b -= 10, t.lineTo(m, E), t.lineTo((m + T) * 0.5, E), t.lineTo((m + T) * 0.5, b), t.lineTo(T, b), t.lineTo(i[0], i[1]);
      } else
        return;
    }
    this.render_connections_border && this.ds.scale > 0.6 && !s && (t.strokeStyle = "rgba(0,0,0,0.5)", t.stroke()), t.lineWidth = this.connections_width, t.fillStyle = t.strokeStyle = o, t.stroke();
    var O = this.computeConnectionPoint(e, i, 0.5, a, l);
    if (n && n._pos && (n._pos[0] = O[0], n._pos[1] = O[1]), this.ds.scale >= 0.6 && this.highquality_render && l != P.CENTER) {
      if (this.render_connection_arrows) {
        var C = this.computeConnectionPoint(
          e,
          i,
          0.25,
          a,
          l
        ), M = this.computeConnectionPoint(
          e,
          i,
          0.26,
          a,
          l
        ), A = this.computeConnectionPoint(
          e,
          i,
          0.75,
          a,
          l
        ), S = this.computeConnectionPoint(
          e,
          i,
          0.76,
          a,
          l
        ), G = 0, W = 0;
        this.render_curved_connections ? (G = -Math.atan2(M[0] - C[0], M[1] - C[1]), W = -Math.atan2(S[0] - A[0], S[1] - A[1])) : W = G = i[1] > e[1] ? 0 : Math.PI, t.save(), t.translate(C[0], C[1]), t.rotate(G), t.beginPath(), t.moveTo(-5, -3), t.lineTo(0, 7), t.lineTo(5, -3), t.fill(), t.restore(), t.save(), t.translate(A[0], A[1]), t.rotate(W), t.beginPath(), t.moveTo(-5, -3), t.lineTo(0, 7), t.lineTo(5, -3), t.fill(), t.restore();
      }
      t.beginPath(), t.arc(O[0], O[1], 5, 0, Math.PI * 2), t.fill();
    }
    if (r) {
      t.fillStyle = o;
      for (var g = 0; g < 5; ++g) {
        var Z = (u.getTime() * 1e-3 + g * 0.2) % 1, O = this.computeConnectionPoint(
          e,
          i,
          Z,
          a,
          l
        );
        t.beginPath(), t.arc(O[0], O[1], 5, 0, 2 * Math.PI), t.fill();
      }
    }
  }
  computeConnectionPoint(t, e, i, n = P.RIGHT, s = P.LEFT) {
    var r = u.distance(t, e), o = t, a = [t[0], t[1]], l = [e[0], e[1]], h = e;
    switch (n) {
      case P.LEFT:
        a[0] += r * -0.25;
        break;
      case P.RIGHT:
        a[0] += r * 0.25;
        break;
      case P.UP:
        a[1] += r * -0.25;
        break;
      case P.DOWN:
        a[1] += r * 0.25;
        break;
    }
    switch (s) {
      case P.LEFT:
        l[0] += r * -0.25;
        break;
      case P.RIGHT:
        l[0] += r * 0.25;
        break;
      case P.UP:
        l[1] += r * -0.25;
        break;
      case P.DOWN:
        l[1] += r * 0.25;
        break;
    }
    var c = (1 - i) * (1 - i) * (1 - i), g = 3 * ((1 - i) * (1 - i)) * i, d = 3 * (1 - i) * (i * i), _ = i * i * i, f = c * o[0] + g * a[0] + d * l[0] + _ * h[0], p = c * o[1] + g * a[1] + d * l[1] + _ * h[1];
    return [f, p];
  }
  drawExecutionOrder(t) {
    t.shadowColor = "transparent", t.globalAlpha = 0.25, t.textAlign = "center", t.strokeStyle = "white", t.globalAlpha = 0.75;
    for (var e = this.visible_nodes, i = 0; i < e.length; ++i) {
      var n = e[i];
      t.fillStyle = "black", t.fillRect(
        n.pos[0] - u.NODE_TITLE_HEIGHT,
        n.pos[1] - u.NODE_TITLE_HEIGHT,
        u.NODE_TITLE_HEIGHT,
        u.NODE_TITLE_HEIGHT
      ), n.order == 0 && t.strokeRect(
        n.pos[0] - u.NODE_TITLE_HEIGHT + 0.5,
        n.pos[1] - u.NODE_TITLE_HEIGHT + 0.5,
        u.NODE_TITLE_HEIGHT,
        u.NODE_TITLE_HEIGHT
      ), t.fillStyle = "#FFF", t.fillText(
        "" + n.order,
        n.pos[0] + u.NODE_TITLE_HEIGHT * -0.5,
        n.pos[1] - 6
      );
    }
    t.globalAlpha = 1;
  }
  /** 绘制存储在节点内的小部件 */
  drawNodeWidgets(t, e, i, n) {
    if (!(!t.widgets || !t.widgets.length)) {
      var s = t.size[0], r = t.widgets;
      e += 2;
      var o = u.NODE_WIDGET_HEIGHT, a = this.ds.scale > 0.5;
      i.save(), i.globalAlpha = this.editor_alpha;
      for (var l = u.WIDGET_OUTLINE_COLOR, h = u.WIDGET_BGCOLOR, c = u.WIDGET_TEXT_COLOR, g = u.WIDGET_SECONDARY_TEXT_COLOR, d = 15, _ = 0; _ < r.length; ++_) {
        var f = r[_];
        if (!f.hidden) {
          var p = e;
          f.y && (p = f.y), f.last_y = p, i.strokeStyle = l, i.fillStyle = "#222", i.textAlign = "left", f.disabled && (i.globalAlpha *= 0.5);
          var v = f.width || s;
          switch (f.type) {
            case "button":
              f.clicked && (i.fillStyle = "#AAA", f.clicked = !1, this.dirty_canvas = !0), i.fillRect(d, p, v - d * 2, o), a && !f.disabled && !u.ignore_all_widget_events && i.strokeRect(d, p, v - d * 2, o), a && (i.textAlign = "center", i.fillStyle = c, i.fillText(f.name, v * 0.5, p + o * 0.7));
              break;
            case "toggle":
              i.textAlign = "left", i.strokeStyle = l, i.fillStyle = h, i.beginPath(), a ? i.roundRect(d, p, v - d * 2, o, [o * 0.5]) : i.rect(d, p, v - d * 2, o), i.fill(), a && !f.disabled && !u.ignore_all_widget_events && i.stroke(), i.fillStyle = f.value ? "#89A" : "#333", i.beginPath(), i.arc(v - d * 2, p + o * 0.5, o * 0.36, 0, Math.PI * 2), i.fill(), a && (i.fillStyle = g, f.name != null && i.fillText(f.name, d * 2, p + o * 0.7), i.fillStyle = f.value ? c : g, i.textAlign = "right", i.fillText(
                f.value ? f.options.on || "true" : f.options.off || "false",
                v - 40,
                p + o * 0.7
              ));
              break;
            case "slider":
              i.fillStyle = h, i.fillRect(d, p, v - d * 2, o);
              var y = f.options.max - f.options.min, m = (f.value - f.options.min) / y;
              if (i.fillStyle = n == f ? "#89A" : "#678", i.fillRect(d, p, m * (v - d * 2), o), a && !f.disabled && i.strokeRect(d, p, v - d * 2, o), f.marker) {
                var E = (+f.marker - f.options.min) / y;
                i.fillStyle = "#AA9", i.fillRect(d + E * (v - d * 2), p, 2, o);
              }
              a && (i.textAlign = "center", i.fillStyle = c, i.fillText(
                f.name + "  " + Number(f.value).toFixed(3),
                v * 0.5,
                p + o * 0.7
              ));
              break;
            case "number":
            case "combo":
              if (i.textAlign = "left", i.strokeStyle = l, i.fillStyle = h, i.beginPath(), a ? i.roundRect(d, p, v - d * 2, o, [o * 0.5]) : i.rect(d, p, v - d * 2, o), i.fill(), a)
                if (!f.disabled && !u.ignore_all_widget_events && i.stroke(), i.fillStyle = c, !f.disabled && !u.ignore_all_widget_events && (i.beginPath(), i.moveTo(d + 16, p + 5), i.lineTo(d + 6, p + o * 0.5), i.lineTo(d + 16, p + o - 5), i.fill(), i.beginPath(), i.moveTo(v - d - 16, p + 5), i.lineTo(v - d - 6, p + o * 0.5), i.lineTo(v - d - 16, p + o - 5), i.fill()), i.fillStyle = g, i.fillText(f.name, d * 2 + 5, p + o * 0.7), i.fillStyle = c, i.textAlign = "right", f.type == "number")
                  i.fillText(
                    Number(f.value).toFixed(
                      f.options.precision !== void 0 ? f.options.precision : 3
                    ),
                    v - d * 2 - 20,
                    p + o * 0.7
                  );
                else {
                  var T = f.value;
                  if (f.options.values) {
                    var b = f.options.values;
                    b.constructor === Function && (b = b()), b && b.constructor !== Array && (T = b[f.value]);
                  }
                  i.fillText(
                    T,
                    v - d * 2 - 20,
                    p + o * 0.7
                  );
                }
              break;
            case "string":
            case "text":
              i.textAlign = "left", i.strokeStyle = l, i.fillStyle = h, i.beginPath(), a ? i.roundRect(d, p, v - d * 2, o, [o * 0.5]) : i.rect(d, p, v - d * 2, o), i.fill(), a && (f.disabled || i.stroke(), i.save(), i.beginPath(), i.rect(d, p, v - d * 2, o), i.clip(), i.fillStyle = g, f.name != null && i.fillText(f.name, d * 2, p + o * 0.7), i.fillStyle = c, i.textAlign = "right", i.fillText(String(f.value).substr(0, f.options.max_length || 30), v - d * 2, p + o * 0.7), i.restore());
              break;
            default:
              f.draw && f.draw(i, t, v, p, o);
              break;
          }
          e += (f.computeSize ? f.computeSize(v)[1] : o) + 4, i.globalAlpha = this.editor_alpha;
        }
      }
      i.restore(), i.textAlign = "left";
    }
  }
};
let U = se;
U.temp = new Float32Array(4);
U.temp_vec2 = new Float32Array(2);
U.tmp_area = new Float32Array(4);
U.margin_area = new Float32Array(4);
U.link_bounding = new Float32Array(4);
U.tempA = [0, 0];
U.tempB = [0, 0];
class me {
  constructor(e = "Group") {
    this.fontSize = u.DEFAULT_GROUP_FONT_SIZE, this._nodes = [], this.graph = null, this._bounding = new Float32Array([10, 10, 140, 80]), this.title = e, this.color = N.node_colors.pale_blue ? N.node_colors.pale_blue.groupcolor : "#AAA", this._pos = this._bounding.subarray(0, 2), this._size = this._bounding.subarray(2, 4);
  }
  get bounding() {
    return this._bounding;
  }
  get pos() {
    return [this._pos[0], this._pos[1]];
  }
  set pos(e) {
    !e || e.length < 2 || (this._pos[0] = e[0], this._pos[1] = e[1]);
  }
  get size() {
    return [this._size[0], this._size[1]];
  }
  set size(e) {
    !e || e.length < 2 || (this._size[0] = Math.max(140, e[0]), this._size[1] = Math.max(80, e[1]));
  }
  configure(e) {
    e.bounding, this.title = e.title, this._bounding.set(e.bounding), this.color = e.color, this.font = e.font;
  }
  serialize() {
    const e = this._bounding;
    return {
      title: this.title,
      bounding: [
        Math.round(e[0]),
        Math.round(e[1]),
        Math.round(e[2]),
        Math.round(e[3])
      ],
      color: this.color,
      font: this.font
    };
  }
  move(e, i, n) {
    if (this._pos[0] += e, this._pos[1] += i, !n)
      for (var s = 0; s < this._nodes.length; ++s) {
        var r = this._nodes[s];
        r.pos[0] += e, r.pos[1] += i;
      }
  }
  recomputeInsideNodes() {
    this._nodes.length = 0;
    for (var e = this.graph._nodes, i = new Float32Array(4), n = 0; n < e.length; ++n) {
      var s = e[n];
      s.getBounding(i), u.overlapBounding(this._bounding, i) && this._nodes.push(s);
    }
  }
  /** checks if a point is inside the shape of a node */
  isPointInside(e, i, n = 0, s = !1) {
    var r = this.graph && this.graph.isLive() ? 0 : u.NODE_TITLE_HEIGHT;
    return s && (r = 0), this.pos[0] - 4 - n < e && this.pos[0] + this.size[0] + 4 + n > e && this.pos[1] - r - n < i && this.pos[1] + this.size[1] + n > i;
  }
  /** Forces to redraw or the main canvas (LGraphNode) or the bg canvas (links) */
  setDirtyCanvas(e, i = !1) {
    this.graph && this.graph.sendActionToCanvas("setDirty", [e, i]);
  }
}
class pe {
  constructor(e, i, n, s, r, o) {
    this.data = null, this._pos = [0, 0], this._last_time = 0, this.id = e, this.type = i, this.origin_id = n, this.origin_slot = s, this.target_id = r, this.target_slot = o;
  }
  static configure(e) {
    return e instanceof Array ? new pe(e[0], e[5], e[1], e[2], e[3], e[4]) : new pe(e.id, e.type, e.origin_id, e.origin_slot, e.target_id, e.target_slot);
  }
  serialize() {
    return [
      this.id,
      this.origin_id,
      this.origin_slot,
      this.target_id,
      this.target_slot,
      this.type
    ];
  }
}
let _e;
const He = new Uint8Array(16);
function Fe() {
  if (!_e && (_e = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto), !_e))
    throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
  return _e(He);
}
const K = [];
for (let t = 0; t < 256; ++t)
  K.push((t + 256).toString(16).slice(1));
function Ue(t, e = 0) {
  return (K[t[e + 0]] + K[t[e + 1]] + K[t[e + 2]] + K[t[e + 3]] + "-" + K[t[e + 4]] + K[t[e + 5]] + "-" + K[t[e + 6]] + K[t[e + 7]] + "-" + K[t[e + 8]] + K[t[e + 9]] + "-" + K[t[e + 10]] + K[t[e + 11]] + K[t[e + 12]] + K[t[e + 13]] + K[t[e + 14]] + K[t[e + 15]]).toLowerCase();
}
const ze = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto), ke = {
  randomUUID: ze
};
function ae(t, e, i) {
  if (ke.randomUUID && !e && !t)
    return ke.randomUUID();
  t = t || {};
  const n = t.random || (t.rng || Fe)();
  if (n[6] = n[6] & 15 | 64, n[8] = n[8] & 63 | 128, e) {
    i = i || 0;
    for (let s = 0; s < 16; ++s)
      e[i + s] = n[s];
    return e;
  }
  return Ue(n);
}
const Ne = class {
  constructor(t) {
    this.desc = "", this.pos = [0, 0], this.subgraph = null, this.skip_subgraph_button = !1, this.priority = 0, this.removable = !0, this.clonable = !0, this.collapsable = !0, this.titleMode = ne.NORMAL_TITLE, this.serialize_widgets = !1, this.hide_in_node_lists = !1, this.block_delete = !1, this.ignore_remove = !1, this.last_serialization = null, this._relative_id = null, this.exec_version = 0, this.action_call = null, this.execute_triggered = 0, this.action_triggered = 0, this.console = [], this.title = t || "Unnamed", this.size = [u.NODE_WIDTH, 60], this.graph = null, this.pos = [10, 10], u.use_uuids ? this.id = ae() : this.id = -1, this.type = null, this.inputs = [], this.outputs = [], this.connections = [], this.properties = {}, this.properties_info = [], this.flags = {};
  }
  get slotLayout() {
    return "slotLayout" in this.constructor ? this.constructor.slotLayout : null;
  }
  /** configure a node from an object containing the serialized info */
  configure(t) {
    this.graph && this.graph._version++;
    for (var e in t) {
      if (e == "properties") {
        for (var i in t.properties)
          this.properties[i] = t.properties[i], this.onPropertyChanged && this.onPropertyChanged(i, t.properties[i]);
        continue;
      }
      t[e] != null && (typeof t[e] == "object" ? this[e] && this[e].configure ? this[e].configure(t[e]) : this[e] = u.cloneObject(t[e], this[e]) : this[e] = t[e]);
    }
    t.title || (this.title = be(this, "title") || this.title);
    const n = t.bgColor;
    if (n != null && (this.bgcolor || (this.bgcolor = n)), this.inputs)
      for (let o = 0; o < this.inputs.length; ++o) {
        let a = this.inputs[o], l = this.graph ? this.graph.links[a.link] : null;
        a.properties || (a.properties = {}), this.onConnectionsChange && this.onConnectionsChange(z.INPUT, o, !0, l, a), this.onInputAdded && this.onInputAdded(a);
      }
    if (this.outputs)
      for (var s = 0; s < this.outputs.length; ++s) {
        let o = this.outputs[s];
        if (o.properties || (o.properties = {}), !!o.links) {
          for (let a = 0; a < o.links.length; ++a) {
            let l = this.graph ? this.graph.links[o.links[a]] : null;
            this.onConnectionsChange && this.onConnectionsChange(z.OUTPUT, s, !0, l, o);
          }
          this.onOutputAdded && this.onOutputAdded(o);
        }
      }
    if (this.widgets) {
      for (var s = 0; s < this.widgets.length; ++s) {
        var r = this.widgets[s];
        r && r.options && r.options.property && this.properties[r.options.property] && (r.value = JSON.parse(JSON.stringify(this.properties[r.options.property])));
      }
      if (t.widgets_values)
        for (var s = 0; s < t.widgets_values.length; ++s)
          this.widgets[s] && (this.widgets[s].value = t.widgets_values[s]);
    }
    this.onConfigure && this.onConfigure(t);
  }
  /** serialize the content */
  serialize() {
    let t = {
      id: this.id,
      type: this.type,
      pos: this.pos,
      size: this.size,
      flags: u.cloneObject(this.flags),
      order: this.order,
      mode: this.mode
    };
    if (this.constructor === Ne && this.last_serialization)
      return this.last_serialization;
    if (this.inputs && (t.inputs = this.inputs), this.outputs) {
      for (var e = 0; e < this.outputs.length; e++)
        delete this.outputs[e]._data;
      t.outputs = this.outputs;
    }
    if (this.title && this.title != this.constructor.title && (t.title = this.title), this.properties && (t.properties = u.cloneObject(this.properties)), this.widgets && this.serialize_widgets) {
      t.widgets_values = [];
      for (var e = 0; e < this.widgets.length; ++e)
        this.widgets[e] ? t.widgets_values[e] = this.widgets[e].value : t.widgets_values[e] = null;
    }
    return t.type || (t.type = this.constructor.type), this.color && (t.color = this.color), this.bgcolor && (t.bgcolor = this.bgcolor), this.boxcolor && (t.boxcolor = this.boxcolor), this.shape && (t.shape = this.shape), this.onSerialize && this.onSerialize(t), t;
  }
  /** Creates a clone of this node  */
  clone(t = { forNode: {} }) {
    var e = u.createNode(this.type);
    if (!e)
      return null;
    var i = u.cloneObject(this.serialize());
    if (i.inputs)
      for (var n = 0; n < i.inputs.length; ++n)
        i.inputs[n].link = null;
    if (i.outputs)
      for (var n = 0; n < i.outputs.length; ++n)
        i.outputs[n].links && (i.outputs[n].links.length = 0);
    return delete i.id, u.use_uuids && (i.id = ae()), e.configure(i), e;
  }
  /** serialize and stringify */
  toString() {
    return JSON.stringify(this.serialize());
  }
  /** get the title string */
  getTitle() {
    return this.title || this.constructor.title;
  }
  getRootGraph() {
    var e;
    let t = this.graph;
    for (; t && t._is_subgraph; )
      t = (e = t._subgraph_node) == null ? void 0 : e.graph;
    return t == null || t._is_subgraph ? null : t;
  }
  *iterateParentSubgraphNodes() {
    var e;
    let t = this.graph._subgraph_node;
    for (; t; )
      yield t, t = (e = t.graph) == null ? void 0 : e._subgraph_node;
  }
  /** sets the value of a property */
  setProperty(t, e) {
    if (this.properties || (this.properties = {}), e !== this.properties[t]) {
      var i = this.properties[t];
      if (this.properties[t] = e, this.graph && this.graph._version++, this.onPropertyChanged && this.onPropertyChanged(t, e, i) === !1 && (this.properties[t] = i), this.widgets)
        for (var n = 0; n < this.widgets.length; ++n) {
          var s = this.widgets[n];
          if (s && s.options.property == t) {
            s.value = e;
            break;
          }
        }
    }
  }
  getInputSlotProperty(t, e) {
    if (!(!this.inputs || !this.graph) && !(t == -1 || t >= this.inputs.length)) {
      var i = this.inputs[t];
      if (i)
        return i.properties || (i.properties = {}), i.properties[e];
    }
  }
  getOutputSlotProperty(t, e) {
    if (!(!this.outputs || !this.graph) && !(t == -1 || t >= this.outputs.length)) {
      var i = this.outputs[t];
      if (i)
        return i.properties || (i.properties = {}), i.properties[e];
    }
  }
  setInputSlotProperty(t, e, i) {
    if (!(!this.inputs || !this.graph) && !(t == -1 || t >= this.inputs.length)) {
      var n = this.inputs[t];
      if (n && (n.properties || (n.properties = {}), i !== n.properties[e])) {
        var s = n.properties[e];
        n.properties[e] = i, this.graph && this.graph._version++, this.onSlotPropertyChanged && this.onSlotPropertyChanged(z.INPUT, t, n, e, i, s) === !1 && (n.properties[e] = s);
      }
    }
  }
  setOutputSlotProperty(t, e, i) {
    if (!(!this.outputs || !this.graph) && !(t == -1 || t >= this.outputs.length)) {
      var n = this.outputs[t];
      if (n && (n.properties || (n.properties = {}), i !== n.properties[e])) {
        var s = n.properties[e];
        n.properties[e] = i, this.graph && this.graph._version++, this.onSlotPropertyChanged && this.onSlotPropertyChanged(z.OUTPUT, t, n, e, i, s) === !1 && (n.properties[e] = s);
      }
    }
  }
  /** sets the output data */
  setOutputData(t, e) {
    if (!(!this.outputs || !this.graph) && !(t == -1 || t >= this.outputs.length)) {
      var i = this.outputs[t];
      if (i && (u.serialize_slot_data ? i._data = e : i._data = void 0, this.outputs[t].links))
        for (var n = 0; n < this.outputs[t].links.length; n++) {
          var s = this.outputs[t].links[n], r = this.graph.links[s];
          r && (r.data = e);
        }
    }
  }
  /** sets the output data */
  setOutputDataType(t, e) {
    if (this.outputs && !(t == -1 || t >= this.outputs.length)) {
      var i = this.outputs[t];
      if (i && (i.type = e, this.outputs[t].links))
        for (let n = this.outputs[t].links.length - 1; n >= 0; n--) {
          const s = this.outputs[t].links[n], r = this.graph.links[s];
          if (r) {
            r.type = e;
            const o = this.graph.getNodeById(r.target_id);
            if (o) {
              const a = o.getInputInfo(r.target_slot);
              a && !u.isValidConnection(e, a.type) && o.disconnectInput(r.target_slot);
            }
          }
        }
    }
  }
  *iterateInputInfo() {
    for (let t = 0; t < this.inputs.length; t++)
      yield this.inputs[t];
  }
  /**
   * Retrieves the input data (data traveling through the connection) from one slot
   * @param slot
   * @param force_update if set to true it will force the connected node of this slot to output data into this link
   * @return data or if it is not connected returns undefined
   */
  getInputData(t, e) {
    if (!(!this.inputs || !this.graph) && !(t >= this.inputs.length || this.inputs[t].link == null)) {
      var i = this.inputs[t].link, n = this.graph.links[i];
      if (!n)
        return u.debug && console.error(`Link not found in slot ${t}!`, this, this.inputs[t], i), null;
      if (!e)
        return n.data;
      var s = this.graph.getNodeById(n.origin_id);
      return s && (s.updateOutputData ? s.updateOutputData(n.origin_slot) : s.onExecute && s.onExecute(null, {})), n.data;
    }
  }
  /**
   * Retrieves the input data type (in case this supports multiple input types)
   * @param slot
   * @return datatype in string format
   */
  getInputDataType(t) {
    if (!this.inputs || t >= this.inputs.length || this.inputs[t].link == null)
      return null;
    var e = this.inputs[t].link, i = this.graph.links[e];
    if (!i)
      return u.debug && console.error(`Link not found in slot ${t}!`, this, this.inputs[t], e), null;
    var n = this.graph.getNodeById(i.origin_id);
    if (!n)
      return i.type;
    var s = n.outputs[i.origin_slot];
    return s && s.type != -1 ? s.type : null;
  }
  /**
   * Retrieves the input data from one slot using its name instead of slot number
   * @param slot_name
   * @param force_update if set to true it will force the connected node of this slot to output data into this link
   * @return data or if it is not connected returns null
   */
  getInputDataByName(t, e) {
    var i = this.findInputSlotIndexByName(t);
    return i == -1 ? null : this.getInputData(i, e);
  }
  /** tells you if there is a connection in one input slot */
  isInputConnected(t) {
    return this.inputs ? t < this.inputs.length && this.inputs[t].link != null : !1;
  }
  /** tells you info about an input connection (which node, type, etc) */
  getInputInfo(t) {
    return this.inputs && t < this.inputs.length ? this.inputs[t] : null;
  }
  /**
   * Returns the link info in the connection of an input slot
   * @param {number} slot
   * @return {LLink} object or null
   */
  getInputLink(t) {
    if (!this.inputs || !this.graph)
      return null;
    if (t < this.inputs.length) {
      var e = this.inputs[t];
      return this.graph.links[e.link];
    }
    return null;
  }
  /** returns the node connected in the input slot */
  getInputNode(t) {
    if (!this.inputs || !this.graph)
      return null;
    if (t < this.inputs.length) {
      const i = this.inputs[t].link, n = this.graph.links[i];
      if (!n)
        return u.debug && console.error(`Link not found in slot ${t}!`, this, this.inputs[t], i), null;
      var e = this.graph.getNodeById(n.origin_id);
      if (e)
        return e;
    }
    return null;
  }
  /** returns the value of an input with this name, otherwise checks if there is a property with that name */
  getInputOrProperty(t) {
    if (!this.inputs || !this.inputs.length || !this.graph)
      return this.properties ? this.properties[t] : null;
    for (var e = 0, i = this.inputs.length; e < i; ++e) {
      var n = this.inputs[e];
      if (t == n.name && n.link != null) {
        var s = this.graph.links[n.link];
        if (s)
          return s.data;
      }
    }
    return this.properties[t];
  }
  /** sets the input data type */
  setInputDataType(t, e) {
    if (!(!this.inputs || !this.graph) && !(t == -1 || t >= this.inputs.length)) {
      var i = this.inputs[t];
      if (i && (i.type = e, i.link)) {
        const n = i.link, s = this.graph.links[n];
        s.type = e;
        const r = this.graph.getNodeById(s.origin_id);
        if (r) {
          const o = r.getOutputInfo(s.origin_slot);
          o && !u.isValidConnection(o.type, e) && r.disconnectOutput(s.origin_slot);
        }
      }
    }
  }
  /**
   * Returns the output slot in another node that an input in this node is connected to.
   * @param {number} slot
   * @return {LLink} object or null
   */
  getOutputSlotConnectedTo(t) {
    if (!this.outputs || !this.graph)
      return null;
    if (t >= 0 && t < this.outputs.length) {
      var e = this.inputs[t];
      if (e.link) {
        const i = this.graph.links[e.link];
        return this.graph.getNodeById(i.origin_id).outputs[i.origin_slot];
      }
    }
    return null;
  }
  *iterateOutputInfo() {
    for (let t = 0; t < this.outputs.length; t++)
      yield this.outputs[t];
  }
  /** tells you the last output data that went in that slot */
  getOutputData(t) {
    if (!this.outputs || !this.graph || t >= this.outputs.length)
      return null;
    var e = this.outputs[t];
    return e._data;
  }
  /**
   * Returns the link info in the connection of an output slot
   * @param {number} slot
   * @return {LLink} object or null
   */
  getOutputLinks(t) {
    if (!this.outputs || !this.graph)
      return [];
    if (t >= 0 && t < this.outputs.length) {
      var e = this.outputs[t];
      if (e.links) {
        var i = [];
        for (const n of e.links)
          i.push(this.graph.links[n]);
        return i;
      }
    }
    return [];
  }
  /**
   * Returns the input slots in other nodes that an output in this node is connected to.
   * @param {number} slot
   * @return {LLink} object or null
   */
  getInputSlotsConnectedTo(t) {
    if (!this.outputs || !this.graph)
      return [];
    if (t >= 0 && t < this.outputs.length) {
      var e = this.outputs[t];
      if (e.links) {
        var i = [];
        for (const n of e.links) {
          const s = this.graph.links[n], r = this.graph.getNodeById(s.target_id);
          i.push(r.inputs[s.target_slot]);
        }
        return i;
      }
    }
    return [];
  }
  /** tells you info about an output connection (which node, type, etc) */
  getOutputInfo(t) {
    return this.outputs && t < this.outputs.length ? this.outputs[t] : null;
  }
  /** tells you if there is a connection in one output slot */
  isOutputConnected(t) {
    return !this.outputs || !this.graph ? !1 : t < this.outputs.length && this.outputs[t].links && this.outputs[t].links.length > 0;
  }
  /** tells you if there is any connection in the output slots */
  isAnyOutputConnected() {
    if (!this.outputs || !this.graph)
      return !1;
    for (var t = 0; t < this.outputs.length; ++t)
      if (this.outputs[t].links && this.outputs[t].links.length)
        return !0;
    return !1;
  }
  /** retrieves all the nodes connected to this output slot */
  getOutputNodes(t) {
    if (!this.outputs || this.outputs.length == 0 || !this.graph || t >= this.outputs.length)
      return null;
    var e = this.outputs[t];
    if (!e.links || e.links.length == 0)
      return null;
    for (var i = [], n = 0; n < e.links.length; n++) {
      var s = e.links[n], r = this.graph.links[s];
      if (r) {
        var o = this.graph.getNodeById(r.target_id);
        o && i.push(o);
      }
    }
    return i;
  }
  *iterateAllLinks() {
    if (this.graph) {
      for (const t of this.iterateInputInfo())
        if (t.link) {
          const e = this.graph.links[t.link];
          e && (yield e);
        }
      for (const t of this.iterateOutputInfo())
        if (t.links != null)
          for (const e of t.links) {
            const i = this.graph.links[e];
            i && (yield i);
          }
    }
  }
  addOnTriggerInput() {
    var t = this.findInputSlotIndexByName("onTrigger");
    if (t == -1) {
      //!trigS ||
      return this.addInput("onTrigger", I.EVENT, { optional: !0, nameLocked: !0 }), this.findInputSlotIndexByName("onTrigger");
    }
    return t;
  }
  addOnExecutedOutput() {
    var t = this.findOutputSlotIndexByName("onExecuted");
    if (t == -1) {
      //!trigS ||
      return this.addOutput("onExecuted", I.ACTION, { optional: !0, nameLocked: !0 }), this.findOutputSlotIndexByName("onExecuted");
    }
    return t;
  }
  onAfterExecuteNode(t, e) {
    var i = this.findOutputSlotIndexByName("onExecuted");
    i != -1 && this.triggerSlot(i, t, null, e);
  }
  changeMode(t) {
    switch (t) {
      case J.ON_EVENT:
        break;
      case J.ON_TRIGGER:
        this.addOnTriggerInput(), this.addOnExecutedOutput();
        break;
      case J.NEVER:
        break;
      case J.ALWAYS:
        break;
      case J.ON_REQUEST:
        break;
      default:
        return !1;
    }
    return this.mode = t, !0;
  }
  doExecute(t, e = {}) {
    this.onExecute && (e.action_call || (e.action_call = this.id + "_exec_" + Math.floor(Math.random() * 9999)), this.graph.nodes_executing[this.id] = !0, this.onExecute(t, e), this.graph.nodes_executing[this.id] = !1, this.exec_version = this.graph.iteration, e && e.action_call && (this.action_call = e.action_call, this.graph.nodes_executedAction[this.id] = e.action_call)), this.execute_triggered = 2, this.onAfterExecuteNode && this.onAfterExecuteNode(t, e);
  }
  /**
   * Triggers an action, wrapped by logics to control execution flow
   * @method actionDo
   * @param {String} action name
   * @param {*} param
   */
  actionDo(t, e, i = {}) {
    this.onAction && (i.action_call || (i.action_call = this.id + "_" + (t || "action") + "_" + Math.floor(Math.random() * 9999)), this.graph.nodes_actioning[this.id] = t || "actioning", this.onAction(t, e, i), this.graph.nodes_actioning[this.id] = !1, i && i.action_call && (this.action_call = i.action_call, this.graph.nodes_executedAction[this.id] = i.action_call)), this.action_triggered = 2, this.onAfterExecuteNode && this.onAfterExecuteNode(e, i);
  }
  /**  Triggers an event in this node, this will trigger any output with the same name */
  trigger(t, e, i) {
    if (!(!this.outputs || !this.outputs.length)) {
      this.graph && (this.graph._last_trigger_time = u.getTime());
      for (var n = 0; n < this.outputs.length; ++n) {
        var s = this.outputs[n];
        !s || s.type !== I.EVENT || t && s.name != t || this.triggerSlot(n, e, null, i);
      }
    }
  }
  /**
   * Triggers an slot event in this node
   * @param slot the index of the output slot
   * @param param
   * @param link_id in case you want to trigger and specific output link in a slot
   */
  triggerSlot(t, e, i, n = {}) {
    if (this.outputs) {
      if (t == null) {
        console.error("slot must be a number");
        return;
      }
      typeof t != "number" && console.warn("slot must be a number, use node.trigger('name') if you want to use a string");
      var s = this.outputs[t];
      if (s) {
        var r = s.links;
        if (!(!r || !r.length)) {
          this.graph && (this.graph._last_trigger_time = u.getTime());
          for (var o = 0; o < r.length; ++o) {
            var a = r[o];
            if (!(i != null && i != a)) {
              var l = this.graph.links[r[o]];
              if (l) {
                l._last_time = u.getTime();
                var h = this.graph.getNodeById(l.target_id);
                if (h) {
                  if (h.inputs[l.target_slot], n.link = l, n.originNode = this, h.mode === J.ON_TRIGGER)
                    n.action_call || (n.action_call = this.id + "_trigg_" + Math.floor(Math.random() * 9999)), h.onExecute && h.doExecute(e, n);
                  else if (h.onAction) {
                    n.action_call || (n.action_call = this.id + "_act_" + Math.floor(Math.random() * 9999));
                    const c = h.inputs[l.target_slot];
                    h.actionDo(c.name, e, n);
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  /**
   * clears the trigger slot animation
   * @param slot the index of the output slot
   * @param link_id in case you want to trigger and specific output link in a slot
   */
  clearTriggeredSlot(t, e) {
    if (this.outputs) {
      var i = this.outputs[t];
      if (i) {
        var n = i.links;
        if (!(!n || !n.length))
          for (var s = 0; s < n.length; ++s) {
            var r = n[s];
            if (!(e != null && e != r)) {
              var o = this.graph.links[n[s]];
              o && (o._last_time = 0);
            }
          }
      }
    }
  }
  /**
   * changes node size and triggers callback
   * @method setSize
   * @param {vec2} size
   */
  setSize(t) {
    this.size = t, this.onResize && this.onResize(this.size);
  }
  /**
   * add a new property to this node
   * @param name
   * @param default_value
   * @param type string defining the output type ("vec3","number",...)
   * @param extra_info this can be used to have special properties of the property (like values, etc)
   */
  addProperty(t, e, i, n) {
    var s = { name: t, type: i, default_value: e };
    if (n)
      for (var r in n)
        s[r] = n[r];
    return this.properties_info || (this.properties_info = []), this.properties_info.push(s), this.properties || (this.properties = {}), this.properties[t] = e, s;
  }
  /**
   * add a new output slot to use in this node
   * @param name
   * @param type string defining the output type ("vec3","number",...)
   * @param extra_info this can be used to have special properties of an output (label, special color, position, etc)
   */
  addOutput(t, e = I.DEFAULT, i) {
    var n = { name: t, type: e, links: [], properties: {} };
    if (i)
      for (var s in i)
        n[s] = i[s];
    return (n.shape == null || n.shape == D.DEFAULT) && (e == "array" ? n.shape = D.GRID_SHAPE : (e === I.EVENT || e === I.ACTION) && (n.shape = D.BOX_SHAPE)), (e === I.EVENT || e === I.ACTION) && (n.shape = D.BOX_SHAPE), this.outputs || (this.outputs = []), this.outputs.push(n), this.onOutputAdded && this.onOutputAdded(n), u.auto_load_slot_types && u.registerNodeAndSlotType(this, e, !0), this.setSize(this.computeSize()), this.setDirtyCanvas(!0, !0), n;
  }
  /** remove an existing output slot */
  removeOutput(t) {
    const e = this.outputs[t];
    this.disconnectOutput(t), this.outputs.splice(t, 1);
    for (var i = t; i < this.outputs.length; ++i)
      if (!(!this.outputs[i] || !this.outputs[i].links))
        for (var n = this.outputs[i].links, s = 0; s < n.length; ++s) {
          var r = this.graph.links[n[s]];
          r && (r.origin_slot -= 1);
        }
    this.setSize(this.computeSize()), this.onOutputRemoved && this.onOutputRemoved(t, e), this.setDirtyCanvas(!0, !0);
  }
  moveOutput(t, e) {
    const i = this.outputs[t];
    if (i == null || e < 0 || e > this.outputs.length - 1)
      return;
    const n = this.outputs[e];
    if (i.links)
      for (const s of i.links) {
        const r = this.graph.links[s];
        r.origin_slot = e;
      }
    if (n.links)
      for (const s of n.links) {
        const r = this.graph.links[s];
        r.origin_slot = t;
      }
    this.outputs[e] = i, this.outputs[t] = n;
  }
  /**
   * add a new input slot to use in this node
   * @param name
   * @param type string defining the input type ("vec3","number",...), it its a generic one use 0
   * @param extra_info this can be used to have special properties of an input (label, color, position, etc)
   */
  addInput(t, e = I.DEFAULT, i) {
    var n = { name: t, type: e, link: null, properties: {} };
    if (i)
      for (var s in i)
        n[s] = i[s];
    return (n.shape == null || n.shape == D.DEFAULT) && (e == "array" ? n.shape = D.GRID_SHAPE : (e === I.EVENT || e === I.ACTION) && (n.shape = D.BOX_SHAPE)), this.inputs || (this.inputs = []), this.inputs.push(n), this.setSize(this.computeSize()), this.onInputAdded && this.onInputAdded(n), u.registerNodeAndSlotType(this, e), this.setDirtyCanvas(!0, !0), n;
  }
  /** remove an existing input slot */
  removeInput(t) {
    this.disconnectInput(t);
    for (var e = this.inputs.splice(t, 1), i = t; i < this.inputs.length; ++i)
      if (this.inputs[i]) {
        var n = this.graph.links[this.inputs[i].link];
        n && (n.target_slot -= 1);
      }
    this.setSize(this.computeSize()), this.onInputRemoved && this.onInputRemoved(t, e[0]), this.setDirtyCanvas(!0, !0);
  }
  moveInput(t, e) {
    const i = this.inputs[t];
    if (i == null || e < 0 || e > this.inputs.length - 1)
      return;
    const n = this.inputs[e];
    if (i.link != null) {
      const s = this.graph.links[i.link];
      s.target_slot = e;
    }
    if (n.link != null) {
      const s = this.graph.links[n.link];
      s.target_slot = t;
    }
    this.inputs[e] = i, this.inputs[t] = n;
  }
  /**
   * add an special connection to this node (used for special kinds of graphs)
   * @param name
   * @param type string defining the input type ("vec3","number",...)
   * @param pos position of the connection inside the node
   * @param direction if is input or output
   */
  addConnection(t, e, i, n) {
    let s = {
      name: t,
      type: e,
      pos: i,
      direction: n,
      links: null
    };
    return this.connections.push(s), s;
  }
  /** 根据节点的输入和输出槽计算节点的大小 */
  computeSize(t = [0, 0]) {
    const e = be(this, "overrideSize");
    if (e)
      return e.concat();
    var i = Math.max(
      this.inputs ? this.inputs.length : 1,
      this.outputs ? this.outputs.length : 1
    ), n = t;
    i = Math.max(i, 1);
    var s = u.NODE_TEXT_SIZE, r = p(this.title), o = 0, a = 0;
    if (this.inputs)
      for (var l = 0, h = this.inputs.length; l < h; ++l) {
        var c = this.inputs[l], g = c.label || c.name || "", d = p(g);
        o < d && (o = d);
      }
    if (this.outputs)
      for (var l = 0, h = this.outputs.length; l < h; ++l) {
        var _ = this.outputs[l], g = _.label || _.name || "", d = p(g);
        a < d && (a = d);
      }
    if (n[0] = Math.max(o + a + 10, r), n[0] = Math.max(n[0], u.NODE_WIDTH), this.widgets && this.widgets.length)
      for (const v of this.widgets)
        n[0] = Math.max(n[0], v.width || u.NODE_WIDTH * 1.5);
    n[1] = (this.constructor.slot_start_y || 0) + i * u.NODE_SLOT_HEIGHT;
    var f = 0;
    if (this.widgets && this.widgets.length) {
      for (var l = 0, h = this.widgets.length; l < h; ++l) {
        const m = this.widgets[l];
        m.hidden || (m.computeSize ? f += m.computeSize(n[0])[1] + 4 : f += u.NODE_WIDGET_HEIGHT + 4);
      }
      f += 8;
    }
    this.widgets_up ? n[1] = Math.max(n[1], f) : this.widgets_start_y != null ? n[1] = Math.max(n[1], f + this.widgets_start_y) : n[1] += f;
    function p(v) {
      return v ? s * v.length * 0.6 : 0;
    }
    return this.constructor.min_height && n[1] < this.constructor.min_height && (n[1] = this.constructor.min_height), n[1] += 6, n;
  }
  /**
   * returns all the info available about a property of this node.
   *
   * @method getPropertyInfo
   * @param {String} property name of the property
   * @return {Object} the object with all the available info
  */
  getPropertyInfo(t) {
    var e = null;
    if (this.properties_info) {
      for (var i = 0; i < this.properties_info.length; ++i)
        if (this.properties_info[i].name == t) {
          e = this.properties_info[i];
          break;
        }
    }
    return this.constructor["@" + t] && (e = this.constructor["@" + t]), this.constructor.widgets_info && this.constructor.widgets_info[t] && (e = this.constructor.widgets_info[t]), !e && this.onGetPropertyInfo && (e = this.onGetPropertyInfo(t)), e || (e = {}), e.type || (e.type = typeof this.properties[t]), e.widget == "combo" && (e.type = "enum"), e;
  }
  /**
   * https://github.com/jagenjo/litegraph.js/blob/master/guides/README.md#node-widgets
   * @return created widget
   */
  addWidget(t, e, i, n, s) {
    this.widgets || (this.widgets = []), !s && n && n.constructor === Object && (s = n, n = null), s && s.constructor === String && (s = { property: s }), n && n.constructor === String && (s || (s = {}), s.property = n, n = null), n && n.constructor !== Function && (console.warn("addWidget: callback must be a function"), n = null);
    var r = {
      type: t.toLowerCase(),
      name: e,
      value: i,
      callback: n,
      options: s || {}
    };
    if (r.options.y !== void 0 && (r.y = r.options.y), !n && !r.options.callback && !r.options.property && console.warn("LiteGraph addWidget(...) without a callback or property assigned"), t == "combo" && !r.options.values)
      throw "LiteGraph addWidget('combo',...) requires to pass values in options: { values:['red','blue'] }";
    return this.widgets.push(r), this.setSize(this.computeSize()), r;
  }
  addCustomWidget(t) {
    return this.widgets || (this.widgets = []), this.widgets.push(t), this.setSize(this.computeSize()), t;
  }
  setWidgetHidden(t, e) {
    t.hidden = e, this.setSize(this.computeSize());
  }
  /**
   * returns the bounding of the object, used for rendering purposes
   * @return [x, y, width, height]
   */
  getBounding(t) {
    return t = t || new Float32Array(4), t[0] = this.pos[0] - 4, t[1] = this.pos[1] - u.NODE_TITLE_HEIGHT, t[2] = this.size[0] + 4, t[3] = this.flags.collapsed ? u.NODE_TITLE_HEIGHT : this.size[1] + u.NODE_TITLE_HEIGHT, this.onBounding && this.onBounding(t), t;
  }
  /** checks if a point is inside the shape of a node */
  isPointInside(t, e, i = 0, n = !1) {
    var s = this.graph && this.graph.isLive() ? 0 : u.NODE_TITLE_HEIGHT;
    if (n && (s = 0), this.flags && this.flags.collapsed) {
      if (u.isInsideRectangle(
        t,
        e,
        this.pos[0] - i,
        this.pos[1] - u.NODE_TITLE_HEIGHT - i,
        (this._collapsed_width || u.NODE_COLLAPSED_WIDTH) + 2 * i,
        u.NODE_TITLE_HEIGHT + 2 * i
      ))
        return !0;
    } else if (this.pos[0] - 4 - i < t && this.pos[0] + this.size[0] + 4 + i > t && this.pos[1] - s - i < e && this.pos[1] + this.size[1] + i > e)
      return !0;
    return !1;
  }
  /** checks if a point is inside a node slot, and returns info about which slot */
  getSlotInPosition(t, e) {
    var i = [0, 0];
    if (this.inputs)
      for (var n = 0, s = this.inputs.length; n < s; ++n) {
        var r = this.inputs[n];
        if (this.getConnectionPos(!0, n, i), u.isInsideRectangle(
          t,
          e,
          i[0] - 10,
          i[1] - 5,
          20,
          10
        ))
          return { input: r, slot: n, link_pos: i };
      }
    if (this.outputs)
      for (var n = 0, s = this.outputs.length; n < s; ++n) {
        var o = this.outputs[n];
        if (this.getConnectionPos(!1, n, i), u.isInsideRectangle(
          t,
          e,
          i[0] - 10,
          i[1] - 5,
          20,
          10
        ))
          return { output: o, slot: n, link_pos: i };
      }
    return null;
  }
  is(t) {
    const e = t.__LITEGRAPH_TYPE__;
    return e != null && this.type === e;
  }
  /**
   * returns the input slot with a given name (used for dynamic slots), -1 if not found
   * @param name the name of the slot
   * @return the slot (-1 if not found)
   */
  findInputSlotIndexByName(t, e = !1, i) {
    if (!this.inputs)
      return -1;
    for (var n = 0, s = this.inputs.length; n < s; ++n)
      if (!(e && this.inputs[n].link && this.inputs[n].link != null) && !(i && i.includes(this.inputs[n].type)) && (!t || t == this.inputs[n].name))
        return n;
    return -1;
  }
  findInputSlotByName(t, e = !1, i) {
    if (!this.inputs)
      return null;
    for (var n = 0, s = this.inputs.length; n < s; ++n)
      if (!(e && this.inputs[n].link && this.inputs[n].link != null) && !(i && i.includes(this.inputs[n].type)) && (!t || t == this.inputs[n].name))
        return this.inputs[n];
    return null;
  }
  /**
   * returns the output slot with a given name (used for dynamic slots), -1 if not found
   * @param name the name of the slot
   * @return  the slot (-1 if not found)
   */
  findOutputSlotIndexByName(t, e = !1, i) {
    if (!this.outputs)
      return -1;
    for (var n = 0, s = this.outputs.length; n < s; ++n)
      if (!(e && this.outputs[n].links && this.outputs[n].links != null) && !(i && i.includes(this.outputs[n].type)) && (!t || t == this.outputs[n].name))
        return n;
    return -1;
  }
  findOutputSlotByName(t, e = !1, i) {
    if (!this.outputs)
      return null;
    for (var n = 0, s = this.outputs.length; n < s; ++n)
      if (!(e && this.outputs[n].links && this.outputs[n].links != null) && !(i && i.includes(this.outputs[n].type)) && (!t || t == this.outputs[n].name))
        return this.outputs[n];
    return null;
  }
  /**
   * findSlotByType for INPUTS
   */
  findInputSlotIndexByType(t, e = !1, i = !1) {
    return this.findSlotByType(!0, t, !1, e, i);
  }
  /**
   * findSlotByType for OUTPUTS
   */
  findOutputSlotIndexByType(t, e = !1, i = !1) {
    return this.findSlotByType(!1, t, !1, e, i);
  }
  /**
   * findSlotByType for INPUTS
   */
  findInputSlotByType(t, e = !1, i = !1) {
    return this.findSlotByType(!0, t, !1, e, i);
  }
  /**
   * findSlotByType for OUTPUTS
   */
  findOutputSlotByType(t, e = !1, i = !1) {
    return this.findSlotByType(!1, t, !1, e, i);
  }
  /**
   * returns the output (or input) slot with a given type, -1 if not found
   * @method findSlotByType
   * @param {boolean} input uise inputs instead of outputs
   * @param {string} type the type of the slot
   * @param {boolean} preferFreeSlot if we want a free slot (if not found, will return the first of the type anyway)
   * @return {number_or_object} the slot (-1 if not found)
   */
  findSlotByType(t, e, i, n = !1, s = !1) {
    n = n || !1, s = s || !1;
    var r = t ? this.inputs : this.outputs;
    if (!r)
      return i ? null : -1;
    (e == "" || e == "*") && (e = 0);
    for (var o = 0, a = r.length; o < a; ++o) {
      var l = (e + "").toLowerCase().split(","), h = r[o].type == "0" || r[o].type == "*" ? "0" : r[o].type;
      let c = (h + "").toLowerCase().split(",");
      for (let g = 0; g < l.length; g++)
        for (let d = 0; d < c.length; d++)
          if (l[g] == "_event_" && (l[g] = I.EVENT), c[g] == "_event_" && (c[g] = I.EVENT), l[g] == "*" && (l[g] = I.DEFAULT), c[g] == "*" && (c[g] = I.DEFAULT), l[g] == c[d]) {
            let _ = r[o];
            if (n && _.links && _.links !== null || _.link && _.link !== null)
              continue;
            return i ? _ : o;
          }
    }
    if (n && !s)
      for (var o = 0, a = r.length; o < a; ++o) {
        var l = (e + "").toLowerCase().split(","), h = r[o].type == "0" || r[o].type == "*" ? "0" : r[o].type;
        let f = (h + "").toLowerCase().split(",");
        for (let p = 0; p < l.length; p++)
          for (let v = 0; v < f.length; v++)
            if (l[p] == "*" && (l[p] = I.DEFAULT), f[p] == "*" && (f[p] = I.DEFAULT), l[p] == f[v])
              return i ? r[o] : o;
      }
    return i ? null : -1;
  }
  /**
   * connect this node output to the input of another node BY TYPE
   * @method connectByType
   * @param {number_or_string} slot (could be the number of the slot or the string with the name of the slot)
   * @param {LGraphNode} node the target node
   * @param {string} target_type the input slot type of the target node
   * @return {Object} the link_info is created, otherwise null
   */
  connectByTypeInput(t, e, i, n = {}) {
    var s = {
      createEventInCase: !0,
      firstFreeIfOutputGeneralInCase: !0,
      generalTypeInCase: !0
    }, r = Object.assign(s, n);
    e && e.constructor === Number && (e = this.graph.getNodeById(e));
    let o = i;
    i === I.EVENT ? o = I.ACTION : i === I.ACTION && (o = I.EVENT);
    let a = e.findInputSlotIndexByType(o, !0);
    if (a >= 0 && a !== null)
      return u.debug && console.debug("CONNbyTYPE type " + i + " for " + a), this.connect(t, e, a);
    if (u.debug && console.log("type " + i + " not found or not free?"), r.createEventInCase && i == I.EVENT)
      return u.debug && console.debug("connect WILL CREATE THE onTrigger " + i + " to " + e), this.connect(t, e, -1);
    if (r.generalTypeInCase) {
      let l = e.findInputSlotIndexByType(I.DEFAULT, !0, !0);
      if (u.debug && console.debug("connect TO a general type (*, 0), if not found the specific type ", i, " to ", e, "RES_SLOT:", l), l >= 0)
        return this.connect(t, e, l);
    }
    if (r.firstFreeIfOutputGeneralInCase && (i == 0 || i == "*" || i == "")) {
      let l = e.findInputSlotIndexByName(null, !0, [I.EVENT]);
      if (u.debug && console.debug("connect TO TheFirstFREE ", i, " to ", e, "RES_SLOT:", l), l >= 0)
        return this.connect(t, e, l);
    }
    return u.debug && console.error("no way to connect type: ", i, " to targetNODE ", e), null;
  }
  /**
   * connect this node input to the output of another node BY TYPE
   * @method connectByType
   * @param {number_or_string} slot (could be the number of the slot or the string with the name of the slot)
   * @param {LGraphNode} node the target node
   * @param {string} target_type the output slot type of the target node
   * @return {Object} the link_info is created, otherwise null
   */
  connectByTypeOutput(t, e, i, n = {}) {
    var s = {
      createEventInCase: !0,
      firstFreeIfInputGeneralInCase: !0,
      generalTypeInCase: !0
    }, r = Object.assign(s, n);
    e && e.constructor === Number && (e = this.graph.getNodeById(e));
    let o = i;
    if (i === I.EVENT ? o = I.ACTION : i === I.ACTION && (o = I.EVENT), a = e.findOutputSlotIndexByType(o, !0), a >= 0 && a !== null)
      return console.debug("CONNbyTYPE OUT! type " + i + " for " + a + " to " + o), e.connect(a, this, t);
    if (r.generalTypeInCase) {
      var a = e.findOutputSlotIndexByType(0, !0, !0);
      if (a >= 0)
        return e.connect(a, this, t);
    }
    if ((r.createEventInCase && i == I.EVENT || i == I.ACTION) && u.do_add_triggers_slots) {
      var a = e.addOnExecutedOutput();
      return e.connect(a, this, t);
    }
    if (r.firstFreeIfInputGeneralInCase && (i == 0 || i == "*" || i == "")) {
      let l = e.findOutputSlotIndexByName(null, !0, [I.EVENT, I.ACTION]);
      if (l >= 0)
        return e.connect(l, this, t);
    }
    return console.error("no way to connect byOUT type: ", i, " to sourceNODE ", e), console.error("type OUT! " + i + " not found or not free?"), null;
  }
  /**
   * connect this node output to the input of another node
   * @param slot (could be the number of the slot or the string with the name of the slot)
   * @param  targetNode the target node
   * @param  targetSlot the input slot of the target node (could be the number of the slot or the string with the name of the slot, or -1 to connect a trigger)
   * @return {Object} the linkInfo is created, otherwise null
   */
  connect(t, e, i) {
    if (i = i || 0, !this.graph)
      throw new Error("Connect: Error, node doesn't belong to any graph. Nodes must be added first to a graph before connecting them.");
    if (typeof t == "string") {
      if (t = this.findOutputSlotIndexByName(t), t == -1)
        return u.debug && console.error("Connect: Error, no slot of name " + t), null;
    } else if (!this.outputs || t >= this.outputs.length)
      return u.debug && console.error("Connect: Error, slot number not found"), null;
    if (e && e.constructor === Number && (e = this.graph.getNodeById(e)), !e)
      throw "target node is null";
    if (e == this)
      return u.debug && console.error("Connect: Error, can't connect node to itself!"), null;
    if (!e.graph)
      throw new Error("Connect: Error, target node doesn't belong to any graph. Nodes must be added first to a graph before connecting them.");
    if (typeof i == "string") {
      if (i = e.findInputSlotIndexByName(i), i == -1)
        return u.debug && console.error(
          "Connect: Error, no slot of name " + i
        ), null;
    } else if (i === I.EVENT)
      if (u.do_add_triggers_slots)
        e.changeMode(J.ON_TRIGGER), i = e.findInputSlotIndexByName("onTrigger");
      else
        return u.debug && console.error("Connect: Error, can't connect event target slot"), null;
    else if (!e.inputs || i >= e.inputs.length)
      return u.debug && console.error("Connect: Error, slot number not found"), null;
    var n = !1, s = e.inputs[i], r = null, o = this.outputs[t];
    if (!this.outputs[t])
      return u.debug && (console.warn("Connect: Invalid slot passed: " + t), console.warn(this.outputs)), null;
    if (e.onBeforeConnectInput && (i = e.onBeforeConnectInput(i)), i === -1 || i === null || !u.isValidConnection(o.type, s.type))
      return this.setDirtyCanvas(!1, !0), n && this.graph.connectionChange(this, r), console.warn("Connect: Invalid connection: ", i, o.type, s.type), null;
    if (u.debug && console.debug("valid connection", o.type, s.type), e.onConnectInput && e.onConnectInput(i, o.type, o, this, t) === !1)
      return u.debug && console.debug("onConnectInput blocked", o.type, s.type), null;
    if (this.onConnectOutput && this.onConnectOutput(t, s.type, s, e, i) === !1)
      return u.debug && console.debug("onConnectOutput blocked", o.type, s.type), null;
    if (e.inputs[i] && e.inputs[i].link != null && (this.graph.beforeChange(), e.disconnectInput(i, { doProcessChange: !1 }), n = !0), o.links !== null && o.links.length)
      switch (o.type) {
        case I.EVENT:
          u.allow_multi_output_for_events || (this.graph.beforeChange(), this.disconnectOutput(t, null, { doProcessChange: !1 }), n = !0);
          break;
      }
    let a;
    return u.use_uuids ? a = ae() : a = ++this.graph.last_link_id, r = new pe(
      a,
      s.type || o.type,
      this.id,
      t,
      e.id,
      i
    ), this.graph.links[r.id] && console.error("Link already exists in graph!", r.id, r, this.graph.links[r.id]), this.graph.links[r.id] = r, o.links == null && (o.links = []), o.links.push(r.id), e.inputs[i].link = r.id, this.graph && this.graph._version++, this.onConnectionsChange && this.onConnectionsChange(
      z.OUTPUT,
      t,
      !0,
      r,
      o
    ), e.onConnectionsChange && e.onConnectionsChange(
      z.INPUT,
      i,
      !0,
      r,
      s
    ), this.graph && this.graph.onNodeConnectionChange && (this.graph.onNodeConnectionChange(
      z.INPUT,
      e,
      i,
      this,
      t
    ), this.graph.onNodeConnectionChange(
      z.OUTPUT,
      this,
      t,
      e,
      i
    )), this.setDirtyCanvas(!1, !0), this.graph.afterChange(), this.graph.connectionChange(this, r), r;
  }
  /**
   * disconnect one output to an specific node
   * @param slot (could be the number of the slot or the string with the name of the slot)
   * @param targetNode the target node to which this slot is connected [Optional, if not targetNode is specified all nodes will be disconnected]
   * @return if it was disconnected successfully
   */
  disconnectOutput(t, e, i) {
    if (typeof t == "string") {
      if (t = this.findOutputSlotIndexByName(t), t == -1)
        return u.debug && console.error("Connect: Error, no slot of name " + t), !1;
    } else if (!this.outputs || t >= this.outputs.length)
      return u.debug && console.error("Connect: Error, slot number not found"), !1;
    var n = this.outputs[t];
    if (!n || !n.links || n.links.length == 0)
      return !1;
    if (e) {
      if (e.constructor === Number && (e = this.graph.getNodeById(e)), !e)
        throw "Target Node not found";
      for (var s = 0, r = n.links.length; s < r; s++) {
        var o = n.links[s], a = this.graph.links[o];
        if (a.target_id == e.id) {
          n.links.splice(s, 1);
          var l = e.inputs[a.target_slot];
          l.link = null, delete this.graph.links[o], this.graph && this.graph._version++, e.onConnectionsChange && e.onConnectionsChange(
            z.INPUT,
            a.target_slot,
            !1,
            a,
            l
          ), this.onConnectionsChange && this.onConnectionsChange(
            z.OUTPUT,
            t,
            !1,
            a,
            n
          ), this.graph && this.graph.onNodeConnectionChange && this.graph.onNodeConnectionChange(
            z.OUTPUT,
            this,
            t
          ), this.graph && this.graph.onNodeConnectionChange && (this.graph.onNodeConnectionChange(
            z.OUTPUT,
            this,
            t
          ), this.graph.onNodeConnectionChange(
            z.INPUT,
            e,
            a.target_slot
          ));
          break;
        }
      }
    } else {
      for (var s = 0, r = n.links.length; s < r; s++) {
        var o = n.links[s], a = this.graph.links[o];
        if (a) {
          var e = this.graph.getNodeById(a.target_id), l = null;
          this.graph && this.graph._version++, e && (l = e.inputs[a.target_slot], l.link = null, e.onConnectionsChange && e.onConnectionsChange(
            z.INPUT,
            a.target_slot,
            !1,
            a,
            l
          ), this.graph && this.graph.onNodeConnectionChange && this.graph.onNodeConnectionChange(
            z.INPUT,
            e,
            a.target_slot
          )), delete this.graph.links[o], this.onConnectionsChange && this.onConnectionsChange(
            z.OUTPUT,
            t,
            !1,
            a,
            n
          ), this.graph && this.graph.onNodeConnectionChange && (this.graph.onNodeConnectionChange(
            z.OUTPUT,
            this,
            t
          ), this.graph.onNodeConnectionChange(
            z.INPUT,
            e,
            a.target_slot
          ));
        }
      }
      n.links = null;
    }
    return this.setDirtyCanvas(!1, !0), this.graph.connectionChange(this), !0;
  }
  /**
   * disconnect one input
   * @param slot (could be the number of the slot or the string with the name of the slot)
   * @return if it was disconnected successfully
   */
  disconnectInput(t, e = {}) {
    if (typeof t == "string") {
      if (t = this.findInputSlotIndexByName(t), t == -1)
        return u.debug && console.error("Connect: Error, no slot of name " + t), !1;
    } else if (!this.inputs || t >= this.inputs.length)
      return u.debug && console.error("Connect: Error, slot number not found"), !1;
    var i = this.inputs[t];
    if (!i)
      return !1;
    var n = this.inputs[t].link;
    if (n != null) {
      this.inputs[t].link = null;
      var s = this.graph.links[n];
      if (s) {
        var r = this.graph.getNodeById(s.origin_id);
        if (!r)
          return !1;
        var o = r.outputs[s.origin_slot];
        if (!o || !o.links || o.links.length == 0)
          return !1;
        for (var a = 0, l = o.links.length; a < l; a++)
          if (o.links[a] == n) {
            o.links.splice(a, 1);
            break;
          }
        delete this.graph.links[n], this.graph && this.graph._version++, this.onConnectionsChange && this.onConnectionsChange(
          z.INPUT,
          t,
          !1,
          s,
          i
        ), r.onConnectionsChange && r.onConnectionsChange(
          z.OUTPUT,
          a,
          !1,
          s,
          o
        ), this.graph && this.graph.onNodeConnectionChange && (this.graph.onNodeConnectionChange(
          z.OUTPUT,
          r,
          a
        ), this.graph.onNodeConnectionChange(z.INPUT, this, t));
      }
    }
    return this.setDirtyCanvas(!1, !0), this.graph && this.graph.connectionChange(this), !0;
  }
  /**
   * 在画布坐标中返回连接点的中心
   * @param is_input 如果是输入插槽，则为 true，如果是输出插槽，则为 false
   * @param slot （可以是插槽的编号，也可以是带有插槽名称的字符串）
   * @param out a place to store the output, to free garbage
   * @return 坐标 [x,y]
   **/
  getConnectionPos(t, e, i = [0, 0], n = !1) {
    var s = 0;
    t && this.inputs && (s = this.inputs.length), !t && this.outputs && (s = this.outputs.length);
    var r = u.NODE_SLOT_HEIGHT * 0.5;
    if (this.flags.collapsed && !n) {
      var o = this._collapsed_width || u.NODE_COLLAPSED_WIDTH;
      return this.horizontal ? (i[0] = this.pos[0] + o * 0.5, t ? i[1] = this.pos[1] - u.NODE_TITLE_HEIGHT : i[1] = this.pos[1]) : (t ? i[0] = this.pos[0] : i[0] = this.pos[0] + o, i[1] = this.pos[1] - u.NODE_TITLE_HEIGHT * 0.5), i;
    }
    return t && e == -1 ? (i[0] = this.pos[0] + u.NODE_TITLE_HEIGHT * 0.5, i[1] = this.pos[1] + u.NODE_TITLE_HEIGHT * 0.5, i) : t && s > e && this.inputs[e].pos ? (i[0] = this.pos[0] + this.inputs[e].pos[0], i[1] = this.pos[1] + this.inputs[e].pos[1], i) : !t && s > e && this.outputs[e].pos ? (i[0] = this.pos[0] + this.outputs[e].pos[0], i[1] = this.pos[1] + this.outputs[e].pos[1], i) : this.horizontal ? (i[0] = this.pos[0] + (e + 0.5) * (this.size[0] / s), t ? i[1] = this.pos[1] - u.NODE_TITLE_HEIGHT : i[1] = this.pos[1] + this.size[1], i) : (t ? i[0] = this.pos[0] + r : i[0] = this.pos[0] + this.size[0] + 1 - r, i[1] = this.pos[1] + (e * u.NODE_SLOT_HEIGHT + e + 1) + r + (this.constructor.slot_start_y || 0), i);
  }
  /** Force align to grid */
  alignToGrid() {
    this.pos[0] = u.CANVAS_GRID_SIZE * Math.round(this.pos[0] / u.CANVAS_GRID_SIZE), this.pos[1] = u.CANVAS_GRID_SIZE * Math.round(this.pos[1] / u.CANVAS_GRID_SIZE);
  }
  /** Console output */
  trace(t) {
    this.console || (this.console = []), this.console.push(t), this.console.length > Ne.MAX_CONSOLE && this.console.shift(), this.graph.onNodeTrace && this.graph.onNodeTrace(this, t);
  }
  /** Forces to redraw or the main canvas (LGraphNode) or the bg canvas (links) */
  setDirtyCanvas(t, e = !1) {
    this.graph && this.graph.sendActionToCanvas("setDirty", [t, e]);
  }
  loadImage(t) {
    var e = new Image();
    e.src = u.node_images_path + t;
    var i = this;
    return e.onload = function() {
      i.setDirtyCanvas(!0);
    }, e;
  }
  /** Allows to get onMouseMove and onMouseUp events even if the mouse is out of focus */
  captureInput(t) {
    if (!(!this.graph || !this.graph.list_of_graphcanvas))
      for (var e = this.graph.list_of_graphcanvas, i = 0; i < e.length; ++i) {
        var n = e[i];
        !t && n.node_capturing_input != this || (n.node_capturing_input = t ? this : null);
      }
  }
  isShowingTitle(t) {
    return this.titleMode == ne.TRANSPARENT_TITLE || this.titleMode == ne.NO_TITLE ? !1 : (this.titleMode == ne.AUTOHIDE_TITLE && t, !0);
  }
  /** Collapse the node to make it smaller on the canvas */
  collapse(t = !1) {
    this.graph._version++, !(this.collapsable === !1 && !t) && (this.flags.collapsed ? this.flags.collapsed = !1 : this.flags.collapsed = !0, this.setDirtyCanvas(!0, !0));
  }
  /** Forces the node to do not move or realign on Z */
  pin(t) {
    this.graph._version++, t === void 0 ? this.flags.pinned = !this.flags.pinned : this.flags.pinned = t;
  }
  localToScreen(t, e, i) {
    return [
      (t + this.pos[0]) * i.ds.scale + i.ds.offset[0],
      (e + this.pos[1]) * i.ds.scale + i.ds.offset[1]
    ];
  }
  getOptionalSlots() {
    return be(this, "optionalSlots");
  }
};
let le = Ne;
le.MAX_CONSOLE = 100;
function we() {
  let t = [];
  return t = t.concat(Ae), t = t.concat([I.ACTION]), t = t.concat(u.slot_types_in.map((e) => e.toUpperCase())), t;
}
function Ye() {
  return we().map($);
}
class Q extends le {
  constructor(e) {
    super(e), this.properties = {
      name: "",
      type: "number",
      value: 0,
      subgraphID: null
    }, this.nameInGraph = "", this.clonable = !1, this.size = [180, 90];
    let i = this;
    this.nameWidget = this.addWidget(
      "text",
      "Name",
      this.properties.name,
      this.setName.bind(this)
    ), u.graph_inputs_outputs_use_combo_widget ? this.typeWidget = this.addWidget(
      "combo",
      "Type",
      $(this.properties.type),
      this.setType.bind(this),
      { values: Ye }
    ) : this.typeWidget = this.addWidget(
      "text",
      "Type",
      $(this.properties.type),
      this.setType.bind(this)
    ), this.valueWidget = this.addWidget(
      "number",
      "Value",
      this.properties.value,
      function(n) {
        i.setProperty("value", n);
      }
    ), this.widgets_up = !0;
  }
  setName(e) {
    if (e == null || e === this.properties.name)
      return;
    const i = this.getParentSubgraph();
    i && (e = i.getValidGraphInputName(e), this.setProperty("name", e));
  }
  setType(e) {
    e || (e = "*");
    let i = e;
    e === "-1" || e === "Action" ? i = I.ACTION : e === "-2" || e === "Event" ? i = I.EVENT : e === "0" && (i = "*"), this.setProperty("type", i);
  }
  onConfigure() {
    this.updateType();
  }
  getParentSubgraph() {
    var e, i;
    return (i = (e = this.graph._subgraph_node) == null ? void 0 : e.graph) == null ? void 0 : i.getNodeById(this.properties.subgraphID);
  }
  /** ensures the type in the node output and the type in the associated graph input are the same */
  updateType() {
    var e = this.properties.type;
    this.typeWidget.value = $(e);
    const i = this.outputs[0];
    i.type != e && (u.isValidConnection(i.type, e) || this.disconnectOutput(0), i.type = e), e == "array" ? i.shape = D.GRID_SHAPE : e === I.EVENT || e === I.ACTION ? i.shape = D.BOX_SHAPE : i.shape = D.DEFAULT, e == "number" ? (this.valueWidget.type = "number", this.valueWidget.value = 0) : e == "boolean" ? (this.valueWidget.type = "toggle", this.valueWidget.value = !0) : e == "string" ? (this.valueWidget.type = "text", this.valueWidget.value = "") : (this.valueWidget.type = null, this.valueWidget.value = null), this.properties.value = this.valueWidget.value, this.graph && this.nameInGraph && Se(e) ? (this.graph.changeInputType(this.nameInGraph, e), i.type !== e && this.setOutputDataType(0, e)) : console.error("[GraphInput] Can't change output to type", e, this.graph, this.nameInGraph);
  }
  /** this is executed AFTER the property has changed */
  onPropertyChanged(e, i) {
    if (e == "name") {
      if (i == "" || i == this.nameInGraph || i == "enabled")
        return !1;
      this.graph && (this.nameInGraph ? this.graph.renameInput(this.nameInGraph, i) : this.graph.addInput(i, "" + this.properties.type, null)), this.nameWidget.value = i, this.nameInGraph = i;
    } else
      e == "type" && this.updateType();
  }
  getTitle() {
    return this.flags.collapsed ? this.properties.name : this.title;
  }
  onAction(e, i) {
    this.properties.type == I.EVENT && this.triggerSlot(0, i);
  }
  onExecute() {
    var e = this.properties.name, i = this.graph.inputs[e];
    if (!i) {
      this.setOutputData(0, this.properties.value);
      return;
    }
    this.setOutputData(0, i.value !== void 0 ? i.value : this.properties.value);
  }
  onRemoved() {
    this.nameInGraph && this.graph.removeInput(this.nameInGraph);
  }
}
Q.slotLayout = {
  inputs: [],
  outputs: [
    { name: "", type: "number" }
  ]
};
u.registerNodeType({
  class: Q,
  title: "Input",
  desc: "Input of the graph",
  type: "graph/input",
  hide_in_node_lists: !0
});
function Le() {
  let t = [];
  return t = t.concat(Ae), t = t.concat([I.EVENT]), t = t.concat(u.slot_types_out), t;
}
function We() {
  return Le().map($);
}
class ee extends le {
  constructor(e) {
    super(e), this.properties = {
      name: "",
      type: "number",
      subgraphID: null
    }, this.nameInGraph = "", this.clonable = !1, this.size = [180, 60], this.nameWidget = this.addWidget(
      "text",
      "Name",
      this.properties.name,
      this.setName.bind(this)
    ), u.graph_inputs_outputs_use_combo_widget ? this.typeWidget = this.addWidget(
      "combo",
      "Type",
      $(this.properties.type),
      this.setType.bind(this),
      { values: We }
    ) : this.typeWidget = this.addWidget(
      "text",
      "Type",
      $(this.properties.type),
      this.setType.bind(this)
    ), this.widgets_up = !0;
  }
  setName(e) {
    if (e == null || e === this.properties.name)
      return;
    const i = this.getParentSubgraph();
    i && (e = i.getValidGraphOutputName(e), this.setProperty("name", e));
  }
  setType(e) {
    e || (e = "*");
    let i = e;
    e === "-1" || e === "Action" ? i = I.ACTION : e === "-2" || e === "Event" ? i = I.EVENT : e === "0" && (i = "*"), this.setProperty("type", i);
  }
  onConfigure() {
    this.updateType();
  }
  getParentSubgraph() {
    var e, i;
    return (i = (e = this.graph._subgraph_node) == null ? void 0 : e.graph) == null ? void 0 : i.getNodeById(this.properties.subgraphID);
  }
  updateType() {
    var e = this.properties.type;
    const i = this.inputs[0];
    this.typeWidget && (this.typeWidget.value = $(e)), e == "array" ? i.shape = D.GRID_SHAPE : e === I.EVENT || e === I.ACTION ? i.shape = D.BOX_SHAPE : i.shape = D.DEFAULT, i.type != e && ((e == "action" || e == "event") && (e = I.EVENT), u.isValidConnection(i.type, e) || this.disconnectInput(0), i.type = e), this.graph && this.nameInGraph && Se(e) ? (this.graph.changeOutputType(this.nameInGraph, e), i.type !== e && this.setInputDataType(0, e)) : console.error("Can't change GraphOutput to type", e, this.graph, this.nameInGraph);
  }
  /** this is executed AFTER the property has changed */
  onPropertyChanged(e, i) {
    if (e == "name") {
      if (i == "" || i == this.nameInGraph || i == "enabled")
        return !1;
      this.graph ? this.nameInGraph ? this.graph.renameOutput(this.nameInGraph, i) : this.graph.addOutput(i, "" + this.properties.type, null) : console.error("[GraphOutput] missing graph!", e, i), this.nameWidget.value = i, this.nameInGraph = i;
    } else
      e == "type" && this.updateType();
  }
  getTitle() {
    return this.flags.collapsed ? this.properties.name : this.title;
  }
  onAction(e, i, n) {
    const s = this.getParentSubgraph();
    if (!s)
      return;
    const r = s.findOutputSlotIndexByName(this.properties.name);
    r == null || s.outputs[r] == null || s.triggerSlot(r, i);
  }
  onExecute() {
    const e = this.getInputData(0);
    this.graph.setOutputData(this.properties.name, e);
  }
  onRemoved() {
    this.nameInGraph && this.graph.removeOutput(this.nameInGraph);
  }
}
ee.slotLayout = {
  inputs: [
    { name: "", type: "" }
  ],
  outputs: []
};
u.registerNodeType({
  class: ee,
  title: "Output",
  desc: "Output of the graph",
  type: "graph/output",
  hide_in_node_lists: !0
});
var Ve = /* @__PURE__ */ ((t) => (t[t.STATUS_STOPPED = 1] = "STATUS_STOPPED", t[t.STATUS_RUNNING = 2] = "STATUS_RUNNING", t))(Ve || {});
const De = class {
  constructor(t) {
    this.supported_types = null, this.vars = {}, this.extra = {}, this.inputs = {}, this.outputs = {}, this.links = {}, this.list_of_graphcanvas = [], this._nodes = [], this._groups = [], this._nodes_by_id = {}, this._nodes_executable = null, this._nodes_in_order = [], this._version = -1, this._last_trigger_time = 0, this._is_subgraph = !1, this._subgraph_node = null, this.nodes_executing = [], this.nodes_actioning = [], this.nodes_executedAction = [], this.execution_timer_id = -1, this.execution_time = 0, this.errors_in_execution = !1, u.debug && console.log("Graph created"), this.list_of_graphcanvas = null, this.clear(), t && this.configure(t);
  }
  getSupportedTypes() {
    return this.supported_types || De.DEFAULT_SUPPORTED_TYPES;
  }
  /*
   * Gets the root graph above any subgraphs.
   */
  getRootGraph() {
    const t = Array.from(this.iterateParentGraphs()), e = t[t.length - 1];
    return e._is_subgraph ? null : e;
  }
  *iterateParentGraphs() {
    var e;
    let t = this;
    for (; t; )
      yield t, t = (e = t._subgraph_node) == null ? void 0 : e.graph;
  }
  /** Removes all nodes from this graph */
  clear() {
    if (this.stop(), this.status = 1, this.last_node_id = 0, this.last_link_id = 0, this._version = -1, this._nodes)
      for (var t = 0; t < this._nodes.length; ++t) {
        var e = this._nodes[t];
        e.onRemoved && e.onRemoved();
      }
    this._nodes = [], this._nodes_by_id = {}, this._nodes_in_order = [], this._nodes_executable = null, this._groups = [], this.links = {}, this.iteration = 0, this.config = {}, this.vars = {}, this.extra = {}, this.globaltime = 0, this.runningtime = 0, this.fixedtime = 0, this.fixedtime_lapse = 0.01, this.elapsed_time = 0.01, this.last_update_time = 0, this.starttime = 0, this.catch_errors = !0, this.nodes_executing = [], this.nodes_actioning = [], this.nodes_executedAction = [], this.inputs = {}, this.outputs = {}, this.change(), this.sendActionToCanvas("clear");
  }
  /** Attach Canvas to this graph */
  attachCanvas(t) {
    if (!(t instanceof N))
      throw "attachCanvas expects a LGraphCanvas instance";
    t.graph && t.graph != this && t.graph.detachCanvas(t), t.graph = this, this.list_of_graphcanvas || (this.list_of_graphcanvas = []), this.list_of_graphcanvas.push(t);
  }
  /** Detach Canvas to this graph */
  detachCanvas(t) {
    if (this.list_of_graphcanvas) {
      var e = this.list_of_graphcanvas.indexOf(t);
      e != -1 && (t.graph = null, this.list_of_graphcanvas.splice(e, 1));
    }
  }
  /**
   * Starts running this graph every interval milliseconds.
   * @param interval amount of milliseconds between executions, if 0 then it renders to the monitor refresh rate
   */
  start(t) {
    if (this.status != 2) {
      this.status = 2, this.onPlayEvent && this.onPlayEvent(), this.sendEventToAllNodes("onStart"), this.starttime = u.getTime(), this.last_update_time = this.starttime, t = t || 0;
      var e = this;
      if (t == 0 && typeof window < "u" && window.requestAnimationFrame) {
        let i = function() {
          e.execution_timer_id == -1 && (window.requestAnimationFrame(i), e.onBeforeStep && e.onBeforeStep(), e.runStep(1, !e.catch_errors), e.onAfterStep && e.onAfterStep());
        };
        this.execution_timer_id = -1, i();
      } else
        this.execution_timer_id = setInterval(function() {
          e.onBeforeStep && e.onBeforeStep(), e.runStep(1, !e.catch_errors), e.onAfterStep && e.onAfterStep();
        }, t);
    }
  }
  /** Stops the execution loop of the graph */
  stop() {
    this.status != 1 && (this.status = 1, this.onStopEvent && this.onStopEvent(), this.execution_timer_id != null && (this.execution_timer_id != -1 && clearInterval(this.execution_timer_id), this.execution_timer_id = null), this.sendEventToAllNodes("onStop"));
  }
  /**
   * Run N steps (cycles) of the graph
   * @param num number of steps to run, default is 1
   * @param do_not_catch_errors if you want to try/catch errors
   */
  runStep(t = 1, e = !1, i) {
    var n = u.getTime();
    this.globaltime = 1e-3 * (n - this.starttime);
    let s = this._nodes_executable ? this._nodes_executable : this._nodes;
    if (s) {
      if (i = i || s.length, e) {
        for (var r = 0; r < t; r++) {
          for (var o = 0; o < i; ++o) {
            var a = s[o];
            a.mode == J.ALWAYS && a.onExecute && a.doExecute();
          }
          this.fixedtime += this.fixedtime_lapse, this.onExecuteStep && this.onExecuteStep();
        }
        this.onAfterExecute && this.onAfterExecute();
      } else
        try {
          for (var r = 0; r < t; r++) {
            for (var o = 0; o < i; ++o) {
              var a = s[o];
              a.mode == J.ALWAYS && a.onExecute && a.onExecute(null, {});
            }
            this.fixedtime += this.fixedtime_lapse, this.onExecuteStep && this.onExecuteStep();
          }
          this.onAfterExecute && this.onAfterExecute(), this.errors_in_execution = !1;
        } catch (c) {
          if (this.errors_in_execution = !0, u.throw_errors)
            throw c;
          u.debug && console.log("Error during execution: " + c), this.stop();
        }
      var l = u.getTime(), h = l - n;
      h == 0 && (h = 1), this.execution_time = 1e-3 * h, this.globaltime += 1e-3 * h, this.iteration += 1, this.elapsed_time = (l - this.last_update_time) * 1e-3, this.last_update_time = l, this.nodes_executing = [], this.nodes_actioning = [], this.nodes_executedAction = [];
    }
  }
  /**
   * Updates the graph execution order according to relevance of the nodes (nodes with only outputs have more relevance than
   * nodes with only inputs.
   */
  updateExecutionOrder() {
    this._nodes_in_order = this.computeExecutionOrder(!1), this._nodes_executable = [];
    for (var t = 0; t < this._nodes_in_order.length; ++t)
      if (this._nodes_in_order[t].onExecute) {
        let e = this._nodes_in_order[t];
        this._nodes_executable.push(e);
      }
  }
  *computeExecutionOrderRecursive(t = !1, e) {
    for (const i of this.computeExecutionOrder(t, e))
      if (yield i, i.is(re))
        for (const n of i.subgraph.computeExecutionOrderRecursive(t, e))
          yield n;
  }
  /** This is more internal, it computes the executable nodes in order and returns it */
  computeExecutionOrder(t = !1, e) {
    for (var i = [], n = [], s = {}, r = {}, o = {}, a = 0, v = this._nodes.length; a < v; ++a) {
      var l = this._nodes[a];
      if (!(t && !l.onExecute)) {
        s[l.id] = l;
        var h = 0;
        if (l.inputs)
          for (var c = 0, g = l.inputs.length; c < g; c++)
            l.inputs[c] && l.inputs[c].link != null && (h += 1);
        h == 0 ? (n.push(l), e && (l._level = 1)) : (e && (l._level = 0), o[l.id] = h);
      }
    }
    for (; n.length != 0; ) {
      let y = n.shift();
      if (i.push(y), delete s[y.id], !!y.outputs)
        for (var a = 0; a < y.outputs.length; a++) {
          var d = y.outputs[a];
          if (!(d == null || d.links == null || d.links.length == 0))
            for (var c = 0; c < d.links.length; c++) {
              var _ = d.links[c], f = this.links[_];
              if (f && !r[f.id]) {
                var p = this.getNodeById(f.target_id);
                if (p == null) {
                  r[f.id] = !0;
                  continue;
                }
                e && (!p._level || p._level <= y._level) && (p._level = y._level + 1), r[f.id] = !0, o[p.id] -= 1, o[p.id] == 0 && n.push(p);
              }
            }
        }
    }
    for (let y of Object.keys(s).sort())
      i.push(s[y]);
    i.length != this._nodes.length && u.debug && console.warn("something went wrong, nodes missing");
    for (var v = i.length, a = 0; a < v; ++a)
      i[a].order = a;
    i = i.sort(function(y, m) {
      var E = y.constructor.priority || y.priority || 0, T = m.constructor.priority || m.priority || 0;
      return E == T ? y.order - m.order : E - T;
    });
    for (var a = 0; a < v; ++a)
      i[a].order = a;
    return i;
  }
  /**
   * Returns all the nodes that could affect this one (ancestors) by crawling all the inputs recursively.
   * It doesn't include the node itself
   * @return an array with all the LGraphNodes that affect this node, in order of execution
   */
  getAncestors(t) {
    for (var e = [], i = [t], n = {}; i.length; ) {
      var s = i.shift();
      if (s.inputs) {
        !n[s.id] && s != t && (n[s.id] = !0, e.push(s));
        for (var r = 0; r < s.inputs.length; ++r) {
          var o = s.getInputNode(r);
          o && e.indexOf(o) == -1 && i.push(o);
        }
      }
    }
    return e.sort(function(a, l) {
      return a.order - l.order;
    }), e;
  }
  /**
   * Positions every node in a more readable manner
   */
  arrange(t = 100, e = he.HORIZONTAL_LAYOUT) {
    const i = this.computeExecutionOrder(!1, !0), n = [];
    for (let r = 0; r < i.length; ++r) {
      const o = i[r], a = o._level || 1;
      n[a] || (n[a] = []), n[a].push(o);
    }
    let s = t;
    for (let r = 0; r < n.length; ++r) {
      const o = n[r];
      if (!o)
        continue;
      let a = 100, l = t + u.NODE_TITLE_HEIGHT;
      for (let h = 0; h < o.length; ++h) {
        const c = o[h];
        c.pos[0] = e == he.VERTICAL_LAYOUT ? l : s, c.pos[1] = e == he.VERTICAL_LAYOUT ? s : l;
        const g = e == he.VERTICAL_LAYOUT ? 1 : 0;
        c.size[g] > a && (a = c.size[g]);
        const d = e == he.VERTICAL_LAYOUT ? 0 : 1;
        l += c.size[d] + t + u.NODE_TITLE_HEIGHT;
      }
      s += a + t;
    }
    this.setDirtyCanvas(!0, !0);
  }
  /**
   * Returns the amount of time the graph has been running in milliseconds
   * @return number of milliseconds the graph has been running
   */
  getTime() {
    return this.globaltime;
  }
  /**
   * Returns the amount of time accumulated using the fixedtime_lapse var. This is used in context where the time increments should be constant
   * @return number of milliseconds the graph has been running
   */
  getFixedTime() {
    return this.fixedtime;
  }
  /**
   * Returns the amount of time it took to compute the latest iteration. Take into account that this number could be not correct
   * if the nodes are using graphical actions
   * @return number of milliseconds it took the last cycle
   */
  getElapsedTime() {
    return this.elapsed_time;
  }
  /**
   * Iterates all nodes in this graph *excluding* subgraphs.
   */
  *iterateNodesInOrder() {
    const t = this._nodes_in_order ? this._nodes_in_order : this._nodes || [];
    for (const e of t)
      yield e;
  }
  /**
   * Iterates all nodes in this graph and subgraphs.
   */
  *iterateNodesInOrderRecursive() {
    const t = this._nodes_in_order ? this._nodes_in_order : this._nodes || [];
    for (const e of t)
      if (yield e, e.subgraph != null)
        for (const i of e.subgraph.iterateNodesInOrderRecursive())
          yield i;
  }
  /**
   * Iterates all nodes in this graph *excluding* subgraphs.
   */
  *iterateNodesOfClass(t) {
    const e = t.__LITEGRAPH_TYPE__;
    if (e != null)
      for (const i of this.iterateNodesInOrder())
        i.type === e && (yield i);
  }
  /**
   * Iterates all nodes in this graph *excluding* subgraphs.
   */
  *iterateNodesOfClassRecursive(t) {
    const e = t.__LITEGRAPH_TYPE__;
    if (e != null)
      for (const i of this.iterateNodesInOrderRecursive())
        i.type === e && (yield i);
  }
  /**
   * Iterates all nodes in this graph *excluding* subgraphs.
   */
  *iterateNodesOfTypeRecursive(t) {
    for (const e of this.iterateNodesInOrderRecursive())
      e.type === t && (yield e);
  }
  /**
   * Sends an event to all the nodes, useful to trigger stuff
   * @param eventName the name of the event (function to be called)
   * @param params parameters in array format
   */
  sendEventToAllNodes(t, e = [], i = J.ALWAYS) {
    var n = this._nodes_in_order ? this._nodes_in_order : this._nodes;
    if (n)
      for (const s of this.iterateNodesInOrder()) {
        if (s.type === "basic/subgraph" && t != "onExecute") {
          s.mode == i && s.sendEventToAllNodes(t, e, i);
          continue;
        }
        !s[t] || s.mode != i || (e === void 0 ? s[t]() : e && e.constructor === Array ? s[t].apply(s, e) : s[t](e));
      }
  }
  sendActionToCanvas(t, e = []) {
    if (this.list_of_graphcanvas)
      for (var i = 0; i < this.list_of_graphcanvas.length; ++i) {
        var n = this.list_of_graphcanvas[i];
        n[t] && n[t].apply(n, e);
      }
  }
  addGroup(t) {
    return this._groups.push(t), this.setDirtyCanvas(!0), this.change(), t.graph = this, this._version++, t;
  }
  /**
   * Adds a new node instance to this graph
   * @param node the instance of the node
   */
  add(t, e = {}) {
    if (t.id != -1 && this._nodes_by_id[t.id] != null && (console.warn(
      "LiteGraph: there is already a node with this ID, changing it",
      t.id
    ), u.use_uuids ? t.id = ae() : t.id = ++this.last_node_id), e.pos && (isNaN(e.pos[0]) || isNaN(e.pos[1])))
      throw "LiteGraph: Node position contained NaN(s)!";
    if (this._nodes.length >= u.MAX_NUMBER_OF_NODES)
      throw "LiteGraph: max number of nodes in a graph reached";
    return u.use_uuids ? t.id || (t.id = ae()) : t.id == null || t.id == -1 ? t.id = ++this.last_node_id : this.last_node_id < t.id && (this.last_node_id = t.id), t.graph = this, this._version++, this._nodes.push(t), this._nodes_by_id[t.id] = t, e.pos && (t.pos = e.pos), t.onAdded && t.onAdded(this), this.config.align_to_grid && t.alignToGrid(), e.skipComputeOrder || this.updateExecutionOrder(), this.onNodeAdded && this.onNodeAdded(t, e), this.setDirtyCanvas(!0), this.change(), t;
  }
  /** Removes a node from the graph */
  remove(t, e = {}) {
    if (t instanceof me) {
      var i = this._groups.indexOf(t);
      i != -1 && this._groups.splice(i, 1), t.graph = null, this._version++, this.setDirtyCanvas(!0, !0), this.change();
      return;
    }
    if (this._nodes_by_id[t.id] != null && !t.ignore_remove) {
      if (this.beforeChange(), t.inputs)
        for (var n = 0; n < t.inputs.length; n++) {
          var s = t.inputs[n];
          s.link != null && t.disconnectInput(n);
        }
      if (t.outputs)
        for (var n = 0; n < t.outputs.length; n++) {
          let l = t.outputs[n];
          l.links != null && l.links.length && t.disconnectOutput(n);
        }
      if (t.onRemoved && t.onRemoved(e), t.graph = null, this._version++, this.list_of_graphcanvas)
        for (var n = 0; n < this.list_of_graphcanvas.length; ++n) {
          var r = this.list_of_graphcanvas[n];
          r.selected_nodes[t.id] && delete r.selected_nodes[t.id], r.node_dragged == t && (r.node_dragged = null);
        }
      var o = this._nodes.indexOf(t);
      o != -1 && this._nodes.splice(o, 1), delete this._nodes_by_id[t.id], this.onNodeRemoved && this.onNodeRemoved(t, e), this.sendActionToCanvas("checkPanels"), this.setDirtyCanvas(!0, !0), this.afterChange(), this.change(), this.updateExecutionOrder();
    }
  }
  /** Returns a node by its id. */
  getNodeById(t) {
    return t == null ? null : this._nodes_by_id[t];
  }
  /** Returns a node by its id. */
  getNodeByIdRecursive(t) {
    const e = this.getNodeById(t);
    if (e != null)
      return e;
    for (const i of this.iterateNodesOfClass(re)) {
      const n = i.subgraph.getNodeByIdRecursive(t);
      if (n)
        return n;
    }
    return null;
  }
  /**
   * Returns a list of nodes that matches a class
   * @param classObject the class itself (not an string)
   * @return a list with all the nodes of this type
   */
  findNodesByClass(t, e = []) {
    e.length = 0;
    for (const i of this.iterateNodesOfClass(t))
      e.push(i);
    return e;
  }
  /**
   * Returns a list of nodes that matches a type
   * @param type the name of the node type
   * @return a list with all the nodes of this type
   */
  findNodesByType(i, e = []) {
    var i = i.toLowerCase();
    e.length = 0;
    for (var n = 0, s = this._nodes.length; n < s; ++n)
      this._nodes[n].type.toLowerCase() == i && e.push(this._nodes[n]);
    return e;
  }
  /**
   * Returns a list of nodes that matches a class
   * @param classObject the class itself (not an string)
   * @return a list with all the nodes of this type
   */
  findNodesByClassRecursive(t, e = []) {
    e.length = 0;
    for (const i of this.iterateNodesOfClassRecursive(t))
      e.push(i);
    return e;
  }
  /**
   * Returns a list of nodes that matches a type
   * @param type the name of the node type
   * @return a list with all the nodes of this type
   */
  findNodesByTypeRecursive(i, e = []) {
    var i = i.toLowerCase();
    e.length = 0;
    for (const n of this.iterateNodesOfTypeRecursive(i))
      e.push(n);
    return e;
  }
  /**
   * Returns the first node that matches a name in its title
   * @param title the name of the node to search
   * @return the node or null
   */
  findNodeByTitle(t) {
    for (var e = 0, i = this._nodes.length; e < i; ++e)
      if (this._nodes[e].title == t)
        return this._nodes[e];
    return null;
  }
  /**
   * Returns a list of nodes that matches a name
   * @param title the name of the node to search
   * @return a list with all the nodes with this name
   */
  findNodesByTitle(t) {
    for (var e = [], i = 0, n = this._nodes.length; i < n; ++i)
      this._nodes[i].title == t && e.push(this._nodes[i]);
    return e;
  }
  /**
   * Returns the top-most node in this position of the canvas
   * @param x the x coordinate in canvas space
   * @param y the y coordinate in canvas space
   * @param nodesList a list with all the nodes to search from, by default is all the nodes in the graph
   * @return the node at this position or null
   */
  getNodeOnPos(t, e, i, n) {
    i = i || this._nodes;
    for (var s = null, r = i.length - 1; r >= 0; r--) {
      var o = i[r], a = o.titleMode == ne.NO_TITLE;
      if (o.isPointInside(t, e, n, a))
        return o;
    }
    return s;
  }
  /**
   * Returns the top-most group in that position
   * @param x the x coordinate in canvas space
   * @param y the y coordinate in canvas space
   * @return the group or null
   */
  getGroupOnPos(t, e) {
    for (var i = this._groups.length - 1; i >= 0; i--) {
      var n = this._groups[i];
      if (n.isPointInside(t, e, 2, !0))
        return n;
    }
    return null;
  }
  /**
   * Checks that the node type matches the node type registered, used when replacing a nodetype by a newer version during execution
   * this replaces the ones using the old version with the new version
   * @method checkNodeTypes
   */
  checkNodeTypes() {
    for (var t = !1, e = 0; e < this._nodes.length; e++) {
      var i = this._nodes[e], n = u.registered_node_types[i.type];
      if (i.constructor != n.class) {
        console.log("node being replaced by newer version: " + i.type);
        var s = u.createNode(i.type);
        t = !0, this._nodes[e] = s, s.configure(i.serialize()), s.graph = this, this._nodes_by_id[s.id] = s, i.inputs && (s.inputs = i.inputs.concat()), i.outputs && (s.outputs = i.outputs.concat());
      }
    }
    return this.updateExecutionOrder(), t;
  }
  // ********** GLOBALS *****************
  onAction(t, e, i = {}) {
    for (const n of this.iterateNodesOfClass(Q))
      if (n.properties.name == t) {
        n.actionDo(t, e, i);
        break;
      }
  }
  trigger(t, e) {
    this.onTrigger && this.onTrigger(t, e);
  }
  triggerSlot(t, e) {
    this.onTrigger && this.onTrigger(t, e);
  }
  /** Tell this graph it has a global graph input of this type */
  addInput(t, e, i) {
    var n = this.inputs[t];
    n || (this.beforeChange(), this.inputs[t] = { name: t, type: e, value: i }, this._version++, this.afterChange(), this.onInputAdded && this.onInputAdded(t, e, i), this.onInputsOutputsChange && this.onInputsOutputsChange());
  }
  /** Assign a data to the global graph input */
  setInputData(t, e) {
    var i = this.inputs[t];
    i && (i.value = e);
  }
  /** Returns the current value of a global graph input */
  getInputData(t) {
    var e = this.inputs[t];
    return e ? e.value : null;
  }
  /** Changes the name of a global graph input */
  renameInput(t, e) {
    if (e != t)
      return this.inputs[t] ? this.inputs[e] ? (console.error("there is already one input with that name"), !1) : (this.inputs[e] = this.inputs[t], delete this.inputs[t], this._version++, this.onInputRenamed && this.onInputRenamed(t, e), this.onInputsOutputsChange && this.onInputsOutputsChange(), !0) : !1;
  }
  /** Changes the type of a global graph input */
  changeInputType(t, e) {
    if (!this.inputs[t])
      return !1;
    if (this.inputs[t].type && String(this.inputs[t].type).toLowerCase() == String(e).toLowerCase())
      return;
    const i = this.inputs[t].type;
    return this.inputs[t].type = e, this._version++, this.onInputTypeChanged && this.onInputTypeChanged(t, i, e), !0;
  }
  /** Removes a global graph input */
  removeInput(t) {
    return this.inputs[t] ? (delete this.inputs[t], this._version++, this.onInputRemoved && this.onInputRemoved(t), this.onInputsOutputsChange && this.onInputsOutputsChange(), !0) : !1;
  }
  /** Creates a global graph output */
  addOutput(t, e, i) {
    this.outputs[t] = { name: t, type: e, value: i }, this._version++, this.onOutputAdded && this.onOutputAdded(t, e, i), this.onInputsOutputsChange && this.onInputsOutputsChange();
  }
  /** Assign a data to the global output */
  setOutputData(t, e) {
    var i = this.outputs[t];
    i && (i.value = e);
  }
  /** Returns the current value of a global graph output */
  getOutputData(t) {
    var e = this.outputs[t];
    return e ? e.value : null;
  }
  /** Renames a global graph output */
  renameOutput(t, e) {
    return this.outputs[t] ? this.outputs[e] ? (console.error("there is already one output with that name"), !1) : (this.outputs[e] = this.outputs[t], delete this.outputs[t], this._version++, this.onOutputRenamed && this.onOutputRenamed(t, e), this.onInputsOutputsChange && this.onInputsOutputsChange(), !0) : !1;
  }
  /** Changes the type of a global graph output */
  changeOutputType(t, e) {
    if (!this.outputs[t])
      return !1;
    if (this.outputs[t].type && String(this.outputs[t].type).toLowerCase() == String(e).toLowerCase())
      return;
    const i = this.outputs[t].type;
    return this.outputs[t].type = e, this._version++, this.onOutputTypeChanged && this.onOutputTypeChanged(t, i, e), !0;
  }
  /** Removes a global graph output */
  removeOutput(t) {
    return this.outputs[t] ? (delete this.outputs[t], this._version++, this.onOutputRemoved && this.onOutputRemoved(t), this.onInputsOutputsChange && this.onInputsOutputsChange(), !0) : !1;
  }
  /* TODO implement
      triggerInput(name: string, value: any): void {
          var nodes = this.findNodesByTitle(name);
          for (var i = 0; i < nodes.length; ++i) {
              nodes[i].onTrigger(value);
          }
      }
  
      setCallback(name: string, func: (...args: any[]) => any): void {
          var nodes = this.findNodesByTitle(name);
          for (var i = 0; i < nodes.length; ++i) {
              nodes[i].setTrigger(func);
          }
      }
      */
  /** used for undo, called before any change is made to the graph */
  beforeChange(t) {
    this.onBeforeChange && this.onBeforeChange(this, t), this.sendActionToCanvas("onBeforeChange", [this]);
  }
  /** used to resend actions, called after any change is made to the graph */
  afterChange(t) {
    this.onAfterChange && this.onAfterChange(this, t), this.sendActionToCanvas("onAfterChange", [this]);
  }
  connectionChange(t, e) {
    this.updateExecutionOrder(), this.onConnectionChange && this.onConnectionChange(t), this._version++, this.sendActionToCanvas("onConnectionChange");
  }
  /** returns if the graph is in live mode */
  isLive() {
    if (!this.list_of_graphcanvas)
      return !1;
    for (var t = 0; t < this.list_of_graphcanvas.length; ++t) {
      var e = this.list_of_graphcanvas[t];
      if (e.live_mode)
        return !0;
    }
    return !1;
  }
  /** clears the triggered slot animation in all links (stop visual animation) */
  clearTriggeredSlots() {
    for (var t in this.links) {
      var e = this.links[t];
      e && e._last_time && (e._last_time = 0);
    }
  }
  /* Called when something visually changed (not the graph!) */
  change() {
    u.debug && console.log("Graph changed"), this.sendActionToCanvas("setDirty", [!0, !0]), this.onChange && this.onChange(this);
  }
  setDirtyCanvas(t = !1, e = !1) {
    this.sendActionToCanvas("setDirty", [t, e]);
  }
  /** Destroys a link */
  removeLink(t) {
    var e = this.links[t];
    if (e) {
      var i = this.getNodeById(e.target_id);
      i && i.disconnectInput(e.target_slot);
    }
  }
  /** Creates a Object containing all the info about this graph, it can be serialized */
  serialize() {
    for (var t = [], e = 0, i = this._nodes.length; e < i; ++e)
      t.push(this._nodes[e].serialize());
    var n = [];
    for (const h in this.links) {
      var s = this.links[h];
      if (!s.serialize) {
        console.error(
          "weird LLink bug, link info is not a LLink but a regular object",
          s
        );
        var r = pe.configure(s);
        for (var o in s)
          r[o] = s[o];
        this.links[h] = r, s = r;
      }
      n.push(s.serialize());
    }
    for (var a = [], e = 0; e < this._groups.length; ++e)
      a.push(this._groups[e].serialize());
    var l = {
      last_node_id: this.last_node_id,
      last_link_id: this.last_link_id,
      nodes: t,
      links: n,
      groups: a,
      config: this.config,
      extra: this.extra,
      version: u.VERSION
    };
    return this.onSerialize && this.onSerialize(l), l;
  }
  /**
   * Configure a graph from a JSON string
   * @param data configure a graph from a JSON string
   * @returns if there was any error parsing
   */
  configure(t, e) {
    if (t) {
      e || this.clear();
      var i = t.nodes;
      if (t.links && t.links.constructor === Array) {
        for (var n = [], s = 0; s < t.links.length; ++s) {
          var r = t.links[s];
          if (!r) {
            console.warn("serialized graph link data contains errors, skipping.");
            continue;
          }
          var o = pe.configure(r);
          n[o.id] = o;
        }
        t.links = n;
      }
      for (const d in t)
        d == "nodes" || d == "groups" || (this[d] = t[d]);
      var a = !1;
      if (this._nodes = [], i) {
        for (var s = 0, l = i.length; s < l; ++s) {
          var h = i[s], c = u.createNode(h.type, h.title);
          c || (console.error(
            "Node not found or has errors: " + h.type
          ), c = new le(), c.last_serialization = h, c.has_errors = !0, a = !0), c.id = h.id, this.add(c, { addedBy: "configure", skipComputeOrder: !0 });
        }
        for (var s = 0, l = i.length; s < l; ++s) {
          var h = i[s], c = this.getNodeById(h.id);
          c && c.configure(h);
        }
      }
      if (this._groups.length = 0, t.groups)
        for (var s = 0; s < t.groups.length; ++s) {
          var g = new me();
          g.configure(t.groups[s]), this.addGroup(g);
        }
      return this.updateExecutionOrder(), this.extra = t.extra || {}, this.onConfigure && this.onConfigure(t), this._version++, this.setDirtyCanvas(!0, !0), a;
    }
  }
  load(t, e) {
    var i = this;
    if (t.constructor === File || t.constructor === Blob) {
      var n = new FileReader();
      n.addEventListener("load", function(r) {
        var o = JSON.parse(n.result);
        i.configure(o), e && e(o);
      }), n.readAsText(t);
      return;
    }
    var s = new XMLHttpRequest();
    s.open("GET", t, !0), s.send(null), s.onload = function(r) {
      if (s.status !== 200) {
        console.error("Error loading graph:", s.status, s.response);
        return;
      }
      var o = JSON.parse(s.response);
      i.configure(o), e && e(o);
    }, s.onerror = function(r) {
      console.error("Error loading graph:", r);
    };
  }
};
let Pe = De;
Pe.DEFAULT_SUPPORTED_TYPES = ["number", "string", "boolean"];
function Re(t) {
  const e = { nodeIDs: {}, linkIDs: {} };
  for (const i of t.nodes) {
    const n = i.id, s = ae();
    if (i.id = s, e.nodeIDs[n] || e.nodeIDs[s])
      throw new Error(`New/old node UUID wasn't unique in changed map! ${n} ${s}`);
    e.nodeIDs[n] = s, e.nodeIDs[s] = n;
  }
  for (const i of t.links) {
    const n = i[0], s = ae();
    if (i[0] = s, e.linkIDs[n] || e.linkIDs[s])
      throw new Error(`New/old link UUID wasn't unique in changed map! ${n} ${s}`);
    e.linkIDs[n] = s, e.linkIDs[s] = n;
    const r = i[1], o = i[3];
    if (!e.nodeIDs[r])
      throw new Error(`Old node UUID not found in mapping! ${r}`);
    if (i[1] = e.nodeIDs[r], !e.nodeIDs[o])
      throw new Error(`Old node UUID not found in mapping! ${o}`);
    i[3] = e.nodeIDs[o];
  }
  for (const i of t.nodes) {
    for (const n of i.inputs)
      n.link && (n.link = e.linkIDs[n.link]);
    for (const n of i.outputs)
      n.links && (n.links = n.links.map((s) => e.linkIDs[s]));
  }
  for (const i of t.nodes)
    if (i.type === "graph/subgraph") {
      const n = Re(i.subgraph);
      e.nodeIDs = { ...e.nodeIDs, ...n.nodeIDs }, e.linkIDs = { ...e.linkIDs, ...n.linkIDs };
    }
  return e;
}
function Xe(t, e) {
  for (const i of t.iterateNodesInOrderRecursive())
    i.onReassignID && i.onReassignID(e);
}
const Me = class extends le {
  constructor(t, e) {
    super(t), this.properties = {
      enabled: !0
    }, this.size = [140, 80], this.enabled = !0, this.subgraph = (e || Me.default_lgraph_factory)(), this.subgraph._subgraph_node = this, this.subgraph._is_subgraph = !0;
    const i = (n, s) => {
      const r = s.bind(this);
      return function(...o) {
        n == null || n.apply(this, o), r(...o);
      };
    };
    this.subgraph.onTrigger = i(this.subgraph.onTrigger, this.onSubgraphTrigger), this.subgraph.onNodeAdded = i(this.subgraph.onNodeAdded, this.onSubgraphNodeAdded), this.subgraph.onNodeRemoved = i(this.subgraph.onNodeRemoved, this.onSubgraphNodeRemoved), this.subgraph.onInputAdded = i(this.subgraph.onInputAdded, this.onSubgraphNewInput), this.subgraph.onInputRenamed = i(this.subgraph.onInputRenamed, this.onSubgraphRenamedInput), this.subgraph.onInputTypeChanged = i(this.subgraph.onInputTypeChanged, this.onSubgraphTypeChangeInput), this.subgraph.onInputRemoved = i(this.subgraph.onInputRemoved, this.onSubgraphRemovedInput), this.subgraph.onOutputAdded = i(this.subgraph.onOutputAdded, this.onSubgraphNewOutput), this.subgraph.onOutputRenamed = i(this.subgraph.onOutputRenamed, this.onSubgraphRenamedOutput), this.subgraph.onOutputTypeChanged = i(this.subgraph.onOutputTypeChanged, this.onSubgraphTypeChangeOutput), this.subgraph.onOutputRemoved = i(this.subgraph.onOutputRemoved, this.onSubgraphRemovedOutput);
  }
  // getRootGraph(): LGraph | null {
  //     const graphs = Array.from(this.iterateParentGraphs());
  //     const graph = graphs[graphs.length - 1]
  //     // console.warn(graph._is_subgraph)
  //     if (graph._is_subgraph)
  //         return null;
  //     return graph;
  // }
  *iterateParentGraphs() {
    var e;
    let t = this.graph;
    for (; t; )
      yield t, t = (e = t._subgraph_node) == null ? void 0 : e.graph;
  }
  onDblClick(t, e, i) {
    var n = this;
    setTimeout(function() {
      i.openSubgraph(n.subgraph);
    }, 10);
  }
  onAction(t, e, i) {
    const { originNode: n, link: s } = i;
    if (!n || !s)
      return;
    const r = s.target_slot;
    this.getInnerGraphInputByIndex(r).triggerSlot(0, e);
  }
  onExecute() {
    if (this.enabled = this.getInputOrProperty("enabled"), !!this.enabled) {
      if (this.inputs)
        for (var t = 0; t < this.inputs.length; t++) {
          var e = this.inputs[t], i = this.getInputData(t);
          this.subgraph.setInputData(e.name, i);
        }
      if (this.subgraph.runStep(), this.outputs)
        for (var t = 0; t < this.outputs.length; t++) {
          var n = this.outputs[t], i = this.subgraph.getOutputData(n.name);
          this.setOutputData(t, i);
        }
    }
  }
  sendEventToAllNodes(t, e, i) {
    this.enabled && this.subgraph.sendEventToAllNodes(t, e, i);
  }
  onDrawBackground(t, e, i, n) {
  }
  // override onMouseDown(e, localpos, graphcanvas)
  // {
  // 	var y = this.size[1] - LiteGraph.NODE_TITLE_HEIGHT + 0.5;
  // 	if(localpos[1] > y)
  // 	{
  // 		graphcanvas.showSubgraphPropertiesDialog(this);
  // 	}
  // }
  // override onMouseDown(e: MouseEventExt, localpos: Vector2, graphcanvas: LGraphCanvas): boolean | undefined {
  //     var y = this.size[1] - LiteGraph.NODE_TITLE_HEIGHT + 0.5;
  //     console.log(0)
  //     if (localpos[1] > y) {
  //         if (localpos[0] < this.size[0] / 2) {
  //             console.log(1)
  //             graphcanvas.showSubgraphPropertiesDialog(this);
  //         } else {
  //             console.log(2)
  //             graphcanvas.showSubgraphPropertiesDialogRight(this);
  //         }
  //     }
  //     return false;
  // }
  computeSize() {
    var t = this.inputs ? this.inputs.length : 0, e = this.outputs ? this.outputs.length : 0;
    return [200, Math.max(t, e) * u.NODE_SLOT_HEIGHT + u.NODE_SLOT_HEIGHT * 0.5];
  }
  //**** INPUTS ***********************************
  onSubgraphTrigger(t, e) {
  }
  onSubgraphNodeAdded(t, e) {
    var i, n;
    (i = this.graph) != null && i.onNodeAdded && (e.subgraphs || (e.subgraphs = []), e.subgraphs.push(this), (n = this.graph) == null || n.onNodeAdded(t, e));
  }
  onSubgraphNodeRemoved(t, e) {
    var i, n;
    (i = this.graph) != null && i.onNodeRemoved && (e.subgraphs || (e.subgraphs = []), e.subgraphs.push(this), (n = this.graph) == null || n.onNodeRemoved(t, e));
  }
  onSubgraphNewInput(t, e) {
    var i = this.findInputSlotIndexByName(t);
    i == -1 && this.addInput(t, e);
  }
  onSubgraphRenamedInput(t, e) {
    var i = this.findInputSlotIndexByName(t);
    if (i != -1) {
      var n = this.getInputInfo(i);
      n.name = e;
    }
  }
  onSubgraphTypeChangeInput(t, e, i) {
    var n = this.findInputSlotIndexByName(t);
    if (n != -1) {
      var s = this.getInputInfo(n);
      s.type = i;
    }
  }
  onSubgraphRemovedInput(t) {
    var e = this.findInputSlotIndexByName(t);
    e != -1 && this.removeInput(e);
  }
  //**** OUTPUTS ***********************************
  onSubgraphNewOutput(t, e) {
    var i = this.findOutputSlotIndexByName(t);
    i == -1 && this.addOutput(t, e);
  }
  onSubgraphRenamedOutput(t, e) {
    var i = this.findOutputSlotIndexByName(t);
    if (i != -1) {
      var n = this.getOutputInfo(i);
      n.name = e;
    }
  }
  onSubgraphTypeChangeOutput(t, e, i) {
    var n = this.findOutputSlotIndexByName(t);
    if (n != -1) {
      var s = this.getOutputInfo(n);
      s.type = i;
    }
  }
  onSubgraphRemovedOutput(t) {
    var e = this.findOutputSlotIndexByName(t);
    e != -1 && this.removeOutput(e);
  }
  // *****************************************************
  getExtraMenuOptions(t, e) {
    var i = this;
    return [
      {
        content: "Open",
        callback: function() {
          t.openSubgraph(i.subgraph);
        }
      }
    ];
  }
  onResize(t) {
    console.error("TEST subgraph resize");
  }
  serialize() {
    var t = le.prototype.serialize.call(this);
    return t.subgraph = this.subgraph.serialize(), t;
  }
  //no need to define node.configure, the default method detects node.subgraph and passes the object to node.subgraph.configure()
  onConfigure(t) {
    super.onConfigure && super.onConfigure(t), this.subgraph._is_subgraph = !0, this.subgraph._subgraph_node = this;
    for (const e of this.subgraph.iterateNodesInOrder())
      (e.is(Q) || e.is(ee)) && (e.properties.subgraphID = this.id);
  }
  onReassignID() {
    for (const t of this.subgraph.iterateNodesInOrder())
      (t.is(Q) || t.is(ee)) && (t.properties.subgraphID = this.id);
  }
  clone(t = { forNode: {} }) {
    var s, r, o, a;
    var e = u.createNode(this.type), i = this.serialize();
    let n = null;
    if (u.use_uuids) {
      const l = u.cloneObject(i.subgraph);
      n = Re(l), i.subgraph = l;
    }
    return delete i.id, delete i.inputs, delete i.outputs, e.configure(i), u.use_uuids && Xe(e.subgraph, n), (s = t.forNode)[r = this.id] || (s[r] = {}), t.forNode[this.id].subgraphNewIDMapping = n, (o = t.forNode)[a = e.id] || (o[a] = {}), t.forNode[e.id].subgraphNewIDMapping = n, e;
  }
  buildFromNodes(t) {
    var v, y;
    if (t = t.filter((m) => !m.is(Q) && !m.is(ee)), t.length === 0)
      return;
    const e = {}, i = {}, n = {}, s = t.reduce((m, E) => (m[E.id] = E, m), {});
    let r = Number.MAX_SAFE_INTEGER, o = 0, a = Number.MAX_SAFE_INTEGER, l = 0;
    for (const m of Object.values(t))
      r = Math.min(m.pos[0], r), o = Math.max(m.pos[0] + m.size[0], o), a = Math.min(m.pos[1], a), l = Math.max(m.pos[1] + m.size[1], l);
    const h = {};
    for (const m of t) {
      h[m.id] = m;
      for (let E = 0; E < m.inputs.length; E++) {
        const T = m.getInputLink(E);
        if (T) {
          const b = m.getConnectionPos(!0, E), O = m.getInputInfo(E), C = m.getInputNode(E);
          C && (h[C.id] = C), s[T.origin_id] != null ? n[T.id] = [T, b] : e[T.id] = [T, b, O.name];
        }
      }
      for (let E = 0; E < m.outputs.length; E++) {
        const T = m.getOutputLinks(E);
        for (const b of T) {
          const O = m.getConnectionPos(!1, E), C = m.getOutputInfo(E), M = m.graph.getNodeById(b.target_id);
          M && (h[M.id] = M), s[b.target_id] != null ? n[b.id] = [b, O] : i[b.id] = [b, O, C.name];
        }
      }
    }
    const c = Object.values(e), g = Object.values(i);
    c.sort((m, E) => m[1][1] - E[1][1]), g.sort((m, E) => m[1][1] - E[1][1]), u.debug && (console.debug("NODES", Object.keys(t)), console.debug("IN", Object.keys(e)), console.debug("OUT", Object.keys(i)), console.debug("INNER", Object.keys(n)));
    const d = {}, _ = {};
    for (const m of t) {
      const E = [m.pos[0] - r, m.pos[1] - a], T = m.id;
      m.graph.remove(m, { removedBy: "moveIntoSubgraph" }), this.subgraph.add(m, { addedBy: "moveIntoSubgraph", prevNodeID: T }), m.pos = E, h[T] = m, h[m.id] = m;
    }
    let f = 0, p = 0;
    for (const [m, E, T] of c) {
      let b = null;
      if (d[m.origin_id] && (b = d[m.origin_id][m.origin_slot]), !b && (b = this.addGraphInput(T, m.type, [-200, f]), f += b.innerNode.size[1] + u.NODE_SLOT_HEIGHT, !b)) {
        console.error("Failed creating subgraph output pair!", m);
        continue;
      }
      const O = h[m.origin_id], C = h[m.target_id];
      O.connect(m.origin_slot, this, b.outerInputIndex), b.innerNode.connect(0, C, m.target_slot), d[v = m.origin_id] || (d[v] = {}), d[m.origin_id][m.origin_slot] = b;
    }
    for (const [m, E, T] of g) {
      let b = null;
      if (_[m.target_id] && (b = _[m.target_id][m.target_slot]), !b && (b = this.addGraphOutput(T, m.type, [o - r + 200, p]), p += b.innerNode.size[1] + u.NODE_SLOT_HEIGHT, !b)) {
        console.error("Failed creating subgraph output pair!", m);
        continue;
      }
      const O = h[m.origin_id], C = h[m.target_id];
      O.connect(m.origin_slot, b.innerNode, 0), this.connect(b.outerOutputIndex, C, m.target_slot), _[y = m.target_id] || (_[y] = {}), _[m.target_id][m.origin_slot] = b;
    }
    for (const [m, E] of Object.values(n)) {
      const T = h[m.origin_id], b = h[m.target_id];
      T.connect(m.origin_slot, b, m.target_slot);
    }
  }
  addGraphInput(t, e, i) {
    t = this.getValidGraphInputName(t);
    const n = u.createNode(Q);
    if (n == null)
      return null;
    let s = e;
    e === I.EVENT ? s = I.ACTION : e === I.ACTION && (e = I.EVENT), console.warn("[Subgraph] addGraphInput", t, e, s, i), n.setProperty("name", t), n.setProperty("type", e), n.properties.subgraphID = this.id, this.subgraph.add(n);
    const r = n.computeSize();
    i && (n.pos = [i[0] - r[0] * 0.5, i[1] - r[1] * 0.5]), this.subgraph.addInput(t, s, null);
    const o = this.inputs.length - 1, a = this.inputs[o];
    return { innerNode: n, outerInput: a, outerInputIndex: o };
  }
  addGraphOutput(t, e, i) {
    t = this.getValidGraphOutputName(t);
    const n = u.createNode(ee);
    if (n == null)
      return null;
    let s = e;
    e === I.EVENT ? e = I.ACTION : e === I.ACTION && (s = I.EVENT), console.warn("[Subgraph] addGraphOutput", t, e, s, i), n.setProperty("name", t), n.setProperty("type", e), n.properties.subgraphID = this.id, this.subgraph.add(n);
    const r = n.computeSize();
    i && (n.pos = [i[0], i[1] - r[1] * 0.5]), this.subgraph.addOutput(t, s, null);
    const o = this.outputs.length - 1, a = this.outputs[o];
    return { innerNode: n, outerOutput: a, outerOutputIndex: o };
  }
  removeGraphInput(t) {
    if (this.findInputSlotIndexByName(t) == null) {
      console.error("[Subgraph] No input in slot!", t);
      return;
    }
    const i = this.subgraph.findNodesByClass(Q).filter((n) => n.properties.name === t);
    if (i.length > 0)
      for (const n of i)
        this.subgraph.remove(n);
    else {
      console.warn("[Subgraph] No GraphInputs found on input removal", t);
      const n = this.findInputSlotIndexByName(t);
      n !== -1 && this.removeInput(n);
    }
  }
  removeGraphOutput(t) {
    if (this.findOutputSlotIndexByName(t) == null) {
      console.error("[Subgraph] No output in slot!", t);
      return;
    }
    const i = this.subgraph.findNodesByClass(ee).filter((n) => n.properties.name === t);
    if (i.length > 0)
      for (const n of i)
        this.subgraph.remove(n);
    else {
      console.warn("[Subgraph] No GraphOutputs found on output removal", t);
      const n = this.findOutputSlotIndexByName(t);
      n !== -1 && this.removeOutput(n);
    }
  }
  getValidGraphInputName(t) {
    t || (t = "newInput");
    let e = t, i = this.getInnerGraphInput(e), n = 1;
    for (; i != null; )
      e = `${t}_${n++}`, i = this.getInnerGraphInput(e);
    return e;
  }
  getValidGraphOutputName(t) {
    t || (t = "newOutput");
    let e = t, i = this.getInnerGraphOutput(e), n = 1;
    for (; i != null; )
      e = `${t}_${n++}`, i = this.getInnerGraphOutput(e);
    return e;
  }
  getInnerGraphOutput(t) {
    return this.subgraph._nodes.find((i) => i.is(ee) && i.properties.name === t) || null;
  }
  getInnerGraphInput(t) {
    return this.subgraph._nodes.find((i) => i.is(Q) && i.properties.name === t) || null;
  }
  getInnerGraphOutputByIndex(t) {
    const e = this.getOutputInfo(t);
    return e ? this.getInnerGraphOutput(e.name) : null;
  }
  getInnerGraphInputByIndex(t) {
    const e = this.getInputInfo(t);
    return e ? this.getInnerGraphInput(e.name) : null;
  }
  moveNodesToParentGraph(t) {
    if (t = t.filter((f) => !f.is(Q) && !f.is(ee)), t.length === 0)
      return;
    const e = this, i = e.graph;
    let n = Number.MAX_SAFE_INTEGER, s = 0, r = Number.MAX_SAFE_INTEGER, o = 0;
    for (const f of Object.values(t))
      n = Math.min(f.pos[0], n), s = Math.max(f.pos[0] + f.size[0], s), r = Math.min(f.pos[1], r), o = Math.max(f.pos[1] + f.size[1], o);
    const a = s - n, l = o - r, h = e.pos[0] + e.size[0] / 2 - a / 2, c = e.pos[1] + e.size[1] / 2 - l / 2, g = {}, d = {};
    for (const [f, p] of t.entries())
      d[p.id] = p;
    for (const f of t)
      for (const p of f.iterateAllLinks()) {
        const v = p.target_id === f.id, y = f.getConnectionPos(v, v ? p.target_slot : p.origin_slot);
        d[p.origin_id] != null && d[p.target_id] != null && (g[p.id] = [p, y]);
      }
    const _ = {};
    for (const [f, p] of t.entries()) {
      const v = [p.pos[0] - n + h, p.pos[1] - r + c], y = p.id;
      p.graph.remove(p, { removedBy: "moveOutOfSubgraph" }), i.add(p, { addedBy: "moveOutOfSubgraph", prevNodeID: y }), p.pos = v, _[y] = p;
    }
    for (const [f, p] of Object.values(g)) {
      const v = d[f.origin_id], y = d[f.target_id];
      v.connect(f.origin_slot, y, f.target_slot);
    }
    return _;
  }
  convertNodesToSubgraphInputs(t) {
    var a;
    if (t = t.filter((l) => !l.is(Q) && !l.is(ee)), t.length === 0)
      return;
    const e = ve(t, (l) => l.id), i = [], n = {}, s = this.subgraph;
    for (const l of t)
      for (const h of l.iterateAllLinks()) {
        if (e[h.origin_id] == null)
          throw new Error("Can't convert to input with an origin link outward");
        if (e[h.target_id] == null) {
          i.push(h);
          const c = [0, 0];
          l.getConnectionPos(!1, h.target_slot, c), n[l.id] = [[l.pos[0], l.pos[1]], c];
        }
      }
    const r = this.moveNodesToParentGraph(t), o = {};
    for (const l of i) {
      const h = s.getNodeById(l.target_id), c = h.getInputInfo(l.target_slot);
      o[a = l.origin_id] || (o[a] = {});
      let g = o[l.origin_id][l.origin_slot];
      if (g == null) {
        const _ = this.getValidGraphInputName(c.name);
        g = this.addGraphInput(_, c.type), o[l.origin_id][l.origin_slot] = g;
        const [f, p] = n[l.origin_id], v = g.innerNode.pos, y = g.innerNode.computeSize(), m = g.innerNode.getConnectionPos(!0, 0), E = [g.innerNode.pos[0] - m[0], g.innerNode.pos[1] - m[1]], T = [p[0] + E[0] - y[0], p[1] + E[1]];
        console.warn("newPos", v, "size", g.innerNode.size, "connPos", p, "newConPos", m, "offset", E), g.innerNode.pos = T;
      }
      r[l.origin_id].connect(l.origin_slot, this, g.outerInputIndex), g.innerNode.connect(0, h, l.target_slot);
    }
  }
  convertNodesToSubgraphOutputs(t) {
    var a;
    if (t = t.filter((l) => !l.is(Q) && !l.is(ee)), t.length === 0)
      return;
    const e = ve(t, (l) => l.id), i = [], n = {}, s = this.subgraph;
    for (const l of t)
      for (const h of l.iterateAllLinks())
        if (e[h.origin_id] == null) {
          i.push(h);
          const c = [0, 0];
          l.getConnectionPos(!0, h.origin_slot, c), n[l.id] = [[l.pos[0], l.pos[1]], c];
        } else if (e[h.target_id] == null)
          throw new Error("Can't convert to input with an origin link outward");
    const r = this.moveNodesToParentGraph(t), o = {};
    for (const l of i) {
      const h = s.getNodeById(l.origin_id), c = h.getOutputInfo(l.origin_slot);
      o[a = l.target_id] || (o[a] = {});
      let g = o[l.target_id][l.target_slot];
      if (g == null) {
        g = this.addGraphOutput(name, c.type), o[l.target_id][l.target_slot] = g;
        const [_, f] = n[l.target_id], p = g.innerNode.getConnectionPos(!0, 0), v = [g.innerNode.pos[0] - p[0], g.innerNode.pos[1] - p[1]], y = [f[0] + v[0], f[1] + v[1]];
        g.innerNode.pos = y;
      }
      const d = r[l.target_id];
      h.connect(l.origin_slot, g.innerNode, 0), this.connect(g.outerOutputIndex, d, l.target_slot);
    }
  }
};
let re = Me;
re.default_lgraph_factory = () => new Pe();
re.slotLayout = {
  inputs: [],
  outputs: []
};
re.propertyLayout = [
  { name: "enabled", defaultValue: !0 }
];
re.optionalSlots = {
  outputs: [
    { name: "enabled", type: "boolean" }
  ]
};
u.registerNodeType({
  class: re,
  title: "Subgraph",
  desc: "Graph inside a node",
  title_color: "#334",
  type: "graph/subgraph"
});
class k {
  static onMenuCollapseAll() {
  }
  static onMenuNodeEdit() {
  }
  // refactor: there are different dialogs, some uses createDialog some dont
  prompt(e = "", i, n, s, r = !1, o = null) {
    var a = this, l = document.createElement("div");
    if (l.is_modified = !1, l.className = "graphdialog rounded", r) {
      let b = 5;
      typeof i != "string" && (i = JSON.stringify(i, null, 2));
      const O = (i.match(/\n/g) || "").length + 1;
      b = Te(O, 5, 10), l.innerHTML = `
<span class='name'></span>
<textarea autofocus rows='${b}' cols='30' class='value'></textarea>
<button class='rounded'>OK</button>
`;
    } else
      l.innerHTML = `
<span class='name'></span>
<input autofocus type='text' class='value'/>
<button class='rounded'>OK</button>`;
    l.close = function() {
      a.prompt_box = null, l.parentNode && l.parentNode.removeChild(l);
    };
    var h = N.active_canvas, c = h.canvas;
    c.parentNode.appendChild(l), this.ds.scale > 1 && (l.style.transform = "scale(" + this.ds.scale + ")");
    var g = null, d = 0;
    u.pointerListenerAdd(l, "leave", function(b) {
      d || u.dialog_close_on_mouse_leave && !l.is_modified && u.dialog_close_on_mouse_leave && b.buttons === 0 && (g = setTimeout(l.close, u.dialog_close_on_mouse_leave_delay));
    }), u.pointerListenerAdd(l, "enter", function(b) {
      u.dialog_close_on_mouse_leave && g && clearTimeout(g);
    });
    var _ = l.querySelectorAll("select");
    _ && _.forEach(function(b) {
      b.addEventListener("click", function(O) {
        d++;
      }), b.addEventListener("blur", function(O) {
        d = 0;
      }), b.addEventListener("change", function(O) {
        d = -1;
      });
    }), a.prompt_box && a.prompt_box.close(), a.prompt_box = l;
    var f = l.querySelector(".name");
    f.innerText = e;
    let p = l.querySelector(".value");
    p.value = i;
    var v = p;
    if (v.addEventListener("keydown", function(b) {
      if (l.is_modified = !0, b.keyCode == 27)
        l.close();
      else if (b.keyCode == 13 && b.target instanceof Element && b.target.localName != "textarea")
        n && n(this.value), l.close();
      else
        return;
      b.preventDefault(), b.stopPropagation();
    }), o)
      for (const [b, O] of Object.entries(o))
        v.style[b] = O;
    var y = l.querySelector("button");
    y.addEventListener("click", function(b) {
      n && n(v.value), a.setDirty(!0), l.close();
    });
    var m = c.getBoundingClientRect(), E = -20, T = -20;
    return m && (E -= m.left, T -= m.top), s ? (l.style.left = s.clientX + "px", l.style.top = s.clientY + "px") : (l.style.left = c.width * 0.5 + E + "px", l.style.top = c.height * 0.5 + T + "px"), console.warn(l.style.left, l.style.top), console.warn(s), setTimeout(function() {
      v.focus();
    }, 10), Ee(l), l;
  }
  showSearchBox(e, i = {}) {
    var n = {
      slotFrom: null,
      node_from: null,
      node_to: null,
      do_type_filter: u.search_filter_enabled,
      type_filter_in: null,
      type_filter_out: null,
      show_general_if_none_on_typefilter: !0,
      show_general_after_typefiltered: !0,
      hide_on_mouse_leave: u.search_hide_on_mouse_leave,
      show_all_if_empty: !0,
      show_all_on_open: u.search_show_all_on_open
    };
    i = Object.assign(n, i);
    var s = this, r = N.active_canvas, o = r.canvas, a = o.ownerDocument || document;
    let l = e;
    var h = document.createElement("div");
    h.className = "litegraph litesearchbox graphdialog rounded", h.innerHTML = "<span class='name'>Search</span> <input autofocus type='text' class='value rounded'/>", i.do_type_filter && (h.innerHTML += "<select class='slot_in_type_filter'><option value=''></option></select>", h.innerHTML += "<select class='slot_out_type_filter'><option value=''></option></select>"), h.innerHTML += "<div class='helper'></div>", a.fullscreenElement ? a.fullscreenElement.appendChild(h) : (a.body.appendChild(h), a.body.style.overflow = "hidden");
    let c = null, g = null;
    if (i.do_type_filter && (c = h.querySelector(".slot_in_type_filter"), g = h.querySelector(".slot_out_type_filter")), h.close = function() {
      s.search_box = null, this.blur(), o.focus(), a.body.style.overflow = "", setTimeout(function() {
        s.canvas.focus();
      }, 20), h.parentNode && h.parentNode.removeChild(h);
    }, this.ds.scale > 1 && (h.style.transform = "scale(" + this.ds.scale + ")"), i.hide_on_mouse_leave) {
      var d = 0, _ = null;
      u.pointerListenerAdd(h, "enter", function(w) {
        _ && (clearTimeout(_), _ = null);
      }), u.pointerListenerAdd(h, "leave", function(w) {
        d || (_ = setTimeout(function() {
          h.close();
        }, 500));
      }), i.do_type_filter && (c.addEventListener("click", function(w) {
        d++;
      }), c.addEventListener("blur", function(w) {
        d = 0;
      }), c.addEventListener("change", function(w) {
        d = -1;
      }), g.addEventListener("click", function(w) {
        d++;
      }), g.addEventListener("blur", function(w) {
        d = 0;
      }), g.addEventListener("change", function(w) {
        d = -1;
      }));
    }
    s.search_box && s.search_box.close(), s.search_box = h;
    var f = h.querySelector(".helper"), p = null, v = null, y = null;
    const m = (w) => {
      if (w)
        if (s.onSearchBoxSelection)
          s.onSearchBoxSelection(w, l, r);
        else {
          var R = u.searchbox_extras[w.toLowerCase()];
          R && (w = R.type), r.graph.beforeChange();
          var F = u.createNode(w);
          if (F && (F.pos = r.convertEventToCanvasOffset(
            l
          ), r.graph.add(F)), R && R.data) {
            if (R.data.properties)
              for (var X in R.data.properties)
                F.addProperty("" + X, R.data.properties[X]);
            if (R.data.inputs) {
              F.inputs = [];
              for (var X in R.data.inputs)
                F.addInput(
                  R.data.inputs[X][0],
                  R.data.inputs[X][1]
                );
            }
            if (R.data.outputs) {
              F.outputs = [];
              for (var X in R.data.outputs)
                F.addOutput(
                  R.data.outputs[X][0],
                  R.data.outputs[X][1]
                );
            }
            R.data.title && (F.title = R.data.title), R.data.json && F.configure(R.data.json);
          }
          if (i.node_from) {
            var B = null;
            switch (typeof i.slotFrom) {
              case "string":
                B = i.node_from.findOutputSlotIndexByName(i.slotFrom);
                break;
              case "object":
                i.slotFrom.name ? B = i.node_from.findOutputSlotIndexByName(i.slotFrom.name) : B = -1, B == -1 && typeof i.slotFrom.slot_index < "u" && (B = i.slotFrom.slot_index);
                break;
              case "number":
                B = i.slotFrom;
                break;
              default:
                B = 0;
            }
            B = B, typeof i.node_from.outputs[B] !== void 0 && B !== null && B > -1 && i.node_from.connectByTypeInput(B, F, i.node_from.outputs[B].type);
          }
          if (i.node_to) {
            var B = null;
            switch (typeof i.slotFrom) {
              case "string":
                B = i.node_to.findInputSlotIndexByName(i.slotFrom);
                break;
              case "number":
                B = i.slotFrom;
                break;
              default:
                B = 0;
            }
            typeof i.node_to.inputs[B] !== void 0 && B !== null && B > -1 && i.node_to.connectByTypeOutput(B, F, i.node_to.inputs[B].type);
          }
          r.graph.afterChange();
        }
      h.close();
    }, E = (w) => {
      var R = y;
      y && y.classList.remove("selected"), y ? (y = w ? y.nextSibling : y.previousSibling, y || (y = R)) : y = w ? f.childNodes[0] : f.childNodes[f.childNodes.length], y && (y.classList.add("selected"), y.scrollIntoView({ block: "end", behavior: "smooth" }));
    }, T = (w, R, F, X, B, ue = {}) => {
      const te = Object.assign({
        skipFilter: !1,
        inTypeOverride: null,
        outTypeOverride: null
      }, ue), fe = u.registered_node_types[w];
      if (fe.hide_in_node_lists || R && fe.filter != R || (!i.show_all_if_empty || F) && w.toLowerCase().indexOf(F) === -1)
        return !1;
      if (i.do_type_filter && !te.skipFilter) {
        const Y = w;
        let H = X == null ? void 0 : X.value;
        if (te.inTypeOverride != null && (H = te.inTypeOverride), X && H && u.registered_slot_in_types[H] && u.registered_slot_in_types[H].nodes) {
          var ie = u.registered_slot_in_types[H].nodes.includes(Y);
          if (ie === !1)
            return !1;
        }
        if (H = B == null ? void 0 : B.value, te.outTypeOverride != null && (H = te.outTypeOverride), B && H && u.registered_slot_out_types[H] && u.registered_slot_out_types[H].nodes) {
          var ie = u.registered_slot_out_types[H].nodes.includes(Y);
          if (ie === !1)
            return !1;
        }
      }
      return !0;
    }, b = () => {
      v = null;
      var w = O.value;
      if (p = null, f.innerHTML = "", !w && !i.show_all_if_empty)
        return;
      if (s.onSearchBox) {
        var R = s.onSearchBox(f, w, r);
        if (R)
          for (var F = 0; F < R.length; ++F)
            ie(R[F]);
      } else {
        var X = 0;
        w = w.toLowerCase();
        var B = r.filter || r.graph.filter;
        let Y, H;
        i.do_type_filter && s.search_box ? (Y = s.search_box.querySelector(".slot_in_type_filter"), H = s.search_box.querySelector(".slot_out_type_filter")) : (Y = null, H = null);
        for (const V in u.searchbox_extras) {
          var ue = u.searchbox_extras[V];
          if (!((!i.show_all_if_empty || w) && ue.desc.toLowerCase().indexOf(w) === -1)) {
            var ye = u.registered_node_types[ue.type];
            if (!(ye && ye.filter != B) && T(ue.type, B, w, Y, H) && (ie(ue.desc, "searchbox_extra"), N.search_limit !== -1 && X++ > N.search_limit))
              break;
          }
        }
        var te = null;
        if (Array.prototype.filter)
          var fe = Object.keys(u.registered_node_types), te = fe.filter((q) => T(q, B, w, Y, H));
        else {
          te = [];
          for (const V in u.registered_node_types)
            T(V, B, w, Y, H) && te.push(V);
        }
        for (var F = 0; F < te.length && (ie(te[F]), !(N.search_limit !== -1 && X++ > N.search_limit)); F++)
          ;
        if (i.show_general_after_typefiltered && (Y != null && Y.value || H != null && H.value)) {
          let V = [];
          for (const q in u.registered_node_types)
            T(q, B, w, Y, H, { inTypeOverride: Y && Y.value ? "*" : null, outTypeOverride: H && H.value ? "*" : null }) && V.push(q);
          for (let q = 0; q < V.length && (ie(V[q], "generic_type"), !(N.search_limit !== -1 && X++ > N.search_limit)); q++)
            ;
        }
        if ((Y != null && Y.value || H != null && H.value) && (f == null ? void 0 : f.childNodes.length) == 0 && i.show_general_if_none_on_typefilter) {
          let V = [];
          for (const q in u.registered_node_types)
            T(q, B, w, Y, H, { skipFilter: !0 }) && V.push(q);
          for (let q = 0; q < V.length && (ie(V[q], "not_in_filter"), !(N.search_limit !== -1 && X++ > N.search_limit)); q++)
            ;
        }
      }
      function ie(Y, H) {
        var V = document.createElement("div");
        p || (p = Y), V.innerText = Y, V.dataset.type = escape(Y), V.className = "litegraph lite-search-item", H && (V.className += " " + H), V.addEventListener("click", function(q) {
          m(unescape(this.dataset.type));
        }), f.appendChild(V);
      }
    };
    var O = h.querySelector("input");
    if (O && (O.addEventListener("blur", function(w) {
      this.focus();
    }), O.addEventListener("keydown", function(w) {
      if (w.keyCode == 38)
        E(!1);
      else if (w.keyCode == 40)
        E(!0);
      else if (w.keyCode == 27)
        h.close();
      else if (w.keyCode == 13)
        y ? m(y.innerHTML) : p ? m(p) : h.close();
      else {
        v && clearInterval(v), v = setTimeout(b, u.search_box_refresh_interval_ms);
        return;
      }
      return w.preventDefault(), w.stopPropagation(), w.stopImmediatePropagation(), !0;
    })), i.do_type_filter) {
      if (c) {
        var C = u.slot_types_in, M = C.length;
        (i.type_filter_in == I.EVENT || i.type_filter_in == I.ACTION) && (i.type_filter_in = "_event_");
        for (var A = 0; A < M; A++) {
          var S = document.createElement("option");
          S.value = C[A], S.innerHTML = C[A], c.appendChild(S), i.type_filter_in !== null && (i.type_filter_in + "").toLowerCase() == (C[A] + "").toLowerCase() && (S.selected = !0);
        }
        c.addEventListener("change", b);
      }
      if (g) {
        var C = u.slot_types_out, M = C.length;
        (i.type_filter_out == I.EVENT || i.type_filter_out == I.ACTION) && (i.type_filter_out = "_event_");
        for (var A = 0; A < M; A++) {
          var S = document.createElement("option");
          S.value = C[A], S.innerHTML = C[A], g.appendChild(S), i.type_filter_out !== null && (i.type_filter_out + "").toLowerCase() == (C[A] + "").toLowerCase() && (S.selected = !0);
        }
        g.addEventListener("change", b);
      }
    }
    var G = o.getBoundingClientRect(), W = (l ? l.clientX : G.left + G.width * 0.5) - 80, Z = (l ? l.clientY : G.top + G.height * 0.5) - 20;
    return h.style.left = W + "px", h.style.top = Z + "px", l.layerY > G.height - 200 && (f.style.maxHeight = G.height - l.layerY - 20 + "px"), O.focus(), i.show_all_on_open && b(), h;
  }
  showShowNodePanel(e) {
    this.closePanels();
    var i = this.getCanvasWindow(), n = this, s = this.createPanel(e.title || "", {
      closable: !0,
      window: i,
      onOpen: function() {
      },
      onClose: function() {
        n.node_panel = null;
      }
    });
    n.node_panel = s, s.id = "node-panel", s.node = e, s.classList.add("settings");
    function r() {
      s.content.innerHTML = "", s.addHTML("<span class='node_type'>" + e.type + "</span><span class='node_desc'>" + (e.constructor.desc || "") + "</span><span class='separator'></span>"), s.addHTML("<h3>Properties</h3>");
      var o = function(g, d) {
        switch (n.graph.beforeChange(e), g) {
          case "Title":
            e.title = d;
            break;
          case "Mode":
            var _ = Object.values(oe).indexOf(d);
            _ >= J.ALWAYS && oe[_] ? e.changeMode(_) : console.warn("unexpected mode: " + d);
            break;
          case "Color":
            N.node_colors[d] ? (e.color = N.node_colors[d].color, e.bgcolor = N.node_colors[d].bgcolor) : console.warn("unexpected color: " + d);
            break;
          default:
            e.setProperty(g, d);
            break;
        }
        n.graph.afterChange(), n.dirty_canvas = !0;
      };
      s.addWidget("string", "Title", e.title, {}, o), s.addWidget("combo", "Mode", oe[e.mode], { values: oe }, o);
      var a = "";
      e.color !== void 0 && (a = Object.keys(N.node_colors).filter(function(g) {
        return N.node_colors[g].color == e.color;
      })[0]), s.addWidget("combo", "Color", a, { values: Object.keys(N.node_colors) }, o);
      for (var l in e.properties) {
        var h = e.properties[l], c = e.getPropertyInfo(l);
        c.type, !(e.onAddPropertyToPanel && e.onAddPropertyToPanel(l, s)) && s.addWidget(c.widget || c.type, l, h, c, o);
      }
      s.addSeparator(), e.onShowCustomPanelInfo && e.onShowCustomPanelInfo(s), s.footer.innerHTML = "", s.addButton("Delete", function() {
        e.block_delete || (e.graph.remove(e), s.close());
      }).classList.add("delete");
    }
    s.inner_showCodePad = function(o) {
      s.classList.remove("settings"), s.classList.add("centered"), s.alt_content.innerHTML = "<textarea class='code'></textarea>";
      var a = s.alt_content.querySelector("textarea"), l = function() {
        s.toggleAltContent(!1), s.toggleFooterVisibility(!0), a.parentNode.removeChild(a), s.classList.add("settings"), s.classList.remove("centered"), r();
      };
      a.value = e.properties[o], a.addEventListener("keydown", function(g) {
        g.code == "Enter" && g.ctrlKey && (e.setProperty(o, a.value), l());
      }), s.toggleAltContent(!0), s.toggleFooterVisibility(!1), a.style.height = "calc(100% - 40px)";
      var h = s.addButton("Assign", function() {
        e.setProperty(o, a.value), l();
      });
      s.alt_content.appendChild(h);
      var c = s.addButton("Close", l);
      c.style.float = "right", s.alt_content.appendChild(c);
    }, r(), this.canvas.parentNode.appendChild(s);
  }
  showSubgraphPropertiesDialog(e) {
    console.log("showing subgraph properties dialog");
    var i = this.canvas.parentNode.querySelector(".subgraph_dialog");
    i && i.close();
    var n = this.createPanel("Subgraph Inputs", { closable: !0, width: 500 });
    n.node = e, n.classList.add("subgraph_dialog");
    const s = e;
    var r = s.subgraph;
    if (!r) {
      console.warn("subnode without subgraph!");
      return;
    }
    function o() {
      if (n.clear(), e.inputs)
        for (var p = 0; p < e.inputs.length; ++p) {
          var v = e.inputs[p];
          if (v.not_subgraph_input)
            continue;
          var y = `
<button class="delete">&#10005;</button>
<button class="move_up">↑</button>
<button class="move_down">↓</button>
<span class='bullet_icon'></span>
<span class='name'></span>
<span class='type'></span>`, m = n.addHTML(y, "subgraph_property");
          m.dataset.name = v.name, m.dataset.slot = "" + p, m.querySelector(".name").innerText = v.name, m.querySelector(".type").innerText = $(v.type), m.querySelector(".delete").addEventListener("click", function(b) {
            const O = this.parentNode.dataset.name;
            s.removeGraphInput(O), o();
          });
          const E = m.querySelector(".move_up");
          E.disabled = p <= 0, E.addEventListener("click", function(b) {
            const O = +this.parentNode.dataset.slot;
            O < 0 || (s.moveInput(O, O - 1), o());
          });
          const T = m.querySelector(".move_down");
          T.disabled = p >= e.inputs.length - 1, T.addEventListener("click", function(b) {
            const O = +this.parentNode.dataset.slot;
            O > e.inputs.length - 1 || (s.moveInput(O, O + 1), o());
          });
        }
    }
    var a = `
+
<span class='label'>Name</span>
<input class='name'/>
<span class='label'>Type</span>
<select class='type'></select>
<button>+</button>`, l = n.addHTML(a, "subgraph_property extra", !0);
    const h = l.querySelector(".name"), c = l.querySelector(".type"), g = l.querySelector("button");
    for (const p of we()) {
      var d = document.createElement("option");
      d.value = p, d.innerHTML = $(p), c.appendChild(d), p === "*" && (d.selected = !0);
    }
    const _ = () => {
      const p = h.value;
      let v = c.value;
      v === "-1" ? v = I.ACTION : v === "-2" && (v = I.EVENT), !(!p || e.findInputSlotIndexByName(p) != -1) && (this.addGraphInputNode(e, p, v), h.value = "", c.value = "", o(), h.focus());
    }, f = (p) => {
      p.keyCode == 13 ? (_(), p.preventDefault()) : p.keyCode == 27 && (n.close(), p.preventDefault());
    };
    return g.addEventListener("click", _), h.addEventListener("keydown", f), c.addEventListener("keydown", f), o(), this.canvas.parentNode.appendChild(n), h.focus(), n;
  }
  showSubgraphPropertiesDialogRight(e) {
    var i = this.canvas.parentNode.querySelector(".subgraph_dialog");
    i && i.close();
    var n = this.createPanel("Subgraph Outputs", { closable: !0, width: 500 });
    n.node = e, n.classList.add("subgraph_dialog");
    const s = e;
    if (!s.subgraph) {
      console.warn("subnode without subgraph!");
      return;
    }
    function o() {
      if (n.clear(), e.outputs)
        for (var p = 0; p < e.outputs.length; ++p) {
          var v = e.outputs[p];
          if (v.not_subgraph_output)
            continue;
          var y = `
<button>&#10005;</button>
<button class="move_up">↑</button>
<button class="move_down">↓</button>
<span class='bullet_icon'></span>
<span class='name'></span>
<span class='type'></span>`, m = n.addHTML(y, "subgraph_property");
          m.dataset.name = v.name, m.dataset.slot = "" + p, m.querySelector(".name").innerText = v.name, m.querySelector(".type").innerText = $(v.type), m.querySelector("button").addEventListener("click", function(b) {
            const O = this.parentNode.dataset.name;
            s.removeGraphOutput(O), o();
          });
          const E = m.querySelector(".move_up");
          E.disabled = p <= 0, E.addEventListener("click", function(b) {
            const O = +this.parentNode.dataset.slot;
            O < 0 || (s.moveOutput(O, O - 1), o());
          });
          const T = m.querySelector(".move_down");
          T.disabled = p >= e.outputs.length - 1, T.addEventListener("click", function(b) {
            const O = +this.parentNode.dataset.slot;
            O > e.outputs.length - 1 || (s.moveOutput(O, O + 1), o());
          });
        }
    }
    var a = `
+
<span class='label'>Name</span>
<input class='name'/>
<span class='label'>Type</span>
<select class='type'></select>
<button>+</button>`, l = n.addHTML(a, "subgraph_property extra", !0);
    const h = l.querySelector(".name"), c = l.querySelector(".type"), g = l.querySelector("button");
    for (const p of Le()) {
      var d = document.createElement("option");
      d.value = p, d.innerHTML = $(p), c.appendChild(d), p === "*" && (d.selected = !0);
    }
    const _ = () => {
      const p = h.value;
      let v = c.value;
      v === "-1" ? v = I.ACTION : v === "-2" && (v = I.EVENT), !(!p || e.findOutputSlotIndexByName(p) != -1) && (this.addGraphOutputNode(e, p, v), h.value = "", c.value = "", o(), h.focus());
    }, f = (p) => {
      p.keyCode == 13 ? (_(), p.preventDefault()) : p.keyCode == 27 && (n.close(), p.preventDefault());
    };
    return g.addEventListener("click", _), h.addEventListener("keydown", f), c.addEventListener("keydown", f), o(), this.canvas.parentNode.appendChild(n), h.focus(), n;
  }
  showConnectionMenu(e = {}) {
    var i = e.nodeFrom && e.slotFrom, n = !i && e.nodeTo && e.slotTo;
    if (!i && !n)
      return console.warn("No data passed to showConnectionMenu"), !1;
    var s = i ? e.nodeFrom : e.nodeTo;
    const r = i ? e.slotFrom : e.slotTo;
    let o;
    var a = null;
    switch (typeof r) {
      case "string":
        a = i ? s.findOutputSlotIndexByName(r) : s.findInputSlotIndexByName(r), o = i ? s.outputs[r] : s.inputs[r];
        break;
      case "object":
        o = r, a = i ? s.findOutputSlotIndexByName(o.name) : s.findInputSlotIndexByName(o.name);
        break;
      case "number":
        a = r, o = i ? s.outputs[a] : s.inputs[a];
        break;
      default:
        return console.error("Can't get slot information", r), !1;
    }
    var l = [{ content: "Add Node" }, j.SEPARATOR];
    s.graph._is_subgraph && (i ? l.push({ content: "Add Subgraph Output" }) : l.push({ content: "Add Subgraph Input" }), l.push(j.SEPARATOR)), this.allow_searchbox && (l.push({ content: "Search" }), l.push(j.SEPARATOR));
    var h = o.type == I.EVENT ? "_event_" : o.type, c = i ? u.slot_types_default_out : u.slot_types_default_in;
    const g = c[h];
    if (console.warn("FROMSL", c, g), c && c[h])
      if (Array.isArray(g))
        for (var d of g) {
          const m = typeof d == "string" ? d : (d == null ? void 0 : d.title) || (d == null ? void 0 : d.node);
          l.push({ content: m, value: d });
        }
      else
        throw new Error(`Invalid default slot specifier, must be an array: ${g}`);
    const _ = (m) => {
      const E = s.graph._subgraph_node, T = [m.canvasX, m.canvasY];
      E.addGraphInput(o.name, o.type, T).innerNode.connect(0, s, a);
    }, f = (m) => {
      const E = s.graph._subgraph_node, T = [m.canvasX, m.canvasY], b = E.addGraphOutput(o.name, o.type, T);
      s.connect(a, b.innerNode, 0);
    }, p = (m) => {
      const E = Object.assign(e, {
        position: [e.e.canvasX, e.e.canvasY]
      });
      var T = this.createDefaultNodeForSlot(m, E);
      T ? console.log("node created", m) : console.error("node not in defaults", m);
    }, v = (m, E, T) => {
      switch (m.content) {
        case "Add Node":
          N.onMenuAdd(m, E, T, y, function(b) {
            i ? e.nodeFrom.connectByTypeInput(a, b, h) : e.nodeTo.connectByTypeOutput(a, b, h);
          });
          break;
        case "Add Subgraph Input":
          _(this.adjustMouseEvent(T));
          break;
        case "Add Subgraph Output":
          f(this.adjustMouseEvent(T));
          break;
        case "Search":
          i ? this.showSearchBox(T, { node_from: e.nodeFrom, slotFrom: o, type_filter_in: h }) : this.showSearchBox(T, { node_to: e.nodeTo, slotFrom: o, type_filter_out: h });
          break;
        default:
          p(m.value);
          break;
      }
    };
    var y = new x(l, {
      event: e.e,
      title: (o && o.name != "" ? o.name + (h ? " | " : "") : "") + (o && h ? h : ""),
      callback: v
    });
    return !1;
  }
  getLinkMenuOptions(e) {
    const i = this.graph.getNodeById(e.origin_id), n = this.graph.getNodeById(e.target_id);
    let s = null;
    i && i.outputs && i.outputs[e.origin_slot] && (s = i.outputs[e.origin_slot].type);
    let r = null;
    n && n.outputs && n.outputs[e.target_slot] && (r = n.inputs[e.target_slot].type);
    const o = (c) => {
      console.debug("node autoconnect"), !(!c.inputs || !c.inputs.length || !c.outputs || !c.outputs.length) && i.connectByTypeInput(e.origin_slot, c, s) && (c.connectByTypeInput(e.target_slot, n, r), c.pos[0] -= c.size[0] * 0.5);
    }, a = (c, g, d, _, f) => {
      N.onMenuAdd(c, g, d, _, o);
    }, l = () => {
      this.graph.removeLink(e.id);
    };
    let h = [
      {
        content: "Add Node",
        has_submenu: !0,
        callback: a
      },
      j.SEPARATOR,
      {
        content: "Delete",
        has_submenu: !0,
        callback: l
      },
      j.SEPARATOR
    ];
    return this.graph.onGetLinkMenuOptions && (h = this.graph.onGetLinkMenuOptions(h, e)), i.getExtraLinkOptions && (h = i.getExtraLinkOptions(this, e, z.OUTPUT, h)), n.getExtraLinkOptions && (h = n.getExtraLinkOptions(this, e, z.INPUT, h)), h;
  }
  showLinkMenu(e, i) {
    const n = this.getLinkMenuOptions(e);
    return new x(n, {
      event: i,
      title: e.data != null ? e.data.constructor.name : null,
      extra: e
    }), !1;
  }
  /*
   * Shows a popup for editing one of the LGraphNode.properties.
   */
  showEditPropertyValue(e, i, n = {}) {
    if (!e || e.properties[i] === void 0 || u.ignore_all_widget_events)
      return;
    var s = e.getPropertyInfo(i), r = s.type, o = "";
    if (r == "string" || r == "number" || r == "array" || r == "object")
      if (s.multiline) {
        let p = e.properties[i], v = 5;
        if (r !== "string") {
          p = JSON.stringify(p, null, 2);
          const y = (p.match(/\n/g) || "").length + 1;
          v = Te(y, 5, 10);
        }
        o = "<textarea autofocus type='text' rows='" + v + "' cols='30' class='value'>" + (p || "") + "</textarea>";
      } else
        o = "<input autofocus type='text' class='value'/>";
    else if ((r == "enum" || r == "combo") && s.values) {
      o = "<select autofocus type='text' class='value'>";
      for (var a in s.values) {
        var l = a;
        s.values instanceof Array && (l = s.values[a]), o += "<option value='" + l + "' " + (l == e.properties[i] ? "selected" : "") + ">" + s.values[a] + "</option>";
      }
      o += "</select>";
    } else if (r == "boolean" || r == "toggle")
      o = "<input autofocus type='checkbox' class='value' " + (e.properties[i] ? "checked" : "") + "/>";
    else {
      console.warn("unknown type: " + r);
      return;
    }
    var h = this.createDialog(
      "<span class='name'>" + (s.label ? s.label : i) + "</span>" + o + "<button>OK</button>",
      n
    ), c = null;
    if ((r == "enum" || r == "combo") && s.values)
      c = h.querySelector("select"), c.addEventListener("change", function(p) {
        h.modified(), _(p.target.value);
      });
    else if (r == "boolean" || r == "toggle")
      c = h.querySelector("input"), c && c.addEventListener("click", function(p) {
        h.modified(), _(!!c.checked);
      });
    else if (s.multiline ? c = h.querySelector("textarea") : c = h.querySelector("input"), c) {
      c.addEventListener("blur", function(v) {
        this.focus();
      });
      let p = e.properties[i] !== void 0 ? e.properties[i] : "";
      if (r !== "string") {
        let v = null;
        s.multiline && (v = 2), p = JSON.stringify(p, null, v);
      }
      if (c.value = p, c.addEventListener("keydown", function(v) {
        let y = !1;
        v.keyCode == 27 ? (h.close(), y = !0) : v.keyCode == 13 && !s.multiline ? (d(), y = !0) : v.keyCode != 13 && h.modified(), y && (v.preventDefault(), v.stopPropagation());
      }), s.inputStyle)
        for (const [v, y] of Object.entries(s.inputStyle))
          c.style[v] = y;
    }
    c && c.focus();
    const g = () => {
      n.onclose && n.onclose(), h.close(), e.setDirtyCanvas(!0, !0);
    }, d = () => {
      r != "boolean" && r != "toggle" ? _(c.value) : g();
    }, _ = (p) => {
      s && s.values && s.values.constructor === Object && s.values[p] != null && (p = s.values[p]), typeof e.properties[i] == "number" && (p = Number(p)), (r == "array" || r == "object") && (p = JSON.parse(p)), e.setProperty(i, p), g();
    };
    var f = h.querySelector("button");
    return f.addEventListener("click", d), Ee(h), h;
  }
  // TODO refactor, theer are different dialog, some uses createDialog, some dont
  createDialog(e, i = { checkForInput: !1, closeOnLeave: !0, closeOnLeave_checkModified: !0 }) {
    var n = document.createElement("div");
    n.className = "graphdialog", n.innerHTML = e, n.is_modified = !1;
    var s = this.canvas.getBoundingClientRect(), r = -20, o = -20;
    if (s && (r -= s.left, o -= s.top), i.position ? (r = i.position[0], o = i.position[1]) : i.event ? (r = i.event.clientX, o = i.event.clientY) : (r += this.canvas.width * 0.5, o += this.canvas.height * 0.5), n.style.left = r + "px", n.style.top = o + "px", this.canvas.parentNode.appendChild(n), i.checkForInput) {
      var a = n.querySelectorAll("input"), l = !1;
      a && a.forEach(function(d) {
        d.addEventListener("keydown", function(_) {
          if (n.modified(), _.keyCode == 27)
            n.close();
          else if (_.keyCode != 13)
            return;
          _.preventDefault(), _.stopPropagation();
        }), l || d.focus();
      });
    }
    n.modified = function() {
      n.is_modified = !0;
    }, n.close = function() {
      n.parentNode && n.parentNode.removeChild(n);
    };
    var h = null, c = 0;
    n.addEventListener("mouseleave", function(d) {
      c || (i.closeOnLeave || u.dialog_close_on_mouse_leave) && !n.is_modified && u.dialog_close_on_mouse_leave && d.buttons === 0 && (h = setTimeout(n.close, u.dialog_close_on_mouse_leave_delay));
    }), n.addEventListener("mouseenter", function(d) {
      (i.closeOnLeave || u.dialog_close_on_mouse_leave) && h && clearTimeout(h);
    });
    var g = n.querySelectorAll("select");
    return g && g.forEach(function(d) {
      d.addEventListener("click", function(_) {
        c++;
      }), d.addEventListener("blur", function(_) {
        c = 0;
      }), d.addEventListener("change", function(_) {
        c = -1;
      });
    }), n;
  }
  getCanvasMenuOptions() {
    var e = null;
    if (this.getMenuOptions ? e = this.getMenuOptions(this) : (e = [
      {
        content: "Add Node",
        has_submenu: !0,
        callback: N.onMenuAdd
      },
      { content: "Add Group", callback: N.onGroupAdd }
      //{ content: "Arrange", callback: that.graph.arrange },
      //{content:"Collapse All", callback: LGraphCanvas.onMenuCollapseAll }
    ], this._graph_stack && this._graph_stack.length > 0 && e.push(j.SEPARATOR, {
      content: "Close subgraph",
      callback: this.closeSubgraph.bind(this)
    })), this.getExtraMenuOptions) {
      var i = this.getExtraMenuOptions(this, e);
      i && (e = e.concat(i));
    }
    return e;
  }
  getNodeMenuOptions(e) {
    let i = [];
    e.getMenuOptions ? i = e.getMenuOptions(this) : (i = [
      {
        content: "Inputs",
        has_submenu: !0,
        disabled: !0,
        callback: N.showMenuNodeOptionalInputs
      },
      {
        content: "Outputs",
        has_submenu: !0,
        disabled: !0,
        callback: N.showMenuNodeOptionalOutputs
      },
      j.SEPARATOR,
      {
        content: "Properties",
        has_submenu: !0,
        disabled: u.ignore_all_widget_events,
        callback: N.onShowMenuNodeProperties
      },
      j.SEPARATOR,
      {
        content: "Title",
        value: { name: "title", type: "string" },
        callback: N.onShowPropertyEditor
      },
      {
        content: "Mode",
        has_submenu: !0,
        callback: N.onMenuNodeMode
      }
    ], e.resizable !== !1 && i.push({
      content: "Resize",
      callback: N.onMenuResizeNode
    }), i.push(
      {
        content: "Collapse",
        callback: N.onMenuNodeCollapse
      },
      { content: "Pin", callback: N.onMenuNodePin },
      {
        content: "Colors",
        has_submenu: !0,
        callback: N.onMenuNodeColors
      },
      {
        content: "Shapes",
        has_submenu: !0,
        callback: N.onMenuNodeShapes
      },
      j.SEPARATOR
    ));
    const n = e.getOptionalSlots();
    if (n && (n.inputs && n.inputs.length > 0 && typeof i[0] == "object" && (i[0].disabled = !1), n.outputs && n.outputs.length && typeof i[1] == "object" && (i[1].disabled = !1)), e.getExtraMenuOptions) {
      var s = e.getExtraMenuOptions(this, i);
      s && (s.push(j.SEPARATOR), i = s.concat(i));
    }
    e.clonable !== !1 && i.push({
      content: "Clone",
      callback: N.onMenuNodeClone
    }), i.push({
      content: "To Subgraph",
      callback: N.onMenuNodeToSubgraph
    });
    let r = Object.values(this.selected_nodes || {});
    if (r.length || (r = [e]), r = r.filter((o) => !o.is(Q) && !o.is(ee)), i.push({
      content: "To Parent Graph",
      disabled: !e.graph._is_subgraph || r.length === 0,
      callback: N.onMenuNodeToParentGraph
    }), e.graph._is_subgraph) {
      const o = (c) => {
        let g = 0;
        const d = ve(c, (_) => _.id);
        for (const _ of c)
          for (const f of _.iterateAllLinks()) {
            if (d[f.origin_id] == null)
              return 0;
            d[f.target_id] == null && (g += 1);
          }
        return g;
      }, a = (c) => {
        let g = 0;
        const d = ve(c, (_) => _.id);
        for (const _ of c)
          for (const f of _.iterateAllLinks())
            if (d[f.origin_id] == null)
              g += 1;
            else if (d[f.target_id] == null)
              return 0;
        return g;
      }, l = o(r);
      i.push({
        content: "To Subgraph Input" + (l > 1 ? "s" : ""),
        disabled: l === 0,
        callback: N.onMenuNodeToSubgraphInputs
      });
      const h = a(r);
      i.push({
        content: "To Subgraph Output" + (h > 1 ? "s" : ""),
        disabled: h === 0,
        callback: N.onMenuNodeToSubgraphOutputs
      });
    }
    return i.push(j.SEPARATOR, {
      content: "Remove",
      disabled: !(e.removable !== !1 && !e.block_delete),
      callback: N.onMenuNodeRemove
    }), e.graph && e.graph.onGetNodeMenuOptions && (i = e.graph.onGetNodeMenuOptions(i, e)), i;
  }
  getGroupMenuOptions(e) {
    var i = [
      {
        content: "Title",
        value: { name: "title", type: "string" },
        callback: N.onShowPropertyEditor
      },
      {
        content: "Color",
        has_submenu: !0,
        callback: N.onMenuNodeColors
      },
      {
        content: "Font size",
        value: { name: "fontSize", type: "number" },
        callback: N.onShowPropertyEditor
      },
      j.SEPARATOR,
      { content: "Remove", callback: N.onMenuNodeRemove }
    ];
    return i;
  }
  /** Called when mouse right click */
  processContextMenu(e, i) {
    var n = N.active_canvas, s = n.getCanvasWindow();
    let r = i, o = null, a = null, l = null;
    e != null && (l = e.item, e.type === "node" && (o = e.item), e.type === "link" && (a = e.item));
    let h = null;
    var c = {
      event: r,
      extra: l
    };
    o != null && (c.title = o.type);
    let g = null;
    o != null && (g = o.getSlotInPosition(r.canvasX, r.canvasY), N.active_node = o);
    const d = (y) => {
      const m = y.slot;
      o.graph.beforeChange(), m.input ? o.removeInput(m.slot) : m.output && o.removeOutput(m.slot), o.graph.afterChange();
    }, _ = (y) => {
      var m = y.slot;
      o.graph.beforeChange(), m.output ? o.disconnectOutput(m.slot) : m.input && o.disconnectInput(m.slot), o.graph.afterChange();
    }, f = (y) => {
      var m = y.slot, E = m.input ? o.getInputInfo(m.slot) : o.getOutputInfo(m.slot), T = this.createDialog(
        "<span class='name'>Name</span><input autofocus type='text'/><button>OK</button>",
        c
      ), b = T.querySelector("input");
      b && E && (b.value = E.label || "");
      var O = () => {
        o.graph.beforeChange(), b.value && (E && (E.label = b.value), this.setDirty(!0)), T.close(), o.graph.afterChange();
      };
      T.querySelector("button").addEventListener("click", O), b.addEventListener("keydown", function(C) {
        if (T.is_modified = !0, C.keyCode == 27)
          T.close();
        else if (C.keyCode == 13)
          O();
        else if (C.keyCode != 13 && C.target instanceof Element && C.target.localName != "textarea")
          return;
        C.preventDefault(), C.stopPropagation();
      }), b.focus();
    };
    if (g) {
      if (h = [], o.getSlotMenuOptions)
        h = o.getSlotMenuOptions(g);
      else {
        g && g.output && g.output.links && g.output.links.length && h.push({ content: "Disconnect Links", slot: g, callback: _ });
        var p = g.input || g.output;
        p.removable && h.push(
          p.locked ? "Cannot remove" : { content: "Remove Slot", slot: g, callback: d }
        ), p.nameLocked || h.push({ content: "Rename Slot", slot: g, callback: f });
      }
      const y = (g.input ? g.input.type : g.output.type) || "*";
      c.title = $(y);
    } else if (o)
      h = this.getNodeMenuOptions(o);
    else if (a)
      h = this.getLinkMenuOptions(a);
    else {
      h = this.getCanvasMenuOptions();
      var v = this.graph.getGroupOnPos(
        r.canvasX,
        r.canvasY
      );
      v && h.push(j.SEPARATOR, {
        content: "Edit Group",
        has_submenu: !0,
        submenu: {
          title: "Group",
          extra: v,
          options: this.getGroupMenuOptions(v)
        }
      });
    }
    h && new x(h, c, s);
  }
  createPanel(e, i = {}) {
    var n = i.window || window, s = document.createElement("div");
    if (s.className = "litegraph dialog", s.innerHTML = `
<div class='dialog-header'><span class='dialog-title'></span></div>
<div class='dialog-content'></div>
<div style='display:none;' class='dialog-alt-content'></div>
<div class='dialog-footer'></div>`, s.header = s.querySelector(".dialog-header"), i.width && (s.style.width = i.width + (i.width.constructor === Number ? "px" : "")), i.height && (s.style.height = i.height + (i.height.constructor === Number ? "px" : "")), i.closable) {
      var r = document.createElement("span");
      r.innerHTML = "&#10005;", r.classList.add("close"), r.addEventListener("click", function() {
        s.close();
      }), s.header.appendChild(r);
    }
    return i.onOpen && (s.onOpen = i.onOpen), i.onClose && (s.onClose = i.onClose), s.title_element = s.querySelector(".dialog-title"), s.title_element.innerText = e, s.content = s.querySelector(".dialog-content"), s.alt_content = s.querySelector(".dialog-alt-content"), s.footer = s.querySelector(".dialog-footer"), s.close = function() {
      s.onClose && typeof s.onClose == "function" && s.onClose(), s.parentNode && s.parentNode.removeChild(s), this.parentNode && this.parentNode.removeChild(this);
    }, s.toggleAltContent = function(o = !1) {
      if (typeof o < "u")
        var a = o ? "block" : "none", l = o ? "none" : "block";
      else
        var a = s.alt_content.style.display != "block" ? "block" : "none", l = s.alt_content.style.display != "block" ? "none" : "block";
      s.alt_content.style.display = a, s.content.style.display = l;
    }, s.toggleFooterVisibility = function(o = !1) {
      if (typeof o < "u")
        var a = o ? "block" : "none";
      else
        var a = s.footer.style.display != "block" ? "block" : "none";
      s.footer.style.display = a;
    }, s.clear = function() {
      this.content.innerHTML = "";
    }, s.addHTML = function(o, a, l) {
      var h = document.createElement("div");
      return a && (h.className = a), h.innerHTML = o, l ? s.footer.appendChild(h) : s.content.appendChild(h), h;
    }, s.addButton = function(o, a, l) {
      var h = document.createElement("button");
      return h.innerText = o, h.options = l, h.classList.add("btn"), h.addEventListener("click", a), s.footer.appendChild(h), h;
    }, s.addSeparator = function() {
      var o = document.createElement("div");
      return o.className = "separator", s.content.appendChild(o), o;
    }, s.addWidget = function(o, a, l, h = {}, c) {
      var g = String(l);
      o = o.toLowerCase(), o == "number" && (g = l.toFixed(3));
      var d = document.createElement("div");
      d.className = "property", d.innerHTML = "<span class='property_name'></span><span class='property_value'></span>";
      let _ = d.querySelector(".property_name");
      _.innerText = h.label || a;
      var f = d.querySelector(".property_value");
      if (f.innerText = g, d.dataset.property = a, d.dataset.type = h.type || o, d.options = h, d.value = l, o == "code")
        d.addEventListener("click", function(v) {
          s.inner_showCodePad(this.dataset.property);
        });
      else if (o == "boolean")
        d.classList.add("boolean"), l && d.classList.add("bool-on"), d.addEventListener("click", function() {
          var v = this.dataset.property;
          this.value = !this.value, this.classList.toggle("bool-on");
          const y = this.querySelector(".property_value");
          y.innerText = this.value ? "true" : "false", p(v, this.value);
        });
      else if (o == "string" || o == "number")
        f.setAttribute("contenteditable", "true"), f.addEventListener("keydown", function(v) {
          v.code == "Enter" && (o != "string" || !v.shiftKey) && (v.preventDefault(), this.blur());
        }), f.addEventListener("blur", function() {
          let v = this.innerText;
          const y = this.parentNode;
          var m = y.dataset.property, E = y.dataset.type;
          E == "number" && (v = Number(v)), p(m, v);
        });
      else if ((o == "enum" || o == "combo") && "values" in h) {
        var g = N.getPropertyPrintableValue(l, h.values);
        f.innerText = g, f.addEventListener("click", function(y) {
          let m = h.values || [];
          typeof m == "function" && (console.error("Values by callback not supported in panel.addWidget!", m), m = []);
          var T = this.parentNode.dataset.property, b = this;
          let O = Array.from(m).map((M) => ({ content: M }));
          new x(O, {
            event: y,
            className: "dark",
            callback: C
          }, n);
          function C(M, A, S) {
            return b.innerText = M.content, p(T, M.content), !1;
          }
        });
      }
      s.content.appendChild(d);
      function p(v, y) {
        h.callback && h.callback(v, y, h), c && c(v, y, h);
      }
      return d;
    }, s.onOpen && typeof s.onOpen == "function" && s.onOpen(), s;
  }
  checkPanels() {
    if (this.canvas)
      for (var e = this.canvas.parentNode.querySelectorAll(".litegraph.dialog"), i = 0; i < e.length; ++i) {
        var n = e[i];
        if (n.node && (n.node.graph || n.close(), n.node.graph != this.graph)) {
          if (n.node.is(re) && this.graph._is_subgraph && this.graph === n.node.subgraph)
            continue;
          n.close();
        }
      }
  }
  closePanels() {
    var e = document.querySelector("#node-panel");
    e && e.close();
    var e = document.querySelector("#option-panel");
    e && e.close();
  }
}
k.onShowPropertyEditor = function(t, e, i, n, s) {
  var r = t.value, o = r.name, a = s[o], l = document.createElement("div");
  l.is_modified = !1, l.className = "graphdialog", l.innerHTML = "<span class='name'></span><input autofocus type='text' class='value'/><button>OK</button>", l.close = function() {
    l.parentNode && l.parentNode.removeChild(l);
  };
  var h = l.querySelector(".name");
  h.innerText = o;
  var c = l.querySelector(".value");
  if (c && (c.value = a, c.addEventListener("blur", function(T) {
    this.focus();
  }), c.addEventListener("keydown", function(T) {
    if (l.is_modified = !0, T.keyCode == 27)
      l.close();
    else if (T.keyCode == 13)
      v();
    else if (T.keyCode != 13 && T.target instanceof Element && T.target.localName != "textarea")
      return;
    T.preventDefault(), T.stopPropagation();
  }), r.inputStyle))
    for (const [T, b] of Object.entries(r.inputStyle))
      c.style[T] = b;
  var g = N.active_canvas, d = g.canvas, _ = d.getBoundingClientRect(), f = -20, p = -20;
  _ && (f -= _.left, p -= _.top), i ? (l.style.left = i.clientX + f + "px", l.style.top = i.clientY + p + "px") : (l.style.left = d.width * 0.5 + f + "px", l.style.top = d.height * 0.5 + p + "px");
  const v = () => {
    c && y(c.value);
  }, y = (T) => {
    r.type == "number" ? T = Number(T) : r.type == "boolean" && (T = !!T);
    const b = s[o];
    s[o] = T, s.onJSPropertyChanged && s.onJSPropertyChanged(o, T, b) === !1 && (s[o] = b), l.parentNode && l.parentNode.removeChild(l), s.setDirtyCanvas(!0, !0);
  };
  var m = l.querySelector("button");
  m.addEventListener("click", v), d.parentNode.appendChild(l), c && c.focus();
  var E = null;
  l.addEventListener("mouseleave", function(T) {
    u.dialog_close_on_mouse_leave && !l.is_modified && u.dialog_close_on_mouse_leave && T.buttons === 0 && (E = setTimeout(l.close, u.dialog_close_on_mouse_leave_delay));
  }), l.addEventListener("mouseenter", function(T) {
    u.dialog_close_on_mouse_leave && E && clearTimeout(E);
  }), Ee(l);
};
k.onGroupAdd = function(t, e, i, n) {
  var s = N.active_canvas;
  s.getCanvasWindow();
  var r = new me();
  r.pos = s.convertEventToCanvasOffset(i), s.graph.addGroup(r);
};
k.onMenuAdd = function(t, e, i, n, s) {
  var r = N.active_canvas, o = r.getCanvasWindow(), a = r.graph;
  if (!a)
    return;
  function l(h, c) {
    var g = u.getNodeTypesCategories(r.filter || a.filter).filter(function(f) {
      return f.startsWith(h);
    }), d = [];
    g.map(function(f) {
      if (f) {
        var p = new RegExp("^(" + h + ")"), v = f.replace(p, "").split("/")[0], y = h === "" ? v + "/" : h + v + "/", m = v;
        m.indexOf("::") != -1 && (m = m.split("::")[1]);
        var E = d.findIndex(function(T) {
          return T.value === y;
        });
        E === -1 && d.push(
          {
            value: y,
            content: m,
            has_submenu: !0,
            callback: function(T, b, O, C) {
              l(T.value, C);
            }
          }
        );
      }
    });
    var _ = u.getNodeTypesInCategory(h.slice(0, -1), r.filter || a.filter);
    _.map(function(f) {
      if (!f.hide_in_node_lists) {
        var p = {
          value: f.class,
          content: f.title,
          has_submenu: !1,
          callback: function(v, y, m, E) {
            var T = E.getFirstEvent();
            r.graph.beforeChange();
            var b = u.createNode(v.value);
            b && (b.pos = r.convertEventToCanvasOffset(T), r.graph.add(b)), s && s(b), r.graph.afterChange();
          }
        };
        d.push(p);
      }
    }), new x(d, { event: i, parentMenu: c }, o);
  }
  return l("", n), !1;
};
k.showMenuNodeOptionalInputs = function(t, e, i, n, s) {
  if (!s)
    return;
  var r = this, o = N.active_canvas, a = o.getCanvasWindow();
  let l = s.getOptionalSlots().inputs, h = [];
  if (l)
    for (let _ = 0; _ < l.length; _++) {
      let f = l[_];
      if (!f) {
        h.push(j.SEPARATOR);
        continue;
      }
      let { name: p, type: v, options: y } = f;
      y || (y = {}), y.label && (p = y.label), y.removable = !0;
      var c = { content: p, value: f };
      v == I.ACTION && (c.className = "event"), h.push(c);
    }
  if (s.onMenuNodeInputs) {
    var g = s.onMenuNodeInputs(h);
    g && (h = g);
  }
  if (!h.length) {
    console.log("no input entries");
    return;
  }
  new x(
    h,
    {
      event: i,
      callback: d,
      parentMenu: n,
      node: s
    },
    a
  );
  function d(_, f, p, v) {
    if (s && (_.callback && _.callback.call(r, s, _, p, v), _.value)) {
      let y = _.value;
      s.graph.beforeChange(), s.addInput(y.name, y.type, y.options), s.onNodeOptionalInputAdd && s.onNodeOptionalInputAdd(_.value), s.setDirtyCanvas(!0, !0), s.graph.afterChange();
    }
  }
  return !1;
};
k.showMenuNodeOptionalOutputs = function(t, e, i, n, s) {
  if (!s)
    return;
  var r = this, o = N.active_canvas, a = o.getCanvasWindow(), l = s.getOptionalSlots().outputs, h = [];
  if (l)
    for (var c = 0; c < l.length; c++) {
      var g = l[c];
      if (!g) {
        h.push(j.SEPARATOR);
        continue;
      }
      let { name: p, type: v, options: y } = g;
      if (!(s.flags && s.flags.skip_repeated_outputs && s.findOutputSlotIndexByName(g[0]) != -1)) {
        y || (y = {}), y.label && (p = y.label), y.removable = !0;
        var d = { content: p, value: [p, v, y] };
        v == I.EVENT && (d.className = "event"), h.push(d);
      }
    }
  if (this.onMenuNodeOutputs && (h = this.onMenuNodeOutputs(h)), u.do_add_triggers_slots && s.findOutputSlotIndexByName("onExecuted") == -1 && h.push({ content: "On Executed", value: ["onExecuted", I.EVENT, { nameLocked: !0 }], className: "event" }), s.onMenuNodeOutputs) {
    var _ = s.onMenuNodeOutputs(h);
    _ && (h = _);
  }
  if (!h.length)
    return;
  let f = function(p, v, y, m) {
    if (s && (p.callback && p.callback.call(r, s, p, y, m), !!p.value)) {
      var E = p.value[1];
      if (E && (E.constructor === Object || E.constructor === Array)) {
        var T = [];
        for (var b in E)
          T.push({ content: b, value: E[b] });
        return new x(T, {
          event: y,
          callback: f,
          parentMenu: n,
          node: s
        }), !1;
      } else {
        const O = p.value;
        s.graph.beforeChange(), s.addOutput(O.name, O.type, O.options), s.onNodeOptionalOutputAdd && s.onNodeOptionalOutputAdd(p.value), s.setDirtyCanvas(!0, !0), s.graph.afterChange();
      }
    }
  };
  return new x(
    h,
    {
      event: i,
      callback: f,
      parentMenu: n,
      node: s
    },
    a
  ), !1;
};
k.onMenuResizeNode = function(t, e, i, n, s) {
  if (s) {
    var r = function(l) {
      l.size = l.computeSize(), l.onResize && l.onResize(l.size);
    }, o = N.active_canvas;
    if (!o.selected_nodes || Object.keys(o.selected_nodes).length <= 1)
      r(s);
    else
      for (var a in o.selected_nodes)
        r(o.selected_nodes[a]);
    s.setDirtyCanvas(!0, !0);
  }
};
k.onShowMenuNodeProperties = function(t, e, i, n, s) {
  if (!s || !s.properties)
    return;
  var r = N.active_canvas, o = r.getCanvasWindow(), a = [];
  for (var l in s.properties) {
    var h = s.properties[l] !== void 0 ? s.properties[l] : " ";
    typeof h == "object" && (h = JSON.stringify(h));
    var c = s.getPropertyInfo(l);
    (c.type == "enum" || c.type == "combo") && (h = N.getPropertyPrintableValue(h, c.values)), h = N.decodeHTML(h), a.push({
      content: "<span class='property_name'>" + (c.label ? c.label : l) + "</span><span class='property_value'>" + h + "</span>",
      value: l
    });
  }
  if (!a.length)
    return;
  new x(
    a,
    {
      event: i,
      callback: g,
      parentMenu: n,
      allow_html: !0,
      node: s
    },
    o
  );
  function g(d, _, f, p) {
    if (s) {
      var v = this.getBoundingClientRect();
      r.showEditPropertyValue(s, d.value, {
        position: [v.left, v.top]
      });
    }
  }
  return !1;
};
k.onResizeNode = function(t, e, i, n, s) {
  s && (s.size = s.computeSize(), s.setDirtyCanvas(!0, !0));
};
k.onMenuNodeCollapse = function(t, e, i, n, s) {
  s.graph.beforeChange(
    /*?*/
  );
  var r = function(l) {
    l.collapse();
  }, o = N.active_canvas;
  if (!o.selected_nodes || Object.keys(o.selected_nodes).length <= 1)
    r(s);
  else
    for (var a in o.selected_nodes)
      r(o.selected_nodes[a]);
  s.graph.afterChange(
    /*?*/
  );
};
k.onMenuNodePin = function(t, e, i, n, s) {
  s.pin();
};
k.onMenuNodeMode = function(t, e, i, n, s) {
  let r = Array.from(oe).map((a) => ({ content: a }));
  new x(
    r,
    { event: i, callback: o, parentMenu: n, node: s }
  );
  function o(a) {
    if (s) {
      var l = Object.values(oe).indexOf(a.content), h = function(d) {
        l >= J.ALWAYS && oe[l] ? d.changeMode(l) : (console.warn("unexpected mode: " + a), d.changeMode(J.ALWAYS));
      }, c = N.active_canvas;
      if (!c.selected_nodes || Object.keys(c.selected_nodes).length <= 1)
        h(s);
      else
        for (var g in c.selected_nodes)
          h(c.selected_nodes[g]);
    }
  }
  return !1;
};
k.onMenuNodeColors = function(t, e, i, n, s) {
  if (!s)
    throw "no node for color";
  var r = [];
  r.push({
    value: null,
    content: "<span style='display: block; padding-left: 4px;'>No color</span>"
  });
  for (let l in N.node_colors) {
    var o = N.node_colors[l];
    let h = {
      value: l,
      content: "<span style='display: block; color: #999; padding-left: 4px; border-left: 8px solid " + o.color + "; background-color:" + o.bgcolor + "'>" + l + "</span>"
    };
    r.push(h);
  }
  new x(r, {
    event: i,
    callback: a,
    parentMenu: n,
    node: s,
    allow_html: !0
  });
  function a(l) {
    if (s) {
      var h = l.value ? N.node_colors[l.value] : null, c = function(_) {
        h ? _ instanceof me ? _.color = h.groupcolor : (_.color = h.color, _.bgcolor = h.bgcolor) : (delete _.color, _ instanceof le && delete _.bgcolor);
      }, g = N.active_canvas;
      if (!g.selected_nodes || Object.keys(g.selected_nodes).length <= 1)
        c(s);
      else
        for (var d in g.selected_nodes)
          c(g.selected_nodes[d]);
      s.setDirtyCanvas(!0, !0);
    }
  }
  return !1;
};
k.onMenuNodeShapes = function(t, e, i, n, s) {
  if (!s)
    throw "no node passed";
  const r = Array.from(Ie).map((a) => ({ content: a }));
  new x(r, {
    event: i,
    callback: o,
    parentMenu: n,
    node: s
  });
  function o(a) {
    if (s) {
      s.graph.beforeChange(
        /*?*/
      );
      var l = function(g) {
        g.shape = Ie.indexOf(a.content);
      }, h = N.active_canvas;
      if (!h.selected_nodes || Object.keys(h.selected_nodes).length <= 1)
        l(s);
      else
        for (var c in h.selected_nodes)
          l(h.selected_nodes[c]);
      s.graph.afterChange(
        /*?*/
      ), s.setDirtyCanvas(!0);
    }
  }
  return !1;
};
k.onMenuNodeRemove = function(t, e, i, n, s) {
  if (!s)
    throw "no node passed";
  var r = s.graph;
  r.beforeChange();
  var o = function(h) {
    h.removable !== !1 && r.remove(h);
  }, a = N.active_canvas;
  if (!a.selected_nodes || Object.keys(a.selected_nodes).length <= 1)
    o(s);
  else
    for (var l in a.selected_nodes)
      o(a.selected_nodes[l]);
  r.afterChange(), s.setDirtyCanvas(!0, !0);
};
k.onMenuNodeToSubgraph = function(t, e, i, n, s) {
  var r = s.graph, o = N.active_canvas;
  if (o) {
    var a = Object.values(o.selected_nodes || {});
    a.length || (a = [s]);
    var l = u.createNode("graph/subgraph", null, { constructorArgs: [null] });
    l.pos = s.pos.concat(), r.add(l), l.buildFromNodes(a), o.deselectAllNodes(), s.setDirtyCanvas(!0, !0);
  }
};
k.onMenuNodeToSubgraphInputs = function(t, e, i, n, s) {
  var r = N.active_canvas;
  if (!r)
    return;
  const o = s.graph._subgraph_node;
  if (!s.graph._is_subgraph || !o) {
    console.error("[To Subgraph Inputs] Current graph is not a subgraph!", s.graph);
    return;
  }
  let a = Object.values(r.selected_nodes || {});
  a.length || (a = [s]), o.convertNodesToSubgraphInputs(a), r.deselectAllNodes(), s.setDirtyCanvas(!0, !0);
};
k.onMenuNodeToSubgraphOutputs = function(t, e, i, n, s) {
  var r = N.active_canvas;
  if (!r)
    return;
  const o = s.graph._subgraph_node;
  if (!s.graph._is_subgraph || !o) {
    console.error("[To Subgraph Outputs] Current graph is not a subgraph!", s.graph);
    return;
  }
  let a = Object.values(r.selected_nodes || {});
  a.length || (a = [s]), o.convertNodesToSubgraphOutputs(a), r.deselectAllNodes(), s.setDirtyCanvas(!0, !0);
};
k.onMenuNodeToParentGraph = function(t, e, i, n, s) {
  var r = N.active_canvas;
  if (!r)
    return;
  const o = s.graph._subgraph_node;
  if (!s.graph._is_subgraph || !o) {
    console.error("[To Parent Graph] Current graph is not a subgraph!", s.graph);
    return;
  }
  let a = Object.values(r.selected_nodes || {});
  a.length || (a = [s]), o.moveNodesToParentGraph(a), r.deselectAllNodes(), s.setDirtyCanvas(!0, !0);
};
k.onMenuNodeClone = function(t, e, i, n, s) {
  var r = N.active_canvas;
  (!r.selected_nodes || Object.keys(r.selected_nodes).length <= 1) && r.selectNode(s), r.cloneSelection();
};
const ce = class {
  constructor(t, e, i = {}) {
    this.link_type_colors = {}, this.node_panel = null, this.options_panel = null, this.render_time = 0, this.allow_dragcanvas = !0, this.allow_dragnodes = !0, this.allow_interaction = !0, this.allow_reconnect_links = !0, this.allow_searchbox = !0, this.always_render_background = !1, this.background_image = ce.DEFAULT_BACKGROUND_IMAGE, this.block_click = !1, this.clear_background = !0, this.connecting_pos = null, this.connecting_slot = null, this.connecting_input = null, this.connecting_output = null, this.connections_width = 3, this.current_node = null, this.drag_mode = !1, this.dragging_rectangle = null, this.ds = new Be(), this.editor_alpha = 1, this.filter = null, this.highquality_render = !0, this.skip_events = !1, this.last_mouse_position = [0, 0], this.last_click_position = [0, 0], this.last_click_position_offset = [0, 0], this.last_mouse_dragging = !1, this.links_render_mode = de.SPLINE_LINK, this.live_mode = !1, this.mouse = [0, 0], this.offset_mouse = [0, 0], this.graph_mouse = [0, 0], this.node_widget = null, this.maxZoom = null, this.minZoom = null, this.multi_select = !1, this.over_link_center = null, this.pause_rendering = !1, this.read_only = !1, this.render_canvas_border = !0, this.render_collapsed_slots = !0, this.render_connection_arrows = !1, this.render_connections_border = !0, this.render_connections_shadows = !1, this.render_connections = !0, this.render_curved_connections = !1, this.render_execution_order = !1, this.render_link_tooltip = !0, this.render_only_selected = !0, this.render_shadows = !0, this.render_title_colored = !0, this.render_subgraph_panels = !0, this.render_subgraph_stack_header = !0, this.round_radius = 8, this.set_canvas_dirty_on_mouse_event = !0, this.show_info = !0, this.use_gradients = !0, this.visible_links = [], this.zoom_modify_alpha = !0, this.pointer_is_down = !1, this.pointer_is_double = !1, this._highlight_input = null, this._highlight_input_slot = null, this._highlight_output = null, this._graph_stack = [], this._bg_img = null, this._pattern = null, this._pattern_img = null, this.search_box = null, this.prompt_box = null, this._events_binded = !1, this.resizing_node = null, typeof t == "string" && (t = document.querySelector(t)), this.skip_events = i.skip_events || !1, this.title_text_font = "" + u.NODE_TEXT_SIZE + "px Arial", this.inner_text_font = "normal " + u.NODE_SUBTEXT_SIZE + "px Arial", this.node_title_color = u.NODE_TITLE_COLOR, this.default_link_color = u.LINK_COLOR, this.link_type_colors = u.cloneObject(ce.DEFAULT_LINK_TYPE_COLORS), this.canvas_mouse = this.graph_mouse, this.visible_area = this.ds.visible_area, this.viewport = i.viewport || null, e && e.attachCanvas(this), this.setCanvas(t, i.skip_events), this.clear(), i.skip_render || this.startRendering(), this.autoresize = i.autoresize;
  }
  static getFileExtension(t) {
    var e = t.indexOf("?");
    e != -1 && (t = t.substr(0, e));
    var i = t.lastIndexOf(".");
    return i == -1 ? "" : t.substr(i + 1).toLowerCase();
  }
  static decodeHTML(t) {
    var e = document.createElement("div");
    return e.innerText = t, e.innerHTML;
  }
  static getPropertyPrintableValue(t, e) {
    if (!e || e.constructor === Array)
      return String(t);
    if (e.constructor === Object) {
      var i = "";
      for (var n in e)
        if (e[n] == t) {
          i = n;
          break;
        }
      return String(t) + " (" + i + ")";
    }
  }
  get scale() {
    return this.ds.scale;
  }
  set scale(t) {
    this.ds.scale = t;
  }
  /** clears all the data inside */
  clear() {
    this.frame = 0, this.last_draw_time = 0, this.render_time = 0, this.fps = 0, this.dragging_rectangle = null, this.selected_nodes = {}, this.selected_group = null, this.visible_nodes = [], this.node_dragged = null, this.node_over = null, this.node_capturing_input = null, this.connecting_node = null, this.highlighted_links = {}, this.dragging_canvas = !1, this.dirty_canvas = !0, this.dirty_bgcanvas = !0, this.dirty_area = null, this.node_in_panel = null, this.node_widget = null, this.last_mouse = [0, 0], this.last_mouseclick = 0, this.pointer_is_down = !1, this.pointer_is_double = !1, this.onClear && this.onClear();
  }
  /** assigns a graph, you can reassign graphs to the same canvas */
  setGraph(t, e = !1) {
    if (this.graph != t) {
      if (e || this.clear(), !t && this.graph) {
        this.graph.detachCanvas(this);
        return;
      }
      t.attachCanvas(this), this._graph_stack && (this._graph_stack = null), this.setDirty(!0, !0);
    }
  }
  /** opens a graph contained inside a node in the current graph */
  openSubgraph(t) {
    if (!t)
      throw "graph cannot be null";
    if (this.graph == t)
      throw "graph cannot be the same";
    if (this.clear(), this.graph) {
      this._graph_stack || (this._graph_stack = []);
      const i = [this.ds.offset[0], this.ds.offset[1]];
      this._graph_stack.push({ graph: this.graph, offset: i, scale: this.ds.scale });
    }
    u.debug && (console.warn("SubGraph opened", t), console.warn("Graph inputs", t.inputs), console.warn("Graph outputs", t.outputs)), t.attachCanvas(this);
    const e = [0, 0];
    if (t._nodes.length > 0) {
      let i = Number.MAX_SAFE_INTEGER, n = 0, s = Number.MAX_SAFE_INTEGER, r = 0;
      for (const o of t.iterateNodesInOrder())
        i = Math.min(o.pos[0], i), n = Math.max(o.pos[0] + o.size[0], n), s = Math.min(o.pos[1], s), r = Math.max(o.pos[1] + o.size[1], r);
      e[0] = -(i + (n - i) / 2) + this.canvas.width / 2, e[1] = -(s + (r - s) / 2) + this.canvas.height / 2;
    }
    this.ds.offset = e, this.ds.scale = 1, this.checkPanels(), this.setDirty(!0, !0);
  }
  closeAllSubgraphs() {
    for (; this._graph_stack && this._graph_stack.length > 0; )
      this.closeSubgraph();
  }
  /** closes a subgraph contained inside a node */
  closeSubgraph() {
    if (!(!this._graph_stack || this._graph_stack.length == 0)) {
      var t = this.graph._subgraph_node, { graph: e, offset: i, scale: n } = this._graph_stack.pop();
      this.selected_nodes = {}, this.highlighted_links = {}, e.attachCanvas(this), this.setDirty(!0, !0), t && (this.centerOnNode(t), this.selectNodes([t])), this.ds.offset = i, this.ds.scale = n;
    }
  }
  /** assigns a canvas */
  setCanvas(t, e = !1) {
    if (t && typeof t == "string" && (t = document.getElementById(t), !t))
      throw "Error creating LiteGraph canvas: Canvas not found";
    if (t = t, t !== this.canvas && (!t && this.canvas && (e || this.unbindEvents()), this.canvas = t, this.ds.element = t, !!t)) {
      if (t.className += " lgraphcanvas", t.data = this, t.tabIndex = 1, this.bgcanvas = null, this.bgcanvas || (this.bgcanvas = document.createElement("canvas"), this.bgcanvas.width = this.canvas.width, this.bgcanvas.height = this.canvas.height), t.getContext == null)
        throw t.localName != "canvas" ? "Element supplied for LGraphCanvas must be a <canvas> element, you passed a " + t.localName : "This browser doesn't support Canvas";
      e || this.bindEvents(), this.adjustCanvasForHiDPI();
    }
  }
  //used in some events to capture them
  _doNothing(t) {
    return t.preventDefault(), !1;
  }
  _doReturnTrue(t) {
    return t.preventDefault(), !0;
  }
  /** binds mouse, keyboard, touch and drag events to the canvas */
  bindEvents() {
    if (this._events_binded) {
      console.warn("LGraphCanvas: events already binded");
      return;
    }
    var t = this.canvas, e = this.getCanvasWindow(), i = e.document;
    this._mousedown_callback = this.processMouseDown.bind(this), this._mousewheel_callback = this.processMouseWheel.bind(this), this._mousemove_callback = this.processMouseMove.bind(this), this._mouseup_callback = this.processMouseUp.bind(this), u.pointerListenerAdd(t, "down", this._mousedown_callback, !0), t.addEventListener("mousewheel", this._mousewheel_callback, !1), u.pointerListenerAdd(t, "up", this._mouseup_callback, !0), u.pointerListenerAdd(t, "move", this._mousemove_callback), t.addEventListener("contextmenu", this._doNothing), t.addEventListener(
      "DOMMouseScroll",
      this._mousewheel_callback,
      !1
    ), this._key_callback = this.processKey.bind(this), t.addEventListener("keydown", this._key_callback, !0), i.addEventListener("keyup", this._key_callback, !0), this._ondrop_callback = this.processDrop.bind(this), t.addEventListener("dragover", this._doNothing, !1), t.addEventListener("dragend", this._doNothing, !1), t.addEventListener("drop", this._ondrop_callback, !1), t.addEventListener("dragenter", this._doReturnTrue, !1), this._events_binded = !0;
  }
  /** unbinds mouse events from the canvas */
  unbindEvents() {
    if (!this._events_binded) {
      console.warn("LGraphCanvas: no events binded");
      return;
    }
    u.debug && console.log("pointerevents: unbindEvents");
    var t = this.getCanvasWindow(), e = t.document;
    u.pointerListenerRemove(this.canvas, "move", this._mousedown_callback), u.pointerListenerRemove(this.canvas, "up", this._mousedown_callback), u.pointerListenerRemove(this.canvas, "down", this._mousedown_callback), this.canvas.removeEventListener(
      "mousewheel",
      this._mousewheel_callback
    ), this.canvas.removeEventListener(
      "DOMMouseScroll",
      this._mousewheel_callback
    ), this.canvas.removeEventListener("keydown", this._key_callback), e.removeEventListener("keyup", this._key_callback), this.canvas.removeEventListener("contextmenu", this._doNothing), this.canvas.removeEventListener("drop", this._ondrop_callback), this.canvas.removeEventListener("dragenter", this._doReturnTrue), this._mousedown_callback = null, this._mousewheel_callback = null, this._key_callback = null, this._ondrop_callback = null, this._events_binded = !1;
  }
  /**
   * this function allows to render the canvas using WebGL instead of Canvas2D
   * this is useful if you plant to render 3D objects inside your nodes, it uses litegl.js for webgl and canvas2DtoWebGL to emulate the Canvas2D calls in webGL
   **/
  enableWebGL() {
  }
  /**
   * marks as dirty the canvas, this way it will be rendered again
   * @param fg if the foreground canvas is dirty (the one containing the nodes)
   * @param bg if the background canvas is dirty (the one containing the wires)
   */
  setDirty(t = !1, e = !1) {
    t && (this.dirty_canvas = !0), e && (this.dirty_bgcanvas = !0);
  }
  /**
   * Used to attach the canvas in a popup
   * @return the window where the canvas is attached (the DOM root node)
   */
  getCanvasWindow() {
    if (!this.canvas)
      return window;
    var t = this.canvas.ownerDocument;
    return t.defaultView;
  }
  adjustCanvasForHiDPI(t) {
    if (t || (t = window.devicePixelRatio), t == 1 || !this.canvas.parentNode)
      return;
    const e = this.canvas.parentNode.getBoundingClientRect(), { width: i, height: n } = e;
    this.canvas.width = i * t, this.canvas.height = n * t, this.canvas.style.width = i + "px", this.canvas.style.height = n + "px", this.canvas.getContext("2d").scale(t, t);
  }
  /** starts rendering the content of the canvas when needed */
  startRendering() {
    if (this.is_rendering)
      return;
    this.is_rendering = !0, t.call(this);
    function t() {
      this.pause_rendering || this.draw();
      var e = this.getCanvasWindow();
      this.is_rendering && e.requestAnimationFrame(t.bind(this));
    }
  }
  /** stops rendering the content of the canvas (to save resources) */
  stopRendering() {
    this.is_rendering = !1;
  }
  //used to block future mouse events (because of im gui)
  blockClick() {
    this.block_click = !0, this.last_mouseclick = 0;
  }
  createDefaultNodeForSlot(t, e = {}) {
    var i = this, n = e.nodeFrom && e.slotFrom !== null, s = !n && e.nodeTo && e.slotTo !== null;
    if (e = { ...{
      position: [0, 0],
      posAdd: [0, 0],
      posSizeFix: [0, 0]
    }, ...e }, !n && !s)
      return console.warn("No data passed to createDefaultNodeForSlot " + e.nodeFrom + " " + e.slotFrom + " " + e.nodeTo + " " + e.slotTo), !1;
    if (!t)
      return console.warn("No type to createDefaultNodeForSlot"), !1;
    var o = n ? e.nodeFrom : e.nodeTo, a = n ? e.slotFrom : e.slotTo, l = null;
    switch (typeof a) {
      case "string":
        l = n ? o.findOutputSlotIndexByName(a) : o.findInputSlotIndexByName(a), a = n ? o.outputs[a] : o.inputs[a];
        break;
      case "object":
        l = n ? o.findOutputSlotIndexByName(a.name) : o.findInputSlotIndexByName(a.name);
        break;
      case "number":
        l = a, a = n ? o.outputs[a] : o.inputs[a];
        break;
      case "undefined":
      default:
        return console.warn("Cant get slot information " + a), !1;
    }
    a = a, (!a || !l) && console.warn("createDefaultNodeForSlot bad slotX " + a + " " + l);
    var h = a.type == I.EVENT ? "_event_" : a.type, c = n ? u.slot_types_default_out : u.slot_types_default_in;
    const g = c[h];
    if (c && g) {
      a.link !== null || a.links && a.links.length > 0;
      let v = null;
      if (Array.isArray(g)) {
        for (var d in g)
          if (t == c[h][d] || t == "AUTO") {
            v = c[h][d], u.debug && console.log("opts.nodeType == slotTypesDefault[fromSlotType][typeX] :: " + t);
            break;
          }
      } else
        throw new Error(`Invalid default slot specifier, must be an array: ${g}`);
      if (v) {
        var _ = null;
        typeof v == "object" && v.node && (_ = v, v = v.node);
        var f = u.createNode(v);
        if (f) {
          if (_) {
            if (_.properties)
              for (var p in _.properties)
                f.addProperty(p, _.properties[p]);
            if (_.inputs) {
              f.inputs = [];
              for (var p in _.inputs)
                f.addOutput(
                  _.inputs[p][0],
                  _.inputs[p][1]
                );
            }
            if (_.outputs) {
              f.outputs = [];
              for (var p in _.outputs)
                f.addOutput(
                  _.outputs[p][0],
                  _.outputs[p][1]
                );
            }
            _.title && (f.title = _.title), _.json && f.configure(_.json);
          }
          console.warn("PLACING", f.type, e);
          const y = e.position[0] + e.posAdd[0] + (e.posSizeFix[0] ? e.posSizeFix[0] * f.size[0] : 0), m = e.position[1] + e.posAdd[1] + (e.posSizeFix[1] ? e.posSizeFix[1] * f.size[1] : 0), E = [y, m];
          return i.graph.add(f, { pos: E }), n ? e.nodeFrom.connectByTypeInput(l, f, h) : e.nodeTo.connectByTypeOutput(l, f, h), n && s && console.debug("connecting in between"), !0;
        } else
          console.log("failed creating " + v);
      }
    }
    return !1;
  }
  /** returns true if a position (in graph space) is on top of a node little corner box */
  isOverNodeBox(t, e, i) {
    var n = u.NODE_TITLE_HEIGHT;
    return !!u.isInsideRectangle(
      e,
      i,
      t.pos[0] + 2,
      t.pos[1] + 2 - n,
      n - 4,
      n - 4
    );
  }
  /** returns slot index if a position (in graph space) is on top of a node input slot */
  isOverNodeInput(t, e, i, n) {
    if (t.inputs)
      for (var s = 0, r = t.inputs.length; s < r; ++s) {
        var o = t.getConnectionPos(!0, s), a = !1;
        if (t.horizontal ? a = u.isInsideRectangle(
          e,
          i,
          o[0] - 5,
          o[1] - 10,
          10,
          20
        ) : a = u.isInsideRectangle(
          e,
          i,
          o[0] - 10,
          o[1] - 5,
          40,
          10
        ), a)
          return n && (n[0] = o[0], n[1] = o[1]), s;
      }
    return -1;
  }
  /**
   * returns the INDEX if a position (in graph space) is on top of a node output slot
   * @method isOverNodeOuput
   **/
  isOverNodeOutput(t, e, i, n) {
    if (t.outputs)
      for (var s = 0, r = t.outputs.length; s < r; ++s) {
        t.outputs[s];
        var o = t.getConnectionPos(!1, s), a = !1;
        if (t.horizontal ? a = u.isInsideRectangle(
          e,
          i,
          o[0] - 5,
          o[1] - 10,
          10,
          20
        ) : a = u.isInsideRectangle(
          e,
          i,
          o[0] - 10,
          o[1] - 5,
          40,
          10
        ), a)
          return n && (n[0] = o[0], n[1] = o[1]), s;
      }
    return -1;
  }
  findLinkCenterAtPos(t, e) {
    for (let i = 0; i < this.visible_links.length; ++i) {
      const n = this.visible_links[i];
      if (this.graph && this.graph.links[n.id] == null)
        continue;
      const s = n._pos;
      if (!(!s || t < s[0] - 4 || t > s[0] + 4 || e < s[1] - 4 || e > s[1] + 4))
        return n;
    }
    return null;
  }
  /** process a key event */
  processKey(t) {
    if (!this.graph)
      return;
    var e = !1;
    if (u.debug && console.log("processKey", t), t.target instanceof Element && t.target.localName == "input")
      return;
    const i = this.allow_interaction && !this.read_only;
    if (t.type == "keydown") {
      if (t.keyCode == 32 && !(t.metaKey || t.ctrlKey || t.shiftKey) && (this.dragging_canvas = !0, e = !0), t.keyCode == 27 && !(t.metaKey || t.ctrlKey || t.shiftKey) && (this.node_panel && this.node_panel.close(), this.options_panel && this.options_panel.close(), e = !0), i && (t.keyCode == 65 && t.ctrlKey && (this.selectNodes(), e = !0), t.code == "KeyX" && (t.metaKey || t.ctrlKey) && !t.shiftKey && this.selected_nodes && (this.cutToClipboard(), e = !0), t.code == "KeyC" && (t.metaKey || t.ctrlKey) && !t.shiftKey && this.selected_nodes && (this.copyToClipboard(), e = !0), t.code == "KeyV" && (t.metaKey || t.ctrlKey) && !t.shiftKey && this.pasteFromClipboard(), t.code == "KeyD" && (t.metaKey || t.ctrlKey) && !t.shiftKey && (this.cloneSelection(), e = !0), (t.keyCode == 46 || t.keyCode == 8) && t.target instanceof Element && t.target.localName != "input" && t.target.localName != "textarea" && (this.deleteSelectedNodes(), e = !0), this.selected_nodes))
        for (var n in this.selected_nodes)
          this.selected_nodes[n].onKeyDown && this.selected_nodes[n].onKeyDown(t);
    } else if (t.type == "keyup" && (t.keyCode == 32 && (this.dragging_canvas = !1), i && this.selected_nodes))
      for (var n in this.selected_nodes)
        this.selected_nodes[n].onKeyUp && this.selected_nodes[n].onKeyUp(t);
    if (this.graph.change(), e)
      return t.preventDefault(), t.stopImmediatePropagation(), !1;
  }
  cutToClipboard() {
    this.copyToClipboard(), this.deleteSelectedNodes();
  }
  copyToClipboard() {
    var t = {
      nodes: [],
      nodeCloneData: {},
      links: []
    }, e = 0, i = [];
    for (var n in this.selected_nodes) {
      var s = this.selected_nodes[n];
      s._relative_id = e, i.push(s), e += 1;
    }
    for (let h = 0; h < i.length; ++h) {
      let c = i[h];
      if (!c.clonable)
        continue;
      const g = { forNode: {} };
      let d = c.clone(g);
      if (!d) {
        console.warn("node type not found: " + c.type);
        continue;
      }
      if (t.nodes.push(d.serialize()), t.nodeCloneData[d.id] = {
        prevNodeID: c.id,
        cloneData: g
      }, c.inputs && c.inputs.length)
        for (var r = 0; r < c.inputs.length; ++r) {
          var o = c.inputs[r];
          if (!(!o || o.link == null)) {
            var a = this.graph.links[o.link];
            if (a) {
              var l = this.graph.getNodeById(
                a.origin_id
              );
              !l || !this.selected_nodes[l.id] || !this.selected_nodes[l.id].clonable || t.links.push([
                l._relative_id,
                a.origin_slot,
                //j,
                c._relative_id,
                a.target_slot
              ]);
            }
          }
        }
    }
    localStorage.setItem(
      "litegrapheditor_clipboard",
      JSON.stringify(t)
    );
  }
  pasteFromClipboard() {
    var t = localStorage.getItem("litegrapheditor_clipboard");
    if (t) {
      this.graph.beforeChange();
      for (var e = JSON.parse(t), i = null, n = null, s = 0; s < e.nodes.length; ++s)
        i ? (i[0] > e.nodes[s].pos[0] && (i[0] = e.nodes[s].pos[0], n[0] = s), i[1] > e.nodes[s].pos[1] && (i[1] = e.nodes[s].pos[1], n[1] = s)) : (i = [e.nodes[s].pos[0], e.nodes[s].pos[1]], n = [s, s]);
      for (var r = [], s = 0; s < e.nodes.length; ++s) {
        var o = e.nodes[s], a = u.createNode(o.type);
        if (a) {
          a.configure(o), a.pos[0] += this.graph_mouse[0] - i[0], a.pos[1] += this.graph_mouse[1] - i[1];
          const { cloneData: d, prevNodeID: _ } = e.nodeCloneData[a.id];
          this.graph.add(a, { doProcessChange: !1, addedBy: "paste", prevNodeID: _, cloneData: d }), r.push(a);
        }
      }
      for (var s = 0; s < e.links.length; ++s) {
        var l = e.links[s], h = r[l[0]], c = r[l[2]];
        h && c ? h.connect(l[1], c, l[3]) : console.warn("Warning, nodes missing on pasting");
      }
      this.selectNodes(r), this.graph.afterChange();
    }
  }
  cloneSelection() {
    if (!this.selected_nodes || Object.keys(this.selected_nodes).length === 0)
      return;
    this.graph.beforeChange();
    const t = {}, e = [], i = {};
    for (const r of Object.values(this.selected_nodes))
      for (const o of r.iterateAllLinks())
        this.selected_nodes[o.origin_id] && this.selected_nodes[o.target_id] && e.push(o);
    const n = function(r) {
      if (r.clonable == !1)
        return;
      const o = r.id, a = { forNode: {} }, l = r.clone(a);
      l && (i[o] = l, l.pos = [r.pos[0] + 5, r.pos[1] + 5], r.graph.add(l, { addedBy: "cloneSelection", prevNodeID: o, prevNode: r, cloneData: a }), t[l.id] = l);
    };
    for (var s in this.selected_nodes)
      n(this.selected_nodes[s]);
    for (const r of e) {
      const o = i[r.origin_id], a = i[r.target_id];
      o && a && o.connect(r.origin_slot, a, r.target_slot);
    }
    Object.keys(t).length && this.selectNodes(Object.values(t)), this.graph.afterChange(), this.setDirty(!0, !0);
  }
  processDrop(t) {
    let e = t;
    e.preventDefault(), this.adjustMouseEvent(e);
    var i = e.clientX, n = e.clientY, s = !this.viewport || this.viewport && i >= this.viewport[0] && i < this.viewport[0] + this.viewport[2] && n >= this.viewport[1] && n < this.viewport[1] + this.viewport[3];
    if (s) {
      var r = [e.canvasX, e.canvasY], o = this.graph ? this.graph.getNodeOnPos(r[0], r[1]) : null;
      if (!o) {
        var a = null;
        this.onDropItem && (a = this.onDropItem(e)), a || this.checkDropItem(e);
        return;
      }
      if (o.onDropFile || o.onDropData) {
        var l = e.dataTransfer.files;
        if (l && l.length)
          for (var h = 0; h < l.length; h++) {
            var c = e.dataTransfer.files[0], g = c.name;
            if (ce.getFileExtension(g), o.onDropFile && o.onDropFile(c), o.onDropData) {
              var d = new FileReader();
              d.onload = function(f) {
                var p = f.target.result;
                o.onDropData(p, g, c);
              };
              var _ = c.type.split("/")[0];
              _ == "text" || _ == "" ? d.readAsText(c) : _ == "image" ? d.readAsDataURL(c) : d.readAsArrayBuffer(c);
            }
          }
      }
      return !!(o.onDropItem && o.onDropItem(e) || this.onDropItem && this.onDropItem(e));
    }
  }
  checkDropItem(t) {
    let e = t;
    if (e.dataTransfer.files.length) {
      var i = e.dataTransfer.files[0], n = ce.getFileExtension(i.name).toLowerCase(), s = u.node_types_by_file_extension[n];
      if (s) {
        this.graph.beforeChange();
        var r = u.createNode(s.type);
        r.pos = [e.canvasX, e.canvasY], this.graph.add(r), r.onDropFile && r.onDropFile(i), this.graph.afterChange();
      }
    }
  }
  processNodeDblClicked(t) {
    this.onShowNodePanel ? this.onShowNodePanel(t) : this.showShowNodePanel(t), this.onNodeDblClicked && this.onNodeDblClicked(t), this.setDirty(!0);
  }
  processNodeSelected(t, e) {
    this.selectNode(t, e && (e.shiftKey || e.ctrlKey || this.multi_select)), this.onNodeSelected && this.onNodeSelected(t);
  }
  /** selects a given node (or adds it to the current selection) */
  selectNode(t, e = !1) {
    t == null ? this.deselectAllNodes() : this.selectNodes([t], e);
  }
  /** selects several nodes (or adds them to the current selection) */
  selectNodes(t, e = !1) {
    e || this.deselectAllNodes(), t = t || this.graph._nodes, typeof t == "string" && (t = [t]);
    for (var i in t) {
      var n = t[i];
      if (n.is_selected) {
        this.deselectNode(n);
        continue;
      }
      if (!n.is_selected && n.onSelected && n.onSelected(), n.is_selected = !0, this.selected_nodes[n.id] = n, n.inputs)
        for (var s = 0; s < n.inputs.length; ++s)
          this.highlighted_links[n.inputs[s].link] = !0;
      if (n.outputs)
        for (var s = 0; s < n.outputs.length; ++s) {
          var r = n.outputs[s];
          if (r.links)
            for (var o = 0; o < r.links.length; ++o)
              this.highlighted_links[r.links[o]] = !0;
        }
    }
    this.onSelectionChange && this.onSelectionChange(this.selected_nodes), this.setDirty(!0);
  }
  /** removes a node from the current selection */
  deselectNode(t) {
    if (t.is_selected) {
      if (t.onDeselected && t.onDeselected(), t.is_selected = !1, this.onNodeDeselected && this.onNodeDeselected(t), t.inputs)
        for (var e = 0; e < t.inputs.length; ++e)
          delete this.highlighted_links[t.inputs[e].link];
      if (t.outputs)
        for (var e = 0; e < t.outputs.length; ++e) {
          var i = t.outputs[e];
          if (i.links)
            for (var n = 0; n < i.links.length; ++n)
              delete this.highlighted_links[i.links[n]];
        }
    }
  }
  /** removes all nodes from the current selection */
  deselectAllNodes() {
    if (this.graph) {
      for (var t = this.graph._nodes, e = 0, i = t.length; e < i; ++e) {
        var n = t[e];
        n.is_selected && (n.onDeselected && n.onDeselected(), n.is_selected = !1, this.onNodeDeselected && this.onNodeDeselected(n));
      }
      this.selected_nodes = {}, this.current_node = null, this.highlighted_links = {}, this.onSelectionChange && this.onSelectionChange(this.selected_nodes), this.setDirty(!0);
    }
  }
  /** deletes all nodes in the current selection from the graph */
  deleteSelectedNodes() {
    this.graph.beforeChange();
    for (var t in this.selected_nodes) {
      var e = this.selected_nodes[t];
      if (!e.block_delete) {
        if (e.inputs && e.inputs.length && e.outputs && e.outputs.length && u.isValidConnection(e.inputs[0].type, e.outputs[0].type) && e.inputs[0].link && e.outputs[0].links && e.outputs[0].links.length) {
          var i = e.graph.links[e.inputs[0].link], n = e.graph.links[e.outputs[0].links[0]], s = e.getInputNode(0), r = e.getOutputNodes(0)[0];
          s && r && s.connect(i.origin_slot, r, n.target_slot);
        }
        this.graph.remove(e), this.onNodeDeselected && this.onNodeDeselected(e);
      }
    }
    this.selected_nodes = {}, this.current_node = null, this.highlighted_links = {}, this.setDirty(!0), this.graph.afterChange();
  }
  /** centers the camera on a given node */
  centerOnNode(t) {
    this.ds.offset[0] = -t.pos[0] - t.size[0] * 0.5 + this.canvas.width * 0.5 / this.ds.scale, this.ds.offset[1] = -t.pos[1] - t.size[1] * 0.5 + this.canvas.height * 0.5 / this.ds.scale, this.setDirty(!0, !0);
  }
  /**
   * adds some useful properties to a mouse event, like the position in graph coordinates
   * @method adjustMouseEvent
   **/
  adjustMouseEvent(t) {
    let e = t;
    var i = 0, n = 0;
    if (this.canvas) {
      var s = this.canvas.getBoundingClientRect();
      i = e.clientX - s.left, n = e.clientY - s.top;
    } else
      i = e.clientX, n = e.clientY;
    return this.last_mouse_position[0] = i, this.last_mouse_position[1] = n, e.canvasX = i / this.ds.scale - this.ds.offset[0], e.canvasY = n / this.ds.scale - this.ds.offset[1], e;
  }
  /** process an event on widgets */
  processNodeWidgets(t, e, i, n) {
    if (!t.widgets || !t.widgets.length || u.ignore_all_widget_events)
      return null;
    for (var s = e[0] - t.pos[0], r = e[1] - t.pos[1], o = t.size[0], a = this, l = this.getCanvasWindow(), h = 0; h < t.widgets.length; ++h) {
      var c = t.widgets[h];
      if (!(!c || c.disabled)) {
        var g = c.computeSize ? c.computeSize(o)[1] : u.NODE_WIDGET_HEIGHT, d = c.width || o;
        if (!(c != n && (s < 6 || s > d - 12 || r < c.last_y || r > c.last_y + g || c.last_y === void 0))) {
          var _ = c.value;
          switch (c.type) {
            case "button":
              i.type === u.pointerevents_method + "down" && (c.callback && setTimeout(function() {
                c.callback(c, a, t, e, i);
              }, 20), c.clicked = !0, this.dirty_canvas = !0);
              break;
            case "slider":
              c.options.max - c.options.min;
              var f = Te((s - 15) / (d - 30), 0, 1);
              c.value = c.options.min + (c.options.max - c.options.min) * f, c.callback && setTimeout(function() {
                T(c, c.value);
              }, 20), this.dirty_canvas = !0;
              break;
            case "number":
            case "combo":
              var _ = c.value;
              if (i.type == u.pointerevents_method + "move" && c.type == "number")
                i.deltaX && (c.value += i.deltaX * (c.options.step || 0.1)), c.options.min != null && c.value < c.options.min && (c.value = c.options.min), c.options.max != null && c.value > c.options.max && (c.value = c.options.max);
              else if (i.type == u.pointerevents_method + "down") {
                var p = c.options.values;
                if (p && typeof p == "function") {
                  let O = c.options.values;
                  p = O(c, t);
                }
                var v = null;
                c.type != "number" && (v = Array.isArray(p) ? p : Object.keys(p));
                var y = s < 40 ? -1 : s > d - 40 ? 1 : 0;
                if (c.type == "number")
                  c.value += y * (c.options.step || 0.1), c.options.min != null && c.value < c.options.min && (c.value = c.options.min), c.options.max != null && c.value > c.options.max && (c.value = c.options.max);
                else if (y) {
                  var m = -1;
                  this.last_mouseclick = 0, p.constructor === Object ? m = v.indexOf(String(c.value)) + y : m = v.indexOf(c.value) + y, m >= v.length && (m = v.length - 1), m < 0 && (m = 0), Array.isArray(p) ? c.value = p[m] : c.value = m;
                } else {
                  let O = function(M, A, S) {
                    let G = M.content;
                    return p != v && (G = E.indexOf(G)), this.value = G, T(this, G), a.dirty_canvas = !0, !1;
                  };
                  var E = p != v ? Object.values(p) : p;
                  let C = Array.from(E).map((M) => ({ content: M }));
                  new x(
                    C,
                    {
                      scale: Math.max(1, this.ds.scale),
                      event: i,
                      className: "dark",
                      callback: O.bind(c)
                    },
                    l
                  );
                }
              } else if (i.type == u.pointerevents_method + "up" && c.type == "number") {
                var y = s < 40 ? -1 : s > d - 40 ? 1 : 0;
                i.click_time < 200 && y == 0 && this.prompt(
                  "Value",
                  c.value,
                  function(C) {
                    this.value = Number(C), T(this, this.value);
                  }.bind(c),
                  i
                );
              }
              _ != c.value && setTimeout(
                function() {
                  T(this, this.value);
                }.bind(c),
                20
              ), this.dirty_canvas = !0;
              break;
            case "toggle":
              i.type == u.pointerevents_method + "down" && (c.value = !c.value, setTimeout(function() {
                T(c, c.value);
              }, 20));
              break;
            case "string":
            case "text":
              i.type == u.pointerevents_method + "down" && this.prompt(
                "Value",
                c.value,
                function(O) {
                  this.value = O, T(this, O);
                }.bind(c),
                i,
                c.options ? c.options.multiline : !1,
                c.options.inputStyle
              );
              break;
            default:
              c.mouse && (this.dirty_canvas = c.mouse(i, [s, r], t));
              break;
          }
          return _ != c.value && (t.onWidgetChanged && t.onWidgetChanged(c, _), t.graph._version++), c;
        }
      }
    }
    function T(b, O) {
      b.value = O, b.options && b.options.property && t.properties[b.options.property] !== void 0 && t.setProperty(b.options.property, O), b.callback && b.callback(b.value, a, t, e, i);
    }
    return null;
  }
  adjustNodesSize() {
    for (var t = this.graph._nodes, e = 0; e < t.length; ++e)
      t[e].size = t[e].computeSize();
    this.setDirty(!0, !0);
  }
  /** resizes the canvas to a given size, if no size is passed, then it tries to fill the parentNode */
  resize(t, e) {
    if (!t && !e) {
      var i = this.canvas.parentNode;
      t = i.offsetWidth, e = i.offsetHeight;
    }
    this.canvas.width == t && this.canvas.height == e || (this.canvas.width = t, this.canvas.height = e, this.bgcanvas.width = this.canvas.width, this.bgcanvas.height = this.canvas.height, this.adjustCanvasForHiDPI(), this.setDirty(!0, !0));
  }
  isAreaClicked(t, e, i, n, s) {
    var r = this.offset_mouse;
    u.isInsideRectangle(r[0], r[1], t, e, i, n), r = this.last_click_position;
    var o = r && u.isInsideRectangle(r[0], r[1], t, e, i, n), a = o && !this.block_click;
    return o && s && this.blockClick(), a;
  }
  /**
   * switches to live mode (node shapes are not rendered, only the content)
   * this feature was designed when graphs where meant to create user interfaces
   **/
  switchLiveMode(t) {
    if (!t) {
      this.live_mode = !this.live_mode, this.dirty_canvas = !0, this.dirty_bgcanvas = !0;
      return;
    }
    var e = this, i = this.live_mode ? 1.1 : 0.9;
    this.live_mode && (this.live_mode = !1, this.editor_alpha = 0.1);
    var n = setInterval(function() {
      e.editor_alpha *= i, e.dirty_canvas = !0, e.dirty_bgcanvas = !0, i < 1 && e.editor_alpha < 0.01 && (clearInterval(n), i < 1 && (e.live_mode = !0)), i > 1 && e.editor_alpha > 0.99 && (clearInterval(n), e.editor_alpha = 1);
    }, 1);
  }
  onNodeSelectionChange() {
  }
  touchHandler(t) {
  }
  convertOffsetToCanvas(t) {
    return this.ds.convertOffsetToCanvas(t);
  }
  convertCanvasToOffset(t, e = [0, 0]) {
    return this.ds.convertCanvasToOffset(t, e);
  }
  /** converts event coordinates from canvas2D to graph coordinates */
  convertEventToCanvasOffset(t) {
    var e = this.canvas.getBoundingClientRect();
    return this.convertCanvasToOffset([
      t.clientX - e.left,
      t.clientY - e.top
    ]);
  }
  addGraphInputNode(t, e, i) {
    const n = this.graph.findNodesByClass(Q).find((o) => o.properties.name === e);
    if (n) {
      this.selectNodes([n]);
      return;
    }
    (!i || i === "") && (i = "*");
    const s = [
      this.canvas.width * 0.25 / this.ds.scale - this.ds.offset[0],
      this.canvas.height * 0.5 / this.ds.scale - this.ds.offset[1]
    ];
    this.graph.beforeChange();
    const r = t.addGraphInput(e, i, s);
    if (r) {
      const o = r.innerNode;
      this.selectNodes([o]), this.graph.afterChange();
    } else
      console.error("graph input node not found:", i);
  }
  addGraphOutputNode(t, e, i) {
    const n = this.graph.findNodesByClass(ee).find((o) => o.properties.name === e);
    if (n) {
      this.selectNodes([n]);
      return;
    }
    (!i || i === "") && (i = "*");
    const s = [
      this.canvas.width * 0.75 / this.ds.scale - this.ds.offset[0],
      this.canvas.height * 0.5 / this.ds.scale - this.ds.offset[1]
    ];
    this.graph.beforeChange();
    const r = t.addGraphOutput(e, i, s);
    if (r) {
      const o = r.innerNode;
      this.selectNodes([o]), this.graph.afterChange();
    } else
      console.error("graph output node not found:", i);
  }
  getCanvasMenuOptions() {
    return k.prototype.getCanvasMenuOptions.apply(this, arguments);
  }
  getNodeMenuOptions(t) {
    return k.prototype.getNodeMenuOptions.apply(this, arguments);
  }
  getLinkMenuOptions(t) {
    return k.prototype.getLinkMenuOptions.apply(this, arguments);
  }
  getGroupMenuOptions(t) {
    return k.prototype.getGroupMenuOptions.apply(this, arguments);
  }
  checkPanels() {
    k.prototype.checkPanels.apply(this, arguments);
  }
  closePanels() {
    k.prototype.closePanels.apply(this, arguments);
  }
  createDialog(t, e) {
    return k.prototype.createDialog.apply(this, arguments);
  }
  createPanel(t, e = {}) {
    return k.prototype.createPanel.apply(this, arguments);
  }
  showSearchBox(t, e = {}) {
    return k.prototype.showSearchBox.apply(this, arguments);
  }
  prompt(t = "", e, i, n, s = !1, r = null) {
    return k.prototype.prompt.apply(this, arguments);
  }
  showConnectionMenu(t = {}) {
    return k.prototype.showConnectionMenu.apply(this, arguments);
  }
  showLinkMenu(t, e) {
    return k.prototype.showLinkMenu.apply(this, arguments);
  }
  showEditPropertyValue(t, e, i) {
    return k.prototype.showEditPropertyValue.apply(this, arguments);
  }
  showShowNodePanel(t) {
    k.prototype.showShowNodePanel.apply(this, arguments);
  }
  showSubgraphPropertiesDialog(t) {
    return k.prototype.showSubgraphPropertiesDialog.apply(this, arguments);
  }
  showSubgraphPropertiesDialogRight(t) {
    return k.prototype.showSubgraphPropertiesDialogRight.apply(this, arguments);
  }
  processContextMenu(t, e) {
    k.prototype.processContextMenu.apply(this, arguments);
  }
  /*
   * Events
   */
  processMouseMove(t) {
    return ge.prototype.processMouseMove.apply(this, arguments);
  }
  processMouseDown(t) {
    return ge.prototype.processMouseDown.apply(this, arguments);
  }
  processMouseUp(t) {
    return ge.prototype.processMouseUp.apply(this, arguments);
  }
  processMouseWheel(t) {
    return ge.prototype.processMouseWheel.apply(this, arguments);
  }
  /*
   * Rendering
   */
  setZoom(t, e) {
    U.prototype.setZoom.apply(this, arguments);
  }
  bringToFront(t) {
    U.prototype.bringToFront.apply(this, arguments);
  }
  sendToBack(t) {
    U.prototype.sendToBack.apply(this, arguments);
  }
  computeVisibleNodes(t, e = []) {
    return U.prototype.computeVisibleNodes.apply(this, arguments);
  }
  draw(t = !1, e = !1) {
    U.prototype.draw.apply(this, arguments);
  }
  drawFrontCanvas() {
    U.prototype.drawFrontCanvas.apply(this, arguments);
  }
  drawSubgraphPanel(t) {
    U.prototype.drawSubgraphPanel.apply(this, arguments);
  }
  drawSubgraphPanelLeft(t, e, i) {
    U.prototype.drawSubgraphPanelLeft.apply(this, arguments);
  }
  drawSubgraphPanelRight(t, e, i) {
    U.prototype.drawSubgraphPanelRight.apply(this, arguments);
  }
  drawButton(t, e, i, n, s, r = u.NODE_DEFAULT_COLOR, o = "#555", a = u.NODE_TEXT_COLOR, l = !0) {
    return U.prototype.drawButton.apply(this, arguments);
  }
  drawBackCanvas() {
    U.prototype.drawBackCanvas.apply(this, arguments);
  }
  renderInfo(t, e = 10, i) {
    U.prototype.renderInfo.apply(this, arguments);
  }
  drawNode(t, e) {
    U.prototype.drawNode.apply(this, arguments);
  }
  drawLinkTooltip(t, e) {
    U.prototype.drawLinkTooltip.apply(this, arguments);
  }
  drawNodeShape(t, e, i, n, s, r, o) {
    U.prototype.drawNodeShape.apply(this, arguments);
  }
  drawConnections(t) {
    U.prototype.drawConnections.apply(this, arguments);
  }
  renderLink(t, e, i, n, s, r, o, a, l, h) {
    U.prototype.renderLink.apply(this, arguments);
  }
  computeConnectionPoint(t, e, i, n = P.RIGHT, s = P.LEFT) {
    return U.prototype.computeConnectionPoint.apply(this, arguments);
  }
  drawExecutionOrder(t) {
    U.prototype.drawExecutionOrder.apply(this, arguments);
  }
  drawNodeWidgets(t, e, i, n) {
    U.prototype.drawNodeWidgets.apply(this, arguments);
  }
  drawGroups(t, e) {
    U.prototype.drawGroups.apply(this, arguments);
  }
};
let N = ce;
N.DEFAULT_BACKGROUND_IMAGE = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAIAAAD/gAIDAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQBJREFUeNrs1rEKwjAUhlETUkj3vP9rdmr1Ysammk2w5wdxuLgcMHyptfawuZX4pJSWZTnfnu/lnIe/jNNxHHGNn//HNbbv+4dr6V+11uF527arU7+u63qfa/bnmh8sWLBgwYJlqRf8MEptXPBXJXa37BSl3ixYsGDBMliwFLyCV/DeLIMFCxYsWLBMwSt4Be/NggXLYMGCBUvBK3iNruC9WbBgwYJlsGApeAWv4L1ZBgsWLFiwYJmCV/AK3psFC5bBggULloJX8BpdwXuzYMGCBctgwVLwCl7Be7MMFixYsGDBsu8FH1FaSmExVfAxBa/gvVmwYMGCZbBg/W4vAQYA5tRF9QYlv/QAAAAASUVORK5CYII=";
N.node_colors = {
  red: { color: "#322", bgcolor: "#533", groupcolor: "#A88" },
  brown: { color: "#332922", bgcolor: "#593930", groupcolor: "#b06634" },
  green: { color: "#232", bgcolor: "#353", groupcolor: "#8A8" },
  blue: { color: "#223", bgcolor: "#335", groupcolor: "#88A" },
  pale_blue: { color: "#2a363b", bgcolor: "#3f5159", groupcolor: "#3f789e" },
  cyan: { color: "#233", bgcolor: "#355", groupcolor: "#8AA" },
  purple: { color: "#323", bgcolor: "#535", groupcolor: "#a1309b" },
  yellow: { color: "#432", bgcolor: "#653", groupcolor: "#b58b2a" },
  black: { color: "#222", bgcolor: "#000", groupcolor: "#444" }
};
N.DEFAULT_LINK_TYPE_COLORS = {
  [I.ACTION]: u.ACTION_LINK_COLOR,
  [I.EVENT]: u.EVENT_LINK_COLOR,
  number: "#AAA",
  node: "#DCA"
};
N.DEFAULT_CONNECTION_COLORS = {
  input_off: "#778",
  input_on: "#7F7",
  //"#BBD"
  output_off: "#778",
  output_on: "#7F7"
  //"#BBD"
};
N.DEFAULT_CONNECTION_COLORS_BY_TYPE = {
  number: "#7F7",
  string: "#77F",
  boolean: "#F77"
};
N.DEFAULT_CONNECTION_COLORS_BY_TYPE_OFF = {
  number: "#474",
  string: "#447",
  boolean: "#744"
};
N.gradients = {};
N.active_canvas = null;
N.active_node = null;
N.onMenuCollapseAll = k.onMenuCollapseAll;
N.onMenuNodeEdit = k.onMenuNodeEdit;
N.onShowPropertyEditor = k.onShowPropertyEditor;
N.onGroupAdd = k.onGroupAdd;
N.onMenuAdd = k.onMenuAdd;
N.showMenuNodeOptionalInputs = k.showMenuNodeOptionalInputs;
N.showMenuNodeOptionalOutputs = k.showMenuNodeOptionalOutputs;
N.onShowMenuNodeProperties = k.onShowMenuNodeProperties;
N.onResizeNode = k.onResizeNode;
N.onMenuResizeNode = k.onMenuResizeNode;
N.onMenuNodeCollapse = k.onMenuNodeCollapse;
N.onMenuNodePin = k.onMenuNodePin;
N.onMenuNodeMode = k.onMenuNodeMode;
N.onMenuNodeColors = k.onMenuNodeColors;
N.onMenuNodeShapes = k.onMenuNodeShapes;
N.onMenuNodeRemove = k.onMenuNodeRemove;
N.onMenuNodeClone = k.onMenuNodeClone;
N.onMenuNodeToSubgraph = k.onMenuNodeToSubgraph;
N.onMenuNodeToSubgraphInputs = k.onMenuNodeToSubgraphInputs;
N.onMenuNodeToSubgraphOutputs = k.onMenuNodeToSubgraphOutputs;
N.onMenuNodeToParentGraph = k.onMenuNodeToParentGraph;
var j = /* @__PURE__ */ ((t) => (t[t.SEPARATOR = 0] = "SEPARATOR", t))(j || {});
class x {
  static trigger(e, i, n, s) {
    var r = document.createEvent("CustomEvent");
    return r.initCustomEvent(i, !0, !0, n), r.target = s, e.dispatchEvent && e.dispatchEvent(r), r;
  }
  static isCursorOverElement(e, i) {
    var n = e.clientX, s = e.clientY, r = i.getBoundingClientRect();
    return r ? s > r.top && s < r.top + r.height && n > r.left && n < r.left + r.width : !1;
  }
  static closeAllContextMenus(e) {
    e = e || window;
    var i = e.document.querySelectorAll(".litecontextmenu");
    if (i.length) {
      var n = Array.from(i);
      for (const s of n)
        s.close();
    }
  }
  constructor(e, i = {}, n) {
    this.options = i;
    var s = this;
    i.parentMenu && (i.parentMenu.constructor !== this.constructor ? (console.error(
      "parentMenu must be of class ContextMenu, ignoring it"
    ), i.parentMenu = null) : (this.parentMenu = i.parentMenu, this.parentMenu.lock = !0, this.parentMenu.current_submenu = this));
    var r = null;
    i.event && (r = i.event.constructor.name), r !== "MouseEvent" && r !== "CustomEvent" && r !== "PointerEvent" && (console.error(
      "Event passed to ContextMenu is not of type MouseEvent or CustomEvent. Ignoring it. (" + r + ")"
    ), i.event = null);
    var o = document.createElement("div");
    o.className = "litegraph litecontextmenu litemenubar-panel", i.className && (o.className += " " + i.className), o.style.pointerEvents = "none", setTimeout(function() {
      o.style.pointerEvents = "auto";
    }, 100), u.pointerListenerAdd(
      o,
      "up",
      function(p) {
        return p.preventDefault(), !0;
      },
      !0
    ), o.addEventListener(
      "contextmenu",
      function(p) {
        return p.button != 2 || p.preventDefault(), !1;
      },
      !0
    ), o.close = () => {
      o.parentNode.removeChild(o);
    }, u.pointerListenerAdd(
      o,
      "down",
      function(p) {
        if (p.button == 2)
          return s.close(), p.preventDefault(), !0;
      },
      !0
    );
    function a(p) {
      var v = parseInt(o.style.top);
      return o.style.top = (v + p.deltaY * i.scroll_speed).toFixed() + "px", p.preventDefault(), !0;
    }
    if (i.scroll_speed || (i.scroll_speed = 0.1), o.addEventListener("wheel", a, !0), o.addEventListener("mousewheel", a, !0), this.root = o, i.title) {
      var l = document.createElement("div");
      l.className = "litemenu-title", l.innerHTML = i.title, o.appendChild(l);
    }
    this.values = [];
    for (let p = 0; p < e.length; p++) {
      let v = e[p], y = "";
      v === 0 ? y = "" : typeof v == "string" ? y = v : y = v.content, this.addItem(y, v, i);
    }
    u.pointerListenerAdd(o, "enter", function(p) {
      o.closing_timer && clearTimeout(o.closing_timer);
    });
    var h = document;
    i.event && i.event.target instanceof Node && (h = i.event.target.ownerDocument), h || (h = document), h.fullscreenElement ? h.fullscreenElement.appendChild(o) : h.body.appendChild(o);
    var c = i.left || 0, g = i.top || 0;
    if (i.event) {
      if (c = i.event.clientX - 10, g = i.event.clientY - 10, i.title && (g -= 20), i.parentMenu) {
        var d = i.parentMenu.root.getBoundingClientRect();
        c = d.left + d.width;
      }
      var _ = document.body.getBoundingClientRect(), f = o.getBoundingClientRect();
      _.height == 0 && console.error("document.body height is 0. That is dangerous, set html,body { height: 100%; }"), _.width && c > _.width - f.width - 10 && (c = _.width - f.width - 10), _.height && g > _.height - f.height - 10 && (g = _.height - f.height - 10);
    }
    o.style.left = c + "px", o.style.top = g + "px", i.scale && (o.style.transform = "scale(" + i.scale + ")");
  }
  addItem(e, i, n = {}) {
    var s = this, r = document.createElement("div");
    r.className = "litemenu-entry submenu";
    var o = !1;
    typeof i == "string" && (i = { content: i }), i === 0 ? r.classList.add("separator") : (r.innerHTML = i.title ? i.title : e, i.disabled && (o = !0, r.classList.add("disabled")), (i.submenu || i.has_submenu) && r.classList.add("has_submenu"), typeof i == "function" ? r.dataset.value = e : r.dataset.value = "" + this.values.length, i.className && (r.className += " " + i.className)), this.values.push(i), this.root.appendChild(r), o || r.addEventListener("click", h), n.autoopen && u.pointerListenerAdd(r, "enter", l);
    let a = this;
    function l(c) {
      var g = this.value;
      !g || !g.has_submenu || h.call(this, c);
    }
    function h(c) {
      let g = parseInt(this.dataset.value);
      var d = a.values[g];
      u.debug && console.debug("ContextMenu inner_onclick", g, d);
      const _ = N.active_canvas;
      if (!_)
        return;
      const f = _.adjustMouseEvent(c);
      var p = !0;
      if (s.current_submenu && s.current_submenu.close(f), n.callback) {
        var v = n.callback.call(
          this,
          d,
          n,
          f,
          s,
          n.node
        );
        v === !0 && (p = !1);
      }
      if (d && typeof d == "object") {
        if (d.callback && !n.ignore_item_callbacks && d.disabled !== !0) {
          var v = d.callback.call(
            this,
            d,
            n,
            f,
            s,
            n.extra
          );
          v === !0 && (p = !1);
        }
        if (d.submenu) {
          if (!d.submenu.options)
            throw "ContextMenu submenu needs options";
          new x(d.submenu.options, {
            callback: d.submenu.callback,
            event: f,
            parentMenu: s,
            ignore_item_callbacks: d.submenu.ignore_item_callbacks,
            title: d.submenu.title,
            extra: d.submenu.extra,
            autoopen: n.autoopen
          }), p = !1;
        }
      }
      p && !s.lock && s.close();
    }
    return r;
  }
  close(e, i) {
    this.root.parentNode && this.root.parentNode.removeChild(this.root), this.parentMenu && !i && (this.parentMenu.lock = !1, this.parentMenu.current_submenu = null, e === void 0 ? this.parentMenu.close() : e && !x.isCursorOverElement(e, this.parentMenu.root) && x.trigger(this.parentMenu.root, u.pointerevents_method + "leave", e)), this.current_submenu && this.current_submenu.close(e, !0), this.root.closing_timer && clearTimeout(this.root.closing_timer);
  }
  getTopMenu() {
    return this.options.parentMenu ? this.options.parentMenu.getTopMenu() : this;
  }
  getFirstEvent() {
    return this.options.parentMenu ? this.options.parentMenu.getFirstEvent() : this.options.event;
  }
}
export {
  Ae as BASE_SLOT_TYPES,
  D as BuiltInSlotShape,
  I as BuiltInSlotType,
  x as ContextMenu,
  j as ContextMenuSpecialItem,
  P as Dir,
  Be as DragAndScale,
  Q as GraphInput,
  ee as GraphOutput,
  z as LConnectionKind,
  Pe as LGraph,
  N as LGraphCanvas,
  ge as LGraphCanvas_Events,
  U as LGraphCanvas_Rendering,
  k as LGraphCanvas_UI,
  me as LGraphGroup,
  le as LGraphNode,
  Ve as LGraphStatus,
  pe as LLink,
  he as LayoutDirection,
  de as LinkRenderMode,
  xe as LinkRenderModeNames,
  u as LiteGraph,
  Oe as NODE_MODE_COLORS,
  oe as NODE_MODE_NAMES,
  J as NodeMode,
  Ie as SLOT_SHAPE_NAMES,
  re as Subgraph,
  ne as TitleMode,
  Te as clamp,
  $ as getLitegraphTypeName,
  we as getSlotTypesIn,
  Ye as getSlotTypesInFormatted,
  Le as getSlotTypesOut,
  We as getSlotTypesOutFormatted,
  Ce as getStaticProperty,
  be as getStaticPropertyOnInstance,
  Qe as hasCircularReference,
  Je as isArray,
  je as isBoolean,
  $e as isJson,
  qe as isNumber,
  Ze as isObject,
  Ke as isString,
  Se as isValidLitegraphType,
  Ee as makeDraggable,
  Re as reassignGraphIDs,
  ve as toHashMap
};
