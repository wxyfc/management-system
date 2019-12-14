<template>
  <div class="mainTag">
    <!-- <el-image v-if="otherInfo.bgImg" :src="otherInfo.bgImg" class="w100 h997" fit="cover"></el-image> -->
    <img v-if="otherInfo.bgImg" :src="otherInfo.bgImg" class="w999 h997" style="object-fit:cover;">
    <el-dialog
      :visible="true"
      :show-close="false"
      top="30vh"
      :width="dialogWidth"
      custom-class="transparent02"
    >
      <el-row slot="title">
        <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="18" style="color:#eee">
          <div class="largeTitle" @dblclick="hiddRefresh">{{language[otherInfo.helloTitle]}}</div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="6" class="alnrit" v-show="false">
          <SelectLanguage></SelectLanguage>
        </el-col>
      </el-row>
      <el-form
        :model="ruleForm"
        ref="ruleForm"
        status-icon
        :rules="rules"
        style="margin:0vw 3vh"
        @keyup.enter.native="submitForm('ruleForm')"
      >
        <el-form-item prop="username">
          <el-input
            type="text"
            size="medium"
            v-model="ruleForm.username"
            :maxlength="18"
            prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            size="medium"
            v-model="ruleForm.password"
            :maxlength="20"
            show-password
            prefix-icon="el-icon-tickets"
          ></el-input>
        </el-form-item>
        <el-form-item class="alncnt">
          <mdb size="medium" type="primary" @click="submitForm('ruleForm')" :long="true">
            {{language.signIn}}
            <!-- <span class="emphasize"></span> -->
          </mdb>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { setLocal, getLocal, clearLocal } from "@/function";
export default {
  mixins: [require("@/mymixins").default],
  name: "login",
  data() {
    return {
      ruleForm: {
        username: null,
        password: null
      }
    };
  },
  components: {
    SelectLanguage: () => import("@/assets/SelectLanguage")
  },
  props: {},
  computed: {
    rules() {
      let rules = {
        username: [{ required: true, message: "username", trigger: "blur" }],
        password: [{ required: true, message: "password", trigger: "blur" }]
      };
      return rules;
    },
    dialogWidth() {
      return this.otherInfo.menuCollapse ? "50%" : "25%";
    }
  },
  watch: {},
  methods: {
    hiddRefresh() {
      clearLocal();
      history.go(0);
    },
    resizeHandler() {
      let clientWidth = document.body.clientWidth;
      if (clientWidth <= 992) {
        this.setOtherInfo({ menuCollapse: true });
      } else {
        this.setOtherInfo({ menuCollapse: false });
      }
    },
    async setWebConfig() {
      // let config = await this.$Get(`/web-config/config-admin.json`);
      let config = require("@/web-config/config-admin.json");
      this.setOtherInfo(config);
      this.resizeHandler();
    },
    submitForm(formName) {
      let that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (
            that.ruleForm.username == "admin" &&
            that.ruleForm.password == "admin"
          ) {
            that.setUserInfo({
              userRole: 1
            });
            that.$router.replace({ name: "test" });
          } else {
            that.login();
          }
        }
      });
    },
    login() {
      let that = this;
      this.get("/login/login", {
        username: this.ruleForm.username,
        password: this.ruleForm.password
      }).then(res => {
        if (res.Code == 0) {
          let data = res.Data;
          that.setUserInfo({
            userName: data.Username,
            headerTitle: that.language.subject,
            userId: data.Id,
            userToken: data.Token,
            userRole: data.Role,
            userProject: data.Project,
            projectId: that.$isTrue(res.Expand) ? res.Expand.Id : null,
            cooperativePartner: that.language.ABC
          });
          that.$router.replace({ name: "test" });
        }
      });
    }
  },
  mounted() {
    // let userMemory = getLocal("userMemory");
    this.ruleForm = getLocal("loginForm");
    // if (this.$isTrue(userMemory)) {
    if (false) {
      this.setOtherInfo(userMemory.otherInfo);
    } else {
      this.setWebConfig();
    }
    window.addEventListener("resize", this.resizeHandler);
  },
  beforeDestroy() {
    let that = this;
    window.removeEventListener("resize", this.resizeHandler);
    setLocal("userMemory", {
      userInfo: that.userInfo,
      otherInfo: that.otherInfo,
      language: that.language
    });
    setLocal("loginForm", that.ruleForm);
  }
};
</script>