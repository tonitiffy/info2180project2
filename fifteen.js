var  alignPuzzlePieces = $$("#puzzlearea div");
var emptySquare = {row:4,column:4};

$("shufflebutton").observe("click", shuffleBoard);
Element.prototype.setSquareID = function (marginT,marginL){
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
    this.setAttribute("id","square_"+r2+"_"+c2);
    this.setAttribute("row", r2);
    this.setAttribute("column", c2);
};
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
    alignPuzzlePieces[i].setSquareID(marT,marL);
    marL+=100;
}

Element.prototype.isMovable = function(){
    var neighbour = [];
    neighbour[0]= getDOMElement(emptySquare.row,emptySquare.column-1);
    neighbour[1]= getDOMElement(emptySquare.row,emptySquare.column+1);
    neighbour[2]= getDOMElement(emptySquare.row-1,emptySquare.column);
    neighbour[3]= getDOMElement(emptySquare.row+1,emptySquare.column);
    //alert(neighbour[0]);
    for(var o=0;o<neighbour.length;o++){
        if (neighbour[o]!== null){
            if(this.getAttribute('id')===neighbour[o].getAttribute('id')){
               return true;
            }
        }
    }
    return false;
};
Element.prototype.move = function(){
    if (this.isMovable()){
        var neighbours = [];
        neighbours[0]= getDOMElement(emptySquare.row,emptySquare.column-1);
        neighbours[1]= getDOMElement(emptySquare.row,emptySquare.column+1);
        neighbours[2]= getDOMElement(emptySquare.row-1,emptySquare.column);
        neighbours[3]= getDOMElement(emptySquare.row+1,emptySquare.column);
        var marginL1 = (parseInt(this.style.getPropertyValue('margin-left'),10));
        var marginT1 = (parseInt(this.style.getPropertyValue('margin-top'),10));
        
        if (neighbours[0]!==null&&this.getAttribute('id')===neighbours[0].getAttribute('id')){
            this.style.marginLeft = (marginL1+100) + "px";
            emptySquare.column-= 1;
            this.setSquareID(marginT1,marginL1+100);    
        }            
        else if(neighbours[1]!==null&&this.getAttribute('id')===neighbours[1].getAttribute('id')){
            this.style.marginLeft = (marginL1-100) + "px";
            emptySquare.column+=1;
            this.setSquareID(marginT1,marginL1-100);    
        }
        else if(neighbours[2]!==null&&this.getAttribute('id')===neighbours[2].getAttribute('id')){
            this.style.marginTop = (marginT1+100) + "px";
            emptySquare.row-= 1;
            this.setSquareID(marginT1+100,marginL1);    
        }
        else if(neighbours[3]!==null&&this.getAttribute('id')===neighbours[3].getAttribute('id')){   
            this.style.marginTop = marginT1-100 + "px";
            emptySquare.row+=1;
            this.setSquareID(marginT1-100,marginL1);    
        }
    }
};
function highlightTile(event){
    if(this.isMovable())
        this.addClassName("movablepiece");  
    else
        this.removeClassName("movablepiece");
}
function movePiece(event){
    this.move();    
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
            neighbourss[sqreNum].move();
        }
    }
}
function getDOMElement(r,c){
    var elID = "square_"+r+"_"+c;
    return $(elID);
}
