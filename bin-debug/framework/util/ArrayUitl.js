var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ArrayUitl = (function () {
    function ArrayUitl() {
    }
    /**删除数组里面的空内容
     * 请不要传递包含 (0,"")的数组进来，否则回错误删除
    */
    ArrayUitl.cleannull = function (arr) {
        var len = arr.length;
        var emptylen = 0;
        var reallen = len;
        var tempindex = 0;
        if (true) {
            var before = ArrayUitl.caculateLen(arr);
        }
        var lastii = 0;
        for (var i = 0; i < len - emptylen; i++) {
            var term = arr[i];
            if (!term) {
                if (i == 0 || i > lastii + emptylen) {
                    emptylen++;
                }
                lastii = i;
                for (var ii = i + emptylen; ii < len; ii++) {
                    if (arr[ii]) {
                        arr[i] = arr[ii];
                        arr[ii] = null;
                        break;
                    }
                    else {
                        emptylen++;
                    }
                }
            }
        }
        if (true) {
            if (before != len - emptylen) {
                throw new Error("cleannull error");
            }
        }
        arr.length = len - emptylen;
    };
    ArrayUitl.caculateLen = function (arr) {
        var ret = 0;
        for (var i = arr.length - 1; i >= 0; i--) {
            if (arr[i]) {
                ret++;
            }
        }
        return ret;
    };
    /**插入单个数据 */
    ArrayUitl.insert = function (arr, obj, index) {
        for (var i = arr.length; i > index; i--) {
            arr[i] = arr[i - 1];
        }
        arr[index] = obj;
    };
    /**指定 Array 类排序方法为数值（而不是字符串）排序 */
    ArrayUitl.sort_NUMERIC = function (a, b) {
        return a - b;
    };
    /**指定 Array 类排序方法为降序排序 */
    ArrayUitl.sort_DESCENDING = function (a, b) {
        return b - a;
    };
    /**随机打乱Array */
    ArrayUitl.sort_RANDOM = function (a, b) {
        return Math.random() > .5 ? -1 : 1;
    };
    ArrayUitl.insertArray = function (arr, insertArray, index) {
        var ilen = insertArray.length;
        for (var i = arr.length; i > index; i--) {
            arr[i + ilen - 1] = arr[i - 1];
        }
        var count = 0;
        for (var i = index; i < index + ilen; i++) {
            arr[i] = insertArray[count];
            count += 1;
        }
    };
    /**默认升序排列*/
    ArrayUitl.sort = function (t, options) {
        if (options === void 0) { options = 16; }
        ArrayUitl.sortFields = null;
        ArrayUitl.sortOptions = options;
        t.sort(ArrayUitl.sortItem);
    };
    ;
    ArrayUitl.sortOn = function (t, fields, options) {
        ArrayUitl.sortFields = fields;
        if (options == null) {
            ArrayUitl.sortOptions = 0;
        }
        else {
            ArrayUitl.sortOptions = options;
        }
        t.sort(ArrayUitl.sortItem);
    };
    ;
    ArrayUitl.sortItem = function (e, i) {
        if (ArrayUitl.sortFields == null) {
            return ArrayUitl.sortResult(e, i, null, ArrayUitl.sortOptions);
        }
        if (ArrayUitl.sortFields instanceof Array) {
            var r = 0;
            var n = 0;
            var a = ArrayUitl.sortFields.length;
            if (ArrayUitl.sortOptions instanceof Array) {
                for (r = 0; r < a; r++) {
                    n = ArrayUitl.sortResult(e, i, ArrayUitl.sortFields[r], ArrayUitl.sortOptions[r]);
                    if (n != 0 || r == a - 1) {
                        return n;
                    }
                }
            }
            else {
                for (r = 0; r < a; r++) {
                    n = ArrayUitl.sortResult(e, i, ArrayUitl.sortFields[r], ArrayUitl.sortOptions);
                    if (n != 0 || r == a - 1) {
                        return n;
                    }
                }
            }
        }
        return ArrayUitl.sortResult(e, i, String(ArrayUitl.sortFields), ArrayUitl.sortOptions);
    };
    ArrayUitl.sortResult = function (t, e, i, r) {
        if (i != null) {
            t = t[i];
            e = e[i];
        }
        if (t == e) {
            return 0;
        }
        if (r == 0) {
            return t > e ? 1 : -1;
        }
        if ((r & 16) == 16) {
            if ((r & 2) == 2) {
                return e - t;
            }
            else {
                return t - e;
            }
        }
        if ((r & 1) == 1) {
            t = t != null ? String(t).toLowerCase() : null;
            e = e != null ? String(e).toLowerCase() : null;
        }
        if ((r & 2) == 2) {
            return t > e ? -1 : 1;
        }
        else {
            return t > e ? 1 : -1;
        }
    };
    ArrayUitl.NONE = 0;
    ArrayUitl.CASEINSENSITIVE = 1;
    ArrayUitl.DESCENDING = 2;
    ArrayUitl.NUMERIC = 16;
    ArrayUitl.sortFields = null;
    ArrayUitl.sortOptions = null;
    return ArrayUitl;
}());
__reflect(ArrayUitl.prototype, "ArrayUitl");
//# sourceMappingURL=ArrayUitl.js.map