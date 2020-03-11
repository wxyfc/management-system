<template>
    <el-row>
        <mt>{{language[$options.name]}}</mt>
        <div class="padding1vw alncnt" style="height:80%;">
            <RequestUtil></RequestUtil>
            <mdb @click="exc">{{ language.excelExportTest }}</mdb>
        </div>
    </el-row>
</template>

<script>
    import { $random } from "@/function"

    export default {
        mixins : [ require ( "@/mymixins" ).default ] ,
        name : "test" ,
        components : {
            RequestUtil : () => import("@/assets/RequestUtil") ,
        } ,
        data () {
            return {};
        } ,
        methods : {
            exc () {
                require ( "@/excelformat/test.js" ).default ( "封装测试" , [
                    { title : "测试一" , content : "内容一" } ,
                    { title : "测试二" , content : "内容二" }
                ] );
            } ,
            test () {
                // window.location = encodeURI(this.location);
            } ,
        } ,
        mounted () {
        }
    }
    ;
</script>