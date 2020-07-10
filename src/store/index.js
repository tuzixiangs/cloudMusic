import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		index: 1,
		url: "",
		// 播放按钮控制
		play: true,
	},
	mutations: {
		updatedIndex(state, num) {
			state.index = num;
		},
		updatedUrl(state, url) {
			state.url = url;
		},
		updatePlay(state, play) {
			state.play = play;
		},
	},
	actions: {},
	modules: {},
});
