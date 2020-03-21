<template>
    <baidu-map :class="mClass" :center="center" :zoom="zoom" @ready="handler" :scroll-wheel-zoom="true">
        <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true" @locationSuccess="bmGeoLocationSuccess"></bm-geolocation>
    </baidu-map>
</template>

<script>
    Vue.use ( VueBaiduMap.default , {
        ak : 'gj0X3Gja0x3OHTLt8uthYMZ4zlznt5fX'
    } )
    export default {
        mixins : [ require ( "@/mymixins" ).default ] ,
        name : "MyBaiDuMap" ,
        data () {
            const that = this;
            return {
                center : { lng : 121.607776 , lat : 31.239684 } ,
                zoom : 18
            };
        } ,
        props : {
            mClass : {
                //样式地图大小
                type : String ,
                default : "w100 h100 "
            } ,
            mSearchOption : {
                //地图所显示的城市
                type : String ,
                default : () => {
                    return '全国'
                }
            } ,
        } ,
        computed : {
            // test() {
            //   let data = null;
            //   return data;
            // }
        } ,
        watch : {
            //监听数据变化
            // test: {
            //   deep: true,
            //   immediate: true,
            //   handler(newv, oldv) {
            // this.();
            // this.();
            // }
            // }
        } ,
        methods : {
            handler ( { BMap , map } ) {
                this.$log ( BMap );
                this.$log ( map );
            } ,
            bmGeoLocationSuccess ( point , AddressComponent , marker ) {
                this.$log ( point );
                this.$log ( AddressComponent );
                this.$log ( marker );
            }
        } ,
        mounted () {
        } ,
    };
</script>