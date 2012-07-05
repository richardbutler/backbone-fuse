var tests = [
  'test/app/fuse'
];

require.config({
  baseUrl: "../",
  
  paths: {
    "backbone": "lib/backbone-bootstrap",
    "backbonejs": "lib/backbone",
    "underscore": "lib/underscore-bootstrap",
    "underscorejs": "lib/underscore"
  }
});

require( [ "underscore", "backbone" ].concat( tests ), function() {
  if (typeof mocha !== 'undefined') {
    mocha.run();
  }
});
