<template>
    <el-row>
        <mt>{{language[$options.name]}}</mt>
        <el-col :xs="24" :sm="20" :md="16" :lg="14" :xl="12" style="height: 80%;" class="padding1vw">
            <el-form label-width="20%">
                <el-form-item>
                    <!--默认上传-->
                    <span slot="label" class="emphasize">{{language.defaultUpload}}</span>
                    <el-col class="normal" :span="24">{{language.defaultUploadFileTooltip}}</el-col>
                    <UploadFileTool></UploadFileTool>
                </el-form-item>
                <el-form-item>
                    <!--修改上传数量-->
                    <span slot="label" class="emphasize">{{language.updateUploadNum}}</span>
                    <el-col class="normal" :span="24">{{language.updateUploadNumTooltip}}：{{ fileNum }}</el-col>
                    <UploadFileTool :fileNum="fileNum"></UploadFileTool>
                    <el-slider v-model="fileNum" class="width50" :min="1" :max="10"></el-slider>
                </el-form-item>
                <el-form-item>
                    <!--修改上传限制大小-->
                    <span slot="label" class="emphasize">{{language.updateUploadSize}}</span>
                    <el-col class="normal" :span="24">{{language.updateUploadSizeTooltip}}：{{ fileSize }}</el-col>
                    <UploadFileTool :fileSize="fileSize"></UploadFileTool>
                    <el-slider v-model="fileSize" class="width50" :min="2048000" :max="10240000" :step="1024000"></el-slider>
                </el-form-item>
                <el-form-item>
                    <!--更改过滤和拦截的类型-->
                    <span slot="label" class="emphasize">{{language.updateAcceptInterceptType}}</span>
                    <el-col class="normal" :span="24">{{language.updateAcceptInterceptTypeTooltip}}({{ isAccept }})</el-col>

                    <el-radio-group v-model="isAccept" :fill="colors[isAccept]">
                        <el-radio-button v-for="(isA,ai) in isAcceptList" :label="isA.value" :key="ai">
                            <i :class="isA.icon" class="largeTitle"></i>
                            {{isA.type}}
                        </el-radio-button>
                    </el-radio-group>
                    <el-col class="normal" :span="24">{{language.docAndDocx}}</el-col>
                </el-form-item>
                <el-form-item>
                    <!--选择文件时过滤-->
                    <span slot="label" class="emphasize">{{language.selectFileAccept}}</span>
                    <el-col class="normal" :span="24">{{language.selectFileAcceptTooltip}}({{ isAccept }})</el-col>
                    <UploadFileTool :accept="isAccept"></UploadFileTool>
                </el-form-item>
                <el-form-item>
                    <!--选择文件后拦截-->
                    <span slot="label" class="emphasize">{{language.selectFileIntercept}}</span>
                    <el-col class="normal" :span="24">{{language.selectFileInterceptTooltip}}({{ isAccept }})</el-col>
                    <UploadFileTool :accept="isAccept" :intercept="true"></UploadFileTool>
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
                fileNum : 10 ,
                fileSize : 2048000 ,
                isAccept : ".docx" ,
                colors : {
                    ".docx" : "#0061b2" ,
                    ".doc" : "#0061b2" ,
                    ".pptx" : "#d81e06" ,
                    ".pdf" : "#fc3920" ,
                    ".txt" : "#0b0b01" ,
                    ".Excel" : "#0e932e" ,
                } ,
                isAcceptList : [
                    { value : ".docx" , type : "Word" , icon : "iconfont icon-word" } ,
                    { value : ".doc" , type : "Word" , icon : "iconfont icon-word" } ,
                    { value : ".pptx" , type : "PPT" , icon : "iconfont icon-ppt" } ,
                    { value : ".pdf" , type : "PDF" , icon : "iconfont icon-pdf1" } ,
                    { value : ".txt" , type : "Text" , icon : "iconfont icon-TXT" } ,
                    { value : ".Excel" , type : "Excel" , icon : "iconfont icon-Excel" } ,
                ]
            };
        } ,
        components : {
            UploadFileTool : () => import('@/assets/UploadFileTool')
        } ,
    };
</script>