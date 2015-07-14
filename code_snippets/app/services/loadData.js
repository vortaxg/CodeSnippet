app.factory("loadData", function ($http, $q) {
    return {
        getSnippets: function () {
            return $http.get("app/services/phones.json")
             .then(function (response) {
                 if (true) {
                     return response.data;
                 } else {
                 
                     return $q.reject(response.data);
                 }

             }, function (response) {
                 
                 return $q.reject(response.data);
             });
                
            

        }
    };
});