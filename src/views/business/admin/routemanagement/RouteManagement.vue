<template>
  <el-row>
    <mt>{{language[$options.name]}}</mt>
    <div class="margin1vw" style="height:80%;">
      {{selectTableItem}}
      <UiPageTable
        ref="routeManagementTable"
        :tableData="dataList"
        :TableConfig="TableConfig"
        :PageConfig="PageConfig"
        :DataConfig="require('./RouteManagementDataConfig.js').default()"
        @clickPage="clickPage"
        @select="selectTable"
      ></UiPageTable>
    </div>
  </el-row>
</template>

<script>
export default {
  mixins: [require("@/mymixins").default],
  name: "menuManagement",
  data() {
    return {
      TableConfig: {
        border: true,
        stripe: true,
        highlight: true,
        single: true,
        disabled: false
      },
      page: 1,
      pageSize: 30,
      total: 0,
      dataList: [
        {
          name: "rrrrlllllll1111111",
          url: "rrrrrllllllll111111111111",
          requestMode: "rrrrrllllll11111111111111"
        },
        {
          name: "rrrllllll2222",
          url: "rrrlllll2222",
          requestMode: "rrrllll2222"
        },
        {
          name: "rrrrllll3333",
          url: "rrrrllllll3333",
          requestMode: "rrrrllllll333333"
        }
      ],
      selectTableItem: {}
    };
  },
  components: {
    UiPageTable: () => import("@/assets/UiPageTable")
  },
  props: {
    // test: {
    //   type: String,
    //   default: () => {
    //     let colors = require("@/web-config/color.js");
    //     return colors[Math.ceil(Math.random() * colors.length - 1)];
    //   }
    // }
  },
  computed: {
    PageConfig() {
      return {
        total: this.total,
        size: this.pageSize
      };
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
    clickPage(d, l) {
      this.page = d;
      this.pageSize = l;
      this.getRequest();
    },
    selectTable(t) {
      this.selectTableItem = t.length > 0 ? this.$avoid(t[0]) : {};
    },
    getRequest() {
      let projectId = this.userInfo.projectId;
      let userProject = this.userInfo.userProject;
      this.get(`/zone/1231321/${userProject}`, {}).then(res => {
        let data = res.Data;
        this.List = data;
      });
    },
    postRequest() {
      let projectId = this.userInfo.projectId;
      let userProject = this.userInfo.userProject;
      this.post("/auth/login", {}).then(res => {
        let data = res.Data;
        this.List = data;
      });
    }
  },
  mounted() {}
};
</script>