const { cloneDeep, without, sample, flatten } = _

function generateNamePairs() {
  const nameKeys = flatten(document.getElementById('names-input').value.split('\n').map(line => line.split(',').map(word => word.trim())));
  let nameValues = cloneDeep(nameKeys);

  const results = nameKeys.reduce((accum, key) => {
    const value = sample(without(nameValues, key));
    nameValues = without(nameValues, value);
    if (value) return Object.assign({}, accum, { [key]: value });

    // this will only happen if last value is undefined
    // which means we are last name and everyone else got used in a cycle
    const randKey = sample(Object.keys(accum));
    const randValue = accum[randKey];
    return Object.assign({}, accum, {
      [key]: randValue,
      [randKey]: key,
    })
  }, {});

  const resultString = Object.keys(results).reduce((accum, key) => {
    return accum +
      '<span class="left">' + key + ':</span>' +
      '<span class="right">' + results[key] + '</span>' +
      '<br/>';
  }, '')
  document.getElementById('result-content').innerHTML = '<div>' + resultString + '</div>';
}