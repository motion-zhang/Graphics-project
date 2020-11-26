function main(THREE) {
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
    camera1.position.z = 120;

    // Zooming Camera
    const camera2 = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera2.position.z = 200;
    camera2.zoom = 1;
    camera2.fov = 50;

    const cameraInView = camera2;



    const scene = new THREE.Scene();

    {
        const color = 0xFFFFFF;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(-1, 2, 4);
        scene.add(light);
    }
    {
        const color = 0xFFFFFF;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(1, -2, -4);
        scene.add(light);
    }

    const objects = [];
    const spread = 15;

    // Sun parameters
    const sunRadius = 15;
    const sunPosX = -2;
    const sunPosY = -1;
    const sunRingPosX = sunPosX;
    const sunRingPosY = sunPosY;
    // Earth parameters
    const earthRadius = 0.7 * sunRadius;
    const earthPosX = 3;
    const earthPosY = 0.5;
    const earthRingPosX = earthPosX;
    const earthRingPosY = earthPosY;

    // Sun
    {
        const widthSegments = 32;
        const heightSegments = 32;
        addSolidGeometry(sunPosX, sunPosY, new THREE.SphereBufferGeometry(sunRadius, widthSegments, heightSegments),THREE,spread,scene,objects);
    }

    // Sun Orbit
    {
        const innerRadius = 60;
        const outerRadius = 62;
        const segments = 180;
        addSolidGeometry(sunRingPosX, sunRingPosY, new THREE.RingBufferGeometry(innerRadius, outerRadius, segments),THREE,spread,scene,objects);
    }


    // Earth
    {
        const widthSegments = 32;
        const heightSegments = 32;
        addSolidGeometry(earthPosX, earthPosY, new THREE.SphereBufferGeometry(earthRadius, widthSegments, heightSegments),THREE,spread,scene,objects);
    }

    // Earth Orbit
    {
        const innerRadius = 30;
        const outerRadius = 32;
        const segments = 90;
        addSolidGeometry(earthRingPosX, earthRingPosY, new THREE.RingBufferGeometry(innerRadius, outerRadius, segments),THREE,spread,scene,objects);
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

        requestAnimationFrame(render);
    }
    // render(time,camera,objects,scene)
    requestAnimationFrame(render);
}

