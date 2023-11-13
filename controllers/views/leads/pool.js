app.controller('LeadsManagementPoolController', ($scope, NgTableParams, $mdSidenav, $http, $rootScope) => {
    $scope.lead = {}
    $scope.leads = []
    $scope.campaign = {}

    /* default run */ 
    if($rootScope.campaign?.id) {
        $scope.campaign = $rootScope.campaign
        $rootScope.campaign = null
    } else {
        $scope.campaign = {}
        $rootScope.campaign = null
        $rootScope.campaignId = null
    }

    /* set tables */
    function setCampaignLeads() {
        $scope.CampaignLeads = new NgTableParams({}, { dataset: $scope.leads });
    }
    setCampaignLeads()

    /* fetch */
    function fetchLeads() {
        let url = `${$scope.SERVER_URL}api/v1/lead/all`

        if($scope.campaign?.id) url = `${$scope.SERVER_URL}api/v1/lead/campaign/${$scope.campaign.id}`

        $http({
            url: url,
            method: 'GET'
        })
        .then(
            function (response) {
                if(response?.data) {
                    $scope.leads = response.data
                    setCampaignLeads()
                }
            },
            function (err) { // optional
                console.log(err)
            }
        );
    }
    fetchLeads()

    /* functions */
    $scope.openSideNav = function (nav, item) {
        $scope.lead = item
        $mdSidenav(nav).toggle()
    }

    $scope.closeSideNav = function (nav) {
        $scope.lead = {}
        $mdSidenav(nav).toggle()
    }

    $scope.setRootLeadData = function (lead) {
        $rootScope.lead = lead
        $scope.closeSideNav('leads-management-leads')
    }

    $scope.setRootCampaignId = function () {
        if($scope.campaign?.id) {
            $rootScope.campaignId = $scope.campaign.id
        }
    }
})