/* eslint-disable no-underscore-dangle */
import allSettled from './allSettled';

describe('allSettled', () => {
  beforeAll(() => {
    Promise._allSettled = allSettled;
    try {
      Promise.allSettled([]);
    } catch (e) {
      console.error(e);
      console.error('use node version 12.9.0 or newer');
      process.exit(1);
    }
  });

  afterAll(() => {
    Promise._allSettled = undefined;
  });

  it('with empty array', async () => {
    const array = [];
    const result = await Promise._allSettled(array);
    const expected = await Promise.allSettled(array);
    expect(result).toEqual(expected);
  });

  it('with array of sync values', async () => {
    const array = [1, [], undefined, 'string'];
    const result = await Promise._allSettled(array);
    const expected = await Promise.allSettled(array);
    expect(result).toEqual(expected);
  });

  it('with array of promises', async () => {
    const promise1 = () => new Promise((resolve) => {
      setTimeout(() => resolve(1), 100);
    });
    const promise2 = () => new Promise((resolve) => {
      setTimeout(() => resolve(2));
    });
    const array = [promise1(), promise2()];

    const result = await Promise._allSettled(array);
    const expected = await Promise.allSettled(array);
    expect(result).toEqual(expected);
  });

  it('with array of mixed values', async () => {
    const promise1 = () => new Promise((resolve) => {
      setTimeout(() => resolve(1), 100);
    });
    const promise2 = () => new Promise((resolve) => {
      setTimeout(() => resolve(2), 50);
    });
    const array = [promise1(), promise2(), 'string'];

    const result = await Promise._allSettled(array);
    const expected = await Promise.allSettled(array);
    expect(result).toEqual(expected);
  });

  it('with array of rejected promises', async () => {
    const promise1 = () => new Promise((resolve, reject) => {
      setTimeout(() => reject(new Error('boom')), 100);
    });
    const promise2 = () => new Promise((resolve, reject) => {
      setTimeout(() => reject(new Error('bang')));
    });
    const array = [promise1(), promise2()];

    const result = await Promise._allSettled(array);
    const expected = await Promise.allSettled(array);
    expect(result).toEqual(expected);
  });

  it('with array of mixed promises', async () => {
    const promise1 = () => new Promise((resolve, reject) => {
      setTimeout(() => reject(new Error('boom')), 100);
    });
    const promise2 = () => new Promise((resolve, reject) => {
      setTimeout(() => reject(new Error('bang')));
    });
    const promise3 = () => new Promise((resolve) => {
      setTimeout(() => resolve('value'), 50);
    });
    const array = [promise1(), promise2(), promise3()];
    const result = await Promise._allSettled(array);
    const expected = await Promise.allSettled(array);
    expect(result).toEqual(expected);
  });
});
