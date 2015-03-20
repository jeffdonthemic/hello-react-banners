/** @jsx React.DOM */
var React = require('react');
var Reflux     = require('reflux');
var BannersStore = require('../stores/bannersStore');

var Link = require('react-router').Link;

function getBanners() {
  return { banners: BannersStore.getBanners() }
}

var Banners = React.createClass({

  getInitialState: function() {
    return getBanners();
  },

  render: function() {

    var rows = this.state.banners.map(function(banner, i) {
      return (
        <tr key={i}>
          <td><Link to="banner" params={{ id: banner.id }}>{banner.name}</Link></td>
          <td>{banner.imageUrl}</td>
          <td>{banner.targetUrl}</td>
          <td>{banner.active}</td>
        </tr>
      )
    });

    return (
      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>URL</th>
              <th>Active?</th>
            </tr>
          </thead>
          <tbody>
            { rows }
          </tbody>
        </table>
      </div>
    )
  }

});

module.exports = Banners;
