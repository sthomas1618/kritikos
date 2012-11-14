Kritikos.Models.Constellation = Backbone.RelationalModel.extend({
  initialize: function() {
    
  },
  urlRoot: "/constellations",
  relations: [{
        type: Backbone.HasMany,
        key: "solar_systems",
        relatedModel: "Kritikos.Models.SolarSystem",
        collectionType: "Kritikos.Collections.SolarSystems",
        reverseRelation: {
            key: 'constellation',
            includeInJSON: 'id'
        }
  }]
});