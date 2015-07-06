app.controller("ViewController", ["$scope", "$routeParams", "viewService",
    function ($scope, $routeParams, viewService) {

    $scope.currentId = $routeParams.id;
    $scope.attachedFiles = viewService.selectedSnippet();
    $scope.selectedFile = $scope.attachedFiles[$scope.currentId].id;

   
    $scope.$watch("selectedFile", function () {
        try{
            for (var i in $scope.attachedFiles) {
                if ($scope.selectedFile === $scope.attachedFiles[i].id)
                    $scope.filePosition = i;
            }
        } catch (e) {
            //TODO: add toastr message for error
            console.log(e);
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
      
}]);