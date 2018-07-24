
  let arrayOfCards = ["fa-diamond","fa-paper-plane-o","fa-anchor","fa-bolt","fa-cube","fa-anchor","fa-leaf","fa-bicycle","fa-diamond","fa-bomb","fa-leaf","fa-bomb","fa-bolt","fa-bicycle","fa-paper-plane-o","fa-cube"];
  let openCards = [];

  const gameStatus = { PLAYING: 1, NOTPLAYING: 2 };
  let currentStatus = gameStatus.NOTPLAYING;

  let deck = document.getElementsByClassName('deck');
  let restart = document.querySelector('.restart');
  let stars = document.querySelector('.stars');

  let move = 0;
  let matchedCard = [];


  let firstStar = document.createElement('i');
  stars.appendChild(firstStar);
  let secondStar = document.createElement('i');
  stars.appendChild(secondStar);
  let thirdStar = document.createElement('i');
  stars.appendChild(thirdStar);

  let set=0;

  let time = 0;
  let timer = document.querySelector('.timer');


  // shuffle function
  function shuffle(arrayOfCards) {
      var currentIndex = arrayOfCards.length, temporaryValue, randomIndex;

      while (currentIndex !== 0) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
          temporaryValue = arrayOfCards[currentIndex];
          arrayOfCards[currentIndex] = arrayOfCards[randomIndex];
          arrayOfCards[randomIndex] = temporaryValue;
      }

      return arrayOfCards;
  }

  // setting timer function
  function initialiTimer(){
    if (!time)
    {
      time = setInterval(function(){

        if (currentStatus === gameStatus.PLAYING) {
          timer.innerText = `${time} secs`;
          time++;
        }
      },1000);
    }
  }

  // adding rating to the game
  function setRating(move) {
    if (move <= 24 && move >= 12)
    {
     thirdStar.classList.remove('fa','fa-star');
    }
    else if (move >= 24)
    {
     secondStar.classList.remove('fa','fa-star');
    }
  }

  // adding event listener to the board
  const CardEventListener = function () {
    const cards = document.querySelectorAll('.deck>.card');
    [...cards].forEach(card =>
      card.addEventListener('click', displayCard));
  };

  // congratulations popups
  function congratulationPopus() {
    if (matchedCard.length === 8 && set===0)
      {
        set = 1;
        swal({
          title: "Good job!",
          text: "You are doing well!",
          icon: "success",
        });
      }
    else if (matchedCard.length === 12 && set===1)
      {
         set = 2;
         swal({
           title: "Exellent job!",
           text: "You are almost there!",
           icon: "success",
         });
       }
       else if (matchedCard.length === 16)
       {
         let content = `You took ${move} moves and ${time} secs to finish the game. Do you wanna play again?`;
         swal({
            title: "Game Over! Congratulations :)",
            text: content,
            type: "warning",
            showCancelButton: true,
            confirmButtonClass: "btn-danger",
            confirmButtonText: "Yes, Please!",
            closeOnConfirm: false
          }).then(function (isConfirm) {
            if (isConfirm) {
              resetEverything()
              generateBoard(arrayOfCards);
            }
          })
       }
  }

  //display the card's symbol
  function displayCard(evt) {

    // checking for gameStatus and changing it to playing
    if (currentStatus === gameStatus.NOTPLAYING) {
       currentStatus = gameStatus.PLAYING;
    }

    // checking for card class, it should either match
    const card = evt.currentTarget;

    if ( card.classList.contains('show') || card.classList.contains('match') ) {
     return true;
    }

    // when card is clicked the class changes to "card open show"
    card.classList.add('open', 'show');

    // add it to the stack of open cards
    openCards.push(card);

    // checking for a match
    if (openCards.length > 1) {
      if (card.innerHTML === openCards[0].innerHTML) {
         console.log("cards hava matched");
         // if it's a match, both cards in the stack will change their class name from 'open', 'show' to 'match'
         // the both cards are popped out of openCard array and pushed in matchedCard array
         openCards[0].classList.add( "match", "animated", "infinite", "rotateIn" );
         openCards[1].classList.add( "match", "animated", "infinite", "rotateIn" );

         matchedCard.push(openCards.pop());
         matchedCard.push(openCards.pop());

         setTimeout(function() {
           const currentMatched = deck[0].querySelectorAll( ".match" );
           currentMatched.forEach( card => card.classList.remove( "open", "show", "infinite", "animated", "rotateIn" ) );
         }, 500);
     }
     else {
         console.log("there is no match, card is open again");
         // if cards dont match, then 'open', 'show' class name is removed
         // and both cards are popped out
         openCards[0].classList.add( "notmatch", "animated", "infinite", "shake" );
         openCards[1].classList.add( "notmatch", "animated", "infinite", "shake" );

         setTimeout(function() {
           const currentSelected = deck[0].querySelectorAll( ".notmatch" );
           currentSelected.forEach( card => card.classList.remove( "notmatch", "infinite", "animated", "rotateIn" ) );
         }, 500);

         openCards[0].classList.remove('open', 'show');
         openCards[1].classList.remove('open', 'show');
         openCards.pop();
         openCards.pop();
     }

       move += 1;
       document.getElementsByClassName('moves')[0].textContent = move;
   }
     setRating(move);
     congratulationPopus();
  }

  // resetting all variable function
  function resetEverything()
  {
    if(time)
    {
      clearInterval(time);
      time = null;
      timer.innerText = `0 secs`;
      set = 0;
      currentStatus = gameStatus.NOTPLAYING;
      move = 0;
      document.getElementsByClassName('moves')[0].textContent = move;
      matchedCard = [];
    }
  }

  // looping through each card and creating it's HTML tag
  function generateBoard(arrayOfCards) {

    // clear the board
    deck[0].innerHTML = "";

    // shuffling the array first
    let shuffledArray = shuffle(arrayOfCards);

    // setting the rating stars
    firstStar.classList.add('fa','fa-star');
    secondStar.classList.add('fa','fa-star');
    thirdStar.classList.add('fa','fa-star');

    // looping through the array, creating it's HTML and adding each card's HTML to page
    for (let i=0; i<16; i++)
    {
      // creating li tag
      let liElement = document.createElement('li');
      liElement.classList.add("card");

      // creating i tag
      let iElement = document.createElement('i');
      iElement.classList.add('fa', shuffledArray[i]);
      liElement.appendChild(iElement);

      deck[0].appendChild(liElement);
    }

    CardEventListener();
    initialiTimer();
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
          resetEverything()
          generateBoard(arrayOfCards);
        }
      })
   });

    // calling generatBoard to begin the game
    generateBoard(arrayOfCards);
