require 'faker'

FactoryBot.define do
  factory :transaction do
    borrower_id {Faker::Number.between(1, 1000)}
    lender_id {Faker::Number.between(1, 1000)}
    lend_date {Faker::Time.between(2.days.ago, Date.today, :all)}
    return_date {Faker::Time.between(2.days.ago, Date.today, :all)}
    expiry_date {Faker::Time.between(2.days.ago, Date.today, :all)}
    created_at {Faker::Time.between(2.days.ago, Date.today, :all)}
    updated_at {Faker::Time.between(2.days.ago, Date.today, :all)}
    status   { "available" }
    item_name { Faker::Appliance.equipment }
    item
    borrower
    lender
  end
end
