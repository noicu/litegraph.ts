import type { PropertyLayout, SlotLayout } from "@litegraph-ts/core"
import { LGraphNode, LiteGraph } from "@litegraph-ts/core"

export interface NodeScriptProperties extends Record<string, any> {
  onExecute: string;
}

export default class NodeScript extends LGraphNode {
  override properties: NodeScriptProperties = {
    onExecute: "return arg0;"
  }

  static slotLayout: SlotLayout = {
    inputs: [
      { name: "arg0", type: "*" },
    ],
    outputs: [
      { name: "return", type: "*" },
    ]
  }

  _func: Function = null;
  data: any = {};

  static widgets_info = {
    onExecute: { type: "code" }
  };

  constructor(title?: string) {
    super(title)
    const that = this;
    this.size = [60, 30];
    this.addWidget("button", "+", null, function () {
      that.addInput(`arg${that.inputs.length}`, "*", { removable: true });
    });
  }

  override onConfigure(o) {
    if (o.properties.onExecute && LiteGraph.allow_scripts)
      this.compileCode(o.properties.onExecute);
    else
      console.warn("Script not compiled, LiteGraph.allow_scripts is false");
  }

  onPropertyChanged = function (name, value) {
    if (name == "onExecute" && LiteGraph.allow_scripts)
      this.compileCode(value);
    else
      console.warn("Script not compiled, LiteGraph.allow_scripts is false");
  };

  compileCode(code) {
    this._func = null;
    if (code.length > 256) {
      console.warn("Script too long, max 256 chars");
    } else {
      var code_low = code.toLowerCase();
      var forbidden_words = [
        "script",
        "body",
        "document",
        "eval",
        "nodescript",
        "function"
      ]; //bad security solution
      for (var i = 0; i < forbidden_words.length; ++i) {
        if (code_low.indexOf(forbidden_words[i]) != -1) {
          console.warn("invalid script");
          return;
        }
      }
      try {
        this._func = new Function(...this.inputs.map((e,i)=> 'arg' + i), "DATA", "node", code);
      } catch (err) {
        console.error("Error parsing script");
        console.error(err);
      }
    }
  };

  override onExecute() {
    if (!this._func) {
      return;
    }

    try {
      this.setOutputData(0, this._func(...this.inputs.map((e,i)=> this.getInputData(i)), this.data, this));
    } catch (err) {
      console.error("Error in script");
      console.error(err);
    }
  }
}

LiteGraph.registerNodeType({
  class: NodeScript,
  title: "Script",
  desc: "executes a code (max 256 characters)",
  type: "basic/script"
})
