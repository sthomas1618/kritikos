Kritikos.Collections.Users = Backbone.Collection.extend({
  initialize: function(models, options) {

  },
  model: Kritikos.Models.User,
  url: '/users'
});