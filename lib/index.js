'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var toString = Object.prototype.toString;

var typeOf = function typeOf(o) {
  return toString.call(o).slice(8, -1).toLowerCase();
};

function createLocationDescriptor(_ref) {
  var to = _ref.to;
  var query = _ref.query;
  var hash = _ref.hash;
  var state = _ref.state;

  if (typeOf(to) === 'string') {
    return { pathname: to, query: query, hash: hash, state: state };
  }
  return _extends({ query: query, hash: hash, state: state }, to);
}

module.exports = function activeComponent(Component, options) {
  if (!Component) {
    throw new Error('activeComponent() must be given a tag name or React component');
  }

  options = _extends({
    link: true,
    linkClassName: undefined
  }, options);

  return _react2['default'].createClass({
    contextTypes: {
      router: _react.PropTypes.object
    },

    propTypes: {
      activeClassName: _react.PropTypes.string.isRequired,
      to: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.object]).isRequired,

      activeStyle: _react.PropTypes.object,
      className: _react.PropTypes.string,
      hash: _react.PropTypes.string,
      link: _react.PropTypes.bool,
      linkProps: _react.PropTypes.object,
      onlyActiveOnIndex: _react.PropTypes.bool,
      query: _react.PropTypes.object
    },

    getDefaultProps: function getDefaultProps() {
      return {
        activeClassName: 'active',
        link: options.link,
        onlyActiveOnIndex: false
      };
    },

    render: function render() {
      var _props = this.props;
      var link = _props.link;
      var linkProps = _props.linkProps;
      var to = _props.to;
      var query = _props.query;
      var hash = _props.hash;
      var state = _props.state;
      var onlyActiveOnIndex = _props.onlyActiveOnIndex;
      var activeClassName = _props.activeClassName;
      var activeStyle = _props.activeStyle;

      var props = _objectWithoutProperties(_props, ['link', 'linkProps', 'to', 'query', 'hash', 'state', 'onlyActiveOnIndex', 'activeClassName', 'activeStyle']);

      var location = createLocationDescriptor({ to: to, query: query, hash: hash, state: state });
      var router = this.context.router;

      if (router) {
        props.active = this.context.router.isActive(location, onlyActiveOnIndex);
        if (props.active) {
          if (activeClassName) {
            props.className = '' + (props.className || '') + (props.className ? ' ' : '') + activeClassName;
          }
          if (activeStyle) {
            props.style = _extends({}, props.style, { activeStyle: activeStyle });
          }
        }
      }

      if (!link) {
        return _react2['default'].createElement(
          Component,
          props,
          this.props.children
        );
      }
      return _react2['default'].createElement(
        Component,
        props,
        _react2['default'].createElement(
          _reactRouter.Link,
          _extends({ className: options.linkClassName }, linkProps, { to: location }),
          this.props.children
        )
      );
    }
  });
};