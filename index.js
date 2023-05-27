#!/usr/bin/env node
const inquirer = require("inquirer");
const fs = require("fs");
const os = require("os");
inquirer
  .prompt([
    {
      type: "input",
      name: "token",
      message: "请输入token：(打开项目->设置->token配置->复制token)",
      validate: (val) => {
        return true;
      },
    },
    {
      type: "input",
      name: "catIds",
      message:
        "请输入输出类目id：(打开项目->点开分类->复制浏览器地址栏/api/cat_后面的数字)",
    },
    {
      type: "input",
      name: "outDir",
      message: "请输入输出资源文件保存目录：(例如：dist)",
    },
    {
      type: "rawlist",
      message: "图片资源是否生成绝对路径",
      name: "absPath",
      choices: [
        {
          key: "yes",
          name: "是",
          value: 1,
          checked: true, // 默认选中
        },
        {
          key: "no",
          name: "否",
          value: 2,
        },
      ],
    },
  ])
  .then(async (answers) => {
    console.log("answers", answers);
    var tokenVars = "export const token = " + answers.token;
    var idsArr = answers.catIds.trim().replace(/\s+/g, ",").split(",");
    var idsVars = `export const ids = [${idsArr}]`;
    let content = tokenVars + os.EOL + idsVars;
    fs.writeFile("params.js", content, "utf-8", function (err) {
      if (err) {
        console.log(err);
        return false;
      }
      console.log("获取参数成功!");
    });
  })
  .catch((e) => {
    console.log("错误信息：", e);
  });
