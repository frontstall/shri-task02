import filter from './filter';
import api from './api';

describe('filter', () => {
  const { AsyncArray } = api;

  const array = new AsyncArray([1, 2, 3, 'a', 'b']);

  it('filters with identity', async () => {
    let result;

    await filter(array, () => true, (filtered) => {
      result = filtered;
    });

    expect(result).toEqual(array);
  });
});
