
var integration = require('analytics.js-integration');

/**
 * Expose `Route` integration.
 */

var Route = module.exports = integration('Route')
  .global('_rq')
  .global('_route')
  .option('organizationId', '')
  .tag('<script id="rtracker" data-organization-id="{{ organizationId }}" src="//www.routecdn.com/tracker/route-tracker-min.js">');

/**
 * Initialize Route.
 *
 * @param {Facade} page
 */

Route.prototype.initialize = function(page){
  window._rq = window._rq || [];
  window._route = window._route || [];
  window._route.methods = ['identify', 'track', 'trackById'];
  window._route.factory = function(method){
    return function(){
      var args = Array.prototype.slice.call(arguments);
      args.unshift(method);
      window._rq.push(args);
      return window._rq;
    };
  };
  for (var i = 0; i < window._route.methods.length; i++) {
    var key = window._route.methods[i];
    window._route[key] = window._route.factory(key);
  }
  this.load(this.ready);
};

/**
 * Has the Route library been loaded yet?
 *
 * @return {Boolean}
 */

Route.prototype.loaded = function(){
  return window._rq && window._rq.push !== Array.prototype.push;
};

/**
 * Identify a user.
 *
 * @param {Facade} identify
 */

Route.prototype.identify = function(identify){
  window._route.identify(identify.traits());
};

/**
 * Track an event.
 *
 * @param {Facade} track
 */

Route.prototype.track = function(track){
  window._route.track(track.event());
};
