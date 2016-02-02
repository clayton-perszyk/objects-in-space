// require application.js

describe('date filter', function() {
  var dateFilter, $filter, catagories, sampleData;

  beforeEach(function() {
    module('ObjectsInSpace');
    inject(function($injector) {
      $filter = $injector.get('$filter');
      dateFilter = $filter('dateFilter');
    });
    var today = moment().format('YYYY-MM-DD');
    date = {
        'past': false,
        'today': false,
        'future': false
      }

    sampleData = [
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
              close_approach_date: today,
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

  it('Should return all objects if all date values are false', function() {
    expect(dateFilter(sampleData, date).length).toBe(3);
  });

  it('Should return only future objects if just the date.future is true', function() {
    date.future = true;
    expect(dateFilter(sampleData, date).length).toBe(1);
  });

  it('Should return only past objects if only the date.past is true', function() {
    date.past = true;
    expect(dateFilter(sampleData, date).length).toBe(1);
  });

  it('Should return only today objects if only the date.today is true', function() {
    date.today = true;
    expect(dateFilter(sampleData, date).length).toBe(1);
  });

  it('Should return both future and past objects if both the date.future and date.past is true', function() {
    date.past = true;
    date.future = true;
    expect(dateFilter(sampleData, date).length).toBe(2);
  });

});
