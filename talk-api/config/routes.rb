Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :kk, only: :index
  resources :eae, only: :index
  resources :men, only: :index
end
