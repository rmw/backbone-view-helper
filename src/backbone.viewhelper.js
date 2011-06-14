(function(){
    //TODO: add tests
    Backbone.ViewHelper = function(options) {
        this._configure(options);
        this.initialize();
        return this;
    };

    _.extend(Backbone.ViewHelper.prototype, {
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
        },
        find : function(id) {
          return $('#' + this.id.tag(id));
        },
        getId : function(el) {
          return $(el).attr(this.id.attribute);
        },
        getRoutes : function(routeVals, eventVals, includePrefix) {
           includePrefix = includePrefix | !this.prefixExempt.routes;
           var self = this;
           var routes = {};
           $.each(routeVals, function(i, val) {
                routes[self.url[val](null,includePrefix)] = eventVals[i];
           });
           return routes;
        },
        getLinkEvents : function(eventNames, linkNames, methodNames) {
           var events = {};
            var self = this;
           $.each(eventNames, function(i, val) {
              var e = val + " ." + self.links[linkNames[i]];
              events[e] = methodNames[i];
           });
           return events;
        },
        _setAttributes : function(attr, func, exempts) {
            for(var val in attr) {
                if(_.include(exempts, val)) return;
                var orig = attr[val];
                attr[val] = func(val, orig);
            }
        },
        initialize : function() {
            var self = this;
            //add prefix to classes
            //css
            this._setAttributes(this.css, function(val, orig) {
                return self.prefix + self.prefixDelimiter + orig;
            }, this.prefixExempt.css);
            this.css.toClass = function(attr) {
                return ("." + attr);
            }

            //links
            var linkTemp = this.links;
            this.links = {};
            _.each(linkTemp, function(val) {
                self.links[val] = self.css[val] + "_link";
            });

            //make urls functions that take the id
            this._setAttributes(this.url, function(val, orig) {
                return (function(newOrig, prefix, includePrefix) {
                    return function(id) {
                        var url = id ? newOrig.replace(':id', id) : newOrig;
                        if(includePrefix) {
                            //we don't want a slash at the end of the index
                            var u = prefix + 's';
                            if(url != '') u = u + '/' +url;
                            url = u;
                        }
                        return url;
                    };
                })(orig, self.prefix, !self.prefixExempt.url[val]);
            }, this.prefixExempt.url);
            
            //ids
            this._setAttributes(this.id, function(val, orig) {
                return self.prefix + orig;
            }, this.prefixExempt.id);
            this.id.tag = (function(tagPrefix) {
                return function(id) {
                    return tagPrefix + id;
                }
            })(this.id.tag);
            
            return this;
        },
        _configure : function(options) {
           options = options || {};
           if (this.options) options = _.extend({}, this.options, options);
           if (options.prefix) this.prefix = options.prefix;
           if (options.prefixDelimiter) this.prefixDelimiter = options.prefixDelimiter;
           if (options.prefixExempt) this.prefixExempt = _.extend({}, this.prefixExempt, options.prefixExempt);
           if (options.css)  this.css = _.extend({}, this.css, options.css);
           if (options.links) this.links = options.links;
           if (options.url) this.url = _.extend({}, this.url, options.url);
           if (options.id) this.id = _.extend({}, this.id, options.id);
           this.options = options;
        }
    });

})();