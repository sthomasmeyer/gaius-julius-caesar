const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

/*
 * This function decrypts a Caesar cipher-encrypted message.
 * ciphertext {string} - the encrypted message
 * shift {number} - represents the shift value, the key
 */
function caesarCipherDecryption(ciphertext, shift) {
  let plaintext = '';

  let trimmedText = ciphertext.trim();

  for (let i = 0; i < trimmedText.length; i++) {
    let originalCharacter = trimmedText[i];
    let upperCaseCharacter = originalCharacter.toUpperCase();

    // Is this character in the alphabet?
    if (alphabet.includes(upperCaseCharacter)) {
      // The decryption process involves un-shifting each character.
      let unshift = alphabet.indexOf(upperCaseCharacter) - shift;

      let decryptedIndex = unshift % 26;
      // If the un-shifting process involves looping back from A to Z, update the decrypted index.
      if (unshift < 0) {
        decryptedIndex = 26 + unshift;
      }

      // Maintain the character's original casing (upper or lower).
      if (upperCaseCharacter === originalCharacter) {
        plaintext += alphabet[decryptedIndex];
      } else {
        plaintext += alphabet[decryptedIndex].toLowerCase();
      }
    } else {
      // If the character is not a letter (e.g., space, punctuation, etc.), add it to the plaintext.
      plaintext += originalCharacter;
    }
  }

  return plaintext;
}

module.exports = caesarCipherDecryption;
