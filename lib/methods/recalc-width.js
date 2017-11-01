module.exports = function(that) {
	return function(column, index) {
		//recalc width column
		if (this.showBodyTable && this.showHeaderTable && this.opts.isFixedMode) {
			this.$nextTick(() => {
				var tr = this.showBodyTable.querySelector("thead tr");
				var th = this.showHeaderTable.querySelector("th:nth-child(" + (index + 1) + ")");
				var selector = "th:nth-child(" + (index + 1) + ")";
				let width;

				if (this.opts.widthColumns)
				width = this.opts.widthColumns[column];

				var div = document.createElement('div');
				
				div.innerHTML = th.innerHTML;
				div.style.visibility = "hidden";
				div.style.width = "fit-content";
				document.body.appendChild(div);

				var thClientWidth = div.clientWidth;

				document.body.removeChild(div)

				width = width ? width : thClientWidth;

				tr.querySelector(selector).width = width;
				th.width = width;
			});
		};
	}.bind(that);
}