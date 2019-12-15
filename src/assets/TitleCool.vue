<template>
  <span
    class="title"
    :style="{background:`linear-gradient(135deg,
          ${`rgba(0, 0, 0, 0)`} 0%,
          ${`rgba(0, 0, 0, 0)`} 30%,
          ${sc} 50%,
          ${ec} 70%,
          ${`rgba(0, 0, 0, 0)`} 100%)`,
          borderLeft:`solid 4px ${sc}`,
          padding:` 0px 10px 4px 6px`,
          borderRadius: `0px`}"
  >
    <slot></slot>
  </span>
</template>

<script>
let colors = require("@/web-config/color.js");
export default {
  name: "TitleCool",
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
