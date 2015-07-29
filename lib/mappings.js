exports.mappings = {
	 "Text":{
        	"dynamic": "false",
			"properties":{

				"accountId":{
					"type": "string"
				},

				"type": {
					"type": "string"
				},
				
				"description": {
					"type": "string"
				},

				"name": {
					"type": "string"
				},


				"isActive": {
					"type": "boolean"
				},

				"isPrimary": {
					"type": "boolean"
				},

				"isSecondary": {
					"type": "boolean"
				},

				"isNominal": {
					"type": "boolean"
				},

				"tags": {
					"type": "nested",
					"properties": {
						"name": {
							"type": "string"
						},
						"weight": {
							"type": "integer"
						}
					}
				},

				"categories": {
					"type": "nested",
					"properties": {
						"name": {
							"type": "string"
						}
					}
				},

				"data": {
					"type": "nested",
					"properties": {
						"value": {
							"type": "string"
						}
					}
				}
			}
		}
	,
		"Image": {
        	"dynamic": "false",
			"properties":{

				"accountId":{
					"type": "string"
				},

				"type": {
					"type": "string"
				},

				"description": {
					"type": "string"
				},

				"name": {
					"type": "string"
				},


				"isActive": {
					"type": "boolean"
				},

				"isPrimary": {
					"type": "boolean"
				},

				"isSecondary": {
					"type": "boolean"
				},

				"isNominal": {
					"type": "boolean"
				},

				"tags": {
					"type": "nested",
					"properties": {
						"name": {
							"type": "string"
						},
						"weight": {
							"type": "integer"
						}
					}
				},

				"categories":{
					"type": "nested",
					"properties": {
						"name": {
							"type": "string"
						}
					}
				},

				"data":{
					"type": "nested",
					"properties": {
						"name": {
							"type": "string", "index": "not_analyzed"
						},
						"width": {
							"type": "integer", "index": "not_analyzed"
						},
						"height": {
							"type": "integer", "index": "not_analyzed"
						},
						"crops": {
							"type": "nested", 
							"properties": {
								"name": {
									"type": "string", "index": "not_analyzed"
								},
								"sx": {
									"type": "integer", "index": "not_analyzed"
								},
								"sy": {
									"type": "integer", "index": "not_analyzed"
								},
								"x": {
									"type": "integer", "index": "not_analyzed"
								},
								"y": {
									"type": "integer", "index": "not_analyzed"
								},
								"cx": {
									"type": "integer", "index": "not_analyzed"
								},
								"cy": {
									"type": "integer", "index": "not_analyzed"
								},
								"ratio": {
									"type": "string", "index": "not_analyzed"
								},
								"gravity": {
									"type": "string", "index": "not_analyzed"
								},
								"mode": {
									"type": "string", "index": "not_analyzed"
								}
							}
						}
					}
				}
			}
	},
		"Composite":{
        	"dynamic": "false",
			"properties":{

				"accountId":{
					"type": "string"
				},

				"type": {
					"type": "string"
				},

				"description": {
					"type": "string"
				},

				"name": {
					"type": "string"
				},


				"isActive": {
					"type": "boolean"
				},

				"isPrimary": {
					"type": "boolean"
				},

				"isSecondary": {
					"type": "boolean"
				},

				"isNominal": {
					"type": "boolean"
				},

				"tags":{
					"type": "nested",
					"properties": {
						"name": {
							"type": "string"
						},
						"weight": {
							"type": "integer"
						}
					}
				},

				"categories":{
					"type": "nested",
					"properties": {
						"name": {
							"type": "string"
						}
					}
				},

				"data":{
					"type": "nested",
					"properties": {
						"header": {
							"type": "string"
						},
						"body": {
							"type": "string"
						},
						"footer": {
							"type": "string"
						},
						"imageUrl": {
							"type": "string", "index": "not_analyzed"
						},
						"ctaText": {
							"type": "string"
						},
						"ctaUrl": {
							"type": "string", "index": "not_analyzed"
						}
					}
				}
			}
		}
};