'use strict'

var gKeywords = { 'happy': 12, 'funny puk': 1 };
var gMemes = [];


var gImgs = [{ id: 1, url: 'memeImg/1.jpg', keywords: ['happy'] },
{ id: 2, url: 'memeImg/2.jpg', keywords: ['happy'] },
{ id: 3, url: 'memeImg/3.jpg', keywords: ['happy'] },
{ id: 4, url: 'memeImg/4.jpg', keywords: ['happy'] },
{ id: 5, url: 'memeImg/5.jpg', keywords: ['happy'] },
{ id: 6, url: 'memeImg/6.jpg', keywords: ['happy'] },
{ id: 7, url: 'memeImg/7.jpg', keywords: ['happy'] },
{ id: 8, url: 'memeImg/8.jpg', keywords: ['happy'] },
{ id: 9, url: 'memeImg/9.jpg', keywords: ['happy'] },
{ id: 10, url: 'memeImg/10.jpg', keywords: ['happy'] },
{ id: 11, url: 'memeImg/11.jpg', keywords: ['happy'] },
{ id: 12, url: 'memeImg/12.jpg', keywords: ['happy'] },
{ id: 13, url: 'memeImg/13.jpg', keywords: ['happy'] },
{ id: 14, url: 'memeImg/14.jpg', keywords: ['happy'] },
{ id: 15, url: 'memeImg/15.jpg', keywords: ['happy'] },
{ id: 16, url: 'memeImg/16.jpg', keywords: ['happy'] },
{ id: 17, url: 'memeImg/17.jpg', keywords: ['happy'] },
{ id: 18, url: 'memeImg/18.jpg', keywords: ['happy'] }
];
var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: '',
            size: 40,
            align: 'left',
            color: '#ffffff',
            x: 100,
            y: 100
        },
        {
            txt: '',
            size: 40,
            align: 'left',
            color: '#ffffff',
            x: 100,
            y: 400
        }
    ]
};


function getImgs() {
    return gImgs;
}




function getImgById(id) {
    return gImgs.find((img) => img.id === id);
}

function updateGmeme(imgId) {
    gMeme.selectedImgId = imgId;
    gMeme.selectedLineIdx = 0;
    gMeme.lines = [
        {
            txt: '',
            size: 40,
            align: 'left',
            color: '#ffffff',
            x: 100,
            y: 100
        },
        {
            txt: '',
            size: 40,
            align: 'left',
            color: '#ffffff',
            x: 100,
            y: 400
        }
    ];
}

function updateCurrLine(text) {
    // debugger;
    gMeme.lines[gMeme.selectedLineIdx].txt = text;
}

function getGmemeLineSize() {
    return gMeme.lines[gMeme.selectedLineIdx].size;
}

function getGmemeColor() {
    return gMeme.lines[gMeme.selectedLineIdx].color;
}

function setGmemeColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color;
}

function increaseFont() {
    // console.log('hi');
    gMeme.lines[gMeme.selectedLineIdx].size += 5;
}

function decreaseFont() {
    if (gMeme.lines[gMeme.selectedLineIdx].size === 5) return;
    gMeme.lines[gMeme.selectedLineIdx].size -= 5;
}



function getGmemeText() {
    return gMeme.lines[gMeme.selectedLineIdx].txt;
}

function updateSelectedLine() {
    if (gMeme.selectedLineIdx === gMeme.lines.length - 1)
        gMeme.selectedLineIdx = 0;
    else
        gMeme.selectedLineIdx++;
}

function getLinePos() {
    return {
        x: gMeme.lines[gMeme.selectedLineIdx].x,
        y: gMeme.lines[gMeme.selectedLineIdx].y
    };
}

function getLines() {
    return gMeme.lines;
}

function moveTextX(dx) {
    gMeme.lines[gMeme.selectedLineIdx].x += dx;

}
function moveTextY(dy) {
    gMeme.lines[gMeme.selectedLineIdx].y += dy;
}

function getMemes() {
    var memes = loadFromStorage('memes');
    if (!memes) return gMemes;
    gMemes = memes;
    return gMemes;
}

function saveMeme(memeUrl) {
    var memes = loadFromStorage('memes');
    if (!memes) memes = [memeUrl];
    else memes.push(memeUrl);
    saveToStorage('memes', memes);
}
