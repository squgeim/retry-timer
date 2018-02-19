import getProgression from './getProgression';
import progressionTypes from '../constants/progressionTypes';

it('should return a generator that yield 3 times', () => {
  const progression = getProgression(3);

  expect(typeof progression.next().value).toBe('number');
  expect(typeof progression.next().value).toBe('number');
  expect(typeof progression.next().value).toBe('number');
  expect(progression.next().done).toBe(true);
});

it('should return the fibonaci sequence', () => {
  const progression = getProgression(10, progressionTypes.FIBONACCI);

  const list = [];

  for (let i = 0; i < 10; i++) {
    const next = progression.next();

    if (next.done) {
      break;
    }

    list.push(next.value);
  }

  const expectedList = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34];

  expect(list).toEqual(expectedList);
});
