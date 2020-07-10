import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/element.js";
import axios from "axios";
import VueJsonp from "vue-jsonp";

import "element-ui/lib/theme-chalk/index.css";
import "./assets/css/base.css";
import "./assets/css/global.less";
import "./assets/font/iconfont.css";

Vue.config.productionTip = false;
Vue.use(VueJsonp);

// 创建axios实例并挂载到原型
// axios.defaults.baseURL = "https://autumnfish.cn";
// axios.defaults.timeout = 30 * 1000;
// axios.defaults.withCredentials = true;
//将axios挂载到Vue实例中的$ajax上面,在项目中的任何位置通过this.$http使用
Vue.prototype.$http = axios;
// 定义全局时间过滤器
Vue.filter("date", function(value) {
	let date = new Date(value);
	let y = date.getFullYear();
	let m = date.getMonth() + 1;
	let d = date.getDate();
	let h = date.getHours();
	h = h < 10 ? "0" + h : h;
	let mm = date.getMinutes();
	mm = mm < 10 ? "0" + mm : mm;
	// return y + "年" + m + "月" + d + "日" + " " + h + ":" + mm;
	return `${y}年${m}月${d}日 ${h}:${mm}`;
});

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount("#app");
