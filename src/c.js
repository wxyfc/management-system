import Vue from 'vue'
Vue.component("mt", () => import("@/assets/Title"))
Vue.component("mdb", () => import("@/assets/MyDisabledButton"))
Vue.component("mi", () => import("@/assets/MyTooltipIcon"))

import Fragment from "vue-fragment"
Vue.use(Fragment.Plugin)