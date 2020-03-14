# shri-task02

[Вариант 10](https://dima117.github.io/shri-async-hw/#%D0%B2%D0%B0%D1%80%D0%B8%D0%B0%D0%BD%D1%82-10)

Решения покрыты тестами.
UPD 14.03 - понял, что += 1 и < в цикле использовать нельзя

```
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
const asyncLess = (a, b) => new Promise((resolve) => {
  less(a, b, resolve);
});
const asyncAdd = (a, b) => new Promise((resolve) => {
  add(a, b, resolve);
});

const filter = async (asyncArray, predicate, cb) => {
  const result = new AsyncArray([]);
  const length = await asyncGetLength(asyncArray);
  const promises = [];
  let resultCurrentIndex = 0;

  for (let i = 0; await asyncLess(i, length); i = await asyncAdd(i, 1)) {
    const current = await asyncGet(asyncArray, i);
    const condition = await predicate(current, i, asyncArray);
    if (condition) {
      promises.push(asyncSet(result, resultCurrentIndex, current));
      resultCurrentIndex = await asyncAdd(resultCurrentIndex, 1);
    }
  }

  await Promise.all(promises);

  cb(result);
};
```

Бонусные задания:
- [allSettled](https://github.com/frontstall/shri-task02/blob/master/src/Promise.allSettled/allSettled.js)
- [any](https://github.com/frontstall/shri-task02/blob/master/src/Promise.any/any.js)
- [finally](https://github.com/frontstall/shri-task02/blob/master/src/Promise.prototype.finally/finally.js)
