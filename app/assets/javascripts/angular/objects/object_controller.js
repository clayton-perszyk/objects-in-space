var app = angular.module("ObjectsInSpace");


app.controller("ObjectController",['$scope', "$http", function ($scope, $http){
  $scope.sizeCategories = {
    small: true,
    big: true,
    superbig: true
  };
  
  $http.get('/nearearthobjects').then(function(data){
    $scope.objects = data.data;
  });

  $scope.orderBy = function(newOrder) {
    if($scope.order === newOrder) {
      if($scope.order.indexOf('-') != -1) {
        $scope.order.split('-').splice(0,1).join('');
      } else {
        $scope.order = '-' + newOrder;
      }
    } else {
      $scope.order = newOrder;
    }

  };
}]);
