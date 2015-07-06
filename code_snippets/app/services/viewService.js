app.factory('viewService', ['storageService', function (storageService) {
    var factory = {};
    factory.selectedSnippet = function () {
        return storageService.selectedSnippet.attachedFiles;
    }
    
    return factory;
}]);