function render(time) {
    time *= 0.001;  // convert time to seconds
    cube.rotation.x = time;
    cube.rotation.y = time;
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}
requestAnimationFrame(render);