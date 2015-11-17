# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

require 'net/http'
key = "FDF8cJsgpVwVozoyQ4GZL0Pe8CLaG6heSPW8JeoV"
url = URI.parse("https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-10-08&end_date=2015-10-15&api_key=FDF8cJsgpVwVozoyQ4GZL0Pe8CLaG6heSPW8JeoV");
result = Net::HTTP.get(url)
10.times do
  url = URI.parse(JSON.parse(result)['links']['next'].chomp('DEMO_KEY') + key)
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

    end
  end
end
