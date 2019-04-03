/*globals define, kony, require */
define({
	preShow: function() {},

	postShow: function() {},

	onBreakpointChange: function(form, width){
		kony.print(`onBreakpointChange width: ${width}\n` +
				   `Breakpoints: ${JSON.stringify(form.breakpoints)}`
		);
		var size = getScreenSize(form.breakpoints, width);
	},

	onNavigate: function() {
		this.view.preShow = this.preShow;
		this.view.postShow = this.postShow;
		this.view.onBreakpointChange = this.onBreakpointChange;
	}
});