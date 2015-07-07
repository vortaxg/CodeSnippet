app.factory("storageService", ["snippets", "$filter", function (snippets, $filter) {

    var factory = {},
        selectedSnippet = {},
        filteredStorage = [],
        storage = snippets.storage;

    factory.createFilteredStorage = function (category) {
        var categoryName = category || "MVC";
        filteredStorage = [];
        for (var i = 0; i < storage.length; i++) {
            if (storage[i].categoryName === categoryName) {
                filteredStorage.push(storage[i]);
            }
        }
        return filteredStorage;
    };

    factory.filterByPredicate = function (predicate, type) {
        var filter = $filter("filter"),
            selectedStorage;
        if (type === "full") {
            selectedStorage = storage;
        } else {
            selectedStorage = filteredStorage;
        }
        return filter(selectedStorage, predicate, false);
    };

    factory.orderBy = function (selector, reverse) {
        var predicate = selector;
        var orderBy = $filter("orderBy");
        if (reverse) {
            return filteredStorage.reverse();
        } else {
            return filteredStorage = orderBy(filteredStorage, predicate);
        }
    };

    factory.selectSnippetPosition = function (id) {
        var currentId = id;
        for (var key in storage) {
            if (storage[key].id == currentId) {
                return key;
            }
        }
    };

    factory.selectSnipet = function(position) {
        var snippetPosition = position;
        selectedSnippet = {
            snippetName: storage[snippetPosition].snippetName,
            description: storage[snippetPosition].description,
            authorName: storage[snippetPosition].authorName,
            creatingDate: storage[snippetPosition].creatingDate,
            attachedFiles: storage[snippetPosition].attachedFiles
        }
        return selectedSnippet;
    };

    factory.saveSelectedSnipet = function(position, snippetForSave, attachedFiles) {
        var snippetPosition = position;
        storage[snippetPosition].snippetName = snippetForSave.snippetName;
        storage[snippetPosition].description = snippetForSave.description;
        storage[snippetPosition].authorName = snippetForSave.authorName;
        storage[snippetPosition].creatingDate = snippetForSave.creatingDate;
        storage[snippetPosition].attachedFiles = attachedFiles;
    };

    factory.selectedSnippet = function () {
        return selectedSnippet.attachedFiles;
    }

    return factory;
}]);