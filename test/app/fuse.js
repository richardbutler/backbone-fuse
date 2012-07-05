define([
  'backbone',
  '../../backbone-fuse'
], function( Backbone ) {
  
  var Thing, ThingCollection;
  
  Thing = Backbone.Model.extend({
    getTheValue: function() {
      return true;
    }
  });
  ThingCollection = Backbone.Collection.extend({
    model: Thing
  })
  
  describe( "models", function() {
    var thing1, thing2, thing3;
    
    thing1 = new Thing({
      id: 23,
      message: "What?"
    });
    thing2 = new Thing({
      id: 23,
      message: "Eh?"
    });
    thing3 = new Thing({
      id: 16,
      message: "Pardon?"
    });
    
    it( "thing with the same ID should reference the existing item", function() {
      expect( thing1.cid ).to.equal( thing2.cid );
    });
    
    it( "model extension shouldn't compromise options'", function() {
      expect( thing1.getTheValue() ).to.be( true );
    });

  });
  
  describe( "collections", function() {
    var things1, things2;
    
    things1 = new ThingCollection([{
      id: 12,
      message: "What?"
    }, {
      id: 12,
      message: "Eh?"
    }, {
      id: 15,
      message: "Pardon?"
    }]);
    things2 = new ThingCollection([{
      id: 15,
      message: "Que?"
    }]);
    
    it( "duplicate item in collection should overwrite", function() {
      expect( things1.get( 12 ).get( "message" ) ).to.be( "Eh?" );
    });
    
    it( "collection shouldn't accept duplicates", function() {
      expect( things1.length ).to.be( 2 );
    });
    
    it( "model should carry across collections", function() {
      expect( things1.get( 15 ) ).to.be( things2.at( 0 ) );
    });
    
    it( "model values should carry across collections", function() {
      expect( things2.at( 0 ).get( "message" ) ).to.be( "Que?" );
    });
    
  });
});
