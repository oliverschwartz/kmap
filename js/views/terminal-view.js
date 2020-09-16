/*global define*/
define(["backbone", "underscore"], function (Backbone, _) {
    /**
     * Display the concepts as an item in the node list
     */
    return (function () {

        // return public object for node list item view
        return Backbone.View.extend({
            el: "#terminal-div",


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
                thisView.listenTo(thisView.model, "render", thisView.render);

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
                thisView.prerender();

                // Rendering logic.

                thisView.postrender();
                return thisView;
            },

            /** override in subclass */
            postrender: function () {
                var thisView = this;
            },

            /**
             * Change the title display properties given by prop
             */
            changeTitleClass: function (classVal, status) {
                if (status) {
                    this.$el.addClass(classVal);
                } else {
                    this.$el.removeClass(classVal);
                }
            },

            events: {
                "keyup #terminal-input": "handleTerminalInput", 
            },

            // Only send input to model if enter was pressed.
            handleTerminalInput: function(e) {
                if (e.keyCode == 13) {
                    console.log("user pressed enter!")
                }
            }
        });
    })();
});
