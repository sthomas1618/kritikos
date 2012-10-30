Kritikos.Routers.Single = Support.SwappingRouter.extend({
  initialize: function(options) {
    this.el = $('.container.content');
  },

  routes: {
    "account": "account"
  },

  account: function() {
    //var view = new Kritikos.Views.SysCom.Index({ model: this.clock });
    //this.swap(view);
  }
});