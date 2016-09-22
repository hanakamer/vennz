// (function() {
//   console.log('hana');
//
//     angular
//         .module("vennApp", [])
//         .controller("MainCtrl", MainCtrl);
//
//     MainCtrl.$inject = ["$scope"];
//
//     function MainCtrl($scope) {
//
//       $scope.choices = [{id: 'choice1'}, {id: 'choice2'}];
//
//       $scope.addNewChoice = function() {
//         var newItemNo = $scope.choices.length+1;
//         $scope.choices.push({'id':'choice'+newItemNo});
//       };
//
//       $scope.removeChoice = function() {
//         var lastItem = $scope.choices.length-1;
//         $scope.choices.splice(lastItem);
//       };
//     }
//
// })();

var app = angular.module('vennApp', ['ngTagsInput']);
