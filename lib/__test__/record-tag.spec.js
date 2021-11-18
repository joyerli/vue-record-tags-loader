const fs = require('fs');
const mockContext = require('./mock-context');
const loader = require('../index');
const store = require('../store');

it('记录vue文件组件中的所有的标签', async () => {
  store.clear();

  const callbackTplSpy = jest.fn();
  const context = mockContext({
    callbackSpy: callbackTplSpy,
    resourcePath: 'path/to/plain.vue',
  });
  const code = fs.readFileSync('lib/__test__/plain.vue', {
    encoding: 'utf8',
  });

  loader.call(context, code);

  expect(store.get('path/to/plain.vue')).toMatchSnapshot();
});

it('支持忽略文件', async () => {
  store.clear();

  const callbackTplSpy = jest.fn();
  const context = mockContext({
    callbackSpy: callbackTplSpy,
    resourcePath: 'path/to/plain.vue',
    exclude: ['path/to/plain.vue'],
  });
  const code = fs.readFileSync('lib/__test__/plain.vue', {
    encoding: 'utf8',
  });

  loader.call(context, code);

  expect(store.get('path/to/plain.vue')).toMatchSnapshot();
});

it('屏蔽js中标签的影响', async () => {
  store.clear();

  const callbackTplSpy = jest.fn();
  const context = mockContext({
    callbackSpy: callbackTplSpy,
    resourcePath: 'path/to/with-js.vue',
    resourceQuery: '?vue&type=script&id=21aa4478&',
  });
  const code = fs.readFileSync('lib/__test__/with-js.vue', {
    encoding: 'utf8',
  });

  loader.call(context, code);

  expect(store.get('path/to/with-js.vue')).toMatchSnapshot();
});
