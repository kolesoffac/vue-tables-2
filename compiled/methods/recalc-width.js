"use strict";

module.exports = function (that) {
	return function (column, index) {
		var _this = this;

		//recalc width column
		if (this.showBodyTable && this.showHeaderTable && this.opts.isFixedMode) {
			this.$nextTick(function () {
				var tr = _this.showBodyTable.querySelector("thead tr");
				var th = _this.showHeaderTable.querySelector("th:nth-child(" + (index + 1) + ")");
				var selector = "th:nth-child(" + (index + 1) + ")";
				var width = void 0,
				    widthColumn = void 0;

				if (_this.opts.widthColumns) widthColumn = _this.opts.widthColumns[column];

				var div = document.createElement('div');

				div.innerHTML = th.innerHTML;
				div.style.visibility = "hidden";
				div.style.width = "fit-content";
				document.body.appendChild(div);

				var thClientWidth = div.clientWidth;

				document.body.removeChild(div);

				width = widthColumn ? widthColumn : thClientWidth;

				var minWidthColumns = _this.opts.minWidthColumns;

				var neWidth = minWidthColumns && width < minWidthColumns ? minWidthColumns : width;

				neWidth = widthColumn ? widthColumn : neWidth;

				tr.querySelector(selector).width = neWidth;
				th.width = neWidth;
			});
		};
	}.bind(that);
};