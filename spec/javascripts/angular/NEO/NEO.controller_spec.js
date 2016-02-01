// require application.js
describe("NEO controller", function() {

  var controller, routeParams, httpBackend, $http;
  beforeEach(function() {
    module('ObjectsInSpace')
    inject(function($injector) {
      controller = $injector.get('$controller')('NEOController');
      httpBackend = $injector.get("$httpBackend");
      $http = $injector.get('$http');
    });
  });

  describe("Catagories object", function() {

    it('Should not be undefined or null', function() {
      expect(controller.catagories).not.toBe(null);
      expect(controller.catagories).not.toBe(undefined);
    });

    it('All Catagories should be false by default', function() {
        for(var catagory in controller.catagories) {
          for(var prop in controller.catagories[catagory]) {
            expect(controller.catagories[catagory][prop]).toBe(false);
          }
        }
    });

    it('If $routeParams.q is set to "filtered" catagories.data.today should be true', function() {
      inject(function($controller) {
        controller = $controller('NEOController', {$routeParams: {q: "filtered"}});
      });
      expect(controller.catagories.date.today).toBe(true);
    });
  });

  describe("orderBy", function(){

    it("Order should be undefined on initialization", function() {
      expect(controller.order).toBe(undefined)
    });

    it("order should equal size after newOrder('size')", function() {
      controller.orderBy('size');
      expect(controller.order).toBe('size');
    });

    it("order should equal -size after newOrder('size') is called twice", function() {
      controller.orderBy('size');
      controller.orderBy('size');
      expect(controller.order).toBe('-size');
    });

    it("order should equal size after newOrder('size') is called three times", function() {
      controller.orderBy('size');
      controller.orderBy('size');
      controller.orderBy('size');
      expect(controller.order).toBe('size');
    });

    it("order should be able to change to different catagories", function() {
      controller.orderBy('size');
      controller.orderBy('size');
      controller.orderBy('velocity');
      expect(controller.order).toBe('velocity');
    });
  });

  describe('objects object', function() {

    it("should be undefined on initialization", function() {
      expect(controller.object).toBe(undefined);
    });

    it("should set objects to the respones of http Request", function() {
      var sampleData = [
        {
          id: 1,
          name: "(2013 UC1)",
          close_approach_date: "2015-10-22",
          close_approach_distance: 52,
          velocity: 7,
          size: 49,
          sizeCatagory: "skyscraper",
          pha: false,
          distanceCatagory: "0 - 200",
          nickname: null
        },
        {
          id: 2,
          name: "(2012 BD14)",
          close_approach_date: "2015-10-22",
          close_approach_distance: 101,
          velocity: 6,
          size: 21,
          sizeCatagory: "skyscraper",
          pha: false,
          distanceCatagory: "0 - 200",
          nickname: null
        }
      ];
      httpBackend.expectGET('/nearearthobjects').respond(200, sampleData);
      httpBackend.flush();
      expect(controller.objects).toEqual(sampleData);
      httpBackend.verifyNoOutstandingExpectation();
      httpBackend.verifyNoOutstandingRequest();
    });
  });
});
