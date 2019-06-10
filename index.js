"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ReactAntCrud = _interopRequireDefault(require("./ReactAntCrud"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _ReactAntCrud.default;
exports.default = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _antd = require("antd");

var _ReactAntCrudForm = _interopRequireDefault(require("./ReactAntCrudForm"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ReactAndCrud(props) {
  // props:
  // columns, formFieldsFilter, formFieldsCrud, find, findOne, update, insert, delete, tableColumns
  var _useState = (0, _react.useState)('view'),
      _useState2 = _slicedToArray(_useState, 2),
      mode = _useState2[0],
      setMode = _useState2[1]; // const [loading, setLoading] = useState(false)


  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      showFilter = _useState4[0],
      setShowFilter = _useState4[1];

  var _useState5 = (0, _react.useState)([]),
      _useState6 = _slicedToArray(_useState5, 2),
      tableData = _useState6[0],
      setTableData = _useState6[1];

  var _useState7 = (0, _react.useState)({}),
      _useState8 = _slicedToArray(_useState7, 2),
      formDataCrud = _useState8[0],
      setFormDataCrud = _useState8[1];

  var _useState9 = (0, _react.useState)({}),
      _useState10 = _slicedToArray(_useState9, 2),
      formDataFilter = _useState10[0],
      setFormDataFilter = _useState10[1];

  var _useState11 = (0, _react.useState)({
    current: 1,
    pageSize: 8,
    total: 0,
    position: 'top'
  }),
      _useState12 = _slicedToArray(_useState11, 2),
      pagination = _useState12[0],
      setPagination = _useState12[1];

  var _useState13 = (0, _react.useState)({}),
      _useState14 = _slicedToArray(_useState13, 2),
      sorter = _useState14[0],
      setSorter = _useState14[1]; // field, order


  var actionColumn = {
    title: 'Action',
    dataIndex: '',
    key: 'action',
    width: 108,
    render: function render(text, record) {
      return _react.default.createElement(_react.default.Fragment, null, props.update ? _react.default.createElement(_react.default.Fragment, null, ' ', _react.default.createElement(_antd.Button, {
        icon: "edit",
        onClick: function onClick(e) {
          return openEditForm(record.id);
        }
      })) : '', props.remove ? _react.default.createElement(_react.default.Fragment, null, ' ', _react.default.createElement(_antd.Button, {
        icon: "delete",
        onClick: function onClick(e) {
          return deleteRecord(record.id);
        }
      })) : '');
    }
  };

  var columns = _toConsumableArray(props.tableColumns);

  if (props.update || props.remove) columns.unshift(actionColumn);
  var temp = {};
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = props.formFieldsFilter[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var item = _step.value;
      temp[item.name] = item.value;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = props.formFieldsFilter[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var _item = _step2.value;
      formDataFilter[_item.name] = _item.value;
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  var getRows = (0, _react.useCallback)(
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(_pagination, _filters, _sorter) {
      var page, _ref2, data;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              // loading state on
              console.log('formDataFilter', formDataFilter);
              console.log('sorter', _sorter); // console.log('pagination', pagination)
              // if (!_pagination) _pagination = { ...pagination }

              _context.prev = 2;
              page = _pagination.current; // const offset = (page -1 ) * _pagination.pageSize

              _context.next = 6;
              return props.find({
                page: page,
                limit: _pagination.pageSize
              });

            case 6:
              _ref2 = _context.sent;
              data = _ref2.data;

              // data = { results: [], totals: 0 }
              if (data.results) {
                setTableData(data.results);
                setPagination(_objectSpread({}, _pagination, {
                  total: data.totals
                }));
              } else {
                setTableData([]);
                setPagination(_objectSpread({}, _pagination, {
                  total: 0
                }));
              }

              setSorter(_objectSpread({}, _sorter));
              _context.next = 14;
              break;

            case 12:
              _context.prev = 12;
              _context.t0 = _context["catch"](2);

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[2, 12]]);
    }));

    return function (_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }(), [formDataFilter, props]);
  (0, _react.useEffect)(function () {
    var doFetch =
    /*#__PURE__*/
    function () {
      var _ref3 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                console.log('useEffect'); // console.log('ccc', pagination.current, pagination.pageSize, pagination.total)

                _context2.next = 3;
                return getRows({
                  current: 1,
                  pageSize: 8,
                  total: 0,
                  position: 'top'
                }, null, {});

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function doFetch() {
        return _ref3.apply(this, arguments);
      };
    }();

    doFetch(); // return
  }, [getRows]); // only on mount

  var getRow =
  /*#__PURE__*/
  function () {
    var _ref4 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(id) {
      var result, _ref5, data;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!id) {
                _context3.next = 6;
                break;
              }

              _context3.next = 3;
              return props.findOne({
                id: id
              });

            case 3:
              _ref5 = _context3.sent;
              data = _ref5.data;
              result = data;

            case 6:
              setFormDataCrud(result);

            case 7:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function getRow(_x4) {
      return _ref4.apply(this, arguments);
    };
  }();

  var openAddForm =
  /*#__PURE__*/
  function () {
    var _ref6 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4() {
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return getRow();

            case 2:
              setMode('add');

            case 3:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    return function openAddForm() {
      return _ref6.apply(this, arguments);
    };
  }();

  var openEditForm =
  /*#__PURE__*/
  function () {
    var _ref7 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5(id) {
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return getRow(id);

            case 2:
              setMode('edit');

            case 3:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    return function openEditForm(_x5) {
      return _ref7.apply(this, arguments);
    };
  }();

  var deleteRecord =
  /*#__PURE__*/
  function () {
    var _ref8 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee7(id) {
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _antd.Modal.confirm({
                title: 'Confirmation',
                content: 'Proceed To Delete?',
                okText: 'Delete',
                cancelText: 'Cancel',
                onCancel: function onCancel() {
                  return console.log('cancel');
                },
                onOk: function () {
                  var _onOk = _asyncToGenerator(
                  /*#__PURE__*/
                  regeneratorRuntime.mark(function _callee6() {
                    return regeneratorRuntime.wrap(function _callee6$(_context6) {
                      while (1) {
                        switch (_context6.prev = _context6.next) {
                          case 0:
                            _context6.next = 2;
                            return props.remove({
                              id: id
                            });

                          case 2:
                            if (tableData.length === 1 && pagination.current > 1) {
                              pagination.current = pagination.current - 1;
                            }

                            getRows(pagination, null, sorter);

                          case 4:
                          case "end":
                            return _context6.stop();
                        }
                      }
                    }, _callee6);
                  }));

                  function onOk() {
                    return _onOk.apply(this, arguments);
                  }

                  return onOk;
                }(),
                okButtonProps: {
                  type: 'danger' // cancelButtonProps

                }
              });

            case 1:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    }));

    return function deleteRecord(_x6) {
      return _ref8.apply(this, arguments);
    };
  }();

  var updateFieldValueCrud = function updateFieldValueCrud(name, value) {// setFormDataFilter({...formDataCrud, [name]: value })  
  };

  var updateFieldValueFilter = function updateFieldValueFilter(name, value) {
    setFormDataFilter(_objectSpread({}, formDataFilter, _defineProperty({}, name, value)));
  };

  var handleFormSubmit =
  /*#__PURE__*/
  function () {
    var _ref10 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee8(_ref9) {
      var id, data;
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              id = _ref9.id, data = _ref9.data;

              if (!(mode === 'add')) {
                _context8.next = 6;
                break;
              }

              _context8.next = 4;
              return props.insert({
                _data: data
              });

            case 4:
              _context8.next = 9;
              break;

            case 6:
              if (!(mode === 'edit')) {
                _context8.next = 9;
                break;
              }

              _context8.next = 9;
              return props.update({
                id: id,
                _data: data
              });

            case 9:
              _context8.next = 11;
              return getRows(pagination, null, sorter);

            case 11:
              setMode('view');

            case 12:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    }));

    return function handleFormSubmit(_x7) {
      return _ref10.apply(this, arguments);
    };
  }(); // use display none instead of ? to show / hide components... cause problems in the case of Table sorter


  return _react.default.createElement("div", {
    className: "Crud"
  }, _react.default.createElement("div", {
    style: {
      display: mode === 'view' ? 'block' : 'none'
    }
  }, _react.default.createElement(_antd.Card, {
    bodyStyle: {
      padding: "0"
    },
    title: _react.default.createElement(_react.default.Fragment, null, props.title || 'React Ant CRUD', props.insert ? _react.default.createElement(_react.default.Fragment, null, ' ', _react.default.createElement(_antd.Button, {
      icon: "plus",
      onClick: function onClick() {
        return openAddForm();
      },
      type: "primary"
    })) : ''),
    extra: _react.default.createElement(_react.default.Fragment, null, props.formFieldsFilter.length ? _react.default.createElement(_antd.Button, {
      style: {
        marginRight: 8
      },
      icon: showFilter ? 'up' : 'search',
      onClick: function onClick() {
        return setShowFilter(!showFilter);
      }
    }) : '', _react.default.createElement(_antd.Button, {
      icon: "reload",
      onClick:
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee9() {
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                pagination.current = 1;
                _context9.next = 3;
                return getRows(pagination, null, sorter);

              case 3:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9);
      }))
    }))
  }, showFilter ? _react.default.createElement(_ReactAntCrudForm.default, {
    formType: 'filter',
    mode: mode,
    setMode: setMode,
    formFields: props.formFieldsFilter,
    formData: formDataFilter,
    loading: false,
    handleFormSubmit: function handleFormSubmit() {},
    updateFieldValue: updateFieldValueFilter
  }) : ''), _react.default.createElement(_antd.Table, {
    style: {
      margin: 8
    },
    rowKey: "id",
    bordered: true,
    loading: false,
    dataSource: tableData,
    columns: columns,
    pagination: pagination,
    onChange: function onChange(pagination, filters, sorter) {
      console.log('change table', sorter);
      getRows(pagination, filters, sorter);
    } // locale={{ emptyText: <Empty image={'asd'} description="" /> }}
    // onRow={(record, rowIndex) => ({
    //   onClick: e => {},
    //   onDoubleClick: e => {},
    //   onContextMenu: e => {},
    //   onMouseEnter: e => {},
    //   onMouseLeave: e => {}
    // })}
    // onHeaderRow={column => ({ onClick: () => {} })}

  })), _react.default.createElement("div", {
    style: {
      display: mode !== 'view' ? 'block' : 'none'
    }
  }, _react.default.createElement(_antd.Card, {
    bodyStyle: {
      padding: 8
    },
    title: (mode === 'add' ? 'Add' : 'Update') + ' Record'
  }, _react.default.createElement(_ReactAntCrudForm.default, {
    formType: 'crud',
    mode: mode,
    setMode: setMode,
    formFields: props.formFieldsCrud,
    formData: formDataCrud,
    loading: false,
    handleFormSubmit: handleFormSubmit,
    updateFieldValue: updateFieldValueCrud
  }))));
}

var _default = ReactAndCrud;
exports.default = _default;
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
