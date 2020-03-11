const isPromise = (promise) => Promise.resolve(promise) === promise;

const any = async (iterable) => {
  if (iterable.length === 0) {
    return Promise.resolve(iterable);
  }

  const promises = iterable.filter(isPromise);

  if (promises.length === 0) {
    const promise = new Promise((resolve) => {
      setTimeout(() => {
        resolve(iterable);
      });
    });

    return promise;
  }

  const resolved = [];
  const rejected = [];

  const wrap = (promise) => new Promise((resolve) => promise
    .then((value) => {
      resolved.push(value);
      resolve();
    })
    .catch((e) => {
      rejected.push(e.message);
      resolve();
    }));

  const wrapped = promises.map(wrap);

  await Promise.all(wrapped);

  if (resolved.length === 0) {
    return Promise.reject(rejected);
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(resolved[0]);
    });
  });
};

export default any;
