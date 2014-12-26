describe('Unit: AuthController', function () {
  var $scope, $rootScope, createController;

  // using angular mocks, we can inject the injector
  // to retrieve our dependencies
  beforeEach(module('onTappApp'));
  beforeEach(inject(function($injector) {

    // mock out our dependencies
    $rootScope = $injector.get('$rootScope');
    $scope = $rootScope.$new();

    var $controller = $injector.get('$controller');

    // used to create our AuthController for testing
    createController = function () {
      return $controller('AuthController', {
        $scope: $scope
      });
    };

    createController();
  }));

  it('should have a signup method', function() {
    expect($scope.signup).to.be.a('function');
  });

  it('should have a signin method', function() {
    expect($scope.signin).to.be.a('function');
  });
});
