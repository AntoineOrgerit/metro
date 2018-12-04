$(document).ready(function() {

 $.getJSON("json/data.json",function (data) {
    console.log(data);
     var graph = new Graph(data.ligne[11]);
     console.log(graph.findShortestPath("Chatelet", 'Rambuteau'));
 });

});
