/* eslint-disable no-underscore-dangle */
import any from './any';

describe('any', () => {
  beforeAll(() => {
    Promise._any = any;
  });

  afterAll(() => {
    Promise._any = undefined;
  });

  it('with empty array', () => {
    const array = [];
    const result = Promise._any(array);
    expect(result).toEqual(Promise.resolve(array));
  });

  it('with array of sync values', () => {
    const array = [1, [], undefined, 'string'];
    return expect(Promise._any(array)).resolves.toEqual(array);
  });

  it('with array of promises', () => {
    const promise1 = () => new Promise((resolve) => {
      setTimeout(() => resolve(1), 100);
    });
    const promise2 = () => new Promise((resolve) => {
      setTimeout(() => resolve(2));
    });
    const array = [promise1(), promise2()];

    return expect(Promise._any(array)).resolves.toBe(2);
  });

  it('with array of mixed values', () => {
    const promise1 = () => new Promise((resolve) => {
      setTimeout(() => resolve(1), 100);
    });
    const promise2 = () => new Promise((resolve) => {
      setTimeout(() => resolve(2), 50);
    });
    const array = [promise1(), promise2(), 'string'];

    return expect(Promise._any(array)).resolves.toBe(2);
  });

  it('with array of rejected promises', () => {
    const promise1 = () => new Promise((resolve, reject) => {
      setTimeout(() => reject(new Error('boom')), 100);
    });
    const promise2 = () => new Promise((resolve, reject) => {
      setTimeout(() => reject(new Error('bang')));
    });
    const array = [promise1(), promise2()];

    return expect(Promise._any(array)).rejects.toEqual(['bang', 'boom']);
  });

  it('with array of mixed promises', () => {
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

    return expect(Promise._any(array)).resolves.toBe('value');
  });
});
