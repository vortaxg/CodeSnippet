app.factory("loadDataService", ["$http", "$q",
function ($http, $q) {
    return {
        getData: function () {
            return $http.get('app/services/phones.json').then(function (response) {
                if (typeof response.data === 'object') {
                    return response.data;
                } else {
                    return $q.reject(response.data);
                }
            }, function (response) {
                return $q.reject(response.data);
            });

        }
    }
}]);