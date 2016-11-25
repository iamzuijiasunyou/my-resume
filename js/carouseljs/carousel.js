/**
 *carousel
 *@param {object} carouselObj 轮播图参数对象
 *carouselObj = {id:"",wrapperId:"",navId:"",prevNext:"",slideTime:""}
 */
var Carousel = function(carouselObj) {
    var carousel = $(carouselObj.id),
        _width,
        wrapperId = carouselObj.wrapperId,
        wrapper = $(wrapperId),
        carouselList = wrapper.children,
        len = carouselList.length,
        curCarousel,
        curIndex,
        slideTime = carouselObj.slideTime || 800,
        navChildren = nodeList2Array($_tag($(carouselObj.navId), "a")),
        navLen = navChildren.lenght,
        curNav,
        activeIndex,
        prevNext = nodeList2Array($_tag($(carouselObj.prevNext), "a")),
        isAnimate;

    if (!carouselList || len === 0) return;
    /**
     *初始化轮播图
     */
    function init() {
        initWrapperWidth();
        curCarousel = carouselList[0];
        curIndex = 0;
        curNav = navChildren[0];
        activeIndex = 0;
    }

    /**
     *初始化轮播图外包裹的长度，使得轮播图可以一行排列
     */
    function initWrapperWidth() {
        _width = carousel.clientWidth || carousel.offsetWidth;

        console.log(_width);

        wrapper.style.width = _width * len + "px";
        wrapper.style.position = "relative";
        wrapper.style.left = "0px";

        wrapper.style.transition = "left " + slideTime / 1000 + "s";
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
    	console.log(curIndex,len)
        if (curIndex === len - 1) return;

        _go(curIndex + 1);
    }

    /**
     *跳转到某个page
     */
    function _go(index) {
    	
        if (curIndex === index) return;

        if (isAnimate) return;

        var left = wrapper.style.left.slice(0, -2);
        
        if (curIndex > index) {
            wrapper.style.left = +left + _width * (curIndex - index) + "px";
        } else {
            wrapper.style.left = +left - _width * (index - curIndex) + "px";
        }
        changeState(index);
        freezeAnimate();
        curIndex = index;

    }

    /**
     *更新导航的样式
     */
    function changeState(index) {
        navChildren[activeIndex].className = "";
        activeIndex = index;
        navChildren[activeIndex].className = "active";
    }

    function freezeAnimate() {
        isAnimate = true;

        setTimeout(function() { isAnimate = false; }, slideTime);
    }

    function handlePrevNext() {

        var ele = this,
            direction = ele.dataset ? ele.dataset.op : ele.getAttribute("data-op");

        if (direction === "prev") {
            _prev();
        } else if (direction === "next") {
            _next();
        }
    }


    init();

    //绑定导航栏点击事件
    navChildren.forEach(function(ele, index) {
        ele.index = index;

        addEvent(ele, "click", function(event) {
            _go(index);
        });

    });

    //绑定前后按钮
    prevNext.forEach(function(ele, index) {
        addEvent(ele, "click", handlePrevNext);
    });

    return {
        go: _go,
        next: _next,
        prev: _prev
    };
};
