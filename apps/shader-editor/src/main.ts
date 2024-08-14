import * as THREE from "three";
import { LiteGraph, LGraph, LGraphCanvas } from "@litegraph-ts/core";
import { ThreeJSNode } from "@litegraph-ts/nodes-three";
import "@litegraph-ts/core/css/litegraph.css"

LiteGraph.debug = false;
LiteGraph.catch_exceptions = true;
LiteGraph.throw_errors = true;
LiteGraph.allow_scripts = false;
LiteGraph.searchbox_extras = {};
LiteGraph.auto_sort_node_types = true;
LiteGraph.node_box_coloured_when_on = true;
LiteGraph.node_box_coloured_by_mode = true;
LiteGraph.dialog_close_on_mouse_leave = true;
LiteGraph.dialog_close_on_mouse_leave_delay = 500;
LiteGraph.shift_click_do_break_link_from = false;
LiteGraph.click_do_break_link_to = false;
LiteGraph.search_hide_on_mouse_leave = true;
LiteGraph.search_filter_enabled = true;
LiteGraph.search_show_all_on_open = true;
LiteGraph.auto_load_slot_types = true;
LiteGraph.alt_drag_do_clone_nodes = true;
LiteGraph.do_add_triggers_slots = true;
LiteGraph.allow_multi_output_for_events = false;
LiteGraph.middle_click_slot_add_default_node = true;
LiteGraph.release_link_on_empty_shows_menu = true;
LiteGraph.pointerevents_method = "mouse";

const main = document.getElementById("main")!;
const canvas = document.createElement("canvas");
canvas.width = main.clientWidth;
canvas.height = main.clientHeight;
main.appendChild(canvas);


const graph = new LGraph();
const graphCanvas = new LGraphCanvas(canvas, graph);
graph.onAfterExecute = () => {
  // 开启渲染
  graphCanvas.draw(true);
};



graph.start();



// ------------------------------------------------------------------

const canvas2 = document.createElement("canvas");
canvas2.width = 1024;
canvas2.height = 1024;
const context2 = canvas2.getContext("webgl2")!;

const renderer = new THREE.WebGLRenderer({
  canvas: canvas2,
});

renderer.setSize(1024, 1024);

renderer.setPixelRatio( window.devicePixelRatio )

graph.extra["canvas"] = canvas2;
graph.extra["context"] = context2;
graph.extra["renderer"] = renderer;

// ------------------------------------------------------------------

graph.add(LiteGraph.createNode(ThreeJSNode));



