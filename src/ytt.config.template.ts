import { defineConfig } from "yapi-to-typescript";

/**
 * 生成Api接口名称  Interface和ChangeCase数据类型参见node_modules\yapi-to-typescript\lib\esm\index.d.ts定义
 * @param interfaceInfo : Interface
 * @param changeCase:ChangeCase
 * @returns 请求响应接口名称--pascal命名
 */
function createApiInterfaceName(interfaceInfo, changeCase) {
  // 取解析路径 + 文件名称
  const filePath = createOutFilePath(interfaceInfo, changeCase);
  const docName = createDocsName(interfaceInfo, changeCase);

  return `${changeCase.pascalCase(filePath)}${changeCase.pascalCase(
    docName
  )}${changeCase.pascalCase(interfaceInfo.method)}`;
}
/**
 *
 * @param path
 * @returns 根据api地址生成文件夹
 */
function createOutFilePath(interfaceInfo, changeCase) {
  // ['', 'api', 'physical-model', 'page'] 取文件夹名称为physicalModel
  const filePathArr = interfaceInfo.path.split("/");
  // 文件夹路径
  const filePath = filePathArr[2];
  return changeCase.camelCase(filePath);
}
function createDocsName(interfaceInfo, changeCase) {
  const filePathArr = interfaceInfo.path.split("/");
  // eg: /api/physical-model/page/list 文件夹取名physicalModel, ts文件为pageList.ts
  // eg: /api/physical-model/page 文件夹取名physicalModel, ts文件为page.ts
  // eg: /api/physical-model 文件夹取名physicalModel, ts文件为index.ts
  // 文件名称
  let fileName = "index";
  if (filePathArr.length >= 4) {
    let temp = filePathArr.slice(3, filePathArr.length).join();
    fileName = changeCase.camelCase(temp);
  }
  return fileName;
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
      const filePath = createOutFilePath(interfaceInfo, changeCase);
      const docs = createDocsName(interfaceInfo, changeCase);

      return `src/ytt/apis/${filePath}/${docs}.ts`;
    },
    requestFunctionFilePath: "src/ytt/request.ts",

    getRequestDataTypeName: (interfaceInfo, changeCase) => {
      return `${createApiInterfaceName(interfaceInfo, changeCase)}Request`;
    },

    getResponseDataTypeName: (interfaceInfo, changeCase) => {
      return `${createApiInterfaceName(interfaceInfo, changeCase)}Response`;
    },
    // 响应数据中要生成ts数据类型的键名
    dataKey: "retdata",
    projects: [
      {
        token:
          "4f3782671bc09ea26b56112b032b42640dc1a3835a48000a03117938911e1d70",
        categories: [
          {
            id: [2005], // api/cat_1963后面的数字
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
