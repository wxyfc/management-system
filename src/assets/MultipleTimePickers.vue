<template>
  <span>
    <el-row v-for="(v,k) in ML" :key="k">
      <el-col :span="6">
        <el-select v-model="v.type" class="w100">
          <el-option
            v-for="(item,index) in TL"
            :key="index+item.value"
            :value="item.value"
            :label="language[item.text]"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="9">
        <el-time-picker
          v-model="v.time.s"
          @change="MH(k)"
          :clearable="false"
          :editable="false"
          format="HH:mm:ss"
          value-format="HH:mm:ss"
          class="w100"
          :picker-options="{
            selectableRange:`${ML[k-1]?ML[k-1].time.e:'00:00:00'}-${v.time.e!=''?v.time.e:'23:59:59'}`
          }"
        ></el-time-picker>
      </el-col>
      <el-col :span="9">
        <el-time-picker
          v-model="v.time.e"
          @change="MH(k)"
          :clearable="false"
          :editable="false"
          format="HH:mm:ss"
          value-format="HH:mm:ss"
          class="w100"
          :picker-options="{
            selectableRange:`${v.time.s}-${ML[k+1]?ML[k+1].time.s:'23:59:59'}`
          }"
        ></el-time-picker>
      </el-col>
    </el-row>
    <mdb type="primary" class="w100" icon="el-icon-circle-plus-outline" @click="addT"></mdb>
  </span>
</template>

<script>
export default {
  name: "MultipleTimePickers",
  data() {
    return {};
  },
  props: {
    ML: {
      type: Array,
      default: () => {
        let ML = [
          { type: 1, time: { s: "00:00:00", e: "06:00:00" } },
          { type: 2, time: { s: "06:00:00", e: "12:00:00" } },
          { type: 3, time: { s: "12:00:00", e: "18:00:00" } },
          { type: 4, time: { s: "18:00:00", e: "23:59:59" } }
        ];
        return ML;
      }
    },
    TL: {
      type: Array,
      default: () => {
        let TL = [
          {
            text: ["tip"],
            value: 1
          },
          {
            text: ["peak"],
            value: 2
          },
          {
            text: ["flat"],
            value: 3
          },
          {
            text: ["valley"],
            value: 4
          }
        ];
        return TL;
      }
    }
  },
  computed: {
    language() {
      return this.$store.getters.getLanguage;
    }
  },
  watch: {
    //监听数据变化
    // test: {
    //   deep: true,
    //   immediate: true,
    //   handler(newv, oldv) {}
    // }
  },
  methods: {
    MH(v) {
      this.$emit("timeData", this.ML);
    },
    addT() {
      let mobj = this.ML[this.ML.length - 1];
      let iobj = {
        type: mobj.type,
        time: {
          s: mobj.time.e,
          e: mobj.time.e
        }
      };
      this.ML.push(iobj);
    }
  },
  mounted() {
    //渲染
  }
};
</script>
