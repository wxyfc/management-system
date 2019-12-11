<template>
  <el-date-picker
    v-model="day"
    :editable="false"
    :clearable="clearable"
    :type="typeS[type]"
    :value-format="valueF[type]"
    @change="picker"
  ></el-date-picker>
</template>

<script>
export default {
  name: "DatePickerMult",
  data() {
    return {
      day: [],
      typeS: ["daterange", "monthrange"],
      valueF: ["yyyy-MM-dd", "yyyy-MM"]
    };
  },
  props: {
    type: {
      type: Number,
      default: () => {
        return 0;
      }
    },
    dayNum: {
      type: Number,
      default: () => {
        return 30;
      }
    },
    currentNum: {
      type: Number,
      default: () => {
        return 0;
      }
    },
    default: {
      type: Boolean,
      default: true
    },
    clearable: {
      type: Boolean,
      default: false
    }
  },
  watch: {},
  methods: {
    picker() {
      this.$emit("change", this.day);
    }
  },
  mounted() {
    if (this.default) {
      let date = new Date();
      date.setDate(date.getDate() - this.dayNum);
      this.day.push(date.$format(this.valueF[this.type]));
      date = new Date();
      date.setDate(date.getDate() - this.currentNum);
      this.day.push(date.$format(this.valueF[this.type]));
      this.$emit("change", this.day);
    }
  }
};
</script>