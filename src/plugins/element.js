import Vue from "vue";
import {
	Tabs,
	TabPane,
	Carousel,
	CarouselItem,
	Card,
	// Row,
	// Col,
	Scrollbar,
	Image,
} from "element-ui";
import CollapseTransition from "element-ui/lib/transitions/collapse-transition";

Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Card);
// Vue.use(Row);
// Vue.use(Col);
Vue.use(Scrollbar);
Vue.use(Image);
Vue.component(CollapseTransition.name, CollapseTransition);
