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
    $('.card').each(function(i) {
        for (j = 0; j < game.hand.length; j++) {
            if ($(this).data("resource") !== game.hand[j].toString().toLowerCase() && parseInt(this.id.substr(this.id.length - 1)) === j) {
                $('#card' + i).addClass(game.hand[j].toString().toLowerCase());
                $('#card' + i).text(game.hand[j].toString());
                $('#card' + i).data("resource", game.hand[j].toString().toLowerCase());
            }
        }
    })
}