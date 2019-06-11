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
      setMode = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      loading = _useState4[0],
      setLoading = _useState4[1];

  var _useState5 = (0, _react.useState)(false),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      showFilter = _useState6[0],
      setShowFilter = _useState6[1];

  var _useState7 = (0, _react.useState)([]),
      _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
      tableData = _useState8[0],
      setTableData = _useState8[1];

  var _useState9 = (0, _react.useState)({}),
      _useState10 = (0, _slicedToArray2.default)(_useState9, 2),
      formDataCrud = _useState10[0],
      setFormDataCrud = _useState10[1];

  var _useState11 = (0, _react.useState)({}),
      _useState12 = (0, _slicedToArray2.default)(_useState11, 2),
      formDataFilter = _useState12[0],
      setFormDataFilter = _useState12[1];

  var _useState13 = (0, _react.useState)({}),
      _useState14 = (0, _slicedToArray2.default)(_useState13, 2),
      pagination = _useState14[0],
      setPagination = _useState14[1];

  var _useState15 = (0, _react.useState)({}),
      _useState16 = (0, _slicedToArray2.default)(_useState15, 2),
      sorter = _useState16[0],
      setSorter = _useState16[1]; // field, order


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
              // console.log('formDataFilter', formDataFilter)
              console.log('sorter', _sorter); // console.log('pagination', pagination)
              // if (!_pagination) _pagination = { ...pagination }

              _context.prev = 1;
              page = _pagination.current; // const offset = (page -1 ) * _pagination.pageSize

              _context.next = 5;
              return props.find({
                page: page,
                limit: _pagination.pageSize
              }, formDataFilter, _sorter);

            case 5:
              _ref2 = _context.sent;
              data = _ref2.data;

              // data = { results: [], total: 0 }
              if (data.results) {
                setTableData(data.results);
                setPagination((0, _objectSpread3.default)({}, _pagination, {
                  total: data.total
                }));
              } else {
                setTableData([]);
                setPagination((0, _objectSpread3.default)({}, _pagination, {
                  total: 0
                }));
              }

              setSorter((0, _objectSpread3.default)({}, _sorter));
              _context.next = 13;
              break;

            case 11:
              _context.prev = 11;
              _context.t0 = _context["catch"](1);

            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[1, 11]]);
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
                _context2.next = 2;
                return getRows({
                  current: 1,
                  pageSize: props.pageSize || 8,
                  total: 0,
                  position: props.position || 'top'
                }, null, {});

              case 2:
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
  }, [getRows, props.pageSize, props.position]); // only on mount

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
              if (!loading) {
                _context3.next = 2;
                break;
              }

              return _context3.abrupt("return");

            case 2:
              setLoading(true);

              if (!id) {
                _context3.next = 9;
                break;
              }

              _context3.next = 6;
              return props.findOne({
                id: id
              });

            case 6:
              _ref5 = _context3.sent;
              data = _ref5.data;
              result = data;

            case 9:
              setFormDataCrud(result);
              setLoading(false);

            case 11:
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
                            if (!loading) {
                              _context6.next = 2;
                              break;
                            }

                            return _context6.abrupt("return");

                          case 2:
                            setLoading(true);
                            _context6.next = 5;
                            return props.remove({
                              id: id
                            });

                          case 5:
                            if (tableData.length === 1 && pagination.current > 1) {
                              pagination.current = pagination.current - 1;
                            }

                            getRows(pagination, null, sorter);
                            setLoading(false);

                          case 8:
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

              if (!loading) {
                _context8.next = 3;
                break;
              }

              return _context8.abrupt("return");

            case 3:
              setLoading(true);

              if (!(mode === 'add')) {
                _context8.next = 9;
                break;
              }

              _context8.next = 7;
              return props.insert({
                _data: data
              });

            case 7:
              _context8.next = 12;
              break;

            case 9:
              if (!(mode === 'edit')) {
                _context8.next = 12;
                break;
              }

              _context8.next = 12;
              return props.update({
                id: id,
                _data: data
              });

            case 12:
              _context8.next = 14;
              return getRows(pagination, null, sorter);

            case 14:
              setLoading(false);
              setMode('view');

            case 16:
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

                if (!loading) {
                  _context9.next = 3;
                  break;
                }

                return _context9.abrupt("return");

              case 3:
                setLoading(true);
                _context9.next = 6;
                return getRows(pagination, null, sorter);

              case 6:
                setLoading(false);

              case 7:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9);
      }))
    }))
  }, showFilter ? _react.default.createElement(_ReactAntCrudForm.default, {
    idName: props.idName,
    formType: 'filter',
    mode: mode,
    setMode: setMode,
    formFields: props.formFieldsFilter,
    formData: formDataFilter,
    loading: loading,
    handleFormSubmit: handleFormSubmit,
    updateFieldValue: updateFieldValueFilter
  }) : ''), _react.default.createElement(_antd.Table, {
    style: {
      margin: 8
    },
    rowKey: "id",
    bordered: true,
    loading: loading,
    dataSource: tableData,
    columns: columns,
    pagination: pagination,
    onChange: function onChange(pagination, filters, sorter) {
      console.log('change table', sorter); // if (loading) return

      setLoading(true);
      getRows(pagination, filters, sorter);
      setLoading(false);
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
    idName: props.idName,
    formType: 'crud',
    mode: mode,
    setMode: setMode,
    formFields: props.formFieldsCrud,
    formData: formDataCrud,
    loading: loading,
    handleFormSubmit: handleFormSubmit,
    updateFieldValue: updateFieldValueCrud
  }))));
}

var _default = ReactAndCrud;
exports.default = _default;