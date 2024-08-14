import {
  BuiltInSlotType,
  LGraphNode,
  LiteGraph,
  SlotLayout,
} from "@litegraph-ts/core";

import * as THREE from "three";

const vertexShader = `
attribute vec2 aUV_1; // 从顶点数据接收的 UV 坐标
varying vec2 vUv_0;   // 传递给片元着色器的 UV 坐标

void main() {
    vUv_0 = uv; // 将 UV 坐标传递给片元着色器
    // 通常需要计算和传递顶点位置
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}

`
const fragmentShader = `
precision mediump float;

varying vec2 vUv_0; // 从顶点着色器传递的 UV 坐标

void main() {
    // 直接使用 UV 坐标作为颜色值
    vec3 color = vec3(vUv_0, 0); // R 分量为 u，G 分量为 v，B 分量为 0
    gl_FragColor = vec4(color, 1.0); // 输出最终颜色
}

`


export default class ThreeJSNode extends LGraphNode {
  static slotLayout: SlotLayout = {
    inputs: [
      { name: "init", type: BuiltInSlotType.ACTION },
    ],
  }

  scene: THREE.Scene;
  camera: THREE.OrthographicCamera;
  mesh: THREE.Mesh;

  uniforms = {
    time: { value: 1.0 }
  };

  /**
   * TODO: 添加输入输出小部件时会重新计算尺寸,导致覆盖设置的尺寸
   * 详情 全局搜索 setSize 查看调用情况
   * TODO: webgl 上下文过多会导致上下文丢失
   */
  override size: [number, number] = [300, 300];

  constructor(title?: string) {
    super(title);

    this.scene = new THREE.Scene();
    this.camera = new THREE.OrthographicCamera(- 1, 1, 1, - 1, 0, 1);
    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      // uniforms: this.uniforms,
      vertexShader,
      fragmentShader
    });

    this.mesh = new THREE.Mesh(geometry, material);
    this.scene.add(this.mesh);

    this.addCustomWidget({
      name: '',
      value: '1',
      draw: (
        ctx: CanvasRenderingContext2D,
        node: LGraphNode,
        width: number,
        posY: number,
        height: number
      ) => {
        const size = Math.min(...this.size)
        ctx.drawImage(this.graph.extra['canvas'], 0, 0, 300, 300, 0, 0, size, size);
      },
      mouse(event) {
        console.log('mouse', event.type)
        return true
      },
      computeSize: (width) => {
        // this.renderer.setSize(width, width - 36);
        return [width, width - 36]
      }
    })
  }

  override onExecute() {
    this.uniforms['time'].value = this.getRootGraph().getFixedTime();

    // 渲染场景
    this.graph.extra['renderer'].render(this.scene, this.camera);
  };
}

LiteGraph.registerNodeType({
  class: ThreeJSNode,
  title: "ThreeJS Node",
  desc: "ThreeJS Node",
  type: "three/threejs"
})


// // 裁剪区域的坐标和尺寸
// var x = 100, y = 100, width = 20, height = 20;

// ctx.drawImage

// // 创建一个数组来保存读取的像素数据
// var pixels = new Uint8Array(width * height * 4);

// // 从 WebGL2 Canvas 中读取像素数据
// this.context.readPixels(x, y, width, height, this.context.RGBA, this.context.UNSIGNED_BYTE, pixels);

// var imageData = ctx.createImageData(width, height);

// // WebGL 坐标系和 Canvas 坐标系的 Y 轴是反转的，因此需要翻转像素数据
// for (var row = 0; row < height; row++) {
//   for (var col = 0; col < width; col++) {
//       var sourceIndex = ((height - 1 - row) * width + col) * 4;
//       var destIndex = (row * width + col) * 4;
//       imageData.data[destIndex] = pixels[sourceIndex];
//       imageData.data[destIndex + 1] = pixels[sourceIndex + 1];
//       imageData.data[destIndex + 2] = pixels[sourceIndex + 2];
//       imageData.data[destIndex + 3] = pixels[sourceIndex + 3];
//   }
// }

// // 将 ImageData 绘制到新的 Canvas 上
// ctx.putImageData(imageData, 0, 0);
