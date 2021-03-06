'use strict'

var gElCanvas;
var gCtx;
var base_image;
var gStartPos;


function init() {
    renderImages();
    renderStickers();
    gElCanvas = document.getElementById('my-canvas');
    gCtx = gElCanvas.getContext('2d');
    // make_base(); //temp
    addListeners();

}

function renderImages() {
    var imgs = getImgs();
    var strHtmls = imgs.map(function (img) {
        return `<li class="img-${img.id}" onclick="editMeme('${img.id}')">
                    <img src="memeImg/${img.id}.jpg" class="galImg" width="150" height="150">
                </li>`;
    })
    document.querySelector('.pics').innerHTML = strHtmls.join('');
}

function  renderStickers(){
    var stickers = getStickers();
    var strHtmls = stickers.map(function (sticker) {
        return `<li class="sticker" onclick="onAddSticker('${sticker}')">
                   ${sticker}
                </li>`;
    })
    document.querySelector('.sticker-list').innerHTML = strHtmls.join('');
}

function editMeme(imgId) {
    //imgId is string now because of rendering
    document.querySelector('.gallery').classList.add('hidden');
    document.querySelector('.meme-editor').classList.remove('hidden');
    clearAddedStickers();
    loadMemeToEdit(+imgId);
    updateGmeme(imgId);

}


function addListeners() {
    addTextListner();
    addMouseListeners();
}
function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mouseup', onUp)
}

function onDown(ev) {
    const pos = getEvPos(ev)
    if (!isTextClicked(pos)) {
        setTextDrag(false);
        onUpAndDown();
        if(!isTextClicked(pos)){
            onUpAndDown();
            return; 
        }
    }
    setTextDrag(true)
    document.querySelector('canvas').style.cursor = 'move';
    gStartPos = pos
    // console.log('hi');
}

function onMove(ev) {
    // const circle = getCircle();
    if (isDrag()) {
        document.querySelector('canvas').style.cursor = 'move';
        const pos = getEvPos(ev)
        const dx = pos.x - gStartPos.x
        const dy = pos.y - gStartPos.y
        gStartPos = pos
        moveText(dx, dy);
        renderCanvas();
        renderStickersOnCanvas();
    }
}

function onUp() {
    setTextDrag(false)
    document.querySelector('canvas').style.cursor = 'default';
}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    // if (gTouchEvs.includes(ev.type)) {
    //     ev.preventDefault()
    //     ev = ev.changedTouches[0]
    //     pos = {
    //         x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
    //         y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
    //     }
    // }
    return pos
}

function addTextListner() {
    document.getElementById('inp').addEventListener('keyup', function () {
        var stringTitle = document.getElementById('inp').value;
        updateCurrLine(stringTitle);
        gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
        renderCanvas();
        renderStickersOnCanvas();
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


function drawText(text, x, y, fontSize,color) {
    text = text.toUpperCase();
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = 'black';
    gCtx.fillStyle = color;
    gCtx.font = `${fontSize}px impact`;
    gCtx.fillText(text, x, y);
    gCtx.strokeText(text, x, y);
}



// change pages

function openMemes() {
    document.querySelector('.gallery').classList.add('hidden');
    document.querySelector('.galleryBtn').classList.add('notChoosen');
    document.querySelector('.meme-editor').classList.add('hidden');
    document.querySelector('.about').classList.add('hidden');
    document.querySelector('.aboutBtn').classList.add('notChoosen');
    document.querySelector('.memes').classList.remove('hidden');
    document.querySelector('.memeBtn').classList.remove('notChoosen');
    document.querySelector('.aboutImg1').classList.add('hidden');
    document.querySelector('.aboutImg2').classList.add('hidden');
    renderMemes();
}

function renderMemes(){
    var memes = getMemes();
    var strHtmls = memes.map(function (memeUrl) {
        return `<li>
                    
                    <img src="${memeUrl}" class="memeImg" width="150" height="150">
                </li>`;
    })
    document.querySelector('.saved-memes').innerHTML = strHtmls.join('');

}

function openGallery() {
    document.querySelector('.gallery').classList.remove('hidden');
    document.querySelector('.galleryBtn').classList.remove('notChoosen');
    document.querySelector('.meme-editor').classList.add('hidden');
    document.querySelector('.about').classList.add('hidden');
    document.querySelector('.aboutBtn').classList.add('notChoosen');
    document.querySelector('.memes').classList.add('hidden');
    document.querySelector('.memeBtn').classList.add('notChoosen');
    document.getElementById('inp').value ='';
    document.querySelector('[name=fillColor]').value= '#ffffff';
    document.querySelector('.file-input').value='';
    document.querySelector('.aboutImg1').classList.add('hidden');
    document.querySelector('.aboutImg2').classList.add('hidden');
}
function openAbout() {
    document.querySelector('.gallery').classList.add('hidden');
    document.querySelector('.galleryBtn').classList.add('notChoosen');
    document.querySelector('.meme-editor').classList.add('hidden');
    document.querySelector('.about').classList.remove('hidden');
    document.querySelector('.aboutBtn').classList.remove('notChoosen');
    document.querySelector('.memes').classList.add('hidden');
    document.querySelector('.memeBtn').classList.add('notChoosen');
    document.querySelector('.aboutImg1').classList.remove('hidden');
    document.querySelector('.aboutImg2').classList.remove('hidden');
}


function onIncreaseFont() {
    increaseFont();
    renderCanvas();
    renderStickersOnCanvas();

}

function onDecreaseFont() {
    decreaseFont();
    renderCanvas();
    renderStickersOnCanvas();
}

function onRemoveLine() {
    updateCurrLine('');
    renderCanvas();
    renderStickersOnCanvas();
    document.getElementById('inp').value = getGmemeText();

}

function onUpAndDown() {
    updateSelectedLine();
    document.getElementById('inp').value = getGmemeText();
    document.querySelector('[name=fillColor]').value = getGmemeColor();
}

function onAddLine() {
    updateSelectedLine();
    
    document.getElementById('inp').value = getGmemeText();
    renderCanvas();
    renderStickersOnCanvas();
}

function onChangeFillColor(){
    setGmemeColor(document.querySelector('[name=fillColor]').value);
    renderCanvas();
    renderStickersOnCanvas();
}

function onSave(elLink) {
    const data = gElCanvas.toDataURL();
    elLink.href = data;
}

function renderCanvas() {
    var lines = getLines();
    drawScaledImage(base_image);
    lines.forEach(line => {
        drawText(line.txt, line.x, line.y, line.size,line.color);
    })

}


// The next 2 functions handle IMAGE UPLOADING to img tag from file system: 
function onImgInput(ev) {
    loadImageFromInput(ev, renderImg)
}

function loadImageFromInput(ev, onImageReady) {
    // document.querySelector('.share-container').innerHTML = ''
    var reader = new FileReader()

    reader.onload = function (event) {
        gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
        var img = new Image()
        img.onload = onImageReady.bind(null, img)
        img.src = event.target.result
        base_image = img
        document.querySelector('.gallery').classList.add('hidden');
        document.querySelector('.meme-editor').classList.remove('hidden');
        document.querySelector('.aboutImg1').classList.add('hidden');
        document.querySelector('.aboutImg2').classList.add('hidden');

    }
    reader.readAsDataURL(ev.target.files[0])
}

function renderImg(img) {

    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
   
}

function onSaveToMemes(){
    saveMeme(gElCanvas.toDataURL());   
}

function toggleMenu() {
    document.body.classList.toggle('menu-open');
    document.querySelector('.main-nav').classList.toggle('unhide');   
}

async function shareImage() {

    const response = await fetch(gElCanvas.toDataURL());
    const blob = await response.blob();
    const filesArray = [
      new File(
        [blob],
        'meme.jpg',
        {
          type: "image/jpeg",
          lastModified: new Date().getTime()
        }
     )
    ];
    const shareData = {
      files: filesArray,
    };
    navigator.share(shareData);
  }

  function onSearch(){
    setSearched(document.querySelector('.search-inp').value);      
    renderImages();
  }

  function onAddSticker(sticker){
    addSticker(sticker);
    renderCanvas();
    renderStickersOnCanvas(); 
  }

  function renderStickersOnCanvas(){
    var stickersToAdd = getAddedStickers();
    stickersToAdd.forEach(sticker => drawText(sticker.sticker,sticker.x,sticker.y,sticker.size,'#000000'));
  }

  function onIncreaseSticker(){
    increaseStickerSize();
    renderCanvas();
    renderStickersOnCanvas();

  }

  function onDecreaseSticker(){
    decreaseStickerSize();
    renderCanvas();
    renderStickersOnCanvas();
  }

  function onRemoveSticker(){
      removeSticker();
      renderCanvas();
      renderStickersOnCanvas();
  }

  function onUpAndDownStickers(){
    updateStickerIdx();
    renderCanvas();
    renderStickersOnCanvas();
  }

  function onMoveSticker(direction){
    moveSticker(direction);
    renderCanvas();
    renderStickersOnCanvas();
  }