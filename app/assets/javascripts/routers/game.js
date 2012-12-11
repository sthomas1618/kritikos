Kritikos.Routers.Game = Support.SwappingRouter.extend({
  initialize: function(options) {
    this.el = $('.container.content');
    this.clocks = new Kritikos.Collections.GameClocks();
    new BackboneSync.RailsFayeSubscriber(this.clocks, { channel: 'game_clocks'  });
    this.clocks.reset(options.clock);
    this.clock = this.clocks.models[0];

  },

  routes: {
    "": "index",
    "starcom": "starcom",
    "starcom/solar_systems/:id": "showSystem",
    "starcom/planets/:id": "showPlanet"
  },

  index: function() {
    var view = new Kritikos.Views.SysCom.Index({ model: this.clock });
    this.swap(view);
  },

  starcom: function() {
    var stellas = new Kritikos.Collections.Constellations();
    var game_router = this;
    var clock = this.clock;
    stellas.fetch({
      success: function() {
        var view = new Kritikos.Views.StarCom.Index({
          type: "Constellations",
          collection: stellas,
          clock: clock });
        game_router.swap(view);
      }
    });
  },

  showSystem: function(id) {
    var sol = Kritikos.Models.SolarSystem.findOrCreate(id);
    if (!sol) {
      sol = new Kritikos.Models.SolarSystem({id: id});
    }
    sol.fetch();
    var game_router = this;
    var clock = this.clock;
    sol.fetch({
      success: function() {
        var view = new Kritikos.Views.StarCom.Index({
          type: "SolarSystem",
          model: sol,
          clock: clock });
        game_router.swap(view);
      }
    });
  },

  showPlanet: function(id) {
    var planet = Kritikos.Models.Planet.findOrCreate(id);
    if (!planet) {
      planet = new Kritikos.Models.Planet({id: id});
    }
    planet.fetch();
    var game_router = this;
    var clock = this.clock;
    planet.fetch({
      success: function() {
        var view = new Kritikos.Views.StarCom.Index({
          type: "Planet",
          model: planet,
          clock: clock });
        game_router.swap(view);
      }
    });
  }
});
