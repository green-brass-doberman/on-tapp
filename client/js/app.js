 // create the module and name it onTappApp
var onTappApp = angular.module('onTappApp', []);

// create the controller and inject Angular's $scope
onTappApp.controller('mainController', function($scope) {
  $scope.name = "user";
  $scope.sayHello = function() {
    $scope.greeting = "Hello " + $scope.name;
  };
});
