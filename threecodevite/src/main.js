import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js'
import {RGBELoader} from "three/addons/loaders/RGBELoader.js"

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);

let hdri = new RGBELoader()

hdri.load('https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/4k/qwantani_afternoon_4k.hdr', 
    function(hdritexture){
    hdritexture.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = hdritexture
})


camera.position.z = 5;

const texture = new THREE.TextureLoader().load("https://blenderartists.org/uploads/default/original/4X/5/0/2/5029a48052f6f91a399a41dcd1004adf854b17ea.jpeg");
const texture2 = new THREE.TextureLoader().load("/8k_earth_clouds.jpg");

texture.colorSpace = THREE.SRGBColorSpace

const cubegeo = new THREE.SphereGeometry(2, 300, 300);
const cubemat = new THREE.MeshStandardMaterial({map: texture });
const cube = new THREE.Mesh(cubegeo, cubemat);

const shadowGeo = new THREE.SphereGeometry(2.005, 300, 300);
const shadowMat = new THREE.MeshStandardMaterial({alphaMap: texture2 });
shadowMat.transparent = true
const shadow = new THREE.Mesh(shadowGeo, shadowMat);


// const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
// directionalLight.position.set(3, 3, 3)
// scene.add(directionalLight);

// const lightHelper = new THREE.DirectionalLightHelper(directionalLight)
// scene.add(lightHelper)

// const ambientLight = new THREE.AmbientLight("white", .1);
// ambientLight.position.set(-2, -2, 2)
// scene.add(ambientLight);

// const ambientLightHelper = new THREE.DirectionalLightHelper(ambientLight)
// scene.add(ambientLightHelper)


const canvas = document.querySelector('canvas');
const renderer = new THREE.WebGLRenderer({ canvas });
document.body.appendChild( renderer.domElement );

renderer.setSize(window.innerWidth, window.innerHeight);

const controls = new OrbitControls( camera, renderer.domElement );

scene.add(cube);
scene.add(shadow);

let clock = new THREE.Clock();

function animate() {
    window.requestAnimationFrame(animate);

    controls.update();

    cube.rotation.y = clock.getElapsedTime() / 40;
    shadow.rotation.y = clock.getElapsedTime() / 20;

    renderer.render(scene, camera);
}

animate();





