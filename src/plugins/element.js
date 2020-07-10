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
	Dialog,
	Button,
	Input,
	Form,
	FormItem,
	Pagination,
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
Vue.use(Dialog);
Vue.use(Button);
Vue.use(Input);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Pagination);
Vue.component(CollapseTransition.name, CollapseTransition);
