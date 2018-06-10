/*
 * Create a list that holds all of your cards
 */
let cards = ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb', 'fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb'];

const deck	= document.getElementsByClassName('deck')[0];

let clickedCards = [];

let previousCardsClicked = [];

let matchedCards = [];

let moves = 0;

const refreshButton = document.getElementsByClassName('fa-repeat')[0];

const starOne = document.getElementsByClassName('fa-star')[0];

const starTwo = document.getElementsByClassName('fa-star')[1];

const starThree = document.getElementsByClassName('fa-star')[2];

let seconds = 0;

const winModal = document.getElementById('winModal');

const winMessage = document.getElementById('winMessage');

let stars = 3;

const playAgainButton = document.getElementsByClassName('playAgainButton')[0];
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

// Adds click event to refresh symbol
refreshButton.addEventListener('click', refresh);

// Adds click event for Play Again? button
playAgainButton.addEventListener('click', refresh);

// Reveals card
function showSuit(event) {
	let previousCardClicked = event.target;
	let cardClicked = event.target.firstElementChild;
	let x = clickedCards.indexOf(String(cardClicked.classList));
	let body = document.getElementsByTagName('body')[0];
	
	body.style.pointerEvents = 'none';

	// Reveals clicked cards
	event.target.classList.add('open', 'show');
	
	// Adds card clicked to a list
	clickedCards.push(String(cardClicked.classList));
	previousCardsClicked.push(previousCardClicked);

	// Checks if there are more than two cards
	if (clickedCards.length >= 2)
		// Checks to see if the card has a matching partner
		if (x != -1) {
			match();
			enableClick();
		} else {
			setTimeout (hideCard, 1000);
			setTimeout (enableClick, 1000);
	} else {
		enableClick();
	}

	addMove();

	checkForWin();

}

function hideCard () {
	// Hides card if not right match
	previousCardsClicked[0].classList.remove('open', 'show');
	previousCardsClicked[1].classList.remove('open', 'show');
	clickedCards.pop();
	clickedCards.pop();
	previousCardsClicked.pop();
	previousCardsClicked.pop();

}

function match () {
	// Changes class of the second selected card to show correct match
	event.target.classList.add('match');
	event.target.classList.remove('open', 'show');

	// Changes the first selected card to show correct match
	previousCardsClicked[0].classList.add('match');
	previousCardsClicked[0].classList.remove('open', 'show');
			
	// Clears both arrays for next pair of cards that match
	clickedCards.pop();
	clickedCards.pop();
	previousCardsClicked.pop();
	previousCardsClicked.pop();

	// Adds matched cards to list to check for win condition
	matchedCards.push(0);
}

function addMove () {
	// Increments move counter
	moves += 1;
	document.getElementsByClassName('moves')[0].textContent = moves;
	if (moves >= 22) {
		// Remove star
		starOne.remove();
		stars = 2;
	} 

	if (moves >= 30) {
		// Remove star
		starTwo.remove();
		stars = 1;
	}

	if (moves >= 38) {
		// Remove star
		starThree.remove();
		stars = 0;
	}
}

function checkForWin () {
	if (matchedCards.length == 8) {
		// Reveals blank background for win message
		winModal.style.display = 'block';
		
		// Writes win message
		winMessage.textContent = 'With ' + moves + ' Moves and ' + stars + ' Stars.';
	}
}

function enableClick () {
	// Enables click after event
	let body = document.getElementsByTagName('body')[0];
	body.style.pointerEvents = 'auto';
}

function refresh () {
	// Reloads the page
	location.reload();
}

setInterval (setTime, 1000);

function setTime () {
	// Increases time
	seconds ++;
}