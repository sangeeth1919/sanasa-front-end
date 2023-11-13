app.controller('allCampaignController', ($scope, NgTableParams, $http, $rootScope) => {
    $scope.campaigns = []
    var data = [
        {
            id: 'CAMP00000001',
            name: 'OutDoor Campaign',
            date: '23 Feb 2021',
            createdBy: 'supervisor - Nalinda',
            approvedBy: 'supervisor - Anoj'
        },
        {
            id: 'CAMP00000002',
            name: 'OutDoor Campaign',
            date: '23 Feb 2021',
            createdBy: 'supervisor - Nalinda',
            approvedBy: 'supervisor - Anoj'
        },
        {
            id: 'CAMP00000003',
            name: 'OutDoor Campaign',
            date: '23 Feb 2021',
            createdBy: 'supervisor - Nalinda',
            approvedBy: 'supervisor - Anoj'
        },
    ];
    
    function fetchCampaigns() {
        $http({
            url: `${$scope.SERVER_URL}api/v1/campaign/all`,
            method: 'GET'
        })
        .then(
            function (response) {
                if(response?.data) {
                    $scope.campaigns = response.data
                    setCampaigns()
                }
            },
            function (err) { // optional
                console.log(err)
            }
        );
    }
    fetchCampaigns()

    function setCampaigns() {
        $scope.AllCampaigns = new NgTableParams({}, { dataset: $scope.campaigns });
    }

    $scope.setCampaignDataToRoot = function (item) {
        if(item['dateFrom']) item['dateFrom'] = new Date(item.dateFrom)
        if(item['timeFrom']) item['timeFrom'] = new Date(item.timeFrom)
        if(item['dateTo']) item['dateTo'] = new Date(item.dateTo)
        if(item['timeTo']) item['timeTo'] = new Date(item.timeTo)

        $rootScope.campaign = item
    }

    $scope.removeCampaign = function (item) {
        if(!item.id) return

        $http({
            url: `${$scope.SERVER_URL}api/v1/campaign/delete/${item.id}`,
            method: 'DELETE'
        })
            .then(
                function (response) {
                    fetchCampaigns()

                    alert("Campaign deleted")
                },
                function (err) { // optional
                    console.log(err)
                }
            );
    }
    
    $scope.duplicateCampaign = function (id) {
        if(!id) return

        $http({
            url: `${$scope.SERVER_URL}api/v1/campaign/duplicate/${id}`,
            method: 'PUT'
        })
            .then(
                function (response) {
                    fetchCampaigns()

                    alert("Campaign duplicated")
                },
                function (err) { // optional
                    console.log(err)
                }
            );
    }
})