<template>
  <span>
    <el-tooltip :content="tooltip" :disabled="tipDis" class="bttooltip">
      <i :class="[iconClass,icon]" :style="style" @click.stop="iconClick"></i>
    </el-tooltip>
  </span>
</template>

<script>
export default {
  mixins: [require("@/mymixins").default],
  name: "MyTooltipIcon",
  data() {
    return {
      tipDis: false
    };
  },
  props: {
    tooltip: {
      type: String,
      default: ""
    },
    icon: {
      type: String,
      default: "el-icon-question"
    },
    iconClass: {
      type: String,
      default: "icon"
    },
    style: {}
  },
  methods: {
    iconClick() {
      this.$emit("click", true);
    }
  },
  mounted() {
    if (this.tooltip == "") {
      this.tipDis = true;
    }
  }
};
</script>