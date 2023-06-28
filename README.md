# 捷途

抖音直播
## Project setup

```
node@14.17.5
yarn@1.22.17
```

```
npm install yarn@1.22.17 -g
```

```
yarn
```

### Compiles and hot-reloads for development

```
yarn dev
yarn dev:weixin
```

```
yarn sit
yarn sit:weixin
```

```
yarn uat
yarn uat:weixin
```

### Compiles and minifies for production

```
yarn build:dev
yarn build:dev:weixin
```

```
yarn build:sit
yarn build:sit:weixin
```

```
yarn build:uat
yarn build:uat:weixin
```

### Docs

- [Vite](https://cn.vitejs.dev/config/)
- [Uniapp](https://uniapp.dcloud.io/)
- [Vue3](https://v3.cn.vuejs.org/api/)
- [Typescript](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)

### Git commit

提交类型`type` + 冒号`:` + 内容描述`subject`

- feat: 新功能（feature）
- fix: 修补 bug
- docs: 文档（documentation）
- style: 格式（不影响代码运行的变动）
- refactor: 重构（即不是新增功能，也不是修改 bug 的代码变动）
- chore: 构建过程或辅助工具的变动
- optimize: 代码优化
- update: 升级更新

如：`feat: 增加了微信支付功能`

### Attention

> 在安装好 Git 和 TortoiseGit 后，从远端 clone，遇到一个奇怪的问题，Shell 脚本中的 LF 总是被替换成了 CRLF，最后发现是在 Git 的安装过程中有一项没有被配置好。

在 Git 中有一项`core.autocflf`配置项，它可以被配置为`true`，`false`和`input`，它们分别表示：

```bash
// 提交时转换为LF，检出时转换为CRLF
git config --global core.autocrlf true

// 提交时转换为LF，检出时不转换
git config --global core.autocrlf input

// 提交检出均不转换
git config --global core.autocrlf false
```

请使用第三种配置进行本地配置。

### 更新日志

2022 年 03 月 14 日
更新@dcloudio 相关版本至 3.0.0-alpha-3040220220310003
更新 vue 版本至 3.2.25
更新 vite 版本至 2.8.6
