define(function (require) {

    "use strict";

    var Backbone            = require('backbone'),
        

        
        CountryCollection = Backbone.Collection.extend({

            url: 'http://restcountries.eu/rest/v1/all'


            });


    return {
        CountryCollection: CountryCollection
    };

});