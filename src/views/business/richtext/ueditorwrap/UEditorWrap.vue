<template>
    <el-row>
        <mt>{{language[$options.name]}}</mt>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" style="height: 96%;" class="padding1vw">
            <!--<BaiDuUEditor :input="richtext" @input="richTextFun"></BaiDuUEditor>-->
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" style="height: 96%;" class="padding1vw">
            <div v-html="richtext" class="overflowauto h100"></div>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        mixins : [ require ( "@/mymixins" ).default ] ,
        name : "uEditorWrap" ,
        data () {
            return {
                richtext : `<h2><img src="http://img.baidu.com/hi/jx2/j_0007.gif"/>Vue + UEditor + v-model双向绑定</h2>`
            };
        } ,
        components : {
            // BaiDuUEditor : () => import('@/assets/BaiDuUEditor')
        } ,
        methods : {
            richTextFun ( n ) {
                this.richtext = n;
            }
        } ,
        mounted () {
        } ,
    };
</script>