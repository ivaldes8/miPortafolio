import { Component, OnInit, AfterViewInit, ElementRef, Input, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
//import { GodRaysEffect } from 'postprocessing/src/effects/GodRaysEffect';
//import { EffectPass } from 'postprocessing/src/passes/EffectPass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
//import { RenderPass } from 'postprocessing/src/passes/RenderPass';
//import { EffectComposer } from 'postprocessing/src/effects/EffectComposer';
import { EffectComposer, RenderPass, EffectPass, GodRaysEffect } from 'postprocessing';
import { Texture } from 'three';

@Component({
  selector: 'app-canvas-tutorial',
  templateUrl: './canvas-tutorial.component.html',
  styleUrls: ['./canvas-tutorial.component.scss']
})
export class CanvasTutorialComponent  {

  @ViewChild('canvas') canvas: ElementRef;

  renderer = new THREE.WebGLRenderer();
  composer = null;
  controls = null;
  scene = null;
  camera = null;
  circle = null;
  cube = null
  cube2 = null;
  car = null;
  batman = null;
  stars = null;
  cloud = null;
  portalGeo
  portalMaterial
  directionalLight = null;
  mouse = new THREE.Vector2();
  camera2 = null;
  target = new THREE.Vector2();
  windowHalf = new THREE.Vector2(window.innerWidth / 2, window.innerHeight / 2);


  constructor(){
    //scene
    this.scene = new THREE.Scene();

    //camera
    this.camera = new THREE.PerspectiveCamera(80, window.innerWidth/window.innerHeight, 1, 10000);
    //this.camera.enableZoom = false;
    this.camera.position.z = 100;
    this.scene.add(this.camera);

  }

  ngAfterViewInit(){
    this.configCanvas();
    this.configDirectionalLight();
    this.configCircle();
    this.configComposer();
    //this.configCube();
    //this.configCube2();
    //this.configCar();
    this.configBatman();
    this.configStars();
    //this.configCloud();
    //this.configControls();
    this.animate();
  }

  onMouseMove(event){
    //console.log(event);
    this.mouse.x = (event.clientX - this.windowHalf.x);
    this.mouse.y = (event.clientY - this.windowHalf.y);

  }

  configCanvas(){
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0x000000, 1);
    window.addEventListener('resize', () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      this.renderer.setSize(width, height);
      this.composer.setSize(width, height);
      this.camera.aspect = width/height;
      this.camera.updateProjectionMatrix();
    });
    this.particleSetup();
    this.canvas.nativeElement.appendChild(this.renderer.domElement);

  }

  particleSetup(){
    let loader = new THREE.TextureLoader();
    loader.load('/assets/textures/smoke2.png', texture => {
      this.portalGeo = new THREE.PlaneBufferGeometry(350,350);
      this.portalMaterial = new THREE.MeshStandardMaterial({
        map:texture,
        transparent:true
      })
    });
    let particle = new THREE.Mesh(this.portalGeo,this.portalMaterial);
    particle.position.set(2,2,2);
    this.scene.add(particle);
    this.renderer.render(this.scene, this.camera);

  }

  configDirectionalLight(){
    //const ambientLight = new THREE.AmbientLight( 0xFFFFFF, 2.0 );
    //this.scene.add(ambientLight)
    this.directionalLight = new THREE.DirectionalLight(0xffffff,0.5);
    this.directionalLight.position.set(0,0,1);
    this.directionalLight.castShadow = true;
    this.scene.add(this.directionalLight);
  }

  configComposer(){
    let godRaysEffect = new GodRaysEffect(this.camera, this.circle, {
      resolutionScale: 1,
      density: 0.6,
      decay: 0.95,
      weight:0.9,
      samples:100
    })
    let renderPass = new RenderPass(this.scene, this.camera);
    let effectPass = new EffectPass(this.camera,godRaysEffect)
    effectPass.renderToScreen = true;

    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(renderPass);
    this.composer.addPass(effectPass);
  }

  animate(){
    window.requestAnimationFrame(() => this.animate());
    //this.cube2.rotation.x += 0.01;
    //this.cube2.rotation.y += 0.02;
    this.target.x = (1 - this.mouse.x) * 0.002;
    this.target.y = (1 - this.mouse.y) * 0.002;

    this.camera.rotation.y = 0.1 * (this.target.x - this.camera.rotation.y);
    this.camera.rotation.x = 0.1 * (this.target.y - this.camera.rotation.x);

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
    let circleGeo = new THREE.CircleGeometry(220, 50);
    let circleMat = new THREE.MeshBasicMaterial({color: 0x111cbb});
    this.circle = new THREE.Mesh(circleGeo,circleMat);
    this.circle.position.z = -200;
    this.circle.scale.setX(1.2);
    this.scene.add(this.circle);
  }

  configCube(){
    const geometry = new THREE.BoxGeometry(100, 100, 100);
    const cubeMaterials = [
      new THREE.MeshLambertMaterial({color:0xff0000, wireframe: false}),//right side
      new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load('/assets/textures/2.png'), side: THREE.FrontSide }),//left side
      new THREE.MeshLambertMaterial({ map: new THREE.TextureLoader().load('/assets/textures/3.png'), side: THREE.FrontSide }),//top side
      new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('/assets/textures/4.png'), side: THREE.DoubleSide }),//bottom side
      new THREE.MeshLambertMaterial({ map: new THREE.TextureLoader().load('/assets/textures/5.png'), side: THREE.BackSide }),//front side
      new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load('/assets/textures/6.png'), side: THREE.BackSide  })//back side
    ]
    const loader = new THREE.TextureLoader().load('/assets/textures/1.png');
    const material = new THREE.MeshBasicMaterial({color:0xff0000, wireframe: true});
    let cube = new THREE.Mesh(geometry,cubeMaterials);
    cube.position.y = -1000;
    cube.position.x = -1000;
    this.scene.add(cube);
  }

  configCube2(){
    const geometry2 = new THREE.BoxGeometry(50, 50, 50);
    const material2 = new THREE.MeshBasicMaterial({color:0xfdfdfd, wireframe: true});
    this.cube2 = new THREE.Mesh(geometry2,material2);
    this.cube2.position.x = 100;
    this.cube2.position.y = 0;
    this.scene.add(this.cube2);
  }

  configCar(){
    const loader = new GLTFLoader();
    loader.load('/assets/textures/scene.gltf', gltf => {
      this.car = gltf.scene.children[0];
      this.car.scale.set(2.9,2.9,2.9);
      this.car.position.x = -200;
      this.car.position.y = -49;
      this.car.position.z= -20;
      this.scene.add(gltf.scene);
    });
  }

  configBatman(){
    const loader = new GLTFLoader();
    loader.load('/assets/textures/logoBatman/scene.gltf', gltf => {
      this.batman = gltf.scene.children[0];
      this.batman.scale.set(100,100,100);
      this.batman.position.x = -5;
      this.batman.position.y = -150;
      this.batman.position.z= -20;
      this.scene.add(gltf.scene);
    });
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
    let sprite = new THREE.TextureLoader().load('/assets/textures/1.png');
    let starMaterial = new THREE.PointsMaterial({
      color: 0xaaaaaa,
      size: 1
    });

    this.stars = new THREE.Points(startGeo,starMaterial);
    this.scene.add(this.stars);
  }

  configCloud(){
    const loader = new THREE.TextureLoader();
      loader.load('/assets/textures/smoke.png', texture => {
      this.portalGeo = new THREE.PlaneBufferGeometry(350,350);
      this.portalMaterial = new THREE.MeshStandardMaterial({
        map:texture,
        transparent:true
      });

      for (let p = 880; p >250; p--) {
        this.cloud = new THREE.Mesh(this.portalGeo, this.portalMaterial);

        this.cloud.position.set(
          0.5 * p * Math.cos((4*p*Math.PI)/180),
          0.5 * p * Math.sin((4*p*Math.PI)/180),
          0.1* p
        );
        this.cloud.scale.set(0.1,0.1,0.1);
        this.cloud.position.z = -20
        //this.cloud.rotation.x = 4
        this.cloud.rotation.z = Math.random() *360;
        this.scene.add(this.cloud);
      };

  });


  }

}
