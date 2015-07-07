app.config(["$routeProvider",function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "/app/views/main.html",
            controller: "MainCtrl"
        })
       .when("/edit/:id", {
           templateUrl: "/app/views/edit.html",
           controller: "EditCtrl"
       })
       .when("/view/:id", {
           templateUrl: "/app/views/view.html",
           controller: "ViewCtrl"
       })
       .otherwise({ redirectTo: "/" });
}]);