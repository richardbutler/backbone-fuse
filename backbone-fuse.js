(function init( global ) {
  
  "use strict";
  
  var define = global.define,
      require = global.require;
  
  function fuse( _, Backbone ) {
    
    // Only initialise once
    if ( Backbone.hasOwnProperty( "ModelRegistry" ) ) return Backbone.ModelRegistry;
    
    var modelExtend = Backbone.Model.extend;
    
    Backbone.ModelRegistry = {
      mixin: {
        register: function( model ) {
          if ( model.id ) {
            this.registry[ model.id ] = model;
          } else {
            throw new Error( "Cannot register model without an ID." );
          }
        },
        retrieve: function( id ) {
          if ( !id ) return;
          return this.registry[ id ];
        },
        registry: {}
      }
    };
    
    Backbone.Model.extend = function( props, statics ) {
      var clazz, factory;
      
      // Call the original Backbone.Model.extend and
      // create a wireframe class
      clazz = modelExtend.apply( Backbone.Model, arguments );
      
      // Mix in the ModelRegistry functionality
      _.extend( clazz, Backbone.ModelRegistry.mixin );
      
      // Proxy factory method for model creation
      factory = function( attributes, options ) {
        var id, idAttr, model;
        
        // Grab the id from the passed attributes
        attributes = attributes || {};
        options = options || {};
        idAttr = options.idAttribute || "id";
        id = attributes[ idAttr ];
        
        // Retrieve the existing model, if it exists
        model = clazz.retrieve.call( clazz, id );
        if ( model ) {
          // Refresh the collection with the new attributes
          model.set( attributes );
        }
        
        // Return the existing model, or a new one if it doesn't exist
        return model || new clazz( attributes, options );
      };
      
      // Override the "set" method to intercept ID assignments
      clazz.prototype.set = function( key, value, options ) {
        Backbone.Model.prototype.set.apply( this, arguments );
        
        // If we're updating this model's ID...
        if ( key === this.idAttribute || ( _.isObject( key ) && key[ this.idAttribute ] ) ) {
          // then update the registry with this model
          clazz.register( this );
        }
      };
      
      return factory;
    }
    
    return Backbone.ModelRegistry;
  }
  
  if ( typeof define !== "undefined" ) {
    define( [ "underscore", "backbone" ], fuse );
  } else {
    fuse( global._, global.Backbone );
  }
})( this );
