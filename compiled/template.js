'use strict';

module.exports = function (source) {
    return function (h) {

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

        var headingsFake = headings.map(function () {
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
                { 'class': 'table-responsive fht-table-wrapper' },
                [h(
                    'div',
                    { 'class': 'fht-fixed-body', style: 'width: 938px;' },
                    [h(
                        'div',
                        { 'class': 'fht-thead' },
                        [h(
                            'table',
                            { 'class': 'VueTables__table table fht-table fht-show-header-table ' + this.opts.skin, style: 'width: 1100px;margin-left: 0px;' },
                            [h(
                                'thead',
                                null,
                                [h(
                                    'tr',
                                    null,
                                    [headings]
                                ), this.$slots.beforeFilters, columnFilters, this.$slots.afterFilters]
                            )]
                        )]
                    ), h(
                        'div',
                        { 'class': 'fht-tbody', style: 'height: 340px;' },
                        [h(
                            'table',
                            { 'class': 'VueTables__table table fht-table fht-show-body-table ' + this.opts.skin, style: 'width: 1100px;margin-top: 0px;' },
                            [h(
                                'thead',
                                null,
                                [h(
                                    'tr',
                                    null,
                                    [headingsFake]
                                )]
                            ), footerHeadings, this.$slots.beforeBody, h(
                                'tbody',
                                null,
                                [this.$slots.prependBody, noResults, rows, this.$slots.appendBody]
                            ), this.$slots.afterBody]
                        )]
                    )]
                )]
            ), pagination, dropdownPaginationCount]
        );
    };
};