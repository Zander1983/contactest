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
            
            var errors = $('.form-errors');
            errors.remove();

            if (!this.model.isValid()) {
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

            for (var key in response) {
                
                $('#'+response[key].input_tag).after('<div class="form-errors">'+response[key].error+'</div>');
        

            }
        },

        render: function () {
            this.$el.html(template({model:this.model.attributes}));
            return this;
        },
                
  

    });

});