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
    checkChapel(row, col, firstResource);
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
    var downTwoRows = $('#r' + (row + 2) + 'c' + col);
    var upOneRow = $('#r' + (row - 1) + 'c' + col);
    var upTwoRows = $('#r' + (row - 2) + 'c' + col);
    var rightOneCol = $('#r' + row + 'c' + (col + 1));
    var rightTwoCols = $('#r' + row + 'c' + (col + 2));
    var leftOneCol = $('#r' + row + 'c' + (col - 1));
    var leftTwoCols = $('#r' + row + 'c' + (col - 2));
    var rightTwoUpOne = $('#r' + (row - 1) + 'c' + (col + 2));
    var leftTwoUpOne = $('#r' + (row - 1) + 'c' + (col - 2));
    var rightTwoDownOne = $('#r' + (row + 1) + 'c' + (col + 2));
    var leftTwoDownOne = $('#r' + (row + 1) + 'c' + (col - 2));
    var downTwoLeftOne = $('#r' + (row + 2) + 'c' + (col - 1));
    var downTwoRightOne = $('#r' + (row + 2) + 'c' + (col + 1));
    var upTwoLeftOne = $('#r' + (row - 2) + 'c' + (col - 1));
    var upTwoRightOne = $('#r' + (row - 2) + 'c' + (col + 1));
    var upRightDiag = $('#r' + (row - 1) + 'c' + (col + 1));
    var upLeftDiag = $('#r' + (row - 1) + 'c' + (col - 1));
    var downRightDiag = $('#r' + (row + 1) + 'c' + (col + 1));
    var downLeftDiag = $('#r' + (row + 1) + 'c' + (col - 1));
    
    var checkStone0 = [col <= 1 && row >=1, [rightOneCol, "glass"],
        [rightTwoCols, "stone"],[rightTwoUpOne, "glass"] //Pattern1
    ];
    var checkStone1 = [col >= 2 && row >=1, [upOneRow, "glass"],
    [leftOneCol, "glass"],[leftTwoCols, "stone"]//Pattern1
    ];
    var checkStone2 = [col >=2 && row >=1, [leftOneCol, "glass"],
    [leftTwoCols, "stone"],[leftTwoUpOne, "glass"]//Pattern2
    ];
    var checkStone3 = [col >=1 && row<=2, [upOneRow, "glass"],
    [rightOneCol, "glass"],[rightTwoCols, "stone"]//Pattern2
    ];
    var checkStone4 = [col <= 1 && row <=2, [rightOneCol, "glass"],
    [rightTwoCols, "stone"],[rightTwoDownOne, "glass"] //Pattern3
    ];
    var checkStone5 = [col>=2 && row <=2, [downOneRow, "glass"],
    [leftOneCol, "glass"],[leftTwoCols, "stone"]//Pattern3
    ];
    var checkStone6 = [col >=2 && row>=2, [leftOneCol, "glass"],
    [leftTwoCols, "stone"],[leftTwoDownOne, "glass"]//Pattern4
    ];
    var checkStone7 = [col<=1 && row<=2, [downOneRow, "glass"],
    [rightOneCol, "glass"],[rightTwoCols, "stone"]//Pattern4
    ];
    var checkStone8 = [col>=1 && row<=1, [downOneRow, "glass"],
    [downTwoRows, "glass"],[downTwoLeftOne, "stone"]//Pattern5
    ];
    var checkStone9 = [col>=1 && row>=2, [upOneRow, "glass"],
    [upTwoRows, "stone"],[leftOneCol, "glass"]//Pattern5
    ];
    var checkStone10 = [col<=2 && row<=1, [downOneRow, "glass"],
    [downTwoRows, "stone"],[downTwoRightOne, "stone"]//Pattern6
    ];
    var checkStone11 = [col<=2 && row>=2, [upOneRow, "glass"],
    [upTwoRows, "stone"],[rightOneCol, "glass"]//Pattern6
    ];
    var checkStone12 = [col>=1 && row<=1, [downOneRow, "glass"],
    [downTwoRows, "stone"],[leftOneCol, "glass"]//Pattern7
    ];
    var checkStone13 = [col>=1 && row>=2, [upOneRow, "glass"],
    [upTwoRows, "stone"],[upTwoLeftOne, "glass"]//Pattern7
    ];
    var checkStone14 = [col<=2 && row<=1, [downOneRow, "glass"],
    [downTwoRows, "stone"],[rightOneCol, "glass"]//Pattern8
    ];
    var checkStone15 = [col<=2 && row>=2, [upOneRow, "glass"],
    [upTwoRows, "stone"],[upTwoRightOne, "glass"]//Pattern8
    ];
    var checkGlass0 = [col>=2 && row<=2, [downOneRow, "stone"],
    [downLeftDiag, "glass"],[downOneLeftTwo, "stone"]//Pattern1
    ];
    var checkGlass1 = [col>=1 && col<=2 && row>=1, [leftOneCol, "stone"],
    [rightOneCol, "stone"],[upRightDiag, "glass"]//Pattern1
    ];
    var checkGlass2 = [, [downOneRow, "stone"],
    [downRightDiag, "glass"],[downOneRightTwo, "stone"]//Pattern2
    ];
    var checkGlass3 = [, [leftOneCol, "stone"],
    [rightOneCol, "stone"],[upLeftDiag, "glass"]//Pattern2
    ];
    var checkGlass4 = [, [upOneRow, "stone"],
    [upLeftDiag, "glass"],[upOneLeftTwo, "stone"]//Pattern3
    ];
    var checkGlass5 = [, [leftOneCol, "stone"],
    [rightOneCol, "stone"],[downRightDiag, "glass"]//Pattern3
    ];
    var checkGlass6 = [, [upOneRow, "stone"],
    [upRightDiag, "glass"],[upOneRightTwo, "stone"]//Pattern4
    ];
    var checkGlass7 = [, [leftOneCol, "stone"],
    [rightOneCol, "stone"],[downLeftDiag, "glass"]//Pattern4
    ];
    var checkGlass8 = [, [rightOneCol, "stone"],
    [upRightDiag, "glass"],[upTwoRightOne, "stone"]//Pattern5
    ];
    var checkGlass9 = [, [upOneRow, "stone"],
    [downOneRow, "stone"],[downLeftDiag, "glass"]//Pattern5
    ];
    var checkGlass10 = [, [leftOneCol, "stone"],
    [upLeftDiag, "glass"],[upTwoLeftOne, "stone"]//Pattern6
    ];
    var checkGlass11 = [, [upOneRow, "stone"],
    [downOneRow, "stone"],[downRightDiag, "glass"]//Pattern6
    ];
    var checkGlass12 = [, [rightOneCol, "stone"],
    [downRightDiag, "glass"],[downTwoRightOne, "stone"]//Pattern7
    ];
    var checkGlass13 = [, [upOneRow, "stone"],
    [downOneRow, "stone"],[upLeftDiag, "glass"]//Pattern7
    ];
    var checkGlass14 = [, [leftOneCol, "stone"],
    [downLeftDiag, "glass"],[downTwoLeftOne, "stone"]//Pattern8
    ];
    var checkGlass15 = [, [upOneRow, "stone"],
    [downOneRow, "stone"],[upRightDiag, "glass"]//Pattern8
    ];

    var checkArray = [];
    if (firstResource === "stone") {
        checkArray = [checkStone0,checkStone1,checkStone2,checkStone3,checkStone4,checkStone5,checkStone6,checkStone7,checkStone8,checkStone9,checkStone10,checkStone11,checkStone12,checkStone13,checkStone14,checkStone15];
    } else if (firstResource === "glass") {
        checkArray = [checkGlass0,checkGlass1,checkGlass2,checkGlass3,checkGlass4,checkGlass5,checkGlass6,checkGlass7,checkGlass8,checkGlass9,checkGlass10,checkGlass11,checkGlass12,checkGlass13,checkGlass14,checkGlass15];
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