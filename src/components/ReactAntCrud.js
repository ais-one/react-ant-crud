import React, { useState, useEffect } from 'react'
import { Table, Modal, Card, Button } from 'antd'
import ReactAntCrudForm from './ReactAntCrudForm'

function ReactAndCrud(props) {
  // props:
  // column, formFieldsFilter, formFieldsCrud

  const columns = [
    {
      title: (<>
        ID{' '}<Button icon="plus" onClick={() => openAddForm()} type="primary"></Button>
      </>),
      dataIndex: 'id',
      render: (text, record) => 
        (<>
          {text}{' '}
          <Button
            type="primary"
            // shape="circle"
            icon="delete"
            onClick={(e) => deleteRecord(record.id)}
          >           
          </Button>
          {' '}
          <Button
            type="default"
            // shape="circle"
            icon="edit"
            onClick={(e) => openEditForm(record.id)}
          >           
          </Button>
        </>)
    },
    { title: 'Name', dataIndex: 'name', width: '30%' },
    { title: 'Birthdate', dataIndex: 'dob', render: (text, record) => {
      return new Intl.DateTimeFormat('en-GB').format(text)
    }}
  ]

  const getDatas = async (_pagination, _filter, _sort) => {
    // loading state on
    if (!_pagination) _pagination = { ...pagination }
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
    } catch (e) {

    }
    // loading state off
  }

  const [mode, setMode] = useState('view')
  // const [loading, setLoading] = useState(false)
  const [showFilter, setShowFilter] = useState(false)
  const [tableData, setTableData] = useState([])
  const [formData, setFormData] = useState({})
  const [pagination, setPagination] = useState({ current: 1, pageSize: 8, total: 0, position: 'top' })

  useEffect(() => {
    const doFetch = async () => {
      // try catch
      await getDatas(pagination)
    }
    doFetch()
    // return
  }, []) // only on mount
  

  const getData = async (id) => {
    let obj
    if (id) { // edit
      const {data} = await props.findOne({ id })
      obj = data
    }
    setFormData(obj)
  }

  const openAddForm = async () => {
    await getData()
    setMode('add')
  }

  const openEditForm = async (id) => {
    await getData(id)
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
          // setPagination({ ...pagination, current: pagination.current - 1 })
        }
        await getDatas(pagination)
      },
      okButtonProps: {
        type: 'danger'
      }
      // cancelButtonProps
    })
  }

  const handleFormSubmit = async ({id, data}) => {
    if (mode === 'add') {
      await props.insert({ _data: data })
    } else if (mode === 'edit') {
      await props.update({ id, _data: data })
    }
    await getDatas(pagination)
    setMode('view')
  }

  return (
    <div className="Crud">
      {mode === 'view' ?
      <>
        <Card
          title={<>
            Crud Title
          </>}
          extra={<>
            {props.formFieldsFilter.length ? <Button icon={showFilter ? 'up' : 'down'} onClick={() => setShowFilter(!showFilter)} /> : ''}
            <Button
              icon="reload"
              onClick={async () => {
                pagination.current = 1 
                await getDatas(pagination)
              }}
            />
          </>}
        >
          {showFilter ? 
            <ReactAntCrudForm formType={'filter'} mode={mode} setMode={setMode} formFields={props.formFieldsFilter} formData={null} loading={false} handleFormSubmit={() => {}} />
            : ''}
        </Card>
        <Table
          style={{ margin: 4 }}
          // locale={{ emptyText: <Empty image={'asd'} description="" /> }}
          // components={components}
          // rowClassName={() => 'editable-row'}
          rowKey="id"
          bordered
          loading={false}
          dataSource={tableData}
          columns={columns}
          pagination={pagination}
          onChange={(pagination, filter, sorter) => {
            console.log('pages', pagination, filter, sorter)
            getDatas(pagination)
          }}
          onRow={(record, rowIndex) => {
            return {
              onClick: e => {},
              onDoubleClick: e => {},
              onContextMenu: e => {},
              onMouseEnter: e => {},
              onMouseLeave: e => {}
            }
          }}
          onHeaderRow={column => {
            return {
              onClick: () => {}, // click header row
            }
          }}
        />
      </>
      :
      <ReactAntCrudForm formType={'crud'} mode={mode} setMode={setMode} formFields={props.formFieldsCrud} formData={formData} loading={false} handleFormSubmit={handleFormSubmit} />
      }
    </div>
  )
}

export default ReactAndCrud
