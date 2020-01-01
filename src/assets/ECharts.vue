<template>
    <div class="shadow w100 h100" v-bind:id="id" :class="className" :style="{height:height,width:width}"></div>
</template>
<script>
    export default {
        mixins : [] ,
        name : "ECharts" ,
        components : {} ,
        data () {
            // const deID = Math.floor(Math.random() * 104650);
            return {
                MyChart : null
            };
        } ,
        props : {
            className : {
                type : String ,
                default : "echarsCSS"
            } ,
            id : {
                type : String ,
                required : true
            } ,
            data : {
                type : Object ,
                default : null
            } ,
            // clearCache: {
            //   type: Boolean,
            //   default: true
            // },
            width : {
                type : String ,
                default : "99.9%"
            } ,
            height : {
                type : String ,
                default : "99.9%"
            }
        } ,
        computed : {} ,
        methods : {
            async initChart () {
                let _this = this;
                // _this.MyChart = _this.$echarts.init(myChart);
                // require("echarts").dispose(document.getElementById(_this.id));
                _this.MyChart = await require ( "echarts" ).init (
                    document.getElementById ( _this.id ) ,
                    "light"
                );
                // if (_this.MyChart._$handlers.click) {
                //   _this.MyChart._$handlers.click.length = 0;
                // }
                // await window.removeEventListener("click", _this.click);
                await _this.MyChart.on ( "click" , _this.click );
                await window.addEventListener ( "resize" , _this.__resizeHandler );
                await _this.setChart ();
            } ,
            click ( p ) {
                let _this = this;
                let d = this.$avoid ( p.data );
                _this.$emit ( "clickECharts" , Object.assign ( {} , null , d ) );
            } ,
            clear () {
                this.MyChart.clear ();
            } ,
            async setChart () {
                let _this = this;
                await _this.clear ();
                await _this.MyChart.setOption ( _this.data , true );
            } ,
            __resizeHandler () {
                if ( this.MyChart ) {
                    this.$nextTick ( () => {
                        this.MyChart.resize ();
                        this.setChart ();
                    } )
                }
            }
        } ,
        watch : {
            data : {
                handler ( n , o ) {
                    if ( JSON.stringify ( n ) !== JSON.stringify ( o ) ) this.setChart ();
                } ,
                deep : true
            }
        } ,
        mounted () {
            // this.$nextTick(() => {
            this.initChart ();
            // });
        } ,
        beforeDestroy () {
            window.removeEventListener ( "resize" , this.__resizeHandler );
            if ( !this.MyChart ) {
                return;
            }
            this.MyChart.dispose ();
            this.MyChart = null;
        } ,
        activated () {
            let that = this;
            if ( that.MyChart ) {
                that.__resizeHandler ();
            }
        }
    };
</script>