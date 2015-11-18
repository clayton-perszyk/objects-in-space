(function() {
  'use strict';

  var app = angular.module("ObjectsInSpace")
    .controller('NEOController', NEOController);

  NEOController.$inject = ['$http', '$routeParams'];

  function NEOController($http, $routeParams){
    var vm = this;
    vm.catagories = {
      size: {
        'person': false,
        'house': false,
        'football field': false,
        'skyscraper': false,
        'city': false,
        'great lake': false,
        'too damn big': false,
      },
      distance: {
        '0 - 50': false,
        '50 - 100': false,
        '100 - 150': false,
        '150+': false
      },
      date: {
        'past': false,
        'today': false,
        'future': false
      }
    };

    if($routeParams.q === 'filtered') {
      vm.catagories.date.today = true;
    }

    $http.get('/nearearthobjects').then(function(data){
      vm.objects = data.data;
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
