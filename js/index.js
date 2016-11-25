var page = new Page({
        id: "pageWrapper",
        slideTime: 800,
        navId: "pageNav"
    }),

    carousel = new Carousel({
        id: "carousel",
        wrapperId: "carouselItemWrapper",
        navId: "carouselNav",
        prevNext: "prevNext"
    }),

    book_list = nodeList2Array($_tag($("book_list"), "a")),

    sidebar_b = $("sidebar_b"),
    sp_nav = $("sp_nav"),
    sp_info_wrapper = $("sp_info_wrapper");

/*左边导航栏事件*/
book_list.forEach(function(ele, index) {

    addEvent(ele, "click", function(event) {
        var bid = ele.dataset ? ele.dataset.bid :
            ele.getAttribute("data-bid");
            console.log(bid);
        if (bid) {
            JSONP('https://api.douban.com/v2/book/' + bid, function(data) {
                console.log(data)
                sp_info_wrapper.innerHTML = temp($("book_temp"),data);
            });
        }

        event.preventDefault();

        return false;
    });
});

//侧边栏按钮事件(show / hide)
addEvent(sidebar_b, "click", function() {
    sidebar_b.classList.toggle("hidden");
    sp_nav.classList.toggle("hidden");
});
