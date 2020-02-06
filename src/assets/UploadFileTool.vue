<template>
    <fragment>
        <el-upload action="#" :file-list="fileList" multiple :accept="accept" :before-upload="beforeUploadChange" class="el-upload-file-tag">
            <el-tag slot="trigger" class="notLineFeed alncnt largeTitle el-upload-file-tag" size="medium"><i class="el-icon-folder-add"/></el-tag>
            <span slot="file" slot-scope="{file}">
                <el-tag class="el-upload-file-tag" size="medium">
                    <el-col :span="18" class="alncnt normal notLineFeed">
                        <i :class="file.typeObj.icon" :style="`color:${file.typeObj.color}`" class="largeTitle"></i>
                        {{ file.name }}
                    </el-col>
                    <el-col :span="6" class="alnrit">
                        <i class="el-icon-view" @click="handleClick(file)"></i>
                        <i class="el-icon-delete" @click="handleRemove(file)"></i>
                    </el-col>
                </el-tag>
            </span>
        </el-upload>
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
                    docx : { type : "Word" , icon : "iconfont icon-word" , color : "#0061b2" } ,
                    pptx : { type : "PPT" , icon : "iconfont icon-ppt" , color : "#d81e06" } ,
                    xlsx : { type : "Excel" , icon : "iconfont icon-Excel" , color : "#0e932e" }
                } ,
            };
        } ,
        props : {
            accept : {
                //可以上传的文件总数量
                type : String ,
                default : ".docx" ,//.pptx   .xlsx
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
                if ( !that.acceptObj.hasOwnProperty ( isType ) ) {
                    that.eleNotify ( `${file.name + that.language.fileTypeBad}` , 3 )
                } else if ( file.size >= that.fileSize ) {
                    let sizeText = bytesToSize ( file.size )
                    let regSizeText = bytesToSize ( that.fileSize )
                    that.eleNotify ( `${file.name + that.language.imgExceSize}：${sizeText}>${regSizeText}` , 3 )
                } else {
                    fileReader ( file , "File" ).then ( response => {
                        let uid = new Date ().getTime () + $random ( 1 , 99999999 );
                        that.$set ( file , "uid" , uid );
                        that.$set ( file , "url" , response );
                        that.$set ( file , "typeObj" , that.acceptObj[ isType ] );
                        //转换成base64
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
            handleClick ( file ) {
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
        } ,
    };
</script>