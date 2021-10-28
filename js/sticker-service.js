'use strict'


var gStickers = ['😗', '😍', '😁', '😱', '💩', '☠️', '🤘'];
var selectedStickerIdx = 0;
var gAddedStickers = [

];


function clearAddedStickers(){
    gAddedStickers =[];
}

function getStickers() {
    return gStickers;
}

function getAddedStickers() {
    return gAddedStickers;
}

function addSticker(sticker) {
    gAddedStickers.push({
        sticker: sticker,
        x: 100,
        y: 100,
        size: 20
    });
}

function increaseStickerSize() {
    gAddedStickers[selectedStickerIdx].size += 5;
}

function decreaseStickerSize() {
    gAddedStickers[selectedStickerIdx].size -= 5;

}

function removeSticker() {
    gAddedStickers.splice(selectedStickerIdx, 1);
    selectedStickerIdx = 0; //return to begining of stickers
}

function updateStickerIdx() {
    selectedStickerIdx++;
    if (selectedStickerIdx === gAddedStickers.length)
        selectedStickerIdx = 0;
}

function moveSticker(direction){
    switch(direction) {
        case 'up':
            gAddedStickers[selectedStickerIdx].y -= 5
          break;
        case 'down':
            gAddedStickers[selectedStickerIdx].y += 5
          break;
        case 'right':
            gAddedStickers[selectedStickerIdx].x += 5
          break;
        case 'left':
            gAddedStickers[selectedStickerIdx].x -= 5
          break;
        default:
          
      }
}