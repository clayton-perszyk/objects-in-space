// require application.js

describe('catagoryFilter filter', function() {
  var catagoryFilter, $filter, catagories, sampleData;

  beforeEach(function() {
    module('ObjectsInSpace');
    inject(function($injector) {
      $filter = $injector.get('$filter');
      catagoryFilter = $filter('catagoryFilter');
    });

    catagories = {
      size: {
        'person': false,
        'house': false,
        'football field': false,
        'skyscraper': false,
        'city': false,
        'great lake': false,
        'too damn big': false,
      },
      distance: {
        '0 - 50': false,
        '50 - 100': false,
        '100 - 150': false,
        '150+': false
      }
    };

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
              distanceCatagory: "0 - 50",
              nickname: null
            },
            {
              id: 2,
              name: "(2012 BD14)",
              close_approach_date: "2015-10-22",
              close_approach_distance: 101,
              velocity: 6,
              size: 21,
              sizeCatagory: "great lake",
              pha: false,
              distanceCatagory: "50 - 100",
              nickname: null
            },
            {
              id: 3,
              name: "(2015 TN145)",
              close_approach_date: "2015-10-22",
              close_approach_distance: 21,
              velocity: 7,
              size: 49,
              sizeCatagory: "person",
              pha: false,
              distanceCatagory: "150+",
              nickname: null
            }
          ];
  });

  it('Should return null when null is passed', function() {
    expect(catagoryFilter(null, null, null)).toBeNull();
  });

  it('Should return undefined when undefined is passed', function() {
    expect(catagoryFilter(undefined, undefined, undefined)).toBeUndefined();
  });

  it('Should return all object if no catagory is selected', function() {
    expect(catagoryFilter(sampleData, catagories).length).toBe(3);
  });

  it('Should return all objects from size catagory selected', function() {
    catagories.size.person = true;
    expect(catagoryFilter(sampleData, catagories.size).length).toBe(1);
  });

  it('Should be able to select multiple out of the size catagory', function() {
    catagories.size.person = true;
    catagories.size.skyscraper = true;
    expect(catagoryFilter(sampleData, catagories.size).length).toBe(2);
  });

  it('Should return all objects from distance catagory selected', function() {
    catagories.distance.['0 - 50'] = true;
    expect(catagoryFilter(sampleData, catagories.distance).length).toBe(1);
  });

  it('Should be able to select multiple out of the same distance', function() {
    catagories.distance['0 - 50'] = true;
    catagories.distance['150+'] = true;
    expect(catagoryFilter(sampleData, catagories.size).length).toBe(2);
  });

});
