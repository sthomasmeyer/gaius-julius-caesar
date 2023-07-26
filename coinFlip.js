function coinFlip() {
  // Generate a random number between 0 and 1.
  let random = Math.random();

  // If the random number is less than or equal to 0.5, return 0.
  if (random <= 0.5) {
    return 0;
  }

  // Otherwise, return 1.
  return 1;
}

module.exports = coinFlip;
