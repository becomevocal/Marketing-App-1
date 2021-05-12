const axios = require('axios')

export const ApiService = {
  addScript(params) {
    return axios({
      method: 'get',
      url: '/api/add_script',
      params,
    });
  },

  getChannelCurrencies(params) {
    return axios({
      method: 'get',
      url: '/api/channel_currencies',
      params,
    });
  },

  getChannelsDetails() {
    return axios({
      method: 'get',
      url: '/api/channels_details'
    });
  },

  createChannel() {
    return axios({
      method: 'post',
      url: '/api/create_channel'
    });
  },

  googleAuthCodeExchange(code) {
    return axios({
      method: 'post',
      url: '/api/exchange_google_auth_code',
      data: { code }
    });
  },

  googleMerchantIds(token) {
    return axios({
      method: 'get',
      url: 'https://shoppingcontent.googleapis.com/content/v2.1/accounts/authinfo',
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  startShoppingFeedSync(params) {
    return axios({
      method: 'get',
      url: '/api/add-products-to-google',
      params,
    });
  },

  checkShoppingFeedSync(params) {
    return axios({
      method: 'get',
      url: '/api/get-google-sync-status',
      params,
    });
  },

  selectStorefrontChannel(channel_id) {
    return axios({
      method: 'post',
      url: '/api/select_storefront',
      data: { channel_id },
    });
  },
};
