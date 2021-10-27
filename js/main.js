'use strict'

var gElCanvas;
var gCtx;
var base_image;


function init() {
    renderImages();
    gElCanvas = document.getElementById('my-canvas');
    gCtx = gElCanvas.getContext('2d');
    // make_base(); //temp
    addListeners();

}

function renderImages() {
    var imgs = getImgs();
    var strHtmls = imgs.map(function (img) {
        return `<li class="img-${img.id}" onclick="editMeme('${img.id}')">
                    <img src="memeImg/${img.id}.jpg" width="120" height="120">
                </li>`;
    })
    document.querySelector('.pics').innerHTML = strHtmls.join('')
}

function editMeme(imgId) {
    //imgId is string now because of rendering
    document.querySelector('.gallery').classList.add('hidden');
    document.querySelector('.meme-editor').classList.remove('hidden');
    loadMemeToEdit(+imgId);
    updateGmeme(imgId);

}


function addListeners() {
    addTextListner();
}

function addTextListner() {
    document.getElementById('inp').addEventListener('keyup', function () {
        var stringTitle = document.getElementById('inp').value;
        updateCurrLine(stringTitle);
        gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
        renderCanvas();
    });
}

function loadMemeToEdit(imgId) {
    base_image = new Image();
    base_image.src = getImgById(imgId).url;
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


function drawText(text, x, y, fontSize) {

    text = text.toUpperCase();
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = 'black';
    gCtx.fillStyle = getGmemeColor();
    gCtx.font = `${fontSize}px impact`;
    gCtx.fillText(text, x, y);
    gCtx.strokeText(text, x, y);
}



// change pages

function openMemes() {
    document.querySelector('.gallery').classList.add('hidden');
    document.querySelector('.meme-editor').classList.add('hidden');
    document.querySelector('.about').classList.add('hidden');
    document.querySelector('.memes').classList.remove('hidden');
}

function openGallery() {
    document.querySelector('.gallery').classList.remove('hidden');
    document.querySelector('.meme-editor').classList.add('hidden');
    document.querySelector('.about').classList.add('hidden');
    document.querySelector('.memes').classList.add('hidden');
}
function openAbout() {
    document.querySelector('.gallery').classList.add('hidden');
    document.querySelector('.meme-editor').classList.add('hidden');
    document.querySelector('.about').classList.remove('hidden');
    document.querySelector('.memes').classList.add('hidden');
}


function onIncreaseFont() {
    increaseFont();
    renderCanvas();

}

function onDecreaseFont() {
    decreaseFont();
    renderCanvas();
}

function onRemoveLine() {
    updateCurrLine('');
    renderCanvas();
    document.getElementById('inp').value = getGmemeText();

}

function onUpAndDown() {
    
    updateSelectedLine();
    document.getElementById('inp').value = getGmemeText();
}

function onAddLine() {
    updateSelectedLine();
    document.getElementById('inp').value = getGmemeText();
    renderCanvas();
}

function renderCanvas() {
    // var pos = getLinePos();
    var lines = getLines();
    drawScaledImage(base_image);
    lines.forEach(line => {
        drawText(line.txt, line.x, line.y, line.size);
    })

}