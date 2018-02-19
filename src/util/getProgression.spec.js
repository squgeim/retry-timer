import getProgression from './getProgression';

it('should return a generator that yield 3 times', () => {
  const progression = getProgression(3);

  expect(typeof progression.next().value).toBe('number');
  expect(typeof progression.next().value).toBe('number');
  expect(typeof progression.next().value).toBe('number');
  expect(progression.next().done).toBe(true);
});
