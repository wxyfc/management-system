<template>
    <el-row>
        <mt>{{language[$options.name]}}</mt>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="8" style="min-height: 80%;" class="padding1vw">
            1
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="16" style="min-height: 80%;" class="padding1vw">
            <AVideoPlayer></AVideoPlayer>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        mixins : [ require ( "@/mymixins" ).default ] ,
        name : "videoFrequency" ,
        data () {
            return {};
        } ,
        components : {
            AVideoPlayer : () => import('@/assets/AVideoPlayer')
        } ,
        methods : {
            getRequest () {
                let projectId = this.userInfo.projectId;
                let userProject = this.userInfo.userProject;
                this.get ( `/zone/1231321/${userProject}` , {} ).then ( res => {
                    let data = res.Data;
                    this.List = data;
                } );
            } ,
        } ,

        created () {
            //创建
        } ,

        mounted () {
            //渲染
        } ,
    };
</script>