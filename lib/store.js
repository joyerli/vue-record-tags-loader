const Cache = require('sync-disk-cache');
const pathUtils = require('./pathUtils');

const NS = '__upman-record-tags';

const cache = new Cache(NS, {
  location: pathUtils.resolve('node_modules/.cache/sync-disk-cache'),
});

module.exports = {
  set(path, tags) {
    cache.set(pathUtils.posixPath(path), JSON.stringify(tags));
  },
  get(path) {
    const val = cache.get(pathUtils.posixPath(path));
    if (!val || !val.value) {
      return null;
    }
    return JSON.parse(val.value);
  },
  clear() {
    cache.clear();
  },
};
