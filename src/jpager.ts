///<reference path="../typings/index.d.ts"/>

interface jpagerOptions {
    baseUrl?: string;
    fromZero?: boolean;
    currentPage?: number;
    totalPage?: number;
    pageIndexName?: string;
    level?: number;
    render?: () => JQuery;
}

interface jpage {
    url: string;
    name: string;
    active: boolean;
    disabled: boolean;
}

interface jpager extends jpagerOptions {
    pages: jpage[];
    render: () => JQuery;
}

interface JQuery {
    jpager(): JQuery;
}

(function ($) {
    'use strict';

    var renderFunc = function (): JQuery {
        let $self = this;
        let data: jpager = $self.data('jpager');
        let pages: jpage[] = data.pages;

        let lis = pages.map((v, i) => {
            let $a = $('<a></a>').attr('href', v.url).text(v.name);
            let $li = $('<li></li>').append($a);
            if (v.active) {
                $li.addClass('active');
            }
            if (v.disabled) {
                $li.addClass('disabled');
            }
            return $li[0];
        });
        let $ul = $('<ul></ul>').addClass('pagination').append(lis);
        let $nav = $('<nav aria-label="Page navigation"></nav>')
            .append($ul);
        $self.append($nav);
        return $self;
    }

    function initFunc(config: jpagerOptions): JQuery {
        let $self: JQuery = this;

        if (!$self.data('jpager')) {
            let {
                baseUrl = '/',
                fromZero = false,
                pageIndexName = 'page',
                level = 2,
            } = config;
            let currentPage: number = typeof config.currentPage !== 'undefined' ? config.currentPage : (fromZero ? 0 : 1);
            let totalPage: number = typeof config.totalPage !== 'undefined' ? config.totalPage : (fromZero ? currentPage + 1 : currentPage);
            let pages: jpage[] = [];

            if (totalPage > 1) {
                let createPage = function(idx) :jpage {
                    let pageNumber = fromZero ? idx : idx + 1;
                    let name = fromZero ? idx : idx + 1;
                    return {
                        name: `${name}`,
                        url: `${baseUrl}${pageIndexName}=${pageNumber}`,
                        active: pageNumber === currentPage,
                        disabled: false
                    };
                };
                baseUrl = baseUrl.indexOf('?') >= 0 ? baseUrl : baseUrl + '?';
                baseUrl = baseUrl.replace(/\&$/, '') + '&';
                if (totalPage <= level * 2 + 1) {
                    for (let i = 0; i < totalPage; i++) {
                        pages.push(createPage(i));
                    }
                } else {
                    let first = createPage(0);
                    let last = createPage(totalPage-1);

                }
            }

            let data: jpager = {
                baseUrl,
                fromZero,
                currentPage,
                totalPage,
                pageIndexName,
                level,
                pages,
                render: (config.render || renderFunc).bind($self)
            };
            $self.data('jpager', data);
        }

        return $self;
    }

    // Basic plugin function
    $.fn.jpager = function (method: string | jpagerOptions, ...args: any[]): JQuery {
        let callingMethod = typeof method === 'string';
        let methodName = callingMethod ? <string>method : null;
        let initOptions: jpagerOptions = $.isPlainObject(method) ? <jpagerOptions>method : {};
        let $self = $(this);

        if (callingMethod) {
            // Calling relavent method
            let methods = {
            };
            let func: () => JQuery = methods[methodName];
            if (func) {
                return func.apply($self, args);
            } else {
                return $self;
            }
        } else {
            // Init component
            return initFunc.call($self, initOptions);
        }
    };
})(jQuery);
