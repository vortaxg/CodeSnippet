app.config(["$routeProvider",function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "/app/views/main.html",
            controller: "MainController"
        })
       .when("/edit/:id", {
           templateUrl: "/app/views/edit.html",
           controller: "EditController"
       })
       .when("/view/:id", {
           templateUrl: "/app/views/view.html",
           controller: "ViewController"
       })
       .otherwise({ redirectTo: "/" });
}]);