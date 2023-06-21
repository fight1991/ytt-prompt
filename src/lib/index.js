#!/usr/bin/env node

import inquirer from "inquirer";
import childProcess from "child_process";
import { getAllDirbyFilename } from "./utils.js";
import promptList from "./promptList.js";
import {
  createParamsRaw,
  createYttConfigRaw,
  createRequestRaw,
} from "./createTemplateRaw.js";

const token = process.env.npm_config_token;
if (token) {
  // jenkins打包
  callYttFunction(token);
} else {
  inquirer
    .prompt(promptList)
    .then(async (answers) => {
      console.log("answers", answers);
      if (!answers.result) return;
      var idsArr = answers.catIds.trim().replace(/\s+/g, ",").split(",");
      callYttFunction(answers.token, idsArr, answers.outDir);
    })
    .catch((e) => {
      console.log("错误信息：", e);
    });
}

async function callYttFunction(token, idsArr = [0], outDir = "") {
  var rootPath = process.cwd();
  try {
    console.log("正在初始化...");
    await createParamsRaw(token, idsArr, outDir);
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
}
