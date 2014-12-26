describe('RatingsController', function () {
  var $scope, $rootScope, createController;

  beforeEach(module('onTappApp'));
  beforeEach(inject(function($injector) {

    $rootScope = $injector.get('$rootScope');
    $scope = $rootScope.$new();

    var $controller = $injector.get('$controller');

    createController = function () {
      return $controller('RatingsController', {
        $scope: $scope
      });
    };

    createController();
  }));

  it('should have a rating states', function() {
    expect($scope.ratingStates).to.be.a('array');
  });
});
