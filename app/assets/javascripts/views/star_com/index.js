Kritikos.Views.StarCom = Kritikos.Views.StarCom || {};

Kritikos.Views.StarCom.Index = Support.CompositeView.extend({
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

  zoom: function() {
    var vis = d3.select($('#starcom_map > svg > g > g', this.$el).get(0));
    //console.log(svg);
    // svg.select(".x.axis").call(xAxis);
    // svg.select(".y.axis").call(yAxis);
    // svg.select("path.dot").call(yAxis);
    //console.log("here", d3.event.translate, d3.event.scale);
    vis.attr("transform",
      "translate(" + d3.event.translate + ")"
      + " scale(" + d3.event.scale + ")");
  },

  renderTemplate: function() {
    this.$el.append(JST['star_com/index']());

    var width = 700,
        height = 450,
        margin = 20;

    var x = d3.scale.linear()
      .domain([0, 10])  
      .range([0, width]);
      //.range([20, width]);

    var y = d3.scale.linear()
      .domain([0, 10])  
      .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .tickSize(-height);

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(5)
        .tickSize(-width);

    var symbol = d3.scale.ordinal().range(d3.svg.symbolTypes),
        color = d3.scale.category10();

    var vis = d3.select($('#starcom_map', this.$el).get(0))
      .append("svg:svg")
        .attr("class", "starcom")
        .attr("width", width + margin * 2)
        .attr("height", height + margin * 2)
        .attr("pointer-events", "all")
      .append('svg:g')
        .attr("transform", "translate(" + margin + "," + margin + ")")
        .call(d3.behavior.zoom().x(x).y(y).scaleExtent([1, 8]).on("zoom", this.zoom))
      .append('svg:g');
      //.append("svg")
      //  .attr("width", width + margin * 2)
      //  .attr("height", height + margin * 2)
      //.append("g")
        //.attr("transform", "translate(" + margin + "," + margin + ")")
        //.call(d3.behavior.zoom().x(x).y(y).scaleExtent([1, 8]).on("zoom", this.zoom));
    //console.log(svg);

    vis.append("rect")
        .attr("class", "quad")
        .attr("width", "100%")
        .attr("height", height);

    vis.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    vis.append("g")
        .attr("class", "y axis")
        .call(yAxis);

    vis.selectAll("path.dot")
        .data(this.collection.models)
      .enter().append("path")
        .attr("class", "dot")
        .attr("stroke", function(d, i) { console.log(d); return color(i); })
        .attr("transform",
              function(d) { return "translate(" + x(d.get("solar_system").x) + "," + y(d.get("solar_system").y) + ")"; })
        .attr("d", d3.svg.symbol()
        .type(function(d, i) { return symbol(i); }));
  }

  // var vis = d3.select("#chart")
  //   .append("svg:svg")
  //     .attr("width", w)
  //     .attr("height", h)
  //     .attr("pointer-events", "all")
  //   .append('svg:g')
  //     .call(d3.behavior.zoom().on("zoom", redraw))
  //   .append('svg:g');

  // vis.append('svg:rect')
  //     .attr('width', w)
  //     .attr('height', h)
  //     .attr('fill', 'white');
  // function redraw() {
  //   console.log("here", d3.event.translate, d3.event.scale);
  //   vis.attr("transform",
  //       "translate(" + d3.event.translate + ")"
  //       + " scale(" + d3.event.scale + ")");
  // }
});