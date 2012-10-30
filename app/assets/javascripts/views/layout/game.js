Kritikos.Views.Layout = Kritikos.Views.Layout || {};

Kritikos.Views.Layout.Game = Support.CompositeView.extend({

  initialize: function() {
    _.bindAll(this, "render");
  },

  render: function () {
    this.renderSideBar();
    return this;
  },

  renderSideBar: function() {
    var sidebar = new Kritikos.Views.Layout.Sidebar({ model: this.model });
    this.renderChild(sidebar);
    this.$el.append(sidebar.el);
  }
});