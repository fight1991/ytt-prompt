# 交互式输入

# 发版

### 保证版本清爽, 建议使用 beta 更新

- 更改 package.json
  `npm version prerelease --preid=beta`
  - 0.0.1-beta.1->0.0.1-beta.2 git 打上 tag 并提交
- 发布 beta 版
  ` npm publish --tag=beta`
- npm version patch
- npm version minor
- npm version major
