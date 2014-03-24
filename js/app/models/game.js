define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        Backbone            = require('backbone'),
        

        Game = Backbone.Model.extend({

            urlRoot: "game",
            
            initialize: function () {
                //this.matchs = new GameCollection();
                //this.matchs.url = this.url + "/" + this.team_id;
            }  

        }),

        GameCollection = Backbone.Collection.extend({

            model: Game,
            url: 'games',
            initialize: function (models, options) {
                this.url = this.url + "/" + options.sport_id;
            }  


        });

    return {
        Game: Game,
        GameCollection: GameCollection
    };

});