Kritikos.Views.StarCom = Kritikos.Views.StarCom || {};

Kritikos.Views.StarCom.Index = Support.CompositeView.extend({
  tagName: "section",

  initialize: function() {
    _.bindAll(this, "render", "renderConstellations", "renderClock");
    this.clock = this.options.clock;
  },

  render: function() {
    //this.renderLayout();
    this.$el.html(JST['star_com/index']());
    this.renderClock();
    if (this.collection) {
      this.renderConstellations();
    } else if (this.model) {
      this.renderSolarSystem();
    }
    return this;
  },

  renderClock: function() {
    var layout = new Kritikos.Views.GameClock.Show({ model: this.clock });
    this.renderChild(layout);
    this.$el.children("#clock_holder").append(layout.el);
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
  },

  renderPlanet: function() {
    var layout = new Kritikos.Views.Planet.Show({ model: this.model });
    this.renderChild(layout);
    this.$el.children("#starcom_map").append(layout.el);
  }
});