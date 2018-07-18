   /*
   * Create a list that holds all of your cards
   */

   // creating an array of strings that hold all the card names
  let array = ["fa-diamond","fa-paper-plane-o","fa-anchor","fa-bolt","fa-cube","fa-anchor","fa-leaf","fa-bicycle","fa-diamond","fa-bomb","fa-leaf","fa-bomb","fa-bolt","fa-bicycle","fa-paper-plane-o","fa-cube"];
  // array to save all the open card
  let openCard = [];

  // storing status of the game in an object
  const gameStatus = { PLAYING: 1, NOTPLAYING: 2 };
  // Initializing the status to not NOTPLAYING
  let status = gameStatus.NOTPLAYING;
  // accessing list with classname deck
  let listElement = document.getElementsByClassName('deck');
  // accessing restart
  let restart = document.querySelector('.restart');
  // setting the number of moves
  let move = 0;
  // creating an array for matched cards
  let matchedCard = [];


  /*
   * Display the cards on the page
   *   - shuffle the list of cards using the provided "shuffle" method below
   *   - loop through each card and create its HTML
   *   - add each card's HTML to the page
   */

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

  // looping through each card and creating it's HTML tag
  function generateBoard(array) {

    // shuffling the array first
    let shuffledArray = shuffle(array);

    // looping through the array, creating it's HTML and adding each card's HTML to page
    for (let i=0; i<16; i++)
    {
      // creating li tag
      let liElement = document.createElement('li');
      // adding class name to liElement
      liElement.classList.add("card");
      // creating i tag
      let iElement = document.createElement('i');
      // adding class name to iElement
      iElement.classList.add('fa', shuffledArray[i]);
      // appending iElement to liElement
      liElement.appendChild(iElement);
      // appending iElement to the list
      listElement[0].appendChild(liElement);
    }

    addCardEventListener();
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

   //display the card's symbol
   function displayCard(evt) {

     // checking for gameStatus and changing it to playing
      if (status === gameStatus.NOTPLAYING) {
        status = gameStatus.PLAYING;
      }

      // checking for card class, it should either match
      let card = evt.currentTarget;

      // when card is clicked the class changes to "card open show"
      card.classList.add('open', 'show');

      // add it to the stack of open cards
      openCard.push(card);

      // checking for a match
      if (openCard.length > 1) {
        if (card.innerHTML === openCard[0].innerHTML) {
          console.log("cards hava matched");
          // if it's a match, both cards in the stack will change their class name from 'open', 'show' to 'match'
          // the both cards are popped out of openCard array and pushed in matchedCard array
          openCard[0].classList.remove('open', 'show');
          openCard[0].classList.add('match');
          openCard[1].classList.remove('open', 'show');
          openCard[1].classList.add('match');
          matchedCard.push(openCard.pop());
          matchedCard.push(openCard.pop());
        }
        else {
          console.log("there is no match, card is open again");
          // if cards dont match, then 'open', 'show' class name is removed
          // and both cards are popped out
          openCard[0].classList.remove('open', 'show');
          openCard[1].classList.remove('open', 'show');
          openCard.pop();
          openCard.pop();
        }
        // incrementing the move
        move += 1;
        // changing the move on the screen
        document.getElementsByClassName('moves')[0].textContent = move;
      }
      if (matchedCard.length === 16)
      {
        alert(`your score is ${move}`);
      }


   }

   // adding event listener to the board
   let addCardEventListener = function () {
     const $cards = document.querySelectorAll('.deck>.card');
     [...$cards].forEach($card => $card.addEventListener('click', displayCard));
   };

   // adding rating to the game
   function setRating(move) {

   }

   // reset button eventhandler
   restart.addEventListener('click', function(){
     swal({
        title: "Are you sure?",
        text: "You will not be able to recover this game!",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Yes, restart it!",
        cancelButtonText: "No, cancel!",
        closeOnConfirm: false,
        closeOnCancel: false
      }).then(function (isConfirm) {
        if (isConfirm) {
          generateBoard(array);
        }
      })
   });


   // calling generateBoard(array) function to start the game
   generateBoard(array);
