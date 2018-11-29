require 'faker'

FactoryBot.define do
  factory :user_profile, aliases: [:reviewee, :reviewer] do
    first_name    { Faker::Name.first_name }
    last_name     { Faker::Name.last_name }
    date_of_birth { Faker::Date.birthday(12, 70) }
    location { Faker::Address.full_address }
    created_at { Faker::Date.between(5.days.ago, Date.today) }
    updated_at { Faker::Date.between(15.days.ago, Date.today) }
    user
  end
end