AppJS
=====

All of the current MVC JS frameworks where FAR too complicated. So I made this super simple 'framework' for creating rapid MVC apps in JS.

# Dependencies.
- [Grapnel.js](https://github.com/gregsabia/Grapnel.js/tree/master) - used for hashbang routing.
- [Underscore.js] (https://github.com/jashkenas/underscore) - Template rendering and array tools.

# Examples

Super simple example for example for displaying 'default' content.

```JS
app.extend("home",{
	
	/* test for required loaded modules before we load this one */
	require: ['models','controllers','views'],
	
    /* This is our 'constructor' */
    _construct: function(){
		
		/* add our views */
		app.views.add("home", "<h1>Welcome to Satmap</h1>");
		
        /* we can register a model */
        app.models.add("page",{ title: "", content: ""});

        /* we register a 'controller' */
        app.controllers.register({controller: "/", callback: 
			function(req){ 
				app.render(app.home.page());
			} 
		});
		
    },

    /* register a function to be used by out controller */
    page: function(){ 
        return app.views.show("home", app.models.get("page"));
    }

});
```

if the above is loaded ``app.home.page()`` will be triggered when the hashbang is empty. 

an example to show model data in a rendered view.

```JS
app.extend("home",{
	
	/* test for required loaded modules before we load this one */
	require: ['models','controllers','views'],
	
    /* This is our 'constructor' */
    _construct: function(){
		
		/* add our views */
		app.views.add("home", "<h1><%= title %></h1><p><%= content %></p>");
		
        /* we can register a model */
        app.models.add("page",{ title: "Welcome to satmap", content: "there is some content here."});

        /* we register a 'controller' */
        app.controllers.register({controller: "/", callback: 
			function(req){ 
				app.render(app.home.page());
			} 
		});
		
    },

    /* register a function to be used by out controller */
    page: function(){ 
        return app.views.show("home", app.models.get("page"));
    }

});
```

will render the model values into our view. see ``_.js`` templating for more information.