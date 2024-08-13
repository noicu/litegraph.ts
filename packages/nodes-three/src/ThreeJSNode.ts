import {
  BuiltInSlotType,
  LGraphNode,
  LiteGraph,
  SlotLayout,
} from "@litegraph-ts/core";

import * as THREE from "three";

const vertexShader = `
varying vec2 vUv;

void main()	{

  vUv = uv;

  gl_Position = vec4( position, 1.0 );

}
`
const fragmentShader = `
varying vec2 vUv;

uniform float time;

void main()	{

  vec2 p = - 1.0 + 2.0 * vUv;
  float a = time * 40.0;
  float d, e, f, g = 1.0 / 40.0 ,h ,i ,r ,q;

  e = 400.0 * ( p.x * 0.5 + 0.5 );
  f = 400.0 * ( p.y * 0.5 + 0.5 );
  i = 200.0 + sin( e * g + a / 150.0 ) * 20.0;
  d = 200.0 + cos( f * g / 2.0 ) * 18.0 + cos( e * g ) * 7.0;
  r = sqrt( pow( abs( i - e ), 2.0 ) + pow( abs( d - f ), 2.0 ) );
  q = f / r;
  e = ( r * cos( q ) ) - a / 2.0;
  f = ( r * sin( q ) ) - a / 2.0;
  d = sin( e * g ) * 176.0 + sin( e * g ) * 164.0 + r;
  h = ( ( f + d ) + a / 2.0 ) * g;
  i = cos( h + r * p.x / 1.3 ) * ( e + e + a ) + cos( q * g * 6.0 ) * ( r + h / 3.0 );
  h = sin( f * g ) * 144.0 - sin( e * g ) * 212.0 * p.x;
  h = ( h + ( f - e ) * q + sin( r - ( a + h ) / 7.0 ) * 10.0 + i / 4.0 ) * g;
  i += cos( h * 2.3 * sin( a / 350.0 - q ) ) * 184.0 * sin( q - ( r * 4.3 + a / 12.0 ) * g ) + tan( r * g + h ) * 184.0 * cos( r * g + h );
  i = mod( i / 5.6, 256.0 ) / 64.0;
  if ( i < 0.0 ) i += 4.0;
  if ( i >= 2.0 ) i = 4.0 - i;
  d = r / 350.0;
  d += sin( d * d * 8.0 ) * 0.52;
  f = ( sin( a * g ) + 1.0 ) / 2.0;
  gl_FragColor = vec4( vec3( f * i / 1.6, i / 2.0 + d / 13.0, i ) * d * p.x + vec3( i / 1.3 + d / 8.0, i / 2.0 + d / 18.0, i ) * d * ( 1.0 - p.x ), 1.0 );

}
`


export default class ThreeJSNode extends LGraphNode {
  static slotLayout: SlotLayout = {
    inputs: [
      { name: "init", type: BuiltInSlotType.ACTION },
    ],
  }

  canvas: HTMLCanvasElement;

  context: WebGLRenderingContext;

  scene: THREE.Scene;

  camera: THREE.OrthographicCamera;

  renderer: THREE.WebGLRenderer;

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

    this.canvas = document.createElement("canvas");
    this.canvas.width = this.size[0];
    this.canvas.height = this.size[1];
    this.context = this.canvas.getContext("webgl2")!;
    this.properties = {};

    // Set up Three.js scene
    this.scene = new THREE.Scene();
    this.camera = new THREE.OrthographicCamera(- 1, 1, 1, - 1, 0, 1);

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
    });

    this.renderer.setSize(this.size[0], this.size[1]);


    // Add a cube to the scene
    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader,
      fragmentShader
    });

    this.mesh = new THREE.Mesh( geometry, material );

    this.scene.add(this.mesh);

		this.renderer.setPixelRatio( window.devicePixelRatio );

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
        ctx.drawImage(this.canvas, 0, 0, size, size);
      },
      computeSize: (width) => {

        this.renderer.setSize(width, width - 36);
        return [width, width - 36]
      }
    })
  }

  override onExecute() {
    // Rotate the cube for some animation
    this.uniforms[ 'time' ].value = this.getRootGraph().getFixedTime();

    // 渲染场景
    this.renderer.render(this.scene, this.camera);
  };
}

LiteGraph.registerNodeType({
  class: ThreeJSNode,
  title: "ThreeJS Node",
  desc: "ThreeJS Node",
  type: "three/threejs"
})
