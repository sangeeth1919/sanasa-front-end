app.controller('login', ['$scope', '$location', function ($scope, $location) {
    $scope.login = function () {
        
        if ($scope.username === 'user' && $scope.password === 'password') {
            $location.path('/');
        } else {
            alert('Invalid credentials. Please try again.');
        }
    };
}]);