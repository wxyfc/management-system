<template>
    <fragment>
        <mt>{{language[$options.name]}}</mt>
        <el-row style="margin:5vw;width:40%">
            <el-form label-width="30%">
                <el-form-item :label="language.parkName">
                    <span>{{userInfo.headerTitle}}</span>
                </el-form-item>
                <el-form-item :label="language.contactInFormation">
                    <span>{{userInfo.userProject}}</span>
                </el-form-item>
                <el-form-item :label="language.quickFeedback">
                    <el-input
                            v-model="content"
                            type="textarea"
                            :autosize="{ minRows: 4, maxRows: 6}"
                            clearable
                            show-word-limit
                            :maxlength="220"
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <mdb type="primary" icon="el-icon-edit" @click="quickFee">{{language.quickFeedback}}</mdb>
                </el-form-item>
            </el-form>
        </el-row>
    </fragment>
</template>

<script>
    export default {
        mixins : [ require ( "@/mymixins" ).default ] ,
        name : "quickFeedback" ,
        data () {
            return {
                content : ""
            };
        } ,
        methods : {
            quickFee () {
                let that = this;
                let content = `${that.content}\n\n${that.language.parkName}:${
                    that.userInfo.headerTitle
                    }\n${that.language.contactInFormation}:${that.userInfo.userProject}`;
                this.post ( "/robotBind/senddingmessage" , {
                    groupNumbers : that.otherInfo.groupNumbers ,//这里需要更改
                    content
                } ).then ( res => {
                } );
            }
        } ,
        beforeDestroy () {
            let r = this.otherInfo.routerHistory;
            this.$delete ( r , "quickFeedback" );
        }
    };
</script>