define(function() {

	return {

		//Define a different adjustFoo function for each UI element that must
		//respond to changes in the width of the viewport.
		adjustLogo: function(size){
			switch(size){
				case 'XS':
				case 'S':
					this.view.smLogoLabel.setVisibility(true);
					this.view.mdLogoLabel.setVisibility(false);
					break;
				default:
					this.view.smLogoLabel.setVisibility(false);
					this.view.mdLogoLabel.setVisibility(true);
			}

			switch(size){
				case 'L':
				case 'XL':
				case 'XXL':
					this.view.mdLogoLabel.right = null;
					this.view.mdLogoLabel.centerX = "50%";
					break;
				default:
					this.view.mdLogoLabel.right = "5dp";
					this.view.mdLogoLabel.centerX = null;
			}
		},

		onBreakpointChange: function(form, width){
			kony.print("ResponsiveHeader1.onBreakpointChange\n" +
					   `\tForm: ${form.id}\n` +
					   `\tWidth: ${width}\n` +
					   `\tBreakpoints: ${JSON.stringify(form.breakpoints)}`
			);
			//Let's transform the pixels into a t-shirt size. This is so that
			//if the breakpoints change in the future we won't have to update
			//the logic.
			var size = getScreenSize(form.breakpoints, width);

			//Adjust each element of the UI with its corresponding ajustFoo function.
			this.adjustLogo(size);
		},

		constructor: function(baseConfig, layoutConfig, pspConfig) {

			//Then let's subscribe to the form's onBreakpointChange so that every
			//time the screen is resized we decide how the UI should respond.
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