'use strict';

module.exports = function (source) {
    return function (h) {
        var _this = this;

        var rows = require('./template/rows')(h, this);
        var normalFilter = require('./template/normal-filter')(h, this);
        var dropdownPagination = require('./template/dropdown-pagination')(h, this);
        var columnFilters = require('./template/column-filters')(h, this);
        var footerHeadings = require('./template/footer-headings')(h, this);
        var noResults = require('./template/no-results')(h, this);
        var pagination = require('./template/pagination')(h, this);
        var dropdownPaginationCount = require('./template/dropdown-pagination-count')(h, this);
        var headings = require('./template/headings')(h, this);
        var perPage = require('./template/per-page')(h, this);
        var beforeFilters = this.$slots.beforeFilters ? this.$slots.beforeFilters : '';
        var afterFilters = this.$slots.afterFilters ? this.$slots.afterFilters : '';
        var beforeBody = this.$slots.beforeBody ? this.$slots.beforeBody : '';
        var prependBody = this.$slots.prependBody ? this.$slots.prependBody : '';
        var appendBody = this.$slots.appendBody ? this.$slots.appendBody : '';
        var afterBody = this.$slots.afterBody ? this.$slots.afterBody : '';

        if (this.opts.isFixedMode) {
            var headingsHidden = headings.map(function () {
                return h(
                    'th',
                    null,
                    [h(
                        'div',
                        null,
                        []
                    )]
                );
            });

            var fakeThead = h(
                'thead',
                null,
                [h(
                    'tr',
                    null,
                    [headingsHidden]
                )]
            );
        };

        var classTable = 'table-responsive ' + (this.opts.isFixedMode ? 'fht-table-wrapper' : '');
        var currentThead = h(
            'thead',
            null,
            [h(
                'tr',
                null,
                [headings]
            ), this.$slots.beforeFilters, columnFilters, this.$slots.afterFilters]
        );

        var getTable = function getTable(_ref) {
            var _ref$style = _ref.style,
                style = _ref$style === undefined ? "" : _ref$style,
                _ref$classes = _ref.classes,
                classes = _ref$classes === undefined ? "" : _ref$classes,
                _ref$thead = _ref.thead,
                thead = _ref$thead === undefined ? "" : _ref$thead,
                _ref$tbody = _ref.tbody,
                tbody = _ref$tbody === undefined ? false : _ref$tbody;

            return h(
                'table',
                { 'class': 'VueTables__table table ' + classes + ' ' + _this.opts.skin, style: style },
                [thead && thead, tbody && footerHeadings, tbody && beforeBody, tbody && h(
                    'tbody',
                    null,
                    [prependBody, noResults, rows, appendBody]
                ), tbody && afterBody]
            );
        };

        return h(
            'div',
            { 'class': "VueTables VueTables--" + this.source },
            [h(
                'div',
                { 'class': 'row' },
                [h(
                    'div',
                    { 'class': 'col-md-6' },
                    [normalFilter]
                ), h(
                    'div',
                    { 'class': 'col-md-6' },
                    [dropdownPagination, perPage]
                )]
            ), h(
                'div',
                { 'class': classTable, style: 'height: ' + this.opts.fixedHeight + 'px' },
                [this.opts.isFixedMode && h(
                    'div',
                    { 'class': 'fht-fixed-body', style: 'width: ' + this.fixedWidthAreaTable + 'px;' },
                    [h(
                        'div',
                        { 'class': 'fht-thead' },
                        [getTable({ thead: currentThead, classes: "fht-table fht-show-header-table", style: "" })]
                    ), h(
                        'div',
                        { 'class': 'fht-tbody', style: 'height: ' + (this.opts.fixedHeight - 100) + 'px' },
                        [getTable({ thead: fakeThead, tbody: true, classes: "fht-table fht-show-header-table", style: "" })]
                    )]
                ), !this.opts.isFixedMode && getTable({ thead: currentThead, tbody: true })]
            ), pagination, dropdownPaginationCount]
        );
    };
};