app.controller('CompetitionManagementController', ($scope, NgTableParams) => {
    var data = [
        {
            id: 'SL00000001',
            name: 'OutDoor Campaign',
            date: '23 Feb 2021',
            createdBy: 'supervisor - Nalinda',
            approvedBy: 'supervisor - Anoj'
        },
        {
            id: 'SL00000001',
            name: 'OutDoor Campaign',
            date: '23 Feb 2021',
            createdBy: 'supervisor - Nalinda',
            approvedBy: 'supervisor - Anoj'
        },
        {
            id: 'SL00000001',
            name: 'OutDoor Campaign',
            date: '23 Feb 2021',
            createdBy: 'supervisor - Nalinda',
            approvedBy: 'supervisor - Anoj'
        },
    ];
    $scope.OngoingCampaigns = new NgTableParams({}, { dataset: data });
})