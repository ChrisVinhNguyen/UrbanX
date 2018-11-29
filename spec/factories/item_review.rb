require 'faker'

FactoryBot.define do
  factory :item_review do
    comment  { Faker::FamousLastWords.last_words }
    rating   { Faker::Number.between(1, 10) }
    created_at { Faker::Date.between(10.days.ago, Date.today)}
    updated_at { Faker::Date.between(5.days.ago, Date.today)}
    owner_id { Faker::Number.between(1, 10) }
    item
  end
end