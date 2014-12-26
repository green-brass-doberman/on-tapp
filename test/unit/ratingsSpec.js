describe('Unit: RatingsController', function () {
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

  it('should have initial ratings when page first load', function() {
    expect($scope.rate).to.equal(0);
    expect($scope.max).to.equal(5);
  });

  it('should have a method to calculate the star percentage', function() {
    expect($scope.hoveringOver).to.be.a('function');
  });

  it('should have a rating states', function() {
    expect($scope.ratingStates).to.be.a('array');
  });

  it('should have a method to save rating', function() {
    expect($scope.saveRating).to.be.a('function');
  });
});
