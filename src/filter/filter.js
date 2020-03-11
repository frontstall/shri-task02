/* eslint-disable no-await-in-loop */
import api from '../api';

const { AsyncArray } = api;

const asyncGet = (asyncArray, idx) => new Promise((resolve) => {
  asyncArray.get(idx, resolve);
});
const asyncGetLength = (asyncArray) => new Promise((resolve) => {
  asyncArray.length(resolve);
});
const asyncSet = (asyncArray, idx, value) => new Promise((resolve) => {
  asyncArray.set(idx, value, resolve);
});

const filter = async (asyncArray, predicate, cb) => {
  const result = new AsyncArray([]);
  const length = await asyncGetLength(asyncArray);
  const promises = [];
  let resultCurrentIndex = 0;

  for (let i = 0; i < length; i += 1) {
    const current = await asyncGet(asyncArray, i);
    const condition = await predicate(current, i, asyncArray);
    if (condition) {
      promises.push(asyncSet(result, resultCurrentIndex, current));
      resultCurrentIndex += 1;
    }
  }

  await Promise.all(promises);

  cb(result);
};

export default filter;
