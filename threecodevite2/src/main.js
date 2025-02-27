import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
import GUI from 'lil-gui';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);

camera.position.set(0, 1, 15);

const cubegeo = new THREE.BoxGeometry(4, 4, 8, 10, 10, 30);
const cubemat = new THREE.MeshPhysicalMaterial({ color: "red" });
const cube = new THREE.Mesh(cubegeo, cubemat);
cube.position.set(-5, 0, 0); // Position cube to the left

const sphereGeo = new THREE.SphereGeometry(2, 32, 32);
const sphereMat = new THREE.MeshPhysicalMaterial({ color: "purple" });
const sphere = new THREE.Mesh(sphereGeo, sphereMat);
sphere.position.set(5, 0, 0); // Position sphere to the right

scene.add(sphere);
scene.add(cube); // Add cube to scene



const loader = new GLTFLoader();

let model;

loader.load('/pp-19-01_vityaz.glb', function (gltf) {

  model = gltf.scene;
  model.scale.set(0.1, 0.1, 0.1); // Increase the size
  model.position.set(0, 0, 0); // Move it to the center
  // scene.add(model);

}, undefined, function (error) {

  console.error(error);

});

const light3 = new THREE.AmbientLight(0xffffff, 1);
scene.add(light3);

// const light4 = new THREE.PointLight(0xffffff, 100);
// light4.position.set(2, 2, 10);
// scene.add(light4);

// const pointlighthelper = new THREE.PointLightHelper(light4);
// scene.add(pointlighthelper);

const light = new THREE.DirectionalLight({ color: 0xffffff, intensity: 10 });
light.position.set(2, 4, 5);
scene.add(light);

// const lightHelper = new THREE.DirectionalLightHelper(light, 3);
// scene.add(lightHelper);

// const light2 = new THREE.DirectionalLight();
// light2.position.set(-2, 2, 5);
// scene.add(light2);

const canvas = document.querySelector('canvas');
const renderer = new THREE.WebGLRenderer({ canvas });
document.body.appendChild(renderer.domElement);

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const controls = new OrbitControls(camera, renderer.domElement);

scene.add(cube);

const mouse = {
  x: 0,
  y: 0
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

const gui = new GUI();
const cubeControls = {
  width: 4,
  height: 4,
  depth: 8,
  rotationX: 0,
  rotationY: 0,
  rotationZ: 0,
  color: '#ff0000'
};

gui.add(cubeControls, 'width', 0.1, 10).name('Width').onChange(value => {
  cube.scale.x = value / 4;
});

gui.add(cubeControls, 'height', 0.1, 10).name('Height').onChange(value => {
  cube.scale.y = value / 4;
});

gui.add(cubeControls, 'depth', 0.1, 10).name('Depth').onChange(value => {
  cube.scale.z = value / 8;
});

gui.add(cubeControls, 'rotationX', 0, Math.PI * 2).name('Rotation X').onChange(value => {
  cube.rotation.x = value;
});

gui.add(cubeControls, 'rotationY', 0, Math.PI * 2).name('Rotation Y').onChange(value => {
  cube.rotation.y = value;
});

gui.add(cubeControls, 'rotationZ', 0, Math.PI * 2).name('Rotation Z').onChange(value => {
  cube.rotation.z = value;
});

gui.addColor(cubeControls, 'color').name('Color').onChange(value => {
  cube.material.color.set(value);
});
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

window.addEventListener('pointermove', (event) => {
  // Calculate pointer position in normalized device coordinates
  // (-1 to +1) for both components
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

// Store original colors when objects are first hovered
let hoveredObject = null;
let originalColor = null;

function onPointerMove(event) {
  // Update the picking ray with the camera and pointer position
  raycaster.setFromCamera(pointer, camera);

  // Calculate objects intersecting the picking ray
  const intersects = raycaster.intersectObjects([cube, sphere]);

  // Restore original colors for all previously hovered objects
  if (hoveredObject) {
    hoveredObject.forEach((obj, i) => {
      obj.material.color.set(originalColor[i]);
    });
    hoveredObject = null;
    originalColor = null;
  }

  // If we're now hovering over objects
  if (intersects.length > 0) {
    // Store all intersected objects and their colors
    hoveredObject = intersects.map(intersect => intersect.object);
    originalColor = hoveredObject.map(obj => obj.material.color.getHex());
    
    // Change all intersected objects to green
    hoveredObject.forEach(obj => {
      obj.material.color.set('#00ff00');
    });
  }
}

window.addEventListener('pointermove', onPointerMove);



function animate() {
  window.requestAnimationFrame(animate);

  // console.log(mouse.x, mouse.y);


  model.lookAt(new THREE.Vector3(mouse.x - 0.5, -mouse.y + 0.5, 0.5))
  controls.update();

  // model.rotation.y = clock.getElapsedTime() / 2;

  renderer.render(scene, camera);
}

animate();
