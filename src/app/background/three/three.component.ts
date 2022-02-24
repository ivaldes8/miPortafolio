import { Component, OnInit, AfterViewInit, ElementRef, Input, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Lensflare, LensflareElement } from 'three/examples/jsm/objects/Lensflare';
import { EffectComposer, RenderPass, EffectPass, GodRaysEffect } from 'postprocessing';

@Component({
  selector: 'app-three',
  templateUrl: './three.component.html',
  styleUrls: ['./three.component.scss']
})
export class ThreeComponent{

  @ViewChild('canvas') canvas: ElementRef;

  renderer = new THREE.WebGLRenderer();
  composer = null;
  controls = null;
  scene = null;
  camera = null;
  circle = null;
  stars = null;
  cube = null;
  directionalLight = null;
  mouse = new THREE.Vector2();
  target = new THREE.Vector2();
  windowHalf = new THREE.Vector2(window.innerWidth / 2, window.innerHeight / 2);


  constructor(){
    //scene
    this.scene = new THREE.Scene();

    //camera
    this.camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 10, 10000);
    //this.camera.enableZoom = false;
    this.camera.position.z = -100;
    this.camera.position.x = 0;
    this.camera.position.y = 0;

  }

  ngAfterViewInit(){
    this.configCanvas();
    this.configDirectionalLight();
    this.configCircle();
    //this.configCube();
    this.configComposer();
    this.configStars();
    this.configControls();
    this.animate();
  }

  onMouseMove(event){
    //console.log(event);
    this.mouse.x = (event.clientX - this.windowHalf.x);
    this.mouse.y = (event.clientY - this.windowHalf.y);

  }

  configCanvas(){
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    window.addEventListener('resize', () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      this.renderer.setSize(width, height);
      //this.composer.setSize(width, height);
      this.camera.aspect = width/height;
      this.camera.updateProjectionMatrix();
    });

    this.canvas.nativeElement.appendChild(this.renderer.domElement);
  }

  configDirectionalLight(){
    //const ambientLight = new THREE.AmbientLight( 0xFFFFFF, 2.0 );
    //this.scene.add(ambientLight)
    this.directionalLight = new THREE.DirectionalLight(0xffccaa,10);
    this.directionalLight.position.set(0,0,1).normalize();
    this.directionalLight.castShadow = true;
    this.scene.add(this.directionalLight);
  }

  configComposer(){
    let godRaysEffect = new GodRaysEffect(this.camera, this.circle, {
     resolutionScale: 0.2,
      density: 0.4,
      decay: 0.97,
      weight:0.7,
      samples:50
    })
    let renderPass = new RenderPass(this.scene, this.camera);
    let effectPass = new EffectPass(this.camera,godRaysEffect)
    effectPass.renderToScreen = true;

    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(renderPass);
    this.composer.addPass(effectPass);
  }

  configCube(){
    const geometry = new THREE.BoxGeometry(1000, 1000, 1000);
    const cubeMaterials = [
      //new THREE.MeshBasicMaterial({color:0xff0000, wireframe: false}),//right side
      new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('/assets/textures/stars.png'), side: THREE.BackSide }),//left side
      new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('/assets/textures/stars.png'), side: THREE.BackSide  }),//left side
      new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('/assets/textures/stars.png'), side: THREE.BackSide  }),//top side
      new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('/assets/textures/stars.png'), side: THREE.BackSide  }),//bottom side
      new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('/assets/textures/stars.png'), side: THREE.BackSide  }),//front side
      new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('/assets/textures/stars.png'), side: THREE.BackSide  })//back side
    ]
    const loader = new THREE.TextureLoader().load('/assets/textures/1.png');
    const material = new THREE.MeshBasicMaterial({color:0xff0000, wireframe: true});
    this.cube = new THREE.Mesh(geometry,cubeMaterials);

    this.scene.add(this.cube);
  }

  animate(){
    window.requestAnimationFrame(() => this.animate());
    //this.cube.rotation.x += 0.001;
    //this.cube.rotation.y += 0.001;
    this.target.x = (1 - this.mouse.x) * 0.002;
    this.target.y = (1 - this.mouse.y) * 0.002;

    this.stars.rotation.y = 0.1 * (this.target.x - this.camera.rotation.y);
    this.stars.rotation.x = 0.1 * (this.target.y - this.camera.rotation.x);
    //this.circle.position.y = 0.1 * (this.target.x - this.camera.rotation.y);
    //this.circle.position.x = 0.1 * (this.target.y - this.camera.rotation.x);
    this.stars.rotation.z += 0.001
    this.composer.render(0.1)
    //this.renderer.render(this.scene, this.camera);
  }

  configControls(){
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.autoRotate = false;
    this.controls.enableZoom = true;
    this.controls.enablePan = true;
    this.controls.update();
  }

  configCircle(){
    let circleGeo = new THREE.CircleGeometry(100, 50);
    let circleMat = new THREE.MeshBasicMaterial({color: 0x111cbb});
    this.circle = new THREE.Mesh(circleGeo,circleMat);
    this.circle.position.z = 1000;
    this.circle.rotation.x= 600;
    this.circle.position.x = 0;
    this.circle.position.y = 500;
    this.circle.scale.setX(1.0);
    this.scene.add(this.circle);
  }

  configStars(){
    let startGeo = new THREE.BufferGeometry();
    let positions = [];
    let positionsNumComponents = 3;
    for (let i = 0; i < 6000; i++) {
        positions.push(Math.random() * 600 - 300),
        startGeo.setAttribute(
        'position',
        new THREE.BufferAttribute(new Float32Array(positions), positionsNumComponents)
      );
    }
    let starMaterial = new THREE.PointsMaterial({
      color: 0xaaaaaa,
      size: 1
    });
    this.stars = new THREE.Points(startGeo,starMaterial);
    this.stars.position.x = -100;
    this.stars.position.z = 500;
    this.stars.position.y = 0;
    this.scene.add(this.stars);
  }


}
