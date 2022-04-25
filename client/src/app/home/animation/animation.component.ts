import { Component, OnInit } from '@angular/core';
import { Scene, PerspectiveCamera, WebGLRenderer, BoxBufferGeometry, Mesh, MeshBasicMaterial } from 'three';

@Component({
  selector: 'app-animation',
  templateUrl: './animation.component.html',
  styleUrls: ['./animation.component.scss']
})
export class AnimationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const canvas = document.getElementById("webgl") as HTMLElement
    const scene = new Scene();

    // Create a camera
    const fov = 35; // AKA Field of View
    const aspect = window.innerWidth / window.innerHeight;
    const near = 0.1; // the near clipping plane
    const far = 100; // the far clipping plane

    const camera = new PerspectiveCamera(fov, aspect, near, far);

    // every object is initially created at ( 0, 0, 0 )
    // move the camera back so we can view the scene
    camera.position.set(0, 0, 10);

    // create a geometry
    const geometry = new BoxBufferGeometry(2, 2, 2);

    // create a default (white) Basic material
    const material = new MeshBasicMaterial();

    // create a Mesh containing the geometry and material
    const cube = new Mesh(geometry, material);

    // add the mesh to the scene
    scene.add(cube);

    // create the renderer
    const renderer = new WebGLRenderer({
      canvas: canvas
    });

    // next, set the renderer to the same size as our container element
    renderer.setSize(window.innerWidth, window.innerHeight);

    // finally, set the pixel ratio so that our scene will look good on HiDPI displays
    renderer.setPixelRatio(window.devicePixelRatio);
    // render, or 'create a still image', of the scene
    renderer.render(scene, camera);
  }

}
