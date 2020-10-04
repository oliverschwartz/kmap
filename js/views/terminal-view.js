/*global define*/
define(["backbone", "underscore"], function (Backbone, _) {
    /**
     * Display the concepts as an item in the node list
     */
    return (function () {
        // return public object for node list item view
        return Backbone.View.extend({
            el: "#terminal",
            nextId: 3,

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
                "click #terminal-header": "handleClick", 
                "cat #event-dispatcher": "handleCat", 
                "addNode #event-dispatcher": "handleAddNode"
            },

            handleClick: function(e) {
                console.log("terminal clicked");
            },

            handleCat: function(e) {
                console.log("handling cat");
            },
           
            // Listener: add a node to the graph. 
            handleAddNode: function(e) {
                thisModel = this.model;
                detail = e.originalEvent.detail; 

                // Create the node. 
                var node = {
                    dependencies: undefined,
                    summary: detail.summary,
                    title: detail.title,
                    id: this.nextId,
                };

                // Increment our ID counter.
                this.nextId++;
                thisModel.addNode(node);
            },
        });
    })();
});
