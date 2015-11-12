# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Nearearthobject.create([{
    name: '2010 PK9',
    size: 0.1160259082,
    close_approach_date: DateTime.new(1990, 06, 01),
    close_approach_distance: 6659408.5,
    velocity: 30.942357826,
  },
    name: '1999 VF22',
    size: 0.2111324448,
    close_approach_date: DateTime.new(2016, 02, 18),
    close_approach_distance: 14097968,
    velocity: 28.0780565472,
  ]);
