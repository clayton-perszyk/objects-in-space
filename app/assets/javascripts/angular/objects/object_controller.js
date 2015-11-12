var app = angular.module("ObjectsInSpace");

app.controller("ObjectController",['$scope', function ($scope){
  $scope.objects = [];
  $scope.sizeCategories = {
    small: true,
    big: true,
    superbig: true
  };
  var object = {};
  var object2 = {};
  $scope.order = 'name';
  object.name = '2010 PK9';
  object.size = 0.1160259082;
  object.close_approach_date = "1990/6/1";
  object.close_approach_distance = 6659408.5;
  object.velocity = 30.942357826;
  object.sizeCatagory = 'big';
  $scope.objects.push(object);

  object2.name = '1999 VF22';
  object2.size = 0.2111324448;
  object2.close_approach_date = "2016/02/18";
  object2.close_approach_distance = 14097968;
  object2.velocity = 28.0780565472;
  object2.sizeCatagory = 'superbig';
  $scope.objects.push(object2);

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
