import {
  BuiltInSlotType,
  LGraphNode,
  LiteGraph,
  SlotLayout,
} from "@litegraph-ts/core";

import * as THREE from "three";


export default class ThreeJSNode extends LGraphNode {
  static slotLayout: SlotLayout = {
    inputs: [
      { name: "init", type: BuiltInSlotType.ACTION },
    ],
  }

  canvas: HTMLCanvasElement;

  context: WebGLRenderingContext;

  scene: THREE.Scene;

  camera: THREE.PerspectiveCamera;

  renderer: THREE.WebGLRenderer;

  cube: THREE.Mesh;

  size: [number, number] = [300, 300];

  constructor() {
    super();
    this.canvas = document.createElement("canvas");
    this.canvas.width = this.size[0];
    this.canvas.height = this.size[1];
    this.context = this.canvas.getContext("webgl2")!;
    this.properties = {};

    // Set up Three.js scene
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, this.size[0] / this.size[1], 0.1, 1000);
    console.log(this.canvas);
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
    });

    this.renderer.setSize(this.size[0], this.size[1]);

    // Set up a light
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 0, 1);
    this.scene.add(light);

    // Add a cube to the scene
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);
    this.camera.position.z = 5;
  }

  override onDrawForeground(ctx: CanvasRenderingContext2D) {
    this.size = [300, 300];
    ctx.drawImage(this.canvas, 0, 0, this.size[0], this.size[1]);
  }

  override onDrawBackground(ctx: CanvasRenderingContext2D) {

  };

  override onExecute(ctx: CanvasRenderingContext2D) {
    // Rotate the cube for some animation
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;

    // 渲染场景
    this.renderer.render(this.scene, this.camera);

    // Draw the Three.js canvas onto the node's canvas
    // ctx.drawImage(this.canvas, 0, 0, this.size[0], this.size[1]);
    // this.setOutputData(0, this.canvas);
  };
}

LiteGraph.registerNodeType({
  class: ThreeJSNode,
  title: "ThreeJS Node",
  desc: "ThreeJS Node",
  type: "three/threejs"
})
