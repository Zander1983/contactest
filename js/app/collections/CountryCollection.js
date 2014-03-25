define(function (require) {

    "use strict";

    var Backbone            = require('backbone'),
        
        Country = Backbone.Model.extend({  

        }),

        
        CountryCollection = Backbone.Collection.extend({

            model: Country,

            url: 'http://restcountries.eu/rest/v1/all'


            });


    return {
        Country: Country,
        CountryCollection: CountryCollection
    };

});