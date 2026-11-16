# Gaius

Gaius is a zero-dependency command-line tool for your Caesar cipher-related cryptography needs, built with Node.js.

With Gaius, you can encrypt plaintext and decrypt ciphertext even if you don't know the key. Whether you're a cryptography enthusiast or a student learning about Caesar ciphers, Gaius is the tool for you!

## Features

- Apply Caesar cipher encryption to plaintext while preserving letter casing, spaces, and punctuation.
- Decrypt a Caesar cipher-encrypted message when you know the shift key.
- Take a brut(us) force approach to decryption across all 25 shifts when you don't know the key.

## Local Setup

Gaius has **zero external dependencies** and requires **Node.js v20+** (for `node --test`). To check your version, run **`node -v`**. If you need to install or update Node.js, see [nodejs.org](https://nodejs.org/en).

1. Clone the repository: **`git clone https://github.com/sthomasmeyer/gaius-julius-caesar.git`**
2. Navigate into the project directory: **`cd gaius-julius-caesar`**

## Usage

Run Gaius directly in your terminal with **`node app.js`** (or **`npm start`**).

### Encrypt a Message

1. Execute **`node app.js`**
2. When prompted, enter **`I`**
3. Enter the plaintext you want to encrypt (e.g., `"The die has been cast."`)
4. Enter a whole-number shift value from `1` to `25` (e.g., `11`)

### Decrypt a Message with the Key

1. Execute **`node app.js`**
2. When prompted, enter **`II`**
3. When asked if you know the shift value, enter **`yes`**
4. Enter the ciphertext you want to decrypt (e.g., `"Tqog"`)
5. Enter the shift value (e.g., `2`)

### Brut(us) Force Decryption

1. Execute **`node app.js`**
2. When prompted, enter **`II`**
3. When asked if you know the shift value, enter **`no`**
4. Enter the ciphertext you want to decrypt (e.g., `"Ufwtfd Nlpdlc"`)
5. Gaius will display every shift (`01`–`25`) alongside its candidate plaintext so you can spot both the decoded message and the key (e.g., `Shift 11: Julius Caesar`).

## Testing

Gaius uses Node's built-in test runner (`node:test`). To run the test suite, execute **`npm test`** (or **`node --test`**).

## Contributing

If you want to contribute, please fork the repository and use a feature branch. Pull requests are warmly welcome.

## License

Gaius is released under the [MIT License](./LICENSE).
