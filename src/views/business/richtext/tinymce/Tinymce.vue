<template>
    <el-row>
        <mt>{{language[$options.name]}}</mt>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" style="height: 80%;" class="padding1vw">
            <Tinymce v-model="content" :height="600"/>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" style="height: 96%;" class="padding1vw">
            <div v-html="content" class="overflowauto h100"></div>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        mixins : [ require ( "@/mymixins" ).default ] ,
        name : "tinymceDemo" ,
        data () {
            return {
                content :
                    `<h1 style="text-align: center;">Welcome to the TinyMCE demo!</h1><p style="text-align: center; font-size: 15px;">
                    <img title="TinyMCE Logo" src="//www.tinymce.com/images/glyph-tinymce@2x.png" alt="TinyMCE Logo" width="110" height="97" />
                    <ul>
                        <li>Our <a href="//www.tinymce.com/docs/">documentation</a> is a great resource for learning how to configure TinyMCE.</li>
                        <li>Have a specific question? Visit the <a href="https://community.tinymce.com/forum/">Community Forum</a>.</li>
                        <li>We also offer enterprise grade support as part of <a href="https://tinymce.com/pricing">TinyMCE premium subscriptions</a>.</li>
                    </ul>`
            };
        } ,
        components : {
            Tinymce : () => import('@/assets/Tinymce')
        } ,
        methods : {} ,
        mounted () {
        } ,
    };
</script>