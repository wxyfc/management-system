<template>
  <div :style="{backgroundColor:otherInfo.themeBackgroundColor }">
    <el-row type="flex" align="middle" class="hh5">
      <el-col :xs="18" :sm="18" :md="20" :lg="20" :xl="20">
        <i
          :class="iClassAsideVisible"
          class="icon"
          :style="{color:otherInfo.themeTextColor}"
          @click="iClassAsideVisibleOnClick"
        ></i>
        <i
          :class="iClassMenuCollapse"
          class="icon"
          :style="{color:otherInfo.themeTextColor}"
          @click="iClassMenuCollapseOnClick"
        ></i>
      </el-col>
      <el-col :xs="2" :sm="2" :md="1" :lg="1" :xl="1">
        &nbsp;
        <mi
          icon="el-icon-setting"
          :tooltip="language.openSetUp"
          :style="{color:otherInfo.themeTextColor}"
          @click="iClassDrawerCollapseOnClick"
        ></mi>
      </el-col>
      <el-col :xs="2" :sm="2" :md="1" :lg="1" :xl="1">
        <el-dropdown :size="otherInfo.menuCollapse?'medium':'default'" @command="noticeSelect">
          <el-badge is-dot>
            <i class="el-icon-bell icon" :style="{color:otherInfo.themeTextColor}"></i>
          </el-badge>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              v-for="(item) in noticeMenuList"
              :key="item.command"
              :command="item.command"
              icon="el-icon-chat-dot-square"
            >
              <span class="emphasize">{{item.title}}</span>
            </el-dropdown-item>
            <el-dropdown-item command="systemLog" divided icon="el-icon-chat-line-square">
              <span class="emphasize">{{language.systemLog}}</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
      <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
        <el-dropdown :size="otherInfo.menuCollapse?'medium':'default'" @command="menuSelect">
          <span class="emphasize" :style="{color:otherInfo.themeTextColor}">
            <i class="el-icon-user icon"></i>
            {{userInfo.userName}}
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              v-for="(item) in mainMenuList"
              :key="item.route"
              :command="item.route"
              :icon="item.icon"
            >
              <span class="emphasize">{{language[item.title]}}</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
    <ConfigDrawer v-if="otherInfo.drawerVisible"></ConfigDrawer>
  </div>
</template>

<script>
export default {
  mixins: [require("@/mymixins").default],
  name: "mainHeader",
  data() {
    return {
      mainMenuList: [
        {
          icon: "el-icon-switch-button",
          title: "signOut",
          route: "login"
        }
      ]
    };
  },
  components: {
    ConfigDrawer: () => import("@/views/framework/ConfigDrawer")
  },
  computed: {
    iClassAsideVisible() {
      return this.otherInfo.asideVisible
        ? "el-icon-s-fold"
        : "el-icon-s-unfold";
    },
    iClassMenuCollapse() {
      return this.otherInfo.menuCollapse ? "el-icon-s-grid" : "el-icon-menu";
    },
    noticeMenuList() {
      return [{ title: this.language.unreadMessage, command: "read" }];
    }
  },
  watch: {
    "otherInfo.themeTextColor": {
      deep: true,
      // immediate: true,
      handler(newv, oldv) {
        this.$addCSS(
          `.el-badge__content{ background-color:${this.$ColorReverse(
            this.otherInfo.themeTextColor
          )};}`
        );
      }
    }
  },
  methods: {
    menuSelect(name) {
      this.$router.replace({ name });
    },
    noticeSelect(i) {
      if (i == "systemLog") {
        this.$router.replace({ name: i });
      }
    },
    iClassAsideVisibleOnClick() {
      this.setOtherInfo({ asideVisible: !this.otherInfo.asideVisible });
    },
    iClassMenuCollapseOnClick() {
      this.setOtherInfo({ menuCollapse: !this.otherInfo.menuCollapse });
    },
    iClassDrawerCollapseOnClick() {
      this.setOtherInfo({ drawerVisible: !this.otherInfo.drawerVisible });
    }
  }
};
</script>