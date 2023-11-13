app.controller('followUpCampaignController', ($scope, NgTableParams, $mdSidenav, $http) => {
    
    let socials = [
        {
            icon: 'phone',
            link: 'tel:+123456789'
        },
        {
            icon: 'email',
            link: 'mailto:jwareautomation@gmail.com'
        },
        {
            icon: 'whatsapp',
            link: 'tel:+123456789'
        },
        {
            icon: 'facebook-messenger',
            link: 'https://www.messenger.com/'
        },
        {
            icon: 'skype',
            link: 'https://www.skype.com/en/'
        },
        {
            icon: 'linkedin',
            link: 'https://www.linkedin.com/'
        },
    ]
    let tempFollowUp = {
        recipients: []
    }

    $scope.followUp = tempFollowUp
    $scope.socials = socials
    $scope.followUps = []

    var data = [
        {
            id: 'CAMP00000001',
            name: 'OutDoor Campaign',
            date: '23 Feb 2021',
            createdBy: 'supervisor - Nalinda',
            approvedBy: 'supervisor - Anoj',
            recipientOrGroup: []
        },
        {
            id: 'CAMP00000002',
            name: 'OutDoor Campaign',
            date: '23 Feb 2021',
            createdBy: 'supervisor - Nalinda',
            approvedBy: 'supervisor - Anoj',
            recipientOrGroup: []
        },
        {
            id: 'CAMP00000003',
            name: 'OutDoor Campaign',
            date: '23 Feb 2021',
            createdBy: 'supervisor - Nalinda',
            approvedBy: 'supervisor - Anoj',
            recipientOrGroup: []
        },
    ];
    function fetchFollowUp() {
        $http({
            url: `${$scope.SERVER_URL}api/v1/campaign/followUp/all`,
            method: 'GET'
        })
            .then(
                function (response) {
                    if (response?.data) {
                        $scope.followUps = response.data

                        setFollowUp()
                    }
                },
                function (err) { // optional
                    console.log(err)
                }
            );
    }
    fetchFollowUp()

    function fetchCampaigns() {
        $http({
            url: `${$scope.SERVER_URL}api/v1/campaign/all`,
            method: 'GET'
        })
            .then(
                function (response) {
                    if (response?.data) {
                        $scope.campaigns = response.data.sort((a, b) => {
                            if (a.name < b.name) { return -1; }
                            if (a.name > b.name) { return 1; }
                            return 0;
                        })
                    }
                },
                function (err) { // optional
                    console.log(err)
                }
            );
    }
    fetchCampaigns()
    
    function setFollowUp() {
        $scope.FollowUpCampaigns = new NgTableParams({}, { dataset: $scope.followUps });
    }

    $scope.saveFollowUp = function() {
        if($scope.followUp?.id) {
            $http({
                url: `${$scope.SERVER_URL}api/v1/campaign/followUp/update`,
                method: 'PATCH',
                data: $scope.followUp
            })
                .then(
                    function (response) {
                        fetchFollowUp()
                        $scope.followUp = tempFollowUp;
                        $scope.closeSideNav('campaign-management-followup')
                        alert("Campaign follow up updated")
                    },
                    function (err) { // optional
                        console.log(err)
                    }
                );
        }else {
            $http({
                url: `${$scope.SERVER_URL}api/v1/campaign/followUp/create`,
                method: 'POST',
                data: {
                    createdBy: 'test user',
                    ...$scope.followUp
                }
            })
                .then(
                    function (response) {
                        fetchFollowUp()
                        $scope.followUp = tempFollowUp;
                        $scope.closeSideNav('campaign-management-followup')
                        alert("Campaign follow up created")
                    },
                    function (err) { // optional
                        console.log(err)
                    }
                );
        }
    }

    $scope.removeFollowUp = function (item) {
        if(!item.id) return

        $http({
            url: `${$scope.SERVER_URL}api/v1/campaign/followUp/delete/${item.id}`,
            method: 'DELETE'
        })
            .then(
                function (response) {
                    fetchFollowUp()

                    alert("Campaign follow up deleted")
                },
                function (err) { // optional
                    console.log(err)
                }
            );
    }

    $scope.openSideNav = function (nav, item) {
        if(item.dateFrom) item['dateFrom'] = new Date(item.dateFrom)
        if(item.timeFrom) item['timeFrom'] = new Date(item.timeFrom)
        if(item.dateTo) item['dateTo'] = new Date(item.dateTo)
        if(item.timeTo) item['timeTo'] = new Date(item.timeTo)

        $scope.followUp = item;
        $mdSidenav(nav).toggle();
    };

    $scope.closeSideNav = function (nav) {
        $scope.followUp = tempFollowUp;
        $mdSidenav(nav).toggle();
    };
})