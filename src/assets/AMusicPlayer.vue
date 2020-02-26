<template>
    <fragment>
        <Aplayer :showLrc="showLrc" :autoplay="autoplay" :mutex="mutex" :mini="mini" :float="float" :shuffle="shuffle" :listFolded="listFolded"
                 :theme="theme" :preload="preload" :listMaxHeight="listMaxHeight" :repeat="repeat" :controls="controls" :muted="muted"
                 :music="music" :list="list"></Aplayer>
    </fragment>
</template>

<script>
    export default {
        mixins : [ require ( "@/mymixins" ).default ] ,
        name : "AMusicPlayer" ,
        data () {
            return {};
        } ,
        components : {
            Aplayer : () => import('vue-aplayer')
        } ,
        props : {
            showLrc : {
                //显示歌词
                type : Boolean ,
                default : true
            } ,
            autoplay : {
                //自动播放
                type : Boolean ,
                default : false
            } ,
            controls : {
                //控制按钮
                type : Boolean ,
                default : true
            } ,
            muted : {
                //静音
                type : Boolean ,
                default : false
            } ,
            mutex : {
                //当一首音乐正在播放时，暂停其他音乐
                type : Boolean ,
                default : true
            } ,
            mini : {
                //迷你模式
                type : Boolean ,
                default : false
            } ,
            float : {
                //浮动模式
                type : Boolean ,
                default : false
            } ,
            shuffle : {
                //随机播放
                type : Boolean ,
                default : false
            } ,
            listFolded : {
                //列表折叠
                type : Boolean ,
                default : false
            } ,
            theme : {
                //主题颜色
                type : String ,
                default : "pic" //颜色值会改变进度条 pic则从背景图提取颜色
            } ,
            repeat : {
                //播放模式，repeat-one:重复一次 repeat-all:重复所有 no-repeat:不重复 music:当前 list:列表 none:无
                type : String ,
                default : "repeat-all"
            } ,
            preload : {
                //	音乐加载方式，none,metadata,auto
                type : String ,
                default : "metadata"
            } ,
            listMaxHeight : {
                //播放列表的最大高度
                type : String ,
                default : "none"
            } ,
            music : {
                //歌曲对象
                type : Object ,
                default : () => {
                    return {
                        src : "http://m10.music.126.net/20200226215643/10e5f88aa12c821ba68bb865d93dbbc1/ymusic/0459/045c/520c/330c359473365e50a368ef0d43bc612f.mp3" ,//    音乐源
                        title : "世间美好与你环环相扣" ,//    音乐标题
                        artist : "柏松" ,//    艺术家
                        pic : "http://p1.music.126.net/DK1_4sP_339o5rowMdPXdw==/109951164071024476.jpg" ,//   封面图片
                        lrc : "暂无歌词" ,//   歌词文件的url
                        // theme : "#e198b4" ,//    主题颜色
                    };
                }
            } ,
            list : {
                type : Array ,
                default : () => {
                    return []
                }
            }
        } ,
        methods : {} ,
        mounted () {
        } ,
        beforeDestroy () {
        } ,

    };
</script>
<style scoped>
    .test {
    }
</style>