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
            txt: 'I never eat Falafel',
            size: 20,
            align: 'left',
            color: 'red'
        }
    ]
};


function createMeme(){

    
}

function getImgById(id) {
    return gImgs.find((img) => img.id === id);
}