app.controller('LeadsManagementController', ($scope, NgTableParams, $mdSidenav, $rootScope, $http) => {

    let currentUserId = ''

    /* variables */
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
    $scope.campaign = {};
    $scope.leads = [];
    $scope.progress = 86
    $scope.today = new Date()
    $scope.leadConversionRate = 'daily'
    $scope.leadsBreakDownRate = 'daily'
    $scope.barChart = {
        labels: [],
        series: ['Self Leads', 'Assigned Leads', 'Leads Pool'],
        colors: ['#24C6EA', '#1F66F0', '#440DB8'],
        data: []
    }
    /* $scope.barChart = {
        labels: ['0', '1', '2', '3', '4', '5', '6'],
        series: ['Self Leads', 'Assigned Leads', 'Leads Pool'],
        colors: ['#24C6EA', '#1F66F0', '#440DB8'],
        data: [
            [65, 59, 80, 81, 56, 55, 40],
            [28, 48, 40, 19, 86, 27, 90],
            [18, 38, 20, 39, 16, 23, 94]
        ]
    } */
    $scope.newLeadsCount = 0
    $scope.convertedLeadsCount = 0
    $scope.pendingLeadsCount = 0
    $scope.lostLeadsCount = 0

    /* calendar */
    new Calendar({
        id: '#leads-management-event-calendar',
        theme: "glass",
        weekdayDisplayType: "short",
        monthDisplayType: "long",
        primaryColor: '#1F43F0'
    })

    /* set tables */
    function setLeads() {
        $scope.OngoingCampaigns = new NgTableParams({}, { dataset: $scope.leads });
    }

    /* fetch */
    function fetchLeads() {
        $http({
            url: `${$scope.SERVER_URL}api/v1/lead/all`,
            method: 'GET'
        })
            .then(
                function (response) {
                    if (response?.data) {
                        $scope.leads = response.data
                        setLeads()

                        let newLeads = 0
                        let convertedLeads = 0
                        let pendingLeads = 0
                        let lostLeads = 0

                        for (let i = 0; i < response.data.length; i++) {
                            const element = response.data[i];

                            switch (element) {
                                case "New":
                                    newLeads += 1
                                    break;
                                case "Pending":
                                    pendingLeads += 1
                                    break;
                                case "Converted":
                                    convertedLeads += 1
                                    break;
                                case "Lost":
                                    lostLeads += 1
                                    break;

                                default:
                                    newLeads += 1
                                    break;
                            }
                        }

                        $scope.newLeadsCount = newLeads
                        $scope.pendingLeadsCount = pendingLeads
                        $scope.convertedLeadsCount = convertedLeads
                        $scope.lostLeads = lostLeads

                        $scope.setLeadsBreakDownRate()
                    }
                },
                function (err) { // optional
                    console.log(err)
                }
            );
    }
    fetchLeads()

    /* functions */
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

    $scope.setRootLeadData = function (lead) {
        $rootScope.lead = lead
        $scope.closeSideNav('leads-management-leads')
    }

    $scope.setLeadsBreakDownRate = function () {
        let labels = []
        let data = []

        if (!$scope.leadsBreakDownRate) $scope.leadsBreakDownRate = 'daily'

        switch ($scope.leadsBreakDownRate) {
            case 'daily':
                labels = ['Mon', 'Teu', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                data = Array.from({ length: 3 }, (_, i) => [0, 0, 0, 0, 0, 0, 0])
                break;
            case 'weekly':
                labels = Array.from({ length: weekCount() }, (_, i) => i + 1)
                data = Array.from({ length: 3 }, (_, i) => Array.from({ length: weekCount() }, (__, _i) => 0))
                break;
            case 'monthly':
                labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
                data = Array.from({ length: 3 }, (_, i) => [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
                break;
            case 'yearly':
                labels = Array.from(Array(4).keys()).map(i => new Date(new Date().setFullYear(new Date().getFullYear() - i)).getFullYear())
                data = Array.from({ length: 3 }, (_, i) => [0, 0, 0, 0])
                break;

            default:
                break;
        }

        $scope.barChart.labels = labels

        for (let i = 0; i < $scope.leads.length; i++) {
            const element = $scope.leads[i];
            
            //if (!element['assignedAt']) continue

            let current = {
                week: getWeekOfMonth(),
                month: new Date().getMonth(),
                year: new Date().getFullYear(),
                date: new Date()
            }

            let assignedAt = {
                week: getWeekOfMonth(new Date(element['assignedAt'])),
                month: new Date(element['assignedAt']).getMonth(),
                year: new Date(element['assignedAt']).getFullYear(),
                date: new Date(element['assignedAt'])
            }

            if ($scope.leadsBreakDownRate == 'daily') {

                if (!assignedAt.week != current.week) continue
                
                let dayOfTheWeek = assignedAt.date.getDay()

                if (dayOfTheWeek == 0) {
                    dayOfTheWeek = 6
                } else {
                    dayOfTheWeek = dayOfTheWeek - 1
                }

                data[2][dayOfTheWeek] += 1
                if (!!element['assignedTo']) data[1][dayOfTheWeek] += 1
                if (element['assignedTo'] == currentUserId) data[0][dayOfTheWeek] += 1
            }

            if ($scope.leadsBreakDownRate == 'weekly') {
                
                if (!assignedAt.month != current.month) continue

                let weekOfMonth = assignedAt.week

                data[2][weekOfMonth] += 1
                if (!!element['assignedTo']) data[1][weekOfMonth] += 1
                if (element['assignedTo'] == currentUserId) data[0][weekOfMonth] += 1
            }

            if ($scope.leadsBreakDownRate == 'monthly') {
                
                if (!assignedAt.year != current.year) continue

                let monthOfYear = assignedAt.month

                data[2][monthOfYear] += 1
                if (!!element['assignedTo']) data[1][monthOfYear] += 1
                if (element['assignedTo'] == currentUserId) data[0][monthOfYear] += 1
            }

            if ($scope.leadsBreakDownRate == 'yearly') {
            
                let yearIndex = labels.findIndex(i => i == assignedAt.year)
                if (yearIndex == -1) continue
                
                data[2][yearIndex] += 1
                if (!!element['assignedTo']) data[1][yearIndex] += 1
                if (element['assignedTo'] == currentUserId) data[0][yearIndex] += 1
            }
        }
        console.log(data)
        $scope.barChart.data = data
    }

    function weekCount(year, month_number) {
        if (!year) year = new Date().getFullYear()
        if (!month_number) month_number = new Date().getMonth() + 1

        // month_number is in the range 1..12

        var firstOfMonth = new Date(year, month_number - 1, 1);
        var lastOfMonth = new Date(year, month_number, 0);

        var used = firstOfMonth.getDay() + lastOfMonth.getDate();

        return Math.ceil(used / 7);
    }

    function getWeekOfMonth(date) {
        if (!date) date = new Date()

        var firstWeekday = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
        var offsetDate = date.getDate() + firstWeekday - 1;
        return Math.floor(offsetDate / 7);
    }

    function isToday(someDate) {
        const today = new Date()
        return someDate.getDate() == today.getDate() &&
            someDate.getMonth() == today.getMonth() &&
            someDate.getFullYear() == today.getFullYear()
    }
})
