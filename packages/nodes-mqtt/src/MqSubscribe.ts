import { BuiltInSlotType, INumberWidget, LGraphNode, LiteGraph, OptionalSlots, PropertyLayout, SlotLayout, Vector2, isJson } from "@litegraph-ts/core"
import { IClientManagerItem, useMqtt } from "./mqtt";

export interface MqSubscribeProperties extends Record<string, any> {
  topic: string
}

export default class MqSubscribe extends LGraphNode {
  override properties: MqSubscribeProperties = {
    topic: '',
  }

  static slotLayout: SlotLayout = {
    inputs: [
      { name: "client", type: "client" },
      { name: "topic", type: "string" },
    ],
    outputs: [
      { name: "event", type: BuiltInSlotType.EVENT },
    ]
  }

  client: IClientManagerItem | null = null
  topic: string = ''
  topics: string[] = []

  constructor(title?: string) {
    super(title)
  }

  override onExecute(): void {
    var client = this.getInputData(0) as IClientManagerItem;
    var topic = this.getInputData(1) as string;

    if (client) {
      this.client = client;
    } else {
      this.client = null;
    }

    if (topic) {
      this.topic = topic;
      this.properties.topic = topic;
    } else {
      this.topic = this.properties.topic || '';
    }

    if (!this.client?.connected ||
      !this.client ||
      !this.topic ||
      this.client.topics[this.topic] ||
      this.topics.includes(this.topic)
    ) return;

    this.topics.push(this.topic);
    this.client.sub(this.topic, (topic, payload) => {
      const msg = payload.toString();
      if(isJson(msg)){
        this.trigger("event", JSON.parse(payload.toString()));
      } else {
        this.trigger("event", msg);
      }

      console.log(`[MqSubscribe] ${topic}: ${msg}`,isJson(msg));
    });
  }
}

LiteGraph.registerNodeType({
  class: MqSubscribe,
  title: "Mqtt Subscribe",
  desc: "Mqtt Subscribe",
  type: "mqtt/subscribe"
})
