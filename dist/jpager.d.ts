/// <reference path="../typings/index.d.ts" />
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
