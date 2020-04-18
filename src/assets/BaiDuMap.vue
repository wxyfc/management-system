<template>
    <fragment>
        <!--<el-autocomplete v-model="address" :fetch-suggestions="querySearch" placeholder="请输入详细地址" style="width: 100%" :trigger-on-focus="false" @select="handleSelect"/>-->
        <baidu-map :class="mClass" :center="center" :zoom="zoom" @ready="handler" :scroll-wheel-zoom="true">
            <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true" @locationSuccess="bmGeoLocationSuccess"></bm-geolocation>
            <!-- <bm-local-search
              :keyword="keyword"
              :auto-viewport="true"
              :location="location"
              zoom="12.8"
            ></bm-local-search>-->
            <!-- <bm-view class="map"></bm-view> -->
            <!-- <bm-local-search :keyword="keyword" :auto-viewport="true" :location="location"></bm-local-search> -->
        </baidu-map>
    </fragment>
</template>

<script>
    Vue.use ( VueBaiduMap.default , {
        ak : "gj0X3Gja0x3OHTLt8uthYMZ4zlznt5fX"
    } );
    export default {
        mixins : [ require ( "@/mymixins" ).default ] ,
        name : "MyBaiDuMap" ,
        data () {
            const that = this;
            return {
                center : { lng : 121.607776 , lat : 31.239684 } ,
                zoom : 18 ,
                address : "" ,
                // location : "北京" ,
                // keyword : "百度" ,
                // coordinate : ""
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
                    return "全国";
                }
            }
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
            // //点击选中建议项时触发
            // handleSelect ( item ) {
            //     var { point } = item;
            //     console.log ( item );
            //     this.coordinate = point;
            //     this.makerCenter ( point );
            // } ,
            // //文本框变化事件
            // querySearch ( queryString , cb ) {
            //     let that = this;
            //     console.log ( queryString );
            //     console.log ( cb );
            //     var myGeo = new this.BMap.Geocoder ();
            //     myGeo.getPoint ( queryString , ( point ) => {
            //             if ( point ) {
            //                 that.coordinate = point;
            //                 that.makerCenter ( point );
            //             } else {
            //                 that.coordinate = null;
            //             }
            //         } ,
            //         this.locationCity
            //     );
            //     var options = {
            //         onSearchComplete : function ( results ) {
            //             if ( local.getStatus () === 0 ) {
            //                 // 判断状态是否正确
            //                 var s = [];
            //                 for ( var i = 0 ; i < results.getCurrentNumPois () ; i++ ) {
            //                     var x = results.getPoi ( i );
            //                     var item = { value : x.address + x.title , point : x.point };
            //                     s.push ( item );
            //                     cb ( s );
            //                 }
            //             } else {
            //                 cb ();
            //             }
            //         }
            //     };
            //     var local = new this.BMap.LocalSearch ( this.map , options );
            //     local.search ( queryString );
            // } ,
            handler ( { BMap , map } ) {
                // this.BMap = BMap;
                // this.map = map;
                this.$log ( BMap );
                this.$log ( map );
            } ,
            // makerCenter ( point ) {
            //     if ( this.map ) {
            //         this.map.clearOverlays ();
            //         this.map.addOverlay ( new this.BMap.Marker ( point ) );
            //         this.center.lng = point.lng;
            //         this.center.lat = point.lat;
            //         this.mapZoom = 15;
            //     }
            // } ,
            bmGeoLocationSuccess ( point , AddressComponent , marker ) {
                this.$log ( point );
                this.$log ( AddressComponent );
                this.$log ( marker );
            }
        } ,
        mounted () {
        }
    };
</script>