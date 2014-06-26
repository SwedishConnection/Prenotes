var expect = require('expect.js');


describe('Register', function() {

  it('Simple', function() {
    dispatcher.register(function(payload) {
      return true;
    });

    expect(true).to.be.ok();
  });
});
