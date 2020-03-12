/* eslint-disable no-underscore-dangle */
const noop = () => {};

function _finally(cb = noop) {
  cb();

  return this;
}

export default _finally;
