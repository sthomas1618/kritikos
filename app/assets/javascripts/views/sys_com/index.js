Kritikos.Views.SysCom = Kritikos.Views.SysCom || {};

Kritikos.Views.SysCom.Index = Support.CompositeView.extend({
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
    this.$el.append(JST['sys_com/index']());
  }
});