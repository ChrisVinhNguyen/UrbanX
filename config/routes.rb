Rails.application.routes.draw do
  get 'user/Reviews'
  get 'items/create'
  get 'items/new'
  get 'items/index'
  get 'items/show'
  get 'items/edit'
  get 'items/update'
  get 'items/destroy'
  devise_for :users
  root to: "user_profiles#index"

  resources :users do 
    resources :user_reviews
  end
  resources :user_profiles do
    get 'transactions', :on => :member
  end
  resources :items do 
    resources :item_reviews
    resources :transactions
  end
end
