Kritikos.Views.StarCom = Kritikos.Views.StarCom || {};

Kritikos.Views.StarCom.Index = Support.CompositeView.extend({
  tagName: "section",

  initialize: function() {
    _.bindAll(this, "render", "renderConstellations");
  },

  render: function() {
    //this.renderLayout();
    this.$el.html(JST['star_com/index']());

    if (this.collection) {
      this.renderConstellations();
    } else if (this.model) {
      this.renderSolarSystem();
    }
    return this;
  },

  renderLayout: function() {
    var layout = new Kritikos.Views.Layout.Game({ model: this.model });
    this.renderChild(layout);
    this.$el.append(layout.el);
  },

  renderConstellations: function() {
    var layout = new Kritikos.Views.Constellation.Index({ collection: this.collection });
    this.renderChild(layout);
    this.$el.children("#starcom_map").append(layout.el);
  },

  renderSolarSystem: function() {
    var layout = new Kritikos.Views.SolarSystem.Show({ model: this.model });
    this.renderChild(layout);
    this.$el.children("#starcom_map").append(layout.el);
  }
});