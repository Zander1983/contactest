define(function (require) {

    "use strict";

    var _                   = require('underscore'),
        Backbone            = require('backbone'),
        collection          = require('app/collections/CountryCollection'),
        tpl                 = require('text!tpl/ContactItem.html'),
        template = _.template(tpl),
        that;

    return Backbone.View.extend({

        initialize: function (options) {
            that = this;
            
            this.countries = new collection.CountryCollection;

            this.countries.fetch({
                success: function (countriescollection) {
                    
                    that.render(); 
                    
                },
                error:   function(model, xhr, options){

                    console.log('error fetching');

                },

            });
            
                

        },
        
        events: {
            "click #save"   : 'saveContact'
        },
        
        
        saveContact:function () {
    
            this.model.set({
                name:$('#name').val(),
                phone:$('#phone').val(),
                email:$('#email').val(),
                phone_country_code:$('#phone_country_code').val(),
            });
            
            
            var errors = $('.form-errors');
            errors.remove();

            if (!this.model.isValid()) {              
              this.processErrors(this.model.validationError);
            }
            else{
                
                this.model.save([],{
                    success: function(model){

                        console.log('successfully saved and model is ');
                        console.log(model);

                        window.location.hash = "";

                    },
                    error: function(){

                        console.log('there was an error');

                    }
                });
                
            }

            //console.log(attrs);
            

            

            
            /*
            that.league.save(details, {
                user_id:that.loginstatus.get('user_id'),
                api_key:that.loginstatus.get('api_key'),
                success: function(model){
                console.log('in league save success');
                console.log('model is ');
                console.log(model);
                window.location.href = "#my-leagues/"+that.loginstatus.get('user_id');
            },
                error: function(){
                alert('Could not save league');
                }
            });*/

            return false;
        },
                
        processErrors: function(response) {

            for (var key in response) {
                
                $('#'+response[key].input_tag).after('<div class="form-errors">'+response[key].error+'</div>');
        

            }
        },

        render: function () {
    
            this.$el.html(template({model:this.model.toJSON(), countries:this.countries.toJSON()}));
            return this;
        },
                
  

    });

});