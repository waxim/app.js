// Load our main app functions into an app variable
(function app(options){
	//  Set a version
	this.version = "1.0";
	
	// handle options we've been passed.
	this.options = options || {};
	
	this.options.panel = this.options.panel || 'panel';
	
	// Set an error handler. 
	this.error = function(title,msg){
		if(this.options.die){
			// we're not catching because we want the script to die.
			throw new Error(title+": "+msg);
		} else if(this.options.log){
			console.log(title+": "+msg);
		} else { return true; }
	}
	
	// Test our required plugins.
	if(typeof _ == 'undefined' || typeof Grapnel == 'undefined'){
		throw new Error('one or more of the required libs is missing.');
	} 
	
	// Set a function to allow us to extend our class
	this.extend = function(a,b){
		this[a] = b;
		
		// test our requirements
		if(typeof this[a].require == 'object' && this[a].require.length > 0){
			for(var subject in this[a].require){
				if(typeof this[this[a].require[subject]] == 'undefined'){
					this.error('Module Error','The required module '+this[a].require[subject]+' was requested but not found.');
					// make sure  we actually dump out, in case the throw is suppressed.
					return null;
				}
			}
		}
		
		// Give ourselves a constructor.
		if(typeof this[a]._construct == "function"){
			this[a]._construct();
		}
	}
	
	// Allow the stashing of values on our object. Obviously this may replacee existing methods.
	this.set = function(a,b){
		this[a] = b;
	}
	
	this.render = function(content){
		document.getElementById(this.options.panel).innerHTML = content;
	}
	
	window.app = this;
})({die: 1});

// Add out view module
// A a simple views class, using _ templates.
// ToDo:- Fetch templates from file.
// ToDo:- Bind a view to a model
app.extend("views",{
	_views: [],
	add: function(name, html){
		this._views[name] = _.template(html);
	},
	show: function(name, obj){
		return this._views[name](obj);
	}
});

// Add our routes module
// ToDo:- Add route mapping
app.extend("controllers",{
	router: new Grapnel().router(),
	register: function(obj){
		this.router.get(obj.controller, obj.callback);
	}
});

// Add out models module
app.extend("models",{
		collection: {},
		add: function(name, model){
			this.collection[name] = model;
			return this;
		},

		remove: function(name, model){
			delete this.collection[model];
			return this;
		},

		set: function(model,data){
			for(var a in data){
				if(typeof this.collection[model][a] != 'undefined'){
					this.collection[model][a] = data[a];
				}
			}
		},

		get: function(model){
			return this.collection[model];
		}
});
