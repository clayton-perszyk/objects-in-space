var app = angular.module('ObjectsInSpace');

app.controller('ShowObjectController', ["$scope", "$http", "$routeParams", function($scope, $http, $routeParams){
  $http.get('/nearearthobjects/' + $routeParams.id).then(function(data){
    console.log(data);
    $scope.asteroid = data.data;
  });
  // $scope.asteroid = {
  //   name: '2010 PK9',
  //   size: 0.1160259082,
  //   close_approach_date: "1990/6/1",
  //   close_approach_distance: 6659408.5,
  //   velocity: 30.942357826
  // };
}]);
