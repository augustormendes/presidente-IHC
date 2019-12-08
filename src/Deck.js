 const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
const suits = ['SPADES', 'HEARTS', 'DIAMONDS', 'CLUBS'];

export const rankOrder = ['3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A', '2']

export const getRank = (cardRank) => rankOrder.indexOf(`${cardRank}`)

export const newDeck = function() {

    // deck = [{rank: 'JOKER', suit: 'JOKER'}, {rank: 'JOKER', suit: 'JOKER'}];
    let deck = []
	let teste 
	suits.forEach(function(suit,index) {
		ranks.forEach(function(rank,index) {
			teste = {rank:rank,suit:suit}
			deck.push(teste);

		});
	});
	

	return deck;
}

export const orderFunc = (hand) =>{
	let ordering = {}
	for(var i=0;i<rankOrder.length;i++)
		ordering[rankOrder[i]] = i;

		hand.sort( function(a, b) {
			return (ordering[a.type] - ordering[b.type]) || a.name.localeCompare(b.name);
		});

};



export const shuffle = function(deck, repeat) {

	repeat = (repeat === undefined) ? 1 : repeat;

	for (var i = 0; i < repeat; i++) {

		// Implement the Fisher-Yates Shuffle
		var currentIndex = deck.length, temporaryValue, randomIndex;

		// While there remains elements to shuffle...
		while (0 !== currentIndex) {

			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			// And swap it with the current element.
			temporaryValue = deck[currentIndex];
			deck[currentIndex] = deck[randomIndex];
			deck[randomIndex] = temporaryValue;

		}

	}

	return deck;

};