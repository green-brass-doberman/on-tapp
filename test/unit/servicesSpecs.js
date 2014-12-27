describe('Unit: Services', function () {
  var factory;

  beforeEach(function(){
    module('onTappApp.services');

    inject(function($injector){
      factory = $injector.get('breweries');
    });
  });

  it('Should instantiate with 3 breweries', function () {
    expect(factory.getData).to.be.a('function');
  });
});
