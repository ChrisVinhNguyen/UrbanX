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

ActiveRecord::Schema.define(version: 2018_10_14_223714) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "items", force: :cascade do |t|
    t.string "name"
    t.string "picture"
    t.text "description"
    t.string "category"
    t.integer "quantity"
    t.string "condition"
    t.datetime "date_posted"
    t.float "value"
    t.integer "owner_id"
    t.string "status"
    t.integer "review_id"
  end

  create_table "reviews", force: :cascade do |t|
    t.float "rating"
    t.text "comment"
    t.datetime "date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "transactions", force: :cascade do |t|
    t.integer "item_id"
    t.integer "borrower_id"
    t.integer "lender_id"
    t.datetime "lend_date"
    t.datetime "return_date"
    t.datetime "expiry_date"
    t.string "status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "picture"
    t.string "email"
    t.string "password"
    t.datetime "date_of_birth"
    t.string "location"
    t.integer "review_id"
    t.integer "transaction_id"
    t.string "contact_list", default: [], array: true
    t.integer "items", default: [], array: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
