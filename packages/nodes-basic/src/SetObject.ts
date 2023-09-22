import { LGraphNode, LiteGraph, OptionalSlots, PropertyLayout, SlotLayout, Vector2 } from "@litegraph-ts/core"

export interface SetObjectProperties extends Record<string, any> {
    property: number | string
}

export default class SetObject extends LGraphNode {
    override properties: SetObjectProperties = {
        property: ""
    }

    static slotLayout: SlotLayout = {
        inputs: [
          { name: "obj", type: "object" },
          { name: "value", type: "number,string" },
        ],
        outputs: [
            { name: "obj", type: "object" }
        ]
    }

    name_widget: any;

    constructor(title?: string) {
        super(title)
        this.name_widget = this.addWidget("text","prop.",this.properties.property,"property");
    }

    override onExecute() {
        var obj = this.getInputData(0);
		if(!obj)
			return;
        var v = this.getInputData(1);
		if(v === undefined )
			return;
		if(this.properties.property)
			obj[ this.properties.property ] = v;
		this.setOutputData(0,obj);
    }
}

LiteGraph.registerNodeType({
    class: SetObject,
    title: "Set Object",
    desc: "Adds propertiesrty to object",
    type: "basic/set_object"
})
