app.controller('EditController', ['$scope', '$routeParams', '$location', 'editService',
    function ($scope, $routeParams, $location, editService) {
        //Get ID out of current URL
        var currentId,
            snippetPosition;

        currentId = $routeParams.id;
        snippetPosition = editService.selectSnippetPosition(currentId)

        $scope.selectedSnippet = editService.selectSnipet(snippetPosition);
        $scope.tempStorage = [];
        $scope.tempIdStorage = [];
      

        (function () {
            for (var i in $scope.selectedSnippet.attachedFiles) {
                $scope.tempStorage.push($scope.selectedSnippet.attachedFiles[i]);
                $scope.tempIdStorage.push($scope.selectedSnippet.attachedFiles[i].id);
            }
        })();

        $scope.saveButton = function () {
            editService.saveSelectedSnipet(snippetPosition, $scope.selectedSnippet, $scope.tempStorage);
            $location.path("/");
        };

        $scope.cancelButton = function () {
            $location.path("/");
        };

        $scope.removeItem = function (index) {
            $scope.tempStorage.splice(index, 1);
        }

        $scope.editItem = function (index) {
            var link = 'view/' + index;
            $location.path(link);
        }

        $scope.getRandomId = function (minValue, maxValue) {
            var id = 0,
                min = minValue || 5,
                max = maxValue || 1000;
            do {
                id = Math.floor(Math.random() * (max - min + 1)) + min;
            } while ($scope.tempIdStorage.indexOf(id) >= 0)
            return id;
        }
    }]);

