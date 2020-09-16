/*
TODOs: 
- pass in the Graph model to this model
- build logic for processing commands
*/

define(["backbone", "underscore"], function(Backbone, _, ){
    return Backbone.Model.extend({

        // Set attributes. 
        setAttributes: function() {
            this.set({
                "prompt": "> "
            })
        },

        // Set up this model. 
        initialize: function(inp) {
            var thisModel = this; 
            thisModel.setAttributes();
        },


        // Update the terminal prompt.
        updatePrompt: function(newPrompt) {
            thisModel.prompt = newPrompt; 
        },


        // Process the terminal command.
        processCommand: function(cmd) {
            // TODO            
        }
    });
});
