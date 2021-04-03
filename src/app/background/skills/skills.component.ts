import { Component, OnInit, AfterViewInit, ElementRef, Input, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Lensflare, LensflareElement } from 'three/examples/jsm/objects/Lensflare';
import { EffectComposer, RenderPass, EffectPass, GodRaysEffect } from 'postprocessing';


@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent {

  @ViewChild('canvas') canvas: ElementRef;

  renderer = new THREE.WebGLRenderer();
  composer = null;
  controls = null;
  scene = null;
  camera = null;
  esphere = null;
  stars = null;
  directionalLight = null;
  mouse = new THREE.Vector2();
  target = new THREE.Vector2();
  windowHalf = new THREE.Vector2(window.innerWidth / 2, window.innerHeight / 2);

  constructor() {
      //scene
      this.scene = new THREE.Scene();

      //camera
      this.camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 10, 10000);
      //this.camera.enableZoom = false;
      this.camera.position.z = 300;
      this.camera.position.x = 0;
      this.camera.position.y = 0;

  }

  ngAfterViewInit(){
    this.configCanvas();
    this.configDirectionalLight();
    this.configCircle();
    //this.configComposer();
   //this.configStars();
   // this.configControls();
    this.animate();
  }

  onMouseMove(event){
    //console.log(event);
    this.mouse.x = (event.clientX - this.windowHalf.x);
    this.mouse.y = (event.clientY - this.windowHalf.y);

  }

  configCanvas(){
    this.renderer.setSize(300, 300);
    window.addEventListener('resize', () => {
      const width = 300;
      const height = 300;
      this.renderer.setSize(width, height);
      this.composer.setSize(width, height);
      this.camera.aspect = width/height;
      this.camera.updateProjectionMatrix();
    });

    this.canvas.nativeElement.appendChild(this.renderer.domElement);
  }

  configDirectionalLight(){
    const ambientLight = new THREE.AmbientLight( 0xFFFFFF, 2.0 );
    this.scene.add(ambientLight)
    this.directionalLight = new THREE.DirectionalLight(0xffccaa,3);
    this.directionalLight.position.set(0,0,1).normalize();
    //directionalLight.castShadow = true;
    this.scene.add(this.directionalLight);
  }

  configComposer(){
    let godRaysEffect = new GodRaysEffect(this.camera, this.esphere, {
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
    this.target.x = (1 - this.mouse.x) * 0.01;
    this.target.y = (1 - this.mouse.y) * 0.01;

    this.esphere.rotation.y += 0.01 * (this.target.x - this.esphere.rotation.y);
    this.esphere.rotation.x += 0.01 * (this.target.y - this.esphere.rotation.x);

   //this.stars.rotation.z += 0.001
    //this.composer.render(0.1)
    this.renderer.render(this.scene, this.camera);
  }

  configControls(){
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.autoRotate = false;
    this.controls.enableZoom = true;
    this.controls.enablePan = true;
    this.controls.update();
  }

  configCircle(){
    const geometry = new THREE.SphereGeometry( 100, 70, 70 );
    const material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
    const loader =new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load('/assets/textures/Skills.png'),
   // side: THREE.DoubleSide,
    opacity: .8, transparent: true
  });

    this.esphere = new THREE.Mesh( geometry, loader );
    this.scene.add( this.esphere );
    //let circleGeo = new THREE.CircleGeometry(100, 50);
    //let circleMat = new THREE.MeshBasicMaterial({color: 0x111cbb});
    //this.circle = new THREE.Mesh(circleGeo,circleMat);
    //this.circle.position.z = -200;
    //this.circle.position.x = 0;
    //this.circle.position.y = 0;
    //this.circle.scale.setX(1.0);
    //this.scene.add(this.circle);
  }

}
