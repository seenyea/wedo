import { isArray }from './util/is';
/**
 * 
 * ["abs", "max", "min", "exp", "floor", "random", "log","log1p", "log2", "log10", "pow", "sin", "cos", "tan", "sqrt"
 * "round", "sign", "ceil", "hypot", "imul", "sinh", 
 * "tanh", "trunc", "E", "LN10", "LN2", "LOG10E", "LOG2E", "fround", 
 * "acos", "acosh", "asin", "asinh", "atan", "atanh", "atan2","expm1", "clz32", "cbrt", "cosh"
 *  "PI", "SQRT1_2", "SQRT2", Symbol(Symbol.toStringTag)]
 */
/*const MathMapKeys = Object.getOwnPropertyNames(Math);*/

declare interface MathUtils{
    abs(a: any): any;
    exp(a: any): any;
    floor(a: any): any;
    ceil(a: any): any,
    ln(a: any): any;
    log2(a: any): any;
    log10(a: any): any;
    pow(a: any, y: number): any;
    sin(a: any): any;
    cos(a: any): any;
    tan(a: any): any;
    ln1plusx(a: any): any;
    sqrt(a: any): any;
    cbrt(a: any): any;
    min(...a: any[]): number;
    max(...a: any[]): number;
    random(lens: number): number[];
}

/**
 * argument the build-in Math, can support array
 * abs(-1) = 1
 * abs([-2, -3, -4]) = [2, 3, 4]
 */ 
var abs = Math.abs;
var exp = Math.exp;
var floor = Math.floor;
var ln = Math.log; //ln(x);
var pow = Math.pow;
var sin = Math.sin;
var cos = Math.cos;
var tan = Math.tan;
var sqrt = Math.sqrt;
var max = Math.max;
var min = Math.min;
var random = Math.random;
var floor = Math.floor
var ceil = Math.ceil;

const LN2 = ln(2);
var log2 = 'log2' in Math ? Math['log2'] : function(x: number): number{
    return ln(x) / LN2;
}; //log_2(x)

const LN10 = ln(10);
var log10 = 'log10' in Math ? Math['log10'] : function(x: number): number{
    return ln(x) / LN10;
}; //log_10(x)

var ln1plusx = 'log1p' in Math ? Math['log1p'] : function(x: number): number{
    return ln(1 + x);
}//ln(1 +x)

var cbrt =  'cbrt' in Math ? Math['cbrt'] : function(x: number): number{
    return pow(x, 3);
}//x ^ 3
 
class MathLibClass implements MathUtils{
    PI = Math.PI;

    abs(a: any): any{
        if(isArray(a))
            return a.map((e: number) => abs(e));
        return abs(a);
    }
    exp(a: any): any{
        if(isArray(a))
            return a.map((e: number) => exp(e));
        return exp(a);
    }
    floor(a: any): any{
        if(isArray(a))
            return a.map((e: number) => floor(e));
        return floor(a);
    }
    ceil(a: any){
        if (isArray(a))
            return a.map((e: number) => ceil(e));
        return floor(a);
    }
    ln(a: any): any{
        if(isArray(a))
            return a.map((e: number) => ln(e));
        return ln(a);
    }
    log2(a: any): any{
        if(isArray(a))
            return a.map((e: number) => log2(e));
        return log2(a);
    }
    log10(a: any): any{
        if(isArray(a))
            return a.map((e: number) => log10(e));
        return log10(a);
    }
    ln1plusx(a: any): any{
        if(isArray(a))
            return a.map((e: number) => ln1plusx(e));
        return ln1plusx(a);
    }
    sin(a: any): any{
        if(isArray(a))
            return a.map((e: number) => sin(e));
        return sin(a);
    }
    cos(a: any): any{
        if(isArray(a))
            return a.map((e: number) => cos(e));
        return cos(a);
    }
    tan(a: any): any{
        if(isArray(a))
            return a.map((e: number) => tan(e));
        return tan(a);
    }
    pow(a: any, y: number): any{
        if(isArray(a))
            return a.map((e: number) => pow(e, y));
        return pow(a, y);
    }
    cbrt(a: any): any{
        if(isArray(a))
            return a.map((e: number) => cbrt(e));
        return cbrt(a);
    }
    sqrt(a: any): any{
        if(isArray(a))
            return a.map((e: number) => sqrt(e));
        return sqrt(a);
    }
    min(...a: any[]):number{
        const input = isArray(a[0]) ? a[0] : a;
        return min(...input);
    }
    max(...a: any[]):number{
        const input = isArray(a[0]) ? a[0] : a;
        return max(...input);
    }
    random(lens: number = 1): number[]{
        const res = [];
        for(let i = 0;i < lens;i++){
            res.push(random());
        }
        return res;
    }
}

const MathLibs = new MathLibClass();

export default MathLibs;