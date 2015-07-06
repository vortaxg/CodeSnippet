app.directive("onReadFile", function () {
    return {
        restrict: "A",
        link: function (scope, element) {
            element.on("change", function (onChangeEvent) {
                var reader = new FileReader();
                reader.onload = function () {
                    var file = element[0].files;
                    scope.$apply(function () {
                        scope.tempStorage.push({
                            'id': scope.getRandomId(1, 10),
                            'fileName': file[0].name,
                            'creationDate': file[0].lastModifiedDate,
                            'content': reader.result
                        });
                    });
                };
                reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
            });
        }
    };
});