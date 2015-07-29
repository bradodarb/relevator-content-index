var api = require('./api');

module.exports = [

  {
    method: 'GET',
    path: '/api/heartbeat',
    handler: api.heartbeat
  },
  {
    method: 'POST',
    path: '/api/content',
    handler: api.contentIndex.index
  },
  {
    method: 'POST',
    path: '/api/content/search',
    handler: api.contentIndex.search
  },
  {
    method: 'POST',
    path: '/api/content/search/text',
    handler: api.contentIndex.searchText
  },
  {
    method: 'POST',
    path: '/api/content/search/image',
    handler: api.contentIndex.searchImage
  },
  {
    method: 'POST',
    path: '/api/content/search/composite',
    handler: api.contentIndex.searchComposite
  },
  {
    method: 'DELETE',
    path: '/api/content/{type}/{id}',
    handler: api.contentIndex.remove
  }
];
