<template>
    <fragment>
        <el-col :class="mClass" style="position: relative;">
            <el-amap-search-box v-if="search" :search-option="hSearchOption" :on-search-result="onSearchResult"></el-amap-search-box>
            <el-amap vid="amap-vue" :plugin="plugin" :center="center" :zoom="zoom" :events="events">
                <el-amap-marker
                        vid="component-marker"
                        v-if="gPosition[0]"
                        v-for="(item,index) in gPosition"
                        :key="(index*index+1)*index+999"
                        :position="item.position"
                        :animation="item.animation"
                        :content="item.content"
                        :title="item.title"
                ></el-amap-marker>
                <el-amap-marker
                        vid="component-marker"
                        v-if="mPosition[0]"
                        v-for="(item,index) in mPosition"
                        :key="index"
                        :position="item.position"
                        animation="AMAP_ANIMATION_BOUNCE"
                        :title="item.title"
                ></el-amap-marker>
                <el-amap-marker
                        vid="component-marker"
                        :position="center"
                        animation="AMAP_ANIMATION_BOUNCE"
                        :title="address"
                ></el-amap-marker>
            </el-amap>
            <el-tag v-if="address" class="el-amap-tag-address">{{address}}</el-tag>
        </el-col>
    </fragment>
</template>

<script>
    import { GetDistance , $addCSS } from "@/function";
    import VueAMap from "vue-amap";

    export default {
        name : "MyGAMap" ,
        components : {
            VueAMap : VueAMap.initAMapApiLoader ( {
                // 高德key
                key : '1781c47c1cd7be7028b0a1706715cf70' ,
                // 插件集合 （插件按需引入）
                plugin : [ 'AMap.Geolocation' , 'AMap.Geocoder' ]
            } )
        } ,
        data () {
            const that = this;
            return {
                hSearchOption : {} ,
                center : [ 121.607776 , 31.239684 ] ,
                zoom : 18 , //级别
                plugin : [
                    {
                        enableHighAccuracy : true , //是否使用高精度定位，默认:true
                        timeout : 100 , //超过10秒后停止定位，默认：无穷大
                        maximumAge : 0 , //定位结果缓存0毫秒，默认：0
                        convert : true , //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
                        showButton : true , //显示定位按钮，默认：true
                        buttonPosition : "RB" , //定位按钮停靠位置，默认：'LB'，左下角
                        showMarker : true , //定位成功后在定位到的位置显示点标记，默认：true
                        showCircle : true , //定位成功后用圆圈表示定位精度范围，默认：true
                        panToLocation : true , //定位成功后将定位到的位置作为地图中心点，默认：true
                        zoomToAccuracy : true , //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：f
                        extensions : "all" ,
                        pName : "Geolocation" ,
                        events : {
                            init ( o ) {
                                // o 是高德地图定位插件实例
                                o.getCurrentPosition ( ( status , result ) => {
                                    if ( result && result.position ) {
                                        that.hSearchOption = {
                                            city : result.addressComponent.province ,
                                            citylimit : true
                                        }
                                        that.center = [ result.position.lng , result.position.lat ];
                                    }
                                } );
                            }
                        }
                    }
                ] ,
                events : {
                    click ( e ) {
                        that.center = [ e.lnglat.lng , e.lnglat.lat ];
                        that.zoom = 18;
                        // 这里通过高德 SDK 完成。
                        let geocoder = new AMap.Geocoder ( {
                            radius : 1000 ,
                            extensions : "all"
                        } );
                        geocoder.getAddress ( that.center , function ( status , result ) {
                            if ( status === "complete" && result.info === "OK" ) {
                                if ( result && result.regeocode ) {
                                    that.address = result.regeocode.formattedAddress;
                                    that.$emit ( "mMapClick" , that.center , that.address )
                                }
                            }
                        } );
                        that.ResultHandle ( false );
                    }
                } ,
                address : "" ,
                poisList : [] ,
                cssText : "height: 40px;width: 80%;position: absolute;left: 5px;top: 5px;"
            };
        } ,
        props : {
            mCenter : {
                //地图默认显示的中间点
                type : Array ,
                default : null
            } ,
            mAddress : {
                type : String ,
                default : null
            } ,
            mClass : {
                //样式地图大小
                type : String ,
                default : "w100 h100 "
            } ,
            mPosition : {
                //地图循环标注的点，在地图处理显示的循环点 蓝色默认点
                type : Array ,
                default : null
            } ,
            gPosition : {
                //地图循环标注的点，在地图处理显示的循环点 自定义图标点
                type : Array ,
                default : null
            } ,
            mSearchOption : {
                //地图所显示的城市
                type : Object ,
                default : () => {
                    return {
                        city : '全国' ,
                        citylimit : true
                    };
                }
            } ,
            search : {
                //是否开启查询
                type : Boolean ,
                default : true
            }
        } ,
        computed : {} ,
        watch : {
            mCenter : {
                handler ( newValue , oldValue ) {
                    if ( newValue != null ) {
                        this.center = newValue;
                    }
                } ,
                immediate : true ,
                deep : true
            } ,
            mAddress : {
                handler ( newValue , oldValue ) {
                    if ( newValue != null ) {
                        this.address = newValue;
                    } else {
                        this.address = "Backstage Management System";
                    }
                } ,
                immediate : true ,
                deep : true
            } ,
            mPosition : {
                handler ( newValue , oldValue ) {
                } ,
                immediate : true ,
                deep : true
            } ,
            gPosition : {
                handler ( newValue , oldValue ) {
                } ,
                immediate : true ,
                deep : true
            } ,
            mSearchOption : {
                immediate : true ,
                deep : true ,
                handler ( newValue , oldValue ) {
                    this.hSearchOption = this.$avoid ( newValue )
                }
            } ,
            center : {
                handler ( newValue , oldValue ) {
                    // this.$emit("mMapClick",this.center, this.address)
                } ,
                immediate : true ,
                deep : true
            }
        } ,
        methods : {
            onSearchResult ( pois ) {
                //搜索结果的集合
                let that = this;
                that.zoom = 18;
                that.center = [ pois[ 0 ].lng , pois[ 0 ].lat ];
                that.poisList = pois;
                that.ResultHandle ( true );
            } ,
            ResultHandle ( type ) {
                let that = this;
                let spot = [];
                that.poisList.forEach ( ( data , index , list ) => {
                    let position = [ data.lng , data.lat ];
                    let title = data.name + ":" + data.address;
                    spot.push ( { position , title } );
                    if ( index == list.length - 1 ) {
                        let n = GetDistance ( data.lng , data.lat , that.center[ 0 ] , that.center[ 1 ] );
                        that.mSwitch ( parseInt ( n ) );
                    }
                } );
                if ( type ) {
                    that.$emit ( "mSearchResult" , spot )
                }
                ;
            } ,
            mSwitch ( n ) {
                //地图等级的处理
                if ( n < 1 ) n = 0;
                else if ( n < 2 ) n = 1;
                else if ( n < 5 ) n = 2;
                else if ( n < 10 ) n = 5;
                else if ( n < 20 ) n = 10;
                else if ( n < 25 ) n = 20;
                else if ( n < 50 ) n = 25;
                else if ( n < 100 ) n = 50;
                else n = 100;
                switch ( n ) {
                    case 0:
                        this.zoom = this.zoom < 16 ? this.zoom : 16;
                        break;
                    case 1:
                        this.zoom = this.zoom < 15 ? this.zoom : 15;
                        break;
                    case 2:
                        this.zoom = this.zoom < 14 ? this.zoom : 14;
                        break;
                    case 5:
                        this.zoom = this.zoom < 13 ? this.zoom : 13;
                        break;
                    case 10:
                        this.zoom = this.zoom < 12 ? this.zoom : 12;
                        break;
                    case 20:
                        this.zoom = this.zoom < 11 ? this.zoom : 11;
                        break;
                    case 25:
                        this.zoom = this.zoom < 10 ? this.zoom : 10;
                        break;
                    case 50:
                        this.zoom = this.zoom < 9 ? this.zoom : 9;
                        break;
                    case 100:
                        this.zoom = this.zoom < 8 ? this.zoom : 8;
                        break;
                    default:
                        this.zoom = 18;
                        break;
                }
            }
        } ,
        mounted () {
            $addCSS ( `.el-vue-search-box-container{${this.cssText}}` )
        } ,
    };
</script>