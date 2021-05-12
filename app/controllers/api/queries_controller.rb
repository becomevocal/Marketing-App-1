class Api::QueriesController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :set_store

  def channels_details
    channels = HTTParty.get(
      "https://api.bigcommerce.com/stores/#{@store.store_hash}/v3/channels?include=currencies", headers: {
      "X-Auth-Token": @store.access_token,
      "Content-Type" => "application/json"
    })
    render json: {store: channels}
  end

  def channel_currencies
    channel_currency = HTTParty.get(
      "https://api.bigcommerce.com/stores/#{@store.store_hash}/v3/channels/#{params[:channel_id]}/currency-assignments", headers: {
      "X-Auth-Token": @store.access_token,
      "Content-Type" => "application/json"
    })
    render json: {channel_currency: channel_currency}
  end

  def add_script
    channel = @store.channels.where(name: params[:name]).first_or_create
    # channel.update(tag_installed: true, tag_id: params[:property_id])

    requestBody = {
      "channel_id": params[:channel_id].to_i,
      "name": "Main Script",
      "description": "Main Script",
      "html": "<script>#{params[:property_id]}</script>",
      "auto_uninstall": true,
      "load_method": "default",
      "location": "head",
      "visibility": "all_pages",
      "kind": "script_tag",
      "consent_category": "essential",
      "enabled": true
    }

    store_variants = HTTParty.post(
      "https://api.bigcommerce.com/stores/#{@store.store_hash}/v3/content/scripts",
      headers: {
        "X-Auth-Token": @store.access_token,
        "Content-Type" => "application/json"
      },
      body: requestBody.to_json
    )

    render json: { access_token: @store.access_token, request: requestBody, response: store_variants }
  end

  def exchange_google_auth_code
    requestJSON = JSON.parse(request.raw_post)

    if !requestJSON["code"]
      render json: { "error": "code_missing", "error_description" => "Required field 'code' not received." }, :status => 400
      return
    end

    googleAuthCode = requestJSON["code"]

    google_token_creation = HTTParty.post("https://oauth2.googleapis.com/token",
      headers: {
        "Content-Type" => "application/x-www-form-urlencoded"
      },
      body: {
          "code": googleAuthCode,
          "client_id": ENV['GOOGLE_CLIENT_ID'],
          "client_secret": ENV['GOOGLE_CLIENT_SECRET'],
          "redirect_uri": "https://#{ENV['APP_URL']}",
          "grant_type": "authorization_code"
      }
    )

    if google_token_creation.success?
      tokenResponseFields = google_token_creation.parsed_response
      # This token is used within this session to get the profile, however it will expire soon
      googleAccessToken = tokenResponseFields["access_token"]
      # TODO: Save this to DB to get new access tokens later: https://developers.google.com/identity/protocols/oauth2/web-server#offline
      googleRefreshToken = tokenResponseFields["refresh_token"]
      #@channel.update(access_token: googleAccessToken, refresh_token: googleRefreshToken)

      # Hardcoding this URL for now, but it *should* be recieved from the Google discovery doc and cached
      # See: https://developers.google.com/identity/protocols/oauth2/openid-connect#discovery
      googleUserInfoEndpoint = "https://openidconnect.googleapis.com/v1/userinfo"
      google_profile_fetch = HTTParty.get(googleUserInfoEndpoint,
        headers: {
          "Authorization" => "Bearer #{googleAccessToken}"
        }
      )

      if google_profile_fetch.success?
        render json: { "access_token": googleAccessToken, "profile": google_profile_fetch.parsed_response }
        return
      end

      # Profile fetch failed, so return error from Google
      render json: google_profile_fetch.body
      return
    end

    # Token creation failed, so return error from Google
    render json: google_token_creation.body
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

    render json: google_feed
  end

  def fetch_google_feed_sync_status
    google_feed = HTTParty.get(
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

    render json: google_feed
  end

  # Sets the selected storefront session value
  def select_storefront
    requestJSON = JSON.parse(request.raw_post)

    if !requestJSON["channel_id"]
      render json: { "error": "channel_id_missing", "error_description" => "Required field 'channel_id' not received." }, :status => 400
      return
    end

    storefront_channel_id = requestJSON["channel_id"]

    session[:selected_storefront_channel_id] = storefront_channel_id

    render json: {}, :status => 200
  end

  # Creates the marketing channel in BigCommerce and saves a reference in the app "channels" database table. 
  # - If the marketing channel of the same type and platform is already available and managed under this app's ID, it's reused.
  # - If the marketing channel is already available and this is the second+ storefront, a new reference in the "channels" table is created for the new storefront.
  def create_channel
    if !session[:selected_storefront_channel_id]
      render json: { "error_code": "no_storefront_selected", "error_message": "A storefront must be selected before the marketing channel is created." }, :status => 400
      return
    end

    channels = HTTParty.get(
      "https://api.bigcommerce.com/stores/#{@store.store_hash}/v3/channels?include=currencies", headers: {
      "X-Auth-Token": @store.access_token,
      "Content-Type" => "application/json"
    })

    channels_array = channels["data"].filter { |x|
      x["type"] === ENV['CHANNEL_TYPE'] &&
      x["platform"] === ENV['CHANNEL_PLATFORM'] && 
      x['config_meta']['app']['id'] === ENV['BC_APP_ID'].to_i
    }

    render json: { "channels_arra": channels_array }
    return

    # channel = HTTParty.post(
    #   "https://api.bigcommerce.com/stores/#{@store.store_hash}/v3/channels", headers: {
    #   "X-Auth-Token": @store.access_token,
    #   "Content-Type" => "application/json"
    # },
    #   body: {
    #     "is_listable_from_ui": false,
    #     "is_visible": true,
    #     "name": "Google Shopping",
    #     "status": "active",
    #     "type": "marketing",
    #     "platform": "google_shopping",
    #     "config_meta": {
    #       "app": {
    #         "id": ENV['BC_APP_ID'].to_i,
    #         "sections": [
    #           {
    #             "title": "Overview",
    #             "query_path": "overview"
    #           },
    #           {
    #             "title": "Pixel",
    #             "query_path": "pixel"
    #           }
    #         ]
    #       }
    #     }
    #   }.to_json,
    # )

    channel_info = @store.channels.where(store_id: @store.id, storefront_channel_id: session[:selected_storefront_channel_id]).first
    render json: channel_info
    return

    channel_test = {
      "data": {
        "id": 391563,
        "name": "Amazon US",
        "platform": "amazon",
        "type": "marketplace",
        "date_created": "2020-08-25T18:45:11Z",
        "date_modified": "2020-08-25T18:45:11Z",
        "external_id": "",
        "is_listable_from_ui": true,
        "is_enabled": true,
        "is_visible": true,
        "status": "connected",
        "config_meta": {
          "app": {
            "id": 123,
            "sections": [
              {
                "title": "Overview",
                "query_path": "overview"
              },
              {
                "title": "Settings",
                "query_path": "settings"
              }
            ]
          }
        }
      },
      "meta": {}
    }

    channel_info = @store.channels.where(store_id: @store.id).first_or_create
    render json: channel_info
    return

    if channel.success?
      channel_record = @store.channels.where(store_id: @store.store_id).first_or_create
      channel_record.update(channel_created: true, channel_id: channel[:id])
    end

    render json: channel
  end

  private

  def set_store
    store_id = session[:store_id]
    @store = Store.find(store_id)
  end
end
