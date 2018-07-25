# Memory Game

## How The Game Works

The game board consists of sixteen "cards" arranged in a grid. The deck is made up of eight different pairs of cards, each with different symbols on one side. The cards are arranged randomly on the grid with the symbol face down. The gameplay rules are very simple: flip over two hidden cards at a time to locate the ones that match!

Each turn:

The player flips one card over to reveal its underlying symbol.
The player then turns over a second card, trying to find the corresponding card with the same symbol.
If the cards match, both cards stay flipped over.
If the cards do not match, both cards are flipped face down.
The game ends once all cards have been correctly matched.

## Game Functionality

The real-life game, players flip over cards to locate the pairs that match The goal is to recreate this effect in your project. There are a couple of interactions:

A. The flipping cards match
  The matched card will be on locked down position.

B. The flipping cards don't match
  The card will go back to face down position. At this point the memory part of the game will come to picture. The player has to remember the card and their position and try to find a match.
  
C. Game over
  Game will be over when all 8 cards has their match locked down.
  
 ## Rules
 
 Game will be assisted with number of moves taken so far as well as a timer clock to track the time taken to finish the game. Number of stars will be the judge of the performace of memeory. 
 
 ## Dependencies
 
 Following thrid party style sheets has been used to develop Memory Game.
 
 Font Awesome: https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css
 Google Fonts: https://fonts.googleapis.com/css?family=Coda
 Sweet Alert: https://cdn.jsdelivr.net/sweetalert2/3.0.3/sweetalert2.min.css
 Animation: https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.css
 
 
 ## Code
 
 This project includes 3 major files
 
 A. app.js
  
  app.js is responsible for all the functionality of the game. A new game board is generated everytime a game is initiated. Number of moves and a timer is there to help the player track the performance. Sweetalert messages are used to encourage the player at different stages of the game. There is a restart button functionality to start the game over at any point. Animations are used in case of matched cards or no matched cards to make the game more fun to play.
  
  
B. app.css

  app.css is the style sheet of the game.
  
C. index.html

  index.html is the main game page.
  
## Examples

### Match Senario

![image](https://github.com/anamikasharaf/Memory-Game/blob/master/Match.png)


### No Match Senario

![image](https://github.com/anamikasharaf/Memory-Game/blob/master/NoMatch.png)

  
