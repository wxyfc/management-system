<template>
  <el-row
    type="flex"
    align="middle"
    class="hh5"
    :style="{backgroundColor:otherInfo.themeBackgroundColor }"
  >
    <el-col
      :xs="12"
      :sm="{span: 16, offset: 1}"
      :lg="{span: 16, offset: 2}"
      :xl="{span: 16, offset: 3}"
    >
      <b class="emphasize" :style="{color:otherInfo.themeTextColor}">{{userInfo.headerTitle}}</b>
    </el-col>
    <el-col :xs="6" :sm="4" :lg="3" :xl="2">
      <mdb
        type="text"
        class="emphasize"
        autofocus
        :style="{color:otherInfo.themeTextColor}"
        @click="getInto"
      >{{language.getInto}}</mdb>
    </el-col>
    <el-col :xs="6" :sm="3" :lg="2" :xl="2" class="alnrit">
      <el-dropdown :size="otherInfo.menuCollapse?'medium':'default'" @command="menuSelect">
        <span class="emphasize" :style="{color:otherInfo.themeTextColor}">
          <mi icon="el-icon-user"></mi>
          {{userInfo.userName}}
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-for="(item) in otherInfo.helloMenuList"
            :key="item.route"
            :command="item.route"
            :icon="item.icon"
          >
            <span class="emphasize">{{language[item.title]}}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- <el-tooltip effect="light">
        <el-menu slot="content" :collapse="otherInfo.menuCollapse" @select="menuSelect">
          <el-menu-item
            v-for="(item) in otherInfo.helloMenuList"
            :key="item.route"
            :index="item.route"
          >
            <mi :icon="item.icon"></mi>
            <span slot="title" class="emphasize">{{language[item.title]}}</span>
          </el-menu-item>
        </el-menu>
        <mdb
          type="text"
          icon="el-icon-user"
          class="emphasize"
          :style="{color:otherInfo.themeTextColor}"
        >{{userInfo.userName}}</mdb>
      </el-tooltip>-->
    </el-col>
  </el-row>
</template>
<script>
export default {
  mixins: [require("@/mymixins").default],
  name: "helloHeader",
  data() {
    return {};
  },
  components: {},
  props: {},
  computed: {},
  watch: {},
  methods: {
    getInto() {
      this.$router.push({ name: "test" });
    },
    menuSelect(index, indexPath) {
      this.$router.push({ name: index });
    }
  }
};
</script>