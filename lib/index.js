#!/usr/bin/env node
'use strict';

var inquirer = require('inquirer');
var childProcess = require('child_process');
var fs = require('fs');
var path = require('path');
var fsx = require('fs-extra');
var vtils = require('vtils');

/**
 * 查询目标 目录下所有文件或文件夹名为 filename 的文件路径
 * @param {String} dir  查询目录
 * @param {String} filename  查询文件的名称
 * @returns {Array} 所有满足条件的文件路径
 */
function getAllDirbyFilename(dir, filename) {
  let dirPath = path.resolve(__dirname, dir);

  let files = fs.readdirSync(dirPath); // 该文件夹下的所有文件名称 (文件夹 + 文件)
  let resultArr = [];

  files.forEach((file) => {
    let filePath = dir + "/" + file; // 当前文件 | 文件夹的路径

    // 满足查询条件文件
    if (file === filename) {
      return resultArr.push(filePath);
    }

    // 继续深搜文件夹
    if (fs.statSync(filePath).isDirectory()) {
      resultArr.push(...getAllDirbyFilename(filePath, filename));
    }
  });

  return resultArr;
}

var promptList = [
  {
    type: "input",
    name: "token",
    message: "请输入token:(打开项目->设置->token配置->复制token)",
    validate: (val) => {
      if (!val) return "请输入token";
      return true;
    },
  },
  {
    type: "input",
    name: "catIds",
    message:
      "请输入分类id:(打开项目->点开分类->复制浏览器地址栏/api/cat_后面的数字, 如果输入多个id以空格隔开)",
    validate: (val) => {
      // 输入12 或44 99 55
      if (!val) return "请输入id";
      if (typeof val === "string") {
        let arr = val.replace(/\s+/g, ",").split(",");
        let error = arr.some((v) => isNaN(Number(v)));
        if (error) {
          return "请输入合法的id";
        }
      }
      return true;
    },
  },
  {
    type: "input",
    name: "outDir",
    message: "请输入输出资源文件保存目录:(默认保存在src/ytt/apis下)",
    validate: (val) => {
      if (val && !/^[0-9a-zA-Z]+$/.test(val)) return "目录名称不合法";
      return true;
    },
  },
  {
    type: "confirm",
    message: "请再次确认是否自动生成",
    name: "result",
  },
];

function createParamsRaw(token, ids, outDir) {
  var rootPath = process.cwd();
  return fsx.outputFile(
    `${rootPath}/params.js`,
    vtils.dedent`
      export const token = "${token}"
      export const ids = [${ids}]
      export const outDir = "${outDir}"
    `
  );
}

function createYttConfigRaw() {
  var rootPath = process.cwd();
  return fsx.outputFile(
    `${rootPath}/ytt.config.js`,
    vtils.dedent`
      import { defineConfig } from "yapi-to-typescript";
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

            return \`src/ytt/\${outDir ? outDir : 'apis'}/\${filePath}.ts\`;
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
function createRequestRaw(path) {
  var rootPath = process.cwd();
  fsx
    .outputFile(
      path,
      vtils.dedent`
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
      fsx.remove(`${rootPath}/params.js`).catch(vtils.noop);
      fsx.remove(`${rootPath}/ytt.config.js`).catch(vtils.noop);
    });
}

inquirer
  .prompt(promptList)
  .then(async (answers) => {
    console.log("answers", answers);
    if (!answers.result) return;
    var idsArr = answers.catIds.trim().replace(/\s+/g, ",").split(",");
    var rootPath = process.cwd();
    try {
      console.log("正在初始化...");
      await createParamsRaw(answers.token, idsArr, answers.outDir);
      await createYttConfigRaw();
      childProcess.exec("npx ytt", (error, stdout, stderr) => {
        console.log("stdout", stdout);
        console.log("stderr", stderr);
        if (error) {
          console.log("自动生成api文件失败");
          console.log(error);
          return;
        }

        // 替换request文件
        var requestOldPath = getAllDirbyFilename(
          `${rootPath}/src/ytt`,
          "request.ts"
        )[0];
        createRequestRaw(requestOldPath);
      });
    } catch (error) {
      console.log("error", error);
    }
  })
  .catch((e) => {
    console.log("错误信息：", e);
  });
