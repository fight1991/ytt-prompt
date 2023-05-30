#!/usr/bin/env node

import inquirer from "inquirer";
import childProcess from "child_process";
import { getAllDirbyFilename } from "./utils.js";
import {
  createParamsRaw,
  createYttConfigRaw,
  createRequestRaw,
} from "./createTemplateRaw.js";

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
  ])
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
          `${rootPath}/src`,
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
