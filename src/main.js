import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/element.js";
import axios from "axios";

import "element-ui/lib/theme-chalk/index.css";
import "./assets/css/base.css";
import "./assets/css/global.less";
import "./assets/font/iconfont.css";

Vue.config.productionTip = false;

// 创建axios实例并挂载到原型
axios.defaults.baseURL = "https://autumnfish.cn";
axios.defaults.timeout = 30 * 1000;
//将axios挂载到Vue实例中的$ajax上面,在项目中的任何位置通过this.$http使用
Vue.prototype.$http = axios;

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount("#app");
