app.controller('progressCampaignController', ($scope, NgTableParams, $mdSidenav, $mdDialog, $http) => {
    $scope.progressReport = {};
    $scope.report = {}
    $scope.campaign = {}
    $scope.criteria = {}
    $scope.expand = {
        campaign: false,
        criteria: false,
        artworks: false
    }

    var data = [
        {
            id: 'CAMP00000001',
            name: 'OutDoor Campaign',
            location: 'Maharagama',
            date: '23 Feb 2021',
            createdBy: 'supervisor - Nalinda',
            approvedBy: 'supervisor - Anoj',
            expectedRecruitment: 300,
            spoMeAssessor: 'sample',
            budgetSchedule: 500000,
            criteria: 'GWP',
            outcome: '200',
            outcomePercentage: '66.7 %',
            utilizedBudget: 500000,
            budgetExceeded: 500000,
            totalSpent: 500000,
            reports: [
                {
                    file: 'https://www.orimi.com/pdf-test.pdf',
                    name: 'report 1.pdf'
                },
                {
                    file: 'https://www.orimi.com/pdf-test.pdf',
                    name: 'report 2.pdf'
                }
            ],
            budgetReports: [
                {
                    file: 'https://www.orimi.com/pdf-test.pdf',
                    name: 'budget report.pdf'
                }
            ]
        }
    ];
    var tempReportData = [
        {
            id: 'CAMP00000001',
            fname: 'Nadun',
            lname: 'Manawadu',
            campaignId: 'C9918144',
            competitionId: 'SL00000002',
        },
    ];

    $scope.ProgressReportCampaign = new NgTableParams({}, { dataset: tempReportData });

    function fetchBudgets() {
        $http({
            url: `${$scope.SERVER_URL}api/v1/campaign/budgets/all`,
            method: 'GET'
        })
            .then(
                function (response) {
                    if (response?.data) {
                        let budgets = {
                            total: 0,
                            exceeded: 0,
                            utilized: 0
                        }

                        for (let i = 0; i < response.data.length; i++) {
                            const element = response.data[i];
                            
                            budgets.total += parseFloat(element.total || 0)
                            budgets.utilized += parseFloat(element.value || 0)
                        }

                        if(budgets.total > budgets.utilized) {
                            budgets.exceeded = budgets.total - budgets.utilized
                        }

                        $scope.budgets = budgets
                    }
                },
                function (err) { // optional
                    console.log(err)
                }
            );
    }
    fetchBudgets()

    function fetchCampaigns() {
        $http({
            url: `${$scope.SERVER_URL}api/v1/campaign/all`,
            method: 'GET'
        })
            .then(
                function (response) {
                    if (response?.data) {
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

    function setCampaigns() {
        $scope.ProgressCampaigns = new NgTableParams({}, { dataset: $scope.campaigns });
    }

    $scope.openSideNav = function (nav, item) {
        $scope.campaign = item;
        fetchCampaignCriteria(item.id)
        $mdSidenav(nav).toggle();
    };

    $scope.closeSideNav = function (nav) {
        $scope.campaign = {};
        $scope.criteria = {};
        $mdSidenav(nav).toggle();
    };

    /* report popup */
    $scope.showReport = function (ev, html) {
        $mdDialog.show({
            controller: DialogController,
            templateUrl: `popup/progressReports/${html}`,
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: false,
            fullscreen: false,
            scope: $scope,
            preserveScope: true
        })
            .then(function (data) {
                //
            }, function () {
                //
            });
    };
});

function DialogController($scope, $mdDialog) {
    $scope.hide = function () {
        $mdDialog.hide();
    };

    $scope.cancel = function () {
        $mdDialog.cancel();
    };

    $scope.save = function (save) {
        $mdDialog.hide(save);
    };

    $scope.edit = function (save) {
        $mdDialog.hide(save);
    };
}