
var env = process.env.NODE_ENV || "development";
var elasticsearch = require('elasticsearch');

var Util = require('util');
var c = require('../config/config.json')[env];

var client = new elasticsearch.Client({
    host: c.host
});

var mappings = require('./mappings').mappings;

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




 // client.indices.putMapping({ index: c.indexName, type: 'test', body: {"test":{"properties":{"name":{"type": "string"},"value":{"type":"integer"}}}} }, function(err, body, code) {
	// 					        if (err) throw new Error(err);
	// 					    });



// for (var mapping in mappings) {
// 	console.log(mapping)
// 	if (mappings.hasOwnProperty(mapping)) {
// 		console.log(mappings[mapping])
// 	     client.indices.putMapping({ index: c.indexName, type: mapping, body: mappings[mapping] }, function(err, body, code) {
// 	        if (err) throw new Error(err);
// 	    });
// 	}
// }



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
	  	request.payload.id = request.payload._id;
		client.index({
		  index: c.indexName,
		  type: request.payload.type,
		  id: request.payload.id,
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

		if(validateQuery(request, reply)){
			var q = request.payload.query;
			var query = {};

			switch(q.type){
				case "Text":
					query = getTextQuery(q);
				break;
				case "Image":
					query = getImageQuery(q);
				break;
				case "Composite":
					query = getCompositeQuery(q);
				break; 
				default:
					query = getGeneralQuery(q);
				break;
			}


			client.search({
			  index: c.indexName,
			  body: query
			}, function (error, response) {
			  if(error){
			  	console.log(error);
			   	reply(error).code(500);
			  }else{
			  	console.log(response);
			   	reply(response).code(200);
			  }
			});
		}
	},
	searchText: function(request, reply){
		
		if(validateQuery(request, reply)){
			var query = getTextQuery(request.payload.query);
			//reply(query).code(200);return;

			client.search({
			  index: c.indexName,
			  body: query
			}, function (error, response) {
			  if(error){
			  	console.log(error);
			   	reply(error).code(500);
			  }else{
			  	console.log(response);
			   	reply(response).code(200);
			  }
			});
		}
	},
	searchImage: function(request, reply){

		if(validateQuery(request, reply)){
			var query = getImageQuery(request.payload.query);

			client.search({
			  index: c.indexName,
			  body: query
			}, function (error, response) {
			  if(error){
			   	reply(error).code(500);
			  }else{
			   	reply(response).code(200);
			  }
			});
		}
	},
	searchComposite: function(request, reply){
		if(validateQuery(request, reply)){
			var query = getCompositeQuery(request.payload.query);

			client.search({
			  index: c.indexName,
			  body: query
			}, function (error, response) {
			  if(error){
			   	reply(error).code(500);
			  }else{
			   	reply(response).code(200);
			  }
			});
		}
	}
};


function validateQuery(request, reply){
	var q = request.payload.query;
	if(!q || !q.accountId || !q.term){
		reply('Invalid Query').code(200);
	}

	return true;
}


function getGeneralQuery(q){
  var result = {
  	 "from": q.from || 0,
  	 "size": q.size || 10,
  	 "min_score": q.minScore || 0,
     "query": {
        "bool": {
        "must": [],
        "should": []
      }
     }
  };

  result.query.bool.should.push({ "match": { "name":  q.term }});
  result.query.bool.should.push({ "match": { "description":  q.term }});

  buildBaseFilterQueries(q, result);
  buildCategoryQuery(q, result);
  buildTagQuery(q, result);

  return result;
}

function getTextQuery(q){
  var result = {
  	 "from": q.from || 0,
  	 "size": q.size || 10,
  	 "min_score": q.minScore || 0,
     "query": {
        "bool": {
        "must": [],
        "should": []
      }
     }
  };

  q.type = 'Text';
  result.query.bool.should.push({ "match": { "name":  q.term }});
  result.query.bool.should.push({ "match": { "description":  q.term }});
  result.query.bool.should.push({ "match": { "data.value":  q.term }});

  buildBaseFilterQueries(q, result);
  buildCategoryQuery(q, result);
  buildTagQuery(q, result);

  return result;
}

function getImageQuery(q){
  var result = {
  	 "from": q.from || 0,
  	 "size": q.size || 10,
  	 "min_score": q.minScore || 0,
     "query": {
        "bool": {
        "must": [],
        "should": []
      }
     }
  };

  q.type = 'Image';
  result.query.bool.should.push({ "match": { "name":  q.term }});
  result.query.bool.should.push({ "match": { "description":  q.term }});

  buildBaseFilterQueries(q, result);
  buildCategoryQuery(q, result);
  buildTagQuery(q, result);

  return result;
}

function getCompositeQuery(q){
  var result = {
  	 "from": q.from || 0,
  	 "size": q.size || 10,
  	 "min_score": q.minScore || 0,
     "query": {
        "bool": {
        "must": [],
        "should": []
      }
     }
  };

  q.type = 'Composite';
  result.query.bool.should.push({ "match": { "name":  q.term }});
  result.query.bool.should.push({ "match": { "description":  q.term }});
  result.query.bool.should.push({ "match": { "data.header":  q.term }});
  result.query.bool.should.push({ "match": { "data.body":  q.term }});
  result.query.bool.should.push({ "match": { "data.footer":  q.term }});

  buildBaseFilterQueries(q, result);
  buildCategoryQuery(q, result);
  buildTagQuery(q, result);

  return result;
}

function buildBaseFilterQueries(querySource, query){

	if(querySource.accountId){
		query.query.bool.must.push({"match": { "accountId":  querySource.accountId }});
	}
	if(querySource.type){
		query.query.bool.must.push({"match": { "type":  querySource.type }});
	}

	if(querySource.isPrimary){
		query.query.bool.must.push({"match": { "isPrimary":  true }});
	}
	if(querySource.isSecondary){
		query.query.bool.must.push({"match": { "isSecondary":  true }});
	}
	if(querySource.isNominal){
		query.query.bool.must.push({"match": { "isNominal":  true }});
	} 
}

function buildCategoryQuery(querySource, query){
    if(querySource.categories && querySource.categories.length > 0){
      for (var i = querySource.categories.length - 1; i >= 0; i--) {
        var categoriesQuery = {
          "nested": {
              "path": "categories",
              "query": {
                "bool": {
                  "must": [{
                      "match_phrase": {
                        "categories.name": querySource.categories[i]
                      }
                   }]
                }
              }
            }
          };
        query.query.bool.must.push(categoriesQuery);
      }
    }
}

function buildTagQuery(querySource, query){
    if(querySource.tags && querySource.tags.length > 0){
	  var tagQuery = {
	      "nested": {
	        "path": "tags",
	        "score_mode": "sum",
	        "query": {
	          "function_score": {
	            "query": {       
	                "bool":{
	                  "should": []   
	                }
	          },
		        "script_score": {
		          "script": "doc[\"weight\"].value"
		        }
		        }
		      }
		    }
		};

	    for (var i = querySource.tags.length - 1; i >= 0; i--) {
	      tagQuery.nested.query.function_score.query.bool.should.push(
	        {
	          "match": {
	            "tags.name": querySource.tags[i]
	          }
	       });
	    }

	    query.query.bool.should.push(tagQuery);
	}
}