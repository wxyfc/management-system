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
    };
</script>