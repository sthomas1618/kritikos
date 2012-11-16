Kritikos.Collections.SolarSystems = Backbone.Collection.extend({
	initialize: function(models, options) {
    this.constellation_id = options.constellation_id;
  },
  model: Kritikos.Models.SolarSystem,
  url: function() {
    return '/constellations/' + this.constellation_id + '/solar_systems';
  }
});