<!--
 * @Date: 2022-08-26 13:44:45
 * @LastEditors: wenfujie
 * @LastEditTime: 2022-08-26 15:52:15
 * @FilePath: /excel-to-json/src/App.vue
-->
<template>
  <div id="app">
    <button
      :class="['btn', { active: item.id === comName }]"
      v-for="item in btnConfig"
      :key="item.id"
      @click="switchCom(item.id)"
    >
      {{ item.text }}
    </button>
    <component :is="comName"></component>
  </div>
</template>

<script>
import TransformJson from "@/components/TransformJson.vue";
import GenUseCode from "@/components/GenUseCode.vue";

export default {
  name: "App",
  components: {
    TransformJson,
    GenUseCode
  },
  data() {
    return {
      comName: "GenUseCode"
    };
  },
  methods: {
    switchCom(comName) {
      this.comName = comName;
    }
  },
  created() {
    this.btnConfig = [TransformJson, GenUseCode].map((item) => {
      const { name } = item;
      return { id: name, text: name };
    });
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
ul {
  list-style-type: none;
}
.btn {
  margin: 8px;
}
.active {
  border: 2px solid black;
}
</style>
