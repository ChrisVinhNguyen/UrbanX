Rails.application.routes.draw do
  get 'root/index'
  get 'user/Reviews'
  get 'items/create'
  get 'items/new'
  get 'items/index'
  get 'items/show'
  get 'items/edit'
  get 'items/update'
  get 'items/destroy'
  devise_for :users, controllers: { registrations: 'users/registrations' }
  root to: "root#index"
  # match '*path', to: 'root#index', via: :all
  post 'items/search'

  resources :user_reviews  
  resources :users 
  resources :user_profiles do 
    get 'transactions', :on => :member
    get 'user_reviews', :on => :member
    get 'new_contact', :on => :member
    get 'transactions_requests', :on => :member
    post 'add_contact', :on => :member
    post 'remove_contact', :on => :member
    delete :delete_image_attachment
  end

  resources :items do 
    resources :item_reviews
    resources :transactions
    delete :delete_image_attachment
  end
end
