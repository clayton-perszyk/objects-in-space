var app = angular.module('ObjectsInSpace');

app.controller('ShowObjectController', ["$scope", "$http", "$routeParams", function($scope, $http, $routeParams){
  $http.get('/nearearthobjects/' + $routeParams.id).then(function(data){
    console.log(data);
    $scope.asteroid = data.data;
  });
}]);
