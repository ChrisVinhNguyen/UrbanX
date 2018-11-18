require 'faker'

FactoryBot.define do
  factory :item do
    name    { Faker::Appliance.equipment }
    description	{ Faker::Internet.password }
    category	{Faker::Commerce.department(1,true)}
    quantity	{Faker::Number.between(1, 10)}
    condition	"new"
    status	"unavailable"
  end
end
