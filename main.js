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
    checkTavern(row, col, firstResource);
    checkWell(row,col,firstResource);
    checkCottage(row, col, firstResource);
}

function checkWell(row, col, firstResource)
{
    var patternMatch = false;
    var currentLocation = $('#r' + row + 'c' + col);
    var downOneRow = $('#r' + (row + 1) + 'c' + col);
    var upOneRow = $('#r' + (row - 1) + 'c' + col);
    var leftOneCol = $('#r' + row + 'c' + (col - 1));
    var rightOneCol = $('#r' + row + 'c' + (col + 1));

    var downCheckWood = [row <= 2, [downOneRow, "stone"]];
    var upCheckWood = [row >= 2, [upOneRow, "stone"]];
    var leftCheckWood = [col <= 2, [leftOneCol, "stone"]];
    var rightCheckWood = [col >= 2, [rightOneCol, "stone"]];
    var downCheckStone = [row <= 2, [downOneRow, "wood"]];
    var upCheckStone = [row >= 2, [upOneRow, "wood"]];
    var leftCheckStone = [col <= 2, [leftOneCol, "wood"]];
    var rightCheckStone = [col >= 2, [rightOneCol, "wood"]];

    var checkArray = [];
    if (firstResource === "wood") {
        checkArray = [downCheckWood,upCheckWood,leftCheckWood,rightCheckWood];
    } else if (firstResource === "stone") {
        checkArray = [downCheckStone,upCheckStone,leftCheckStone,rightCheckStone];
    }
    if (checkArray.length > 0) {
        checkArray.forEach(function(checkCmd) {
            //if we do not have a patternMatch, and we are in the row/col bounds,
            //we can check down the grid without exceeding the bounds of the grid
            if (checkCmd[0] && !patternMatch) {
                //if we find the next resource, we can continue checking that direction, otherwise we continue through the algorithm
                if (checkCmd[1][0].data("resource") === checkCmd[1][1]) {
                        currentLocation.addClass("wellFound");
                        checkCmd[1][0].addClass("wellFound");
                        patternMatch = true;
                }
            }
        })
    }
}
function checkTavern(row, col, firstResource) {
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
    
    var downCheckBrick = [row <= 1, [downOneRow, "brick"],
        [downTwoRows, "glass"]
    ];
    var upCheckBrick = [row >= 2, [upOneRow, "brick"],
        [upTwoRows, "glass"]
    ];
    var rightCheckBrick = [col <= 1, [rightOneCol, "brick"],
        [rightTwoCols, "glass"]
    ];
    var leftCheckBrick = [col >= 2, [leftOneCol, "brick"],
        [leftTwoCols, "glass"]
    ];
    var midCheck1 = [col >= 1 && col <= 2, [leftOneCol, "brick"],
        [rightOneCol, "glass"]
    ];
    var midCheck2 = [col >= 1 && col <= 2, [leftOneCol, "glass"],
        [rightOneCol, "brick"]
    ];
    var midCheck3 = [row >= 1 && row <= 2, [upOneRow, "brick"],
        [downOneRow, "glass"]
    ];
    var midCheck4 = [row >= 1 && row <= 2, [upOneRow, "glass"],
        [downOneRow, "brick"]
    ];
    var downCheckGlass = [row <= 1, [downOneRow, "brick"],
        [downTwoRows, "brick"]
    ];
    var upCheckGlass = [row >= 2, [upOneRow, "brick"],
        [upTwoRows, "brick"]
    ];
    var rightCheckGlass = [col <= 1, [rightOneCol, "brick"],
        [rightTwoCols, "brick"]
    ];
    var leftCheckGlass = [col >= 2, [leftOneCol, "brick"],
        [leftTwoCols, "brick"]
    ];

    var checkArray = [];
    if (firstResource === "brick") {
        checkArray = [downCheckBrick, upCheckBrick, rightCheckBrick, leftCheckBrick, midCheck1, midCheck2, midCheck3, midCheck4];
    } else if (firstResource === "glass") {
        checkArray = [downCheckGlass, upCheckGlass, rightCheckGlass, leftCheckGlass];
    }
    if (checkArray.length > 0) {
        checkArray.forEach(function(checkCmd) {
            //if we do not have a patternMatch, and we are in the row/col bounds,
            //we can check down the grid without exceeding the bounds of the grid
            if (checkCmd[0] && !patternMatch) {
                //if we find the next resource, we can continue checking that direction, otherwise we continue through the algorithm
                if (checkCmd[1][0].data("resource") === checkCmd[1][1]) {
                    if (checkCmd[2][0].data("resource") === checkCmd[2][1]) {
                        currentLocation.addClass("tavernFound");
                        checkCmd[1][0].addClass("tavernFound");
                        checkCmd[2][0].addClass("tavernFound");
                        patternMatch = true;
                    }
                }
            }
        })
    }
}
function checkCottage(row, col, firstResource) {
    var patternMatch = false;
    var currentLocation = $('#r' + row + 'c' + col);
    var downOneRow = $('#r' + (row + 1) + 'c' + col);
    var upOneRow = $('#r' + (row - 1) + 'c' + col);
    var rightOneCol = $('#r' + row + 'c' + (col + 1));
    var leftOneCol = $('#r' + row + 'c' + (col - 1));
    var upRightDiag = $('#r' + (row - 1) + 'c' + (col + 1));
    var upLeftDiag = $('#r' + (row - 1) + 'c' + (col - 1));
    var downRightDiag = $('#r' + (row + 1) + 'c' + (col + 1));
    var downLeftDiag = $('#r' + (row + 1) + 'c' + (col - 1));
    
    var checkBrick0 = [col <= 2 && row >=1, [rightOneCol, "glass"],
        [upRightDiag, "wheat"]
    ];
    var checkBrick1 = [col >=1  && row >=1, [leftOneCol, "glass"],
        [upLeftDiag, "wheat"]
    ];
    var checkBrick2 = [col <=2 && row <=2, [rightOneCol, "glass"],
        [downRightDiag, "wheat"]
    ];
    var checkBrick3 = [col >=1 && row<=2, [leftOneCol, "glass"],
        [downLeftDiag, "wheat"]
    ];
    var checkGlass0 = [col <= 2 && row >=1, [upOneRow, "wheat"],
        [leftOneCol, "brick"]
    ];
    var checkGlass1 = [col>=2 && row >=1, [upOneRow, "wheat"],
        [rightOneCol, "brick"]
    ];
    var checkGlass2 = [col >=1 && row<=2, [downOneRow, "wheat"],
        [leftOneCol, "brick"]
    ];
    var checkGlass3 = [col>=2 && row<=2, [downOneRow, "wheat"],
        [rightOneCol, "brick"]
    ];
    var checkWheat0 = [col >=1 && row<=2, [downOneRow, "glass"],
        [downLeftDiag, "brick"]
    ];
    var checkWheat1 = [col>=2 && row<=2, [downOneRow, "glass"],
        [downRightDiag, "brick"]
    ];
    var checkWheat2 = [col <= 2 && row >=1, [upOneRow, "glass"],
        [upLeftDiag, "brick"]
    ];
    var checkWheat3 = [col>=2 && row >=1, [upOneRow, "glass"],
        [upRightDiag, "brick"]
    ];

    var checkArray = [];
    if (firstResource === "brick") {
        checkArray = [checkBrick0,checkBrick1,checkBrick2,checkBrick3];
    } else if (firstResource === "glass") {
        checkArray = [checkGlass0,checkGlass1,checkGlass2,checkGlass3];
    } else if (firstResource === "wheat") {
        checkArray = [checkWheat0,checkWheat1,checkWheat2,checkWheat3];
    }

    if (checkArray.length > 0) {
        checkArray.forEach(function(checkCmd) {
            //if we do not have a patternMatch, and we are in the row/col bounds,
            //we can check down the grid without exceeding the bounds of the grid
            if (checkCmd[0] && !patternMatch) {
                //if we find the next resource, we can continue checking that direction, otherwise we continue through the algorithm
                if (checkCmd[1][0].data("resource") === checkCmd[1][1]) {
                    if (checkCmd[2][0].data("resource") === checkCmd[2][1]) {
                        currentLocation.addClass("cottageFound");
                        checkCmd[1][0].addClass("cottageFound");
                        checkCmd[2][0].addClass("cottageFound");
                        patternMatch = true;
                    }
                }
            }
        })
    }
}
function checkChapel(row, col, firstResource) {
    var patternMatch = false;
    var currentLocation = $('#r' + row + 'c' + col);
    var downOneRow = $('#r' + (row + 1) + 'c' + col);
    var upOneRow = $('#r' + (row - 1) + 'c' + col);
    var rightOneCol = $('#r' + row + 'c' + (col + 1));
    var leftOneCol = $('#r' + row + 'c' + (col - 1));
    var upRightDiag = $('#r' + (row - 1) + 'c' + (col + 1));
    var upLeftDiag = $('#r' + (row - 1) + 'c' + (col - 1));
    var downRightDiag = $('#r' + (row + 1) + 'c' + (col + 1));
    var downLeftDiag = $('#r' + (row + 1) + 'c' + (col - 1));
    
    var checkStone0 = [col <= 2 && row >=1, [rightOneCol, "glass"],
        [upRightDiag, "wheat"]
    ];
    var checkStone1 = [col >=1  && row >=1, [leftOneCol, "glass"],
        [upLeftDiag, "wheat"]
    ];
    var checkStone2 = [col <=2 && row <=2, [rightOneCol, "glass"],
        [downRightDiag, "wheat"]
    ];
    var checkStone3 = [col >=1 && row<=2, [leftOneCol, "glass"],
        [downLeftDiag, "wheat"]
    ];
    var checkGlass0 = [col <= 2 && row >=1, [upOneRow, "wheat"],
        [leftOneCol, "brick"]
    ];
    var checkGlass1 = [col>=2 && row >=1, [upOneRow, "wheat"],
        [rightOneCol, "brick"]
    ];
    var checkGlass2 = [col >=1 && row<=2, [downOneRow, "wheat"],
        [leftOneCol, "brick"]
    ];
    var checkGlass3 = [col>=2 && row<=2, [downOneRow, "wheat"],
        [rightOneCol, "brick"]
    ];

    var checkArray = [];
    if (firstResource === "stone") {
        checkArray = [checkStone0,checkStone1,checkStone2,checkStone3];
    } else if (firstResource === "glass") {
        checkArray = [checkGlass0,checkGlass1,checkGlass2,checkGlass3];
    }

    if (checkArray.length > 0) {
        checkArray.forEach(function(checkCmd) {
            //if we do not have a patternMatch, and we are in the row/col bounds,
            //we can check down the grid without exceeding the bounds of the grid
            if (checkCmd[0] && !patternMatch) {
                //if we find the next resource, we can continue checking that direction, otherwise we continue through the algorithm
                if (checkCmd[1][0].data("resource") === checkCmd[1][1]) {
                    if (checkCmd[2][0].data("resource") === checkCmd[2][1]) {
                        if (checkCmd[3][0].data("resource") === checkCmd[3][1]) {
                            currentLocation.addClass("chapelFound");
                            checkCmd[1][0].addClass("chapelFound");
                            checkCmd[2][0].addClass("chapelFound");
                            checkCmd[3][0].addClass("chapelFound");
                            patternMatch = true;
                        }
                    }
                }
            }
        })
    }
}