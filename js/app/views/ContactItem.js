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
            
            this.model.isValid();
            
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

        render: function () {
            this.$el.html(template({model:this.model.attributes}));
            return this;
        },
                
  

    });

});