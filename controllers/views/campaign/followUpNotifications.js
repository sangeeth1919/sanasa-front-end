app.controller('followUpNotificationsCampaignController', ($scope, NgTableParams, $mdSidenav, $http) => {
    $scope.tabIndex = 0;

    let tempFollowUpNotification = {
        recipients: []
    }

    $scope.followUpNotification = tempFollowUpNotification;
    $scope.campaigns = [];

    $scope.sms = [];
    $scope.notifications = [];
    $scope.emails = [];
    $scope.e_notice = [];

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

    function fetchFollowUpNotifications() {
        $http({
            url: `${$scope.SERVER_URL}api/v1/campaign/followUpNotifications/all`,
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
    fetchFollowUpNotifications()

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
        if(item.date) item['date'] = new Date(item.date)
        if(item.time) item['time'] = new Date(item.time)

        $scope.followUpNotification = item;
        $mdSidenav(nav).toggle();
    };

    $scope.closeSideNav = function (nav) {
        $scope.followUpNotification = tempFollowUpNotification;
        $mdSidenav(nav).toggle();
    };
    
    $scope.saveFollowUpNotification = function() {
        if($scope.followUpNotification?.id) {
            $http({
                url: `${$scope.SERVER_URL}api/v1/campaign/followUpNotifications/update`,
                method: 'PATCH',
                data: $scope.followUpNotification
            })
                .then(
                    function (response) {
                        fetchFollowUpNotifications()
                        $scope.followUpNotification = tempFollowUpNotification;
                        $scope.closeSideNav('campaign-management-followup-notifications')
                        alert("Campaign follow up notification updated")
                    },
                    function (err) { // optional
                        console.log(err)
                    }
                );
        }else {
            $http({
                url: `${$scope.SERVER_URL}api/v1/campaign/followUpNotifications/create`,
                method: 'POST',
                data: {
                    type: getType(),
                    createdBy: 'test user',
                    ...$scope.followUpNotification
                }
            })
                .then(
                    function (response) {
                        fetchFollowUpNotifications()
                        $scope.followUpNotification = tempFollowUpNotification;
                        $scope.closeSideNav('campaign-management-followup-notifications')
                        alert("Campaign follow up notification created")
                    },
                    function (err) { // optional
                        console.log(err)
                    }
                );
        }
    }

    $scope.removeSocialMedia = function (id) {
        $http({
            url: `${$scope.SERVER_URL}api/v1/campaign/followUpNotifications/delete/${id}`,
            method: 'DELETE'
        })
            .then(
                function (response) {
                    fetchFollowUpNotifications()

                    alert("Campaign follow up notification deleted")
                },
                function (err) { // optional
                    console.log(err)
                }
            );
    }
})