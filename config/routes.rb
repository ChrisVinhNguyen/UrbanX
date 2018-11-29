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
  get 'items/filter', to: 'items#filter'
  get 'items/myItems', to: 'items#myItems'
  devise_for :users, controllers: { registrations: 'users/registrations', sessions: 'users/sessions' }
  root to: "root#index"
  delete '/', to: 'root#index'
  post 'items/search'

  get 'is_signed_in', to: 'authenticate_user#is_user_signed_in?'

  resources :user_reviews  
  resources :users 
  resources :user_profiles do 
    get 'transactions', :on => :member
    get 'my_transactions_for_item', :on => :member
    #get 'user_reviews', :on => :member
    resources :user_reviews
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

  match 'about', to: 'root#index', via: :all
  match 'terms-of-service', to: 'root#index', via: :all
  match 'privacy-policy', to: 'root#index', via: :all
  match 'site-map', to: 'root#index', via: :all
  match 'contact-us', to: 'root#index', via: :all
  match 'faq', to: 'root#index', via: :all

end
