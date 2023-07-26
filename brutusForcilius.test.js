const brutusForcilius = require('./brutusForcilius');

test('applies brute force decryption methods effectively to this ciphertext: OHDYH WKH SDFNDJH DW WKH GRFNV', () => {
  expect(brutusForcilius('OHDYH WKH SDFNDJH DW WKH GRFNV')).toContain(
    'LEAVE THE PACKAGE AT THE DOCKS'
  );
});

test('applies brute force decryption methods effectively to this ciphertext: Ufwtfd Nlpdlc', () => {
  expect(brutusForcilius('Ufwtfd Nlpdlc')).toContain('Julius Caesar');
});
