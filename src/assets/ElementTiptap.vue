<template>
    <el-tiptap v-model="inputValue" width="100%" height="100%" :extensions="extensions"></el-tiptap>
</template>

<script>
    import 'element-tiptap/lib/index.css';
    import {
        ElementTiptapPlugin , ElementTiptap , Doc , Text , Paragraph , Heading , Bold , Italic , Strike , Underline , Link , Image , Iframe , CodeBlock , Blockquote ,
        ListItem , BulletList , OrderedList , TodoItem , TodoList , TextAlign , Indent , LineHeight , HorizontalRule , HardBreak , TrailingNode , History ,
        Table , TableHeader , TableCell , TableRow , FormatClear , TextColor , TextHighlight , Preview , Print , Fullscreen , SelectAll
    } from 'element-tiptap';

    Vue.use ( ElementTiptapPlugin , {
        lang : "zh" , // 见 i18n
        spellcheck : true , // 可被 editor 同名 prop 重写
    } );

    export default {
        mixins : [ require ( "@/mymixins" ).default ] ,
        name : "ElementTiptap" ,
        model : {
            prop : 'modelValue' ,
            event : 'updata'
        } ,
        props : {
            modelValue : String ,
        } ,
        computed : {
            inputValue : {
                get () {
                    return this.modelValue
                } ,
                set ( v ) {
                    this.$emit ( 'updata' , v )
                }
            }
        } ,
        data () {
            return {
                extensions : [
                    new Doc () , new Text () , new Paragraph () , new Heading ( { level : 6 } ) , new Bold ( { bubble : true } ) , // 在气泡菜单中渲染菜单按钮
                    new Italic () , new Strike () , new Underline () , new Link () , new Image () , new Iframe () , new CodeBlock () ,
                    new Blockquote () , new ListItem () , new BulletList () , new OrderedList () , new TodoItem () , new TodoItem () ,
                    new TodoList () , new TextAlign () , new Indent () , new LineHeight () , new HorizontalRule () , new HardBreak () ,
                    new TrailingNode () , new History () , new Table () , new TableHeader () , new TableCell () , new TableRow () , new FormatClear () ,
                    new TextColor () , new TextHighlight () , new Preview () , new Print () , new Fullscreen () , new SelectAll () ] ,
            };
        } ,
        components : {
            "el-tiptap" : ElementTiptap
        } ,
        methods : {}
    };
</script>