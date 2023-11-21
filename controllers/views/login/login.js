app.controller('login', function ($scope, $location) {
    $scope.login = function () {
        // Perform login logic (e.g., validate credentials)
        // If successful, redirect to the default page
        $location.path('/default');
    };
});