require 'faker'

FactoryBot.define do
  factory :item_review do
    comment  { Faker::FamousLastWords.last_words }
    rating   { Faker::Number.between(1, 10) }
  end
end