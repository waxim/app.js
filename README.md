AppJS
=====

A Simple JS MVC for creating rapid MVC apps in JS.

# Dependencies.
- [Grapnel.js](https://github.com/gregsabia/Grapnel.js/tree/master) - used for hashbang routing.
- [Underscore.js] (https://github.com/jashkenas/underscore) - Template rendering and array tools.

# Example

```JS
app.extend("home",{
	
	/* test for required loaded modules before we load this one */
	require: ['models','controllers','views'],
	
    /* This is our 'constructor' */
    _construct: function(){
		
		/* add our views */
		app.views.add("home", "<h1>Welcome to Satmap</h1>");
		
        /* we can register a model */
        app.models.add("user",{ name: "", email: ""});

        /* we register a 'controller' */
        app.controllers.register({controller: "/", callback: 
			function(req){ 
				app.render(app.home.page());
			} 
		});
		
    },

    /* register a function to be used by out controller */
    page: function(){ 
        return app.views.show("home", app.models.get("user"));
    }

});
```

if the above is loaded ``app.home.page()`` will be triggered when the hashbang is empty. 