Rails.application.routes.draw do
  get '/auth/:name/callback', to: 'omniauths#callback'
  get '/load', to: 'omniauths#load'
  get '/uninstall', to: 'omniauths#uninstall'
  get 'auth/bigcommerce/api/store_details', to: 'api/queries#store_details'

  # APIs
  namespace :api do
    get 'channels_details', to: 'queries#channels_details'
    get 'channel_currencies', to: 'queries#channel_currencies'
    post 'create_channel', to: 'queries#create_channel'
    get 'create_channel', to: 'queries#create_channel'

    get 'add_script', to: 'queries#add_script'
    get 'add-products-to-google', to: 'queries#add_products_to_google'
    get 'get-google-sync-status', to: 'queries#fetch_google_feed_sync_status'
    post 'exchange_google_auth_code', to: 'queries#exchange_google_auth_code'
    post 'select_storefront', to: 'queries#select_storefront'
  end

  root to: 'index#home'
end
