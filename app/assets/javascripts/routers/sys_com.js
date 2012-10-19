Kritikos.Routers.SysCom = Support.SwappingRouter.extend({
  initialize: function(options) {
    this.el = $('#sys_content');
    this.clock = options.clock;
  },

  routes: {
    "": "index"
  },

  index: function() {
    console.log("Routing Index")
    console.log(this.clock)
    var view = new Kritikos.Views.GameClock.Show({ model: this.clock });
    this.swap(view);
  },
});
