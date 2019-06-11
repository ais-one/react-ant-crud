"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _moment = _interopRequireDefault(require("moment"));

var _react = _interopRequireWildcard(require("react"));

var _antd = require("antd");

// Popconfirm, Icon
var Option = _antd.Select.Option;
var TextArea = _antd.Input.TextArea;

function ReactAndCrudForm(props) {
  // props:
  // mode, setMode, formFields, formData, loading, handleFormSubmit, formType, updateFieldValue
  var _useState = (0, _react.useState)({}),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      formItem = _useState2[0],
      setFormItem = _useState2[1];

  (0, _react.useEffect)(function () {
    var formFields = props.formFields,
        formData = props.formData;

    var _formFields = formFields.map(function (item) {
      return (0, _objectSpread2.default)({}, item, {
        value: formData ? formData[item.name] : item.value,
        hidden: item.hidden && item.hidden === 'add' && !formData || item.hidden && item.hidden === 'edit' && formData || item.hidden && item.hidden === 'all',
        readonly: item.readonly && item.readonly === 'add' && !formData || item.readonly && item.readonly === 'edit' && formData || item.readonly && item.readonly === 'all'
      });
    }); // console.log(formFields)


    setFormItem(_formFields);
  }, [props]);

  var changeValue = function changeValue(name, value) {
    setFormItem(formItem.map(function (o) {
      if (o.name === name) return (0, _objectSpread2.default)({}, o, {
        value: value
      });
      return o;
    }));
    props.updateFieldValue(name, value);
  };

  var handleSubmit =
  /*#__PURE__*/
  function () {
    var _ref = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee(e) {
      var id, data, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, item;

      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              e.preventDefault(); // console.log('submit', props.idName, formItem)

              data = {};
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context.prev = 5;

              for (_iterator = formItem[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                item = _step.value;

                if (item.name === props.idName) {
                  id = item.value;
                } else {
                  data[item.name] = item.value;
                }
              }

              _context.next = 13;
              break;

            case 9:
              _context.prev = 9;
              _context.t0 = _context["catch"](5);
              _didIteratorError = true;
              _iteratorError = _context.t0;

            case 13:
              _context.prev = 13;
              _context.prev = 14;

              if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
              }

            case 16:
              _context.prev = 16;

              if (!_didIteratorError) {
                _context.next = 19;
                break;
              }

              throw _iteratorError;

            case 19:
              return _context.finish(16);

            case 20:
              return _context.finish(13);

            case 21:
              props.handleFormSubmit({
                id: id,
                data: data
              });

            case 22:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[5, 9, 13, 21], [14,, 16, 20]]);
    }));

    return function handleSubmit(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  return _react.default.createElement(_antd.Spin, {
    spinning: props.loading
  }, _react.default.createElement(_antd.Form, {
    onSubmit: handleSubmit,
    style: {
      padding: 16
    }
  }, !formItem.length ? '' : formItem.map(function (item) {
    if (item.hidden) {
      return '';
    } else if (item.type === 'input') return _react.default.createElement(_antd.Form.Item, {
      key: item.name,
      label: item.label,
      colon: item.colon
    }, _react.default.createElement(_antd.Input, (0, _extends2.default)({}, item.props, {
      // placeholder={item.label}
      // validateStatus={'error'}
      // help={'Please Enter'}
      disabled: item.readonly,
      value: item.value,
      onChange: function onChange(e) {
        return changeValue(item.name, e.target.value);
      }
    })));else if (item.type === 'textarea') return _react.default.createElement(_antd.Form.Item, {
      key: item.name,
      label: item.label,
      colon: item.colon
    }, _react.default.createElement(TextArea, (0, _extends2.default)({}, item.props, {
      disabled: item.readonly,
      value: item.value,
      onChange: function onChange(e) {
        return changeValue(item.name, e.target.value);
      }
    })));else if (item.type === 'number') return _react.default.createElement(_antd.Form.Item, {
      key: item.name,
      label: item.label,
      colon: item.colon
    }, _react.default.createElement(_antd.InputNumber, (0, _extends2.default)({}, item.props, {
      disabled: item.readonly,
      value: item.value,
      onChange: function onChange(v) {
        return changeValue(item.name, v);
      }
    })));else if (item.type === 'switch') return _react.default.createElement(_antd.Form.Item, {
      key: item.name,
      label: item.label,
      colon: item.colon
    }, _react.default.createElement(_antd.Switch, (0, _extends2.default)({}, item.props, {
      disabled: item.readonly,
      checked: item.value,
      onChange: function onChange(v) {
        return changeValue(item.name, v);
      }
    })));else if (item.type === 'date') return _react.default.createElement(_antd.Form.Item, {
      key: item.name,
      label: item.label,
      colon: item.colon
    }, _react.default.createElement(_antd.DatePicker, (0, _extends2.default)({}, item.props, {
      disabled: item.readonly,
      value: (0, _moment.default)(item.value),
      onChange: function onChange(dateString) {
        return changeValue(item.name, dateString);
      }
    })));else if (item.type === 'select') return _react.default.createElement(_antd.Form.Item, {
      key: item.name,
      label: item.label,
      colon: item.colon
    }, _react.default.createElement(_antd.Select, (0, _extends2.default)({}, item.props, {
      value: item.value,
      onChange: function onChange(a, b) {
        return changeValue(item.name, a);
      }
    }), item.options.map(function (option) {
      return _react.default.createElement(Option, {
        key: option.value,
        value: option.value
      }, option.label);
    })));else if (item.type === 'radio') return _react.default.createElement(_antd.Form.Item, {
      key: item.name,
      label: item.label,
      colon: item.colon
    }, _react.default.createElement(_antd.Radio.Group, (0, _extends2.default)({}, item.props, {
      onChange: function onChange(e) {
        return console.log(e);
      },
      value: item.value
    }), item.options.map(function (option) {
      return _react.default.createElement(_antd.Radio, {
        key: option.value,
        value: option.value
      }, option.label);
    })));else return '';
  }), props.formType !== 'filter' ? _react.default.createElement(_antd.Form.Item, null, _react.default.createElement(_antd.Button, {
    style: {
      marginRight: 8
    },
    type: "primary",
    htmlType: "submit"
  }, props.mode === 'add' ? 'Add' : 'Update'), _react.default.createElement(_antd.Button, {
    type: "default",
    htmlType: "button",
    onClick: function onClick() {
      return props.setMode('view');
    }
  }, "Cancel")) : ''));
}

var _default = ReactAndCrudForm;
exports.default = _default;