<template>
    <el-row>
        <mt>{{language[$options.name]}}</mt>
        <el-col :xs="24" :sm="18" :md="12" :lg="10" :xl="8" style="height: 80%;" class="padding1vw">
            <mdb @click="isShow=true">ShowDialog</mdb>
        </el-col>
        <ElementDialog v-model="isShow" title="标题1">
            <div slot="title">标题2</div>
            <div>1111111111111111111111111111111112222</div>
            <!--<div slot="footer">脚步</div>-->
        </ElementDialog>
    </el-row>
</template>

<script>
    export default {
        mixins : [ require ( "@/mymixins" ).default ] ,
        name : "eleDialog" ,
        data () {
            return {
                isShow : true
            };
        } ,
        components : {
            ElementDialog : () => import('@/assets/ElementDialog')
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
            // this.$nextTick();
            // this.$forceUpdate();
            // }
            // }
        } ,
        methods : {} ,

        mounted () {
        }
    };
</script>