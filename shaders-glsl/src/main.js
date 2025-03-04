import * as THREE from 'three';
import vertex from '/shaders/vertex.glsl';
import fragment from '/shaders/fragment.glsl';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TextureLoader } from 'three';

// Create scene, camera and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#canvas'),
    antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));


// Add a cube to the scene
const geometry = new THREE.PlaneGeometry(2, 3, 100, 100);
const material = new THREE.ShaderMaterial({
    vertexShader: vertex,
    fragmentShader: fragment,
    //   wireframe: true,
    side: THREE.DoubleSide,
    uniforms: {
        uTime: { value: 0 }
    }
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Rotate the cube
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
    material.uniforms.uTime.value += 0.03;

    controls.update();
    renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();
