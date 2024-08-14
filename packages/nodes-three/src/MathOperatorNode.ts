import {
  BuiltInSlotType,
  INodeConnection,
  INodeOutputSlot,
  LGraph,
  LGraphNode,
  LiteGraph,
  SlotLayout,
  Vector2,
} from "@litegraph-ts/core";

import * as THREE from "three";
import { ShaderViewWidget } from "./ViewWidget";


export default class MathOperatorNode extends LGraphNode {
  static slotLayout: SlotLayout = {
    inputs: [
      {
        name: "a",
        type: 'uv',
      },
      {
        name: "b",
        type: 'uv',
      },
    ],
    outputs: [
      {
        name: "uv",
        type: 'uv',
      },
    ],
  }

  /**
   * TODO: 添加输入输出小部件时会重新计算尺寸,导致覆盖设置的尺寸
   * 详情 全局搜索 setSize 查看调用情况
   * TODO: webgl 上下文过多会导致上下文丢失
   */
  override size: [number, number] = [300, 300];

  widget: ShaderViewWidget | null = null;

  material: THREE.ShaderMaterial | null = null;

  vertexHGLSL = `varying vec2 vUv_0;`
  vertexGLSL = `vUv_0 = uv;`
  fragmentHGLSL = `varying vec2 vUv_0;`
  fragmentGLSL = `vUv_0`

  constructor(title?: string) {
    super(title);



    this.widget = this.addCustomWidget(new ShaderViewWidget())
  }

  override onAddedToGraph(graph: LGraph) {

  }

  override onExecute() {
    this.material = new THREE.ShaderMaterial({
      // uniforms: this.uniforms,
      vertexShader:`
      ${this.getInputData(1).vertexHGLSL}
      void main() {
          ${this.getInputData(1).vertexGLSL}
          // 通常需要计算和传递顶点位置
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
      `,
      fragmentShader: `
      ${this.getInputData(1).fragmentHGLSL}

      void main() {

          vec3 color = vec3(${this.getInputData(1).fragmentGLSL} * ${this.getInputData(1).fragmentGLSL}, 0); // R 分量为 u，G 分量为 v，B 分量为 0
          gl_FragColor = vec4(color, 1.0); // 输出最终颜色
      }
      `
    });

    this.widget.value.mesh.material = this.material;
  };
}

LiteGraph.registerNodeType({
  class: MathOperatorNode,
  title: "Math Operator",
  desc: "Math Operator",
  type: "three/math-operator"
})
