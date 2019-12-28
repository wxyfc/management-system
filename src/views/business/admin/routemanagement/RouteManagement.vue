<template>
    <el-row>
        <mt>{{language[$options.name]}}</mt>
        <div class="margin1vw" style="height:80%;">
            123
        </div>
    </el-row>
</template>

<script>
    export default {
        mixins : [ require ( "@/mymixins" ).default ] ,
        name : "menuManagement" ,
        data () {
            return {};
        } ,
        components : {} ,
        props : {} ,
        computed : {} ,
        watch : {} ,
        methods : {} ,
        mounted () {
        }
    };
</script>