//Step 1: Write a Textual Description:

/*
-RPS is a two-player game where each player chooses one of three possible moves: 
rock, paper, or scissors. 
-The winner is chosen by comparing their moves with the following rules:
  -Rock crushes scissors, i.e., rock wins against scissors.
  -Scissors cuts paper, i.e., scissors beats paper.
  -Paper wraps rock, i.e., paper beats rock.
-If the players chose the same move, the game is a tie.
*/

//Step 2: Extract the Nouns & Verbs:

/*
Nouns: player, move (rock, paper, scissor), rule 
Verbs:  choose, compare (win, lose, tie)
*/

//Step 3: Organize & Associate the Verbs with the Nouns:

/*
Player
 - choose
Move
Rule

???
- compare
*/

const readline = require("readline-sync");
//Orchestration Engine

const RPSGame = {
  human: createHuman(),
  computer: createComputer(),

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
};

RPSGame.play();

function createPlayer() {
  return {
    move: null, 
  };
}

function createComputer() {
  let playerObject = createPlayer();

  let computerObject = {
    choose() {
      const choices = ["rock", "paper", "scissors"];
      let randomIndex = Math.floor(Math.random() * choices.length);
      this.move = choices[randomIndex];
    }
  }

  return Object.assign(playerObject, computerObject);
}

function createHuman() {
  let playerObject = createPlayer();

  let humanObject = {
    choose() {
      let choice;

      while (true) {
        console.log("Please choose rock, paper, or scissors.");
        choice = readline.question();

        if (["rock", "paper", "scissors"].includes(choice)) break;
        console.log("Sorry, that's an invalid choice.");
      }
      
      this.move = choice;
    }
  }
  return Object.assign(playerObject, humanObject);
}





