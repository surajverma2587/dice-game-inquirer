const constructPlayer = (playerName, winningScore) => {
  let score = 0;

  return {
    playerName,
    score,
  };
};

module.exports = constructPlayer;
