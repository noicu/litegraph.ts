import { LGraphNode, LiteGraph, SlotLayout, Vector2 } from "@litegraph-ts/core";

export interface WidgetKnobProperties extends Record<string, any> {
  min: number,
  max: number,
  value: number,
  color: string,
  precision: number
  radius: number
}

export default class WidgetKnob extends LGraphNode {
  static slotLayout: SlotLayout = {
    inputs: [],
    outputs: [
      { name: "", type: "number" },
    ],
  }

  override properties: WidgetKnobProperties = {
    min: 0,
    max: 1,
    value: 0.5,
    color: "#7AF",
    precision: 2,
    radius: 50
  }

  value: number = -1;
  oldmouse: Vector2 = null;
  center: Vector2 = null;

  override onDrawForeground(ctx: CanvasRenderingContext2D) {
    if (this.flags.collapsed) {
      return;
    }

    if (this.value == -1) {
      this.value =
        (this.properties.value - this.properties.min) /
        (this.properties.max - this.properties.min);
    }

    this.size[0] = this.size[1] = this.properties.radius * 2 + 20;

    var center_x = this.size[0] * 0.5;
    var center_y = this.size[1] * 0.5 + 10;

    var w = Math.floor(this.properties.radius * 0.05);



    ctx.globalAlpha = 1;
    ctx.save();
    ctx.translate(center_x, center_y);
    ctx.rotate(Math.PI * 0.75);

    //bg
    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, this.properties.radius, 0, Math.PI * 1.5);
    ctx.fill();

    //value
    ctx.strokeStyle = "black";
    ctx.fillStyle = this.properties.color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(
      0,
      0,
      this.properties.radius - 4,
      0,
      Math.PI * 1.5 * Math.max(0.01, this.value)
    );
    ctx.closePath();
    ctx.fill();
    //ctx.stroke();
    ctx.lineWidth = 1;
    ctx.globalAlpha = 1;
    ctx.restore();

    //inner
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(center_x, center_y, this.properties.radius * 0.75, 0, Math.PI * 2, true);
    ctx.fill();

    //miniball
    ctx.fillStyle = this.mouseOver ? "white" : this.properties.color;
    ctx.beginPath();
    var angle = this.value * Math.PI * 1.5 + Math.PI * 0.75;
    ctx.arc(
      center_x + Math.cos(angle) * this.properties.radius * 0.65,
      center_y + Math.sin(angle) * this.properties.radius * 0.65,
      this.properties.radius * 0.05,
      0,
      Math.PI * 2,
      true
    );
    ctx.fill();

    //text
    ctx.fillStyle = this.mouseOver ? "white" : "#AAA";
    ctx.font = Math.floor(this.properties.radius * 0.5) + "px Arial";
    ctx.textAlign = "center";
    ctx.fillText(
      this.properties.value.toFixed(this.properties.precision),
      center_x,
      center_y + this.properties.radius * 0.15
    );
  }

  override onExecute() {
    this.setOutputData(0, this.properties.value);
    this.boxcolor = LiteGraph.colorToString([
      this.value,
      this.value,
      this.value
    ]);
  };

  override onMouseDown(e: any) {
    this.center = [this.size[0] * 0.5, this.size[1] * 0.5 + 20];
    // this.radius = this.size[0] * 0.5;
    if (
      e.canvasY - this.pos[1] < 20 ||
      LiteGraph.distance(
        [e.canvasX, e.canvasY],
        [this.pos[0] + this.center[0], this.pos[1] + this.center[1]]
      ) > this.properties.radius
    ) {
      return false;
    }
    this.oldmouse = [e.canvasX - this.pos[0], e.canvasY - this.pos[1]];
    this.captureInput(true);
    return true;
  }

  override onMouseMove(e: any) {
    if (!this.oldmouse) {
      return;
    }

    var m = [e.canvasX - this.pos[0], e.canvasY - this.pos[1]] as Vector2;

    var v = this.value;
    v -= (m[1] - this.oldmouse[1]) * 0.01;
    if (v > 1.0) {
      v = 1.0;
    } else if (v < 0.0) {
      v = 0.0;
    }
    this.value = v;
    this.properties.value =
      this.properties.min +
      (this.properties.max - this.properties.min) * this.value;
    this.oldmouse = m;
    this.setDirtyCanvas(true);
  }

  override onMouseUp(e: MouseEvent) {
    if (this.oldmouse) {
      this.oldmouse = null;
      this.captureInput(false);
    }
  }

  override onPropertyChanged(name: string, value: any) {
    if (name == "min" || name == "max" || name == "value") {
      this.properties[name] = parseFloat(value);
      return true; //block
    }
  }
}

LiteGraph.registerNodeType({
  class: WidgetKnob,
  title: "Knob",
  desc: "Circular controller",
  type: "widget/knob"
})
