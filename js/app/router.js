define(function (require) {

    "use strict";

    var $           = require('jquery'),
        Backbone    = require('backbone'),
        PageSlider  = require('app/utils/pageslider'),
        slider = new PageSlider($('body')),
        contact,
        that;



    return Backbone.Router.extend({

        routes: {
            "": "getContacts",
            "contact-item/:id": "getContactItem",
           
        },
        

        
        initialize: function() {
                
            that =  this;
            
     
            $.ajaxPrefilter( function( options, originalOptions, jqXHR ) {
             
           });


          //  $.ajaxStart(function(){ console.log('in the ajaxStart'); });

           
            // Tell jQuery to watch for any 401 or 403 errors and handle them appropriately
            $.ajaxSetup({
     
            });
        },
                
        getContacts: function(){

            require(["app/collections/ContactCollection", "app/views/ContactList"], function (collections, ContactList) {

                
              

                    contact = new collections.ContactCollection;

                    contact.fetch({
                        update:false,
                        success: function (collection) {
           
                            slider.slidePage(new ContactList({collection: collection}).$el);                         
                      

                        },
                        error:   function(model, xhr, options){
                           

                        },

                    });
            });
        },
        
        
        
        getContactItem: function (id) {
           
            require(["app/views/ContactItem"], function (ContactItem) {

                 slider.slidePage(new ContactItem({model: contact.get(id)}).$el);
                                 
            });
        },
                
                
        wineDetails:function (id) {
            this.before(function () {
                var wine = app.wineList.get(id);
                app.showView('#content', new WineView({model:wine}));
            });
        },

        newContactItem:function () {
            this.before(function () {
                app.showView('#content', new WineView({model:new Wine()}));
            });
            
            
            require(["app/models/ContactModel", "app/views/ContactItem"], function (model, ContactItem) {

                 slider.slidePage(new ContactItem({model: new model.ContactModel()}).$el);
                                 
            });
        },


    });

});