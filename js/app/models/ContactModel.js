define(function() {
  
    var that,
    $           = require('jquery'),
  
    
    ContactModel = Backbone.Model.extend({

  	urlRoot: 'http://hidden-oasis-1864.herokuapp.com/contacts',
  	
  	defaults : {
	   'name'  : null,
           'email': '',
           'phone': '',
           'phone_country_code': ''
  	},
        
        initialize: function(){
            that = this;
        },
        
        /*
         * Validate inputs:
         * 1/ Make sure name has at least one character
         * 2/ Make sure email or phone number entered
         */
        
        validate: function(attrs) {

            var email_filter    = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            that.errors = [];
            
            if(attrs['name'].length<1){
                that.errors.push({input_tag: 'name', error: 'Please enter your First Name'});
            }
            
            if(attrs['phone']==='' && attrs['email']===''){
                that.errors.push({input_tag: 'phone', error: 'You must include a phone number or email'});
            }
            
            //If there is something in email inout, validate its a proper email
            if(attrs['email']!==''){
                if (!email_filter.test(attrs.email)){         
                    that.errors.push({input_tag: 'email', error: 'Please enter a valid email address'});
                }
            }
            
           
            if(attrs['phone'].length>0 || attrs['phone_country_code'].length>0){
                //if there is a phone number or country code entered, validate them
                //use jquery when() function to wait for ajax to execute before moving on. Otherwise, 
                //validate function would return no error and isValid() would succeed
                
                
                if(attrs['phone'].length===0 || attrs['phone_country_code'].length===0){
                        //If in here, user has only filled out one of the 2 inouts required for
                        //a proper phone contact. Tell them to fill out both
                            that.errors.push({input_tag: 'phone', error: 'You need to enter both country and phone number'});
                }
                else{
                    //check the phone number agsinst the country code
                    $.when(this.checkPhoneNumber(attrs)).always(function(response){

                        if(response.valid!==true){
                            that.errors.push({input_tag: 'phone', error: 'Please enter a valid country code and phone number'});
                        }   

                    });
                }
                
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
        
            /*
             * Validate phone number against country code
             */
            checkPhoneNumber: function(attrs){

                return $.ajax({
                    async:false,
                    url: "http://hidden-oasis-1864.herokuapp.com/check-phone-number/"+attrs['phone_country_code']+"/"+attrs['phone'],
 
                });    

        },
        

        
  });

  return ContactModel;
});