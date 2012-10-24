Kritikos.Views.GameClock = Kritikos.Views.GameClock || {}

Kritikos.Views.GameClock.Show = Support.CompositeView.extend({
  initialize: function() {
    _.bindAll(this, "render");
    this.options.model.bind('change', this.render);
    //this.bindTo(this.clock, "add", this.render);
  },

  render: function () {
    this.renderTemplate();
    return this;
  },

  renderTemplate: function() {
    this.$el.html(JST['game_clock/show']({ clock: this.model.toJSON() }));
  },
});