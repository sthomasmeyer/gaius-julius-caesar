/*
 * Gaius CLI — Interactive Terminal Runner
 * ---------------------------------------------------------------------------
 * Thin readline wrapper around the cipher module that handles user prompts,
 * input validation, piped/EOF input, and Roman-themed terminal output.
 */

const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');
const { encrypt, decrypt, brutusForcilius } = require('./cipher');

const ENCRYPT_RESPONSES = new Set([
  'i',
  '1',
  'encrypt',
  'encrypting',
  'encrypting plaintext',
]);

const DECRYPT_RESPONSES = new Set([
  'ii',
  '2',
  'decrypt',
  'decrypting',
  'decrypting ciphertext',
]);

const AFFIRMATIVE_RESPONSES = new Set(['y', 'yes', '1', 'true']);
const NEGATIVE_RESPONSES = new Set(['n', 'no', '0', 'false']);

function pickLine(first, second) {
  return Math.random() < 0.5 ? first : second;
}

// Using the readline async iterator queues buffered lines from piped stdin,
// whereas repeated rl.question() calls drop lines after stdin emits 'end'.
function createPrompter(rl) {
  const lines = rl[Symbol.asyncIterator]();

  return async function ask(prompt) {
    output.write(prompt);
    const { value, done } = await lines.next();
    return done ? null : value;
  };
}

async function askMode(ask) {
  while (true) {
    const raw = await ask(
      'Do you need help (I) encrypting plaintext or (II) decrypting ciphertext? \n'
    );
    if (raw === null) {
      return null;
    }

    const choice = raw.toLowerCase().trim();
    if (ENCRYPT_RESPONSES.has(choice)) {
      return 'encrypt';
    }
    if (DECRYPT_RESPONSES.has(choice)) {
      return 'decrypt';
    }

    console.log(
      `\nBy Jupiter! Your response, '${choice}', has displeased the gods. Yet in their boundless mercy, they grant you another attempt.\n`
    );
  }
}

async function askKnowsKey(ask) {
  while (true) {
    const raw = await ask(
      '\nDo you know the shift value, the key? (yes or no) \n'
    );
    if (raw === null) {
      return null;
    }

    const choice = raw.toLowerCase().trim();
    if (AFFIRMATIVE_RESPONSES.has(choice)) {
      return true;
    }
    if (NEGATIVE_RESPONSES.has(choice)) {
      return false;
    }

    console.log(`\nSpeak plainly, citizen—answer 'yes' or 'no'.`);
  }
}

async function askShift(ask) {
  while (true) {
    const raw = await ask(
      'Enter the shift value, a whole number (1 - 25): \n'
    );
    if (raw === null) {
      return null;
    }

    const trimmed = raw.trim();
    if (/^\d+$/.test(trimmed)) {
      const shift = Number(trimmed);
      if (shift >= 1 && shift <= 25) {
        return shift;
      }
    }

    console.log(
      `\n'${trimmed}' is no valid Roman numeral of shift. Enter an integer from 1 to 25.\n`
    );
  }
}

async function runCli() {
  console.log(
    '\nWelcome to Gaius, the home for all of your Caesar Cipher-related cryptography needs.\n'
  );

  const rl = readline.createInterface({ input, output });
  const ask = createPrompter(rl);

  try {
    const mode = await askMode(ask);
    if (mode === null) {
      console.log('\nFarewell.');
      return;
    }

    if (mode === 'encrypt') {
      console.log(
        pickLine(
          '\nMinerva would approve. May her blessings guide your craft.',
          '\nMercury would applaud your craftiness. May his blessings guide you.'
        )
      );

      const plaintext = await ask('\nEnter the plaintext you want to encrypt: \n');
      if (plaintext === null) {
        console.log('\nFarewell.');
        return;
      }

      const shift = await askShift(ask);
      if (shift === null) {
        console.log('\nFarewell.');
        return;
      }

      console.log(`\n${encrypt(plaintext, shift)}\n`);
      return;
    }

    console.log(
      "\nMay Apollo's light guide us as we strive to reveal these dark secrets."
    );

    const knowsKey = await askKnowsKey(ask);
    if (knowsKey === null) {
      console.log('\nFarewell.');
      return;
    }

    if (knowsKey) {
      console.log(
        '\nAh, it seems that you have been blessed by Minerva herself.'
      );

      const ciphertext = await ask(
        '\nEnter the ciphertext you want to decrypt: \n'
      );
      if (ciphertext === null) {
        console.log('\nFarewell.');
        return;
      }

      const shift = await askShift(ask);
      if (shift === null) {
        console.log('\nFarewell.');
        return;
      }

      console.log(`\n${decrypt(ciphertext, shift)}\n`);
      return;
    }

    console.log(
      "\nThat's not a problem. My dearest friend, Brutus, may be willing to help.\n\n..."
    );

    const ciphertext = await ask(
      '\nBrutus has agreed to assist you. Enter the ciphertext you want to decrypt: \n'
    );
    if (ciphertext === null) {
      console.log('\nFarewell.');
      return;
    }

    const candidates = brutusForcilius(ciphertext);
    console.log('');
    for (const { shift, plaintext } of candidates) {
      console.log(`Shift ${String(shift).padStart(2, '0')}: ${plaintext}`);
    }

    console.log(
      pickLine(
        '\nAh Brutus, a true friend with piercing intellect.',
        '\nGood old Brutus, his mind is even sharper than his knife.'
      )
    );
  } finally {
    rl.close();
  }
}

if (require.main === module) {
  runCli();
}

module.exports = { runCli };
