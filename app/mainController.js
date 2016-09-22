app.controller('MainCtrl', function($scope) {

var tags = [];
var intersections;
// $scope.myData = intersections;
$scope.myData = [ {sets: ['A'], size: 12},
                {sets: ['B'], size: 12},
                {sets: ['A','B'], size: 2}];
$scope.choices = [{id: '1'}];

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
          var arr1 = extractItem(choice.items); //the new added venn
          var arr2 = intersections[m].items.slice();//the items in the list
          interList = intersect(arr1,arr2);
          if(interList){
            obj.sets = [];
            obj.items = interList.slice();
            obj.sets.push(choice.id+'');
            for ( var z in intersections[m].sets){
              obj.sets.push(intersections[m].sets[z]);
            }
            // obj.sets.push(intersections[m].sets);
            obj.size = obj.items.length;
            newList.push(obj);
          }
        }
      }
      intersections = intersections.concat(newList);
      var choiceObj = {};
      choiceObj.sets = [];
      choiceObj.sets.push(choice.id+'');
      choiceObj.items = extractItem(choice.items).slice();
      choiceObj.size = choice.items.length;
      intersections.push(choiceObj);
    } else { //if the list is empty
      var obj = {};
      obj.sets = [];
      obj.sets.push(choice.id);
      obj.size = choice.items.length;
      obj.items =extractItem(choice.items);
      intersections.push(obj);
    }
  }
  $scope.myData =  intersections;

};
$scope.addToAutoComplete = function(tag){
  if(tags.indexOf(tag)===-1){
    tags.push(tag);
  }
};
$scope.addNewChoice = function() {
  $scope.createSets();
  var newItemNo = $scope.choices.length+1;
  $scope.choices.push({'id':newItemNo});

};

$scope.removeChoice = function(choice) {
  var index=$scope.choices.indexOf(choice);
  $scope.choices.splice(index,1);
};
$scope.loadTags = function(query) {
  return tags;
};

console.log($scope.choices.length);
});
