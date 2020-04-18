<template>
    <!--<VueUeditorWrap v-model="VueUeditorWrapMsg" :config="VueUeditorWrapConfig" @ready="ready" :destroy="true"></VueUeditorWrap>-->
</template>

<script>
    export default {
        mixins : [ require ( "@/mymixins" ).default ] ,
        name : "BaiDuUEditor" ,
        data () {
            return {
                VueUeditorWrapMsg : '' ,

            };
        } ,
        components : {
            // VueUeditorWrap : () => import('vue-ueditor-wrap')
        } ,
        props : {
            input : {
                type : [ String , Number ] ,
            }
        } ,
        computed : {
            VueUeditorWrapConfig () {
                let UEDITOR_HOME_URL = "/UEditor/";
                if ( process.env.NODE_ENV !== "development" ) {
                    UEDITOR_HOME_URL = "/management-system/UEditor/"
                }
                return {
                    // 编辑器是否自动被内容撑高
                    autoHeightEnabled : false ,
                    // 初始容器高度
                    initialFrameHeight : 666 ,
                    // 初始容器宽度
                    initialFrameWidth : '100%' ,
                    //自动保存时间
                    saveInterval : 2000 ,
                    //启用自动保存
                    // enableAutoSave : true ,
                    // 上传文件接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
                    serverUrl : 'http://35.201.165.105:8000/controller.php' ,
                    // UEditor 资源文件的存放路径，如果你使用的是 vue-cli 生成的项目，通常不需要设置该选项，vue-ueditor-wrap 会自动处理常见的情况，如果需要特殊配置，参考下方的常见问题2
                    UEDITOR_HOME_URL
                }
            }
        } ,
        watch : {
            VueUeditorWrapMsg ( n ) {
                this.$emit ( "input" , n )
            }
        } ,
        methods : {
            ready ( editorInstance ) {
                // 获取编辑器的实例
            } ,
            addCustomButtom ( editorId ) {
                window.UE.registerUI ( 'test-button' , ( editor , uiName ) => {
                    // 注册按钮执行时的 command 命令，使用命令默认就会带有回退操作
                    editor.registerCommand ( "buttonclick1" ,//注册事件名字，可以注册多个，要小写
                        {
                            execCommand : ( name , ...value ) => {
                                // editor.execCommand ( 'inserthtml' , `<span>再飞高点就有魔法剑了</span>` )
                                console.log ( name , ...value );
                            }
                        }
                    );
                    editor.registerCommand ( "buttonclick2" ,//注册事件名字，可以注册多个，要小写
                        {
                            execCommand : ( name , ...value ) => {
                                // editor.execCommand ( 'inserthtml' , `<span>再飞高点就有魔法剑了</span>` )
                                console.log ( name , ...value );
                            }
                        }
                    );
                    // 创建一个 button
                    let btn = new window.UE.ui.Button ( {
                        // 按钮的名字
                        name : uiName ,
                        // 提示
                        title : '可以乘云而上' ,
                        // 需要添加的额外样式，可指定 icon 图标，图标路径参考
                        cssRules : "background-image: url('http://47.94.89.73:8080/zeefile/audio/photo/yun.ico') !important;background-size: cover;" ,
                        // 点击时执行的命令
                        onclick : () => {
                            // 这里可以不用执行命令，做你自己的操作也可
                            editor.execCommand ( "buttonclick1" , '我是value1' , '我是value2' , '我是value3' );//提交事件名字,后面可以带值
                            editor.execCommand ( "buttonclick2" , '我是value4' , '我是value5' , '我是value6' );//提交事件名字,后面可以带值
                            editor.execCommand ( 'inserthtml' , `<span>再飞高点就有魔法剑了</span>` )
                        }
                    } );
                    // 当点到编辑内容上时，按钮要做的状态反射
                    editor.addListener ( 'selectionchange' , () => {
                        let state = editor.queryCommandState ( uiName )
                        if ( state === -1 ) {
                            btn.setDisabled ( true )
                            btn.setChecked ( false )
                        } else {
                            btn.setDisabled ( false )
                            btn.setChecked ( state )
                        }
                    } );
                    // 因为你是添加 button，所以需要返回这个 button
                    return btn;
                } , 0 , editorId );
                /* 0指定添加到工具栏上的哪个位置，默认时追加到最后 */
                /* editorId指定这个 UI 是哪个编辑器实例上的，默认是页面上所有的编辑器都会添加这个按钮 */
            } ,
            addCustomDialog ( editorId ) {
                window.UE.registerUI ( 'test-dialog' , function ( editor , uiName ) {
                    // 创建 dialog
                    let dialog = new window.UE.ui.Dialog ( {
                        // 指定弹出层中页面的路径，这里只能支持页面，路径参考常见问题 2
                        iframeUrl : '/UEditorDialog.html' ,
                        // 需要指定当前的编辑器实例
                        editor : editor ,
                        // 指定 dialog 的名字
                        name : uiName ,
                        // dialog 的标题
                        title : '你获得了魔法剑的青睐' ,
                        // 指定 dialog 的外围样式
                        cssRules : 'width:600px;height:300px;' ,
                        // 如果给出了 buttons 就代表 dialog 有确定和取消
                        buttons : [
                            {
                                className : 'edui-okbutton' ,
                                label : '确定' ,
                                onclick : function () {
                                    dialog.close ( true )
                                }
                            } ,
                            {
                                className : 'edui-cancelbutton' ,
                                label : '取消' ,
                                onclick : function () {
                                    dialog.close ( false )
                                }
                            }
                        ]
                    } )
                    // 参考上面的自定义按钮
                    let btn = new window.UE.ui.Button ( {
                        name : 'dialog-button' ,
                        title : '悬停在魔法剑上可不能攻击敌人噢' ,
                        cssRules : `background-image: url('http://47.94.89.73:8080/zeefile/audio/photo/sword.ico') !important;background-size: cover;` ,
                        onclick : function () {
                            // 渲染dialog
                            dialog.render ()
                            dialog.open ()
                        }
                    } )
                    return btn
                } , 0 , editorId )
            }
        } ,
        mounted () {
            this.VueUeditorWrapMsg = this.input;
        }
    };
</script>