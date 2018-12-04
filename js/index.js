$(document).ready(function() {

 $.getJSON("json/data.json",function (data) {
    console.log(data);
     var graph = new Graph(data.graph);
     console.log(graph.findShortestPath("Chatelet", 'Rambuteau'));
 });

});
