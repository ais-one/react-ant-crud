"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _objectSpread3 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _antd = require("antd");

var _ReactAntCrudForm = _interopRequireDefault(require("./ReactAntCrudForm"));

function ReactAndCrud(props) {
  // props:
  // columns, formFieldsFilter, formFieldsCrud, find, findOne, update, insert, delete, tableColumns
  var _useState = (0, _react.useState)('view'),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      mode = _useState2[0],
      setMode = _useState2[1]; // const [loading, setLoading] = useState(false)


  var _useState3 = (0, _react.useState)(false),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      showFilter = _useState4[0],
      setShowFilter = _useState4[1];

  var _useState5 = (0, _react.useState)([]),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      tableData = _useState6[0],
      setTableData = _useState6[1];

  var _useState7 = (0, _react.useState)({}),
      _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
      formDataCrud = _useState8[0],
      setFormDataCrud = _useState8[1];

  var _useState9 = (0, _react.useState)({}),
      _useState10 = (0, _slicedToArray2.default)(_useState9, 2),
      formDataFilter = _useState10[0],
      setFormDataFilter = _useState10[1];

  var _useState11 = (0, _react.useState)({
    current: 1,
    pageSize: 8,
    total: 0,
    position: 'top'
  }),
      _useState12 = (0, _slicedToArray2.default)(_useState11, 2),
      pagination = _useState12[0],
      setPagination = _useState12[1];

  var _useState13 = (0, _react.useState)({}),
      _useState14 = (0, _slicedToArray2.default)(_useState13, 2),
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
  var columns = (0, _toConsumableArray2.default)(props.tableColumns);
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
    var _ref = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee(_pagination, _filters, _sorter) {
      var page, _ref2, data;

      return _regenerator.default.wrap(function _callee$(_context) {
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
                setPagination((0, _objectSpread3.default)({}, _pagination, {
                  total: data.totals
                }));
              } else {
                setTableData([]);
                setPagination((0, _objectSpread3.default)({}, _pagination, {
                  total: 0
                }));
              }

              setSorter((0, _objectSpread3.default)({}, _sorter));
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
      var _ref3 = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee2() {
        return _regenerator.default.wrap(function _callee2$(_context2) {
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
    var _ref4 = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee3(id) {
      var result, _ref5, data;

      return _regenerator.default.wrap(function _callee3$(_context3) {
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
    var _ref6 = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee4() {
      return _regenerator.default.wrap(function _callee4$(_context4) {
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
    var _ref7 = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee5(id) {
      return _regenerator.default.wrap(function _callee5$(_context5) {
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
    var _ref8 = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee7(id) {
      return _regenerator.default.wrap(function _callee7$(_context7) {
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
                  var _onOk = (0, _asyncToGenerator2.default)(
                  /*#__PURE__*/
                  _regenerator.default.mark(function _callee6() {
                    return _regenerator.default.wrap(function _callee6$(_context6) {
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
    setFormDataFilter((0, _objectSpread3.default)({}, formDataFilter, (0, _defineProperty2.default)({}, name, value)));
  };

  var handleFormSubmit =
  /*#__PURE__*/
  function () {
    var _ref10 = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee8(_ref9) {
      var id, data;
      return _regenerator.default.wrap(function _callee8$(_context8) {
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
      (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee9() {
        return _regenerator.default.wrap(function _callee9$(_context9) {
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
    handleFormSubmit: handleFormSubmit,
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