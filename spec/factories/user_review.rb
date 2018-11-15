require 'faker'

FactoryGirl.define do
  factory :user_review do
    comment  { Faker::FamousLastWords.last_words }
    rating   { Faker::Number.between(1, 10) }
    reviewee
    reviewer
  end
end