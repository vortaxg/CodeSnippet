﻿app.factory("storageService", ["$filter",
function ($filter) {

    var factory = {},
        localCopyOfSelectedSnippet = {},
        filteredStorage = [],
        receiveData = false,
        storage;
    
    factory.makeLocalStorage = function (inputData) {
        if (receiveData === false) {
            storage = inputData;
            receiveData = true;
        }
     }
    
    factory.createFilteredStorage = function (category) {
        filteredStorage = storage.filter(function (snippet) {
            return snippet.categoryName === (category || "MVC");
        });
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

    factory.orderByPredicate = function (predicate, reverse) {
        var orderBy = $filter("orderBy");
        if (reverse) {
            return filteredStorage.reverse();
        } else {
            return filteredStorage = orderBy(filteredStorage, predicate);
        }
    };

    factory.selectSnippetPosition = function (id) {
        var currentId = id,
            snippetPosition = 0;
        for (var key in storage) {
            if (storage.hasOwnProperty(key)) {
                if (storage[key].id === +currentId) {
                    snippetPosition= key;
                }
            }
        }
        return snippetPosition;
    };

    factory.makeLocalCopyOfSelectedSnippet = function (position) {
        var selectedSnippet = storage[position];
        localCopyOfSelectedSnippet = {
            snippetName: selectedSnippet.snippetName,
            description: selectedSnippet.description,
            authorName: selectedSnippet.authorName,
            creatingDate: selectedSnippet.creatingDate,
            attachedFiles: selectedSnippet.attachedFiles
        }
        return localCopyOfSelectedSnippet;
    };

    factory.saveToStorage = function (position, snippetForSave, attachedFiles) {
        var destinationSnippet = storage[position];
        destinationSnippet.snippetName = snippetForSave.snippetName;
        destinationSnippet.description = snippetForSave.description;
        destinationSnippet.authorName = snippetForSave.authorName;
        destinationSnippet.creatingDate = snippetForSave.creatingDate;
        destinationSnippet.attachedFiles = attachedFiles;
    };

    factory.returnAttachedFiles = function () {
        return localCopyOfSelectedSnippet.attachedFiles;
    };
    return factory;
}]);