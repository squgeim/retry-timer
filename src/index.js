import getProgression from './util/getProgression';
import progressionTypes from './constants/progressionTypes';

/**
 * Takes a callback function that should return a promise. The callback will be
 * tried in a progression according to the progression type provided until the
 * function resolves or the maximum retry limit is met.
 *
 * The returned promise will resolve with the return value of the given callback,
 * or rejects the last error from the callback (when the max limit is met).
 *
 * @param {Function} callback - The function that is retried until it resolves
 * @param {Number} retryLimit - Maximum number of attempts before failure
 * @param {String} progressionType - The type of progression (linear or fibonacci)
 * @returns {Promise} Returns the resolved value of the callback function
 */
export function setRetryTimer(
  callback,
  retryLimit = 10,
  progressionType = progressionTypes.LINEAR
) {
  return new Promise((resolve, reject) => {
    function done(err, value) {
      if (err) {
        return reject(err);
      }

      resolve(value);
    }

    const progression = getProgression(retryLimit, progressionType);
    let lastErr;

    function call() {
      const next = progression.next();

      if (next.done) {
        return done(lastErr);
      }

      setTimeout(() => {
        callback()
          .then(val => {
            done(null, val);
          })
          .catch(err => {
            lastErr = err;
            call();
          });
      }, next.value * 1000);
    }

    call();
  });
}

export const TYPES = progressionTypes;
export default setRetryTimer;
