define(function (require) {

    "use strict";

    var _                   = require('underscore'),
        Backbone            = require('backbone'),
        tpl                 = require('text!tpl/ContactItem.html'),
        template = _.template(tpl);

    return Backbone.View.extend({

        initialize: function (options) {
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
            
            if (!this.model.isValid()) {
              console.log('erros are ');
              console.log(this.model.validationError);
              this.processErrors(this.model.validationError);
              
            }
            
            /*
            if (this.model.isNew()) {
                var self = this;
                app.wineList.create(this.model, {
                    success:function () {
                        app.navigate('wines/' + self.model.id, false);
                    }
                });
            } else {
                this.model.save();
            }*/

            return false;
        },
                
        processErrors: function(response) {
            var errors = $('#errors');
            for (var key in response) {
                if (response.hasOwnProperty(key)) {
                    var field = response[key];
               
                    console.log('response is ');
                    console.log(response);
               
                    //errors.append();
               
                    //$('#'+field.name);
                
                    
                    //pattern="not-fail"
                }
            }
        },

        render: function () {
            this.$el.html(template({model:this.model.attributes}));
            return this;
        },
                
  

    });

});