const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

/*
 * A brute force approach to decrypting a Caeser cipher-encrypted message
 * ciphertext {string} - the encrypted message
 */
function brutusForcilius(ciphertext) {
  let arrayOfPossibilities = [];

  let trimmedText = ciphertext.trim();

  // Setup an outer for-loop to execute all possible shifts, from 1 - 25.
  for (let i = 1; i < 26; i++) {
    let plaintext = '';

    // Cycle through every single character in the trimmed ciphertext.
    for (let j = 0; j < trimmedText.length; j++) {
      let originalCharacter = trimmedText[j];
      let upperCaseCharacter = originalCharacter.toUpperCase();

      // Is this character in the alphabet?
      if (alphabet.includes(upperCaseCharacter)) {
        let decryptedIndex = (alphabet.indexOf(upperCaseCharacter) + i) % 26;

        // Maintain the character's original casing (upper or lower).
        if (upperCaseCharacter === originalCharacter) {
          plaintext += alphabet[decryptedIndex];
        } else {
          plaintext += alphabet[decryptedIndex].toLowerCase();
        }
      } else {
        // If the character is not a letter (e.g., space, punctuation, etc.), add it to the ciphertext.
        plaintext += originalCharacter;
      }
    }
    arrayOfPossibilities.push(plaintext);
  }

  return arrayOfPossibilities;
}

module.exports = brutusForcilius;
