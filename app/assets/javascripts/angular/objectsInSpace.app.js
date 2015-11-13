(function () {
  angular.module('ObjectsInSpace',['ngRoute'])
    .config(requestHeaderConfig);

  requestHeaderConfig.$inject = ['$httpProvider'];

  function requestHeaderConfig($httpProvider) {
    $httpProvider.defaults.headers.common['X-CSRF-Token'] =
      $('meta[name=csrf-token]').attr('content');
  }

})();
