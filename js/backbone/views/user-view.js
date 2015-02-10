Dubishere.Views.User = Backbone.View.extend({
	tagName: 'form',
	className : 'form',
	initialize : function() {
		//We load the template from the html file
		this.template = _.template( $('#user-form-template').html() );
	},
	render : function() {
		var html = this.template();
		this.$el.html( html);
		return this;
	},
	//Event handler for the page
	events : {
		'click #signUpButton' : 'singUpUser',
		'click .add-icon' : 'addNewTimeForDemo',
		'click .another-form' : 'showForm'
	},
	//Method to manage the model and validation
	singUpUser : function() {
		var dataModel = this.getDataModel(this.getFormData());
		var self = this;

		this.model.set(dataModel);
		this.model.save(null, {
			success: function (response) {
				self.showMessageStatus("Thank you We've got your details and will be back in touch with you. <strong><a href=\"#\" class=\"another-form\">Do you wanna send another form?</a></strong>", "success");
        		self.$el.find('.row-container').fadeOut();
        	},
            error: function (model, errors) {
            	self.showMessageStatus("Sorry, but we haven't sent your form. Please try newly in a few minutes", "warning");
            }
        });
        
        if(this.model.isValid()){
        	this.resetErrors();
        }else{
        	this.showErrors();
        }	
	},

	// Method to get the data from the form and return to the singup method
	getFormData: function() { 

		var timeDemoArrays = this.getTimeforDemo();
		var finalDataArray = this.$el.serializeArray();

		this.$el.find('.times, .timezones, .dates').removeAttr('disabled');

		_.map(timeDemoArrays, function (value, key) {
			finalDataArray[finalDataArray.length] = {
				name : key,
				value : value
			}
		});
		

    	return finalDataArray;  			
	},

	// Method to format the three select to have the necessary array data
	getTimeforDemo : function() {
		var timesArray = [], timezonesArray = [], dates = [];
		var demoTimes = {};

		this.$el.find('.times, .timezones, .dates').attr('disabled', 'disabled');

		this.$el.find('.row-select').find('.times, .timezones, .dates').each(function(){
			if ($(this).hasClass('times')){
				timesArray.push( $(this).val() );
			}else if($(this).hasClass('timezones')){
				timezonesArray.push( $(this).val() );
			}else{
				dates.push( $(this).val() );
			}			
		});

		demoTimes['times']     = timesArray;
		demoTimes['timezones'] = timezonesArray;
		demoTimes['dates']     = dates;

		return demoTimes;
	},
	// Method to create the necessary key value object format
	getDataModel : function(dataModelArray) {
		var dataArray = {};
		$.map(dataModelArray, function(data, index){
			dataArray[data['name']] = data['value'];
    	});
    	return dataArray;
	},

	//Method to show errors in the form
	showErrors : function() {
		var self = this;
		this.resetErrors();
		if(this.model.validationError !==null){
			_.each(this.model.validationError, function (error, index) {
				var rowError = self.$el.find('input[name="'+error[0]+'"], select[name="'+error[0]+'"]').parents('.row');	
				rowError.addClass('has-error');
				rowError.find('.error-msg').html(error[1]);
				rowError.find('.error-msg').slideDown();
				if(index ===0){
					self.$el.find('input[name="'+error[0]+'"]').focus();	
				}
			}, this);
		}
	},

	//Method to show the form
	showForm : function(event) {
		event.preventDefault();
		this.$el.find('.row-container').fadeIn();
		$(event.target).parents('.status-app').slideUp();
	},

	//Method to show the message status
	showMessageStatus : function(message, status) {
		this.$el.find('.status-app p').html(message);
        this.$el.find('.status-app').addClass(status).slideDown();
	},

	//Method to reset the initial status of the form
	resetErrors : function() {		
		this.$el.find('.has-error .error-msg').slideUp();
		this.$el.find('.has-error').removeClass('has-error');
		this.$el.find('.status-app').slideUp();
	},

	//Method to create a new list of time, timezone and date
	addNewTimeForDemo : function (event) {
		//Generate a new list
		event.preventDefault();
		$(event.target).prev().after($(event.target).prev().clone());
	}

});
