Rails.application.routes.draw do
  get 'user_reviews/create'
  get 'user_reviews/destroy'
  get 'user_reviews/index'
  get 'user_reviews/new'
  get 'user_reviews/show'
  get 'user_reviews/update'
  get 'item_reviews/create'
  get 'item_reviews/destroy'
  get 'item_reviews/index'
  get 'item_reviews/new'
  get 'item_reviews/show'
  get 'item_reviews/update'
  get 'user/Reviews'
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
  resources :items do 
    resources :item_reviews
  end
  resources :transactions
end
