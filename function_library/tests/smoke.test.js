import add from '../src/add.js';

test('smoke: add(1, 2) === 3', () => {
  expect(add(1, 2)).toBe(3);
});
