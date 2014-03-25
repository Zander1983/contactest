define(function (require) {

    "use strict";

    var $           = require('jquery'),
        Backbone    = require('backbone'),
        PageSlider  = require('app/utils/pageslider'),
        slider = new PageSlider($('body')),
        contacts;

    return Backbone.Router.extend({

        routes: {
            "": "getContacts",
            "contact-item/new": "newContactItem",
            "contact-item/:id": "getContactItem",
        },

        
        initialize: function() {

        },
                
        getContacts: function(){

            require(["app/collections/ContactCollection", "app/views/ContactList"], function (ContactCollection, ContactList) {


                    contacts = new ContactCollection;

                    contacts.fetch({
                        success: function (collection) {          
                            slider.slidePage(new ContactList({collection: collection}).$el);                                          
                        },
                        error:   function(model, xhr, options){
                           alert('There was an error getting the list of conatacts. Please try again');
                        },

                    });
            });
        },
        
        
        
        getContactItem: function (id) {
           
            require(["app/collections/ContactCollection", "app/views/ContactItem"], function (ContactCollection, ContactItem) {
                
                if(typeof(contacts)!=='undefined' && contacts!==null){
                    //should go in here, and get the specific model and pass to the view
                    slider.slidePage(new ContactItem({model: contacts.get(id)}).$el);
                }
                else{
                    //if in here, user has refreshed the contact-item page so contacts collection
                    //is now empty. Get it again and pass specific model to the view
                    contacts = new ContactCollection;

                    contacts.fetch({
                        success: function (collection) {
           
                            slider.slidePage(new ContactItem({model: collection.get(id)}).$el);                                       

                        },
                        error:   function(model, xhr, options){                           
                            alert('There was an error getting the list of conatacts. Please try again');
                        },

                    });
                    
                }
                 
                                 
            });
        },


        newContactItem:function () {   
            
            require(["app/models/ContactModel", "app/views/ContactItem"], function (ContactModel, ContactItem) {

                 slider.slidePage(new ContactItem({model: new ContactModel()}).$el);
                                 
            });
        },


    });

});