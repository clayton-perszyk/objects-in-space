(function() {
  'use strict';

  var app = angular.module("ObjectsInSpace")
    .controller('NEOController', NEOController);

  NEOController.$inject = ['$http'];

  function NEOController($http){
    var vm = this;

    vm.sizeCategories = {
      small: true,
      big: true,
      superbig: true
    };

    $http.get('/nearearthobjects').then(function(data){
      vm.objects = data.data;
      vm.objects[0].sizeCatagory = 'big';
      vm.objects[1].sizeCatagory = 'small';
    });

    vm.orderBy = function(newOrder) {
      if(vm.order === newOrder) {
        if(vm.order.indexOf('-') != -1) {
          vm.order.split('-').splice(0,1).join('');
        } else {
          vm.order = '-' + newOrder;
        }
      } else {
        vm.order = newOrder;
      }

    };
  }
})();
