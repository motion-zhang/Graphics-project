function addObject(scene, x, y, obj, spread, objs) {
    obj.position.x = x * spread;
    obj.position.y = y * spread;

    scene.add(obj);
    objs.push(obj);

}