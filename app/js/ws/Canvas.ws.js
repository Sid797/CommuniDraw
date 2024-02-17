const clearButton = document.getElementById('clear-button');
clearButton.addEventListener('click', (e) => {
    e.preventDefault();
    socket.emit('clear');
});

let pixels = [];
socket.on('pixels', (data) => {
    pixels = data;
    drawPixels(data);
});

socket.on("pixel", (data) => {
    drawPixel(data);
});

socket.on("clear", () => {
    clearCanvas();
});

function sendPixel(pixel){
    socket.emit('pixel', pixel);
}