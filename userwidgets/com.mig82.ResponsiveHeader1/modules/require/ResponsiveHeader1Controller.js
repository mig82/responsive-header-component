define(function() {

	return {
		adjustLogo: function(size){
			switch(size){
				case 'S':
					this.view.smLogoLabel.setVisibility(true);
					this.view.mdLogoLabel.setVisibility(false);
					break;
				default:
					this.view.smLogoLabel.setVisibility(false);
					this.view.mdLogoLabel.setVisibility(true);
			}
		},

		onBreakpointChange: function(form, width){
			kony.print("ResponsiveHeader1.onBreakpointChange\n" +
					   `\tForm: ${form.id}\n` +
					   `\tWidth: ${width}\n` +
					   `\tBreakpoints: ${JSON.stringify(form.breakpoints)}`
			);
			var size = getScreenSize(form.breakpoints, width);
			this.adjustLogo(size);
		},

		constructor: function(baseConfig, layoutConfig, pspConfig) {
			amplify.subscribe(
				"onBreakpointChange", //topic
				this, //context
				this.onBreakpointChange, //callback
				1 //priority
			);
		},

		//Logic for getters/setters of custom properties
		initGettersSetters: function() {

		}
	};
});