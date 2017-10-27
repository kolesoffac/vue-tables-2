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
    };

    var classTable = `table-responsive ${this.opts.isFixedMode?'fht-table-wrapper':''}`;

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
                        <table class={'VueTables__table table fht-table fht-show-header-table ' + this.opts.skin} style="width: 1100px;margin-left: 0px;">
                            <thead>
                                <tr>
                                    {headings}
                                </tr>
                                {this.$slots.beforeFilters}  
                                {columnFilters}
                                {this.$slots.afterFilters}  
                            </thead>
                        </table>
                    </div>

                    <div class="fht-tbody" style="height: 340px;">
                        <table class={'VueTables__table table fht-table fht-show-body-table ' + this.opts.skin} style="width: 1100px;margin-top: 0px;">
                            <thead>
                                <tr>
                                    {headingsHidden}
                                </tr>
                            </thead>

                            {footerHeadings}
                            {this.$slots.beforeBody}      
                            <tbody>
                                {this.$slots.prependBody}
                                {noResults}
                                {rows}
                                {this.$slots.appendBody}
                            </tbody>
                            {this.$slots.afterBody}
                        </table>
                    </div>

                </div>}

                { !this.opts.isFixedMode && <table class={'VueTables__table table  ' + this.opts.skin}>
                    <thead>
                        <tr>
                            {headings}
                        </tr>
                        {this.$slots.beforeFilters}  
                        {columnFilters}
                        {this.$slots.afterFilters}  
                    </thead>

                    {footerHeadings}
                    {this.$slots.beforeBody}      
                    <tbody>
                        {this.$slots.prependBody}
                        {noResults}
                        {rows}
                        {this.$slots.appendBody}
                    </tbody>
                    {this.$slots.afterBody}
                </table> }
                
            </div>

            {pagination}
            {dropdownPaginationCount}
        </div>

  }
}
