window.Kritikos = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  // init: function() {
  //   alert('Hello from Backbone!');
  // },

  initialize: function(data) {
    this.clock = new Kritikos.Models.GameClock(data.clock);

    new Kritikos.Routers.SysCom({ clock: this.clock });
    if (!Backbone.history.started) {
      Backbone.history.start();
      Backbone.history.started = true;
    }
  }
};

$(document).ready(function(){
  //Kritikos.init();
});