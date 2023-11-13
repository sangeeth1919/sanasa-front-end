app.controller('giftDistributionController', ($scope, NgTableParams, $mdSidenav, $http) => {
    $scope.gift = {}
    $scope.gifts = []

    var data = [
        {
            id: 'CAMP00000001',
            winner: 'OutDoor Campaign',
            date: '23 Feb 2021',
            createdBy: 'supervisor - Nalinda',
            approvedBy: 'supervisor - Anoj',
            nic: '962476456V',
            address: '78 Galle Road Viraketiya, Main Street, Colombo 05.',
            contact: '+94777123123',
            gift: 'Apple 11 pro max',
            message: 'Text'
        },
    ];

    function setGift() {
        $scope.GiftDistribution = new NgTableParams({}, { dataset: $scope.gifts });
    }

    function fetchGifts() {
        $http({
            url: `${$scope.SERVER_URL}api/v1/campaign/gifts/all`,
            method: 'GET'
        })
            .then(
                function (response) {
                    if (response?.data) {
                        $scope.gifts = response.data
                        setGift()
                    }
                },
                function (err) { // optional
                    console.log(err)
                }
            );
    }
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
    fetchGifts()
    fetchCampaigns()

    $scope.saveGift = function () {
        if($scope.gift?.id) {
            $http({
                url: `${$scope.SERVER_URL}api/v1/campaign/gifts/update`,
                method: 'PATCH',
                data: $scope.gift
            })
                .then(
                    function (response) {
                        fetchGifts()
                        $scope.gift = {};
                        $scope.closeSideNav('campaign-management-gift-distribution')
                        alert("Campaign gift updated")
                    },
                    function (err) { // optional
                        console.log(err)
                    }
                );
        } else {
            $http({
                url: `${$scope.SERVER_URL}api/v1/campaign/gifts/create`,
                method: 'POST',
                data: {
                    createdBy: 'test user',
                    date: moment().format('YYYY MMMM DD'),
                    ...$scope.gift
                }
            })
                .then(
                    function (response) {
                        fetchGifts()
                        $scope.gift = {};
                        $scope.closeSideNav('campaign-management-gift-distribution')
                        alert("Campaign gift created")
                    },
                    function (err) { // optional
                        console.log(err)
                    }
                );
        }
    }

    $scope.removeGift = function (id) {
        $http({
            url: `${$scope.SERVER_URL}api/v1/campaign/gifts/delete/${id}`,
            method: 'DELETE'
        })
            .then(
                function (response) {
                    fetchGifts()

                    alert("Campaign gift deleted")
                },
                function (err) { // optional
                    console.log(err)
                }
            );
    }

    $scope.openSideNav = function (nav, item) {
        $scope.gift = item
        $mdSidenav(nav).toggle()
    }

    $scope.closeSideNav = function (nav) {
        $scope.gift = {}
        $mdSidenav(nav).toggle()
    }

})