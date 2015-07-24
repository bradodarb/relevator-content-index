
var env = process.env.NODE_ENV || "development";
var elasticsearch = require('elasticsearch');

var Util = require('util');
var c = require('../config/config.json')[env];

var client = new elasticsearch.Client({
    host: c.host
});

var mappings = require('./mappings');

// client.indices.create({ index: c.indexName }, function(error, result){
// 	if(error){
// 		console.log(error);
// 	}else{
// 		for (var mapping in mappings) {
// 		    if (mappings.hasOwnProperty(mapping)) {
// 		        client.indices.putMapping({ index: c.indexName, type: mapping, body: mappings[mapping] }, function(err, body, code) {
// 			        if (err) throw new Error(err);
// 			    });
// 		    }
// 		} 
// 	}
// });


client.indices.exists({ index: c.indexName }, function(error, result){
	if(error){
		console.log(error);
	}else{
		if(!result){
			client.indices.create({ index: c.indexName }, function(error, result){
				if(error){
					console.log(error);
				}else{
					for (var mapping in mappings) {
					    if (mappings.hasOwnProperty(mapping)) {
					         client.indices.putMapping({ index: c.indexName, type: mapping, body: mappings[mapping] }, function(err, body, code) {
						        if (err) throw new Error(err);
						    });
					    }
					}
				}
			});
		}
	}
});

exports.heartbeat = function(request, reply) {

    reply(Date.now()).code(200);
};

exports.contentIndex = {

	index: function(request, reply){
		  	console.log(c);
		client.index({
		  index: c.indexName,
		  type: request.payload.type,
		  id: request.params.id,
		  body: request.payload
		}, function (error, response) {
		  if(error){
		  	console.log(error);
		   	reply(error).code(500);
		  }else{
		  	console.log(response);
		   	reply(response).code(200);
		  }
		});
	},
	remove: function(request, reply){
		client.delete({
		  index: c.indexName,
		  type: request.params.typeName,
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

		client.search({
		  index: c.indexName,
		  body: {
		    query: query
		  }
		}, function (error, response) {
		  if(error){
		   	reply(error).code(500);
		  }else{
		   	reply(response).code(200);
		  }
		});
	},
	searchText: function(request, reply){
		var q = {
			"query": {
				"isPrimary": true,
				"isSecondary": true,
				"isNominal": true,
				"term": 'search query string',
				"categories": [],
				"tags":[],
				"type": 'Text',
				"nested": {
	            "path": "tags",
	            "score_mode": "total",
		            "query": {
		                "custom_score": {
		                    "query": {
		                        "terms": {
		                            "tag": ["A", "B", "D"],
		                            "minimum_match" : 1
		                        }
		                    },
		                    "script" : "_score * doc['\''weight'\''].value"
		                }
		            }
	        	}
        	}
		};
		var query = request.payload.query;

		client.search({
		  index: c.indexName,
		  body: {
		    query: query
		  }
		}, function (error, response) {
		  if(error){
		   	reply(error).code(500);
		  }else{
		   	reply(response).code(200);
		  }
		});
	},
	searchImage: function(request, reply){

		var query = request.payload.query;

		client.search({
		  index: c.indexName,
		  body: {
		    query: query
		  }
		}, function (error, response) {
		  if(error){
		   	reply(error).code(500);
		  }else{
		   	reply(response).code(200);
		  }
		});
	},
	searchComposite: function(request, reply){

		var query = request.payload.query;

		client.search({
		  index: c.indexName,
		  body: {
		    query: query
		  }
		}, function (error, response) {
		  if(error){
		   	reply(error).code(500);
		  }else{
		   	reply(response).code(200);
		  }
		});
	}

};
