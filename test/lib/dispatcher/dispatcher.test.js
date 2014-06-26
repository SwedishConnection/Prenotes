var expect = require('expect.js');
var dispatcher = normal || require('../../../src/lib/dispatcher');


describe('Register', function() {

  it('Simple', function() {
    var index = dispatcher.register(function(payload) {
      return true;
    });

    expect(index).to.be(0);
  });
});
