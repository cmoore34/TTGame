class Deck {
    constructor() {
        this.deck = ["Wheat", "Wood", "Brick", "Stone", "Glass", "Wheat", "Wood", "Brick", "Stone", "Glass", "Wheat", "Wood", "Brick", "Stone", "Glass"];
        this.hand = [];
        this.played = "";
        this.shuffle();
    }

    shuffle() {
        const { deck } = this;
        let m = deck.length,
            i;

        while (m) {
            i = Math.floor(Math.random() * m--);

            [deck[m], deck[i]] = [deck[i], deck[m]];
        }

        return this;
    }

    deal() {
        return this.hand.push(this.deck.pop());
    }

    play(cardnum) {
        this.played = this.hand.splice(cardnum, 1).toString()
        this.deck.unshift(this.played);
    }
}
const game = new Deck();
$(document).ready(function() {
    for (i = 0; i < 3; i++) {
        game.deal();
        $('#card' + i).addClass(game.hand[i].toString().toLowerCase());
        $('#card' + i).text(game.hand[i].toString());
        $('#card' + i).data("resource", game.hand[i].toString().toLowerCase());
    }
    console.log(game.deck);
    console.log(game.hand);
});

function refillHand() {
    game.deal();
    for (j = 0; j < game.hand.length; j++) {
        $('#card' + j).addClass(game.hand[j].toString().toLowerCase());
        $('#card' + j).text(game.hand[j].toString());
        $('#card' + j).data("resource", game.hand[j].toString().toLowerCase());
    }
}

function checkBuilding(row, col, firstResource) {
    checkFactory(row,col,firstResource);
}


function checkFactory(row,col,firstResource){
    var patternMatch = false;

    if (firstResource === "brick" || firstResource === "glass")
    {
        if(firstResource === "brick") {
            //check verticals
            if(row <= 1 && !patternMatch){
                if($('#r'+(row+1)+'c'+col).data("resource") === "brick"){
                    if($('#r'+(row+2)+'c'+col).data("resource") === "glass"){
                        $('#r'+row+'c'+col).addClass("factory");
                        $('#r'+(row+1)+'c'+col).addClass("factory");
                        $('#r'+(row+2)+'c'+col).addClass("factory");
                        patternMatch=true;
                    }
                }
            }
            if(row >= 2 && !patternMatch){
                if($('#r'+(row-1)+'c'+col).data("resource") === "brick"){
                    if($('#r'+(row-2)+'c'+col).data("resource") === "glass"){
                        $('#r'+row+'c'+col).addClass("factory");
                        $('#r'+(row-1)+'c'+col).addClass("factory");
                        $('#r'+(row-2)+'c'+col).addClass("factory");
                        patternMatch=true;
                    }
                }
            }
            if(col <= 1 && !patternMatch){
                if($('#r'+row+'c'+(col+1)).data("resource") === "brick"){
                    if($('#r'+row+'c'+(col+2)).data("resource") === "glass"){
                        $('#r'+row+'c'+col).addClass("factory");
                        $('#r'+row+'c'+(col+1)).addClass("factory");
                        $('#r'+row+'c'+(col+2)).addClass("factory");
                        patternMatch=true;
                    }
                }
            }
            if(col >= 2 && !patternMatch){
                if($('#r'+row+'c'+(col-1)).data("resource") === "brick"){
                    if($('#r'+row+'c'+(col-2)).data("resource") === "glass"){
                        $('#r'+row+'c'+col).addClass("factory");
                        $('#r'+row+'c'+(col-1)).addClass("factory");
                        $('#r'+row+'c'+(col-2)).addClass("factory");
                        patternMatch=true;
                    }
                }
            }
            //check horizontals
        }
        else{
            //check verticals
            if(row <= 1 && !patternMatch){
                if($('#r'+(row+1)+'c'+col).data("resource") === "brick"){
                    if($('#r'+(row+2)+'c'+col).data("resource") === "brick"){
                        console.log("found it!");
                        patternMatch=true;
                    }
                }
            }
            if(row >= 2 && !patternMatch){
                if($('#r'+(row-1)+'c'+col).data("resource") === "brick"){
                    if($('#r'+(row-2)+'c'+col).data("resource") === "brick"){
                        console.log("found it!");
                        patternMatch=true;
                    }
                }
            }
            if(col <= 1 && !patternMatch){
                if($('#r'+row+'c'+(col+1)).data("resource") === "brick"){
                    if($('#r'+row+'c'+(col+2)).data("resource") === "brick"){
                        console.log("found it!");
                        patternMatch=true;
                    }
                }
            }
            if(col >= 2 && !patternMatch){
                if($('#r'+row+'c'+(col-1)).data("resource") === "brick"){
                    if($('#r'+row+'c'+(col-2)).data("resource") === "brick"){
                        console.log("found it!");
                        patternMatch=true;
                    }
                }
            }
            //check horizontals
        }
    }
}