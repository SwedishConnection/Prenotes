var expect = require('expect.js');
var flux = require('../../../src/lib/flux');


describe('flux', function() {

  it('Register', function() {
    var dispatcher = new flux.Dispatcher();

    var index = dispatcher.register('make stuff happen', function(payload) {
      return true;
    });

    expect(index).to.be(0);
  });


  it('Unregister', function() {
    var dispatcher = new flux.Dispatcher();

    var index = dispatcher.register('make stuff happen', function(payload) {
      return true;
    });

    var whatGotRemoved = dispatcher.unregister(index);

    expect('make stuff happen').to.equal(whatGotRemoved.action);
  });
});
