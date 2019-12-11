<template>
  <el-menu
    :default-active="$route.path"
    :collapse="otherInfo.menuCollapse"
    :background-color="otherInfo.themeBackgroundColor"
    :text-color="otherInfo.themeTextColor"
    :active-text-color="activeColor"
    :unique-opened="otherInfo.menuUnique"
    router
    class="h997 overflowauto"
  >
    <el-menu-item index="logo" style="padding:0;pointerEvents:none">
      <img
        width="100%"
        height="100%"
        :src="'http://www.powerbee.cn/design/pic/logo.png'"
        style="object-fit:contain"
      >
      <!-- :width="otherInfo.menuCollapse?`100%`:`100%`" -->
      <!-- :style="otherInfo.menuCollapse?'transform:scale(0.9)':'transform:scale(0.9)'" -->
      <!-- <span slot="title" class="emphasize">{{userInfo.headerTitle}}</span> -->
    </el-menu-item>
    <!-- <el-menu-item index="cooplogo" style="padding:0;pointerEvents:none"> -->
    <!-- <img
        width="100%"
        height="100%"
        :src="'http://www.abchina.com/cn/images/logo_ue2.png'"
        style="object-fit:contain"
    >-->
    <!-- :width="otherInfo.menuCollapse?`100%`:`100%`" -->
    <!-- :style="otherInfo.menuCollapse?'transform:scale(0.9)':'transform:scale(0.9)'" -->
    <!-- <span slot="title" class="emphasize">{{userInfo.cooperativePartner}}</span> -->
    <!-- </el-menu-item> -->
    <RecursionMenu :mList="menuList" :activeColor="activeColor"></RecursionMenu>
  </el-menu>
  <!-- <keep-alive> </keep-alive> <component></component> -->
</template>

<script>
export default {
  mixins: [require("@/mymixins").default],
  name: "mainMenu",
  components: {
    RecursionMenu: () => import("@/views/framework/RecursionMenu")
  },
  computed: {
    menuList() {
      let that = this;
      let allMenuList = that.otherInfo.userRoutes;
      let menuList = that.handFor(allMenuList);
      return menuList;
    },
    activeColor() {
      return "#1bb8ce";
      return this.$ColorReverse(this.otherInfo.themeTextColor);
    }
  },
  methods: {
    handFor(l) {
      let that = this;
      let ur = that.userInfo.userRole;
      let lm = [];
      l.forEach(e => {
        if (e.meta.icon && e.meta.role.includes(ur)) {
          if (e.children && e.children.length > 0) {
            that.$set(e, "children", that.handFor(e.children));
          }
          lm.push(e);
        }
      });
      return lm;
    }
  }
};
</script>