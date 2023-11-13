app.controller('leadsAppointmentsController', ($scope, NgTableParams, $mdDialog, $http, $rootScope) => {
    let leadId = "";

    $scope.appointment = {}
    $scope.appointments = []
    $scope.leads = []
    $scope.clients = []

    /* default run */
    if ($rootScope.leadId) {
        leadId = $rootScope.leadId
        $rootScope.leadId = null
    } else {
        leadId = ""
        $rootScope.leadId = null
    }

    /* set tables */
    function setAppointments() {
        $scope.Appointments = new NgTableParams({}, { dataset: $scope.appointments });
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
                        for (let i = 0; i < response.data.length; i++) {
                            const element = response.data[i];
                            if (element['dateFrom']) element['dateFrom'] = new Date(element.dateFrom)
                            if (element['timeFrom']) element['timeFrom'] = new Date(element.timeFrom)
                            if (element['dateTo']) element['dateTo'] = new Date(element.dateTo)
                            if (element['timeTo']) element['timeTo'] = new Date(element.timeTo)
                        }

                        $scope.leads = response.data
                    }
                },
                function (err) { // optional
                    console.log(err)
                }
            );
    }
    fetchLeads()
    function fetchAppointments() {
        let url = `${$scope.SERVER_URL}api/v1/lead/appointments/all`

        if (leadId) url = `${$scope.SERVER_URL}api/v1/lead/appointments/lead/${leadId}`

        $http({
            url: url,
            method: 'GET'
        })
            .then(
                function (response) {
                    if (response?.data) {
                        $scope.appointments = response.data

                        setAppointments()
                    }
                },
                function (err) { // optional
                    console.log(err)
                }
            );
    }
    fetchAppointments()
    function fetchAnalysisClients() {
        $http({
            url: `${$scope.SERVER_URL}api/v1/lead/analysis/client/all`,
            method: 'GET'
        })
            .then(
                function (response) {
                    if (response?.data) {
                        for (let i = 0; i < response.data.length; i++) {
                            const element = response.data[i];
                            if (element['dob']) element['dob'] = new Date(element.dob)
                        }
                        $scope.clients = response.data
                    }
                },
                function (err) { // optional
                    console.log(err)
                }
            );
    }
    fetchAnalysisClients()

    /* function */
    $scope.showAppointmentManage = function (ev, item) {
        $scope.appointment = item

        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'popup/appointment.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: false,
            fullscreen: false,
            scope: $scope,
            preserveScope: true
        })
            .then(function (data) {
                $scope.saveAppointment()
            }, function () {
                $scope.appointment = {}
            });
    };

    $scope.saveAppointment = function () {
        let url = `${$scope.SERVER_URL}api/v1/lead/appointments/create`;
        let method = 'POST';
        let message = "created"

        if ($scope.appointment?.id) {
            url = `${$scope.SERVER_URL}api/v1/lead/appointments/update`
            method = 'PATCH'
            message = 'updated'
        } else {
            $scope.appointment['createdBy'] = 'test user'
        }

        $http({
            url: url,
            method: method,
            data: $scope.appointment
        })
            .then(
                function (response) {
                    fetchAppointments()

                    alert(`Lead appointment ${message}`)
                },
                function (err) { // optional
                    console.log(err)
                }
            );
    }

    $scope.deleteAppointment = function (id) {
        if (!id) return
    }
})