import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  BoxBufferGeometry,
  Mesh,
  MeshBasicMaterial,
  AnimationMixer,
  PlaneGeometry,
  MeshStandardMaterial,
  AmbientLight,
  DirectionalLight,
  PCFSoftShadowMap,
  Clock,
  Object3D,
  TextureLoader, BoxGeometry, Color
} from 'three';
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";

@Component({
  selector: 'app-animation',
  templateUrl: './animation.component.html',
  styleUrls: ['./animation.component.scss']
})
export class AnimationComponent implements OnInit, AfterViewInit {

  @Input() public rotationSpeedX: number = 0.05;

  @Input() public rotationSpeedY: number = 0.01;

  @Input() public size: number = 200;

  @Input() public cameraZ: number = 400;

  @Input() public fieldOfView: number = 1;

  @Input('nearClipping') public nearClippingPlane: number = 1;

  @Input('farClipping') public farClippingPlane: number = 100;

  @ViewChild('canvas')
  private canvasRef: ElementRef;

  private camera!: PerspectiveCamera;

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  private loader = new TextureLoader();

  private geometry = new BoxGeometry(1,1,1);
  private material = new MeshBasicMaterial();

  private cube: Mesh = new Mesh(this.geometry, this.material)

  private renderer!: WebGLRenderer;

  private scene!: Scene;

  /**
   * Create the Scene
   *
   * @private
   * @memberOf AnimationComponent
   */
  private createScene() {
    // scene
    this.scene = new Scene();
    this.scene.background = new Color(0x00000);
    this.scene.add(this.cube);

    //camera
    let aspectRatio = this.getAspectRatio();
    this.camera = new PerspectiveCamera(
      this.fieldOfView,
      aspectRatio,
      this.nearClippingPlane,
      this.farClippingPlane
    )
    this.camera.position.z = this.cameraZ
  }

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

  private startRenderingLoop()


  constructor() { }

  ngOnInit(): void {
    /**
     * Base
     */

// Canvas
    const canvas = document.querySelector('canvas.webgl') as HTMLCanvasElement

// Scene
    const scene = new Scene()

    /**
     * Models
     */
    const gltfLoader = new GLTFLoader()

    let mixer: AnimationMixer

    gltfLoader.load(
      '/assets/models/campsite/scene.gltf',
      (gltf) =>
      {
        console.log(gltf)
        gltf.scene.scale.set(0.025, 0.025, 0.025)
        scene.add(gltf.scene)

        // Animation
        mixer = new AnimationMixer(gltf.scene)
        const action = mixer.clipAction(gltf.animations[2])
        action.play()
      }
    )

    /**
     * Floor
     */
    const floor = new Mesh(
      new PlaneGeometry(10, 10),
      new MeshStandardMaterial({
        color: '#444444',
        metalness: 0,
        roughness: 0.5
      })
    )
    floor.receiveShadow = true
    floor.rotation.x = - Math.PI * 0.5
    scene.add(floor)

    /**
     * Lights
     */
    const ambientLight = new AmbientLight(0xffffff, 0.8)
    scene.add(ambientLight)

    const directionalLight = new DirectionalLight(0xffffff, 0.6)
    directionalLight.castShadow = true
    directionalLight.shadow.mapSize.set(1024, 1024)
    directionalLight.shadow.camera.far = 15
    directionalLight.shadow.camera.left = - 7
    directionalLight.shadow.camera.top = 7
    directionalLight.shadow.camera.right = 7
    directionalLight.shadow.camera.bottom = - 7
    directionalLight.position.set(- 5, 5, 0)
    scene.add(directionalLight)

    /**
     * Sizes
     */
    const sizes = {
      width: 600,
      height: 400
    }

    /**
     * Camera
     */
// Base camera
    const camera = new PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
    camera.position.set(2, 2, 2)
    scene.add(camera)


    /**
     * Renderer
     */
    const renderer = new WebGLRenderer({
      canvas: canvas
    })
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


    // window.addEventListener('resize', () =>
    // {
    //   // Update sizes
    //   sizes.width = 600
    //   sizes.height = 400
    //
    //   // Update camera
    //   camera.aspect = sizes.width / sizes.height
    //   camera.updateProjectionMatrix()
    //
    //   // Update renderer
    //   renderer.setSize(sizes.width, sizes.height)
    //   renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    // })

    /**
     * Animate
     */
    const clock = new Clock()
    let previousTime = 0

    const tick = () =>
    {
      const elapsedTime = clock.getElapsedTime()
      const deltaTime = elapsedTime - previousTime
      previousTime = elapsedTime

      // Model animation
      if(mixer)
      {
        mixer.update(deltaTime)
      }

      // Render
      renderer.render(scene, camera)

      // Call tick again on the next frame
      window.requestAnimationFrame(tick)
    }

    tick()
  }

  ngAfterViewInit(): void {
  }

  private getAspectRatio() {
    return this.canvas.clientWidth / this.canvas.clientHeight
  }
}
