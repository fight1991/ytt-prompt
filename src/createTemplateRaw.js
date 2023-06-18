import fsx from "fs-extra";
import { dedent, noop } from "vtils";
export function createParamsRaw(token, ids, outDir) {
  var rootPath = process.cwd();
  return fsx.outputFile(
    `${rootPath}/params.js`,
    dedent`
      export const token = "${token}"
      export const ids = [${ids}]
      export const outDir = "${outDir}"
    `
  );
}

export function createYttConfigRaw() {
  var rootPath = process.cwd();

  return fsx.copySync(
    `${rootPath}/ytt.config.js`,
    dedent`
      import { defineConfig, QueryStringArrayFormat } from "yapi-to-typescript";
      import { token, ids, outDir } from "./params.js";

      function createApiInterfaceName(interfaceInfo, changeCase) {
        // 取解析路径 + 文件名称
        const filePath = createOutFilePath(interfaceInfo, changeCase);
        const docName = createDocsName(interfaceInfo, changeCase);

        return \`\${changeCase.pascalCase(filePath)}\${changeCase.pascalCase(
          docName
        )}\${changeCase.pascalCase(interfaceInfo.method)}\`;
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
          queryStringArrayFormat: QueryStringArrayFormat.repeat,
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

            return \`src/ytt/\${outDir ? outDir : 'apis'}/\${filePath}/\${docs}.ts\`;
          },
          requestFunctionFilePath: "src/ytt/request.ts",

          getRequestDataTypeName: (interfaceInfo, changeCase) => {
            return \`\${createApiInterfaceName(interfaceInfo, changeCase)}Request\`;
          },

          getResponseDataTypeName: (interfaceInfo, changeCase) => {
            return \`\${createApiInterfaceName(interfaceInfo, changeCase)}Response\`;
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
                    return \`\${changeCase.camelCase(
                      interfaceInfo.path
                    )}\${changeCase.pascalCase(interfaceInfo.method)}\`;
                  },
                },
              ],
            },
          ],
        },
      ]);
    `
  );
}
export function createRequestRaw(path) {
  var rootPath = process.cwd();
  fsx
    .outputFile(
      path,
      dedent`
      import { RequestBodyType, RequestFunctionParams } from 'yapi-to-typescript';
      import { fetch } from '@maxtropy/components';
      
      export interface RequestOptions {
        /**
         * 使用的服务器。
         *
         * - \`prod\`: 生产服务器
         * - \`dev\`: 测试服务器
         * - \`mock\`: 模拟服务器
         *
         * @default prod
         */
        server?: 'prod' | 'dev' | 'mock';
      }
      
      export default function request<TResponseData>(
        payload: RequestFunctionParams,
        options: RequestOptions = {
          server: 'dev',
        }
      ): Promise<TResponseData> {
        // 基本地址
        const baseUrl =
          options.server === 'mock' ? payload.mockUrl : options.server === 'dev' ? payload.devUrl : payload.prodUrl;
      
        // 请求地址
        const url = \`\${baseUrl}\${payload.path}\`;
        const fetchOptions: RequestInit = {
          method: payload.method,
          body: payload.requestBodyType === RequestBodyType.json ? JSON.stringify(payload.data) : null,
        };
        // 具体请求逻辑
        return fetch(url, fetchOptions);
      }
    `
    )
    .then((_) => {
      // 删除ytt.config.js和params.js文件
      fsx.remove(`${rootPath}/params.js`).catch(noop);
      fsx.remove(`${rootPath}/ytt.config.js`).catch(noop);
    });
}
