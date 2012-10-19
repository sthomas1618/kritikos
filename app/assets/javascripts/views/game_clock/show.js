Kritikos.Views.GameClock = Kritikos.Views.GameClock || {}

Kritikos.Views.GameClock.Show = Support.CompositeView.extend({
  initialize: function() {
    console.log("init view");
    console.log(this);
    //console.log(this.model);
    _.bindAll(this, "render");
    //this.bindTo(this.clock, "add", this.render);
  },

  render: function () {
    this.renderTemplate();
    return this;
  },

  renderTemplate: function() {
    console.log("render view");
    console.log(this.model)

    this.$el.html(JST['game_clock/show']({ clock: this.model.toJSON() }));
  },
});