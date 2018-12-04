require 'faker'

FactoryBot.define do
  factory :user, aliases: [:borrower, :lender] do
    email    { Faker::Internet.email }
    password { Faker::Internet.password }
  end
end