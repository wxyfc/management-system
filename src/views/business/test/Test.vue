<template>
  <!-- <PageTable @cellDblClick="cellDblClick" @clickPage="clickPage"></PageTable> -->
  <PrintBody>
    <div>
      <mt>{{language[$options.name]}}</mt>
      <el-row>
        <el-col :span="4">
          <el-select v-model="select">
            <el-option value="get"></el-option>
            <el-option value="post"></el-option>
          </el-select>
        </el-col>
        <el-col :span="16">
          <el-input v-model="input"></el-input>
        </el-col>
        <el-col :span="4">
          <mdb
            icon="el-icon-search"
            type="primary"
            :disabled=" input == '' "
            @click="get"
            class="w100"
          ></mdb>
        </el-col>
      </el-row>
      <el-row v-for="(v,i) in upData" :key="i">
        <el-col :span="4">{{v.name}}</el-col>
        <el-col :span="16">
          <el-input v-model="v.value"></el-input>
        </el-col>
        <el-col :span="2">
          <mi icon="el-icon-close" iconClass="title" @click="deleUpData(i)"></mi>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          <el-input v-model="inputName"></el-input>
        </el-col>
        <el-col :span="16">
          <el-input v-model="inputValue"></el-input>
        </el-col>
        <el-col :span="4">
          <mdb type="primary" @click="inputAdd" class="w100">add</mdb>
        </el-col>
      </el-row>

      <pre>{{upDataHandler}}</pre>
      <pre>{{Test}}</pre>
      <!-- <MultipleTimePickers></MultipleTimePickers> -->
      <!-- <MultipleTimeCheck
        :TL="otherInfo.peakValleyList"
        :ML="timeList"
        @group="groupMultipleTimeCheck"
      ></MultipleTimeCheck>-->
      <!-- <DatePicker :type="1" @change="pickerChange"></DatePicker> -->
      <!-- <DatePickerMult :type="1" @change="pickerChange"></DatePickerMult> -->
      <!-- <ProgresS></ProgresS> -->
      <a :href="location">{{location}}</a>
      <mdb @click="exc">excelTest</mdb>
      <!-- <AutoScroll style="height:40vh"></AutoScroll> -->
      <!-- <ECharts
      style="pointerEvents:none"
      id="TreeDemo"
      height="65vh"
      :data="require('@/echartsdata/TreeChart').default(TreeChartOption,'TB')"
      @clickECharts="clickECharts"
      ></ECharts>-->
    </div>
  </PrintBody>
</template>

<script>
import { formData, jsonToParams, getQueryObject, getParams } from "@/function";
export default {
  mixins: [require("@/mymixins").default],
  name: "test",
  components: {
    // test: resolve => {require(['@/test/test.vue'], resolve)},//懒加载
    // PageTable: () => import("@/assets/PageTable"),
    // MultipleTimePickers: () => import("@/assets/MultipleTimePickers"),
    // MultipleTimeCheck: () => import("@/assets/MultipleTimeCheck"),
    // DatePicker: () => import("@/assets/DatePicker"),
    // DatePickerMult: () => import("@/assets/DatePickerMult"),
    // ProgresS: () => import("@/assets/ProgresS"),
    ECharts: () => import("@/assets/ECharts"),
    PrintBody: () => import("@/assets/PrintBody")
    // AutoScroll: () => import("@/assets/AutoScroll"),
  },
  data() {
    return {
      // userInfo
      // otherInfo
      // language
      input: "",
      upData: [],
      inputName: "",
      inputValue: "",
      select: "get",
      location: "",
      Test: {},
      timeList: [
        { type: 1, value: 0, text: "0时段" },
        { type: 1, value: 1, text: "1时段" },
        { type: 1, value: 2, text: "2时段" },
        { type: 1, value: 3, text: "3时段" },
        { type: 2, value: 4, text: "4时段" },
        { type: 2, value: 5, text: "5时段" },
        { type: 2, value: 6, text: "6时段" },
        { type: 2, value: 7, text: "7时段" },
        { type: 3, value: 8, text: "8时段" },
        { type: 3, value: 9, text: "9时段" },
        { type: 3, value: 10, text: "10时段" },
        { type: 4, value: 11, text: "11时段" },
        { type: 4, value: 12, text: "12时段" }
      ],
      TreeChartOption: [
        [
          {
            children: [
              {
                children: [],
                name: "分摊表",
                id: 11,
                type: 1,
                color: "#00a600"
              },
              {
                children: [],
                name: "子表",
                id: 12,
                color: "#0000c6",
                type: 1
              }
            ],
            name: "总表",
            id: 1,
            type: 1,
            color: "#f75000"
          }
        ],
        [
          {
            children: [
              {
                children: [],
                name: "子表",
                id: 12,
                color: "#0000c6",
                type: 1
              },
              {
                children: [],
                name: "子表",
                id: 12,
                color: "#0000c6",
                type: 1
              },
              {
                children: [],
                name: "子表",
                id: 12,
                color: "#0000c6",
                type: 1
              },
              {
                children: [],
                name: "子表",
                id: 12,
                color: "#0000c6",
                type: 1
              },
              {
                children: [],
                name: "子表",
                id: 12,
                color: "#0000c6",
                type: 1
              },
              {
                children: [],
                name: "子表",
                id: 12,
                color: "#0000c6",
                type: 1
              }
            ],
            name: "总表",
            id: 1,
            type: 1,
            color: "#f75000"
          }
        ],
        [
          {
            children: [
              {
                children: [],
                name: "子表",
                id: 12,
                color: "#0000c6",
                type: 1
              }
            ],
            name: "总表",
            id: 1,
            type: 1,
            color: "#f75000"
          }
        ],
        [
          {
            children: [
              {
                children: [],
                name: "分摊表",
                id: 11,
                type: 1,
                color: "#00a600"
              },
              {
                children: [],
                name: "子表",
                id: 12,
                color: "#0000c6",
                type: 1
              }
            ],
            name: "总表",
            id: 1,
            type: 1,
            color: "#f75000",
            opacity: 0
          }
        ]
      ]
    };
  },
  computed: {
    upDataHandler() {
      let td = {};
      let that = this;
      this.upData.forEach(e => {
        that.$set(td, "" + e.name, e.value);
      });
      return td;
    }
  },
  methods: {
    deleUpData(i) {
      this.upData.splice(i);
    },
    inputAdd() {
      this.upData.push({
        name: this.inputName,
        value: this.inputValue
      });
    },
    exc() {
      require("@/excelformat/test.js").default("封装测试", [
        { title: "测试一1", content: "内容一1" },
        { title: "测试二2", content: "内容二2" }
      ]);
    },
    pickerChange(t) {},
    groupMultipleTimeCheck(list) {
      this.timeList = list;
    },
    async get() {
      if (this.select == "get")
        this.Test = await this.$Get(this.input, this.upDataHandler);
      else if (this.select == "post")
        this.Test = await this.$Post(this.input, this.upDataHandler);
    },
    // cellDblClick(row, column) {},
    // clickPage(page) {},
    getRequest() {
      let userProject = this.userInfo.userProject;
      this.get(`/zone/13212312/${userProject}`, {}).then(res => {
        let data = res.Data;
        this.List = data;
      });
    },
    postRequest() {
      let userProject = this.userInfo.userProject;
      this.post("/auth/login", {}).then(res => {
        let data = res.Data;
        this.List = data;
      });
    },
    test() {
      window.location = encodeURI(this.location);
    },
    getRequest() {
      this.post(`/abcinterface/h5OpenAccount`, {}).then(res => {
        // let fd = formData(res.data);
        // let div = document.createElement("div");
        // div.id = "formDiv";
        // div.innerHTML = fd;
        // document.body.appendChild(div);
        // document
        //   .getElementById("formDiv")
        //   .getElementsByTagName("form")[0]
        //   .submit();
        this.$log(getParams());
        this.$log(getQueryObject());
        this.$log(
          getParams(
            `https://openbank.abchina.com/GateWay/openabc/h5/h5eaccount/EAccOpen/v1?${jsonToParams(
              res.data
            )}`
          )
        );
        this.$log(
          getQueryObject(
            `https://openbank.abchina.com/GateWay/openabc/h5/h5eaccount/EAccOpen/v1?${jsonToParams(
              res.data
            )}`
          )
        );
        this.location = `https://openbank.abchina.com/GateWay/openabc/h5/h5eaccount/EAccOpen/v1?${jsonToParams(
          res.data
        )}`;
      });
    }
  },
  mounted() {}
};
</script>