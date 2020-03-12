const isPromise = (promise) => Promise.resolve(promise) === promise;
const createResolved = (value) => ({ status: 'fulfilled', value });
const createRejected = (reason) => ({ status: 'rejected', reason });

const allSettled = (iterable) => {
  if (iterable.length === 0) {
    return Promise.resolve(iterable);
  }

  const wrap = (item) => new Promise((resolve) => (isPromise(item)
    ? item
      .then((value) => {
        resolve(createResolved(value));
      })
      .catch((e) => {
        resolve(createRejected(e));
      })
    : resolve(createResolved(item))));

  const wrapped = iterable.map(wrap);

  return Promise.all(wrapped);
};

export default allSettled;
