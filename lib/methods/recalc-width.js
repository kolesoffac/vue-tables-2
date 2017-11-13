module.exports = function(that) {
	return function(column, index) {
		//recalc width column
		if (this.showBodyTable && this.showHeaderTable && this.opts.isFixedMode) {
			this.$nextTick(() => {
				var tr = this.showBodyTable.querySelector("thead tr");
				var th = this.showHeaderTable.querySelector("th:nth-child(" + (index + 1) + ")");
				var selector = "th:nth-child(" + (index + 1) + ")";
				let width, widthColumn;

				if (this.opts.widthColumns)
					widthColumn = this.opts.widthColumns[column];

				var div = document.createElement('div');
				
				div.innerHTML = th.innerHTML;
				div.style.visibility = "hidden";
				div.style.width = "fit-content";
				document.body.appendChild(div);

				var thClientWidth = div.clientWidth;

				document.body.removeChild(div)

				width = widthColumn ? widthColumn : thClientWidth;

				const {minWidthColumns} = this.opts;
				let neWidth = minWidthColumns && width < minWidthColumns ? minWidthColumns : width;

				neWidth = widthColumn ? widthColumn : neWidth;

				tr.querySelector(selector).width = neWidth;
				th.width = neWidth;
			});
		};
	}.bind(that);
};