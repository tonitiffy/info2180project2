var emptySquare = {row:4,column:4};

window.onload = function(){
    $("shufflebutton").observe("click", shuffleBoard);
    var alignPuzzlePieces = $$("#puzzlearea div");
    var marL = 0;
    var marT = 0;
    for (var i = 0; i < alignPuzzlePieces.length; i++) {
        alignPuzzlePieces[i].addClassName("puzzlepiece");
        alignPuzzlePieces[i].observe("mouseover",highlightTile);
        alignPuzzlePieces[i].observe("click",movePiece);
        if (marL === 400){
            marL=0;
            marT+=100;
        }
        alignPuzzlePieces[i].style.marginLeft = marL + "px";
        alignPuzzlePieces[i].style.marginTop = marT + "px";
        alignPuzzlePieces[i].style.backgroundPosition = (-marL)+"px "+(-marT)+"px";
        setSquareID(alignPuzzlePieces[i],marT,marL);
        marL+=100;
    }
    //$("shufflebutton").observe("click", shuffleBoard);
};
function setSquareID(el,marginT,marginL){
        var r2, c2;
        switch (marginT){
            case(0):
                r2 = 1;
                break;
            case(100):
                r2 = 2;
                break;
            case(200):
                r2 = 3;
                break;
            case(300):
                r2 = 4;
                break;
            default:
                r2 = 0;
        }
        switch (marginL){
            case(0):
                c2 = 1;
                break;
            case(100):
                c2 = 2;
                break;
            case(200):
                c2 = 3;
                break;
            case(300):
                c2 = 4;
                break;
            default:
                c2 = 0;
        }
    el.setAttribute("id","square_"+r2+"_"+c2);
    el.setAttribute("row", r2);
    el.setAttribute("column", c2);
}


function isMovable(el){
    var neighbour = [];
    neighbour[0]= getDOMElement(emptySquare.row,emptySquare.column-1);
    neighbour[1]= getDOMElement(emptySquare.row,emptySquare.column+1);
    neighbour[2]= getDOMElement(emptySquare.row-1,emptySquare.column);
    neighbour[3]= getDOMElement(emptySquare.row+1,emptySquare.column);
    //alert(neighbour[0]);
    for(var o=0;o<neighbour.length;o++){
        if (neighbour[o]!== null){
            if(el.getAttribute('id')===neighbour[o].getAttribute('id')){
               return true;
            }
        }
    }
    return false;
}
function move(el){
    if (isMovable(el)){
        var neighbours = [];
        neighbours[0]= getDOMElement(emptySquare.row,emptySquare.column-1);
        neighbours[1]= getDOMElement(emptySquare.row,emptySquare.column+1);
        neighbours[2]= getDOMElement(emptySquare.row-1,emptySquare.column);
        neighbours[3]= getDOMElement(emptySquare.row+1,emptySquare.column);
        var marginL1 = (parseInt(el.style.getPropertyValue('margin-left'),10));
        var marginT1 = (parseInt(el.style.getPropertyValue('margin-top'),10));
        
        if (neighbours[0]!==null&&el.getAttribute('id')===neighbours[0].getAttribute('id')){
            el.style.marginLeft = (marginL1+100) + "px";
            emptySquare.column-= 1;
            setSquareID(el,marginT1,marginL1+100);    
        }            
        else if(neighbours[1]!==null&&el.getAttribute('id')===neighbours[1].getAttribute('id')){
            el.style.marginLeft = (marginL1-100) + "px";
            emptySquare.column+=1;
            setSquareID(el,marginT1,marginL1-100);    
        }
        else if(neighbours[2]!==null&&el.getAttribute('id')===neighbours[2].getAttribute('id')){
            el.style.marginTop = (marginT1+100) + "px";
            emptySquare.row-= 1;
            setSquareID(el,marginT1+100,marginL1);    
        }
        else if(neighbours[3]!==null&&el.getAttribute('id')===neighbours[3].getAttribute('id')){   
            el.style.marginTop = (marginT1-100) + "px";
            emptySquare.row+=1;
            setSquareID(el,marginT1-100,marginL1);    
        }
    }
}
function highlightTile(event){
    if(isMovable(this))
        this.addClassName("movablepiece");  
    else
        this.removeClassName("movablepiece");
}
function movePiece(event){
    move(this);    
}
function shuffleBoard(event){
    var neighbourss = [];
    for(var n=0;n<100;n++){ 
        neighbourss[0]= getDOMElement(emptySquare.row,emptySquare.column-1);
        neighbourss[1]= getDOMElement(emptySquare.row,emptySquare.column+1);
        neighbourss[2]= getDOMElement(emptySquare.row-1,emptySquare.column);
        neighbourss[3]= getDOMElement(emptySquare.row+1,emptySquare.column);
        var sqreNum = Math.floor(Math.random() * 4);
        if (neighbourss[sqreNum] !== null){
            move(neighbourss[sqreNum]);
        }
    }
}
function getDOMElement(r,c){
    var elID = "square_"+r+"_"+c;
    return $(elID);
}
