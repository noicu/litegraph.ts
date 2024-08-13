import {
  BuiltInSlotType,
  LGraphNode,
  LiteGraph,
  SlotLayout,
} from "@litegraph-ts/core";


export default class UpdateEvent extends LGraphNode {
  static slotLayout: SlotLayout = {
    inputs: [],
    outputs: [
      { name: "on_tick", type: BuiltInSlotType.EVENT },
    ],
  }

  override size: [number, number] = [300, 300];

  override onDrawForeground(ctx: CanvasRenderingContext2D) {

  }

  override onDrawBackground(ctx: CanvasRenderingContext2D) {

  };

  override onExecute(ctx: CanvasRenderingContext2D) {
  };
}

LiteGraph.registerNodeType({
  class: UpdateEvent,
  title: "Update Event",
  desc: "Update Event",
  type: "three/update_event"
})
