angular.module('onTap', [])
.controller('MainController', function($scope) {
  $scope.name = "user";
  $scope.sayHello = function() {
    $scope.greeting = "Hello " + $scope.name;
  };
});
