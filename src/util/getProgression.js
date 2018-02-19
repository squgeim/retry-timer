import progressionTypes from '../constants/progressionTypes';

/**
 * Returns a generator that yields the values of the fibonacci series.
 */
function* getFib() {
  let i = 0;
  let j = 1;

  while (true) {
    const next = i;

    i = j;
    j = next + j;

    yield next;
  }
}

/**
 * Returns a generator that yields the values of a linear series (0, 1, 2, 3, 4,...).
 */
function* getLinear() {
  for (let i = 0; ; i++) {
    yield i;
  }
}

function getSequence(type) {
  switch (type) {
    case progressionTypes.FIBONACCI:
      return getFib();

    case progressionTypes.LINEAR:
    default:
      return getLinear();
  }
}

/**
 * @param {Number} limit - The maximum limit
 * @param {String} sequenceType - The type of sequence
 */
function* getProgression(limit, sequenceType) {
  const sequence = getSequence(sequenceType);

  for (var i = 0; i < limit; i++) {
    yield sequence.next().value;
  }
}

export default getProgression;
