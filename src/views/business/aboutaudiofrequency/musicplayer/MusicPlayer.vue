<template>
    <el-row>
        <mt>{{language[$options.name]}}</mt>
        <el-col :xs="24" :sm="18" :md="12" :lg="10" :xl="8" class="padding1vw">
            <el-form label-width="50%">
                <el-form-item>
                    <!--文字提示按钮-->
                    <span slot="label" class="emphasize">{{language.fontTooltip}}</span>
                    <mdb :tooltip="language.fontTooltip" :disabledTime="0">{{ language.fontTooltip }}</mdb>
                </el-form-item>
            </el-form>
        </el-col>
        <el-col :xs="24" :sm="18" :md="12" :lg="10" :xl="8" class="padding1vw">
            <AMusicPlayer :list="list"></AMusicPlayer>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        mixins : [ require ( "@/mymixins" ).default ] ,
        name : "musicPlayer" ,
        data () {
            return {
                list : [
                    {
                        src : "http://m10.music.126.net/20200226224028/0d573cc76a1d0be8294f8ac772a04231/ymusic/560f/075e/535f/ae15cebedc04c39f79f6d5ac577f2977.mp3" ,//    音乐源
                        title : "冬眠" ,//    音乐标题
                        artist : "司南" ,//    艺术家
                        pic : "http://p1.music.126.net/4KDBaQXnQywQovmqvjx-8Q==/109951164444131697.jpg" ,//   封面图片
                    } , {
                        src : "http://m10.music.126.net/20200226224334/2b63b03b2ebcf72b9469e37baf0f3690/ymusic/0759/030f/540b/039ace5c004ebd382de4ca163145cf9b.mp3" ,//    音乐源
                        title : "大眠 (完整版)" ,//    音乐标题
                        artist : "小乐哥" ,//    艺术家
                        pic : "http://p2.music.126.net/zgDvTPDSYKjQUjkV8sQUOA==/109951164605092552.jpg" ,//   封面图片
                    } , {
                        src : "http://m10.music.126.net/20200226215643/10e5f88aa12c821ba68bb865d93dbbc1/ymusic/0459/045c/520c/330c359473365e50a368ef0d43bc612f.mp3" ,//    音乐源
                        title : "世间美好与你环环相扣" ,//    音乐标题
                        artist : "柏松" ,//    艺术家
                        pic : "http://p1.music.126.net/DK1_4sP_339o5rowMdPXdw==/109951164071024476.jpg" ,//   封面图片
                    } , {
                        src : "http://m10.music.126.net/20200226224656/a3a8ee919e542d1da3bcff1886745dab/ymusic/560e/000f/020e/ad379bdaee7e29190c575de9db396d0e.mp3" ,//    音乐源
                        title : "这就是爱吗" ,//    音乐标题
                        artist : "十豆彡" ,//    艺术家
                        pic : "http://p1.music.126.net/JgYOF-3unsM09TGhP5w6Ow==/109951164581280547.jpg" ,//   封面图片
                    }
                ]
            };
        } ,
        components : {
            AMusicPlayer : () => import('@/assets/AMusicPlayer')
        } ,
        methods : {
            async getRequest () {
                let language = await
                    this.$Get (
                        `/musicapi/top/list` , {
                            idx : 1
                        }
                    );
            } ,
        } ,
        mounted () {
            // this.getRequest ();
        } ,
        beforeDestroy () {
        } ,
    };
</script>
<style scoped>
    .test {
    }
</style>