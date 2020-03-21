<template>
    <el-row>
        <mt>{{language[$options.name]}}</mt>
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" style="height: 90%;" class="padding1vw">
            <MyBaiDuMap></MyBaiDuMap>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        mixins : [ require ( "@/mymixins" ).default ] ,
        name : "baiDuMap" ,
        data () {
            return {};
        } ,
        components : {
            MyBaiDuMap : () => import('@/assets/BaiDuMap')
        } ,
        props : {
            // test: {
            //   type: String,
            //   default: () => {
            //     let colors = require("@/web-config/color.js");
            //     return colors[Math.ceil(Math.random() * colors.length - 1)];
            //   }
            // }
        } ,
        computed : {
            // test() {
            //   let data = null;
            //   return data;
            // }
        } ,
        watch : {
            //监听数据变化
            // test: {
            //   deep: true,
            //   immediate: true,
            //   handler(newv, oldv) {
            // this.();
            // this.();
            // }
            // }
        } ,
        methods : {} ,
        mounted () {
        } ,
    };
</script>