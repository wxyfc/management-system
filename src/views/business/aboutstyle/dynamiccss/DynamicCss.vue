<template>
    <el-row>
        <mt>{{language[$options.name]}}</mt>
        <div style="height: 80%;" class="padding1vw">
            <el-col class="normal" :span="24">{{language.dynamicCssAddCss}}</el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="10" :xl="8" class="margin1vw-t h100">
                <div class="h100 w100 dynamicCssDiv"><span>test</span><span>css</span></div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="10" :xl="8" class="margin1vw-t h100">
                <el-input v-model="cssTextarea" type="textarea" :maxlength="1000" show-word-limit autofocus class="h100 w100" @input="dynamicCssAddCss"></el-input>
            </el-col>
        </div>
    </el-row>
</template>

<script>
    import { $addCSS } from "@/function";

    export default {
        mixins : [ require ( "@/mymixins" ).default ] ,
        name : "dynamicCss" ,
        data () {
            return {
                cssTextarea :
                    "font-size:26px; \n" +
                    "display: flex; /*换成block试试*/ \n" +
                    "/*width: 200px;*/ \n" +
                    "/*height: 200px;*/ \n" +
                    "/*text-align: center;*/ \n" +
                    "color: rgb(15, 119, 255); \n" +
                    "flex-direction: column; /*元素的排列方向为垂直*/ \n" +
                    "justify-content: center; /*水平居中对齐*/ \n" +
                    "align-items: center; /*垂直居中对齐*/ \n" +
                    "/*已经添加的样式只能通过更改的方式消除直接删除没有效果*/"
            };
        } ,
        methods : {
            dynamicCssAddCss () {
                $addCSS ( `.dynamicCssDiv{${this.cssTextarea}}` )
            }
        } ,
        mounted () {
            this.dynamicCssAddCss ()
        }
    }
</script>