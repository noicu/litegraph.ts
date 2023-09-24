import { BuiltInSlotType, LGraphNode, LiteGraph, OptionalSlots, PropertyLayout, SlotLayout, IButtonWidget, Vector2, LConnectionKind, LLink, INodeInputSlot, INodeOutputSlot } from "@litegraph-ts/core"

export default class Sequence extends LGraphNode {
    static slotLayout: SlotLayout = {
        inputs: [
            { name: "", type: BuiltInSlotType.ACTION },
            { name: "", type: BuiltInSlotType.ACTION },
            { name: "", type: BuiltInSlotType.ACTION },
        ],
        outputs: [
            { name: "", type: BuiltInSlotType.ACTION },
            { name: "", type: BuiltInSlotType.ACTION },
            { name: "", type: BuiltInSlotType.EVENT },
        ],
    }

    override size: Vector2 = [90, 70];
    flags:any = { horizontal: true, render_box: false };

    constructor(title?: string) {
        super(title)
        var that = this;
        this.addWidget("button","+",null,function(){
	        that.addInput("", BuiltInSlotType.ACTION);
	        that.addOutput("", BuiltInSlotType.EVENT);
        });
    }

    override getTitle(): string {
        if (this.horizontal)
            return "";
        else
            return this.title
    }

    override onAction(action: any, param: any, options: { action_call?: string }) {
        if (this.outputs) {
            options = options || {};
            for (var i = 0; i < this.outputs.length; ++i) {
				var output = this.outputs[i];
				//needs more info about this...
				if( options.action_call ) // CREATE A NEW ID FOR THE ACTION
	                options.action_call = options.action_call + "_seq_" + i;
				else
					options.action_call = this.id + "_" + (action ? action : "action")+"_seq_"+i+"_"+Math.floor(Math.random()*9999);
                this.triggerSlot(i, param, null, options);
            }
        }
    }
}

LiteGraph.registerNodeType({
    class: Sequence,
    title: "Sequence",
    desc: "Triggers a sequence of events when an event arrives",
    type: "events/sequence"
})
