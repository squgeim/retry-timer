import getProgression from './util/getProgression';

export function setRetryTimer(callback, retryLimit) {
  return new Promise((resolve, reject) => {
    function done(err, value) {
      if (err) {
        return reject(err);
      }

      resolve(value);
    }

    const progression = getProgression(retryLimit, 'linear');
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
