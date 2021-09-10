/*
 * @Author: your name
 * @Date: 2021-06-29 13:53:17
 * @LastEditTime: 2021-09-10 13:45:20
 * @LastEditors: wenfujie
 * @Description: In User Settings Edit
 * @FilePath: /excelToJson/excel-to-json/server/index.js
 */

const fs = require("fs");
const json2xls = require("json2xls");
const path = require("path");
let dataObj = {};
let langObj = [];
fs.readdir(path.resolve(__dirname, "./data"), (err, files) => {
  if (err) throw err;
  generateTable(files);
});
function generateTable(dir) {
  // data目录下的文件
  dir.forEach(async (file, index) => {
    getFileData(file, index);
  });
}
function getFileData(file, index) {
  let lang = file.split(".")[0];
  langObj.push(lang);

  //异步读取文件内容
  fs.readFile(
    path.resolve(__dirname, `./data/${file}`),
    "utf8",
    (err, data) => {
      if (err) throw err;
      // 收集全部的翻译文本
      dataObj[lang] = JSON.parse(data);
      if (index === langObj.length - 1) {
        //写入
        writeFileData(dataObj);
      }
    }
  );
}

function writeFileData(dataObj) {
  console.log(
    "🚀 ~ file: index.js ~ line 44 ~ writeFileData ~ dataObj",
    dataObj
  );
  const jsonArray = [];
  //拿一个对象 取出所有的字段
  let obj = dataObj[langObj[0]];
  Object.keys(obj).forEach((key) => {
    let temp = {},
      item = {};
    langObj.forEach((lang) => {
      item[lang] = dataObj[lang][key];
    });
    // 是个对象
    if (obj[key] instanceof Object) {
      temp = {
        id: key,
        ...item,
      };
    } else {
      temp = {
        id: key,
        ...item,
      };
    }
    jsonArray.push(temp);
  });
  let xls = json2xls(jsonArray);
  fs.writeFileSync(path.resolve(__dirname, "name.xlsx"), xls, "binary");
}

// fs.readFile(path.resolve(__dirname, "./data/tu.json"), "utf8", (err, data) => {
//   if (err) throw err;
//   const obj = JSON.parse(data);
//   const jsonArray = [];
//   Object.keys(obj).forEach((key) => {
//     let temp;
//     if (obj[key] instanceof Object) {
//        temp = {
//         id: key,
//         en: JSON.stringify(obj[key]),
//       };
//     } else {
//        temp = {
//         id: key,
//         tu: obj[key],
//       };
//     }

//     jsonArray.push(temp);
//   });
//   console.log("🚀 ~ file: index.js ~ line 17 ~ fs.readFile ~ json", jsonArray);
//   let xls = json2xls(jsonArray);
//   fs.writeFileSync(path.resolve(__dirname, "name.xlsx"), xls, "binary");
// });
