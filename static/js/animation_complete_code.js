// STEP 4 - Part A
var rotation = 0.0;
var timePassed = 0.0;

const main = () => {
    // STEP 1
    const canvas = document.querySelector("#canvas");
    const gl = canvas.getContext("webgl");

    if (gl === null) {
        alert("Couldn't initialize WebGL. Your browser may not support it");
        return
    }

    const vsSource = `
        attribute vec4 aVertexPosition;

        uniform mat4 uModelViewMatrix;
        uniform mat4 uProjectionMatrix;

        void main() {
            gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
        }
    `;

    const fsSource = `
        void main() {
            gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
        }
    `;

    const shaderProgram = initShaderProgram(gl, vsSource, fsSource);

    const programInfo = {
        program: shaderProgram,
        attribLocations: {
            vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
        },
        uniformLocations: {
            projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
            modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
        },
    };

    // STEP 2 - Part B
    const [buffers, numVertices] = initBuffers(gl);

    // STEP 3 - Part B
    // drawScene(gl, programInfo, buffers, numVertices);

    // STEP 4 - Part C
    var then = 0;

    // Render the shape over and over
    function renderDrawing(now) {
        now *= 0.001;  
        timePassed = now - then;
        then = now;

        drawScene(gl, programInfo, buffers, numVertices, timePassed);

        requestAnimationFrame(renderDrawing);
    }
    requestAnimationFrame(renderDrawing);
}

function initShaderProgram(gl, vsSource, fsSource) {
    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);
    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
        return null;
    }
    return shaderProgram;
}

function loadShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }
    return shader;
}

// STEP 2 - Part A
function initBuffers(gl) {
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    // Array of vertices for your desired shape
    const positions = [
        -0.25, 1.0,
        0.25, 1.0,
        0.0, 0.25, 
        0.5, 0.25,
        -0.25, -1.0,
        0.0, 0.0,
        -0.5, 0.0
    ];
  
    var numVertices = Math.floor(positions.length / 2);
    gl.bufferData(gl.ARRAY_BUFFER,
        new Float32Array(positions),
        gl.STATIC_DRAW);

    return [{
        position: positionBuffer,
    }, numVertices];
}

// STEP 3 - Part A
function drawScene(gl, programInfo, buffers, numVertices) {
    gl.clearDepth(1.0);                 
    gl.enable(gl.DEPTH_TEST);          
    gl.depthFunc(gl.LEQUAL);            

    const fieldOfView = 45 * Math.PI / 180;   
    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    const zNear = 0.1;
    const zFar = 100.0;
    const projectionMatrix = mat4.create();

    mat4.perspective(projectionMatrix,
        fieldOfView,
        aspect,
        zNear,
        zFar);

    const modelViewMatrix = mat4.create();


    mat4.translate(modelViewMatrix,    
        modelViewMatrix,     
        [-0.0, 0.0, -6.0]);  

    // STEP 4 - Part B
    mat4.rotate(modelViewMatrix,  
        modelViewMatrix,  
        rotation,  
        [1, 1, 1]);       

    {
        const numComponents = 2;  
        const type = gl.FLOAT;    
        const normalize = false;  
        const stride = 0;         
        const offset = 0;        
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
        gl.vertexAttribPointer(
            programInfo.attribLocations.vertexPosition,
            numComponents,
            type,
            normalize,
            stride,
            offset);
        gl.enableVertexAttribArray(
            programInfo.attribLocations.vertexPosition);
    }

    gl.useProgram(programInfo.program);

    gl.uniformMatrix4fv(
        programInfo.uniformLocations.projectionMatrix,
        false,
        projectionMatrix);
    gl.uniformMatrix4fv(
        programInfo.uniformLocations.modelViewMatrix,
        false,
        modelViewMatrix);

    {
        const offset = 0;
        gl.drawArrays(gl.LINE_LOOP, offset, numVertices);
    }

    // STEP 4 - Part D
    rotation += timePassed;
}

main();