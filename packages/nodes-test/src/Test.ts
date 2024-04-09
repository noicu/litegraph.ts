import { IWidget, LGraphNode, LiteGraph, SlotLayout, Vector2, clamp, isJson, isNumber } from "@litegraph-ts/core";

export interface CustomWidgetProperties extends Record<string, any> {

}

export default class Test extends LGraphNode {
  static slotLayout: SlotLayout = {
    inputs: [
      { name: "测试", type: "object" },
      { name: "object2", type: "object" },
      { name: "object2", type: "object" },
      { name: "object2", type: "object" },
      { name: "object2", type: "object" },
      { name: "object2", type: "object" },
      { name: "object2", type: "object" },
      { name: "object2", type: "object" },
      { name: "object2", type: "object" },
      { name: "object2", type: "object" },
      { name: "object2", type: "object" },
      { name: "object2", type: "object" },
      { name: "object2", type: "object" },
      { name: "object2", type: "object" },
      { name: "object2", type: "object" },
      { name: "object2", type: "object" },
      { name: "object2", type: "object" },
    ],
    outputs: [
      { name: "object", type: "object" },
      { name: "object2", type: "object" },
      { name: "object3", type: "object" },
      { name: "object4", type: "object" },
    ],
  }

  constructor(title?: string) {
    super(title)
    this.serialize_widgets = true;
    this.addWidget("text", "value", "", "value");
    this.widgets_up = true;
  }

  override properties: CustomWidgetProperties = {
    scale: 2
  }

  override onDrawForeground(ctx: CanvasRenderingContext2D) {

  }

  override onDrawBackground(ctx: CanvasRenderingContext2D) {

  };

  override onExecute(ctx: CanvasRenderingContext2D) {

  };
}

LiteGraph.registerNodeType({
  class: Test,
  title: "Test",
  desc: "Test",
  type: "test/test"
})
