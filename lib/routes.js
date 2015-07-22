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
    path: '/api/content',
    handler: api.contentIndex.search
  },
  {
    method: 'DELETE',
    path: '/api/content/{id}',
    handler: api.contentIndex.remove
  }
];
