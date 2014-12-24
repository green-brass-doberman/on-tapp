describe('Unit: MainController', function() {
  // Load the module with MainController
  beforeEach(module('onTappApp'));

  var ctrl, scope;
  // inject the $controller and $rootScope services
  // in the beforeEach block
  beforeEach(inject(function($controller, $rootScope) {
    // Create a new scope that's a child of the $rootScope
    scope = $rootScope.$new();
    // Create the controller
    mainController = $controller('MainController', {
      $scope: scope
    });
  }));

  it('should create $scope.greeting when calling sayHello',
    function() {
      expect(scope.navbarTitle).to.be.undefined;
      scope.setTitle();
      expect(scope.navbarTitle).to.equal("On Tapp");
  });
});
