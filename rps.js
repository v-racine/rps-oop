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



//Orchestration Engine: The engine is where the procedural program flow should be. 

RPSGame.play();

const RPSGame = {
  human: createPlayer(),
  computer: createPlayer(),

  play() {
    displayWelcomeMessage();
    this.human.choose();
    this.computer.choose();
    displayWinner();
    displayGoodByeMessage();
  },
};

function createPlayer() {
  return {
    // possible state: player name?
    // possible state: player's current move?

    choose() {
      // not yet implemented
    },
  };
}

function createMove() {
  return {
    // possible state: type of move (paper, rock, scissors)
  };
}

function createRule() {
  return {
    // possible state? not clear whether Rules need state
  };
}

// Since we don't yet know where to put `compare`, let's define
// it as an ordinary function.
let compare = function(move1, move2) {
  // not yet implemented
};


