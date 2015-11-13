(function() {
  'use strict';
  angular.module('ObjectsInSpace')
    .filter('catagoryFilter', sizeFilter);


  function sizeFilter() {
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

//     else if (items[i].sizeCatagory === 'big' && types.big) {
//      filtered.push(items[i]);
//    } else if (items[i].sizeCatagory === 'superbig' && types.superbig) {
//      filtered.push(items[i]);
//    }
//  }
