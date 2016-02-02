// require application.js
describe("NEOShow controller", function() {

  var sampleData, controller, $httpBackend;
  beforeEach(function() {
    module('ObjectsInSpace')
    inject(function($injector) {
      controller = $injector.get('$controller')('NEOShowController', {$routeParams: {id: '1'}});
      $httpBackend = $injector.get("$httpBackend");
    });

    sampleData =
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
      }
  });


  describe('asteroid object', function() {

    it("should be undefined on initialization", function() {
      expect(controller.asteroid).toBe(undefined);
    });

    it("should set objects to the respones of http Request", function() {
      $httpBackend.expectGET('/nearearthobjects/1').respond(200, sampleData);
      $httpBackend.flush();
      expect(controller.asteroid).toEqual(sampleData);
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
  });
});
