import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
const FindMusic = () => import("../views/findMusic/FindMusic.vue");
const PrivateFm = () => import("../views/privateFM/PrivateFM.vue");
const LikeMusic = () => import("../views/likeMusic/LikeMusic.vue");

const routes = [
	{ path: "", redirect: "/findMusic" },
	{ path: "/findMusic", component: FindMusic },
	{ path: "/privateFm", component: PrivateFm },
	{ path: "/likeMusic", component: LikeMusic },
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});

export default router;
