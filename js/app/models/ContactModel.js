define(function() {
  var ContactModel = Backbone.Model.extend({

  	urlRoot: 'http://hidden-oasis-1864.herokuapp.com/contacts',
  	
  	defaults : {
	   'name'  : null,
           'email': '',
           'phone': '',
  	},
        
        validate: function(attrs) {

            var messages = [];
            
            console.log('name is ');
            console.log(attrs['name']);
            
            console.log('length for name is ');
            console.log(attrs['name'].length);
            
            if(attrs['name'].length<1){
                messages['name'] = 'You must include a name';
            }
            

            if(_.size(messages) > 0){
                return {isValid: false, messages: messages};
            }
        }
  });

  return ContactModel;
});