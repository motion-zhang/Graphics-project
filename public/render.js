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

// function render(time,camera,objects,scene) {
//     time *= 0.001;
//
//     if (resizeRendererToDisplaySize(renderer)) {
//         const canvas = renderer.domElement;
//         camera.aspect = canvas.clientWidth / canvas.clientHeight;
//         camera.updateProjectionMatrix();
//     }
//
//     objects.forEach((obj, ndx) => {
//         const speed = .1 + ndx * .05;
//         const rot = time * speed;
//         obj.rotation.x = rot;
//         obj.rotation.y = rot;
//     });
//
//     renderer.render(scene, camera);
//
//     requestAnimationFrame(render);
// }