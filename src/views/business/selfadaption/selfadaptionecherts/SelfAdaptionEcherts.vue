<template>
    <el-row>
        <mt>{{language[$options.name]}}</mt>
        <div style="height: 1%;" class="padding1vw">
            <el-col class="normal" :span="24">{{language.selfAdaptionEchertsTooltip}}</el-col>
        </div>
        <el-col :span="24" style="height: 91%;">
            <SplitPane v-on:resize="resize(1)" :min-percent='minPercent' :max-percent='maxPercent' :default-percent='defPercent' split="vertical">
                <div slot="paneL" class="h100">
                    <ECharts id="RadarChart" :data="require('@/echartsdata/RadarChart')('折线图图')"></ECharts>
                </div>
                <SplitPane slot="paneR" v-on:resize="resize(1)" :min-percent='minPercent' :max-percent='maxPercent' :default-percent='defPercent' split="horizontal">
                    <div slot="paneL" class="h100">
                        <ECharts id="PostRevenue" :data="require('@/echartsdata/PostRevenue')('折线图图')"></ECharts>
                    </div>
                    <div slot="paneR" class="h100">
                        <ECharts id="PolylineChart" :data="require('@/echartsdata/PolylineChart')('折线图图')"></ECharts>
                    </div>
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
            return {
                minPercent : 30 ,
                maxPercent : 70 ,
                defPercent : 50 ,
                calculation : true ,
                letInterval : null
            };
        } ,
        components : {
            SplitPane : () => import("vue-splitpane") ,
            ECharts : () => import("@/assets/ECharts")
            // Split : () => import("@/assets/SplitPanel")  //需要less的分割面板
        } ,
        
        methods : {
            resize ( i ) {
                if ( i == 1 ) {
                    this.clearIntervalFun ();
                }
                if ( document.createEvent ) {
                    let event = document.createEvent ( "HTMLEvents" );
                    event.initEvent ( "resize" , true , true );
                    window.dispatchEvent ( event );
                } else if ( document.createEventObject ) {
                    window.fireEvent ( "onresize" );
                }
            } ,
            startSelfDemo () {
                //开始demo的演示定时器处理方法
                let that = this;
                if ( this.letInterval == null ) {
                    this.letInterval = setInterval ( that.calculationHandler , 3000 )
                }
            } ,
            calculationHandler () {
                //demo面板分割默认值自动变化处理计算
                let that = this;
                if ( that.defPercent <= that.minPercent ) {
                    that.calculation = true;
                } else if ( that.defPercent >= that.maxPercent ) {
                    that.calculation = false;
                }
                if ( that.calculation ) {
                    that.defPercent += 10;
                } else {
                    that.defPercent -= 10;
                }
                that.resize ( 2 );
            } ,
            clearIntervalFun () {
                //清除定时器
                if ( this.letInterval != null ) {
                    clearInterval ( this.letInterval );
                    this.letInterval = null;
                }
            }
            
        } ,
        mounted () {
            this.startSelfDemo ();
        } ,
        beforeDestroy () {
            this.clearIntervalFun ();
        }
    };
</script>