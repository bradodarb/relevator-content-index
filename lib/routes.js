var api = require('./api');

module.exports = [

  {
    method: 'GET',
    path: '/api/heartbeat',
    handler: api.heartbeat
  },
  {
    method: 'POST',
    path: '/api/content/{id}',
    handler: api.contentIndex.index
  },
  {
    method: 'POST',
    path: '/api/content/text',
    handler: api.contentIndex.searchText
  },
  {
    method: 'POST',
    path: '/api/content/image',
    handler: api.contentIndex.searchImage
  },
  {
    method: 'POST',
    path: '/api/content/composite',
    handler: api.contentIndex.searchComposite
  },
  {
    method: 'DELETE',
    path: '/api/content/{type}/{id}',
    handler: api.contentIndex.remove
  }
];
