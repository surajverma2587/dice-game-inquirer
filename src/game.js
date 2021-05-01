const inquirer = require("inquirer");
const constructPlayer = require("./player");

const generateQuestions = (numberOfPlayers) => {
  const players = Array(numberOfPlayers).fill("");

  const callback = (player, index) => {
    return {
      type: "input",
      message: `Enter player ${index + 1} name:`,
      name: `player${index + 1}`,
    };
  };

  return players.map(callback);
};

const getAnswers = async (questions) => {
  const answers = await inquirer.prompt(questions);

  return answers;
};

const constructGame = async (numberOfPlayers, winningScore) => {
  const questions = generateQuestions(numberOfPlayers);

  const answers = await getAnswers(questions);

  const callback = (playerName) => {
    return constructPlayer(playerName, winningScore);
  };

  const players = Object.values(answers).map(callback);

  let currentPlayerIndex = 0;

  let winner;

  const playTurn = () => {
    const player = players[currentPlayerIndex % numberOfPlayers];

    const randomNumber = Math.floor(Math.random() * 6) + 1;

    if (player.score + randomNumber <= winningScore) {
      player.score += randomNumber;
    }

    if (player.score === winningScore) {
      winner = player.playerName;
      console.log(`${player.playerName} is the WINNER!!!`);
    } else {
      console.log(`${player.playerName}'s score is ${player.score}`);
    }
  };

  const start = async () => {
    console.log("Game Started!!");

    while (!winner) {
      const player = players[currentPlayerIndex % numberOfPlayers];

      const questions = [
        {
          type: "confirm",
          message: `${player.playerName} roll dice`,
          name: "rollDice",
        },
      ];

      const { rollDice } = await getAnswers(questions);

      if (rollDice) {
        playTurn();

        currentPlayerIndex += 1;
      }
    }

    console.log("Game Ended!!");
  };

  return {
    numberOfPlayers,
    winningScore,
    players,
    start,
    winner,
  };
};

module.exports = constructGame;
