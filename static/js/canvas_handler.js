let runButton = document.getElementById('run');
runButton.addEventListener('click', () => {
    var editorId;
    let editorTabs = document.getElementById('editor-tabs');
    let children = editorTabs.children;
    for (let i = 0; i < children.length; i++){
        if (children[i].classList.contains('active')) {
            editorId = children[i].id;
        }
    }
    let editor = ace.edit(editorId);
    let code = editor.getValue();
    eval(code);
})

let clearButton = document.getElementById('clear');
clearButton.addEventListener('click', () => {
    let canvasDiv = document.getElementById('canvas_div');
    let canvas = document.getElementById('canvas');
    canvas.remove()
    let newCanvas = document.createElement('canvas');
    newCanvas.id = 'canvas';
    newCanvas.width = 600;
    newCanvas.height = 600;
    canvasDiv.appendChild(newCanvas);

    let gl = newCanvas.getContext("webgl"); 
    if (!gl) {
        alert("Failed to get WebGL context.\n"
        + "Your browser or device may not support WebGL.");
        return;
    }
    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    gl.clearColor(0, 0, 0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.STENCIL_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
})