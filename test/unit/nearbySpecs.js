describe('NearByController', function () {
  var $scope, $rootScope, createController;

  beforeEach(module('onTappApp'));
  beforeEach(inject(function($injector) {

    $rootScope = $injector.get('$rootScope');
    $scope = $rootScope.$new();

    var $controller = $injector.get('$controller');

    createController = function () {
      return $controller('NearByController', {
        $scope: $scope
      });
    };

    createController();
  }));

  it('should have an array breweries', function() {
    expect($scope.breweries).to.be.a('array');
  });

  it('should have a map', function() {
    expect($scope.map).to.be.a('object');
  });
});
