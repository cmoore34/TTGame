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
    debugger;
    this.currentLocation = $('#r' + row + 'c' + col);
    this.downOneRow = $('#r' + (row + 1) + 'c' + col);
    this.upOneRow = $('#r' + (row - 1) + 'c' + col);
    this.leftOneCol = $('#r' + row + 'c' + (col - 1));
    this.rightOneCol = $('#r' + row + 'c' + (col + 1));
    this.downTwoRows = $('#r' + (row + 2) + 'c' + col);
    this.upTwoRows = $('#r' + (row - 2) + 'c' + col);
    this.rightTwoCols = $('#r' + row + 'c' + (col + 2));
    this.leftTwoCols = $('#r' + row + 'c' + (col - 2));
    this.upRightDiag = $('#r' + (row - 1) + 'c' + (col + 1));
    this.upLeftDiag = $('#r' + (row - 1) + 'c' + (col - 1));
    this.downRightDiag = $('#r' + (row + 1) + 'c' + (col + 1));
    this.downLeftDiag = $('#r' + (row + 1) + 'c' + (col - 1));
    this.rightTwoUpOne = $('#r' + (row - 1) + 'c' + (col + 2));
    this.leftTwoUpOne = $('#r' + (row - 1) + 'c' + (col - 2));
    this.rightTwoDownOne = $('#r' + (row + 1) + 'c' + (col + 2));
    this.leftTwoDownOne = $('#r' + (row + 1) + 'c' + (col - 2));
    this.downTwoLeftOne = $('#r' + (row + 2) + 'c' + (col - 1));
    this.downTwoRightOne = $('#r' + (row + 2) + 'c' + (col + 1));
    this.upTwoLeftOne = $('#r' + (row - 2) + 'c' + (col - 1));
    this.upTwoRightOne = $('#r' + (row - 2) + 'c' + (col + 1));
}

function checkBuilding(row, col, firstResource) {
    let nav = new navPatterns(row,col);

    checkTavern(row, col, firstResource, nav);
    checkWell(row,col,firstResource, nav);
    checkCottage(row, col, firstResource, nav);
    checkChapel(row, col, firstResource, nav);
}

function checkWell(row, col, firstResource, nav) {
    var patternMatch = false;

    var downCheckWood = [row <= 2, [nav.downOneRow, "stone"]];
    var upCheckWood = [row >= 2, [nav.upOneRow, "stone"]];
    var leftCheckWood = [col <= 2, [nav.leftOneCol, "stone"]];
    var rightCheckWood = [col >= 2, [nav.rightOneCol, "stone"]];
    var downCheckStone = [row <= 2, [nav.downOneRow, "wood"]];
    var upCheckStone = [row >= 2, [nav.upOneRow, "wood"]];
    var leftCheckStone = [col <= 2, [nav.leftOneCol, "wood"]];
    var rightCheckStone = [col >= 2, [nav.rightOneCol, "wood"]];

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