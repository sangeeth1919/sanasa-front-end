app.controller('newLeadsController', ($scope, NgTableParams, $mdSidenav, $http, $rootScope) => {

    let socials = [
        { icon: 'phone', link: 'tel:+123456789' },
        { icon: 'email', link: 'mailto:jwareautomation@gmail.com' },
        { icon: 'whatsapp', link: 'tel:+123456789' },
        { icon: 'facebook-messenger', link: 'https://www.messenger.com/' },
        { icon: 'skype', link: 'https://www.skype.com/en/' },
        { icon: 'linkedin', link: 'https://www.linkedin.com/' }
    ]
    $scope.socials = socials

    /* index variables */
    $scope.tabIndex = 0
    $scope.analysisTabIndex = 0
    $scope.newLeadTabIndex = 0

    /* dummy data */
    let mainInfoTemp = {
        nicFront: [],
        nicBack: [],
        businessCard: []
    }

    let analysisTemp = {
        client: { images: [], otherIncome: 0, fixedIncome: 0 },
        spouse: { images: [], otherIncome: 0, fixedIncome: 0 },
        dependants: [],
        monthlyExpenses: {
            savings: 0,
            education: 0,
            medical: 0,
            utilityBills: 0,
            leasing: 0,
            food: 0,
            cloths: 0,
            travelling: 0,
            loans: 0,
            rent: 0
        },
        assets: {
            buildings: 0,
            deposits: 0,
            vehicles: 0,
            insurance: 0,
            other: 0
        },
        liabilities: {
            loans: 0,
            leasing: 0,
            specialNeeds: 0,
            other: 0
        },
        policy: {
            proposals: [],
            prospect: [],
            advisor: [],
            officeProspect: [],
            officeAdvisor: [],
        }
    }
    let tempQuotation = {
        title: "quotation title",
        customer: "customer",
        reason: "test reason",
        date: "2022-10-15T00:00:00.000Z",
        time: "1970-01-01T06:20:00.000Z",
        product: "product",
        status: "Not Started",
        priority: "Low",
        createdBy: "test user"
    }

    let tempProposal = { recipients: [] }
    let tempPolicy = { recipients: [] }
    let tempRenewal = { recipients: [] }

    /* public variables */
    $scope.leads = []
    $scope.clients = []
    $scope.campaignId = ""
    $scope.campaign = {}

    /* update variables */
    $scope.sale = {}
    $scope.followUp = {}
    $scope.personalData = { images: [] }
    $scope.quotation = {}
    $scope.selectedProposedPlan = {}
    $scope.proposal = tempProposal
    $scope.policy = tempPolicy
    $scope.renewal = tempRenewal

    /* totals */
    $scope.analysisMonthlyExpensesTotal = 0
    $scope.analysisAssetsTotal = 0
    $scope.analysisLiabilitiesTotal = 0
    $scope.analysisFamilyIncome = 0
    $scope.analysisPolicyCoversTotals = [
        { cover: 'sumAssured', existingPolicy: 0, amount: 0, monthlyPremium: 0, perDayPremium: 0 },
        { cover: 'additionalLife', existingPolicy: 0, amount: 0, monthlyPremium: 0, perDayPremium: 0 },
        { cover: 'accident', existingPolicy: 0, amount: 0, monthlyPremium: 0, perDayPremium: 0 },
        { cover: 'ppd', existingPolicy: 0, amount: 0, monthlyPremium: 0, perDayPremium: 0 },
        { cover: 'criticalIllness', existingPolicy: 0, amount: 0, monthlyPremium: 0, perDayPremium: 0 },
        { cover: 'hospital', existingPolicy: 0, amount: 0, monthlyPremium: 0, perDayPremium: 0 },
        { cover: 'funeralExpenses', existingPolicy: 0, amount: 0, monthlyPremium: 0, perDayPremium: 0 },
        { cover: 'spouse', existingPolicy: 0, amount: 0, monthlyPremium: 0, perDayPremium: 0 },
        { cover: 'spouseAlc', existingPolicy: 0, amount: 0, monthlyPremium: 0, perDayPremium: 0 },
        { cover: 'spouseCriticalIllness', existingPolicy: 0, amount: 0, monthlyPremium: 0, perDayPremium: 0 },
        { cover: 'spouseHospital', existingPolicy: 0, amount: 0, monthlyPremium: 0, perDayPremium: 0 },
    ]
    $scope.analysisPolicyCoversPremiumTotals = {
        amount: 0,
        monthlyPremium: 0,
        perDayPremium: 0
    }

    /* data variables */
    $scope.mainInfo = mainInfoTemp
    $scope.analysis = analysisTemp
    $scope.sales = []
    $scope.interviews = []
    $scope.quotations = [tempQuotation]
    $scope.proposals = []
    $scope.policies = []
    $scope.renewalCollections = []

    $scope.proposedPlans = [
        { info: { name: "Senehasa (15)", commencementYear: "2020", termType: "Monthly", maturityYear: "2040", commencementAge: "60", policyTerms: "240", maturityAge: "60" }, data: { sumAssured: { cover: "sumAssured", existingPolicy: "150000", amount: "150000", monthlyPremium: "150000", perDayPremium: "150000" }, additionalLife: { cover: "additionalLife", existingPolicy: "150000", amount: "150000", monthlyPremium: "150000", perDayPremium: "150000" }, accident: { cover: "accident", existingPolicy: "150000", amount: "150000", monthlyPremium: "150000", perDayPremium: "150000" }, ppd: { cover: "ppd", existingPolicy: "150000", amount: "150000", monthlyPremium: "150000", perDayPremium: "150000" }, criticalIllness: { cover: "criticalIllness", existingPolicy: "150000", amount: "150000", monthlyPremium: "150000", perDayPremium: "150000" }, hospital: { cover: "hospital", existingPolicy: "150000", amount: "150000", monthlyPremium: "150000", perDayPremium: "150000" }, funeralExpenses: { cover: "funeralExpenses", existingPolicy: "150000", amount: "150000", monthlyPremium: "150000", perDayPremium: "150000" }, spouse: { cover: "spouse", existingPolicy: "150000", amount: "150000", monthlyPremium: "150000", perDayPremium: "150000" }, spouseAlc: { cover: "spouseAlc", existingPolicy: "150000", amount: "150000", monthlyPremium: "150000", perDayPremium: "150000" }, spouseCriticalIllness: { cover: "spouseCriticalIllness", existingPolicy: "150000", amount: "150000", monthlyPremium: "150000", perDayPremium: "150000" }, spouseHospital: { cover: "spouseHospital", existingPolicy: "150000", amount: "150000", monthlyPremium: "150000", perDayPremium: "150000" } } },
        { info: { name: "Divithura (15)", commencementYear: "2020", termType: "Monthly", maturityYear: "2040", commencementAge: "60", policyTerms: "240", maturityAge: "60" }, data: { sumAssured: { cover: "sumAssured", existingPolicy: "150000", amount: "150000", monthlyPremium: "150000", perDayPremium: "150000" }, additionalLife: { cover: "additionalLife", existingPolicy: "150000", amount: "150000", monthlyPremium: "150000", perDayPremium: "150000" }, accident: { cover: "accident", existingPolicy: "150000", amount: "150000", monthlyPremium: "150000", perDayPremium: "150000" }, ppd: { cover: "ppd", existingPolicy: "150000", amount: "150000", monthlyPremium: "150000", perDayPremium: "150000" }, criticalIllness: { cover: "criticalIllness", existingPolicy: "150000", amount: "150000", monthlyPremium: "150000", perDayPremium: "150000" }, hospital: { cover: "hospital", existingPolicy: "150000", amount: "150000", monthlyPremium: "150000", perDayPremium: "150000" }, funeralExpenses: { cover: "funeralExpenses", existingPolicy: "150000", amount: "150000", monthlyPremium: "150000", perDayPremium: "150000" }, spouse: { cover: "spouse", existingPolicy: "150000", amount: "150000", monthlyPremium: "150000", perDayPremium: "150000" }, spouseAlc: { cover: "spouseAlc", existingPolicy: "150000", amount: "150000", monthlyPremium: "150000", perDayPremium: "150000" }, spouseCriticalIllness: { cover: "spouseCriticalIllness", existingPolicy: "150000", amount: "150000", monthlyPremium: "150000", perDayPremium: "150000" }, spouseHospital: { cover: "spouseHospital", existingPolicy: "150000", amount: "150000", monthlyPremium: "150000", perDayPremium: "150000" } } },
        { info: { name: "Investment (19)", commencementYear: "2020", termType: "Monthly", maturityYear: "2040", commencementAge: "60", policyTerms: "240", maturityAge: "60" }, data: { sumAssured: { cover: "sumAssured", existingPolicy: "150000", amount: "150000", monthlyPremium: "150000", perDayPremium: "150000" }, additionalLife: { cover: "additionalLife", existingPolicy: "150000", amount: "150000", monthlyPremium: "150000", perDayPremium: "150000" }, accident: { cover: "accident", existingPolicy: "150000", amount: "150000", monthlyPremium: "150000", perDayPremium: "150000" }, ppd: { cover: "ppd", existingPolicy: "150000", amount: "150000", monthlyPremium: "150000", perDayPremium: "150000" }, criticalIllness: { cover: "criticalIllness", existingPolicy: "150000", amount: "150000", monthlyPremium: "150000", perDayPremium: "150000" }, hospital: { cover: "hospital", existingPolicy: "150000", amount: "150000", monthlyPremium: "150000", perDayPremium: "150000" }, funeralExpenses: { cover: "funeralExpenses", existingPolicy: "150000", amount: "150000", monthlyPremium: "150000", perDayPremium: "150000" }, spouse: { cover: "spouse", existingPolicy: "150000", amount: "150000", monthlyPremium: "150000", perDayPremium: "150000" }, spouseAlc: { cover: "spouseAlc", existingPolicy: "150000", amount: "150000", monthlyPremium: "150000", perDayPremium: "150000" }, spouseCriticalIllness: { cover: "spouseCriticalIllness", existingPolicy: "150000", amount: "150000", monthlyPremium: "150000", perDayPremium: "150000" }, spouseHospital: { cover: "spouseHospital", existingPolicy: "150000", amount: "150000", monthlyPremium: "150000", perDayPremium: "150000" } } },
    ]
    $scope.businessChannel = [
        { label: 'Direct channel'},
        { label: 'Society channel'},
        { label: 'Corporate chanel'},
    ];
    $scope.branch = [
        { label: 'Kegalle Branch'},
        { label: 'Kurunegela Branch'},
        { label: 'Rathnapura Branch'},
        { label: 'Gampaha Branch'},
        { label: 'Colombo Branch'},
        { label: 'Galle Branch'},
        { label: 'Anuradhapura Branch'},
        { label: 'Ambilipitiya Branch'},
        { label: 'Warakapola Branch'},
        { label: 'Kaluthara Branch'},
    ];
    $scope.serviceArea = [
        { label: 'Zone'},
        { label: 'District'},
        { label: 'Region'},
        { label: 'Cluster'},
        { label: 'Branch'},
    ];
    $scope.policy = {
        proposedPlans: []
    }
    $scope.basicInfo = {
        nicFront: [],
        nicBack: [],
        businessCard: []
    }

    /* other variables */
    $scope.updateState = false;

    /* default run */
    if ($rootScope.campaignId) {
        $scope.campaignId = $rootScope.campaignId;
        $rootScope.campaignId = null
        fetchCampaignMainInfo($scope.campaignId)
    } else {
        $rootScope.campaignId = null
    }

    if ($rootScope.lead?.id) {
        $scope.updateState = true;
        $scope.mainInfo = $rootScope.lead
        let id = $rootScope.lead.id

        if($rootScope.leadIndex != null || $rootScope.leadIndex != undefined) $scope.tabIndex = $rootScope.leadIndex

        $rootScope.lead = null
        $rootScope.leadIndex = null

        fetchSalesPresentations(id)
        fetchFollowUpInterviews(id)
        fetchQuotations(id)
        fetchProposals(id)
        fetchPolicies(id)
        fetchRenewalCollections(id)

        fetchAnalysisClient(id)
        fetchAnalysisSpouse(id)
        fetchAnalysisDependants(id)
        fetchAnalysisAssets(id)
        fetchAnalysisLiabilities(id)
        fetchAnalysisMonthlyExpenses(id)
        fetchAnalysisPolicy(id)
    } else {
        $scope.updateState = false
        $rootScope.lead = null
        $rootScope.leadIndex = null
        $scope.mainInfo = mainInfoTemp
    }

    /* functions */
    $scope.openSideNav = function (nav, item, attr, type) {
        if (item) {
            if (item?.date) item['date'] = new Date(item.date)
            if (item?.time) item['time'] = new Date(item.time)
        }

        if (type) item['type'] = type

        if (attr) $scope[attr] = item;

        $mdSidenav(nav).toggle();
    };

    $scope.openAnotherSideNav = function (nav, item, attr, currentNav) {
        if (attr) $scope[attr] = item;

        $mdSidenav(currentNav).toggle();
        $mdSidenav(nav).toggle();
    };

    $scope.closeSideNav = function (nav, item, attr) {
        if (attr) $scope[attr] = item;

        $mdSidenav(nav).toggle();
    };

    $scope.continueToNextNewLeadStep = (i) => {
        if (i != null || i != undefined) {
            $scope.newLeadTabIndex = 0
        } else {
            $scope.newLeadTabIndex += 1
        }
    }

    $scope.selectProposedPlan = (item) => {
        $scope.selectedProposedPlan = item
    }

    $scope.handleProposedPlanRemove = (item) => {
        if ($scope.selectedProposedPlan?.name == item.info?.name) $scope.selectedProposedPlan = {}

        if (item.info?.id) $scope.deleteAnalysisPolicyProposal(item.info.id)
        $scope.policy.proposedPlans = $scope.policy.proposedPlans.filter(i => i.info.name != item.info.name)
    }

    $scope.updateSignature = (item, name) => {
        let variable = name || 'signature'
        $scope.analysis.policy[variable] = item
    }

    $scope.removeSignature = (name) => {
        let variable = name || 'signature'
        $scope.analysis.policy[variable] = []
    }

    function calculateObjectTotal(obj, totalVar) {
        let total = 0;
        let ignore = ['id', 'leadId', 'createdAt', 'updatedAt']

        for (const key in obj) {
            if (Object.hasOwnProperty.call(obj, key)) {
                if (ignore.includes(key)) continue

                const element = obj[key];
                total += parseFloat(element)
            }
        }

        $scope[totalVar] = total
    }

    $scope.getAnalysisPolicyCoverTitle = (name) => {
        switch (name) {
            case "sumAssured":
                return "Sum Assured";
            case "additionalLife":
                return "Additional Life Covers";
            case "accident":
                return "Accident Covers";
            case "ppd":
                return "PPD";
            case "criticalIllness":
                return "Critical Illness Covers";
            case "hospital":
                return "Hospital Covers";
            case "funeralExpenses":
                return "Funeral Expenses";
            case "spouse":
                return "Spouse Covers";
            case "spouseAlc":
                return "A L C ( Spouse)";
            case "spouseCriticalIllness":
                return "Critical Illness ( Spouse)";
            case "spouseHospital":
                return "Hospital Cover(Spouse)";

            default:
                return "-"
        }
    }

    $scope.handleOnPolicyProposalChange = () => {
        $scope.calculateAnalysisPolicyCoverTotals()
    }

    $scope.calculateAnalysisPolicyCoverTotals = () => {
        let totals = [
            { cover: 'sumAssured', existingPolicy: 0, amount: 0, monthlyPremium: 0, perDayPremium: 0 },
            { cover: 'additionalLife', existingPolicy: 0, amount: 0, monthlyPremium: 0, perDayPremium: 0 },
            { cover: 'accident', existingPolicy: 0, amount: 0, monthlyPremium: 0, perDayPremium: 0 },
            { cover: 'ppd', existingPolicy: 0, amount: 0, monthlyPremium: 0, perDayPremium: 0 },
            { cover: 'criticalIllness', existingPolicy: 0, amount: 0, monthlyPremium: 0, perDayPremium: 0 },
            { cover: 'hospital', existingPolicy: 0, amount: 0, monthlyPremium: 0, perDayPremium: 0 },
            { cover: 'funeralExpenses', existingPolicy: 0, amount: 0, monthlyPremium: 0, perDayPremium: 0 },
            { cover: 'spouse', existingPolicy: 0, amount: 0, monthlyPremium: 0, perDayPremium: 0 },
            { cover: 'spouseAlc', existingPolicy: 0, amount: 0, monthlyPremium: 0, perDayPremium: 0 },
            { cover: 'spouseCriticalIllness', existingPolicy: 0, amount: 0, monthlyPremium: 0, perDayPremium: 0 },
            { cover: 'spouseHospital', existingPolicy: 0, amount: 0, monthlyPremium: 0, perDayPremium: 0 },
        ]

        for (let i = 0; i < $scope.analysis.policy.proposals.length; i++) {
            const object = $scope.analysis.policy.proposals[i].data;

            for (const key in object) {
                if (Object.hasOwnProperty.call(object, key)) {
                    const element = object[key];

                    let index = totals.findIndex(j => j.cover == key);
                    if (index == -1) continue

                    totals[index].existingPolicy += parseFloat(element['existingPolicy'] || 0)
                    totals[index].amount += parseFloat(element['amount'] || 0)
                    totals[index].monthlyPremium += parseFloat(element['monthlyPremium'] || 0)
                    totals[index].perDayPremium += parseFloat(element['perDayPremium'] || 0)

                }
            }
        }

        $scope.analysisPolicyCoversTotals = totals
    }
    $scope.calculateAnalysisPolicyCoverTotals()

    /* set tables */

    function setSalesPresentations() {
        $scope.SalesPresentationLeads = new NgTableParams({}, { dataset: $scope.sales });
    }
    setSalesPresentations()

    function setFollowUpInterviews() {
        $scope.FollowUpInterviewsLeads = new NgTableParams({}, { dataset: $scope.interviews });
    }
    setFollowUpInterviews()

    function setQuotations() {
        $scope.IssueQuotationsLeads = new NgTableParams({}, { dataset: $scope.quotations });
    }
    setQuotations()

    function setProposals() {
        $scope.ProposalsLeads = new NgTableParams({}, { dataset: $scope.proposals });
    }
    setProposals()

    function setPolicies() {
        $scope.PolicyLeads = new NgTableParams({}, { dataset: $scope.policies });
    }
    setPolicies()

    function setRenewalCollections() {
        $scope.RenewalCollectionsLeads = new NgTableParams({}, { dataset: $scope.renewalCollections });
    }
    setRenewalCollections()

    /* save / update details */

    $scope.saveLead = () => {
        $http({
            url: `${$scope.SERVER_URL}api/v1/lead/create`,
            method: 'POST',
            data: {
                campaignId: $scope.campaignId,
                mainInfo: $scope.mainInfo,
                analysis: $scope.analysis,
                salesPresentation: $scope.sales,
                interviews: $scope.interviews,
                quotations: $scope.quotations,
                proposals: $scope.proposals,
                policy: $scope.policies,
                renewalCollections: $scope.renewalCollections,
            }
        })
            .then(
                function (response) {
                    alert("Lead added successfully")

                    setTimeout(() => {
                        //window.location.assign("#/lead-management")
                    }, 500);
                },
                function (err) { // optional
                    console.log(err)
                    alert("Failed to add lead")
                }
            );
    }

    $scope.saveMainInfo = () => {
        $http({
            url: `${$scope.SERVER_URL}api/v1/lead/update`,
            method: 'PATCH',
            data: $scope.mainInfo
        })
            .then(
                function (response) {
                    fetchMainInfo($scope.mainInfo.id)

                    alert("Lead main info updated")
                },
                function (err) { // optional
                    console.log(err)
                }
            );
    }
    $scope.savePersonalData = (nav, type) => {
        if (!Array.isArray($scope.personalData?.images)) $scope.personalData.images = []

        if ($scope.mainInfo?.id) {
            let obj = {
                method: 'PATCH',
                request: 'update'
            }
            if (type == 'dependants') type = 'dependant'

            if (!$scope.personalData?.id) {
                obj.method = 'POST'
                obj.request = 'create'
            }

            if (!$scope.personalData?.leadId) $scope.personalData['leadId'] = $scope.mainInfo.id

            $http({
                url: `${$scope.SERVER_URL}api/v1/lead/analysis/${type}/${obj.request}`,
                method: obj.method,
                data: $scope.personalData
            })
                .then(
                    function (response) {
                        if (type == 'dependant') fetchAnalysisDependants($scope.mainInfo.id)
                        if (type == 'client') fetchAnalysisClient($scope.mainInfo.id)
                        if (type == 'spouse') fetchAnalysisSpouse($scope.mainInfo.id)

                        alert(`Lead analysis ${type} updated`)
                    },
                    function (err) { // optional
                        console.log(err)
                    }
                );
        } else {
            if (type == 'dependants') {
                $scope.analysis[type].push($scope.personalData)
            } else {
                $scope.analysis[type] = $scope.personalData
            }
        }


        $scope.personalData = {}
        $scope.closeSideNav(nav)
    }

    $scope.saveAnalysisMonthlyExpenses = function (nav) {
        if ($scope.analysis.monthlyExpenses?.id) {
            $http({
                url: `${$scope.SERVER_URL}api/v1/lead/analysis/monthlyExpenses/update`,
                method: 'PATCH',
                data: $scope.analysis.monthlyExpenses
            })
                .then(
                    function (response) {
                        fetchAnalysisMonthlyExpenses($scope.mainInfo.id)

                        alert("Lead analysis monthly expenses updated")
                    },
                    function (err) { // optional
                        console.log(err)
                    }
                );
        }

        calculateObjectTotal($scope.analysis.monthlyExpenses, 'analysisMonthlyExpensesTotal')
        $scope.closeSideNav(nav)
    }

    $scope.saveAnalysisAssetsLiabilities = async function (nav) {

        if ($scope.analysis.assets?.id && $scope.analysis.liabilities?.id) {
            const [assetsUpdated, liabilitiesUpdated] = await Promise.all([updateAnalysisAssets(), updateAnalysisLiabilities()])

            if (assetsUpdated && liabilitiesUpdated) alert("Lead analysis assets & liabilities updated")
        }

        calculateObjectTotal($scope.analysis.assets, 'analysisAssetsTotal')
        calculateObjectTotal($scope.analysis.liabilities, 'analysisLiabilitiesTotal')
        $scope.closeSideNav(nav)
    }

    $scope.saveAnalysisIncome = async function (nav) {
        if ($scope.analysis.client?.id && $scope.analysis.spouse?.id) {
            const [clientDataUpdated, spouseDataUpdated] = await Promise.all([updateNonDependantsIncome('client'), updateNonDependantsIncome('spouse')])

            if (clientDataUpdated && spouseDataUpdated) alert("Lead analysis monthly income updated")
        }

        let obj = {
            clientsFixedIncome: $scope.analysis.client.fixedIncome || 0,
            clientsOtherIncome: $scope.analysis.client.otherIncome || 0,
            spousesFixedIncome: $scope.analysis.spouse.fixedIncome || 0,
            spousesOtherIncome: $scope.analysis.spouse.otherIncome || 0,
        }

        calculateObjectTotal(obj, 'analysisFamilyIncome')
        $scope.closeSideNav(nav)
    }

    $scope.saveAnalysisPolicy = async function () {
        if ($scope.analysis.policy?.id) {
            $http({
                url: `${$scope.SERVER_URL}api/v1/lead/analysis/policy/update`,
                method: 'PATCH',
                data: $scope.analysis.policy
            })
                .then(
                    function (response) {
                        fetchAnalysisPolicy($scope.mainInfo.id)

                        alert("Lead analysis policy updated")
                    },
                    function (err) { // optional
                        console.log(err)
                    }
                );
        }
    }

    $scope.saveAnalysisPolicyProposal = async function (proposal) {
        if ($scope.mainInfo?.id) {
            proposal.info['leadId'] = $scope.mainInfo.id

            $http({
                url: `${$scope.SERVER_URL}api/v1/lead/analysis/policy/proposal/create`,
                method: 'POST',
                data: proposal
            })
                .then(
                    function (response) {
                        fetchAnalysisPolicy($scope.mainInfo.id)
                    },
                    function (err) { // optional
                        console.log(err)
                    }
                );
        }
    }

    $scope.saveSalesPresentation = function (nav) {
        if ($scope.sale?.id) {

            //update
            $http({
                url: `${$scope.SERVER_URL}api/v1/lead/sales/update`,
                method: 'PATCH',
                data: $scope.sale
            })
                .then(
                    function (response) {
                        fetchSalesPresentations($scope.mainInfo.id)

                        alert("Lead sales presentation updated")
                    },
                    function (err) { // optional
                        console.log(err)
                    }
                );
        } else if ($scope.mainInfo?.id) {
            $scope.sale['leadId'] = $scope.mainInfo.id

            // create
            $http({
                url: `${$scope.SERVER_URL}api/v1/lead/sales/create`,
                method: 'POST',
                data: $scope.sale
            })
                .then(
                    function (response) {
                        fetchSalesPresentations($scope.mainInfo.id)

                        alert("Lead sales presentation created")
                    },
                    function (err) { // optional
                        console.log(err)
                    }
                );
        } else {
            //save to array
            $scope.sales.push($scope.sale)
        }

        setSalesPresentations()
        $scope.closeSideNav(nav)
    }

    $scope.saveInterview = function (nav) {
        if ($scope.interview?.id) {

            // update
            $http({
                url: `${$scope.SERVER_URL}api/v1/lead/interviews/update`,
                method: 'PATCH',
                data: $scope.interview
            })
                .then(
                    function (response) {
                        fetchFollowUpInterviews($scope.mainInfo.id)

                        alert("Lead interview updated")
                    },
                    function (err) { // optional
                        console.log(err)
                    }
                );
        } else if ($scope.mainInfo?.id) {
            $scope.interview['leadId'] = $scope.mainInfo.id
            $scope.interview['createdBy'] = 'test user'

            // create
            $http({
                url: `${$scope.SERVER_URL}api/v1/lead/interviews/create`,
                method: 'POST',
                data: $scope.interview
            })
                .then(
                    function (response) {
                        fetchFollowUpInterviews($scope.mainInfo.id)

                        alert("Lead interview created")
                    },
                    function (err) { // optional
                        console.log(err)
                    }
                );
        } else {
            //save to array
            $scope.interviews.push($scope.interview)
        }

        setFollowUpInterviews()
        $scope.closeSideNav(nav)
    }

    $scope.saveQuotation = function (nav) {
        if ($scope.quotation?.id) {
            // update

            $http({
                url: `${$scope.SERVER_URL}api/v1/lead/quotation/update`,
                method: 'PATCH',
                data: $scope.quotation
            })
                .then(
                    function (response) {
                        fetchQuotations($scope.mainInfo.id)

                        alert("Lead quotation updated")
                    },
                    function (err) { // optional
                        console.log(err)
                    }
                );
        }

        setQuotations()
        $scope.closeSideNav(nav)
    }

    $scope.saveProposal = function (nav) {
        if ($scope.proposal?.id) {
            // update
            $http({
                url: `${$scope.SERVER_URL}api/v1/lead/proposal/update`,
                method: 'PATCH',
                data: $scope.proposal
            })
                .then(
                    function (response) {
                        fetchProposals($scope.mainInfo.id)

                        alert("Lead proposal updated")
                    },
                    function (err) { // optional
                        console.log(err)
                    }
                );
        } else if ($scope.mainInfo?.id) {
            $scope.proposal['leadId'] = $scope.mainInfo.id
            $scope.proposal['createdBy'] = 'test user'

            // create
            $http({
                url: `${$scope.SERVER_URL}api/v1/lead/proposal/create`,
                method: 'POST',
                data: $scope.proposal
            })
                .then(
                    function (response) {
                        fetchProposals($scope.mainInfo.id)

                        alert("Lead proposal updated")
                    },
                    function (err) { // optional
                        console.log(err)
                    }
                );
        } else {
            //save to array
            $scope.proposals.push($scope.proposal)
        }

        setProposals()
        $scope.closeSideNav(nav)
    }

    $scope.savePolicy = function (nav) {
        if ($scope.policy?.id) {
            // update
            $http({
                url: `${$scope.SERVER_URL}api/v1/lead/policy/update`,
                method: 'PATCH',
                data: $scope.policy
            })
                .then(
                    function (response) {
                        fetchPolicies($scope.mainInfo.id)

                        alert("Lead policy updated")
                    },
                    function (err) { // optional
                        console.log(err)
                    }
                );
        } else if ($scope.mainInfo?.id) {
            $scope.policy['leadId'] = $scope.mainInfo.id
            $scope.policy['createdBy'] = 'test user'

            // create
            $http({
                url: `${$scope.SERVER_URL}api/v1/lead/policy/create`,
                method: 'POST',
                data: $scope.policy
            })
                .then(
                    function (response) {
                        fetchPolicies($scope.mainInfo.id)

                        alert("Lead policy updated")
                    },
                    function (err) { // optional
                        console.log(err)
                    }
                );
        } else {
            //save to array
            $scope.policies.push($scope.policy)
        }

        setPolicies()
        $scope.closeSideNav(nav)
    }

    $scope.saveRenewalCollections = function (nav) {
        if ($scope.renewal?.id) {
            // update
            $http({
                url: `${$scope.SERVER_URL}api/v1/lead/renewalCollection/update`,
                method: 'PATCH',
                data: $scope.renewal
            })
                .then(
                    function (response) {
                        fetchRenewalCollections($scope.mainInfo.id)

                        alert("Lead renewal collection updated")
                    },
                    function (err) { // optional
                        console.log(err)
                    }
                );
        } else if ($scope.mainInfo?.id) {
            $scope.renewal['leadId'] = $scope.mainInfo.id
            $scope.renewal['createdBy'] = 'test user'

            // create
            $http({
                url: `${$scope.SERVER_URL}api/v1/lead/renewalCollection/create`,
                method: 'POST',
                data: $scope.renewal
            })
                .then(
                    function (response) {
                        fetchRenewalCollections($scope.mainInfo.id)

                        alert("Lead renewal collection updated")
                    },
                    function (err) { // optional
                        console.log(err)
                    }
                );
        } else {
            //save to array
            $scope.renewalCollections.push($scope.renewal)
        }

        setRenewalCollections()
        $scope.closeSideNav(nav)
    }

    /* update promises */
    const updateAnalysisAssets = () => {
        return new Promise((resolve) => {
            $http({
                url: `${$scope.SERVER_URL}api/v1/lead/analysis/assets/update`,
                method: 'PATCH',
                data: $scope.analysis.assets
            })
                .then(
                    function (response) {
                        fetchAnalysisAssets($scope.mainInfo.id)
                        resolve(true)
                    },
                    function (err) { // optional
                        console.log(err)
                        resolve(false)
                    }
                );
        })
    }
    const updateAnalysisLiabilities = () => {
        return new Promise((resolve) => {
            $http({
                url: `${$scope.SERVER_URL}api/v1/lead/analysis/liabilities/update`,
                method: 'PATCH',
                data: $scope.analysis.liabilities
            })
                .then(
                    function (response) {
                        fetchAnalysisLiabilities($scope.mainInfo.id)
                        resolve(true)
                    },
                    function (err) { // optional
                        console.log(err)
                        resolve(false)
                    }
                );
        })
    }
    const updateNonDependantsIncome = (type) => {
        return new Promise((resolve) => {
            $http({
                url: `${$scope.SERVER_URL}api/v1/lead/analysis/${type}/update`,
                method: 'PATCH',
                data: $scope.analysis[type]
            })
                .then(
                    function (response) {
                        if (type == 'client') fetchAnalysisClient($scope.mainInfo.id)
                        if (type == 'spouse') fetchAnalysisSpouse($scope.mainInfo.id)

                        return resolve(true)
                    },
                    function (err) { // optional
                        console.log(err)
                        resolve(false)
                    }
                );
        })
    }

    /* delete */

    $scope.deleteAnalysisPolicyProposal = function (id) {
        if(!id) return

        $http({
            url: `${$scope.SERVER_URL}api/v1/lead/analysis/policy/proposal/delete/${id}`,
            method: 'DELETE'
        })
            .then(
                function (response) {
                    fetchAnalysisPolicy($scope.mainInfo.id)
                    alert("Deleted lead analysis proposal")
                },
                function (err) { // optional
                    console.log(err)
                }
            );
    }

    $scope.deleteSalesPresentation = function (id) {
        if(!id) return
        
        $http({
            url: `${$scope.SERVER_URL}api/v1/lead/sales/delete/${id}`,
            method: 'DELETE'
        })
            .then(
                function (response) {
                    fetchSalesPresentations($scope.mainInfo.id)
                    alert("Deleted lead sale")
                },
                function (err) { // optional
                    console.log(err)
                }
            );
    }
    $scope.deleteFollowUpInterview = function (id) {
        if(!id) return
        
        $http({
            url: `${$scope.SERVER_URL}api/v1/lead/interviews/delete/${id}`,
            method: 'DELETE'
        })
            .then(
                function (response) {
                    fetchFollowUpInterviews($scope.mainInfo.id)
                    alert("Deleted lead interview")
                },
                function (err) { // optional
                    console.log(err)
                }
            );
    }
    $scope.deleteProposal = function (id) {
        if(!id) return
        
        $http({
            url: `${$scope.SERVER_URL}api/v1/lead/proposal/delete/${id}`,
            method: 'DELETE'
        })
            .then(
                function (response) {
                    fetchProposals($scope.mainInfo.id)
                    alert("Deleted lead proposal")
                },
                function (err) { // optional
                    console.log(err)
                }
            );
    }
    $scope.deletePolicy = function (id) {
        if(!id) return
        
        $http({
            url: `${$scope.SERVER_URL}api/v1/lead/policy/delete/${id}`,
            method: 'DELETE'
        })
            .then(
                function (response) {
                    fetchPolicies($scope.mainInfo.id)
                    alert("Deleted lead policy")
                },
                function (err) { // optional
                    console.log(err)
                }
            );
    }
    $scope.deleteRenewalCollection = function (id) {
        if(!id) return
        
        $http({
            url: `${$scope.SERVER_URL}api/v1/lead/renewalCollection/delete/${id}`,
            method: 'DELETE'
        })
            .then(
                function (response) {
                    fetchRenewalCollections($scope.mainInfo.id)
                    alert("Deleted lead renewal collection")
                },
                function (err) { // optional
                    console.log(err)
                }
            );
    }

    /* fetch */
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

                        $scope.campaign = response.data
                    }
                },
                function (err) { // optional
                    console.log(err)
                }
            );
    }

    function fetchLeads() {
        $http({
            url: `${$scope.SERVER_URL}api/v1/lead/all`,
            method: 'GET'
        })
            .then(
                function (response) {
                    if (response?.data) {
                        $scope.leads = response.data
                    }
                },
                function (err) { // optional
                    console.log(err)
                }
            );
    }
    fetchLeads()

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

    function fetchMainInfo(id) {
        if (!id) return

        $http({
            url: `${$scope.SERVER_URL}api/v1/lead/${id}`,
            method: 'GET'
        })
            .then(
                function (response) {
                    if (response?.data) {
                        $scope.mainInfo = response.data
                    }
                },
                function (err) { // optional
                    console.log(err)
                }
            );
    }
    function fetchSalesPresentations(id) {
        if (!id) return

        $http({
            url: `${$scope.SERVER_URL}api/v1/lead/sales/lead/${id}`,
            method: 'GET'
        })
            .then(
                function (response) {
                    if (response?.data) {
                        for (let i = 0; i < response.data.length; i++) {
                            const element = response.data[i];
                            if (element['dob']) element['dob'] = new Date(element.dob)
                            if (element['date']) element['date'] = new Date(element.date)
                            if (element['time']) element['time'] = new Date(element.time)
                        }
                        $scope.sales = response.data

                        setSalesPresentations()
                    }
                },
                function (err) { // optional
                    console.log(err)
                }
            );
    }
    function fetchFollowUpInterviews(id) {
        if (!id) return

        $http({
            url: `${$scope.SERVER_URL}api/v1/lead/interviews/lead/${id}`,
            method: 'GET'
        })
            .then(
                function (response) {
                    if (response?.data) {
                        for (let i = 0; i < response.data.length; i++) {
                            const element = response.data[i];
                            if (element['scheduledDate']) element['scheduledDate'] = new Date(element.scheduledDate)
                            if (element['scheduledTime']) element['scheduledTime'] = new Date(element.scheduledTime)
                            if (element['reScheduledDate']) element['reScheduledDate'] = new Date(element.reScheduledDate)
                            if (element['reScheduledTime']) element['reScheduledTime'] = new Date(element.reScheduledTime)
                        }
                        $scope.interviews = response.data

                        setFollowUpInterviews()
                    }
                },
                function (err) { // optional
                    console.log(err)
                }
            );
    }
    function fetchQuotations(id) {
        if (!id) return

        $http({
            url: `${$scope.SERVER_URL}api/v1/lead/quotation/lead/${id}`,
            method: 'GET'
        })
            .then(
                function (response) {
                    if (response?.data) {
                        for (let i = 0; i < response.data.length; i++) {
                            const element = response.data[i];
                            if (element['date']) element['date'] = new Date(element.date)
                            if (element['time']) element['time'] = new Date(element.time)
                        }
                        $scope.quotations = response.data

                        setQuotations()
                    }
                },
                function (err) { // optional
                    console.log(err)
                }
            );
    }
    function fetchProposals(id) {
        if (!id) return

        $http({
            url: `${$scope.SERVER_URL}api/v1/lead/proposal/lead/${id}`,
            method: 'GET'
        })
            .then(
                function (response) {
                    if (response?.data) {
                        for (let i = 0; i < response.data.length; i++) {
                            const element = response.data[i];
                            if (element['date']) element['date'] = new Date(element.date)
                            if (element['time']) element['time'] = new Date(element.time)
                        }
                        $scope.proposals = response.data

                        setProposals()
                    }
                },
                function (err) { // optional
                    console.log(err)
                }
            );
    }
    function fetchPolicies(id) {
        if (!id) return

        $http({
            url: `${$scope.SERVER_URL}api/v1/lead/policy/lead/${id}`,
            method: 'GET'
        })
            .then(
                function (response) {
                    if (response?.data) {
                        for (let i = 0; i < response.data.length; i++) {
                            const element = response.data[i];
                            if (element['date']) element['date'] = new Date(element.date)
                            if (element['time']) element['time'] = new Date(element.time)
                        }
                        $scope.policies = response.data

                        setPolicies()
                    }
                },
                function (err) { // optional
                    console.log(err)
                }
            );
    }
    function fetchRenewalCollections(id) {
        if (!id) return

        $http({
            url: `${$scope.SERVER_URL}api/v1/lead/renewalCollection/lead/${id}`,
            method: 'GET'
        })
            .then(
                function (response) {
                    if (response?.data) {
                        for (let i = 0; i < response.data.length; i++) {
                            const element = response.data[i];
                            if (element['date']) element['date'] = new Date(element.date)
                            if (element['time']) element['time'] = new Date(element.time)
                        }
                        $scope.renewalCollections = response.data

                        setRenewalCollections()
                    }
                },
                function (err) { // optional
                    console.log(err)
                }
            );
    }

    /* fetch analysis data */
    function fetchAnalysisClient(id) {
        if (!id) return

        $http({
            url: `${$scope.SERVER_URL}api/v1/lead/analysis/client/lead/${id}`,
            method: 'GET'
        })
            .then(
                function (response) {
                    if (response?.data) {
                        if (response.data['dob']) response.data['dob'] = new Date(response.data.dob)
                        $scope.analysis.client = response.data

                        let obj = {
                            clientsFixedIncome: $scope.analysis.client.fixedIncome || 0,
                            clientsOtherIncome: $scope.analysis.client.otherIncome || 0,
                            spousesFixedIncome: $scope.analysis.spouse.fixedIncome || 0,
                            spousesOtherIncome: $scope.analysis.spouse.otherIncome || 0,
                        }

                        calculateObjectTotal(obj, 'analysisFamilyIncome')
                    }
                },
                function (err) { // optional
                    console.log(err)
                }
            );
    }
    function fetchAnalysisSpouse(id) {
        if (!id) return

        $http({
            url: `${$scope.SERVER_URL}api/v1/lead/analysis/spouse/lead/${id}`,
            method: 'GET'
        })
            .then(
                function (response) {
                    if (response?.data) {
                        if (response.data['dob']) response.data['dob'] = new Date(response.data.dob)
                        $scope.analysis.spouse = response.data

                        let obj = {
                            clientsFixedIncome: $scope.analysis.client.fixedIncome || 0,
                            clientsOtherIncome: $scope.analysis.client.otherIncome || 0,
                            spousesFixedIncome: $scope.analysis.spouse.fixedIncome || 0,
                            spousesOtherIncome: $scope.analysis.spouse.otherIncome || 0,
                        }

                        calculateObjectTotal(obj, 'analysisFamilyIncome')
                    }
                },
                function (err) { // optional
                    console.log(err)
                }
            );
    }
    function fetchAnalysisDependants(id) {
        if (!id) return

        $http({
            url: `${$scope.SERVER_URL}api/v1/lead/analysis/dependant/lead/${id}`,
            method: 'GET'
        })
            .then(
                function (response) {
                    if (response?.data) {
                        for (let i = 0; i < response.data.length; i++) {
                            const element = response.data[i];
                            if (element['dob']) element['dob'] = new Date(element.dob)
                        }
                        $scope.analysis.dependants = response.data
                    }
                },
                function (err) { // optional
                    console.log(err)
                }
            );
    }
    function fetchAnalysisAssets(id) {
        if (!id) return

        $http({
            url: `${$scope.SERVER_URL}api/v1/lead/analysis/assets/lead/${id}`,
            method: 'GET'
        })
            .then(
                function (response) {
                    if (response?.data) {
                        $scope.analysis.assets = response.data

                        calculateObjectTotal($scope.analysis.assets, 'analysisAssetsTotal')
                    }
                },
                function (err) { // optional
                    console.log(err)
                }
            );
    }
    function fetchAnalysisLiabilities(id) {
        if (!id) return

        $http({
            url: `${$scope.SERVER_URL}api/v1/lead/analysis/liabilities/lead/${id}`,
            method: 'GET'
        })
            .then(
                function (response) {
                    if (response?.data) {
                        $scope.analysis.liabilities = response.data

                        calculateObjectTotal($scope.analysis.liabilities, 'analysisLiabilitiesTotal')
                    }
                },
                function (err) { // optional
                    console.log(err)
                }
            );
    }
    function fetchAnalysisMonthlyExpenses(id) {
        if (!id) return

        $http({
            url: `${$scope.SERVER_URL}api/v1/lead/analysis/monthlyExpenses/lead/${id}`,
            method: 'GET'
        })
            .then(
                function (response) {
                    if (response?.data) {
                        $scope.analysis.monthlyExpenses = response.data
                    }
                },
                function (err) { // optional
                    console.log(err)
                }
            );
    }
    function fetchAnalysisPolicy(id) {
        if (!id) return

        $http({
            url: `${$scope.SERVER_URL}api/v1/lead/analysis/policy/lead/${id}`,
            method: 'GET'
        })
            .then(
                function (response) {
                    if (response?.data) {
                        if (response.data['date']) response.data['date'] = new Date(response.data.date)
                        $scope.analysis.policy = response.data

                        $scope.calculateAnalysisPolicyCoverTotals()
                    }
                },
                function (err) { // optional
                    console.log(err)
                }
            );
    }
})