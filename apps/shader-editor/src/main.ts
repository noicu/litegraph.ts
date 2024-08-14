import * as THREE from "three";
import { LiteGraph, LGraph, LGraphCanvas, LGraphNode } from "@litegraph-ts/core";
import "@litegraph-ts/nodes-basic"
import "@litegraph-ts/nodes-math"
import "@litegraph-ts/nodes-logic";
import "@litegraph-ts/nodes-widget";
import "@litegraph-ts/nodes-events";
import "@litegraph-ts/nodes-mqtt";
import "@litegraph-ts/nodes-strings";
import "@litegraph-ts/nodes-test";
import { ShaderViewWidgetProps, ShaderUVNode } from "@litegraph-ts/nodes-three";
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
graph.extra["shader-view"] = new Map();
graph.extra["size"] = [1024, 1024];
graph.extra["tileSize"] = 256;

// 初始化
for (let y = 0; y < 4; y++) {
  for (let x = 0; x < 4; x++) {
    graph.extra["shader-view"].set(`${x}_${y}`, null)
  }
}
const graphCanvas = new LGraphCanvas(canvas, graph);
graph.onAfterExecute = () => {
  // 开启渲染
  graphCanvas.draw(true);
};

graph.start();


// ------------------------------------------------------------------

const canvas2 = document.createElement("canvas");
// const canvas2 = document.getElementById("canvas2")! as HTMLCanvasElement;
canvas2.width = 1024;
canvas2.height = 1024;
const context2 = canvas2.getContext("webgl2")!;

const renderer = new THREE.WebGLRenderer({
  canvas: canvas2,
});

graph.onNodeAdded = (node) => {
  node.widgets?.filter(widget => widget.type === "shader-view").forEach(widget => {
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(- 1, 1, 1, - 1, 0, 1);
    const geometry = new THREE.PlaneGeometry(1.9, 1.9);
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    //从 graph.extra["shader-view"] 寻找一个空位
    const k = Array.from(graph.extra["shader-view"].keys()).find(key => graph.extra["shader-view"].get(key) === null) as string;
    if (k) {
      const [x, y] = k.split("_").map(Number);
      (graph.extra["shader-view"] as Map<string, ShaderViewWidgetProps>).set(k, {
        x,
        y,
        scene,
        camera,
        mesh,
        material,
      });

      widget.value = {
        x,
        y,
        scene,
        camera,
        mesh,
        material,
      }
    }
  }
  )
}


const size = graph.extra["size"] as [number, number];
const tileSize = graph.extra["tileSize"] as number;

renderer.setSize(size[0], size[1]);

graph.extra["canvas"] = canvas2;
graph.extra["context"] = context2;
graph.extra["renderer"] = renderer;

graphCanvas.onRender = () => {

  renderer.setClearColor(0xffffff);
  renderer.setScissorTest(false);
  renderer.clear();

  renderer.setClearColor(0xe0e0e0);
  renderer.setScissorTest(true);

  const m = graph.extra["shader-view"] as Map<string, ShaderViewWidgetProps | null>;

  for (const [key, value] of m) {
    if (value === null) continue;
    // 渲染场景
    renderer.setViewport(value.x * tileSize, (1024 - (value.y * tileSize)) - tileSize, tileSize, tileSize);
    renderer.setScissor(value.x * tileSize, (1024 - (value.y * tileSize)) - tileSize, tileSize, tileSize);

    renderer.render(value.scene, value.camera);
  }
}




// ------------------------------------------------------------------

graph.add(LiteGraph.createNode(ShaderUVNode));



// 会导致渲染尺寸不正确
// renderer.setPixelRatio(window.devicePixelRatio)
