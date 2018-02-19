import { setRetryTimer } from './index';
import progressionTypes from './constants/progressionTypes';

it('should iterate 3 times', () => {
  const spy = jest.fn(() => Promise.reject());

  return setRetryTimer(spy, 3).catch(() => {
    expect(spy).toHaveBeenCalledTimes(3);
  });
});

it('should stop retry after function resolves', () => {
  const func = (() => {
    let count = 0;

    return () => {
      if (++count === 3) {
        return Promise.resolve('done');
      }

      return Promise.reject();
    };
  })();

  const spy = jest.fn(func);

  return setRetryTimer(spy, {
    maxRetry: 10,
    type: progressionTypes.LINEAR,
  }).then(val => {
    expect(val).toBe('done');
    expect(spy).toHaveBeenCalledTimes(3);
  });
});
