const app = angular.module('Surecore', ['ngMaterial', 'ngRoute', 'ngAnimate', 'ngTable', 'angularMoment', 'chart.js'])
var menu = true;

/* angularjs loadash issue fix */
app.constant('_', window._);

app.config(['$routeProvider', '$locationProvider', '$mdThemingProvider', function ($routeProvider, $locationProvider, $mdThemingProvider) {
    $locationProvider.hashPrefix('')

    $routeProvider
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'login'
        })
        /* competition management */
        .when('/competition-management', {
            templateUrl: 'views/competitionManagement.html'
        })
        /* campaign management */
        .when('/campaign-management', {
            templateUrl: 'views/campaignManagement.html'
        })
        .when('/campaign-approval', {
            templateUrl: 'views/campaignApproval.html'
        })
        .when('/campaign-management/all', {
            templateUrl: 'views/campaign/all.html'
        })
        .when('/campaign-management/new', {
            templateUrl: 'views/campaign/new.html'
        })
        .when('/campaign-management/scheduled', {
            templateUrl: 'views/campaign/scheduled.html'
        })
        .when('/campaign-management/followup', {
            templateUrl: 'views/campaign/followUp.html'
        })
        .when('/campaign-management/followup-notifications', {
            templateUrl: 'views/campaign/followUpNotifications.html'
        })
        .when('/campaign-management/launch', {
            templateUrl: 'views/campaign/launch.html'
        })
        .when('/campaign-management/social-media', {
            templateUrl: 'views/campaign/socialMedia.html'
        })
        .when('/campaign-management/progress', {
            templateUrl: 'views/campaign/progressReports.html'
        })
        .when('/campaign-management/gift-distribution', {
            templateUrl: 'views/campaign/giftDistribution.html'
        })
        .when('/campaign-management/leads', {
            templateUrl: 'views/campaign/leads.html'
        })
        .when('/campaign-management/budgets', {
            templateUrl: 'views/campaign/budgets.html'
        })
        /* lead management */
        .when('/leads-management', {
            templateUrl: 'views/leadsManagement.html'
        })
        .when('/leads-management/pool', {
            templateUrl: 'views/leads/pool/pool.html'
        })
        .when('/leads-management/assign', {
            templateUrl: 'views/leads/assign/pool.html'
        })
        .when('/leads-management/followup', {
            templateUrl: 'views/leads/followUp.html'
        })
        .when('/leads-management/new', {
            templateUrl: 'views/leads/new/new.html'
        })
        .when('/leads-management/appointments', {
            templateUrl: 'views/leads/appointments.html'
        })
        /* appointments */
        .when('/appointments', {
            templateUrl: 'views/appointments.html'
        })
        /* else */
        .otherwise({
            redirectTo: '/'
        })
}])

app.run(["$rootScope", "$anchorScroll", '$window', function ($rootScope, $anchorScroll, $window) {
    $rootScope.$on("$locationChangeSuccess", function () {
        document.getElementsByTagName('body')[0].scroll(0,0)
        
        setTimeout(() => {
            handleAppContentSize()
        }, 1000);
    });
}]);

app.controller('SurecoreController', ($scope, $window) => {

    var appWindow = angular.element($window);

    $scope.SERVER_URL = 'https://test.nawamaga.online/'

    appWindow.bind('load', function () {
        handleMobileMenuState()
    });

    appWindow.bind('resize', function () {
        handleMobileMenuState()
        handleAppContentSize()
    });

    $scope.handleOnLinkClick = function () {
        handleMobileMenuState()
    }

    $scope.handleOnMenuClick = function () {
        let sideNav = document.getElementById('sideNavbar');
        menu = !menu
        if (sideNav) sideNav.dataset.active = menu
        handleAppContentSize()
    }

    $scope.getLastCreatedAt = function(array) {
        if(!Array.isArray(array)) return null;

        let last = array[array.length - 1] || {};

        if(!last['createdAt']) return null;

        return last['createdAt'];
    }
    
    $scope.getLastUpdatedAt = function(array) {
        if(!Array.isArray(array)) return null;

        let last = array[array.length - 1] || {};

        if(!last['updatedAt']) return null;

        return last['updatedAt'];
    }

    $scope.expandState = function(bool) {
        if(!!bool) return 'active'

        return ''
    }

    $scope.isValidURL = function (string) {
        if (!string) return false
        
        var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        return (res !== null)
    };

    $scope.ignoreKeys = function (key) {
        if(!key) return false;

        let ignore = ['createdat', 'updatedat', 'leadid', 'id']

        if(ignore.includes(key.toLowerCase())) return false;

        return true;
    }
})

angular.element(document).ready(function () {
    const interval = setInterval(() => {
        let sideNav = document.getElementById('sideNavbar');
        let appBody = document.getElementById('app');

        if (!sideNav || !appBody) return

        clearInterval(interval)
        handleMobileMenuState()
        handleAppContentSize()
    }, 100)
});

function handleMobileMenuState() {
    let sideNav = document.getElementById('sideNavbar');
    if (window.innerWidth < 960) {
        menu = false
    }

    if (sideNav) sideNav.dataset.active = menu
    handleAppContentSize()
}

function handleAppContentSize() {
    let width = '100%';
    let sideNavWidth = 350;
    let appBody = document.getElementById('app')

    if(window.innerWidth > 960 && menu) {
        width = `${window.innerWidth - sideNavWidth}px`
    }
    
    if(appBody) appBody.style.width = width
}
