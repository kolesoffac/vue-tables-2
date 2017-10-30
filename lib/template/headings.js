module.exports = function(h, that) {

 var sortControl = require('./sort-control')(h, that);

 var headings = [];

 if (that.hasChildRow && that.opts.childRowTogglerFirst) headings.push(<th></th>);

 that.allColumns.map(function(column, index) {
  headings.push(<th on-click={that.orderByColumn.bind(that,column)}
    class={that.sortableClass(column)}>
    <span class="VueTables__heading" title={that.getHeadingTooltip(column, h)}>{that.getHeading(column, h)}</span>
    {sortControl(column)}
    </th>)

    //recalc width column
    that.$nextTick(function() {
	    if (that.opts.isFixedMode) {
	      var tr = that.showBodyTable.querySelector("thead tr");
	      var th = that.showHeaderTable.querySelector("th:nth-child(" + (index + 1) + ")");
	      var selector = "th:nth-child(" + (index + 1) + ")";

	      if (that.opts.widthColumns) {
	      	let width = that.opts.widthColumns[column] ? that.opts.widthColumns[column] : th.clientWidth;

	      	tr.querySelector(selector).width = width;
	      	th.width = width;
	      };
	    };
	});
}.bind(that))

 if (that.hasChildRow && !that.opts.childRowTogglerFirst) headings.push(<th></th>);

 return headings;
}
