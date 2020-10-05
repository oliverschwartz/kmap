/*global define*/
define(["backbone", "underscore"], function (Backbone, _) {
    /**
     * Display the concepts as an item in the node list
     */
    return (function () {
        // return public object for node list item view
        return Backbone.View.extend({
            el: "#terminal",

            /** override in subclass */
            preinitialize: function () {},

            /**
             * Initialize the view with appropriate listeners
             * NOTE: this should not be overridden in a subclass - use post/preinitialize
             */
            initialize: function (inp) {
                var thisView = this;
                thisView.preinitialize(inp);
                thisView.listenTo(thisView.model, "render", thisView.render);
                thisView.render();
                thisView.postinitialize(inp);
            },

            /** override in subclass */
            postinitialize: function (inp) {},

            /** override in subclass */
            prerender: function (inp) {},

            /* Render the learning view given the supplied model. */
            render: function () {
                var thisView = this;
                thisView.prerender();
                thisView.postrender();
                return thisView;
            },

            /** override in subclass */
            postrender: function () {
                var thisView = this;
            },

            /* Handle listener config. */
            events: {
                "addNode #event-dispatcher": "handleAddNode",
                "connect #event-dispatcher": "handleConnect",
            },

            // Listener: add a node to the graph. 
            handleAddNode: function(e) {
                thisModel = this.model;
                thisView = this;
                detail = e.originalEvent.detail; 
                thisModel.addNode({
                    dependencies: undefined,
                    summary: detail.summary,
                    title: detail.title,
                    id: detail.title,
                });
            },

            // Listener: connect two nodes.  
            handleConnect: function(e) {
                thisModel = this.model;
                thisView = this;
                detail = e.originalEvent.detail; 
                thisModel.addEdge({
                    source: detail.parent, 
                    target: detail.child, 
                    isContracted: true,
                });
            }
        });
    })();
});
