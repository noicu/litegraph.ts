import { INumberWidget, LGraphNode, LiteGraph, OptionalSlots, PropertyLayout, SlotLayout, Vector2 } from "@litegraph-ts/core"

export interface MqClientProperties extends Record<string, any> {
    index: number
}

export default class MqClient extends LGraphNode {
    override properties: MqClientProperties = {
        index: 0
    }

    static slotLayout: SlotLayout = {
        inputs: [
            { name: "arr", type: "array" },
            { name: "value", type: "" }
        ],
        outputs: [
            { name: "arr", type: "object" }
        ]
    }

    // static propertyLayout: PropertyLayout = [
    //     { name: "index", defaultValue: 0 },
    //     { name: "index", defaultValue: 0 },
    // ]

    static optionalSlots: OptionalSlots = {
    }

    widget: INumberWidget;

    constructor(title?: string) {
        super(title)
        this.addWidget(
            "text",
            "i",
            this.properties.index,
            "index",
            { precision: 0, step: 10, min: 0 }
        );
        this.addWidget(
            "combo",
            "Combo",
            "red",
            () => { },
            {
                values: ["red", "green", "blue"]
            }
        );
        this.addWidget(
            "combo",
            "Combo",
            1,
            () => { },
            {
                values: {
                    "title1": 1, "title2": 2
                }
            }
        );
        this.addWidget(
            "slider",
            "Slider",
            0.5,
            () => { },
            { precision: 0, step: 10, min: 0 }
        );
        this.addWidget(
            "toggle",
            "Toggle",
            0.5,
            () => { },
            { precision: 0, step: 10, min: 0 }
        );
        this.addWidget(
            "button",
            "Button",
            0.5,
            () => { },
            { precision: 0, step: 10, min: 0 }
        );

        this.widget = this.addWidget("number", "i", this.properties.index, "index", { precision: 0, step: 10, min: 0 });
        this.widgets_up = true;
    }

    override onExecute() {
        var arr = this.getInputData(0);
        if (!arr)
            return;
        var v = this.getInputData(1);
        if (v === undefined)
            return;

        const index = Math.floor(this.properties.index)
        if (index >= 0 && index < arr.length) {
            this.boxcolor = "#AEA";
            arr[index] = v;
        }
        else {
            this.boxcolor = "red";
        }

        this.setOutputData(0, arr);
    }
}

LiteGraph.registerNodeType({
    class: MqClient,
    title: "Mqtt Client",
    desc: "Mqtt Client",
    type: "mqtt/client"
})
