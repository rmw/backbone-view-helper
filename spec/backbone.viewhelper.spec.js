describe("backbone viewhelper", function() {
    beforeEach(function() {
       this.helper1 =  new Backbone.ViewHelper( {
           prefix : 'one'
       });
    });
    describe("creating one viewhelper", function() {
		
		describe("css", function() {
		    it("should have prefixed show css", function() { expect(this.helper1.css.show).toEqual('one_show'); });
            it("should have prefixed edit css", function() { expect(this.helper1.css.edit).toEqual('one_edit'); });
            it("should have prefixed index css", function() { expect(this.helper1.css.index).toEqual('one_list'); });
            it("should have prefixed 'new' css", function() { expect(this.helper1.css['new']).toEqual('one_new'); });
            it("should have prefixed form css", function() { expect(this.helper1.css.form).toEqual('one_form'); });
            it("should have prefixed destroy css", function() { expect(this.helper1.css.destroy).toEqual('one_delete'); });
		});
		
		describe("id", function() {
			it('should have a prefixed attribute', function() { expect(this.helper1.id.attribute).toEqual('one-id'); });
			it("should have a prefixed tag id", function() { expect(this.helper1.id.tag(1)).toEqual('one_1'); });
		});

		describe("urls", function() {
	       it("should have an index url", function() {
	         expect(this.helper1.url('index')).toEqual('ones');
	       });
		   it("should have an edit url", function() {
		   	expect(this.helper1.url('edit', 1)).toEqual('ones/1/edit');
		   });
		   it("should have a show url", function() {
		   	expect(this.helper1.url('show')).toEqual('ones');
		   });
		   it("should have a new url", function() {
		   	expect(this.helper1.url('new')).toEqual('ones/new');
		   });
		});
		it("should have the correct routes", function() {
			routes = this.helper1.getRoutes(["edit", "index", "new"], ["edit", "index", "newContact"]);
			expect(routes).toEqual({
				'ones/:id/edit' : 'edit',
				'ones' : 'index',
				'ones/new' : 'newContact'
			});
		});
		
		describe("links", function() {
			it("should create a new link", function() { expect(this.helper1.links['new']).toEqual('new_link'); });
			it("should create an edit link", function() { expect(this.helper1.links.edit).toEqual('edit_link'); }); 
			it("should create a delete link", function() { expect(this.helper1.links.destroy).toEqual('delete_link'); });
			describe("link events", function() {
				it('should create one correct link event', function() {
					expect(this.helper1.getLinkEvents(["click"], ["new"], ["newContact"])).toEqual({ 'click .new_link' : 'newContact'});
				});
				it('should create multiple correct link events', function() {
					expect(this.helper1.getLinkEvents(["click", "click"], ["edit", "destroy"], ["edit", "destroy"])).toEqual({ 
						'click .edit_link' : 'edit',
						'click .delete_link' : 'destroy'
					});
				})
			});
		});
    });

    describe("creating two viewhelpers", function() {
        beforeEach(function() {
           this.helper2 = new Backbone.ViewHelper({
              prefix : 'two'
           });
        });

       it("should have a string url", function() {
          expect(this.helper2.url('index')).toEqual('twos');
       });


    });
});