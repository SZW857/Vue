//验证码加密算法
export const CaptchaEncryption=(num)=>{
        /**
         *      先得到每位数，然后每位数都加上5，再对10求余，最后将所有数字反转，得到一串新数。
         * */
        // 1、把整数里面的每一位放到数组里
        var str = num.toString();// 转化为字符串
        var intArray = new Array(str.length);// 新建一个数组用来保存num每一位的数字
        for (var i = 0; i < str.length; i++) {
            // 遍历str将每一位数字添加如intArray
            var ch = str.charAt(i);
            intArray[i] = parseInt(ch.toString());
        }
        // 2、加密
        // 每位数都加上5
        for (var i = 0; i < intArray.length; i++) {
            intArray[i] = intArray[i] + 5;
        }
        // 再对10求余
        for (var i = 0; i < intArray.length; i++) {
            intArray[i] = intArray[i] % 10;
        }
        // 将所有数字反转
        for (var i = 0, j = intArray.length - 1; i < j; i++, j--) {
            var temp = intArray[i];
            intArray[i] = intArray[j];
            intArray[j] = temp;
        }
        // 3.把数组里面的每个数字进行拼接，变成加密之后的结果
        var number = 0;
        for (var i = 0; i < intArray.length; i++) {
            number = number * 10 + intArray[i];
        }
        return number;
    }

