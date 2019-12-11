<template>
  <div
    class="shadow w100 h100"
    ref="VertRoll"
    :style="{height:DHeight}"
    @mousewheel="VetMouseWheel"
    @mouseleave="autoFun"
    @mouseover="clearTimer"
  >
    <transition-group>
      <el-row
        v-for=" (items,index) in data "
        :style=" {height:height} "
        :key="items.index"
        class="list-complete-item w100"
        @click.native="liCilck(items)"
        type="flex"
        align="middle"
      >
        <fragment v-if=" index < showNum " :key="items.index">
          <el-col
            v-for=" (item,index) in items.obj "
            :key="index"
            :span=" item.length"
            :style=" { height:height,textAlign:item.align ? item.align : 'left' , 
            background: item.background ? item.background : '',
            borderRadius:'0.26041vw',lineHeight:height, } "
            :offset=" item.offset ? item.offset : 0 "
            class="notLineFeed"
          >{{item.text}}</el-col>
        </fragment>
      </el-row>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: "VertRollS",
  data() {
    return {
      timer: null,
      s: 0,
      data: [
        {
          index: 1,
          obj: [
            {
              length: 18,
              text: "这是隔6长18居中111",
              align: "center",
              offset: 6,
              background: "#99a9bf"
            }
          ]
        },
        {
          index: 113132,
          obj: [
            {
              length: 18,
              text: "这是隔6长18居中111",
              align: "center",
              offset: 6,
              background: "#99a9bf"
            }
          ]
        },
        {
          index: 11321321,
          obj: [
            {
              length: 18,
              text: "这是隔6长18居中111",
              align: "center",
              offset: 6,
              background: "#99a9bf"
            }
          ]
        },
        {
          index: 1132132132121,
          obj: [
            {
              length: 18,
              text: "这是隔6长18居中111",
              align: "center",
              offset: 6,
              background: "#99a9bf"
            }
          ]
        },
        {
          index: 1333,
          obj: [
            {
              length: 18,
              text: "这是隔6长18居中222",
              align: "center",
              offset: 6,
              background: "#99a9bf"
            }
          ]
        },
        {
          index: 1444,
          obj: [
            {
              length: 18,
              text: "这是隔6长18居中3333",
              align: "center",
              offset: 6,
              background: "#99a9bf"
            }
          ]
        },
        {
          index: 2555,
          obj: [
            {
              length: 6,
              text: "这是隔3长6居右44444",
              align: "right",
              offset: 3,
              background: "#99a9bf"
            },
            {
              length: 12,
              text: "这是隔3长12居左",
              align: "left",
              offset: 3,
              background: "#99a9bf"
            }
          ]
        },
        {
          index: 3,
          obj: [
            {
              length: 6,
              text: "这是隔2长6居左",
              align: "left",
              offset: 2,
              background: "#99a9bf"
            },
            {
              length: 6,
              text: "这是隔2长6居中",
              align: "center",
              offset: 2,
              background: "#99a9bf"
            },
            {
              length: 8,
              text: "这是隔0长8居右",
              align: "right",
              offset: 0,
              background: "#99a9bf"
            }
          ]
        },
        {
          index: 4,
          obj: [
            {
              length: 5,
              text: "这是隔1长5居右",
              align: "right",
              offset: 1,
              background: "#99a9bf"
            },
            {
              length: 6,
              text:
                "这是隔0长6居左1111111111111111111111111111111111111111111111111111111",
              align: "left",
              offset: 0,
              background: "#99a9bf"
            },
            {
              length: 4,
              text: "这是隔2长4居右",
              align: "right",
              offset: 2,
              background: "#99a9bf"
            },
            {
              length: 6,
              text: "这是隔0长6居右",
              align: "right",
              offset: 0,
              background: "#99a9bf111111111"
            }
          ]
        },
        {
          index: 5,
          obj: [
            {
              length: 18,
              text:
                "这是隔6长18居中11111111111111111111111111111111111111111111111111111111111111111111111",
              align: "center",
              offset: 6,
              background: "#99a9bf5555555555"
            }
          ]
        },
        {
          index: 6,
          obj: [
            {
              length: 18,
              text: "这是隔6长18居中",
              align: "center",
              offset: 6,
              background: "#99a9bf444444444444444"
            }
          ]
        },
        {
          index: 7,
          obj: [
            {
              length: 18,
              text: "这是隔6长18居中3333333333333",
              align: "center",
              offset: 6,
              background: "#99a9bf"
            }
          ]
        },
        {
          index: 8,
          obj: [
            {
              length: 18,
              text: "这是隔6长18居中2222222222",
              align: "center",
              offset: 6,
              background: "#99a9bf"
            }
          ]
        },
        {
          index: 9,
          obj: [
            {
              length: 18,
              text: "这是隔6长18居中1111111111111",
              align: "center",
              offset: 6,
              background: "#99a9bf"
            }
          ]
        },
        {
          index: 10,
          obj: [
            {
              length: 18,
              text: "这是隔6长18居中",
              align: "center",
              offset: 6,
              background: "#99a9bf"
            }
          ]
        },
        {
          index: 11,
          obj: [
            {
              length: 18,
              text: "这是隔6长18居中",
              align: "center",
              offset: 6,
              background: "#99a9bf"
            }
          ]
        },
        {
          index: 12,
          obj: [
            {
              length: 18,
              text: "这是隔6长18居中",
              align: "center",
              offset: 6,
              background: "#99a9bf"
            }
          ]
        },
        {
          index: 13,
          obj: [
            {
              length: 18,
              text: "这是隔6长18居中",
              align: "center",
              offset: 6,
              background: "#99a9bf"
            }
          ]
        },
        {
          index: 14,
          obj: [
            {
              length: 18,
              text: "这是隔6长18居中",
              align: "center",
              offset: 6,
              background: "#99a9bf"
            }
          ]
        },
        {
          index: 15,
          obj: [
            {
              length: 18,
              text: "这是隔6长18居中",
              align: "center",
              offset: 6,
              background: "#99a9bf"
            }
          ]
        },
        {
          index: 16,
          obj: [
            {
              length: 18,
              text: "这是隔6长18居中",
              align: "center",
              offset: 6,
              background: "#99a9bf"
            }
          ]
        }
      ]
    };
  },
  props: {
    vShowNum: {
      type: Number,
      default: 99
    },
    aniTime: {
      type: Number,
      default: 4
    },
    height: {
      type: String,
      default: "2.77777vh"
    },
    DHeight: {
      type: String,
      default: "20vh"
    },
    vData: {
      type: Array,
      default: null
    }
  },
  computed: {
    showNum: {
      get() {
        return this.s;
      },
      set(v) {
        this.s = v;
      }
    }
  },
  watch: {
    vShowNum: {
      handler(n, o) {
        if (n != null) this.s = n;
      },
      deep: true,
      immediate: true
    },
    vData: {
      handler(n, o) {
        if (n != null) this.data = n;
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    handlerHeight() {
      let dh = parseFloat(this.DHeight);
      let h = parseFloat(this.height);
      let n = this.showNum;
      let i = Math.floor(dh / h);
      if (n > i) {
        this.s = i;
      }
    },
    shuffle: function(i) {
      this.$addCSS(
        `.list-complete-item{transition: all ${i ? i : 4}s;display: block;}`
      );
      let item = this.data[0];
      this.data.splice(this.data.length, 0, item);
      this.data.splice(0, 1);
    },
    adShuffle() {
      this.$addCSS(".list-complete-item{transition: all 0s;display: block;}");
      let item = this.data[this.data.length - 1];
      this.data.splice(0, 0, item);
      this.data.splice(this.data.length - 1, 1);
    },
    liCilck(items) {
      this.$emit("onClick", items);
    },
    autoFun() {
      if (this.timer == null) {
        this.handlerHeight();
        if (this.showNum < this.data.length) {
          this.timer = setInterval(this.shuffle, this.aniTime * 1000);
        }
      }
    },
    clearTimer() {
      if (this.timer != null) {
        clearInterval(this.timer); //关闭
      }
      this.timer = null;
    },
    VetMouseWheel(e) {
      let isDown = e.deltaY > 0;
      if (isDown) {
        this.shuffle(0.1);
      } else {
        this.adShuffle();
      }
    }
  },
  mounted() {
    this.autoFun();
  },
  beforeDestroy() {
    this.clearTimer();
  }
};
</script>