/*
 * Create a list that holds all of your cards
 */
let cards = ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb', 'fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb'];

const deck	= document.getElementsByClassName('deck')[0];

let clickedCards = [];

let previousCardsClicked = [];
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
 // Sets the position in cards array and card collection to first item
let arrayPosition = 0;

// Shuffles values of cards array
cards = shuffle(cards);

for (i = 1; i <= cards.length; i++) {
	//creates i element
	let cardSuit = document.createElement('i');

	// Adds class names fa and random card class to i element to give it's suit
	cardSuit.classList.add('fa', cards[arrayPosition]);

	// Appends i element with new classes to each card position
	document.getElementsByClassName('card')[arrayPosition].appendChild(cardSuit);

	// Advances position in cards array and card collection
	arrayPosition++;
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
// Adds click event to cards and activates showSuit function
deck.addEventListener('click', showSuit);

// Reveals card
function showSuit(event) {
	let previousCardClicked = event.target;
	let cardClicked = event.target.firstElementChild;
	let x = clickedCards.indexOf(String(cardClicked.classList));
	event.target.classList.add('open', 'show');
	
	// Adds card clicked to a list
	clickedCards.push(String(cardClicked.classList));
	previousCardsClicked.push(previousCardClicked);
	// Checks if there are more than two cards
	if (clickedCards.length >= 2)
		// Checks to see if the card has a matching partner
		if (x != -1) {
			// Changes class of the second selected card to show correct match
			event.target.classList.add('match');
			event.target.classList.remove('open', 'show');

			// Changes the first selected card to show correct match
			previousCardsClicked[0].classList.add('match');
			previousCardsClicked[0].classList.remove('open', 'show');
			console.log("first " + clickedCards.indexOf(String(cardClicked.classList)))
			console.log(x);
			
			// Clears both arrays for next pair of cards that match
			clickedCards.pop();
			clickedCards.pop();
			previousCardsClicked.pop();
			previousCardsClicked.pop();

		} else {
			event.target.classList.remove('open', 'show');
			previousCardsClicked[0].classList.remove('open', 'show');
			console.log(clickedCards.indexOf(String(cardClicked.classList)))
			clickedCards.pop();
			clickedCards.pop();
			previousCardsClicked.pop();
			previousCardsClicked.pop();
		}
}

//TODO: Make statetments call functions and add a timeout so the user can see the cards