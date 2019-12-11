<template>
  <span>
    <span
      v-for="(item,i) in list"
      :key="i+list.length"
      :style="{color:item.color}"
      class="emphasize"
    >
      <el-col :span="24">
        {{item.name}}
        <span v-show="showNum">：{{item.num}}</span>
      </el-col>
      <el-col :span="22">
        <el-progress
          :percentage="l[i].num"
          :color="item.color"
          :stroke-width="width"
          :show-text="false"
        ></el-progress>
      </el-col>
      <el-col :span="2">{{l[i].num}}%</el-col>
    </span>
  </span>
</template>

<script>
export default {
  name: "ProgresS",
  data() {
    return {};
  },
  props: {
    list: {
      type: Array,
      default: () => {
        let s = [
          { name: "103", num: 103, color: "#f0f" },
          { name: "59", num: 168, color: "#0f0" },
          { name: "89", num: 459, color: "#00f" }
        ];
        return s;
      }
    },
    width: {
      type: Number,
      default: 12
    },
    showNum: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    l() {
      let l = [];
      let sum = this.list.$operation("num");
      this.list.forEach(e => {
        let o = {
          num: parseFloat(((e.num / sum) * 100).toFixed(2))
        };
        l.push(o);
      });
      return l;
    }
  },
  created() {},
  methods: {},
  mounted() {
    //渲染
  }
};
</script>