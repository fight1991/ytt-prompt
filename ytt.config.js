import { defineConfig } from "yapi-to-typescript";
import { token, ids } from "./params.js";
/**
 * 生成Api接口名称  Interface和ChangeCase数据类型参见node_modules\yapi-to-typescript\lib\esm\index.d.ts定义
 * @param interfaceInfo : Interface
 * @param changeCase:ChangeCase
 * @returns 请求响应接口名称--pascal命名
 */
function genApiInterfaceName(interfaceInfo, changeCase) {
  // 取解析路径dir最尾部的路径作为前缀路径
  const lastPath = interfaceInfo.parsedPath.dir.split("/").pop();
  // 拼接前缀路径+文件名称
  return `${changeCase.pascalCase(lastPath)}${changeCase.pascalCase(
    interfaceInfo.parsedPath.name
  )}${changeCase.pascalCase(interfaceInfo.method)}`;
}

export default defineConfig([
  {
    serverUrl: "http://10.50.16.213:40001",
    typesOnly: false,
    target: "typescript",
    reactHooks: {
      enabled: false,
    },
    comment: {
      updateTime: false, // 不显示更新时间
      title: false,
    },
    prodEnvName: "local",
    // 将生成文件路径转化成小驼峰命名方式
    outputFilePath: (interfaceInfo, changeCase) => {
      // eg: /api/physical-model/page 文件夹取名physicalModel, ts文件为page.ts
      const filePathArr = interfaceInfo.path.split("/").slice(-2);
      const filePath = filePathArr
        .map((item) => changeCase.camelCase(item))
        .join("/");
      return `src/ytt/types/${filePath}.ts`;
    },
    requestFunctionFilePath: "src/ytt/request.ts",

    getRequestDataTypeName: (interfaceInfo, changeCase) => {
      return `${genApiInterfaceName(interfaceInfo, changeCase)}Request`;
    },

    getResponseDataTypeName: (interfaceInfo, changeCase) => {
      return `${genApiInterfaceName(interfaceInfo, changeCase)}Response`;
    },
    // 响应数据中要生成ts数据类型的键名
    dataKey: "retdata",
    projects: [
      {
        token: token,
        categories: [
          {
            id: ids, // api/cat_1963后面的数字
            getRequestFunctionName(interfaceInfo, changeCase) {
              // 防止重复建议以接口全路径+method生成请求函数名
              return `${changeCase.camelCase(
                interfaceInfo.path
              )}${changeCase.pascalCase(interfaceInfo.method)}`;
            },
          },
        ],
      },
    ],
  },
]);
