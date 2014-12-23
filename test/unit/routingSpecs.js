describe('Unit: Routing', function () {
  var $route;
  beforeEach(module('onTappApp'));

  beforeEach(inject(function($injector){
    $route = $injector.get('$route');
  }));

  it('Should have root route, template, and controller', function () {
    expect($route.routes['/']).to.be.ok();
    expect($route.routes['/'].controller).to.eql('MainController');
    expect($route.routes['/'].templateUrl).to.eql('pages/home.html');
  });

  it('Should have /nearby route, template, and controller', function () {
    expect($route.routes['/nearby']).to.be.ok();
    expect($route.routes['/nearby'].controller).to.eql('NearByController');
    expect($route.routes['/nearby'].templateUrl).to.eql('pages/nearby.html');
  });

  it('Should have /ratings route, template, and controller', function () {
    expect($route.routes['/ratings']).to.be.ok();
    expect($route.routes['/ratings'].controller).to.eql('RatingsController');
    expect($route.routes['/ratings'].templateUrl).to.eql('pages/ratings.html');
  });

  it('Should have /signup route, template, and controller', function () {
    expect($route.routes['/signup']).to.be.ok();
    expect($route.routes['/signup'].controller).to.eql('AuthController');
    expect($route.routes['/signup'].templateUrl).to.eql('pages/signup.html');
  });

  it('Should have /signin route, template, and controller', function () {
    expect($route.routes['/signin']).to.be.ok();
    expect($route.routes['/signin'].controller).to.eql('AuthController');
    expect($route.routes['/signin'].templateUrl).to.eql('pages/signin.html');
  });
});
