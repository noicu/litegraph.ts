import "@litegraph-ts/nodes-math"
import { LGraph, LGraphStatus, LiteGraph } from "@litegraph-ts/core";
import { ConstantNumber, Watch, ConstantString, ConstantJSON } from "@litegraph-ts/nodes-basic"
// import { MathOperation } from "@litegraph-ts/nodes-math"
import "@litegraph-ts/nodes-logic";
import "@litegraph-ts/nodes-widget";
import "@litegraph-ts/nodes-events";
import "@litegraph-ts/nodes-mqtt";
import "@litegraph-ts/nodes-strings";
import "@litegraph-ts/nodes-test";
import "@litegraph-ts/nodes-interface";
import { UpdateEvent } from "@litegraph-ts/nodes-three";
// import "@litegraph-ts/nodes-widget";
import { TimerEvent } from "@litegraph-ts/nodes-events";
// import { MqClient, MqPublish, MqSubscribe } from "@litegraph-ts/nodes-mqtt";
import Editor from "./Editor";

export function demo(editor: Editor) {
  var data = localStorage.getItem("graphdemo_save");
  if (data) {
    editor.graph.configure(JSON.parse(data));
    editor.graph.start();


    function ue_on_tick() {
      const ues = editor.graph.findNodesByClass(UpdateEvent)
      ues.forEach(ue => {
        ue.trigger("on_tick", {})
      });
    }

    editor.graph.onExecuteStep = ue_on_tick
    setInterval(() => {
      if (editor.graph.status === LGraphStatus.STATUS_RUNNING) {
        ue_on_tick()
      }
    }, 1000)


  }

  // multiConnection(graph);
}

function multiConnection(graph: LGraph) {
  // var node_button = LiteGraph.createNode("widget/button");
  // node_button.pos = [100, 400];
  // graph.add(node_button);

  // var node_console = LiteGraph.createNode("basic/console");
  // node_console.pos = [400, 400];
  // graph.add(node_console);
  // node_button.connect(0, node_console);

  // var node_timer = LiteGraph.createNode(TimerEvent);
  // node_timer.pos = [100, 100];
  // graph.add(node_timer);

  // var client = LiteGraph.createNode(MqClient);
  // client.pos = [100, 240];
  // graph.add(client);

  // var topic = LiteGraph.createNode(ConstantString);
  // topic.pos = [100, 340];
  // topic.setValue("test");
  // graph.add(topic);

  // var publish = LiteGraph.createNode(MqPublish);
  // publish.pos = [400, 200];
  // graph.add(publish);
  // // node_const_A.setValue(4.5);

  // var subscribe = LiteGraph.createNode(MqSubscribe);
  // subscribe.pos = [400, 500];
  // graph.add(subscribe);

  // var msg = LiteGraph.createNode(ConstantJSON);
  // msg.pos = [100, 500];
  // msg.setValue({ "test": 1 })
  // graph.add(msg);

  // var node_const_B = LiteGraph.createNode(ConstantNumber);
  // node_const_B.pos = [200, 300];
  // graph.add(node_const_B);
  // node_const_B.setValue(10);

  // var node_math = LiteGraph.createNode(MathOperation);
  // node_math.pos = [400, 400];
  // graph.add(node_math);

  // var node_watch = LiteGraph.createNode(Watch);
  // node_watch.pos = [700, 200];
  // graph.add(node_watch);

  // var node_watch2 = LiteGraph.createNode(Watch);
  // node_watch2.pos = [700, 300];
  // graph.add(node_watch2);

  // node_timer.connect(0, client, 0);
  // client.connect(0, publish, 1);
  // topic.connect(0, publish, 2);
  // msg.connect(0, publish, 3);
  // client.connect(0, subscribe, 0);
  // topic.connect(0, subscribe, 1);
  // node_const_B.connect(0, node_math, 1);
  // node_math.connect(0, node_watch, 0);
  // node_math.connect(0, node_watch2, 0);
}

function sortTest(graph: LGraph) {
  // var rand = LiteGraph.createNode("math/rand", null, { pos: [10, 100] });
  // graph.add(rand);

  // var nodes = [];
  // for (var i = 4; i >= 1; i--) {
  //     var n = LiteGraph.createNode("basic/watch", null, { pos: [i * 120, 100] });
  //     graph.add(n);
  //     nodes[i - 1] = n;
  // }

  // rand.connect(0, nodes[0], 0);

  // for (var i = 0; i < nodes.length - 1; i++)
  //     nodes[i].connect(0, nodes[i + 1], 0);
}

function benchmark() {
  // var num_nodes = 200;
  // var nodes = [];
  // for (var i = 0; i < num_nodes; i++) {
  //     var n = LiteGraph.createNode("basic/watch", null, { pos: [(2000 * Math.random()) | 0, (2000 * Math.random()) | 0] });
  //     graph.add(n);
  //     nodes.push(n);
  // }

  // for (var i = 0; i < nodes.length; i++)
  //     nodes[(Math.random() * nodes.length) | 0].connect(0, nodes[(Math.random() * nodes.length) | 0], 0);
}



//Show value inside the debug console
function TestWidgetsNode() {
  // this.addOutput("", "number");
  // this.properties = {};
  // var that = this;
  // this.slider = this.addWidget("slider", "Slider", 0.5, function(v) { }, { min: 0, max: 1 });
  // this.number = this.addWidget("number", "Number", 0.5, function(v) { }, { min: 0, max: 100 });
  // this.combo = this.addWidget("combo", "Combo", "red", function(v) { }, { values: ["red", "green", "blue"] });
  // this.text = this.addWidget("text", "Text", "edit me", function(v) { }, {});
  // this.text2 = this.addWidget("text", "Text", "multiline", function(v) { }, { multiline: true });
  // this.toggle = this.addWidget("toggle", "Toggle", true, function(v) { }, { on: "enabled", off: "disabled" });
  // this.button = this.addWidget("button", "Button", null, function(v) { }, {});
  // this.toggle2 = this.addWidget("toggle", "Disabled", true, function(v) { }, { on: "enabled", off: "disabled" });
  // this.toggle2.disabled = true;
  // this.size = this.computeSize();
  // this.serialize_widgets = true;
}

// TestWidgetsNode.title = "Widgets";

// LiteGraph.registerNodeType("features/widgets", TestWidgetsNode);

//Show value inside the debug console
function TestSpecialNode() {
  // this.addInput("", "number");
  // this.addOutput("", "number");
  // this.properties = {};
  // var that = this;
  // this.size = this.computeSize();
  // this.enabled = false;
  // this.visible = false;
}

// TestSpecialNode.title = "Custom Shapes";
// TestSpecialNode.title_mode = LiteGraph.TRANSPARENT_TITLE;
// TestSpecialNode.slot_start_y = 20;

// TestSpecialNode.prototype.onDrawBackground = function(ctx) {
//     if (this.flags.collapsed)
//         return;

//     ctx.fillStyle = "#555";
//     ctx.fillRect(0, 0, this.size[0], 20);

//     if (this.enabled) {
//         ctx.fillStyle = "#AFB";
//         ctx.beginPath();
//         ctx.moveTo(this.size[0] - 20, 0);
//         ctx.lineTo(this.size[0] - 25, 20);
//         ctx.lineTo(this.size[0], 20);
//         ctx.lineTo(this.size[0], 0);
//         ctx.fill();
//     }

//     if (this.visible) {
//         ctx.fillStyle = "#ABF";
//         ctx.beginPath();
//         ctx.moveTo(this.size[0] - 40, 0);
//         ctx.lineTo(this.size[0] - 45, 20);
//         ctx.lineTo(this.size[0] - 25, 20);
//         ctx.lineTo(this.size[0] - 20, 0);
//         ctx.fill();
//     }

//     ctx.strokeStyle = "#333";
//     ctx.beginPath();
//     ctx.moveTo(0, 20);
//     ctx.lineTo(this.size[0] + 1, 20);
//     ctx.moveTo(this.size[0] - 20, 0);
//     ctx.lineTo(this.size[0] - 25, 20);
//     ctx.moveTo(this.size[0] - 40, 0);
//     ctx.lineTo(this.size[0] - 45, 20);
//     ctx.stroke();

//     if (this.mouseOver) {
//         ctx.fillStyle = "#AAA";
//         ctx.fillText("Example of helper", 0, this.size[1] + 14);
//     }
// }

// TestSpecialNode.prototype.onMouseDown = function(e, pos) {
//     if (pos[1] > 20)
//         return;

//     if (pos[0] > this.size[0] - 20)
//         this.enabled = !this.enabled;
//     else if (pos[0] > this.size[0] - 40)
//         this.visible = !this.visible;
// }

// TestSpecialNode.prototype.onBounding = function(rect) {
//     if (!this.flags.collapsed && this.mouseOver)
//         rect[3] = this.size[1] + 20;
// }

// LiteGraph.registerNodeType("features/shape", TestSpecialNode);



// //Show value inside the debug console
// function TestSlotsNode() {
//     this.addInput("C", "number");
//     this.addOutput("A", "number");
//     this.addOutput("B", "number");
//     this.horizontal = true;
//     this.size = [100, 40];
// }

// TestSlotsNode.title = "Flat Slots";


// LiteGraph.registerNodeType("features/slots", TestSlotsNode);


// //Show value inside the debug console
// function TestPropertyEditorsNode() {
//     this.properties = {
//         name: "foo",
//         age: 10,
//         alive: true,
//         children: ["John", "Emily", "Charles"],
//         skills: {
//             speed: 10,
//             dexterity: 100
//         }
//     }

//     var that = this;
//     this.addWidget("button", "Log", null, function() {
//         console.log(that.properties);
//     });
// }

// TestPropertyEditorsNode.title = "Properties";


// LiteGraph.registerNodeType("features/properties_editor", TestPropertyEditorsNode);
