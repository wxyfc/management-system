<template>
    <div v-if="handleChange">
        <videoPlayer class="h100 w100 video-js vjs-default-skin vjs-big-play-centered" ref="videoPlayer" :playsinline="true" :options="playerOptions"
                     @play="onPlayerPlay($event)" @pause="onPlayerPause($event)" @ended="onPlayerEnded($event)"
                     @loadeddata="onPlayerLoadeddata($event)" @waiting="onPlayerWaiting($event)"
                     @playing="onPlayerPlaying($event)" @timeupdate="onPlayerTimeupdate($event)"
                     @canplay="onPlayerCanplay($event)" @canplaythrough="onPlayerCanplaythrough($event)"
                     @ready="playerReadied($event)" @statechanged="playerStateChanged($event)"
        ></videoPlayer>
    </div>
</template>

<script>
    import { videoPlayer } from 'vue-video-player'

    export default {
        mixins : [ require ( "@/mymixins" ).default ] ,
        name : "AVideoPlayer" ,
        data () {
            return {
                handleChange : true ,
                handleTimeout : null
            };
        } ,
        components : {
            videoPlayer
        } ,
        props : {
            playbackRates : {//可选择的播放速度
                type : Array ,
                default : () => {
                    return [ 0.5 , 1.0 , 1.5 , 2.0 ];
                }
            } ,
            autoplay : {//自动播放
                type : Boolean ,
                default : false
            } ,
            WidthBasedHeight : {//WidthBasedHeight 基于宽度的高度

            
                type : Number ,
                default : 47
            } ,
            sources : {//资源 传对象即可
                type : Object ,
                default : () => {
                    return {
                        type : "video/mp4" ,
                        poster : "https://gitee.com/cloud_users/Cloud-management-system/raw/master/loginbg.jpg" ,
                        src : 'http://47.94.89.73:8080/zeefile/audio/mmexport1582698872924.mp4' ,//url地址
                    };
                }
            } ,
            poster : {//统一海报时的图片
                type : String ,
                default : "https://gitee.com/cloud_users/Cloud-management-system/raw/master/loginbg.jpg"
            } ,
            UnifiedPoster : {//是否统一海报
                type : Boolean ,
                default : false
            } ,
            Remaining : {//是否显示剩余时间
                type : Boolean ,
                default : true
            }
        } ,
        computed : {
            playerOptions () {
                let poster;
                if ( this.UnifiedPoster ) {
                    poster = this.poster;
                } else {
                    poster = this.sources.poster;
                }
                return {
                    playbackRates : this.playbackRates , //可选择的播放速度
                    autoplay : this.autoplay , //如果true,浏览器准备好时开始播放。
                    muted : false , // 默认情况下将会消除任何音频。
                    loop : false , // 视频一结束就重新开始。
                    preload : 'auto' , // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                    language : 'zh-CN' ,
                    aspectRatio : `100:${this.WidthBasedHeight}` , // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                    fluid : true , // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                    sources : [ this.sources ] ,
                    // {
                    //     type : "video/mp4" ,
                    //     src : 'http://47.94.89.73:8080/zeefile/audio/mmexport1582698872924.mp4'//url地址
                    // } , {
                    //     type : "video/mp4" ,
                    //     src : 'http://47.94.89.73:8080/zeefile/audio/mmexport1580792772036.mp4'//url地址
                    // } , {
                    //     type : "video/mp4" ,
                    //     src : 'http://47.94.89.73:8080/zeefile/audio/mmexport1580184347158.mp4'//url地址
                    // }
                    poster , //你的封面地址
                    // width: document.documentElement.clientWidth,
                    // notSupportedMessage : '此视频暂无法播放，请稍后再试' , //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                    controlBar : {
                        timeDivider : true ,//当前时间和持续时间的分隔符
                        durationDisplay : true ,//显示持续时间
                        remainingTimeDisplay : this.Remaining ,//是否显示剩余时间功能
                        fullscreenToggle : true  //全屏按钮
                    }
                }
            }
        } ,
        watch : {
            handleChange : {
                deep : true ,
                // immediate : true ,
                handler ( newv , oldv ) {
                    this.handlerSetTimeout ();
                }
            }
        } ,
        methods : {
            handlerSetTimeout () {
                let that = this;
                that.handleChange = false;
                that.handlerClear ();
                if ( this.handleTimeout == null ) {
                    this.handleTimeout = setTimeout ( () => {
                        that.handleChange = true;
                    } , 200 )
                }
            } ,
            handlerClear () {
                if ( this.handleTimeout != null ) {
                    clearTimeout ( this.handleTimeout )
                    this.handleTimeout = null;
                }
            } ,
            viodeIsPlayer ( b ) {
                if ( b ) {
                    //开始播放
                    this.$refs.videoPlayer.player.play ();
                } else {
                    this.$refs.videoPlayer.player.pause ();
                }
            } ,
            viodeIsMuted ( b ) {
                //是否静音
                this.$refs.videoPlayer.player.muted ( b );
            } ,
            playerReadied ( e ) {
                // this.$log ( { t : "playerReadied开始读取加载视频=====1" , e } );
            } ,
            onPlayerLoadeddata ( e ) {
                // this.$log ( { t : "onPlayerLoadeddata加载视频=====2" , e } );
            } ,
            playerStateChanged ( e ) {
                // this.$log ( { t : "playerStateChanged播放状态改变=====3 可播放、不可播放、正在播放  先是不能播放再到可播放了" , e } );
            } ,
            onPlayerCanplay ( e ) {
                // this.$log ( { t : "onPlayerCanplay是否可以播放=====4" , e } );
            } ,
            onPlayerCanplaythrough ( e ) {
                // this.$log ( { t : "onPlayerCanplaythrough应该是可以播放了=====5" , e } );
            } ,
            onPlayerTimeupdate ( e ) {
                // this.$log ( { t : "onPlayerTimeupdate播放时间的更改=====6" , e } );
            } ,
            onPlayerPause ( e ) {
                // this.$log ( { t : "onPlayerPause播放暂停了=====7" , e } );
            } ,
            onPlayerPlay ( e ) {
                // this.$log ( { t : "onPlayerPlay播放开始=====8" , e } );
            } ,
            onPlayerEnded ( e ) {
                // this.$log ( { t : "onPlayerEnded播放完毕或者结束=====9" , e } );
            } ,
            onPlayerWaiting ( e ) {
                // this.$log ( { t : "onPlayerWaiting可能是加载中=====00" , e } );
            } ,
            onPlayerPlaying ( e ) {
                // this.$log ( { t : "onPlayerPlaying可能是播放中=====00" , e } );
            } ,
        } ,
    };
</script>