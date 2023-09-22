import { BuiltInSlotShape, LGraphNode, LiteGraph, OptionalSlots, PropertyLayout, SlotLayout, Vector2 } from "@litegraph-ts/core"

export interface ObjectElementProperties extends Record<string, any> {
    key: number | string
}

export default class ObjectElement extends LGraphNode {
    override properties: ObjectElementProperties = {
        key: ''
    }

    static slotLayout: SlotLayout = {
        inputs: [
            { name: "object", type: "object,array", options: { shape: BuiltInSlotShape.GRID_SHAPE } },
            { name: "key", type: "number,string" }
        ],
        outputs: [
            { name: "value", type: "" }
        ]
    }

    static propertyLayout: PropertyLayout = [
        { name: "key", defaultValue: 0 }
    ]

    static optionalSlots: OptionalSlots = {
    }

    // override size: Vector2 = [180, 30];

    name_widget1: any;
    name_widget: any;

    constructor(title?: string) {
        super(title);

        this.name_widget1 = this.addWidget("text","",'');
        this.name_widget1.disabled = true;

        this.name_widget = this.addWidget("text","key.",this.properties.key,"key");
        this.widgets_up = true;
        this.serialize_widgets = true;
    }

    override onExecute() {
        const obj = this.getInputData(0);
        let key = this.getInputData(1);

        

        if (key == null)
            key = this.properties.key;

        if (obj == null || key == null) {
            this.boxcolor = "red";
            return;
        }

        this.boxcolor = "#AEA";
        this.setOutputData(0, obj[key]);


    }
}

LiteGraph.registerNodeType({
    class: ObjectElement,
    title: "Object[key]",
    desc: "Returns an element from an object",
    type: "basic/object[]"
})
