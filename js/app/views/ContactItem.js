define(function (require) {

    "use strict";

    var _                   = require('underscore'),
        Backbone            = require('backbone'),
        collection          = require('app/collections/CountryCollection'),
        tpl                 = require('text!tpl/ContactItem.html'),
        template = _.template(tpl);

    return Backbone.View.extend({

        initialize: function (options) {
            
            
            var countries = new collection.CountryCollection;

            countries.fetch({
                success: function (countriescollection) {
                    
                    console.log('countriescollection.length is ');
                    console.log(countriescollection.length);
                    
                },
                error:   function(model, xhr, options){

                    console.log('error fetching');

                },

            });
            
            this.render();     

        },
        
        events: {
            "click #save"   : 'saveContact'
        },
        
        
        saveContact:function () {
    
            console.log('in saveContact');
    
            this.model.set({
                name:$('#name').val(),
                phone:$('#phone').val(),
                email:$('#email').val(),
            });
            
            console.log('isValid is ');
            console.log(this.model.isValid());
            
            var errors = $('.form-errors');
            errors.remove();

            if (!this.model.isValid()) {
              this.processErrors(this.model.validationError);
            }
            
            console.log('saving attrs.....');
            //console.log(attrs);
            
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
            
            console.log('after the save');
            
            
            if (this.model.isNew()) {
                
                console.log('its new');
   
                
            } else {
                
                console.log('not new, so update/edit');
            }
            
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
            this.$el.html(template({model:this.model.toJSON()}));
            return this;
        },
                
  

    });

});