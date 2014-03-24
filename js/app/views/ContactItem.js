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
            errors.empty();
            for (var key in response) {
        
                console.log('response[key] error is ');
                console.log(response[key].error);
                
                errors.append(response[key].error+"<br />");
        

            }
        },

        render: function () {
            this.$el.html(template({model:this.model.attributes}));
            return this;
        },
                
  

    });

});