app.controller('launchCampaignController', ($scope, NgTableParams, $mdSidenav, $http) => {
    $scope.campaigns = []
    $scope.campaign = {}

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
    $scope.socials = socials

    function fetchCampaigns() {
        $http({
            url: `${$scope.SERVER_URL}api/v1/campaign/all`,
            method: 'GET'
        })
        .then(
            function (response) {
                if(response?.data) {
                    $scope.campaigns = response.data
                    setOnGoingCampaigns()
                }
            },
            function (err) { // optional
                console.log(err)
            }
        );
    }
    fetchCampaigns()

    function fetchCampaignCriteria(id) {
        if (!id) return

        $http({
            url: `${$scope.SERVER_URL}api/v1/campaign/criteria/campaign/${id}`,
            method: 'GET'
        })
            .then(
                function (response) {
                    if (response?.data) {
                        $scope.criteria = response.data
                    }
                },
                function (err) { // optional
                    console.log(err)
                }
            );
    }

    function fetchCampaignArtworks(id) {
        if (!id) return

        $http({
            url: `${$scope.SERVER_URL}api/v1/campaign/artworks/campaign/${id}`,
            method: 'GET'
        })
            .then(
                function (response) {
                    if (response?.data) {
                        $scope.artworks = response.data
                    }
                },
                function (err) { // optional
                    console.log(err)
                }
            );
    }

    function setOnGoingCampaigns () {
        $scope.LaunchCampaigns = new NgTableParams({}, { dataset: $scope.campaigns });
    }

    $scope.openSideNav = function (nav, item) {
        $scope.campaign = item;
        fetchCampaignCriteria(item.id)
        fetchCampaignArtworks(item.id)
        $mdSidenav(nav).toggle();
    };

    $scope.closeSideNav = function (nav) {
        $scope.campaign = {};
        $mdSidenav(nav).toggle();
    };

    $scope.launchCampaign = function (nav) {
        $scope.campaign['launched'] = true

        $http({
            url: `${$scope.SERVER_URL}api/v1/campaign/update`,
            method: 'PATCH',
            data: $scope.campaign
        })
            .then(
                function (response) {
                    fetchCampaigns()
                    $scope.closeSideNav(nav)
                    alert("Campaign launched")
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