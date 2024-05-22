import config from './../../config.js';
import Dialog_class from './../../libs/popup.js';

class Help_about_class {

	constructor() {
		this.POP = new Dialog_class();
	}

	//about
	about() {
		var email = 'iammo4r@gmail.com';	
		
		var settings = {
			title: 'About',
			params: [
				{title: "", html: '<img style="width:64px;" class="about-logo" alt="" src="images/logo-colors.png" />'},
				{title: "Name:", html: '<span class="about-name">Webster</span>'},
				{title: "Version:", value: VERSION},
				{title: "Description:", value: "Online image editor."},
				{title: "Authors:", value: 'rnosach yshumnyi'},
				{title: "Email:", html: '<a href="mailto:' + email + '">' + email + '</a>'},
				{title: "GitHub:", html: '<a href="https://github.com/rnosach/webster.git">https://github.com/rnosach/webster.git</a>'},
				{title: "Website:", html: '<a href="https://github.com/rnosach/webster/">https://github.com/rnosach/webster/</a>'},
			],
		};
		this.POP.show(settings);
	}

}

export default Help_about_class;
