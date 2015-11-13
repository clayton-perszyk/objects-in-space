(function() {
  'use strict';

  angular.module('ObjectsInSpace')
    .controller('NEOShowController', NEOShowController);

  NEOShowController.$inject = ["$http", "$routeParams"];

  function NEOShowController($http, $routeParams){
    var vm = this;
    $http.get('/nearearthobjects/' + $routeParams.id).then(function(data){
      vm.asteroid = data.data;
    });
  }
})();
