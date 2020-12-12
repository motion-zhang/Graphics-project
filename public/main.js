import {OrbitControls} from './js/examples/OrbitControls.js';
import * as THREE from './js/three.module.js';
import {OBJLoader} from './js/examples/loaders/OBJLoader.js';
import {MTLLoader} from './js/examples/loaders/MTLLoader.js';

function main() {
    // texture loader to load images onto geometries
    const loader = new THREE.TextureLoader();

    // point light
    const pointlight = new THREE.PointLight('#ffdcb4', 1.5);
    pointlight.position.set(0, 0, 0);
    pointlight.castShadow = true
    pointlight.shadow.bias = 0.001
    pointlight.shadow.mapSize.width = 2048;
    pointlight.shadow.mapSize.height = 2048;

    // ambient light
    const ambient = new THREE.AmbientLight(0xaaaaaa);

    // sun geometry
    const sunGeo = new THREE.SphereBufferGeometry(25, 32, 32);
    const sunTexture = loader.load('image/sun6.png')
    const material = new THREE.MeshBasicMaterial({map: sunTexture})
    const sunMesh = new THREE.Mesh(sunGeo, material);
    sunMesh.position.set(0, 0, 0)

    // earth geometry
    const earthGeo = new THREE.SphereBufferGeometry(10, 15, 15);
    const earthMaterial = new THREE.MeshPhongMaterial(
        {map: loader.load("image/earth.jpeg"),
            bumpMap: loader.load('image/elev_bump_8k.jpg')})
    const earthMesh = new THREE.Mesh(earthGeo, earthMaterial);
    earthMesh.position.set(50, 0, 0)

    // draw canvas
    const mainCanvasInfo = {
        toDraw: [pointlight, ambient, sunMesh, earthMesh], toRotate: [sunMesh, earthMesh]}
    const miniCanvasInfo = {
        toDraw: [pointlight.clone(), ambient.clone(), sunMesh.clone(), earthMesh.clone()],
        toRotate: [sunMesh.clone(), earthMesh.clone()]}
    drawMainCanvas(mainCanvasInfo)
    drawMiniCanvas(miniCanvasInfo)

}

function drawMainCanvas(geomtries) {
    const canvas = document.querySelector('#mainCanvas');
    const renderer = new THREE.WebGLRenderer({canvas, alpha: true});
    const camera = new THREE.PerspectiveCamera(40, 2, 0.1, 1000);
    camera.position.set(0, 0,200);
    const scene = new THREE.Scene();
    geomtries.toDraw.forEach((obj) => {
        console.log(obj)
        scene.add(obj)
    })

    // mesh satellite object
    const satelliteMesh = null;
    const satelliteRotate = satelliteMesh;
    const satellite_mtlLoader = new MTLLoader();
    satellite_mtlLoader.load(
        'objects/satellite/satellite.mtl', (materials) => {
            materials.preload();
            const satellite_objLoader = new OBJLoader();
            satellite_objLoader.setMaterials(materials);
            satellite_objLoader.load(
                'objects/satellite/satellite.obj', (root) => {

                    const satelliteMesh = root;
                    satelliteMesh.position.set(80, 20, 0);
                    // satelliteMesh.scale.set(2,2,2);
                     satelliteMesh.rotation.x = Math.PI / 2;
                     satelliteMesh.rotation.y = -Math.PI / 2;
                    /*
                    satelliteMesh.traverse(function(child){
                        if ((child instanceof THREE.Mesh)&&(satelliteMesh(child))) {
                            child.material.color.setRGB(192,192,192);
                        }
                    });
                    */
                    scene.add(satelliteMesh)

                });
        });

    const controls = new OrbitControls(camera, canvas);
    controls.target.set(0, 5, 0)
    controls.update();

    let start;
    function render(timestamp) {
        if (start === undefined)
            start = timestamp;
        const elapsed = timestamp - start;
        geomtries.toRotate.forEach((obj) => {
            obj.rotation.y = elapsed * 0.001;
        })
        rotateEarth(geomtries.toDraw[3], elapsed * 0.01)
        resizeRendererToDisplaySize(renderer);
        renderer.setScissorTest(false);
        renderer.clear(true, true);
        renderer.setScissorTest(true);

        renderer.render(scene, camera);

        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);

}

function drawMiniCanvas(geomtries) {
    const canvas = document.querySelector('#miniCanvas');
    const renderer = new THREE.WebGLRenderer({canvas, alpha: true});
    const camera = new THREE.PerspectiveCamera(40, 2, 0.1, 1000);
    const scene = new THREE.Scene();

    camera.position.set(0, 200,0);
    camera.lookAt(0, -1, 0)

    geomtries.toDraw.forEach((obj) => {
        scene.add(obj)
    })

    const controls = new OrbitControls(camera, canvas);
    controls.target.set(0, 5, 0)
    controls.update();

    let start;
    function render(timestamp) {
        if (start === undefined)
            start = timestamp;
        const elapsed = timestamp - start;
        geomtries.toRotate.forEach((obj) => {
            obj.rotation.y = elapsed * 0.001;
        })
        rotateEarth(geomtries.toDraw[3], elapsed * 0.01)
        resizeRendererToDisplaySize(renderer);
        // renderer.setScissorTest(false);
        // renderer.clear(true, true);
        // renderer.setScissorTest(true);
        // const miniCanInfo = addMiniCanvas();
        // renderSection(miniCanInfo)

        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}


function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
        renderer.setSize(width, height, false);
    }
    return needResize;
}

// rotate the Earth around the Sun
function rotateEarth(obj1, time) {
    obj1.position.x = Math.cos(time * 0.1 + 5) * 50;
    obj1.position.z = Math.sin(time * 0.1 + 5) * 50;
}

/*
function rotateSatellite(obj1, time) {
    obj1.position.x = Math.cos(time * 0.1 + 5) * 50;
    obj1.position.z = Math.sin(time * 0.1 + 5) * 50;
}
*/


main();



