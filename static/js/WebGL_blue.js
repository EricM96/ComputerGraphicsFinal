const main = () => {
    let canvas = document.querySelector("#canvas");
    let gl = canvas.getContext("webgl"); 
    if (!gl) {
        alert("Failed to get WebGL context :(");
        return;
    }
    gl.clearColor(0, 0, 1, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
}

main();