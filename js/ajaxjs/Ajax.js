/*
 *Ajax封装方法
 *@param {object} settings 参数对象
 *(type,url,data,contentType,success,error,async)
 */
var Ajax = function(settings) {
    var defaults = {
        type: 'GET',
        url: '',
        data: '',
        contentType: 'application/x-www-form-urlencoded',
        success: function() {},
        error: function() {},
        async: true
    };

    if (!settings) return;

    for (var key in settings) {
        defaults[key] = settings[key];
    }

    if (typeof defaults.data === "object") {
        var str = "";
        for (key in defaults.data) {
            str += key + "=" + defaults.data[key] + "&";
        }

        defaults.data = str.substring(0, str.length - 1);
    }

    defaults.type = defaults.type.toUpperCase();

    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");




    if (defaults.type === "GET") {
        if (defaults.data) {
            defaults.url += (defaults.url.indexOf("?") === -1 ? "?" +
                defaults.data : defaults.data);
        }

    } else {
        xhr.open(defaults.type, defaults.url, defaults.async);
    }
    xhr.open(defaults.type, defaults.url, defaults.async);
    xhr.setRequestHeader("Content-Type", defaults.contentType);
    xhr.send();

    xhr.onreadystatechange = handleResult;

    //处理响应函数
    function handleResult() {
        var state = xhr.readyState,
            status = xhr.status;

        if (state === 4 && status === 200)
            defaults.success.call(xhr, xmlhttp.responseText);
        else
            defaults.error();
    }
};


var JSONP = function(url, callback) {
    if (!url) return;
    if (!callback) return;

    var jsonpcallback = 'callback' + new Date().valueOf();
	if (typeof callback !== 'string') {
        window[jsonpcallback] = callback;
    }

    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.src = url + (url.indexOf('?') == -1 ? '?' : '&') + 'callback=' + jsonpcallback;
    var head = document.getElementsByTagName('head')[0];
    head.appendChild(script);
};
