<template>
    <div :class="homeHand?'h9999':'h100'">
        <!-- 5% -->
        <HelloHeader v-if="homeHand"></HelloHeader>
        <!-- 5% -->
        <el-row v-if="homeQuickNav">
            <el-col :xs="24" :sm="12" :md="8" :lg="4" v-for="i in 6" :key="i">
                <BriefSee></BriefSee>
            </el-col>
        </el-row>
        <el-col :xs="24" :md="12" :lg="8" :style="{height:bigHeight}">
            <ECharts id="PostRevenue" :data="require('@/echartsdata/PostRevenue')('折线图图')" @clickECharts="clickECharts"></ECharts>
        </el-col>
        <el-col :xs="24" :md="12" :lg="8" :style="{height:bigHeight}">
            <!--<ECharts id="MapChart" :data="require('@/echartsdata/MapChart').default('折线图图')" @clickECharts="clickECharts"></ECharts>-->
            <VertRollS></VertRollS>
        </el-col>
        <el-col :xs="24" :md="12" :lg="8" :style="{height:bigHeight}">
            <ECharts id="MultiplePillarsChart" :data="require('@/echartsdata/MultiplePillarsChart')('折线图图')" @clickECharts="clickECharts"></ECharts>
        </el-col>
        <el-col :xs="24" :md="12" :lg="8" :style="{height:bigHeight}">
            <ECharts id="PieChart" :data="require('@/echartsdata/PieChart')('折线图图')" @clickECharts="clickECharts"></ECharts>
        </el-col>
        <el-col :xs="24" :md="12" :lg="8" :style="{height:bigHeight}">
            <ECharts id="PolylineChart" :data="require('@/echartsdata/PolylineChart')('折线图图')" @clickECharts="clickECharts"></ECharts>
        </el-col>
        <el-col :xs="24" :md="12" :lg="8" :style="{height:bigHeight}">
            <ECharts id="RadarChart" :data="require('@/echartsdata/RadarChart')('折线图图')" @clickECharts="clickECharts"></ECharts>
        </el-col>
        <!-- @click.native="test" -->
    </div>
</template>

<script>
    // import { setLocal } from "@/function";
    
    export default {
        mixins : [ require ( "@/mymixins" ).default ] ,
        name : "home" ,
        data () {
            return {};
        } ,
        computed : {
            homeQuickNav () {
                return this.otherInfo.homeQuickNav;
            } ,
            homeHand () {
                return this.$route.name == "home";
            } ,
            bigHeight () {
                if ( this.homeQuickNav ) {
                    if ( this.homeHand ) {
                        return "44.4%";
                    } else {
                        return "46.8%";
                    }
                } else {
                    if ( this.homeHand ) {
                        return "47.4%";
                    } else {
                        return "49.8%";
                    }
                }
            }
        } ,
        components : {
            HelloHeader : () => import("@/views/framework/HelloHeader") ,
            VertRollS : () => import("@/assets/VertRollS") ,
            BriefSee : () => import("@/assets/BriefSee") ,
            ECharts : () => import("@/assets/ECharts")
        } ,
        methods : {
            clickECharts ( p ) {
            } ,
            // beforeunloadFn ( e ) {
            //     setLocal ( "userMemory" , {
            //         userInfo : this.userInfo ,
            //         otherInfo : this.otherInfo ,
            //         language : this.language
            //     } );
            //     let confirmationMessage = "user-yun";
            //     ( e || window.event ).returnValue = confirmationMessage; // Gecko and Trident
            //     return confirmationMessage;
            // }
            // resizeHandler() {
            //   let clientWidth = document.body.clientWidth;
            //   let clientHeight = document.body.clientHeight;
            //   if (clientWidth <= 992 || clientHeight <= 558) {
            //     this.setOtherInfo({ menuCollapse: true });
            //   } else {
            //     this.setOtherInfo({ menuCollapse: false });
            //   }
            // }
        } ,
        mounted () {
            // this.resizeHandler();
            // window.addEventListener("resize", this.resizeHandler);
            // window.addEventListener ( "beforeunload" , this.beforeunloadFn , true );
        } ,
        beforeDestroy () {
            // window.removeEventListener("resize", this.resizeHandler);
            // window.removeEventListener ( "beforeunload" , this.beforeunloadFn , true );
        }
    };
</script>