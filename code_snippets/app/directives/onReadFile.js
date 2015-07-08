app.directive("onReadFile", function () {
    return {
        restrict: "A",
        link: function (scope, element) {
            element.on("change", function (onChangeEvent) {
                var reader = new FileReader();
                reader.onload = function () {
                    var file = element[0].files;
                    scope.$apply(function () {
                        scope.localCopyOfAttachedFiles.push({
                            'id': getRandomId(scope.idStorage, 1, 20),
                            'fileName': file[0].name,
                            'creationDate': file[0].lastModifiedDate,
                            'content': reader.result
                        });
                    });
                };
                try {
                    reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
                    } catch (e) {
                    scope.pop("error", "Error", e.message);
                }
                
            });
        }
    };
});