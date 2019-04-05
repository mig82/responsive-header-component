# Responsive Header

This project showcases an example of how to build a *Responsive Web Reusable
Component* using *Kony Visualizer*. The Visualizer project just serves as a
wrapper to demo the component. The component -called
`com.mig82.ResponsiveWebHeader1` is the real focus of this exercise.

## External Dependencies

This project uses AmplifyJs's core module. This is bundled within the component
so once the component is imported this Javascript module will be added to the
project's global `modules` directory.

## Implementation Notes

This project was built using Kony Visualizer Enterprise 8.4.6.

## Responsive Design and Components

Changing the width of the browser will fire the `FlexForm`'s `onBreakpointChange`
event handler. From there, in order to also notify the components in the form of
this event, the `FlexForm`'s event handler could directly invoke a custom method
in each component that's meant to be responsive -e.g.:

```javascript
// A tightly coupled form controller.
define({
	onBreakpointChange: function(form, width){
		this.view.FooComponent.adjust(width);
		this.view.BarComponent.adjust(width);
		// For each and every component in the form.
		this.view.QuxComponent.adjust(width);
	},
	onNavigate: function(){
		this.view.onBreakpointChange = this.onBreakpointChange;
	}
});
```

The down-side with this approach is two-fold. First, it forces you to
[expose this hypothetical custom `adjust` method](http://docs.kony.com/konylibrary/visualizer/visualizer_user_guide/Content/C_CreatingComponent.htm#Methods)
for each component.

Second, it tightly couples the form controller to the components. You have to
call this hypothetical custom `adjust` method for each and every component in
the form and add or remove calls as you add or remove components to it, resulting
in less maintainable codebase.

**We can do better...**

Instead of that, this project uses the
[Publish-Subscribe Pattern](https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern),
by leveraging [AmplifyJs's core module](http://amplifyjs.com/api/pubsub/) to
achieve low coupling between each form and the instances of the components inside
it. This way, the form's controller stays lean and you do not need to update it
to keep it in sync with whatever components you've added to it. Here's an example
in a standard barebones form controller:

```javascript
//A loosely coupled form controller.
define({
	onBreakpointChange: function(form, width){
		amplify.publish("onBreakpointChange", form, width);
	},
	onNavigate: function(){
		this.view.onBreakpointChange = this.onBreakpointChange;
	}
});
```

Then, each component just listens for the `onBreakpointChange` event using
AmplifyJs as well:

```javascript
//A loosely coupled component controller.
constructor: function(baseConfig, layoutConfig, platformSpecificConfig) {
	//Then let's subscribe to the form's onBreakpointChange.
	amplify.subscribe(
		"onBreakpointChange", //topic
		this, //context
		this.onBreakpointChange, //callback
		1 //priority
	);
},
onBreakpointChange: function(form, width){
	// Here we adjust whatever widgets need to be resized,
	// repositioned, made visible/invisible or re-skinned
	// depending on the new screen width.
},
```

Components implemented like this can be seamlessly added to a form, without the
need to expose additional custom methods and without having to code additional
invocations in the form.
