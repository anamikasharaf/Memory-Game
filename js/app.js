
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
  // setting star
  let stars = document.querySelector('.stars');
  // setting the number of moves
  let move = 0;
  // creating an array for matched cards
  let matchedCard = [];

  // setting rating stars
  let star1 = document.createElement('i');
  stars.appendChild(star1);

  let star2 = document.createElement('i');
  stars.appendChild(star2);

  let star3 = document.createElement('i');
  stars.appendChild(star3);

  let set=0;

  // setting up timer variables
  let time = 0;
  let timer = document.querySelector('.timer');


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

  // setting timer function
  function setTimeout(){
    if (!time)
    {
      time = setInterval(function(){

        if (status === gameStatus.PLAYING) {
          timer.innerText = `${time} secs`;
          time++;
        }
      },1000);
    }
  }

  // resetting all variable function
  function resetEverything()
  {
    if(time)
    {
      clearInterval(time);
      time = 0;
      set = 0;
      status = gameStatus.NOTPLAYING;
      timer.innerText = time;
      move = 0;
      matchedCard = [];
    }
  }

  // looping through each card and creating it's HTML tag
  function generateBoard(array) {

    // shuffling the array first
    let shuffledArray = shuffle(array);

    // setting the rating stars
    star1.classList.add('fa','fa-star');
    star2.classList.add('fa','fa-star');
    star3.classList.add('fa','fa-star');

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
    console.log("before eventlistener");
    addCardEventListener();
    resetEverything();
    setTimeout();
  }

     // adding rating to the game
     function setRating(move) {
       console.log("congratulation checks");
      if (move <= 24 && move >= 12)
       {
         star3.classList.remove('fa','fa-star');
       }
       else if (move >= 24)
       {
         star2.classList.remove('fa','fa-star');
       }
     }

     // Congratulations popups
     function congratulationPopus()
     {
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
         let content = `You took ${move} and ${time} to finish the game. Do you wanna play again?`;
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
              generateBoard(array);
            }
          })
       }
     }

   //display the card's symbol
   function displayCard(evt) {

     console.log("inside displayCard");

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
          openCard[0].classList.add('match','animated', 'infinite', 'rotateIn');
          openCard[0].classList.remove('animated', 'infinite', 'rotateIn');
          openCard[1].classList.remove('open', 'show');
          openCard[1].classList.add('match','animated', 'infinite', 'rotateIn');
          openCard[1].classList.remove('animated', 'infinite', 'rotateIn');
          matchedCard.push(openCard.pop());
          matchedCard.push(openCard.pop());
        }
        else {
          console.log("there is no match, card is open again");
          // if cards dont match, then 'open', 'show' class name is removed
          // and both cards are popped out
          openCard[0].classList.add('animated', 'infinite', 'shake');
          openCard[0].classList.remove('open', 'show','animated', 'infinite', 'shake' );
          openCard[1].classList.add('animated', 'infinite', 'shake');
          openCard[1].classList.remove('open', 'show', 'animated', 'infinite', 'shake');
          openCard.pop();
          openCard.pop();
        }
        // incrementing the move
        move += 1;
        // changing the move on the screen
        document.getElementsByClassName('moves')[0].textContent = move;
      }
      setRating(move);
      congratulationPopus();
   }

   // adding event listener to the board
   let addCardEventListener = function () {
     console.log("inside addCardEventListener");
     const $cards = document.querySelectorAll('.deck>.card');
     [...$cards].forEach($card => $card.addEventListener('click', displayCard));
   };

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


   // adding intro to the game
   function intro() {
     console.log("in intro");
     swal({
        title: "Are you ready for this game?",
        text: "16 boxes and 8 pairs! you look at a card once and try to find a match!",
        type: "info",
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Yes, let's start!",
        closeOnConfirm: false
      }).then(function (isConfirm) {
        if (isConfirm) {
          generateBoard(array);
        }
      })
   };

   // calling intro() function to start the game
    intro();
    // generateBoard(array);
