(function ($) {
    $.fn.loading = function (options) {
        var $this = $(this);
        var _this = this;
        return this.each(function () {
            var loadingPosition = '';
            var defaultProp = {
                direction: 'column',
                animateIn: 'fadeInNoTransform',
                title: '请稍等...',
                name: 'loadingName',
                type: 'origin',
                discription: '这是一个描述',
                titleColor: 'rgba(255,255,255,0.7)',
                discColor: 'rgba(255,255,255,0.7)',
                loadingWidth: 260,
                loadingBg: 'rgba(0, 0, 0, 0.6)',
                borderRadius: 12,
                loadingMaskBg: 'transparent',
                zIndex: 1000001,
                originDivWidth: 60,
                originDivHeight: 60,
                originWidth: 8,
                originHeight: 8,
                originBg: '#fefefe',
                smallLoading: false,
                imgSrc: 'http://www.daiwei.org/index/images/logo/dw.png',
                imgDivWidth: 80,
                imgDivHeight: 80,
                flexCenter: false,
                flexDirection: 'row',
                mustRelative: false,
            };
            var opt = $.extend(defaultProp, options || {});
            if ($this.selector == 'body') {
                $('body,html').css({
                    overflow: 'hidden',
                });
                loadingPosition = 'fixed';
            } else if (opt.mustRelative) {
                $this.css({
                    position: 'relative',
                });
                loadingPosition = 'absolute';
            } else {
                loadingPosition = 'absolute';
            }
            defaultProp._showOriginLoading = function () {
                var smallLoadingMargin = opt.smallLoading ? 0 : '-10px';
                if (opt.direction == 'row') {
                    smallLoadingMargin = '-6px'
                }
                _this.cpt_loading_mask = $('<div class="cpt-loading-mask animated ' + opt.animateIn +
                    ' ' + opt.direction + '" data-name="' + opt.name + '"></div>').css({
                    'background': opt.loadingMaskBg,
                    'z-index': opt.zIndex,
                    'position': loadingPosition,
                }).appendTo($this);
                _this.div_loading = $('<div class="div-loading"></div>').css({
                    'background': opt.loadingBg,
                    'width': opt.loadingWidth,
                    'height': opt.loadingHeight,
                    '-webkit-border-radius': opt.borderRadius,
                    '-moz-border-radius': opt.borderRadius,
                    'border-radius': opt.borderRadius,
                }).appendTo(_this.cpt_loading_mask);
                if (opt.flexCenter) {
                    _this.div_loading.css({
                        "display": "-webkit-flex",
                        "display": "flex",
                        "-webkit-flex-direction": opt.flexDirection,
                        "flex-direction": opt.flexDirection,
                        "-webkit-align-items": "center",
                        "align-items": "center",
                        "-webkit-justify-content": "center",
                        "justify-content": "center",
                    });
                }
                _this.loading_title = $('<p class="loading-title txt-textOneRow"></p>').css({
                    color: opt.titleColor,
                }).html(opt.title).appendTo(_this.div_loading);
                _this.loading = $('<div class="loading ' + opt.type + '"></div>').css({
                    'width': opt.originDivWidth,
                    'height': opt.originDivHeight,
                }).appendTo(_this.div_loading);
                _this.loading_discription = $('<p class="loading-discription txt-textOneRow"></p>')
                    .css({
                        color: opt.discColor,
                    }).html(opt.discription).appendTo(_this.div_loading);
                if (opt.type == 'origin') {
                    _this.loadingOrigin = $(
                        '<div class="div-loadingOrigin"><span></span></div><div class="div-loadingOrigin"><span></span></div><div class="div_loadingOrigin"><span></span></div><div class="div_loadingOrigin"><span></span></div><div class="div_loadingOrigin"><span></span></div>'
                    ).appendTo(_this.loading);
                    _this.loadingOrigin.children().css({
                        "margin-top": smallLoadingMargin,
                        "margin-left": smallLoadingMargin,
                        "width": opt.originWidth,
                        "height": opt.originHeight,
                        "background": opt.originBg,
                    });
                }
                if (opt.type == 'pic') {
                    _this.loadingPic = $('<img src="' + opt.imgSrc + '" alt="loading" />').appendTo(
                        _this.loading);
                }
                _this.cpt_loading_mask.on('touchstart touchend touchmove click', function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                });
            };
            defaultProp._createLoading = function () {
                if ($(".cpt-loading-mask[data-name=" + opt.name + "]").length > 0) {
                    return
                }
                defaultProp._showOriginLoading();
            };
            defaultProp._createLoading();
        });
    }
})(jQuery)

function removeLoading(loadingName) {
    var loadingName = loadingName || '';
    $('body,html').css({
        overflow: 'auto',
    });
    if (loadingName == '') {
        $(".cpt-loading-mask").remove();
    } else {
        var name = loadingName || 'loadingName';
        $(".cpt-loading-mask[data-name=" + name + "]").remove();
    }
}