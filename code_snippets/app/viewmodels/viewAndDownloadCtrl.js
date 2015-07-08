app.controller("ViewAndDownloadCtrl", ["$scope", "$routeParams", "storageService","toaster",
    function ($scope, $routeParams, storageService, toaster) {
        
    $scope.currentId = $routeParams.id;
    $scope.attachedFiles = storageService.selectedSnippet();
    $scope.selectedFile = $scope.attachedFiles[$scope.currentId].id;
 
    $scope.$watch("selectedFile", function () {
        try{
            for (var i in $scope.attachedFiles) {
                if ($scope.selectedFile === $scope.attachedFiles[i].id)
                    $scope.filePosition = i;
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