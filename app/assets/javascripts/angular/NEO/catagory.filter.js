(function() {
  'use strict';
  angular.module('ObjectsInSpace')
    .filter('catagoryFilter', catagoryFilter);


  function catagoryFilter() {

     return function(items, types) {
       var filtered = [];
       var catagories = _.keys(types);
       for (var i = 0; i < items.length; i++) {
         for (var j = 0; j < items.length; j++) {
           if(items[i].sizeCatagory === catagories[j] && types[catagories[j]]) {
            filtered.push(items[i]);
           }
         }
       }
       return filtered;
     };
   }

})();
