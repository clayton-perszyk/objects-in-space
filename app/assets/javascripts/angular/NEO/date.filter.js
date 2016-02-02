(function() {
  'use strict';
  angular.module('ObjectsInSpace')
    .filter('dateFilter', dateFilter);

  function dateFilter() {
    return function(items, catagories) {
      var today = moment();
      var isPast = false;
      var isFuture = false;
      var filtered = [];
      var allFalse = true;
      for(var catagory in catagories) {
        if(catagories[catagory]) {
          allFalse = false;
          console.log('test');
        }
      }
      if (allFalse) {
        return items;
      }
      items.forEach(function(item) {
        isPast = false;
        isFuture = false;

        if(moment(item.close_approach_date) < today) {
          isPast = true;
        }

        if(moment(item.close_approach_date) > today && item.close_approach_date !== today.format('YYYY-MM-DD')) {
          isFuture = true;
        }

        if(catagories.today && item.close_approach_date === today.format('YYYY-MM-DD')) {
          filtered.push(item);
        } else if(catagories.past && isPast) {
          filtered.push(item);
        } else if(catagories.future && isFuture) {
          filtered.push(item);
        }
      });
      return filtered;
    };
  }

})();
