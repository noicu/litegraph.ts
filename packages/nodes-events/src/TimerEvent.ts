import { BuiltInSlotType, LGraphNode, LiteGraph, OptionalSlots, PropertyLayout, SlotLayout, Vector2 } from "@litegraph-ts/core"

export interface TimerEventProperties extends Record<string, any> {
  interval: number
  event: string
}

export default class TimerEvent extends LGraphNode {
  override properties: TimerEventProperties = {
    interval: 1000,
    event: "tick"
  }

  static slotLayout: SlotLayout = {
    inputs: [],
    outputs: [
      { name: "on_tick", type: BuiltInSlotType.EVENT },
    ],
  }

  timer: number = 0;
  time: number = 0;
  last_interval: number = 1000;
  triggered: boolean = false;

  static on_color: string = "#AAA";
  static off_color: string = "#222";

  // override size: Vector2 = [60, 30];

  onStart() {
    this.timer = 0;
  }

  getTitle() {
    return "Timer: " + this.last_interval.toString() + "ms";
  }

  onDrawBackground() {
    this.boxcolor = this.triggered
      ? TimerEvent.on_color
      : TimerEvent.off_color;
    this.triggered = false;
  }

  override onExecute(param: any, options: object) {
    var dt = this.graph.elapsed_time * 1000; //in ms

    var trigger = this.time == 0;

    this.time += dt;
    this.last_interval = Math.max(
      1,
      this.getInputOrProperty("interval") | 0
    );

    if (
      !trigger &&
      (this.time < this.last_interval || isNaN(this.last_interval))
    ) {
      if (this.inputs && this.inputs.length > 1 && this.inputs[1]) {
        this.setOutputData(1, false);
      }
      return;
    }

    this.triggered = true;
    this.time = this.time % this.last_interval;
    this.trigger("on_tick", this.properties.event);
    if (this.inputs && this.inputs.length > 1 && this.inputs[1]) {
      this.setOutputData(1, true);
    }
  }

  onGetInputs() {
    return [["interval", "number"]];
  }

  onGetOutputs() {
    return [["tick", "boolean"]];
  };
}

LiteGraph.registerNodeType({
  class: TimerEvent,
  title: "Timer",
  desc: "Sends an event every N milliseconds",
  type: "events/timer"
})
