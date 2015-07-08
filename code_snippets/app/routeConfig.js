app.config(["$routeProvider",function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "/app/views/main.html",
            controller: "OutputDataCtrl"
        })
       .when("/details/:id", {
           templateUrl: "/app/views/details.html",
           controller: "DetailsSnippetCtrl"
       })
       .when("/view/:id", {
           templateUrl: "/app/views/view.html",
           controller: "ViewAndDownloadCtrl"
       })
       .otherwise({ redirectTo: "/" });
}]);