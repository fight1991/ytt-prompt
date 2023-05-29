import fs from "fs";
import path from "path";

/**
 * 查询目标 目录下所有文件或文件夹名为 filename 的文件路径
 * @param {String} dir  查询目录
 * @param {String} filename  查询文件的名称
 * @returns {Array} 所有满足条件的文件路径
 */
export function getAllDirbyFilename(dir, filename) {
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

/**
 * 将指定src目录下的所有文件剪切到指定目标dest目录下
 * @param src 源目录
 * @param dest 目标目录
 */
export function copyDirectory(src, dest) {
  var files = fs.readdirSync(src);
  files.forEach((item, index) => {
    var itemPath = path.join(src, item);
    var itemStat = fs.statSync(itemPath); // 获取文件信息
    var savedPath = path.join(dest, itemPath.replace(src, ""));
    var savedDir = savedPath.substring(0, savedPath.lastIndexOf("\\"));
    if (itemStat.isFile()) {
      // 如果目录不存在则进行创建
      if (!fs.existsSync(savedDir)) {
        fs.mkdirSync(savedDir, { recursive: true });
      }
      // 写入到新目录下
      var data = fs.readFileSync(itemPath);
      fs.writeFileSync(savedPath, data);
      // 并且删除原文件
      fs.unlinkSync(itemPath);
    } else if (itemStat.isDirectory()) {
      copyDirectory(itemPath, path.join(savedDir, item));
    }
  });
  // 并且删除原目录
  fs.rmdirSync(src);
}

/**
 * 删除指定目录下所有文件和目录
 * @param dir 指定目录
 */
export function delDirectory(dir) {
  let files = [];
  if (fs.existsSync(dir)) {
    files = fs.readdirSync(dir);
    files.forEach((file, index) => {
      let curPath = path.join(dir, file);
      var stat = fs.statSync(curPath);
      if (stat.isDirectory()) {
        delDirectory(curPath); //递归删除文件夹
      } else if (stat.isFile()) {
        fs.unlinkSync(curPath); //删除文件
      }
    });
    fs.rmdirSync(dir);
  }
}
