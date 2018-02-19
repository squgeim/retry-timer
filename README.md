# Retry Timer

A simple javascript timer that triggers a retry logic at an increasing interval,
best used to implement something like a network request retry.

## Usage
```js
setRetryTimer(
  callback: (any) => Promise<any>,
  options: {
    ?maxLimit = 10: Number,
    ?type = 'fibonacci': String
  }
): Promise
```

name | type | required | default | description
--- | --- | --- | --- | ---
callback | function | true | |  This function is called according to the progression until either the function resolves or the maxLimit is reached
maxRetry | number | false | 10 | The maximum number of times the callback will be retried
type | string | false | 'fibonacci' | The type of sequence to use. Either 'fibonacci' or 'linear'

## Example

```js
import setRetryTimer, { TYPES } from 'retry-timer';

import { pingServer } from '../utils/network';

setRetryTimer(pingServer, { maxRetry: 10, type: TYPES.FIBONACCI })
  .then(response => {
    // Do stuff with the response of `pingServer`
  })
  .catch(err => {
    // `pingServer` could not be resolved in 10 attempts. `err` contains the
    // exception raised by `pingServer` in the last attempt.
  });
```

