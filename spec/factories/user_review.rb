require 'faker'

FactoryBot.define do
  factory :user_review do
    comment  { Faker::FamousLastWords.last_words }
    rating   { Faker::Number.between(1, 10) }
    created_at	{Faker::Time.between(2.days.ago, Date.today, :all)}
    updated_at	{Faker::Time.between(2.days.ago, Date.today, :all)}
    reviewer_id { Faker::Number.between(11,20) }
    #reviewee_id { Faker::Number.between(1,10) }
    user_profile	
  end
end