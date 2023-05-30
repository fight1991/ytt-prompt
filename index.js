#!/usr/bin/env node

import inquirer from "inquirer";
import fs from "fs";
import fsx from "fs-extra";
import { dedent } from "vtils";
import childProcess from "child_process";
import { getAllDirbyFilename } from "./utils.js";

inquirer
  .prompt([
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
      message:
        "请输入输出资源文件保存目录:(例如:输入temp会保存在src/ytt/temp下)",
      validate: (val) => {
        if (val && !/^[0-9a-zA-Z]+$/.test(val)) return "目录名称不合法";
        return true;
      },
    },
  ])
  .then(async (answers) => {
    console.log("answers", answers);
    var idsArr = answers.catIds.trim().replace(/\s+/g, ",").split(",");
    var rootPath = process.cwd();
    try {
      console.log("正在初始化...");
      await fsx.outputFile(
        `${rootPath}/params.js`,
        dedent`
          export const token = "${answers.token}"
          export const ids = [${idsArr}]
          export const outDir = "${answers.outDir}"
      `
      );
      await fsx.outputFile(
        `${rootPath}/ytt.config.js`,
        dedent`
        import { defineConfig } from "yapi-to-typescript";
        import { token, ids } from "./params.js";

        function genApiInterfaceName(interfaceInfo, changeCase) {
          // 取解析路径dir最尾部的路径作为前缀路径
          const lastPath = interfaceInfo.parsedPath.dir.split("/").pop();
          // 拼接前缀路径+文件名称
          return \`\${changeCase.pascalCase(lastPath)}\${changeCase.pascalCase(
            interfaceInfo.parsedPath.name
          )}\${changeCase.pascalCase(interfaceInfo.method)}\`;
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
              return \`src/ytt/types/\${filePath}.ts\`;
            },
            requestFunctionFilePath: "src/ytt/request.ts",
        
            getRequestDataTypeName: (interfaceInfo, changeCase) => {
              return \`\${genApiInterfaceName(interfaceInfo, changeCase)}Request\`;
            },
        
            getResponseDataTypeName: (interfaceInfo, changeCase) => {
              return \`\${genApiInterfaceName(interfaceInfo, changeCase)}Response\`;
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
      childProcess.exec("npx ytt", (error, stdout, stderr) => {
        console.log(stdout, stderr);
        if (!error) {
          console.log("自动生成api文件成功");
          // 替换request文件
          var requestOldPath = getAllDirbyFilename(
            `${rootPath}/src`,
            "request.ts"
          )[0];
          fsx.outputFile(
            requestOldPath,
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
          );
        } else {
          console.log("自动生成api文件失败");
          console.log(error);
        }
      });
    } catch (error) {
      console.log(error);
    }
  })
  .catch((e) => {
    console.log("错误信息：", e);
  });
