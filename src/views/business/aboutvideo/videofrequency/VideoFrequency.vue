<template>
    <el-row>
        <mt>{{language[$options.name]}}</mt>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="8" style="min-height: 80%;" class="padding1vw">
            <el-form label-width="50%">
                <el-form-item>
                    <!--可选择的播放速度-->
                    <span slot="label" class="emphasize">{{language.playBackRates}}</span>
                    {{ playBackRates }}
                    <mi icon="el-icon-circle-plus-outline" :tooltip="language.clickAdd" @click="playBackRatesClickAdd"></mi>
                </el-form-item>
                <el-form-item>
                    <!--自动播放-->
                    <span slot="label" class="emphasize">{{language.autoPlay}}</span>
                    <el-col class="normal" :span="24">{{language.pageReadyAutoPlay}}</el-col>
                    <el-switch v-model="autoPlay"></el-switch>
                </el-form-item>
                <el-form-item>
                    <!--基于宽度的高度-->
                    <span slot="label" class="emphasize">{{language.WidthBasedHeight}}</span>
                    <el-slider v-model="WidthBasedHeight" class="width50" :min="50" :max="100" :step="10"></el-slider>
                </el-form-item>
                <!--<el-form-item>-->
                <!--&lt;!&ndash;统一海报时的图片&ndash;&gt;-->
                <!--<span slot="label" class="emphasize">{{language.showLrc}}</span>-->
                <!--<el-switch v-model="showLrc"></el-switch>-->
                <!--</el-form-item>-->
                <el-form-item>
                    <!--播放或者停止-->
                    <span slot="label" class="emphasize">{{language.playOrStop}}</span>
                    <mi icon="el-icon-video-play" :tooltip="language.play" @click="videoPlay(true)"></mi>
                    <mi icon="el-icon-video-pause" :tooltip="language.stop" @click="videoPlay(false)"></mi>
                </el-form-item>
                <el-form-item>
                    <!--静音-->
                    <span slot="label" class="emphasize">{{language.mute}}</span>
                    <mi icon="iconfont icon-shengyin" :tooltip="language.voice" @click="videoVoice(false)"></mi>
                    <mi icon="iconfont icon-jingyin" :tooltip="language.mute" @click="videoVoice(true)"></mi>
                </el-form-item>
                <el-form-item>
                    <!--是否统一海报-->
                    <span slot="label" class="emphasize">{{language.UnifiedPoster}}</span>
                    <el-switch v-model="UnifiedPoster"></el-switch>
                </el-form-item>
                <el-form-item>
                    <!--是否显示剩余时间-->
                    <span slot="label" class="emphasize">{{language.Remaining}}</span>
                    <el-switch v-model="Remaining"></el-switch>
                </el-form-item>


            </el-form>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="16" style="min-height: 80%;" class="padding1vw">
            <AVideoPlayer
                    ref="aVideoPlayer"
                    :playbackRates="playBackRates"
                    :autoplay="autoPlay"
                    :WidthBasedHeight="WidthBasedHeight"
                    :sources="sourcesList[sourcesItem]"
                    :poster="poster"
                    :UnifiedPoster="UnifiedPoster"
                    :Remaining="Remaining"
            ></AVideoPlayer>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        mixins : [ require ( "@/mymixins" ).default ] ,
        name : "videoFrequency" ,
        data () {
            return {
                playBackRates : [ 0.5 , 1.0 , 1.5 , 2.0 ] ,
                autoPlay : false ,
                WidthBasedHeight : 47 ,
                sourcesList : [ {
                    type : "video/mp4" ,
                    poster : "http://i0.hdslb.com/bfs/article/e624afce6cbe2c49e7f474aa9dcb6701f258b641.jpg" ,
                    src : 'http://47.94.89.73:8080/zeefile/audio/mmexport1582698872924.mp4' ,
                } ] ,
                sourcesItem : 0 ,
                poster : "https://gitee.com/cloud_users/Cloud-management-system/raw/master/loginbg.jpg" ,
                UnifiedPoster : false ,
                Remaining : false
            };
        } ,
        components : {
            AVideoPlayer : () => import('@/assets/AVideoPlayer')
        } ,
        methods : {
            videoPlay ( is ) {
                this.$refs.aVideoPlayer.viodeIsPlayer ( is );
            } ,
            videoVoice ( is ) {
                this.$refs.aVideoPlayer.viodeIsMuted ( is );
            } ,
            playBackRatesClickAdd () {
                let l = this.playBackRates.length;
                let num = this.playBackRates[ l - 1 ];
                if ( l <= 5 ) {
                    this.playBackRates.push ( num * num - num + 1 )
                } else {
                    this.eleNotify ( this.language.notAdd )
                }
            } ,
            getRequest () {
                let projectId = this.userInfo.projectId;
                let userProject = this.userInfo.userProject;
                this.get ( `/zone/1231321/${userProject}` , {} ).then ( res => {
                    let data = res.Data;
                    this.List = data;
                } );
            } ,
        } ,
    };
</script>