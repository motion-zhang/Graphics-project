function addObject(x, y, spread, scene, obj, objects) {
    obj.position.x = x * spread;
    obj.position.y = y * spread;

    scene.add(obj);
    objects.push(obj);
}

function createMaterial(THREE) {
    const material = new THREE.MeshPhongMaterial({
        side: THREE.DoubleSide,
    });

    const hue = Math.random();
    const saturation = 1;
    const luminance = .5;
    material.color.setHSL(hue, saturation, luminance);

    return material;
}

function addSolidGeometry(x, y, geometry, THREE,spread,scene,objects) {
    const mesh = new THREE.Mesh(geometry, createMaterial(THREE));
    addObject(x, y, spread, scene, mesh, objects);
}

function addLineGeometry(x, y, geometry, THREE,spread,scene,objects) {
    const material = new THREE.LineBasicMaterial({color: 0x000000});
    const mesh = new THREE.LineSegments(geometry, material);
    addObject(x, y, mesh);
}