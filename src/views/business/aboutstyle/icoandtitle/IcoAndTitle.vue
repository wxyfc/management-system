<template>
    <el-row>
        <mt>{{language[$options.name]}}</mt>
        <div style="height: 80%;" class="margin1vw">
            <el-col class="normal" :span="24">{{language.clickBottomSetIcoTitle}}</el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="10" :xl="8" class="margin1vw-t h100">
                <el-col :span="6" v-for="(item,i) in icoT" :key="i">
                    <div class="icon-img-div inblock" @click="setIcoAndTitleFun(item)">
                        <img :src="item.ico" style="object-fit:contain;">
                    </div>
                    <div class="alncnt emphasize">{{ item.title }}</div>
                </el-col>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="10" :xl="8" class="margin1vw-t h100">
                <el-form label-width="50%">
                    <el-form-item>
                        <span slot="label" class="emphasize"></span>
                        {{ language.clickSetIcoTitle }}
                    </el-form-item>
                    <el-form-item>
                        <span slot="label" class="emphasize">{{language.icoUrl}}</span>
                        <el-input v-model="ico" type="textarea" autosize clearable :maxlength="300" class="width80"></el-input>
                    </el-form-item>
                    <el-form-item v-if="ico">
                        <span slot="label" class="emphasize">{{language.icoPreview}}</span>
                        <img :src="ico" style="object-fit:contain;" class="themeSpan">
                    </el-form-item>
                    <el-form-item>
                        <span slot="label" class="emphasize">{{language.title}}</span>
                        <el-input v-model="title" clearable :maxlength="30" class="width80"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <span slot="label" class="emphasize"></span>
                        <mdb :tooltip="language.icoUrlType" @click="setIcoAndTitleFun({ico,title})">{{ language.sure }}</mdb>
                    </el-form-item>
                </el-form>
            </el-col>
        </div>
    </el-row>
</template>

<script>
    export default {
        mixins : [ require ( "@/mymixins" ).default ] ,
        name : "icoAndTitle" ,
        data () {
            return {
                ico : "" ,
                title : "" ,
                icoT : [ { ico : "https://gitee.com/cloud_users/Cloud-management-system/raw/master/yun.ico" , title : "彩虹云" } ,
                    { ico : "https://gitee.com/cloud_users/Cloud-management-system/raw/master/santa.ico" , title : "圣诞帽" } ,
                    { ico : "https://gitee.com/cloud_users/Cloud-management-system/raw/master/christmas.ico" , title : "圣诞袜" } ,
                    { ico : "https://gitee.com/cloud_users/Cloud-management-system/raw/master/love.ico" , title : "一颗小心心" } ,
                    { ico : "https://gitee.com/cloud_users/Cloud-management-system/raw/master/superman.ico" , title : "超人" } ,
                    { ico : "https://gitee.com/cloud_users/Cloud-management-system/raw/master/sword.ico" , title : "魔法剑" } ,
                    { ico : "https://gitee.com/cloud_users/Cloud-management-system/raw/master/valentines.ico" , title : "跟你在一起的日子" } ]
            };
        } ,
        methods : {
            setIcoAndTitleFun ( item ) {
                this.$setIco ( item.ico )
                this.$setTitle ( item.title )
            }
        } ,
        mounted () {
        } ,
    };
</script>