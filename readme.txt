relevator content index service...



POST _search
{
   "query": {
      "bool": {
      "must": [
       {"match": { "accountId":  "552844229d0846bc1ff170d2" }},
       { "match": { "isPrimary": true   }},
       {
          "nested": {
            "path": "categories",
            "query": {
              "bool": {
                "must": [
                  {
                    "match": {
                      "categories.name": "Top Destinations"
                    }
                  }
                ]
              }
            }
          }
        }
       ],
      "should": [
        { "match": { "name":  "Holiday" }},
        { "match": { "data.value":  "Holiday Header" }},
        {
            "nested": {
              "path": "tags",
              "score_mode": "sum",
              "query": {
                "function_score": {
                  "query": {
                    "match": {
                      "tags.name": "Holiday Vacations"
                    }
                  },
                  "script_score": {
                    "script": "doc[\"weight\"].value"
                  }
                }
              }
            }
        }
      ]
    }
   }
}