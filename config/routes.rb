Rails.application.routes.draw do
  devise_for :users
  root to: "user_profiles#index"


  resources :user_profiles
  resources :items
end
