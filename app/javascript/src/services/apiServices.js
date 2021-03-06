const axios = require('axios')

export const ApiService = {
  addScript(params) {
    return axios({
      method: 'get',
      url: 'api/add_script',
      params,
    });
  },
  getChannelInfo(params) {
    return axios({
      method: 'get',
      url: 'api/channel_info',
      params,
    });
  },

  getChannelsDetails(params) {
    return axios({
      method: 'get',
      url: 'api/channels_details',
      params,
    });
  },

  updateStoreDataSetId(params) {
    return axios({
      method: 'post',
      url: '/api/update_store_data_set_id',
      params,
    });
  },

  updateStorePropertyId(params) {
    return axios({
      method: 'post',
      url: '/api/update_store_property_id',
      params,
    });
  },
};
