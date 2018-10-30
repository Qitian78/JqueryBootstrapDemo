/*
*作者：岳奔
*时间：2018年9月26号
*
*/

(function ($) {
    'use strict';
    $.extend($.fn.bootstrapTable.defaults, {
        // 默认不显示
        paginationShowPageGo: false
    });

    $.extend($.fn.bootstrapTable.locales, {
        pageGo: function () {
            return '跳至';
        }
    });
    $.extend($.fn.bootstrapTable.defaults, $.fn.bootstrapTable.locales);

    let BootstrapTable = $.fn.bootstrapTable.Constructor,
        _initPagination = BootstrapTable.prototype.initPagination;

    //翻页跳转功能
    BootstrapTable.prototype.initPagination = function() {
        _initPagination.apply(this, Array.prototype.slice.apply(arguments));
        if (this.options.paginationShowPageGo) {
            let html = [];

            html.push(
                '<ul class="pagination-jump">',
                '<li class=""><span>' + this.options.pageGo() + ':</span></li>',
                '<li class=""><input type="text" class="page-input" value="' + this.options.pageNumber + '"   /></li>',
                '<li class="page-go"><a class="jump-go" href="">GO</a></li>',
                '</ul>');
            this.$pagination.find('ul.pagination').after(html.join(''));

            this.$pagination.find('.page-go').off('click').on('click', $.proxy(this.onPageGo, this));
            this.$pagination.find('.page-input').off('keyup').on('keyup', function() {
                this.value = this.value.length === 1 ? this.value.replace(/[^1-9]/g,'') : this.value.replace(/\D/g,'');
            });
        }
    };

    BootstrapTable.prototype.onPageGo = function (event) {
        // let $this = $(event.currentTarget);
        let $toPage = this.$pagination.find('.page-input');

        if (this.options.pageNumber === +$toPage.val()) {
            return false;
        }
        this.selectPage(+$toPage.val());
        // this.options.pageNumber = +$toPage.val();

        // this.updatePagination(event);
        // $this.prev().find('input').val(this.options.pageNumber);
        return false;
    };
})();