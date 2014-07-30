var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);
chai.should();

var flux = require('../../../src/lib/flux');
var Promise = require('es6-promise').Promise;


describe('flux', function() {

  it('Register', function() {
    var dispatcher = new flux.Dispatcher();

    var index = dispatcher.register('make stuff happen', function(payload) {
      return true;
    });

    chai.expect(index).to.equal(0);
  });


  it('Unregister', function() {
    var dispatcher = new flux.Dispatcher();

    var index = dispatcher.register('make stuff happen', function(payload) {
      return true;
    });

    var whatGotRemoved = dispatcher.unregister(index);

    chai.expect('make stuff happen').to.equal(whatGotRemoved[0].action);
  });


  it('Dispatch', function() {
    var dispatcher = new flux.Dispatcher();

    var index = dispatcher.register('make stuff happen', function(data) {
      return data;
    });

    var promise = dispatcher.dispatch('make stuff happen', 'value');

    promise.should.become(['value']).and.notify(done);
  });
});
