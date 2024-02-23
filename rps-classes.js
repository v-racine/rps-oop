const readline = require("readline-sync"); // eslint-disable-line

const VALID_CHOICES = ["rock", "paper", "scissors"];
const SHORT_VALID_CHOICES = ["r", "p", "s"];
const VALID_ROUND_CHOICES = ["3", "5", "7"];
const HUMAN = "HUMAN";
const COMPUTER = "COMPUTER";
const TIE = "TIE";
const ROUND = {
  HUMAN: "You win this round!",
  COMPUTER: "I win this round!",
  TIE: "Tie game! Let's play again."
};
const GAME = {
  HUMAN: "Congrats!! You win the game!",
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
      `\nPlease choose one of the following options: ${VALID_CHOICES.join(" / ")}`
    );
    let choice = readline.question().toLowerCase();

    while(!VALID_CHOICES.includes(choice) && !SHORT_VALID_CHOICES.includes(choice)) {
      console.log("Oops! That's not a valid choice. Please choose again.");
      choice = readline.question().toLowerCase();
    } 
    
    if (choice[0] === "r") {
      this.move = "rock";
    } else if (choice[0] === "p") {
      this.move = "paper";
    } else if (choice[0] === "s") {
      this.move = "scissors";
    } 
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

class History {
  constructor() {
    this.humanChoices = [];
    this.computerChoices = [];
  }

  trackChoices(humanChoice, computerChoice) {
    this.humanChoices.push(humanChoice);
    this.computerChoices.push(computerChoice);
  }

  resetTrackers() {
    this.humanChoices = [];
    this.computerChoices = [];
  }
  
}

class RPSGame {
  constructor() {
    this.human = new Human();
    this.computer = new Computer();
    this.scoreboard = new Scoreboard();
    this.history = new History();
    this.numOfGamesPlayed = 0;
    this.roundWinner;
    this.gameWinner;
    this.maxWins = 0;
  }

  displayWelcomeMessage() {
    console.log("Welcome to Rock, Paper, Scissors! Let's play a tournament!");
  }

  getNumOfRounds() {
    console.log("\nDo you want to play a 'best-of-three', a 'best-of-five', or a 'best-of-seven' tournament? \nPlease choose: 3 / 5 / 7");
    let bestOfNum = readline.question();

    while(!VALID_ROUND_CHOICES.includes(bestOfNum)) {
      console.log("Oops! That's not a valid choice. Please choose again.");
      bestOfNum = readline.question();
    } 

    let maxWins = Math.ceil(bestOfNum / 2);
    this.maxWins = maxWins;
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
    console.clear();
    //OPTION to print choices for every round at every round:
    // this.history.humanChoices.forEach((val, idx) => {
    //   console.log(`Round #${idx + 1}: Your choice is ${val}. My choice is ${this.history.computerChoices[idx]}.`);
    // })

    //OPTION to print choices only for current round: 
    const humanLen = this.history.humanChoices.length;
    const compLen = this.history.computerChoices.length;
    console.log(`Round #${humanLen}: Your choice is ${this.history.humanChoices[humanLen-1]}. My choice is ${this.history.computerChoices[compLen-1]}.`);

    console.log("");
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
    console.log("");
    console.log(GAME[this.gameWinner]);

    console.log(`\nHere's the game history:
    \nYour choices: ${this.history.humanChoices.join(" - ")}\nMy choices: ${this.history.computerChoices.join(" - ")}`)
  }

  playAgain() {
    if (this.numOfGamesPlayed === 0) {
      return true;
    } 

    console.log("\nWould you like to play again? (y/n)");
    let answer = readline.question();
    return answer.toLowerCase()[0] === `y`;
  }

  displayGoodByeMessage() {
    console.clear();
    console.log("Thanks for playing! Arriverderci!")
  }

  play() {
    this.displayWelcomeMessage();

    while (this.playAgain()) { 
      this.getNumOfRounds();

      while (!this.gameWinner) {
        this.human.choose();
        this.computer.choose();
        this.history.trackChoices(this.human.move, this.computer.move);
        this.determineRoundWinner();
        this.scoreboard.updateScores(this.roundWinner);
        this.displayRoundWinner();
        this.determineGameWinner();
      }

      this.displayGameWinner();
      this.history.resetTrackers();
      this.scoreboard.resetScores();
      this.maxWins = 0;

      this.numOfGamesPlayed += 1;
      this.gameWinner = undefined;
    }

    this.displayGoodByeMessage();
  }
}

let game = new RPSGame();
game.play();


