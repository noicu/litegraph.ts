import { BuiltInSlotType, INumberWidget, LGraphNode, LiteGraph, OptionalSlots, PropertyLayout, SlotLayout, Vector2 } from "@litegraph-ts/core"
import { IClientManagerItem, useMqtt } from "./mqtt";

export interface MqPublishProperties extends Record<string, any> {
  topic: string
}

export default class MqPublish extends LGraphNode {
  override properties: MqPublishProperties = {
    topic: '',
  }

  static slotLayout: SlotLayout = {
    inputs: [
      { name: "event", type: BuiltInSlotType.ACTION },
      { name: "client", type: "client" },
      { name: "topic", type: "string" },
      { name: "msg", type: "object" },
    ],
    outputs: [
      { name: "event", type: BuiltInSlotType.EVENT },
    ]
  }

  static optionalSlots: OptionalSlots = {
  }

  client: IClientManagerItem | null = null
  topic: string = ''

  constructor(title?: string) {
    super(title)
  }

  override onExecute(): void {
    var client = this.getInputData(1) as IClientManagerItem;
    var topic = this.getInputData(2) as string;

    if(client) {
      this.client = client;
    } else {
      this.client = null;
    }
    if(topic) {
      this.topic = topic;
      this.properties.topic = topic;
    } else {
      this.topic = this.properties.topic || '';
    }
  }

  override onAction(action: any, param: any, options: { action_call?: string }) {

    // console.log("[LogEvent] Event received:", action, param, options);

    if(!this.client || !this.topic) return;

    var msg = this.getInputData(3);
    // console.log("[LogEvent] Event received:", msg);

    if(msg && typeof msg === 'object')
      this.client.publish(this.topic, JSON.stringify(msg || {}));
    else
      this.client.publish(this.topic, msg || '');

    this.trigger("event", {
      action: action,
      param: param,
      options: options,
    });
  }
}

LiteGraph.registerNodeType({
  class: MqPublish,
  title: "Mqtt Publish",
  desc: "Mqtt Publish",
  type: "mqtt/publish"
})
