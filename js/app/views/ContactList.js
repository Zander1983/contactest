define(function (require) {

    "use strict";

    var _                   = require('underscore'),
        Backbone            = require('backbone'),
        tpl                 = require('text!tpl/ContactList.html'),
        template            = _.template(tpl),
        empty_tpl           = require('text!tpl/EmptyList.html'),
        empty_template = _.template(empty_tpl);

    return Backbone.View.extend({

        initialize: function () {
         
            this.render();
            this.collection.on("reset", this.render, this);

        },

        render: function () {
   
            //If colelction is not empty, load ContactList template
   
            if(this.collection.length>0){
                this.$el.html(template({items:this.collection.toJSON()}));
            }
            else{
                
                this.$el.html(empty_template());
            }
            
            return this;
        },
 

    });

});