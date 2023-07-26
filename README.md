# Gaius

Gaius (v1) is a command-line tool for your Caesar cipher-related cryptography needs, developed with JavaScript and Node.

With Gaius, you can encrypt plaintext and decrypt ciphertext even if you don't know the key. Whether you're a cryptography enthusiast or a student learning about Caesar ciphers, Gaius is the tool for you!

## Features

- Apply the Caesar cipher encryption method to plaintext.
- Decrypt a Caesar cipher-encrypted message.
- Take a brut(us) force approach to decryption if you don't know the key.

## Local Installation Guide

Before installing Gaius, make sure Node.js and npm are installed on your machine. To check if you already have them, open your terminal and run these commands: (1) **`node -v`**, and (2) **`npm -v`**. Your terminal should display something like _v18.17.0_ for Node.js and _9.8.1_ for npm.

If you don't have them installed, you can follow [this link to install Node.js and npm](https://nodejs.org/en).

Once you have Node.js and npm, you can install Gaius by following these steps:

1. Clone the repository with the command **`git clone https://github.com/sthomasmeyer/gaius-julius-caesar.git`**. This command creates a local project directory _gaius-julius-caesar_. You can use the command **`ls`** to see it.

2. Navigate into the project directory with the command **`cd gaius-julius-caesar`**

3. Install the dependencies with the command **`npm install`**

## Usage

Gaius is a command-line tool that you can run directly in your terminal.

### Encrypt a Message

1. Execute the command **`node app.js`**
2. When prompted, enter **`I`**
3. Enter the plaintext that you want to encrypt (e.g., "The die has been cast.")
4. Enter a shift value (e.g., 11)

### Decrypt a Message with the Key

1. Execute the command **`node app.js`**
2. When prompted, enter **`II`**
3. When asked if you know the shift value, enter **`yes`**
4. Enter the ciphertext you want to decrypt (e.g., "Tqog")
5. Enter the shift value (e.g., 2)

### Brut(us) Force Decryption

1. Execute the command **`node app.js`**
2. When prompted, enter **`II`**
3. When asked if you know the shift value, enter **`no`**
4. Enter the ciphertext you want to decrypt (e.g., "Tnvhf Whyvhf Pnrfne")
5. Gaius will produce all possible plaintext versions of the given ciphertext. Scan the results carefully to find the one that makes the most sense (e.g., Gaius Julius Caesar)

## Testing

Gaius uses Jest for testing. To run tests, execute the command **`npm test`**

## Contributing

If you want to contribute, please fork the repository and use a feature branch. Pull requests are warmly welcome.

## License

Gaius is released under the MIT License.
