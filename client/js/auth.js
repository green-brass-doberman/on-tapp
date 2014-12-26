angular.module('onTappApp.auth', [])

  .controller('AuthController', function($scope) {
    $scope.user = {};

    $scope.signin = function(){
      console.log('sign in');
    };

    $scope.signup = function(){
      console.log('sign up');
    };
});
