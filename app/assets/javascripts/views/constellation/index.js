Kritikos.Views.Constellation = Kritikos.Views.Constellation || {};

Kritikos.Views.Constellation.Index = Support.CompositeView.extend({
  tagName: "div",
  id: "constellation_map",

  initialize: function() {
    _.bindAll(this, "render", "renderTemplate", "zoom", "drawConstellations",
              "swapToSol", "generateStars");
    this.width       = 2820;
    this.height      = 2400;
    this.quad_width  = this.width / 3;
    this.quad_height = this.height / 3;
    // this.quad_width = 800;
    // this.quad_height = 800;
    this.x_offset = -50; // Need to offset constellation because
    this.y_offset = 50;  // rect element starts on upper-left corner
    this.x = d3.scale.linear()
      .domain([-150, 150])
      .range([0, this.width]);
    this.y = d3.scale.linear()
      .domain([-150, 150])
      .range([this.height, 0]);
    this.center_x = 0;
    this.center_y = 0;
    this.xAxis = d3.svg.axis()
      .scale(this.x)
      .orient("bottom")
      .ticks(10)
      .tickSize(-this.width);

    this.yAxis = d3.svg.axis()
      .scale(this.y)
      .orient("left")
      .ticks(10)
      .tickSize(-this.height);
  },

  render: function() {
    this.renderTemplate();
    return this;
  },

  zoom: function(d) {
    this.vis.attr("transform", "translate(" + d3.event.translate + ")" +
                          " scale(" + d3.event.scale + ")");
    var x_coord = ((-1 * d3.event.translate[0]) + this.x(this.x_offset * 2)) / d3.event.scale;
    var y_coord = ((-1 * d3.event.translate[1]) + this.y(this.y_offset * 2)) / d3.event.scale;

    var real_x = this.x.invert(x_coord);
    var real_y = this.y.invert(y_coord);
    var dx = real_x - this.center_x;
    var dy = real_y - this.center_y;
    var distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    if (distance > 100) {
      this.center_x = Math.round(real_x / 10) * 10;
      this.center_y = Math.round(real_y / 10) * 10;
      real_x = this.center_x;
      real_y = this.center_y;
      var closest = this.collection.findClosest(real_x, real_y);
      var stellas = new Kritikos.Collections.Constellations();
      stellas.fetch({
        data: $.param({ x: closest.get("x"), y: closest.get("y") }),
        success: _.bind(function() {
          this.collection.add(stellas.models);
          this.drawConstellations(this.collection.models);
        }, this)
      });
    }

    // var x = this.x,
    //     y = this.y;
    // var centerC = this.vis.select("g.center")
    //    .attr("transform",
    //     function(d) { return "translate(" + x_coord + "," + y_coord + ")"; });
    // centerC.select("text")
    //   .text(
    //     function(d) { return "center (" + real_x + ", " + real_y + ")"; });

    //Backbone.history.navigate("#starcom?x=" + x_coord + "&y=" + y_coord, { replace: true });
  },

  swapToSol: function(d) {
    var planets = d.get("planets");
    planets.fetch({
      success: _.bind(function() {
        this.parent.model = d;
        this.leave();
        Backbone.history.navigate("#starcom/solar_system/" + d.id, {replace: true});
        this.parent.renderSolarSystem();
      }, this)
    });
  },

  generateStars: function(number) {
    var stars = [];
    var max = 150;
    var min = -150;
    for(var i = 0; i < number; i++){
        stars.push({
            x: this.x(Math.floor(Math.random() * (max - min + 1)) + min),
            y: this.y(Math.floor(Math.random() * (max - min + 1)) + min),
            radius: Math.random() * 1.4
        });
    }
    return stars;
  },

  renderTemplate: function() {
    var zoomOrigin = [-this.x(this.x_offset), -this.y(this.y_offset)];
    var zoom = d3.behavior.zoom()//.x(this.x).y(this.y)
      .translate(zoomOrigin).scaleExtent([0, 8]).on("zoom", this.zoom);
    var svg = d3.select(this.el)
      .append("svg")
        .attr("class", "starcom")
        .attr("width", "940px")
        .attr("height", this.quad_height)
        .attr("pointer-events", "all");
    svg.append("g").selectAll("circle")
      .data(this.generateStars(1000))
        .enter()
      .append("circle")
          .attr("class", "star")
          .attr("cx", function(d) { return d.x; })
          .attr("cy", function(d) { return d.y; })
          .attr("r", function(d) { return d.radius; });
    this.vis = svg.append('g')
      .call(zoom)
    .append('g')
      .attr("transform",
        _.bind(function(d) {
          return "translate(" + -this.x(this.x_offset) + "," + -this.y(this.y_offset) + ")";
        }, this));
    this.drawConstellations(this.collection.models);

    // this.vis.append("g")
    //   .attr("class", "x axis")
    //   .attr("transform",
    //     _.bind(function(d) {
    //         return "translate(0," + this.width + ")"; }, this))
    //   .call(this.xAxis);
    // this.vis.append("g")
    //   .attr("class", "y axis")
    //   .call(this.yAxis);

    // var centerC = this.vis.append("g")
    //   .attr("class", "center")
    //   .attr("transform",
    //     _.bind(function(d) { return "translate(" + this.x(0) + "," +
    //                                         this.y(0) + ")"; }, this));
    // centerC.append("circle")
    //   .attr("r", 10);
    // centerC.append("svg:text")
    //   .text(
    //     function(d) { return "center (0, 0)"; });
    // var centerA = this.vis.append("g")
    //   .attr("class", "center")
    //   .attr("transform",
    //     _.bind(function(d) { return "translate(" + this.x(0) + "," +
    //                                           this.y(0) + ")"; }, this));
    // centerA.append("circle")
    //   .attr("r", 10);
    // centerA.append("svg:text")
    //   .text(
    //     function(d) { return "center (0, 0)"; });
  },

  drawConstellations: function(data) {
    var quad = this.vis.selectAll("g.stella").data(data);
    var quadEnter = quad.enter().append("g")
      .attr("class", "stella");
    quadEnter.append("rect")
      .attr("class", "quad")
      .attr("width", this.quad_width)
      .attr("height", this.quad_height)
      .attr("transform", _.bind(function(d) {
          return "translate(" + this.x(d.get("x") + this.x_offset) + "," +
                                this.y(d.get("y") + this.y_offset) + ")"; }, this));

    var stella_label = quadEnter.append("g")
        .attr("class", "stella_label")
        .attr("transform",
          _.bind(function(d) {
          return "translate(" + this.x(d.get("x") + this.x_offset + 5) + "," +
                                this.y(d.get("y") + this.y_offset - 5) + ")"; }, this));
    stella_label.append("svg:text")
      .text(function(d) { return d.get("name"); });
    var gridLines = quadEnter.append("g")
          .attr("class", "box");
    gridLines.append("svg:line")
      .attr("x1", _.bind(function(d) {
        return this.x(d.get("x") + this.x_offset);}, this))
      .attr("y1", _.bind(function(d) {
        return this.y(d.get("y") + this.y_offset) + 2; }, this))
      .attr("x2", _.bind(function(d) {
        return this.x(d.get("x") + this.x_offset) + this.quad_width; }, this))
      .attr("y2", _.bind(function(d) {
        return this.y(d.get("y") + this.y_offset) + 2; }, this));
    gridLines.append("svg:line")
      .attr("x1", _.bind(function(d) {
        return this.x(d.get("x") + this.x_offset);}, this))
      .attr("y1", _.bind(function(d) {
        return this.y(d.get("y") - this.y_offset) - 2; }, this))
      .attr("x2", _.bind(function(d) {
        return this.x(d.get("x") + this.x_offset) + this.quad_width; }, this))
      .attr("y2", _.bind(function(d) {
        return this.y(d.get("y") - this.y_offset) - 2; }, this));
    gridLines.append("svg:line")
      .attr("x1", _.bind(function(d) {
        return this.x(d.get("x") + this.x_offset) + 2;}, this))
      .attr("y1", _.bind(function(d) {
        return this.y(d.get("y") + this.y_offset); }, this))
      .attr("x2", _.bind(function(d) {
        return this.x(d.get("x") + this.x_offset) + 2; }, this))
      .attr("y2", _.bind(function(d) {
        return this.y(d.get("y") + this.y_offset) + this.quad_height; }, this));
    gridLines.append("svg:line")
      .attr("x1", _.bind(function(d) {
        return this.x(d.get("x") - this.x_offset) - 2;}, this))
      .attr("y1", _.bind(function(d) {
        return this.y(d.get("y") + this.y_offset); }, this))
      .attr("x2", _.bind(function(d) {
        return this.x(d.get("x") - this.x_offset) - 2; }, this))
      .attr("y2", _.bind(function(d) {
        return this.y(d.get("y") + this.y_offset) + this.quad_height; }, this));

    // quadEnter.append("g")
    //   .attr("class", "x axis")
    //   .attr("transform",
    //     _.bind(function(d) {
    //       return "translate(" + this.x(d.get("x") + this.x_offset + 1) + "," +
    //                             this.y(d.get("y") + this.y_offset + 1) + ")"; }, this))
    //   .call(this.xAxis);
    // quadEnter.append("g")
    //   .attr("class", "y axis")
    //   .attr("transform",
    //     _.bind(function(d) {
    //       return "translate(" + this.x(d.get("x") + this.x_offset + 1) + "," +
    //                             this.y(d.get("y") + this.y_offset + 1) + ")"; }, this))
    //   .call(this.yAxis);

    // var sols = quadEnter.selectAll("circle.dot").data(
    //     function(d, i) { return d.get("solar_systems").models; });
    // var solEnter = sols.enter().append("circle")
    //   .attr("class", "dot")
    //   .attr("r", 7)
    //   .attr("transform",
    //     function(d) { return "translate(" + x(d.get("x")) + "," +
    //                                         y(d.get("y")) + ")"; });

    var sols = quadEnter.selectAll("g.sol").data(
      function(d, i) { return d.get("solar_systems").models; });
    var solEnter = sols.enter().append("g")
      .attr("class", "sol")
      .attr("transform",
        _.bind(function(d) { return "translate(" + this.x(d.get("x")) + "," +
                                            this.y(d.get("y")) + ")"; }, this));
    solEnter.append("circle")
      .attr("r", 50)
      .attr("fill", "url(#gradeSol)")
      .attr("filter", "url(#glowSol)")
      .attr("transform", "scale(.16)")
      .on("click", this.swapToSol);
    // solEnter.append("svg:text")
    //   .text(
    //     _.bind(function(d) { return "(" + d.get("x") + ", " + d.get("y") + ")"; }, this));
  }
});