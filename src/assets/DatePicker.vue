<template>
    <el-date-picker
            v-model="day"
            :editable="false"
            :clearable="clearable"
            :type="typeS[type]"
            :value-format="valueF[type]"
            @change="picker"
    ></el-date-picker>
</template>

<script>
    export default {
        name : "DatePicker" ,
        data () {
            return {
                day : "" ,
                typeS : [ "date" , "month" ] ,
                valueF : [ "yyyy-MM-dd" , "yyyy-MM" ]
            };
        } ,
        props : {
            type : {
                type : Number ,
                default : () => {
                    return 0;
                }
            } ,
            dayNum : {
                type : Number ,
                default : () => {
                    return 0;
                }
            } ,
            default : {
                type : Boolean ,
                default : true
            } ,
            clearable : {
                type : Boolean ,
                default : false
            }
        } ,
        watch : {
            type : {
                deep : true ,
                immediate : false ,
                handler ( newv , oldv ) {
                    this.handlerDate ();
                }
            } ,
            dayNum : {
                deep : true ,
                immediate : false ,
                handler ( newv , oldv ) {
                    this.handlerDate ();
                }
            } ,
            default : {
                deep : true ,
                immediate : false ,
                handler ( newv , oldv ) {
                    this.handlerDate ();
                }
            }
        } ,
        methods : {
            picker () {
                this.$emit ( "change" , this.day );
            } ,
            handlerDate () {
                if ( this.default ) {
                    let date = new Date ();
                    if ( this.type == 0 ) {
                        date.setDate ( date.getDate () - this.dayNum );
                    } else {
                        date.setMonth ( date.getMonth () - this.dayNum );
                    }
                    this.day = date.$format ( this.valueF[ this.type ] );
                    this.$emit ( "change" , this.day );
                } else {
                    this.day = "";
                    this.$emit ( "change" , this.day );
                }
            }
        } ,
        mounted () {
            this.handlerDate ();
        }
    };
</script>