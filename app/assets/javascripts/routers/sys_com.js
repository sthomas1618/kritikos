Kritikos.Routers.SysCom = Support.SwappingRouter.extend({
  initialize: function(options) {
    this.el = $('#sys_content');
    this.clocks = new Kritikos.Collections.GameClocks();
    new BackboneSync.RailsFayeSubscriber(this.clocks, { channel: 'game_clocks'  });
    this.clocks.reset(options.clock);
    this.clock = this.clocks.models[0];
  },

  routes: {
    "": "index"
  },

  index: function() {
    var view = new Kritikos.Views.GameClock.Show({ model: this.clock });
    this.swap(view);
  },
});
