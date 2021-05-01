const inquirer = require("inquirer");
const constructGame = require("./game");

const questions = [
  {
    type: "number",
    message: "How many players?",
    name: "numberOfPlayers",
  },
  {
    type: "number",
    message: "What is the winning score?",
    name: "winningScore",
  },
];

const init = async () => {
  const { numberOfPlayers, winningScore } = await inquirer.prompt(questions);

  const game = await constructGame(numberOfPlayers, winningScore);

  await game.start();
};

init();
