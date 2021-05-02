class Api::QueriesController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :set_store

  def channels_details
    channels = HTTParty.get(
      "https://api.bigcommerce.com/stores/#{@store.store_hash}/v3/channels", headers: {
      "X-Auth-Token": @store.access_token,
      "Content-Type" => "application/json"
    })
    render json: {store: channels}
  end

  def channel_info
    channel_currency = HTTParty.get(
      "https://api.bigcommerce.com/stores/#{@store.store_hash}/v3/channels/#{params[:channel_id]}/currency-assignments", headers: {
      "X-Auth-Token": @store.access_token,
      "Content-Type" => "application/json"
    })
    render json: {channel_currency: channel_currency}
  end

  def update_store_property_id
    @store.update(project_id: params[:project_id])
    render json: {status: true}
  end

  def update_store_data_set_id
    @store.update(data_set_id: params[:data_set_id])
    render json: {status: true}
  end

  def payment
    @store.update(is_paid: true)
  end

  def add_script
    channel = @store.channels.where(name: params[:name]).first_or_create
    channel.update(tag_installed: true, tag_id: params[:property_id])
    store_variants = HTTParty.post(
      "https://api.bigcommerce.com/stores/#{store.store_hash}/v3/content/scripts",
      headers: {
        "X-Auth-Token": store.access_token,
        "Content-Type" => "application/json"
      },
      body: {
        "name": "Main Script",
        "description": "Main Script",
        "html": params[:property_id],
        "auto_uninstall": true,
        "load_method": "default",
        "location": "head",
        "visibility": "all_pages",
        "kind": "script_tag",
        "consent_category": "essential",
        "enabled": true
      }.to_json
    )
  end

  def add_products_to_google
    google_feed = HTTParty.post(
      "https://920cf224-e7c2-462e-bd9a-07e979806842.trayapp.io/#{@store.store_hash}",
      headers: {
        "X-Auth-Client": 'rodw3fqzuh8q7pvvpr5n1b4owd8tvz',
        "X-Auth-Token": @store.access_token,
        "X-Google-Token": params[:google_auth_token],
        "X-Google-Merchant-ID": params[:merchant_id],
        "X-Google-Merchant-ID": params[:merchant_id],
        "X-Storefront-Channel-ID": params[:channel_id],
        "Content-Type" => "application/json"
      }
    )

    render json: {response: google_feed}
  end

  private

  def set_store
    @store = Store.find(params[:store_id])
  end
end



# channels = HTTParty.post(
#   "https://api.bigcommerce.com/stores/#{@store.store_hash}/v3/channels", headers: {
#   "X-Auth-Token": @store.access_token,
#   "Content-Type" => "application/json"
# },
#   body: {
#     "external_id": "string",
#     "is_listable_from_ui": true,
#     "is_visible": true,
#     "name": "Test One",
#     "status": "active",
#     "type": "marketing",
#     "platform": "google_shopping"
#   }.to_json,
#   )