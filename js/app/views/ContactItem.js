define(function (require) {

    "use strict";

    var _                   = require('underscore'),
        Backbone            = require('backbone'),
        CountryCollection          = require('app/collections/CountryCollection'),
        tpl                 = require('text!tpl/ContactItem.html'),
        template = _.template(tpl),
        that;

    return Backbone.View.extend({

        initialize: function (options) {
            that = this;
            
            //get a list of countries and their codes
            this.countries = new CountryCollection;

            this.countries.fetch({
                success: function (collection) {                   
                    that.render();                  
                }
            });
            
                

        },
        
        events: {
            "click #save"   : 'saveContact'
        },
        
        /*
         * Set attributes, validate and save model
         */
        saveContact:function () {
    
            this.model.set({
                name:$('#name').val(),
                phone:$('#phone').val(),
                email:$('#email').val(),
                phone_country_code:$('#phone_country_code').val(),
            });
            
            //remove error divs if there are any
            var errors = $('.form-errors');
            errors.remove();

            if (!this.model.isValid()) {  
                //isValid() calls validate() function in model         
                this.processErrors(this.model.validationError);
            }
            else{
                
                this.model.save([],{
                    success: function(model){
                        //if successful, go back to contact list
                        window.location.hash = "";

                    },
                    error: function(){

                        alert('There was a problem saving the record, please try again');

                    }
                });
                
            }

        },
                
        /*
         * Create error messages and display after problematic input
         */             
        processErrors: function(response) {

            for (var key in response) {
                $('#'+response[key].input_tag).after('<div class="form-errors">'+response[key].error+'</div>'); 

            }
        },

        render: function () {
   
            //render the template with countries and the model (may be empty if new contact)
            this.$el.html(template({model:this.model.toJSON(), countries:this.countries.toJSON()}));       
            $('#name').focus();
            
            return this;
        },
                
  

    });

});