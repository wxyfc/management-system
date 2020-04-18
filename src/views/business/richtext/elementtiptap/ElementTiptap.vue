<template>
    <el-row>
        <mt>{{language[$options.name]}}</mt>
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" style="height: 96%;" class="padding1vw">
            <ElementTiptap v-model="tiptapContent"></ElementTiptap>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        mixins : [ require ( "@/mymixins" ).default ] ,
        name : "elementTiptapDemo" ,
        data () {
            return {
                tiptapContent : "123"
            };
        } ,
        components : {
            ElementTiptap : () => import('@/assets/ElementTiptap')
        } ,
        methods : {} ,
        watch : {
            tiptapContent ( n ) {
                console.log ( n )
            }
        } ,
        mounted () {
        } ,
    };
</script>