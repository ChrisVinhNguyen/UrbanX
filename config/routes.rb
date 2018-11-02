Rails.application.routes.draw do
  get 'items/create'
  get 'items/new'
  get 'items/index'
  get 'items/show'
  get 'items/edit'
  get 'items/update'
  get 'items/destroy'
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
