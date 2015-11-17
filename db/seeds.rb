# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

require 'net/http'

url = URI.parse("https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-12-24&end_date=2015-12-31&api_key=FDF8cJsgpVwVozoyQ4GZL0Pe8CLaG6heSPW8JeoV");
result = Net::HTTP.get(url)
JSON.parse(result)["near_earth_objects"].each do |neoArray|
  neoObject = {}
  neoObject['close_approach_date'] = neoArray[0];
  neoArray[1].each do |neo|
    neoObject['name'] = neo["name"]
    neoObject['close_approach_distance'] = neo["close_approach_data"][0]["miss_distance"]["lunar"].to_i;
    neoObject['velocity'] = neo['close_approach_data'][0]['relative_velocity']['kilometers_per_second']
    neoObject['size'] =  (neo["estimated_diameter"]["meters"]["estimated_diameter_min"].to_i + neo["estimated_diameter"]["meters"]["estimated_diameter_max"].to_i) / 2
    neoObject['pha'] = neo["is_potentially_hazardous_asteroid"]

    if neoObject["size"] <= 3
      neoObject["sizeCatagory"] = 'person'
    elsif neoObject["size"] <= 5
      neoObject["sizeCatagory"] = 'house'
    elsif neoObject["size"] <= 20
      neoObject["sizeCatagory"] = 'football field'
    elsif neoObject["size"] <= 100
      neoObject["sizeCatagory"] = 'skyscraper'
    elsif neoObject["size"] <= 4000
      neoObject["sizeCatagory"] = 'city'
    elsif neoObject["size"] <= 5000000
      neoObject["sizeCatagory"] = 'lake'
    elsif
      neoObject["sizeCatagory"] = 'to damn big'
    end

    if neoObject['close_approach_distance'] <= 200
      neoObject["distanceCatagory"] = "0 - 200"
    elsif neoObject['close_approach_distance'] <= 400
      neoObject["distanceCatagory"] = "200 - 400"
    elsif neoObject['close_approach_distance'] <= 600
      neoObject["distanceCatagory"] = "400 - 600"
    else
      neoObject["distanceCatagory"] = "600+"
    end

    Nearearthobject.create(neoObject)
    # response = Net::HTTP.post_form(URI.parse('http://localhost:3000/nearearthobjects'), neoObject)

    puts neoObject;
    puts '*' * 30
  end
end

#
# Nearearthobject.create([{
#     name: '2010 PK9',
#     size: 0.1160259082,
#     close_approach_date: DateTime.new(1990, 06, 01),
#     close_approach_distance: 6659408.5,
#     velocity: 30.942357826,
#   },
#   {
#     name: '1999 VF22',
#     size: 0.2111324448,
#     close_approach_date: DateTime.new(2016, 02, 18),
#     close_approach_distance: 14097968,
#     velocity: 28.0780565472,
#   }
# ]);
