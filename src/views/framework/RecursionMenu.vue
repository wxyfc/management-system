<template>
    <fragment>
        <template v-for="(mli,i) in mList">
            <fragment v-if="mli.meta.role.includes (userInfo.userRole)">
                <el-submenu
                        v-if="mli.children&&mli.children.length>1"
                        :index="mli.path"
                        :key="i+mList.length"
                >
                    <template slot="title">
                        <i :class="mli.meta.icon"></i>
                        <!-- :style="{color:mli.path == $route.path ? activeColor : otherInfo.themeTextColor}" -->
                        <span
                                slot="title"
                        >{{language[mli.name]}}</span>
                        <!--:class="mli.path == $route.path ? 'title' : 'emphasize'"-->
                    </template>
                    <recursionMenu style="margin-left:0.5vw" :mList="mli.children"></recursionMenu>
                </el-submenu>
                <el-menu-item v-else-if="mli.children&&mli.children.length==1&&mli.children[0].meta.role.includes (userInfo.userRole)" :index="mli.children[0].path" :key="i+mList.length">
                    <i :class="mli.children[0].meta.icon"></i>
                    <!-- :style="{color:mli.path == $route.path ?activeColor:otherInfo.themeTextColor}" -->
                    <span
                            slot="title"
                    >{{language[mli.children[0].name]}}</span>
                    <!--:class="mli.children[0].path == $route.path ? 'title' : 'emphasize'"-->
                </el-menu-item>
                <el-menu-item v-else-if="mli.children&&mli.children.length==0" :index="mli.path" :key="i+mList.length">
                    <i :class="mli.meta.icon"></i>
                    <!-- :style="{color:mli.path == $route.path ?activeColor:otherInfo.themeTextColor}" -->
                    <span
                            slot="title"
                    >{{language[mli.name]}}</span>
                    <!--:class="mli.path == $route.path ? 'title' : 'emphasize'"-->
                </el-menu-item>
            </fragment>
        </template>
    </fragment>
</template>

<script>
    export default {
        mixins : [ require ( "@/mymixins" ).default ] ,
        name : "recursionMenu" ,
        props : {
            activeColor : {
                type : String ,
                default : ""
            } ,
            mList : {
                type : Array ,
                default : []
            }
        }
    };
</script>
