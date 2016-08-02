///<reference path="../typings/index.d.ts"/>
(function ($) {
    'use strict';
    var renderFunc = function () {
        var $self = this;
        var data = $self.data('jpager');
        var pages = data.pages;
        var lis = pages.map(function (v, i) {
            var $a = $('<a></a>').attr('href', v.url).text(v.name).addClass('jpager__page-link');
            var $li = $('<li></li>').addClass('jpager__page').append($a);
            if (v.active) {
                $li.addClass('active');
            }
            if (v.disabled) {
                $li.addClass('disabled');
            }
            return $li[0];
        });
        var $ul = $('<ul></ul>').addClass('pagination').addClass('jpager__wrapper').append(lis);
        var $nav = $('<nav aria-label="Page navigation"></nav>').addClass('jpager').append($ul);
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
            // calculate the page navigation items
            if (totalPage > 1) {
                var createPageNumber_1 = function (idx) { return fromZero_1 ? idx : idx + 1; };
                var createName_1 = function (idx) { return idx + 1; };
                var createPage = function (idx, preferName) {
                    var pageNumber = createPageNumber_1(idx);
                    var name = preferName || createName_1(idx);
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
                    var min = createPageNumber_1(0);
                    var max = createPageNumber_1(totalPage - 1);
                    var before = currentPage_1 - min;
                    var after = max - currentPage_1;
                    var pageToIdx = function (page) { return fromZero_1 ? page : page - 1; };
                    var startIdx = pageToIdx(currentPage_1 - level);
                    startIdx = startIdx < 0 ? 0 : startIdx;
                    var endIdx = pageToIdx(currentPage_1 + level);
                    endIdx = endIdx > totalPage - 1 ? totalPage - 1 : endIdx;
                    if (before > level + 1) {
                        pages.push(createPage(0));
                        pages.push(createPage(startIdx - 1, '...'));
                    }
                    else if (before > level) {
                        pages.push(createPage(0));
                    }
                    for (var i = startIdx; i <= endIdx; i++) {
                        pages.push(createPage(i));
                    }
                    if (after > level + 1) {
                        pages.push(createPage(pageToIdx(endIdx + 1), '...'));
                        pages.push(createPage(totalPage - 1));
                    }
                    else if (after > level) {
                        pages.push(createPage(totalPage - 1));
                    }
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
