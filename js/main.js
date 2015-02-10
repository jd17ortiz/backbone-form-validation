$(document).ready(function(){
	
	window.appDubishere.model = new Dubishere.Models.User();
	window.appDubishere.view = new Dubishere.Views.User({model : window.appDubishere.model});
	appDubishere.view.render();
	appDubishere.view.render().$el.appendTo('.form-container');

});

