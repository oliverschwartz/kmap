// development testing script - not used for library

require.config({
    baseUrl: "../js"
  });
  
  
  /*global require, KMap, $*/
  require(["main"], function(KMap){

    // create the model/settings so we can pass it into the views
    var graphModel = new KMap.GraphModel(),
        settings = {model: graphModel, useWisps: false,  graphDirection: "TB", showTransEdgesWisps: true};
    // var terminalModel = new KMap.TerminalModel()
  
    var graphView = new KMap.GraphView(settings),
        graphListView = new KMap.GraphListView({model: graphModel});
    
    var terminalView = new KMap.TerminalView({model: graphModel}); 
  
    var handleDataFun = function (data) {
      console.log(data)

      database.ref("some-graph-id").once('value').then(function(snapshot) {
        console.log(data)

        // add the data to the graph model
        graphModel.addJsonNodesToGraph(data);
    
        // set the graph placement (don't use if "x" and "y" are specified in the data)
        graphView.optimizeGraphPlacement(false, false);
    
        // render the views
        graphView.render();
        graphListView.render();
        terminalView.render(); 
    
        // insert them into the html
        console.log(graphListView.$el);
        $("body").prepend(graphListView.$el);
        $("#graph-view-wrapper").append(graphView.$el);
        $("#terminal-view-wrapper").append(terminalView.$el);
    
        // TODO integrate this into the view
        var $wrap = $(document.body);
        $wrap.height($(window).height());
        $(window).resize(function () {
          $wrap.height($(window).height());
        });
    
        // center on a leaf element
        var topoSortList = graphModel.getTopoSort();
        graphView.centerForNode(graphModel.getNode(topoSortList[topoSortList.length -1]));
    
      })

    };
  
    // fetch some graph data
    obj = [
        {
            "dependencies": [],
            "summary": "Machine learning (ML) is the study of computer algorithms that improve automatically through experience.",
            "id": "Machine Learning",
            "title": "Machine Learning"
        },
        {
            "dependencies": [],
            "summary": "Naive Bayes classifiers are a family of simple probabilistic classifiers based on applying Bayes' theorem with stg Bayes' theorem with strong (naïve) independence assumptions between the features. They are among the simplest Bayesian network models.",
            "id": "Naive Bayes",
            "title": "Naive Bayes"
        }
    ]
    handleDataFun(obj);
  
  });
  