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

  private

  def set_store
    @store = Store.find(params[:store_id])
  end
end
