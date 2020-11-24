// // WebGL - Multiple Objects - List
// // from https://webglfundamentals.org/webgl/webgl-multiple-objects-list.html
//
//
// "use strict";
//
// function main() {
//
//     var canvas = document.querySelector("#canvas");
//     var gl = canvas.getContext("webgl")
//
//     // creates buffers with position, normal, texcoord, and vertex color
//     // data for primitives by calling gl.createBuffer, gl.bindBuffer,
//     // and gl.bufferData
//     const sphereBufferInfo = primitives.createSphereWithVertexColorsBufferInfo(gl, 10, 12, 6);
//     const sphereBufferInfo2 = primitives.createSphereWithVertexColorsBufferInfo(gl, 20, 24, 12);
//     const cubeBufferInfo   = primitives.createCubeWithVertexColorsBufferInfo(gl, 20);
//     // const coneBufferInfo   = primitives.createTruncatedConeWithVertexColorsBufferInfo(gl, 10, 0, 20, 12, 1, true, false);
//
//     // setup GLSL program
//     var programInfo = webglUtils.createProgramInfo(gl, ["vertex-shader-3d", "fragment-shader-3d"]);
//
//     function degToRad(d) {
//         return d * Math.PI / 180;
//     }
//
//     var cameraAngleRadians = degToRad(0);
//     var fieldOfViewRadians = degToRad(60);
//     var cameraHeight = 50;
//
//     // Uniforms for each object.
//     var sphereUniforms = {
//         u_colorMult: [0.5, 1, 0.5, 1],
//         u_matrix: m4.identity(),
//     };
//     var cubeUniforms = {
//         u_colorMult: [1, 0.5, 0.5, 1],
//         u_matrix: m4.identity(),
//     };
//     var coneUniforms = {
//         u_colorMult: [0.5, 0.5, 1, 1],
//         u_matrix: m4.identity(),
//     };
//     var sphereTranslation = [  0, 0, 0];
//     var cubeTranslation   = [-40, 0, 0];
//     var coneTranslation   = [ 40, 0, 0];
//
//     var objectsToDraw = [
//         {
//             programInfo: programInfo,
//             bufferInfo: sphereBufferInfo,
//             uniforms: sphereUniforms,
//         },
//         // {
//         //     programInfo: programInfo,
//         //     bufferInfo: cubeBufferInfo,
//         //     uniforms: cubeUniforms,
//         // },
//         // {
//         //     programInfo: programInfo,
//         //     bufferInfo: coneBufferInfo,
//         //     uniforms: coneUniforms,
//         // },
//         {
//             programInfo: programInfo,
//             bufferInfo: sphereBufferInfo2,
//             uniforms: coneUniforms,
//         },
//     ];
//
//     function computeMatrix(viewProjectionMatrix, translation, xRotation, yRotation) {
//         var matrix = m4.translate(viewProjectionMatrix,
//             translation[0],
//             translation[1],
//             translation[2]);
//         matrix = m4.xRotate(matrix, xRotation);
//         return m4.yRotate(matrix, yRotation);
//     }
//
//     requestAnimationFrame(drawScene);
//
//     // Draw the scene.
//     function drawScene(time) {
//         time *= 0.0005;
//
//         webglUtils.resizeCanvasToDisplaySize(gl.canvas);
//
//         // Tell WebGL how to convert from clip space to pixels
//         gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
//
//         gl.enable(gl.CULL_FACE);
//         gl.enable(gl.DEPTH_TEST);
//
//         // Clear the canvas AND the depth buffer.
//         gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
//
//         // Compute the projection matrix
//         var aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
//         var projectionMatrix =
//             m4.perspective(fieldOfViewRadians, aspect, 1, 2000);
//
//         // Compute the camera's matrix using look at.
//         var cameraPosition = [0, 0, 100];
//         var target = [0, 0, 0];
//         var up = [0, 1, 0];
//         var cameraMatrix = m4.lookAt(cameraPosition, target, up);
//
//         // Make a view matrix from the camera matrix.
//         var viewMatrix = m4.inverse(cameraMatrix);
//
//         var viewProjectionMatrix = m4.multiply(projectionMatrix, viewMatrix);
//
//         var sphereXRotation =  time;
//         var sphereYRotation =  time;
//         var cubeXRotation   = -time;
//         var cubeYRotation   =  time;
//         var coneXRotation   =  time;
//         var coneYRotation   = -time;
//
//         // Compute the matrices for each object.
//         sphereUniforms.u_matrix = computeMatrix(
//             viewProjectionMatrix,
//             sphereTranslation,
//             sphereXRotation,
//             sphereYRotation);
//
//         cubeUniforms.u_matrix = computeMatrix(
//             viewProjectionMatrix,
//             cubeTranslation,
//             cubeXRotation,
//             cubeYRotation);
//
//         coneUniforms.u_matrix = computeMatrix(
//             viewProjectionMatrix,
//             coneTranslation,
//             coneXRotation,
//             coneYRotation);
//
//         // ------ Draw the objects --------
//
//         objectsToDraw.forEach(function(object) {
//             var programInfo = object.programInfo;
//             var bufferInfo = object.bufferInfo;
//
//             gl.useProgram(programInfo.program);
//
//             // Setup all the needed attributes.
//             webglUtils.setBuffersAndAttributes(gl, programInfo, bufferInfo);
//
//             // Set the uniforms.
//             webglUtils.setUniforms(programInfo, object.uniforms);
//
//             // Draw
//             gl.drawArrays(gl.TRIANGLES, 0, bufferInfo.numElements);
//         });
//
//         requestAnimationFrame(drawScene);
//     }
// }
//
