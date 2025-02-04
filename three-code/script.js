const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100
);

const geometry = new THREE.BoxGeometry(1, 1, 1, 1, 1, 20);
const material = new THREE.MeshBasicMaterial({ color: 'red', wireframe: true });
const cube = new THREE.Mesh(geometry, material);

const geo = new THREE.BoxGeometry(1, 1, 1);
const mat = new THREE.MeshBasicMaterial({ color: 'green', wireframe: true });
const cub = new THREE.Mesh(geo, mat);

cube.scale.x =4;
cube.scale.y =2;
cube.scale.z =2;

scene.add(cube);
scene.add(cub);
camera.position.z = 5;

const canvas = document.querySelector('canvas');

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

function animate() {
    window.requestAnimationFrame(animate);

    cub.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
}

animate();
