# Objects In Space

A way to bring awareness to near earth objects and there threat to earth. Their are thousands of near earth objects and Objects in Space will keep you notified when they get close.

https://objects-in-space.herokuapp.com/

## Getting started

If you don't have Ruby install follow https://www.ruby-lang.org/en/documentation/installation/

You will also need to install http://postgresapp.com/

Install all gems

    $ bundle install
    
Create Database and have to seed data. This can take a long time there is a lot of Near earth objects.

    $ rake db:setup
    
Create Nickname for all Near earth objects

    $ rake fake_names

start Rails server

    $ rails s

Site is hosted on http://localhost:3000

To run jasmine test 

    $ teaspoon

## The Team
- Clayton Perszyk https://github.com/clayton-perszyk
- Donald Bruanis https://github.com/donb1991
- Lionel Lints https://github.com/lionel-lints

## Tech Stack

- Ruby on Rails
- Postgres
- Angular
- Bootstrap
- Chrome Services Workers
