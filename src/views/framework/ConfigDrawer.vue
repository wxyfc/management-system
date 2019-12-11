<template>
  <el-drawer
    :size=" otherInfo.menuCollapse ? '75%' : '35%' "
    :visible="otherInfo.drawerVisible"
    :direction="otherInfo.drawerDirection"
    :modal="true"
    :show-close="true"
    :append-to-body="false"
    :close-on-press-escape="false"
    :before-close="closeDrawer"
    :destroy-on-close="true"
  >
    <el-form label-width="30%">
      <el-form-item>
        <span slot="label" class="emphasize">{{language.themeBackgroundColor}}</span>
        <el-color-picker v-model="themeBackgroundColor" :disabled="configThemeDisabled"></el-color-picker>
      </el-form-item>
      <el-form-item>
        <span slot="label" class="emphasize">{{language.themeTextColor}}</span>
        <el-color-picker v-model="themeTextColor" :disabled="configThemeDisabled"></el-color-picker>
      </el-form-item>
      <el-form-item>
        <span slot="label" class="emphasize">{{language.presetTheme}}</span>
        <el-col :span="2" v-for="(item,index) in otherInfo.themePresetList" :key="index">
          <span
            :style="{background:`linear-gradient(135deg,
          ${item.themeBackgroundColor} 0%,
          ${item.themeBackgroundColor} 50%,
          ${item.themeTextColor} 51%,
          ${item.themeTextColor} 100%)`}"
            class="themeSpan inblock"
            @click="clickThemePreset(item)"
          ></span>
        </el-col>
      </el-form-item>
      <el-form-item>
        <span slot="label" class="emphasize">{{language.homeQuickNav}}</span>
        <el-switch v-model="homeQuickNav"></el-switch>
      </el-form-item>
      <el-form-item>
        <span slot="label" class="emphasize">{{language.tableSelfAW}}</span>
        <el-switch v-model="tableSelfAW"></el-switch>
      </el-form-item>
      <el-form-item>
        <span slot="label" class="emphasize">{{language.menuUnique}}</span>
        <el-switch v-model="menuUnique"></el-switch>
      </el-form-item>
      <el-form-item>
        <span
          slot="label"
          class="emphasize"
        >{{rightClickMenu?language.rightClickMenu:language.systemClickMenu}}</span>
        <el-switch v-model="rightClickMenu"></el-switch>
      </el-form-item>
      <el-form-item>
        <span slot="label" class="emphasize">{{language.tableSwitch}}</span>
        <el-switch v-model="tableNotShow"></el-switch>
      </el-form-item>
      <el-form-item>
        <span slot="label" class="emphasize">{{language.selectLanguage}}</span>
        <SelectLanguage></SelectLanguage>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<script>
export default {
  mixins: [require("@/mymixins").default],
  name: "drawer",
  data() {
    return {};
  },
  components: {
    SelectLanguage: () => import("@/assets/SelectLanguage")
  },
  computed: {
    homeQuickNav: {
      get() {
        return this.otherInfo.homeQuickNav;
      },
      set(v) {
        this.setOtherInfo({ homeQuickNav: v });
      }
    },
    tableSelfAW: {
      get() {
        return this.otherInfo.tableSelfAW;
      },
      set(v) {
        this.setOtherInfo({ tableSelfAW: v });
      }
    },
    menuUnique: {
      get() {
        return this.otherInfo.menuUnique;
      },
      set(v) {
        this.setOtherInfo({ menuUnique: v });
      }
    },
    tableNotShow: {
      get() {
        return !this.otherInfo.tableNotShow;
      },
      set(v) {
        this.setOtherInfo({ tableNotShow: !v });
      }
    },
    rightClickMenu: {
      get() {
        return this.otherInfo.rightClickMenu;
      },
      set(v) {
        this.setOtherInfo({ rightClickMenu: v });
      }
    },
    configThemeDisabled() {
      let d = this.otherInfo.configThemeDisabled;
      return d;
    },
    themeBackgroundColor: {
      get() {
        let c = this.otherInfo.themeBackgroundColor;
        return c;
      },
      set(v) {
        this.setOtherInfo({ themeBackgroundColor: v });
      }
    },
    themeTextColor: {
      get() {
        let c = this.otherInfo.themeTextColor;
        return c;
      },
      set(v) {
        this.setOtherInfo({ themeTextColor: v });
      }
    }
  },
  methods: {
    clickThemePreset(item) {
      this.setOtherInfo({
        themeBackgroundColor: item.themeBackgroundColor,
        themeTextColor: item.themeTextColor
      });
    },
    closeDrawer(d) {
      this.setOtherInfo({ drawerVisible: !this.otherInfo.drawerVisible });
      d();
    }
  }
};
</script>