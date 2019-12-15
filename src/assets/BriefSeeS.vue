<template>
  <el-card
    shadow="always"
    :body-style="{ padding: '0.52083vw',color:iBsColor,background: bsSmall ? '' : iBsBackground }"
    @mouseover.native="bsMove"
    @mouseout.native="bsMove"
  >
    <el-row type="flex" align="middle" justify="space-between" style="height:4vh">
      <el-col
        :span="5"
        :style="{ background:false ? iBsBackground : '',borderRadius: '0.52083vw',textAlign:'center',fontSize: '3.62962vh'}"
        :class="bsIcon"
      ></el-col>
      <el-col
        :span="19"
        :style="{textAlign:'right',fontSize:'1.25vw',fontWeight:'530',color: bsSmall ? bsColor : iBsColor }"
      >
        {{bsTitle}}
        <CountTo :start-val="0" :end-val="bsCountTo.end" :duration="4000" :decimals="bsCountTo.dec"></CountTo>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
let colors = require("@/web-config/color.js");
export default {
  components: {
    CountTo: () => import("vue-count-to")
  },
  name: "BriefSeeS",
  data() {
    return {
      isMove: false
    };
  },
  props: {
    bsColor: {
      type: String,
      default: () => {
        return colors[Math.ceil(Math.random() * colors.length - 1)];
      }
    },
    bsBackground: {
      type: String,
      default: () => {
        return colors[Math.ceil(Math.random() * colors.length - 1)];
      }
    },
    bsIcon: {
      type: String,
      default: "el-icon-loading"
    },
    bsTitle: {
      type: String,
      default: "此处是文字"
    },
    bsCountTo: {
      type: Object,
      default: () => ({ end: 100, dec: 0 })
    },
    bsSmall: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    iBsBackground() {
      return this.isMove ? this.bsColor : this.bsBackground;
    },
    iBsColor() {
      return this.isMove ? this.bsBackground : this.bsColor;
    }
  },
  watch: {},
  methods: {
    bsMove(e) {
      this.isMove = !this.isMove;
    }
  }
};
</script>