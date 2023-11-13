app.controller('socialMediaCampaignController', ($scope, NgTableParams, $mdSidenav, $http) => {
    $scope.tabIndex = 0;

    let tempSocialMedia = {
        artwork: []
    }
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

    $scope.socialMedia = tempSocialMedia;
    $scope.campaigns = []
    $scope.socials = socials
    $scope.sms = [];
    $scope.notifications = [];
    $scope.emails = [];
    $scope.e_notice = [];

    var data = [
        {
            id: 'CAMP00000001',
            name: 'OutDoor Campaign',
            date: '23 Feb 2021',
            createdBy: 'supervisor - Nalinda',
            approvedBy: 'supervisor - Anoj',
            images: [
                {
                    file: 'https://www.gettyimages.com/gi-resources/images/500px/983794168.jpg',
                    name: 'image 1'
                }
            ]
        },
        {
            id: 'CAMP00000002',
            name: 'OutDoor Campaign',
            date: '23 Feb 2021',
            createdBy: 'supervisor - Nalinda',
            approvedBy: 'supervisor - Anoj',
            images: [
                {
                    file: 'https://www.gettyimages.com/gi-resources/images/500px/983794168.jpg',
                    name: 'image 1'
                }
            ]
        },
        {
            id: 'CAMP00000003',
            name: 'OutDoor Campaign',
            date: '23 Feb 2021',
            createdBy: 'supervisor - Nalinda',
            approvedBy: 'supervisor - Anoj',
            images: [
                {
                    file: 'https://www.gettyimages.com/gi-resources/images/500px/983794168.jpg',
                    name: 'image 1'
                }
            ]
        },
    ];

    function getType() {
        let type = "sms";

        switch ($scope.tabIndex) {
            case 1:
                type = "notifications"
                break;
            case 1:
                type = "emails"
                break;
            case 1:
                type = "e_notice"
                break;
        
            default:
                type = "sms"
                break;
        }

        return type;
    }

    function setSmsCampaigns() {
        $scope.SmsCampaigns = new NgTableParams({}, { dataset: $scope.sms });
    }
    function setNotificationsCampaigns() {
        $scope.NotificationsCampaigns = new NgTableParams({}, { dataset: $scope.notifications });
    }
    function setEmailsCampaigns() {
        $scope.EmailsCampaigns = new NgTableParams({}, { dataset: $scope.emails });
    }
    function setENoticeCampaigns() {
        $scope.ENoticeCampaigns = new NgTableParams({}, { dataset: $scope.e_notice });
    }
    setSmsCampaigns()
    setNotificationsCampaigns()
    setEmailsCampaigns()
    setENoticeCampaigns()

    function fetchSocialMedia() {
        $http({
            url: `${$scope.SERVER_URL}api/v1/campaign/socialMedia/all`,
            method: 'GET'
        })
            .then(
                function (response) {
                    if (response?.data) {
                        $scope.sms = response.data?.sms
                        $scope.emails = response.data?.emails
                        $scope.notifications = response.data?.notifications
                        $scope.e_notice = response.data?.e_notice

                        setSmsCampaigns()
                        setNotificationsCampaigns()
                        setEmailsCampaigns()
                        setENoticeCampaigns()
                    }
                },
                function (err) { // optional
                    console.log(err)
                }
            );
    }
    fetchSocialMedia()

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

    $scope.openSideNav = function (nav, item) {
        if(item.dateFrom) item['dateFrom'] = new Date(item.dateFrom)
        if(item.timeFrom) item['timeFrom'] = new Date(item.timeFrom)
        if(item.dateTo) item['dateTo'] = new Date(item.dateTo)
        if(item.timeTo) item['timeTo'] = new Date(item.timeTo)

        $scope.socialMedia = item;
        $mdSidenav(nav).toggle();
    };

    $scope.closeSideNav = function (nav) {
        $scope.socialMedia = tempSocialMedia;
        $mdSidenav(nav).toggle();
    };

    $scope.saveSocialMedia = function() {
        if($scope.socialMedia?.id) {
            $http({
                url: `${$scope.SERVER_URL}api/v1/campaign/socialMedia/update`,
                method: 'PATCH',
                data: $scope.socialMedia
            })
                .then(
                    function (response) {
                        fetchSocialMedia()
                        $scope.socialMedia = tempSocialMedia;
                        $scope.closeSideNav('campaign-management-social-media')
                        alert("Campaign social media updated")
                    },
                    function (err) { // optional
                        console.log(err)
                    }
                );
        }else {
            console.log($scope.socialMedia)
            $http({
                url: `${$scope.SERVER_URL}api/v1/campaign/socialMedia/create`,
                method: 'POST',
                data: {
                    type: getType(),
                    createdBy: 'test user',
                    ...$scope.socialMedia
                }
            })
                .then(
                    function (response) {
                        fetchSocialMedia()
                        $scope.socialMedia = tempSocialMedia;
                        $scope.closeSideNav('campaign-management-social-media')
                        alert("Campaign social media created")
                    },
                    function (err) { // optional
                        console.log(err)
                    }
                );
        }
    }

    $scope.removeSocialMedia = function (id) {
        $http({
            url: `${$scope.SERVER_URL}api/v1/campaign/socialMedia/delete/${id}`,
            method: 'DELETE'
        })
            .then(
                function (response) {
                    fetchSocialMedia()
                    
                    alert("Campaign social media deleted")
                },
                function (err) { // optional
                    console.log(err)
                }
            );
    }
})