app.controller('scheduledCampaignController', ($scope, NgTableParams, $http, $rootScope) => {
    function fetchCampaigns() {
        $http({
            url: `${$scope.SERVER_URL}api/v1/campaign/all`,
            method: 'GET'
        })
        .then(
            function (response) {
                if(response?.data) {
                    let campaigns = []
                    for (let i = 0; i < response.data.length; i++) {
                        const element = response.data[i];

                        if(element.dateFrom && !!element.approvedBy) {
                            if(moment(element.dateFrom).format() > moment().format()) campaigns.push(element)
                        }
                    }

                    $scope.campaigns = campaigns
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
        $scope.ScheduledCampaigns = new NgTableParams({}, { dataset: $scope.campaigns });
    }

    $scope.redirectToCampaignManage = function (item) {
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
})