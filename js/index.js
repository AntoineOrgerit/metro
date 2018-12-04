$(document).ready(function() {

 $.getJSON("json/data.json",function (data) {
    console.log(data);
     var graph = new Graph(data.ligne);
     console.log(graph.findShortestPath("Chatelet", 'Rambuteau'));
 });

});
