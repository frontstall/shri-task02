import filter from './filter';
import api from './api';

const { AsyncArray } = api;

describe('filter', () => {
  it('filters by truthy', async () => {
    const array = new AsyncArray([1, '2', 3, 'a', {}]);
    let result;
    const predicate = (el) => new Promise((resolve) => {
      setTimeout(() => resolve(!!el));
    });

    await filter(array, predicate, (filtered) => {
      result = filtered;
    });

    expect(result).toBeInstanceOf(AsyncArray);
    expect(result.getValue()).toEqual([1, '2', 3, 'a', {}]);
  });

  it('filters by predicate', async () => {
    const array = new AsyncArray([1, '2', 3, 'a', {}]);
    let result;
    const predicate = (item) => new Promise((resolve) => {
      setTimeout(() => resolve(Number.isInteger(item)));
    });

    await filter(array, predicate, (filtered) => {
      result = filtered;
    });

    expect(result).toBeInstanceOf(AsyncArray);
    expect(result.getValue()).toEqual([1, 3]);
  });

  it('filters empty array', async () => {
    const array = new AsyncArray([]);
    let result;
    const predicate = (item) => new Promise((resolve) => {
      setTimeout(() => resolve(Number.isInteger(item)));
    });

    await filter(array, predicate, (filtered) => {
      result = filtered;
    });

    expect(result).toBeInstanceOf(AsyncArray);
    expect(result.getValue()).toEqual([]);
  });
});
