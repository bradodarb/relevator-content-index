
var env = process.env.NODE_ENV || "development";
var elasticsearch = require('elasticsearch');

var Util = require('util');
var c = require('../config/config.json')[env];

var client = new elasticsearch.Client({
    host: c.host
});



exports.heartbeat = function(request, reply) {

    reply(Date.now()).code(200);
};

exports.contentIndex = {

	index: function(request, reply){
		client.index({
		  index: c.indexName,
		  type: c.typeName,
		  id: request.payload.id,
		  body: request.payload.body
		}, function (error, response) {
		  if(error){
		   	reply(error).code(500);
		  }else{
		   	reply(response).code(200);
		  }
		});
	},
	remove: function(request, reply){
		client.delete({
		  index: c.indexName,
		  type: c.typeName,
		  id: request.params.id
		}, function (error, response) {
		  if(error){
		   	reply(error).code(500);
		  }else{
		   	reply(response).code(200);
		  }
		});
	},
	search: function(request, reply){

		var query = request.payload.query;
		var facets = request.payload.query;

		client.search({
		  index: c.indexName,
		  body: {
		    query: query,
		    facets: facets
		  }
		}, function (error, response) {
		  if(error){
		   	reply(error).code(500);
		  }else{
		   	reply(response).code(200);
		  }
		});
	},

};
