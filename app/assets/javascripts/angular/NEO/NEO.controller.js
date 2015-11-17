(function() {
  'use strict';

  var app = angular.module("ObjectsInSpace")
    .controller('NEOController', NEOController);

  NEOController.$inject = ['$http'];

  function NEOController($http){
    var vm = this;

    vm.catagories = {
      size: {
        'person': false,
        'house': false,
        'football field': false,
        'skyscraper': false,
        'city': false,
        'lake': false,
        'to damn big': false,
      },
      distance: {
        '0 - 200': false,
        '200 - 400': false,
        '400 - 600': false,
        '600+': false
      }
    };

    $http.get('/nearearthobjects').then(function(data){
      console.log(data.data);
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
