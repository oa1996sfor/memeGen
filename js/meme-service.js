'use strict'

var gKeywords = { 'happy': 12, 'funny puk': 1 };
var gMemes = [];
var searchKeyword = '';


var gImgs = [{ id: 1, url: 'memeImg/1.jpg', keywords: ['angry', 'trump', 'finger', 'point'] },
{ id: 2, url: 'memeImg/2.jpg', keywords: ['cute', 'dog', 'puppy'] },
{ id: 3, url: 'memeImg/3.jpg', keywords: ['sleep', 'cute', 'baby'] },
{ id: 4, url: 'memeImg/4.jpg', keywords: ['sleep', 'cat', 'cute', 'keybord'] },
{ id: 5, url: 'memeImg/5.jpg', keywords: ['baby', 'win'] },
{ id: 6, url: 'memeImg/6.jpg', keywords: ['happy'] },
{ id: 7, url: 'memeImg/7.jpg', keywords: ['happy', 'baby'] },
{ id: 8, url: 'memeImg/8.jpg', keywords: ['happy', 'wonka', 'relaxed'] },
{ id: 9, url: 'memeImg/9.jpg', keywords: ['happy', 'baby'] },
{ id: 10, url: 'memeImg/10.jpg', keywords: ['obama', 'happy'] },
{ id: 11, url: 'memeImg/11.jpg', keywords: ['fight', 'boxing', 'kiss'] },
{ id: 12, url: 'memeImg/12.jpg', keywords: ['happy', 'finger', 'point'] },
{ id: 13, url: 'memeImg/13.jpg', keywords: ['happy', 'leo', 'titanic', 'drink'] },
{ id: 14, url: 'memeImg/14.jpg', keywords: ['morbius', 'matrix'] },
{ id: 15, url: 'memeImg/15.jpg', keywords: ['smoke', 'one'] },
{ id: 16, url: 'memeImg/16.jpg', keywords: ['bald', 'pikard', 'x-men'] },
{ id: 17, url: 'memeImg/17.jpg', keywords: ['finger', 'russia', 'putin'] },
{ id: 18, url: 'memeImg/18.jpg', keywords: ['happy', 'buzz', 'toy story'] }
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
    return (!searchKeyword || searchKeyword === 'all') ? gImgs : gImgs.filter(img => img.keywords.includes(searchKeyword));
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


function setSearched(searchVal) {
    searchKeyword = searchVal;

}