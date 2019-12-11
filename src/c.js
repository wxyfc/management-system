import Vue from 'vue'
Vue.component("mt", () => import("@/assets/Title.vue"))
Vue.component("mdb", () => import("@/assets/MyDisabledButton.vue"))
Vue.component("mi", () => import("@/assets/MyTooltipIcon.vue"))

import Fragment from "vue-fragment"
Vue.use(Fragment.Plugin)