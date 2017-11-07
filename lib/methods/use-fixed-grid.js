module.exports = function(that) {
	return function() {
		if (this.opts.isFixedMode) {
			this.$el.querySelector(".table-responsive").style.height = this.opts.fixedHeight || "600px";
			this.showHeaderTable = this.$el.querySelector(".fht-show-header-table");
			this.showBodyTable = this.$el.querySelector(".fht-table-wrapper .fht-tbody");

			this.fixedWidthAreaTable = this.$el.querySelector(".table-responsive").clientWidth;
			this.$el.querySelector(".table-responsive").style.height = (this.opts.fixedHeight + "px") || "600px";

			this.showBodyTable && this.showBodyTable.addEventListener && this.showBodyTable.addEventListener("scroll", e => {
				var marginLeft = `-${e.currentTarget.scrollLeft}px`;

				marginLeft != this.showHeaderTable.style.marginLeft && (this.showHeaderTable.style.marginLeft = marginLeft);

				this.$emit("scroll-body", e);

				this.currentScrollTop != e.currentTarget.scrollTop && this.$emit("scroll-body-vertical", e);
				this.currentScrollLeft != e.currentTarget.scrollLeft && this.$emit("scroll-body-horizontal", e);

				this.currentScrollTop = e.currentTarget.scrollTop;
				this.currentScrollLeft = e.currentTarget.scrollLeft;
			});
		};
	}.bind(that);
}