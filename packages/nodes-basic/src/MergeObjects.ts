import { LGraphNode, LiteGraph, OptionalSlots, PropertyLayout, SlotLayout, Vector2 } from "@litegraph-ts/core"

export interface MergeObjectsProperties extends Record<string, any> {
  property: string
}

export default class MergeObjects extends LGraphNode {
  override properties: MergeObjectsProperties = {
    property: ""
  }

  static slotLayout: SlotLayout = {
    inputs: [
      { name: "A", type: "object" },
      { name: "B", type: "object" },
    ],
    outputs: [
      { name: "out", type: "object" }
    ]
  }

  _result: Record<string, any> = {};

  constructor(title?: string) {
    super(title)
    var that = this;
    this.addWidget("button", "clear", "", function () {
      that._result = {};
    });
    this.size = this.computeSize();
  }

  override onExecute() {
    var A = this.getInputData(0);
    var B = this.getInputData(1);
    var C = this._result;
    if (A)
      for (var i in A)
        C[i] = A[i];
    if (B)
      for (var i in B)
        C[i] = B[i];
    this.setOutputData(0, C);
  }
}

LiteGraph.registerNodeType({
  class: MergeObjects,
  title: "Merge Objects",
  desc: "Creates an object copying properties from others",
  type: "basic/merge_objects"
})
