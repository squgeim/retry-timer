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

function* getLinear() {
  for (let i = 0; ; i++) {
    yield i;
  }
}

function getSequence(type) {
  switch (type) {
    case 'fib':
    case 'fibonacci':
      return getFib();

    default:
      return getLinear();
  }
}

function* getProgression(limit, sequenceType) {
  const sequence = getSequence(sequenceType);

  for (var i = 0; i < limit; i++) {
    yield sequence.next().value;
  }
}

export default getProgression;
