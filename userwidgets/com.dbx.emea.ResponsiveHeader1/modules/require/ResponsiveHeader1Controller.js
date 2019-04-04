define(function() {

	return {
		onBreakpointChange: function(form, width){
			kony.print("ResponsiveHeader1.onBreakpointChange\n" +
					   `\tForm: ${form.id}\n` +
					   `\tWidth: ${width}\n` +
					   `\tBreakpoints: ${JSON.stringify(form.breakpoints)}`
			);
			var size = getScreenSize(form.breakpoints, width);
		},

		constructor: function(baseConfig, layoutConfig, pspConfig) {

		},

		//Logic for getters/setters of custom properties
		initGettersSetters: function() {
			amplify.subscribe(
				"onBreakpointChange", //topic
				this, //context
				this.onBreakpointChange, //callback
				1 //priority
			);
		}
	};
});