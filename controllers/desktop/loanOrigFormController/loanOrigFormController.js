/*globals define, kony, require, amplify */
define({
	preShow: function() {},

	postShow: function() {},

	onBreakpointChange: function(form, width){
		amplify.publish("onBreakpointChange", form, width);
	},

	onNavigate: function() {
		this.view.preShow = this.preShow;
		this.view.postShow = this.postShow;
		this.view.onBreakpointChange = this.onBreakpointChange;
	}
});