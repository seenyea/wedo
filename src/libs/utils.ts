//判断是不是一个数字 或者 一个字符串里全是数字
export const isNumber = (value: any): boolean => {
    if (value === undefined || value === null || value === '') {
        return false
    }

    if (typeof (value) === 'string') {
        //正整数
        var reNumber = /^\d+$/
        //负整数
        var reNeNumber = /^-\d+$/
        //正实数
        var reRealNumber1 = /^[1-9]\d*[.]\d+$/  //非零开头
        var reRealNumber2 = /^0[.]\d+$/ //零开头
        //负实数
        var reNeRealNumber1 = /^-[1-9]\d*[.]\d+$/  //非零开头
        var reNeRealNumber2 = /^-0[.]\d+$/ //零开头

        if (reNumber.test(value) || reNeNumber.test(value)
            || reRealNumber1.test(value) || reRealNumber2.test(value)
            || reNeRealNumber1.test(value) || reNeRealNumber2.test(value)) {
            return true
        }
        else {
            return false
        }
    }
    else if (typeof (value) === 'number') {
        return true
    }
    else {
        return false
    }
}