app.factory('editService',[ 'storageService', function (storageService) {
    var factory = {};

    factory.selectSnippetPosition = function (id) {
        var currentId = id;
        for (var key in storageService.storage) {
            if (storageService.storage[key].id == currentId) {
                return key;
            }
        }
    };
   
    factory.selectSnipet = function (position) {
         var snippetPosition = position;
          storageService.selectedSnippet = {
            snippetName: storageService.storage[snippetPosition].snippetName,
            description: storageService.storage[snippetPosition].description,
            authorName: storageService.storage[snippetPosition].authorName,
            creatingDate: storageService.storage[snippetPosition].creatingDate,
            attachedFiles: storageService.storage[snippetPosition].attachedFiles
        }
        return storageService.selectedSnippet;
    }

    factory.saveSelectedSnipet = function (position, snippetForSave,attachedFiles) {
        var snippetPosition = position;
        storageService.storage[snippetPosition].snippetName = snippetForSave.snippetName;
        storageService.storage[snippetPosition].description = snippetForSave.description;
        storageService.storage[snippetPosition].authorName = snippetForSave.authorName;
        storageService.storage[snippetPosition].creatingDate = snippetForSave.creatingDate;
        storageService.storage[snippetPosition].attachedFiles = attachedFiles;
    }
    return factory;
}]);