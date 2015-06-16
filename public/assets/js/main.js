var config = {paths: {}, shim: {}};
  
config.paths = {
  jquery: '/vendor/jquery/jquery.min'
  , underscore: '/vendor/underscore/underscore-min'
  , backbone: '/vendor/backbone/backbone-min'
  , users: 'users/users'
}

// if you want, you can set your shim here, like this:
config.shim = {
  jquery: {
    exports: '$'
  }
  , underscore: {
    exports: '_'
  }
  , backbone: {
    deps: [
      'underscore'
      , 'jquery'
    ]
    , exports: 'Backbone'
  }
};

require.config(config);
require([ 
    'users'
  ]
);