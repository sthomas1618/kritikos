Kritikos.Views.SolarSystem = Kritikos.Views.SolarSystem || {};

Kritikos.Views.SolarSystem.Show = Support.CompositeView.extend({
  tagName: "div",
  id: "sol_map",
  className: "sol",

  initialize: function() {
    _.bindAll(this, "render", "drawSol", "generateStars", "zoom", "swapToPlanet");
    this.width       = 940;
    this.height      = 800;
    this.x = d3.scale.linear()
      .domain([-0.5, 0.5])
      .range([0, this.width]);
    this.y = d3.scale.linear()
      .domain([-0.5875, 0.5875])
      .range([this.height, 0]);
  },

  zoom: function(d) {
    this.vis.attr("transform", "translate(" + d3.event.translate + ")" +
                          " scale(" + d3.event.scale + ")");
  },

  swapToPlanet: function(d) {
    this.parent.model = d;
    this.leave();
    //Backbone.history.navigate("#starcom/solar_system//" + d.id, {replace: true});
    this.parent.renderPlanet();
  },

  randomNumber: function (min, max, dec) {
    var num = Math.random() * (max - min) + min;
    return Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
  },

  generateStars: function(number) {
    var stars = [];
    var max = 0.5;
    var min = -0.5;
    for(var i = 0; i < number; i++){
        stars.push({
            x: this.x(this.randomNumber(-0.5, 0.5, 2)),
            y: this.y(this.randomNumber(-0.5, 0.5, 2)),
            radius: Math.random() * 1.4
        });
    }
    return stars;
  },

  render: function() {
    var zoom = d3.behavior.zoom().scaleExtent([0.75, 7]).on("zoom", this.zoom);
    var svg = d3.select(this.el)
      .append("svg")
        .attr("class", "starcom")
        .attr("width", "940px")
        .attr("height", this.quad_height)
        .attr("pointer-events", "all");
    svg.append("g").selectAll("circle")
      .data(this.generateStars(300))
        .enter()
      .append("circle")
          .attr("class", "star")
          .attr("cx", function(d) { return d.x; })
          .attr("cy", function(d) { return d.y; })
          .attr("r", function(d) { return d.radius; });
    this.vis = svg.append('g')
        .call(zoom)
      .append('g');
    this.vis.append("rect")
      .attr("width", this.width)
      .attr("height", this.height)
      .attr("fill", "none")
      .attr("translate", _.bind(function(d) {
          return "translate(" + this.x(-0.5) + "," +
                                this.y(0.5) + ")"; }, this));
    this.vis.append("circle")
      .attr("r", 50)
      .attr("fill", "url(#gradeSol)")
      .attr("filter", "url(#glowSol)")
      .attr("transform", _.bind(function(d) {
          return "translate(" + this.x(0) + "," +
                                this.y(0) + "), scale(.6)"; }, this));
    var planets = this.model.get("planets");
    this.drawSol(planets.models);
    return this;
  },

  drawSol: function(data) {
    var start = Date.now();
    var speed = 6;
    var planets = this.vis.selectAll("g.planet").data(data);
    var planetEnter = planets.enter().append("g")
      .attr("class", "planet");
    planetEnter.append("circle")
      .attr("r", 50)
      .attr("fill", "url(#gradePlanet)")
      .attr("filter", "url(#glowPlanet)")
      .attr("transform", _.bind(function(d) {
          return "translate(" + this.x(d.get("orbital_radius")) + "," +
                                this.y(0) + "), scale(.1)"; }, this))
      .on("click", this.swapToPlanet);


    d3.timer(_.bind(function() {
      var angle = (Date.now() - start) * speed,
      transform = _.bind(function(d) {
        return "rotate(" + angle / this.x(d.get("orbital_radius")) +
                        "," + this.x(0) + "," + this.y(0) + ")";
      }, this);
      this.vis.selectAll("g.planet").attr("transform", transform);
      //this.vis.attr("transform", transform);
    }, this));
  }

});