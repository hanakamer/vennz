app.directive('vennArea', function ($parse) {
  console.log('venn directive worked');
  var directiveDefinitionObject = {
      restrict: 'E',
      replace: false,
      scope: {data: '=chartData', nodes:'='},
      link: function (scope, element, attrs) {
        // var chart = venn.VennDiagram();
        // chart.wrap(false)
        //     .width(100)
        //     .height(150);
        // var div = d3.select("#venn").datum(scope.data).call(chart);
        // div.selectAll("text").style("fill", "white");
        // div.selectAll(".venn-circle path").style("fill-opacity", 0.6);
        //
        // scope.$watch('data',function(newValue){
        //   var div = d3.select("#venn").datum(newValue).call(chart);
        //   div.selectAll("text").style("fill", "white");
        //   div.selectAll(".venn-circle path").style("fill-opacity", 0.6);
        // }, true);


        // ================================================================

        var data = scope.data;
        var chart = venn.VennDiagram()
                 .width(400)
                 .height(400);

        function drawVenn(sets){
          var div = d3.select("#venn")
          div.datum(sets).call(chart);

          var tooltip = d3.select("body").append("div")
              .attr("class", "venntooltip");

          div.selectAll("path")
              .style("stroke-opacity", 0)
              .style("stroke", "#fff")
              .style("stroke-width", 3)

          div.selectAll("g")
              .on("mousedown", function(d,i){
                scope.nodes = d.nodes
                console.log(d.nodes);
              })
              .on("mouseover", function(d, i) {
                  // sort all the areas relative to the current item
                  venn.sortAreas(div, d);

                  // Display a tooltip with the current size
                  tooltip.transition().duration(400).style("opacity", .9);
                  tooltip.text(d.size + " users");

                  // highlight the current path
                  var selection = d3.select(this).transition("tooltip").duration(400);
                  selection.select("path")
                      .style("fill-opacity", d.sets.length == 1 ? .4 : .1)
                      .style("stroke-opacity", 1);
              })

              .on("mousemove", function() {
                  tooltip.style("left", (d3.event.pageX) + "px")
                         .style("top", (d3.event.pageY - 28) + "px");
              })

              .on("mouseout", function(d, i) {
                  tooltip.transition().duration(400).style("opacity", 0);
                  var selection = d3.select(this).transition("tooltip").duration(400);
                  selection.select("path")
                      .style("fill-opacity", d.sets.length == 1 ? .25 : .0)
                      .style("stroke-opacity", 0);
              });

        }
        drawVenn(data);

        scope.$watch('data',function(newValue){
          drawVenn(newValue);
        }, true);

      }
   };
   return directiveDefinitionObject;
});
