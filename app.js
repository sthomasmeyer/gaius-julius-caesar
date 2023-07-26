const caesarCipherEncryption = require('./caesarCipherEncryption');
const caesarCipherDecryption = require('./caesarCipherDecryption');
const brutusForcilius = require('./brutusForcilius');
const coinFlip = require('./coinFlip');

const readline = require('readline');

console.log(
  `\nWelcome to Gaius, the home for all of your Caesar Cipher-related cryptography needs.\n`
);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const encryptOrDecrypt = () => {
  rl.question(
    `Do you need help (I) encrypting plaintext or (II) decrypting ciphertext? \n`,
    (res) => {
      const encryptResponses = [
        'i',
        '1',
        'encrypt',
        'encrypting',
        'encrypting plaintext'
      ];
      const decryptResponses = [
        'ii',
        '2',
        'decrypt',
        'decrypting',
        'decrypting ciphertext'
      ];

      // Re-format the user response and remove unwanted spaces.
      res = res.toLowerCase().trim();

      if (encryptResponses.includes(res)) {
        coinFlip()
          ? console.log(
              `\nMinerva would approve. May her blessings guide your craft.`
            )
          : console.log(
              `\nMercury would applaud your craftiness. May his blessings guide you.`
            );
        executeCaesarCipherEncryption();
      } else if (decryptResponses.includes(res)) {
        console.log(
          `\nMay Apollo's light guide us as we strive to reveal these dark secrets.`
        );
        bruteForceOrNah();
      } else {
        console.log(
          `\nBy Jupiter! Your response, '${res}', has displeased the gods. Yet in their boundless mercy, they grant you another attempt.`
        );
        encryptOrDecrypt();
      }
    }
  );
};

function bruteForceOrNah() {
  rl.question(
    `\nDo you know the shift value, the key? (yes or no) \n`,
    (res) => {
      const affirmativeResponses = ['y', 'yes', '1', 'true'];
      const negativeResponses = ['n', 'no', '0', 'false'];

      res = res.toLowerCase().trim();

      if (affirmativeResponses.includes(res)) {
        console.log(
          `\nAh, it seems that you have been blessed by Minerva herself.`
        );
        executeCaesarCipherDecryption();
      } else if (negativeResponses.includes(res)) {
        console.log(
          `\nThat's not a problem. My dearest friend, Brutus, may be willing to help.\n
          ...`
        );
        etTuBrute();
      }
    }
  );
}

function etTuBrute() {
  rl.question(
    `\nBrutus has agreed to assist you. Enter the ciphertext you want to decrypt: \n`,
    (res) => {
      console.log(brutusForcilius(res));
      coinFlip()
        ? console.log(`\nAh Brutus, a true friend with piercing intellect.`)
        : console.log(
            `\nGood old Brutus, his mind is even sharper than his knife.`
          );
      rl.close();
    }
  );
}

function executeCaesarCipherEncryption() {
  rl.question(`\nEnter the plaintext you want to encrypt: \n`, (res) => {
    let plaintext = res;

    rl.question(`Enter the shift value, a number (1 - 25): \n`, (res) => {
      let shift = Number(res);

      console.log(`\n${caesarCipherEncryption(plaintext, shift)}\n`);
      rl.close();
    });
  });
}

function executeCaesarCipherDecryption() {
  rl.question(`\nEnter the ciphertext that you to decrypt: \n`, (res) => {
    let ciphertext = res;

    rl.question(`Enter the shift value, a number (1 - 25): \n`, (res) => {
      let shift = Number(res);

      console.log(`\n${caesarCipherDecryption(ciphertext, shift)}\n`);
      rl.close();
    });
  });
}

encryptOrDecrypt();
