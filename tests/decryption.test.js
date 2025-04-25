const caesarCipherDecryption = require('../caesarCipherDecryption');

test('properly decrypts the ciphertext: Tqog w/ a shift of 2', () => {
  expect(caesarCipherDecryption('Tqog', 2)).toBe('Rome');
});

test('properly decrypts the ciphertext: OHDYH WKH SDFNDJH DW WKH GRFNV w/ a shift of 3', () => {
  expect(caesarCipherDecryption('OHDYH WKH SDFNDJH DW WKH GRFNV', 3)).toBe(
    'LEAVE THE PACKAGE AT THE DOCKS'
  );
});
