// require application.js

describe('date filter', function() {
  var dateFilter, $filter, catagories sampleData;

  beforeEach(function() {
    module('ObjectsInSpace');
    inject(function($injector) {
      $filter = $injector.get('$filter');
      dateFilter = $filter('dateFilter');
    });

    var today = new Date;
    var todayString = today.getFullYear() + '-' + ('0' +(today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getMonth()).slice(-2);
    catagories = {
      date: {
        'past': false,
        'today': false,
        'future': false
      }
    };
    var sampleData = [
            {
              id: 1,
              name: "(2013 UC1)",
              close_approach_date: "9999-99-99",
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
            },
            {
              id: 3,
              name: "(2015 TN145)",
              close_approach_date: todayString,
              close_approach_distance: 21,
              velocity: 7,
              size: 49,
              sizeCatagory: "skyscraper",
              pha: false,
              distanceCatagory: "0 - 200",
              nickname: null
            }
          ];
  });

  it('Should return null when null is passed', function() {
    expect(dateFilter(null, null)).toBeNull();
  });

  it('Should return undefined when undefined is passed', function() {
    expect(dateFilter(undefined, undefined)).toBeUndefined();
  });

  it('Should return all objects if all data catagories is false', function() {
    expect(dataFilter(sampleData, catagories).length).toBe(3);
  });

  it('Should return only future objects if just the future data catagories is true', function() {
    catagories.future = true;
    expect(dataFilter(sampleData, catagories).length).toBe(1);
  });

  it('Should return only past objects if only the past data catagories is true', function() {
    catagories.past = true;
    expect(dataFilter(sampleData, catagories).length).toBe(1);
  });

  it('Should return only today objects if only the today data catagories is true', function() {
    catagories.today = true;
    expect(dataFilter(sampleData, catagories).length).toBe(1);
  });

  it('Should return both future and past if both the future and past catagories is true', function() {
    catagories.past = true;
    catagories.future = true;
    expect(dataFilter(sampleData, catagories).length).toBe(2);
  });

});
