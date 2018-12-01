Rails.application.routes.draw do
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
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
  get 'items/search'

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
    delete :delete_image_blob
  end

  resources :items do 
    resources :item_reviews
    resources :transactions
    member  do
      delete :delete_image_attachment
      delete :delete_image
    end
  end

  match 'about', to: 'root#index', via: :all
  match 'terms-of-service', to: 'root#index', via: :all
  match 'privacy-policy', to: 'root#index', via: :all
  match 'site-map', to: 'root#index', via: :all
  match 'contact-us', to: 'root#index', via: :all
  match 'faq', to: 'root#index', via: :all
  
  match 'items_list/:id', to: 'root#index', via: :all
  match 'user_profiles_show/:id', to: 'root#index', via: :all
  match 'users_sign_up', to: 'root#index', via: :all
  match 'users_sign_in', to: 'root#index', via: :all
  match 'users_forgot_password', to: 'root#index', via: :all
  match 'user_profiles/new/profile', to: 'root#index', via: :all
  match 'user_profiles_change/:id/edit', to: 'root#index', via: :all
  match 'items_list/:id', to: 'root#index', via: :all
  match 'items/add/new', to: 'root#index', via: :all






end
