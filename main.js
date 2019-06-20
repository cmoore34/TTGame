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
function navPatterns(row,col) {
    this.currentLocation = $('#r' + row + 'c' + col);
    this.downOneRow = $('#r' + (row + 1) + 'c' + col);
    this.downTwoRows = $('#r' + (row + 2) + 'c' + col);
    this.downThreeRows = $('#r' + (row + 3) + 'c' + col);
    this.upOneRow = $('#r' + (row - 1) + 'c' + col);
    this.upTwoRows = $('#r' + (row - 2) + 'c' + col);
    this.upThreeRows = $('#r' + (row - 3) + 'c' + col);
    this.leftOneCol = $('#r' + row + 'c' + (col - 1));
    this.leftTwoCols = $('#r' + row + 'c' + (col - 2));
    this.leftThreeCols = $('#r' + row + 'c' + (col - 3));
    this.rightOneCol = $('#r' + row + 'c' + (col + 1));
    this.rightTwoCols = $('#r' + row + 'c' + (col + 2));
    this.rightThreeCols = $('#r' + row + 'c' + (col + 2));
    this.upRightDiag = $('#r' + (row - 1) + 'c' + (col + 1));
    this.upLeftDiag = $('#r' + (row - 1) + 'c' + (col - 1));
    this.downRightDiag = $('#r' + (row + 1) + 'c' + (col + 1));
    this.downLeftDiag = $('#r' + (row + 1) + 'c' + (col - 1));
    this.rightTwoUpOne = $('#r' + (row - 1) + 'c' + (col + 2));
    this.rightThreeUpOne = $('#r' + (row - 1) + 'c' + (col + 3));
    this.leftTwoUpOne = $('#r' + (row - 1) + 'c' + (col - 2));
    this.leftThreeUpOne = $('#r' + (row - 1) + 'c' + (col - 3));
    this.rightTwoDownOne = $('#r' + (row + 1) + 'c' + (col + 2));
    this.rightThreeDownOne = $('#r' + (row + 1) + 'c' + (col + 3));
    this.leftTwoDownOne = $('#r' + (row + 1) + 'c' + (col - 2));
    this.leftThreeDownOne = $('#r' + (row + 1) + 'c' + (col - 3));
    this.downTwoLeftOne = $('#r' + (row + 2) + 'c' + (col - 1));
    this.downThreeLeftOne = $('#r' + (row + 3) + 'c' + (col - 1));
    this.downTwoRightOne = $('#r' + (row + 2) + 'c' + (col + 1));
    this.downThreeRightOne = $('#r' + (row + 3) + 'c' + (col + 1));
    this.upTwoLeftOne = $('#r' + (row - 2) + 'c' + (col - 1));
    this.upThreeLeftOne = $('#r' + (row - 3) + 'c' + (col - 1));
    this.upTwoRightOne = $('#r' + (row - 2) + 'c' + (col + 1));
    this.upThreeRightOne = $('#r' + (row - 3) + 'c' + (col + 1));
}
function checkBuilding(row, col, firstResource) {
    let nav = new navPatterns(row,col);

    checkTavern(row, col, firstResource, nav);
    checkWell(row, col, firstResource, nav);
    checkCottage(row, col, firstResource, nav);
    checkChapel(row, col, firstResource, nav);
    checkTheatre(row, col, firstResource, nav);
    checkFarm(row, col, firstResource, nav);
    checkFactory(row, col, firstResource, nav);
}

function checkWell(row, col, firstResource, nav) {
    var patternMatch = false;

    var downCheckWood = [row <= 2, [nav.downOneRow, "stone"]];
    var upCheckWood = [row >= 1, [nav.upOneRow, "stone"]];
    var leftCheckWood = [col >= 1, [nav.leftOneCol, "stone"]];
    var rightCheckWood = [col <= 2, [nav.rightOneCol, "stone"]];
    var downCheckStone = [row <= 2, [nav.downOneRow, "wood"]];
    var upCheckStone = [row >= 1, [nav.upOneRow, "wood"]];
    var leftCheckStone = [col >= 1, [nav.leftOneCol, "wood"]];
    var rightCheckStone = [col <= 2, [nav.rightOneCol, "wood"]];

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
                    nav.currentLocation.addClass("wellFound");
                    checkCmd[1][0].addClass("wellFound");
                    patternMatch = true;
                }
            }
        })
    }
}
function checkTavern(row, col, firstResource, nav) {
    var patternMatch = false;
    
    var downCheckBrick = [row <= 1, [nav.downOneRow, "brick"],
        [nav.downTwoRows, "glass"]
    ];
    var upCheckBrick = [row >= 2, [nav.upOneRow, "brick"],
        [nav.upTwoRows, "glass"]
    ];
    var rightCheckBrick = [col <= 1, [nav.rightOneCol, "brick"],
        [nav.rightTwoCols, "glass"]
    ];
    var leftCheckBrick = [col >= 2, [nav.leftOneCol, "brick"],
        [nav.leftTwoCols, "glass"]
    ];
    var midCheck1 = [col >= 1 && col <= 2, [nav.leftOneCol, "brick"],
        [nav.rightOneCol, "glass"]
    ];
    var midCheck2 = [col >= 1 && col <= 2, [nav.leftOneCol, "glass"],
        [nav.rightOneCol, "brick"]
    ];
    var midCheck3 = [row >= 1 && row <= 2, [nav.upOneRow, "brick"],
        [nav.downOneRow, "glass"]
    ];
    var midCheck4 = [row >= 1 && row <= 2, [nav.upOneRow, "glass"],
        [nav.downOneRow, "brick"]
    ];
    var downCheckGlass = [row <= 1, [nav.downOneRow, "brick"],
        [nav.downTwoRows, "brick"]
    ];
    var upCheckGlass = [row >= 2, [nav.upOneRow, "brick"],
        [nav.upTwoRows, "brick"]
    ];
    var rightCheckGlass = [col <= 1, [nav.rightOneCol, "brick"],
        [nav.rightTwoCols, "brick"]
    ];
    var leftCheckGlass = [col >= 2, [nav.leftOneCol, "brick"],
        [nav.leftTwoCols, "brick"]
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
                        nav.currentLocation.addClass("tavernFound");
                        checkCmd[1][0].addClass("tavernFound");
                        checkCmd[2][0].addClass("tavernFound");
                        patternMatch = true;
                    }
                }
            }
        })
    }
}
function checkCottage(row, col, firstResource, nav) {
    var patternMatch = false;
    
    var checkBrick0 = [col <= 2 && row >=1, [nav.rightOneCol, "glass"],
        [nav.upRightDiag, "wheat"]
    ];
    var checkBrick1 = [col >=1  && row >=1, [nav.leftOneCol, "glass"],
        [nav.upLeftDiag, "wheat"]
    ];
    var checkBrick2 = [col <=2 && row <=2, [nav.rightOneCol, "glass"],
        [nav.downRightDiag, "wheat"]
    ];
    var checkBrick3 = [col >=1 && row<=2, [nav.leftOneCol, "glass"],
        [nav.downLeftDiag, "wheat"]
    ];
    var checkGlass0 = [col <= 2 && row >=1, [nav.upOneRow, "wheat"],
        [nav.leftOneCol, "brick"]
    ];
    var checkGlass1 = [col>=2 && row >=1, [nav.upOneRow, "wheat"],
        [nav.rightOneCol, "brick"]
    ];
    var checkGlass2 = [col >=1 && row<=2, [nav.downOneRow, "wheat"],
        [nav.leftOneCol, "brick"]
    ];
    var checkGlass3 = [col>=2 && row<=2, [nav.downOneRow, "wheat"],
        [nav.rightOneCol, "brick"]
    ];
    var checkWheat0 = [col >=1 && row<=2, [nav.downOneRow, "glass"],
        [nav.downLeftDiag, "brick"]
    ];
    var checkWheat1 = [col>=2 && row<=2, [nav.downOneRow, "glass"],
        [nav.downRightDiag, "brick"]
    ];
    var checkWheat2 = [col <= 2 && row >=1, [nav.upOneRow, "glass"],
        [nav.upLeftDiag, "brick"]
    ];
    var checkWheat3 = [col>=2 && row >=1, [nav.upOneRow, "glass"],
        [nav.upRightDiag, "brick"]
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
                        nav.currentLocation.addClass("cottageFound");
                        checkCmd[1][0].addClass("cottageFound");
                        checkCmd[2][0].addClass("cottageFound");
                        patternMatch = true;
                    }
                }
            }
        })
    }
}
function checkChapel(row, col, firstResource, nav) {
    var patternMatch = false;
    
    var checkStone0 = [col <= 1 && row >=1, [nav.rightOneCol, "glass"],
        [nav.rightTwoCols, "stone"],[nav.rightTwoUpOne, "glass"] //Pattern1
    ];
    var checkStone1 = [col >= 2 && row >=1, [nav.upOneRow, "glass"],
    [nav.leftOneCol, "glass"],[nav.leftTwoCols, "stone"]//Pattern1
    ];
    var checkStone2 = [col >=2 && row >=1, [nav.leftOneCol, "glass"],
    [nav.leftTwoCols, "stone"],[nav.leftTwoUpOne, "glass"]//Pattern2
    ];
    var checkStone3 = [col >=1 && row<=2, [nav.upOneRow, "glass"],
    [nav.rightOneCol, "glass"],[nav.rightTwoCols, "stone"]//Pattern2
    ];
    var checkStone4 = [col <= 1 && row <=2, [nav.rightOneCol, "glass"],
    [nav.rightTwoCols, "stone"],[nav.rightTwoDownOne, "glass"] //Pattern3
    ];
    var checkStone5 = [col>=2 && row <=2, [nav.downOneRow, "glass"],
    [nav.leftOneCol, "glass"],[nav.leftTwoCols, "stone"]//Pattern3
    ];
    var checkStone6 = [col >=2 && row>=2, [nav.leftOneCol, "glass"],
    [nav.leftTwoCols, "stone"],[nav.leftTwoDownOne, "glass"]//Pattern4
    ];
    var checkStone7 = [col<=1 && row<=2, [nav.downOneRow, "glass"],
    [nav.rightOneCol, "glass"],[nav.rightTwoCols, "stone"]//Pattern4
    ];
    var checkStone8 = [col>=1 && row<=1, [nav.downOneRow, "glass"],
    [nav.downTwoRows, "stone"],[nav.downTwoLeftOne, "glass"]//Pattern5
    ];
    var checkStone9 = [col>=1 && row>=2, [nav.upOneRow, "glass"],
    [nav.upTwoRows, "stone"],[nav.leftOneCol, "glass"]//Pattern5
    ];
    var checkStone10 = [col<=2 && row<=1, [nav.downOneRow, "glass"],
    [nav.downTwoRows, "stone"],[nav.downTwoRightOne, "glass"]//Pattern6
    ];
    var checkStone11 = [col<=2 && row>=2, [nav.upOneRow, "glass"],
    [nav.upTwoRows, "stone"],[nav.rightOneCol, "glass"]//Pattern6
    ];
    var checkStone12 = [col>=1 && row<=1, [nav.downOneRow, "glass"],
    [nav.downTwoRows, "stone"],[nav.leftOneCol, "glass"]//Pattern7
    ];
    var checkStone13 = [col>=1 && row>=2, [nav.upOneRow, "glass"],
    [nav.upTwoRows, "stone"],[nav.upTwoLeftOne, "glass"]//Pattern7
    ];
    var checkStone14 = [col<=2 && row<=1, [nav.downOneRow, "glass"],
    [nav.downTwoRows, "stone"],[nav.rightOneCol, "glass"]//Pattern8
    ];
    var checkStone15 = [col<=2 && row>=2, [nav.upOneRow, "glass"],
    [nav.upTwoRows, "stone"],[nav.upTwoRightOne, "glass"]//Pattern8
    ];
    var checkGlass0 = [col>=2 && row<=2, [nav.downOneRow, "stone"],
    [nav.downLeftDiag, "glass"],[nav.leftTwoDownOne, "stone"]//Pattern1
    ];
    var checkGlass1 = [col>=1 && col<=2 && row>=1, [nav.leftOneCol, "stone"],
    [nav.rightOneCol, "stone"],[nav.upRightDiag, "glass"]//Pattern1
    ];
    var checkGlass2 = [col<=1 && row>=1, [nav.downOneRow, "stone"],
    [nav.downRightDiag, "glass"],[nav.rightTwoDownOne, "stone"]//Pattern2
    ];
    var checkGlass3 = [col>=1 && col<=2 && row>=1, [nav.leftOneCol, "stone"],
    [nav.rightOneCol, "stone"],[nav.upLeftDiag, "glass"]//Pattern2
    ];
    var checkGlass4 = [col>=2 && row>=1, [nav.upOneRow, "stone"],
    [nav.upLeftDiag, "glass"],[nav.leftTwoUpOne, "stone"]//Pattern3
    ];
    var checkGlass5 = [col>=1 && col<=2 && row<=2, [nav.leftOneCol, "stone"],
    [nav.rightOneCol, "stone"],[nav.downRightDiag, "glass"]//Pattern3
    ];
    var checkGlass6 = [col<=1 && row>=1, [nav.upOneRow, "stone"],
    [nav.upRightDiag, "glass"],[nav.rightTwoUpOne, "stone"]//Pattern4
    ];
    var checkGlass7 = [col>=1 && col<=2 && row<=2, [nav.leftOneCol, "stone"],
    [nav.rightOneCol, "stone"],[nav.downLeftDiag, "glass"]//Pattern4
    ];
    var checkGlass8 = [col <= 2 && row >= 2, [nav.rightOneCol, "stone"],
    [nav.upRightDiag, "glass"],[nav.upTwoRightOne, "stone"]//Pattern5
    ];
    var checkGlass9 = [col>=1 && row>=1 && row<=2, [nav.upOneRow, "stone"],
    [nav.downOneRow, "stone"],[nav.downLeftDiag, "glass"]//Pattern5
    ];
    var checkGlass10 = [col >= 1 && row >= 2, [nav.leftOneCol, "stone"],
    [nav.upLeftDiag, "glass"],[nav.upTwoLeftOne, "stone"]//Pattern6
    ];
    var checkGlass11 = [col<=2 && row>=1 && row<=2, [nav.upOneRow, "stone"],
    [nav.downOneRow, "stone"],[nav.downRightDiag, "glass"]//Pattern6
    ];
    var checkGlass12 = [col <= 2 && row <= 1, [nav.rightOneCol, "stone"],
    [nav.downRightDiag, "glass"],[nav.downTwoRightOne, "stone"]//Pattern7
    ];
    var checkGlass13 = [col>=1 && row>=1 && row<=2, [nav.upOneRow, "stone"],
    [nav.downOneRow, "stone"],[nav.upLeftDiag, "glass"]//Pattern7
    ];
    var checkGlass14 = [col >= 1 && row <= 1, [nav.leftOneCol, "stone"],
    [nav.downLeftDiag, "glass"],[nav.downTwoLeftOne, "stone"]//Pattern8
    ];
    var checkGlass15 = [col<=2 && row>=1 && row<=2, [nav.upOneRow, "stone"],
    [nav.downOneRow, "stone"],[nav.upRightDiag, "glass"]//Pattern8
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
                            nav.currentLocation.addClass("chapelFound");
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
function checkTheatre(row, col, firstResource, nav){
    var patternMatch = false;

    var checkWood0 = [col <= 1 && row >=1, [nav.rightOneCol, "glass"],
    [nav.upRightDiag, "stone"],[nav.rightTwoCols, "wood"] //Pattern1
    ];
    var checkWood1 = [col >= 2 && row >=1, [nav.leftOneCol, "glass"],
    [nav.upLeftDiag, "stone"],[nav.leftTwoCols, "wood"]//Pattern1
    ];
    var checkWood2 = [col <=1 && row <=2, [nav.rightOneCol, "glass"],
    [nav.downRightDiag, "stone"],[nav.rightTwoCols, "wood"]//Pattern2
    ];
    var checkWood3 = [col >=2 && row<=2, [nav.leftOneCol, "glass"],
    [nav.downLeftDiag, "stone"],[nav.leftTwoCols, "wood"]//Pattern2
    ];
    var checkWood4 = [col >= 1 && row <=1, [nav.downOneRow, "glass"],
    [nav.downLeftDiag, "stone"],[nav.downTwoRows, "wood"] //Pattern3
    ];
    var checkWood5 = [col>=1 && row >=2, [nav.upOneRow, "glass"],
    [nav.upLeftDiag, "stone"],[nav.upTwoRows, "wood"]//Pattern3
    ];
    var checkWood6 = [col <=2 && row<=1, [nav.downOneRow, "glass"],
    [nav.downRightDiag, "stone"],[nav.downTwoRows, "wood"]//Pattern4
    ];
    var checkWood7 = [col<=2 && row>=2, [nav.upOneRow, "glass"],
    [nav.upRightDiag, "stone"],[nav.upTwoRows, "wood"]//Pattern4
    ];
    var checkGlass0 = [col>=1 && col<=2 && row >= 1, [nav.leftOneCol, "wood"],
    [nav.rightOneCol, "wood"],[nav.upOneRow, "stone"] //Pattern1
    ];
    var checkGlass1 = [col>=1 && col<=2 && row <= 2, [nav.leftOneCol, "wood"],
    [nav.rightOneCol, "wood"],[nav.downOneRow, "stone"]//Pattern2
    ];
    var checkGlass2 = [col>=1 && row>=1 && row <= 2, [nav.upOneRow, "wood"],
    [nav.downOneRow, "wood"],[nav.leftOneCol, "stone"]//Pattern3
    ];
    var checkGlass3 = [col<=2 && row>=1 && row <= 2, [nav.upOneRow, "wood"],
    [nav.downOneRow, "wood"],[nav.rightOneCol, "stone"]//Pattern4
    ];
    var checkStone0 = [col>=1 && col<=2 && row <= 2, [nav.downOneRow, "glass"],
    [nav.downLeftDiag, "wood"],[nav.downRightDiag, "wood"] //Pattern1
    ];
    var checkStone1 = [col>=1 && col<=2 && row >= 1, [nav.upOneRow, "glass"],
    [nav.upLeftDiag, "wood"],[nav.upRightDiag, "wood"]//Pattern2
    ];
    var checkStone2 = [col<=2 && row>=1 && row <= 2, [nav.rightOneCol, "glass"],
    [nav.upRightDiag, "wood"],[nav.downRightDiag, "wood"]//Pattern3
    ];
    var checkStone3 = [col>=1 && row>=1 && row <= 2, [nav.leftOneCol, "glass"],
    [nav.upLeftDiag, "wood"],[nav.downLeftDiag, "wood"]//Pattern4
    ];

    var checkArray = [];
    if (firstResource === "wood") {
        checkArray = [checkWood0,checkWood1,checkWood2,checkWood3,checkWood4,checkWood5,checkWood6,checkWood7];
    } else if (firstResource === "glass") {
        checkArray = [checkGlass0,checkGlass1,checkGlass2,checkGlass3];
    } else if (firstResource === "stone") {
        checkArray = [checkStone0,checkStone1,checkStone2,checkStone3];
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
                            nav.currentLocation.addClass("theaterFound");
                            checkCmd[1][0].addClass("theaterFound");
                            checkCmd[2][0].addClass("theaterFound");
                            checkCmd[3][0].addClass("theaterFound");
                            patternMatch = true;
                        }
                    }
                }
            }
        })
    }
}
function checkFarm(row, col, firstResource, nav){
    var patternMatch = false;

    var checkWheat0 = [col <= 2 && row <=2, [nav.rightOneCol, "wheat"],
    [nav.downOneRow, "wood"],[nav.downRightDiag, "wood"] //Pattern1
    ];
    var checkWheat1 = [col >= 1 && row <=2, [nav.leftOneCol, "wheat"],
    [nav.downOneRow, "wood"],[nav.downLeftDiag, "wood"] //Pattern1
    ];
    var checkWheat2 = [col >= 1 && row <=2, [nav.downOneRow, "wheat"],
    [nav.leftOneCol, "wood"],[nav.downLeftDiag, "wood"] //Pattern2
    ];
    var checkWheat3 = [col >= 1 && row >=1, [nav.upOneRow, "wheat"],
    [nav.leftOneCol, "wood"],[nav.upLeftDiag, "wood"] //Pattern2
    ];
    var checkWheat4 = [col >= 1 && row >=1, [nav.leftOneCol, "wheat"],
    [nav.upOneRow, "wood"],[nav.upLeftDiag, "wood"] //Pattern3
    ];
    var checkWheat5 = [col <= 2 && row >=1, [nav.rightOneCol, "wheat"],
    [nav.upOneRow, "wood"],[nav.upRightDiag, "wood"] //Pattern3
    ];
    var checkWheat6 = [col <= 2 && row <=2, [nav.downOneRow, "wheat"],
    [nav.rightOneCol, "wood"],[nav.downRightDiag, "wood"] //Pattern4
    ];
    var checkWheat7 = [col >= 1 && row >=1, [nav.upOneRow, "wheat"],
    [nav.rightOneCol, "wood"],[nav.upRightDiag, "wood"] //Pattern4
    ];
    var checkWood0 = [col <= 2 && row <=2, [nav.rightOneCol, "wood"],
    [nav.downOneRow, "wheat"],[nav.downRightDiag, "wheat"] //Pattern1
    ];
    var checkWood1 = [col >= 1 && row <=2, [nav.leftOneCol, "wood"],
    [nav.downOneRow, "wheat"],[nav.downLeftDiag, "wheat"] //Pattern1
    ];
    var checkWood2 = [col >= 1 && row <=2, [nav.downOneRow, "wood"],
    [nav.leftOneCol, "wheat"],[nav.downLeftDiag, "wheat"] //Pattern2
    ];
    var checkWood3 = [col >= 1 && row >=1, [nav.upOneRow, "wood"],
    [nav.leftOneCol, "wheat"],[nav.upLeftDiag, "wheat"] //Pattern2
    ];
    var checkWood4 = [col >= 1 && row >=1, [nav.leftOneCol, "wood"],
    [nav.upOneRow, "wheat"],[nav.upLeftDiag, "wheat"] //Pattern3
    ];
    var checkWood5 = [col <= 2 && row >=1, [nav.rightOneCol, "wood"],
    [nav.upOneRow, "wheat"],[nav.upRightDiag, "wheat"] //Pattern3
    ];
    var checkWood6 = [col <= 2 && row <=2, [nav.downOneRow, "wood"],
    [nav.rightOneCol, "wheat"],[nav.downRightDiag, "wheat"] //Pattern4
    ];
    var checkWood7 = [col >= 1 && row >=1, [nav.upOneRow, "wood"],
    [nav.rightOneCol, "wheat"],[nav.upRightDiag, "wheat"] //Pattern4
    ];

    var checkArray = [];
    if (firstResource === "wheat") {
        checkArray = [checkWheat0,checkWheat1,checkWheat2,checkWheat3,checkWheat4,checkWheat5,checkWheat6,checkWheat7];
    } else if (firstResource === "wood") {
        checkArray = [checkWood0,checkWood1,checkWood2,checkWood3,checkWood4,checkWood5,checkWood6,checkWood7];
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
                            nav.currentLocation.addClass("farmFound");
                            checkCmd[1][0].addClass("farmFound");
                            checkCmd[2][0].addClass("farmFound");
                            checkCmd[3][0].addClass("farmFound");
                            patternMatch = true;
                        }
                    }
                }
            }
        })
    }
}
function checkFactory(row, col, firstResource, nav){
    var patternMatch = false;

    var checkWood0 = [col == 0 && row <=2, [nav.downOneRow, "brick"],
    [nav.downRightDiag, "stone"],[nav.rightTwoDownOne, "stone"],[nav.rightThreeDownOne, "brick"] //Pattern1
    ];
    var checkWood1 = [col == 0 && row >=1, [nav.upOneRow, "brick"],
    [nav.upRightDiag, "stone"],[nav.rightTwoUpOne, "stone"],[nav.rightThreeUpOne, "brick"] //Pattern2
    ];
    var checkWood2 = [col == 3 && row <=2, [nav.downOneRow, "brick"],
    [nav.downLeftDiag, "stone"],[nav.leftTwoDownOne, "stone"],[nav.leftThreeDownOne, "brick"] //Pattern3
    ];
    var checkWood3 = [col == 3 && row >=1, [nav.upOneRow, "brick"],
    [nav.upLeftDiag, "stone"],[nav.leftTwoUpOne, "stone"],[nav.leftThreeUpOne, "brick"] //Pattern4
    ];
    var checkWood4 = [col <= 2 && row == 0, [nav.rightOneCol, "brick"],
    [nav.downRightDiag, "stone"],[nav.downTwoRightOne, "stone"],[nav.downThreeRightOne, "brick"] //Pattern5
    ];
    var checkWood5 = [col >= 1 && row == 0, [nav.leftOneCol, "brick"],
    [nav.downLeftDiag, "stone"],[nav.downTwoLeftOne, "stone"],[nav.downThreeLeftOne, "brick"] //Pattern6
    ];
    var checkWood6 = [col <= 2 && row == 3, [nav.rightOneCol, "brick"],
    [nav.upRightDiag, "stone"],[nav.upTwoRightOne, "stone"],[nav.upThreeRightOne, "brick"] //Pattern7
    ];
    var checkWood7 = [col >= 1 && row == 3, [nav.leftOneCol, "brick"],
    [nav.upLeftDiag, "stone"],[nav.upTwoLeftOne, "stone"],[nav.upThreeLeftOne, "brick"] //Pattern8
    ];
    var checkStone0 = [col == 1 && row >=1, [nav.leftOneCol, "brick"],
    [nav.upLeftDiag, "wood"],[nav.rightOneCol, "stone"],[nav.rightTwoCols, "brick"] //Pattern1
    ];
    var checkStone1 = [col == 2 && row >=1, [nav.rightOneCol, "brick"],
    [nav.leftOneCol, "stone"],[nav.leftTwoCols, "brick"],[nav.leftTwoUpOne, "wood"] //Pattern1
    ];
    var checkStone2 = [col == 1 && row <=2, [nav.leftOneCol, "brick"],
    [nav.downLeftDiag, "wood"],[nav.rightOneCol, "stone"],[nav.rightTwoCols, "brick"] //Pattern2
    ];
    var checkStone3 = [col == 2 && row <=2, [nav.rightOneCol, "brick"],
    [nav.leftOneCol, "stone"],[nav.leftTwoCols, "brick"],[nav.leftTwoDownOne, "wood"] //Pattern2
    ];
    var checkStone4 = [col == 1 && row >= 1, [nav.leftOneCol, "brick"],
    [nav.rightOneCol, "stone"],[nav.rightTwoCols, "brick"],[nav.rightTwoUpOne, "wood"] //Pattern3
    ];
    var checkStone5 = [col == 2 && row >= 1, [nav.rightOneCol, "brick"],
    [nav.upRightDiag, "wood"],[nav.leftOneCol, "stone"],[nav.leftTwoCols, "brick"] //Pattern3
    ];
    var checkStone6 = [col == 1 && row <= 2, [nav.leftOneCol, "brick"],
    [nav.rightOneCol, "stone"],[nav.rightTwoCols, "brick"],[nav.rightTwoDownOne, "wood"] //Pattern4
    ];
    var checkStone7 = [col == 2 && row <= 2, [nav.rightOneCol, "brick"],
    [nav.downRightDiag, "wood"],[nav.leftOneCol, "stone"],[nav.leftTwoCols, "brick"] //Pattern4
    ];
    var checkStone8 = [col >= 1 && row ==1, [nav.upOneRow, "brick"],
    [nav.upLeftDiag, "wood"],[nav.downOneRow, "stone"],[nav.downTwoRows, "brick"] //Pattern5
    ];
    var checkStone9 = [col >= 1 && row ==2, [nav.upOneRow, "stone"],
    [nav.upTwoRows, "brick"],[nav.upTwoLeftOne, "wood"],[nav.downOneRow, "brick"] //Pattern5
    ];
    var checkStone10 = [col <= 2 && row ==2, [nav.downOneRow, "brick"],
    [nav.downLeftDiag, "wood"],[nav.leftTwoDownOne, "stone"],[nav.leftThreeDownOne, "brick"] //Pattern6
    ];
    var checkStone11 = [col <= 2 && row == 1, [nav.upOneRow, "stone"],
    [nav.upTwoRows, "brick"],[nav.upTwoRightOne, "wood"],[nav.downOneRow, "brick"] //Pattern6
    ];
    var checkStone12 = [col >= 1 && row == 2, [nav.downOneRow, "brick"],
    [nav.downLeftDiag, "wood"],[nav.upOneRow, "stone"],[nav.upTwoRows, "brick"] //Pattern7
    ];
    var checkStone13 = [col >= 1 && row == 1, [nav.upOneRow, "brick"],
    [nav.downOneRow, "stone"],[nav.downTwoRows, "brick"],[nav.downTwoLeftOne, "wood"] //Pattern7
    ];
    var checkStone14 = [col <= 2 && row == 2, [nav.downOneRow, "brick"],
    [nav.downRightDiag, "wood"],[nav.upOneRow, "stone"],[nav.upTwoRows, "brick"] //Pattern8
    ];
    var checkStone15 = [col <= 2 && row == 1, [nav.upOneRow, "brick"],
    [nav.downOneRow, "stone"],[nav.downTwoRows, "brick"],[nav.downTwoRightOne, "wood"] //Pattern8
    ];
    var checkBrick0 = [col == 0 && row >=1, [nav.upOneRow, "wood"],
    [nav.rightOneCol, "stone"],[nav.rightTwoCols, "stone"],[nav.rightThreeCols, "brick"] //Pattern1
    ];
    var checkBrick1 = [col == 3 && row >=1, [nav.leftOneCol, "stone"],
    [nav.leftTwoCols, "stone"],[nav.leftThreeCols, "brick"],[nav.leftThreeUpOne, "wood"] //Pattern1
    ];
    var checkBrick2 = [col == 0 && row <=2, [nav.downOneRow, "wood"],
    [nav.rightOneCol, "stone"],[nav.rightTwoCols, "stone"],[nav.rightThreeCols, "brick"] //Pattern2
    ];
    var checkBrick3 = [col == 3 && row <=2, [nav.leftOneCol, "stone"],
    [nav.leftTwoCols, "stone"],[nav.leftThreeCols, "brick"],[nav.leftThreeDownOne, "wood"] //Pattern2
    ];
    var checkBrick4 = [col == 3 && row >= 1, [nav.upOneRow, "wood"],
    [nav.leftOneCol, "stone"],[nav.leftTwoCols, "stone"],[nav.leftThreeCols, "brick"] //Pattern3
    ];
    var checkBrick5 = [col == 0 && row >= 1, [nav.rightOneCol, "stone"],
    [nav.rightTwoCols, "stone"],[nav.rightThreeCols, "brick"],[nav.rightThreeUpOne, "wood"] //Pattern3
    ];
    var checkBrick6 = [col == 3 && row <= 2, [nav.downOneRow, "wood"],
    [nav.leftOneCol, "stone"],[nav.leftTwoCols, "stone"],[nav.leftThreeCols, "brick"] //Pattern4
    ];
    var checkBrick7 = [col == 0 && row <= 2, [nav.rightOneCol, "stone"],
    [nav.rightTwoCols, "stone"],[nav.rightThreeCols, "brick"],[nav.rightThreeDownOne, "wood"] //Pattern4
    ];
    var checkBrick8 = [col >= 1 && row ==0, [nav.leftOneCol, "wood"],
    [nav.downOneRow, "stone"],[nav.downTwoRows, "stone"],[nav.downThreeRows, "brick"] //Pattern5
    ];
    var checkBrick9 = [col >= 1 && row ==3, [nav.upOneRow, "stone"],
    [nav.upTwoRows, "stone"],[nav.upThreeRows, "brick"],[nav.upThreeLeftOne, "wood"] //Pattern5
    ];
    var checkBrick10 = [col <=2 && row ==0, [nav.rightOneCol, "wood"],
    [nav.downOneRow, "stone"],[nav.downTwoRows, "stone"],[nav.downThreeRows, "brick"] //Pattern6
    ];
    var checkBrick11 = [col <= 2 && row ==3, [nav.upOneRow, "stone"],
    [nav.upTwoRows, "stone"],[nav.upThreeRows, "brick"],[nav.upThreeRightOne, "wood"] //Pattern6
    ];
    var checkBrick12 = [col >= 1 && row == 3, [nav.leftOneCol, "wood"],
    [nav.upOneRow, "stone"],[nav.upTwoRows, "stone"],[nav.upThreeRows, "brick"] //Pattern7
    ];
    var checkBrick13 = [col >= 1 && row == 0, [nav.downOneRow, "stone"],
    [nav.downTwoRows, "stone"],[nav.downThreeRows, "brick"],[nav.downThreeLeftOne, "wood"] //Pattern7
    ];
    var checkBrick14 = [col <= 2 && row == 3, [nav.rightOneCol, "wood"],
    [nav.upOneRow, "stone"],[nav.upTwoRows, "stone"],[nav.upThreeRows, "brick"] //Pattern8
    ];
    var checkBrick15 = [col <= 2 && row == 0, [nav.downOneRow, "stone"],
    [nav.downTwoRows, "stone"],[nav.downThreeRows, "brick"],[nav.downThreeRightOne, "wood"] //Pattern8
    ];

    var checkArray = [];
    if (firstResource === "wood") {
        checkArray = [checkWood0,checkWood1,checkWood2,checkWood3,checkWood4,checkWood5,checkWood6,checkWood7];
    } else if (firstResource === "brick") {
        checkArray = [checkBrick0,checkBrick1,checkBrick2,checkBrick3,checkBrick4,checkBrick5,checkBrick6,checkBrick7,checkBrick8,checkBrick9,checkBrick10,checkBrick11,checkBrick12,checkBrick13,checkBrick14,checkBrick15];
    } else if (firstResource === "stone") {
        checkArray = [checkStone0,checkStone1,checkStone2,checkStone3,checkStone4,checkStone5,checkStone6,checkStone7,checkStone8,checkStone9,checkStone10,checkStone11,checkStone12,checkStone13,checkStone14,checkStone15];
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
                            if (checkCmd[4][0].data("resource") === checkCmd[4][1]) {
                                nav.currentLocation.addClass("factoryFound");
                                checkCmd[1][0].addClass("factoryFound");
                                checkCmd[2][0].addClass("factoryFound");
                                checkCmd[3][0].addClass("factoryFound");
                                checkCmd[4][0].addClass("factoryFound");
                                patternMatch = true;
                            }
                        }
                    }
                }
            }
        })
    }
}