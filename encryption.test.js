const caesarCipherEncryption = require('./caesarCipherEncryption');

test('properly encrypts: Rome w/ a shift of 2', () => {
  expect(caesarCipherEncryption('Rome', 2)).toBe('Tqog');
});

test('properly encrypts: LEAVE THE PACKAGE AT THE DOCKS w/ a shift of 3', () => {
  expect(caesarCipherEncryption('LEAVE THE PACKAGE AT THE DOCKS', 3)).toBe(
    'OHDYH WKH SDFNDJH DW WKH GRFNV'
  );
});

test('handles loop-back from Z to A effectively', () => {
  expect(caesarCipherEncryption('xyz', 3)).toBe('abc');
});
