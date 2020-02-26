<template>
    <el-row>
        <mt>{{language[$options.name]}}</mt>
        <div class="padding1vw alncnt" style="height: 70%;">
            <el-col class="normal" :xs="24" :sm="20" :md="17" :lg="15" :xl="13" style="height: 10%;">{{language.permissionDemo}}</el-col>
            <el-col :xs="24" :sm="20" :md="17" :lg="15" :xl="13" style="height: 20%;">
                <el-radio-group v-model="testRole" :fill="colors[testRole]">
                    <el-radio-button v-for="roleItem in roles" :label="roleItem.value" :key="roleItem.value">{{ roleItem.name }}</el-radio-button>
                </el-radio-group>
            </el-col>
            <el-col :xs="24" :sm="20" :md="17" :lg="15" :xl="13" style="height: 70%;" v-if="roleRefresh">
                <mdb v-permission="[5233,5232,5231,5230]" type class="margin1vw-r">[admin,tourist,users,other]</mdb>
                <mdb v-permission="5233" class="margin1vw-r">[admin]</mdb>
                <mdb v-permission="[5233,5232]" type="success" class="margin1vw-r">[admin,tourist]</mdb>
                <mdb v-permission="[5233,5231]" type="warning" class="margin1vw-r">[admin,users]</mdb>
                <mdb v-permission="[5233,5230]" type="danger" class="margin1vw-r">[admin,other]</mdb>
            </el-col>
        </div>
    </el-row>
</template>

<script>
    export default {
        mixins : [ require ( "@/mymixins" ).default ] ,
        name : "permissionsDemo" ,
        data () {
            return {
                roles : [
                    { name : "admin" , value : 5233 } ,
                    { name : "tourist" , value : 5232 } ,
                    { name : "users" , value : 5231 } ,
                    { name : "other" , value : 5230 } ] ,
                colors : { 5233 : "#409EFF" , 5232 : "#67C23A" , 5231 : "#E6A23C" , 5230 : "#F56C6C" } ,
                roleRefresh : true
            };
        } ,
        computed : {
            testRole : {
                get () {
                    let c = this.userInfo.userTestRole;
                    return c;
                } ,
                set ( v ) {
                    this.setUserInfo ( { userTestRole : v } );
                }
            }
        } ,
        watch : {
            testRole : {
                deep : true ,
                immediate : true ,
                handler ( newv , oldv ) {
                    let that = this;
                    this.roleRefresh = false;
                    this.$nextTick ( () => {
                        that.roleRefresh = true;
                    } )
                }
            }
        } ,
        methods : {} ,
        mounted () {
            let userTestRole = this.$avoid ( this.userInfo.userRole )
            this.setUserInfo ( { userTestRole } );
        } ,
    };
</script>