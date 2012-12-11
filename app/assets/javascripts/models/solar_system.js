Kritikos.Models.SolarSystem = Backbone.RelationalModel.extend({
  initialize: function() {
    this.get('planets').url = _.bind(function(){
          return this.url() + "/planets";
      }, this);
  },
  urlRoot: "/solar_systems",
  relations: [{
    type: Backbone.HasMany,
    key: "planets",
    relatedModel: "Kritikos.Models.Planet",
    collectionType: "Kritikos.Collections.Planets",
    reverseRelation: {
      key: 'solar_system',
      includeInJSON: 'id'
    }
  },
  {
    type: Backbone.HasOne,
    key: "user",
    relatedModel: "Kritikos.Models.User",
    collectionType: "Kritikos.Collections.Users",
    reverseRelation: {
      type: Backbone.HasOne,
      key: 'solar_system',
      includeInJSON: 'id'
    }
  }]
});