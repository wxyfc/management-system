<template>
    <el-row type="flex" align="middle" class="th5" :style="{backgroundColor:otherInfo.themeBackgroundColor }">
        <el-col :xs="12" :sm="{span: 12, offset: 1}" :lg="{span: 14, offset: 2}" :xl="{span: 14, offset: 3}">
            <b class="emphasize" :style="{color:otherInfo.themeTextColor}">{{userInfo.headerTitle}}</b>
        </el-col>
        <el-col :xs="4" :sm="4" :lg="3" :xl="3">
            <mdb type="text" class="emphasize" :style="{color:otherInfo.themeTextColor}" @click="getInto">{{language.getInto}}</mdb>
        </el-col>
        <el-col :xs="8" :sm="7" :lg="5" :xl="4" class="alnrit">
            <el-dropdown :size="otherInfo.menuCollapse?'medium':'default'" @command="menuSelect">
                <span class="emphasize" :style="{color:otherInfo.themeTextColor}"><mi icon="el-icon-user"></mi>{{userInfo.userName}}</span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for="(item) in otherInfo.helloMenuList" :key="item.route" :command="item.route" :icon="item.icon">
                        <span class="emphasize">{{language[item.title]}}</span>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </el-col>
    </el-row>
</template>
<script>
    export default {
        mixins : [ require ( "@/mymixins" ).default ] ,
        name : "helloHeader" ,
        data () {
            return {};
        } ,
        components : {} ,
        props : {} ,
        computed : {} ,
        watch : {} ,
        methods : {
            getInto () {
                this.$router.push ( { name : "test" } );
            } ,
            menuSelect ( index , indexPath ) {
                this.$router.push ( { name : index } );
            }
        }
    };
</script>