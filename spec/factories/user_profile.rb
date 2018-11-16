require 'faker'

FactoryGirl.define do
  factory :user_profile, aliases: [:reviewee, :reviewer] do
    first_name    { Faker::Name.first_name }
    last_name     { Faker::Name.last_name }
    date_of_birth { Faker::Date.birthday(12, 70) }
    user
  end
end