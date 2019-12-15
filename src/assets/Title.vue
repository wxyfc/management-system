<template>
  <div>
    <el-divider content-position="left">
      <el-divider direction="vertical"></el-divider>
      <span class="title">
        <slot></slot>
      </span>
      <el-divider direction="vertical"></el-divider>
    </el-divider>
  </div>
</template>

<script>
let colors = require("@/web-config/color.js");
export default {
  name: "Title",
  data() {
    return {};
  },
  props: {
    sc: {
      type: String,
      default: () => {
        // 'rgba(0, 0, 0, 0)'
        return colors[Math.ceil(Math.random() * colors.length - 1)];
      }
    },
    ec: {
      type: String,
      default: () => {
        return colors[Math.ceil(Math.random() * colors.length - 1)];
      }
    }
  }
};
</script>
