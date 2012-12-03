Kritikos.Views.SolarSystem = Kritikos.Views.SolarSystem || {};

Kritikos.Views.SolarSystem.Show = Support.CompositeView.extend({
  tagName: "div",
  id: "sol_map",
  className: "sol",

  initialize: function() {
    _.bindAll(this, "render");
  },

  render: function() {
    
    return this;
  }
  
});