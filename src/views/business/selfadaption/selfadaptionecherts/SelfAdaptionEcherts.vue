<template>
    <el-row>
        <mt>{{language[$options.name]}}</mt>
        <el-col :span="24" style="height: 94%;">
            <SplitPane v-on:resize="resize" :min-percent='30' :max-percent='70' :default-percent='50' split="vertical">
                <template slot="paneL">
                    A
                </template>
                <SplitPane slot="paneR" v-on:resize="resize" :min-percent='30' :max-percent='70' :default-percent='50' split="horizontal">
                    <template slot="paneL">
                        B
                    </template>
                    <template slot="paneR">
                        C
                    </template>
                </SplitPane>
            </SplitPane>
            <!--<Split>-->
                <!--<div slot="left" class="demo-split-pane no-padding">-->
                    <!--<Split v-model="split4" mode="vertical">-->
                        <!--<div slot="top" class="demo-split-pane">-->
                            <!--Top Pane-->
                        <!--</div>-->
                        <!--<div slot="bottom" class="demo-split-pane">-->
                            <!--Bottom Pane-->
                        <!--</div>-->
                    <!--</Split>-->
                <!--</div>-->
                <!--<div slot="right" class="demo-split-pane">-->
                    <!--Right Pane-->
                <!--</div>-->
            <!--</Split>-->
        </el-col>
    </el-row>
</template>

<script>
    export default {
        mixins : [ require ( "@/mymixins" ).default ] ,
        name : "selfAdaptionEcherts" ,
        data () {
            return {};
        } ,
        components : {
            SplitPane : () => import("vue-splitpane")
            // Split : () => import("@/assets/SplitPanel")  //需要less的分割面板
        } ,
        
        methods : {
            resize ( e ) {
                this.$log ( e );
            } ,
        } ,
        mounted () {
        } ,
    };
</script>