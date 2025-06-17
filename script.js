// --- Menu Toggle Functionality ---
const menuToggle = document.getElementById('menu-toggle');
const mainMenu = document.getElementById('main-menu');
menuToggle.addEventListener('click', function() {
    mainMenu.classList.toggle('is-active');
});


// --- Three.js 3D Background Functionality ---

// 1. Basic 3D setup (Scene, Camera, Renderer)
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg-canvas'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

// 2. Create cube geometry and material
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });

// 3. Create a group to hold all cubes and position them in a sphere
const sphereGroup = new THREE.Group();
const cubeCount = 200; // Number of cubes

for (let i = 0; i < cubeCount; i++) {
    const cube = new THREE.Mesh(geometry, material);
    
    // Position cubes in a sphere using the Fibonacci lattice algorithm
    const phi = Math.acos(-1 + (2 * i) / cubeCount);
    const theta = Math.sqrt(cubeCount * Math.PI) * phi;
    
    const radius = 15;
    const x = radius * Math.cos(theta) * Math.sin(phi);
    const y = radius * Math.sin(theta) * Math.sin(phi);
    const z = radius * Math.cos(phi);

    cube.position.set(x, y, z);
    sphereGroup.add(cube);
}
scene.add(sphereGroup);

// 4. Animation function
function animate() {
    requestAnimationFrame(animate);

    // Rotate the entire group of cubes
    sphereGroup.rotation.x += 0.0005;
    sphereGroup.rotation.y += 0.001;

    renderer.render(scene, camera);
}

// 5. Handle window resizing
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Start the animation
animate();
