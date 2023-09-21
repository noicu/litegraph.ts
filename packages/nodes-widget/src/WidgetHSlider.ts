import { LGraphNode, LiteGraph, SlotLayout, Vector2, clamp } from "@litegraph-ts/core";

export interface WidgetHSliderProperties extends Record<string, any> {
  color: string
  min: number
  max: number
  value: number
}

export default class WidgetHSlider extends LGraphNode {
  static slotLayout: SlotLayout = {
    inputs: [],
    outputs: [
      { name: "", type: "number" }
    ],
  }

  value: number = -1;

  constructor(title?: string) {
    super(title)

    this.size = [160, 26];
  }

  override properties: WidgetHSliderProperties = {
    color: "#7AF",
    min: 0,
    max: 1,
    value: 0.5
  }

  override onDrawForeground(ctx: CanvasRenderingContext2D) {
    if (this.value == -1) {
      this.value =
        (this.properties.value - this.properties.min) /
        (this.properties.max - this.properties.min);
    }

    //border
    ctx.globalAlpha = 1;
    ctx.lineWidth = 1;
    ctx.fillStyle = "#000";
    ctx.fillRect(2, 2, this.size[0] - 4, this.size[1] - 4);

    ctx.fillStyle = this.properties.color;
    ctx.beginPath();
    ctx.rect(4, 4, (this.size[0] - 8) * this.value, this.size[1] - 8);
    ctx.fill();
  }

  override onDrawBackground(ctx: CanvasRenderingContext2D) {

  };

  oldmouse: Vector2 = null;

  onMouseDown(e: any) {
    if (e.canvasY - this.pos[1] < 0) {
      return false;
    }

    this.oldmouse = [e.canvasX - this.pos[0], e.canvasY - this.pos[1]];
    this.captureInput(true);
    return true;
  };

  onMouseMove(e: any) {
    if (!this.oldmouse) {
      return;
    }

    var m = [e.canvasX - this.pos[0], e.canvasY - this.pos[1]] as Vector2;

    var v = this.value;
    var delta = m[0] - this.oldmouse[0];
    v += delta / this.size[0];
    if (v > 1.0) {
      v = 1.0;
    } else if (v < 0.0) {
      v = 0.0;
    }

    this.value = v;

    this.oldmouse = m;
    this.setDirtyCanvas(true);
  };

  onMouseUp(e: any) {
    this.oldmouse = null;
    this.captureInput(false);
  };

  onMouseLeave(e: any) {
    //this.oldmouse = null;
  };

  override onExecute(ctx: CanvasRenderingContext2D) {
    this.properties.value =
      this.properties.min +
      (this.properties.max - this.properties.min) * this.value;
    this.setOutputData(0, this.properties.value);
    this.boxcolor = LiteGraph.colorToString([
      this.value,
      this.value,
      this.value
    ]);
  };
}

LiteGraph.registerNodeType({
  class: WidgetHSlider,
  title: "H.Slider",
  desc: "Linear slider controller",
  type: "widget/hslider"
})
