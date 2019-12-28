<template>
    <el-row>
        <mt>{{language[$options.name]}}</mt>
        <div class="margin1vw" style="height:80%;">
            <el-tree ref="menuManagementTree" :data="treeData" node-key="name" @check="treeCheckFun" :expand-on-click-node="false"
                     default-expand-all show-checkbox>
                <div class="custom-tree-node" slot-scope="{ node, data }">
                    <mi :icon="data.meta.icon" iconClass></mi>
                    <span>{{ language[data.name] }}</span>
                </div>
            </el-tree>
        </div>
    </el-row>
</template>

<script>
    export default {
        mixins : [ require ( "@/mymixins" ).default ] ,
        name : "menuManagement" ,
        data () {
            return {};
        } ,
        components : {} ,
        props : {} ,
        computed : {
            treeData () {
                let data = this.$avoid ( this.otherInfo.menuList );
                return data;
            }
        } ,
        watch : {} ,
        methods : {
            treeCheckFun ( item , list ) {
                this.$log ( item );
                this.$log ( list );
            }
        } ,
        mounted () {
            this.$refs.menuManagementTree.setCheckedKeys ( this.treeData.map ( ( e ) => {
                return e.name
            } ) );
        }
    };
</script>