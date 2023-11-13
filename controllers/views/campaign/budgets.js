app.controller('budgetsCampaignController', ($scope, NgTableParams, $http, $rootScope) => {
    $scope.budgets = [];
    $scope.total = 0;

    function fetchBudgets() {
        $http({
            url: `${$scope.SERVER_URL}api/v1/campaign/budgets/all`,
            method: 'GET'
        })
            .then(
                function (response) {
                    if (response?.data) {
                        $scope.budgets = response.data
                    }

                    $scope.handleBudgetTotalChange()
                },
                function (err) { // optional
                    console.log(err)
                }
            );
    }
    fetchBudgets()

    $scope.handleOnSave = function () {
        $http({
            url: `${$scope.SERVER_URL}api/v1/campaign/budgets/updateAll`,
            method: 'PATCH',
            data: {
                budgets: $scope.budgets
            }
        })
            .then(
                function (response) {
                    fetchBudgets()

                    alert("budgets updated")
                },
                function (err) { // optional
                    console.log(err)
                }
            );
    }


    $scope.handleBudgetTotalChange = function() {
        let total = 0;
        
        for (let i = 0; i < $scope.budgets.length; i++) {
            const element = $scope.budgets[i]
            if (element.value) total += parseFloat(element.total)
        }

        $scope.total = total
    }
})