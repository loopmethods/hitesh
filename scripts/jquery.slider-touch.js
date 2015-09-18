
(function ($) {

    $.fn.sliderTouch = function (params) {
        
        //merge default and user parameters
        params = $.extend({ nav: true },params);

        this.each(function () {
            //config varr
            var $this = $(this);
            $this.wrap = $this.children(".slider-wrap");
            var len = $this.wrap.children().length;
            var navigation = new Navigation($this, len);
            var totalwidth = 0;


            //show navigation element
            if (params.nav == true) {
                navigation.show();
            }

            //update sliders width to main div width
            fixSlidersIn($this.wrap, $this.width());
            $(window).resize(function () {
                fixSlidersIn($this.wrap, $this.width());
            });

            //put sliders side by side after fix divs width
            $this.wrap.children().each(function () {
                totalwidth += parseFloat($(this).width());
                $(this).css("float", "left");
            });
            $this.wrap.width(totalwidth);



            $(this).on("swipeleft", function () {
                if (navigation.index < len - 1) {
                    navigation.index++
                    navigation.changePos();
                    var elem = $this.wrap.children("div:eq(" + navigation.index + ")");
                    Transition(elem);
                }
            });

            $(this).on("swiperight", function () {
                if (navigation.index > 0) {
                    navigation.index--;
                    navigation.changePos();
                    var elem = $this.wrap.children("div:eq(" + navigation.index + ")");
                    Transition(elem);
                }
            });


        });
        return this;
    };

    
    //update all objects width
    function fixSlidersIn(objWrap,withWidth) {
        objWrap.children().each(function () {
            $(this).width(withWidth);
        });
    }

    //Navigation object
    function Navigation(slider, len) {
        
        //properties
        var $this = this;
        $this.index = 0;
        var nav = $('<nav></nav>');
        var ul = $('<ul></ul>');


        //methods
        function addNav() {
            slider.append(nav.append(ul));

            for (var i = 0; i < len; i++) {
                var li = $('<li></li>');
                ul.append(li);
            }
            nav.hide();
        }
        addNav();

        $this.changePos = function () {
            ul.children("li").removeClass("on");
            ul.children("li:eq(" + $this.index + ")").addClass("on");
        }
        $this.changePos();

        ul.children("li").bind('click', function () {
            $this.index = $(this).index();
            $this.changePos($this.index);
            var elem = slider.wrap.children("div:eq(" + $this.index + ")");
            Transition(elem)
        });

        $this.show = function () {
            nav.show();
        }
        
    }

    //animate slider
    function Transition(elem) {
        var elemOffset = elem.offset().left - elem.parent().offset().left;
        elem.parent().parent().animate({ scrollLeft: elemOffset }, 600);
    }


})(jQuery);