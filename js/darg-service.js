'use strict'

var gIsDrag = false;

function isTextClicked(clickedPos) {
    const pos = getLinePos();
    const distance = Math.sqrt((pos.x - clickedPos.x) ** 2 + (pos.y - clickedPos.y) ** 2);
    return distance <= ((getGmemeLineSize()/2) * getGmemeText().length);

}


function setTextDrag(isDrag) {
    gIsDrag = isDrag;
}
function moveText(dx, dy) {
    moveTextX(dx);
    moveTextY(dy);

}

function isDrag(){
    return gIsDrag;
}