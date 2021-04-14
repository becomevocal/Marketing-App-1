Rails.application.routes.draw do
  get '/auth/:name/callback', to: 'omniauths#callback'
  get '/load', to: 'omniauths#load'
  get '/uninstall', to: 'omniauths#uninstall'
  get 'auth/bigcommerce/api/store_details', to: 'api/queries#store_details'

  # APIs
  namespace :api do
    post 'payment', to: 'queries#payment'
    get 'channels_details', to: 'queries#channels_details'
    get 'channel_info', to: 'queries#channel_info'
    post 'update_store_data_set_id', to: 'queries#update_store_data_set_id'
    post 'update_store_property_id', to: 'queries#update_store_property_id'

    get 'add_script', to: 'queries#add_script'
  end

  root to: 'welcome#home'
end
