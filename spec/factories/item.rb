require 'faker'

FactoryBot.define do
  factory :item do
    name    { Faker::Appliance.equipment }
    description	{ Faker::Internet.password }
    category	{Faker::Commerce.department(1,true)}
    quantity	{Faker::Number.between(1, 10)}
    condition	{ "new" }
    date_posted	{Faker::Time.between(2.days.ago, Date.today, :all)}
    value	{Faker::Number.between(1, 1000)}
    user_id	{Faker::Number.between(1, 1000)}
    status	{ "available" }
    user
  end
end
