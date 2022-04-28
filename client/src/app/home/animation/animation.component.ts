import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer, Color, AmbientLight, PointLight, DirectionalLight, Box3, Vector3
} from 'three';
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

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
  @Input('nearClipping') public nearClippingPane: number = 1;
  @Input('farClipping') public farClippingPane: number = 1000;

  //? Helper Properties (Private Properties);

  private camera!: PerspectiveCamera;

  private ambientLight!: AmbientLight;

  private light1!: PointLight;

  private light2!: PointLight;

  private light3!: PointLight;

  private light4!: PointLight;

  private model: any;

  private directionalLight!: DirectionalLight;

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  private loaderGLTF = new GLTFLoader();

  private renderer!: WebGLRenderer;

  private scene!: Scene;

  //private center!: Vector3;


  /**
  *Animate the model
  *
  * @private
  * @memberof ModelComponent
  */
  private animateModel() {
    if (this.model) {
      this.model.rotation.z += 0.005;
    }
  }

  /**
   * Create the Scene
   *
   * @private
   * @memberOf AnimationComponent
   */
  private createScene() {
    //* Scene
    this.scene = new Scene();
    this.scene.background = new Color(0xd4d4d8)
    this.loaderGLTF.load('assets/models/campsite/scene.gltf', (gltf: GLTF) => {
      this.model = gltf.scene;
      console.log(this.model);
      const box = new Box3().setFromObject(this.model);
      this.size = box.getSize(new Vector3()).length();
      const center = box.getCenter(new Vector3());
      this.model.position.x += (this.model.position.x - center.x);
      this.model.position.y += (this.model.position.y - center.y);
      this.model.position.z += (this.model.position.z - center.z);
      this.scene.add(this.model);
    });
    //*Camera
    let aspectRatio = this.getAspectRatio();
    this.camera = new PerspectiveCamera(
      this.fieldOfView,
      aspectRatio,
      this.nearClippingPane,
      this.farClippingPane
    )

    //this.camera.position.copy(this.center);
    this.camera.near = this.size / 100;
    this.camera.far = this.size * 100;
    this.camera.position.x += this.size / 2.0;
    this.camera.position.y += this.size / 5.0;
    this.camera.position.z += this.size / 2.0;
    //this.camera.lookAt(this.center);

    // Lights
    this.ambientLight = new AmbientLight(0x00000, 100);
    this.scene.add(this.ambientLight);
    this.directionalLight = new DirectionalLight(0xffdf04, 0.4);
    this.directionalLight.position.set(0, 1, 0);
    this.directionalLight.castShadow = true;
    this.scene.add(this.directionalLight);
    this.light1 = new PointLight(0x4b371c, 10);
    this.light1.position.set(0, 200, 400);
    this.scene.add(this.light1);
    this.light2 = new PointLight(0x4b371c, 10);
    this.light2.position.set(500, 100, 0);
    this.scene.add(this.light2);
    this.light3 = new PointLight(0x4b371c, 10);
    this.light3.position.set(0, 100, -500);
    this.scene.add(this.light3);
    this.light4 = new PointLight(0x4b371c, 10);
    this.light4.position.set(-500, 300, 500);
    this.scene.add(this.light4);
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
    //* Renderer
    // Use canvas element in template
    this.renderer = new WebGLRenderer({ canvas: this.canvas, antialias: true });
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    let component: AnimationComponent = this;
    (function render() {
      component.renderer.render(component.scene, component.camera);
      component.animateModel();
      requestAnimationFrame(render);
    }());
  }

  constructor() { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.createScene();
    this.startRenderingLoop();
    //this.createControls();
  }

}
