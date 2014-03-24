define(function() {
  var ContactModel = Backbone.Model.extend({

  	urlRoot: 'http://hidden-oasis-1864.herokuapp.com/contacts',
  	
  	defaults : {
	   'name'  : null,
           'email': '',
           'phone': '',
  	},
        
        validate: function(attrs) {

            var email_filter    = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            var errors = [];
            
            if(attrs['name'].length<1){
                errors.push({name: 'name', error: 'Please enter your First Name'});
            }
            
            if(attrs['phone']==='' && attrs['email']===''){
                //messages['name'] = 'You must include a phone number or email';
                errors.push({name: 'phone', error: 'You must include a phone number or email'});
            }
            
            if (!email_filter.test(attrs.email)){         
                errors.push({name: 'email', error: 'Please enter a valid email address'});
            }
            

            if(errors.length > 0){
               return errors;
            }
            
        }
  });

  return ContactModel;
});