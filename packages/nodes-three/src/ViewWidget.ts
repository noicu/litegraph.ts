import { IWidget, LGraphNode, SerializedLGraphNode, Vector2, WidgetCallback } from "@litegraph-ts/core";
import * as THREE from "three";

export interface ShaderViewWidgetProps {
  x: number;
  y: number;
  scene: THREE.Scene;
  camera: THREE.Camera;
  mesh: THREE.Mesh;
  material: THREE.Material;
}

export class ShaderViewWidget implements IWidget<any, ShaderViewWidgetProps> {
  name = "shader-view"
  type = "shader-view"
  value: ShaderViewWidgetProps = null

  draw(ctx: CanvasRenderingContext2D, node: LGraphNode, width: number, posY: number, height: number): void {
    if (this.value) {
      const canvas = node.graph.extra['canvas']
      const tileSize = node.graph.extra["tileSize"]
      const size = Math.min(...node.size)

      ctx.drawImage(canvas, this.value.x * tileSize, this.value.y * tileSize, tileSize, tileSize, 0, 0, size, size);
    }
  }

  computeSize(width: number): [number, number] {
    return [width, width - 36]
  }
}
