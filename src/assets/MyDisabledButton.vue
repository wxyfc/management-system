<template>
  <el-tooltip :content="tooltip" :disabled="tipDis" class="bttooltip">
    <div class="inblock" :style="longStyle">
      <el-button
        :type="type"
        :size="size"
        :icon="icon"
        :style="longStyle"
        :loading="handlerLoading"
        :disabled="handlerDisabled"
        @click="emtiClick"
      >
        <slot></slot>
      </el-button>
    </div>
  </el-tooltip>
</template>

<script>
export default {
  mixins: [require("@/mymixins").default],
  name: "myDisabledButton",
  data() {
    return {
      handlerDisabled: false,
      handlerLoading: false,
      tipDis: false
    };
  },
  computed: {
    longStyle() {
      let data = "";
      if (this.long == true) {
        data = "width:100%";
      }
      return data;
    }
  },
  props: {
    type: {
      type: String,
      default: "primary"
    },
    tooltip: {
      type: String,
      default: ""
    },
    size: {
      type: String,
      default: "mini"
    },
    icon: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    long: {
      type: Boolean,
      default: false
    },
    disabledTime: {
      type: Number,
      default: 2500
    }
  },
  watch: {
    disabled: {
      deep: true,
      immediate: true,
      handler(newv, oldv) {
        this.handlerDisabled = newv;
      }
    },
    loading: {
      deep: true,
      immediate: true,
      handler(newv, oldv) {
        this.handlerLoading = newv;
      }
    }
  },
  methods: {
    clickDis() {
      let that = this;
      this.handlerDisabled = true;
      this.handlerLoading = true;
      let t = setTimeout(() => {
        that.handlerDisabled = that.disabled;
        that.handlerLoading = false;
        clearTimeout(t);
      }, that.disabledTime);
    },
    emtiClick() {
      this.$emit("click");
      this.clickDis();
    }
  },
  mounted() {
    if (this.tooltip == "") {
      this.tipDis = true;
    }
  }
};
</script>