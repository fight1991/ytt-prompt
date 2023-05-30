#!/usr/bin/env node

import inquirer from "inquirer";
import fs from "fs";
import os from "os";
import path from "path";
import childProcess from "child_process";
import { getAllDirbyFilename, copyDirectory } from "./utils.js";

inquirer
  .prompt([
    {
      type: "input",
      name: "token",
      message: "请输入token：(打开项目->设置->token配置->复制token)",
      validate: (val) => {
        if (!val) return "请输入token";
        return true;
      },
    },
    {
      type: "input",
      name: "catIds",
      message:
        "请输入分类id：(打开项目->点开分类->复制浏览器地址栏/api/cat_后面的数字, 如果输入多个id以空格隔开)",
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
        "请输入输出资源文件保存目录：(例如：输入temp会保存在src/ytt/temp下)",
      validate: (val) => {
        if (val && !/^[0-9a-zA-Z]+$/.test(val)) return "目录名称不合法";
        return true;
      },
    },
  ])
  .then(async (answers) => {
    console.log("answers", answers);
    var tokenVars = `export const token = "${answers.token}"`;
    var idsArr = answers.catIds.trim().replace(/\s+/g, ",").split(",");
    var idsVars = `export const ids = [${idsArr}]`;
    var content = tokenVars + os.EOL + idsVars;

    fs.writeFile("params.js", content, "utf-8", function (err) {
      if (err) {
        console.log(err);
        return false;
      }
      console.log("获取参数成功!");
      childProcess.exec("npx ytt", (error, stdout, stderr) => {
        console.log(stdout, stderr);
        if (!error) {
          console.log("自动生成api文件成功");
          // 替换request文件
          var requestTemplate = fs.readFileSync(
            "./request.template.ts",
            "utf8"
          );
          var requestOldPath = getAllDirbyFilename("src", "request.ts")[0];
          fs.writeFileSync(requestOldPath, requestTemplate, "utf8");

          // 将src下的文件输出到当前node进程目录
          // copyDirectory("./src", process.cwd() + "/test");
        } else {
          console.log("自动生成api文件失败");
          console.log(error);
        }
      });
    });
  })
  .catch((e) => {
    console.log("错误信息：", e);
  });
