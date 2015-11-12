(function() {
  'use strict';
  angular.module('ObjectsInSpace')
    .filter('sizeFilter', sizeFilter);


  function sizeFilter() {
     return function(items, types) {
       var filtered = [];
       for (var i in items) {
         if(items[i].sizeCatagory === 'small' && types.small) {
           filtered.push(items[i]);
         } else if (items[i].sizeCatagory === 'big' && types.big) {
           filtered.push(items[i]);
         } else if (items[i].sizeCatagory === 'superbig' && types.superbig) {
           filtered.push(items[i]);
         }
       }
       return filtered;
    };
  }

})();
