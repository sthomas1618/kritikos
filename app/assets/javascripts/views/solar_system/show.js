Kritikos.Views.SolarSystem = Kritikos.Views.SolarSystem || {};

Kritikos.Views.SolarSystem.Show = Support.CompositeView.extend({
  tagName: "div",
  id: "sol_map",
  className: "sol",

  initialize: function() {
    _.bindAll(this, "render", "drawSol", "generateStars", "zoom", "swapToPlanet",
              "startOrbit", "selectOrbit", "deselectOrbit");
    this.width       = 940;
    this.height      = 800;
    this.x = d3.scale.linear()
      .domain([-0.5, 0.5])
      .range([0, this.width]);
    this.y = d3.scale.linear()
      .domain([-0.5875, 0.5875])
      .range([this.height, 0]);
    this.planetScale = d3.scale.linear()
      .domain([0.5, 10])
      .range([100, 225]);
    this.starts = {};
    this.speed = 6;
  },

  zoom: function(d) {
    this.vis.attr("transform", "translate(" + d3.event.translate + ")" +
                          " scale(" + d3.event.scale + ")");
  },

  swapToPlanet: function(d) {
    this.parent.model = d;
    this.leave();
    Backbone.history.navigate("#starcom/planets/" + d.id, {replace: true});
    this.parent.renderPlanet();
  },

  startOrbit: function() {
    var transform = _.bind(function(d) {
      var start = this.starts[d.id];
      if (!start) {
        this.starts[d.id] = Date.now();
        start = this.starts[d.id];
      }

      var angle = ((Date.now() - start) * this.speed);
      var degree = angle / this.x(d.get("orbital_radius"));
      if(degree >= 360)
      {
        this.starts[d.id] = Date.now();
        start = this.starts[d.id];
        degree = ((Date.now() - this.start) * this.speed);
      }
      return "rotate(" + degree + "," + this.x(0) + "," + this.y(0) + ")";
    }, this);

    this.vis.selectAll("g.planet").attr("transform", transform);
  },

  deselectOrbit: function(el, model) {
    var transition = d3.select(el).transition().duration(750).delay(5);
    transition.select("circle.body")
      .attr("transform", _.bind(function(d) {
        return "translate(" + this.x(d.get("orbital_radius")) + "," +
                              this.y(0) + "), scale(.05)"; }, this));
  },

  selectOrbit: function(el, model) {
    var transition = d3.select(el).transition().duration(750).delay(250);
    transition.select("circle.body")
      .attr("transform", _.bind(function(d) {
        return "translate(" + this.x(d.get("orbital_radius")) + "," +
                              this.y(0) + "), scale(.15)"; }, this));
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
            y: this.y(this.randomNumber(-0.5875, 0.5875, 2)),
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
        .attr("width", this.width)
        .attr("height", this.height)
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
                                this.y(0.5875) + ")"; }, this));
    this.vis.append("circle")
      .attr("class", "sun")
      .attr("r", 100)
      .attr("fill", "url(#gradeSol)")
      .attr("filter", "url(#glowSol)")
      .attr("transform", _.bind(function(d) {
          return "translate(" + this.x(0) + "," +
                                this.y(0) + "), scale(.4)"; }, this));
    var username = this.model.get("user").get("username");
    var sol_label = this.vis.append("g")
    .attr("class", "starcom_label")
    .attr("transform", _.bind(function() {
      return "translate(" + this.x(-0.45) + "," + this.y(0.5) + ")"; }, this));
    sol_label.append("text")
      .text(function(d) { return username + "'s System"; });

    var planets = this.model.get("planets");
    this.drawSol(planets.models);
    return this;
  },

  drawSol: function(data) {
    var orbital_arc = d3.svg.arc()
      .startAngle(0)
      .endAngle(6.28318531) // 360 degrees
      .innerRadius(_.bind(function(d) {
        return this.x(d.get("orbital_radius")) - 470; }, this)) // Magic number.
      .outerRadius(_.bind(function(d) { return this.x(d.get("orbital_radius")) - 470; }, this));

    var selector_arc = d3.svg.arc()
      .startAngle(0)
      .endAngle(6.28318531) // 360 degrees
      .innerRadius(_.bind(function(d) {
        return this.x(d.get("orbital_radius")) - 465; }, this))
      .outerRadius(_.bind(function(d) { return this.x(d.get("orbital_radius")) - 475; }, this));

    var view = this;
    var planets = this.vis.selectAll("g.planet").data(data);
    var planetEnter = planets.enter().append("g")
      .attr("class", "planet")
      .on("dblclick", this.swapToPlanet)
      .on("mouseover", function(d) { view.selectOrbit(this, d); })
      .on("mouseout", function(d) { view.deselectOrbit(this, d); });

    planetEnter.append("path")
      .attr("class", "orbit")
      .attr("d", orbital_arc)
      .attr("fill", "#fff")
      .style("stroke", "#fff")
      .attr("transform", _.bind(function(d) {
        return "translate(" + this.x(0) + "," + this.y(0) + ")"; }, this));

    planetEnter.append("circle")
      .attr("r", _.bind(function(d) {
        return this.planetScale(d.get("radius")); }, this))
      .attr("class", "body")
      .attr("fill", "url(#gradePlanet)")
      .attr("filter", "url(#glowPlanet)")
      .attr("transform", _.bind(function(d) {
        return "translate(" + this.x(d.get("orbital_radius")) + "," +
                              this.y(0) + "), scale(.05)"; }, this));

      planetEnter.append("path")
      .attr("class", "overlay_orbit")
      .attr("d", selector_arc)
      .attr("fill", "none")
      .attr("transform", _.bind(function(d) {
        return "translate(" + this.x(0) + "," + this.y(0) + ")"; }, this));

    d3.timer(this.startOrbit);
  }

});