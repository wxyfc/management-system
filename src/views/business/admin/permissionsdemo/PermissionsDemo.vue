<template>
    <el-row>
        <mt>{{language[$options.name]}}</mt>
    </el-row>
</template>

<script>
    export default {
        mixins : [ require ( "@/mymixins" ).default ] ,
        name : "permissionsDemo" ,
        data () {
            return {};
        } ,
        methods : {} ,
        mounted () {
        } ,
    };
</script>