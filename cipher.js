/*
 * Caesar Cipher — Core Substitution & Brute-Force Module
 * ---------------------------------------------------------------------------
 * Implements A-Z / a-z shift encryption, decryption, and exhaustive
 * 25-key brute-force decryption behind one shared shift helper.
 */

const ALPHABET_SIZE = 26;
const UPPER_A = 'A'.charCodeAt(0);
const LOWER_A = 'a'.charCodeAt(0);

function assertInputs(text, shift) {
  if (typeof text !== 'string') {
    throw new TypeError('Text must be a string.');
  }
  if (typeof shift !== 'number') {
    throw new TypeError('Shift must be a number.');
  }
  if (!Number.isInteger(shift)) {
    throw new RangeError('Shift must be a finite integer.');
  }
}

function shiftChar(char, normalizedShift) {
  const code = char.charCodeAt(0);

  if (code >= UPPER_A && code < UPPER_A + ALPHABET_SIZE) {
    return String.fromCharCode(
      ((code - UPPER_A + normalizedShift) % ALPHABET_SIZE) + UPPER_A
    );
  }
  if (code >= LOWER_A && code < LOWER_A + ALPHABET_SIZE) {
    return String.fromCharCode(
      ((code - LOWER_A + normalizedShift) % ALPHABET_SIZE) + LOWER_A
    );
  }

  return char;
}

function shiftText(text, shift, direction = 1) {
  assertInputs(text, shift);

  // JS `%` is remainder, not Euclidean modulo: negative shifts stay negative
  // unless we add ALPHABET_SIZE and reduce a second time.
  const normalizedShift =
    (((shift * direction) % ALPHABET_SIZE) + ALPHABET_SIZE) % ALPHABET_SIZE;

  if (normalizedShift === 0 || text.length === 0) {
    return text;
  }

  let result = '';
  for (const char of text) {
    result += shiftChar(char, normalizedShift);
  }
  return result;
}

function encrypt(plaintext, shift) {
  return shiftText(plaintext, shift, 1);
}

function decrypt(ciphertext, shift) {
  return shiftText(ciphertext, shift, -1);
}

function brutusForcilius(ciphertext) {
  if (typeof ciphertext !== 'string') {
    throw new TypeError('Ciphertext must be a string.');
  }

  const candidates = [];
  for (let shift = 1; shift < ALPHABET_SIZE; shift++) {
    candidates.push({
      shift,
      plaintext: decrypt(ciphertext, shift),
    });
  }
  return candidates;
}

module.exports = {
  encrypt,
  decrypt,
  brutusForcilius,
};
