"use strict";

module.exports = function (that) {
	return function () {
		var _this = this;

		if (this.opts.isFixedMode) {
			this.$el.querySelector(".table-responsive").style.height = this.opts.fixedHeight || "600px";
			this.showHeaderTable = this.$el.querySelector(".fht-show-header-table");
			this.showBodyTable = this.$el.querySelector(".fht-table-wrapper .fht-tbody");

			this.fixedWidthAreaTable = this.$el.querySelector(".table-responsive").clientWidth;
			this.$el.querySelector(".table-responsive").style.height = this.opts.fixedHeight + "px" || "600px";

			this.showBodyTable && this.showBodyTable.addEventListener && this.showBodyTable.addEventListener("scroll", function (e) {
				var marginLeft = "-" + e.currentTarget.scrollLeft + "px";

				marginLeft != _this.showHeaderTable.style.marginLeft && (_this.showHeaderTable.style.marginLeft = marginLeft);

				_this.$emit("scroll-body", e);

				_this.currentScrollTop != e.currentTarget.scrollTop && _this.$emit("scroll-body-vertical", e);
				_this.currentScrollLeft != e.currentTarget.scrollLeft && _this.$emit("scroll-body-horizontal", e);

				_this.currentScrollTop = e.currentTarget.scrollTop;
				_this.currentScrollLeft = e.currentTarget.scrollLeft;
			});
		};
	}.bind(that);
};