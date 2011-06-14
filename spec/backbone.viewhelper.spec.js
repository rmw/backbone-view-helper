describe("backbone viewhelper", function() {
    beforeEach(function() {
       this.helper1 =  new Backbone.ViewHelper( {
           prefix : 'one'
       });
    });
    describe("creating one viewhelper", function() {

       it("should have a string url", function() {
          expect(this.helper1.url.index()).toEqual(this.helper1.prefix + 's');
       });
    });

    describe("creating two viewhelpers", function() {
        beforeEach(function() {
           this.helper2 = new Backbone.ViewHelper({
              prefix : 'two'
           });
        });

       it("should have a string url", function() {
          expect(this.helper2.url.index()).toEqual(this.helper2.prefix + 's');
       });


    });
});