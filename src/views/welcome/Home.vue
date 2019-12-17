<template>
    <div class="h9999">
        <!-- 5vh -->
        <HelloHeader></HelloHeader>
        <!-- 4vh -->
        <el-row v-if="homeQuickNav">
            <el-col :xs="24" :sm="12" :md="8" :lg="4" v-for="i in 6" :key="i">
                <BriefSee></BriefSee>
                <!-- <BriefSeeS :bsSmall="false"></BriefSeeS> -->
            </el-col>
        </el-row>
        <el-col :xs="24" :md="12" :lg="8">
            <ECharts
                    id="PostRevenue"
                    :height="bigHeight"
                    :data="require('@/echartsdata/PostRevenue')('折线图图')"
                    @clickECharts="clickECharts"
            ></ECharts>
        </el-col>
        <el-col :xs="24" :md="12" :lg="8">
            <!-- <ECharts
              :height="bigHeight"
              id="MapChart"
              :data="require('@/echartsdata/MapChart').default('折线图图')"
              @clickECharts="clickECharts"
            ></ECharts> -->
            <VertRollS :DHeight="bigHeight"></VertRollS>
        </el-col>
        <el-col :xs="24" :md="12" :lg="8">
            <ECharts
                    :height="bigHeight"
                    id="MultiplePillarsChart"
                    :data="require('@/echartsdata/MultiplePillarsChart')('折线图图')"
                    @clickECharts="clickECharts"
            ></ECharts>
        </el-col>
        <el-col :xs="24" :md="12" :lg="8">
            <ECharts
                    :height="bigHeight"
                    id="PieChart"
                    :data="require('@/echartsdata/PieChart')('折线图图')"
                    @clickECharts="clickECharts"
            ></ECharts>
        </el-col>
        <el-col :xs="24" :md="12" :lg="8">
            <ECharts
                    :height="bigHeight"
                    id="PolylineChart"
                    :data="require('@/echartsdata/PolylineChart')('折线图图')"
                    @clickECharts="clickECharts"
            ></ECharts>
        </el-col>
        <el-col :xs="24" :md="12" :lg="8">
            <ECharts
                    :height="bigHeight"
                    id="RadarChart"
                    :data="require('@/echartsdata/RadarChart')('折线图图')"
                    @clickECharts="clickECharts"
            ></ECharts>
        </el-col>
        <!-- @click.native="test" -->
    </div>
</template>

<script>
    import { setLocal } from "@/function";

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
            bigHeight () {
                if ( this.homeQuickNav ) {
                    return "44vh";
                } else {
                    return "47.3vh";
                }
            }
        } ,
        components : {
            HelloHeader : () => import("@/views/framework/HelloHeader.vue") ,
            VertRollS : () => import("@/assets/VertRollS.vue") ,
            BriefSee : () => import("@/assets/BriefSee.vue") ,
            ECharts : () => import("@/assets/ECharts.vue")
        } ,
        methods : {
            clickECharts ( p ) {
            } ,
            beforeunloadFn ( e ) {
                setLocal ( "userMemory" , {
                    userInfo : this.userInfo ,
                    otherInfo : this.otherInfo ,
                    language : this.language
                } );
                let confirmationMessage = "user-yun";
                ( e || window.event ).returnValue = confirmationMessage; // Gecko and Trident
                return confirmationMessage;
            }
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
            window.addEventListener ( "beforeunload" , this.beforeunloadFn , true );
        } ,
        beforeDestroy () {
            // window.removeEventListener("resize", this.resizeHandler);
            window.removeEventListener ( "beforeunload" , this.beforeunloadFn , true );
        }
    };
</script>