<template>
  <fragment>
    <mt>{{language[$options.name]}}</mt>
    <el-row style="margin:5vw;">
      <el-col :span="12" @dblclick.native="logTrue">
        <mi icon="el-icon-refresh-right" @click="getLog"></mi>
        <el-timeline>
          <el-timeline-item
            v-for="(item, index) in systemLog"
            :key="index"
            :timestamp="item.Time"
            color="#000"
            placement="top"
            size="large"
          >
            <el-card :body-style="{ padding: '0.5vw 1.5vw'}">
              <p>{{item.ZContent}}</p>
              <p>{{item.EContent}}</p>
              <p>{{item.OContent}}</p>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </el-col>
      <el-col :span="12" v-if="showSet">
        <el-form label-width="30%">
          <el-form-item :label="language.zhcnContent">
            <el-input v-model="ZContent" clearable :maxlength="60"></el-input>
          </el-form-item>
          <el-form-item :label="language.enusContent">
            <el-input v-model="EContent" clearable :maxlength="60"></el-input>
          </el-form-item>
          <el-form-item :label="language.otherContent">
            <el-input v-model="OContent" clearable :maxlength="60"></el-input>
          </el-form-item>
          <el-form-item>
            <mdb type="primary" icon="el-icon-edit" @click="setLog">{{language.systemLog}}</mdb>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </fragment>
</template>

<script>
export default {
  mixins: [require("@/mymixins").default],
  name: "systemLog",
  data() {
    return {
      systemLog: [],
      logSet: 0,
      showSet: false,
      ZContent: "",
      EContent: "",
      OContent: ""
    };
  },
  methods: {
    logTrue() {
      if (this.logSet >= 1) {
        this.showSet = true;
      } else {
        this.logSet++;
      }
    },
    setLog() {
      let that = this;
      this.post("/log/set", {
        ZContent: that.ZContent,
        EContent: that.EContent,
        OContent: that.OContent
      }).then(res => {
        that.ZContent = "";
        that.EContent = "";
        that.OContent = "";
        that.getLog();
      });
    },
    getLog() {
      this.get("/log/get", {}).then(res => {
        this.systemLog = res.Data;
      });
    }
  },
  mounted() {
    this.getLog();
  },
  beforeDestroy() {
    let r = this.otherInfo.routerHistory;
    this.$delete(r, "systemLog");
  }
};
</script>
