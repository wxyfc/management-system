<template>
    <fragment>
        <VueMusicPlayer :showLrc="showLrc" :autoplay="autoplay" :mutex="mutex" :mini="mini" :float="float" :shuffle="shuffle" :listFolded="listFolded"
                        :theme="theme" :preload="preload" :listMaxHeight="listMaxHeight" :repeat="repeat" :controls="controls" :muted="muted"
                        :music="music" :list="list"></VueMusicPlayer>
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
            VueMusicPlayer : () => import('vue-aplayer')
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
                //显示原生 audio 元素
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
                //播放模式，repeat-one:循环单曲 repeat-all:循环所有 no-repeat:不循环 music:当前 list:列表 none:无
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
                        src : "http://47.94.89.73:8080/zeefile/audio/%E4%B8%96%E9%97%B4%E7%BE%8E%E5%A5%BD%E4%B8%8E%E4%BD%A0%E7%8E%AF%E7%8E%AF%E7%9B%B8%E6%89%A3.mp3" ,//    音乐源
                        title : "世间美好与你环环相扣" ,//    音乐标题
                        artist : "柏松" ,//    艺术家
                        pic : "http://p1.music.126.net/DK1_4sP_339o5rowMdPXdw==/109951164071024476.jpg" ,//   封面图片
                        // lrc : "暂无歌词" ,//   歌词文件的url
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
    };
</script>