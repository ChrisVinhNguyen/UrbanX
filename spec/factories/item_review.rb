require 'faker'

FactoryBot.define do
  factory :item_review do
    comment  { Faker::FamousLastWords.last_words }
    rating   { Faker::Number.between(1, 10) }
    created_at	{Faker::Time.between(2.days.ago, Date.today, :all)}
    updated_at	{Faker::Time.between(2.days.ago, Date.today, :all)}
    owner_id { Faker::Number.between(1, 10) }
    item
  end
end