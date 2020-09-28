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
            // promptId: "#terminal-prompt",
            // inputId: "#terminal-input",

            /** override in subclass */
            preinitialize: function () {},

            /**
             * Initialize the view with appropriate listeners
             * NOTE: this should not be overridden in a subclass - use post/preinitialize
             */
            initialize: function (inp) {
                var thisView = this;
                thisView.preinitialize(inp);

                // Add listeners.
                this.el.addEventListener("cat", this.handleCat);
                this.el.addEventListener("addNode", this.handleAddNode);

                // thisView.listenTo(thisView.model, "render", thisView.render);
                thisView.render();

                thisView.postinitialize(inp);
            },

            /** override in subclass */
            postinitialize: function (inp) {},

            /** override in subclass */
            prerender: function (inp) {},

            /**
             * Render the learning view given the supplied model
             */
            render: function () {
                var thisView = this;
                var thisModel = this.model;
                thisView.prerender();

                // Rendering logic.
                thisView.addNode();
                
                thisView.postrender();
                return thisView;
            },

            /** override in subclass */
            postrender: function () {
                var thisView = this;
            },

            events: {
                "click #terminal-header": "handleClick"
            },

            handleClick: function(e) {
                console.log("terminal clicked");
            },

            handleCat: function(e) {
                console.log("handling cat");
            },
            
            handleAddNode: function(e) {
                console.log("summary: " + e.summary);
                console.log("title: " + e.title);
                this.foo();
                thisView.addNode([], e.summary, e.title);
            },

            foo: function() {console.log("foo")},

            // Add a node.
            addNode: function (dependencies, summary, title) {
                thisModel = this.model;
                var node = {
                    dependencies: undefined,
                    summary: "Some summary information",
                    id: this.nextId,
                    title: "third-node",
                };
                this.nextId++;
                thisModel.addNode(node);
            },
        });
    })();
});
