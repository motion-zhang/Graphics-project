import {OrbitControls} from './js/examples/OrbitControls.js';
import * as THREE from './js/three.module.js';

function main() {
    const canvas = document.querySelector('#canvas');
    const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
    });
    const scene = new THREE.Scene();

    const fov = 40;
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 1000;

    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 0,200);

    // texture loader to load images onto geometries
    const loader = new THREE.TextureLoader();

    const controls = new OrbitControls(camera, canvas);
    controls.target.set(0, 5, 0)
    controls.update();

    const objects = [];

    // point light
    const pointlight = new THREE.PointLight('#ffdcb4', 1.5);
    pointlight.position.set(0, 0, 0);
    pointlight.castShadow = true
    pointlight.shadow.bias = 0.001
    pointlight.shadow.mapSize.width = 2048;
    pointlight.shadow.mapSize.height = 2048;
    scene.add(pointlight);

    // ambient light
    const ambient = new THREE.AmbientLight(0xaaaaaa);
    scene.add(ambient);

    // sun geometry
    const sunGeo = new THREE.SphereBufferGeometry(25, 32, 32);
    loader.load('image/sun3.png', (texture) => {
        const material = new THREE.MeshBasicMaterial({map: texture})
        const sunMesh = new THREE.Mesh(sunGeo, material);
        sunMesh.position.set(0, 0, 0)

        scene.add(sunMesh)
        objects.push(sunMesh)
    })

    // earth geometry
    const earthGeo = new THREE.SphereBufferGeometry(10, 15, 15);
    const earthMaterial = new THREE.MeshPhongMaterial({map: loader.load("image/earth.jpeg")})
    const earthMesh = new THREE.Mesh(earthGeo, earthMaterial);
    earthMesh.position.set(50, 0, 0)
    scene.add(earthMesh)
    objects.push(earthMesh)

    // animation
    let start;
    function render(timestamp) {
        if (start === undefined)
            start = timestamp;
        const elapsed = timestamp - start;
        objects.forEach((obj) => {
            obj.rotation.y = elapsed * 0.001;
        })
        rotateEarth(earthMesh, elapsed * 0.01)
        renderer.render(scene, camera);
        requestAnimationFrame(render);

    }
    requestAnimationFrame(render);
}

// rotate the Earth around the Sun
function rotateEarth(obj, time) {
    obj.position.x = Math.cos(time * 0.1 + 5) * 50;
    obj.position.z = Math.sin(time * 0.1 + 5) * 50;
}

main();

