function* getProgression(limit) {
  for (var i = 0; i < limit; i++) {
    yield i;
  }
}

export default getProgression;
