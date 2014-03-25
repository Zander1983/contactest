define(function() {
  
    var that,
    $           = require('jquery'),
  
    
    ContactModel = Backbone.Model.extend({

  	urlRoot: 'http://hidden-oasis-1864.herokuapp.com/contacts',
  	
  	defaults : {
	   'name'  : null,
           'email': '',
           'phone': '',
           'phone_phone_country_code_code': ''
  	},
        
        initialize: function(){
            that = this;
        },
        
        validate: function(attrs) {

            var name_filter = /[a-zA-Z'.,-\s]+/;
            var email_filter    = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            that.errors = [];
            
            if(attrs['name'].length<1){
                that.errors.push({input_tag: 'name', error: 'Please enter your First Name'});
            }
            
            if(attrs['phone']==='' && attrs['email']===''){
                //messages['name'] = 'You must include a phone number or email';
                that.errors.push({input_tag: 'phone', error: 'You must include a phone number or email'});
            }
            
            if(attrs['email']!==''){
                if (!email_filter.test(attrs.email)){         
                    that.errors.push({input_tag: 'email', error: 'Please enter a valid email address'});
                }
            }
            
           
            if(attrs['phone'].length>0){
                //validate

                $.when(this.checkPhoneNumber(attrs)).always(function(response){

                    if(response.valid!==true){
                        that.errors.push({input_tag: 'phone', error: 'Please enter a valid country code and phone number'});
                    }   

                });
                
                if(that.errors.length > 0){     
                    return that.errors;
                }
                
            }
            else{
  
                if(that.errors.length > 0){
                   return that.errors;
                }
            }
            
        },
        
        
            checkPhoneNumber: function(attrs){

                return $.ajax({
                    async:false,
                    url: "http://hidden-oasis-1864.herokuapp.com/check-phone-number/"+attrs['phone_country_code']+"/"+attrs['phone'],
 
                });    

        },
        

        
  });

  return ContactModel;
});