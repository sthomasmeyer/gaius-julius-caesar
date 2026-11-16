const { describe, test } = require('node:test');
const assert = require('node:assert/strict');
const { encrypt, decrypt, brutusForcilius } = require('../cipher');

describe('Caesar cipher', () => {
  const cases = [
    {
      name: 'basic mixed-case shift',
      plaintext: 'Rome',
      shift: 2,
      ciphertext: 'Tqog',
    },
    {
      name: 'uppercase phrase with spaces',
      plaintext: 'LEAVE THE PACKAGE AT THE DOCKS',
      shift: 3,
      ciphertext: 'OHDYH WKH SDFNDJH DW WKH GRFNV',
    },
    {
      name: 'wrap-around past Z/z',
      plaintext: 'xyz XYZ',
      shift: 3,
      ciphertext: 'abc ABC',
    },
    {
      name: 'punctuation, digits, emoji, and outer whitespace preserved',
      plaintext: '  Et tu, Brute? 44 BC! 🏛️  ',
      shift: 5,
      ciphertext: '  Jy yz, Gwzyj? 44 GH! 🏛️  ',
    },
    {
      name: 'empty string',
      plaintext: '',
      shift: 13,
      ciphertext: '',
    },
    {
      name: 'zero shift is identity',
      plaintext: 'Veni, vidi, vici.',
      shift: 0,
      ciphertext: 'Veni, vidi, vici.',
    },
    {
      name: 'shift >= 26 wraps modulo 26',
      plaintext: 'Ave Caesar',
      shift: 29,
      ciphertext: 'Dyh Fdhvdu',
    },
    {
      name: 'negative shift wraps modulo 26',
      plaintext: 'Dyh Fdhvdu',
      shift: -3,
      ciphertext: 'Ave Caesar',
    },
  ];

  for (const { name, plaintext, shift, ciphertext } of cases) {
    test(`encrypts & decrypts: ${name}`, () => {
      assert.equal(encrypt(plaintext, shift), ciphertext);
      assert.equal(decrypt(ciphertext, shift), plaintext);
    });
  }

  test('brutusForcilius returns all 25 shifts with exact shift labels', () => {
    const results = brutusForcilius('OHDYH WKH SDFNDJH DW WKH GRFNV');
    assert.equal(results.length, 25);
    assert.deepEqual(results[2], {
      shift: 3,
      plaintext: 'LEAVE THE PACKAGE AT THE DOCKS',
    });

    const nameResults = brutusForcilius('Ufwtfd Nlpdlc');
    assert.ok(
      nameResults.some(
        (entry) => entry.shift === 11 && entry.plaintext === 'Julius Caesar'
      )
    );
  });

  test('rejects non-string text and non-integer shifts', () => {
    assert.throws(() => encrypt(123, 3), TypeError);
    assert.throws(() => decrypt(null, 3), TypeError);
    assert.throws(() => brutusForcilius(undefined), TypeError);

    for (const badType of ['3', null, undefined]) {
      assert.throws(() => encrypt('Rome', badType), TypeError);
      assert.throws(() => decrypt('Tqog', badType), TypeError);
    }

    for (const nonInteger of [NaN, Infinity, -Infinity, 1.5]) {
      assert.throws(() => encrypt('Rome', nonInteger), RangeError);
      assert.throws(() => decrypt('Tqog', nonInteger), RangeError);
    }
  });
});
