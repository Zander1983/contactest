define(function() {
  var ContactModel = Backbone.Model.extend({

  	urlRoot: 'http://hidden-oasis-1864.herokuapp.com/contacts',
  	
  	defaults : {
	   'name'  : null,
           'email': '',
           'phone': '',
  	},
        
        validate: function(attrs) {

            var name_filter = /[a-zA-Z'.,-\s]+/;
            var email_filter    = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            var errors = [];
            
            if(attrs['name'].length<1){
                errors.push({input_tag: 'name', error: 'Please enter your First Name'});
            }
            
            if(attrs['phone']==='' && attrs['email']===''){
                //messages['name'] = 'You must include a phone number or email';
                errors.push({input_tag: 'phone', error: 'You must include a phone number or email'});
            }
            
            if(attrs['email']!==''){
                if (!email_filter.test(attrs.email)){         
                    errors.push({input_tag: 'email', error: 'Please enter a valid email address'});
                }
            }
            

            if(errors.length > 0){
               return errors;
            }
            
        }
  });

  return ContactModel;
});