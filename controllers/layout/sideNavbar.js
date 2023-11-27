app.controller('SideNavbarController', ($scope, $location) => {
    let profile = {
        img: '',
        letter: 'U',
        name: 'Nalinda Jayasinghe',
        role: 'Senior Manager',
        serial: 'SN000123432',
        state: false
    }
    let socials = [
        {
            icon: 'phone',
            link: 'tel:+123456789'
        },
        {
            icon: 'email',
            link: 'mailto:jwareautomation@gmail.com'
        },
        {
            icon: 'whatsapp',
            link: 'tel:+123456789'
        },
        {
            icon: 'facebook-messenger',
            link: 'https://www.messenger.com/'
        },
        {
            icon: 'skype',
            link: 'https://www.skype.com/en/'
        },
        {
            icon: 'linkedin',
            link: 'https://www.linkedin.com/'
        },
    ]
    $scope.socials = socials

    let links = [
        // {
        //     link: '',
        //     label: 'Dashboard'
        // },
        // {
        //     link: '#/profile',
        //     label: 'My Profile'
        // },
        // {
        //     link: '#/report-download',
        //     label: 'Report Download'
        // },
        {
            link: '#/leads-management',
            label: 'Leads Management'
        },
        // {
        //     link: '#/training-development',
        //     label: 'Training & Development'
        // },
        // {
        //     link: '#/competition-management',
        //     label: 'Competition Management'
        // },
        {
            link: '#/campaign-management',
            label: 'Campaign Management'
        },
        // {
        //     link: '#/customer-service',
        //     label: 'Customer Service'
        // },
        // {
        //     link: '#/my-income',
        //     label: 'My Income'
        // },
        {
            link: '#/loans',
            label: 'Loans'
        },
        {
            link: '#/task-manager',
            label: 'Task Manager'
        },
    ]
    $scope.links = links

    $scope.menuClass = function (page) {
        var current = $location.path().split('/');
        if(!page) page = '#'

        return (page == `#/${current[1]}`) ? "active" : "";
    };
    $scope.menuSubClass = function (page) {
        var current = $location.path();
        if(!page) page = '#'
        
        return (page == `#${current}`) ? "active" : "";
    };

    $scope.profile = profile
    
})