module.exports = function(source) {
  return function(h) {

    var rows = require('./template/rows')(h, this)
    var normalFilter = require('./template/normal-filter')(h, this)
    var dropdownPagination = require('./template/dropdown-pagination')(h, this)
    var columnFilters = require('./template/column-filters')(h, this);
    var footerHeadings = require('./template/footer-headings')(h, this);
    var noResults = require('./template/no-results')(h, this);
    var pagination = require('./template/pagination')(h, this);
    var dropdownPaginationCount = require('./template/dropdown-pagination-count')(h, this);
    var headings = require('./template/headings')(h, this);
    var perPage = require('./template/per-page')(h, this);
    var beforeFilters = this.$slots.beforeFilters?this.$slots.beforeFilters:'';
    var afterFilters = this.$slots.afterFilters?this.$slots.afterFilters:'';
    var beforeBody = this.$slots.beforeBody?this.$slots.beforeBody:''; 
    var prependBody = this.$slots.prependBody?this.$slots.prependBody:''; 
    var appendBody = this.$slots.appendBody?this.$slots.appendBody:''; 
    var afterBody = this.$slots.afterBody?this.$slots.afterBody:''; 

    if (this.opts.isFixedMode) {
        var headingsHidden = headings.map(() => <th><div></div></th>);

        var fakeThead = <thead>
                <tr>
                    {headingsHidden}
                </tr>
            </thead>
    };

    var classTable = `table-responsive ${this.opts.isFixedMode ? 'fht-table-wrapper' : ''}`;
    var currentThead = <thead>
                    <tr>
                        {headings}
                    </tr>
                    {this.$slots.beforeFilters}  
                    {columnFilters}
                    {this.$slots.afterFilters}  
                </thead>;

    var getTable = ({style = "", classes = "", thead = "", tbody = false}) => {
        return <table class={'VueTables__table table ' + classes + ' ' + this.opts.skin} style={style}>
            {thead && thead}
            
            {tbody && footerHeadings}

            {tbody && beforeBody}
            {tbody &&   <tbody>
                            {prependBody}
                            {noResults}
                            {rows}
                            {appendBody}
                        </tbody>}
            {tbody && afterBody}
        </table>
    };

    return <div class={"VueTables VueTables--" + this.source}>
            <div class="row">
                <div class="col-md-6">
                {normalFilter}
                </div>

                <div class="col-md-6">
                    {dropdownPagination}
                    {perPage}
                </div>
            </div>

            <div class={classTable}>
                { this.opts.isFixedMode && <div class="fht-fixed-body" style="width: 938px;">
                        <div class="fht-thead">
                            {getTable({thead: currentThead, classes: "fht-table fht-show-header-table", style: "width: 1100px;margin-left: 0px;"})}
                        </div>

                        <div class="fht-tbody" style="height: 340px;">
                            {getTable({thead: fakeThead, tbody: true, classes: "fht-table fht-show-header-table", style: "width: 1100px;margin-top: 0px;"})}
                        </div>

                    </div>
                }

                { !this.opts.isFixedMode && getTable({thead: currentThead, tbody: true}) }
                
            </div>

            {pagination}
            {dropdownPaginationCount}
        </div>

  }
}
