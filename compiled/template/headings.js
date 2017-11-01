'use strict';

module.exports = function (h, that) {

  var sortControl = require('./sort-control')(h, that);
  var recalcWidth = require('../methods/recalc-width')(that);

  var headings = [];

  if (that.hasChildRow && that.opts.childRowTogglerFirst) headings.push(h(
    'th',
    null,
    []
  ));

  that.allColumns.map(function (column, index) {
    headings.push(h(
      'th',
      {
        on: {
          'click': that.orderByColumn.bind(that, column)
        },

        'class': that.sortableClass(column) },
      [h(
        'span',
        { 'class': 'VueTables__heading', attrs: { title: that.getHeadingTooltip(column, h) }
        },
        [that.getHeading(column, h)]
      ), sortControl(column)]
    ));

    recalcWidth(column, index);
  }.bind(that));

  if (that.hasChildRow && !that.opts.childRowTogglerFirst) headings.push(h(
    'th',
    null,
    []
  ));

  return headings;
};