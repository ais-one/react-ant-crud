"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _react = _interopRequireWildcard(require("react"));

var _antd = require("antd");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// Popconfirm, Icon
var Option = _antd.Select.Option;
var TextArea = _antd.Input.TextArea;

function ReactAndCrudForm(props) {
  // props:
  // mode, setMode, formFields, formData, loading, handleFormSubmit, formType, updateFieldValue
  var _useState = (0, _react.useState)({}),
      _useState2 = _slicedToArray(_useState, 2),
      formItem = _useState2[0],
      setFormItem = _useState2[1];

  (0, _react.useEffect)(function () {
    var formFields = props.formFields,
        formData = props.formData;

    var _formFields = formFields.map(function (item) {
      return _objectSpread({}, item, {
        value: formData ? formData[item.name] : item.value,
        hidden: item.hidden && item.hidden === 'add' && !formData || item.hidden && item.hidden === 'edit' && formData || item.hidden && item.hidden === 'all',
        readonly: item.readonly && item.readonly === 'add' && !formData || item.readonly && item.readonly === 'edit' && formData || item.readonly && item.readonly === 'all'
      });
    }); // console.log(formFields)


    setFormItem(_formFields);
  }, [props]);

  var changeValue = function changeValue(name, value) {
    setFormItem(formItem.map(function (o) {
      if (o.name === name) return _objectSpread({}, o, {
        value: value
      });
      return o;
    }));
    props.updateFieldValue(name, value);
  };

  var handleSubmit =
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(e) {
      var id, data, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, item;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              e.preventDefault(); // console.log('submit', formItem)

              data = {};
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context.prev = 5;

              for (_iterator = formItem[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                item = _step.value;

                if (item.name === 'id') {
                  // TBD make id configurable
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
      label: item.label
    }, _react.default.createElement(_antd.Input, _extends({}, item.props, {
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
      label: item.label
    }, _react.default.createElement(TextArea, _extends({}, item.props, {
      disabled: item.readonly,
      value: item.value,
      onChange: function onChange(e) {
        return changeValue(item.name, e.target.value);
      }
    })));else if (item.type === 'number') return _react.default.createElement(_antd.Form.Item, {
      key: item.name,
      label: item.label
    }, _react.default.createElement(_antd.InputNumber, _extends({}, item.props, {
      disabled: item.readonly,
      value: item.value,
      onChange: function onChange(v) {
        return changeValue(item.name, v);
      }
    })));else if (item.type === 'switch') return _react.default.createElement(_antd.Form.Item, {
      key: item.name,
      label: item.label
    }, _react.default.createElement(_antd.Switch, _extends({}, item.props, {
      disabled: item.readonly,
      checked: item.value,
      onChange: function onChange(v) {
        return changeValue(item.name, v);
      }
    })));else if (item.type === 'date') return _react.default.createElement(_antd.Form.Item, {
      key: item.name,
      label: item.label
    }, _react.default.createElement(_antd.DatePicker, _extends({}, item.props, {
      disabled: item.readonly,
      value: (0, _moment.default)(item.value),
      onChange: function onChange(dateString) {
        return changeValue(item.name, dateString);
      }
    })));else if (item.type === 'select') return _react.default.createElement(_antd.Form.Item, {
      key: item.name,
      label: item.label
    }, _react.default.createElement(_antd.Select, _extends({}, item.props, {
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
      label: item.label
    }, _react.default.createElement(_antd.Radio.Group, _extends({}, item.props, {
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