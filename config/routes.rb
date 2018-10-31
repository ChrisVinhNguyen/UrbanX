Rails.application.routes.draw do
  get 'transactions/new'
  get 'transactions/create'
  get 'transactions/update'
  get 'transactions/destroy'
  get 'transactions/index'
  get 'transactions/show'
  devise_for :users
  root to: "user_profiles#index"


  resources :user_profiles
  resources :items
  resources :transactions
end
