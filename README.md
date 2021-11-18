[TOC]

# 记录vue文件模板中标签的loader

记录vue文件中`template`中所有的html标签, 无论是原生的标签还是组件标签， 都会被记录。

## 使用

初始化:
```
yarn add -D @upman/record-tags-loader
```
在webpack配置中配置该loader:
```
const { clear: clearTagsLoaderStore } = require('@upman/record-tags-loader/lib/store');

// 在每次构建时， 都清空上一次存储信息。
clearTagsLoaderStore();

module.exports = {
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [{
            loader: '@upman/record-tags-loader'
          }, {
            loader: 'vue-loader',
            options: {
              //...
            },
          }]
      },
    ]
  }
};
```

注意:
* 该`loader`注意配置在`vue-loader`之前。
* 并且在每次构建时 最好清空缓存

## 获取记录信息
`@upman/record-tags-loader`解析vue文件得来的信息会存在文件系统中, 通过`record-tags-loader/lib/store`获取:
```
const { get } = require('@upman/record-tags-loader/lib/store');

const tags = get(filePath);
```

`get`函数获取指定文件的标签列表， 传入的参数时文件路径， 需要时绝对路径。

> 为了避免上次构建残留的信息对本次构建影响， 请在构建前， 清除存储。


