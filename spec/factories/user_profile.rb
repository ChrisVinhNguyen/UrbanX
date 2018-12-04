require 'faker'

FactoryBot.define do
  factory :user_profile, aliases: [:reviewee, :reviewer] do
    first_name    { Faker::Name.first_name }
    last_name     { Faker::Name.last_name }
    date_of_birth { Faker::Date.birthday(12, 70) }
    points {Faker::Number.between(0, 1000)}
    location { Faker::Address.full_address }
    created_at	{Faker::Time.between(2.days.ago, Date.today, :all)}
    updated_at	{Faker::Time.between(2.days.ago, Date.today, :all)}
    user
  end
end