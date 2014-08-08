var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);
chai.should();

var Dispatcher = require('../../../src/lib/flux/Dispatcher');
var Store = require('../../../src/lib/flux/Store');
var Promise = require('es6-promise').Promise;


describe('flux', function() {

  it('Register', function() {
    var dispatcher = new Dispatcher();

    var index = dispatcher.register('make stuff happen', function(payload) {
      return true;
    });

    chai.expect(index).to.equal(0);
  });


  it('Unregister', function() {
    var dispatcher = new Dispatcher();

    var index = dispatcher.register('make stuff happen', function(payload) {
      return true;
    });

    var whatGotRemoved = dispatcher.unregister(index);

    chai.expect('make stuff happen').to.equal(whatGotRemoved[0].action);
  });


  it('Dispatch', function(done) {
    var dispatcher = new Dispatcher();

    var upper = function(data) {
      return data.toUpperCase();
    }

    var index = dispatcher.register('make stuff happen', upper);

    /** Dispatcher returns a promise */
    var result = dispatcher.dispatch('make stuff happen', 'value');

    result.should.become(['VALUE']).and.notify(done);
  });


  it('Store functions', function() {
    var store = new Store();
    store.mount(new Dispatcher());

    chai.expect(store.get).to.be.a('function');
  });


  it('Store set and get a value', function() {
    var store = new Store();
    store.mount(new Dispatcher());

    store.set(['stuff', 1, 'car'], 'volvo');
    chai.expect(store.get(['stuff', 1, 'car'])).to.equal('volvo');
  });


  it('Store set and get a function', function() {
    var store = new Store();
    store.mount(new Dispatcher());

    store.set(
      ['completed'],
      function (completeFlag) {
        return completeFlag == undefined ? false : !completeFlag;
      }
    );

    chai.expect(store.get(['completed'])).to.equal(false);
  });


  it('Watching a store', function(done) {
    var store = new Store(new Dispatcher());
    store.mount(new Dispatcher());

    store.addWatch(function (keys, oldState, newState) {
      chai.expect(store.get(['completed'])).to.equal(true);
      done();
    });

    store.set(['completed'], true);
  });


  it('Create a store', function() {
    var custom = Store.extend({
      actions : [],

      getInitialState : function() {
        return {
          'lang' : 'en'
        }
      }
    });
    custom.mount(new Dispatcher());

    chai.expect(custom.get(['lang'])).to.equal('en');
  });


  it('Using a store', function(done) {
    var dispatcher = new Dispatcher();

    var custom = Store.extend({
      actions : [
        [
          'CHANGE_LANGUAGE',
          function(lang) {
            this.set(['lang'], lang);

            return this.get(['lang']);
          }
        ]
      ]
    });
    custom.mount(dispatcher);

    var result = dispatcher.dispatch('CHANGE_LANGUAGE', 'en');
    result.should.become([custom.get(['lang'])]).and.notify(done);
  });
});
