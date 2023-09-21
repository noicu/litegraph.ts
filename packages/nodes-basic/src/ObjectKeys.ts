import { LGraphNode, LiteGraph, OptionalSlots, PropertyLayout, SlotLayout, Vector2 } from "@litegraph-ts/core"

export interface ObjectKeysProperties extends Record<string, any> {

}

export default class ObjectKeys extends LGraphNode {
    override properties: ObjectKeysProperties = {}

    static slotLayout: SlotLayout = {
        inputs: [
          { name: "obj", type: "object" },
        ],
        outputs: [
            { name: "keys", type: "array" }
        ]
    }

    constructor(title?: string) {
        super(title)
        this.size = [140, 30];
    }

    override onExecute() {
      var data = this.getInputData(0);
      if (data != null) {
          this.setOutputData(0, Object.keys(data) );
      }
    }
}

LiteGraph.registerNodeType({
    class: ObjectKeys,
    title: "Object keys",
    desc: "Outputs an array with the keys of an object",
    type: "basic/object_keys"
})
