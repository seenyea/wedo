const _toString = Object.prototype.toString;

export const toString = function (o:any): string {
    return _toString.call(o)
};