<template>
    <el-row>
        <mt>{{language[$options.name]}}</mt>
    </el-row>
</template>

<script>
    export default {
        mixins : [ require ( "@/mymixins" ).default ] ,
        name : "uploadFile" ,
        data () {
            return {
                // userInfo
                // otherInfo
                // language
            };
        } ,
        components : {
            UploadImgTool : () => import('@/assets/UploadImgTool.vue')
        } ,
        props : {
            // test: {
            //   type: String,
            //   default: () => {
            //     let colors = require("@/color.js");
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
            //   handler(newv, oldv) {}
            // }
        } ,
        methods : {} ,
        mounted () {
        } ,
    };
</script>