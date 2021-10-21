import _ from 'lodash';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Nebula, { SpriteRenderer, GPURenderer } from "three-nebula";
import json from "./my-particle-system.json";

let scene;
let camera;
let renderer;
let nebula;

camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.z = 100;
scene = new THREE.Scene();

renderer = new THREE.WebGLRenderer();

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor("black");

document.body.appendChild(renderer.domElement);

var controls = new OrbitControls(camera, renderer.domElement);

var texture = new THREE.TextureLoader().load('checker_256x256.png');

var sphere = new THREE.Mesh(
    new THREE.SphereGeometry(10, 10),
    new THREE.MeshBasicMaterial({ map: texture })
);

scene.add(sphere);

Nebula.fromJSONAsync(json, THREE).then(loaded => {
  const nebulaRenderer = new GPURenderer(scene, THREE);
  nebula = loaded.addRenderer(nebulaRenderer);

  animate();
});

function animate() {
	requestAnimationFrame(animate);

	nebula.update();
	renderer.render(scene, camera);

	console.log(">>> calls: ", renderer.info.render.calls);
}
