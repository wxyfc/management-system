<template>
  <div class="h100 w100 autoScroll" ref="AutoScroll">
    <!-- <mi icon="iconfont icon-yuebuzutixing"></mi> -->
    <el-row
      v-for=" (items,index) in data "
      :ref="index==0?'autoItem':''"
      :style=" {height:height,width:'99.7%',listStyle:'none'} "
      :key="index*data.length*(data.length+index)"
      class="list-complete-item"
      @click.native="liCilck(items)"
      type="flex"
      align="middle"
    >
      <el-col
        v-for=" (item,index) in items "
        :key="index*items.length*(items.length+index)"
        :span=" item.length"
        :style=" { height:height,textAlign:item.align ? item.align : 'left' , 
          background: item.background ? item.background : '',
          borderRadius:'0.26041vw',lineHeight:height, } "
        :offset=" item.offset ? item.offset : 0 "
        class="notLineFeed"
      >{{item.text}}</el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  mixins: [require("@/mymixins").default],
  name: "AutoScroll",
  data() {
    return {
      data: [
        [
          {
            length: 18,
            text: "这是隔6长18居中",
            align: "center",
            offset: 6,
            background: "#99a9bf"
          }
        ],
        [
          {
            length: 18,
            text: "这是隔6长18居中",
            align: "center",
            offset: 6,
            background: "#99a9bf"
          }
        ],
        [
          {
            length: 18,
            text: "这是隔6长18居中",
            align: "center",
            offset: 6,
            background: "#99a9bf"
          }
        ],
        [
          {
            length: 18,
            text: "这是隔6长18居中",
            align: "center",
            offset: 6,
            background: "#99a9bf"
          }
        ],
        [
          {
            length: 18,
            text: "这是隔6长18居中",
            align: "center",
            offset: 6,
            background: "#99a9bf"
          }
        ],
        [
          {
            length: 18,
            text: "这是隔6长18居中",
            align: "center",
            offset: 6,
            background: "#99a9bf"
          }
        ],
        [
          {
            length: 18,
            text: "这是隔6长18居中",
            align: "center",
            offset: 6,
            background: "#99a9bf"
          }
        ],
        [
          {
            length: 18,
            text: "这是隔6长18居中",
            align: "center",
            offset: 6,
            background: "#99a9bf"
          }
        ],
        [
          {
            length: 18,
            text: "这是隔6长18居中",
            align: "center",
            offset: 6,
            background: "#99a9bf"
          }
        ],
        [
          {
            length: 18,
            text: "这是隔6长18居中",
            align: "center",
            offset: 6,
            background: "#99a9bf"
          }
        ],
        [
          {
            length: 6,
            text: "这是隔3长6居右",
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
        ],
        [
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
        ],
        [
          {
            length: 5,
            text: "这是隔1长5居右",
            align: "right",
            offset: 1,
            background: "#99a9bf"
          },
          {
            length: 6,
            text: "这是隔0长6居左",
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
            background: "#99a9bf"
          }
        ],
        [
          {
            length: 18,
            text: "这是隔6长18居中",
            align: "center",
            offset: 6,
            background: "#99a9bf"
          }
        ],
        [
          {
            length: 6,
            text: "这是隔3长6居右",
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
        ],
        [
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
        ],
        [
          {
            length: 18,
            text: "这是隔6长18居中",
            align: "center",
            offset: 6,
            background: "#99a9bf"
          }
        ],
        [
          {
            length: 6,
            text: "这是隔3长6居右",
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
        ],
        [
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
        ],
        [
          {
            length: 18,
            text: "这是隔6长18居中",
            align: "center",
            offset: 6,
            background: "#99a9bf"
          }
        ],
        [
          {
            length: 6,
            text: "这是隔3长6居右",
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
        ],
        [
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
        ],
        [
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
        ],
        [
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
        ],
        [
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
        ],
        [
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
        ],
        [
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
        ],
        [
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
        ],
        [
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
        ],
        [
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
      ],
      autoTimer: null,
      autoTimerIntervalTime: 2000
    };
  },
  props: {
    height: {
      type: String,
      default: "2.77777vh"
    }
  },
  methods: {
    autoTimerFun() {
      let that = this;
      let scrollTop = that.$refs.AutoScroll.scrollTop;
      let autoItemScrollHeight = that.$refs.autoItem[0].$el.scrollHeight;
      if (that.autoTimer == null) {
        that.autoTimer = setInterval(() => {
          scrollTop += autoItemScrollHeight;
          that.$set(this.$refs.AutoScroll, "scrollTop", scrollTop);
        }, that.autoTimerIntervalTime);
      }
    },
    liCilck(i) {}
  },
  mounted() {
    // this.autoTimerFun();
  }
};
</script>