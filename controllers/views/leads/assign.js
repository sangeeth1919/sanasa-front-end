app.controller('LeadsManagementAssignController', ($scope, NgTableParams, $mdSidenav, $http, $rootScope) => {
    let assignTemp = {
        leads: []
    }

    $scope.assign = assignTemp
    $scope.leads = []
    $scope.assignedLeads = []

    /* set tables */
    function setAssignLeads() {
        $scope.AssignedLeads = new NgTableParams({}, { dataset: $scope.assignedLeads });
    }
    setAssignLeads()

    /* fetch */
    function fetchAssignedLeads() {

        $http({
            url: `${$scope.SERVER_URL}api/v1/lead/assignLeads/all`,
            method: 'GET'
        })
        .then(
            function (response) {
                if(response?.data) {
                    $scope.assignedLeads = response.data
                    setAssignLeads()
                }
            },
            function (err) { // optional
                console.log(err)
            }
        );
    }
    fetchAssignedLeads()
    function fetchLeads() {

        $http({
            url: `${$scope.SERVER_URL}api/v1/lead/all`,
            method: 'GET'
        })
        .then(
            function (response) {
                if(response?.data) {
                    $scope.leads = response.data
                }
            },
            function (err) { // optional
                console.log(err)
            }
        );
    }
    fetchLeads()

    /* functions */
    $scope.openSideNav = function (nav, item) {
        $scope.assign = item
        $mdSidenav(nav).toggle()
        fetchLeads()
    }

    $scope.closeSideNav = function (nav) {
        $scope.assign = assignTemp
        $mdSidenav(nav).toggle()
    }

    $scope.manageAssignLead = function (id) {
        let index = $scope.assign.leads.findIndex(i => i == id)

        if(index > -1) {
            return removeAssignLead(id, index)
        }

        if($scope.assign.leads.length > 5) return alert("maximum 5 leads per agent")

        $scope.assign.leads.push(id)
    }

    function removeAssignLead(id, index) {
        if($scope.assign?.id) {
            $http({
                url: `${$scope.SERVER_URL}api/v1/lead/assignLeads/delete/lead/${id}`,
                method: 'DELETE'
            })
            .then(
                function (response) {
                    $scope.assign.leads.splice(index, 1)
                    fetchAssignedLeads()
                },
                function (err) { // optional
                    console.log(err)
                }
            );
        } else {
            $scope.assign.leads.splice(index, 1)
        }
    }
    
    $scope.removeAssignLeads = function (id) {
        $http({
            url: `${$scope.SERVER_URL}api/v1/lead/assignLeads/delete/${id}`,
            method: 'DELETE'
        })
        .then(
            function (response) {
                fetchAssignedLeads()
            },
            function (err) { // optional
                console.log(err)
            }
        );
    }

    $scope.checkSelectedLead = function (id) {
        if($scope.assign.leads.includes(id)) return true

        return false;
    }

    /* save */
    $scope.saveAssignLead = function () {
        let options = {
            url: `${$scope.SERVER_URL}api/v1/lead/assignLeads/create`,
            method: 'POST'
        }

        if($scope.assign?.id) {
            options.url = `${$scope.SERVER_URL}api/v1/lead/assignLeads/update`
            options.method = 'PATCH'
        }

        $http({
            url: options.url,
            method: options.method,
            data: $scope.assign
        })
        .then(
            function (response) {
                $scope.assign = assignTemp
                fetchAssignedLeads()
                $scope.closeSideNav('leads-management-assign-leads')
            },
            function (err) { // optional
                console.log(err)
            }
        );
    }

})