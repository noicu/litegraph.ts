import { BuiltInSlotType, ITextWidget, LGraphNode, LiteGraph, OptionalSlots, PropertyLayout, SlotLayout, Vector2, hasCircularReference, isJson, isObject } from "@litegraph-ts/core"

export interface LogEventProperties extends Record<string, any> {
}

export default class LogEvent extends LGraphNode {
    override properties: LogEventProperties = {
    }

    static slotLayout: SlotLayout = {
        inputs: [
            { name: "event", type: BuiltInSlotType.ACTION },
            { name: "param", type: "*" },
        ],
    }

    static propertyLayout: PropertyLayout = [
    ]

    static optionalSlots: OptionalSlots = {
    }

    override size: Vector2 = [60, 30];

    actionWidget: ITextWidget;
    // paramWidget: ITextWidget;
    // optionsWidget: ITextWidget;

    constructor(title?: string) {
        super(title)
        this.actionWidget = this.addWidget("text", "Action", "", null, { multiline: true, max_length: 100 })
        // this.paramWidget = this.addWidget("text", "Param", "", null, { multiline: true, max_length: 100 })
        // this.optionsWidget = this.addWidget("text", "Opts", "", null, { multiline: true, max_length: 100 })
    }

    override onAction(action: any, param: any, options: { action_call?: string }) {
        // console.log("[LogEvent] Event received:", action, param, options);
        console.log("[LogEvent] Event received:", action, this.getInputData(1), options);
        this.actionWidget.value = isObject(action) && !hasCircularReference(options) ? JSON.stringify(action) : `${action}`;
        // this.paramWidget.value = isObject(param) && !hasCircularReference(options) ? JSON.stringify(param) : `${param}`;
        // this.optionsWidget.value = isObject(options) && !hasCircularReference(options) ? JSON.stringify(options) : `${options}`;
    }
}

LiteGraph.registerNodeType({
    class: LogEvent,
    title: "Log Event",
    desc: "Log event in console",
    type: "events/log"
})
