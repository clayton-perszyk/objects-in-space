(function() {
  'use strict';

  var app = angular.module("ObjectsInSpace")
    .controller('NEOController', NEOController);

  NEOController.$inject = ['$http'];

  function NEOController($http){
    var vm = this;

    vm.catagories = {
      size: {
        person: false,
        car: false,
        house: false,
        football: false,
        placeholder1: false,
        placeholder2: false,
        placeholder3: false,
        placeholder4: false,
        placeholder5: false,
        placeholder6: false,
        lake: false,
        todamnbig: false,
      },
      distance: {
        close: false,
        notsoclose: false,
        offinspacesomewhere: false,
      }
    };

    $http.get('/nearearthobjects').then(function(data){
      vm.objects = data.data;
      vm.objects[0].sizeCatagory = 'car';
      vm.objects[1].sizeCatagory = 'person';
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
