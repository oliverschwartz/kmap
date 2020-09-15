/*
TODOs: 
- pass in the Graph model to this model
- build logic for processing commands
*/

define(["backbone", "underscore"], function(Backbone, _, ){
    return Backbone.Model.extend({

        // Set up this model. 
        initialize: function(inp) {
            var thisModel = this; 
            thisModel.prompt = "> ";
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
