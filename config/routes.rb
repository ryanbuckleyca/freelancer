# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users
  root to: 'landing#index'
  resources :clients, only: [:index, :show]
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :clients, only: [ :index, :show ]
    end
  end
end
