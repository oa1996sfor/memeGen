'use strict'

var gElCanvas;
var gCtx;
var base_image;


function init() {

    gElCanvas = document.getElementById('my-canvas');
    gCtx = gElCanvas.getContext('2d');
    make_base(); //temp
    addListeners();
  
}


function addListeners(){
    addTextListner();
}

function addTextListner(){
    document.getElementById('inp').addEventListener('keyup', function() {
        var stringTitle = document.getElementById('inp').value;
        // console.log(stringTitle);
        gCtx.clearRect(0, 0,  gElCanvas.width,gElCanvas.height);
        drawScaledImage(base_image);
        drawText(stringTitle,100,200);
        
        
        });
}

function make_base() {
     base_image = new Image();
    base_image.src = getImgById(1).url;
    base_image.addEventListener('load', e => {
        drawScaledImage(base_image);
        // drawText('i am trump', 200, 100);

    });
}

function drawScaledImage(img) {
    var canvas = gCtx.canvas;
    var hRatio = canvas.width / img.width;
    var vRatio = canvas.height / img.height;
    var ratio = Math.min(hRatio, vRatio);
    var centerShift_x = (canvas.width - img.width * ratio) / 2;
    var centerShift_y = (canvas.height - img.height * ratio) / 2;
    // ctx.clearRect(0,0,canvas.width, canvas.height);
    gCtx.drawImage(img, 0, 0, img.width, img.height,
        centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
}


function drawText(text, x, y) {
    
    // gCtx.font = '48px impact';
    // gCtx.fillText(text, x, y);
    
    text = text.toUpperCase();
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = 'black';
    gCtx.fillStyle = 'white';
    gCtx.font = '40px impact';
    gCtx.fillText(text, x, y);
    gCtx.strokeText(text, x, y);
}



