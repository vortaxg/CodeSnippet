app.controller("MainController", ["$scope", "mainService", "$filter", "$parse",
    function ($scope, mainService) {

        $scope.filteredStorage = mainService.createFilteredStorage();
        var currentCategory;

        function updatePagination() {
            var begin = (($scope.currentPage - 1) * $scope.itemsPerPage.value),
                end = begin + $scope.itemsPerPage.value;
            $scope.paginationStorage = $scope.filteredStorage.slice(begin, end);
        }

        $scope.createFilteredStorage = function (selectedCategoryName) {
            currentCategory = selectedCategoryName;
            $scope.filteredStorage = mainService.createFilteredStorage(currentCategory);
            updatePagination();
        };

        $scope.rowsPerPage = [
                {
                    value: 10,
                    name: "View 10 items per page"
                },
                {
                    value: 20,
                    name: "View 20 items per page"
                },
                {
                    value: 50,
                    name: "View 50 items per page"
                },
                {
                    value: 100,
                    name: "View 100 items per page"
                }
        ];

        $scope.itemsPerPage = $scope.rowsPerPage[0];
        $scope.paginationStorage = [],
        $scope.currentPage = 1,
        $scope.maxSize = 5;
        $scope.predicate = "snippetName";
        $scope.reverse = true;

        $scope.$watch("itemsPerPage.value", updatePagination);
        $scope.$watch("currentPage + numPerPage", updatePagination);

        $scope.filterByOrder = function (predicate) {
            $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
            $scope.predicate = predicate;
            $scope.filteredStorage = mainService.orderBy($scope.predicate, $scope.reverse);
            $scope.currentPage = 1;
            updatePagination();
        };

        $scope.search = function (searchCondition, type) {
            $scope.filteredStorage = mainService.search(searchCondition, type);
            if (!searchCondition) {
                $scope.filteredStorage = mainService.createFilteredStorage(currentCategory);
            }
            $scope.currentPage = 1;
            updatePagination();
        }
    }]);

