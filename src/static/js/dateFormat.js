import moment from "moment";

function Int_Timestamp_To_Date() {

    return moment(new Date().getTime()).format('YYYY-MM-DD HH:MM:ss');

}
function String_Timestamp_To_Date(data){
    // let format = moment(new Date(parseInt(data))).format('YYYY-MM-DD HH:MM:SS');
    return moment(data).valueOf()/1000;
    // console.log(format)
}

function dateFormat(date) {
    let YYYY_MM_DD=date.slice(0,19)
    return YYYY_MM_DD.replace("T"," ");
}
function checkDate(c,d){

    let slice = c.slice(0,10);
    let slice1 = d.slice(0,10);
    const slice2 = c.slice(0,16).slice(10).replace(':','.');
    const slice3 = d.slice(0,16).slice(10).replace(':','.');
    const slice6 = c.slice(0,16).slice(10).slice(0,3);
    const slice7 = 16
    let xxx= Int_Timestamp_To_Date().slice(0,10)
    const slice4 = new Date().getTime()/1000
    const slice5 = String_Timestamp_To_Date(c)
    if (slice!==xxx &&　slice1!==xxx){
        // alert(slice)
        // alert(slice1)
        return '请发布当天内容';
    }else {

        let result = slice3-slice2
        if (result>=1.999&&result<=2){
            // alert("时间选择器开始时间:"+slice2)
            // alert("时间选择器结束时间:"+slice3)
            // alert(result)
            // alert("当前时间戳:"+slice4)
            // alert('时间选择器的时间戳'+slice5)
            // alert("时间选择器的时刻:"+slice6)
            // alert('每天下午的截至时刻'+slice7)
            //if/else
            if (slice5<=slice4){
                // alert("i媒婆让他那句话"+slice4)
                // alert("i媒婆让他那句话"+slice5)
                return "当前选择的发布时间有误"
            }else if (slice6>slice7){
                return  '今日可以安排的时间已经过了'
            }else{
                return ' 可以发布'
            }
        }else {
            // alert("2"+slice2)
            // alert("3"+slice3)
            // alert(result)
            return '发布时长以2小时为单位'
        }
    }
}


export {

    Int_Timestamp_To_Date,
    String_Timestamp_To_Date,
    dateFormat,
    checkDate

}