app.controller('CampaignManagementController', ($scope, NgTableParams, $mdSidenav, $http, $rootScope) => {

    $scope.campaign = {};
    $scope.campaigns = [];
    $scope.CampaignOptions = [
        {
            link: '#/campaign-management/new',
            label: 'New Campaign'
        },
        {
            link: '#/campaign-management/scheduled',
            label: 'Scheduled Campaign'
        },
        {
            link: '#/campaign-management/followup',
            label: 'Campaign Followup'
        },
    ]

    $scope.socials = [
        {
            name: 'Facebook',
            link: '',
            img: 'public/images/social-media/facebook.png'
        },
        {
            name: 'Twitter',
            link: '',
            img: 'public/images/social-media/twitter.png'
        },
        {
            name: 'Linkedin',
            link: '',
            img: 'public/images/social-media/linkedin.png'
        },
        {
            name: 'Youtube',
            link: '',
            img: 'public/images/social-media/youtube.png'
        },
        {
            name: 'Instagram',
            link: '',
            img: 'public/images/social-media/instagram.png'
        },
        {
            name: 'Google',
            link: '',
            img: 'public/images/social-media/google.png'
        },
        {
            name: 'Whatsapp',
            link: '',
            img: 'public/images/social-media/whatsapp.png'
        },
    ]

    $scope.progress = 86
    $scope.today = new Date()

    new Calendar({
        id: '#campaign-management-event-calendar',
        theme: "glass",
        weekdayDisplayType: "short",
        monthDisplayType: "long",
        primaryColor: '#1F43F0'
    });

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

    var onGoingCampaignTempData = [
        {
            id: 'SL00000001', 
            name: 'Townstorming', 
            location: 'No 48, Chitra Lane, Narahenpita', 
            date: '23 Feb 2021', 
            region: 'Sample',
            zone: 'Sample',
            leads: 20,
            progress: 'pending',
            location: 'https://goo.gl/maps/3YMrztj6k3vHV',
            expectedRecruitment: 300,
            spoMeAssessor: 'sample',
            budgetSchedule: 500000,
            criteria: 'GWP',
            outcome: '200',
            outcomePercentage: '66.7 %',
            utilizedBudget: 500000,
            budgetExceeded: 500000,
            totalSpent: 500000,
            images: [
                {
                    file: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png',
                    name: 'image 1'
                },
                {
                    file: 'https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg',
                    name: 'image 2'
                },
                {
                    file: 'https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg',
                    name: 'image 3'
                }
            ]
        },
        {
            id: 'SL00000001', 
            name: 'Townstorming', 
            location: 'No 48, Chitra Lane, Narahenpita', 
            date: '23 Feb 2021', 
            region: 'Sample',
            zone: 'Sample',
            leads: 20,
            progress: 'cancelled',
            location: 'https://goo.gl/maps/3YMrztj6k3vHV',
            expectedRecruitment: 300,
            spoMeAssessor: 'sample',
            budgetSchedule: 500000,
            criteria: 'GWP',
            outcome: '200',
            outcomePercentage: '66.7 %',
            utilizedBudget: 500000,
            budgetExceeded: 500000,
            totalSpent: 500000,
        },
        {
            id: 'SL00000001', 
            name: 'Townstorming', 
            location: 'No 48, Chitra Lane, Narahenpita', 
            date: '23 Feb 2021', 
            region: 'Sample',
            zone: 'Sample',
            leads: 20,
            progress: 'ongoing',
            location: 'https://goo.gl/maps/3YMrztj6k3vHV',
            expectedRecruitment: 300,
            spoMeAssessor: 'sample',
            budgetSchedule: 500000,
            criteria: 'GWP',
            outcome: '200',
            outcomePercentage: '66.7 %',
            utilizedBudget: 500000,
            budgetExceeded: 500000,
            totalSpent: 500000,
        },
    ];

    function setOnGoingCampaigns () {
        $scope.OngoingCampaigns = new NgTableParams({}, { dataset: $scope.campaigns });
    }
    //setOnGoingCampaigns(onGoingCampaignTempData)

    $scope.isValidURL = function (string) {
        if (!string) return false
        
        var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        return (res !== null)
      };

    $scope.openSideNav = function (nav, item) {
        $scope.campaign = item;
        $mdSidenav(nav).toggle();
    };

    $scope.closeSideNav = function (nav) {
        $scope.campaign = {};
        $mdSidenav(nav).toggle();
    };

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
    
})