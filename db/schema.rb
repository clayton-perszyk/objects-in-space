# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20151118193902) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "nearearthobjects", force: :cascade do |t|
    t.string  "name"
    t.string  "close_approach_date"
    t.integer "close_approach_distance"
    t.integer "velocity"
    t.integer "size"
    t.string  "sizeCatagory"
    t.boolean "pha"
    t.string  "distanceCatagory"
    t.string  "nickname"
  end

  create_table "subscribed_users", force: :cascade do |t|
    t.string   "endpoint"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", force: :cascade do |t|
    t.string   "user_name"
    t.string   "name"
    t.string   "email"
    t.string   "password"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
