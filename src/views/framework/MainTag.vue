<template>
  <div class="th4 mainTag">
    <fragment v-for="(tag,key) in routerTag" :key="key">
      <el-tag
        v-if="!tag.meta.noQuickTabs"
        :closable="closable"
        disable-transitions
        :color=" tag.path == $route.path ? otherInfo.themeBackgroundColor : '#C0C4CC' "
        @click="TagClick(key)"
        @close="TagClose(tag)"
        style="margin-right:0.2vw"
        :style="{cursor: tag.path == $route.path ? `not-allowed` : `pointer`}"
        class="emphasize"
        :size="size"
      >
        <span :style="{ color: tag.path == $route.path ? otherInfo.themeTextColor : '#909399' }">
          <mi :icon="tag.meta.icon" iconClass></mi>
          {{language[key]}}
        </span>
      </el-tag>
    </fragment>
  </div>
</template>

<script>
export default {
  mixins: [require("@/mymixins").default],
  name: "mainTag",
  computed: {
    routerTag() {
      let obj = {};
      let rh = this.otherInfo.routerHistory;
      for (let k in rh) {
        if (!rh[k].meta.noQuickTabs) {
          this.$set(obj, k, rh[k]);
        }
      }
      return obj;
    },
    closable() {
      return Object.keys(this.otherInfo.routerHistory).length > 1;
    },
    size() {
      return this.otherInfo.menuCollapse ? "mini" : "medium";
    }
  },
  methods: {
    TagClose(t) {
      let r = this.otherInfo.routerHistory;
      this.$delete(r, t.name);
      let rk = Object.keys(r);
      let rkl = rk.length;
      if (t.path == this.$route.path) {
        if (rkl > 0) {
          this.$router.replace({ name: rk[rkl - 1] });
        } else {
          this.$router.go(-1);
        }
      }
    },
    TagClick(r) {
      this.$router.replace({ name: r });
    }
  }
};
</script>