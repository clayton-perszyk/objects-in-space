(function() {
  'use strict';
  angular.module('ObjectsInSpace')
    .filter('dateFilter', dateFilter);

  function dateFilter() {
    return function(items, catagories) {
      var today = moment().format('YYYY-MM-DD');
      var isPast = false;
      var isFuture = false;
      var filtered = [];
      var allFalse = true;
      for(var catagory in catagories) {
        if(catagories[catagory]) {
          allFalse = false;
        }
      }
      if (allFalse) {
        return items;
      }
      items.forEach(function(item) {
        isPast = false;
        isFuture = false;

        if(moment(item.close_approach_date).isBefore(today)) {
          isPast = true;
        }

        if(moment(item.close_approach_date).isAfter(today)) {
          isFuture = true;
        }

        if(catagories.today && moment(item.close_approach_date).isSame(today)) {
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
