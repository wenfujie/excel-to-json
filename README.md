<!--
 * @Date: 2021-04-28 21:15:28
 * @LastEditors: wenfujie
 * @LastEditTime: 2021-09-10 15:14:53
 * @FilePath: /excelToJson/excel-to-json/README.md
-->

## use

该demo功能：
- 动态生成多语言Excel
- 上传Excel文件，解析成json多语言模板

### 生成Excel

使用到npm包 `json2xls`

1. 将翻译 json 文件放置路径 `excel-to-json/server/data` 下
2. 终端进入路径 `excel-to-json/server/data` 并执行指令 `node index`
3. 可以在目录 `excel-to-json/server/data` 看到 `name.xlsx` 生成

### 将Excel文件转化为json

使用到npm包 `xlsx`

1. 运行指令 `npm run serve` 启动web项目
2. 在页面中上传 Excel 文件后，可看到解析后的内容
3. 将内容复制到其他工程使用即可