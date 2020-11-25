const addSphere = (THREE, radius, widthSegments, heightSegments,material, pos_x, pos_y) => {
    const sphereGeometry = new THREE.SphereBufferGeometry(radius, widthSegments, heightSegments);
    const sphere = new THREE.Mesh(sphereGeometry, material);
    sphere.position.y = -1
    sphere.position.x = 3
    return sphere
}


