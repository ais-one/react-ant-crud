import React, { useState, useEffect, useCallback } from 'react'
import { Table, Modal, Card, Button } from 'antd'
import ReactAntCrudForm from './ReactAntCrudForm'

function ReactAndCrud(props) {
  // props:
  // columns, formFieldsFilter, formFieldsCrud, find, findOne, update, insert, delete, tableColumns

  const [mode, setMode] = useState('view')
  // const [loading, setLoading] = useState(false)
  const [showFilter, setShowFilter] = useState(false)
  const [tableData, setTableData] = useState([])
  const [formDataCrud, setFormDataCrud] = useState({})
  const [formDataFilter, setFormDataFilter] = useState({})
  const [pagination, setPagination] = useState({ current: 1, pageSize: 8, total: 0, position: 'top' })
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
    console.log('formDataFilter', formDataFilter)
    console.log('sorter', _sorter)
    
    // console.log('pagination', pagination)
    // if (!_pagination) _pagination = { ...pagination }
    try {
      const page = _pagination.current
      // const offset = (page -1 ) * _pagination.pageSize
      const {data} = await props.find({ page, limit: _pagination.pageSize })
      // data = { results: [], totals: 0 }
      if (data.results) {
        setTableData(data.results)
        setPagination({ ..._pagination, total: data.totals })
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
      console.log('useEffect')
      // console.log('ccc', pagination.current, pagination.pageSize, pagination.total)
      await getRows({ current: 1, pageSize: 8, total: 0, position: 'top' }, null, {}) // instead of await getRows(pagination)
    }
    doFetch()
    // return
  }, [getRows]) // only on mount
  

  const getRow = async (id) => {
    let result
    if (id) { // edit
      const {data} = await props.findOne({ id })
      result = data
    }
    setFormDataCrud(result)
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
        await props.remove({ id })
        if (tableData.length === 1 && pagination.current > 1) {
          pagination.current = pagination.current - 1
        }
        getRows(pagination, null, sorter)
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

  const handleFormSubmit = async ({id, data}) => {
    if (mode === 'add') {
      await props.insert({ _data: data })
    } else if (mode === 'edit') {
      await props.update({ id, _data: data })
    }
    await getRows(pagination, null, sorter)
    setMode('view')
  }

  return (
    <div className="Crud">
      {mode === 'view' ?
      <>
        <Card
          bodyStyle={{padding: "0"}}
          title={<>
            Crud Title
            {props.insert ? <>{' '}<Button icon="plus" onClick={() => openAddForm()} type="primary"></Button></> : ''}
          </>}
          extra={<>
            {props.formFieldsFilter.length ? <Button icon={showFilter ? 'up' : 'down'} onClick={() => setShowFilter(!showFilter)} /> : ''}
            <Button
              icon="reload"
              onClick={async () => {
                pagination.current = 1 
                await getRows(pagination, null, sorter)
              }}
            />
          </>}
        >
          {showFilter ? 
            <ReactAntCrudForm formType={'filter'} mode={mode} setMode={setMode} formFields={props.formFieldsFilter} formData={formDataFilter} loading={false} handleFormSubmit={() => {}} updateFieldValue={updateFieldValueFilter} />
          : ''}
        </Card>
        <Table
          style={{ margin: 4 }}
          rowKey="id"
          bordered
          loading={false}
          dataSource={tableData}
          columns={columns}
          pagination={pagination}
          onChange={(pagination, filters, sorter) => {
            console.log('change table', sorter)
            getRows(pagination, filters, sorter)
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
      </>
      :
      <ReactAntCrudForm formType={'crud'} mode={mode} setMode={setMode} formFields={props.formFieldsCrud} formData={formDataCrud} loading={false} handleFormSubmit={handleFormSubmit} updateFieldValue={updateFieldValueCrud} />
      }
    </div>
  )
}

export default ReactAndCrud
