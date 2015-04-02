/** @jsx React.DOM */
var Reflux = require('reflux');
var _ = require('lodash');
var actions = require('../actions/actions');

var _banners = [];

var defaultBanners = function() {
  return [
    {"id": 1, "name": "banner 1", "imageUrl": "http://somegif.com", "targetUrl": "http://www.topcoder.com", "active": "Yes"},
    {"id": 2, "name": "banner 4", "imageUrl": "http://anothergif.com", "targetUrl": "http://www.appirio.com", "active": "Yes"},
    {"id": 3, "name": "banner 2", "imageUrl": "http://one-more-gif.com", "targetUrl": "http://www.topcoder.com/blog", "active": "Yes"}
  ]
}

var bannersStore  = Reflux.createStore({

  init: function() {
    // set the private banners variables to our initial array
    _banners = defaultBanners();
    // register addBanner action & bind to addBanner function
    this.listenTo(actions.addBanner, this.addBanner);
    // register toggleStatus action & bind to togggle function
    this.listenTo(actions.toggleStatus, this.toggle);
  },

  // returns the private array of banners
  getBanners: function() {
    return _banners
  },

  // returns a banner by id
  getBanner: function(bannerId) {
    return _.where(_banners, { 'id': bannerId })[0];
  },

  // pushes the newly created banner to the private array of banners
  addBanner: function(banner) {
    _banners.push(banner);
  },

  // callback for toggle action
  toggle: function(bannerId) {
    var banner = this.getBanner(bannerId);
    // toggle the banner status in the obect
    banner.active = banner.active === 'Yes' ? 'No' : 'Yes';
    // pass the data on to any listeners -- see toggleStatus in view.js)
    this.trigger();
  }

});

module.exports = bannersStore;
