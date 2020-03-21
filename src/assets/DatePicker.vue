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
    import { getNumberOfDays } from "@/function";
    
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
                let nowDate = new Date ();
                let dayNum = getNumberOfDays ( new Date ( this.day ) , new Date ( nowDate.$format ( this.valueF[ this.type ] ) ) );
                this.$emit ( "change" , this.day , dayNum );//返回-1以上代表超出当前日期的数，1以上代表当前之前的天数，0或者-0则是当天；
            } ,
            handlerDate () {
                if ( this.default ) {
                    let date = new Date ();
                    if ( this.type == 0 ) {
                        date.setDate ( date.getDate () - this.dayNum );
                    } else {
                        date.setMonth ( date.getMonth () - this.dayNum );
                    }
                    let nowDate = new Date ();
                    let dayNum = getNumberOfDays ( date , new Date ( nowDate.$format ( this.valueF[ this.type ] ) ) );
                    this.day = date.$format ( this.valueF[ this.type ] );
                    this.$emit ( "change" , this.day , dayNum );//返回-1以上代表超出当前日期的数，1以上代表当前之前的天数，0或者-0则是当天；
                } else {
                    this.day = "";
                    this.$emit ( "change" , this.day , 0 );
                }
            }
        } ,
        mounted () {
            this.handlerDate ();
        }
    };
</script>