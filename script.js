const canvas = document.getElementById('canvas');
const clear = document.getElementById('clear');
const eraser = document.getElementById('eraser');
const ctx = canvas.getContext('2d');
/* The HTMLCanvasElement.getContext() method returns a drawing context on the canvas, or null if the context identifier is not supported, or the canvas has already been set to a different context mode. 
"2d", leading to the creation of a CanvasRenderingContext2D object representing a two-dimensional rendering context. CanvasRenderingContext2D is used for drawing shapes, text, images, and other objects.*/


// Create gradient
const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
gradient.addColorStop("0", "magenta");
gradient.addColorStop("0.5", "blue");
gradient.addColorStop("1.0", "red");

// Fill with gradient
ctx.strokeStyle = gradient;
//ctx.strokeStyle = '#000'; // colour
ctx.lineWidth = 10; // width
ctx.linecap = 'round';

let isDrawing = false;
let isErasing = false;
let lastX = 0;
let lastY = 0;
let eraserButtonClicked = false; // to ensure operations happen only when clicked and dragged else not
// without above variable the eraser was working even when mouse was not clicked or after released

// mouse is clicked and drawing(drag) will start
canvas.addEventListener('mousedown', (event) => {
    if(!eraserButtonClicked) { // drawing mode
        isDrawing = true;
        isErasing = false;
    } else { // eraser mode
        isErasing = true;
        isDrawing = false;
    }
    // start points
    const {offsetX, offsetY} = event;
    lastX = offsetX;
    lastY = offsetY;
})

// mouse is dragged and drawing is going on
canvas.addEventListener('mousemove', (event) => {
    // new start points
    const {offsetX, offsetY} = event;
    if(isDrawing && !isErasing) { // Drawing 
        ctx.beginPath();
        ctx.moveTo(lastX, lastY); // lets go to our start point
        ctx.lineTo(offsetX, offsetY); // lets to move it to where we are
        ctx.stroke();
        // update our variables
        lastX = offsetX;
        lastY = offsetY;
    } else if(!isDrawing && isErasing){ // Erasing
        ctx.clearRect(offsetX, offsetY, 10, 10) // 10 by 10 eraser
    }
})

// below 2 listener is to ensure that drawing and erasing can only be done while clicked and dragged else not
// mouse is released and drawing(drag) will stop
canvas.addEventListener('mouseup', () => {
    isDrawing = false
    isErasing = false
})

// mouse leaves the canvas
canvas.addEventListener('mouseleave', () => {
    isDrawing = false
    isErasing = false
})

// clear entire screen
clear.addEventListener('click', (event) => {
    event.preventDefault();
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight); // 1st and 2nd param is initial co-ordinate, 3rd and 4th is the next distance from initial so if initials are (250, 232) then give 3rd and 4th like (10,10) so it will make it as from 250 10 dist
})

// toggle eraser button
eraser.addEventListener('change', () => {
    if(eraserButtonClicked) {
        eraserButtonClicked = false
    } else {
        eraserButtonClicked = true
    }
})