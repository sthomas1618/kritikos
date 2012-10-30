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
    "starcom": "starcom"
  },

  index: function() {
    var view = new Kritikos.Views.SysCom.Index({ model: this.clock });
    this.swap(view);
  },

  starcom: function() {
    var view = new Kritikos.Views.StarCom.Index({ model: this.clock });
    this.swap(view);
  }
});
