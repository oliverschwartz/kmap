/*global define*/
define(["backbone", "underscore"], function (Backbone, _) {
    /**
     * Display the concepts as an item in the node list
     */
    return (function () {

        // return public object for node list item view
        return Backbone.View.extend({
            el: "#terminal-div",
            promptId: "#terminal-prompt",
            inputId: "#terminal-input",

            /** override in subclass */
            preinitialize: function () {},

            /**
             * Initialize the view with appropriate listeners
             * NOTE: this should not be overridden in a subclass - use post/preinitialize
             */
            initialize: function (inp) {
                var thisView = this;
                thisView.preinitialize(inp);

                // Create some listeners.
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

                // Rendering logic.;
                thisView.addNode();

                thisView.postrender();
                return thisView;
            },

            /** override in subclass */
            postrender: function () {
                var thisView = this;
            },

            events: {
                "keyup #terminal-input": "handleTerminalInput", 
            },

            // Add a node. 
            addNode: function() {
                thisModel = this.model;
                var node = {
                    "dependencies": undefined,
                    "summary": "Some summary information",
                    "id": 3,
                    "title": "third-node"
                };
                thisModel.addNode(node);
            },

            // Only send input to model if enter was pressed.
            handleTerminalInput: function(e) {
                if (e.keyCode == 13) {
                    var input = $(this.inputId).val();
                    console.log(input);
                    
                    // Split command by space. 
                    commandList = input.split(" ")
                    console.log(commandList)
                    // See what command was issued. 

                    // Issue a call to addNode, addEdge etc. 
                    
                    // console.log("user pressed enter!");
                }
            }
        });
    })();
});
