Dubishere.Models.User = Backbone.Model.extend({
		url: 'http://dubishere.com/recruitment/demo.php',

		//We override the sync method to be compatible with the backend server
		sync: function (method, model, options) {

		 	var oldSync = Backbone.Model.prototype.sync;
        
        	_.extend(options, {
	            emulateJSON: true,
	            type:         'POST',
				dataType:     'json',
				url:			model.url,
				beforeSend: function(xhr, settings) {
	            	var arr = $.parseJSON(decodeURIComponent(settings.data).replace("model=", ""))
	                settings.data = $.param(arr);
	           	}
       		 });

        	oldSync.apply(this, arguments);
    	},
    	//Defaults params
		defaults : {
			first_name   : "Your first name",
			last_name    : "Your last name",
			position     : "Your current position",
			company      : "Your company",
			email        : "Your email",
			phone        : "Your phone",
			region       : 0,
			software     : "",
			times        : "",
			timezones    : "",
			dates        : "",
			notes        : "Write your comments"
		},
		//Validate Form
		validate : function(attrs, options) {
			var errors = [];
			//we load the message from the method getErrors to be available in variable
			var errorMessagesList = this.getErrors();

			//Validation first name
			if ( ( ! _.has(attrs,"first_name") ) || ( attrs.first_name === "" ) || ( attrs.first_name === this.defaults.first_name ) ){
				errors.push(['first_name', errorMessagesList.first_name.required]);
			}
			//Validation last name
			if ( ( !_.has(attrs,"last_name") ) || ( attrs.last_name==="" ) || ( attrs.last_name === this.defaults.last_name ) ){
				errors.push(['last_name', errorMessagesList.last_name.required]);
			}
			//Validation email
			if ( ( !_.has(attrs,"email") ) || ( attrs.email==="" ) || ( attrs.email === this.defaults.email ) ){
				errors.push(['email', errorMessagesList.email.required]);
			}else if ( !this.validateEmail(attrs.email) ){
				errors.push(['email', errorMessagesList.email.pattern]);
			}
			//validation radio button type software
			if ( ( !_.has(attrs,"software") ) || ( attrs.software==="" ) ){
				errors.push(['software', errorMessagesList.software.required]);
			}
			//Validation region
			if ( ( !_.has(attrs,"region") ) || ( attrs.region == this.defaults.region ) ){
				errors.push(['region', errorMessagesList.region.required]);
			}

			return errors.length > 0 ? errors : false;
		},

		// Method to load the message errors
		getErrors : function() {
			return {
				first_name : {
					required : 'You have to introduced your first name'
				},
				last_name : {
					required : 'You have to introduced your last name'
				},
				email : {
					required : 'You have to introduced an email',
					pattern  : 'Please, introduced a valid email'
				},
				software : {
					required : 'You have to introduce a software to be demostrated'
				},
				region : {
					required : 'You have to introduce a region'
				}
			}
		},

		//Method to validate emails
		validateEmail : function(email) { 
    		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    		return re.test(email);
		} 	
});
