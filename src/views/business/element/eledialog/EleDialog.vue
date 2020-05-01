<template>
    <el-row>
        <mt>{{language[$options.name]}}</mt>
        <el-col :xs="24" :sm="18" :md="12" :lg="10" :xl="8" style="height: 80%;" class="padding1vw">
            <mdb @click="isShow=true">ShowDialog</mdb>
        </el-col>
        <ElementDialog v-model="isShow" title="title" :sure="sureConfig" :cancel="cancelConfig">
            <!--<div slot="title">title</div>-->
            <div>{{new Date() | dataFormat}}</div>
            <!--<div slot="footer">footer</div>-->
        </ElementDialog>
    </el-row>
</template>

<script>
    export default {
        mixins : [ require ( "@/mymixins" ).default ] ,
        name : "eleDialog" ,
        data () {
            return {
                isShow : true ,
            };
        } ,
        components : {
            ElementDialog : () => import('@/assets/ElementDialog')
        } ,
        computed : {
            sureConfig () {
                return {
                    text : 111 ,
                    function : this.sure
                };
            } ,
            cancelConfig () {
                return {
                    text : 222 ,
                    function : this.cancel
                };
            } ,
        } ,
        methods : {
            sure () {
                console.log ( 111 )
            } ,
            cancel () {
                console.log ( 222 )
            } ,
        } ,
        mounted () {
        }
    };
</script>