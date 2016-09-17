var demoBars,
    controller,
    scene,
    categoryBtnEvent = function(e) {

        var btn, btnGroup, textColor, shadow, dataRollOverColor;
        btn = e.currentTarget;
        dataRollOverColor = btn.getAttribute("data-color");
        if (e.type === "mouseover") {
            textColor = dataRollOverColor;
            shadow = "0px 0px 15px 5px " + dataRollOverColor;

        } else {
            textColor = "#000000";
            shadow = "0px 0px 15px 5px rgba(187, 187, 187, 0.85)";
        }

        TweenLite.to(btn, 0.25, {
            color: textColor
        });
        btnGroup = btn.getAttribute("data-group");

        for (var i = demoBars.length - 1; i >= 0; i--) {
            var barGroup;
            barGroup = demoBars[i].getAttribute("data-group");
            if (barGroup === btnGroup) {
                TweenLite.to(demoBars[i], 0.25, {
                    boxShadow: shadow
                });
            }
        }
    },
    categoryBtnClick = function(e) {
        var btn, btnNum, categoryGroups, scrollDiv, viewportOffset, top, left;
        categoryGroups = document.getElementsByClassName("category-group");
        btn = e.currentTarget;
        btnNum = btn.getAttribute("data-number") - 1;

        scrollDiv = categoryGroups[btnNum];

        viewportOffset = scrollDiv.getBoundingClientRect();
        top = viewportOffset.top;
        left = viewportOffset.left;
        TweenLite.to(window, 0.75, {
            scrollTo: top,
            ease: Quad.easeInOut
        });
    };

function addEvents() {
    var categoryBtns;
    categoryBtns = document.getElementsByClassName("category-btn");
    for (var i = categoryBtns.length - 1; i >= 0; i--) {
        categoryBtns[i].addEventListener("mouseover", categoryBtnEvent);
        categoryBtns[i].addEventListener("mouseout", categoryBtnEvent);
        categoryBtns[i].addEventListener("click", categoryBtnClick);
    }
}


function init() {
    console.log("page init");
    var headerTl, headerAre;

    demoBars = document.getElementsByClassName("demo-bar");

    addEvents();
}

docReady(function() {
    init();
});