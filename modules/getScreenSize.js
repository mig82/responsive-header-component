var getScreenSize = function(breakpoints, width){
	var index = breakpoints.indexOf(width);
	var size;
	switch(index){
		case 0:
			size = "S";
			break;
		case 1:
			size = "M";
			break;
		case 2:
			size = "L";
			break;
		case 3:
			size = "XL";
			break;
		default:
			throw new Error("Unknown screen resolution");
	}
	kony.print(`Screen size: ${size}`);
	return size;
};