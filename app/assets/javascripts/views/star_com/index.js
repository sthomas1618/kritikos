Kritikos.Views.StarCom = Kritikos.Views.StarCom || {};

Kritikos.Views.StarCom.Index = Support.CompositeView.extend({
  tagName: "section",

  initialize: function() {
    _.bindAll(this, "render");
  },

  render: function () {
    this.renderLayout();
    this.renderTemplate();
    return this;
  },

  renderLayout: function () {
    var layout = new Kritikos.Views.Layout.Game({ model: this.model });
    this.renderChild(layout);
    this.$el.html(layout.el);
  },

  renderTemplate: function() {
    this.$el.append(JST['star_com/index']());
  }
});