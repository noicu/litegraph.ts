import { INumberWidget, LGraphNode, LiteGraph, OptionalSlots, PropertyLayout, SlotLayout, Vector2 } from "@litegraph-ts/core"
import { IClientManagerItem, useMqtt } from "./mqtt";

export interface MqClientProperties extends Record<string, any> {
    brokerUrl: string
    clientId: string
}

export default class MqClient extends LGraphNode {
    override properties: MqClientProperties = {
        brokerUrl: 'ws://192.168.1.86:8083/mqtt',
        clientId: 'client-' + Math.random().toString(36).substr(2, 5),
        username: '',
        password: '',
    }

    static slotLayout: SlotLayout = {
        inputs: [
            { name: "option", type: "object" },
        ],
        outputs: [
            { name: "client", type: "client" }
        ]
    }

    static optionalSlots: OptionalSlots = {
    }

    client: IClientManagerItem | null = null

    constructor(title?: string) {
        super(title)

        var option = this.getInputData(0);

        if (option) {
            this.properties.brokerUrl = option.brokerUrl || this.properties.brokerUrl;
            this.properties.clientId = option.clientId || this.properties.clientId;
            this.properties.username = option.username || this.properties.username;
            this.properties.password = option.password || this.properties.password;
        }

        if(this.properties.brokerUrl)
           this.client = useMqtt(this.properties.brokerUrl, {
                clientId: this.properties.clientId || undefined,
                username: this.properties.username || undefined,
                password: this.properties.password || undefined,
            })
    }

    override onExecute() {
        if(this.client?.connected){
            this.boxcolor = "#AFA";
        } else {
            this.boxcolor = "#F00";
        }
        this.setOutputData(0, this.client);
    }
}

LiteGraph.registerNodeType({
    class: MqClient,
    title: "Mqtt Client",
    desc: "Mqtt Client",
    type: "mqtt/client"
})
