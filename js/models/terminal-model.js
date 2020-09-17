/*
TODOs: 
- pass in the Graph model to this model
- build logic for processing commands
*/

define(["backbone", "underscore"], function(Backbone, _, ){
    return Backbone.Model.extend({

        /* Event Listeners:
         * Triggered by the terminal view. 
         * Update state of the model.
         */
        // Process the terminal command.
        processCommand: function(cmd) {
            this.trigger("changeInput");
        },

        // Set attributes. 
        setAttributes: function() {
            this.set({
                "prompt": "> "
            })
        },

        // Set up this model. 
        initialize: function(inp) {
            this.setAttributes();

            // Set up listeners.
            this.on("processCommand", function(cmd) {
                this.processCommand(cmd)
            }); 
        },
    });
});
