import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);

camera.position.z = 5;


const cubegeo = new THREE.BoxGeometry(2, 2, 2, 5, 5, 5);
const cubemat = new THREE.MeshStandardMaterial({ color: 'red' });
const cube = new THREE.Mesh(cubegeo, cubemat);

const directionalLight = new THREE.DirectionalLight(0xffffff, 10);
directionalLight.position.set(3, 3, 3)
scene.add(directionalLight);

// const lightHelper = new THREE.DirectionalLightHelper(directionalLight)
// scene.add(lightHelper)

const ambientLight = new THREE.AmbientLight("white", .1);
ambientLight.position.set(-2, -2, 2)
scene.add(ambientLight);

// const ambientLightHelper = new THREE.DirectionalLightHelper(ambientLight)
// scene.add(ambientLightHelper)


const canvas = document.querySelector('canvas');
const renderer = new THREE.WebGLRenderer({ canvas });

renderer.setSize(window.innerWidth, window.innerHeight);

scene.add(cube);

let clock = new THREE.Clock();

function animate() {
    window.requestAnimationFrame(animate);

    cube.rotation.y = clock.getElapsedTime();

    renderer.render(scene, camera);
}

animate();





