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
            events: {
                "keyup #terminal-input": "handleTerminalInput", 
            },

            /** override in subclass */
            preinitialize: function () {},

            /**
             * Initialize the view with appropriate listeners
             * NOTE: this should not be overridden in a subclass - use post/preinitialize
             */
            initialize: function (inp) {
                this.preinitialize(inp);

                // Create some listeners.
                this.listenTo(this.model, 'changeInput', function() {
                    this.$(this.inputId).val("");
                });

                this.postinitialize(inp);
            },

            /** override in subclass */
            postinitialize: function (inp) {},

            /** override in subclass */
            prerender: function (inp) {},

            /**
             * Render the learning view given the supplied model
             */
            render: function () {
                this.prerender();

                // Rendering logic.
                this.$(this.promptId).html(this.model.get("prompt"))

                this.postrender();
                return this;
            },

            /** override in subclass */
            postrender: function () {},

            // Only send input to model if enter was pressed.
            handleTerminalInput: function(e) {
                if (e.keyCode == 13) { // Enter key. 
                    this.model.trigger("processCommand", e.target.value)
                }
            }
        });
    })();
});
