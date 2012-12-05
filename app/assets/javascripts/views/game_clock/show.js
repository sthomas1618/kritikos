Kritikos.Views.GameClock = Kritikos.Views.GameClock || {};

Kritikos.Views.GameClock.Show = Support.CompositeView.extend({
  tagName: "section",
  id: "clock",

  initialize: function() {
    _.bindAll(this, "render", "renderTemplate");
    this.options.model.bind('change', this.render);
    //this.bindTo(this.clock, "add", this.render);
  },

  render: function () {
    this.renderTemplate();
    return this;
  },

  renderTemplate: function() {
    this.$el.html(JST['game_clock/show']({ clock: this.model.toJSON() }));
  }
});