const readline = require("readline-sync"); // eslint-disable-line
const VALID_CHOICES = ["rock", "paper", "scissors"];
const SHORT_VALID_CHOICES = ["r", "p", "s"];
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


class Computer extends Player {
  constructor() {
    super();
  }

  choose() {
    //const choices = ["rock", "paper", "scissors"];
    let randomIndex = Math.floor(Math.random() * VALID_CHOICES.length);
    this.move = VALID_CHOICES[randomIndex];
  }
}

class Human extends Player {
  constructor() {
    super();
  }

  choose() {
    console.log(
      `Please choose one of the following options: ${VALID_CHOICES.join(" / ")}`
    );
    let choice = readline.question().toLowerCase();

    while( 
      !VALID_CHOICES.includes(choice) && !SHORT_VALID_CHOICES.includes(choice)
    ) {
      console.log("Oops! That's not a valid choice. Please choose again.")
    }

    if (choice[0] === "r") {
      choice = "rock";
    } else if (choice[0] === "p") {
      choice = "paper";
    } else if (choice[0] === "s") {
      choice = "scissors"
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


