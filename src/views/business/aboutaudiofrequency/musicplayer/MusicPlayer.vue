<template>
    <el-row>
        <mt>{{language[$options.name]}}</mt>
        <el-col :xs="24" :sm="18" :md="12" :lg="10" :xl="8" class="padding1vw">
            <el-form label-width="50%">
                <el-form-item>
                    <!--显示歌词-->
                    <span slot="label" class="emphasize">{{language.showLrc}}</span>
                    <el-switch v-model="showLrc"></el-switch>
                </el-form-item>
                <el-form-item>
                    <!--自动播放-->
                    <span slot="label" class="emphasize">{{language.autoplay}}</span>
                    <el-switch v-model="autoplay"></el-switch>
                </el-form-item>
                <!--<el-form-item>-->
                <!--&lt;!&ndash;控制按钮&ndash;&gt;-->
                <!--<span slot="label" class="emphasize">{{language.controlsButton}}</span>-->
                <!--<el-switch v-model="controlsButton"></el-switch>-->
                <!--</el-form-item>-->
                <el-form-item>
                    <!--静音-->
                    <span slot="label" class="emphasize">{{language.muted}}</span>
                    <el-switch v-model="muted"></el-switch>
                </el-form-item>
                <el-form-item>
                    <!--迷你模式-->
                    <span slot="label" class="emphasize">{{language.miniMode}}</span>
                    <el-switch v-model="miniMode"></el-switch>
                </el-form-item>
                <el-form-item>
                    <!--浮动模式-->
                    <span slot="label" class="emphasize">{{language.floatMode}}</span>
                    <el-switch v-model="floatMode"></el-switch>
                </el-form-item>
                <el-form-item>
                    <!--随机播放-->
                    <span slot="label" class="emphasize">{{language.shufflePlayer}}</span>
                    <el-switch v-model="shufflePlayer"></el-switch>
                </el-form-item>
                <!--<el-form-item>-->
                <!--&lt;!&ndash;列表折叠&ndash;&gt;-->
                <!--<span slot="label" class="emphasize">{{language.listFolded}}</span>-->
                <!--<el-switch v-model="listFolded"></el-switch>-->
                <!--</el-form-item>-->
                <el-form-item>
                    <!--播放模式-->
                    <span slot="label" class="emphasize">{{language.playerMode}}</span>

                    <el-radio-group v-model="playerMode">
                        <el-radio-button v-for="(item,i) in playerModeList" :label="item.value" :key="i">
                            <!--<i :class="item.icon" class="largeTitle"></i>-->
                            {{item.label}}
                        </el-radio-button>
                    </el-radio-group>
                </el-form-item>
                <el-form-item>
                    <!--播放列表的最大高度-->
                    <span slot="label" class="emphasize">{{language.listMaxHeight}}</span>
                    <el-slider v-model="listMaxHeight" class="width50" :min="100" :max="200" :step="10"></el-slider>
                </el-form-item>
            </el-form>
        </el-col>
        <el-col :xs="24" :sm="18" :md="12" :lg="10" :xl="8" class="padding1vw">
            <AMusicPlayer :showLrc="showLrc" :autoplay="autoplay" :shuffle="shufflePlayer"
                          :muted="muted" :mini="miniMode" :float="floatMode" :repeat="playerMode"
                          :listMaxHeight="listMaxHeight+'px'" :list="list" :music="list[2]"></AMusicPlayer>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        mixins : [ require ( "@/mymixins" ).default ] ,
        name : "musicPlayer" ,
        data () {
            return {
                showLrc : true ,
                autoplay : true ,
                // controlsButton : false ,
                muted : false ,
                miniMode : false ,
                floatMode : false ,
                shufflePlayer : false ,
                // listFolded : false ,
                playerMode : "repeat-all" ,
                //播放模式，repeat-one:循环单曲 repeat-all:循环所有 no-repeat:不循环 music:当前 list:列表 none:无
                playerModeList : [
                    { label : "循环单曲" , value : "repeat-one" } ,
                    { label : "循环所有" , value : "repeat-all" } ,
                    { label : "不循环" , value : "no-repeat" } ] ,
                listMaxHeight : 100 ,
                list : [
                    {
                        src : "http://47.94.89.73:8080/zeefile/audio/%E5%86%AC%E7%9C%A0.mp3" ,//    音乐源
                        title : "冬眠" ,//    音乐标题
                        artist : "司南" ,//    艺术家
                        pic : "http://p1.music.126.net/4KDBaQXnQywQovmqvjx-8Q==/109951164444131697.jpg" ,//   封面图片
                    } , {
                        src : "http://47.94.89.73:8080/zeefile/audio/%E5%A4%A7%E7%9C%A0.mp3" ,//    音乐源
                        title : "大眠" ,//    音乐标题
                        artist : "小乐哥" ,//    艺术家
                        pic : "http://p2.music.126.net/zgDvTPDSYKjQUjkV8sQUOA==/109951164605092552.jpg" ,//   封面图片
                    } , {
                        src : "http://47.94.89.73:8080/zeefile/audio/%E4%B8%96%E9%97%B4%E7%BE%8E%E5%A5%BD%E4%B8%8E%E4%BD%A0%E7%8E%AF%E7%8E%AF%E7%9B%B8%E6%89%A3.mp3" ,//    音乐源
                        title : "世间美好与你环环相扣" ,//    音乐标题
                        artist : "柏松" ,//    艺术家
                        pic : "http://p1.music.126.net/DK1_4sP_339o5rowMdPXdw==/109951164071024476.jpg" ,//   封面图片
                    } , {
                        src : "http://47.94.89.73:8080/zeefile/audio/%E8%BF%99%E5%B0%B1%E6%98%AF%E7%88%B1%E5%90%97.mp3" ,//    音乐源
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