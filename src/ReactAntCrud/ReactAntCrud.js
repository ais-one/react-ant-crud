import React, { useState, useEffect, useCallback } from 'react'
import { Table, Modal, Card, Button } from 'antd'
import ReactAntCrudForm from './ReactAntCrudForm'

function ReactAndCrud(props) {
  // props:
  // columns, formFieldsFilter, formFieldsCrud, find, findOne, update, insert, delete, tableColumns

  const [mode, setMode] = useState('view')
  const [loading, setLoading] = useState(false)
  const [showFilter, setShowFilter] = useState(false)
  const [tableData, setTableData] = useState([])
  const [formDataCrud, setFormDataCrud] = useState({})
  const [formDataFilter, setFormDataFilter] = useState({})
  const [pagination, setPagination] = useState({})
  const [sorter, setSorter] = useState({}) // field, order

  const actionColumn = {
    title: 'Action',
    dataIndex: '',
    key: 'action',
    width: 108,
    render: (text, record) => {
      return (<>
        {props.update ? <>{' '}<Button icon="edit" onClick={(e) => openEditForm(record.id)} ></Button></> : ''}
        {props.remove ? <>{' '}<Button icon="delete" onClick={(e) => deleteRecord(record.id)} ></Button></> : ''}
      </>)
    }
  }

  const columns = [
    ...props.tableColumns
  ]
  if (props.update || props.remove) columns.unshift(actionColumn)

  let temp = { }
  for (let item of props.formFieldsFilter) {
    temp[item.name] = item.value
  }

  for (let item of props.formFieldsFilter) {
    formDataFilter[item.name] = item.value
  }
  
  const getRows = useCallback(async (_pagination, _filters, _sorter) => {
    // loading state on
    // console.log('formDataFilter', formDataFilter)
    console.log('sorter', _sorter)
    // console.log('pagination', pagination)
    // if (!_pagination) _pagination = { ...pagination }
    try {
      const page = _pagination.current
      // const offset = (page -1 ) * _pagination.pageSize
      const {data} = await props.find({ page, limit: _pagination.pageSize }, formDataFilter, _sorter)
      // data = { results: [], total: 0 }
      if (data.results) {
        setTableData(data.results)
        setPagination({ ..._pagination, total: data.total })
      } else {
        setTableData([])
        setPagination({ ..._pagination, total: 0 })
      }
      setSorter({ ..._sorter })
    } catch (e) { }
    // loading state off
  }, [formDataFilter, props])

  useEffect(() => {
    const doFetch = async () => {
      // console.log('useEffect')
      // console.log('ccc', pagination.current, pagination.pageSize, pagination.total)
      await getRows({ current: 1, pageSize: props.pageSize || 8, total: 0, position: props.position || 'top' }, null, {}) // instead of await getRows(pagination)
    }
    doFetch()
    // return
  }, [props.pageSize, props.position]) // only on mount, getRows will causes problems
  

  const getRow = async (id) => {
    if (loading) return
    setLoading(true)
    let result
    if (id) { // edit
      const {data} = await props.findOne({ id })
      result = data
    }
    setFormDataCrud(result)
    setLoading(false)
  }

  const openAddForm = async () => {
    await getRow()
    setMode('add')
  }

  const openEditForm = async (id) => {
    await getRow(id)
    setMode('edit')
  }

  const deleteRecord = async (id) => {
    Modal.confirm({
      title: 'Confirmation',
      content: 'Proceed To Delete?',
      okText: 'Delete',
      cancelText: 'Cancel',
      onCancel: () => console.log('cancel'),
      onOk: async () => {
        // e.stopPropagation()
        if (loading) return
        setLoading(true)
        await props.remove({ id })
        if (tableData.length === 1 && pagination.current > 1) {
          pagination.current = pagination.current - 1
        }
        getRows(pagination, null, sorter)
        setLoading(false)
      },
      okButtonProps: {
        type: 'danger'
      }
      // cancelButtonProps
    })
  }

  const updateFieldValueCrud = (name, value) => {
    // setFormDataFilter({...formDataCrud, [name]: value })  
  }

  const updateFieldValueFilter = (name, value) => {
    setFormDataFilter({...formDataFilter, [name]: value })  
  }

  const handleFormSubmit = async ({ id, data }) => {
    if (loading) return
    setLoading(true)
    if (mode === 'add') {
      await props.insert({ _data: data })
    } else if (mode === 'edit') {
      await props.update({ id, _data: data })
    }
    await getRows(pagination, null, sorter)
    setLoading(false)
    setMode('view')
  }

  // use display none instead of ? to show / hide components... cause problems in the case of Table sorter
  return (
    <div className="Crud">
      <div style={{ display: mode === 'view' ? 'block' : 'none' }}>
        <Card
          bodyStyle={{padding: "0"}}
          title={<>
            {props.title || 'React Ant CRUD'}
            {props.insert ? <>{' '}<Button icon="plus" onClick={() => openAddForm()} type="primary"></Button></> : ''}
          </>}
          extra={<>
            {props.formFieldsFilter.length ? <Button style={{ marginRight: 8 }} icon={showFilter ? 'up' : 'search'} onClick={() => setShowFilter(!showFilter)} /> : ''}
            <Button
              icon="reload"
              onClick={async () => {
                pagination.current = 1
                if (loading) return
                setLoading(true)
                await getRows(pagination, null, sorter)
                setLoading(false)
              }}
            />
          </>}
        >
          {showFilter ?
            <ReactAntCrudForm idName={props.idName} formType={'filter'} mode={mode} setMode={setMode} formFields={props.formFieldsFilter} formData={formDataFilter} loading={loading} handleFormSubmit={handleFormSubmit} updateFieldValue={updateFieldValueFilter} />
          : ''}
        </Card>
        <Table
          style={{ margin: 8 }}
          rowKey="id"
          bordered
          loading={loading}
          dataSource={tableData}
          columns={columns}
          pagination={pagination}
          onChange={(pagination, filters, sorter) => {
            console.log('change table', sorter)
            // if (loading) return
            setLoading(true)
            getRows(pagination, filters, sorter)
            setLoading(false)
          }}
          // locale={{ emptyText: <Empty image={'asd'} description="" /> }}
          // onRow={(record, rowIndex) => ({
          //   onClick: e => {},
          //   onDoubleClick: e => {},
          //   onContextMenu: e => {},
          //   onMouseEnter: e => {},
          //   onMouseLeave: e => {}
          // })}
          // onHeaderRow={column => ({ onClick: () => {} })}
        />
      </div>
      <div style={{ display: mode !== 'view' ? 'block' : 'none' }}>
        <Card
          bodyStyle={{padding: 8}}
          title={(mode === 'add' ? 'Add' : 'Update') + ' Record'}
        >
          <ReactAntCrudForm idName={props.idName} formType={'crud'} mode={mode} setMode={setMode} formFields={props.formFieldsCrud} formData={formDataCrud} loading={loading} handleFormSubmit={handleFormSubmit} updateFieldValue={updateFieldValueCrud} />
        </Card>
      </div>
    </div>
  )
}

export default ReactAndCrud
