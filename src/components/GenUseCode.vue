<template>
  <div>
    <div class="form">
      <textarea name="" id="text" cols="40" rows="20" v-model="json"></textarea>
      <ul>
        <li v-for="(str, index) in codeList" :key="index" v-html="str"></li>
      </ul>
    </div>
    <br />
    <br />
    <button @click="genCode">生成调用代码</button>
  </div>
</template>

<script>
import { GenUseCodeJson } from "@/utils/testData.js";
export default {
  name: "GenUseCode",
  components: {},
  data() {
    return {
      codeList: [], // 生成的code
      json: ""
    };
  },
  methods: {
    genCode() {
      const json = JSON.parse(this.json);
      const list = this.genObjChain(json);
      this.codeList = list.map(
        (item) => `this.$t('${item.key}')<br>${item.val}`
      );
    },
    genObjChain(obj, prefix = "") {
      const list = [];
      // 使用keys保证遍历顺序
      const keys = Object.keys(obj);
      keys.forEach((key) => {
        const item = obj[key];
        const joinPrefix = prefix ? `${prefix}.${key}` : key;

        if (!!item && typeof item === "object") {
          list.push(...this.genObjChain(item, joinPrefix));
        } else {
          list.push({ key: joinPrefix, val: item });
        }
      });
      return list;
    }
  },
  created() {
    this.json = JSON.stringify(GenUseCodeJson, null, 2);
  }
};
</script>
<style scoped>
.form {
  display: flex;
  justify-content: space-around;
}
</style>
