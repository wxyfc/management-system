<template>
  <fragment>
    <template v-for="(mli,i) in mList">
      <el-submenu
        v-if="mli.children&&mli.children.length>1"
        :index="mli.path"
        :key="i+mList.length"
      >
        <template slot="title">
          <i :class="mli.meta.icon"></i>
          <!-- :style="{color:mli.path == $route.path ? activeColor : otherInfo.themeTextColor}" -->
          <span
            slot="title"
            :class="mli.path == $route.path ? 'title' : 'emphasize'"
          >{{language[mli.name]}}</span>
        </template>
        <recursionMenu style="margin-left:0.5vw" :mList="mli.children"></recursionMenu>
      </el-submenu>
      <el-menu-item v-else :index="mli.path" :key="i+mList.length">
        <i :class="mli.meta.icon"></i>
        <!-- :style="{color:mli.path == $route.path ?activeColor:otherInfo.themeTextColor}" -->
        <span
          slot="title"
          :class="mli.path == $route.path ? 'title' : 'emphasize'"
        >{{language[mli.name]}}</span>
      </el-menu-item>
    </template>
  </fragment>
</template>

<script>
export default {
  mixins: [require("@/mymixins").default],
  name: "recursionMenu",
  props: {
    activeColor: {
      type: String,
      default: ""
    },
    mList: {
      type: Array,
      default: []
    }
  }
};
</script>