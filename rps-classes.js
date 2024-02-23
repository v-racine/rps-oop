const readline = require("readline-sync"); // eslint-disable-line

const VALID_CHOICES = ["rock", "paper", "scissors"];
const SHORT_VALID_CHOICES = ["r", "p", "s"];
const HUMAN = "HUMAN";
const COMPUTER = "COMPUTER";
const TIE = "TIE";
const ROUND = {
  HUMAN: "You win this round!",
  COMPUTER: "I win this round!",
  TIE: "It's a tie!"
};
const GAME = {
  HUMAN: "You win the game!",
  COMPUTER: "I win the game!"
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

class Scoreboard {
  constructor() {
    this.humanScore = 0;
    this.compScore = 0;
  }

  updateScores(roundWinner) {
    switch (roundWinner) {
      case HUMAN:
        this.humanScore++
        return;
      case COMPUTER:
        this.compScore++;
        return;
      default:
        return;
    }
  }

  resetScores() {
    this.humanScore = 0;
    this.compScore = 0;
  }
}

class RPSGame {
  constructor() {
    this.human = new Human();
    this.computer = new Computer();
    this.scoreboard = new Scoreboard();
    this.numOfGamesPlayed = 0;
    this.roundWinner;
    this.gameWinner;
    this.maxWins = 3;
  }

  displayWelcomeMessage() {
    console.log("Welcome to Rock, Paper, Scissors! Let's play a Best-Of-Five tournament!");
  }

  determineRoundWinner() {
    let humanChoice = this.human.move;
    let computerChoice = this.computer.move;
    
    const gameResults = {
      rock: {
        rock: TIE,
        paper: COMPUTER,
        scissors: HUMAN,
      },
      paper: {
        rock: HUMAN,
        paper: TIE,
        scissors: COMPUTER,
      },
      scissors: {
        rock: COMPUTER,
        paper: HUMAN,
        scissors: TIE,
      },
    };

    this.roundWinner = gameResults[humanChoice][computerChoice];
  }

  displayRoundWinner() {
    console.log(`You chose: ${this.human.move}`);
    console.log(`The computer chose: ${this.computer.move}`);

    console.log(ROUND[this.roundWinner])
    console.log(`Your score: ${this.scoreboard.humanScore} \nMy score: ${this.scoreboard.compScore}`);
  }

  determineGameWinner() {
    if (this.scoreboard.humanScore === this.maxWins) {
      this.gameWinner = HUMAN;
    } else if (this.scoreboard.compScore === this.maxWins) {
      this.gameWinner = COMPUTER;
    }
  }

  displayGameWinner() {
    console.log(GAME[this.gameWinner]);
  }


  playAgain() {
    if (this.numOfGamesPlayed === 0) {
      return true;
    } 

    console.log("Would you like to play again? (y/n)");
    let answer = readline.question();
    return answer.toLowerCase()[0] === `y`;
  }

  displayGoodByeMessage() {
    console.log("Thanks for playing! Arriverderci!")
  }

  play() {
    this.displayWelcomeMessage();

    while (this.playAgain()) { 
      while (!this.gameWinner) {
        this.human.choose();
        this.computer.choose();
        this.determineRoundWinner();
        this.scoreboard.updateScores(this.roundWinner);
        this.displayRoundWinner();
        this.determineGameWinner();
      }

      this.displayGameWinner();
      this.scoreboard.resetScores();

      this.numOfGamesPlayed += 1;
    }

    this.displayGoodByeMessage();
  }
}

let game = new RPSGame();
game.play();


