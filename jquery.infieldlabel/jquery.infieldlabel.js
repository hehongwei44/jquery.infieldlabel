;(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD 支持
        define(['jquery'],factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS 支持
        module.exports = factory;
    } else {
        // 浏览器支持
        factory(jQuery);
    }
}(function ($) {
    /**
     * @this label元素对象。
     * @field  输入框目标对象。
     * @option : 配置参数。
     * */
    $.InFieldLabels = function (label, field, options) {
        // this的指针指向$.InFieldLabels生成的实例对象。
        var base = this;
        //把原生的label元素转换成jQ对象
        base.$label = $(label);
        base.label = label;

        base.$field = $(field);
        base.field = field;

        //将数据存储到dom元素上
        base.$label.data("InFieldLabels", base);
        base.showing = true;    //用来标识lable元素的显示和隐藏状态。

        base.init = function () {
            var initialSet;

            // 合并配置参数
            base.options = $.extend({}, $.InFieldLabels.defaultOptions, options);

            // 如果为label设置了class的话，那么就将class添加到元素上。
            if (base.options.className) {
                base.$label.addClass(base.options.className);
            }


            // base.$field指向label指定的input输入框。
            //判断base.$field指向的输入框的value值是否为空，不为空的话，隐藏相对应的label标签，将showing标识置为false。
            var initID = setTimeout(function () {
                if (base.$field.val() !== "") {
                    base.$label.hide();
                    base.showing = false;
                } else {
                    base.$label.show();
                    base.showing = true;
                }
                clearTimeout(initID);
            }, 200);

            //base.$field指向label指定的input输入框。
            //base.$field的事件处理
            base.$field.bind('focus', function () {
                base.fadeOnFocus();
            }).bind('blur', function () {
                base.checkForEmpty(true);
            }).bind('keydown.infieldlabel', function (e) {
                base.hideOnChange(e);
            }).bind('paste', function () {
                base.setOpacity(0.0);
            }).bind('change', function () {
                base.checkForEmpty();
            }).bind('onPropertyChange', function () {
                base.checkForEmpty();
            }).bind('keyup.infieldlabel', function () {
                base.checkForEmpty();
            });

            /*if (base.options.pollDuration > 0) {
             initialSet = setInterval(function () {
             if (base.$field.val() !== "") {
             console.log(base.options.pollDuration);
             base.$label.hide();
             base.showing = false;
             clearInterval(initialSet);
             }
             }, base.options.pollDuration);

             }*/
        };

        // base.$field指向的input输入框获得焦点的handler。
        base.fadeOnFocus = function () {
            //如果base.$field对应的label是显示状态.则将其label的透明度设置为默认值
            if (base.showing) {
                base.setOpacity(base.options.fadeOpacity);
            }
        };

        //透明度处理handler
        //如果将默认的透明度设置为0时，隐藏label。
        base.setOpacity = function (opacity) {
            base.$label.stop().animate({ opacity: opacity }, base.options.fadeDuration, function () {
                if (opacity === 0.0) {
                    base.$label.hide();
                }
            });
            base.showing = (opacity > 0.0);
        };

        // base.$field指向的input输入框失去焦点获得的handler。
        //blur控制失去焦点后label的透明度是变成1.0还是保持默认值不变。
        base.checkForEmpty = function (blur) {
            //如果输入框的内容为空,这种情况的出现有两种，第一种是至始至终都没有输入内容，第二种是输入后又进行删除内容
            if (base.$field.val() === "") {
                base.prepForShow();
                base.setOpacity(blur ? 1.0 : base.options.fadeOpacity);
            } else {
                base.setOpacity(0.0);
            }
        };

        base.prepForShow = function () {
            //base.showing等于false的情况是输入后又进行删除内容，才会进行下面的代码。
            if (!base.showing) {
                base.$label.css({opacity: 0.0}).show();
                // 为输入框绑定keydown事件。
                base.$field.bind('keydown.infieldlabel', function (e) {
                    base.hideOnChange(e);
                });
            }
        };

        // 按键处理的handler
        base.hideOnChange = function (e) {
            // 16为shift键 9为tab键。
            if ((e.keyCode === 16) || (e.keyCode === 9)) {
                base.$field.unbind('keydown.infieldlabel');
                return;
            }

            //根据标识base.showing状态进行操作。
            if (base.showing) {
                base.$label.hide();
                base.showing = false;
            }

            // 删除绑定的事件。
            base.$field.unbind('keydown.infieldlabel');
        };

        // 运行初始化方法。
        base.init();
    };

    $.InFieldLabels.defaultOptions = {
        fadeOpacity: 0.5, // label获得焦点后的透明度。
        fadeDuration: 300, //透明度渐变所需的时间。
        /*pollDuration: 0, */
        enabledInputTypes: [ "text", "search", "tel", "url", "email", "password", "number", "textarea" ],   //输入框允许的类型。
        className: false //为label添加的样式名称。
    };


    $.fn.inFieldLabels = function (options) {
        //输入框的类型
        var allowed_types = options && options.enabledInputTypes || $.InFieldLabels.defaultOptions.enabledInputTypes;

        return this.each(function () {

            var for_attr = $(this).attr('for'), field, restrict_type;
            //如果没有label的for指向的目标（id）元素,则不执行任何动作。
            if (!for_attr) {
                return;
            }


            field = document.getElementById(for_attr);
            // 如果没有找到目标（id）元素,则不执行任何动作。
            if (!field) {
                return;
            }

            // 判断输入类型是否在运行的类型中并且节点的名称不是"TEXTAREA"，否则不执行任何动作。
            restrict_type = $.inArray(field.type, allowed_types);

            if (restrict_type === -1 && field.nodeName !== "TEXTAREA") {
                return; // Again, nothing to attach
            }

            /**
             * @this -> label元素对象。
             * @field -> 输入框目标对象。
             * @option -> 配置参数。
             * */
            (new $.InFieldLabels(this, field, options));
        });
    };

}));
