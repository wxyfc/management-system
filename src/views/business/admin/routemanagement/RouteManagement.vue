<template>
    <el-row>
        <mt>{{language[$options.name]}}</mt>
        <el-col :xs="24" :sm="18" :md="12" :lg="10" :xl="8" style="height: 80%;" class="padding1vw">
            <el-tree ref="menuManagementTree" :data="treeData" node-key="name" @check="treeCheckFun" :expand-on-click-node="false"
                     default-expand-all show-checkbox check-strictly>
                <div class="custom-tree-node" slot-scope="{ node, data }">
                    <mi :icon="data.meta.icon" iconClass="title"></mi>
                    <span class="emphasize">{{ language[data.name] }}</span>
                </div>
            </el-tree>
        </el-col>
    </el-row>
</template>

<script>
    import { $addCSS } from "@/function";
    
    export default {
        mixins : [ require ( "@/mymixins" ).default ] ,
        name : "menuManagement" ,
        data () {
            return {
                treeData : []
            };
        } ,
        methods : {
            treeCheckFun ( item , list ) {
                let that = this;
                let keyObj = {}
                list.checkedNodes.forEach ( ( e , i ) => {
                    that.$set ( keyObj , e.name , e.meta.role );
                } );
                this.handMenu ( this.otherInfo.menuList , keyObj );
            } ,
            handMenu ( list , keyObj ) {
                let that = this;
                list.forEach ( ( e , i ) => {
                    if ( e.children.length > 0 ) {
                        that.handMenu ( e.children , keyObj )
                    }
                    if ( !Object.keys ( keyObj ).includes ( e.name ) ) {
                        that.$set ( e.meta , "role" , [] )
                    } else {
                        that.$set ( e.meta , "role" , keyObj[ e.name ] )
                    }
                } );
            } ,
            showTree () {
                this.treeData = this.$avoid ( this.otherInfo.menuList );
                let checkList = [];
                this.handTreeCheck ( this.treeData , checkList )
                this.$refs.menuManagementTree.setCheckedKeys ( checkList );
            } ,
            handTreeCheck ( list , keyList ) {
                let that = this;
                list.forEach ( ( e , i ) => {
                    if ( e.children.length > 0 ) {
                        that.handTreeCheck ( e.children , keyList )
                    }
                    keyList.push ( e.name );
                } );
            }
        } ,
        mounted () {
            $addCSS ( ".el-checkbox__inner{ border-radius:2px;}" );
            this.showTree ();
        } ,
        activated () {
            $addCSS ( ".el-checkbox__inner{ border-radius:2px;}" );
        }
    };
</script>