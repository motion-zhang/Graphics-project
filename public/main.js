import {OrbitControls} from './js/examples/OrbitControls.js';
import * as THREE from './js/three.module.js';
import {OBJLoader} from './js/examples/loaders/OBJLoader.js';
import {MTLLoader} from './js/examples/loaders/MTLLoader.js';

function main() {
    // create geometries
    const objects = [];

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
    objects.push(sunMesh)

    // earth geometry
    const earthGeo = new THREE.SphereBufferGeometry(10, 15, 15);
    const earthMaterial = new THREE.MeshPhongMaterial({map: loader.load("image/earth.jpeg"),
                                                      bumpMap: loader.load('image/elev_bump_8k.jpg')})
    const earthMesh = new THREE.Mesh(earthGeo, earthMaterial);
    earthMesh.position.set(50, 0, 0)
    // scene.add(earthMesh)
    objects.push(earthMesh)

    const sectionInfo = {toDraw: [pointlight, ambient, sunMesh, earthMesh], toRotate: objects}
    drawMainCanvas(sectionInfo)
    const MinisectionInfo = {
        toDraw: [ambient.clone(), sunMesh.clone()],
        toRotate: [sunMesh.clone(), earthMesh.clone()]}
    drawMiniCanvas(MinisectionInfo)

}

function drawMainCanvas(geomtries) {
    const canvas = document.querySelector('#mainCanvas');
    const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
    });
    const camera = new THREE.PerspectiveCamera(40, 2, 0.1, 1000);
    camera.position.set(0, 0,200);
    const scene = new THREE.Scene();
    geomtries.toDraw.forEach((obj) => {
        scene.add(obj)
    })

    let start;
    function render(timestamp) {
        if (start === undefined)
            start = timestamp;
        const elapsed = timestamp - start;
        geomtries.toRotate.forEach((obj) => {
            obj.rotation.y = elapsed * 0.001;
        })
        // rotateEarth(earthMesh, elapsed * 0.01)
        resizeRendererToDisplaySize(renderer);
        // renderer.setScissorTest(false);
        // renderer.clear(true, true);
        // renderer.setScissorTest(true);
        // const miniCanInfo = addMiniCanvas();
        // renderSection(miniCanInfo)

        renderer.render(scene, camera);

        // const mini = addMiniCanvas();
        // renderer.render(mini.miniScene, mini.miniCamera)
        requestAnimationFrame(render);
        console.log("rendering")
    }
    requestAnimationFrame(render);

}

function drawMiniCanvas(geomtries) {
    const canvas = document.querySelector('#miniCanvas');
    const renderer = new THREE.WebGLRenderer({
                                                 canvas,
                                                 alpha: true,
                                             });
    const camera = new THREE.PerspectiveCamera(40, 2, 0.1, 1000);
    camera.position.set(0, 0,200);
    const scene = new THREE.Scene();
    geomtries.toDraw.forEach((obj) => {
        scene.add(obj)
    })

    let start;
    function render(timestamp) {
        if (start === undefined)
            start = timestamp;
        const elapsed = timestamp - start;
        geomtries.toRotate.forEach((obj) => {
            obj.rotation.y = elapsed * 0.001;
        })
        // rotateEarth(earthMesh, elapsed * 0.01)
        resizeRendererToDisplaySize(renderer);
        // renderer.setScissorTest(false);
        // renderer.clear(true, true);
        // renderer.setScissorTest(true);
        // const miniCanInfo = addMiniCanvas();
        // renderSection(miniCanInfo)

        renderer.render(scene, camera);

        // const mini = addMiniCanvas();
        // renderer.render(mini.miniScene, mini.miniCamera)
        requestAnimationFrame(render);
        console.log("rendering2")
    }
    requestAnimationFrame(render);
}


// function main() {
//     const canvas = document.querySelector('#canvas');
//     const renderer = new THREE.WebGLRenderer({
//         canvas,
//         alpha: true,
//     });
//     const scene = new THREE.Scene();
//
//     const fov = 40;
//     const aspect = 2;  // the canvas default
//     const near = 0.1;
//     const far = 1000;
//
//     const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
//     camera.position.set(0, 0,200);
//
//
//     // texture loader to load images onto geometries
//     const loader = new THREE.TextureLoader();
//
//     const controls = new OrbitControls(camera, canvas);
//     controls.target.set(0, 5, 0)
//     controls.update();
//
//     const objects = [];
//
//     // point light
//     const pointlight = new THREE.PointLight('#ffdcb4', 1.5);
//     pointlight.position.set(0, 0, 0);
//     pointlight.castShadow = true
//     pointlight.shadow.bias = 0.001
//     pointlight.shadow.mapSize.width = 2048;
//     pointlight.shadow.mapSize.height = 2048;
//     //scene.add(pointLight)
//
//     // ambient light
//     const ambient = new THREE.AmbientLight(0xaaaaaa);
//     scene.add(ambient);
//
//     // sun geometry
//     const sunGeo = new THREE.SphereBufferGeometry(25, 32, 32);
//     loader.load('image/sun6.png', (texture) => {
//         const material = new THREE.MeshBasicMaterial({map: texture})
//         const sunMesh = new THREE.Mesh(sunGeo, material);
//         sunMesh.position.set(0, 0, 0)
//
//         scene.add(sunMesh)
//         objects.push(sunMesh)
//     })
//
//     // earth geometry
//     const earthGeo = new THREE.SphereBufferGeometry(10, 15, 15);
//     const earthMaterial = new THREE.MeshPhongMaterial({map: loader.load("image/earth.jpeg"),
//                                                       bumpMap: loader.load('image/elev_bump_8k.jpg')})
//     const earthMesh = new THREE.Mesh(earthGeo, earthMaterial);
//     earthMesh.position.set(50, 0, 0)
//     // scene.add(earthMesh)
//     objects.push(earthMesh)
//
//     // add mesh: satellite object
//     const satelliteMesh = null;
//     const satelliteRotate = satelliteMesh;
//     const satellite_mtlLoader = new MTLLoader();
//     satellite_mtlLoader.load(
//         'objects/satellite/satellite.mtl', (materials) => {
//             materials.preload();
//             const satellite_objLoader = new OBJLoader();
//             satellite_objLoader.setMaterials(materials);
//             satellite_objLoader.load(
//                 'objects/satellite/satellite.obj', (root) => {
//
//                     const satelliteMesh = root;
//                     satelliteMesh.position.set(80, 30, 0);
//                    // satelliteMesh.scale.set(2,2,2);
//                     satelliteMesh.rotation.x = Math.PI / 2;
//                     satelliteMesh.rotation.y = -Math.PI / 2;
//                     /*
//                     satelliteMesh.traverse(function(child){
//                         if ((child instanceof THREE.Mesh)&&(satelliteMesh(child))) {
//                             child.material.color.setRGB(192,192,192);
//                         }
//                     });
//                     */
//
//                     // scene.add(satelliteMesh);
//                     objects.push(satelliteMesh);
//                 });
//         });
//
//     // main canvas
//     function addMainCanvas () {
//         const canvas = document.querySelector('#canvas');
//         const scene = new THREE.Scene();
//         const camera = new THREE.PerspectiveCamera(45, 2, 0.1, 1000);
//         camera.position.set(0, 0,200);
//
//         scene.add(ambient);
//         scene.add(earthMesh)
//
//     }
//
//     // additional canvas
//     function addMiniCanvas() {
//         const miniCanvas = document.querySelector('#minican');
//         console.log(miniCanvas)
//         const miniRenderer = new THREE.WebGLRenderer({miniCanvas, alpha: true});
//         const miniScene = new THREE.Scene();
//         const miniCamera = new THREE.PerspectiveCamera(45, 2, 0.1, 500);
//         miniCamera.position.set(0, 1, 2);
//         miniCamera.lookAt(0, 0, 0);
//         const miniAmbient = new THREE.AmbientLight(0xaaaaaa);
//         miniScene.add(miniAmbient)
//         miniScene.add(earthMesh)
//         console.log("in addminicanvas")
//         return {miniScene, miniCamera, miniCanvas}
//         // renderer.render(miniScene, miniCamera)
//         // requestAnimationFrame(miniRenderer)
//     }
//
//     function resizeRendererToDisplaySize(renderer) {
//         const canvas = renderer.domElement;
//         const width = canvas.clientWidth;
//         const height = canvas.clientHeight;
//         const needResize = canvas.width !== width || canvas.height !== height;
//         if (needResize) {
//             renderer.setSize(width, height, false);
//         }
//         return needResize;
//     }
//
//     function renderSection(sceneInfo) {
//         // const {scene, camera, elem} = sceneInfo;
//         // console.log(sceneInfo)
//         // console.log(elem)
//         const {left, right, top, bottom, width, height} = sceneInfo.miniCanvas.getBoundingClientRect();
//         const isOffscreen =
//             bottom < 0 ||
//             top > renderer.domElement.clientHeight ||
//             right < 0 ||
//             left > renderer.domElement.clientWidth;
//
//         if (isOffscreen) {
//             return;
//         }
//
//         camera.aspect = width / height;
//         camera.updateProjectionMatrix();
//
//         const positiveYUpBottom = renderer.domElement.clientHeight - bottom;
//         renderer.setScissor(left, positiveYUpBottom, width, height);
//         renderer.setViewport(left, positiveYUpBottom, width, height);
//
//         renderer.render(scene, camera);
//     }
//
//
//     // animation
//     let start;
//     function render(timestamp) {
//         if (start === undefined)
//             start = timestamp;
//         const elapsed = timestamp - start;
//         objects.forEach((obj) => {
//             obj.rotation.y = elapsed * 0.001;
//         })
//         rotateEarth(earthMesh, elapsed * 0.01)
//    //     rotateSatellite(satelliteMesh, elapsed * 0.01 )
//         resizeRendererToDisplaySize(renderer);
//         renderer.setScissorTest(false);
//         renderer.clear(true, true);
//         renderer.setScissorTest(true);
//         const miniCanInfo = addMiniCanvas();
//         renderSection(miniCanInfo)
//
//
//         // renderer.render(scene, camera);
//
//         // const mini = addMiniCanvas();
//         // renderer.render(mini.miniScene, mini.miniCamera)
//         requestAnimationFrame(render);
//
//     }
//     // requestAnimationFrame(render);
//
// }

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



