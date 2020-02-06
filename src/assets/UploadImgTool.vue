<template>
    <fragment>
        <el-upload action="#" :file-list="fileList" multiple list-type="picture-card" accept="image/*" :before-upload="beforeUploadChange">
            <i slot="default" class="el-icon-plus margin-auto-tb"></i>
            <div slot="file" slot-scope="{file}" class="h100 w100">
                <img class="el-upload-list__item-thumbnail margin-auto-tb" :src="file.url" style="object-fit:contain;">
                <div class="el-upload-list__item-actions">
                    <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                        <i class="el-icon-zoom-in"></i>
                    </span>
                    <span class="el-upload-list__item-preview" @click="handleDownload(file)">
                      <i class="el-icon-download"></i>
                    </span>
                    <span class="el-upload-list__item-preview" @click="handleRemove(file)">
                        <!--el-upload-list__item-delete-->
                      <i class="el-icon-delete"></i>
                    </span>
                </div>
            </div>
        </el-upload>
        <ImgDialog :show="imgDialogShow" :data="fileBase64List" :index="imgDialogIndex" @onColse="imgDialogShow = false"></ImgDialog>
    </fragment>
</template>

<script>
    import { fileReader , bytesToSize , $random } from "@/function";
    
    export default {
        mixins : [ require ( "@/mymixins" ).default ] ,
        name : "UploadImgTool" ,
        components : {
            ImgDialog : () => import("@/assets/ImgDialog") ,
        } ,
        data () {
            return {
                fileList : [] ,
                fileBase64List : [] ,
                imgDialogShow : false ,
                imgDialogIndex : 0 ,
                acceptList : [ "jpg" , "jpeg" , "png" ]
            };
        } ,
        props : {
            imgList : {
                //传入默认的图片：格式[{url:"https://test.png",name:"测试图片",uid:"图片的唯一标识，删除时需要"}]
                type : Array ,
                default : () => {
                    return [];
                }
            } ,
            imgNum : {
                //可以上传的图片总数量
                type : Number ,
                default : 10
            } ,
            imgSize : {
                //每张图片上传的大小
                type : Number ,
                default : 2048000
            }
        } ,
        watch : {
            imgList : {
                deep : true ,
                immediate : true ,
                handler ( newv , oldv ) {
                    if ( newv.length > 0 ) {
                        this.fileList = newv;
                        let fileBL = [];
                        newv.some ( ( item , i ) => {
                            fileBL.push ( item.url )
                        } )
                        this.fileBase64List = fileBL;
                    }
                }
            } ,
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
                if ( this.acceptList.indexOf ( isType ) == -1 ) {
                    this.eleNotify ( `${file.name + this.language.fileTypeBad}` , 3 )
                } else if ( file.size >= this.imgSize ) {
                    let sizeText = bytesToSize ( file.size )
                    let regSizeText = bytesToSize ( this.imgSize )
                    this.eleNotify ( `${file.name + this.language.imgExceSize}：${sizeText}>${regSizeText}` , 3 )
                } else {
                    fileReader ( file ).then ( response => {
                        let uid = new Date ().getTime () + $random ( 1 , 99999999 );
                        that.$set ( file , "uid" , uid )
                        that.$set ( file , "url" , response )
                        //图片转换成base64
                        if ( this.fileList.length >= this.imgNum ) {
                            this.fileList.splice ( 0 , 1 );
                            this.fileBase64List.splice ( 0 , 1 );
                        }
                        this.fileList.push ( file );
                        this.fileBase64List.push ( response );
                    } );
                }
                return false
            } ,
            handleRemove ( file ) {
                this.fileList.some ( ( item , i ) => {
                    if ( item.uid == file.uid ) {
                        this.fileList.splice ( i , 1 )
                        this.fileBase64List.splice ( i , 1 );
                    }
                } )
                
            } ,
            handlePictureCardPreview ( file ) {
                this.fileList.some ( ( item , i ) => {
                    if ( item.uid == file.uid ) {
                        this.imgDialogIndex = i;
                    }
                } )
                this.imgDialogShow = true;
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