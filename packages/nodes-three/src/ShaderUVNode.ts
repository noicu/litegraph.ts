import {
  BuiltInSlotType,
  INodeConnection,
  LGraph,
  LGraphNode,
  LiteGraph,
  SlotLayout,
  Vector2,
} from "@litegraph-ts/core";

import * as THREE from "three";
import { ShaderViewWidget } from "./ViewWidget";

const vertexShader = `
varying vec2 vUv_0;   // 传递给片元着色器的 UV 坐标

void main() {
    vUv_0 = uv; // 将 UV 坐标传递给片元着色器
    // 通常需要计算和传递顶点位置
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`
const fragmentShader = `
varying vec2 vUv_0; // 从顶点着色器传递的 UV 坐标

void main() {
    // 直接使用 UV 坐标作为颜色值
    vec3 color = vec3(vUv_0, 0); // R 分量为 u，G 分量为 v，B 分量为 0
    gl_FragColor = vec4(color, 1.0); // 输出最终颜色
}
`


export default class ShaderUVNode extends LGraphNode {
  static slotLayout: SlotLayout = {
    inputs: [],
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

    this.material = new THREE.ShaderMaterial({
      // uniforms: this.uniforms,
      vertexShader,
      fragmentShader
    });

    this.widget = this.addCustomWidget(new ShaderViewWidget())
  }

  override onAddedToGraph(graph: LGraph) {
    this.widget.value.mesh.material = this.material;
  }

  override onExecute() {
    this.triggerSlot(0, {
      vertexHGLSL: this.vertexHGLSL,
      vertexGLSL: this.vertexHGLSL,
      fragmentHGLSL: this.vertexHGLSL,
      fragmentGLSL: this.vertexHGLSL,
    });
  };
}

LiteGraph.registerNodeType({
  class: ShaderUVNode,
  title: "UV",
  desc: "UV",
  type: "three/uv"
})
