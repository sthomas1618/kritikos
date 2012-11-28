Kritikos.Collections.Constellations = Backbone.Collection.extend({
  model: Kritikos.Models.Constellation,
  url: '/constellations',
  add : function(models, options) {
    var newModels = [];
    _.each(models, function(model) {
      if (_.isUndefined(this.get(model.id))) {
        newModels.push(model);
      }
    }, this);
    return Backbone.Collection.prototype.add.call(this, newModels, options);
  }
});