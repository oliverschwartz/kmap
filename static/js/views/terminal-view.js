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
                "removeNode #event-dispatcher": "handleRemoveNode",
                "connect #event-dispatcher": "handleConnect",
                "save #event-dispatcher": "handleSave",
            },

            // Listener: add a node to the graph. 
            handleAddNode: function(e) {
                thisModel = this.model;
                thisView = this;
                detail = e.originalEvent.detail; 
                title = detail.title; 
                summary = detail.summary; 

                // Check if this node already exists. 
                if (thisModel.getNode(title) != undefined) {
                    thisModel.getNode(title).attributes.summary = summary;
                    return;
                }
                    
                // TODO: should we specific a node id? 
                thisModel.addNode({
                    dependencies: undefined,
                    summary: detail.summary,
                    title: title,
                    id: detail.title,
                });
                
                thisModel.trigger("refreshModel");
            },

            // Listener: remove a node. 
            handleRemoveNode: function(e) {
                thisModel = this.model;
                thisView = this;
                title = e.originalEvent.detail.title; 

                // Ensure such a node exists. 
                node = thisModel.getNode(title);
                if (node != undefined) {
                    thisModel.removeNode(node);
                } else {                        
                    alert("removeNode: node must be present in graph.");
                }
                
                thisModel.trigger("refreshModel");
            },

            // Listener: connect two nodes.  
            handleConnect: function(e) {

                // TODO: handle case where an edge already exists.

                thisModel = this.model;
                thisView = this;
                detail = e.originalEvent.detail; 

                // Corner case: one/both nodes aren't present.
                if (thisModel.getNode(detail.parent) == undefined || 
                    thisModel.getNode(detail.child) == undefined) {
                    alert("connect: nodes must be present in graph.");
                    return
                } 

                // Add the edge to the model. 
                thisModel.addEdge({
                    source: detail.parent, 
                    target: detail.child, 
                    isContracted: true,
                });

                thisModel.trigger("refreshModel");

                // Set the focus on the parent, then toggle the focus. 
                thisModel.trigger("setFocusNode", detail.parent);
                thisModel.trigger("toggleNodeScope", detail.parent);
                thisModel.trigger("showAllTrigger", detail.parent);

            }, 

            // Listener: save the graph. 
            handleSave: function(e) {
                console.log("handling save")
                obj = []

                thisModel = this.model; 
                nodes = thisModel.getNodes(); 
                console.log(nodes.models);
                nodes.models.forEach(function(node) {
                    console.log(node.attributes);
                    obj.push({
                        "dependencies": node.attributes.dependencies, 
                        "summary": node.attributes.summary,
                        "id": node.attributes.id,
                        "title": node.attributes.title,
                    })
                });

            
                // TODO: figure out some way of writing this to cloud storage?                     
                database.ref().set({'some-graph-id': obj});
            }
        });
    })();
});
