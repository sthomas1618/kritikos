Kritikos.Views.StarCom = Kritikos.Views.StarCom || {};

Kritikos.Views.StarCom.Index = Support.CompositeView.extend({
  tagName: "section",

  initialize: function() {
    _.bindAll(this, "render", "renderTemplate", "zoom", "drawConstellations");
    this.quad_width = 800;
    this.quad_height = 800;
    this.x_offset = -50; // Need to offset constellation because
    this.y_offset = 50;  // rect element starts on upper-left corner
    this.width = 2400;
    this.height = 2400;
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
    this.renderLayout();
    this.renderTemplate();
    return this;
  },

  renderLayout: function() {
    var layout = new Kritikos.Views.Layout.Game({ model: this.model });
    this.renderChild(layout);
    this.$el.html(layout.el);
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

    var x = this.x,
        y = this.y;
    var centerC = this.vis.select("g.center")
       .attr("transform",
        function(d) { return "translate(" + x_coord + "," + y_coord + ")"; });
    centerC.select("text")
      .text(
        function(d) { return "center (" + real_x + ", " + real_y + ")"; });

    //Backbone.history.navigate("#starcom?x=" + x_coord + "&y=" + y_coord, { replace: true });
  },

  renderTemplate: function() {
    this.$el.append(JST['star_com/index']());
    var zoomOrigin = [-this.x(this.x_offset), -this.y(this.y_offset)];
    var zoom = d3.behavior.zoom()//.x(this.x).y(this.y)
      .translate(zoomOrigin).scaleExtent([0, 8]).on("zoom", this.zoom);
    var svg = d3.select($('#starcom_map', this.$el).get(0))
      .append("svg:svg")
        .attr("class", "starcom")
        .attr("width", "100%")
        .attr("height", this.quad_height)
        .attr("pointer-events", "all");
        var gradient = svg.append("defs").append("linearGradient")
      .attr("id", "gradient")
      .attr("x1", "0%")
      .attr("x2", "100")
      .attr("y1", "100%")
      .attr("y2", "0%");
    gradient.append("stop")
      .attr("offset", "0")
      .attr("stop-color", "#F2CA00");
    gradient.append("stop")
      .attr("offset", "1")
      .attr("stop-color", "#FDFFEB");
    this.vis = svg.append('g')
      .call(zoom)
    .append('g')
      .attr("transform",
        _.bind(function(d) {
          return "translate(" + -this.x(this.x_offset) + "," + -this.y(this.y_offset) + ")";
        }, this));

//         <linearGradient id="g454" gradientUnits="userSpaceOnUse" x1="0%" y1="100%" x2="100%" y2="0%">
// <stop stop-color="#CC9900" offset="0"/><stop stop-color="#FFDB70" offset="1"/>
// </linearGradient>
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

    var centerC = this.vis.append("g")
      .attr("class", "center")
      .attr("transform",
        _.bind(function(d) { return "translate(" + this.x(0) + "," +
                                            this.y(0) + ")"; }, this));
    centerC.append("circle")
      .attr("r", 10);
    centerC.append("svg:text")
      .text(
        function(d) { return "center (0, 0)"; });
    var centerA = this.vis.append("g")
      .attr("class", "center")
      .attr("transform",
        _.bind(function(d) { return "translate(" + this.x(0) + "," +
                                              this.y(0) + ")"; }, this));
    centerA.append("circle")
      .attr("r", 10);
    centerA.append("svg:text")
      .text(
        function(d) { return "center (0, 0)"; });
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

    quadEnter.append("svg:text")
      .attr("transform",
        _.bind(function(d) {
          return "translate(" + this.x(d.get("x") + this.x_offset + 5) + "," +
                                this.y(d.get("y") + this.y_offset - 5) + ")"; }, this))
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
      .attr("r", 7)
      .attr("fill", "url(#gradient)");
    // solEnter.append("svg:text")
    //   .text(
    //     _.bind(function(d) { return "(" + d.get("x") + ", " + d.get("y") + ")"; }, this));
  }
});