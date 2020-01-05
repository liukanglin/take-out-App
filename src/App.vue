<template>
  <div id="app">
    <router-view />
    <footer-guide v-show="$route.meta.showFooter" />
  </div>
</template>

<script>
import Vue from "vue";
import { mapActions } from "vuex";
import { Button } from "mint-ui";
import FooterGuide from "./components/FooterGuide/FooterGuide";

// 注册全局组件
Vue.component(Button.name, Button); //mt-button

export default {
  name: "App",
  components: {
    FooterGuide
  },
  methods: {
    ...mapActions(["getAddress", "getCategorys", "getUser", "getShopInfo"])
  },
  created() {
    // this.$store.dispatch("getAddress");
    this.getAddress();
    this.getCategorys();
    this.getUser();
    this.getShopInfo();
  }
};
</script>

<style>
/* 设置全局样式解决谷歌浏览器双击报错 */
* {
  touch-action: none;
}
</style>

