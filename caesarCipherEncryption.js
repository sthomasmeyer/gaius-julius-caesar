// Create an array of letters (A-Z).
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

/*
 * This function applies the Caesar cipher encryption method to the given plaintext.
 * plaintext {string} - the original message, un-encrypted
 * shift {number} - represents the shift value, the key
 */
function caesarCipherEncryption(plaintext, shift) {
  let ciphertext = '';

  // Remove whitespace from both ends of the given string.
  let trimmedText = plaintext.trim();

  // Cycle through every single character in the trimmed plaintext.
  for (let i = 0; i < trimmedText.length; i++) {
    let originalCharacter = trimmedText[i];
    let upperCaseCharacter = originalCharacter.toUpperCase();

    // Is this character in the alphabet?
    if (alphabet.includes(upperCaseCharacter)) {
      // If it is, apply the given shift to identify the encrypted character-index.
      let encryptedCharacterIndex =
        (alphabet.indexOf(upperCaseCharacter) + shift) % 26;

      // Maintain the character's original casing (upper or lower).
      if (originalCharacter === upperCaseCharacter) {
        ciphertext += alphabet[encryptedCharacterIndex];
      } else {
        ciphertext += alphabet[encryptedCharacterIndex].toLowerCase();
      }
    } else {
      // If the character is not a letter (e.g., space, punctuation, etc.), add it to the ciphertext.
      ciphertext += originalCharacter;
    }
  }

  return ciphertext;
}

module.exports = caesarCipherEncryption;
