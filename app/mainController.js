app.controller('MainCtrl', function($scope) {
var nodes=[];
var intersections;
$scope.nodeInfo = [];
// $scope.myData = intersections;
$scope.myData = [ {sets: ['A'], size: 12},
                {sets: ['B'], size: 12},
                {sets: ['A','B'], size: 2}];
$scope.nodez = [
      {"name":"a","set":["1","2"],"r":8},
    {"name":"b","set":["1"],"r":8},
    {"name":"c","set":["1"],"r":8},
    {"name":"d","set":["2"],"r":8},
    {"name":"f","set":["2"],"r":8}
  ];
$scope.nodesData = [];
$scope.choices = [{id: '1'}];
function getOnlyNodes(array){
  var myArray = [];
  for (var index in array){
    var val = Object.keys(array[index]).map(function(key){
    return array[index][key];
  });
  myArray.push(val[0]);
  }
  return myArray;
}


function containsObject(obj, list){
  for (var i in list){
    if(Object.keys(list[i])[0] === Object.keys(obj)[0]){
      var nodeName = Object.keys(list[i])[0];
      return list[i][nodeName];
    }
  }
  return false;
}
function extractItem(array){
  var extractedArray = [];
  for (var i = 0; i < array.length; i++){
    extractedArray.push(array[i].text);
  }
  return extractedArray;
}
function combinations(str) {
    var fn = function(active, rest, a) {
        if (!active && !rest)
            return;
        if (!rest) {
            a.push(active);
        } else {
            fn(active + rest[0], rest.slice(1), a);
            fn(active, rest.slice(1), a);
        }
        return a;
    };
    return fn("", str, []);
}
function intersect(a, b) {
    var t;
    if (b.length > a.length) {
      t = b;
      b = a;
      a = t;
    } // indexOf to loop over shorter
    return a.filter(function (e) {
        if (b.indexOf(e) !== -1) return true;
    });
}
function modifySets(obj){
  var newSet;
  var myList = [];
  for (var i = 0; i < obj.nodes.length; i++){
    newSet = {};
    newSet.r = 8;
    newSet.set = obj.sets;
    newSet.name = obj.nodes[i];
    myList.push(newSet);
  }
  return myList;
}
$scope.createSets = function(){
  var venn;
  intersections = [];
  for(var i = 0; i < $scope.choices.length; i++ ){
    venn = {sets:[], size : 0};
    var choice = $scope.choices[i];
    if (intersections.length !== 0){
      // look for intersections
      var interList;
      var newList = [];
      for(var m = 0; m < intersections.length; m++){//loop the old list
        if(intersections[m]){
          var obj = {};
          var arr1 = extractItem(choice.nodes); //the new added venn
          var arr2 = intersections[m].nodes.slice();//the items in the list
          interList = intersect(arr1,arr2);
          if(interList){
            obj.sets = [];
            obj.nodes = interList.slice();
            obj.sets.push(choice.id+'');
            for ( var z in intersections[m].sets){
              obj.sets.push(intersections[m].sets[z]);
            }
            // obj.sets.push(intersections[m].sets);
            obj.size = obj.nodes.length;
            newList.push(obj);
          }
        }
      }
      intersections = intersections.concat(newList);
      var choiceObj = {};
      choiceObj.sets = [];
      choiceObj.sets.push(choice.id+'');
      choiceObj.nodes = extractItem(choice.nodes).slice();
      choiceObj.size = choice.nodes.length;
      intersections.push(choiceObj);
    } else { //if the list is empty
      var obj = {};
      obj.sets = [];
      obj.sets.push(choice.id);
      obj.size = choice.nodes.length;
      obj.nodes =extractItem(choice.nodes);
      intersections.push(obj);
    }
  }
  $scope.myData =  intersections;
  // $scope.nodesData = [];
  // for(var index in intersections){
  //   console.log(index,intersections[index],intersections);
  //   var setList = modifySets(intersections[index]);
  //   for (var n in setList){
  //     $scope.nodesData.push(setList[n]);
  //   }
  //   // $scope.nodesData.push(createSets(intersections[index]))
  // }

};
$scope.addNode = function(node, set){
  var Node = {};
  var nodeObj = {};
  nodeObj.name = node.text;
  nodeObj.set = [];
  nodeObj.set.push(set);
  nodeObj.r = 15;
  Node[node.text]= nodeObj;

  if(containsObject(Node, $scope.nodesData)){
    var oldObj = containsObject(Node, $scope.nodesData);
    oldObj.set.push(nodeObj.set[0]);
  } else{
    $scope.nodesData.push(Node);
  }

};
$scope.addNewChoice = function() {
  $scope.nodez = getOnlyNodes($scope.nodesData);
  $scope.createSets();
  var newItemNo = $scope.choices.length+1;
  $scope.choices.push({'id':newItemNo});
};
$scope.removeChoice = function(choice) {
  var index=$scope.choices.indexOf(choice);
  $scope.choices.splice(index,1);
  $scope.createSets();
};
$scope.loadTags = function(query) {
  return tags;
};
});
