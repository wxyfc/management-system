import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import './VuePrototype';
import './VueComponent';
import './VueFilters';
import './mock';

import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI, { size: 'mini', zIndex: 1023 });

import { fetchPost, fetchGet } from './http';
Vue.prototype.$Post = fetchPost;
Vue.prototype.$Get = fetchGet;

import "./allcss.css";
import "./font.css";
import './routeguard';//路由守卫
// import "./assets";//全局注册组件

// import mymixins from './mymixins';//全局Mixins函数
// Vue.mixin(mymixins);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
