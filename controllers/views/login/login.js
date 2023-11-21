app.controller('login', function ($scope, $location) {
    $scope.login = function () {
        $location.path('/');
    };
});