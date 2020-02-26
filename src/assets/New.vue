<template>
    <el-row>
        <mt>{{language[$options.name]}}</mt>
        <el-col :xs="24" :sm="18" :md="12" :lg="10" :xl="8" style="height: 80%;" class="padding1vw"></el-col>
    </el-row>
</template>

<script>
    export default {
        mixins : [ require ( "@/mymixins" ).default ] ,
        name : "New" ,
        data () {
            return {
                // userInfo
                // otherInfo
                // language
            };
        } ,
        components : {
            // test: resolve => {require(['@/test/test'], resolve)},//懒加载
            //test: () => import('@/test/test')
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
        methods : {
            getRequest () {
                let projectId = this.userInfo.projectId;
                let userProject = this.userInfo.userProject;
                this.get ( `/zone/1231321/${userProject}` , {} ).then ( res => {
                    let data = res.Data;
                    this.List = data;
                } );
            } ,
            postRequest () {
                let projectId = this.userInfo.projectId;
                let userProject = this.userInfo.userProject;
                this.post ( "/auth/login" , {} ).then ( res => {
                    let data = res.Data;
                    this.List = data;
                } );
            }
        } ,
        beforeCreate () {
            //创建前
        } ,
        created () {
            //创建
        } ,
        beforeMount () {
            //渲染前
            // this.$forceUpdate();
            // this.$nextTick();
        } ,
        mounted () {
            //渲染
            alert ( 1 );
        } ,
        activated () {
            //可见
        } ,
        deactivated () {
            //隐藏
        } ,
        beforeUpdate () {
            //更新前
        } ,
        updated () {
            //更新
        } ,
        beforeDestroy () {
            //销毁前
        } ,
        destroyed () {
            //销毁
        }
    };
</script>
<style scoped>
    .test {
    }
</style>