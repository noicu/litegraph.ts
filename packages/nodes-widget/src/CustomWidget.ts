import { IWidget, LGraphNode, LiteGraph, SlotLayout, Vector2, clamp, isJson, isNumber } from "@litegraph-ts/core";

export interface CustomWidgetProperties extends Record<string, any> {

}

export default class CustomWidget extends LGraphNode {
  static slotLayout: SlotLayout = {
    inputs: [],
    outputs: [
      { name: "object", type: "object" },
    ],
  }

  textWidget: IWidget;
  data: string = "";

  constructor(title?: string) {
    super(title)

    this.textWidget = this.addWidget(
        "text",
        "array",
        '',
    );
    this.data = ''
    this.serialize_widgets = true;
  }

  override properties: CustomWidgetProperties = {
    scale: 2
  }

  override onDrawForeground(ctx: CanvasRenderingContext2D) {

    if(this.data !== this.textWidget.value && isJson(this.textWidget.value)) {
      this.data = this.textWidget.value

      this.widgets = [
        this.textWidget,
      ]

      const data = JSON.parse(this.textWidget.value) as any[]

      const dataNames = data.map((input) => input.name)
      const names = this.inputs.map((input) => input.name)

      this.inputs.forEach((input,i) => {
        if(!dataNames.includes(input.name))
          this.removeInput(i)
      })

     data.forEach((input: any) => {
        if(names.includes(input.name))
          return
        this.addInput(input.name, input.type || 'number')
      })
    }
  }

  override onDrawBackground(ctx: CanvasRenderingContext2D) {

  };

  override onExecute(ctx: CanvasRenderingContext2D) {
    const _data:any = {}
    this.inputs.forEach((input,i) => {
      if(isNumber(this.getInputData(i)))
        _data[input.name] = Number(this.getInputData(i).toFixed(2))
    })
    console.log("execute", _data)
    this.setOutputData(0, _data)
  };
}

LiteGraph.registerNodeType({
  class: CustomWidget,
  title: "Custom Widget",
  desc: "Custom Widget",
  type: "widget/custom_widget"
})
