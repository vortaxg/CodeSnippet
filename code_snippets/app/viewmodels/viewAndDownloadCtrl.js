app.controller("ViewAndDownloadCtrl", ["$scope", "$routeParams", "storageService", "toaster",
    function ($scope, $routeParams, storageService, toaster) {

        var currentId = $routeParams.id;

        $scope.attachedFiles = storageService.returnAttachedFiles();
        $scope.selectedFile = $scope.attachedFiles[currentId].id;

        $scope.$watch("selectedFile", function () {
            try {
                for (var key in $scope.attachedFiles) {
                    if ($scope.attachedFiles.hasOwnProperty(key)) {
                        if ($scope.selectedFile === $scope.attachedFiles[key].id)
                            $scope.filePosition = key;
                    }
                }
            } catch (e) {
                $scope.pop("error", "Error", e.message);
            }
        });

        $scope.download = function () {
            var fileName,
                fileContent,
                a;

            fileName = $scope.attachedFiles[$scope.filePosition].fileName;
            fileContent = $scope.attachedFiles[$scope.filePosition].content;

            a = document.createElement("a");
            a.href = "data:attachment/csv," + fileContent;
            a.target = "_blank";
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
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