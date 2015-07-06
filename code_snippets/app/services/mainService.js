app.factory('mainService', function ($filter, storageService) {
    var factory = {};

    factory.createFilteredStorage = function (category) {
        var categoryName = category || 'MVC';
        storageService.filteredStorage = [];

        for (var i = 0; i < storageService.storage.length; i++) {
            if (storageService.storage[i].categoryName === categoryName) {
                storageService.filteredStorage.push(storageService.storage[i]);
            }
        }
        return storageService.filteredStorage;
    };

    factory.search = function (predicate, type) {
        var predicate = predicate,
        filter = $filter('filter'),
        storage;

        if (type === 'full') {
            storage = storageService.storage;
        } else {
            storage = storageService.filteredStorage;
        }
        return filter(storage, predicate, false);
    }


    factory.orderBy = function (selector, reverse) {
        var predicate = selector;
        var orderBy = $filter('orderBy');
        if (reverse) {
            return storageService.filteredStorage.reverse();
        } else {
            return storageService.filteredStorage = orderBy(storageService.filteredStorage, predicate);
        }
    };

    return factory;

});