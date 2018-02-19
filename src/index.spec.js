import { setRetryTimer } from './index';

it('should iterate 3 times', () => {
  const spy = jest.fn(() => Promise.reject());

  return setRetryTimer(spy, 3).catch(() => {
    expect(spy).toHaveBeenCalledTimes(3);
  });
});
