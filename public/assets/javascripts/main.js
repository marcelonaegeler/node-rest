var config = {paths: {}, shim: {}};
  
config.paths = {
  react: '/vendor/react/react'
  , jsx: '/vendor/react/JSXTransformer'
}

// if you want, you can set your shim here, like this:
config.shim = {
  jsx: {
    scriptType: 'text/jsx'
    , deps: [ 'react' ]
  }
};

// Set config
require.config(config);

// Get the required modules from body's 'data-require'
var modules = document.body.dataset.require.split(',');
var requireModules = [];
for(var module in modules) {
  requireModules.push(modules[module].trim());
}

require(requireModules);