function main(THREE) {
    const canvas = document.querySelector('#canvas');
    const renderer = new THREE.WebGLRenderer({canvas});

    const fov = 40;
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 1000;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 120;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xAAAAAA);

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



    {
        const innerRadius = 60;   //---- orbit
        const outerRadius = 62;
        const segments = 180;
        addSolidGeometry(0, 0, new THREE.RingBufferGeometry(innerRadius, outerRadius, segments),THREE,spread,scene,objects);
    }

    {
        const radius = 30;
        const widthSegments = 120;     //---- Sun
        const heightSegments = 80;
        addSolidGeometry(-1, 0, new THREE.SphereBufferGeometry(radius, widthSegments, heightSegments),THREE,spread,scene,objects);
    }

    {
        const radius = 15;
        const widthSegments = 60;    //  ---- Earth
        const heightSegments = 40;
        addSolidGeometry(4, 0, new THREE.SphereBufferGeometry(radius, widthSegments, heightSegments),THREE,spread,scene,objects);
    }


    function render(time) {
        time *= 0.001;

        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }

        objects.forEach((obj, ndx) => {
            const speed = .1 + ndx * .05;
            const rot = time * speed;
            obj.rotation.x = rot;
            obj.rotation.y = rot;
        });

        renderer.render(scene, camera);

        requestAnimationFrame(render);
    }
    // render(time,camera,objects,scene)
    requestAnimationFrame(render);
}

