// This view contains the view for the 

/*global define*/
define(["backbone", "underscore"], function (Backbone, _) {
/**
   * Display the concepts as an item in the node list
   */
  return  (function(){
    // define private variables and methods
    var pvt = {};

    pvt.consts = {
        headerId: "terminal-header",
        thisId: "terminal-view"

    //   viewClass: "learn-title-display",
    //   viewIdPrefix: "node-title-view-", // must also change in parent
    //   clickedItmClass: "clicked-title" // must also change in parent
    };

    // return public object for node list item view
    return Backbone.View.extend({
      id: function(){ return this.thisId ;},

      tagName: "li",

      className: pvt.consts.viewClass,

      // TODO handle click event correctly
      events: {
        // "click": function(evt){
        //   var thisView = this,
        //       modelId = thisView.model.id;

        //   if (!thisView.$el.hasClass(pvt.consts.clickedItmClass)) {
        //     // set focus if not currently focused
        //     thisView.model.trigger("setFocusNode", modelId);
        //   } else {
        //     // else, if currently focused, toggle scope
        //     thisView.model.trigger("toggleNodeScope", modelId);
        //   }T
        //   // change url parameters if using a router
        //   this.appRouter && this.appRouter.changeUrlParams({focus: thisView.model.get("tag")});
        // }
      },

      /** override in subclass */
      preinitialize: function () {},

      /**
       * Initialize the view with appropriate listeners
       * NOTE: this should not be overridden in a subclass - use post/preinitialize
       */
      initialize: function(inp){
        var thisView = this;
        thisView.preinitialize(inp);
        thisView.postinitialize(inp);
      },

      /** override in subclass */
      postinitialize: function (inp) {},

      /** override in subclass */
      prerender: function (inp) {},

      /**
       * Render the learning view given the supplied model
       */
      render: function(){
        var thisView = this;

        console.log("before modification")
        console.log(this.$("#" + pvt.consts.headerId).text())

        console.log($("#" + pvt.consts.headerId))
        thisView.$("#" + pvt.consts.headerId).text("NEW TITLE"); 
        console.log("after modification")
        console.log(thisView.$(pvt.consts.headerId)); 


        thisView.prerender();
        thisView.postrender();
        return thisView;
      },

      /** override in subclass */
      postrender: function () {
        var thisView = this;

        // thisView.$el.html(thisView.model.get("title"));
      },

      /**
       * Change the title display properties given by prop
       */
      changeTitleClass: function(classVal, status){
        if (status){
          this.$el.addClass(classVal);
        }
        else{
          this.$el.removeClass(classVal);
        }
      },

      /**
       * return a shallow copy of the private consts for this view
       */
      getConstsClone: function () {
        return _.clone(pvt.consts);
      }
    });
  })();
});