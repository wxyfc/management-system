<template>
    <el-row>
        <mt>{{language[$options.name]}}</mt>
        <el-col :xs="24" :sm="20" :md="16" :lg="14" :xl="12" style="height: 80%;" class="margin1vw">
            <el-form label-width="20%">
                <el-form-item>
                    <!--默认上传-->
                    <span slot="label" class="emphasize">{{language.defaultUpload}}</span>
                    <el-col class="normal" :span="24">{{language.defaultUploadFileTooltip}}</el-col>
                    <UploadFileTool></UploadFileTool>
                </el-form-item>
            </el-form>
        </el-col>
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
            UploadFileTool : () => import('@/assets/UploadFileTool.vue')
        } ,
    };
</script>