///<reference path="../typings/index.d.ts"/>
(function ($) {
    'use strict';
    var renderFunc = function () {
        var $self = this;
        var data = $self.data('jpager');
        var pages = data.pages;
        var lis = pages.map(function (v, i) {
            var $a = $('<a></a>').attr('href', v.url).text(v.name);
            var $li = $('<li></li>').append($a);
            if (v.active) {
                $li.addClass('active');
            }
            if (v.disabled) {
                $li.addClass('disabled');
            }
            return $li[0];
        });
        var $ul = $('<ul></ul>').addClass('pagination').append(lis);
        var $nav = $('<nav aria-label="Page navigation"></nav>')
            .append($ul);
        $self.append($nav);
        return $self;
    };
    function initFunc(config) {
        var $self = this;
        if (!$self.data('jpager')) {
            var _a = config.baseUrl, baseUrl_1 = _a === void 0 ? '/' : _a, _b = config.fromZero, fromZero_1 = _b === void 0 ? false : _b, _c = config.pageIndexName, pageIndexName_1 = _c === void 0 ? 'page' : _c, _d = config.level, level = _d === void 0 ? 2 : _d;
            var currentPage_1 = typeof config.currentPage !== 'undefined' ? config.currentPage : (fromZero_1 ? 0 : 1);
            var totalPage = typeof config.totalPage !== 'undefined' ? config.totalPage : (fromZero_1 ? currentPage_1 + 1 : currentPage_1);
            var pages = [];
            if (totalPage > 1) {
                var createPage = function (idx) {
                    var pageNumber = fromZero_1 ? idx : idx + 1;
                    var name = fromZero_1 ? idx : idx + 1;
                    return {
                        name: "" + name,
                        url: "" + baseUrl_1 + pageIndexName_1 + "=" + pageNumber,
                        active: pageNumber === currentPage_1,
                        disabled: false
                    };
                };
                baseUrl_1 = baseUrl_1.indexOf('?') >= 0 ? baseUrl_1 : baseUrl_1 + '?';
                baseUrl_1 = baseUrl_1.replace(/\&$/, '') + '&';
                if (totalPage <= level * 2 + 1) {
                    for (var i = 0; i < totalPage; i++) {
                        pages.push(createPage(i));
                    }
                }
                else {
                    var first = createPage(0);
                    var last = createPage(totalPage - 1);
                }
            }
            var data = {
                baseUrl: baseUrl_1,
                fromZero: fromZero_1,
                currentPage: currentPage_1,
                totalPage: totalPage,
                pageIndexName: pageIndexName_1,
                level: level,
                pages: pages,
                render: (config.render || renderFunc).bind($self)
            };
            $self.data('jpager', data);
        }
        return $self;
    }
    // Basic plugin function
    $.fn.jpager = function (method) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var callingMethod = typeof method === 'string';
        var methodName = callingMethod ? method : null;
        var initOptions = $.isPlainObject(method) ? method : {};
        var $self = $(this);
        if (callingMethod) {
            // Calling relavent method
            var methods = {};
            var func = methods[methodName];
            if (func) {
                return func.apply($self, args);
            }
            else {
                return $self;
            }
        }
        else {
            // Init component
            return initFunc.call($self, initOptions);
        }
    };
})(jQuery);
