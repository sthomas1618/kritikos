Kritikos.Collections.Planets = Backbone.Collection.extend({
  initialize: function(models, options) {
    this.solar_system_id = options.constellation_id;
  },
  model: Kritikos.Models.Planet,
  url: function() {
    return '/solar_systems/' + this.solar_system_id + '/planets';
  }
});