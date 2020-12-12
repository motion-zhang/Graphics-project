import {OrbitControls} from './js/examples/OrbitControls.js';
import * as THREE from './js/three.module.js';

var theta = 0
var dTheta = 2 * Math.PI / 1000;
function main() {
    let requestID;
    let state;
    let speed;
    let originalPause;
    // var clock = new THREE.Clock()
    const objects = [];
    const canvas = document.querySelector('#canvas');

   // Interaction
    const bar = document.getElementById("Bar")

    document.getElementById('btnResume').addEventListener('click', function (e) {
        e.preventDefault();
        if (!state || (state === undefined)) {
        state = true;
        requestID = requestAnimationFrame(render);
        if (speed === undefined) {
            speed = 1.2
            originalPause = speed;
        } else {
            speed = originalPause;
        }

        }
        // clock.start()
    })

   document.getElementById('btnPause').addEventListener('click', function (e) {
        e.preventDefault();
        // clock.stop()
        if (state) {
            state = false
            originalPause = speed;
            speed = 0
            cancelAnimationFrame(requestID);
        }

    });

    document.getElementById('btnSpeedUp').addEventListener('click', function (e) {
        e.preventDefault();
        if (state) {
            speed += 0.3
        }
    });

    document.getElementById('btnSlowDown').addEventListener('click', function (e) {
        e.preventDefault();
        if (state && (speed > 0.3)) {
            speed -= 0.3
        }
    });

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
    camera.position.set(0, 0, 200);

    // texture loader to load images onto geometries
    const loader = new THREE.TextureLoader();

    const controls = new OrbitControls(camera, canvas);
    controls.target.set(0, 5, 0)
    controls.update();

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
    loader.load('image/sun6.png', (texture) => {
        const material = new THREE.MeshBasicMaterial({map: texture})
        const sunMesh = new THREE.Mesh(sunGeo, material);
        sunMesh.position.set(0, 0, 0)

        scene.add(sunMesh)
        objects.push(sunMesh)
    })

    // earth geometry
    const earthGeo = new THREE.SphereBufferGeometry(10, 15, 15);
    const earthMaterial = new THREE.MeshPhongMaterial({
        map: loader.load("image/earth.jpeg"),
        bumpMap: loader.load('image/elev_bump_8k.jpg')
    })
    const earthMesh = new THREE.Mesh(earthGeo, earthMaterial);
    earthMesh.position.set(50, 0, 0)
    scene.add(earthMesh)
    objects.push(earthMesh)


    function render() {
        objects.forEach((obj) => {
            obj.rotation.y += dTheta*speed;
        });
        console.log("1. state is ",state, "speed is:",speed, "pause speed: ", originalPause)
        rotateEarth(earthMesh, speed)
        renderer.render(scene, camera);

        requestAnimationFrame(render);
        }

}

// rotate the Earth around the Sun
function rotateEarth(obj, speed) {
    theta += dTheta*speed
    console.log("2.theta is: ", theta)


    const posX = Math.cos(theta) * 50;
    const posZ = Math.sin(theta) * 50;

    // console.log("theta:  ",theta,speed)

    obj.position.x = posX
    obj.position.z = posZ
}

main();

