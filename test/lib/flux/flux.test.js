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


  it('Dispatch', function(done) {
    var dispatcher = new flux.Dispatcher();

    var upper = function(data) {
      return data.toUpperCase();
    }

    var index = dispatcher.register('make stuff happen', upper);

    /** Dispatcher returns a promise */
    var result = dispatcher.dispatch('make stuff happen', 'value');

    result.should.become(['VALUE']).and.notify(done);
  });
});
