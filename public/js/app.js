angular.module('myApp', [])
.controller('MainController', function($scope) {
  $scope.name = "Victor";
  $scope.sayHello = function() {
    $scope.greeting = "Hello " + $scope.name;
  };
});
