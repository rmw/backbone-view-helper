(function(){
    //Backbone.ViewHelper
    Backbone.ViewHelper = function(options) {
        this.defaults = {
            prefixDelimiter : '_',
            prefixExempt : {
                css : [],
                url : [],
                id : [],
                routes : false
            },
            css : {
                show : 'show',
                edit : 'edit',
                index : 'list',
                'new' : 'new',
                form : 'form',
                destroy : 'delete'
            },
            links : ['new', 'edit', 'destroy'],
            url : {
                show : '',
                edit : ':id/edit',
                index : '',
                'new' : 'new'
            },
            id : {
                attribute : '-id',
                tag : '_'
            }
        };

        this.url = function(val, id, includePrefix) {
            includePrefix = includePrefix || !this.options.prefixExempt.url[val];
            var url = this.options.url[val];
            url = id ? url.replace(':id', id) : url;
            if(includePrefix) {
                //we don't want a slash at the end of the index
                var u = this.options.prefix + 's';
                if(url != '') u = u + '/' +url;
                url = u;
            }
            return url;
        };

        this.find = function(id) {
          return $('#' + this.id.tag(id));
        },
        this.getId = function(el) {
          return $(el).attr(this.id.attribute);
        },
        this.getRoutes = function(routeVals, eventVals, includePrefix) {
           includePrefix = includePrefix | !this.options.prefixExempt.routes;
           var self = this;
           var routes = {};
           $.each(routeVals, function(i, val) {
		   		console.log(val);
				console.log(self.options.url);
                routes[self.url(val, null,includePrefix)] = eventVals[i];
           });
           return routes;
        },
        this.getLinkEvents = function(eventNames, linkNames, methodNames) {
           var events = {};
            var self = this;
           $.each(eventNames, function(i, val) {
              var e = val + " ." + self.links[linkNames[i]];
              events[e] = methodNames[i];
           });
           return events;
        },
        this._setAttributes = function(attrName, func) {
			this[attrName] = this[attrName] || {};
            var attr = this.options[attrName];
            var exempts = this.options.prefixExempt[attrName];
            for(var val in attr) {
                if(_.include(exempts, val)) return;
                var orig = attr[val];
				this[attrName][val] = func(val, orig);
            }
        },
        this.initialize = function() {
            var self = this;
            //css
            this._setAttributes('css', function(val, orig) {
                return self.options.prefix + self.options.prefixDelimiter + orig;
            });
            this.css.toClass = function(attr) {
                return ("." + attr);
            }

            //links
            this.links = {};
            _.each(this.options.links, function(val) {
                self.links[val] = self.options.css[val] + "_link";
            });

            //ids
            this._setAttributes('id', function(val, orig) {
                return self.options.prefix + orig;
            });
            this.id.tag = (function(tagPrefix) {
                return function(id) {
                    return tagPrefix + id;
                }
            })(this.id.tag);

            return this;
        },
        this._configure = function(options) {
           options = options || {};
           this.options = $.extend({}, this.defaults, options);
        }


        //constructor
        this._configure(options);
        this.initialize();
    };

})();