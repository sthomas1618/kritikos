Kritikos.Views.Planet = Kritikos.Views.SolarSystem || {};

Kritikos.Views.Planet.Show = Support.CompositeView.extend({
  tagName: "div",
  id: "planet_map",
  className: "planet",

  // this view based on:
  // http://marcneuwirth.com/blog/2012/06/24/creating-the-earth-with-d3-js/

  initialize: function() {
    _.bindAll(this, "render", "generateStars", "zoom", "move");
    this.width       = 940;
    this.height      = 800;
    this.x = d3.scale.linear()
      .domain([-0.5, 0.5])
      .range([0, this.width]);
    this.y = d3.scale.linear()
      .domain([-0.5875, 0.5875])
      .range([this.height, 0]);
  },

  randomLonLat: function () {
      return [Math.random() * 360 - 180, Math.random() * 180 - 90];
  },

  generateStars: function(number) {
    var data = [];
    for(var i = 0; i < number; i++){
        data.push({
            geometry: {
                type: 'Point',
                coordinates: this.randomLonLat()
            },
            type: 'Feature',
            properties: {
                radius: Math.random() * 1.5
            }
        });
    }
    return data;
  },


  zoom: function(d) {
    this.vis.attr("transform", "translate(" + d3.event.translate + ")" +
                          " scale(" + d3.event.scale + ")");
  },

  render: function() {
    this.space = d3.geo.azimuthal()
        .mode("equidistant")
        .translate([this.width  / 2, this.height  / 2]);

    this.space.scale(this.space.scale() * 3);

    this.spacePath = d3.geo.path()
        .projection(this.space)
        .pointRadius(1);

    //Setup path for globe
    this.projection = d3.geo.azimuthal()
        .mode("orthographic")
        .translate([this.width / 2, this.height / 2]);

    this.scale0 = this.projection.scale();

    this.path = d3.geo.path()
        .projection(this.projection)
        .pointRadius(2);

    //Setup zoom behavior
    var zoom = d3.behavior.zoom(true)
        .translate(this.projection.origin())
        .scale(this.projection.scale())
        .scaleExtent([100, 800])
        .on("zoom", this.move);

    this.circle = d3.geo.greatCircle();

    var svg = d3.select(this.el)
        .append("svg")
          .attr("width", this.width)
          .attr("height", this.height)
        .append("g")
          .call(zoom)
          .on("dblclick.zoom", null);

    //Create a list of random stars and add them to outerspace
    var starList = this.generateStars(300);

    this.stars = svg.append("g")
        .selectAll("g")
        .data(starList)
        .enter()
        .append("path")
            .attr("class", "star")
            .attr("d", _.bind(function(d){
                this.spacePath.pointRadius(d.properties.radius);
                return this.spacePath(d);
            }, this));
    svg.append("rect")
        .attr("class", "frame")
        .attr("width",  this.width)
        .attr("height",  this.height)
        .attr("fill", "none");
    //Create the base globe
    this.backgroundCircle = svg.append("circle")
        .attr('cx', this.width / 2)
        .attr('cy', this.height / 2)
        .attr('r', this.projection.scale())
        .attr('class', 'globe')
        .attr("filter", "url(#glowPlanet)")
        .attr("fill", "url(#gradePlanet)");
    var g = svg.append("g");
    //Add all of the countries to the globe
    // d3.json("world-countries.json", function(collection) {
    //     this.features = g.selectAll(".feature").data(collection.features);

    //      this.features.enter().append("path")
    //       .attr("class", "feature")
    //       .attr("d", function(d){ return path(this.circle.clip(d)); });
    // });
  },

  //Redraw all items with new projections
  redraw: function (){
      // this.features.attr("d", function(d){
      //   return path(circle.clip(d));
      // });

      this.stars.attr("d", _.bind(function(d){
        this.spacePath.pointRadius(d.properties.radius);
        return this.spacePath(d);
      }, this));
  },

  move: function () {
    if(d3.event){
      var scale = d3.event.scale;
      var origin = [d3.event.translate[0] * -1, d3.event.translate[1]];

      this.projection.scale(scale);
      this.space.scale(scale * 3);
      this.backgroundCircle.attr('r', scale);
      this.path.pointRadius(2 * scale / this.scale0);

      this.projection.origin(origin);
      this.circle.origin(origin);

      //globe and stars spin in the opposite direction because of the projection mode
      var spaceOrigin = [origin[0] * -1, origin[1] * -1];
      this.space.origin(spaceOrigin);
      this.redraw();
    }
  }
});