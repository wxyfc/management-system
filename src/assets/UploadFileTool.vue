<template>
    <fragment>
        <el-upload action="#" :file-list="fileList" multiple :accept="accept" :before-upload="beforeUploadChange" class="el-upload-file">
            <el-tag slot="default" class="notLineFeed alncnt el-upload-file-tag" size="medium" effect="dark"><i class="el-icon-folder-add"/></el-tag>
            <div slot="file" slot-scope="{file}">
                <el-tag class="el-upload-file-tag" size="medium" :type="file.typeObj.tagType">
                    <el-col :span="16" class="alncnt tableClass notLineFeed">
                        <i :class="file.typeObj.icon" :style="`color:${file.typeObj.color}`" class="largeTitle"></i>
                        {{ file.name }}
                    </el-col>
                    <el-col :span="8" class="alnrit">
                        <!--<i class="el-icon-view" @click="handleView(file)"></i>-->
                        <i class="el-icon-download" @click="handleDownload(file)"></i>
                        <i class="el-icon-delete" @click="handleRemove(file)"></i>
                    </el-col>
                </el-tag>
            </div>
        </el-upload>
        <div id="flUpload"></div>
    </fragment>
</template>

<script>
    import { fileReader , bytesToSize , $random } from "@/function";

    export default {
        mixins : [ require ( "@/mymixins" ).default ] ,
        name : "UploadFileTool" ,
        components : {} ,
        data () {
            return {
                fileList : [] ,
                fileBase64List : [] ,
                acceptObj : {
                    docx : { type : "Word" , icon : "iconfont icon-word" , color : "#0061b2" , tagType : "" } ,
                    doc : { type : "Word" , icon : "iconfont icon-word" , color : "#0061b2" , tagType : "" } ,
                    pptx : { type : "PPT" , icon : "iconfont icon-ppt" , color : "#d81e06" , tagType : "danger" } ,
                    pdf : { type : "PDF" , icon : "iconfont icon-pdf1" , color : "#fc3920" , tagType : "danger" } ,
                    txt : { type : "Text" , icon : "iconfont icon-TXT" , color : "#0b0b01" , tagType : "info" } ,
                    xlsx : { type : "Excel" , icon : "iconfont icon-Excel" , color : "#0e932e" , tagType : "success" } ,
                } ,
            };
        } ,
        props : {
            accept : {
                //默认过滤的文件,只在选择文件的时候过滤不拦截
                type : String ,
                default : "" ,//.docx .doc .pptx   .xlsx   .pdf   .txt
            } ,
            fileNum : {
                //可以上传的文件总数量
                type : Number ,
                default : 10
            } ,
            fileSize : {
                //每个文件上传的大小
                type : Number ,
                default : 2048000
            } ,
            intercept : {
                //拦截选择的文件类型是否正确
                type : Boolean ,
                default : false
            }
        } ,
        watch : {
            fileList : {
                deep : true ,
                immediate : true ,
                handler ( newv , oldv ) {
                    if ( newv.length > 0 ) {
                        //回传两个数组 第一个数组只存了二进制 第二个存了文件本身属性和二进制
                        this.$emit ( "change" , this.fileBase64List , this.fileList )
                    }
                }
            }
        } ,
        methods : {
            beforeUploadChange ( file ) {
                let that = this;
                let isTypeList = file.name.split ( "." );
                let isType = isTypeList[ isTypeList.length - 1 ];
                let isIntercept = false;
                if ( that.intercept == true ) {
                    isIntercept = that.accept.indexOf ( isType ) == -1;
                }
                if ( !that.acceptObj.hasOwnProperty ( isType ) || isIntercept ) {
                    that.eleNotify ( `${file.name + that.language.fileTypeBad}` , 3 )
                } else if ( file.size >= that.fileSize ) {
                    let sizeText = bytesToSize ( file.size )
                    let regSizeText = bytesToSize ( that.fileSize )
                    that.eleNotify ( `${file.name + that.language.imgExceSize}：${sizeText}>${regSizeText}` , 3 )
                } else {
                    fileReader ( file ).then ( response => {
                        let uid = new Date ().getTime () + $random ( 1 , 99999999 );
                        that.$set ( file , "uid" , uid );
                        that.$set ( file , "url" , response );
                        that.$set ( file , "typeObj" , that.acceptObj[ isType ] );
                        if ( that.fileList.length >= that.fileNum ) {
                            that.fileList.splice ( 0 , 1 );
                            that.fileBase64List.splice ( 0 , 1 );
                        }
                        that.fileList.push ( file );
                        that.fileBase64List.push ( response );
                    } );
                }
                return false
            } ,
            handleView ( file ) {
                //文件预览功能，暂时没有解决方案
                let that = this;
                this.fileList.some ( ( item , i ) => {
                    if ( item.uid == file.uid ) {
                        that.eleNotify ( file.name , 3 )
                    }
                } )
            } ,
            handleRemove ( file ) {
                let that = this;
                this.fileList.some ( ( item , i ) => {
                    if ( item.uid == file.uid ) {
                        that.fileList.splice ( i , 1 )
                        that.fileBase64List.splice ( i , 1 );
                    }
                } )
            } ,
            handleDownload ( file ) {
                let a = document.createElement ( 'a' );
                a.href = file.url
                a.download = file.name;
                a.click ()
            } ,
        }
    };
</script>