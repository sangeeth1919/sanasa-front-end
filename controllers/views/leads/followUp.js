app.controller('followUpLeadsController', ($scope, $rootScope) => {
    $scope.circle = {
        appointment: true,
        lead: true,
        analysis: true,
        presentation: true,
        interviews: true,
        quotations: true,
        proposal: true,
        collection: true,
        policy: true,
        renewal: true,
        referral: true
    }

    $scope.profile = {
        name: 'John',
        images: []
    }

    $scope.labels = {
        diameter: 550,
        data: [
            { label: '' },
            { label: 'Make An Appointment', offset: { x: 80, y: -30 }, desc: 'Completed on 08 Feb 2020', verticalLine: true, path: 'leads-management/appointments' },
            { label: 'Enter A Lead', offset: { x: 60, y: -30 }, path: 'leads-management/new', pathIndex: 0 },
            { label: 'Need Analysis', offset: { x: 60, y: -20 }, path: 'leads-management/new', pathIndex: 1 },
            { label: 'Sales Presentation', offset: { x: 100, y: -100 }, path: 'leads-management/new', pathIndex: 2 },
            { label: 'Follow Up Interviews', offset: { x: 200, y: -80 }, path: 'leads-management/new', pathIndex: 3 },
            { label: 'Issue Quotations', offset: { x: 150, y: -20 }, centerVerticalLine: true, path: 'leads-management/new', pathIndex: 4 },
            { label: 'Proposal Stage', offset: { x: 200, y: -80 }, path: 'leads-management/new', pathIndex: 5 },
            { label: 'New Business Collection', offset: { x: 100, y: -100 } },
            { label: 'Policy Stage', offset: { x: 60, y: -20 }, path: 'leads-management/new', pathIndex: 6 },
            { label: 'Renewal Collection', offset: { x: 60, y: -30 }, path: 'leads-management/new', pathIndex: 7 },
            { label: 'Referral Leads', offset: { x: 20, y: -30 }, verticalLine: true, path: 'leads-management/pool', pathIndex: 1 },
        ]
    }

    function toRadians(angle) {
        return angle * (Math.PI / 180);
    }

    $scope.getStyles = (_index, _offset) => {
        let diameter = $scope.labels.diameter
        let length = $scope.labels.data.length
        let index = length - _index
        let offset = { x: 0, y: 0 }

        if (_offset) offset = _offset

        let x = Math.sin(toRadians(360 * (index / length))) * (diameter + ((offset.x) * 2)) / 2
        let y = -Math.cos(toRadians(360 * (index / length))) * (diameter + ((offset.y) * 2)) / 2

        if((y.toString().includes('e'))) y = offset.y

        return {
            transform: `translateX(${x}px) translateY(${y}px)`
        }
    }

    $scope.redirectToLeadsManagement = function (path, index) {
        if(!path) return
        
        if(index != null || index != undefined) $rootScope.leadIndex = index
        window.location.assign(`#/${path}`)
    }
})