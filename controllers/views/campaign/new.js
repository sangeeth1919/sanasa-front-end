var tabIndex = 0;

app.controller('newCampaignController', ($scope, NgTableParams, $mdDialog, $http, $rootScope) => {
    $scope.updateState = false;

    let vehicleTemp = {
        vehicle: 'Official vehicle',
        files: []
    }
    let artworkTemp = {
        uploadedBy: 'test user',
        images: []
    }
    let participantTemp = {
        quotationsFiles: [],
        participantsFiles: [],
    }
    let tempMainInfo = {
        continues: false,
        continuesDays: []
    }

    $scope.state = {
        manageParticipant: false,
    }
    $scope.mainInfo = {
        name: '',
        locationType: '',
        locationAddress: '',
        locationMap: '',
        locationLat: '',
        locationLng: '',
        channel: '',
        date: '',
        time: '',
        continuesDays: []
    }
    $scope.criteria = {
        type: '',
        expectingLeads: '',
        expectingProspecting: '',
        expectingNBP: '',
        expectingGWP: '',
        recruitmentNum: '',
        note: '',
    }
    $scope.society = 'zone'
    $scope.budgets = []
    $scope.budgetsTotal = 0;
    $scope.otherArrangementsTotal = 0;
    $scope.otherArrangements = []
    $scope.tabIndex = tabIndex
    $scope.artwork = artworkTemp
    $scope.artworks = []
    $scope.participant = participantTemp
    $scope.participants = []
    $scope.artworkApprove = {}
    $scope.newFb = {}
    $scope.fb = [
        // {
        //     type: 'test',
        //     description: 'test',
        //     amount: 5
        // }
    ]
    $scope.vehicle = vehicleTemp
    $scope.vehicles = []
    $scope.budgetsList = [
        { label: 'Food & Beverage', value: 24500 },
        { label: 'Fax', value: 24500 },
        { label: 'Flex', value: 24500 },
        { label: 'Savings', value: 24500 },
        { label: 'Food', value: 24500 },
        { label: 'Education', value: 150000 },
        { label: 'Cloths', value: 150000 },
        { label: 'Medical', value: 150000 },
        { label: 'Travelling', value: 150000 },
        { label: 'Utility Bills', value: 150000 },
        { label: 'Loans', value: 150000 },
        { label: 'Leasing', value: 150000 },
        { label: 'Rent', value: 150000 },
    ];
    $scope.otherArrangementsList = [
        { label: 'Sounds', value: 5, files: [] },
        { label: 'Multimedia', value: 4, files: [] },
        { label: 'Lights', value: 456, files: [] },
        { label: 'Stage', value: 2, files: [] },
        { label: 'Colour Flags', value: 34, files: [] },
        { label: 'Stage Light', value: 17, files: [] },
    ];

    if ($rootScope.campaign?.id) {
        $scope.updateState = true;
        $scope.mainInfo = $rootScope.campaign
        let id = $rootScope.campaign.id
        $rootScope.campaign = null

        fetchCampaignArtworks(id)
        fetchCampaignCriteria(id)
        fetchCampaignBudgets(id)
        fetchCampaignVehicles(id)
        fetchCampaignOtherArrangements(id)
        fetchCampaignFB(id)
        fetchCampaignParticipants(id)
    } else {
        $scope.updateState = false
        $rootScope.campaign = null
        $scope.mainInfo = tempMainInfo
    }

    function fetchCampaignMainInfo(id) {
        if (!id) return

        $http({
            url: `${$scope.SERVER_URL}api/v1/campaign/${id}`,
            method: 'GET'
        })
            .then(
                function (response) {
                    if (response?.data) {
                        if (response.data?.date) response.data['date'] = new Date(response.data.date)
                        if (response.data?.time) response.data['time'] = new Date(response.data.time)

                        $scope.mainInfo = response.data
                    }
                },
                function (err) { // optional
                    console.log(err)
                }
            );
    }
    function fetchCampaignArtworks(id) {
        if (!id) return

        $http({
            url: `${$scope.SERVER_URL}api/v1/campaign/artworks/campaign/${id}`,
            method: 'GET'
        })
            .then(
                function (response) {
                    if (response?.data) {
                        $scope.artworks = response.data
                        setArtworkTableData(response.data)
                    }
                },
                function (err) { // optional
                    console.log(err)
                }
            );
    }
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
    function fetchCampaignBudgets(id) {
        if (!id) return

        $http({
            url: `${$scope.SERVER_URL}api/v1/campaign/budgets/campaign/${id}`,
            method: 'GET'
        })
            .then(
                function (response) {
                    if (response?.data) {
                        let total = parseFloat($scope.budgetsTotal)
                        for (let i = 0; i < response.data.length; i++) {
                            const element = response.data[i];
                            if (element.value) total += parseFloat(element.value)

                        }

                        $scope.budgetsTotal = total
                        $scope.budgets = response.data
                    }
                },
                function (err) { // optional
                    console.log(err)
                }
            );
    }
    function fetchCampaignVehicles(id) {
        if (!id) return

        $http({
            url: `${$scope.SERVER_URL}api/v1/campaign/vehicles/campaign/${id}`,
            method: 'GET'
        })
            .then(
                function (response) {
                    if (response?.data) {
                        $scope.vehicles = response.data
                        setVehicleTableData(response.data)
                    }
                },
                function (err) { // optional
                    console.log(err)
                }
            );
    }
    function fetchCampaignOtherArrangements(id) {
        if (!id) return

        $http({
            url: `${$scope.SERVER_URL}api/v1/campaign/otherArrangements/campaign/${id}`,
            method: 'GET'
        })
            .then(
                function (response) {
                    if (response?.data) {
                        let total = parseFloat($scope.otherArrangementsTotal)
                        for (let i = 0; i < response.data.length; i++) {
                            const element = response.data[i];
                            if (element.value) total += parseFloat(element.value)

                        }

                        $scope.otherArrangementsTotal = total

                        $scope.otherArrangements = response.data
                    }
                },
                function (err) { // optional
                    console.log(err)
                }
            );
    }
    function fetchCampaignFB(id) {
        if (!id) return

        $http({
            url: `${$scope.SERVER_URL}api/v1/campaign/fb/campaign/${id}`,
            method: 'GET'
        })
            .then(
                function (response) {
                    if (response?.data) {
                        $scope.fb = response.data
                    }
                },
                function (err) { // optional
                    console.log(err)
                }
            );
    }
    function fetchCampaignParticipants(id) {
        if (!id) return

        $http({
            url: `${$scope.SERVER_URL}api/v1/campaign/participants/campaign/${id}`,
            method: 'GET'
        })
            .then(
                function (response) {
                    if (response?.data) {
                        $scope.participants = response.data
                        setParticipantsTableData(response.data)
                    }
                },
                function (err) { // optional
                    console.log(err)
                }
            );
    }

    $scope.continueToNextStep = () => {
        $scope.tabIndex += 1
    }

    $scope.formatDate = (date) => {
        return moment(date).format('YYYY-MM-DD')
    }

    $scope.formatTime = (time) => {
        return moment(time, ['h:m a', 'H:m']).format('HH:mm:ss')
    }

    function setArtworkTableData(data) {
        $scope.ArtWorks = new NgTableParams({}, { dataset: data });
    }

    function setVehicleTableData(data) {
        $scope.Vehicles = new NgTableParams({}, { dataset: data });
    }

    function setParticipantsTableData(data) {
        $scope.Participants = new NgTableParams({}, { dataset: data });
    }

    setArtworkTableData($scope.artworks)
    setVehicleTableData($scope.vehicles)
    setParticipantsTableData($scope.participants)

    /* artwork */
    $scope.showAddEditArtwork = function (ev) {
        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'popup/artwork.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: false,
            fullscreen: false,
            scope: $scope,
            preserveScope: true
        })
            .then(function (type) {
                if (!$scope.artwork['dateAdded']) $scope.artwork['dateAdded'] = moment().format("YYYY-MM-DD")

                if ($scope.mainInfo.id) {
                    $scope.updateArtwork($scope.artwork)
                } else {
                    if (type == 'new') {
                        $scope.artworks.push($scope.artwork)
                    } else {
                        let i = $scope.artworks.findIndex(i => i.id == $scope.artwork.id)

                        $scope.artworks[i] = $scope.artwork
                    }

                    setArtworkTableData($scope.artworks)
                }

            }, function () {
                $scope.artwork = artworkTemp
            });
    };

    /* artwork */
    $scope.showApproveArtwork = function (ev, item) {
        $scope.artwork = item

        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'popup/artwork.manage.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: false,
            fullscreen: false,
            scope: $scope,
            preserveScope: true
        })
            .then(function (data) {
                $scope.artwork = data

                $scope.showAddEditArtwork()
            }, function () {
                $scope.artwork = artworkTemp
            });
    };

    /* vehicle */
    $scope.showAddEditVehicle = function (ev, item) {
        $scope.vehicle = item

        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'popup/vehicle.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: false,
            fullscreen: false,
            scope: $scope,
            preserveScope: true
        })
            .then(function (type) {

                if ($scope.mainInfo.id) {
                    $scope.updateVehicle($scope.vehicle)
                } else {
                    if (type == 'new') {
                        $scope.vehicles.push($scope.vehicle)
                    } else {
                        let i = $scope.vehicles.findIndex(i => i.id == vehicle.id)

                        $scope.vehicles[i] = $scope.vehicle
                    }

                    setVehicleTableData($scope.vehicles)
                }

            }, function () {
                $scope.vehicle = vehicleTemp;
            });
    };

    $scope.handleOption = function (selected, obj) {
        $scope[obj] = selected

        let total = 0
        for (let i = 0; i < $scope[obj].length; i++) {
            const element = $scope[obj][i]
            if (element.value) total += parseFloat(element.value)
        }

        if (obj == 'budgets') {
            $scope.budgetsTotal = total
        } else if (obj == 'otherArrangements') {
            $scope.otherArrangementsTotal = total
        }
    }

    $scope.handleRemoveOption = function (i, obj) {
        if ($scope[obj][i]) $scope[obj].splice(i, 1)

        let total = 0
        for (let i = 0; i < $scope[obj].length; i++) {
            const element = $scope[obj][i]
            if (element.value) total += parseFloat(element.value)
        }

        if (obj == 'budgets') {
            $scope.budgetsTotal = total
        } else if (obj == 'otherArrangements') {
            $scope.otherArrangementsTotal = total
        }

    }

    $scope.handleOnTotalValueChange = function (obj) {
        let total = 0
        let list = $scope[obj]

        for (let i = 0; i < list.length; i++) {
            const element = list[i]
            if (element.value) total += parseFloat(element.value)
        }

        if (obj == 'budgets') {
            $scope.budgetsTotal = total
        } else if (obj == 'otherArrangements') {
            $scope.otherArrangementsTotal = total
        }
    }

    $scope.handleOnFileUpload = function(file, i) {
        if(!Array.isArray(file)) return

        $scope.otherArrangements[i] = {
            ...$scope.otherArrangements[i],
            files: file
        }
    }

    $scope.addNewFB = function () {
        if (!$scope.newFb.type || !$scope.newFb.description || !$scope.newFb.amount) return alert('All fields are required')

        $scope.fb.push($scope.newFb)
        $scope.newFb = {}
    }

    $scope.removeVehicleFile = function (i, id) {
        $scope.vehicle.files = $scope.vehicle.files.filter((v, j) => j != i)
    }

    $scope.removeVehicle = function (i, id) {

        if (id) {
            $http({
                url: `${$scope.SERVER_URL}api/v1/campaign/vehicles/delete/${id}`,
                method: 'DELETE',
                data: vehicle
            })
                .then(
                    function (response) {
                        $scope.vehicles = $scope.vehicles.filter((v, j) => j != i)
                        setVehicleTableData($scope.vehicles)
                        alert("Campaign vehicle deleted")
                    },
                    function (err) { // optional
                        console.log(err)
                    }
                );
        } else {
            $scope.vehicles = $scope.vehicles.filter((v, j) => j != i)
            setVehicleTableData($scope.vehicles)
        }

    }

    $scope.removeParticipant = function (i, id) {
        if (id) {
            $http({
                url: `${$scope.SERVER_URL}api/v1/campaign/participants/delete/${id}`,
                method: 'DELETE',
                data: vehicle
            })
                .then(
                    function (response) {
                        $scope.participants = $scope.participants.filter((v, j) => j != i)
                        setParticipantsTableData($scope.participants)
                        alert("Campaign participant deleted")
                    },
                    function (err) { // optional
                        console.log(err)
                    }
                );
        } else {
            $scope.participants = $scope.participants.filter((v, j) => j != i)
            setParticipantsTableData($scope.participants)
        }

    }

    $scope.removeArtwork = function (i, id) {

        if (id) {
            $http({
                url: `${$scope.SERVER_URL}api/v1/campaign/artworks/delete/${id}`,
                method: 'DELETE',
                data: vehicle
            })
                .then(
                    function (response) {
                        $scope.artworks = $scope.artworks.filter((v, j) => j != i)
                        setArtworkTableData($scope.artworks)
                        alert("Campaign artwork deleted")
                    },
                    function (err) { // optional
                        console.log(err)
                    }
                );
        } else {
            $scope.artworks = $scope.artworks.filter((v, j) => j != i)
            setArtworkTableData($scope.artworks)
        }

    }

    $scope.removeFromFbList = function (i) {
        $scope.fb = $scope.fb.filter((v, j) => j != i)
    }

    $scope.removeParticipantFile = function (type) {
        $scope.participant[type] = []
    }

    $scope.onParticipantManage = function (item, bool) {
        $scope.state.manageParticipant = bool
        $scope.participant = item
    }

    $scope.cancelManageParticipant = function (ev, item) {
        $scope.state.manageParticipant = false
        $scope.participant = participantTemp
    }
    $scope.handleOnNewArrangement = function (item) {
        if (item.label) {
            $scope.otherArrangementsList.push(item)
            $scope.otherArrangements.push(item)
        }
    }

    $scope.saveParticipant = function () {
        if (!$scope.participant?.id) {

            console.log("If NN");

            $scope.participants.push($scope.participant)
            $scope.participant = participantTemp
        } else {

            console.log("Else NN");

            let i = $scope.participants.findIndex(i => i.id === $scope.participant.id)
            $scope.participants[i] = $scope.participant
            $scope.participant = participantTemp
        }

        setParticipantsTableData($scope.participants);
        $scope.state.manageParticipant = false
    }

    $scope.saveCampaign = function () {
        $scope.mainInfo['createdBy'] = 'test user'
        
        $http({
            url: `${$scope.SERVER_URL}api/v1/campaign/create`,
            method: 'POST',
            data: {
                mainInfo: $scope.mainInfo,
                criteria: $scope.criteria,
                artworks: $scope.artworks,
                budgets: $scope.budgets,
                vehicles: $scope.vehicles,
                otherArrangements: $scope.otherArrangements,
                fb: $scope.fb,
                participants: $scope.participants
            }
        })
            .then(
                function (response) {

                    if (response?.data) {
                        if (response.data?.date) response.data['date'] = new Date(response.data.date)
                        if (response.data?.time) response.data['time'] = new Date(response.data.time)

                        

                        
                    }
                    $scope.mainInfo.id = response.data.id
                    fetchCampaignCriteria($scope.mainInfo.id)

                    console.log($scope.mainInfo)
                    console.log($scope.criteria)

                    // fetchCampaignMainInfo($scope.mainInfo.id)

                    alert("Campaign added successfully!")

                    // setTimeout(() => {
                    //     window.location.assign("#/campaign-management")
                    // }, 500);
                },
                function (err) { // optional
                    console.log(err)
                    alert("Campaign save failed!")
                }
            );
    }

// *** created on 27/05/2022 for save criterias separatly insted of creating new feild in table this will just update the the data ***

    $scope.updatenewCampaign = function () {
        $scope.mainInfo['createdBy'] = 'test user'
        
        $http({
            url: `${$scope.SERVER_URL}api/v1/campaign/create`,
            method: 'PATCH',
            data: {
                mainInfo: $scope.mainInfo,
                criteria: $scope.criteria,
                artworks: $scope.artworks,
                budgets: $scope.budgets,
                vehicles: $scope.vehicles,
                otherArrangements: $scope.otherArrangements,
                fb: $scope.fb,
                participants: $scope.participants
            }
        })
            .then(
                function (response) {

                    fetchCampaignMainInfo($scope.mainInfo.id)

                    alert("Campaign added successfully!")

                    // setTimeout(() => {
                    //     window.location.assign("#/campaign-management")
                    // }, 500);
                },
                function (err) { // optional
                    console.log(err)
                    alert("Campaign save failed!")
                }
            );
    }

    /* update */
    $scope.updateMainInfo = function () {
        $http({
            url: `${$scope.SERVER_URL}api/v1/campaign/update`,
            method: 'PATCH',
            data: $scope.mainInfo
        })
            .then(
                function (response) {
                    fetchCampaignMainInfo($scope.mainInfo.id)

                    alert("Campaign main info updated")
                },
                function (err) { // optional
                    console.log(err)
                }
            );
    }

    $scope.updateCriteria = function () {
        $http({
            url: `${$scope.SERVER_URL}api/v1/campaign/criteria/update`,
            method: 'PATCH',
            data: $scope.criteria
        })
            .then(
                function (response) {
                    fetchCampaignCriteria($scope.mainInfo.id)

                    alert("Campaign criteria updated")
                },
                function (err) { // optional
                    console.log(err)
                }
            );
    }

    $scope.updateArtwork = function (artwork) {
        if (artwork?.id) {
            $http({
                url: `${$scope.SERVER_URL}api/v1/campaign/artworks/update`,
                method: 'PATCH',
                data: artwork
            })
                .then(
                    function (response) {
                        alert("Campaign artwork updated")
                    },
                    function (err) { // optional
                        console.log(err)
                    }
                );
        } else {
            artwork['campaignId'] = $scope.mainInfo.id

            $http({
                url: `${$scope.SERVER_URL}api/v1/campaign/artworks/create`,
                method: 'POST',
                data: artwork
            })
                .then(
                    function (response) {
                        fetchCampaignArtworks($scope.mainInfo.id)
                        alert("Campaign artwork updated")
                    },
                    function (err) { // optional
                        console.log(err)
                    }
                );
        }

        // fetchCampaignArtworks($scope.mainInfo.id)
    }

    $scope.updateBudgets = function () {
        $http({
            url: `${$scope.SERVER_URL}api/v1/campaign/budgets/update`,
            method: 'PATCH',
            data: {
                campaignId: $scope.mainInfo.id,
                budgets: $scope.budgets
            }
        })
            .then(
                function (response) {
                    fetchCampaignBudgets($scope.mainInfo.id)

                    alert("Campaign budgets updated")
                },
                function (err) { // optional
                    console.log(err)
                }
            );
    }

    $scope.updateVehicle = function (vehicle) {
        if (vehicle?.id) {
            $http({
                url: `${$scope.SERVER_URL}api/v1/campaign/vehicles/update`,
                method: 'PATCH',
                data: vehicle
            })
                .then(
                    function (response) {
                        alert("Campaign vehicle updated")
                    },
                    function (err) { // optional
                        console.log(err)
                    }
                );
        } else {
            vehicle['campaignId'] = $scope.mainInfo.id

            $http({
                url: `${$scope.SERVER_URL}api/v1/campaign/vehicles/create`,
                method: 'POST',
                data: vehicle
            })
                .then(
                    
                    function (response) {

                        fetchCampaignVehicles($scope.mainInfo.id)

                        alert("Campaign vehicle updated")
                    },
                    function (err) { // optional
                        console.log(err)
                    }
                );
        }

        fetchCampaignVehicles($scope.mainInfo.id)
    }

    $scope.updateOtherArrangements = function () {
        $http({
            url: `${$scope.SERVER_URL}api/v1/campaign/otherArrangements/update`,
            method: 'PATCH',
            data: {
                campaignId: $scope.mainInfo.id,
                otherArrangements: $scope.otherArrangements
            }
        })
            .then(
                function (response) {
                    fetchCampaignOtherArrangements($scope.mainInfo.id)

                    alert("Campaign other arrangements updated")
                },
                function (err) { // optional
                    console.log(err)
                }
            );
    }

    $scope.updateFB = function () {
        $http({
            url: `${$scope.SERVER_URL}api/v1/campaign/fb/update`,
            method: 'PATCH',
            data: {
                campaignId: $scope.mainInfo.id,
                fb: $scope.fb
            }
        })
            .then(
                function (response) {
                    fetchCampaignFB($scope.mainInfo.id)

                    alert("Campaign fb updated")
                },
                function (err) { // optional
                    console.log(err)
                }
            );
    }

    $scope.updateParticipant = function () {
        if ($scope.participant?.id) {

            console.log("if Test")

            $http({
                url: `${$scope.SERVER_URL}api/v1/campaign/participants/update`,
                method: 'PATCH',
                data: $scope.participant
            })
                .then(
                    function (response) {
                        fetchCampaignParticipants($scope.mainInfo.id)
                        alert("Campaign participant updated")
                    },
                    function (err) { // optional
                        console.log(err)
                    }
                );
        } else {

            console.log("else Test")




            $scope.participant['campaignId'] = $scope.mainInfo.id

            $http({
                url: `${$scope.SERVER_URL}api/v1/campaign/participants/create`,
                method: 'POST',
                data: $scope.participant
            })
                .then(
                    function (response) {
                        fetchCampaignParticipants($scope.mainInfo.id)
                        alert("Campaign participant updated")
                    },
                    function (err) { // optional
                        console.log(err)
                    }
                );
        }

        fetchCampaignParticipants($scope.mainInfo.id)
    }

    $scope.displayValueFormat = function (value) {
        if(Array.isArray(value)) return value.join(" , ")

        return value
    }
    
    $scope.displayKeyFormat = function (value) {
        if(value)

        return value
    }

    $scope.displayInfo = function (key, obj) {
        let ignore = {
            mainInfo: ['continues']
        }
        
        if(ignore[obj]) {
            if(ignore[obj].includes(key)) return false
        }

        return true
    }

})

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