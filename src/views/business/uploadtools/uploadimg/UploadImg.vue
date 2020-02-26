<template>
    <el-row>
        <mt>{{language[$options.name]}}</mt>
        <el-col :xs="24" :sm="20" :md="16" :lg="14" :xl="12" style="height: 80%;" class="padding1vw">
            <el-form label-width="20%">
                <el-form-item>
                    <!--默认上传-->
                    <span slot="label" class="emphasize">{{language.defaultUpload}}</span>
                    <el-col class="normal" :span="24">{{language.defaultUploadImgTooltip}}</el-col>
                    <UploadImgTool></UploadImgTool>
                </el-form-item>
                <el-form-item>
                    <!--修改上传数量-->
                    <span slot="label" class="emphasize">{{language.updateUploadNum}}</span>
                    <el-col class="normal" :span="24">{{language.updateUploadNumTooltip}}：{{ imgNum }}</el-col>
                    <UploadImgTool :imgNum="imgNum"></UploadImgTool>
                    <el-slider v-model="imgNum" class="width50" :min="1" :max="10"></el-slider>
                </el-form-item>
                <el-form-item>
                    <!--修改上传图片限制大小-->
                    <span slot="label" class="emphasize">{{language.updateUploadSize}}</span>
                    <el-col class="normal" :span="24">{{language.updateUploadSizeTooltip}}：{{ imgSize }}</el-col>
                    <UploadImgTool :imgSize="imgSize"></UploadImgTool>
                    <el-slider v-model="imgSize" class="width50" :min="2048000" :max="10240000" :step="1024000"></el-slider>
                </el-form-item>
                <el-form-item>
                    <!--默认图片-->
                    <span slot="label" class="emphasize">{{language.defaultImg}}</span>
                    <el-col class="normal" :span="24">{{language.defaultImgTooltip}}：{{ language.urlLink }}</el-col>
                    <UploadImgTool :imgSize="1024000" :imgNum="10"
                                   :imgList="[
                                   {url:'http://t8.baidu.com/it/u=2247852322,986532796&fm=79&app=86&f=JPEG?w=1280&h=853',name:'1',uid:'1'},
                                   {url:'http://img4.imgtn.bdimg.com/it/u=104412215,2753702561&fm=26&gp=0.jpg',name:'2',uid:'2'}
                                   ]"></UploadImgTool>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        mixins : [ require ( "@/mymixins" ).default ] ,
        name : "uploadImg" ,
        data () {
            return {
                imgNum : 1 ,
                imgSize : 2048000
            };
        } ,
        components : {
            UploadImgTool : () => import('@/assets/UploadImgTool')
        } ,
    };
</script>