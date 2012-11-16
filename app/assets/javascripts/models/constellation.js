Kritikos.Models.Constellation = Backbone.RelationalModel.extend({
  initialize: function() {
    this.get('solar_systems').url = _.bind(function(){
          return this.url() + "/solar_systems";
      }, this);
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