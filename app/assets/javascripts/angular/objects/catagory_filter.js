(function() {
  'use strict';
  angular.module('ObjectsInSpace')
    .filter('catagoryFilter', catagoryFilter);


  function catagoryFilter() {
     return function(items, types) {
       var filtered = [];
       var catagories = _.keys(types);
       for (var i in items) {
         catagories.forEach(function(catagory) {
           if(items[i].sizeCatagory === catagory && types[catagory]) {
             filtered.push(items[i]);
           }
         });
       }
       return filtered;
     };
   }

})();
