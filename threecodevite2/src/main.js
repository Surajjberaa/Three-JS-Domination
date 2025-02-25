import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import {RGBELoader} from "three/addons/loaders/RGBELoader.js"

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);

camera.position.set(0, 1, 15); 


const cubegeo = new THREE.BoxGeometry(1, 1, 4, 10, 10, 30);
const cubemat = new THREE.MeshBasicMaterial({color: "red", wireframe: true});
const cube = new THREE.Mesh(cubegeo, cubemat);

const loader = new GLTFLoader();

let model;

loader.load( '/pp-19-01_vityaz.glb', function ( gltf ) {

	  model = gltf.scene;
    model.scale.set(0.1, 0.1, 0.1); // Increase the size
    model.position.set(0, 0, 0); // Move it to the center
    scene.add(model);

}, undefined, function ( error ) {

	console.error( error );

} );

const light = new THREE.DirectionalLight(0xffffff, 5);
light.position.set(2, 2, 5);
scene.add(light);


const light2 = new THREE.DirectionalLight(0xffffff, 5);
// light2.position.set(-2, 2, 5);
scene.add(light2);



const canvas = document.querySelector('canvas');
const renderer = new THREE.WebGLRenderer({ canvas });
document.body.appendChild( renderer.domElement );

renderer.setSize(window.innerWidth, window.innerHeight);

const controls = new OrbitControls( camera, renderer.domElement );

// scene.add(cube);

const mouse = {
  x : 0,
  y : 0
}

window.addEventListener('mousemove', (event) => {
  mouse.x = event.clientX / window.innerWidth
  mouse.y = event.clientY / window.innerHeight
})

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}
)


let clock = new THREE.Clock();

function animate() {
    window.requestAnimationFrame(animate);

    

    console.log(mouse.x, mouse.y);
    
    
    model.lookAt(new THREE.Vector3(mouse.x - 0.5, -mouse.y + 0.5, 0.5))
    controls.update();

    // model.rotation.y = clock.getElapsedTime() / 2;

    renderer.render(scene, camera);
}

animate();

