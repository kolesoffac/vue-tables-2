module.exports = function(h, that) {

 var sortControl = require('./sort-control')(h, that);
 var recalcWidth = require('../methods/recalc-width')(that);

 var headings = [];

 if (that.hasChildRow && that.opts.childRowTogglerFirst) headings.push(<th></th>);

 that.allColumns.map(function(column, index) {
  headings.push(<th on-click={that.orderByColumn.bind(that,column)}
    class={that.sortableClass(column)}>
    <span class="VueTables__heading" title={that.getHeadingTooltip(column, h)}>{that.getHeading(column, h)}</span>
    {sortControl(column)}
    </th>)

  	recalcWidth(column, index);
    
}.bind(that))

 if (that.hasChildRow && !that.opts.childRowTogglerFirst) headings.push(<th></th>);

 return headings;
}
