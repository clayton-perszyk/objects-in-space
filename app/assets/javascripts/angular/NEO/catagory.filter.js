(function() {
  'use strict';
  angular.module('ObjectsInSpace')
    .filter('catagoryFilter', catagoryFilter);

  function catagoryFilter() {

    return function(items, types, catagoryTitle) {
      if(!items) {
        return items;
      }
      var filtered = [];
      var catagories = Object.keys(types);
      var allfalse = true;
      if(items) {
        for(var type in types) {
          if(types[type]) {
            allfalse = false;
          }
        }
        if (allfalse) {
          return items;
        }
        for (var i = 0; i < items.length; i++) {
          for (var j = 0; j < catagories.length; j++) {
            if(items[i][catagoryTitle] === catagories[j] && types[catagories[j]]) {
              filtered.push(items[i]);
            }
          }
        }
      }
      return filtered;
    };
  }
})();
