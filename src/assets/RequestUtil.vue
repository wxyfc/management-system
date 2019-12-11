<template>
  <span>
    <el-row class="margin1vw">
      <el-col :span="4">
        {{language.requestMode}}
        <el-select v-model="select">
          <el-option value="get"></el-option>
          <el-option value="post"></el-option>
        </el-select>
      </el-col>
      <el-col :span="16">
        <el-input v-model="inputUrl" :placeholder="language.requestAddress"></el-input>
      </el-col>
      <el-col :span="4">
        <mdb
          icon="el-icon-search"
          type="primary"
          :disabled=" inputUrl == '' "
          @click="Request"
          :long="true"
        >{{language.sureRequest}}</mdb>
      </el-col>
    </el-row>
    <el-row v-for="(v,k) in testData" :key="k" class="margin1vw">
      <el-col :offset="4" :span="5">key：{{k}}</el-col>
      <el-col :span="11">value：{{v}}</el-col>
      <el-col :span="2">
        <mi icon="el-icon-edit" :tooltip="language.modify" @click="modifyData(k)"></mi>
      </el-col>
      <el-col :span="2">
        <mi icon="el-icon-delete" :tooltip="language.delete" @click="deleData(k)"></mi>
      </el-col>
    </el-row>
    <el-row class="margin1vw">
      <el-col :offset="4" :span="5">
        key：
        <el-input v-model="inputKey" class="width80"></el-input>
      </el-col>
      <el-col :span="7">
        value：
        <el-input v-model="inputValue" class="width80"></el-input>
      </el-col>
      <el-col :span="4">
        valueType：
        <el-select v-model="valueType" class="width50">
          <el-option value="string"></el-option>
          <el-option value="number"></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <mdb type="primary" @click="inputAdd" :long="true">{{language.sureAdd}}</mdb>
      </el-col>
    </el-row>
    <el-row class="margin1vw">
      {{language.requestParamPrev}}
      <pre>{{testData}}</pre>
      {{language.requestResult}}
      <pre>{{reqTest}}</pre>
    </el-row>
  </span>
</template>

<script>
export default {
  mixins: [require("@/mymixins").default],
  name: "RequestUtil",
  data() {
    return {
      select: "get",
      valueType: "string",
      inputUrl: "",
      inputKey: "",
      inputValue: "",
      testData: {},
      reqTest: {}
    };
  },
  methods: {
    modifyData(k) {
      this.inputKey = k;
      this.inputValue = this.testData[k];
    },
    deleData(k) {
      this.$delete(this.testData, k);
    },
    inputAdd() {
      if (this.valueType == "string") {
        this.$set(this.testData, this.inputKey, this.inputValue);
      } else {
        this.$set(this.testData, this.inputKey, +this.inputValue);
      }
    },
    async Request() {
      if (this.select == "get")
        this.reqTest = await this.$Get(this.inputUrl, this.upDataHandler);
      else if (this.select == "post")
        this.reqTest = await this.$Post(this.inputUrl, this.upDataHandler);
    }
  }
};
</script>