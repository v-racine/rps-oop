const readline = require("readline-sync"); // eslint-disable-line

const MESSAGES = {
  userWinsRound: "You win this round!",
  compWinsRound: "I win this round!",
  tieMsg: "It's a tie!",
  userWinsGame: "You win the game!",
  compWinsGame: "I win the game!",
};


class Player {
  constructor() {
    this.move = null; 
  }
}


class Computer {
  constructor() {
    this.computer = new Player();
  }

  choose() {
    const choices = ["rock", "paper", "scissors"];
    let randomIndex = Math.floor(Math.random() * choices.length);
    this.move = choices[randomIndex];
  }
}

class Human {
  constructor() {
    this.human = new Player();
  }

  choose() {
    let choice;

    while (!["rock", "paper", "scissors"].includes(choice)) { 
      console.log("Please choose rock, paper, or scissors.");
      choice = readline.question();

      if (!["rock", "paper", "scissors"].includes(choice)) {
        console.log("Sorry, that's an invalid choice.");
      }
    }
    
    this.move = choice;
  }
}

class RPSGame {
  constructor() {
    this.human = new Human();
    this.computer = new Computer();
    this.numOfGamesPlayed = 0;
  }

  displayWelcomeMessage() {
    console.log("Welcome to Rock, Paper, Scissors!");
  }

  determineWinner() {
    let humanChoice = this.human.move;
    let computerChoice = this.computer.move;
    
    const gameResults = {
      rock: {
        rock: MESSAGES.tieMsg,
        paper: MESSAGES.compWinsRound,
        scissors: MESSAGES.userWinsRound,
      },
      paper: {
        rock: MESSAGES.userWinsRound,
        paper: MESSAGES.tieMsg,
        scissors: MESSAGES.compWinsRound,
      },
      scissors: {
        rock: MESSAGES.compWinsRound,
        paper: MESSAGES.userWinsRound,
        scissors: MESSAGES.tieMsg,
      },
    };
    return gameResults[humanChoice][computerChoice];
  }

  displayWinner() {
    console.log(`You chose: ${this.human.move}`);
    console.log(`The computer chose: ${this.computer.move}`);

    console.log(this.determineWinner());
  }

  displayGoodByeMessage() {
    console.log("Thanks for playing! Arriverderci!")
  }

  playAgain() {
    if (this.numOfGamesPlayed === 0) {
      return true;
    } 

    console.log("Would you like to play again? (y/n)");
    let answer = readline.question();
    return answer.toLowerCase()[0] === `y`;
  }

  play() {
    this.displayWelcomeMessage();

    while (this.playAgain()) { 
      this.human.choose();
      this.computer.choose();
      this.displayWinner();

      this.numOfGamesPlayed += 1;
    }

    this.displayGoodByeMessage();
  }
}

let game = new RPSGame();
game.play();


