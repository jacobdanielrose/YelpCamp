import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Mesh,
  MeshBasicMaterial,
  BoxGeometry, Color, TextureLoader
} from 'three';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

@Component({
  selector: 'app-animation',
  templateUrl: './animation.component.html',
  styleUrls: ['./animation.component.scss']
})
export class AnimationComponent implements OnInit, AfterViewInit {

  @ViewChild('canvas')
  private canvasRef!: ElementRef;

  //* Cube Properties
  @Input() public rotationSpeedX: number = 0.05;
  @Input() public rotationSpeedY: number = 0.01;
  @Input() public size: number = 200;
  @Input() public texture: string = "/assets/texture.jpg";

  //* Stage Properties 
  @Input() public cameraZ: number = 400;
  @Input() public fieldOfView: number = 1;
  @Input('nearClipping') public nearClippingPlane: number = 1;
  @Input('farClipping') public farClippingPlane: number = 1000;

  //? Helper Properties (Private Properties);

  private camera!: PerspectiveCamera;

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }
  private gltfloader = new GLTFLoader();
  private loader = new TextureLoader();
  private geometry = new BoxGeometry(1, 1, 1);
  private material = new MeshBasicMaterial({ map: this.loader.load(this.texture) });

  private cube: Mesh = new Mesh(this.geometry, this.material)

  private renderer!: WebGLRenderer;

  private scene!: Scene;


  /**
   * Animate the cube
   *
   * @private
   * @memberOf AnimationComponent
   */
  private animateCube() {
    this.cube.rotation.x += this.rotationSpeedX;
    this.cube.rotation.y += this.rotationSpeedY;
  }

  /**
   * Create the Scene
   *
   * @private
   * @memberOf AnimationComponent
   */
  private createScene() {
    //* scene
    this.scene = new Scene();
    this.scene.background = new Color(0x000000);
    this.scene.add(this.cube);
    //* Camera
    let aspectRatio = this.getAspectRatio();
    this.camera = new PerspectiveCamera(
      this.fieldOfView,
      aspectRatio,
      this.nearClippingPlane,
      this.farClippingPlane
    )
    this.camera.position.z = this.cameraZ;
  }

  private getAspectRatio() {
    return this.canvas.clientWidth / this.canvas.clientHeight
  }

  /**
   * Start the rendering loop
   * @private
   * @memberof AnimationComponent
   */
  private startRenderingLoop() {
    //*  Renderer
    // Use canvas element in template
    this.renderer = new WebGLRenderer({ canvas: this.canvas });
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);

    let component: AnimationComponent = this;
    (function render() {
      requestAnimationFrame(render);
      component.animateCube();
      component.renderer.render(component.scene, component.camera);
    }());
  }

  constructor() { }

  ngOnInit(): void {
    //TODO: Define this function
    console.log("hello");
  }

  ngAfterViewInit(): void {
    this.createScene();
    this.startRenderingLoop();
  }

}
