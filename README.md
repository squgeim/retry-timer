# Retry Timer

A simple javascript timer that triggers a retry logic at an increasing interval,
best used to implement something like a network request retry.

## Usage
```js
setRetryTimer(
  func: (any) => Promise<any>,
  options: {
    ?maxLimit: Number,
    ?type: String
  }
): Promise
```

Name | Type | Required | Default | Description
--- | --- | --- | --- | ---
func | function | true | |  This function is called after the number of seconds determined by the chosen sequence.<br><br>It is expected that the given function returns a Promise. The timer will end when this promise successfully resolves.<br><br>If the given function does not return a promise, the timer will resolve if this function does not throw an exception.
maxRetry | number | false | 10 | The maximum number of times the callback will be retried
type | string | false | 'fibonacci' | The type of sequence to use. Either 'fibonacci' or 'linear'

Available types:

Import constant | Value | Sequence
--- | --- | ---
FIBONACCI | 'fibonacci' | 0, 1, 1, 2, 3, 5, 8, 13, 21,...
LINEAR | 'linear' | 0, 1, 2, 3, 4, 5, 6, 7, 8,...

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

`pingServer` is first called immediately, then after 1 second, again after 1 second, then after
2 seconds, then 3, then 5, 8, 13, and so on until the max retry limit is reached or the given
function successfully resolves.
