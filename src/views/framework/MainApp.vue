<template >
  <div class="shadow mainAppContent w100 h100" style="overflow: auto;">
    <!-- <transition
      name="mainapp-classes-transition"
      enter-active-class="animated zoomInDown"
      leave-active-class="animated zoomOutDown"
      :duration="{ enter: 500, leave: 500 }"
      mode="out-in"
    >-->
    <keep-alive :include="include">
      <router-view class="w100 h100" :key="key"/>
    </keep-alive>
    <!-- </transition> -->
  </div>
</template>

<script>
export default {
  name: "mainApp",
  computed: {
    include() {
      let list = [];
      let rh = this.otherInfo.routerHistory;
      for (let k in rh) {
        if (!rh[k].meta.noKeepAlive) {
          list.push(k);
        }
      }
      return list;
    },
    otherInfo() {
      return this.$store.getters.getOtherInfo;
    },
    key() {
      return this.$route.name;
    }
  }
};
</script>