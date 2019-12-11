<template>
  <span>
    <el-divider content-position="left">
      <mi icon="el-icon-scissors" iconClass></mi>
      <span class="normal">{{language.printBodyTips}}</span>
    </el-divider>
    <span id="PrintBody">
      <slot></slot>
    </span>
    <el-divider content-position="right">
      <span class="normal">{{language.printBodyTips}}</span>
      <mi icon="el-icon-scissors" iconClass></mi>
    </el-divider>
  </span>
</template>

<script>
export default {
  name: "PrintBody",
  computed: {
    language() {
      return this.$store.getters.getLanguage;
    }
  }
};
</script>