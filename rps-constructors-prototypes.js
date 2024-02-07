const readline = require("readline-sync");

function Player() {
  this.move = null;
}

function Computer() {
  Player.call(this);
}

Computer.prototype.choose = function() {
  const choices = ["rock", "paper", "scissors"];
  let randomIndex = Math.floor(Math.random() * choices.length);
  this.move = choices[randomIndex];
}

function Human() {
  Player.call(this);
}

Human.prototype.choose = function() {
  let choice;

    while (true) {
      console.log("Please choose rock, paper, or scissors.");
      choice = readline.question();

      if (["rock", "paper", "scissors"].includes(choice)) break;
      console.log("Sorry, that's an invalid choice.");
    }
    
  this.move = choice;
}


function RPSGame() {
  this.human = new Human();
  this.computer = new Computer();
}

RPSGame.prototype = {

  displayWelcomeMessage() {
    console.log("Welcome to Rock, Paper, Scissors!");
  },

  displayWinner() {
    let humanMove = this.human.move;
    let computerMove = this.computer.move;

    console.log(`You chose: ${this.human.move}`);
    console.log(`The computer chose: ${this.computer.move}`);

    if ((humanMove === "rock" && computerMove === "scissors") ||
        (humanMove === "paper" && computerMove === "rock") ||
        (humanMove === "scissors" && computerMove === "paper")) {
      console.log("You win!");
    } else if ((humanMove === "rock" && computerMove === "paper") ||
               (humanMove === "paper" && computerMove === "scissors") ||
               (humanMove === "scissors" && computerMove === "rock")) {
      console.log("The computer wins!");
    } else {
      console.log("It's a tie!");
    }

  },

  displayGoodByeMessage() {
    console.log("Thanks for playing! Arriverderci!")
  },

  playAgain() {
    console.log("Would you like to play again? (y/n)");
    let answer = readline.question();
    return answer.toLowerCase()[0] === `y`;
  },

  play() {
    this.displayWelcomeMessage();

    while (true) {
      this.human.choose();
      this.computer.choose();
      this.displayWinner();
      if (!this.playAgain()) break;
    }

    this.displayGoodByeMessage();
  },

} 

RPSGame.prototype.constructor = RPSGame;

let game = new RPSGame();
game.play();


