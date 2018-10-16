Rails.application.routes.draw do
  #post
  get 'users/new' => 'users#new'
  #post
  get 'users/create' => 'users#create'
  #put
  get 'users/update/:id' => 'users#update'
  #delete
  get 'users/destroy/:id' => 'users#destroy'
  get 'users/index' => 'users#index'
  get 'users/show/:id' => 'users#show'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
