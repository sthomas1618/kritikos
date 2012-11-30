Kritikos.Collections.Constellations = Backbone.Collection.extend({
  model: Kritikos.Models.Constellation,
  url: '/constellations',

  add: function(models, options) {
    var newModels = [];
    _.each(models, function(model) {
      if (_.isUndefined(this.get(model.id))) {
        newModels.push(model);
      }
    }, this);
    return Backbone.Collection.prototype.add.call(this, newModels, options);
  },

  findClosest: function (x, y) {
    var min_distance = Number.POSITIVE_INFINITY,
    id = -1,
    current_distance;
    _.each(this.models, function(model) {
      var dx = x - model.get("x");
      var dy = y - model.get("y");
      current_distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
      if (current_distance < min_distance) {
        min_distance = current_distance;
        id = model.id;
      }
    });
    return this.get(id);
  }
});