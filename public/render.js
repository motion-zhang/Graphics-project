function render(time,scene,camera,sphere,renderer) {
    time *= 0.001;
    var i;
    sphere.rotation.x = time;
    sphere.rotation.y = time;
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}
// requestAnimationFrame(render);