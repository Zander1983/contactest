define(function() {
  var ContactModel = Backbone.Model.extend({

  	urlRoot: 'http://hidden-oasis-1864.herokuapp.com/contacts',
  	
  	defaults : {
	   'name'  : null
  	}
  });

  return ContactModel;
});