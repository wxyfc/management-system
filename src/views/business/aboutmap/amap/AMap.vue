<template>
    <el-row>
        <mt>{{language[$options.name]}}</mt>
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" style="height: 90%;" class="padding1vw">
            <GMap :mPosition="mPosition" @mSearchResult="mSearchResult" :mMapClick="mMapClick"></GMap>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        mixins : [ require ( "@/mymixins" ).default ] ,
        name : "aMap" ,
        data () {
            return {
                mPosition : [] ,
            };
        } ,
        components : {
            GMap : () => import('@/assets/GMap')
        } ,
        methods : {
            mSearchResult ( pois ) {
                //地图组件查询
                this.mPosition = pois;
            } ,
            mMapClick ( center , address ) {
                //地图组件点击监听
            } ,
        } ,
    };
</script>
<style scoped>
    .test {
    }
</style>