<template>
  <div class="hello">
    <h2>excel-to-josn</h2>
    <input
      type="file"
      ref="upload"
      accept=".xls, .xlsx"
      class="outputlist_upload"
      @change="upload"
    />
    <br />
    <br />
    <textarea name="" id="text" cols="100" rows="30"></textarea>
    <br />
    <br />
    <button class="btn" @click="copy" data-clipboard-target="#text">
      点击复制
    </button>
    <!-- <h2>josn-to-excel</h2>
    <textarea name="josnData" id="josn" cols="100" rows="30"></textarea>
    <br />
    <br />
    <button class="btn" @click="transfer">转化</button> -->
  </div>
</template>

<script>
import XLSX from "xlsx";
import Clipboard from "clipboard";
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      jsondata: {},
    };
  },
  methods: {
    upload(e) {
      //  var that = this;
      const files = e.target.files;
      const fileReader = new FileReader();
      fileReader.onload = (ex) => {
        try {
          const data = ex.target.result;
          const workbook = XLSX.read(data, {
            type: "binary",
          });
          const wsname = workbook.SheetNames[0]; //取第一张表
          const sheet2JSONOpts = {
            /** Default value for null/undefined values */
            defval: "", //给defval赋值为空的字符串
          };
          const ws = XLSX.utils.sheet_to_json(
            workbook.Sheets[wsname],
            sheet2JSONOpts
          ); //生成json表格内容

          Object.keys(ws[0]).forEach((key) => {
            if (key !== "id") {
              this.jsondata[key] = new Object();
            }
          });
          ws.forEach((item) => {
            Object.keys(item).forEach((key) => {
              if (key !== "id") {
                console.log(item[key]);
                // console.log(JSON.parse(item[key]));
                let trasnfer = null;
                try {
                  trasnfer = JSON.parse(item[key]);
                } catch (err) {
                  console.log("报错了");
                }
                this.jsondata[key][item["id"]] = trasnfer || item[key];
              }
            });
          });
          console.log("jsondata:", this.jsondata);
          document.getElementById("text").innerHTML = JSON.stringify(
            this.jsondata,
            null,
            4
          );
        } catch (error) {
          console.log(
            "🚀 ~ file: HelloWorld.vue ~ line 24 ~ upload ~ error",
            error
          );
        }
      };
      fileReader.readAsBinaryString(files[0]);
    },
    copy() {
      var clipboard = new Clipboard(".btn");
      //成功回调
      clipboard.on("success", function(e) {
        console.info("Action:", e.action);
        console.info("Text:", e.text);
        console.info("Trigger:", e.trigger);
        e.clearSelection();
      });
      //失败回调
      clipboard.on("error", function(e) {
        console.error("Action:", e.action);
        console.error("Trigger:", e.trigger);
      });
    },
    transfer() {
      let data = JSON.parse(
        JSON.stringify(document.getElementById("josn").value)
      );
      console.log(
        "🚀 ~ file: HelloWorld.vue ~ line 99 ~ transfer ~  document.getElementById('text').innerHTML ",
        data
      );
      // var wopts = {
      //   bookType: "xlsx",
      //   bookSST: false,
      //   type: "binary",
      // };
      // var workBook = {
      //   SheetNames: ["Sheet1"],
      //   Sheets: {},
      //   Props: {},
      // };
      // workBook.Sheets["Sheet1"] = XLSX.utils.json_to_sheet(data);
      //  return
      // this.saveAs(
      //   new Blob([this.changeData(XLSX.write(workBook, wopts))], {
      //     type: "application/octet-stream",
      //   })
      // );
    },
    // saveAs(obj, fileName) {
    //   //当然可以自定义简单的下载文件实现方式

    //   var tmpa = document.createElement("a");

    //   tmpa.download = fileName || "下载";
    //   tmpa.href = URL.createObjectURL(obj); //绑定a标签
    //   tmpa.click(); //模拟点击实现下载

    //   setTimeout(function () {
    //     //延时释放
    //     URL.revokeObjectURL(obj); //用URL.revokeObjectURL()来释放这个object URL
    //   }, 100);
    // },
    //     changeData(s) {

    //     //如果存在ArrayBuffer对象(es6) 最好采用该对象
    //     if (typeof ArrayBuffer !== 'undefined') {
    //         let i;
    //         //1、创建一个字节长度为s.length的内存区域
    //         var buf = new ArrayBuffer(s.length);

    //         //2、创建一个指向buf的Unit8视图，开始于字节0，直到缓冲区的末尾
    //         var view = new Uint8Array(buf);
    //         //3、返回指定位置的字符的Unicode编码
    //         for ( i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
    //         return buf;

    //     } else {
    //         let i ,buff = new Array(s.length);
    //         for ( i = 0; i != s.length; ++i) buf[i] = s.charCodeAt(i) & 0xFF;
    //         return buff;
    //     }
    // }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
button {
  width: 80px;
  height: 80px;
}
</style>
