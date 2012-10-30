Kritikos.Views.Layout = Kritikos.Views.Layout || {};

Kritikos.Views.Layout.Sidebar = Support.CompositeView.extend({
  tagName: "aside",
  id: "sidebar",
  className: "span3",

  initialize: function() {
    _.bindAll(this, "render");
  },

  render: function () {
    this.renderClock();
    return this;
  },

  renderClock: function() {
    var clock = new Kritikos.Views.GameClock.Show({ model: this.model });
    //this.appendChild(clock);
    this.renderChild(clock);
    this.$el.append(clock.el);
  }
});