app.controller("DetailsSnippetCtrl", ["$scope", "$routeParams", "$location", "storageService", "toaster",
function ($scope, $routeParams, $location, storageService, toaster) {

    var currentId = $routeParams.id,
    snippetPosition = storageService.selectSnippetPosition(currentId);

    $scope.localCopyOfSelectedSnippet = storageService.makeLocalCopyOfSelectedSnippet(snippetPosition);
    $scope.localCopyOfAttachedFiles = [];
    $scope.idStorage = [];

    (function () {
        for (var key in $scope.localCopyOfSelectedSnippet.attachedFiles) {
            if ($scope.localCopyOfSelectedSnippet.attachedFiles.hasOwnProperty(key)) {
                $scope.localCopyOfAttachedFiles.push($scope.localCopyOfSelectedSnippet.attachedFiles[key]);
                $scope.idStorage.push($scope.localCopyOfSelectedSnippet.attachedFiles[key].id);
            }
        }
    })();

    $scope.saveToStorage = function () {
        try {
            storageService.saveToStorage(snippetPosition, $scope.localCopyOfSelectedSnippet, $scope.localCopyOfAttachedFiles);
            $scope.localCopyOfSelectedSnippet = storageService.makeLocalCopyOfSelectedSnippet(snippetPosition);
        } catch (e) {
            $scope.pop("error", "Error", e.message);
        }
    };

    $scope.goToMainLocation = function () {
       $location.path("/");
    };

    $scope.removeItem = function (index) {
        $scope.localCopyOfAttachedFiles.splice(index, 1);
    }

    $scope.editItem = function (index) {
        var link = "view/" + index;
        $location.path(link);
    }
    $scope.pop = function (type, title, textMessage) {
        toaster.pop({
            type: type,
            title: title,
            body: textMessage,
            showCloseButton: true

        });
    };
}]);

