/**
 *填充字符模板，返回处理后的字符串
 */
var temp = function(temp, data) {
    var str = temp.innerHTML;

    if (!str || !data) return;

    str = str.replace(/{\S+}/g, function(key) {
        key = key.substring(1, key.length - 1);

        var val = data[key] || "";

        if (typeof val === "string") {
        	return val.length>=150 ? val.substring(0,150)+"...":val;
        }
        else if (val instanceof Array) return val.join("/");
        else if (typeof val === "object") return val[key.split(".")[1]];
        else return val;
    });

    return str;
};
