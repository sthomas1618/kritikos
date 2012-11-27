Kritikos.Views.StarCom = Kritikos.Views.StarCom || {};

Kritikos.Views.StarCom.Index = Support.CompositeView.extend({
  tagName: "section",

  initialize: function() {
    _.bindAll(this, "render", "renderTemplate", "zoom", "setStella");
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
    //console.log(distance);
    if (distance > 115) {
      console.log("load");
      this.center_x = real_x;
      this.center_y = real_y;
    }

    // var normalized_x = ((-1 * this.x.invert(d3.event.translate[0]))
    //                     + (this.x_offset * 5)) * d3.event.scale;
    // var normalized_y = ((-1 * this.y.invert(d3.event.translate[1]))
    //                     + (this.y_offset * 5)) * d3.event.scale;
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

  setStella: function(d) {
    return "translate(" + this.x(d.get("x") + this.x_offset) + "," +
                          this.y(d.get("y") + this.y_offset) + ")";
  },

  renderTemplate: function() {
    this.$el.append(JST['star_com/index']());

    var quad_width    = 800,
        quad_height   = 800;
    var x = this.x,
       y = this.y,
       zoom_x = this.zoom_x,
       zoom_y = this.zoom_y,
       y_offset = this.y_offset,
       x_offset = this.x_offset;

    var xAxis = d3.svg.axis()
      .scale(this.x)
      .orient("bottom")
      .ticks(15)
      .tickSize(-2400);

    var yAxis = d3.svg.axis()
      .scale(this.y)
      .orient("left")
      .ticks(15)
      .tickSize(-2400);
    var zoomOrigin = [-this.x(this.x_offset), -this.y(this.y_offset)];
    var zoom = d3.behavior.zoom()//.x(this.x).y(this.y)
      .translate(zoomOrigin).scaleExtent([0, 8]).on("zoom", this.zoom);
    //var initZoom = [this.stella_x(0), this.stella_y(0)];
    this.vis = d3.select($('#starcom_map', this.$el).get(0))
      .append("svg:svg")
        .attr("class", "starcom")
        .attr("width", "100%")
        .attr("height", quad_height)
        .attr("pointer-events", "all")
      .append('svg:g')
        .call(zoom)
      .append('svg:g')
        .attr("transform",
          function(d) {
            return "translate(" + -x(x_offset) + "," + -y(y_offset) + ")"; })
        ;

    // var tf_offset = function() {
    //   //console.log(this);
    //   //self = this;
    //   //console.log(self);
    //   return function(d) { return "translate(" + this.x(d.get("x") + x_offset) + "," +
    //                         this.y(d.get("y") + y_offset) + ")"; };
    // };

    var quad = this.vis.selectAll("g").data(this.collection.models);
    var quadEnter = quad.enter().append("g");
    quadEnter.append("rect")
      .attr("class", "quad")
      .attr("width", quad_width)
      .attr("height", quad_height)
      .attr("transform", this.setStella);

    quadEnter.append("svg:text")
      .attr("transform",
        function(d) {
          return "translate(" + x(d.get("x") + x_offset + 5) + "," +
                                y(d.get("y") + y_offset - 5) + ")"; })
      .text(function(d) { return d.get("name"); });

    // quadEnter.append("g")
    //   .attr("class", "x axis")
    //   .attr("transform", this.setStella)
    //   .call(xAxis);
    // quadEnter.append("g")
    //   .attr("class", "y axis")
    //   .attr("transform", this.setStella)
    //   .call(yAxis);

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
        function(d) { return "translate(" + x(d.get("x")) + "," +
                                            y(d.get("y")) + ")"; });
    solEnter.append("circle")
      .attr("r", 7);
    solEnter.append("svg:text")
      .text(
        function(d) { return "(" + d.get("x") + ", " + d.get("y") + ")"; });

    this.vis.append("g")
      .attr("class", "x axis")
      .attr("transform",
        function(d) {
            return "translate(0," + 2400 + ")"; })
      .call(xAxis);
    this.vis.append("g")
      .attr("class", "y axis")
      .call(yAxis);

    var centerC = this.vis.append("g")
      .attr("class", "center")
      .attr("transform",
        function(d) { return "translate(" + x(0) + "," +
                                            y(0) + ")"; });
    centerC.append("circle")
      .attr("r", 10);
    centerC.append("svg:text")
      .text(
        function(d) { return "center (0, 0)"; });
    var centerA = this.vis.append("g")
      .attr("class", "center")
      .attr("transform",
        function(d) { return "translate(" + x(0) + "," +
                                            y(0) + ")"; });
    centerA.append("circle")
      .attr("r", 10);
    centerA.append("svg:text")
      .text(
        function(d) { return "center (0, 0)"; });

    // var zoom_fn = this.zoom;
    // d3.transition().duration(750).tween("zoom", function() {
    //   var ix = d3.interpolate(x.domain(), [-this.width / 2, this.width / 2]),
    //       iy = d3.interpolate(y.domain(), [-this.height / 2, this.height / 2]);
    //   console.log(ix);
    //   return function(t) {
    //     zoom.x(x.domain(ix(t))).y(y.domain(iy(t)));
    //     zoom_fn();
    //   };
    // });
  }
});