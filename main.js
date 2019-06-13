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
    refillHand(true);
    console.log(game.deck);
    console.log(game.hand);
});

function refillHand(dealStart) {
    for (i = 0; i < 3; i++) {
        var card = $('#card' + i)
        if ((!dealStart && i === 0) || dealStart) {
            game.deal();
        }
        var handVal = game.hand[i].toString();
        card.addClass(handVal.toLowerCase());
        card.text(handVal);
        card.data("resource", handVal.toLowerCase());
    }
}

function checkBuilding(row, col, firstResource) {
    checkFactory(row, col, firstResource);
}


function checkFactory(row, col, firstResource) {
    var patternMatch = false;
    var currentLocation = $('#r' + row + 'c' + col);
    var downOneRow = $('#r' + (row + 1) + 'c' + col);
    var downTwoRows = $('#r' + (row + 2) + 'c' + col);
    var upOneRow = $('#r' + (row - 1) + 'c' + col);
    var upTwoRows = $('#r' + (row - 2) + 'c' + col);
    var rightOneCol = $('#r' + row + 'c' + (col + 1));
    var rightTwoCols = $('#r' + row + 'c' + (col + 2));
    var leftOneCol = $('#r' + row + 'c' + (col - 1));
    var leftTwoCols = $('#r' + row + 'c' + (col - 2));

    //Check Brick path first
    if (firstResource === "brick") {
        //if we do not have a patternMatch, and we are at Row 0 or 1,
        //we can check down the grid without exceeding the bounds of the grid
        if (row <= 1 && !patternMatch) {
            //if the next resource down is brick, we can continue checking down, otherwise we continue through the algorithm
            if (downOneRow.data("resource") === "brick") {
                //if the next resource down is glass, we know we have a match
                if (downTwoRows.data("resource") === "glass") {
                    currentLocation.addClass("factory");
                    downOneRow.addClass("factory");
                    downTwoRows.addClass("factory");
                    patternMatch = true;
                }
            }
        }
        //if we do not have a patternMatch, and we are at Row 2 or 3,
        //we can check up the grid without exceeding the bounds of the grid
        if (row >= 2 && !patternMatch) {
            //if the next resource up is brick, we can continue checking up, otherwise we continue through the algorithm
            if (upOneRow.data("resource") === "brick") {
                //if the next resource up is glass, we know we have a match
                if (upTwoRows.data("resource") === "glass") {
                    currentLocation.addClass("factory");
                    upOneRow.addClass("factory");
                    upTwoRows.addClass("factory");
                    patternMatch = true;
                }
            }
        }
        //if we do not have a patternMatch, and we are at Col 0 or 1,
        //we can check to the right without exceeding the bounds of the grid
        if (col <= 1 && !patternMatch) {
            //if the next resource to the right brick, we can continue checking to the right, otherwise we continue through the algorithm
            if (rightOneCol.data("resource") === "brick") {
                //if the next resource to the right is glass, we know we have a match
                if (rightTwoCols.data("resource") === "glass") {
                    currentLocation.addClass("factory");
                    rightOneCol.addClass("factory");
                    rightTwoCols.addClass("factory");
                    patternMatch = true;
                }
            }
        }
        //if we do not have a patternMatch, and we are at Col 2 or 3,
        //we can check to the left without exceeding the bounds of the grid
        if (col >= 2 && !patternMatch) {
            //if the next resource to the left is brick, we can continue checking to the left, otherwise we continue through the algorithm
            if (leftOneCol.data("resource") === "brick") {
                //if the next resource to the left is glass, we know we have a match
                if (leftTwoCols.data("resource") === "glass") {
                    currentLocation.addClass("factory");
                    leftOneCol.addClass("factory");
                    leftTwoCols.addClass("factory");
                    patternMatch = true;
                }
            }
        }
    }
    //Check the glass path
    else if (firstResource === "glass") {
        //if we do not have a patternMatch, and we are at Row 0 or 1,
        //we can check down the grid without exceeding the bounds of the grid
        if (row <= 1 && !patternMatch) {
            //if the next resource down is brick, we can continue checking down, otherwise we continue through the algorithm
            if (downOneRow.data("resource") === "brick") {
                if (downTwoRows.data("resource") === "brick") {
                    currentLocation.addClass("factory");
                    downOneRow.addClass("factory");
                    downTwoRows.addClass("factory");
                    patternMatch = true;
                }
            }
        }
        //if we do not have a patternMatch, and we are at Row 2 or 3,
        //we can check up the grid without exceeding the bounds of the grid
        if (row >= 2 && !patternMatch) {
            //if the next resource up is brick, we can continue checking up, otherwise we continue through the algorithm
            if (upOneRow.data("resource") === "brick") {
                if (upTwoRows.data("resource") === "brick") {
                    currentLocation.addClass("factory");
                    upOneRow.addClass("factory");
                    upTwoRows.addClass("factory");
                    patternMatch = true;
                }
            }
        }
        //if we do not have a patternMatch, and we are at Col 0 or 1,
        //we can check to the right without exceeding the bounds of the grid
        if (col <= 1 && !patternMatch) {
            //if the next resource to the right brick, we can continue checking to the right, otherwise we continue through the algorithm
            if (rightOneCol.data("resource") === "brick") {
                if (rightTwoCols.data("resource") === "brick") {
                    currentLocation.addClass("factory");
                    rightOneCol.addClass("factory");
                    rightTwoCols.addClass("factory");
                    patternMatch = true;
                }
            }
        }
        //if we do not have a patternMatch, and we are at Col 2 or 3,
        //we can check to the left without exceeding the bounds of the grid
        if (col >= 2 && !patternMatch) {
            //if the next resource to the left is brick, we can continue checking to the left, otherwise we continue through the algorithm
            if (leftOneCol.data("resource") === "brick") {
                if (leftTwoCols.data("resource") === "brick") {
                    currentLocation.addClass("factory");
                    leftOneCol.addClass("factory");
                    leftTwoCols.addClass("factory");
                    patternMatch = true;
                }
            }
        }
    }
}