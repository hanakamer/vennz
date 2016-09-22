app.directive('vennArea', function ($parse) {
  console.log('venn directive worked');
  var directiveDefinitionObject = {
      restrict: 'EA',
      replace: false,
      scope: {data: '=chartData'},
      link: function (scope, element, attrs) {
        var chart = venn.VennDiagram();
        chart.wrap(false)
            .width(100)
            .height(150);
        var div = d3.select("#venn").datum(scope.data).call(chart);
        div.selectAll("text").style("fill", "white");
        div.selectAll(".venn-circle path").style("fill-opacity", 0.6);

        scope.$watch('data',function(newValue){
          var div = d3.select("#venn").datum(newValue).call(chart);
          div.selectAll("text").style("fill", "white");
          div.selectAll(".venn-circle path").style("fill-opacity", 0.6);
        }, true);

      }
   };
   return directiveDefinitionObject;
});
