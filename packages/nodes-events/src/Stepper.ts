import { BuiltInSlotType, LGraphNode, LiteGraph, OptionalSlots, PropertyLayout, SlotLayout, IButtonWidget, Vector2, LConnectionKind, LLink, INodeInputSlot, INodeOutputSlot, clamp } from "@litegraph-ts/core"

export interface StepperProperties extends Record<string, any> {
  index: number;
}


export default class Stepper extends LGraphNode {
  override properties: StepperProperties = {
    index: 0,
  }

  static slotLayout: SlotLayout = {
    inputs: [
      { name: "index", type: "number" },
      { name: "step", type: BuiltInSlotType.ACTION },
      { name: "reset", type: BuiltInSlotType.ACTION },
    ],
    outputs: [
      { name: "index", type: "number" },
      { name: "", type: BuiltInSlotType.EVENT },
      { name: "", type: BuiltInSlotType.EVENT },
      { name: "", type: BuiltInSlotType.EVENT, options: { removable: true } },
    ],
  }

  constructor(title?: string) {
    super(title)
    var that = this;
    this.size = [120, 120];
    this.addWidget("button", "+", null, function () {
      that.addOutput("", BuiltInSlotType.EVENT, { removable: true });
    });
  }

  onDrawBackground(ctx) {
    if (this.flags.collapsed) {
      return;
    }
    var index = this.properties.index || 0;
    ctx.fillStyle = "#AFB";
    var w = this.size[0];
    var y = (index + 1) * LiteGraph.NODE_SLOT_HEIGHT + 4;
    ctx.beginPath();
    ctx.moveTo(w - 30, y);
    ctx.lineTo(w - 30, y + LiteGraph.NODE_SLOT_HEIGHT);
    ctx.lineTo(w - 15, y + LiteGraph.NODE_SLOT_HEIGHT * 0.5);
    ctx.fill();
  }

  onExecute() {
    var index = this.getInputData(0);
    if (index != null) {
      index = Math.floor(index);
      index = clamp(index, 0, this.outputs ? (this.outputs.length - 2) : 0);
      if (index != this.properties.index) {
        this.properties.index = index;
        this.triggerSlot(index + 1);
      }
    }

    this.setOutputData(0, this.properties.index);
  }

  onAction(action, param) {
    if (action == "reset")
      this.properties.index = 0;
    else if (action == "step") {
      this.triggerSlot(this.properties.index + 1, param);
      var n = this.outputs ? this.outputs.length - 1 : 0;
      this.properties.index = (this.properties.index + 1) % n;
    }
  }
}

LiteGraph.registerNodeType({
  class: Stepper,
  title: "Stepper",
  desc: "Trigger events sequentially when an tick arrives",
  type: "events/stepper"
})
