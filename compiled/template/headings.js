"use strict";

module.exports = function (h, that) {

  var sortControl = require('./sort-control')(h, that);

  var headings = [];

  if (that.hasChildRow && that.opts.childRowTogglerFirst) headings.push(h(
    "th",
    null,
    []
  ));

  that.allColumns.map(function (column, index) {
    headings.push(h(
      "th",
      {
        on: {
          "click": that.orderByColumn.bind(that, column)
        },

        "class": that.sortableClass(column) },
      [h(
        "span",
        { "class": "VueTables__heading", attrs: { title: that.getHeadingTooltip(column, h) }
        },
        [that.getHeading(column, h)]
      ), sortControl(column)]
    ));

    //recalc width column
    that.$nextTick(function () {
      if (that.opts.isFixedMode) {
        var tr = that.showBodyTable.querySelector("thead tr");
        var th = that.showHeaderTable.querySelector("th:nth-child(" + (index + 1) + ")");
        //that.showHeaderTable.querySelectorAll("th").forEach((th, index) => {
        tr.querySelector("th:nth-child(" + (index + 1) + ")").width = that.opts.widthColumns && that.opts.widthColumns[column] ? that.opts.widthColumns[column] : th.clientWidth;
        // });
      };
    });
  }.bind(that));

  if (that.hasChildRow && !that.opts.childRowTogglerFirst) headings.push(h(
    "th",
    null,
    []
  ));

  return headings;
};