/*一些公用的封装方法*/
var $ = function(id) {
        return document.getElementById(id);
    },
    $_tag = function(ele, tagName) {
        return ele.getElementsByTagName(tagName);
    },
    $_class = function(ele, className) {
        return ele.getElementsByTagName(className);
    },
    nodeList2Array = function(nodeList) {
        return Array.prototype.slice.call(nodeList);
    },
    addEvent = function(ele, type, handle, capture) {
        if (ele.addEventListener) {
            ele.addEventListener(type, handle, capture || false);
        } else {
            ele.attachEvent("on" + type, handle);
        }
    }

/*
 *全屏页面对象
 *@param {object} pageObj 页面对象
 *pageObj = {id:"",navId:"",slideTime:""}
 */
var Page = function(pageObj) {
    var wrapper = $(pageObj.id),
        pageList = nodeList2Array(wrapper.children),
        len = pageList.length,
        curPage,
        curIndex,
        slideTime = pageObj.slideTime || 800,
        navChildren = nodeList2Array($_tag($(pageObj.navId), "a")),
        navlen = navChildren.length,
        activeIndex,
        curHtmlHeight,
        isAnimate;

    if (!pageList || len === 0) return;

    //初始化,赋予wrapper过渡效果
    function init() {
        curPage = pageList[0];
        curPage.classList.add("active")
        curIndex = 0;
        wrapper.style.top = 0;
        wrapper.style.transition = "top " + slideTime / 1000 + "s";
        activeIndex = 0;
        isAnimate = false;
        setBodyHeight();
    }


    /**
     *上一页
     */
    function _prev() {
        if (curIndex === 0) return;

        _go(curIndex - 1);
    }
    /**
     *下一页
     */
    function _next() {
        if (curIndex === len - 1) return;

        _go(curIndex + 1);
    }

    /**
     *跳转到某个page
     */
    function _go(index) {
        if (curIndex === index) return;

        if (isAnimate) return;

        var top = wrapper.style.top.slice(0, -2);

        if (curIndex > index) {

            wrapper.style.top = +top + wrapper.offsetHeight * (curIndex - index) + "px";
        } else {
            wrapper.style.top = +top - wrapper.offsetHeight * (index - curIndex) + "px";
        }
        changeState(index);
        freezeAnimate();

        curIndex = index;
        curPage.classList.remove("active");
        curPage = pageList[curIndex];
        curPage.classList.add("active");

    }

    /**
     *更新侧边导航的样式
     */
    function changeState(index) {
        navChildren[activeIndex].className = "";
        activeIndex = index;
        navChildren[activeIndex].className = "active";
    }

    /**
     *更改了窗口大小，需要适当的调整元素的top值
     */
    function setBodyHeight() {
        var htmlHeight = document.documentElement.clientHeight;
        //更改top值
        var top = wrapper.style.top.slice(0, -2);
        wrapper.style.top = +top * (htmlHeight / curHtmlHeight) + "px";

        curHtmlHeight = htmlHeight;
    }

    function handleMouseWheel(event) {
        event = event || window.event;
        var type = event.type,
            delta;
        delta = (event.wheelDelta) ? event.wheelDelta / 120 : -(event.detail || 0) / 3;

        delta > 0 ? _prev() : _next();
    }

    
    function freezeAnimate() {
        isAnimate = true;

        setTimeout(function() { isAnimate = false; }, slideTime);
    }



    init();

    //window的resize事件
    addEvent(window, "resize", setBodyHeight);

    //window的mousewheel事件,需要对firefox进行兼容性处理

    if (window.navigator.userAgent.indexOf("Firefox") === -1) {
        addEvent(document, "mousewheel", handleMouseWheel);
    } else {
        addEvent(document, "DOMMouseScroll", handleMouseWheel);
    }

    //绑定导航栏点击事件
    navChildren.forEach(function(ele, index) {
        ele.index = index;

        addEvent(ele, "click", function() {
            _go(index);
        });

    });




};
