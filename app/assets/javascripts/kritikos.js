window.Kritikos = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},

  initialize: function(data) {
    this.clock = new Kritikos.Models.GameClock(data.clock);
    
    new Kritikos.Routers.Game({ clock: this.clock });
    new Kritikos.Routers.Single();
    if (!Backbone.history.started) {
      Backbone.history.start();
      Backbone.history.started = true;
    }
  }
};

$(document).ready(function(){
  //Kritikos.init();
});