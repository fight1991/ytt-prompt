# 目录

1. `src/core/*` 核心代码块,根据 token 读写 yapi 中的数据
2. `src/tools/*` 公共方法
3. `src/lib/*` node 交互式命令窗口
4. `src/ytt/*` 存放的 api
5. `src/index.ts` tools 和 ytt 的入口函数

# 配置文件说明

1. `token.config.js` 此文件输入迭代项目的 token, 由 core/generator 调用
2. `ytt.config.ts` 公共配置,勿动, 由 core/generator 调用
3. `createEntry.js` 动态生成 ytt 及 tools 所有文件的入口函数

# API 命名规则

1. 请求函数命名规则

- `path` + `method`

2. 入参 Interface 命名规则

- `path` + `method` + `Request`

3. 回参 Interface 命名规则

- `path` + `method` + `Request`

4. 举例说明

- api 地址: `/api/charging/charging-station/edit`
- 请求函数名称: `apiChargingChargingStationEditPut`
- 入参 Interface: `ChargingChargingStationEditPutRequest`
- 回参 interface: `ChargingChargingStationEditPutResponse`

# 如何 mock 数据

```ts
 apiChargingChargingStationEditPut(data: ChargingChargingStationEditPutRequest, {server: 'mock'})
```

# 发版

1. 开发阶段避免不了接口文档频繁更新, 总体原则: 保证版本清爽, 使用 beta 更新

2. 步骤

- 更改 package.json
  `npm version prerelease --preid=beta`
  - 0.0.1-beta.1->0.0.1-beta.2 git 打上 tag 并提交
- 发布 beta 版
  ` npm publish --tag=beta`
- npm version patch
- npm version minor
- npm version major
- 详见 https://juejin.cn/post/6948343013529780237
