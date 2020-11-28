import {OrbitControls} from './js/examples/OrbitControls.js';
import * as THREE from './js/three.module.js';
import {EffectComposer} from "./js/examples/EffectComposer.js"
import {RenderPass} from "./js/examples/postprocessing/RenderPass.js";
import {ShaderPass} from "./js/examples/postprocessing/ShaderPass.js";
import {VerticalBlurShader} from "./js/examples/shaders/VerticalBlurShader.js";
import {HorizontalBlurShader} from "./js/examples/shaders/HorizontalBlurShader.js";

function main() {
    const canvas = document.querySelector('#canvas');
    const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
    });

    const fov = 40;
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 1000;

    // Original Camera
    const camera1 = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera1.position.set(0, 10,120);

    // Zooming Camera
    const camera2 = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera2.position.set(0, 0,200);

    const cameraInView = camera2;

    const scene = new THREE.Scene();

    // texture loader to load images onto geometries
    const loader = new THREE.TextureLoader();
    // {
    //     const color = 0xFFFFFF;
    //     const intensity = 1;
    //     const light = new THREE.DirectionalLight(color, intensity);
    //     light.position.set(0, 0, 10);
    //     scene.add(light);
    // }
    // {
    //     const color = 0xFFFFFF;
    //     const intensity = 1;
    //     const light = new THREE.DirectionalLight(color, intensity);
    //     light.position.set(1, -2, -4);
    //     scene.add(light);
    // }

    const objects = [];
    const spread = 15;

    // Sun parameters
    const sunRadius = 15;
    const sunPosX = -2;
    const sunPosY = -1;
    const sunRingPosX = sunPosX;
    const sunRingPosY = sunPosY;
    // Earth parameters
    const earthRadius = 0.5 * sunRadius;
    const earthPosX = 3;
    const earthPosY = 0.5;


    // spot light
    const spotlight = new THREE.PointLight('#ffdcb4', 1.5);
    spotlight.position.set(0, 0, 0);
    spotlight.castShadow = true
    spotlight.shadow.bias = 0.001
    spotlight.shadow.mapSize.width = 2048;
    spotlight.shadow.mapSize.height = 2048;
    scene.add(spotlight);

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
    // const sunMat = new THREE.MeshBasicMaterial({map: loader.load('image/sun.png')})
    // const sunMesh = new THREE.Mesh(sunGeo, sunMat);
    // sunMesh.position.set(0, 0, 0)
    // scene.add(sunMesh)
    // objects.push(sunMesh)

    // const sunImg = new THREE.SpriteMaterial(
    //     {
    //         map: new THREE.TextureLoader.loadTexture("image/sun.png"),
    //         useScreenCoordinates: false,
    //         color: 0xffffee,
    //         transparent: false,
    //         blending: THREE.AdditiveBlending
    //     }
    // );
    // const sunSprite = new THREE.Sprite(sunImg);
    // sunSprite.scale.set(25, 25, 1.0)
    // sunMesh.add(sunSprite);

    // scene.add(spotlight.target)

    // atmosphere
    const atmoGeo = new THREE.CircleBufferGeometry(20, 30);
    const atmoMaterial = new THREE.MeshPhongMaterial ({color: "#F1D0D0", emissive: "#F1D0D0"} )
    const atmoMesh = new THREE.Mesh(atmoGeo, atmoMaterial);
    atmoMesh.position.set(0, 0, 10)
    // scene.add(atmoMesh);

    const controls = new OrbitControls(camera2, canvas);
    controls.target.set(0, 5, 0)
    controls.update();

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
        moveEarth(earthMesh, elapsed * 0.01)
        renderer.render(scene, camera2);
        requestAnimationFrame(render)


    // Sun Orbit
    {
        const innerRadius = 75;
        const outerRadius = 77;
        const segments = 225;
        addSolidGeometry(sunRingPosX, sunRingPosY, new THREE.RingBufferGeometry(innerRadius, outerRadius, segments),THREE,spread,scene,objects);

    }
    requestAnimationFrame(render)
    // renderer.render(scene, camera2)
//     const composer = new EffectComposer( renderer );
//     composer.addPass( new RenderPass( scene, camera2 ) );
//
//     const hblur = new ShaderPass( HorizontalBlurShader );
//     composer.addPass( hblur );
//
//     const vblur = new ShaderPass( VerticalBlurShader );
// // set this shader pass to render to screen so we can see the effects
//     vblur.renderToScreen = true;
//     composer.addPass( vblur );
//     composer.render();
    // // Earth
    // {
    //     const widthSegments = 32;
    //     const heightSegments = 32;
    //     addSolidGeometry(earthPosX, earthPosY, new THREE.SphereBufferGeometry(earthRadius, widthSegments, heightSegments),THREE,spread,scene,objects, "#00FFFF");
    // }

    // function render(time) {
    //     time *= 0.001;
    //
    //     if (resizeRendererToDisplaySize(renderer)) {
    //         const canvas = renderer.domElement;
    //         cameraInView.aspect = canvas.clientWidth / canvas.clientHeight;
    //         cameraInView.updateProjectionMatrix();
    //     }
    //
    //     objects.forEach((obj, ndx) => {
    //         const speed = .1 + ndx * .05;
    //         const rot = time * speed;
    //         obj.rotation.x = rot;
    //         obj.rotation.y = rot;
    //     });
    //
    //     renderer.render(scene, cameraInView);
    //
    //     requestAnimationFrame(render);
    // }
    // // render(time,camera,objects,scene)
    // requestAnimationFrame(render);
}

function addObject(x, y, spread, scene, obj, objects) {
    obj.position.x = x * spread;
    obj.position.y = y * spread;


    scene.add(obj);
    objects.push(obj);
}

    // Earth
    {
        const widthSegments = 32;
        const heightSegments = 32;
        addSolidGeometry(earthPosX, earthPosY, new THREE.SphereBufferGeometry(earthRadius, widthSegments, heightSegments),THREE,spread,scene,objects);
    }



    function render(time) {
        time *= 0.001;

        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            cameraInView.aspect = canvas.clientWidth / canvas.clientHeight;
            cameraInView.updateProjectionMatrix();
        }

        objects.forEach((obj, ndx) => {
            const speed = .1 + ndx * .05;
            const rot = time * speed;
            obj.rotation.x = rot;
            obj.rotation.y = rot;
        });

        renderer.render(scene, cameraInView);


function moveEarth(obj, time) {
    obj.position.x = Math.cos(time * 0.1 + 5) * 50;
    obj.position.z = Math.sin(time * 0.1 + 5) * 50;
}

// function createMaterial(THREE, objColor) {
//     const material = new THREE.MeshPhongMaterial({
//         side: THREE.DoubleSide,
//         color: objColor
//     });
//
//     // const hue = Math.random();
//     // const saturation = 1;
//     // const luminance = .5;
//     // material.color.setHSL(hue, saturation, luminance);
//
//     return material;
// }
//
// function addSolidGeometry(x, y, geometry, THREE,spread,scene,objects, objColor) {
//     const mesh = new THREE.Mesh(geometry, createMaterial(THREE, objColor));
//     addObject(x, y, spread, scene, mesh, objects);
// }
//
// function addLineGeometry(x, y, geometry, THREE,spread,scene,objects) {
//     const material = new THREE.LineBasicMaterial({color: 0x000000});
//     const mesh = new THREE.LineSegments(geometry, material);
//     addObject(x, y, mesh);
// }
main();

